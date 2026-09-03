import React from 'react';
import CurriculumSection, { CurriculumGroup } from './CurriculumSection';
import { culturalSkillsData } from '@/data/culturalSkills';
import { montessoriTheme } from './ThemeConfig';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface CulturalSkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

const CULTURAL_GROUPS = [
  {
    key: 'Cultural - History',
    emoji: '⏳',
    title: 'History and Time',
    description:
      'Time is made concrete before it is made abstract: the child begins with their own day and their own life, then widens out to the seasons and the great eras.',
    skillIds: ['days-of-the-week', 'seasons-cycle', 'personal-timeline', 'clock-of-eras'],
  },
  {
    key: 'Cultural - Music',
    emoji: '🔔',
    title: 'Music',
    description:
      'Music follows the sensorial ear: first discriminating and matching sound, then pitch with the bells, then rhythm and movement.',
    skillIds: ['sound-cylinders', 'bells-introduction', 'rhythm-patterns', 'songs-and-movement'],
  },
  {
    key: 'Cultural - Science',
    emoji: '🔬',
    title: 'Science',
    description:
      'Simple, repeatable experiments the child can control alone, moving from single-property investigations to observing a full living cycle.',
    skillIds: ['sink-or-float', 'magnet-exploration', 'life-cycle-butterfly'],
  },
  {
    key: 'Cultural - Planets',
    emoji: '🪐',
    title: 'Planets',
    description:
      'Key Montessori astronomy activities: from matching the concrete planet to its picture, to naming, puzzling, and physically feeling orbital motion.',
    skillIds: [
      'planet-object-picture-matching',
      'orbiting-movement',
      'solar-system-puzzle',
      'planet-nomenclature-cards',
    ],
  },
  {
    key: 'Cultural - World Cultures',
    emoji: '🌏',
    title: 'World Cultures',
    description:
      'The most advanced cultural work: recognising that people everywhere meet the same human needs in different ways — in dress, food and celebration.',
    skillIds: ['flags-of-the-world', 'traditional-clothing', 'food-around-the-world', 'celebrations-traditions'],
  },
];

const SEQUENCE_IDS = CULTURAL_GROUPS.flatMap((group) => group.skillIds);

const CulturalSkills: React.FC<CulturalSkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
}) => {
  const rank = new Map(SEQUENCE_IDS.map((id, index) => [id, index]));

  const skills = applyFirstFreeItemLimit(
    Object.entries(culturalSkillsData)
      .map(([skillId, skill]) => ({ id: skillId, ...skill }))
      .sort(
        (a, b) =>
          (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER),
      ),
  );

  const groups: CurriculumGroup[] = CULTURAL_GROUPS.map((group) => ({
    key: group.key,
    emoji: group.emoji,
    title: group.title,
    description: group.description,
    skills: skills.filter((skill) => skill.category === group.key),
  }));

  return (
    <CurriculumSection
      title="🌏 Cultural Studies"
      intro="Cultural studies open the child to the wider world — time, sound, matter and people. Each area starts with something the child can handle directly before moving to the abstract."
      sequence="History and Time → Music → Science → Planets → World Cultures"
      groups={groups}
      shopCategory="Cultural"
      className={montessoriTheme.backgrounds.cultural}
      onBack={onBack}
      onSkillSelect={onSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default CulturalSkills;
