import { skillsData } from './data/skillsData';
import { sensorialSkills } from './data/sensorialSkills';
import { additionalSensorialSkills } from './data/sensorialSkills2';
import { tactileSensorialSkills } from './data/tactileSensorialSkills';
import { completeSensorialSkills } from './data/completeSensorialSkills';
import { languageSkillsData } from './data/languageSkills';
import { mathSkillsData } from './data/mathSkills';
import { enhancedMathSkills } from './data/enhancedMathSkills';
import { geographySkillsData } from './data/geographySkills';
import { artSkillsEnhanced } from './data/artSkillsEnhanced';
import { graceAndCourtesySkills } from './data/graceAndCourtesySkills';
import { botanySkillsData } from './data/botanySkills';
import { culturalSkillsData } from './data/culturalSkills';
import { concisePracticalLifeSkills } from './data/concisePracticalLifeSkills';
import { additionalPracticalLifeSkills } from './data/additionalPracticalLifeSkills';
import { comprehensivePracticalLifeSkills } from './data/comprehensivePracticalLifeSkills';
import { enhancedPracticalLifeSkills } from './data/enhancedPracticalLifeSkills';
import { amiPracticalLifeSkills } from './data/amiPracticalLifeSkills';

const pl:any = {...comprehensivePracticalLifeSkills,...enhancedPracticalLifeSkills,...additionalPracticalLifeSkills,...amiPracticalLifeSkills,...concisePracticalLifeSkills};
const resolver:any = {...skillsData,...sensorialSkills,...additionalSensorialSkills,...tactileSensorialSkills,...completeSensorialSkills,...languageSkillsData,...mathSkillsData,...enhancedMathSkills,...geographySkillsData,...artSkillsEnhanced,...graceAndCourtesySkills,...botanySkillsData,...culturalSkillsData,...concisePracticalLifeSkills};

const sections: Record<string, any> = {
  'Practical Life': pl,
  Sensorial: {...sensorialSkills,...additionalSensorialSkills,...tactileSensorialSkills,...completeSensorialSkills},
  Language: languageSkillsData, Math: mathSkillsData, Geography: geographySkillsData,
  Botany: botanySkillsData, Art: artSkillsEnhanced, Cultural: culturalSkillsData,
  'Grace & Courtesy': graceAndCourtesySkills,
};
let bad=0,total=0;
for (const [name, set] of Object.entries(sections)) {
  for (const [id, s] of Object.entries<any>(set)) {
    total++;
    const resolved = name==='Practical Life' ? (pl[id] || resolver[id]) : resolver[id];
    const problems:string[]=[];
    if(!resolved) problems.push('UNRESOLVED');
    else {
      const r:any=resolved;
      const hasSteps = (r.steps?.length) || (r.learningProcess?.presentation?.steps?.length);
      if(!hasSteps) problems.push('no steps');
      if(!r.title && !r.name) problems.push('no title');
      if(!r.materials?.length && !r.learningProcess) problems.push('no materials');
    }
    if(problems.length){bad++;console.log(`FAIL [${name}] ${id}: ${problems.join(', ')}`);}
  }
}
console.log(`\nChecked ${total} activities, ${bad} problems`);
