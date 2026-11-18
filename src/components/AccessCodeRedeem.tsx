import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const { refreshSubscription } = useSubscription();

  const handleRedeem = async () => {
    if (!code.trim()) return;

    if (!user) {
      toast({
        title: t('pricing.access.signInTitle'),
        description: t('pricing.access.signInBody'),
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
          t('pricing.access.rejectedBody');
        toast({
          title: t('pricing.access.rejected'),
          description: message,
          variant: 'destructive',
        });
        return;
      }

      setCode('');
      setOpen(false);
      await refreshSubscription?.();
      toast({
        title: t('pricing.access.okTitle'),
        description: t('pricing.access.okBody'),
      });
    } catch {
      toast({
        title: t('pricing.access.errTitle'),
        description: t('pricing.access.errBody'),
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
          {t('pricing.access.open')}
        </button>
      ) : (
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3 text-left">
          <label htmlFor="access-code" className="text-sm font-medium text-foreground">
            {t('pricing.access.label')}
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
              {submitting ? t('pricing.access.checking') : t('pricing.access.redeem')}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('pricing.access.note')}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessCodeRedeem;
