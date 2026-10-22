/**
 * Developmental stage foundation. 3–6 (Children's House) is the live curriculum;
 * 0–3 (Nido + Infant Community) is registered here so future content is a pure data addition.
 */
export type Plane = '0-3' | '3-6';
export type Environment = 'nido' | 'infant-community' | 'childrens-house';

export interface StageInfo { plane: Plane; environment: Environment; label: string; ageRange: string }

export const ENVIRONMENTS: Record<Environment, StageInfo> = {
  nido: { plane: '0-3', environment: 'nido', label: 'Nido', ageRange: 'Birth–14 months' },
  'infant-community': { plane: '0-3', environment: 'infant-community', label: 'Infant Community', ageRange: '14 months–3 years' },
  'childrens-house': { plane: '3-6', environment: 'childrens-house', label: "Children's House", ageRange: '3–6 years' },
};

/** 0–3 activity ids must start with this prefix so they never collide with 3–6 ids. */
export const INFANT_TODDLER_PREFIX = 'it-';

export type InfantToddlerAreaKey = 'it-practical-life' | 'it-movement' | 'it-language' | 'it-expression';

export interface InfantToddlerActivity {
  id: string; // must start with INFANT_TODDLER_PREFIX
  title: string;
  area: InfantToddlerAreaKey;
  environment: 'nido' | 'infant-community';
  materials?: string[];
  preparation: string[];
  invitation: string;
  presentation: string[];
  controlOfError: string[];
  observation: string[];
}

export interface InfantToddlerArea { key: InfantToddlerAreaKey; title: string; emoji: string; route: string }

/** The four 0–3 areas. Not routed or shown yet. */
export const INFANT_TODDLER_AREAS: InfantToddlerArea[] = [
  { key: 'it-practical-life', title: 'Practical Life', emoji: '🌱', route: '/infant-toddler/practical-life' },
  { key: 'it-movement', title: 'Movement & Eye-Hand Coordination', emoji: '✋', route: '/infant-toddler/movement' },
  { key: 'it-language', title: 'Language', emoji: '🗣️', route: '/infant-toddler/language' },
  { key: 'it-expression', title: 'Self-Expression & Sensorial', emoji: '🎨', route: '/infant-toddler/expression' },
];

/** Content registry — intentionally empty until the 0–3 build-out. */
export const INFANT_TODDLER_ACTIVITIES: Record<string, InfantToddlerActivity> = {};

/** Live flag: when false nothing 0–3 appears anywhere in the app or portal. */
export const INFANT_TODDLER_ENABLED = false;

export const planeOfSkill = (skillId: string): Plane =>
  skillId.startsWith(INFANT_TODDLER_PREFIX) ? '0-3' : '3-6';

/** Maps a school classroom age group to its plane (unknown/blank → 3–6). */
export const planeOfAgeGroup = (ageGroup?: string | null): Plane =>
  /nido|infant|toddler|0\s*[–-]\s*3/i.test(ageGroup ?? '') ? '0-3' : '3-6';

export const infantToddlerActivity = (id: string) => INFANT_TODDLER_ACTIVITIES[id];
