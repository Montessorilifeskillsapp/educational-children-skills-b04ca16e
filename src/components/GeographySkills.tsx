import React from 'react';
import { Globe } from 'lucide-react';
import BackButton from '@/components/ui/back-button';
import SkillCard from './SkillCard';
import ShopSectionCTA from './ShopSectionCTA';
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg mb-4">
            <Globe className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Geography Skills
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
        <ShopSectionCTA category="Geography" />
      </div>
    </div>
  );
};

export default GeographySkills;