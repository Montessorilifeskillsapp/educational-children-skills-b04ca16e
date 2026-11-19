import { describe, expect, it } from 'vitest';
import { orderedSkills } from '@/components/school/curriculum';
import es from '@/i18n/lessons/es.json';

// Spanish titles use sentence case ("Trasvasar agua", "Torre rosa"); proper names keep capitals.
const PROPER = new Set(['Montessori', 'Seguin', 'Tierra']);

describe('Spanish activity names', () => {
  const dict = es as Record<string, string>;

  it('writes Pouring Water as "Trasvasar agua"', () => {
    expect(dict['Pouring Water']).toBe('Trasvasar agua');
  });

  it('capitalize only the first word of each part, apart from proper names', () => {
    const wrong = orderedSkills().map((s) => dict[s.titleEn]).filter((name) => name.split(/\s+[-–]\s+/).some((part) =>
      part.split(/\s+/).slice(1).some((w) => /^[(¿¡]?[A-ZÁÉÍÓÚÑ]/.test(w) && !PROPER.has(w.replace(/[^\p{L}]/gu, '')))));
    expect(wrong).toEqual([]);
  });
});
