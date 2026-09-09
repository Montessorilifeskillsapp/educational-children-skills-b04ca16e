import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    try {
      const { data, error } = await supabase.functions.invoke('video-playback-url', {
        body: { skill_id: skillId },
      });
      if (error) throw error;
      setState({
        exists: Boolean(data?.exists),
        locked: Boolean(data?.locked),
        reason: data?.reason,
        url: data?.url ?? null,
        thumbnailUrl: data?.thumbnailUrl ?? null,
        title: data?.title ?? null,
        durationSeconds: data?.duration_seconds ?? null,
      });
    } catch {
      setState(emptyState);
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
