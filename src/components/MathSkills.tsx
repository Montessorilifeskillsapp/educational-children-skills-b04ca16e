import React from 'react';
import CurriculumSection, { buildOrderedGroups, orderBySequence } from './CurriculumSection';
import { montessoriTheme } from './ThemeConfig';
import { mathSkillsData } from '@/data/mathSkills';
import { mathImages } from '@/assets/math';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface MathSkillsProps {
  onSkillSelect: (skillId: string) => void;
  onBack: () => void;
  completedSkills: string[];
  isPremium: boolean;
  activeProfile?: any;
}

// AMI Mathematics progression — ordered stages following the classic Casa sequence
const AMI_MATH_GROUPS = [
  {
    key: 'stage-1',
    emoji: '1️⃣',
    title: 'Numbers 1 to 10',
    description: 'Building quantity, symbol, and the association between them.',
    skillIds: ['number-rods', 'sandpaper-numbers', 'spindle-box', 'cards-counters', 'memory-game-numbers'],
  },
  {
    key: 'stage-2',
    emoji: '🟡',
    title: 'The Decimal System',
    description: 'Introducing units, tens, hundreds, and thousands with golden beads.',
    skillIds: ['golden-beads', 'bank-game'],
  },
  {
    key: 'stage-3',
    emoji: '🔢',
    title: 'Linear Counting (Teens, Tens, Hundred)',
    description: 'Counting continuously from 11 through 100 using bead bars and boards.',
    skillIds: ['short-bead-stair', 'teen-boards', 'ten-boards', 'hundred-board', 'number-composition'],
  },
  {
    key: 'stage-4',
    emoji: '🐍',
    title: 'Operations with the Snake Games',
    description: 'First exploration of addition and subtraction through bead exchange.',
    skillIds: ['addition-snake-game', 'subtraction-snake-game'],
  },
  {
    key: 'stage-5',
    emoji: '🟩',
    title: 'Stamp Game and Dot Game',
    description: 'Working all four operations on a smaller, more abstract plane.',
    skillIds: ['stamp-game', 'dot-game'],
  },
  {
    key: 'stage-6',
    emoji: '🧠',
    title: 'Memorisation of Number Facts',
    description: 'Committing addition, subtraction, multiplication, and division facts to memory.',
    skillIds: ['addition-strip-board', 'subtraction-strip-board', 'multiplication-board', 'division-board'],
  },
  {
    key: 'stage-7',
    emoji: '🧮',
    title: 'Passage to Abstraction',
    description: 'Refining operations on the bead frames as the child leaves the materials behind.',
    skillIds: ['small-bead-frame', 'large-bead-frame'],
  },
  {
    key: 'stage-8',
    emoji: '🥧',
    title: 'Fractions',
    description: 'First sensorial impression of parts of a whole.',
    skillIds: ['fraction-skittles'],
  },
];

const SEQUENCE_IDS = AMI_MATH_GROUPS.flatMap((group) => group.skillIds);

const MathSkills: React.FC<MathSkillsProps> = ({
  onSkillSelect,
  onBack,
  completedSkills,
  isPremium,
}) => {
  const skills = applyFirstFreeItemLimit(
    orderBySequence(
      Object.keys(mathSkillsData).map((skillId) => ({
        id: skillId,
        ...mathSkillsData[skillId],
        image: mathImages[skillId],
      })),
      SEQUENCE_IDS,
    ),
  );

  const groups = buildOrderedGroups(
    AMI_MATH_GROUPS,
    new Map(skills.map((skill) => [skill.id, skill])),
  );

  return (
    <CurriculumSection
      title="🧮 Mathematics"
      intro="The mathematical mind is built through materialised abstraction. Each material prepares the next indirectly, so the child moves from quantity to symbol to operation without ever being rushed."
      sequence="Numbers 1–10 → Decimal System → Linear Counting → Snake Games → Stamp Game → Memorisation → Abstraction → Fractions"
      groups={groups}
      shopCategory="Mathematics"
      className={montessoriTheme.backgrounds.math}
      onBack={onBack}
      onSkillSelect={onSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default MathSkills;
