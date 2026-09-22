import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ChevronLeft, Play, Sparkles } from 'lucide-react';
import { montessoriImages } from '@/assets/images';

const SCREENS = [
  {
    label: '1. Choose today\'s activity',
    render: () => (
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 pt-4 pb-2">
          <p className="text-[9px] uppercase tracking-wider font-semibold text-primary">Day 3 · Up next</p>
          <h3 className="text-base font-bold text-foreground leading-tight mt-0.5">Pouring Water</h3>
        </div>
        <div className="flex-1 mx-4 rounded-xl overflow-hidden bg-muted">
          <img src={montessoriImages['pouring-set']} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="px-4 py-3">
          <p className="text-[10px] text-muted-foreground leading-snug mb-2">
            Builds focus, coordination, and the confidence to work independently.
          </p>
          <div className="bg-primary text-primary-foreground rounded-full text-center text-[11px] font-semibold py-2">
            Start activity →
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '2. Review the written steps',
    render: () => (
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 pt-4 pb-2 flex items-center gap-1.5">
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          <p className="text-[10px] font-semibold text-foreground">Step 3 of 6</p>
          <div className="ml-auto flex gap-1">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 2 ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
        <div className="flex-1 mx-4 rounded-xl bg-muted p-4 text-left">
          <p className="text-[9px] uppercase font-semibold text-primary mb-2">Show the child</p>
          <ol className="space-y-2 text-[10px] text-muted-foreground leading-snug">
            <li><span className="font-semibold text-foreground">1.</span> Grasp the pitcher handle slowly.</li>
            <li><span className="font-semibold text-foreground">2.</span> Lift and position it above the empty pitcher.</li>
            <li><span className="font-semibold text-foreground">3.</span> Tilt gently until the water begins to flow.</li>
          </ol>
        </div>
        <div className="px-4 py-3">
          <p className="text-[11px] font-semibold text-foreground mb-1">Pour slowly and steadily</p>
          <p className="text-[10px] text-muted-foreground leading-snug">
            Read the complete presentation before inviting the child to the activity.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: '3. Celebrate the win',
    render: () => (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/15 via-background to-accent/15 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9 text-secondary" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">Activity complete!</h3>
        <p className="text-[11px] text-muted-foreground leading-snug mb-4">
          Mira just finished today's Practical Life activity.
        </p>
        <div className="bg-card border border-accent/30 rounded-xl p-3 w-full">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
            <p className="text-[11px] font-semibold text-foreground">First Step badge earned</p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-4">
          Tomorrow: Hand Washing →
        </p>
      </div>
    ),
  },
];

const HeroAppPreview: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % SCREENS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-16 lg:py-24 hidden lg:block">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              <Play className="w-3 h-3 fill-accent text-accent" />
              See it in 30 seconds
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
              From overwhelmed to confident, in three taps.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Choose an activity, review its materials and written presentation steps, then prepare to guide the child. Instructional videos are available where provided.
            </p>
            <ul className="space-y-3">
              {SCREENS.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 ${
                      i === active
                        ? 'bg-primary text-primary-foreground scale-110'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <p
                    className={`text-base transition-colors ${
                      i === active ? 'text-foreground font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    {s.label.replace(/^\d+\.\s*/, '')}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Phone mockup */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/25 to-accent/25 rounded-[3rem] blur-3xl" />
              <div className="relative w-[260px] sm:w-[280px] aspect-[9/19] bg-foreground rounded-[2.5rem] p-2.5 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground rounded-b-2xl z-10" />
                <div className="relative w-full h-full bg-background rounded-[2rem] overflow-hidden">
                  {SCREENS.map((s, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? 'auto' : 'none' }}
                      aria-hidden={i !== active}
                    >
                      {s.render()}
                    </div>
                  ))}
                </div>
              </div>
              {/* Progress dots under phone */}
              <div className="flex justify-center gap-2 mt-5">
                {SCREENS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show screen ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAppPreview;
