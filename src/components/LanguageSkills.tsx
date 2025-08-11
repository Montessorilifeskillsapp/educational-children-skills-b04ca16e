import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import SkillCard from './SkillCard';
import PageLayout from './PageLayout';
import { languageSkillsData } from '@/data/languageSkills';

interface LanguageSkillsProps {
  onSkillSelect: (skillId: string) => void;
  onBack: () => void;
  completedSkills: string[];
  isPremium: boolean;
  activeProfile?: any;
}

const LanguageSkills: React.FC<LanguageSkillsProps> = ({
  onSkillSelect,
  onBack,
  completedSkills,
  isPremium,
  activeProfile
}) => {
  const skills = Object.keys(languageSkillsData).map(skillId => ({
    id: skillId,
    ...languageSkillsData[skillId]
  }));

  const completionRate = (completedSkills.length / skills.length) * 100;
  const completedCount = completedSkills.length;

  return (
    <PageLayout title="Language Development" onBack={onBack}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-lg text-gray-600">Montessori Language Skills</span>
          </div>
          {activeProfile && (
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-xl">{activeProfile.avatar}</span>
              {activeProfile.name}'s Language Journey
            </p>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-white border border-gray-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Language Progress Overview
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
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{skills.filter(s => s.difficulty === 'Beginner').length}</div>
                <div className="text-sm text-blue-700">Beginner Activities</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{skills.filter(s => s.difficulty === 'Intermediate').length}</div>
                <div className="text-sm text-green-700">Intermediate Activities</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{skills.filter(s => s.difficulty === 'Advanced').length}</div>
                <div className="text-sm text-purple-700">Advanced Activities</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Skills Grid */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Montessori Language Activities
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

export default LanguageSkills;