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
    <ActivityLayout
      sectionLabel="Practical Life"
      title={skill.title}
      purpose={skill.purpose}
      image={getPracticalLifeImage(skillId, skill.image)}
      onBack={onBack}
      background={montessoriTheme.backgrounds.practical}
    >
      <GetTheMaterials skillId={skillId} skillMaterials={skill.materials} />

      <ActivitySteps steps={steps} onToggle={toggleStep} />

      {isComplete && (
        <div className="mt-8 mb-8 text-center">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="text-5xl mb-4">🌟</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Excellent Work!</h2>
              <p className="text-green-700 mb-4">You have mastered {skill.title.toLowerCase()}!</p>
              <Button onClick={() => { onComplete(skillId); onBack(); }} className="bg-green-600 hover:bg-green-700">
                Mark as Complete
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </ActivityLayout>
  );
};

export default PracticalLifeSkills;