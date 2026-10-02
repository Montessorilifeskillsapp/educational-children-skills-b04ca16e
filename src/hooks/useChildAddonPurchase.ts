import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile, PENDING_CHILD_KEY } from '@/contexts/ProfileContext';
import { getNextChildAddon, isNativePurchaseAvailable, purchaseChildAddon } from '@/lib/revenuecat';

export type AddonOutcome = 'purchased' | 'cancelled' | 'redirected';

interface PendingChild { name: string; age: number; avatar: string; interests: string[]; learningStyle: string }

/**
 * One way to pay for an extra child, everywhere:
 * - In the iPhone/Android app: Apple/Google payment sheet (never leaves the app).
 * - On the website: Stripe add-on (immediate if already billed, otherwise checkout).
 */
export function useChildAddonPurchase() {
  const { currentPlan, websiteChildAddons, refreshSubscription, isPremium } = useSubscription();
  const { refreshProfiles } = useProfile();
  const isNative = isNativePurchaseAvailable();
  const isAnnual = currentPlan?.id === 'premium-yearly';
  const period: 'monthly' | 'annual' = isAnnual ? 'annual' : 'monthly';
  const [storePrice, setStorePrice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isNative || !isPremium) return;
    getNextChildAddon(period).then((n) => setStorePrice(n?.priceString ?? null)).catch(() => setStorePrice(null));
  }, [isNative, isPremium, period]);

  const priceLabel = isNative
    ? storePrice ? `${storePrice}/${isAnnual ? 'year' : 'month'}` : ''
    : isAnnual ? '$299.88/year' : '$24.99/month';

  const buy = useCallback(async (pendingChild?: PendingChild): Promise<AddonOutcome> => {
    setBusy(true);
    try {
      if (isNative) {
        const result = await purchaseChildAddon(period);
        if (result === 'purchased') { await refreshSubscription(); await refreshProfiles(); }
        return result;
      }
      const { data, error } = await supabase.functions.invoke('update-child-addons', { body: { quantity: websiteChildAddons + 1 } });
      if (error || data?.error) throw new Error(data?.error || 'Could not add a child to your plan. Please try again.');
      if (data?.url) {
        if (pendingChild) sessionStorage.setItem(PENDING_CHILD_KEY, JSON.stringify({ ...pendingChild, savedAt: Date.now() }));
        window.location.assign(data.url);
        return 'redirected';
      }
      await refreshSubscription();
      await refreshProfiles();
      return 'purchased';
    } finally {
      setBusy(false);
    }
  }, [isNative, period, websiteChildAddons, refreshSubscription, refreshProfiles]);

  return { buy, busy, priceLabel, isNative };
}

/** Friendly wording for anything that goes wrong while paying. */
export const addonErrorMessage = (e: unknown) => {
  const msg = e instanceof Error ? e.message : String(e);
  if (/network|offline|internet|connection/i.test(msg)) return 'No internet connection. Check your connection and try again — nothing was charged.';
  if (/declin|payment.*(fail|invalid)/i.test(msg)) return 'The payment was declined. Please check your payment method and try again.';
  return msg || 'Something went wrong. Nothing was charged — please try again.';
};
