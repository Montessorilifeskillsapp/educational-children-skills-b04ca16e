import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { localMediaUrl, markAccessVerified, offlineAccessFresh, revokeOfflineMedia, savedMedia } from '@/lib/offlineMedia';

export interface ActivityVideoState {
  exists: boolean;
  locked: boolean;
  reason?: 'signed_out' | 'not_subscribed';
  url: string | null;
  thumbnailUrl: string | null;
  title: string | null;
  durationSeconds: number | null;
}

const emptyState: ActivityVideoState = {
  exists: false,
  locked: true,
  url: null,
  thumbnailUrl: null,
  title: null,
  durationSeconds: null,
};

export const useActivityVideo = (skillId: string) => {
  const [state, setState] = useState<ActivityVideoState>(emptyState);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!skillId) return;
    setLoading(true);
    // A copy saved on this device plays first, with or without internet.
    // Offline copies only play while the server confirmed access recently.
    const local = offlineAccessFresh('video') ? await localMediaUrl('video', skillId) : null;
    const saved = savedMedia('video').find((m) => m.id === skillId);
    if (local && (!navigator.onLine)) {
      setState({ exists: true, locked: false, url: local, thumbnailUrl: null, title: saved?.title ?? null, durationSeconds: saved?.durationSeconds ?? null });
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke('video-playback-url', {
        body: { skill_id: skillId },
      });
      if (error) throw error;
      if (data?.exists && !data?.locked) markAccessVerified('video');
      if (data?.locked && data?.reason === 'not_subscribed') void revokeOfflineMedia('video');
      setState({
        exists: Boolean(data?.exists),
        locked: Boolean(data?.locked),
        reason: data?.reason,
        url: (!data?.locked && local) ? local : data?.url ?? null,
        thumbnailUrl: data?.thumbnailUrl ?? null,
        title: data?.title ?? null,
        durationSeconds: data?.duration_seconds ?? null,
      });
    } catch {
      setState(local
        ? { exists: true, locked: false, url: local, thumbnailUrl: null, title: saved?.title ?? null, durationSeconds: saved?.durationSeconds ?? null }
        : emptyState);
    } finally {
      setLoading(false);
    }
  }, [skillId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, loading, reload: load };
};

export default useActivityVideo;
