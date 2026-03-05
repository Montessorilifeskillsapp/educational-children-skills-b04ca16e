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
import { useSubscription } from '@/contexts/SubscriptionContext';
import { canAccessSectionItem } from '@/lib/freeTierAccess';

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
  const { isPremium } = useSubscription();

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

  if (!skill) {
    return null;
  }

  const hasAccess = canAccessSectionItem(
    Object.values(mergedPracticalLifeSkills).map((sectionSkill) => ({
      id: sectionSkill.id,
      isPremium: sectionSkill.isPremium,
    })),
    skillId,
    isPremium,
  );

  if (!hasAccess) {
    return (
      <div className={`min-h-screen ${montessoriTheme.backgrounds.practical} p-6`}>
        <div className="max-w-xl mx-auto pt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Premium activity</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">Only the first existing free Practical Life activity is available on the free plan.</p>
              <Button onClick={onBack}>Back to Practical Life</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const completedSteps = steps.filter(step => step.completed).length;
  const isComplete = steps.length > 0 && completedSteps === steps.length;

  const toggleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.practical} p-6 pb-20`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <BackButton onClick={onBack} />
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="text-4xl">{skill.icon}</div>
            </div>
            <h1 className="text-2xl font-bold">{skill.title}</h1>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Learning Purpose</CardTitle>
            <p className="text-sm text-gray-600">{skill.purpose}</p>
          </CardHeader>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-montessori-earth">Required Materials</CardTitle>
          </CardHeader>
          <CardContent>
            {skill.materials ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skill.materials.map((material, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-montessori-sage rounded-full mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{material}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No specific materials required</p>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-3 mb-8">
          {steps.map((step, index) => (
            <Card 
              key={step.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                step.completed ? 'bg-green-50 border-green-200' : ''
              }`}
              onClick={() => toggleStep(step.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                    step.completed 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'bg-white border-gray-300'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <p className={`text-base ${step.completed ? 'line-through text-gray-600' : ''}`}>
                    {step.instruction}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default PracticalLifeSkills;