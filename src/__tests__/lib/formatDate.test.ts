import { afterEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { formatDate, formatDateRange } from '@/i18n/format';

describe('calendar dates follow the chosen language', () => {
  afterEach(() => i18n.changeLanguage('en'));
  const day = new Date(2026, 10, 19);

  it('shows Swahili day and month names, not English', async () => {
    await i18n.changeLanguage('sw');
    expect(formatDate(day, { weekday: 'long', month: 'long', day: 'numeric' })).toBe('Alhamisi, 19 Novemba');
    expect(formatDate(day, { month: 'long', year: 'numeric' })).toBe('Novemba 2026');
  });

  it('shows Hindi day names', async () => {
    await i18n.changeLanguage('hi');
    expect(formatDate(day, { weekday: 'long' })).toBe('गुरुवार');
  });

  it('formats a school week as one range', async () => {
    await i18n.changeLanguage('en');
    expect(formatDateRange(day, new Date(2026, 10, 23), { month: 'short', day: 'numeric', year: 'numeric' })).toMatch(/^Nov 19\s*–\s*23, 2026$/);
  });
});
