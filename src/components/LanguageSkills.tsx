import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import SkillCard from './SkillCard';
import ShopSectionCTA from './ShopSectionCTA';
import PageLayout from './PageLayout';
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
const AMI_LANGUAGE_STAGES: { title: string; description: string; skillIds: string[] }[] = [
  {
    title: 'Stage 1 · Oral Language Foundation',
    description: 'Enriching spoken vocabulary and expression before any written work.',
    skillIds: ['vocabulary-enrichment', 'conversation-skills', 'poetry-recitation', 'storytelling-oral'],
  },
  {
    title: 'Stage 2 · Phonemic Awareness',
    description: 'Hearing and isolating the sounds inside spoken words.',
    skillIds: ['sound-games', 'initial-sound-sorting', 'syllable-clapping', 'rhyming-games'],
  },
  {
    title: 'Stage 3 · Vocabulary & Classification',
    description: 'Building precise nomenclature with real objects and picture cards.',
    skillIds: ['matching-cards-objects', 'classified-cards'],
  },
  {
    title: 'Stage 4 · Preparation for Writing',
    description: 'Indirectly preparing the hand and eye for letter formation.',
    skillIds: ['writing-preparation', 'metal-insets'],
  },
  {
    title: 'Stage 5 · Sandpaper Letters & Sounds',
    description: 'Linking each phonetic sound to its written symbol through touch.',
    skillIds: ['sandpaper-letters', 'chalkboard-writing'],
  },
  {
    title: 'Stage 6 · Moveable Alphabet (Writing Explosion)',
    description: 'Composing words from sounds before reading is established.',
    skillIds: ['moveable-alphabet', 'word-building'],
  },
  {
    title: 'Stage 7 · Pink Series (3-letter phonetic words)',
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
    title: 'Stage 8 · Blue Series (consonant blends & longer words)',
    description: 'Reading 4–6 letter phonetic words with blends and digraphs.',
    skillIds: ['blue-series', 'phonetic-reading'],
  },
  {
    title: 'Stage 9 · Green Series (phonograms)',
    description: 'Decoding non-phonetic spelling patterns: ai, oa, ee, sh, ch, th.',
    skillIds: ['green-series'],
  },
  {
    title: 'Stage 10 · Reading Comprehension',
    description: 'Demonstrating understanding through action and classification.',
    skillIds: ['command-cards', 'reading-classification'],
  },
  {
    title: 'Stage 11 · Grammar & Word Study',
    description: 'Discovering the function of every word through grammar symbols.',
    skillIds: ['grammar-symbols', 'noun-classification', 'verb-conjugation', 'function-of-words', 'sentence-analysis'],
  },
  {
    title: 'Stage 12 · Creative Writing',
    description: 'Composing original sentences and stories with confidence.',
    skillIds: ['creative-writing'],
  },
];

const LanguageSkills: React.FC<LanguageSkillsProps> = ({
  onSkillSelect,
  onBack,
  completedSkills,
  isPremium,
  activeProfile,
}) => {
  // Flatten in stage order, then apply free-tier limit so the first activity stays free
  const orderedIds = AMI_LANGUAGE_STAGES.flatMap((s) => s.skillIds).filter(
    (id) => languageSkillsData[id]
  );

  const orderedSkillsRaw = orderedIds.map((skillId) => ({
    id: skillId,
    ...languageSkillsData[skillId],
    image: languageImages[skillId],
  }));

  const orderedSkills = applyFirstFreeItemLimit(orderedSkillsRaw);
  const skillsById = new Map(orderedSkills.map((s) => [s.id, s]));

  const completionRate = orderedSkills.length
    ? (completedSkills.length / orderedSkills.length) * 100
    : 0;
  const completedCount = completedSkills.length;

  // Running number across all stages
  let stepCounter = 0;

  return (
    <PageLayout title="Language Development" onBack={onBack}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
              <BookOpen className="h-6 w-6" />
            </span>
            <span className="text-lg text-muted-foreground">AMI Montessori Language Sequence</span>
          </div>
          {activeProfile && (
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-xl">{activeProfile.avatar}</span>
              {activeProfile.name}'s Language Journey
            </p>
          )}
        </div>
      </div>

      <Card className="bg-white border border-gray-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Language Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>
                  {completedCount}/{orderedSkills.length} steps mastered
                </span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Follow the AMI sequence one step at a time. Each stage indirectly prepares the child
              for the next — there is no need to skip ahead.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-10">
        {AMI_LANGUAGE_STAGES.map((stage, stageIndex) => {
          const stageSkills = stage.skillIds
            .map((id) => skillsById.get(id))
            .filter((s): s is NonNullable<typeof s> => Boolean(s));

          if (stageSkills.length === 0) return null;

          return (
            <section key={stage.title} aria-labelledby={`stage-${stageIndex}`}>
              <div className="mb-4 border-l-4 border-primary pl-4">
                <h2
                  id={`stage-${stageIndex}`}
                  className="text-xl font-semibold text-gray-800"
                >
                  {stage.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stageSkills.map((skill) => {
                  stepCounter += 1;
                  const stepNumber = stepCounter;
                  return (
                    <div key={skill.id} className="relative">
                      <div
                        className="absolute -top-3 -left-3 z-10 w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shadow-lg text-sm"
                        aria-hidden="true"
                      >
                        {stepNumber}
                      </div>
                      <SkillCard
                        skill={skill}
                        isCompleted={completedSkills.includes(skill.id)}
                        onSelect={() => onSkillSelect(skill.id)}
                        isPremium={isPremium}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <ShopSectionCTA category="Language" />
    </PageLayout>
  );
};

export default LanguageSkills;
