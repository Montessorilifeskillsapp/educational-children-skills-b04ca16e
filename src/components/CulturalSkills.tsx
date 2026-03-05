import React from 'react';
import BackButton from '@/components/ui/back-button';
import SkillCard from './SkillCard';
import { culturalSkillsData } from '@/data/culturalSkills';
import { montessoriTheme } from './ThemeConfig';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface CulturalSkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

const CulturalSkills: React.FC<CulturalSkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium
}) => {
  const limitedSkills = applyFirstFreeItemLimit(
    Object.entries(culturalSkillsData).map(([skillId, skill]) => ({
      id: skillId,
      ...skill,
    }))
  );

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.cultural} p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={onBack} label="Back to Dashboard" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-violet-800 mb-4">
            🏛️ Cultural Studies
          </h1>
          <p className="text-lg text-violet-600 max-w-2xl mx-auto">
            Explore history, music, science, and world cultures through hands-on Montessori activities
          </p>
        </div>

        {(['Cultural - History', 'Cultural - Music', 'Cultural - Science', 'Cultural - World Cultures'] as const).map((cat) => {
          const skills = limitedSkills.filter((skill) => skill.category === cat);
          const label = cat.replace('Cultural - ', '');
          return (
            <div key={cat} className="mb-10">
              <h2 className="text-2xl font-bold text-violet-700 mb-4">{label}</h2>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CulturalSkills;
