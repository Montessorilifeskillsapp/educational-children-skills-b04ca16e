import React from 'react';
import SkillCard from './SkillCard';
import ShopSectionCTA from './ShopSectionCTA';
import PageLayout from './PageLayout';

export interface CurriculumSkill {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  category?: string;
  difficulty?: string;
  ageRange?: string;
  isPremium: boolean;
  hasShopItems?: boolean;
}

export interface CurriculumGroup {
  key: string;
  emoji: string;
  title: string;
  description: string;
  skills: CurriculumSkill[];
}

interface CurriculumSectionProps {
  title: string;
  intro: string;
  sequence?: string;
  groups: CurriculumGroup[];
  shopCategory: string;
  shopLabel?: string;
  className?: string;
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills?: string[];
  isPremium: boolean;
}

/**
 * Shared curriculum-area layout, matching the Practical Life presentation:
 * intro, AMI sequence line, then ordered beginner → advanced groups of cards.
 */
const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  title,
  intro,
  sequence,
  groups,
  shopCategory,
  shopLabel,
  className,
  onBack,
  onSkillSelect,
  completedSkills = [],
  isPremium,
}) => {
  const populated = groups.filter((group) => group.skills.length > 0);

  return (
    <PageLayout title={title} onBack={onBack} className={className}>
      <div className="text-center mb-8">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{intro}</p>
        {sequence && (
          <p className="text-lg text-gray-500 mt-2">Sequence: {sequence}</p>
        )}
      </div>

      {populated.map((group) => (
        <div className="mb-12" key={group.key}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            {group.emoji} {group.title}
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl">{group.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={{
                  ...skill,
                  icon: skill.icon ?? '',
                  category: skill.category ?? '',
                  difficulty: skill.difficulty ?? '',
                }}
                onSelect={() => onSkillSelect(skill.id)}
                isCompleted={completedSkills.includes(skill.id)}
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      ))}

      <ShopSectionCTA category={shopCategory} label={shopLabel} />
    </PageLayout>
  );
};

/**
 * Builds ordered groups from an explicit beginner → advanced id sequence.
 * Any skill not listed in a group is appended to the final group so nothing
 * disappears from the curriculum.
 */
export const buildOrderedGroups = <T extends CurriculumSkill>(
  definitions: { key: string; emoji: string; title: string; description: string; skillIds: string[] }[],
  skillsById: Map<string, T>,
): CurriculumGroup[] => {
  const used = new Set<string>();
  const groups = definitions.map((definition) => {
    const skills = definition.skillIds
      .map((id) => skillsById.get(id))
      .filter((skill): skill is T => Boolean(skill));
    skills.forEach((skill) => used.add(skill.id));
    return { ...definition, skills };
  });

  const leftovers = Array.from(skillsById.values()).filter((skill) => !used.has(skill.id));
  if (leftovers.length > 0 && groups.length > 0) {
    groups[groups.length - 1].skills = [...groups[groups.length - 1].skills, ...leftovers];
  }

  return groups;
};

/**
 * Orders skills beginner → advanced according to the given id sequence,
 * so the free-tier limiter always unlocks the true first activity.
 */
export const orderBySequence = <T extends { id: string }>(skills: T[], order: string[]): T[] => {
  const rank = new Map(order.map((id, index) => [id, index]));
  return [...skills].sort(
    (a, b) => (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER),
  );
};

export default CurriculumSection;
