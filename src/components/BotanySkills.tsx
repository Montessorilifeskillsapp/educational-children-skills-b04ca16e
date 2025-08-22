import React from 'react';
import BackButton from '@/components/ui/back-button';
import SkillCard from './SkillCard';
import { botanySkillsData } from '@/data/botanySkills';
import { montessoriTheme } from './ThemeConfig';
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
  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.botany} p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={onBack} label="Back to Dashboard" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🌱 Botany Skills
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Discover the wonderful world of plants through hands-on Montessori activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(botanySkillsData).map(([skillId, skill]) => (
            <SkillCard
              key={skillId}
              skill={{
                id: skillId,
                ...skill
              }}
              isCompleted={completedSkills.includes(skillId)}
              onSelect={() => onSkillSelect(skillId)}
              isPremium={isPremium}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotanySkills;