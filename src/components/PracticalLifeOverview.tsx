import React from 'react';
import SkillCard from './SkillCard';
import ShopSectionCTA from './ShopSectionCTA';
import PageLayout from './PageLayout';
import { montessoriTheme } from './ThemeConfig';
import { concisePracticalLifeSkills } from '@/data/concisePracticalLifeSkills';
import { additionalPracticalLifeSkills } from '@/data/additionalPracticalLifeSkills';
import { comprehensivePracticalLifeSkills } from '@/data/comprehensivePracticalLifeSkills';
import { enhancedPracticalLifeSkills } from '@/data/enhancedPracticalLifeSkills';
import { amiPracticalLifeSkills } from '@/data/amiPracticalLifeSkills';
import { getShopItemsForSkill } from '@/data/practicalLifeShopMapping';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';
import { getPracticalLifeImage } from '@/lib/practicalLifeCardImages';

// Legacy duplicates of AMI activities (sweeping / washing-tables / plant-care)
const duplicateLegacyIds = new Set(['sweeping-floor', 'table-wiping', 'watering-plants']);

const mergedPracticalLifeSkills = { 
  ...comprehensivePracticalLifeSkills,
  ...enhancedPracticalLifeSkills,
  ...additionalPracticalLifeSkills, 
  ...concisePracticalLifeSkills,
  ...amiPracticalLifeSkills
};

// Ensure every skill has shop items mapped for the overview cards
Object.values(mergedPracticalLifeSkills).forEach(skill => {
  if (!skill.shopItems) {
    skill.shopItems = getShopItemsForSkill(skill.id);
  }
});

interface PracticalLifeOverviewProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

// Explicit beginner → advanced order for the first Practical Life presentations.
const beginnerOrder = [
  'carrying-a-tray',
  'carrying-a-chair',
  'rolling-unrolling-mat',
  'spooning-beans',
  'dry-pouring',
  'pouring-water',
  'carrying-objects',
];

const allSkillsFormatted = applyFirstFreeItemLimit(
  Object.values(mergedPracticalLifeSkills)
    .filter(skill => !duplicateLegacyIds.has(skill.id))
    .sort((a, b) => {
      const rankA = beginnerOrder.indexOf(a.id);
      const rankB = beginnerOrder.indexOf(b.id);
      const aInOrder = rankA !== -1;
      const bInOrder = rankB !== -1;
      if (aInOrder && bInOrder) return rankA - rankB;
      if (aInOrder) return -1;
      if (bInOrder) return 1;
      return 0;
    })
    .map(skill => ({
      id: skill.id,
      title: skill.title,
      description: skill.description,
      icon: skill.icon,
      image: getPracticalLifeImage(skill.id, skill.image),
      category: skill.category,
      difficulty: skill.isPremium ? 'Medium' : 'Easy',
      ageRange: skill.ageRange,
      isPremium: skill.isPremium,
      hasShopItems: skill.shopItems && skill.shopItems.length > 0
    }))
);


const categoryOrder = [
  'Beginning Activities',
  'Care of Environment',
  'Care of Self',
  'Grace and Courtesy',
  'Advanced Activities'
];

const categoryDetails: Record<string, { emoji: string; description: string }> = {
  'Beginning Activities': {
    emoji: '🌱',
    description: 'The first activities introduced in a Montessori environment. These build the foundation of concentration, coordination, order and independence through simple, purposeful tasks.'
  },
  'Care of Environment': {
    emoji: '🧹',
    description: 'Activities that help children care for their surroundings, developing responsibility, respect for shared spaces and a sense of belonging to the community.'
  },
  'Care of Self': {
    emoji: '🧼',
    description: 'Self-care and personal hygiene activities that help children learn to manage their own bodies, clothing and daily needs with increasing independence.'
  },
  'Grace and Courtesy': {
    emoji: '🤝',
    description: 'Social skills and polite behaviours that help children interact respectfully, confidently and peacefully with others.'
  },
  'Advanced Activities': {
    emoji: '✨',
    description: 'More complex Practical Life work that integrates and refines the skills built through earlier activities, including food preparation, sewing and full care routines.'
  }
};

const skillsByCategory = categoryOrder.map(category => ({
  category,
  skills: allSkillsFormatted.filter(skill => skill.category === category)
}));

export const PracticalLifeOverview: React.FC<PracticalLifeOverviewProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium
}) => {
  return (
    <PageLayout title="🌱 Practical Life" onBack={onBack} className={montessoriTheme.backgrounds.practical}>
      <div className="text-center mb-8">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Practical Life is the heart of the Montessori method and is always introduced first. Children develop independence, concentration and coordination through purposeful, real-life activities.
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Sequence: Beginning Activities → Care of Environment → Care of Self → Grace and Courtesy → Advanced Activities
        </p>
      </div>

      {skillsByCategory.map(({ category, skills }) =>
        skills.length > 0 ? (
          <div className="mb-12" key={category}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {categoryDetails[category].emoji} {category}
            </h2>
            <p className="text-gray-600 mb-6 max-w-3xl">
              {categoryDetails[category].description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
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
        ) : null
      )}

      {skillsByCategory.every(({ skills }) => skills.length === 0) && (
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
      <ShopSectionCTA category="Practical Life" />
    </PageLayout>
  );
};

export default PracticalLifeOverview;
