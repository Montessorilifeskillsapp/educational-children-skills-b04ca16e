import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, LayoutGrid } from 'lucide-react';
import curriculumScreen from '@/assets/app-screens/curriculum-screen.jpg.asset.json';
import activityScreen from '@/assets/app-screens/activity-screen.jpg.asset.json';

const REAL_SCREENS = [
  {
    id: 'curriculum',
    label: 'Curriculum view',
    icon: LayoutGrid,
    image: curriculumScreen.url,
    alt: 'The real Montessori Life Skills Practical Life curriculum screen showing sequenced activity cards',
    heading: 'Browse the sequenced curriculum',
    description: 'Choose an activity from the real Practical Life curriculum, ordered from beginning work onward.',
  },
  {
    id: 'activity',
    label: 'Activity view',
    icon: BookOpen,
    image: activityScreen.url,
    alt: 'The real Montessori Life Skills Carrying a Tray activity screen showing its photograph, materials, and written presentation steps',
    heading: 'Open the complete activity guide',
    description: 'Review the activity photograph, purpose, materials, and written presentation steps before working with the child.',
  },
] as const;

interface HeroAppPreviewProps {
  onGetStarted: () => void;
}

const HeroAppPreview: React.FC<HeroAppPreviewProps> = ({ onGetStarted }) => {
  const [activeId, setActiveId] = useState<(typeof REAL_SCREENS)[number]['id']>('curriculum');
  const activeScreen = REAL_SCREENS.find((screen) => screen.id === activeId) ?? REAL_SCREENS[0];

  return (
    <section id="product-tour" className="py-16 lg:py-24 bg-background border-t border-border/60 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">The actual app</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
            See the curriculum and activity guide as they appear.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These are real screens from Montessori Life Skills—not a mock-up or simulated product.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6" role="tablist" aria-label="Real app screens">
          {REAL_SCREENS.map((screen) => {
            const Icon = screen.icon;
            const selected = screen.id === activeId;
            return (
              <Button
                key={screen.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="real-app-screen"
                variant={selected ? 'default' : 'outline'}
                onClick={() => setActiveId(screen.id)}
                className="rounded-xl"
              >
                <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                {screen.label}
              </Button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_0.72fr] gap-8 lg:gap-12 items-center">
          <div id="real-app-screen" role="tabpanel" className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <img
              key={activeScreen.id}
              src={activeScreen.image}
              alt={activeScreen.alt}
              width={activeScreen.id === 'curriculum' ? 790 : 740}
              height={activeScreen.id === 'curriculum' ? 1030 : 1500}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {activeScreen.label}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{activeScreen.heading}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-7">{activeScreen.description}</p>
            <Button size="lg" onClick={onGetStarted} className="rounded-xl px-7">
              Try Your First Activity Free <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAppPreview;