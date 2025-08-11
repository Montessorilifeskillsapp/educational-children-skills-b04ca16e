import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import VideoPlayer from './VideoPlayer';
import { type Step, type SkillData } from '@/data/skillsData';
import { type SkillCategory } from '@/lib/skillCategories';

interface SkillActivityContentProps {
  skill: SkillData;
  category: SkillCategory;
  steps: Step[];
  completedSteps: number;
  progress: number;
  isComplete: boolean;
  isEditMode: boolean;
  onToggleStep: (stepId: string) => void;
  onVideoUpdate: (stepId: string, url: string) => void;
  onComplete: () => void;
}

const SkillActivityContent: React.FC<SkillActivityContentProps> = ({
  skill,
  category,
  steps,
  completedSteps,
  progress,
  isComplete,
  isEditMode,
  onToggleStep,
  onVideoUpdate,
  onComplete
}) => {
  return (
    <>
      <section aria-label="Required materials">
        <Card className="border-2 border-amber-300 mb-6 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="materials">🧰</span> Materials Needed
              <Badge className={`ml-auto ${category.color} border-2`}>
                {category.name}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skill.materials.map((material, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="text-lg" role="img" aria-label="material">📦</span>
                  <span className="font-medium text-amber-900">{material}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-label="Learning objective">
        <Card className="border-4 border-amber-800 mb-6">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              Montessori Purpose
              <Badge className={`ml-auto ${category.color} border-2`}>
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Badge>
            </CardTitle>
            <p className="text-amber-700 text-sm">{skill.purpose}</p>
          </CardHeader>
        </Card>
      </section>

      <section aria-label="Activity progress">
        <Card className="border-4 border-amber-800 mb-6">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              Progress
              <Badge className={`ml-auto ${category.color} border-2`}>
                {category.name}
              </Badge>
            </CardTitle>
            <Progress value={progress} className="h-4" aria-label={`${Math.round(progress)}% complete`} />
            <p className="text-sm text-amber-700">{completedSteps} of {steps.length} steps complete</p>
          </CardHeader>
        </Card>
      </section>

      <section aria-label="Activity steps">
        <div className="space-y-4">
          <div className={`${category.color} border-2 border-current rounded-lg p-4 mb-4`}>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {category.name} - Step by Step Instructions
            </h3>
          </div>
          {steps.map((step, index) => (
            <div key={step.id}>
              <VideoPlayer
                videoUrl={step.videoUrl}
                stepId={step.id}
                onVideoUpdate={onVideoUpdate}
                isEditable={isEditMode}
              />
              <Card 
                className={`border-4 border-amber-800 cursor-pointer transition-all hover:scale-102 ${
                  step.completed ? 'bg-green-100' : 'bg-white'
                }`}
                onClick={() => onToggleStep(step.id)}
                role="button"
                tabIndex={0}
                aria-pressed={step.completed}
                aria-label={`Step ${index + 1}: ${step.instruction}. ${step.completed ? 'Completed' : 'Not completed'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full border-2 border-amber-800 flex items-center justify-center font-bold ${
                      step.completed ? 'bg-green-500 text-white' : 'bg-white text-amber-900'
                    }`}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <p className={`text-lg flex-1 ${step.completed ? 'line-through text-gray-600' : 'text-amber-900'}`}>
                      {step.instruction}
                    </p>
                    <Badge className={`${category.color} border-2 text-xs`}>
                      {category.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {isComplete && (
        <section aria-label="Activity completion" className="mt-6 text-center">
          <Card className="border-4 border-green-500 bg-green-100">
            <CardContent className="p-6">
              <div className="text-6xl mb-4" role="img" aria-label="celebration">🎉</div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Great Job!</h2>
              <p className="text-green-700 mb-2">You completed all the steps!</p>
              <Badge className={`${category.color} border-2 text-lg px-4 py-2 mb-4`}>
                <span className="mr-2">{category.icon}</span>
                {category.name} Mastered!
              </Badge>
              <br />
              <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600 text-white" aria-label="Mark activity as complete and return to dashboard">
                Mark as Complete
              </Button>
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
};

export default SkillActivityContent;