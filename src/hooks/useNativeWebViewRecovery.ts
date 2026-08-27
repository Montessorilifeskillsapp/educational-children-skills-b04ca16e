import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

/**
 * Native WebView repaint recovery.
 *
 * On iOS, dismissing a native modal (StoreKit purchase sheet, OAuth browser,
 * share sheet) can leave the WKWebView with a stale/blank compositing layer:
 * the DOM is intact but nothing is painted, so the user sees an empty
 * background-coloured screen. Forcing a layout + repaint when the app returns
 * to the foreground restores rendering.
 *
 * Also hides the native splash screen as soon as the web app is ready.
 */
export const forceWebViewRepaint = () => {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('root') ?? document.body;
  if (!root) return;

  // Touch layout, then flip a cheap compositing property to force a new frame.
  void root.offsetHeight;
  const previous = root.style.transform;
  root.style.transform = 'translateZ(0)';
  requestAnimationFrame(() => {
    root.style.transform = previous;
    window.dispatchEvent(new Event('resize'));
    window.scrollBy(0, 1);
    window.scrollBy(0, -1);
  });
};

export const useNativeWebViewRecovery = () => {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let removeListener: (() => void) | undefined;

    void (async () => {
      try {
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.hide();
      } catch {
        /* splash screen plugin unavailable — ignore */
      }

      try {
        const { App: CapacitorApp } = await import('@capacitor/app');
        const handle = await CapacitorApp.addListener('appStateChange', ({ isActive }) => {
          if (isActive) forceWebViewRepaint();
        });
        removeListener = () => void handle.remove();
      } catch {
        /* app plugin unavailable — ignore */
      }
    })();

    const onVisible = () => {
      if (document.visibilityState === 'visible') forceWebViewRepaint();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      removeListener?.();
    };
  }, []);
};
