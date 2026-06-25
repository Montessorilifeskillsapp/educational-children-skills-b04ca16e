import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";

/**
 * Native OAuth deep-link bridge for Supabase.
 *
 * Required Supabase setup:
 * 1) In Supabase Auth providers, set redirect URL to:
 *    com.montessorilifeskills.app://auth-callback
 * 2) Add the same URL in Supabase "Auth > URL Configuration > Redirect URLs".
 *
 * On native (Capacitor) platforms, OAuth providers return to the app via appUrlOpen.
 * This listener forwards deep-link query/hash params to /auth/callback inside the web app
 * so the existing callback page can exchange authorization code/hash for a session.
 */
export const useCapacitorAuthDeepLink = () => {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listener = CapacitorApp.addListener("appUrlOpen", async ({ url }) => {
      if (!url) return;

      let parsedUrl: URL;
      try {
        parsedUrl = new URL(url);
      } catch {
        return;
      }

      if (
        parsedUrl.protocol !== "com.montessorilifeskills.app:" ||
        parsedUrl.hostname !== "auth-callback"
      ) {
        return;
      }

      const callbackUrl = `/auth/callback${parsedUrl.search}${parsedUrl.hash}`;
      await Browser.close().catch(() => undefined);
      window.location.assign(callbackUrl);
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, []);
};
