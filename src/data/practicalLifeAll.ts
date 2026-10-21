import { concisePracticalLifeSkills } from './concisePracticalLifeSkills';
import { additionalPracticalLifeSkills } from './additionalPracticalLifeSkills';
import { comprehensivePracticalLifeSkills } from './comprehensivePracticalLifeSkills';
import { enhancedPracticalLifeSkills } from './enhancedPracticalLifeSkills';
import { amiPracticalLifeSkills } from './amiPracticalLifeSkills';

/** The single Practical Life activity map used by the section page, activity pages and School Portal links. */
export const allPracticalLifeSkills = {
  ...comprehensivePracticalLifeSkills,
  ...enhancedPracticalLifeSkills,
  ...additionalPracticalLifeSkills,
  ...concisePracticalLifeSkills,
  ...amiPracticalLifeSkills,
};
