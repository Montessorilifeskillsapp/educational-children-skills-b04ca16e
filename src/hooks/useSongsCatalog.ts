import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase.functions.invoke('song-playback-url', { body: {} });
    if (error) {
      setState({ loading: false, error: error.message, purchased: false, songs: [] });
      return;
    }
    const payload = data as { purchased?: boolean; songs?: SongTrack[] };
    setState({
      loading: false,
      error: null,
      purchased: Boolean(payload.purchased),
      songs: payload.songs ?? [],
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
