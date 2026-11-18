import { readFileSync } from 'fs';
import { skillsData } from '@/data/skillsData';
import { allPracticalLifeSkills } from '@/data/practicalLifeAll';
import { concisePracticalLifeSkills } from '@/data/concisePracticalLifeSkills';
import { amiPracticalLifeSkills } from '@/data/amiPracticalLifeSkills';
import { sensorialSkills } from '@/data/sensorialSkills';
import { additionalSensorialSkills } from '@/data/sensorialSkills2';
import { tactileSensorialSkills } from '@/data/tactileSensorialSkills';
import { completeSensorialSkills } from '@/data/completeSensorialSkills';
import { mathSkillsData } from '@/data/mathSkills';
import { enhancedMathSkills } from '@/data/enhancedMathSkills';
import { languageSkillsData } from '@/data/languageSkills';
import { geographySkillsData } from '@/data/geographySkills';
import { botanySkillsData } from '@/data/botanySkills';
import { artSkillsEnhanced } from '@/data/artSkillsEnhanced';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { culturalSkillsData } from '@/data/culturalSkills';
import { activityMaterials } from '@/data/activityMaterials';
import { getMaterialsForSkill } from '@/lib/materials';
import { activityInvitations } from '@/data/activityInvitations';


const FIELDS = new Set(['title', 'purpose', 'category', 'steps', 'detailedSteps', 'activities', 'instruction', 'learningProcess', 'presentation', 'guidedPractice', 'independentPractice', 'mastery', 'extensions', 'description', 'duration', 'invitation', 'keyPoints', 'supportStrategies', 'indicators', 'troubleshooting', 'assessmentCriteria', 'variations', 'directAims', 'materialsPurpose', 'objectives']);
const SECTION_FILES = ['SensorialSkills', 'MathSkills', 'LanguageSkills', 'GeographySkills', 'BotanySkills', 'ArtSkills', 'CulturalSkills', 'GraceAndCourtesySkills', 'PracticalLifeOverview'];

/** Every English lesson string the app shows: activity text, material names and section introductions. */
export function lessonInventory(root = process.cwd()): string[] {
  const out = new Set<string>();
  const add = (s: unknown) => { if (typeof s === 'string' && /[A-Za-z]/.test(s)) out.add(s.trim()); };
  const walk = (v: unknown, depth = 0): void => {
    if (typeof v === 'string') return add(v);
    if (Array.isArray(v)) return v.forEach((x) => walk(x, depth));
    if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) {
      if (k === 'description' && depth === 0) continue; // a skill's own description is not shown
      if (FIELDS.has(k)) walk(x, depth + 1);
    }
  };
  const maps = [skillsData, allPracticalLifeSkills, concisePracticalLifeSkills, amiPracticalLifeSkills, sensorialSkills, additionalSensorialSkills, tactileSensorialSkills, completeSensorialSkills, mathSkillsData, enhancedMathSkills, languageSkillsData, geographySkillsData, botanySkillsData, artSkillsEnhanced, graceAndCourtesySkills, culturalSkillsData] as Record<string, any>[];
  for (const m of maps) for (const [id, sk] of Object.entries(m)) {
    walk(sk);
    for (const mat of getMaterialsForSkill(id, sk.materials)) add(mat.displayName);
  }
  Object.values(activityInvitations).forEach(add);
  for (const list of Object.values(activityMaterials)) for (const m of list) add(m.name);
  for (const f of SECTION_FILES) {
    const s = readFileSync(`${root}/src/components/${f}.tsx`, 'utf8');
    for (const m of s.matchAll(/(?:title|description):\s*\n?\s*(['"])((?:\\.|(?!\1).)*)\1/g)) add(m[2].replace(/\\'/g, "'"));
    for (const m of s.matchAll(/(?:intro|sequence)="([^"]+)"/g)) add(m[1]);
    for (const m of s.matchAll(/lessonText\('([^']+)'\)/g)) add(m[1]);
    if (f === 'PracticalLifeOverview') for (const m of s.matchAll(/^\s*'([A-Z][A-Za-z ]+)',?$/gm)) add(m[1]);
  }
  ['Visual Discrimination', 'Auditory Discrimination', 'Tactile Discrimination', 'Stereognostic'].forEach(add);
  return [...out].sort();
}
