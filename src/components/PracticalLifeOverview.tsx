import React from 'react';
import SkillCard from './SkillCard';
import PageLayout from './PageLayout';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { careOfEnvironmentSkills } from '@/data/careOfEnvironmentSkills';
import { controlOfErrorSkills } from '@/data/controlOfErrorSkills';

interface PracticalLifeOverviewProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

const practicalLifeSkills = [
  {
    id: 'brushing-teeth',
    title: 'Brushing Teeth',
    description: 'Learn proper dental hygiene',
    icon: '🦷',
    category: 'Practical Life',
    difficulty: 'Easy',
    ageRange: '2-4 years',
    duration: '5 minutes',
    isPremium: false
  },
  {
    id: 'washing-hands',
    title: 'Washing Hands',
    description: 'Master hand washing technique',
    icon: '🧼',
    category: 'Practical Life',
    difficulty: 'Easy',
    ageRange: '2-4 years',
    duration: '3 minutes',
    isPremium: false
  },
  {
    id: 'getting-dressed',
    title: 'Getting Dressed',
    description: 'Independence in dressing',
    icon: '👕',
    category: 'Practical Life',
    difficulty: 'Medium',
    ageRange: '3-5 years',
    duration: '10 minutes',
    isPremium: false
  },
  {
    id: 'making-bed',
    title: 'Making Bed',
    description: 'Organize sleeping space',
    icon: '🛏️',
    category: 'Practical Life',
    difficulty: 'Medium',
    ageRange: '4-6 years',
    duration: '8 minutes',
    isPremium: true
  },
  {
    id: 'setting-table',
    title: 'Setting Table',
    description: 'Prepare for meals',
    icon: '🍽️',
    category: 'Practical Life',
    difficulty: 'Medium',
    ageRange: '3-5 years',
    duration: '7 minutes',
    isPremium: true
  },
  {
    id: 'tying-shoes',
    title: 'Tying Shoes',
    description: 'Master shoe lacing',
    icon: '👟',
    category: 'Practical Life',
    difficulty: 'Hard',
    ageRange: '5-7 years',
    duration: '15 minutes',
    isPremium: true
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

// Convert control of error skills to the same format
const controlOfErrorSkillsFormatted = Object.values(controlOfErrorSkills).map(skill => ({
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
    <PageLayout title="🌱 Practical Life Skills" onBack={onBack}>
      <div className="text-center mb-8">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Build independence and confidence through everyday life activities
        </p>
      </div>

      {/* Care of Self Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          🧼 Care of Self
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practicalLifeSkills.map((skill) => (
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

      {/* Care of Environment Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          🌍 Care of Environment
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Learn to care for and maintain our surroundings, developing responsibility and environmental awareness.
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

      {/* Control of Error Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          🎯 Control of Error
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Activities with built-in self-correction that help children develop independence and self-assessment skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {controlOfErrorSkillsFormatted.map((skill) => (
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          💝 Grace and Courtesy
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Social skills and polite behavior that help children develop respect for others and confidence in social situations.
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
    </PageLayout>
  );
};

export default PracticalLifeOverview;