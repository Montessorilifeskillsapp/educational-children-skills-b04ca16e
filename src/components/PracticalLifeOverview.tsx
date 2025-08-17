import React from 'react';
import SkillCardWithCart from './SkillCardWithCart';
import PageLayout from './PageLayout';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import { montessoriTheme } from './ThemeConfig';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { careOfEnvironmentSkills } from '@/data/careOfEnvironmentSkills';
import { careOfPersonSkills } from '@/data/careOfPersonSkills';
import { controlOfMovementSkills } from '@/data/controlOfMovementSkills';
import { additionalPracticalLifeSkills } from '@/data/additionalPracticalLifeSkills';
import { getShopItemsForSkill } from '@/data/practicalLifeShopMapping';

// Add shopItems to existing skills
Object.values(careOfPersonSkills).forEach(skill => {
  if (!(skill as any).shopItems) {
    (skill as any).shopItems = getShopItemsForSkill(skill.id);
  }
});

Object.values(careOfEnvironmentSkills).forEach(skill => {
  if (!(skill as any).shopItems) {
    (skill as any).shopItems = getShopItemsForSkill(skill.id);
  }
});

Object.values(controlOfMovementSkills).forEach(skill => {
  if (!(skill as any).shopItems) {
    (skill as any).shopItems = getShopItemsForSkill(skill.id);
  }
});

interface PracticalLifeOverviewProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

// Convert care of person skills to the same format
const careOfPersonSkillsFormatted = [
  ...Object.values(careOfPersonSkills).map(skill => ({
    id: skill.id,
    title: skill.title,
    description: skill.description,
    icon: skill.icon,
    category: 'Practical Life',
    difficulty: skill.isPremium ? 'Medium' : 'Easy',
    ageRange: skill.ageRange,
    duration: skill.duration,
    isPremium: skill.isPremium,
    hasShopItems: getShopItemsForSkill(skill.id).length > 0
  })),
  // Add brushing hair
  {
    id: additionalPracticalLifeSkills['brushing-hair'].id,
    title: additionalPracticalLifeSkills['brushing-hair'].title,
    description: additionalPracticalLifeSkills['brushing-hair'].description,
    icon: additionalPracticalLifeSkills['brushing-hair'].icon,
    category: 'Practical Life',
    difficulty: additionalPracticalLifeSkills['brushing-hair'].isPremium ? 'Medium' : 'Easy',
    ageRange: additionalPracticalLifeSkills['brushing-hair'].ageRange,
    duration: '6-8 minutes',
    isPremium: additionalPracticalLifeSkills['brushing-hair'].isPremium,
    hasShopItems: getShopItemsForSkill('brushing-hair').length > 0
  }
];

// Convert grace and courtesy skills to the same format
const graceCourtesySkillsFormatted = Object.values(graceAndCourtesySkills).map(skill => ({
  id: skill.id,
  title: skill.title,
  description: skill.description,
  icon: '💝',
  category: 'Practical Life',
  difficulty: skill.isPremium ? 'Medium' : 'Easy',
  ageRange: skill.ageRange,
  duration: skill.duration,
  isPremium: skill.isPremium
}));

// Convert care of environment skills to the same format
const careOfEnvironmentSkillsFormatted = [
  ...Object.values(careOfEnvironmentSkills).map(skill => ({
    id: skill.id,
    title: skill.title,
    description: skill.description,
    icon: skill.icon,
    category: 'Practical Life',
    difficulty: skill.isPremium ? 'Medium' : 'Easy',
    ageRange: skill.ageRange,
    duration: skill.duration,
    isPremium: skill.isPremium
  })),
  // Add additional environment skills
  {
    id: additionalPracticalLifeSkills['table-setting'].id,
    title: additionalPracticalLifeSkills['table-setting'].title,
    description: additionalPracticalLifeSkills['table-setting'].description,
    icon: additionalPracticalLifeSkills['table-setting'].icon,
    category: 'Practical Life',
    difficulty: additionalPracticalLifeSkills['table-setting'].isPremium ? 'Medium' : 'Easy',
    ageRange: additionalPracticalLifeSkills['table-setting'].ageRange,
    duration: '8-10 minutes',
    isPremium: additionalPracticalLifeSkills['table-setting'].isPremium
  },
  {
    id: additionalPracticalLifeSkills['flower-arranging'].id,
    title: additionalPracticalLifeSkills['flower-arranging'].title,
    description: additionalPracticalLifeSkills['flower-arranging'].description,
    icon: additionalPracticalLifeSkills['flower-arranging'].icon,
    category: 'Practical Life',
    difficulty: additionalPracticalLifeSkills['flower-arranging'].isPremium ? 'Medium' : 'Easy',
    ageRange: additionalPracticalLifeSkills['flower-arranging'].ageRange,
    duration: '10-12 minutes',
    isPremium: additionalPracticalLifeSkills['flower-arranging'].isPremium
  },
  {
    id: additionalPracticalLifeSkills['polishing-mirror'].id,
    title: additionalPracticalLifeSkills['polishing-mirror'].title,
    description: additionalPracticalLifeSkills['polishing-mirror'].description,
    icon: additionalPracticalLifeSkills['polishing-mirror'].icon,
    category: 'Practical Life',
    difficulty: additionalPracticalLifeSkills['polishing-mirror'].isPremium ? 'Medium' : 'Easy',
    ageRange: additionalPracticalLifeSkills['polishing-mirror'].ageRange,
    duration: '8-10 minutes',
    isPremium: additionalPracticalLifeSkills['polishing-mirror'].isPremium
  }
];

// Convert control of movement skills to the same format
const controlOfMovementSkillsFormatted = [
  ...Object.values(controlOfMovementSkills).map(skill => ({
    id: skill.id,
    title: skill.title,
    description: skill.description,
    icon: skill.icon,
    category: 'Practical Life',
    difficulty: skill.isPremium ? 'Medium' : 'Easy',
    ageRange: skill.ageRange,
    duration: skill.duration,
    isPremium: skill.isPremium
  })),
  // Add food preparation skill
  {
    id: additionalPracticalLifeSkills['squeezing-orange-juice'].id,
    title: additionalPracticalLifeSkills['squeezing-orange-juice'].title,
    description: additionalPracticalLifeSkills['squeezing-orange-juice'].description,
    icon: additionalPracticalLifeSkills['squeezing-orange-juice'].icon,
    category: 'Practical Life',
    difficulty: additionalPracticalLifeSkills['squeezing-orange-juice'].isPremium ? 'Medium' : 'Easy',
    ageRange: additionalPracticalLifeSkills['squeezing-orange-juice'].ageRange,
    duration: '10-12 minutes',
    isPremium: additionalPracticalLifeSkills['squeezing-orange-juice'].isPremium
  },
  // Add dry pouring
  {
    id: additionalPracticalLifeSkills['dry-pouring'].id,
    title: additionalPracticalLifeSkills['dry-pouring'].title,
    description: additionalPracticalLifeSkills['dry-pouring'].description,
    icon: additionalPracticalLifeSkills['dry-pouring'].icon,
    category: 'Practical Life',
    difficulty: additionalPracticalLifeSkills['dry-pouring'].isPremium ? 'Medium' : 'Easy',
    ageRange: additionalPracticalLifeSkills['dry-pouring'].ageRange,
    duration: '6-8 minutes',
    isPremium: additionalPracticalLifeSkills['dry-pouring'].isPremium
  },
  // Add wet pouring
  {
    id: additionalPracticalLifeSkills['wet-pouring'].id,
    title: additionalPracticalLifeSkills['wet-pouring'].title,
    description: additionalPracticalLifeSkills['wet-pouring'].description,
    icon: additionalPracticalLifeSkills['wet-pouring'].icon,
    category: 'Practical Life',
    difficulty: additionalPracticalLifeSkills['wet-pouring'].isPremium ? 'Medium' : 'Easy',
    ageRange: additionalPracticalLifeSkills['wet-pouring'].ageRange,
    duration: '8-10 minutes',
    isPremium: additionalPracticalLifeSkills['wet-pouring'].isPremium
  }
];

export const PracticalLifeOverview: React.FC<PracticalLifeOverviewProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium
}) => {
  return (
    <>
      <PageLayout 
        title="🌱 Practical Life Skills" 
        onBack={onBack} 
        className={montessoriTheme.backgrounds.practical}
        headerAction={<CartIcon />}
      >
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Develop independence and self-confidence through purposeful tasks related to daily life
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Four main areas: Care of the Person • Care of the Environment • Grace and Courtesy • Control of Movement
          </p>
        </div>

        {/* Care of the Person Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🧼 Care of the Person
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Self-care and personal hygiene activities that help children learn to manage their own bodies and needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careOfPersonSkillsFormatted.map((skill) => (
              <SkillCardWithCart
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>

        {/* Care of the Environment Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🌍 Care of the Environment
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Activities that help children learn to care for their surroundings, promoting responsibility and a sense of order.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careOfEnvironmentSkillsFormatted.map((skill) => (
              <SkillCardWithCart
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>

        {/* Grace and Courtesy Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💝 Grace and Courtesy
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Social skills and respectful interactions, teaching children how to navigate social situations with grace and consideration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graceCourtesySkillsFormatted.map((skill) => (
              <SkillCardWithCart
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>

        {/* Control of Movement Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🤸 Control of Movement
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Activities that develop gross and fine motor skills, coordination, and body awareness through purposeful movement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlOfMovementSkillsFormatted.map((skill) => (
              <SkillCardWithCart
                key={skill.id}
                skill={skill}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      </PageLayout>
      
      <CartModal />
    </>
  );
};

export default PracticalLifeOverview;