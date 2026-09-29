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
    const days = Math.min(Math.max(parseInt(url.searchParams.get('days') ?? '30', 10) || 30, 1), 365)
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    // Pull leads in the window
    const { data: leads, error: leadsErr } = await supabase
      .from('leads')
      .select('email, source, utm, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: true })
      .limit(50000)
    if (leadsErr) throw new Error(leadsErr.message)

    const total = leads?.length ?? 0

    // By day
    const byDay: Record<string, number> = {}
    // By source
    const bySource: Record<string, number> = {}
    // By utm_source / utm_campaign
    const byUtmSource: Record<string, number> = {}
    const byUtmCampaign: Record<string, number> = {}

    for (const l of leads ?? []) {
      const day = (l.created_at as string).slice(0, 10)
      byDay[day] = (byDay[day] ?? 0) + 1
      bySource[l.source ?? 'unknown'] = (bySource[l.source ?? 'unknown'] ?? 0) + 1
      const utm = (l.utm ?? {}) as Record<string, string>
      const us = utm.utm_source || 'direct'
      const uc = utm.utm_campaign || '(none)'
      byUtmSource[us] = (byUtmSource[us] ?? 0) + 1
      byUtmCampaign[uc] = (byUtmCampaign[uc] ?? 0) + 1
    }

    return new Response(
      JSON.stringify({
        days,
        total,
        byDay: Object.entries(byDay)
          .sort(([a], [b]) => (a < b ? 1 : -1))
          .map(([day, count]) => ({ day, count })),
        bySource: Object.entries(bySource)
          .sort(([, a], [, b]) => b - a)
          .map(([source, count]) => ({ source, count })),
        byUtmSource: Object.entries(byUtmSource)
          .sort(([, a], [, b]) => b - a)
          .map(([name, count]) => ({ name, count })),
        byUtmCampaign: Object.entries(byUtmCampaign)
          .sort(([, a], [, b]) => b - a)
          .map(([name, count]) => ({ name, count })),
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
