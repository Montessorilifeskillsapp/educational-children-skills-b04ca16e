import { describe, expect, it } from 'vitest';
import { resources } from '@/i18n/resources';

const LANGS = ['es', 'de', 'zh', 'sw', 'hi'] as const;
const en = resources.en.translation as any;

describe('Pouring Water sample lesson page', () => {
  it.each(LANGS)('is fully translated in %s', (lang) => {
    const tr = (resources[lang].translation as any).pages.pouringPreview;
    for (const key of Object.keys(en.pages.pouringPreview)) {
      expect(tr[key], key).toBeTruthy();
      expect(tr[key], key).not.toBe(en.pages.pouringPreview[key]);
    }
  });
});

describe('Practical Life card levels', () => {
  it.each(LANGS)('"Easy" and "Medium" are translated in %s', (lang) => {
    const d = (resources[lang].translation as any).chrome.card.difficulty;
    expect(d.Easy).toBeTruthy();
    expect(d.Easy).not.toBe('Easy');
    expect(d.Medium).toBeTruthy();
    expect(d.Medium).not.toBe('Medium');
  });
});
