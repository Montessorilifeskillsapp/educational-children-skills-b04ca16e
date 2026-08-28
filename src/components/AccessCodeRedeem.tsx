import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from './AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';

const AccessCodeRedeem: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthContext();
  const { refreshSubscription } = useSubscription();

  const handleRedeem = async () => {
    if (!code.trim()) return;

    if (!user) {
      toast({
        title: 'Sign in first',
        description: 'Create an account or sign in, then redeem your access code.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('redeem-access-code', {
        body: { code },
      });

      if (error || (data as { error?: string })?.error) {
        const message =
          (data as { error?: string })?.error ??
          (error?.message ?? 'That access code could not be redeemed.');
        toast({
          title: 'Code not accepted',
          description: message,
          variant: 'destructive',
        });
        return;
      }

      setCode('');
      setOpen(false);
      await refreshSubscription?.();
      toast({
        title: 'Full access unlocked',
        description: 'Your access code has been applied to this account.',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: error instanceof Error ? error.message.slice(0, 180) : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          <KeyRound className="w-4 h-4" aria-hidden="true" />
          Have an access code?
        </button>
      ) : (
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3 text-left">
          <label htmlFor="access-code" className="text-sm font-medium text-foreground">
            Enter your access code
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id="access-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="MLS-XXXX-XXXX"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === 'Enter') void handleRedeem();
              }}
            />
            <Button onClick={() => void handleRedeem()} disabled={submitting || !code.trim()}>
              {submitting ? 'Checking…' : 'Redeem'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Access codes unlock the full curriculum at no charge. No payment details required.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessCodeRedeem;
