import { describe, expect, it } from 'vitest';
import { orderedSkills } from '@/components/school/curriculum';
import hi from '@/i18n/lessons/hi.json';

// Indian teachers often trained with English Montessori names, so Hindi activity names show the English name after.
describe('Hindi activity names', () => {
  const dict = hi as Record<string, string>;

  it('show the English name in brackets after the Hindi, for example गुलाबी मीनार (Pink Tower)', () => {
    expect(dict['Pink Tower']).toBe('गुलाबी मीनार (Pink Tower)');
  });

  it('every activity name has Hindi followed by its English name', () => {
    const wrong = orderedSkills().map((s) => s.titleEn).filter((en) => {
      const v = dict[en] ?? '';
      return !v.endsWith(` (${en})`) || !/[\u0900-\u097F]/.test(v.slice(0, -en.length - 3));
    });
    expect(wrong).toEqual([]);
  });
});
