import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const BUCKET = 'songs';

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

    const { data: userData } = await admin.auth.getUser(authHeader.replace(/^Bearer\s+/i, ''));
    const user = userData?.user;
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const { data: isAdmin } = await admin.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!isAdmin) return json({ error: 'Forbidden' }, 403);

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const action = String(body.action ?? 'list');

    if (action === 'list') {
      const { data, error } = await admin
        .from('songs')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) return json({ error: error.message }, 400);
      return json({ songs: data ?? [] });
    }

    if (action === 'purchases') {
      const { data, error } = await admin
        .from('song_purchases')
        .select('user_id, email, product, stripe_session_id, purchased_at')
        .order('purchased_at', { ascending: false })
        .limit(10000);
      if (error) return json({ error: error.message }, 400);
      return json({ purchases: data ?? [] });
    }

    if (action === 'upload-url') {
      const kind = String(body.kind ?? 'full'); // full | preview | cover
      const extension = safeSegment(String(body.extension ?? (kind === 'cover' ? 'jpg' : kind === 'preview' ? 'wav' : 'mp3')));
      const folder = kind === 'cover' ? 'covers' : kind === 'preview' ? 'previews' : 'tracks';
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

      const { data, error } = await admin.storage.from(BUCKET).createSignedUploadUrl(path);
      if (error) return json({ error: error.message }, 400);
      return json({ path, token: data.token, signedUrl: data.signedUrl, bucket: BUCKET });
    }

    if (action === 'upsert') {
      const title = String(body.title ?? '').trim();
      const storagePath = String(body.storage_path ?? '').trim();
      if (!title) return json({ error: 'title is required' }, 400);
      if (!storagePath) return json({ error: 'storage_path is required' }, 400);

      const row = {
        id: body.id ? String(body.id) : undefined,
        title,
        description: body.description ? String(body.description) : null,
        sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0,
        storage_path: storagePath,
        preview_path: body.preview_path ? String(body.preview_path) : null,
        preview_start_seconds: Number.isFinite(Number(body.preview_start_seconds)) ? Number(body.preview_start_seconds) : 0,
        cover_path: body.cover_path ? String(body.cover_path) : null,
        duration_seconds: body.duration_seconds ? Number(body.duration_seconds) : null,
        active: body.active !== false,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await admin.from('songs').upsert(row).select().maybeSingle();
      if (error) return json({ error: error.message }, 400);
      return json({ song: data });
    }

    if (action === 'delete') {
      const id = String(body.id ?? '').trim();
      if (!id) return json({ error: 'id is required' }, 400);

      const { data: existing } = await admin
        .from('songs')
        .select('storage_path, preview_path, cover_path')
        .eq('id', id)
        .maybeSingle();

      const paths = [existing?.storage_path, existing?.preview_path, existing?.cover_path].filter(Boolean) as string[];
      if (paths.length) await admin.storage.from(BUCKET).remove(paths);

      const { error } = await admin.from('songs').delete().eq('id', id);
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    return json({ error: `Unknown action: ${action}` }, 400);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
