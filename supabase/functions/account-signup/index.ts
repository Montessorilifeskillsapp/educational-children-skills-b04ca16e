import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { signupAccountAction } from '../_shared/identityRules.ts'

// App-owned email sign-up. Confirmation emails go out through the connected Gmail account,
// so new accounts never depend on the auth service's own email sender or its hourly cap.
// Opening the link only confirms the address; the person then signs in with their password.
const GMAIL_SEND_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send'
const FROM_NAME = 'Montessori Life Skills'
const FROM_ADDRESS = 'montessorilifeskills@gmail.com'
const DEFAULT_ORIGIN = 'https://montessorilifeskillsapp.com'
const ALLOWED_ORIGINS = new Set([
  DEFAULT_ORIGIN,
  'https://www.montessorilifeskillsapp.com',
  'https://educational-children-skills.lovable.app',
  'https://id-preview--cad132a6-4b28-41b0-93d9-ba4b9938bbc8.lovable.app',
  'http://localhost:8080',
])
const LINK_LIFETIME_MS = 24 * 60 * 60 * 1000
const MAX_EMAILS_PER_HOUR = 5
const EMAIL_RE = /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const b64 = (s: string) => btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(''))
const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

function confirmEmail(to: string, link: string) {
  const subject = 'Confirm your Montessori Life Skills account'
  const text = [
    'Welcome to Montessori Life Skills!',
    '',
    'Open this link to confirm your email address and finish creating your account (it expires in 24 hours):',
    '',
    link,
    '',
    "If you didn't create an account, you can ignore this email.",
    '',
    'Montessori Life Skills',
  ].join('\r\n')
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#3a3029">
<div style="max-width:520px;margin:0 auto;padding:32px 24px">
<h1 style="font-size:20px;margin:0 0 16px">Confirm your email</h1>
<p style="font-size:15px;line-height:1.5">Welcome to Montessori Life Skills! Confirm your email address to finish creating your account.</p>
<p style="margin:28px 0"><a href="${link}" style="background:#1f7a72;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block">Confirm my email</a></p>
<p style="font-size:13px;line-height:1.5;color:#6b5f55">This link expires in 24 hours. If the button doesn't work, copy this address into your browser:<br><span style="word-break:break-all">${link}</span></p>
<p style="font-size:13px;line-height:1.5;color:#6b5f55">If you didn't create an account, you can ignore this email.</p>
</div></body></html>`
  const boundary = `b_${crypto.randomUUID()}`
  const raw = [
    `From: ${FROM_NAME} <${FROM_ADDRESS}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    b64(text),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    b64(html),
    `--${boundary}--`,
  ].join('\r\n')
  return b64(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

type Admin = ReturnType<typeof createClient>

// Returns null on success, or an error response.
async function sendConfirmation(admin: Admin, userId: string, email: string, origin: string): Promise<Response | null> {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count } = await admin
    .from('email_confirmation_requests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', since)
  if ((count ?? 0) >= MAX_EMAILS_PER_HOUR) return json({ ok: true })

  const token = b64url(crypto.getRandomValues(new Uint8Array(32)))
  const { error: insertError } = await admin.from('email_confirmation_requests').insert({
    user_id: userId,
    token_hash: await sha256(token),
    expires_at: new Date(Date.now() + LINK_LIFETIME_MS).toISOString(),
  })
  if (insertError) {
    console.error('account-signup insert failed', insertError.message)
    return json({ error: 'Could not send the confirmation email. Please try again.' }, 500)
  }

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY')
  if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) return json({ error: 'Email sending not configured' }, 500)
  const link = `${origin}/auth?confirm_token=${encodeURIComponent(token)}`
  const res = await fetch(GMAIL_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: confirmEmail(email, link) }),
  })
  if (!res.ok) {
    console.error(`account-signup email failed [${res.status}]`)
    return json({ error: 'Could not send the confirmation email. Please try again.' }, 502)
  }
  return null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const url = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) return json({ error: 'Server not configured' }, 500)
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request' }, 400)
  }
  const allowedKeys = new Set(['action', 'email', 'password', 'origin', 'token'])
  if (!body || typeof body !== 'object' || Object.keys(body).some((k) => !allowedKeys.has(k))) {
    return json({ error: 'Invalid request' }, 400)
  }
  const origin = typeof body.origin === 'string' && ALLOWED_ORIGINS.has(body.origin) ? body.origin : DEFAULT_ORIGIN
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (body.action === 'signup') {
    const password = typeof body.password === 'string' ? body.password : ''
    if (!EMAIL_RE.test(email) || email.length > 254) return json({ error: 'invalid email' }, 400)
    if (password.length < 6 || password.length > 72) return json({ error: 'Password should be at least 6 characters.' }, 400)

    const { data: existingId, error: lookupError } = await admin.rpc('auth_user_id_for_email', { _email: email })
    if (lookupError) {
      console.error('account-signup lookup failed', lookupError.message)
      return json({ error: 'Could not create the account. Please try again.' }, 500)
    }

    let userId = existingId as string | null
    if (userId) {
      const { data: found, error: foundError } = await admin.auth.admin.getUserById(userId)
      if (foundError || !found?.user) return json({ ok: true })
      if (signupAccountAction(true, Boolean(found.user.email_confirmed_at)) === 'none') return json({ ok: true })
      // Repeated signup may resend confirmation, but never changes an existing password.
      // Only the mailbox-proven password-reset flow can replace it.
    } else {
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
      })
      if (createError || !created?.user) return json({ error: createError?.message ?? 'Could not create the account.' }, 400)
      userId = created.user.id
    }

    const failed = await sendConfirmation(admin, userId, email, origin)
    return failed ?? json({ ok: true })
  }

  if (body.action === 'resend') {
    if (!EMAIL_RE.test(email) || email.length > 254) return json({ error: 'invalid email' }, 400)
    // Same reply whether or not an unconfirmed account exists.
    const generic = json({ ok: true })
    const { data: userId } = await admin.rpc('auth_user_id_for_email', { _email: email })
    if (!userId) return generic
    const { data: found } = await admin.auth.admin.getUserById(userId as string)
    if (!found?.user || found.user.email_confirmed_at) return generic
    const failed = await sendConfirmation(admin, userId as string, email, origin)
    return failed ?? generic
  }

  if (body.action === 'confirm') {
    const token = typeof body.token === 'string' ? body.token : ''
    if (!token || token.length > 200) return json({ error: 'expired' }, 400)
    const { data: claimed } = await admin
      .from('email_confirmation_requests')
      .update({ used_at: new Date().toISOString() })
      .eq('token_hash', await sha256(token))
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .select('id, user_id')
      .maybeSingle()
    if (!claimed) return json({ error: 'expired' }, 400)

    const { data: updated, error: updateError } = await admin.auth.admin.updateUserById(claimed.user_id, { email_confirm: true })
    if (updateError || !updated?.user?.email) {
      await admin.from('email_confirmation_requests').update({ used_at: null }).eq('id', claimed.id)
      return json({ error: 'Could not confirm the email. Please try again.' }, 500)
    }
    await admin
      .from('email_confirmation_requests')
      .update({ used_at: new Date().toISOString() })
      .eq('user_id', claimed.user_id)
      .is('used_at', null)
    return json({ ok: true, email: updated.user.email })
  }

  return json({ error: 'Invalid request' }, 400)
})
