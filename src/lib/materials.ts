import { activityMaterials } from '@/data/activityMaterials';
import type { Material } from '@/data/activityMaterials';

export interface ActivityMaterial {
  key: string;
  displayName: string;
  essential: boolean;
}

export function normalizeMaterialKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseMaterialName(raw: string): { name: string; essential: boolean } {
  const trimmed = raw.trim();
  const essential = /\(essential\)|\*\s*$|†\s*$|⚹\s*$/i.test(trimmed);
  const cleaned = trimmed
    .replace(/\s*\(essential\)\s*$/i, '')
    .replace(/\s*\*\s*$/, '')
    .replace(/\s*†\s*$/, '')
    .replace(/\s*⚹\s*$/, '')
    .trim();
  return { name: cleaned, essential };
}

export function activityMaterialsForSkill(skillId: string): ActivityMaterial[] | null {
  const list = activityMaterials[skillId];
  if (!list || list.length === 0) return null;
  return list.map((m) => ({
    key: normalizeMaterialKey(m.name),
    displayName: m.name,
    essential: m.essential,
  }));
}

export function materialsFromSkillArray(materials: string[]): ActivityMaterial[] {
  return materials.map((raw) => {
    const { name, essential } = parseMaterialName(raw);
    return {
      key: normalizeMaterialKey(name),
      displayName: name,
      essential,
    };
  });
}

export function mergeMaterials(
  structured: ActivityMaterial[] | null,
  fallback: string[] | undefined
): ActivityMaterial[] {
  if (structured && structured.length > 0) return structured;
  if (fallback && fallback.length > 0) return materialsFromSkillArray(fallback);
  return [];
}

export function getMaterialsForSkill(
  skillId: string,
  skillMaterials?: string[]
): ActivityMaterial[] {
  return mergeMaterials(activityMaterialsForSkill(skillId), skillMaterials);
}

export function extractAllMaterialsFromSkills(
  skills: Record<string, { title: string; materials?: string[] }>
): ActivityMaterial[] {
  const seen = new Set<string>();
  const result: ActivityMaterial[] = [];

  for (const [skillId, skill] of Object.entries(skills)) {
    const mats = getMaterialsForSkill(skillId, skill.materials);
    for (const m of mats) {
      if (!seen.has(m.key)) {
        seen.add(m.key);
        result.push(m);
      }
    }
  }

  return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function materialThumbnailUrl(materialName: string): string | undefined {
  // Reserved for future per-material image registry.
  return undefined;
}
