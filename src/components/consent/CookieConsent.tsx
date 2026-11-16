import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { needsAnswer, onConsentChange, readChoice, saveChoices, type Purpose } from '@/lib/consent';
import { COOKIE_SETTINGS_EVENT } from './openCookieSettings';

const PURPOSES: Purpose[] = ['analytics'];
// The School Portal and admin pages never run analytics, so the banner stays out of the way there.
const QUIET_ROUTES = /^\/(school|admin)(\/|$)/;

const gpcOn = () =>
  typeof navigator !== 'undefined' &&
  (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

export default function CookieConsent() {
  const { pathname } = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const gpc = gpcOn();

  useEffect(() => {
    let alive = true;
    const check = () => void needsAnswer(PURPOSES).then((need) => alive && setShowBanner(need));
    check();
    const off = onConsentChange(check);
    return () => { alive = false; off(); };
  }, []);

  useEffect(() => {
    const open = () => {
      setAnalyticsOn(!gpc && readChoice('analytics') === 'granted');
      setSettingsOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, [gpc]);

  const quiet = QUIET_ROUTES.test(pathname);
  const bannerVisible = showBanner && !quiet && !settingsOpen;

  useEffect(() => {
    if (bannerVisible) panelRef.current?.focus();
  }, [bannerVisible]);

  const answerAll = (choice: 'granted' | 'denied') => {
    saveChoices({ analytics: choice });
    setShowBanner(false);
  };

  const openSettings = () => {
    setAnalyticsOn(!gpc && readChoice('analytics') === 'granted');
    setSettingsOpen(true);
  };

  const saveSettings = () => {
    saveChoices({ analytics: analyticsOn ? 'granted' : 'denied' });
    setSettingsOpen(false);
    setShowBanner(false);
  };

  return (
    <>
      {bannerVisible && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="region"
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-lg rounded-xl border border-border bg-card p-4 text-card-foreground shadow-lg outline-none sm:left-4 sm:right-auto sm:mx-0"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <p className="text-sm font-semibold text-foreground">Your privacy choices</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We count visits without cookies. If you accept, we also use analytics cookies and record which pages and activities are
            used, so we can improve the app. See our{' '}
            <Link to="/privacy-policy" className="underline text-primary">Privacy Policy</Link>.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button onClick={() => answerAll('granted')}>Accept all</Button>
            <Button onClick={() => answerAll('denied')}>Reject all</Button>
          </div>
          <Button variant="link" className="mt-1 h-auto px-0 text-sm" onClick={openSettings}>Cookie settings</Button>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie settings</DialogTitle>
            <DialogDescription>
              Choose what this app may use on your device. You can change this at any time from the Cookie settings link.
            </DialogDescription>
          </DialogHeader>

          {gpc && (
            <p className="rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
              Your browser is sending a privacy signal (Global Privacy Control), so analytics stays off.
            </p>
          )}

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Necessary</p>
                <p className="text-sm text-muted-foreground">Keeps you signed in, saves your settings and lessons for offline use. Always on.</p>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">Always on</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <label htmlFor="consent-analytics" className="text-sm font-medium text-foreground">Analytics</label>
                <p className="text-sm text-muted-foreground">
                  Provided by Google and by Montessori Life Skills. Analytics cookies and a record of which pages and activities are
                  used. Visit counts without cookies, provided by Lovable, continue either way.
                </p>
              </div>
              <Switch id="consent-analytics" checked={analyticsOn} onCheckedChange={setAnalyticsOn} disabled={gpc} />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={saveSettings}>Save choices</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
