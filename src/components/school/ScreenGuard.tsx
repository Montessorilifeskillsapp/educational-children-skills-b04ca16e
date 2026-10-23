import { useEffect, useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Optional privacy screen for unattended devices. Never signs anyone out; settings stay on this device. */
export const DEFAULT_LOCK_MINUTES = 15;
export const LOCK_OPTIONS = [5, 15, 30, 60, 120] as const;
const KEY = 'school-screen-guard';

type Prefs = { minutes: number; off: boolean };
export function readPrefs(): Prefs {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { minutes: LOCK_OPTIONS.includes(p.minutes) ? p.minutes : DEFAULT_LOCK_MINUTES, off: !!p.off };
  } catch { return { minutes: DEFAULT_LOCK_MINUTES, off: false }; }
}
function savePrefs(p: Prefs) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ } }

const label = (m: number) => (m < 60 ? `${m} minutes` : `${m / 60} hour${m === 60 ? '' : 's'}`);

export default function ScreenGuard() {
  const [prefs, setPrefs] = useState<Prefs>(readPrefs);
  const [locked, setLocked] = useState(false);
  const last = useRef(Date.now());
  const snoozeUntil = useRef(0);

  useEffect(() => {
    if (prefs.off) return;
    const touch = () => { if (!document.hidden) last.current = Date.now(); };
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, touch, { passive: true }));
    const timer = window.setInterval(() => {
      if (Date.now() < snoozeUntil.current) return;
      if (Date.now() - last.current >= prefs.minutes * 60000) setLocked(true);
    }, 15000);
    return () => { events.forEach((e) => window.removeEventListener(e, touch)); window.clearInterval(timer); };
  }, [prefs]);

  const resume = (snoozeMs = 0) => { last.current = Date.now(); snoozeUntil.current = Date.now() + snoozeMs; setLocked(false); };
  const update = (p: Prefs) => { savePrefs(p); setPrefs(p); resume(); };

  if (!locked || prefs.off) return null;
  const endOfDay = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d.getTime() - Date.now(); };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Portal paused">
      <div className="max-w-sm w-full space-y-4 rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <Lock className="mx-auto h-8 w-8 text-primary" aria-hidden />
        <h2 className="text-xl font-semibold">Portal paused</h2>
        <p className="text-sm text-muted-foreground">Records are hidden after {label(prefs.minutes)} without use. You stay signed in.</p>
        <Button className="w-full" onClick={() => resume()}>Show records</Button>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" onClick={() => resume(30 * 60000)}>+30 min</Button>
          <Button variant="outline" size="sm" onClick={() => resume(60 * 60000)}>+1 hour</Button>
          <Button variant="outline" size="sm" onClick={() => resume(endOfDay())}>Today</Button>
        </div>
        <label className="block text-left text-sm">
          <span className="text-muted-foreground">Pause after</span>
          <select className="mt-1 w-full rounded-md border border-border bg-background p-2" value={prefs.minutes}
            onChange={(e) => update({ ...prefs, minutes: Number(e.target.value) })}>
            {LOCK_OPTIONS.map((m) => <option key={m} value={m}>{label(m)}</option>)}
          </select>
        </label>
        <Button variant="ghost" size="sm" className="w-full" onClick={() => update({ ...prefs, off: true })}>Turn off on this device</Button>
      </div>
    </div>
  );
}
