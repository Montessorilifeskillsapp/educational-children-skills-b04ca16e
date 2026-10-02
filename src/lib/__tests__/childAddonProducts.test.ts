import { describe, it, expect, vi } from 'vitest';
vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => false, getPlatform: () => 'web' } }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: {} }));
import { childAddonProductIds, isChildAddonProduct, MAX_STORE_CHILD_ADDONS } from '../revenuecat';

describe('child add-on store products', () => {
  it('lists one product per extra child for each billing period', () => {
    expect(childAddonProductIds('monthly')).toHaveLength(MAX_STORE_CHILD_ADDONS);
    expect(childAddonProductIds('annual')[0]).toBe('child_addon_annual_1');
  });
  it('never mistakes Premium for an add-on', () => {
    expect(isChildAddonProduct('child_addon_monthly_3')).toBe(true);
    expect(isChildAddonProduct('premium_monthly')).toBe(false);
    expect(isChildAddonProduct('premium_annual')).toBe(false);
    expect(isChildAddonProduct(null)).toBe(false);
  });
});
