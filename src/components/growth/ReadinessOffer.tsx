import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Download, Leaf, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuideAge, readinessGuideHtml } from '@/lib/readinessGuide';
import { onConsentChange, readChoice } from '@/lib/consent';

const DISMISS_KEY = 'readiness-offer-dismissed';
const HOME = ['/', '/index', '/home'];
const SECTIONS = ['/practical-life', '/sensorial', '/language', '/math', '/geography', '/botany', '/art', '/cultural', '/grace-courtesy'];
const emailSchema = z.string().trim().email().max(255);

function openGuide(age: GuideAge) {
  const url = URL.createObjectURL(new Blob([readinessGuideHtml(age, window.location.origin)], { type: 'text/html' }));
  const w = window.open(url, '_blank');
  if (!w) window.location.href = url;
}

/** Readiness Guide offer: on the homepage after scrolling ~35%, on activity sections after 20s. Shown once per visitor until dismissed or submitted. */
export default function ReadinessOffer() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState<GuideAge>(4);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [consentAnswered, setConsentAnswered] = useState(() => readChoice('analytics') !== null);
  useEffect(() => onConsentChange(() => setConsentAnswered(readChoice('analytics') !== null)), []);

  const eligible = !isPremium && (() => { try { return !localStorage.getItem(DISMISS_KEY); } catch { return false; } })();
  const isHome = HOME.includes(pathname);
  const isSection = SECTIONS.includes(pathname);

  useEffect(() => {
    setOpen(false);
    if (!eligible || (!isHome && !isSection)) return;
    if (isHome) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0 && window.scrollY / max >= 0.35) { setOpen(true); window.removeEventListener('scroll', onScroll); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const timer = window.setTimeout(() => setOpen(true), 20000);
    return () => window.clearTimeout(timer);
  }, [pathname, eligible, isHome, isSection]);

  const dismiss = () => { try { localStorage.setItem(DISMISS_KEY, new Date().toISOString()); } catch { /* ignore */ } setOpen(false); };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const parsed = emailSchema.safeParse(email || user?.email || '');
    if (!parsed.success) { setError(t('growth.shared.invalidEmail')); return; }
    setBusy(true); setError(null);
    try {
      const { error: err } = await supabase.functions.invoke('capture-lead', {
        body: { email: parsed.data, source: `readiness-guide-popup-${isHome ? 'home' : 'activity'}-age-${age}` },
      });
      if (err) throw err;
      try { localStorage.setItem(DISMISS_KEY, new Date().toISOString()); } catch { /* ignore */ }
      setDone(true);
      openGuide(age);
    } catch { setError(t('growth.shared.genericError')); } finally { setBusy(false); }
  };

  if (!open || !consentAnswered) return null;

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="readiness-offer-title"
      className="fixed z-50 bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] rounded-xl border border-border bg-card text-card-foreground shadow-lg p-5 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <button type="button" onClick={dismiss} aria-label={t('growth.shared.close')} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
      {done ? (
        <div className="space-y-3 text-center">
          <Leaf className="w-8 h-8 text-primary mx-auto" />
          <p id="readiness-offer-title" className="font-semibold text-lg">{t('growth.readiness.readyTitle')}</p>
          <p className="text-sm text-muted-foreground">{t('growth.readiness.readyBody')}</p>
          <Button variant="outline" size="sm" className="w-full" onClick={() => openGuide(age)}><Download className="w-4 h-4 mr-2" />{t('growth.readiness.openAgain')}</Button>
          <Button asChild size="sm" className="w-full"><Link to="/plans" onClick={() => setOpen(false)}>{t('growth.readiness.seePremium')}</Link></Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t('growth.readiness.eyebrow')}</p>
          <p id="readiness-offer-title" className="font-semibold text-lg leading-snug pr-4">
            {isHome ? t('growth.readiness.titleHome') : t('growth.readiness.titleActivity')}
          </p>
          <p className="text-sm text-muted-foreground">{t('growth.readiness.body')}</p>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t('growth.readiness.ageGroup')}>
            {([3, 4, 5] as GuideAge[]).map((a) => (
              <Button key={a} type="button" size="sm" role="radio" aria-checked={age === a} variant={age === a ? 'default' : 'outline'} onClick={() => setAge(a)}>{t('growth.readiness.years', { age: a })}</Button>
            ))}
          </div>
          <Input type="email" autoComplete="email" maxLength={255} aria-label={t('growth.shared.email')} placeholder={user?.email || 'you@example.com'} value={email} onChange={(e) => setEmail(e.target.value)} required={!user?.email} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>{busy ? t('growth.readiness.preparing') : t('growth.readiness.submit')}</Button>
          <p className="text-[11px] text-muted-foreground text-center">{t('growth.readiness.footnote')} <Link to="/privacy-policy" className="underline">{t('growth.readiness.privacy')}</Link></p>
        </form>
      )}
    </div>
  );
}
