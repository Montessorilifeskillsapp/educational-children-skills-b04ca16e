import { activityMaterials } from '@/data/activityMaterials';
import type { Material } from '@/data/activityMaterials';
import { cleanMaterialName } from '@/lib/materialCleanup';

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

function dedupeByKey(items: ActivityMaterial[]): ActivityMaterial[] {
  const seen = new Set<string>();
  const out: ActivityMaterial[] = [];
  for (const item of items) {
    if (seen.has(item.key)) continue;
    seen.add(item.key);
    out.push(item);
  }
  return out;
}

export function activityMaterialsForSkill(skillId: string): ActivityMaterial[] | null {
  const list = activityMaterials[skillId];
  if (!list || list.length === 0) return null;
  const cleaned = list
    .map((m) => {
      const name = cleanMaterialName(m.name);
      if (!name) return null;
      return { key: normalizeMaterialKey(name), displayName: name, essential: m.essential };
    })
    .filter((m): m is ActivityMaterial => m !== null);
  const result = dedupeByKey(cleaned);
  return result.length > 0 ? result : null;
}

export function materialsFromSkillArray(materials: string[]): ActivityMaterial[] {
  const cleaned = materials
    .map((raw) => {
      const { name, essential } = parseMaterialName(raw);
      const clean = cleanMaterialName(name);
      if (!clean) return null;
      return { key: normalizeMaterialKey(clean), displayName: clean, essential };
    })
    .filter((m): m is ActivityMaterial => m !== null);
  return dedupeByKey(cleaned);
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
