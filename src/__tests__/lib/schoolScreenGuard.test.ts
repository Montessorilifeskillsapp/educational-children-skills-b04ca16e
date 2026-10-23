import { describe, it, expect, beforeEach } from 'vitest';
import { DEFAULT_LOCK_MINUTES, LOCK_OPTIONS, readPrefs } from '@/components/school/ScreenGuard';

describe('portal screen guard', () => {
  beforeEach(() => localStorage.clear());
  it('defaults to on, 15 minutes', () => { expect(readPrefs()).toEqual({ minutes: 15, off: false }); expect(DEFAULT_LOCK_MINUTES).toBe(15); });
  it('offers 5 min to 2 hours', () => { expect([...LOCK_OPTIONS]).toEqual([5, 15, 30, 60, 120]); });
  it('remembers disabled on this device', () => {
    localStorage.setItem('school-screen-guard', JSON.stringify({ minutes: 60, off: true }));
    expect(readPrefs()).toEqual({ minutes: 60, off: true });
  });
});
