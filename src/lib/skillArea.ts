import { curriculumSectionsForMaterials } from '@/data/curriculumSections';

let index: Map<string, { area: string; areaTitle: string; title: string }> | null = null;

export const skillIndex = () => {
  if (!index) {
    index = new Map();
    for (const s of curriculumSectionsForMaterials) {
      for (const [id, v] of Object.entries(s.skills)) {
        if (!index.has(id)) index.set(id, { area: s.key, areaTitle: s.title, title: v.title });
      }
    }
  }
  return index;
};

export const areaOfSkill = (skillId: string) => skillIndex().get(skillId)?.area ?? 'general';
export const titleOfSkill = (skillId: string) =>
  skillIndex().get(skillId)?.title ?? skillId.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
