// Registers this device for push notifications (native app or browser) and
// stores the token on the server.
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

export type PushResult =
  | { status: 'registered' }
  | { status: 'not-configured' | 'unsupported' | 'open-in-new-tab' | 'denied' | 'error'; message?: string };

const save = async (token: string, platform: 'ios' | 'android' | 'web') => {
  const { error } = await supabase.functions.invoke('dashboard-data', { body: { action: 'push_register', token, platform } });
  if (error) throw error;
};

async function enableNative(): Promise<PushResult> {
  const { PushNotifications } = await import('@capacitor/push-notifications');
  let perm = await PushNotifications.checkPermissions();
  if (perm.receive !== 'granted') perm = await PushNotifications.requestPermissions();
  if (perm.receive !== 'granted') return { status: 'denied' };
  return new Promise<PushResult>((resolve) => {
    PushNotifications.addListener('registration', async (t) => {
      try { await save(t.value, Capacitor.getPlatform() as 'ios' | 'android'); resolve({ status: 'registered' }); }
      catch (e) { resolve({ status: 'error', message: String(e) }); }
    });
    PushNotifications.addListener('registrationError', (e) => resolve({ status: 'error', message: e.error }));
    PushNotifications.register();
  });
}

async function enableWeb(): Promise<PushResult> {
  const appId = import.meta.env.VITE_FIREBASE_APP_ID as string | undefined;
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined;
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_WEB_API_KEY as string | undefined,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
    appId,
    messagingSenderId: appId?.split(':')[1] ?? '',
  };
  if (!config.apiKey || !config.projectId || !appId || !vapidKey) return { status: 'not-configured' };
  const { isSupported, getMessaging, getToken } = await import('firebase/messaging');
  const { initializeApp, getApps } = await import('firebase/app');
  if (!('Notification' in window) || !(await isSupported())) return { status: 'unsupported' };
  if (window.top !== window.self) return { status: 'open-in-new-tab' };
  const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
  if (permission !== 'granted') return { status: 'denied' };
  const query = new URLSearchParams(config as Record<string, string>).toString();
  const reg = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?${query}`);
  const app = getApps()[0] ?? initializeApp(config as Record<string, string>);
  const token = await getToken(getMessaging(app), { vapidKey, serviceWorkerRegistration: reg });
  if (!token) return { status: 'denied' };
  await save(token, 'web');
  return { status: 'registered' };
}

export async function enablePush(): Promise<PushResult> {
  try {
    return Capacitor.isNativePlatform() ? await enableNative() : await enableWeb();
  } catch (e) {
    return { status: 'error', message: e instanceof Error ? e.message : String(e) };
  }
}

export const pushMessage: Record<PushResult['status'], string> = {
  registered: 'Push notifications are on for this device.',
  'not-configured': 'Browser push is not set up yet. It works in the phone app; browser push needs a final setup step.',
  unsupported: 'This browser does not support push notifications.',
  'open-in-new-tab': 'Open the app in its own browser tab to turn on push notifications.',
  denied: 'Notifications are blocked. Allow them in your browser or phone settings, then try again.',
  error: 'Could not turn on push notifications. Please try again.',
};
