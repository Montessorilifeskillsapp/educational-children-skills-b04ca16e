import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronLeft, Eye, ListChecks, Play, Sparkles } from 'lucide-react';
import { montessoriImages } from '@/assets/images';

const SCREENS = [
  {
    label: 'Choose an activity',
    render: () => (
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 pt-4 pb-2">
          <p className="text-[9px] uppercase tracking-wider font-semibold text-primary">Practical Life · Beginner</p>
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
            Open activity →
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Check the materials',
    render: () => (
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 pt-4 pb-2 flex items-center gap-1.5">
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          <p className="text-[10px] font-semibold text-foreground">What you'll need</p>
        </div>
        <div className="flex-1 mx-4 rounded-xl bg-muted p-4 text-left">
          <ListChecks className="w-6 h-6 text-primary mb-3" />
          <ul className="space-y-2 text-[10px] text-muted-foreground leading-snug">
            <li>Two identical small pitchers</li>
            <li>Water and a small sponge</li>
            <li>A child-sized tray</li>
            <li>A drying cloth</li>
          </ul>
        </div>
        <div className="px-4 py-3">
          <p className="text-[11px] font-semibold text-foreground mb-1">Prepare everything first</p>
          <p className="text-[10px] text-muted-foreground leading-snug">
            The child meets a complete, orderly activity.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: 'Review the preparation',
    render: () => (
      <div className="h-full flex flex-col bg-background px-4 py-5 text-left">
        <p className="text-[9px] uppercase font-semibold text-primary mb-2">Before inviting the child</p>
        <h3 className="text-base font-bold text-foreground mb-4">Prepare the tray</h3>
        <div className="space-y-3">
          {['Place the filled pitcher on the left', 'Set the empty pitcher on the right', 'Keep the sponge within easy reach'].map((item, index) => (
            <div key={item} className="flex gap-3 rounded-lg border border-border bg-card p-3">
              <span className="text-[10px] font-bold text-primary">{index + 1}</span>
              <span className="text-[10px] text-muted-foreground leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Follow the presentation',
    render: () => (
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 pt-4 pb-2 flex items-center gap-1.5">
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          <p className="text-[10px] font-semibold text-foreground">Presentation · Step 3 of 6</p>
        </div>
        <div className="flex-1 mx-4 rounded-xl bg-muted p-4 text-left">
          <p className="text-[9px] uppercase font-semibold text-primary mb-2">Show the child</p>
          <ol className="space-y-2 text-[10px] text-muted-foreground leading-snug">
            <li><span className="font-semibold text-foreground">1.</span> Grasp the pitcher handle slowly.</li>
            <li><span className="font-semibold text-foreground">2.</span> Lift it above the empty pitcher.</li>
            <li><span className="font-semibold text-foreground">3.</span> Tilt until the water flows steadily.</li>
          </ol>
        </div>
        <div className="px-4 py-3 text-[10px] text-muted-foreground">Review the full sequence before presenting.</div>
      </div>
    ),
  },
  {
    label: 'Record an observation',
    render: () => (
      <div className="h-full flex flex-col bg-background px-4 py-5 text-left">
        <Eye className="w-7 h-7 text-primary mb-3" />
        <p className="text-[9px] uppercase font-semibold text-primary mb-2">Observe</p>
        <h3 className="text-base font-bold text-foreground mb-4">What did you notice?</h3>
        <div className="space-y-2">
          {['Controls the flow of water', 'Returns the pitcher carefully', 'Notices and cleans spills'].map(item => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-[10px] text-muted-foreground">
              <span className="w-3.5 h-3.5 rounded border border-primary/50" /> {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'See what comes next',
    render: () => (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/15 via-background to-accent/15 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9 text-secondary" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">Ready for what comes next</h3>
        <p className="text-[11px] text-muted-foreground leading-snug mb-4">
          Record the presentation and return when the child is ready.
        </p>
        <div className="bg-card border border-accent/30 rounded-xl p-3 w-full">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
            <p className="text-[11px] font-semibold text-foreground">Next: Pouring between varied vessels</p>
          </div>
        </div>
      </div>
    ),
  },
];

const HeroAppPreview: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive(prev => (prev + 1) % SCREENS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="product-tour" className="py-16 lg:py-24 bg-background border-t border-border/60 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              <Play className="w-3 h-3 fill-accent text-accent" />
               See the product
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
               Understand the complete activity flow.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
               Choose an activity, prepare the materials, review the presentation, record what you observe, and see what comes next.
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
                     {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

           {/* Product walkthrough */}
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
                     className="absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none"
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
                     className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                      i === active ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/30'
                    }`}
                  />
                ))}
           </div>
            </div>
        <div className="mt-12 text-center">
          <p className="text-xl font-semibold text-foreground mb-5">See it. Present it. Observe. Move forward when the child is ready.</p>
          <Button size="lg" onClick={() => window.location.assign('/auth')} className="rounded-2xl px-8">Try Your First Activity Free</Button>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAppPreview;
