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

/** Reads the main product photo from an Amazon product page. Returns null if blocked or not found. */
async function fetchAmazonImage(pageUrl: string): Promise<string | null> {
  try {
    const u = new URL(pageUrl);
    if (!/amazon\./i.test(u.hostname)) return null;
    const asin = u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i)?.[1];
    const target = asin ? `${u.origin}/dp/${asin}` : pageUrl;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(target, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        Accept: 'text/html',
      },
    }).finally(() => clearTimeout(t));
    if (!res.ok) return null;
    const html = await res.text();
    const tag = html.match(/<img[^>]*id="landingImage"[^>]*>/i)?.[0];
    const fromTag = tag?.match(/data-old-hires="(https:[^"]+)"/i)?.[1] || tag?.match(/\ssrc="(https:[^"]+)"/i)?.[1];
    const found = fromTag
      || html.match(/"hiRes":"(https:[^"]+)"/)?.[1]
      || html.match(/id="landingImage"[^>]*?data-a-dynamic-image="\{&quot;(https:[^&]+)&quot;/i)?.[1]
      || html.match(/property="og:image"\s+content="(https:[^"]+)"/i)?.[1];
    return found && /media-amazon\.com|ssl-images-amazon\.com/.test(found) ? found : null;
  } catch {
    return null;
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

    if (action === 'set_image') {
      const key = String(body.material_key ?? '');
      const url = String(body.image_url ?? '').trim();
      if (!key) return json({ error: 'material_key is required' }, 400);
      if (url && !/^https:\/\/[^\s]+$/i.test(url)) return json({ error: 'Photo address must start with https://' }, 400);
      const { error } = await admin.from('material_links').update({ image_url: url || null }).eq('material_key', key);
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    if (action === 'fetch_images') {
      const keys = Array.isArray(body.material_keys) ? body.material_keys.map(String).slice(0, 60) : [];
      let query = admin.from('material_links').select('material_key, amazon_url, image_url').eq('active', true);
      if (keys.length) query = query.in('material_key', keys);
      const { data: rows, error } = await query;
      if (error) return json({ error: error.message }, 400);
      const targets = (rows ?? []).filter((r) => r.amazon_url && (keys.length || !r.image_url));
      const results: Record<string, string | null> = {};
      await Promise.all(targets.map(async (r) => {
        const img = await fetchAmazonImage(r.amazon_url as string);
        results[r.material_key] = img;
        if (img) await admin.from('material_links').update({ image_url: img }).eq('material_key', r.material_key);
      }));
      return json({ results });
    }

    if (action === 'upsert') {
      const rawKey = String(body.material_key ?? '');
      const displayName = String(body.display_name ?? '').trim();
      const amazonUrl = String(body.amazon_url ?? '').trim();
      const notes = String(body.notes ?? '').trim();
      const affiliateTag = String(body.affiliate_tag ?? '').trim();
      const vendor = String(body.vendor ?? '').trim();
      const homeAlternatives = String(body.home_alternatives ?? '').trim().slice(0, 4000);
      const active = body.active === true || body.active === 'true';

      if (!rawKey) return json({ error: 'material_key is required' }, 400);

      const normalizedKey = rawKey
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (affiliateTag && affiliateTag.length > 120) {
        return json({ error: 'affiliate_tag is too long' }, 400);
      }
      if (affiliateTag && /[?&#\s]/.test(affiliateTag)) {
        return json({ error: 'affiliate_tag must be a value or a single key=value pair' }, 400);
      }
      if (vendor && vendor.length > 60) {
        return json({ error: 'vendor is too long' }, 400);
      }
      if (!affiliateTag && amazonUrl && amazonUrl.includes('amazon') && hasAffiliateTag(amazonUrl)) {
        return json({ error: 'URL must not include an affiliate tag' }, 400);
      }

      const { error } = await admin.from('material_links').upsert(
        {
          material_key: normalizedKey,
          display_name: displayName,
          amazon_url: amazonUrl,
          notes,
          active,
          affiliate_tag: affiliateTag || null,
          vendor: vendor || null,
          home_alternatives: homeAlternatives || null,
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
