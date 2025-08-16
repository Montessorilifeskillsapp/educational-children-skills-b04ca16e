import React from 'react';
import SkillCard from './SkillCard';
import PageLayout from './PageLayout';
import { montessoriTheme } from './ThemeConfig';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { careOfEnvironmentSkills } from '@/data/careOfEnvironmentSkills';
import { careOfPersonSkills } from '@/data/careOfPersonSkills';
import { controlOfMovementSkills } from '@/data/controlOfMovementSkills';

interface PracticalLifeOverviewProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

// Convert care of person skills to the same format
const careOfPersonSkillsFormatted = Object.values(careOfPersonSkills).map(skill => ({
  id: skill.id,
  title: skill.title,
  description: skill.description,
  icon: skill.icon,
  category: 'Practical Life',
  difficulty: skill.isPremium ? 'Medium' : 'Easy',
  ageRange: skill.ageRange,
  duration: skill.duration,
  isPremium: skill.isPremium
}));

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
const careOfEnvironmentSkillsFormatted = Object.values(careOfEnvironmentSkills).map(skill => ({
  id: skill.id,
  title: skill.title,
  description: skill.description,
  icon: skill.icon,
  category: 'Practical Life',
  difficulty: skill.isPremium ? 'Medium' : 'Easy',
  ageRange: skill.ageRange,
  duration: skill.duration,
  isPremium: skill.isPremium
}));

// Convert control of movement skills to the same format
const controlOfMovementSkillsFormatted = Object.values(controlOfMovementSkills).map(skill => ({
  id: skill.id,
  title: skill.title,
  description: skill.description,
  icon: skill.icon,
  category: 'Practical Life',
  difficulty: skill.isPremium ? 'Medium' : 'Easy',
  ageRange: skill.ageRange,
  duration: skill.duration,
  isPremium: skill.isPremium
}));

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
    </PageLayout>
  );
};

export default PracticalLifeOverview;