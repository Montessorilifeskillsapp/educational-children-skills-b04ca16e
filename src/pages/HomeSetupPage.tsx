import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, CheckCircle2, Sparkles, Home, BookOpen, Footprints,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import spooningImg from '@/assets/materials/spooning.jpg';
import cleaningTools from '@/assets/materials/cleaning-tools.jpg';

const STEPS = [
  {
    title: 'Choose a quiet space',
    body: 'Select a peaceful, well-lit corner with as few distractions as possible. The environment should invite concentration, not entertainment.',
  },
  {
    title: 'Use child-sized furniture',
    body: 'Provide a small table and chair where your child can sit comfortably with both feet supported. The body must be stable before the hand can do precise work.',
  },
  {
    title: 'Add one low shelf',
    body: 'Choose an open shelf your child can reach. Place only a few activities on it so the space feels inviting rather than overwhelming.',
  },
  {
    title: 'Give everything a place',
    body: 'Keep each activity together in a tray or basket. Show your child where it belongs and how to return it when finished. Order in the environment builds order in the mind.',
  },
  {
    title: 'Offer real-life activities',
    body: 'Begin with the Practical Life activities on the app. Use real, child-sized tools whenever it is safe. The child learns through real, purposeful work.',
  },
  {
    title: 'Arrange activities from easiest to hardest',
    body: 'Start with simple tasks and introduce more challenging ones as your child becomes confident. Keep the shelf neat and avoid putting out too many choices.',
  },
  {
    title: 'Create a place for floor work',
    body: 'Provide a small mat that your child can unroll when working on the floor. The mat helps define and protect their workspace.',
  },
  {
    title: 'Make independence easier',
    body: 'Place safe everyday items within reach. A low hook for a coat, a small water pitcher, accessible tissues and child-sized cleaning tools allow your child to do more without constant adult help.',
  },
  {
    title: 'Show slowly and clearly',
    body: 'Demonstrate each activity using careful, simple movements. Use very few words so your child can concentrate on watching.',
  },
  {
    title: 'Allow time for repetition',
    body: 'Children learn by doing the same activity many times. Try not to interrupt, correct unnecessarily or rush to help.',
  },
  {
    title: 'Encourage cleaning up',
    body: 'Show your child how to complete the entire activity — from choosing it to returning everything neatly to its place.',
  },
  {
    title: 'Follow your child’s interests',
    body: 'Observe what attracts your child and which skills they are ready to practise. Change activities gradually rather than replacing everything at once.',
  },
  {
    title: 'Keep the atmosphere calm',
    body: 'Montessori is not about creating a perfect-looking room. It is about preparing a simple environment where your child can think, move, choose and participate independently.',
  },
];

const CHECKLIST = [
  'A quiet, well-lit corner free from screens and noisy toys',
  'A child-sized table and chair with foot support',
  'One low, open shelf the child can reach independently',
  'A small work mat for floor activities',
  'A few complete activities on trays or in baskets',
  'Real, child-sized tools: pitcher, cloth, dustpan, broom',
  'Everyday items placed within the child’s reach',
  'Activities arranged left to right, simple to complex',
  'A clear place for each item and a routine for returning it',
  'Space for the child to move, choose, and work without interruption',
];

const HomeSetupPage: React.FC = () => {
  useSEO({
    title: 'How to Set Up a Montessori Learning Space at Home',
    description:
      'Set up a calm, organised Montessori learning space at home without a large classroom or expensive materials. Practical Life–first guide for parents and caregivers.',
    canonical: 'https://montessorilifeskillsapp.com/home-setup',
  });

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="container relative mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            Montessori at Home
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            How to Set Up a Montessori Learning Space at Home
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            You do not need a large classroom or expensive materials to bring Montessori into your home.
            Begin with one small, calm, organised area where your child can work independently.
          </p>
        </div>
      </section>

      {/* Core principle */}
      <section className="container mx-auto px-6 pb-12 max-w-4xl">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <CardContent className="p-6 md:p-8 text-center">
            <Sparkles className="w-6 h-6 text-secondary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">The Goal</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              The goal is not to entertain your child constantly. It is to help them feel:
              <span className="block mt-2 text-foreground font-medium">“I can do this for myself.”</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="flex items-center gap-3 mb-3">
          <Footprints className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-semibold tracking-tight">Setting Up the Space</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          Walk through these steps in order. Each one builds on the last, helping you create a space
          that supports independence, concentration, and meaningful work.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <Card key={step.title} className="border-border/60 h-full">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Step {i + 1}
                </p>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Practical Life first */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold tracking-tight">Begin with Practical Life</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In the AMI approach, the child’s first activities are always Practical Life. Pouring,
              spooning, carrying a tray, sweeping, and caring for plants give the child real, purposeful
              work that builds concentration, coordination, independence, and order.
            </p>
            <ul className="space-y-4">
              {[
                'Start with dry transfer activities such as spooning or pouring beans.',
                'Move to wet transfer once the child can manage a small pitcher without spilling.',
                'Add care-of-self activities like hand washing and dressing frames.',
                'Introduce care-of-environment work: dusting, sweeping, and watering plants.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/practical-life">
                <Button size="lg" className="rounded-full px-6">
                  Explore Practical Life activities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted">
            <img
              src={spooningImg}
              alt="A complete Montessori spooning activity ready for home use"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              A simple spooning tray is an ideal first Practical Life activity at home.
            </p>
          </div>
        </div>
      </section>

      {/* Home checklist */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted order-2 lg:order-1">
            <img
              src={cleaningTools}
              alt="Child-sized cleaning tools arranged for independent access"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              Real, child-sized tools placed within reach let the child participate in daily life.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold tracking-tight">The Home Setup Checklist</h2>
            </div>
            <ul className="space-y-4">
              {CHECKLIST.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-24 max-w-4xl">
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Ready to begin?</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              Start with the first Practical Life activities and build your home environment one step at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/practical-life">
                <Button size="lg" className="rounded-full px-6">
                  Start Practical Life
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/classroom-setup">
                <Button size="lg" variant="outline" className="rounded-full px-6">
                  View classroom setup guide
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default HomeSetupPage;
