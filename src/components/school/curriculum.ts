import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { areaTitle } from '@/i18n/format';
import { lessonText } from '@/i18n/lessonText';

/** `title` and `areaTitle` follow the chosen language; `titleEn` is the stable English title used for standards lookups. */
export interface SkillRef { id: string; title: string; titleEn: string; areaKey: string; areaTitle: string; route: string; order: number }

let cache: SkillRef[] | null = null;

/** Every activity, grouped by area, in the curriculum's own beginner-to-advanced order. */
export function orderedSkills(): SkillRef[] {
  if (cache) return cache;
  const out: SkillRef[] = [];
  for (const s of curriculumSectionsForMaterials) {
    for (const [id, sk] of Object.entries(s.skills)) {
      // An activity can belong to more than one area. Keep each area's entry;
      // the stored skill id still identifies the same observation record.
      if (!sk?.title) continue;
      // Area titles follow the chosen language; keys and ids stay stable.
      const titleEn = sk.title;
      out.push({ id, get title() { return lessonText(titleEn); }, titleEn, areaKey: s.key, get areaTitle() { return areaTitle(s.key, s.title); }, route: s.route, order: out.length });
    }
  }
  cache = out;
  return out;
}

export const areas = () => curriculumSectionsForMaterials.map((s) => ({ key: s.key, title: areaTitle(s.key, s.title) }));

export function skillById(id: string): SkillRef | undefined {
  return orderedSkills().find((s) => s.id === id);
}

/** Deep link that opens this exact activity on its section page, marked as coming from the School Portal. */
export function skillLink(sk: SkillRef): string {
  return `${sk.route}?activity=${encodeURIComponent(sk.id)}&from=school`;
}

/** The next activity in the same area after the furthest mastered one, skipping anything already recorded. */
export function nextSuggestions(records: { skill_id: string; status: string }[]): SkillRef[] {
  const all = orderedSkills();
  const recorded = new Set(records.map((r) => r.skill_id));
  const out: SkillRef[] = [];
  for (const a of areas()) {
    const inArea = all.filter((s) => s.areaKey === a.key);
    let last = -1;
    inArea.forEach((s, i) => { if (records.some((r) => r.skill_id === s.id && r.status === 'mastered')) last = i; });
    if (last < 0) continue;
    const next = inArea.slice(last + 1).find((s) => !recorded.has(s.id));
    if (next) out.push(next);
  }
  return out;
}
