import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, CheckCircle2, Sparkles, Home, BookOpen, Footprints,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useTranslation } from 'react-i18next';
import spooningImg from '@/assets/materials/spooning.jpg';
import cleaningTools from '@/assets/materials/cleaning-tools.jpg';

const HomeSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const k = (key: string) => t(`pages.homeSetup.${key}`);
  const steps = t('pages.homeSetup.steps', { returnObjects: true }) as { title: string; body: string }[];
  const checklist = t('pages.homeSetup.checklist', { returnObjects: true }) as string[];
  const practicalLifeSteps = t('pages.homeSetup.plList', { returnObjects: true }) as string[];

  useSEO({
    title: k('seoTitle'),
    description: k('seoDescription'),
    canonical: 'https://montessorilifeskillsapp.com/home-setup',
  });

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="container relative mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
          <div className="absolute left-4 top-4 md:left-6 md:top-6">
            <BackButton onClick={() => navigate('/')} label={k('back')} />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            {k('eyebrow')}
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {k('title')}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {k('intro')}
          </p>
        </div>
      </section>

      {/* Core principle */}
      <section className="container mx-auto px-6 pb-12 max-w-4xl">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <CardContent className="p-6 md:p-8 text-center">
            <Sparkles className="w-6 h-6 text-secondary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{k('goalTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {k('goalBody')}
              <span className="block mt-2 text-foreground font-medium">{k('goalQuote')}</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="flex items-center gap-3 mb-3">
          <Footprints className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-semibold tracking-tight">{k('stepsTitle')}</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          {k('stepsIntro')}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <Card key={step.title} className="border-border/60 h-full">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  {t('pages.homeSetup.stepLabel', { n: i + 1 })}
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
              <h2 className="text-3xl font-semibold tracking-tight">{k('plTitle')}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {k('plBody')}
            </p>
            <ul className="space-y-4">
              {practicalLifeSteps.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/practical-life">
                <Button size="lg" className="rounded-full px-6">
                  {k('plCta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted">
            <img decoding="async"
              src={spooningImg}
              alt={k('spoonAlt')}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              {k('spoonCaption')}
            </p>
          </div>
        </div>
      </section>

      {/* Home checklist */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted order-2 lg:order-1">
            <img decoding="async"
              src={cleaningTools}
              alt={k('toolsAlt')}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              {k('toolsCaption')}
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold tracking-tight">{k('checklistTitle')}</h2>
            </div>
            <ul className="space-y-4">
              {checklist.map((c) => (
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
            <h2 className="text-2xl font-semibold mb-2">{k('ctaTitle')}</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              {k('ctaBody')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/practical-life">
                <Button size="lg" className="rounded-full px-6">
                  {k('ctaStart')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/classroom-setup">
                <Button size="lg" variant="outline" className="rounded-full px-6">
                  {k('ctaClassroom')}
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
