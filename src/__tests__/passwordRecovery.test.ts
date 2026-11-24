import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearPasswordRecovery,
  detectPasswordRecoveryInUrl,
  getLaunchHash,
  isPasswordRecoveryPending,
  markPasswordRecovery,
  urlIsPasswordRecovery,
} from '@/lib/passwordRecovery';

describe('password reset links', () => {
  beforeEach(() => clearPasswordRecovery());

  it('recognizes a reset link from the email', () => {
    expect(urlIsPasswordRecovery('#access_token=a&refresh_token=b&type=recovery', '')).toBe(true);
    expect(urlIsPasswordRecovery('', '?native=1&type=recovery')).toBe(true);
  });

  it('does not treat sign-up confirmations or sign-in links as resets', () => {
    expect(urlIsPasswordRecovery('#access_token=a&type=signup', '')).toBe(false);
    expect(urlIsPasswordRecovery('', '?native=1')).toBe(false);
  });

  it('keeps the new-password form owed after the address is cleared', () => {
    detectPasswordRecoveryInUrl({ hash: '#access_token=a&type=recovery', search: '?native=1' });
    expect(getLaunchHash()).toBe('#access_token=a&type=recovery');
    expect(isPasswordRecoveryPending()).toBe(true);
  });

  it('stops asking once the reset link would have expired (1 hour)', () => {
    const start = 1_700_000_000_000;
    markPasswordRecovery(start);
    expect(isPasswordRecoveryPending(start + 59 * 60 * 1000)).toBe(true);
    expect(isPasswordRecoveryPending(start + 61 * 60 * 1000)).toBe(false);
  });

  it('clears once the password is saved or skipped', () => {
    markPasswordRecovery();
    clearPasswordRecovery();
    expect(isPasswordRecoveryPending()).toBe(false);
  });
});

describe('reset link cannot skip the new-password form', () => {
  beforeEach(() => { clearPasswordRecovery(); localStorage.clear(); sessionStorage.clear(); });

  it('remembers the reset on the whole device, so a new tab or reload still shows the form', () => {
    markPasswordRecovery();
    sessionStorage.clear(); // a fresh tab has no per-tab memory
    expect(isPasswordRecoveryPending()).toBe(true);
  });

  it('recognizes the website reset address even when the sign-in details arrive without a type', () => {
    expect(urlIsPasswordRecovery('#access_token=a&refresh_token=b', '?type=recovery')).toBe(true);
  });

  it('clears the reset from the whole device once finished', () => {
    markPasswordRecovery();
    clearPasswordRecovery();
    expect(localStorage.getItem('mls:password-recovery')).toBeNull();
    expect(isPasswordRecoveryPending()).toBe(false);
  });
});

import { accessTokenIsRecovery } from '@/lib/passwordRecovery';
const jwt = (claims: object) => `h.${btoa(JSON.stringify(claims)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')}.s`;
describe('reset-link sign-ins grant no access', () => {
  it('recognises a sign-in that came from a reset link', () => {
    expect(accessTokenIsRecovery(jwt({ amr: [{ method: 'recovery', timestamp: 1 }] }))).toBe(true);
  });
  it('treats a normal password sign-in as normal', () => {
    expect(accessTokenIsRecovery(jwt({ amr: [{ method: 'password', timestamp: 1 }] }))).toBe(false);
  });
  it('ignores missing or broken tokens', () => {
    expect(accessTokenIsRecovery(undefined)).toBe(false);
    expect(accessTokenIsRecovery('garbage')).toBe(false);
  });
});
