import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { montessoriTheme } from './ThemeConfig';
import { concisePracticalLifeSkills } from '@/data/concisePracticalLifeSkills';
import { additionalPracticalLifeSkills } from '@/data/additionalPracticalLifeSkills';
import { comprehensivePracticalLifeSkills } from '@/data/comprehensivePracticalLifeSkills';
import { enhancedPracticalLifeSkills } from '@/data/enhancedPracticalLifeSkills';
import { amiPracticalLifeSkills } from '@/data/amiPracticalLifeSkills';
import SkillActivity from './SkillActivity';
import { getPracticalLifeImage } from '@/lib/practicalLifeCardImages';
import GetTheMaterials from './GetTheMaterials';
import ActivityLayout from './activity/ActivityLayout';
import ActivitySteps from './activity/ActivityStepGroup';
import ActivityVideo from './ActivityVideo';
import ActivityPage from './activity/ActivityPage';

interface Step {
  id: string;
  instruction: string;
  completed: boolean;
}

interface PracticalLifeSkillsProps {
  skillId: string;
  onBack: () => void;
  onComplete: (skillId: string) => void;
}

const mergedPracticalLifeSkills = {
  ...comprehensivePracticalLifeSkills,
  ...enhancedPracticalLifeSkills,
  ...additionalPracticalLifeSkills,
  ...amiPracticalLifeSkills,
  ...concisePracticalLifeSkills,
};

const PracticalLifeSkills: React.FC<PracticalLifeSkillsProps> = ({ skillId, onBack, onComplete }) => {
  const skill = mergedPracticalLifeSkills[skillId];

  const buildSteps = (): Step[] => {
    if (!skill || !('learningProcess' in skill) || !skill.learningProcess) {
      return [];
    }

    if (skillId === 'brushing-teeth' || skillId === 'table-setting') {
      return skill.learningProcess.presentation.steps.map((step, index) => ({
        id: `presentation-${index}`,
        instruction: step,
        completed: false
      }));
    }

    return [
      ...skill.learningProcess.presentation.steps.map((step, index) => ({
        id: `presentation-${index}`,
        instruction: step,
        completed: false
      })),
      ...skill.learningProcess.guidedPractice.steps.map((step, index) => ({
        id: `guided-${index}`,
        instruction: step,
        completed: false
      })),
      ...skill.learningProcess.independentPractice.indicators.map((indicator, index) => ({
        id: `independent-${index}`,
        instruction: indicator,
        completed: false
      }))
    ];
  };

  const [steps, setSteps] = useState<Step[]>(buildSteps());

  useEffect(() => {
    setSteps(buildSteps());
  }, [skillId]);

  // Some practical-life ids (e.g. 'pouring', 'spooning') only exist in the shared
  // skill registry. Falling back keeps the screen from rendering blank.
  if (!skill) {
    return <SkillActivity skillId={skillId} onBack={onBack} onComplete={onComplete} />;
  }

  const completedSteps = steps.filter(step => step.completed).length;
  const isComplete = steps.length > 0 && completedSteps === steps.length;

  const toggleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <ActivityPage
      skillId={skillId}
      sectionLabel="Practical Life"
      title={skill.title}
      purpose={skill.purpose}
      image={getPracticalLifeImage(skillId, skill.image)}
      materials={skill.materials}
      steps={steps}
      onToggle={toggleStep}
      onBack={onBack}
      onComplete={() => { onComplete(skillId); onBack(); }}
    />
  );
};

export default PracticalLifeSkills;