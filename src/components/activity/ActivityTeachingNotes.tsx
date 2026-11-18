import React from 'react';
import type { MontessoriLearningProcess } from '@/types/montessoriSkill';
import i18n from '@/i18n';
import { lessonText as tl, useLessonLanguage } from '@/i18n/lessonText';

export function ActivityNoteList({ title, items }: { title: string; items?: string[] }) {
  useLessonLanguage();
  if (!items?.length) return null;
  return <section className="mb-6"><h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2><ul className="mt-3 list-disc pl-5 space-y-2 text-foreground">{items.map((item, index) => <li key={index}>{tl(item)}</li>)}</ul></section>;
}

/** Supplementary curriculum stays available without repeating the presentation steps. */
export default function ActivityTeachingNotes({ process }: { process?: MontessoriLearningProcess }) {
  useLessonLanguage();
  const t = (k: string) => i18n.t(`lesson.notes.${k}`);
  if (!process) return null;
  return <div className="space-y-6 mb-8">
    {[
      { phase: process.presentation, lists: [{ title: t('keyPoints'), items: process.presentation?.keyPoints }] },
      { phase: process.guidedPractice, lists: [{ title: t('support'), items: process.guidedPractice?.supportStrategies }] },
      { phase: process.independentPractice, lists: [{ title: t('troubleshooting'), items: process.independentPractice?.troubleshooting }] },
      { phase: process.mastery, lists: [{ title: t('assessment'), items: process.mastery?.assessmentCriteria }, { title: t('mastery'), items: process.mastery?.indicators }] },
      { phase: process.extensions, lists: [{ title: t('extensionActivities'), items: process.extensions?.activities }, { title: t('variations'), items: process.extensions?.variations }] },
    ].map(({ phase, lists }, index) => phase && <section key={index}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{tl(phase.title)}</h2>
      <p className="mt-3 text-foreground">{tl(phase.description)}</p>
      {'duration' in phase && phase.duration && <p className="mt-2 text-sm text-muted-foreground">{tl(phase.duration)}</p>}
      <div className="mt-4">{lists.map(list => <ActivityNoteList key={list.title} {...list} />)}</div>
    </section>)}
  </div>;
}
