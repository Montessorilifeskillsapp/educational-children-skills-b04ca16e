import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { CheckCircle, Download, Leaf } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { GuideAge, READINESS_CHECKLIST, SAMPLE_LESSONS, lessonTitle, readinessGuideHtml } from '@/lib/readinessGuide';

const emailSchema = z.string().trim().email().max(255);

function utm(): Record<string, string> | undefined {
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  p.forEach((v, k) => { if (/^utm_[a-z]+$/.test(k) && v) out[k] = v.slice(0, 200); });
  return Object.keys(out).length ? out : undefined;
}

function openGuide(age: GuideAge) {
  const html = readinessGuideHtml(age, window.location.origin);
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const w = window.open(url, '_blank');
  if (!w) window.location.href = url;
}

export default function ReadinessGuidePage() {
  const { t } = useTranslation();
  const [age, setAge] = useState<GuideAge>(4);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) { setError(t('growth.shared.invalidEmail')); return; }
    setBusy(true); setError(null);
    try {
      const { error: err } = await supabase.functions.invoke('capture-lead', {
        body: { email: parsed.data, source: `readiness-guide-age-${age}`, utm: utm() },
      });
      if (err) throw err;
      setDone(true);
      openGuide(age);
    } catch {
      setError(t('growth.shared.genericError'));
    } finally { setBusy(false); }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">{t('growth.readiness.eyebrow')}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">{t('growth.guidePage.title')}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t('growth.guidePage.body')}</p>
          <ul className="mt-6 space-y-2">
            {(['b1', 'b2', 'b3', 'b4'] as const).map((k) => (
              <li key={k} className="flex gap-2 text-foreground"><CheckCircle className="w-5 h-5 text-primary shrink-0" />{t(`growth.guidePage.${k}`)}</li>
            ))}
          </ul>
        </div>

        <Card>
          <CardContent className="p-6">
            {done ? (
              <div className="text-center space-y-4 py-4">
                <Leaf className="w-10 h-10 text-primary mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">{t('growth.readiness.readyTitle')}</h2>
                <p className="text-muted-foreground">{t('growth.readiness.readyBody')}</p>
                <Button onClick={() => openGuide(age)} variant="outline" className="w-full"><Download className="w-4 h-4 mr-2" />{t('growth.readiness.openAgain')}</Button>
                <Button asChild className="w-full"><Link to="/plans">{t('growth.readiness.seePremium')}</Link></Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <Label className="mb-2 block">{t('growth.guidePage.childAge')}</Label>
                  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t('growth.readiness.ageGroup')}>
                    {([3, 4, 5] as GuideAge[]).map((a) => (
                      <Button key={a} type="button" role="radio" aria-checked={age === a} variant={age === a ? 'default' : 'outline'} onClick={() => setAge(a)}>{t('growth.readiness.years', { age: a })}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="guide-email" className="mb-2 block">{t('growth.shared.email')}</Label>
                  <Input id="guide-email" type="email" autoComplete="email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">{t('growth.guidePage.included', { age })}</p>
                  {SAMPLE_LESSONS[age].map((l) => lessonTitle(l.title)).join(' · ')}
                  <p className="mt-1">{t('growth.guidePage.points', { count: READINESS_CHECKLIST[age].length })}</p>
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? t('growth.readiness.preparing') : t('growth.readiness.submit')}</Button>
                <p className="text-xs text-muted-foreground text-center">{t('growth.guidePage.footnote')} <Link to="/privacy-policy" className="underline">{t('growth.guidePage.privacy')}</Link></p>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
