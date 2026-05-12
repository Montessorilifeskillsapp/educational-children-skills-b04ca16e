import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// One-time bootstrap: gated behind a server-side BOOTSTRAP_SECRET so a random
// registered user cannot race-claim admin. The caller must:
//   1. Authenticate (Authorization: Bearer <user JWT>)
//   2. Provide the X-Bootstrap-Secret header matching the BOOTSTRAP_SECRET env var
// After the first admin is granted, the endpoint refuses all further requests.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const bootstrapSecret = Deno.env.get('BOOTSTRAP_SECRET')
    const provided = req.headers.get('x-bootstrap-secret')
    if (!bootstrapSecret || provided !== bootstrapSecret) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

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

    const { count, error: countErr } = await supabase
      .from('user_roles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'admin')
    if (countErr) throw new Error(countErr.message)

    if ((count ?? 0) > 0) {
      // Already bootstrapped — only an existing admin (themselves) gets a friendly OK.
      const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' })
      if (isAdmin) {
        return new Response(JSON.stringify({ ok: true, alreadyAdmin: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ error: 'admin_already_exists' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { error: insErr } = await supabase
      .from('user_roles')
      .insert({ user_id: user.id, role: 'admin' })
    if (insErr) throw new Error(insErr.message)

    return new Response(JSON.stringify({ ok: true, granted: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('admin-bootstrap error', e)
    return new Response(JSON.stringify({ error: 'internal_error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
