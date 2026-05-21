import React from 'react';
import { CheckCircle2, BookOpen, Clock, Sparkles } from 'lucide-react';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { useSEO } from '@/hooks/useSEO';

const bullets = [
  'Day 1 — Pouring Water (Practical Life)',
  'Day 2 — Spooning & Sorting (Practical Life)',
  'Day 3 — The Pink Tower (Sensorial)',
  'Day 4 — Sandpaper Letters (Language)',
  'Day 5 — Number Rods (Math)',
];

const FreePdfPage: React.FC = () => {
  useSEO({
    title: 'Free Montessori Week 1 Starter Path PDF',
    description:
      'Download 5 AMI-aligned Montessori activities — one for each day of your child\'s first week. Free PDF, instantly to your inbox.',
    canonical: 'https://montessorilifeskillsapp.com/free-pdf',
  });

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="container relative mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Free download · 6-page PDF
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              The Week 1 Starter Path
            </h1>
            <p className="text-lg text-muted-foreground max-w-prose">
              Five carefully sequenced AMI Montessori activities — one for each day of your
              child's first week. Materials, presentation steps, and a quiet observation
              prompt. Delivered straight to your inbox.
            </p>

            <ul className="space-y-2 pt-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 max-w-md">
              <LeadMagnetForm />
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
              <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 10–20 min per day</span>
              <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Ages 3–6</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> AMI-aligned</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/30 rounded-[2rem] blur-2xl" />
            <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-background to-muted border border-border/60 shadow-2xl flex flex-col items-center justify-center p-10 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold mb-3">PDF · 6 pages</p>
              <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3">
                Week 1<br />Starter Path
              </p>
              <p className="text-xs text-muted-foreground italic max-w-[20ch] mx-auto">
                Pouring · Spooning · Pink Tower · Sandpaper Letters · Number Rods
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FreePdfPage;
