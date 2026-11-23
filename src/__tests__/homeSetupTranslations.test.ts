import { describe, it, expect } from 'vitest';
import { en } from '@/i18n/locales/pages/en';
import { es } from '@/i18n/locales/pages/es';
import { de } from '@/i18n/locales/pages/de';
import { zh } from '@/i18n/locales/pages/zh';
import { sw } from '@/i18n/locales/pages/sw';
import { hi } from '@/i18n/locales/pages/hi';

const others = { es, de, zh, sw, hi };

describe('Home setup page is available in every language', () => {
  for (const [lang, pack] of Object.entries(others)) {
    it(`${lang} has all 13 steps, 10 checklist items and 4 Practical Life points, none left in English`, () => {
      const hs = pack.homeSetup;
      expect(hs.steps).toHaveLength(13);
      expect(hs.checklist).toHaveLength(10);
      expect(hs.plList).toHaveLength(4);
      const src = en.homeSetup as unknown as Record<string, unknown>;
      const out = hs as unknown as Record<string, unknown>;
      const pairs: [string, string][] = [
        ...Object.keys(src).filter((k) => typeof src[k] === 'string').map((k) => [src[k], out[k]] as [string, string]),
        ...en.homeSetup.steps.flatMap((s, i) => [[s.title, hs.steps[i].title], [s.body, hs.steps[i].body]] as [string, string][]),
        ...en.homeSetup.checklist.map((c, i) => [c, hs.checklist[i]] as [string, string]),
      ];
      expect(pairs.filter(([a, b]) => a === b)).toEqual([]);
    });
  }
  it('German addresses the reader with Sie', () => {
    expect(de.homeSetup.steps[0].title).toContain('Sie');
  });
  it('Hindi spells Montessori मोंटेसरि', () => {
    expect(JSON.stringify(hi.homeSetup)).not.toMatch(/मोंटेसरी|मॉन्टेसरी/);
    expect(hi.homeSetup.title).toContain('मोंटेसरि');
  });
});
