import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    return jsonResponse({ error: 'Server configuration error' }, 500)
  }

  let body: { email?: unknown; source?: unknown; utm?: unknown }
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400)
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
    return jsonResponse({ error: 'A valid email address is required' }, 400)
  }

  const source =
    typeof body.source === 'string' && body.source.length > 0 && body.source.length <= 100
      ? body.source
      : 'exit-intent'

  let utm: Record<string, string> | null = null
  if (body.utm && typeof body.utm === 'object' && !Array.isArray(body.utm)) {
    const cleaned: Record<string, string> = {}
    for (const [key, value] of Object.entries(body.utm as Record<string, unknown>)) {
      if (
        /^utm_[a-z]+$/.test(key) &&
        typeof value === 'string' &&
        value.length > 0 &&
        value.length <= 200
      ) {
        cleaned[key] = value
      }
    }
    utm = Object.keys(cleaned).length > 0 ? cleaned : null
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Duplicate / rate guard: if this address was captured in the last hour,
  // treat it as success without inserting another row.
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { data: recent, error: recentError } = await supabase
    .from('leads')
    .select('id')
    .eq('email', email)
    .gte('created_at', oneHourAgo)
    .limit(1)

  if (recentError) {
    console.error('leads lookup failed', recentError)
    return jsonResponse({ error: 'internal_error' }, 500)
  }
  if (recent && recent.length > 0) {
    return jsonResponse({ ok: true, duplicate: true })
  }

  const { error: insertError } = await supabase
    .from('leads')
    .insert({ email, source, utm })

  if (insertError) {
    console.error('leads insert failed', insertError)
    return jsonResponse({ error: 'internal_error' }, 500)
  }

  return jsonResponse({ ok: true })
})
