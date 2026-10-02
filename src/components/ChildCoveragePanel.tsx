import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuthContext } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { isNativePurchaseAvailable, openStoreSubscriptions } from '@/lib/revenuecat';
import { useChildAddonPurchase, addonErrorMessage } from '@/hooks/useChildAddonPurchase';

export const ADDON_PRICE_TEXT = '$24.99/month';

/** Shows how many children the plan covers and lets the parent add or remove extra-child add-ons. */
const ChildCoveragePanel: React.FC<{ highlight?: boolean }> = ({ highlight }) => {
  const { user } = useAuthContext();
  const { isPremium, childAllowance, childAddons, websiteChildAddons, currentPlan, provider, refreshSubscription } = useSubscription();
  const addon = useChildAddonPurchase();
  const { profiles, refreshProfiles } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const covered = profiles.filter((p) => p.covered !== false);
  const [chosen, setChosen] = useState<string[]>([]);
  const isAnnual = currentPlan?.id === 'premium-yearly';
  const isNative = isNativePurchaseAvailable();
  // App-store members buy add-ons here too, as a separate website subscription.
  const canManageOnWeb = isPremium && !isNative;
  const storeAddons = Math.max(0, childAddons - websiteChildAddons);
  const isAppStoreMember = Boolean(provider && provider !== 'stripe');
  const uncovered = useMemo(() => profiles.filter((p) => p.covered === false), [profiles]);

  if (!user) return null;

  const priceLine = isAnnual && !isAppStoreMember ? `${ADDON_PRICE_TEXT} per extra child, billed yearly ($299.88)` : `${ADDON_PRICE_TEXT} per extra child`;

  const changeAddons = async (quantity: number) => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('update-child-addons', { body: { quantity } });
      if (error || data?.error) throw new Error(data?.error || 'Could not update your plan.');
      if (data?.url) { window.location.assign(data.url); return; }
      await refreshSubscription();
      await refreshProfiles();
      toast({ title: 'Plan updated', description: `Your plan now covers ${1 + quantity} ${quantity === 0 ? 'child' : 'children'}.` });
    } catch (e) {
      toast({ title: 'Could not update', description: e instanceof Error ? e.message : String(e), variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  const unlock = async (name: string) => {
    try {
      const outcome = await addon.buy();
      if (outcome === 'cancelled') toast({ title: 'Payment cancelled', description: 'Nothing was charged.' });
      if (outcome === 'purchased') toast({ title: `${name} is unlocked`, description: 'Their profile is ready to use.' });
    } catch (e) {
      toast({ title: 'Could not unlock', description: addonErrorMessage(e), variant: 'destructive' });
    }
  };

  const saveChoice = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('set-covered-children', { body: { childIds: chosen } });
      if (error || data?.error) throw new Error(data?.error || 'Could not save.');
      await refreshProfiles();
      setChoosing(false);
    } catch (e) {
      toast({ title: 'Could not save', description: e instanceof Error ? e.message : String(e), variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className={highlight ? 'border-primary ring-2 ring-primary/40' : ''}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Children covered: {Math.min(covered.length, childAllowance)} of {childAllowance}</p>
            <p className="text-sm text-muted-foreground">
              {isPremium
                ? `Premium includes one child. ${isNative ? `Each extra child${addon.priceLabel ? ` is ${addon.priceLabel}` : ' can be added here'}.` : priceLine + '.'}`
                : 'The free plan includes one child. Premium includes one child, and more can be added.'}
            </p>
            {highlight && (
              <p className="text-sm mt-1 font-medium">{isPremium ? 'Tap "Add Child" — you can pay for the extra child as you save their profile.' : 'To add another child, add them to your plan first.'}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {canManageOnWeb && (
            <Button size="sm" disabled={busy} onClick={() => changeAddons(websiteChildAddons + 1)}>
              Add a child — {ADDON_PRICE_TEXT}
            </Button>
          )}
          {canManageOnWeb && websiteChildAddons > 0 && (
            <Button size="sm" variant="outline" disabled={busy} onClick={() => {
              if (window.confirm('Remove one extra child from your plan? One child will need an add-on again.')) void changeAddons(websiteChildAddons - 1);
            }}>
              Remove an add-on
            </Button>
          )}
          {isPremium && uncovered.length > 0 && !choosing && (
            <Button size="sm" disabled={busy || addon.busy} onClick={() => unlock(uncovered[0].name)}>
              Unlock {uncovered[0].name}{addon.priceLabel ? ` — ${addon.priceLabel}` : ''}
            </Button>
          )}
          {isNative && storeAddons > 0 && (
            <Button size="sm" variant="outline" onClick={() => {
              if (window.confirm('To remove an extra child, cancel that add-on in your phone\'s subscription settings. Open them now?')) void openStoreSubscriptions();
            }}>
              Remove an extra child
            </Button>
          )}
          {!isPremium && (
            <Button size="sm" onClick={() => navigate('/plans')}>See Premium plans</Button>
          )}
          {profiles.length > 1 && (
            <Button size="sm" variant="ghost" disabled={busy} onClick={() => { setChosen(covered.map((p) => p.id)); setChoosing((v) => !v); }}>
              Choose which children are included
            </Button>
          )}
        </div>

        {uncovered.length > 0 && !choosing && (
          <p className="text-sm text-muted-foreground">
            Needs a child add-on: {uncovered.map((p) => p.name).join(', ')}. Their saved progress is kept safe.
          </p>
        )}

        {choosing && (
          <div className="space-y-2 border-t pt-3">
            <p className="text-sm">Select up to {childAllowance}:</p>
            {profiles.map((p) => {
              const checked = chosen.includes(p.id);
              return (
                <label key={p.id} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={checked}
                    disabled={!checked && chosen.length >= childAllowance}
                    onCheckedChange={(v) => setChosen((c) => (v ? [...c, p.id] : c.filter((id) => id !== p.id)))}
                  />
                  {p.avatar} {p.name}
                </label>
              );
            })}
            <Button size="sm" disabled={busy || chosen.length === 0} onClick={saveChoice}>Save</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChildCoveragePanel;
