import { describe, expect, it } from 'vitest';
import { orderedSkills } from '@/components/school/curriculum';
import { activityInvitations, invitationFor } from '@/data/activityInvitations';
import { allPracticalLifeSkills } from '@/data/practicalLifeAll';
import { completeSensorialSkills } from '@/data/completeSensorialSkills';
import { sensorialSkills } from '@/data/sensorialSkills';
import { additionalSensorialSkills } from '@/data/sensorialSkills2';
import { tactileSensorialSkills } from '@/data/tactileSensorialSkills';
import es from '@/i18n/lessons/es.json';
import de from '@/i18n/lessons/de.json';
import zh from '@/i18n/lessons/zh.json';

const dataMaps = [allPracticalLifeSkills, sensorialSkills, additionalSensorialSkills, tactileSensorialSkills, completeSensorialSkills] as Record<string, any>[];
const fromData = (id: string): string | undefined => {
  for (const m of dataMaps) { const inv = m[id]?.learningProcess?.presentation?.invitation; if (inv) return inv; }
};

describe('AMI invitation to the child', () => {
  const all = orderedSkills();

  it('every activity opens with an invitation to the child', () => {
    const missing = all.filter((s) => !invitationFor(s.id, fromData(s.id))).map((s) => s.id);
    expect(missing).toEqual([]);
  });

  it('every invitation is one question that asks the child "Would you like to…?"', () => {
    for (const s of all) expect(invitationFor(s.id, fromData(s.id))).toMatch(/^Would you like to [^?]+\?$/);
  });

  it('every invitation reads in Spanish, German and Chinese', () => {
    for (const s of all) {
      const en = invitationFor(s.id, fromData(s.id))!;
      for (const dict of [es, de, zh] as Record<string, string>[]) expect(dict[en], `${s.id}: ${en}`).toBeTruthy();
    }
  });

  it('keeps the invitation already written in the lesson, such as the Pink Tower', () => {
    expect(invitationFor('pink-tower', fromData('pink-tower'))).toBe('Would you like to work with the Pink Tower?');
    expect(invitationFor('pouring-water')).toBe('Would you like to learn how to pour water?');
  });

  it('names the material with the activity\'s own title in all four languages', () => {
    const dicts = { es, de, zh } as Record<string, Record<string, string>>;
    const words = (t: string) => t.replace(/Montessori-?|蒙台梭利/g, '').replace(/[(（].*?[)）]/g, '').split(/\s+[-–]\s+|[\s,&]+/).map((w) => w.toLowerCase()).filter((w) => w.length > 1 || /[\u4e00-\u9fff]/.test(w));
    const mismatches: string[] = [];
    for (const s of all) {
      const en = invitationFor(s.id, fromData(s.id))!;
      if (!/^Would you like to (work with|play) the /.test(en)) continue;
      const check = (lang: string, title: string, text: string) => {
        const lower = text.toLowerCase();
        // German declines material names, so compare word stems there.
        const missing = words(title).filter((w) => !(lang === 'de' && w.length < 4)).filter((w) => !lower.includes(lang === 'de' ? w.slice(0, 5) : w));
        if (missing.length) mismatches.push(`${lang} ${s.id}: "${text}" lacks ${missing.join(', ')}`);
      };
      check('en', s.titleEn, en);
      for (const lang of Object.keys(dicts)) check(lang, dicts[lang][s.titleEn] ?? s.titleEn, dicts[lang][en] ?? '');
    }
    expect(mismatches).toEqual([]);
  });

  it('lists invitations only for activities that exist', () => {
    const ids = new Set(all.map((s) => s.id));
    expect(Object.keys(activityInvitations).filter((id) => !ids.has(id))).toEqual([]);
  });
});
