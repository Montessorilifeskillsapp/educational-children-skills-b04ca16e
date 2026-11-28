import React from 'react';
import { Button } from '@/components/ui/button';
import ActivityLayout from './ActivityLayout';
import ActivitySteps, { type ActivityStep } from './ActivityStepGroup';
import GetTheMaterials from '@/components/GetTheMaterials';
import ActivityVideo from '@/components/ActivityVideo';
import { montessoriTheme } from '@/components/ThemeConfig';
import { useTranslation } from 'react-i18next';
import { lessonText, useLessonLanguage } from '@/i18n/lessonText';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { canOpenActivity } from '@/lib/activityEntitlement';
import UpgradeDialog from '@/components/upgrade/UpgradeDialog';

/** Section label in the chosen language (labels are passed in English). */
export function sectionLabelText(t: (k: string) => string, label: string, exists: (k: string) => boolean) {
  return exists(`lesson.section.${label}`) ? t(`lesson.section.${label}`) : lessonText(label);
}

interface ActivityPageProps {
  skillId: string;
  title: string;
  sectionLabel: string;
  purpose?: string;
  aims?: { direct: string[]; indirect: string[] };
  image?: string;
  materials?: string[];
  steps: ActivityStep[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onComplete: () => void;
  notes?: React.ReactNode;
  /** The words that invite the child to the work; shown first, above the steps. */
  invitation?: string;
}

/** One complete presentation template, shared with Practical Life. */
export default function ActivityPage({ skillId, title, sectionLabel, purpose, aims, image, materials, steps, onToggle, onBack, onComplete, notes, invitation }: ActivityPageProps) {
  const { t, i18n } = useTranslation();
  useLessonLanguage();
  const { isPremium, loading } = useSubscription();
  if (!canOpenActivity(skillId, isPremium)) {
    return <div className="min-h-dvh bg-background p-6">
      <Button variant="outline" onClick={onBack}>{t('lesson.page.backToActivities')}</Button>
      {!loading && <UpgradeDialog open onOpenChange={(open) => { if (!open) onBack(); }} source="locked-card"
        title={t('pricing.upgrade.lockedTitle', { title: lessonText(title) })}
        description={t('pricing.upgrade.lockedBody')} />}
    </div>;
  }
  const shownTitle = lessonText(title);
  const complete = steps.length > 0 && steps.every(step => step.completed);
  return (
    <ActivityLayout sectionLabel={sectionLabelText(t, sectionLabel, (k) => i18n.exists(k))} title={shownTitle} purpose={purpose ? lessonText(purpose) : purpose} aims={aims && { direct: aims.direct.map((s) => lessonText(s)), indirect: aims.indirect.map((s) => lessonText(s)) }} image={image} onBack={onBack} background={montessoriTheme.backgrounds.practical}>
      <GetTheMaterials skillId={skillId} skillMaterials={materials} />
      <ActivityVideo skillId={skillId} activityTitle={shownTitle} />
      {invitation && <section className="mb-6 rounded-xl border-l-4 border-primary bg-primary/10 px-4 py-3" aria-label={t('lesson.page.invite')}>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('lesson.page.invite')}</h2>
        <p className="mt-1 text-lg font-medium text-foreground">{lessonText(invitation)}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('lesson.page.inviteGuide')}</p>
      </section>}
      <ActivitySteps steps={steps} onToggle={onToggle} />
      <details className="mb-8 border-t border-border pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">{t('lesson.page.extensions')}</summary>
        <div className="mt-5">{notes || <p className="text-muted-foreground">{t('lesson.page.noExtensions')}</p>}</div>
      </details>
      {complete && <section className="my-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">{t('lesson.page.excellent')}</h2>
        <p className="mt-2 mb-4 text-muted-foreground">{t('lesson.page.mastered', { title: i18n.resolvedLanguage === 'en' ? shownTitle.toLowerCase() : shownTitle })}</p>
        <Button onClick={onComplete}>{t('lesson.page.markComplete')}</Button>
      </section>}
    </ActivityLayout>
  );
}