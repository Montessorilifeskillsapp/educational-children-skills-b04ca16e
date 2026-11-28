// Self-serve data rights for family accounts: export (portability) and erasure.
// School records are owned by schools and are not exported or erased here.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'
import { exactEmailPattern } from '../_shared/identityRules.ts'

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const Body = z.discriminatedUnion('action', [
  z.object({ action: z.literal('export') }).strict(),
  z.object({ action: z.literal('delete'), confirm: z.literal('DELETE') }).strict(),
])

const BY_USER = ['user_profiles', 'child_profiles', 'notification_preferences', 'push_tokens', 'child_goals',
  'calendar_events', 'weekly_reports', 'subscribers', 'song_purchases', 'consultation_requests',
  'access_code_redemptions', 'email_schedule', 'analytics_events', 'user_roles']
const BY_CHILD = ['skill_progress', 'activity_sessions', 'child_goals', 'calendar_events', 'weekly_reports']
const BY_EMAIL = ['leads', 'email_schedule', 'subscription_renewal_notices']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '')
    const { data: u, error: ue } = await admin.auth.getUser(token)
    if (ue || !u.user || !u.user.email_confirmed_at) return json({ error: 'Unauthorized' }, 401)
    const uid = u.user.id
    const email = u.user.email?.toLowerCase() ?? null

    const parsed = Body.safeParse(await req.json())
    if (!parsed.success) return json({ error: 'Invalid request' }, 400)

    const { data: kids } = await admin.from('child_profiles').select('id').eq('user_id', uid)
    const childIds = (kids ?? []).map((k: { id: string }) => k.id)

    if (parsed.data.action === 'export') {
      const out: Record<string, unknown> = {
        exported_at: new Date().toISOString(),
        account: { id: uid, email, created_at: u.user.created_at, sign_in_providers: u.user.app_metadata?.providers ?? [] },
      }
      for (const t of BY_USER) {
        const { data, error } = await admin.from(t).select('*').eq('user_id', uid)
        if (!error) out[t] = data
      }
      for (const t of BY_CHILD) {
        if (!childIds.length) break
        const { data, error } = await admin.from(t).select('*').in('child_id', childIds)
        if (!error) out[`${t}_by_child`] = data
      }
      if (email) for (const t of BY_EMAIL) {
        const { data, error } = await admin.from(t).select('*').ilike('email', exactEmailPattern(email))
        if (!error) out[`${t}_by_email`] = data
      }
      return json({ data: out })
    }

    // Erasure
    const { data: sub } = await admin.from('subscribers').select('subscribed').eq('user_id', uid).maybeSingle()
    if (sub?.subscribed) return json({ error: 'active_subscription' }, 409)
    const { data: adminRole } = await admin.from('school_members').select('school_id').eq('user_id', uid).eq('role', 'school_admin').limit(1)
    if (adminRole?.length) return json({ error: 'school_admin' }, 409)

    for (const t of BY_CHILD) if (childIds.length) await admin.from(t).delete().in('child_id', childIds)
    for (const t of [...BY_USER].reverse()) await admin.from(t).delete().eq('user_id', uid)
    if (email) for (const t of BY_EMAIL) await admin.from(t).delete().ilike('email', exactEmailPattern(email))
    await admin.from('school_members').delete().eq('user_id', uid)

    const { error: de } = await admin.auth.admin.deleteUser(uid)
    if (de) throw de
    return json({ ok: true })
  } catch (e) {
    console.error('account-data error', e)
    return json({ error: 'Server error' }, 500)
  }
})
