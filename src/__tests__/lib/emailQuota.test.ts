import { describe, it, expect } from 'vitest';
import { quotaLevel, GMAIL_DAILY_LIMIT, WARNING_THRESHOLD } from '../../../supabase/functions/_shared/emailQuota';

describe('email sending quota', () => {
  it('uses the Gmail limit of 500 per day', () => {
    expect(GMAIL_DAILY_LIMIT).toBe(500);
  });
  it('is fine below 400 emails', () => {
    expect(quotaLevel(399)).toBe('ok');
  });
  it('warns from 400 emails', () => {
    expect(WARNING_THRESHOLD).toBe(400);
    expect(quotaLevel(400)).toBe('warning');
  });
  it('reports the limit at 500 emails', () => {
    expect(quotaLevel(500)).toBe('limit');
  });
});
