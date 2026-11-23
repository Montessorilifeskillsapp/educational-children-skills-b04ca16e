import React from 'react';
import SkillActivity from '../SkillActivity';
import PracticalLifeSkills from '../PracticalLifeSkills';
import { allPracticalLifeSkills } from '@/data/practicalLifeAll';
import { sensorialSkills } from '@/data/sensorialSkills';
import { languageSkillsData } from '@/data/languageSkills';
import { mathSkillsData } from '@/data/mathSkills';
import { geographySkillsData } from '@/data/geographySkills';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { botanySkillsData } from '@/data/botanySkills';
import { culturalSkillsData } from '@/data/culturalSkills';
import { artSkillsEnhanced } from '@/data/artSkillsEnhanced';
import { enhancedMathSkills } from '@/data/enhancedMathSkills';

type AreaView = 'practical' | 'sensorial' | 'language' | 'math' | 'geography' | 'botany' | 'art' | 'cultural' | 'grace-courtesy';

interface ActivityViewProps {
  skillId: string;
  onComplete: (skillId: string) => void;
  /** Back to the signed-in dashboard (activities that belong to no known area). */
  onBack: () => void;
  /** Back to an area page. */
  onBackTo: (view: AreaView) => void;
}

/** The single activity screen opened from the home layout; downloaded only when an activity is opened. */
const ActivityView: React.FC<ActivityViewProps> = ({ skillId, onComplete, onBack, onBackTo }) => {
  if (skillId in allPracticalLifeSkills) {
    return <PracticalLifeSkills skillId={skillId} onBack={() => onBackTo('grace-courtesy')} onComplete={onComplete} />;
  }
  const area: AreaView | null =
    graceAndCourtesySkills[skillId] ? 'practical'
    : sensorialSkills[skillId] ? 'sensorial'
    : languageSkillsData[skillId] ? 'language'
    : mathSkillsData[skillId] ? 'math'
    : enhancedMathSkills[skillId] ? 'math'
    : culturalSkillsData[skillId] ? 'cultural'
    : geographySkillsData[skillId] ? 'geography'
    : botanySkillsData[skillId] ? 'botany'
    : artSkillsEnhanced[skillId] ? 'art'
    : null;
  return <SkillActivity skillId={skillId} onBack={area ? () => onBackTo(area) : onBack} onComplete={onComplete} />;
};

export default ActivityView;
