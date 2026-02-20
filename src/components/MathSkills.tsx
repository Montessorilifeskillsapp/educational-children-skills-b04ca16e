import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Calculator } from 'lucide-react';
import SkillCard from './SkillCard';
import { montessoriTheme } from './ThemeConfig';
import { mathSkillsData } from '@/data/mathSkills';
import PageLayout from './PageLayout';
import { mathImages } from '@/assets/math';

interface MathSkillsProps {
  onSkillSelect: (skillId: string) => void;
  onBack: () => void;
  completedSkills: string[];
  isPremium: boolean;
  activeProfile?: any;
}

const MathSkills: React.FC<MathSkillsProps> = ({
  onSkillSelect,
  onBack,
  completedSkills,
  isPremium,
  activeProfile
}) => {
  const skills = Object.keys(mathSkillsData).map(skillId => ({
    id: skillId,
    ...mathSkillsData[skillId],
    image: mathImages[skillId],
  }));

  const completionRate = (completedSkills.filter(skill => 
    Object.keys(mathSkillsData).includes(skill)
  ).length / skills.length) * 100;

  return (
    <PageLayout title="Mathematics Skills" onBack={onBack} className={montessoriTheme.backgrounds.math}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="text-lg text-gray-600">Montessori Mathematics</span>
          </div>
          {activeProfile && (
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-xl">{activeProfile.avatar}</span>
              {activeProfile.name}'s Math Journey
            </p>
          )}
          <div className="mt-2 p-3 bg-blue-100 rounded-lg border border-blue-300">
            <p className="text-sm text-blue-800">
              ✨ <strong>Enhanced Math Activities!</strong> Click any skill to see detailed Montessori instructions, materials explanations, and step-by-step guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Info Banner */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            <div>
              <h3 className="font-bold text-blue-900">Complete Montessori Math Curriculum</h3>
              <p className="text-blue-700 text-sm">Each activity includes detailed steps, materials purposes, objectives, and extensions. Click any skill to explore!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="bg-white border border-gray-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Mathematics Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Completion Rate</span>
            <span className="font-semibold text-gray-800">
              {Math.round(completionRate)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="relative">
            <SkillCard
              skill={skill}
              isCompleted={completedSkills.includes(skill.id)}
              onSelect={() => onSkillSelect(skill.id)}
              isPremium={isPremium}
            />
            {/* Enhanced content indicator */}
            <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Enhanced ✨
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default MathSkills;
