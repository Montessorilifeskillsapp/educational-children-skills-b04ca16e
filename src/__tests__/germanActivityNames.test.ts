import { describe, expect, it } from 'vitest';
import { orderedSkills } from '@/components/school/curriculum';
import de from '@/i18n/lessons/de.json';

// German titles follow the native review ("Boden kehren"), with "und" rather than "&".
describe('German activity names', () => {
  const dict = de as Record<string, string>;
  const names = orderedSkills().map((s) => dict[s.titleEn]);

  it('uses the reviewed wording', () => {
    expect(dict['Pouring Water']).toBe('Wasser umgießen');
    expect(dict['Sweeping the Floor']).toBe('Boden kehren');
    expect(dict['Washing Tables']).toBe('Tische waschen');
    expect(dict['Teen Boards']).toBe('Seguin-Tafeln (11–19)');
    expect(dict['Saying Please and Thank You']).toBe('„Bitte“ und „Danke“ sagen');
  });

  it('never uses "&"', () => {
    expect(names.filter((n) => n.includes('&'))).toEqual([]);
  });
});
