import { describe, it, expect } from 'vitest';
import { planeOfSkill, planeOfAgeGroup, INFANT_TODDLER_ACTIVITIES, INFANT_TODDLER_PREFIX, INFANT_TODDLER_ENABLED } from '@/data/curriculumStages';
import { allCurriculumSkills } from '@/data/curriculumSections';

describe('curriculum stages', () => {
  it('existing 3–6 activities stay 3–6', () => {
    expect(Object.keys(allCurriculumSkills()).every((id) => planeOfSkill(id) === '3-6')).toBe(true);
  });
  it('prefixed ids resolve to 0–3', () => expect(planeOfSkill('it-posting-box')).toBe('0-3'));
  it('age groups map to planes', () => {
    expect(planeOfAgeGroup('Nido')).toBe('0-3');
    expect(planeOfAgeGroup('Infant Community')).toBe('0-3');
    expect(planeOfAgeGroup('3–6')).toBe('3-6');
    expect(planeOfAgeGroup(null)).toBe('3-6');
  });
  it('0–3 is hidden and every registered id uses the prefix', () => {
    expect(INFANT_TODDLER_ENABLED).toBe(false);
    expect(Object.keys(INFANT_TODDLER_ACTIVITIES).every((id) => id.startsWith(INFANT_TODDLER_PREFIX))).toBe(true);
  });
});
