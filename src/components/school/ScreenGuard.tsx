import { useEffect, useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

/** Covers the portal after inactivity so children or visitors can't read records on an unattended device. */
export const LOCK_AFTER_MS = 5 * 60 * 1000;
export const SIGN_OUT_AFTER_MS = 30 * 60 * 1000;

export default function ScreenGuard() {
  const [locked, setLocked] = useState(false);
  const last = useRef(Date.now());

  useEffect(() => {
    const touch = () => { if (!document.hidden) last.current = Date.now(); };
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, touch, { passive: true }));
    const timer = window.setInterval(() => {
      const idle = Date.now() - last.current;
      if (idle >= SIGN_OUT_AFTER_MS) { void supabase.auth.signOut().then(() => window.location.assign('/')); return; }
      if (idle >= LOCK_AFTER_MS) setLocked(true);
    }, 15000);
    return () => { events.forEach((e) => window.removeEventListener(e, touch)); window.clearInterval(timer); };
  }, []);

  if (!locked) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Portal locked">
      <div className="max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <Lock className="mx-auto h-8 w-8 text-primary" aria-hidden />
        <h2 className="text-xl font-semibold">Portal paused</h2>
        <p className="text-sm text-muted-foreground">Records are hidden after 5 minutes without use. After 30 minutes you'll be signed out.</p>
        <Button className="w-full" onClick={() => { last.current = Date.now(); setLocked(false); }}>I'm here, show records</Button>
      </div>
    </div>
  );
}
