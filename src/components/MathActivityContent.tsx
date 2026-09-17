import React, { useState } from 'react';
import type { MathSkillData } from '@/data/mathSkills';
import { mathImages } from '@/assets/math';
import ActivityLayout from './activity/ActivityLayout';
import ActivitySteps from './activity/ActivityStepGroup';
import GetTheMaterials from './GetTheMaterials';
import ActivityVideo from './ActivityVideo';
import { montessoriTheme } from './ThemeConfig';

interface MathActivityContentProps {
  skillId: string;
  skill: MathSkillData;
  onBack: () => void;
}

const MathActivityContent: React.FC<MathActivityContentProps> = ({ skillId, skill, onBack }) => {
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);
  const steps = (skill.detailedSteps?.length ? skill.detailedSteps : skill.steps).map((instruction, index) => ({
    id: `presentation-${index}`,
    instruction,
    completed: checkedSteps.includes(`presentation-${index}`),
  }));

  return (
    <ActivityLayout
      sectionLabel="Mathematics"
      title={skill.title}
      purpose={skill.purpose}
      image={mathImages[skillId] || skill.imageUrl}
      onBack={onBack}
      background={montessoriTheme.backgrounds.activity}
    >
      <p className="mb-5 text-sm text-muted-foreground">{skill.ageRange} • {skill.difficulty}</p>
      <GetTheMaterials skillId={skillId} skillMaterials={skill.materials} />
      {skill.materialsPurpose?.length > 0 && (
        <details className="mb-6 text-sm text-muted-foreground">
          <summary className="cursor-pointer font-medium text-foreground">Materials &amp; their purpose</summary>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            {skill.materialsPurpose.map((purpose, index) => <li key={index}>{purpose}</li>)}
          </ul>
        </details>
      )}
      <ActivityVideo skillId={skillId} activityTitle={skill.title} />
      <ActivitySteps
        steps={steps}
        onToggle={(id) => setCheckedSteps((current) => current.includes(id) ? current.filter((step) => step !== id) : [...current, id])}
      />
      {[
        { title: 'Learning objectives', items: skill.objectives },
        { title: 'Extensions', items: skill.extensions },
      ].map(({ title, items }) => items.length > 0 && (
        <section key={title} className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-foreground">
            {items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </section>
      ))}
    </ActivityLayout>
  );
};

export default MathActivityContent;
