import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Hand, Brain, Leaf, Sparkles, BookOpen, Users } from 'lucide-react';
import heroImage from '@/assets/landing-hero.jpg';
import LeadMagnetForm from '@/components/LeadMagnetForm';

const features = [
  { icon: Hand, title: 'Hands-On Learning', desc: 'Authentic Montessori materials guide each activity, from the Pink Tower to the Golden Beads.' },
  { icon: Brain, title: 'AMI Curriculum', desc: 'Eight prepared areas — Practical Life, Sensorial, Language, Math, Geography, Botany, Art, and Grace & Courtesy.' },
  { icon: Leaf, title: 'Calm by Design', desc: 'A focused, distraction-free interface that respects the child and the prepared environment.' },
  { icon: Sparkles, title: 'Photoreal Materials', desc: 'Every lesson uses true-to-life imagery of authentic Montessori apparatus.' },
  { icon: BookOpen, title: 'Five-Phase Lessons', desc: 'Presentation, exploration, language, repetition, and extension — exactly as Maria Montessori designed.' },
  { icon: Users, title: 'Family Dashboard', desc: 'Built for parents, teachers, and assistants to guide the child together.' },
];

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="container relative mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/40 px-3 py-1 text-xs font-medium text-accent-foreground">
              <Sparkles className="w-3.5 h-3.5" />
              AMI-aligned Montessori at home
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              Follow the child.<br />
              <span className="text-primary">Prepare the environment.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-prose">
              A quiet, beautifully crafted Montessori companion for families and educators —
              authentic materials, precise presentations, and the freedom to let the child lead.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/">Begin the Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/about">Our Approach</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/30 rounded-[2rem] blur-2xl" />
            <img
              src={heroImage}
              alt="Child working with the Pink Tower and Brown Stair Montessori materials"
              width={1536}
              height={1024}
              className="relative rounded-[1.75rem] shadow-2xl object-cover w-full aspect-[3/2]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary font-medium mb-3">What's inside</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            A complete prepared environment, on every screen.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-border/60 bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Lead magnet */}
      <section className="container mx-auto px-6 pb-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 md:p-12 grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider">
              Free download
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              The Week 1 Starter Path
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Five carefully sequenced AMI activities — one for each day of your child's first week.
              Materials, presentation steps, and a quiet observation prompt. Delivered straight to your inbox.
            </p>
            <LeadMagnetForm />
          </div>
          <div className="md:col-span-2 relative">
            <div className="absolute -inset-3 bg-gradient-to-tr from-primary/15 to-accent/20 rounded-2xl blur-xl" />
            <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-background to-muted border border-border/60 shadow-xl flex flex-col items-center justify-center p-8 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold mb-3">PDF · 6 pages</p>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-3">
                Week 1<br/>Starter Path
              </p>
              <p className="text-xs text-muted-foreground italic">
                Pouring · Spooning · Pink Tower · Sandpaper Letters · Number Rods
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-24">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-10 md:p-16 text-primary-foreground text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--background)/0.25),transparent_60%)]" />
          <div className="relative max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Bring the Montessori method home today.
            </h2>
            <p className="text-base md:text-lg opacity-90">
              Start with a free activity from each curriculum area. No setup, no clutter — just the child and the work.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8 mt-2">
              <Link to="/">Explore Free Activities</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
