import React from 'react';
import CurriculumSection, { buildOrderedGroups, orderBySequence } from './CurriculumSection';
import { artSkillsEnhanced } from '../data/artSkillsEnhanced';
import SkillActivity from './SkillActivity';
import { montessoriTheme } from './ThemeConfig';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface ArtSkillsProps {
  selectedSkill?: string;
  onSkillSelect: (skillId: string) => void;
  onBack?: () => void;
}

const ART_GROUPS = [
  {
    key: 'drawing',
    emoji: '✏️',
    title: 'First Marks and Drawing',
    description:
      'Art begins with control of the hand. Simple line work and mark making prepare the same movements the child will later use for writing.',
    skillIds: ['basic-drawing', 'observational-drawing'],
  },
  {
    key: 'colour',
    emoji: '🎨',
    title: 'Exploring Colour',
    description:
      'After the hand is prepared, the child isolates colour — first the three primaries, then discovering the secondaries by mixing them.',
    skillIds: ['primary-colors', 'color-mixing'],
  },
  {
    key: 'painting',
    emoji: '🖌️',
    title: 'Painting',
    description:
      'The most advanced art work: managing water, brush and pigment with care, from direct finger painting to controlled watercolour.',
    skillIds: ['finger-painting', 'watercolor-basics'],
  },
];

const SEQUENCE_IDS = ART_GROUPS.flatMap((group) => group.skillIds);

export const ArtSkills: React.FC<ArtSkillsProps> = ({ selectedSkill, onSkillSelect, onBack }) => {
  const { isPremium } = useSubscription();

  const skills = applyFirstFreeItemLimit(
    orderBySequence(
      Object.entries(artSkillsEnhanced).map(([key, skill]) => ({ id: key, ...skill })),
      SEQUENCE_IDS,
    ),
  );

  if (selectedSkill && artSkillsEnhanced[selectedSkill]) {
    return <SkillActivity skillId={selectedSkill} onBack={() => onSkillSelect('')} onComplete={() => {}} />;
  }

  const groups = buildOrderedGroups(ART_GROUPS, new Map(skills.map((skill) => [skill.id, skill])));

  return (
    <CurriculumSection
      title="🎨 Art"
      intro="Montessori art gives the child real tools and real technique. Each activity isolates one skill — line, colour or brushwork — so creative expression rests on genuine ability."
      sequence="First Marks and Drawing → Exploring Colour → Painting"
      groups={groups}
      shopCategory="Art"
      className={montessoriTheme.backgrounds.art}
      onBack={onBack ?? (() => {})}
      onSkillSelect={onSkillSelect}
      isPremium={isPremium}
    />
  );
};

export default ArtSkills;
