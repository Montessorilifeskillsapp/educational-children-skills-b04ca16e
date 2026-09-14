import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { supabase } from '@/integrations/supabase/client';

export const IOS_APP_ID = '6761342547';
export const ANDROID_PACKAGE = 'com.montessorilifeskills.app';

export const IOS_STORE_URL = 'https://apps.apple.com/us/app/montessori-life-skills/id6761342547';
export const ANDROID_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.montessorilifeskills.app';

export const storeUrlForPlatform = (platform: string) =>
  platform === 'ios' ? IOS_STORE_URL : ANDROID_STORE_URL;

/** Returns true when `latest` is a higher version than `current`. */
export const isNewerVersion = (latest: string, current: string): boolean => {
  const toParts = (v: string) =>
    v
      .trim()
      .split('.')
      .map((p) => parseInt(p.replace(/\D/g, ''), 10) || 0);
  const a = toParts(latest);
  const b = toParts(current);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    if (x > y) return true;
    if (x < y) return false;
  }
  return false;
};

interface UpdateState {
  updateAvailable: boolean;
  latestVersion: string | null;
  storeUrl: string;
  dismiss: () => void;
}

export const useAppUpdateCheck = (): UpdateState => {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const platform = Capacitor.getPlatform();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let cancelled = false;

    const check = async () => {
      try {
        const info = await App.getInfo();
        const { data, error } = await supabase.functions.invoke('app-version-check', {
          body: { platform },
        });
        if (cancelled || error || !data?.version) return;

        const latest: string = data.version;
        setLatestVersion(latest);

        if (isNewerVersion(latest, info.version)) {
          setUpdateAvailable(true);
        }
      } catch {
        // Offline or function unavailable — never block the app.
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, [platform]);

  const dismiss = () => {
    setUpdateAvailable(false);
  };

  return {
    updateAvailable,
    latestVersion,
    storeUrl: storeUrlForPlatform(platform),
    dismiss,
  };
};
