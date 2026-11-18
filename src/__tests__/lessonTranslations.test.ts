import { describe, expect, it } from 'vitest';
import { writeFileSync } from 'fs';
import es from '@/i18n/lessons/es.json';
import de from '@/i18n/lessons/de.json';
import zh from '@/i18n/lessons/zh.json';
import { lessonInventory } from './helpers/lessonInventory';

const DICTS: Record<string, Record<string, string>> = { es, de, zh };
const inventory = lessonInventory();

describe('lesson content translations', () => {
  it.each(Object.keys(DICTS))('every lesson string shown in the app has a %s translation', (lang) => {
    const missing = inventory.filter((s) => !DICTS[lang][s]);
    // `python3 scripts/translate-lessons.py <lang>` fills gaps listed here after new activities are added.
    if (missing.length) writeFileSync(`/tmp/lesson-missing-${lang}.json`, JSON.stringify(missing));
    expect(missing).toEqual([]);
  });

  it('writes Dr. Maria Montessori with her full name in every language', () => {
    for (const dict of Object.values(DICTS)) for (const [en, tr] of Object.entries(dict)) {
      if (en.includes('Dr. Maria Montessori')) expect(tr).toContain('Maria Montessori');
    }
  });
});

describe('lesson text at display time', () => {
  it('shows German lesson text when German is chosen and keeps English otherwise', async () => {
    const { default: i18n } = await import('@/i18n');
    const { lessonText, loadLessonText } = await import('@/i18n/lessonText');
    await i18n.changeLanguage('de');
    await loadLessonText('de');
    expect(lessonText('Pink Tower')).toBe('Rosa Turm');
    expect(lessonText('A sentence nobody translated')).toBe('A sentence nobody translated');
    await i18n.changeLanguage('en');
    expect(lessonText('Pink Tower')).toBe('Pink Tower');
  });

  it('keeps standards lookups on the English activity title in every language', async () => {
    const { default: i18n } = await import('@/i18n');
    const { loadLessonText } = await import('@/i18n/lessonText');
    const { orderedSkills } = await import('@/components/school/curriculum');
    await i18n.changeLanguage('zh');
    await loadLessonText('zh');
    const tower = orderedSkills().find((s) => s.id === 'pink-tower')!;
    expect(tower.titleEn).toBe('Pink Tower');
    expect(tower.title).not.toBe('Pink Tower');
    await i18n.changeLanguage('en');
  });
});
