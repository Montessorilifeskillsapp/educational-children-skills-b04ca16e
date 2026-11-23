import { describe, it, expect, vi, beforeEach } from 'vitest';

const signOut = vi.fn().mockResolvedValue({ error: null });
vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: { signOut } } }));
vi.mock('@/components/school/offlineQueue', () => ({ flushQueue: vi.fn().mockResolvedValue(undefined) }));

describe('Sign out', () => {
  beforeEach(() => {
    signOut.mockClear();
    Object.defineProperty(window, 'location', { value: { ...window.location, assign: vi.fn() }, writable: true });
  });
  it('signs out on this device only and returns to the home page', async () => {
    sessionStorage.setItem('school_auto_open', '1');
    const { signOutAndReset } = await import('@/lib/signOut');
    await signOutAndReset();
    expect(signOut).toHaveBeenCalledWith({ scope: 'local' });
    expect(sessionStorage.getItem('school_auto_open')).toBeNull();
    expect(window.location.assign).toHaveBeenCalledWith('/');
  });
  it('switching account signs out on this device and opens the sign-in page', async () => {
    const { signOutAndReset } = await import('@/lib/signOut');
    await signOutAndReset('/auth');
    expect(signOut).toHaveBeenCalledWith({ scope: 'local' });
    expect(window.location.assign).toHaveBeenCalledWith('/auth');
  });
});
