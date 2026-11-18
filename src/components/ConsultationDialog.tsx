import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Trans, useTranslation } from 'react-i18next';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import { isNativePurchaseAvailable } from '@/lib/revenuecat';
import { analytics } from '@/lib/analytics';

const schema = z.object({
  // Messages are translation keys under growth.consult, resolved when shown.
  name: z.string().trim().min(1, 'errName').max(100, 'errNameLong'),
  email: z.string().trim().email('errEmail').max(255, 'errEmail'),
  childAge: z.string().trim().max(60, 'errAge'),
  package: z.enum(['single', 'bundle']),
  topics: z.string().trim().min(1, 'errTopics').max(2000, 'errTopicsLong'),
  preferredTimes: z.string().trim().max(500, 'errTimes'),
});
type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const isNative = isNativePurchaseAvailable();
  const [form, setForm] = useState<FormState>({ name: '', email: '', childAge: '', package: 'single', topics: '', preferredTimes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setSubmitError(null);
    setErrors({});
    const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
    const metaName = typeof meta.full_name === 'string' ? meta.full_name : typeof meta.name === 'string' ? meta.name : '';
    setForm((f) => ({ ...f, email: f.email || user?.email || '', name: f.name || metaName }));
  }, [open, user]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('book-consultation', { body: parsed.data });
      if (error) {
        const ctx = (error as { context?: Response }).context;
        let msg = t('growth.consult.sendFailed');
        try { const body = await ctx?.json(); if (body?.error) msg = body.error; } catch { /* keep default */ }
        throw new Error(msg);
      }
      if (!data?.ok) throw new Error(t('growth.consult.sendFailed'));
      analytics.track('consultation_requested', { package: parsed.data.package });
      setSent(true);
      setForm((f) => ({ ...f, topics: '', preferredTimes: '', childAge: '' }));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t('growth.consult.sendFailed'));
    } finally {
      setSending(false);
    }
  };

  const field = (key: keyof FormState) => ({
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `consult-${key}-error` : undefined,
  });
  const ErrorText = ({ k }: { k: keyof FormState }) =>
    errors[k] ? <p id={`consult-${k}-error`} className="text-sm text-destructive mt-1">{t(`growth.consult.${errors[k]}`)}</p> : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {sent ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-secondary mx-auto" aria-hidden="true" />
            <DialogTitle className="text-2xl">{t('growth.consult.sentTitle')}</DialogTitle>
            <DialogDescription className="text-base">
              <Trans i18nKey="growth.consult.sentBody" values={{ email: form.email }} components={{ 1: <span className="font-medium text-foreground" /> }} />
            </DialogDescription>
            <Button onClick={() => onOpenChange(false)} className="mt-2">{t('growth.shared.close')}</Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <DialogHeader>
              <DialogTitle className="text-2xl">{t('growth.consult.title')}</DialogTitle>
              <DialogDescription>
                {t('growth.consult.body')}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="consult-name">{t('growth.consult.name')}</Label>
                <Input id="consult-name" value={form.name} onChange={(e) => set('name', e.target.value)} maxLength={100} autoComplete="name" {...field('name')} />
                <ErrorText k="name" />
              </div>
              <div>
                <Label htmlFor="consult-email">{t('growth.shared.email')}</Label>
                <Input id="consult-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} maxLength={255} autoComplete="email" {...field('email')} />
                <ErrorText k="email" />
              </div>
              <div>
                <Label htmlFor="consult-age">{t('growth.consult.childAge')} <span className="text-muted-foreground font-normal">{t('growth.consult.optional')}</span></Label>
                <Input id="consult-age" value={form.childAge} onChange={(e) => set('childAge', e.target.value)} maxLength={60} placeholder={t('growth.consult.agePlaceholder')} {...field('childAge')} />
                <ErrorText k="childAge" />
              </div>
              <fieldset>
                <legend className="text-sm font-medium mb-2">{t('growth.consult.package')}</legend>
                <RadioGroup value={form.package} onValueChange={(v) => set('package', v as FormState['package'])} className="grid gap-2 sm:grid-cols-2">
                  {([
                    ['single', t('growth.consult.single'), '$225'],
                    ['bundle', t('growth.consult.bundle'), '$600'],
                  ]).map(([value, label, price]) => (
                    <Label key={value} htmlFor={`consult-pkg-${value}`} className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                      <RadioGroupItem id={`consult-pkg-${value}`} value={value} />
                      <span className="font-normal">{label}{!isNative && <span className="text-muted-foreground"> · {price}</span>}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </fieldset>
              <div>
                <Label htmlFor="consult-topics">{t('growth.consult.topics')}</Label>
                <Textarea id="consult-topics" value={form.topics} onChange={(e) => set('topics', e.target.value)} maxLength={2000} rows={4} placeholder={t('growth.consult.topicsPlaceholder')} {...field('topics')} />
                <ErrorText k="topics" />
              </div>
              <div>
                <Label htmlFor="consult-times">{t('growth.consult.times')} <span className="text-muted-foreground font-normal">{t('growth.consult.optional')}</span></Label>
                <Input id="consult-times" value={form.preferredTimes} onChange={(e) => set('preferredTimes', e.target.value)} maxLength={500} placeholder={t('growth.consult.timesPlaceholder')} {...field('preferredTimes')} />
                <ErrorText k="preferredTimes" />
              </div>
              {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>{t('growth.consult.cancel')}</Button>
              <Button type="submit" disabled={sending}>
                {sending ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('growth.consult.sending')}</>) : t('growth.consult.send')}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
