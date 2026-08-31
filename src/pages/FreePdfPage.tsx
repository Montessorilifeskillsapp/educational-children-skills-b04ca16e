import React from 'react';
import { CheckCircle2, BookOpen, Sparkles, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { useSEO } from '@/hooks/useSEO';

const bullets = [
  'The Prepared Environment — order, beauty, reality, freedom within limits',
  'The five AMI curriculum areas and the order in which they are introduced',
  'How to arrange materials: one of each, complete on a tray, simple to complex',
  'The role of the adult — present, withdraw, observe',
  'A room-by-room setup checklist to walk before the first child enters',
];

const FreePdfPage: React.FC = () => {
  useSEO({
    title: 'Free Montessori Classroom Setup Guide',
    description:
      'Download the AMI-exact guide to setting up an authentic Montessori classroom — the prepared environment, curriculum areas, and material arrangement. Free PDF.',
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
              Free download · PDF guide
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              The Montessori Classroom Setup Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-prose">
              In Montessori, the environment is the teacher. This AMI-exact guide walks you
              through preparing an authentic classroom — before a single lesson is given.
              Delivered straight to your inbox.
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
              <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Ages 3–6 classroom</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> AMI-aligned</span>
              <Link to="/classroom-setup" className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-foreground">
                <LayoutGrid className="w-3.5 h-3.5" /> Read the full guide online
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/30 rounded-[2rem] blur-2xl" />
            <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-background to-muted border border-border/60 shadow-2xl flex flex-col items-center justify-center p-10 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold mb-3">PDF · Printable guide</p>
              <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3">
                The Prepared<br />Environment
              </p>
              <p className="text-xs text-muted-foreground italic max-w-[24ch] mx-auto">
                Setting up your Montessori classroom — the AMI guide
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FreePdfPage;
