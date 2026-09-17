import React from 'react';
import { Button } from '@/components/ui/button';
import ActivityLayout from './ActivityLayout';
import ActivitySteps, { type ActivityStep } from './ActivityStepGroup';
import GetTheMaterials from '@/components/GetTheMaterials';
import ActivityVideo from '@/components/ActivityVideo';
import { montessoriTheme } from '@/components/ThemeConfig';

interface ActivityPageProps {
  skillId: string;
  title: string;
  sectionLabel: string;
  purpose?: string;
  image?: string;
  materials?: string[];
  steps: ActivityStep[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onComplete: () => void;
  notes?: React.ReactNode;
}

/** One complete presentation template, shared with Practical Life. */
export default function ActivityPage({ skillId, title, sectionLabel, purpose, image, materials, steps, onToggle, onBack, onComplete, notes }: ActivityPageProps) {
  const complete = steps.length > 0 && steps.every(step => step.completed);
  return (
    <ActivityLayout sectionLabel={sectionLabel} title={title} purpose={purpose} image={image} onBack={onBack} background={montessoriTheme.backgrounds.practical}>
      <GetTheMaterials skillId={skillId} skillMaterials={materials} />
      <ActivityVideo skillId={skillId} activityTitle={title} />
      <ActivitySteps steps={steps} onToggle={onToggle} />
      {notes && <details className="mb-8 border-t border-border pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">Teaching notes</summary>
        <div className="mt-5">{notes}</div>
      </details>}
      {complete && <section className="my-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">Excellent Work!</h2>
        <p className="mt-2 mb-4 text-muted-foreground">You have mastered {title.toLowerCase()}!</p>
        <Button onClick={onComplete}>Mark as Complete</Button>
      </section>}
    </ActivityLayout>
  );
}