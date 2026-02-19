import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Eye } from 'lucide-react';
import SkillCard from './SkillCard';
import PageLayout from './PageLayout';
import { montessoriTheme } from './ThemeConfig';
import { sensorialSkills } from '@/data/sensorialSkills';
import { additionalSensorialSkills } from '@/data/sensorialSkills2';
import { tactileSensorialSkills } from '@/data/tactileSensorialSkills';
import { completeSensorialSkills } from '@/data/completeSensorialSkills';
import { useSEO } from '@/hooks/useSEO';
interface SensorialSkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
  activeProfile?: any;
}

const SensorialSkills: React.FC<SensorialSkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
  activeProfile
}) => {
  useSEO({
    title: 'Montessori Sensorial Skills - Visual, Auditory & Tactile Learning',
    description: 'Explore comprehensive Montessori sensorial activities including Pink Tower, Brown Stair, Color Tablets, Sound Cylinders, and tactile materials.',
    keywords: 'montessori sensorial, pink tower, brown stair, color tablets, sound cylinders, touch boards, sensory development',
    canonical: 'https://montessori-skills.com/sensorial'
  });

  // Combine all sensorial skills
  const allSkills = {
    ...sensorialSkills,
    ...additionalSensorialSkills,
    ...tactileSensorialSkills,
    ...completeSensorialSkills
  };

  const skills = Object.keys(allSkills).map(skillId => ({
    id: skillId,
    ...allSkills[skillId]
  }));

  const completionRate = (completedSkills.filter(skill => 
    Object.keys(allSkills).includes(skill)
  ).length / skills.length) * 100;
  const completedCount = completedSkills.filter(skill => 
    Object.keys(allSkills).includes(skill)
  ).length;

  return (
    <PageLayout title="Sensorial Development" onBack={onBack} className={montessoriTheme.backgrounds.sensorial}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-8 w-8 text-orange-600" />
            <span className="text-lg text-gray-600">Montessori Sensorial Skills</span>
          </div>
          {activeProfile && (
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-xl">{activeProfile.avatar}</span>
              {activeProfile.name}'s Sensorial Journey
            </p>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-white border border-gray-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Sensorial Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{completedCount}/{skills.length} skills mastered</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{skills.filter(s => s.difficulty === 'Beginner').length}</div>
                <div className="text-sm text-green-700">Beginner Activities</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{skills.filter(s => s.difficulty === 'Intermediate').length}</div>
                <div className="text-sm text-orange-700">Intermediate Activities</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{skills.filter(s => s.difficulty === 'Advanced').length}</div>
                <div className="text-sm text-red-700">Advanced Activities</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensorial Skills Grid */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Montessori Sensorial Activities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isCompleted={completedSkills.includes(skill.id)}
              onSelect={() => onSkillSelect(skill.id)}
              isPremium={isPremium}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default SensorialSkills;