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

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const generateCode = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]);
  return `MLS-${chars.slice(0, 4).join('')}-${chars.slice(4, 8).join('')}`;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const { data: userData } = await admin.auth.getUser(authHeader.replace('Bearer ', ''));
    const user = userData?.user;
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const { data: isAdmin } = await admin.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!isAdmin) return json({ error: 'Forbidden' }, 403);

    const action = req.method === 'GET'
      ? 'list'
      : ((await req.json().catch(() => ({}))) as Record<string, unknown>);

    // For POST we re-read the parsed body
    const body = typeof action === 'string' ? {} : action;
    const op = typeof action === 'string' ? 'list' : String(body.action ?? 'list');

    if (op === 'list') {
      const { data: codes, error } = await admin
        .from('access_codes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return json({ error: error.message }, 400);

      const { data: redemptions } = await admin
        .from('access_code_redemptions')
        .select('id, code_id, email, redeemed_at, revoked')
        .order('redeemed_at', { ascending: false });

      return json({ codes: codes ?? [], redemptions: redemptions ?? [] });
    }

    if (op === 'create') {
      const label = typeof body.label === 'string' ? body.label.trim().slice(0, 200) : null;
      const maxRedemptions = Number.isFinite(Number(body.max_redemptions))
        ? Math.min(Math.max(Math.trunc(Number(body.max_redemptions)), 1), 10000)
        : 1;
      const grantDurationDays =
        body.grant_duration_days === null || body.grant_duration_days === undefined || body.grant_duration_days === ''
          ? null
          : Math.min(Math.max(Math.trunc(Number(body.grant_duration_days)), 1), 3650);
      const expiresAt =
        typeof body.expires_at === 'string' && body.expires_at ? new Date(body.expires_at).toISOString() : null;

      let created = null;
      for (let attempt = 0; attempt < 5 && !created; attempt++) {
        const { data, error } = await admin
          .from('access_codes')
          .insert({
            code: generateCode(),
            label,
            max_redemptions: maxRedemptions,
            grant_duration_days: grantDurationDays,
            expires_at: expiresAt,
            created_by: user.id,
          })
          .select()
          .maybeSingle();
        if (!error) created = data;
      }

      if (!created) return json({ error: 'Could not create a code. Please try again.' }, 400);
      return json({ code: created });
    }

    if (op === 'revoke_code') {
      const id = String(body.id ?? '');
      if (!id) return json({ error: 'Missing code id' }, 400);
      const revoked = body.revoked === false ? false : true;
      const { error } = await admin.from('access_codes').update({ revoked }).eq('id', id);
      if (error) return json({ error: error.message }, 400);

      if (revoked) {
        const { data: redemptions } = await admin
          .from('access_code_redemptions')
          .select('user_id')
          .eq('code_id', id)
          .eq('revoked', false);
        for (const r of redemptions ?? []) {
          await admin
            .from('subscribers')
            .update({ subscribed: false, subscription_status: 'canceled', updated_at: new Date().toISOString() })
            .eq('user_id', r.user_id)
            .eq('provider', 'access_code');
        }
        await admin.from('access_code_redemptions').update({ revoked: true }).eq('code_id', id);
      }

      return json({ success: true });
    }

    if (op === 'revoke_redemption') {
      const id = String(body.id ?? '');
      if (!id) return json({ error: 'Missing redemption id' }, 400);

      const { data: redemption } = await admin
        .from('access_code_redemptions')
        .select('user_id')
        .eq('id', id)
        .maybeSingle();
      if (!redemption) return json({ error: 'Redemption not found' }, 404);

      await admin.from('access_code_redemptions').update({ revoked: true }).eq('id', id);
      await admin
        .from('subscribers')
        .update({ subscribed: false, subscription_status: 'canceled', updated_at: new Date().toISOString() })
        .eq('user_id', redemption.user_id)
        .eq('provider', 'access_code');

      return json({ success: true });
    }

    return json({ error: 'Unknown action' }, 400);
  } catch (error) {
    console.error('[ADMIN-ACCESS-CODES]', error);
    return json({ error: 'Unexpected error' }, 500);
  }
});
