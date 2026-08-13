import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2, FlaskConical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';

type StepState = 'pending' | 'running' | 'done' | 'failed';

interface Step {
  label: string;
  state: StepState;
  detail?: string;
}

const INITIAL_STEPS: Step[] = [
  { label: 'Create a temporary code', state: 'pending' },
  { label: 'Redeem it on your account', state: 'pending' },
  { label: 'Confirm premium access is active', state: 'pending' },
  { label: 'Clean up (revoke code + access)', state: 'pending' },
];

interface Props {
  onFinished?: () => void;
}

const AccessCodeTestRedeem: React.FC<Props> = ({ onFinished }) => {
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [running, setRunning] = useState(false);
  const { refreshSubscription } = useSubscription();
  const { toast } = useToast();

  const setStep = (index: number, state: StepState, detail?: string) =>
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, state, detail } : s)));

  const call = async (fn: string, body: Record<string, unknown>) => {
    const { data: sess } = await supabase.auth.getSession();
    const token = sess.session?.access_token;
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${fn}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
    return json;
  };

  const runTest = async () => {
    setRunning(true);
    setSteps(INITIAL_STEPS.map((s) => ({ ...s })));
    let codeId: string | null = null;

    try {
      setStep(0, 'running');
      const created = await call('admin-access-codes', {
        action: 'create',
        label: 'Automated test redeem',
        max_redemptions: 1,
        grant_duration_days: 1,
      });
      codeId = created?.code?.id ?? null;
      const code = created?.code?.code as string | undefined;
      if (!code || !codeId) throw new Error('No code returned');
      setStep(0, 'done', code);

      setStep(1, 'running');
      const redeemed = await call('redeem-access-code', { code });
      setStep(1, 'done', redeemed?.subscription_tier ?? 'redeemed');

      setStep(2, 'running');
      await refreshSubscription?.();
      const { data: check } = await supabase.functions.invoke('check-subscription');
      if (!check?.subscribed) throw new Error('Subscription did not activate');
      setStep(2, 'done', `${check.subscription_tier ?? 'Premium'} via ${check.provider ?? 'access_code'}`);

      setStep(3, 'running');
      await call('admin-access-codes', { action: 'revoke_code', id: codeId, revoked: true });
      await refreshSubscription?.();
      setStep(3, 'done', 'Test code disabled, your account restored');

      toast({ title: 'Redemption flow works', description: 'All four steps passed.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setSteps((prev) => {
        const idx = prev.findIndex((s) => s.state === 'running');
        return prev.map((s, i) => (i === idx ? { ...s, state: 'failed', detail: message } : s));
      });
      if (codeId) {
        try {
          await call('admin-access-codes', { action: 'revoke_code', id: codeId, revoked: true });
          await refreshSubscription?.();
        } catch {
          /* best effort cleanup */
        }
      }
      toast({ title: 'Test failed', description: message, variant: 'destructive' });
    } finally {
      setRunning(false);
      onFinished?.();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5" aria-hidden="true" />
          Test redeem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Creates a throwaway code, redeems it on your own account, checks that full access turns on, then
          disables the code and restores your account. Nothing is left behind.
        </p>

        <ul className="space-y-2">
          {steps.map((s) => (
            <li key={s.label} className="flex items-start gap-2 text-sm">
              {s.state === 'running' && <Loader2 className="w-4 h-4 mt-0.5 animate-spin text-muted-foreground" />}
              {s.state === 'done' && <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary" />}
              {s.state === 'failed' && <XCircle className="w-4 h-4 mt-0.5 text-destructive" />}
              {s.state === 'pending' && <span className="w-4 h-4 mt-0.5 rounded-full border border-border" />}
              <span className={s.state === 'pending' ? 'text-muted-foreground' : 'text-foreground'}>
                {s.label}
                {s.detail && <span className="block text-xs text-muted-foreground font-mono">{s.detail}</span>}
              </span>
            </li>
          ))}
        </ul>

        <Button onClick={() => void runTest()} disabled={running}>
          {running ? 'Running test…' : 'Run test redeem'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccessCodeTestRedeem;
