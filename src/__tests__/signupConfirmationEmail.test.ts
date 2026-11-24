import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';

const invoke = vi.fn();
vi.mock('@/integrations/supabase/client', () => ({ supabase: { functions: { invoke: (...a: unknown[]) => invoke(...a) } } }));
vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => false } }));

import { confirmSignup, requestSignup, resendConfirmation } from '@/lib/accountSignup';

describe('new-account confirmation emails', () => {
  beforeEach(() => invoke.mockReset());

  it('email sign-up never uses the failing built-in confirmation sender', () => {
    const src = readFileSync('src/hooks/useAuth.ts', 'utf8');
    expect(src).not.toMatch(/auth\.signUp\(/);
    expect(src).toMatch(/requestSignup\(/);
  });

  it('asks the server to create the account and email the confirmation link', async () => {
    invoke.mockResolvedValue({ data: { ok: true }, error: null });
    expect(await requestSignup(' parent@example.com ', 'secret12')).toEqual({ error: null, existing: false });
    expect(invoke).toHaveBeenCalledWith('account-signup', { body: { action: 'signup', email: 'parent@example.com', password: 'secret12', origin: window.location.origin } });
  });

  it('reports an already-confirmed address instead of a false "check your email"', async () => {
    invoke.mockResolvedValue({ data: { ok: true, existing: true }, error: null });
    expect((await requestSignup('parent@example.com', 'secret12')).existing).toBe(true);
  });

  it('can resend a confirmation link for an unconfirmed address', async () => {
    invoke.mockResolvedValue({ data: { ok: true }, error: null });
    expect(await resendConfirmation('parent@example.com')).toEqual({ error: null });
    expect(invoke).toHaveBeenCalledWith('account-signup', { body: { action: 'resend', email: 'parent@example.com', origin: window.location.origin } });
  });

  it('a used or expired confirmation link confirms nothing', async () => {
    invoke.mockResolvedValue({ data: null, error: new Error('expired') });
    expect(await confirmSignup('tok')).toEqual({ email: null, error: 'expired' });
  });
});
