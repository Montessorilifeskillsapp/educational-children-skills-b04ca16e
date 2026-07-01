import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const email = 'applereview2@montessorilifeskillsapp.com';
  const password = 'AppleReview2026!';

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Apple Reviewer 2' },
  });

  if (createErr && !`${createErr.message}`.toLowerCase().includes('already')) {
    return new Response(JSON.stringify({ error: createErr.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let userId = created?.user?.id;
  if (!userId) {
    const { data: list } = await admin.auth.admin.listUsers();
    userId = list.users.find((u) => u.email === email)?.id;
  }

  if (userId) {
    // Grant premium access for review
    await admin.from('subscribers').upsert({
      user_id: userId,
      email,
      subscribed: true,
      subscription_tier: 'premium-yearly',
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      provider: 'manual',
    }, { onConflict: 'user_id' });
  }

  return new Response(JSON.stringify({ ok: true, email, password, userId }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
