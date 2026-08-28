import { createClient } from 'npm:@supabase/supabase-js@2';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'You need to be signed in to redeem a code.' }, 401);

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    const user = userData?.user;
    if (userErr || !user?.email) return json({ error: 'You need to be signed in to redeem a code.' }, 401);

    let payload: { code?: unknown };
    try {
      payload = await req.json();
    } catch {
      return json({ error: 'Invalid request.' }, 400);
    }

    const raw = typeof payload.code === 'string' ? payload.code : '';
    const code = raw.trim().toUpperCase().replace(/\s+/g, '');
    if (code.length < 4 || code.length > 64) {
      return json({ error: 'Please enter a valid access code.' }, 400);
    }

    const { data: accessCode } = await admin
      .from('access_codes')
      .select('*')
      .eq('code', code)
      .maybeSingle();

    if (!accessCode) return json({ error: 'That access code is not valid.' }, 400);
    if (accessCode.revoked) return json({ error: 'That access code has been revoked.' }, 400);
    if (accessCode.expires_at && new Date(accessCode.expires_at).getTime() < Date.now()) {
      return json({ error: 'That access code has expired.' }, 400);
    }

    const { data: existing } = await admin
      .from('access_code_redemptions')
      .select('id, revoked')
      .eq('code_id', accessCode.id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing && !existing.revoked) {
      return json({ error: 'You have already redeemed this code.' }, 400);
    }
    if (existing?.revoked) {
      return json({ error: 'Access for this code was revoked for your account.' }, 400);
    }

    if (accessCode.redemption_count >= accessCode.max_redemptions) {
      return json({ error: 'That access code has already been fully used.' }, 400);
    }

    const { error: redeemErr } = await admin.from('access_code_redemptions').insert({
      code_id: accessCode.id,
      user_id: user.id,
      email: user.email,
    });
    if (redeemErr) {
      return json({ error: 'Could not redeem that code. Please try again.' }, 400);
    }

    await admin
      .from('access_codes')
      .update({ redemption_count: accessCode.redemption_count + 1 })
      .eq('id', accessCode.id);

    const subscriptionEnd = accessCode.grant_duration_days
      ? new Date(Date.now() + accessCode.grant_duration_days * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { data: existingSub } = await admin
      .from('subscribers')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    const subRow = {
      user_id: user.id,
      email: user.email,
      subscribed: true,
      subscription_tier: 'Premium Annual',
      subscription_end: subscriptionEnd,
      subscription_status: 'active',
      provider: 'access_code',
      updated_at: new Date().toISOString(),
    };

    if (existingSub) {
      await admin.from('subscribers').update(subRow).eq('user_id', user.id);
    } else {
      await admin.from('subscribers').insert(subRow);
    }

    return json({
      success: true,
      subscription_tier: subRow.subscription_tier,
      subscription_end: subscriptionEnd,
    });
  } catch (error) {
    console.error('[REDEEM-ACCESS-CODE]', error);
    return json({ error: 'Something went wrong redeeming that code.' }, 500);
  }
});
