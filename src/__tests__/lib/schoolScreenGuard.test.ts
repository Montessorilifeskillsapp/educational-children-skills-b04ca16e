import { describe, it, expect } from 'vitest';
import { LOCK_AFTER_MS, SIGN_OUT_AFTER_MS } from '@/components/school/ScreenGuard';

describe('portal screen guard', () => {
  it('hides records after 5 minutes idle', () => { expect(LOCK_AFTER_MS).toBe(5 * 60 * 1000); });
  it('signs out after 30 minutes idle', () => { expect(SIGN_OUT_AFTER_MS).toBe(30 * 60 * 1000); });
});
