import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const AMAZON_AFFILIATE_TAG = 'kerryhoward-20';

function hasAffiliateTag(url: string) {
  try {
    const u = new URL(url);
    return u.searchParams.get('tag') === AMAZON_AFFILIATE_TAG;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    const { data: userData } = await admin.auth.getUser(authHeader.replace('Bearer ', ''));
    const user = userData?.user;
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const { data: isAdmin } = await admin.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!isAdmin) return json({ error: 'Forbidden' }, 403);

    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const action = String(body.action ?? 'list');

    if (action === 'list') {
      const { data: links, error } = await admin
        .from('material_links')
        .select('*')
        .order('material_key', { ascending: true });
      if (error) return json({ error: error.message }, 400);
      return json({ links: links ?? [] });
    }

    if (action === 'delete') {
      const key = String(body.material_key ?? '');
      if (!key) return json({ error: 'material_key is required' }, 400);
      const { error } = await admin.from('material_links').delete().eq('material_key', key);
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    if (action === 'upsert') {
      const rawKey = String(body.material_key ?? '');
      const displayName = String(body.display_name ?? '').trim();
      const amazonUrl = String(body.amazon_url ?? '').trim();
      const notes = String(body.notes ?? '').trim();
      const active = body.active === true || body.active === 'true';

      if (!rawKey) return json({ error: 'material_key is required' }, 400);

      const normalizedKey = rawKey
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (amazonUrl && amazonUrl.includes('amazon') && hasAffiliateTag(amazonUrl)) {
        return json({ error: 'URL must not include an affiliate tag' }, 400);
      }

      const { error } = await admin.from('material_links').upsert(
        {
          material_key: normalizedKey,
          display_name: displayName,
          amazon_url: amazonUrl,
          notes,
          active,
        },
        { onConflict: 'material_key' }
      );

      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    return json({ error: 'Unknown action' }, 400);
  } catch (err: any) {
    return json({ error: err.message || 'Internal error' }, 500);
  }
});
