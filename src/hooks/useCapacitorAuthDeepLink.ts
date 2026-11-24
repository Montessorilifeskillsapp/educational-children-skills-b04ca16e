import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";

/**
 * Native OAuth deep-link bridge for Supabase.
 *
 * On native (Capacitor) platforms, OAuth providers redirect to the Supabase URL.
 * We intercept that and redirect to our app's deep-link scheme so the auth callback
 * can be handled inside the WebView.
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

      // Handle our app's custom deep-link scheme
      if (
        parsedUrl.protocol === "com.montessorilifeskills.app:" &&
        parsedUrl.hostname === "auth-callback"
      ) {
        // Drop the "hand back to the app" marker so the callback page finishes here instead of bouncing again.
        const search = new URLSearchParams(parsedUrl.search);
        search.delete("native");
        const query = search.toString();
        const callbackUrl = `/auth/callback${query ? `?${query}` : ""}${parsedUrl.hash}`;
        await Browser.close().catch(() => undefined);
        window.location.assign(callbackUrl);
        return;
      }

      // Handle redirect from Supabase OAuth callback
      // When OAuth completes, Supabase redirects to its URL with auth params in hash
      if (
        parsedUrl.hostname === "lpdvohgfkjnjarrpsnqr.supabase.co" &&
        (parsedUrl.pathname.includes("auth") || parsedUrl.hash)
      ) {
        // Extract the auth parameters from the hash or search
        const params = parsedUrl.hash || parsedUrl.search;
        const callbackUrl = `/auth/callback${params}`;
        
        // Close the browser and navigate to the callback inside the WebView
        await Browser.close().catch(() => undefined);
        window.location.assign(callbackUrl);
      }
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, []);
};
