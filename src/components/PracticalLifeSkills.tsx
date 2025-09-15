import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { montessoriTheme } from './ThemeConfig';
import { concisePracticalLifeSkills } from '@/data/concisePracticalLifeSkills';
import { additionalPracticalLifeSkills } from '@/data/additionalPracticalLifeSkills';
import SkillShopItems from './SkillShopItems';

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

const PracticalLifeSkills: React.FC<PracticalLifeSkillsProps> = ({ skillId, onBack, onComplete }) => {
// Get skill from combined skills collections
let skill = concisePracticalLifeSkills[skillId] || additionalPracticalLifeSkills[skillId];
  
if (!skill) return null;

  // Handle different skill formats
  let allSteps: Step[] = [];
  
  // All concise skills use the learning process format
  if ('learningProcess' in skill && skill.learningProcess) {
    // For teeth brushing and table setting, only show presentation steps
    if (skillId === 'brushing-teeth' || skillId === 'table-setting') {
      allSteps = skill.learningProcess.presentation.steps.map((step, index) => ({
        id: `presentation-${index}`,
        instruction: step,
        completed: false
      }));
    } else {
      // For other skills, show all steps
      allSteps = [
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
    }
  }

  const [steps, setSteps] = useState<Step[]>(allSteps);
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  const isComplete = completedSteps === steps.length;

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
            {/* Icon without background */}
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

        {/* Shop Items Section */}
        {skill.shopItems && skill.shopItems.length > 0 ? (
          <SkillShopItems shopItemIds={skill.shopItems} skillTitle={skill.title} />
        ) : (
          /* Materials Section - Only show if no shop items */
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Materials Needed</CardTitle>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {(skill.materials || []).map((material, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    {material}
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
        )}
        
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