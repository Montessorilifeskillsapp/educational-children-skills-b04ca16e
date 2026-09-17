import React from 'react';
import type { MontessoriLearningProcess } from '@/types/montessoriSkill';

export function ActivityNoteList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return <section className="mb-6"><h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2><ul className="mt-3 list-disc pl-5 space-y-2 text-foreground">{items.map((item, index) => <li key={index}>{item}</li>)}</ul></section>;
}

/** Supplementary curriculum stays available without repeating the presentation steps. */
export default function ActivityTeachingNotes({ process }: { process?: MontessoriLearningProcess }) {
  if (!process) return null;
  return <div className="space-y-6 mb-8">
    {[
      { phase: process.presentation, lists: [{ title: 'Key teaching points', items: process.presentation?.keyPoints }] },
      { phase: process.guidedPractice, lists: [{ title: 'Support strategies', items: process.guidedPractice?.supportStrategies }] },
      { phase: process.independentPractice, lists: [{ title: 'Troubleshooting', items: process.independentPractice?.troubleshooting }] },
      { phase: process.mastery, lists: [{ title: 'Assessment criteria', items: process.mastery?.assessmentCriteria }, { title: 'Mastery indicators', items: process.mastery?.indicators }] },
      { phase: process.extensions, lists: [{ title: 'Extension activities', items: process.extensions?.activities }, { title: 'Variations', items: process.extensions?.variations }] },
    ].map(({ phase, lists }, index) => phase && <section key={index}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{phase.title}</h2>
      <p className="mt-3 text-foreground">{phase.description}</p>
      {'duration' in phase && phase.duration && <p className="mt-2 text-sm text-muted-foreground">{phase.duration}</p>}
      {'invitation' in phase && phase.invitation && <p className="mt-3 text-foreground">{phase.invitation}</p>}
      <div className="mt-4">{lists.map(list => <ActivityNoteList key={list.title} {...list} />)}</div>
    </section>)}
  </div>;
}
