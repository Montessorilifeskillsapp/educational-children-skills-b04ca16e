import React from 'react';
import CurriculumSection, { buildOrderedGroups, orderBySequence } from './CurriculumSection';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';
import { montessoriTheme } from './ThemeConfig';

interface GraceAndCourtesySkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

const GRACE_GROUPS = [
  {
    key: 'first-gestures',
    emoji: '🤝',
    title: 'First Social Gestures',
    description:
      'The very first lessons given in the environment: how to greet another person and how to ask for and acknowledge help.',
    skillIds: ['greeting-others', 'saying-please-thank-you'],
  },
  {
    key: 'community',
    emoji: '🚶',
    title: 'Moving Within the Community',
    description:
      'Learning to move through a shared space without disturbing others, and to wait for a turn with patience.',
    skillIds: ['walking-indoors', 'waiting-turn'],
  },
  {
    key: 'advanced',
    emoji: '🍽️',
    title: 'Caring for Others',
    description:
      'The most advanced grace and courtesy work: noticing what another person needs and serving the community at the table.',
    skillIds: ['offering-help', 'table-manners'],
  },
];

const SEQUENCE_IDS = GRACE_GROUPS.flatMap((group) => group.skillIds);

const GraceAndCourtesySkills: React.FC<GraceAndCourtesySkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
}) => {
  const skills = applyFirstFreeItemLimit(
    orderBySequence(Object.values(graceAndCourtesySkills), SEQUENCE_IDS),
  );

  const groups = buildOrderedGroups(GRACE_GROUPS, new Map(skills.map((skill) => [skill.id, skill])));

  return (
    <CurriculumSection
      title="🤝 Grace and Courtesy"
      intro="Grace and Courtesy lessons are short, precise demonstrations of how to live alongside others. They are given from the child's first days in the environment and grow in social complexity."
      sequence="First Social Gestures → Moving Within the Community → Caring for Others"
      groups={groups}
      shopCategory="Practical Life"
      shopLabel="Shop Grace & Courtesy Materials"
      className={montessoriTheme.backgrounds.graceCourtesy}
      onBack={onBack}
      onSkillSelect={onSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default GraceAndCourtesySkills;
