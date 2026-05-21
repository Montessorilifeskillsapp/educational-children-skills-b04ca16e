import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// In-memory rate limit per warm instance (best-effort)
const hits = new Map<string, { count: number; reset: number }>()
function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  const r = hits.get(key)
  if (!r || r.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs })
    return true
  }
  if (r.count >= limit) return false
  r.count++
  return true
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'rate_limited' }), {
      status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: any
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const emailRaw = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!emailRaw || emailRaw.length > 254 || !EMAIL_RE.test(emailRaw)) {
    return new Response(JSON.stringify({ error: 'invalid_email' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const utm = (body?.utm && typeof body.utm === 'object') ? body.utm : null
  const source = 'week-1-starter-pdf'

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

  // Insert (idempotent on unique (email, source))
  const { error: insertError } = await supabase
    .from('leads')
    .insert({ email: emailRaw, source, utm })

  // 23505 = unique_violation — treat as success (already on the list)
  if (insertError && insertError.code !== '23505') {
    console.error('lead insert failed', insertError)
    return new Response(JSON.stringify({ error: 'server_error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Fire-and-await transactional email (idempotency key tied to email+source)
  const idempotencyKey = `lead-magnet-${source}-${emailRaw}`
  const { error: emailError } = await supabase.functions.invoke('send-transactional-email', {
    body: {
      templateName: 'lead-magnet-week-1',
      recipientEmail: emailRaw,
      idempotencyKey,
    },
  })

  if (emailError) {
    console.error('send-transactional-email invoke failed', emailError)
    // Still return success — the lead is captured; email will be retried via queue/manual resend.
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
