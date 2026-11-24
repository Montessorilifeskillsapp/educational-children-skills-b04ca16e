import { afterEach, describe, expect, it, vi } from 'vitest';
import { Capacitor } from '@capacitor/core';
import { getPasswordResetUrl } from '@/hooks/useAuth';
import { urlIsPasswordRecovery } from '@/lib/passwordRecovery';

vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: vi.fn(() => false) } }));
vi.mock('@capacitor/browser', () => ({ Browser: { open: vi.fn() } }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: {} }));
vi.mock('@/lib/supabase', () => ({ dbOperations: {} }));
vi.mock('@/lib/analytics', () => ({ analytics: {} }));

describe('password-reset email destinations', () => {
  afterEach(() => vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false));

  it('keeps website recovery intent even when the email link omits the hash type', () => {
    const url = new URL(getPasswordResetUrl());
    expect(url.origin).toBe(window.location.origin);
    expect(url.pathname).toBe('/auth/callback');
    expect(url.searchParams.get('type')).toBe('recovery');
    expect(urlIsPasswordRecovery('#access_token=a&refresh_token=b', url.search)).toBe(true);
  });

  it('keeps recovery intent through the iOS and Android app hand-off', () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
    const url = new URL(getPasswordResetUrl());
    expect(url.origin).toBe('https://educational-children-skills.lovable.app');
    expect(url.pathname).toBe('/auth/callback');
    expect(url.searchParams.get('native')).toBe('1');
    expect(url.searchParams.get('type')).toBe('recovery');
    url.searchParams.delete('native');
    expect(urlIsPasswordRecovery('#access_token=a&refresh_token=b', url.search)).toBe(true);
  });
});