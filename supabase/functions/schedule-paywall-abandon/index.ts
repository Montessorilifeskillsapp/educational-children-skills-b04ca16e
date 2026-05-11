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
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const token = authHeader.replace(/^Bearer\s+/i, '')
    const { data: { user }, error: userErr } = await supabase.auth.getUser(token)
    if (userErr || !user?.email) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If already a subscriber, nothing to do.
    const { data: sub } = await supabase
      .from('subscribers')
      .select('subscribed')
      .eq('user_id', user.id)
      .maybeSingle()
    if (sub?.subscribed) {
      return new Response(JSON.stringify({ scheduled: false, reason: 'already_subscribed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const sendAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    // ON CONFLICT (user_id, template_name) DO NOTHING — only first paywall view enrolls
    const { error } = await supabase.from('email_schedule').upsert(
      {
        user_id: user.id,
        email: user.email,
        template_name: 'paywall-abandon',
        send_at: sendAt,
      },
      { onConflict: 'user_id,template_name', ignoreDuplicates: true },
    )

    if (error) throw new Error(error.message)

    return new Response(JSON.stringify({ scheduled: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
