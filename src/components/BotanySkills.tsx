import React from 'react';
import CurriculumSection, { buildOrderedGroups, orderBySequence } from './CurriculumSection';
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

const AMI_BOTANY_GROUPS = [
  {
    key: 'parts',
    emoji: '🌿',
    title: 'Parts of the Plant',
    description:
      'The first botany work: naming the whole plant, then its parts, with real specimens before cards. Precise nomenclature comes from direct observation.',
    skillIds: ['plant-parts', 'leaf-shapes', 'flower-parts'],
  },
  {
    key: 'growth',
    emoji: '🌱',
    title: 'Growth and Life Cycle',
    description:
      'Once the parts are known, the child follows the plant through time — germination, growth and the full cycle from seed to seed.',
    skillIds: ['seed-germination', 'plant-lifecycle'],
  },
  {
    key: 'care',
    emoji: '💧',
    title: 'Caring for Living Things',
    description:
      'The most advanced botany work joins knowledge to responsibility: the child provides what a plant needs and cares for it over time.',
    skillIds: ['plant-needs'],
  },
];

const SEQUENCE_IDS = AMI_BOTANY_GROUPS.flatMap((group) => group.skillIds);

const BotanySkills: React.FC<BotanySkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
}) => {
  const skills = applyFirstFreeItemLimit(
    orderBySequence(
      Object.entries(botanySkillsData).map(([skillId, skill]) => ({
        id: skillId,
        ...skill,
        image: botanyImages[skillId],
      })),
      SEQUENCE_IDS,
    ),
  );

  const groups = buildOrderedGroups(
    AMI_BOTANY_GROUPS,
    new Map(skills.map((skill) => [skill.id, skill])),
  );

  return (
    <CurriculumSection
      title="🌿 Botany"
      intro="Botany begins with the living plant itself. The child observes, names and cares for real specimens, moving from the whole to its parts and then to the cycle of life."
      sequence="Parts of the Plant → Growth and Life Cycle → Caring for Living Things"
      groups={groups}
      shopCategory="Botany"
      className={montessoriTheme.backgrounds.botany}
      onBack={onBack}
      onSkillSelect={onSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default BotanySkills;
