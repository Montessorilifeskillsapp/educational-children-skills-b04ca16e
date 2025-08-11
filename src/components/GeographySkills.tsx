import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SkillCard from './SkillCard';
import { geographySkillsData } from '@/data/geographySkills';
import SkillActivity from './SkillActivity';

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
  // If a skill is selected, show the skill activity
  if (selectedSkill && geographySkillsData[selectedSkill]) {
    return (
      <SkillActivity
        skillId={selectedSkill}
        onBack={() => onSkillSelect('')}
        onComplete={(skillId) => {
          // Handle completion logic here if needed
          onSkillSelect('');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
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
          {Object.entries(geographySkillsData).map(([skillId, skill]) => (
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

export default GeographySkills;