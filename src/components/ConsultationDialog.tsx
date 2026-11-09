import React, { useEffect, useState } from 'react';
import { z } from 'zod';
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
  name: z.string().trim().min(1, 'Please enter your name').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  childAge: z.string().trim().max(60, 'Child age must be under 60 characters'),
  package: z.enum(['single', 'bundle']),
  topics: z.string().trim().min(1, 'Please tell us what you would like to discuss').max(2000, 'Topics must be under 2000 characters'),
  preferredTimes: z.string().trim().max(500, 'Preferred times must be under 500 characters'),
});
type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const { user } = useAuthContext();
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
        let msg = 'We could not send your request. Please try again.';
        try { const body = await ctx?.json(); if (body?.error) msg = body.error; } catch { /* keep default */ }
        throw new Error(msg);
      }
      if (!data?.ok) throw new Error('We could not send your request. Please try again.');
      analytics.track('consultation_requested', { package: parsed.data.package });
      setSent(true);
      setForm((f) => ({ ...f, topics: '', preferredTimes: '', childAge: '' }));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'We could not send your request. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const field = (key: keyof FormState) => ({
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `consult-${key}-error` : undefined,
  });
  const ErrorText = ({ k }: { k: keyof FormState }) =>
    errors[k] ? <p id={`consult-${k}-error`} className="text-sm text-destructive mt-1">{errors[k]}</p> : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {sent ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-secondary mx-auto" aria-hidden="true" />
            <DialogTitle className="text-2xl">Request sent</DialogTitle>
            <DialogDescription className="text-base">
              Thank you. Your request has reached Kerry, who will reply to <span className="font-medium text-foreground">{form.email}</span> to arrange a time.
            </DialogDescription>
            <Button onClick={() => onOpenChange(false)} className="mt-2">Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <DialogHeader>
              <DialogTitle className="text-2xl">Book a private consultation</DialogTitle>
              <DialogDescription>
                Tell us a little about your child and what you would like help with. Kerry will reply by email to arrange a time.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="consult-name">Your name</Label>
                <Input id="consult-name" value={form.name} onChange={(e) => set('name', e.target.value)} maxLength={100} autoComplete="name" {...field('name')} />
                <ErrorText k="name" />
              </div>
              <div>
                <Label htmlFor="consult-email">Email</Label>
                <Input id="consult-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} maxLength={255} autoComplete="email" {...field('email')} />
                <ErrorText k="email" />
              </div>
              <div>
                <Label htmlFor="consult-age">Child's age <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input id="consult-age" value={form.childAge} onChange={(e) => set('childAge', e.target.value)} maxLength={60} placeholder="e.g. 4 years" {...field('childAge')} />
                <ErrorText k="childAge" />
              </div>
              <fieldset>
                <legend className="text-sm font-medium mb-2">Package</legend>
                <RadioGroup value={form.package} onValueChange={(v) => set('package', v as FormState['package'])} className="grid gap-2 sm:grid-cols-2">
                  {([
                    ['single', 'Single session', '$225'],
                    ['bundle', 'Three sessions', '$600'],
                  ] as const).map(([value, label, price]) => (
                    <Label key={value} htmlFor={`consult-pkg-${value}`} className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                      <RadioGroupItem id={`consult-pkg-${value}`} value={value} />
                      <span className="font-normal">{label}{!isNative && <span className="text-muted-foreground"> · {price}</span>}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </fieldset>
              <div>
                <Label htmlFor="consult-topics">What would you like to discuss?</Label>
                <Textarea id="consult-topics" value={form.topics} onChange={(e) => set('topics', e.target.value)} maxLength={2000} rows={4} placeholder="Goals, routines, setting up your space, questions about the curriculum…" {...field('topics')} />
                <ErrorText k="topics" />
              </div>
              <div>
                <Label htmlFor="consult-times">Preferred dates and times <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input id="consult-times" value={form.preferredTimes} onChange={(e) => set('preferredTimes', e.target.value)} maxLength={500} placeholder="e.g. Weekday mornings, Central time" {...field('preferredTimes')} />
                <ErrorText k="preferredTimes" />
              </div>
              {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>Cancel</Button>
              <Button type="submit" disabled={sending}>
                {sending ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending…</>) : 'Send request'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
