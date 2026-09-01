import React from 'react';
import CurriculumSection, { buildOrderedGroups, orderBySequence } from './CurriculumSection';
import { geographySkillsData } from '@/data/geographySkills';
import SkillActivity from './SkillActivity';
import { montessoriTheme } from './ThemeConfig';
import { geographyImages } from '@/assets/geography';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface GeographySkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
  selectedSkill?: string;
}

const AMI_GEOGRAPHY_GROUPS = [
  {
    key: 'land-water',
    emoji: '🏝️',
    title: 'Land and Water',
    description:
      'Geography always begins sensorially with the elements themselves — land, water and air — and the paired land and water forms the child can pour and shape.',
    skillIds: ['land-water-forms', 'landforms', 'water-bodies'],
  },
  {
    key: 'globe',
    emoji: '🌍',
    title: 'The Globes and Continents',
    description:
      'From the sandpaper globe to the coloured globe and puzzle maps, the child builds a first impression of the whole earth and its continents and oceans.',
    skillIds: ['continents', 'oceans'],
  },
  {
    key: 'maps',
    emoji: '🧭',
    title: 'Maps and Orientation',
    description:
      'Once continents are known, the child learns to read a map and to orient themselves with cardinal directions.',
    skillIds: ['compass-directions', 'map-reading'],
  },
  {
    key: 'world',
    emoji: '🏳️',
    title: 'Countries, Flags and Climate',
    description:
      'The most advanced geography work: naming countries and capitals, recognising flags, and understanding how climate shapes life on earth.',
    skillIds: ['countries-capitals', 'world-flags', 'climate-zones'],
  },
];

const SEQUENCE_IDS = AMI_GEOGRAPHY_GROUPS.flatMap((group) => group.skillIds);

const GeographySkills: React.FC<GeographySkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
  selectedSkill,
}) => {
  const skills = applyFirstFreeItemLimit(
    orderBySequence(
      Object.entries(geographySkillsData).map(([skillId, skill]) => ({
        id: skillId,
        ...skill,
        image: geographyImages[skillId],
      })),
      SEQUENCE_IDS,
    ),
  );

  if (selectedSkill && geographySkillsData[selectedSkill]) {
    return (
      <SkillActivity
        skillId={selectedSkill}
        onBack={() => onSkillSelect('')}
        onComplete={() => {
          onSkillSelect('');
        }}
      />
    );
  }

  const groups = buildOrderedGroups(
    AMI_GEOGRAPHY_GROUPS,
    new Map(skills.map((skill) => [skill.id, skill])),
  );

  return (
    <CurriculumSection
      title="🌍 Geography"
      intro="Montessori geography moves from the concrete earth to the abstract map. The child first handles land and water, then the globes, and only later names countries and flags."
      sequence="Land and Water → Globes and Continents → Maps and Orientation → Countries, Flags and Climate"
      groups={groups}
      shopCategory="Geography"
      className={montessoriTheme.backgrounds.geography}
      onBack={onBack}
      onSkillSelect={onSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default GeographySkills;
