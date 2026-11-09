import { createClient } from 'npm:@supabase/supabase-js@2'
import { BookingSchema, OWNER_EMAIL, packageLabel } from './rules.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const url = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) return json({ error: 'Server configuration error' }, 500)
  const admin = createClient(url, serviceKey)

  let raw: unknown
  try { raw = await req.json() } catch { return json({ error: 'Invalid request' }, 400) }
  const parsed = BookingSchema.safeParse(raw)
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Please check the form'
    return json({ error: first, fields: parsed.error.flatten().fieldErrors }, 400)
  }
  const b = parsed.data

  // Optional signed-in user (never required).
  let userId: string | null = null
  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
  if (token) {
    const { data } = await admin.auth.getUser(token).catch(() => ({ data: { user: null } }))
    userId = data?.user?.id ?? null
  }

  // Double-tap guard: an identical request in the last 2 minutes is treated as already sent.
  const since = new Date(Date.now() - 2 * 60 * 1000).toISOString()
  const { data: recent } = await admin.from('consultation_requests').select('id')
    .eq('email', b.email).eq('topics', b.topics).gte('created_at', since).limit(1)
  if (recent && recent.length > 0) return json({ ok: true, duplicate: true, id: recent[0].id })

  const { data: row, error: insertErr } = await admin.from('consultation_requests').insert({
    user_id: userId, name: b.name, email: b.email, child_age: b.childAge || null,
    package: b.package, topics: b.topics, preferred_times: b.preferredTimes || null,
  }).select('id, created_at').single()
  if (insertErr || !row) {
    console.error('consultation insert failed', insertErr)
    return json({ error: 'We could not save your request. Please try again.' }, 500)
  }

  // Also keep the address in the admin leads list (one row per address).
  const { error: leadErr } = await admin.from('leads').insert({ email: b.email, source: 'consultation' })
  if (leadErr && leadErr.code !== '23505') console.warn('lead insert failed', leadErr.message)

  const label = packageLabel(b.package)
  const submittedAt = new Date(row.created_at).toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' }) + ' (Central)'

  const { data: ownerRes, error: ownerErr } = await admin.functions.invoke('send-transactional-email', {
    body: {
      templateName: 'consultation-request',
      recipientEmail: OWNER_EMAIL,
      replyTo: b.email,
      idempotencyKey: `consultation-owner-${row.id}`,
      templateData: { name: b.name, email: b.email, childAge: b.childAge, packageLabel: label, topics: b.topics, preferredTimes: b.preferredTimes, submittedAt },
    },
  })
  const ownerSent = !ownerErr && (ownerRes as { sent?: boolean } | null)?.sent === true
  if (!ownerSent) console.error('owner notification failed', ownerErr ?? ownerRes)

  const { data: parentRes, error: parentErr } = await admin.functions.invoke('send-transactional-email', {
    body: {
      templateName: 'consultation-received',
      recipientEmail: b.email,
      idempotencyKey: `consultation-parent-${row.id}`,
      templateData: { name: b.name.split(' ')[0], packageLabel: label, topics: b.topics, preferredTimes: b.preferredTimes },
    },
  })
  const parentSent = !parentErr && (parentRes as { sent?: boolean } | null)?.sent === true
  if (!parentSent) console.warn('parent confirmation failed', parentErr ?? parentRes)

  const now = new Date().toISOString()
  await admin.from('consultation_requests').update({
    owner_notified_at: ownerSent ? now : null,
    confirmation_sent_at: parentSent ? now : null,
  }).eq('id', row.id)

  return json({ ok: true, id: row.id, ownerNotified: ownerSent, confirmationSent: parentSent })
})
