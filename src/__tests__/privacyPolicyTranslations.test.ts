import { describe, expect, it } from 'vitest';
import { policyEn, type PrivacyPolicy } from '@/content/privacy/policy.en';
import es from '@/content/privacy/es.json';
import de from '@/content/privacy/de.json';
import zh from '@/content/privacy/zh.json';
import sw from '@/content/privacy/sw.json';
import hi from '@/content/privacy/hi.json';

const translations = { es, de, zh, sw, hi } as unknown as Record<string, PrivacyPolicy>;

// Links, emails, the cookie button and section anchors must survive translation unchanged.
const fixed = (s: string) => [
  ...[...s.matchAll(/\]\(([^)]+)\)/g)].map((m) => `link:${m[1]}`),
  ...[...s.matchAll(/[\w.]+@[\w.]+\.\w+/g)].map((m) => `mail:${m[0]}`),
  ...[...s.matchAll(/\[\[cookies\|/g)].map(() => 'cookies'),
  ...[...s.matchAll(/`([^`]+)`/g)].map((m) => `code:${m[1]}`),
  ...[...s.matchAll(/\b(\d+)\b/g)].map((m) => `n:${m[1]}`),
].sort();

const flatten = (p: PrivacyPolicy) => p.sections.flatMap((s, i) => s.blocks.flatMap((b, j) => {
  const key = `${i}.${j}`;
  if ('ul' in b) return b.ul.map((x, k) => [`${key}.${k}`, x]);
  return [[key, 'h3' in b ? b.h3 : 'h4' in b ? b.h4 : b.p]];
}));

describe('Privacy Policy translations', () => {
  for (const [lang, policy] of Object.entries(translations)) {
    it(`${lang} has every section, paragraph and list item of the English policy`, () => {
      expect(policy.sections.map((s) => [s.id, s.blocks.map((b) => Object.keys(b).sort().join())]))
        .toEqual(policyEn.sections.map((s) => [s.id, s.blocks.map((b) => Object.keys(b).sort().join())]));
      expect(flatten(policy).map(([k]) => k)).toEqual(flatten(policyEn).map(([k]) => k));
    });

    it(`${lang} keeps links, email addresses, numbers and the cookie settings button`, () => {
      const en = Object.fromEntries(flatten(policyEn));
      const wrong = flatten(policy).filter(([k, v]) => JSON.stringify(fixed(v)) !== JSON.stringify(fixed(en[k]))).map(([k, v]) => `${k}: ${v.slice(0, 80)}`);
      expect(wrong).toEqual([]);
    });

    it(`${lang} is actually translated and says the English version applies`, () => {
      expect(policy.translationNote).not.toBe(policyEn.translationNote);
      expect(policy.pageTitle).not.toBe(policyEn.pageTitle);
      const same = flatten(policy).filter(([k, v], i) => v === flatten(policyEn)[i][1] && /[a-z]{4,}\s[a-z]{4,}/.test(v) && !v.startsWith('不满'));
      expect(same.map(([k]) => k)).toEqual([]);
    });
  }

  it('keeps the bilingual China notice word for word in every language', () => {
    const cn = (p: PrivacyPolicy) => p.sections.flatMap((s) => s.blocks).find((b) => 'p' in b && b.keep);
    for (const policy of Object.values(translations)) expect(cn(policy)).toEqual(cn(policyEn));
  });

  it('names each region\'s privacy law and regulator in every language', () => {
    const codes = ['COPPA', 'FERPA', 'CCPA', 'GDPR', 'ICO', 'DSGVO', 'BDSG', 'TDDDG', 'BfDI', 'LOPDGDD', 'AEPD', 'LFPDPPP', 'ARCO', 'SIC', 'AAIP', 'PIPL', 'CAC', 'DPDP', 'ODPC', 'PDPO', 'PIPEDA', 'LGPD', 'ANPD', 'PIPC', 'OAIC'];
    for (const policy of [policyEn, ...Object.values(translations)]) {
      const section = policy.sections.find((s) => s.id === 'regional-compliance');
      const text = JSON.stringify(section?.blocks ?? []);
      expect(codes.filter((c) => !text.includes(c))).toEqual([]);
    }
  });
});
