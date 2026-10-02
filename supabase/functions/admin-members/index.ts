import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'unauthorized' }, 401)
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: { user } } = await supabase.auth.getUser(authHeader.replace(/^Bearer\s+/i, ''))
    if (!user) return json({ error: 'unauthorized' }, 401)
    const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' })
    if (!isAdmin) return json({ error: 'forbidden' }, 403)

    const [profiles, subs, redemptions, children, songPurchases] = await Promise.all([
      supabase.from('user_profiles').select('user_id, email, full_name, created_at').order('created_at', { ascending: false }).limit(10000),
      supabase.from('subscribers').select('user_id, email, subscribed, subscription_tier, subscription_end, subscription_status, provider, platform, created_at, child_addons, store_child_addons').limit(10000),
      supabase.from('access_code_redemptions').select('user_id, revoked, redeemed_at, access_codes(label, code, grant_duration_days, revoked)').limit(10000),
      supabase.from('child_profiles').select('user_id').limit(20000),
      supabase.from('song_purchases').select('user_id, purchased_at').limit(10000),
    ])
    for (const r of [profiles, subs, redemptions, children, songPurchases]) if (r.error) throw new Error(r.error.message)

    const subBy = new Map((subs.data ?? []).map((s) => [s.user_id, s]))
    const childCount = new Map<string, number>()
    for (const c of children.data ?? []) if (c.user_id) childCount.set(c.user_id, (childCount.get(c.user_id) ?? 0) + 1)
    const songOwners = new Set((songPurchases.data ?? []).map((p: { user_id: string }) => p.user_id))
    const codeBy = new Map<string, { label: string; until: string | null }>()
    const now = Date.now()
    for (const r of (redemptions.data ?? []) as any[]) {
      const code = r.access_codes
      if (r.revoked || code?.revoked) continue
      const until = code?.grant_duration_days
        ? new Date(new Date(r.redeemed_at).getTime() + code.grant_duration_days * 86400000).toISOString()
        : null
      if (until && new Date(until).getTime() < now) continue
      codeBy.set(r.user_id, { label: code?.label || code?.code || 'Access code', until })
    }

    const seen = new Set<string>()
    const members = (profiles.data ?? []).filter((p) => p.user_id).map((p) => {
      seen.add(p.user_id!)
      const s = subBy.get(p.user_id!)
      const code = codeBy.get(p.user_id!)
      const paid = !!s?.subscribed && (!s.subscription_end || new Date(s.subscription_end).getTime() > now)
      return {
        user_id: p.user_id,
        email: p.email,
        name: p.full_name,
        joined: p.created_at,
        children: childCount.get(p.user_id!) ?? 0,
        child_addons: paid ? (s?.child_addons ?? 0) + (s?.store_child_addons ?? 0) : 0,
        website_child_addons: paid ? s?.child_addons ?? 0 : 0,
        store_child_addons: paid ? s?.store_child_addons ?? 0 : 0,
        premium: paid || !!code,
        via: paid ? 'paid' : code ? 'access_code' : null,
        plan: paid ? s?.subscription_tier ?? 'Premium' : code ? code.label : null,
        where: paid ? (s?.provider === 'revenuecat' ? (s?.platform || 'app store') : 'website') : null,
        status: s?.subscription_status ?? null,
        renews: paid ? s?.subscription_end ?? null : code?.until ?? null,
        songs: songOwners.has(p.user_id!),
      }
    })
    // Subscribers with no profile row (edge case)
    for (const s of subs.data ?? []) {
      if (seen.has(s.user_id)) continue
      const paid = !!s.subscribed && (!s.subscription_end || new Date(s.subscription_end).getTime() > now)
      members.push({ user_id: s.user_id, email: s.email, name: null, joined: s.created_at, children: childCount.get(s.user_id) ?? 0,
        premium: paid, via: paid ? 'paid' : null, plan: paid ? s.subscription_tier ?? 'Premium' : null,
        where: paid ? (s.provider === 'revenuecat' ? (s.platform || 'app store') : 'website') : null,
        status: s.subscription_status, renews: paid ? s.subscription_end : null, songs: songOwners.has(s.user_id) })
    }

    return json({
      total: members.length,
      premium: members.filter((m) => m.premium).length,
      paid: members.filter((m) => m.via === 'paid').length,
      viaCode: members.filter((m) => m.via === 'access_code').length,
      songsOwned: members.filter((m) => m.songs).length,
      members,
    })
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500)
  }
})
