import { describe, it, expect } from 'vitest';
import { en } from '@/i18n/locales/pages/en';
import { es } from '@/i18n/locales/pages/es';
import { de } from '@/i18n/locales/pages/de';
import { zh } from '@/i18n/locales/pages/zh';
import { sw } from '@/i18n/locales/pages/sw';
import { hi } from '@/i18n/locales/pages/hi';
import { classroomSetupMaterialGroups } from '@/data/classroomSetupMaterials';

const others = { es, de, zh, sw, hi };
// Words that are the same in both languages by approval (Spanish area name).
const SAME_ON_PURPOSE = new Set(['Sensorial']);

const strings = (o: unknown): string[] =>
  typeof o === 'string' ? [o] : Array.isArray(o) ? o.flatMap(strings) : o && typeof o === 'object' ? Object.values(o).flatMap(strings) : [];

describe('Classroom Setup page is available in every language', () => {
  it('English lists every classroom item and group so none show untranslated', () => {
    for (const g of classroomSetupMaterialGroups) {
      expect(en.classroomSetup.materials.groups).toHaveProperty([g.title]);
      for (const m of g.materials) expect(en.classroomSetup.materials.items).toHaveProperty([m]);
    }
  });
  for (const [lang, pack] of Object.entries(others)) {
    it(`${lang}: six principles, five areas, twelve checklist items, nothing left in English`, () => {
      const cs = pack.classroomSetup;
      expect(cs.principles).toHaveLength(6);
      expect(cs.areas).toHaveLength(5);
      expect(cs.checklist).toHaveLength(12);
      expect(cs.shelfRules).toHaveLength(6);
      expect(cs.adultRules).toHaveLength(6);
      const src = strings(en.classroomSetup);
      const out = strings(cs);
      expect(out).toHaveLength(src.length);
      const leftovers = src.filter((s, i) => s === out[i] && !SAME_ON_PURPOSE.has(s) && !/^\{\{|AMI/.test(s));
      expect(leftovers).toEqual([]);
    });
    it(`${lang}: keeps the full organization names and Dr. Maria Montessori`, () => {
      const cs = pack.classroomSetup;
      expect(cs.intro).toContain('Association Montessori Internationale');
      expect(cs.intro).toContain('American Montessori Society');
      expect(cs.envIntro).toMatch(/Maria Montessori|मारिया मोंटेसरि/);
      expect(cs.envIntro).toMatch(/<em>.+<\/em>/);
    });
  }
  it('German addresses the reader with Sie', () => {
    expect(de.classroomSetup.title).toContain('Sie');
  });
  it('Kiswahili says sinia for tray', () => {
    expect(sw.classroomSetup.materials.items.Tray).toBe('Sinia');
    expect(JSON.stringify(sw.classroomSetup)).not.toMatch(/\btrei\b/i);
  });
  it('Hindi spells Montessori मोंटेसरि', () => {
    expect(JSON.stringify(hi.classroomSetup)).not.toMatch(/मोंटेसरी|मॉन्टेसरी/);
  });
});
