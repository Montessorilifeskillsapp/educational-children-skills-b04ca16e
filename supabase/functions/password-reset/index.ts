import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

// App-owned password reset. Emails go out through the connected Gmail account, so
// resets never depend on the auth service's own email sender or its hourly cap.
// A reset link never signs anyone in: it can only set a new password, after which
// every existing session for that account is ended and the person signs in fresh.
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
const LINK_LIFETIME_MS = 60 * 60 * 1000
const MAX_REQUESTS_PER_HOUR = 5
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

function resetEmail(to: string, link: string) {
  const subject = 'Reset your Montessori Life Skills password'
  const text = [
    'Hello,',
    '',
    'We received a request to reset the password for your Montessori Life Skills account.',
    'Open this link to choose a new password (it works once and expires in 1 hour):',
    '',
    link,
    '',
    "If you didn't ask for this, you can ignore this email. Your password will stay the same.",
    '',
    'Montessori Life Skills',
  ].join('\r\n')
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#3a3029">
<div style="max-width:520px;margin:0 auto;padding:32px 24px">
<h1 style="font-size:20px;margin:0 0 16px">Reset your password</h1>
<p style="font-size:15px;line-height:1.5">We received a request to reset the password for your Montessori Life Skills account.</p>
<p style="margin:28px 0"><a href="${link}" style="background:#1f7a72;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block">Choose a new password</a></p>
<p style="font-size:13px;line-height:1.5;color:#6b5f55">This link works once and expires in 1 hour. If the button doesn't work, copy this address into your browser:<br><span style="word-break:break-all">${link}</span></p>
<p style="font-size:13px;line-height:1.5;color:#6b5f55">If you didn't ask for this, you can ignore this email. Your password will stay the same.</p>
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
  const allowedKeys = new Set(['action', 'email', 'origin', 'token', 'password'])
  if (!body || typeof body !== 'object' || Object.keys(body).some((k) => !allowedKeys.has(k))) {
    return json({ error: 'Invalid request' }, 400)
  }

  if (body.action === 'request') {
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    if (!EMAIL_RE.test(email) || email.length > 254) return json({ error: 'invalid email' }, 400)
    const origin = typeof body.origin === 'string' && ALLOWED_ORIGINS.has(body.origin) ? body.origin : DEFAULT_ORIGIN

    // Same reply whether or not the address has an account, so the form can't reveal who signed up.
    const generic = json({ ok: true })
    const { data: userId, error: lookupError } = await admin.rpc('auth_user_id_for_email', { _email: email })
    if (lookupError) {
      console.error('password-reset lookup failed', lookupError.message)
      return json({ error: 'Could not send the reset email. Please try again.' }, 500)
    }
    if (!userId) return generic

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await admin
      .from('password_reset_requests')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', since)
    if ((count ?? 0) >= MAX_REQUESTS_PER_HOUR) return json({ error: 'rate limit' }, 429)

    const token = b64url(crypto.getRandomValues(new Uint8Array(32)))
    const { error: insertError } = await admin.from('password_reset_requests').insert({
      user_id: userId,
      token_hash: await sha256(token),
      expires_at: new Date(Date.now() + LINK_LIFETIME_MS).toISOString(),
    })
    if (insertError) {
      console.error('password-reset insert failed', insertError.message)
      return json({ error: 'Could not send the reset email. Please try again.' }, 500)
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY')
    if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) return json({ error: 'Email sending not configured' }, 500)
    const link = `${origin}/auth?reset_token=${encodeURIComponent(token)}`
    const res = await fetch(GMAIL_SEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: resetEmail(email, link) }),
    })
    if (!res.ok) {
      console.error(`password-reset email failed [${res.status}]: ${await res.text()}`)
      return json({ error: 'Could not send the reset email. Please try again.' }, 502)
    }
    return generic
  }

  if (body.action === 'complete') {
    const token = typeof body.token === 'string' ? body.token : ''
    const password = typeof body.password === 'string' ? body.password : ''
    if (!token || token.length > 200) return json({ error: 'expired' }, 400)
    if (password.length < 6 || password.length > 72) return json({ error: 'Password should be at least 6 characters.' }, 400)

    const tokenHash = await sha256(token)
    // Claim the link first so it can only ever be used once.
    const { data: claimed } = await admin
      .from('password_reset_requests')
      .update({ used_at: new Date().toISOString() })
      .eq('token_hash', tokenHash)
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .select('id, user_id')
      .maybeSingle()
    if (!claimed) return json({ error: 'expired' }, 400)

    const { data: updated, error: updateError } = await admin.auth.admin.updateUserById(claimed.user_id, {
      password,
      // Opening the emailed link proves the person owns this address.
      email_confirm: true,
    })
    if (updateError || !updated?.user?.email) {
      // A rejected password (too weak, leaked) leaves the link usable for another try.
      await admin.from('password_reset_requests').update({ used_at: null }).eq('id', claimed.id)
      return json({ error: updateError?.message ?? 'Could not save the new password.' }, 400)
    }

    await admin
      .from('password_reset_requests')
      .update({ used_at: new Date().toISOString() })
      .eq('user_id', claimed.user_id)
      .is('used_at', null)
    const { error: revokeError } = await admin.rpc('revoke_all_user_sessions', { _user_id: claimed.user_id })
    if (revokeError) console.error('password-reset session revoke failed', revokeError.message)

    return json({ ok: true, email: updated.user.email })
  }

  return json({ error: 'Invalid request' }, 400)
})
