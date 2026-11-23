import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

/**
 * Where each beginner guide's "learn more" link leads, in question order
 * (matches home.problem.q1–q7 and home.problem.guide.g1–g7).
 */
export const STARTING_POINT_LINKS = [
  '/practical-life',         // Which activity comes next?
  '/readiness-guide',        // Is the child ready?
  '/home-setup',             // What materials are needed?
  '/preview/pouring-water',  // How is it presented correctly?
  '/preview/pouring-water',  // What should you say — or not say?
  '/preview/pouring-water',  // What do you observe?
  '/practical-life',         // When should you move on?
] as const;

const POINTS = ['p1', 'p2', 'p3', 'p4'] as const;

interface StartingPointGuideProps {
  /** Zero-based question index, or null when closed. */
  step: number | null;
  onStepChange: (step: number | null) => void;
}

/** Focused beginner-parent guide that answers one "A clearer starting point" question at a time. */
const StartingPointGuide: React.FC<StartingPointGuideProps> = ({ step, onStepChange }) => {
  const { t } = useTranslation();
  const total = STARTING_POINT_LINKS.length;
  const open = step !== null;
  const i = step ?? 0;
  const g = (key: string) => t(`home.problem.guide.g${i + 1}.${key}`);
  const isLast = i === total - 1;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onStepChange(null); }}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        <div className="p-6 sm:p-8">
          <DialogHeader className="text-left space-y-2 pr-6">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t('home.problem.guide.stepOf', { n: i + 1, total })}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{t(`home.problem.q${i + 1}`)}</p>
            <DialogTitle className="text-2xl sm:text-3xl font-bold leading-tight text-foreground">{g('title')}</DialogTitle>
            <DialogDescription className="text-base text-foreground leading-relaxed">{g('intro')}</DialogDescription>
          </DialogHeader>

          <ul className="mt-6 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-foreground leading-relaxed">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{g(p)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-foreground">
              <span className="font-semibold">{t('home.problem.guide.tipLabel')}: </span>{g('tip')}
            </p>
          </div>

          <Link
            to={STARTING_POINT_LINKS[i]}
            onClick={() => onStepChange(null)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {g('cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-border bg-muted/60 backdrop-blur px-6 py-4 sm:px-8">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onStepChange(i - 1)}
            disabled={i === 0}
            className="gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('home.problem.guide.previous')}
          </Button>
          <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
            {STARTING_POINT_LINKS.map((_, n) => (
              <span key={n} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-5 bg-primary' : 'w-1.5 bg-primary/25'}`} />
            ))}
          </div>
          <Button
            type="button"
            onClick={() => onStepChange(isLast ? null : i + 1)}
            className="gap-1.5"
          >
            {isLast ? t('home.problem.guide.done') : t('home.problem.guide.next')}
            {!isLast && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartingPointGuide;
