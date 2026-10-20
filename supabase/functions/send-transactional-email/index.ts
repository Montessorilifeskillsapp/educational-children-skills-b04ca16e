import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { TEMPLATES } from '../_shared/transactional-email-templates/registry.ts'

// Emails are delivered directly through the connected Gmail account
// (montessorilifeskills@gmail.com) via the Lovable connector gateway.
const GMAIL_SEND_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send'
const FROM_NAME = 'Montessori Life Skills'
const FROM_ADDRESS = 'montessorilifeskills@gmail.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

// Only other edge functions (service role) may send.
function getJwtRole(authHeader: string | null): string | null {
  if (!authHeader) return null
  const parts = authHeader.replace(/^Bearer\s+/i, '').split('.')
  if (parts.length !== 3) return null
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    return typeof payload.role === 'string' ? payload.role : null
  } catch {
    return null
  }
}

const b64 = (s: string) => btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(''))
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`)
const EMAIL_RE = /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/

function buildRaw(to: string, subject: string, html: string, text: string): string {
  const boundary = `b_${crypto.randomUUID()}`
  const msg = [
    `From: ${header(FROM_NAME)} <${FROM_ADDRESS}>`,
    `To: ${to}`,
    `Reply-To: ${FROM_ADDRESS}`,
    `Subject: ${header(subject)}`,
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
  return b64(msg).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (getJwtRole(req.headers.get('Authorization')) !== 'service_role') return json({ error: 'forbidden' }, 403)

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY')
  if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) {
    console.error('Email sending is not configured (missing Gmail connection)')
    return json({ error: 'Email sending is not configured' }, 500)
  }

  let body: Record<string, any>
  try { body = await req.json() } catch { return json({ error: 'Invalid JSON in request body' }, 400) }

  const templateName: string | undefined = body.templateName || body.template_name
  const templateData: Record<string, any> = body.templateData && typeof body.templateData === 'object' ? body.templateData : {}
  if (!templateName) return json({ error: 'templateName is required' }, 400)

  const template = TEMPLATES[templateName]
  if (!template) return json({ error: `Template '${templateName}' not found` }, 404)

  const recipient: string = String(template.to || body.recipientEmail || body.recipient_email || '').trim()
  if (!EMAIL_RE.test(recipient)) return json({ error: 'A valid recipientEmail is required' }, 400)

  // Respect unsubscribes when the suppression list is available.
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (supabaseUrl && serviceKey) {
    const { data: suppressed, error } = await createClient(supabaseUrl, serviceKey)
      .from('suppressed_emails').select('id').eq('email', recipient.toLowerCase()).maybeSingle()
    if (error) console.warn('Suppression check unavailable', error.message)
    if (suppressed) return json({ success: false, reason: 'email_suppressed' })
  }

  const element = React.createElement(template.component, templateData)
  const html = await renderAsync(element)
  const text = await renderAsync(element, { plainText: true })
  const subject = typeof template.subject === 'function' ? template.subject(templateData) : template.subject

  const res = await fetch(GMAIL_SEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
    },
    body: JSON.stringify({ raw: buildRaw(recipient, subject, html, text) }),
  })

  if (!res.ok) {
    const details = await res.text()
    console.error(`Gmail send failed [${res.status}]: ${details}`)
    return json({ error: 'Email could not be sent', status: res.status, details }, 502)
  }

  const sent = await res.json().catch(() => ({}))
  console.log('Email sent', { templateName, recipient, id: sent?.id })
  // `queued` kept for existing callers; Gmail accepted the message for delivery.
  return json({ success: true, queued: true, sent: true, id: sent?.id ?? null })
})
