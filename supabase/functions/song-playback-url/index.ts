import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const BUCKET = 'songs';
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
    const songId = typeof body.song_id === 'string' ? body.song_id : null;

    // Lightweight availability/ownership check (used by dashboard + shop teasers).
    if (body.summary === true) {
      const authHeader = req.headers.get('Authorization');
      let purchased = false;
      if (authHeader) {
        const { data: userData } = await admin.auth.getUser(authHeader.replace(/^Bearer\s+/i, ''));
        const user = userData?.user;
        if (user) {
          const { data: role } = await admin.rpc('has_role', { _user_id: user.id, _role: 'admin' });
          if (role) {
            purchased = true;
          } else {
            const { data: purchase } = await admin
              .from('song_purchases')
              .select('id')
              .eq('user_id', user.id)
              .eq('product', 'songs_bundle')
              .maybeSingle();
            purchased = Boolean(purchase);
          }
        }
      }
      const { count } = await admin
        .from('songs')
        .select('id', { count: 'exact', head: true })
        .eq('active', true);
      return json({ purchased, count: count ?? 0 });
    }


    let query = admin
      .from('songs')
      .select('id, title, description, sort_order, storage_path, preview_path, preview_start_seconds, cover_path, duration_seconds, active')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    if (songId) query = query.eq('id', songId);

    const { data: songs, error } = await query;
    if (error) return json({ error: error.message }, 400);
    if (!songs || songs.length === 0) {
      return json({ purchased: false, songs: [], ...(songId ? { exists: false } : {}) });
    }

    // Who is asking? Ownership of the full collection is required for full-track URLs.
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    let isAdmin = false;
    if (authHeader) {
      const { data: userData } = await admin.auth.getUser(authHeader.replace(/^Bearer\s+/i, ''));
      const user = userData?.user;
      if (user) {
        userId = user.id;
        const { data: role } = await admin.rpc('has_role', { _user_id: user.id, _role: 'admin' });
        isAdmin = Boolean(role);
      }
    }

    let purchased = isAdmin;
    if (!purchased && userId) {
      const { data: purchase } = await admin
        .from('song_purchases')
        .select('id')
        .eq('user_id', userId)
        .eq('product', 'songs_bundle')
        .maybeSingle();
      purchased = Boolean(purchase);
    }

    const enriched = await Promise.all(
      songs.map(async (song) => {
        let previewUrl: string | null = null;
        let coverUrl: string | null = null;
        let fullUrl: string | null = null;

        const previewPath = song.preview_path || song.storage_path;
        if (previewPath) {
          const { data } = await admin.storage.from(BUCKET).createSignedUrl(previewPath, SIGNED_URL_TTL);
          previewUrl = data?.signedUrl ?? null;
        }
        if (song.cover_path) {
          const { data } = await admin.storage.from(BUCKET).createSignedUrl(song.cover_path, SIGNED_URL_TTL);
          coverUrl = data?.signedUrl ?? null;
        }
        if (purchased && song.storage_path) {
          const { data } = await admin.storage.from(BUCKET).createSignedUrl(song.storage_path, SIGNED_URL_TTL);
          fullUrl = data?.signedUrl ?? null;
        }

        return {
          id: song.id,
          title: song.title,
          description: song.description,
          sort_order: song.sort_order,
          duration_seconds: song.duration_seconds,
          preview_start_seconds: song.preview_start_seconds,
          coverUrl,
          previewUrl,
          fullUrl,
        };
      })
    );

    return json({ purchased, songs: enriched });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
