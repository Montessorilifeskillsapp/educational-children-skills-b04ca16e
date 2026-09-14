import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const FIREBASE_PROJECT_ID = 'kerry-s-project';
const VERSION_DOC_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/config/AppVersion`;

const DISMISS_KEY = 'app-update-dismissed-version';

export const IOS_APP_ID = '6761342547';
export const ANDROID_PACKAGE = 'com.montessorilifeskills.app';

export const storeUrlForPlatform = (platform: string) =>
  platform === 'ios'
    ? `https://apps.apple.com/app/id${IOS_APP_ID}`
    : `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

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
        const res = await fetch(VERSION_DOC_URL);
        if (!res.ok) return;
        const doc = await res.json();
        const latest: string | undefined =
          doc?.fields?.[platform]?.stringValue ?? undefined;
        if (!latest || cancelled) return;

        setLatestVersion(latest);

        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (dismissed === latest) return;

        if (isNewerVersion(latest, info.version)) {
          setUpdateAvailable(true);
        }
      } catch {
        // Offline or config unavailable — never block the app.
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, [platform]);

  const dismiss = () => {
    if (latestVersion) localStorage.setItem(DISMISS_KEY, latestVersion);
    setUpdateAvailable(false);
  };

  return {
    updateAvailable,
    latestVersion,
    storeUrl: storeUrlForPlatform(platform),
    dismiss,
  };
};
