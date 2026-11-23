import React from 'react';
import BackButton from '@/components/ui/back-button';
import i18n from '@/i18n';
import { useLocalizedImage } from '@/lib/localizedMedia';

interface ActivityLayoutProps {
  sectionLabel: string;
  title: string;
  purpose?: string;
  /** AMI aims, already localized. */
  aims?: { direct: string[]; indirect: string[] };
  image?: string | null;
  onBack: () => void;
  background: string;
  children: React.ReactNode;
}

/**
 * Shared shell for every activity page: back button on its own line, a full
 * width title that never clips, a small section label instead of a large
 * colored banner, the photo, and one short purpose line.
 */
export const ActivityLayout: React.FC<ActivityLayoutProps> = ({
  sectionLabel,
  title,
  purpose,
  aims,
  image,
  onBack,
  background,
  children,
}) => {
  const shownImage = useLocalizedImage(image ?? undefined);
  return (
  <div className={`min-h-screen ${background} p-4 sm:p-6 pb-20`}>
    <div className="max-w-2xl mx-auto">
      <div className="mb-3">
        <BackButton onClick={onBack} />
      </div>

      <header className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {sectionLabel}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-foreground break-words">
          {title}
        </h1>
      </header>

      {image && (
        <div className="mb-5 rounded-xl overflow-hidden border border-border shadow-sm">
          <img decoding="async"
            src={shownImage}
            alt={i18n.t('lesson.page.imageAlt', { title })}
            loading="lazy"
            width={800}
            height={450}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      {purpose && (
        <p className="mb-4 text-base leading-relaxed text-muted-foreground">{purpose}</p>
      )}

      {aims && (aims.direct.length > 0 || aims.indirect.length > 0) && (
        <section className="mb-6 rounded-xl border border-border bg-card px-4 py-3" aria-label={i18n.t('lesson.page.aims')}>
          {([['direct', aims.direct], ['indirect', aims.indirect]] as const).map(([kind, items]) => items.length > 0 && (
            <div key={kind} className="py-2 first:pt-0 last:pb-0 [&+&]:border-t [&+&]:border-border">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
                {i18n.t(kind === 'direct' ? 'lesson.page.directAim' : 'lesson.page.indirectAim')}
              </h2>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground">
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {children}
    </div>
  </div>
);
};

export default ActivityLayout;
