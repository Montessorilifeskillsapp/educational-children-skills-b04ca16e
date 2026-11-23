import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import ClassroomMaterials from '@/components/ClassroomMaterials';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, CheckCircle2, Sparkles, Eye, Hand, BookOpen,
  Globe2, Ruler, Leaf, Armchair, LayoutGrid, User,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { Trans, useTranslation } from 'react-i18next';
import { montessoriImages } from '@/assets/images';
import cleaningTools from '@/assets/materials/cleaning-tools.jpg';
import spooningImg from '@/assets/materials/spooning.jpg';
import walkingLine from '@/assets/materials/walking-line.jpg';
import sandpaperGlobe from '@/assets/geography/sandpaper-globe.jpg';

/** Icons and photos for the five areas, in the order of `pages.classroomSetup.areas`. */
const AREA_VISUALS = [
  { icon: Hand, image: cleaningTools },
  { icon: Eye, image: montessoriImages['color-tablets-box1'] },
  { icon: BookOpen, image: montessoriImages['sandpaper-letters'] },
  { icon: Ruler, image: montessoriImages['golden-beads-set'] },
  { icon: Globe2, image: sandpaperGlobe },
];

type Area = { name: string; position: string; groups: string[]; note: string };

const ClassroomSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const k = (key: string, opts?: Record<string, unknown>) => t(`pages.classroomSetup.${key}`, opts) as string;
  const list = <T,>(key: string) => {
    const v = t(`pages.classroomSetup.${key}`, { returnObjects: true });
    return (Array.isArray(v) ? v : []) as T[];
  };
  const principles = list<{ title: string; body: string }>('principles');
  const areas = list<Area>('areas');
  const shelfRules = list<string>('shelfRules');
  const adultRules = list<string>('adultRules');
  const checklist = list<string>('checklist');

  useSEO({
    title: k('seoTitle'),
    description: k('seoDescription'),
    canonical: 'https://montessorilifeskillsapp.com/classroom-setup',
  });

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="container relative mx-auto px-6 py-16 md:py-24 max-w-5xl text-center">
          <div className="absolute left-4 top-4 md:left-6 md:top-6">
            <BackButton onClick={() => navigate('/')} label={k('back')} />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {k('badge')}
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            {k('title')}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {k('intro')}
          </p>
        </div>
      </section>


      {/* Principles */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Armchair className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-semibold tracking-tight">{k('envTitle')}</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mb-8 leading-relaxed">
          <Trans i18nKey="pages.classroomSetup.envIntro" components={{ em: <em /> }} />
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((p) => (
            <Card key={p.title} className="border-border/60">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="flex items-center gap-3 mb-3">
          <LayoutGrid className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-semibold tracking-tight">{k('areasTitle')}</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          {k('areasIntro')}
        </p>
        <div className="space-y-6">
          {areas.map((area, i) => {
            const visual = AREA_VISUALS[i] ?? AREA_VISUALS[0];
            const AreaIcon = visual.icon;
            return (
            <Card key={i} className="overflow-hidden border-border/60">
              <div className="grid md:grid-cols-3">
                <div className="relative aspect-[4/3] md:aspect-auto bg-muted">
                  <img decoding="async"
                    src={visual.image}
                    alt={k('areaAlt', { name: area.name })}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="md:col-span-2 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    {k('areaLabel', { n: i + 1, position: area.position })}
                  </p>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <AreaIcon className="w-5 h-5 text-secondary" />
                    {area.name}
                  </h3>
                  <ul className="space-y-1.5 mb-4">
                    {area.groups.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground italic border-l-2 border-secondary/50 pl-3">
                    {area.note}
                  </p>
                </CardContent>
              </div>
            </Card>
            );
          })}
        </div>
      </section>

      {/* Shelf rules */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold tracking-tight">{k('shelfTitle')}</h2>
            </div>
            <ul className="space-y-4">
              {shelfRules.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted">
            <img decoding="async"
              src={spooningImg}
              alt={k('shelfAlt')}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              {k('shelfCaption')}
            </p>
          </div>
        </div>
      </section>

      {/* The adult */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold tracking-tight">{k('adultTitle')}</h2>
            </div>
            <ul className="space-y-4">
              {adultRules.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted">
            <img decoding="async"
              src={walkingLine}
              alt={k('adultAlt')}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              {k('adultCaption')}
            </p>
          </div>
        </div>
      </section>

      {/* Room essentials */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {k('roomTitle')}
        </h2>
        <p className="text-muted-foreground max-w-3xl mb-6 leading-relaxed">
          {k('roomIntro')}
        </p>
        <ClassroomMaterials />
      </section>



      {/* Checklist */}
      <section className="container mx-auto px-6 pb-24 max-w-5xl">
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-2">{k('checklistTitle')}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {k('checklistIntro')}
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {checklist.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#curriculum">
                <Button size="lg" className="rounded-full px-6">
                  {k('ctaCurriculum')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/home-setup">
                <Button size="lg" variant="outline" className="rounded-full px-6">
                  {k('ctaHome')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default ClassroomSetupPage;
