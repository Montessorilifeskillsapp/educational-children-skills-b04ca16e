import { describe, it, expect } from 'vitest';
import { en } from '@/i18n/locales/home/en';
import { es } from '@/i18n/locales/home/es';
import { de } from '@/i18n/locales/home/de';
import { zh } from '@/i18n/locales/home/zh';
import { sw } from '@/i18n/locales/home/sw';
import { hi } from '@/i18n/locales/home/hi';

// Each of the seven "A clearer starting point" questions opens a guide card in every language.
const langs = { en, es, de, zh, sw, hi };

describe('homepage starting-point guide cards', () => {
  for (const [lang, bundle] of Object.entries(langs)) {
    it(`${lang} has a complete guide card for all seven questions`, () => {
      const steps = bundle.problem.steps;
      expect(steps).toHaveLength(7);
      steps.forEach((step, i) => {
        expect(step.title.trim()).not.toBe('');
        expect(step.body.trim()).not.toBe('');
        expect(step.link.trim()).not.toBe('');
        expect(step.points).toHaveLength(en.problem.steps[i].points.length);
        step.points.forEach((p) => expect(p.trim()).not.toBe(''));
      });
    });
  }
});
