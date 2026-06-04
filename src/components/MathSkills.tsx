import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import SkillCard from './SkillCard';
import ShopSectionCTA from './ShopSectionCTA';
import { montessoriTheme } from './ThemeConfig';
import { mathSkillsData } from '@/data/mathSkills';
import PageLayout from './PageLayout';
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
const AMI_MATH_STAGES: { title: string; description: string; skillIds: string[] }[] = [
  {
    title: 'Stage 1 · Numbers 1 to 10',
    description: 'Building quantity, symbol, and the association between them.',
    skillIds: ['number-rods', 'sandpaper-numbers', 'spindle-box', 'cards-counters', 'memory-game-numbers'],
  },
  {
    title: 'Stage 2 · The Decimal System',
    description: 'Introducing units, tens, hundreds, and thousands with golden beads.',
    skillIds: ['golden-beads', 'bank-game'],
  },
  {
    title: 'Stage 3 · Linear Counting (Teens, Tens, Hundred)',
    description: 'Counting continuously from 11 through 100 using bead bars and boards.',
    skillIds: ['short-bead-stair', 'teen-boards', 'ten-boards', 'hundred-board', 'number-composition'],
  },
  {
    title: 'Stage 4 · Operations with the Snake Games',
    description: 'First exploration of addition and subtraction through bead exchange.',
    skillIds: ['addition-snake-game', 'subtraction-snake-game'],
  },
  {
    title: 'Stage 5 · Stamp Game & Dot Game',
    description: 'Working all four operations on a smaller, more abstract plane.',
    skillIds: ['stamp-game', 'dot-game'],
  },
  {
    title: 'Stage 6 · Memorisation of Number Facts',
    description: 'Committing addition, subtraction, multiplication, and division facts to memory.',
    skillIds: [
      'addition-strip-board',
      'subtraction-strip-board',
      'multiplication-board',
      'division-board',
    ],
  },
  {
    title: 'Stage 7 · Passage to Abstraction',
    description: 'Refining operations on the bead frames as the child leaves the materials behind.',
    skillIds: ['small-bead-frame', 'large-bead-frame'],
  },
  {
    title: 'Stage 8 · Fractions',
    description: 'First sensorial impression of parts of a whole.',
    skillIds: ['fraction-skittles'],
  },
];

const MathSkills: React.FC<MathSkillsProps> = ({
  onSkillSelect,
  onBack,
  completedSkills,
  isPremium,
  activeProfile,
}) => {
  const orderedIds = AMI_MATH_STAGES.flatMap((s) => s.skillIds).filter(
    (id) => mathSkillsData[id]
  );

  const orderedSkillsRaw = orderedIds.map((skillId) => ({
    id: skillId,
    ...mathSkillsData[skillId],
    image: mathImages[skillId],
  }));

  const orderedSkills = applyFirstFreeItemLimit(orderedSkillsRaw);
  const skillsById = new Map(orderedSkills.map((s) => [s.id, s]));

  const completionRate = orderedSkills.length
    ? (completedSkills.filter((id) => skillsById.has(id)).length / orderedSkills.length) * 100
    : 0;

  let stepCounter = 0;

  return (
    <PageLayout title="Mathematics Skills" onBack={onBack} className={montessoriTheme.backgrounds.math}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
              <Calculator className="h-6 w-6" />
            </span>
            <span className="text-lg text-muted-foreground">AMI Montessori Mathematics Sequence</span>
          </div>
          {activeProfile && (
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-xl">{activeProfile.avatar}</span>
              {activeProfile.name}'s Math Journey
            </p>
          )}
        </div>
      </div>

      <Card className="bg-white border border-gray-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Mathematics Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Completion Rate</span>
            <span className="font-semibold text-gray-800">{Math.round(completionRate)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Follow the AMI sequence one step at a time. Each material indirectly prepares the child
            for the next — there is no need to skip ahead.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-10">
        {AMI_MATH_STAGES.map((stage, stageIndex) => {
          const stageSkills = stage.skillIds
            .map((id) => skillsById.get(id))
            .filter((s): s is NonNullable<typeof s> => Boolean(s));

          if (stageSkills.length === 0) return null;

          return (
            <section key={stage.title} aria-labelledby={`math-stage-${stageIndex}`}>
              <div className="mb-4 border-l-4 border-primary pl-4">
                <h2
                  id={`math-stage-${stageIndex}`}
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

      <ShopSectionCTA category="Mathematics" />
    </PageLayout>
  );
};

export default MathSkills;
