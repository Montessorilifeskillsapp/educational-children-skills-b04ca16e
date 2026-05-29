import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share, X } from 'lucide-react';
import appLogo from '@/assets/app-logo.png';

const DISMISS_KEY = 'pwa-install-dismissed-at';
const DISMISS_DAYS = 14;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Tactful install prompt:
 *   - Android/desktop Chrome: native beforeinstallprompt
 *   - iOS Safari: shows an "Add to Home Screen" coach card
 *   - Hidden if already installed, or dismissed within last 14 days
 */
const PWAInstallPrompt: React.FC = () => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [iosCoach, setIosCoach] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    const recentlyDismissed = Date.now() - dismissedAt < DISMISS_DAYS * 86400_000;
    if (recentlyDismissed) return;

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS only
      window.navigator.standalone === true;
    if (isStandalone) return;

    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua);

    if (isIOS) {
      // Show iOS coach after a short delay so it doesn't interrupt first paint
      const t = setTimeout(() => setIosCoach(true), 6000);
      return () => clearTimeout(t);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShow(false);
    setIosCoach(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === 'accepted') localStorage.setItem(DISMISS_KEY, String(Date.now() + 365 * 86400_000));
    setShow(false);
  };

  if (!show && !iosCoach) return null;

  return (
    <div
      role="dialog"
      aria-label="Install app"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[360px] z-50 rounded-2xl bg-card border border-border shadow-2xl p-4 animate-fade-in"
    >
      <button
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
          <img src={appLogo} alt="Montessori Life Skills" className="w-8 h-8 object-cover rounded-lg" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">Install for one-tap access</p>
          {iosCoach ? (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Tap <Share className="inline w-3.5 h-3.5 align-text-bottom" /> in Safari, then{' '}
              <span className="font-medium text-foreground">Add to Home Screen</span>.
            </p>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Open Montessori Life Skills from your home screen — no browser, faster start.
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={install} className="bg-primary text-primary-foreground">Install</Button>
                <Button size="sm" variant="ghost" onClick={dismiss}>Not now</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
