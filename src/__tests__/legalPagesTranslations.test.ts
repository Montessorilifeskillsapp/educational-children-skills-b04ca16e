import { describe, expect, it } from 'vitest';
import type { LegalDoc } from '@/content/legal/types';
import { termsEn } from '@/content/terms/terms.en';
import { songsLicenceEn } from '@/content/songsLicence/licence.en';
import tEs from '@/content/terms/es.json';
import tDe from '@/content/terms/de.json';
import tZh from '@/content/terms/zh.json';
import tSw from '@/content/terms/sw.json';
import tHi from '@/content/terms/hi.json';
import lEs from '@/content/songsLicence/es.json';
import lDe from '@/content/songsLicence/de.json';
import lZh from '@/content/songsLicence/zh.json';
import lSw from '@/content/songsLicence/sw.json';
import lHi from '@/content/songsLicence/hi.json';

const docs: [string, LegalDoc, Record<string, LegalDoc>][] = [
  ['Terms of Service', termsEn, { es: tEs, de: tDe, zh: tZh, sw: tSw, hi: tHi } as unknown as Record<string, LegalDoc>],
  ['Songs License', songsLicenceEn, { es: lEs, de: lDe, zh: lZh, sw: lSw, hi: lHi } as unknown as Record<string, LegalDoc>],
];

// Links, email addresses, prices, durations and section numbers must survive translation unchanged.
const fixed = (s: string) => [
  ...[...s.matchAll(/\]\(([^)]+)\)/g)].map((m) => `link:${m[1]}`),
  ...[...s.matchAll(/[\w.]+@[\w.]+\.\w+/g)].map((m) => `mail:${m[0]}`),
  ...[...s.matchAll(/\b(\d+)\b/g)].map((m) => `n:${m[1]}`),
].sort();

const flatten = (d: LegalDoc) => d.sections.flatMap((s, i) => [
  ...(s.title ? [[`${i}.title`, s.title]] : []),
  ...s.blocks.flatMap((b, j) => ('ul' in b ? b.ul.map((x, k) => [`${i}.${j}.${k}`, x]) : [[`${i}.${j}`, 'h3' in b ? b.h3 : 'h4' in b ? b.h4 : b.p]])),
]);

describe.each(docs)('%s translations', (_name, english, translations) => {
  for (const [lang, doc] of Object.entries(translations)) {
    it(`${lang} has every section, heading, paragraph and list item`, () => {
      expect(flatten(doc).map(([k]) => k)).toEqual(flatten(english).map(([k]) => k));
    });
    it(`${lang} keeps links, email addresses, prices and numbers`, () => {
      const en = Object.fromEntries(flatten(english));
      const wrong = flatten(doc).filter(([k, v]) => JSON.stringify(fixed(v)) !== JSON.stringify(fixed(en[k]))).map(([k, v]) => `${k}: ${v.slice(0, 60)}`);
      expect(wrong).toEqual([]);
    });
    it(`${lang} is translated and says the English version applies`, () => {
      expect(doc.translationNote).not.toBe(english.translationNote);
      expect(doc.pageTitle).not.toBe(english.pageTitle);
      const en = flatten(english);
      expect(flatten(doc).filter(([, v], i) => v === en[i][1] && /[a-z]{4,}\s[a-z]{4,}/.test(v)).map(([k]) => k)).toEqual([]);
      expect(JSON.stringify(doc)).not.toContain('&');
    });
  }
  it('Hindi spells Montessori मोंटेसरि', () => {
    expect(JSON.stringify(translations.hi)).not.toMatch(/मोंटेसरी|मॉन्टेसरी/);
  });
});

// Words spelled the same in another language (German "Pause").
const SAME_WORD = new Set(['Pause']);

describe('Accessibility and Songs page translations', async () => {
  const langs = await Promise.all(['en', 'es', 'de', 'zh', 'sw', 'hi'].map(async (l) => [l, (await import(`@/i18n/locales/pages/${l}.ts`))[l]] as const));
  const en = Object.fromEntries(langs).en;
  const strings = (o: unknown): string[] => typeof o === 'string' ? [o] : Array.isArray(o) ? o.flatMap(strings) : o && typeof o === 'object' ? Object.values(o).flatMap(strings) : [];
  for (const [lang, pack] of langs.filter(([l]) => l !== 'en')) {
    it(`${lang} translates every Songs and Accessibility line and keeps the same placeholders`, () => {
      for (const key of ['songs', 'accessibility'] as const) {
        const src = strings(en[key]);
        const out = strings(pack[key]);
        expect(out).toHaveLength(src.length);
        expect(src.filter((s, i) => s === out[i] && /[a-z]{3,}/.test(s) && !SAME_WORD.has(s))).toEqual([]);
        src.forEach((s, i) => expect((out[i].match(/\{\{\w+\}\}|<mail>/g) ?? []).sort()).toEqual((s.match(/\{\{\w+\}\}|<mail>/g) ?? []).sort()));
      }
    });
    it(`${lang} sign-in welcome card is translated`, async () => {
      const auth = (await import(`@/i18n/locales/auth/${lang}.ts`))[lang];
      const authEn = (await import('@/i18n/locales/auth/en.ts')).en;
      for (const k of Object.keys(authEn.welcomeCard)) expect(auth.welcomeCard[k]).not.toBe(authEn.welcomeCard[k]);
    });
  }
});
