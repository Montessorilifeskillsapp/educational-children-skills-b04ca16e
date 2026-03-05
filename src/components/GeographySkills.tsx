import React from 'react';
import BackButton from '@/components/ui/back-button';
import SkillCard from './SkillCard';
import { geographySkillsData } from '@/data/geographySkills';
import SkillActivity from './SkillActivity';
import { montessoriTheme } from './ThemeConfig';
import { geographyImages } from '@/assets/geography';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface GeographySkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
  selectedSkill?: string;
}

const GeographySkills: React.FC<GeographySkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
  selectedSkill
}) => {
  const skills = applyFirstFreeItemLimit(
    Object.entries(geographySkillsData).map(([skillId, skill]) => ({
      id: skillId,
      ...skill,
      image: geographyImages[skillId],
    }))
  );

  if (selectedSkill && geographySkillsData[selectedSkill]) {
    return (
      <SkillActivity
        skillId={selectedSkill}
        onBack={() => onSkillSelect('')}
        onComplete={() => {
          onSkillSelect('');
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.geography} p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={onBack} label="Back to Dashboard" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🌍 Geography Skills
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Explore our world through Montessori geography activities
          </p>
        </div>

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
    </div>
  );
};

export default GeographySkills;