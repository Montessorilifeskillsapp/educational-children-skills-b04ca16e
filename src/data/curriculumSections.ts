import { concisePracticalLifeSkills } from './concisePracticalLifeSkills';
import { additionalPracticalLifeSkills } from './additionalPracticalLifeSkills';
import { comprehensivePracticalLifeSkills } from './comprehensivePracticalLifeSkills';
import { enhancedPracticalLifeSkills } from './enhancedPracticalLifeSkills';
import { amiPracticalLifeSkills } from './amiPracticalLifeSkills';
import { sensorialSkills } from './sensorialSkills';
import { additionalSensorialSkills } from './sensorialSkills2';
import { tactileSensorialSkills } from './tactileSensorialSkills';
import { completeSensorialSkills } from './completeSensorialSkills';
import { mathSkillsData } from './mathSkills';
import { languageSkillsData } from './languageSkills';
import { geographySkillsData } from './geographySkills';
import { botanySkillsData } from './botanySkills';
import { artSkillsData } from './artSkills';
import { culturalSkillsData } from './culturalSkills';
import { graceAndCourtesySkills } from './graceAndCourtesySkills';

export interface CurriculumSectionSkills {
  key: string;
  title: string;
  emoji: string;
  route: string;
  skills: Record<string, { title: string; materials?: string[]; category?: string }>;
}

const mergedPracticalLifeSkills = {
  ...comprehensivePracticalLifeSkills,
  ...enhancedPracticalLifeSkills,
  ...additionalPracticalLifeSkills,
  ...concisePracticalLifeSkills,
  ...amiPracticalLifeSkills,
};

const mergedSensorialSkills = {
  ...sensorialSkills,
  ...additionalSensorialSkills,
  ...tactileSensorialSkills,
  ...completeSensorialSkills,
};

export const curriculumSectionsForMaterials: CurriculumSectionSkills[] = [
  {
    key: 'practical-life',
    title: 'Practical Life',
    emoji: '🌱',
    route: '/practical-life',
    skills: mergedPracticalLifeSkills,
  },
  {
    key: 'sensorial',
    title: 'Sensorial',
    emoji: '🎨',
    route: '/sensorial',
    skills: mergedSensorialSkills,
  },
  {
    key: 'math',
    title: 'Mathematics',
    emoji: '🔢',
    route: '/math',
    skills: mathSkillsData,
  },
  {
    key: 'language',
    title: 'Language',
    emoji: '🔤',
    route: '/language',
    skills: languageSkillsData,
  },
  {
    key: 'geography',
    title: 'Geography',
    emoji: '🌍',
    route: '/geography',
    skills: geographySkillsData,
  },
  {
    key: 'botany',
    title: 'Botany',
    emoji: '🌿',
    route: '/botany',
    skills: botanySkills,
  },
  {
    key: 'art',
    title: 'Art',
    emoji: '🎭',
    route: '/art',
    skills: artSkills,
  },
  {
    key: 'cultural',
    title: 'Cultural Studies',
    emoji: '🌎',
    route: '/cultural',
    skills: culturalSkills,
  },
  {
    key: 'grace-courtesy',
    title: 'Grace & Courtesy',
    emoji: '🤝',
    route: '/grace-courtesy',
    skills: graceAndCourtesySkills,
  },
];

export function allCurriculumSkills(): Record<string, { title: string; materials?: string[]; category?: string }> {
  return curriculumSectionsForMaterials.reduce(
    (acc, section) => ({ ...acc, ...section.skills }),
    {}
  );
}
