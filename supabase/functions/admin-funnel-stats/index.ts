import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const token = authHeader.replace(/^Bearer\s+/i, '')
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: isAdmin, error: roleErr } = await supabase.rpc('has_role', {
      _user_id: user.id, _role: 'admin',
    })
    if (roleErr || !isAdmin) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const url = new URL(req.url)
    const days = Math.min(Math.max(parseInt(url.searchParams.get('days') ?? '30', 10) || 30, 1), 180)
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    // Pull all events in window. analytics_events has up to ~thousands/day; cap at 50k for safety.
    const { data: events, error: evErr } = await supabase
      .from('analytics_events')
      .select('event, user_id, anon_id, properties, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: true })
      .limit(50000)
    if (evErr) throw new Error(evErr.message)

    // Overall funnel — unique users per stage
    const setOf = (filter: (e: any) => boolean) => {
      const s = new Set<string>()
      for (const e of events ?? []) if (filter(e)) {
        const id = e.user_id ?? e.anon_id
        if (id) s.add(id)
      }
      return s
    }
    const signups = setOf((e) => e.event === 'signup')
    const activated = setOf((e) => e.event === 'activity_started')
    const paywall = setOf((e) => e.event === 'paywall_view')
    const subStarted = setOf((e) => e.event === 'subscribe_started')
    const subCompleted = setOf((e) => e.event === 'subscribe_completed')

    const overall = {
      signups: signups.size,
      activated: activated.size,
      paywall_view: paywall.size,
      subscribe_started: subStarted.size,
      subscribe_completed: subCompleted.size,
    }

    // By campaign (utm_campaign from attribution or top-level utm)
    const byCampaign: Record<string, {
      landed: number; paywall: number; subscribe_started: number; subscribe_completed: number;
    }> = {}
    const ensure = (k: string) => (byCampaign[k] ??= { landed: 0, paywall: 0, subscribe_started: 0, subscribe_completed: 0 })

    const campaignOf = (e: any): string | null => {
      const p = e.properties ?? {}
      return p.utm_campaign ?? p.attribution?.utm_campaign ?? null
    }
    // Track which (campaign, userId) pairs we've counted for each stage
    const seen: Record<string, Set<string>> = { landed: new Set(), paywall: new Set(), subscribe_started: new Set(), subscribe_completed: new Set() }
    const bump = (stage: 'landed' | 'paywall' | 'subscribe_started' | 'subscribe_completed', campaign: string, id: string) => {
      const k = `${campaign}::${id}`
      if (seen[stage].has(k)) return
      seen[stage].add(k)
      const row = ensure(campaign)
      ;(row as any)[stage]++
    }

    for (const e of events ?? []) {
      const id = e.user_id ?? e.anon_id
      if (!id) continue
      const campaign = campaignOf(e)
      if (e.event === 'email_cta_landed' && campaign) bump('landed', campaign, id)
      if (campaign && e.event === 'paywall_view') bump('paywall', campaign, id)
      if (campaign && e.event === 'subscribe_started') bump('subscribe_started', campaign, id)
      if (campaign && e.event === 'subscribe_completed') bump('subscribe_completed', campaign, id)
    }

    // By day
    const byDay: Record<string, { signups: number; activated: number; paywall: number; subscribed: number }> = {}
    const dayOf = (iso: string) => iso.slice(0, 10)
    const seenDay: Record<string, Set<string>> = { signups: new Set(), activated: new Set(), paywall: new Set(), subscribed: new Set() }
    const bumpDay = (stage: keyof typeof seenDay, day: string, id: string) => {
      const k = `${day}::${id}`
      if (seenDay[stage].has(k)) return
      seenDay[stage].add(k)
      byDay[day] ??= { signups: 0, activated: 0, paywall: 0, subscribed: 0 }
      ;(byDay[day] as any)[stage]++
    }
    for (const e of events ?? []) {
      const id = e.user_id ?? e.anon_id
      if (!id) continue
      const d = dayOf(e.created_at)
      if (e.event === 'signup') bumpDay('signups', d, id)
      if (e.event === 'activity_started') bumpDay('activated', d, id)
      if (e.event === 'paywall_view') bumpDay('paywall', d, id)
      if (e.event === 'subscribe_completed') bumpDay('subscribed', d, id)
    }

    return new Response(
      JSON.stringify({
        days,
        overall,
        byCampaign,
        byDay: Object.entries(byDay)
          .sort(([a], [b]) => (a < b ? 1 : -1))
          .map(([day, v]) => ({ day, ...v })),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
