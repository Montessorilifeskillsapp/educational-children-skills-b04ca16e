import React from 'react';
import BackButton from '@/components/ui/back-button';

interface ActivityLayoutProps {
  sectionLabel: string;
  title: string;
  purpose?: string;
  image?: string | null;
  onBack: () => void;
  background: string;
  children: React.ReactNode;
}

/**
 * Shared shell for every activity page: back button on its own line, a full
 * width title that never clips, a small section label instead of a large
 * coloured banner, the photo, and one short purpose line.
 */
export const ActivityLayout: React.FC<ActivityLayoutProps> = ({
  sectionLabel,
  title,
  purpose,
  image,
  onBack,
  background,
  children,
}) => (
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
          <img
            src={image}
            alt={`Authentic Montessori materials for ${title}`}
            loading="lazy"
            width={800}
            height={450}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      {purpose && (
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">{purpose}</p>
      )}

      {children}
    </div>
  </div>
);

export default ActivityLayout;
