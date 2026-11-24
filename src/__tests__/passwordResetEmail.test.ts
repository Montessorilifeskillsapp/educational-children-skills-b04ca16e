import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';

const invoke = vi.fn();
vi.mock('@/integrations/supabase/client', () => ({ supabase: { functions: { invoke: (...a: unknown[]) => invoke(...a) } } }));
vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => false } }));

import { completePasswordReset, requestPasswordReset } from '@/lib/passwordResetRequest';

describe('password reset emails', () => {
  beforeEach(() => invoke.mockReset());

  it('every "Forgot password?" button uses the app reset sender, not the failing built-in one', () => {
    for (const file of ['src/pages/AuthPage.tsx', 'src/components/AuthModal.tsx']) {
      const src = readFileSync(file, 'utf8');
      expect(src).not.toMatch(/resetPasswordForEmail/);
      expect(src).toMatch(/requestPasswordReset\(/);
    }
  });

  it('asks the server to send the reset email for the typed address', async () => {
    invoke.mockResolvedValue({ data: { ok: true }, error: null });
    expect(await requestPasswordReset('  parent@example.com ')).toEqual({ error: null });
    expect(invoke).toHaveBeenCalledWith('password-reset', { body: { action: 'request', email: 'parent@example.com', origin: window.location.origin } });
  });

  it('saving a new password returns the account email so the person signs in with the new password', async () => {
    invoke.mockResolvedValue({ data: { ok: true, email: 'parent@example.com' }, error: null });
    expect(await completePasswordReset('tok', 'newpass1')).toEqual({ email: 'parent@example.com', error: null });
  });

  it('a used or expired link gives no account access', async () => {
    invoke.mockResolvedValue({ data: null, error: new Error('expired') });
    const res = await completePasswordReset('tok', 'newpass1');
    expect(res.email).toBeNull();
    expect(res.error).toBe('expired');
  });
});
