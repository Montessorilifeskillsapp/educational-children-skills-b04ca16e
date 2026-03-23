import React from 'react';
import SkillCard from './SkillCard';
import PageLayout from './PageLayout';
import { montessoriTheme } from './ThemeConfig';
import { concisePracticalLifeSkills } from '@/data/concisePracticalLifeSkills';
import { additionalPracticalLifeSkills } from '@/data/additionalPracticalLifeSkills';
import { comprehensivePracticalLifeSkills } from '@/data/comprehensivePracticalLifeSkills';
import { enhancedPracticalLifeSkills } from '@/data/enhancedPracticalLifeSkills';
import { amiPracticalLifeSkills } from '@/data/amiPracticalLifeSkills';
import { getShopItemsForSkill } from '@/data/practicalLifeShopMapping';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

Object.values(concisePracticalLifeSkills).forEach(skill => {
  if (!skill.shopItems) {
    skill.shopItems = getShopItemsForSkill(skill.id);
  }
});

const mergedPracticalLifeSkills = { 
  ...comprehensivePracticalLifeSkills,
  ...enhancedPracticalLifeSkills,
  ...additionalPracticalLifeSkills, 
  ...amiPracticalLifeSkills,
  ...concisePracticalLifeSkills
};


interface PracticalLifeOverviewProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

const allSkillsFormatted = applyFirstFreeItemLimit(
  Object.values(mergedPracticalLifeSkills).map(skill => ({
    id: skill.id,
    title: skill.title,
    description: skill.description,
    icon: skill.icon,
    category: skill.category,
    difficulty: skill.isPremium ? 'Medium' : 'Easy',
    ageRange: skill.ageRange,
    isPremium: skill.isPremium,
    hasShopItems: skill.shopItems && skill.shopItems.length > 0
  }))
);

const careOfPersonSkills = allSkillsFormatted.filter(skill => 
  skill.category === 'Care of Self'
);

const careOfEnvironmentSkills = allSkillsFormatted.filter(skill => 
  skill.category === 'Care of Environment'
);

const controlOfMovementSkills = allSkillsFormatted.filter(skill => 
  skill.category === 'Control of Movement'
);

const graceAndCourtesySkills = allSkillsFormatted.filter(skill => 
  skill.category === 'Grace and Courtesy'
);

const foodPreparationSkills = allSkillsFormatted.filter(skill => 
  skill.category === 'Food Preparation'
);

export const PracticalLifeOverview: React.FC<PracticalLifeOverviewProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium
}) => {
  return (
    <PageLayout title="🌱 Practical Life Skills" onBack={onBack} className={montessoriTheme.backgrounds.practical}>
      <div className="text-center mb-8">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Develop independence and self-confidence through purposeful tasks related to daily life
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Areas include: Care of Self • Care of Environment • Control of Movement • Grace and Courtesy • Food Preparation
        </p>
      </div>

      {careOfPersonSkills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🧼 Care of Self
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Self-care and personal hygiene activities that help children learn to manage their own bodies and needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careOfPersonSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      )}

      {careOfEnvironmentSkills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🌍 Care of the Environment
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Activities that help children learn to care for their surroundings, promoting responsibility and a sense of order.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careOfEnvironmentSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      )}

      {controlOfMovementSkills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🤸 Control of Movement
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Activities that develop gross and fine motor skills, coordination, and body awareness through purposeful movement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlOfMovementSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      )}

      {graceAndCourtesySkills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🤝 Grace and Courtesy
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Social skills and polite behaviors that help children interact respectfully and confidently with others.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graceAndCourtesySkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      )}

      {foodPreparationSkills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🥗 Food Preparation
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Activities that build independence in preparing simple foods safely and with care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodPreparationSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      )}

      {careOfPersonSkills.length === 0 && careOfEnvironmentSkills.length === 0 && controlOfMovementSkills.length === 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🌟 All Practical Life Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSkillsFormatted.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default PracticalLifeOverview;