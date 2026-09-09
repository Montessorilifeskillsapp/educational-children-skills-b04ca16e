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

const BUCKET = 'activity-videos';
const SIGNED_URL_TTL = 60 * 60; // 1 hour

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const skillId = String(body.skill_id ?? '').trim();
    if (!skillId) return json({ error: 'skill_id is required' }, 400);

    const { data: video, error } = await admin
      .from('activity_videos')
      .select('skill_id, title, storage_path, thumbnail_path, duration_seconds, active, free_preview')
      .eq('skill_id', skillId)
      .eq('active', true)
      .maybeSingle();

    if (error) return json({ error: error.message }, 400);
    if (!video) return json({ exists: false }, 200);

    // Thumbnail is safe to hand out regardless of entitlement.
    let thumbnailUrl: string | null = null;
    if (video.thumbnail_path) {
      const { data: thumb } = await admin.storage
        .from(BUCKET)
        .createSignedUrl(video.thumbnail_path, SIGNED_URL_TTL);
      thumbnailUrl = thumb?.signedUrl ?? null;
    }

    const meta = {
      exists: true,
      title: video.title,
      duration_seconds: video.duration_seconds,
      thumbnailUrl,
    };

    if (video.free_preview) {
      const { data: signed, error: signErr } = await admin.storage
        .from(BUCKET)
        .createSignedUrl(video.storage_path, SIGNED_URL_TTL);
      if (signErr) return json({ error: signErr.message }, 400);
      return json({ ...meta, locked: false, url: signed?.signedUrl ?? null });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ ...meta, locked: true, reason: 'signed_out' });

    const { data: userData } = await admin.auth.getUser(authHeader.replace('Bearer ', ''));
    const user = userData?.user;
    if (!user) return json({ ...meta, locked: true, reason: 'signed_out' });

    const { data: isAdmin } = await admin.rpc('has_role', { _user_id: user.id, _role: 'admin' });

    const { data: subscriber } = await admin
      .from('subscribers')
      .select('subscribed, subscription_end')
      .eq('user_id', user.id)
      .maybeSingle();

    const notExpired = subscriber?.subscription_end
      ? new Date(subscriber.subscription_end).getTime() > Date.now()
      : true;
    const entitled = Boolean(isAdmin) || (Boolean(subscriber?.subscribed) && notExpired);

    if (!entitled) return json({ ...meta, locked: true, reason: 'not_subscribed' });

    const { data: signed, error: signErr } = await admin.storage
      .from(BUCKET)
      .createSignedUrl(video.storage_path, SIGNED_URL_TTL);
    if (signErr) return json({ error: signErr.message }, 400);

    return json({ ...meta, locked: false, url: signed?.signedUrl ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json({ error: message }, 500);
  }
});
