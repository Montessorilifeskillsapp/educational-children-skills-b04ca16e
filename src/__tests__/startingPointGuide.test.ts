import { describe, it, expect } from 'vitest';
import { STARTING_POINT_LINKS } from '@/components/StartingPointGuide';
import { en } from '@/i18n/locales/home/en';
import { zh } from '@/i18n/locales/home/zh';
import { hi } from '@/i18n/locales/home/hi';
import { sw } from '@/i18n/locales/home/sw';

describe('Homepage starting-point guide', () => {
  it('has one guide and link for each of the seven questions', () => {
    expect(STARTING_POINT_LINKS).toHaveLength(7);
    expect(Object.keys(en.problem.guide).filter((k) => /^g\d$/.test(k))).toHaveLength(7);
  });
  it('the readiness question opens the readiness guide', () => {
    expect(STARTING_POINT_LINKS[1]).toBe('/readiness-guide');
  });
  it('child invitations follow the agreed wording per language', () => {
    expect(zh.problem.guide.g5.p1).toContain('“你想');
    expect(hi.problem.guide.g5.p1).toContain('चाहोगे/चाहोगी');
    expect(sw.problem.guide.g5.p1).toContain('Je, ungependa');
  });
});

describe('Starting-point guide uses the agreed activity and material names', () => {
  it('Kiswahili says sinia for tray and kuhamisha kwa kijiko for spooning', () => {
    const text = JSON.stringify(sw.problem.guide);
    expect(text).not.toMatch(/\btrei\b/);
    expect(text).not.toMatch(/kuchota/);
    expect(sw.problem.guide.g1.p1).toContain('kuhamisha kwa kijiko');
  });
  it('Hindi uses the agreed spooning and dry pouring names', () => {
    expect(hi.problem.guide.g1.p1).toContain('चम्मच से स्थानांतरण');
    expect(hi.problem.guide.g1.p2).toContain('सूखी सामग्री उँडेलना');
  });
});
