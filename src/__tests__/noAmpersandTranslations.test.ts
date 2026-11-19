import { describe, expect, it } from 'vitest';
import es from '@/i18n/lessons/es.json';
import de from '@/i18n/lessons/de.json';
import zh from '@/i18n/lessons/zh.json';
import sw from '@/i18n/lessons/sw.json';
import hi from '@/i18n/lessons/hi.json';
import { resources } from '@/i18n/resources';
import { lessonInventory } from './helpers/lessonInventory';

// Translated text says "and" in its own language (y, und, 与/和, na, और) instead of "&".
// Hindi activity names keep the English name in brackets, which may contain "&".
const shown = new Set(lessonInventory());
const withoutEnglishBrackets = (s: string) => s.replace(/\s*\([^()]*[A-Za-z][^()]*\)\s*$/, '');
const flat = (o: unknown, out: string[] = []): string[] => {
  if (typeof o === 'string') out.push(o);
  else if (o && typeof o === 'object') Object.values(o).forEach((v) => flat(v, out));
  return out;
};

describe('no "&" in translated text', () => {
  it.each(Object.entries({ es, de, zh, sw, hi }))('%s lesson text', (_lang, dict) => {
    const bad = Object.entries(dict as Record<string, string>)
      .filter(([en, tr]) => shown.has(en) && withoutEnglishBrackets(tr).includes('&'))
      .map(([, tr]) => tr);
    expect(bad).toEqual([]);
  });

  it.each(['es', 'de', 'zh', 'sw', 'hi'] as const)('%s app screens', (lang) => {
    const bad = flat(resources[lang].translation).filter((s) => s.includes('&'));
    expect(bad).toEqual([]);
  });
});
