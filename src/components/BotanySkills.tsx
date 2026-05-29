import React from 'react';
import BackButton from '@/components/ui/back-button';
import SkillCard from './SkillCard';
import ShopSectionCTA from './ShopSectionCTA';
import { botanySkillsData } from '@/data/botanySkills';
import { montessoriTheme } from './ThemeConfig';
import { botanyImages } from '@/assets/botany';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface BotanySkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

const BotanySkills: React.FC<BotanySkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium
}) => {
  const skills = applyFirstFreeItemLimit(
    Object.entries(botanySkillsData).map(([skillId, skill]) => ({
      id: skillId,
      ...skill,
      image: botanyImages[skillId],
    }))
  );

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.botany} p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={onBack} label="Back to Dashboard" />
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg mb-4">
            <Leaf className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Botany Skills
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the wonderful world of plants through hands-on Montessori activities
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
        <ShopSectionCTA category="Botany" />
      </div>
    </div>
  );
};

export default BotanySkills;