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

function safeSegment(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/^-+|-+$/g, '');
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

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const action = String(body.action ?? 'list');

    if (action === 'list') {
      const { data, error } = await admin
        .from('activity_videos')
        .select('*')
        .order('skill_id', { ascending: true });
      if (error) return json({ error: error.message }, 400);
      return json({ videos: data ?? [] });
    }

    if (action === 'upload-url') {
      const skillId = safeSegment(String(body.skill_id ?? ''));
      const kind = String(body.kind ?? 'video');
      const extension = safeSegment(String(body.extension ?? (kind === 'thumbnail' ? 'jpg' : 'mp4')));
      if (!skillId) return json({ error: 'skill_id is required' }, 400);

      const folder = kind === 'thumbnail' ? 'thumbnails' : 'videos';
      const path = `${folder}/${skillId}-${Date.now()}.${extension}`;

      const { data, error } = await admin.storage.from(BUCKET).createSignedUploadUrl(path);
      if (error) return json({ error: error.message }, 400);
      return json({ path, token: data.token, signedUrl: data.signedUrl, bucket: BUCKET });
    }

    if (action === 'upsert') {
      const skillId = String(body.skill_id ?? '').trim();
      const storagePath = String(body.storage_path ?? '').trim();
      if (!skillId) return json({ error: 'skill_id is required' }, 400);
      if (!storagePath) return json({ error: 'storage_path is required' }, 400);

      const row = {
        skill_id: skillId,
        section_key: body.section_key ? String(body.section_key) : null,
        title: body.title ? String(body.title) : null,
        storage_path: storagePath,
        thumbnail_path: body.thumbnail_path ? String(body.thumbnail_path) : null,
        duration_seconds: body.duration_seconds ? Number(body.duration_seconds) : null,
        active: body.active !== false,
        free_preview: body.free_preview === true || body.free_preview === 'true',
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await admin
        .from('activity_videos')
        .upsert(row, { onConflict: 'skill_id' })
        .select()
        .maybeSingle();
      if (error) return json({ error: error.message }, 400);
      return json({ video: data });
    }

    if (action === 'delete') {
      const skillId = String(body.skill_id ?? '').trim();
      if (!skillId) return json({ error: 'skill_id is required' }, 400);

      const { data: existing } = await admin
        .from('activity_videos')
        .select('storage_path, thumbnail_path')
        .eq('skill_id', skillId)
        .maybeSingle();

      const paths = [existing?.storage_path, existing?.thumbnail_path].filter(Boolean) as string[];
      if (paths.length) {
        await admin.storage.from(BUCKET).remove(paths);
      }

      const { error } = await admin.from('activity_videos').delete().eq('skill_id', skillId);
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    return json({ error: `Unknown action: ${action}` }, 400);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json({ error: message }, 500);
  }
});
