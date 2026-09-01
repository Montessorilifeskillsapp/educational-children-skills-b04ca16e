import React from 'react';
import CurriculumSection, { buildOrderedGroups, orderBySequence } from './CurriculumSection';
import { montessoriTheme } from './ThemeConfig';
import { languageSkillsData } from '@/data/languageSkills';
import { languageImages } from '@/assets/language';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface LanguageSkillsProps {
  onSkillSelect: (skillId: string) => void;
  onBack: () => void;
  completedSkills: string[];
  isPremium: boolean;
  activeProfile?: any;
}

// AMI Language progression — ordered stages, each containing skill IDs in sequence
const AMI_LANGUAGE_GROUPS = [
  {
    key: 'stage-1',
    emoji: '🗣️',
    title: 'Oral Language Foundation',
    description: 'Enriching spoken vocabulary and expression before any written work.',
    skillIds: ['vocabulary-enrichment', 'conversation-skills', 'poetry-recitation', 'storytelling-oral'],
  },
  {
    key: 'stage-2',
    emoji: '👂',
    title: 'Phonemic Awareness',
    description: 'Hearing and isolating the sounds inside spoken words.',
    skillIds: ['sound-games', 'initial-sound-sorting', 'syllable-clapping', 'rhyming-games'],
  },
  {
    key: 'stage-3',
    emoji: '🃏',
    title: 'Vocabulary and Classification',
    description: 'Building precise nomenclature with real objects and picture cards.',
    skillIds: ['matching-cards-objects', 'classified-cards'],
  },
  {
    key: 'stage-4',
    emoji: '✏️',
    title: 'Preparation for Writing',
    description: 'Indirectly preparing the hand and eye for letter formation.',
    skillIds: ['writing-preparation', 'metal-insets'],
  },
  {
    key: 'stage-5',
    emoji: '🔤',
    title: 'Sandpaper Letters and Sounds',
    description: 'Linking each phonetic sound to its written symbol through touch.',
    skillIds: ['sandpaper-letters', 'chalkboard-writing'],
  },
  {
    key: 'stage-6',
    emoji: '🧩',
    title: 'Moveable Alphabet (Writing Explosion)',
    description: 'Composing words from sounds before reading is established.',
    skillIds: ['moveable-alphabet', 'word-building'],
  },
  {
    key: 'stage-7',
    emoji: '🌸',
    title: 'Pink Series (three-letter phonetic words)',
    description: 'The first true reading: decoding CVC words through six sequential steps.',
    skillIds: [
      'pink-object-box',
      'pink-picture-cards',
      'pink-word-lists',
      'pink-phrases',
      'pink-sentences',
      'pink-booklets',
    ],
  },
  {
    key: 'stage-8',
    emoji: '🔵',
    title: 'Blue Series (consonant blends and longer words)',
    description: 'Reading four to six letter phonetic words with blends and digraphs.',
    skillIds: ['blue-series', 'phonetic-reading'],
  },
  {
    key: 'stage-9',
    emoji: '🟢',
    title: 'Green Series (phonograms)',
    description: 'Decoding non-phonetic spelling patterns: ai, oa, ee, sh, ch, th.',
    skillIds: ['green-series'],
  },
  {
    key: 'stage-10',
    emoji: '📖',
    title: 'Reading Comprehension',
    description: 'Demonstrating understanding through action and classification.',
    skillIds: ['command-cards', 'reading-classification'],
  },
  {
    key: 'stage-11',
    emoji: '🔺',
    title: 'Grammar and Word Study',
    description: 'Discovering the function of every word through grammar symbols.',
    skillIds: [
      'grammar-symbols',
      'noun-classification',
      'verb-conjugation',
      'function-of-words',
      'sentence-analysis',
    ],
  },
  {
    key: 'stage-12',
    emoji: '✍️',
    title: 'Creative Writing',
    description: 'Composing original sentences and stories with confidence.',
    skillIds: ['creative-writing'],
  },
];

const SEQUENCE_IDS = AMI_LANGUAGE_GROUPS.flatMap((group) => group.skillIds);

const LanguageSkills: React.FC<LanguageSkillsProps> = ({
  onSkillSelect,
  onBack,
  completedSkills,
  isPremium,
}) => {
  const skills = applyFirstFreeItemLimit(
    orderBySequence(
      Object.keys(languageSkillsData).map((skillId) => ({
        id: skillId,
        ...languageSkillsData[skillId],
        image: languageImages[skillId],
      })),
      SEQUENCE_IDS,
    ),
  );

  const groups = buildOrderedGroups(
    AMI_LANGUAGE_GROUPS,
    new Map(skills.map((skill) => [skill.id, skill])),
  );

  return (
    <CurriculumSection
      title="📚 Language"
      intro="Language unfolds from the spoken word. The child hears sounds, then writes with the moveable alphabet, and only afterwards reads — each stage prepared long before it is presented."
      sequence="Oral Language → Phonemic Awareness → Writing Preparation → Sandpaper Letters → Moveable Alphabet → Pink, Blue and Green Series → Grammar → Creative Writing"
      groups={groups}
      shopCategory="Language"
      className={montessoriTheme.backgrounds.language}
      onBack={onBack}
      onSkillSelect={onSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default LanguageSkills;
