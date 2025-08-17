import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { montessoriTheme } from './ThemeConfig';
import { comprehensivePracticalLifeSkills } from '@/data/comprehensivePracticalLifeSkills';
import { careOfPersonSkills } from '@/data/careOfPersonSkills';
import { careOfEnvironmentSkills } from '@/data/careOfEnvironmentSkills';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { controlOfMovementSkills } from '@/data/controlOfMovementSkills';
import { additionalPracticalLifeSkills } from '@/data/additionalPracticalLifeSkills';
import { EnhancedMontessoriSkill } from '@/types/montessoriSkill';

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
  // Get skill from all data sources
  let skill = comprehensivePracticalLifeSkills[skillId] || 
              careOfPersonSkills[skillId] || 
              careOfEnvironmentSkills[skillId] || 
              graceAndCourtesySkills[skillId] || 
              controlOfMovementSkills[skillId] ||
              additionalPracticalLifeSkills[skillId];
  
  if (!skill) return null;

  // Handle different skill formats
  let allSteps: Step[] = [];
  
  if ('learningProcess' in skill && skill.learningProcess) {
    // Enhanced Montessori skill with full learning process
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
  } else if ('steps' in skill && skill.steps) {
    // Simple skill with just steps
    allSteps = skill.steps.map(step => ({
      id: step.id,
      instruction: step.instruction,
      completed: false
    }));
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
          <Button onClick={onBack} variant="outline">← Back</Button>
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
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <Progress value={progress} className="h-3 mt-2" />
            <p className="text-sm mt-1">{completedSteps} of {steps.length} steps completed</p>
          </CardHeader>
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