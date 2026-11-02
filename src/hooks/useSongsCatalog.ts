import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { songCoverFor } from '@/lib/songCovers';
import { localMediaUrl, savedMedia } from '@/lib/offlineMedia';

/** Songs saved on this device, rebuilt into a playable list when there is no connection. */
async function offlineSongs(): Promise<SongTrack[]> {
  const saved = savedMedia('song');
  const tracks = await Promise.all(saved.map(async (m) => {
    const url = await localMediaUrl('song', m.id);
    const meta = (m.meta ?? {}) as { description?: string | null; sort_order?: number; preview_start_seconds?: number };
    return url ? { id: m.id, title: m.title ?? 'Song', description: meta.description ?? null, sort_order: meta.sort_order ?? 0,
      duration_seconds: m.durationSeconds ?? null, preview_start_seconds: meta.preview_start_seconds ?? 0,
      coverUrl: songCoverFor(m.title ?? ''), previewUrl: url, fullUrl: url, downloadUrl: null } as SongTrack : null;
  }));
  return tracks.filter((t): t is SongTrack => !!t).sort((a, b) => a.sort_order - b.sort_order);
}

export interface SongTrack {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
  duration_seconds: number | null;
  preview_start_seconds: number;
  coverUrl: string | null;
  previewUrl: string | null;
  fullUrl: string | null;
  downloadUrl?: string | null;
}

interface CatalogState {
  loading: boolean;
  error: string | null;
  purchased: boolean;
  songs: SongTrack[];
}

export function useSongsCatalog() {
  const [state, setState] = useState<CatalogState>({ loading: true, error: null, purchased: false, songs: [] });

  const reload = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const fallback = async (message: string) => {
      const local = await offlineSongs();
      setState(local.length ? { loading: false, error: null, purchased: true, songs: local } : { loading: false, error: message, purchased: false, songs: [] });
    };
    if (typeof navigator !== 'undefined' && !navigator.onLine) { await fallback('You are offline.'); return; }
    const { data, error } = await supabase.functions.invoke('song-playback-url', { body: {} }).catch((e) => ({ data: null, error: e as Error }));
    if (error) { await fallback(error.message); return; }
    const payload = data as { purchased?: boolean; songs?: SongTrack[] };
    setState({
      loading: false,
      error: null,
      purchased: Boolean(payload.purchased),
      songs: await Promise.all((payload.songs ?? []).map(async (s) => {
        const local = payload.purchased ? await localMediaUrl('song', s.id) : null;
        return { ...s, fullUrl: local ?? s.fullUrl, coverUrl: s.coverUrl ?? songCoverFor(s.title) };
      })),
    });
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { ...state, reload };
}

// Lightweight check: does the collection have any active songs (and does this
// visitor own it)? Used by the dashboard and shop teasers.
export function useSongsAvailable() {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.functions
      .invoke('song-playback-url', { body: { summary: true } })
      .then(({ data }) => {
        if (cancelled) return;
        const payload = data as { purchased?: boolean; count?: number } | null;
        setAvailable((payload?.count ?? 0) > 0);
        setPurchased(Boolean(payload?.purchased));
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { available, purchased };
}
