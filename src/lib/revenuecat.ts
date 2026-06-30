/**
 * RevenueCat wrapper for native iOS/Android in-app purchases.
 * No-ops on web — web continues to use Stripe.
 */
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

let initialized = false;
let initPromise: Promise<void> | null = null;
let configCache: { ios?: string; android?: string } | null = null;

export const ENTITLEMENT_ID = 'premium';
export const PRODUCT_MONTHLY = 'premium_monthly';
export const PRODUCT_ANNUAL = 'premium_annual';
export const PRODUCT_CONSULTATION = 'consultation_session';

export const isNativePurchaseAvailable = () =>
  Capacitor.isNativePlatform() &&
  (Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android');

async function fetchKeys() {
  if (configCache) return configCache;
  const { data, error } = await supabase.functions.invoke('revenuecat-config');
  if (error) throw error;
  configCache = data as { ios?: string; android?: string };
  return configCache;
}

export async function initRevenueCat(userId: string | null) {
  if (!isNativePurchaseAvailable()) return;
  if (initialized && userId) {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    await Purchases.logIn({ appUserID: userId });
    return;
  }
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const { Purchases, LOG_LEVEL } = await import('@revenuecat/purchases-capacitor');
    const keys = await fetchKeys();
    const platform = Capacitor.getPlatform();
    const apiKey = platform === 'ios' ? keys.ios : keys.android;
    if (!apiKey) throw new Error(`RevenueCat ${platform} API key not configured`);

    await Purchases.setLogLevel({ level: LOG_LEVEL.WARN });
    await Purchases.configure({
      apiKey,
      appUserID: userId ?? undefined,
    });
    initialized = true;
  })();

  try {
    await initPromise;
  } finally {
    initPromise = null;
  }
}

export async function getOfferings() {
  if (!isNativePurchaseAvailable()) return null;
  const { Purchases } = await import('@revenuecat/purchases-capacitor');
  const offerings = await Purchases.getOfferings();
  return offerings.current;
}

export async function purchaseProductId(productId: string) {
  if (!isNativePurchaseAvailable()) throw new Error('Native purchases only');
  const { Purchases, PURCHASE_TYPE } = await import('@revenuecat/purchases-capacitor');
  const offerings = await Purchases.getOfferings();
  const pkg = offerings.current?.availablePackages.find(
    (p) => p.product.identifier === productId
  );

  let customerInfo;
  if (pkg) {
    const result = await Purchases.purchasePackage({ aPackage: pkg });
    customerInfo = result.customerInfo;
  } else {
    // Consumable / non-subscription not in offering
    const result = await Purchases.purchaseProduct({
      productIdentifier: productId,
      productType: PURCHASE_TYPE.CONSUMABLE,
    });
    customerInfo = result.customerInfo;
  }

  // Tell our backend immediately so the user gets access without waiting for the webhook.
  await syncRevenueCatToBackend(customerInfo, productId);
  return customerInfo;
}

export async function restorePurchases() {
  if (!isNativePurchaseAvailable()) return null;
  const { Purchases } = await import('@revenuecat/purchases-capacitor');
  const { customerInfo } = await Purchases.restorePurchases();
  await syncRevenueCatToBackend(customerInfo);
  return customerInfo;
}

async function syncRevenueCatToBackend(customerInfo: unknown, lastProductId?: string) {
  try {
    await supabase.functions.invoke('revenuecat-sync', {
      body: {
        customerInfo,
        platform: Capacitor.getPlatform(),
        productId: lastProductId,
      },
    });
  } catch (err) {
    console.error('revenuecat-sync failed', err);
  }
}
