/**
 * RevenueCat wrapper for native iOS/Android in-app purchases.
 * No-ops on web — web continues to use Stripe.
 */
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

let initialized = false;
let initPromise: Promise<void> | null = null;
let configCache: { ios?: string; android?: string } | null = null;

export const ENTITLEMENT_ID = 'pro';
export const PRODUCT_MONTHLY = 'premium_monthly';
export const PRODUCT_ANNUAL = 'premium_annual';
export const PRODUCT_CONSULTATION = 'consultation_session';
/** Extra-child add-ons: one store subscription per extra child (stores can't sell the same subscription twice). */
export const MAX_STORE_CHILD_ADDONS = 4;
export const childAddonProductIds = (period: 'monthly' | 'annual') =>
  Array.from({ length: MAX_STORE_CHILD_ADDONS }, (_, i) => `child_addon_${period}_${i + 1}`);
export const isChildAddonProduct = (id?: string | null) => Boolean(id && /^child_addon_(monthly|annual)_\d+$/.test(id));

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
  const { Purchases, PRODUCT_CATEGORY } = await import('@revenuecat/purchases-capacitor');
  const offerings = await Purchases.getOfferings();
  const pkg = offerings.current?.availablePackages.find(
    (p) => p.product.identifier === productId
  );

  let customerInfo;
  if (pkg) {
    const result = await Purchases.purchasePackage({ aPackage: pkg });
    customerInfo = result.customerInfo;
  } else {
    // Consumable / non-subscription product (e.g. consultation_session)
    const { products } = await Purchases.getProducts({
      productIdentifiers: [productId],
      type: PRODUCT_CATEGORY.NON_SUBSCRIPTION,
    });
    const product = products[0];
    if (!product) throw new Error(`Product ${productId} not found in store`);
    const result = await Purchases.purchaseStoreProduct({ product });
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

export async function syncCurrentRevenueCatStatus(userId?: string | null) {
  if (!isNativePurchaseAvailable()) return null;
  await initRevenueCat(userId ?? null);
  const { Purchases } = await import('@revenuecat/purchases-capacitor');
  const { customerInfo } = await Purchases.getCustomerInfo();
  await syncRevenueCatToBackend(customerInfo);
  return customerInfo;
}

async function syncRevenueCatToBackend(customerInfo: unknown, lastProductId?: string) {
  const { data, error } = await supabase.functions.invoke('revenuecat-sync', {
    body: {
      customerInfo,
      platform: Capacitor.getPlatform(),
      productId: lastProductId,
    },
  });

  if (error) {
    console.error('revenuecat-sync failed', error);
    throw new Error('Your App Store purchase succeeded, but access could not be activated. Tap Restore Purchases to retry.');
  }

  if (!data?.subscribed) {
    throw new Error('The App Store has not returned an active subscription yet. Tap Restore Purchases to sync it.');
  }
}

/** Next unowned add-on product for this billing period, with its store price. Null if none left. */
export async function getNextChildAddon(period: 'monthly' | 'annual') {
  if (!isNativePurchaseAvailable()) return null;
  const { Purchases, PRODUCT_CATEGORY } = await import('@revenuecat/purchases-capacitor');
  const { customerInfo } = await Purchases.getCustomerInfo();
  const owned = new Set(customerInfo.activeSubscriptions ?? []);
  const ids = childAddonProductIds(period).filter((id) => !owned.has(id));
  if (ids.length === 0) return null;
  const { products } = await Purchases.getProducts({ productIdentifiers: ids, type: PRODUCT_CATEGORY.SUBSCRIPTION });
  const product = ids.map((id) => products.find((p) => p.identifier === id)).find(Boolean);
  return product ? { product, priceString: product.priceString } : null;
}

export type AddonPurchaseResult = 'purchased' | 'cancelled';

/** Buys one extra child inside the app and activates it on the account. */
export async function purchaseChildAddon(period: 'monthly' | 'annual'): Promise<AddonPurchaseResult> {
  const next = await getNextChildAddon(period);
  if (!next) throw new Error('The store could not offer another child add-on right now. Please try again shortly.');
  const { Purchases } = await import('@revenuecat/purchases-capacitor');
  try {
    const { customerInfo } = await Purchases.purchaseStoreProduct({ product: next.product });
    const { error } = await supabase.functions.invoke('revenuecat-sync', {
      body: { customerInfo, platform: Capacitor.getPlatform(), productId: next.product.identifier },
    });
    if (error) throw new Error('Payment went through, but the child could not be unlocked yet. Tap Restore Purchases to finish.');
    return 'purchased';
  } catch (e) {
    const err = e as { userCancelled?: boolean; code?: string | number };
    if (err?.userCancelled || err?.code === '1' || err?.code === 1) return 'cancelled';
    throw e;
  }
}

/** Opens the phone's own subscription settings (cancellation must happen there). */
export async function openStoreSubscriptions() {
  const url = Capacitor.getPlatform() === 'ios'
    ? 'https://apps.apple.com/account/subscriptions'
    : 'https://play.google.com/store/account/subscriptions';
  window.open(url, '_system');
}
