import React from 'react';
import SkillCard from './SkillCard';
import { artSkillsEnhanced } from '../data/artSkillsEnhanced';
import SkillActivity from './SkillActivity';

interface ArtSkillsProps {
  selectedSkill?: string;
  onSkillSelect: (skillId: string) => void;
  onBack?: () => void;
}

export const ArtSkills: React.FC<ArtSkillsProps> = ({ selectedSkill, onSkillSelect, onBack }) => {
  // If a skill is selected, show the activity
  if (selectedSkill && artSkillsEnhanced[selectedSkill]) {
    return (
      <SkillActivity
        skillId={selectedSkill}
        onBack={() => onSkillSelect('')}
        onComplete={() => {}}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          ← Back to Skills
        </button>
      )}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎨 Montessori Art Skills
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore creativity through drawing, painting, and color theory with hands-on Montessori art activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(artSkillsEnhanced).map(([key, skill]) => (
          <SkillCard
            key={key}
            skill={skill}
            isCompleted={false}
            isPremium={skill.isPremium}
            onSelect={() => onSkillSelect(key)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtSkills;