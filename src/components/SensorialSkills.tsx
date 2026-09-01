import React from 'react';
import CurriculumSection, { buildOrderedGroups, orderBySequence } from './CurriculumSection';
import { montessoriTheme } from './ThemeConfig';
import { sensorialSkills } from '@/data/sensorialSkills';
import { additionalSensorialSkills } from '@/data/sensorialSkills2';
import { tactileSensorialSkills } from '@/data/tactileSensorialSkills';
import { completeSensorialSkills } from '@/data/completeSensorialSkills';
import { sensorialImages } from '@/assets/sensorial';
import { useSEO } from '@/hooks/useSEO';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface SensorialSkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
  activeProfile?: any;
}

// AMI Sensorial sequence — simplest discrimination first, most abstract last
const AMI_SENSORIAL_GROUPS = [
  {
    key: 'dimension',
    emoji: '📐',
    title: 'Visual — Dimension',
    description:
      'The first sensorial work. The child isolates one quality at a time — thickness, height, length and breadth — through graded materials that carry their own control of error.',
    skillIds: ['knobbed-cylinders', 'pink-tower', 'brown-stair', 'red-rods', 'knobless-cylinders'],
  },
  {
    key: 'colour',
    emoji: '🎨',
    title: 'Visual — Colour',
    description:
      'Matching, then naming, then grading colour. Introduced once the child can already pair and grade by dimension.',
    skillIds: ['color-tablets'],
  },
  {
    key: 'form',
    emoji: '🔺',
    title: 'Visual — Form',
    description:
      'Plane and solid geometry explored with the hands before the eyes, preparing indirectly for geometry and for writing.',
    skillIds: ['geometric-cabinet', 'constructive-triangles', 'geometric-solids'],
  },
  {
    key: 'tactile',
    emoji: '✋',
    title: 'Tactile, Baric and Thermic',
    description:
      'Refining the sense of touch: rough and smooth, weight and temperature. Always presented with the eyes closed or blindfolded to isolate the sense.',
    skillIds: ['touch-boards', 'fabric-box', 'baric-tablets', 'thermic-tablets'],
  },
  {
    key: 'auditory',
    emoji: '🔔',
    title: 'Auditory',
    description:
      'Discriminating and grading sound, preparing the ear for the phonetic work of language and for music.',
    skillIds: ['sound-cylinders'],
  },
  {
    key: 'olfactory',
    emoji: '👃',
    title: 'Olfactory and Gustatory',
    description:
      'Smell and taste, isolated and paired. Presented later because they require the child to already work with care and precision.',
    skillIds: ['smelling-bottles', 'tasting-bottles'],
  },
  {
    key: 'stereognostic',
    emoji: '✨',
    title: 'Stereognostic and Advanced Work',
    description:
      'Recognising form by touch alone, then the algebraic cubes — the most advanced sensorial materials, a bridge to mathematics.',
    skillIds: ['mystery-bag', 'binomial-cube', 'trinomial-cube'],
  },
];

const SEQUENCE_IDS = AMI_SENSORIAL_GROUPS.flatMap((group) => group.skillIds);

const SensorialSkills: React.FC<SensorialSkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
}) => {
  useSEO({
    title: 'Montessori Sensorial Skills - Visual, Auditory & Tactile Learning',
    description:
      'Explore comprehensive Montessori sensorial activities including Pink Tower, Brown Stair, Color Tablets, Sound Cylinders, and tactile materials.',
    keywords:
      'montessori sensorial, pink tower, brown stair, color tablets, sound cylinders, touch boards, sensory development',
    canonical: 'https://montessori-skills.com/sensorial',
  });

  const allSkills = {
    ...sensorialSkills,
    ...additionalSensorialSkills,
    ...tactileSensorialSkills,
    ...completeSensorialSkills,
  };

  const skills = applyFirstFreeItemLimit(
    orderBySequence(
      Object.keys(allSkills).map((skillId) => ({
        id: skillId,
        ...allSkills[skillId],
        image: sensorialImages[skillId],
      })),
      SEQUENCE_IDS,
    ),
  );

  const groups = buildOrderedGroups(
    AMI_SENSORIAL_GROUPS,
    new Map(skills.map((skill) => [skill.id, skill])),
  );

  return (
    <CurriculumSection
      title="👁️ Sensorial Development"
      intro="Sensorial materials refine and classify what the child has already absorbed through the senses. Each material isolates one quality, moves from simple to complex, and carries its own control of error."
      sequence="Dimension → Colour → Form → Tactile → Auditory → Olfactory & Gustatory → Stereognostic"
      groups={groups}
      shopCategory="Sensorial"
      className={montessoriTheme.backgrounds.sensorial}
      onBack={onBack}
      onSkillSelect={onSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default SensorialSkills;
