import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Star, CheckCircle, BookOpen, Target, Award,
  Home as HomeIcon, GraduationCap, Users2, Lock, ChevronDown, ChevronUp,
  Globe, Leaf, Palette, HandHelping, Utensils, Brain, Menu, Check
} from 'lucide-react';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import { montessoriImages } from '@/assets/images';
import heroChildPouring from '@/assets/hero-child-pouring.jpg';
import founderKerry from '@/assets/founder-kerry-howard.png';
import { sensorialImages } from '@/assets/sensorial';
import { mathImages } from '@/assets/math';
import { languageImages } from '@/assets/language';
import { geographyImages } from '@/assets/geography';
import { botanyImages } from '@/assets/botany';
import InstallBanner from './InstallBanner';
import HeroAppPreview from './HeroAppPreview';
import SocialLinks from './SocialLinks';
import ShareThisPage from './ShareThisPage';
import { useAuthContext } from '@/components/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface HomeProps {
  onGetStarted: () => void;
  onSubscriptionView?: () => void;
  onDashboardView?: () => void;
  onPracticalView?: () => void;
  onSensorialView?: () => void;
  onLanguageView?: () => void;
  onMathView?: () => void;
  onGeographyView?: () => void;
  onBotanyView?: () => void;
  onArtView?: () => void;
  onCulturalView?: () => void;
  onGraceCourtesyView?: () => void;
  onParentView?: () => void;
  onProfilesView?: () => void;
}

// ─── Scroll-reveal hook ───
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, revealed };
}

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const { ref, revealed } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 motion-reduce:transition-none ${className}`}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Uniform badge styling across all curriculum areas for visual consistency
const AREA_BADGE = 'from-primary to-accent';
const curriculumAreas = [
  { name: 'Practical Life', icon: Utensils, color: AREA_BADGE, image: montessoriImages['pouring-set'] },
  { name: 'Sensorial', icon: Brain, color: AREA_BADGE, image: sensorialImages['pink-tower'] },
  { name: 'Mathematics', icon: Target, color: AREA_BADGE, image: mathImages['golden-beads'] },
  { name: 'Language', icon: BookOpen, color: AREA_BADGE, image: languageImages['sandpaper-letters'] },
  { name: 'Geography', icon: Globe, color: AREA_BADGE, image: geographyImages['continents'] },
  { name: 'Botany', icon: Leaf, color: AREA_BADGE, image: botanyImages['flower-parts'] },
  { name: 'Art', icon: Palette, color: AREA_BADGE, image: sensorialImages['color-tablets'] },
  { name: 'Grace & Courtesy', icon: HandHelping, color: AREA_BADGE, image: montessoriImages['grace-courtesy-table-setting'] },
];

const faqs = [
  { q: 'Do I need Montessori training to use this app?', a: 'No. Activities include written presentation steps and teaching notes for parents, caregivers, assistants, and teachers.' },
  { q: 'What age range is this designed for?', a: 'The curriculum is designed for adults guiding children ages 3–6. Activities are organized by developmental readiness rather than a rigid age schedule.' },
  { q: 'Can I use this for multiple children?', a: 'Yes. Premium plans include multiple child profiles so you can record each child\'s progress individually.' },
  { q: 'Does this work without internet?', a: 'An internet connection is needed for current activity content, purchase links, account features, and protected videos.' },
  { q: 'How is the curriculum organized?', a: 'Activities are arranged from introductory to advanced work within each curriculum section, with materials and presentation guidance together in one place.' },
  { q: 'What if I\'m not satisfied?', a: 'Premium plans include a 30-day money-back guarantee. See the guarantee page for details.' },
  { q: 'Does my child use this app?', a: 'No. Montessori Life Skills is a teaching resource for the adult. You read the presentation, prepare the materials, and guide your child — hands-on, off-screen. The app never becomes screen time for the child.' },
];

// Curriculum area nav links are built inside the component to access handlers

const Home: React.FC<HomeProps> = ({
  onGetStarted, onSubscriptionView,
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onCulturalView, onGraceCourtesyView, onParentView, onProfilesView
}) => {
  useSEO(SEO_CONFIG.home);
  const { user } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const homeNavLinks: { label: string; onClick?: () => void; href?: string }[] = [
    { label: 'Practical Life', onClick: onPracticalView },
    { label: 'Sensorial', onClick: onSensorialView },
    { label: 'Math', onClick: onMathView },
    { label: 'Language', onClick: onLanguageView },
    { label: 'Botany', onClick: onBotanyView },
    { label: 'Geography', onClick: onGeographyView },
    { label: 'Science', onClick: onCulturalView },
    { label: 'Art', onClick: onArtView },
    { label: 'Grace & Courtesy', onClick: onGraceCourtesyView },
    { label: 'Shop', onClick: () => navigate('/shop') },
    { label: 'Classroom Setup', onClick: () => navigate('/classroom-setup') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Safeguard: measure fixed nav height and expose as --nav-h so the hero
  // can guarantee enough top padding to never be overlapped at any breakpoint.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let raf = 0;
    const setVar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Store header's own height so hero can compose: banner + nav + gap.
        const h = el.offsetHeight;
        const value = `${Math.ceil(h)}px`;
        if (document.documentElement.style.getPropertyValue('--nav-h') !== value) {
          document.documentElement.style.setProperty('--nav-h', value);
        }
      });
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    window.addEventListener('orientationchange', setVar);
    window.addEventListener('banner-resize', setVar);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', setVar);
      window.removeEventListener('orientationchange', setVar);
      window.removeEventListener('banner-resize', setVar);
    };
  }, []);

  const handleCurriculumClick = (name: string) => {
    const map: Record<string, (() => void) | undefined> = {
      'Practical Life': onPracticalView,
      Sensorial: onSensorialView,
      Mathematics: onMathView,
      Language: onLanguageView,
      Geography: onGeographyView,
      Botany: onBotanyView,
      Art: onArtView,
      'Grace & Courtesy': onGraceCourtesyView,
    };
    map[name]?.();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* ─── Sticky Nav ─── */}
      <header
        ref={headerRef}
        style={{ top: 'var(--banner-h, 0px)' }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm" aria-hidden="true">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </span>
              <span className={`font-bold text-lg transition-colors ${scrolled ? 'text-slate-800' : 'text-slate-800'}`}>
                Montessori Life Skills
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground">
              {homeNavLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="px-2.5 py-1.5 rounded-md hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              {!user && (
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign In</Button>
                </Link>
              )}
              <Button
                onClick={onGetStarted}
                size="sm"
                className="hidden sm:inline-flex bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white rounded-full px-5"
              >
                Start Free
              </Button>
              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden text-primary hover:bg-primary/10" aria-label="Open section menu">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="z-[70] w-72 sm:w-80 overflow-y-auto">
                  <div className="flex flex-col gap-6 mt-8">
                    <nav className="flex flex-col gap-2 text-base font-medium">
                      {homeNavLinks.map((link) => (
                        <SheetClose key={link.label} asChild>
                          <button
                            onClick={link.onClick}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors text-left"
                          >
                            <Leaf className="w-4 h-4 text-primary" />
                            {link.label}
                          </button>
                        </SheetClose>
                      ))}
                    </nav>
                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                      {!user && (
                        <SheetClose asChild>
                          <Link to="/auth">
                            <Button variant="outline" className="w-full">Sign In</Button>
                          </Link>
                        </SheetClose>
                      )}
                      <SheetClose asChild>
                        <Button
                          onClick={onGetStarted}
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white rounded-full"
                        >
                          Start Free
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {/* Section bar — visible at every width; scrolls horizontally on narrow screens */}
        <nav
          aria-label="Curriculum sections"
          className="lg:hidden border-t border-border/40 overflow-x-auto"
        >
          <div className="flex items-center gap-1 px-3 py-1.5 w-max text-sm font-medium text-muted-foreground">
            {homeNavLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.onClick}
                className="px-2.5 py-1 rounded-md hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* ─── Hero Section ─── */}
      <section
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
        style={{ paddingTop: 'calc(var(--banner-h, 0px) + var(--nav-h, 64px) + 2rem)' }}
      >
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-background to-background pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-in inline-flex items-center gap-1.5 px-2.5 py-1 bg-card/70 backdrop-blur-sm border border-primary/15 rounded-full text-[11px] sm:text-xs font-medium text-muted-foreground mb-5 shadow-sm">
                <Star className="w-3 h-3 text-accent fill-accent" />
                Montessori guidance for the adult
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15] animate-reveal-delay-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Know exactly what to teach — and how to present it.
              </h1>

              <div className="max-w-xl mx-auto lg:mx-0 mb-8 space-y-3 animate-reveal-delay-2">
                <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
                  Step-by-step Montessori activities for ages 2–6, built for parents, teachers and classroom assistants.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  See what to prepare, how to present each activity, what to observe, and what comes next.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-8 animate-reveal-delay-3">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-primary-foreground px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-6 text-base rounded-2xl bg-background/70 backdrop-blur-sm"
                >
                  See How It Works
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-sm font-medium text-muted-foreground border-t border-border/60 pt-5 animate-reveal-delay-3">
                <span>100+ activities</span>
                <span aria-hidden="true" className="text-primary">·</span>
                <span>Ages 2–6</span>
                <span aria-hidden="true" className="text-primary">·</span>
                <span>8 curriculum areas</span>
                <span aria-hidden="true" className="text-primary">·</span>
                <span>Step-by-step guidance</span>
              </div>
            </div>

            {/* Right: Hero Image — hidden on mobile */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section id="struggle" className="py-16 lg:py-24 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
            <Reveal>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">A clearer starting point</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.15]">
                Montessori shouldn't require hours of searching.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You want to give a child meaningful work, but scattered information makes it difficult to know what to prepare and when.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Which activity comes next?',
                'Is the child ready?',
                'What materials are needed?',
                'How is it presented correctly?',
                'What should you say — or not say?',
                'What do you observe?',
                'When should you move on?',
              ].map((question, index) => (
                <Reveal key={question} delay={index * 50}>
                  <div className="h-full flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                    <p className="font-medium text-foreground">{question}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="mt-10 text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary">Montessori Life Skills puts those answers in your hand.</p>
          </Reveal>
        </div>
      </section>

      {/* ─── Product Walkthrough ─── */}
      <HeroAppPreview onGetStarted={onGetStarted} />

      {/* ─── Three-Step Mechanism ─── */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">A simple rhythm</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Choose. Present. Progress.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { number: '01', title: 'Choose', text: 'Find the appropriate activity for the child’s readiness.' },
              { number: '02', title: 'Present', text: 'Prepare the materials and follow the presentation step by step.' },
              { number: '03', title: 'Progress', text: 'Record what you observe and see what comes next.' },
            ].map((step, index) => (
              <Reveal key={step.title} delay={index * 100}>
                <Card className="h-full border-border/60 bg-card">
                  <CardContent className="p-7">
                    <span className="text-sm font-bold text-primary">{step.number}</span>
                    <h3 className="text-2xl font-bold text-foreground mt-3 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.text}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <p className="text-lg sm:text-xl text-muted-foreground">
              From <span className="font-semibold text-foreground">“What am I supposed to do?”</span> to <span className="font-semibold text-primary">“I know exactly what to present today.”</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Audience Paths ─── */}
      <section id="audience" className="py-20 lg:py-28 bg-background border-t border-border/60 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Built for the adult guide</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Choose the guidance that fits your role.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: HomeIcon, title: 'Parents', heading: 'Bring authentic Montessori into everyday home life.', body: 'Activities selected by readiness, with clear materials lists and presentations—without needing to become a Montessori expert.', cta: 'Montessori at Home', action: onGetStarted },
              { icon: GraduationCap, title: 'Teachers', heading: 'A curriculum reference when you need it.', body: 'Quickly review activities, presentations, sequence, and developmental purpose.', cta: 'For Teachers', action: onGetStarted },
              { icon: Users2, title: 'Assistants', heading: 'Know how the work is presented.', body: 'Step-by-step guidance that makes classroom preparation and support easier.', cta: 'For Assistants', action: onGetStarted },
            ].map((audience, index) => (
              <Reveal key={audience.title} delay={index * 100}>
                <Card className="h-full border-border/60 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-7 flex h-full flex-col">
                    <audience.icon className="w-7 h-7 text-primary mb-5" />
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{audience.title}</p>
                    <h3 className="text-xl font-bold text-foreground mb-3">{audience.heading}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{audience.body}</p>
                    <Button variant="outline" onClick={audience.action} className="w-full rounded-xl">{audience.cta}</Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Real Activity ─── */}
      <section id="sample-activity" className="py-20 lg:py-28 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Inside a real activity</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Pouring Water</h2>
            <p className="text-lg text-muted-foreground mt-3">Purpose: coordination, concentration, and independence.</p>
          </Reveal>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
            <Reveal>
              <img src={heroChildPouring} alt="Child practicing the Montessori Pouring Water activity" className="w-full h-full min-h-[360px] object-cover rounded-2xl border border-border shadow-lg" />
            </Reveal>
            <Reveal delay={100}>
              <Card className="h-full border-border/60 bg-card">
                <CardContent className="p-6 lg:p-8">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { title: 'Materials', text: 'Two matching child-sized pitchers, water, a tray, sponge, and drying cloth.' },
                      { title: 'Preparation', text: 'Arrange the complete activity before inviting the child.' },
                      { title: 'Presentation', text: 'Demonstrate the grasp, lift, controlled pour, return, and clean-up slowly.' },
                      { title: 'Observation', text: 'Notice control of movement, concentration, repetition, and independent clean-up.' },
                    ].map(item => (
                      <div key={item.title} className="border-l-2 border-primary/30 pl-4">
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Next activity</p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-foreground">The deeper progression continues with full access.</p>
                      <Lock className="w-5 h-5 shrink-0 text-muted-foreground" />
                    </div>
                  </div>
                  <Button onClick={onSubscriptionView} size="lg" className="mt-6 w-full rounded-xl">Get All 100+ Activities</Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Curriculum ─── */}
      <section id="curriculum" className="py-20 lg:py-28 bg-background border-t border-border/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">A connected curriculum</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Stop collecting activities. Follow a sequence.</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Individual ideas answer one question. Montessori Life Skills organizes the work from introductory to advanced, so the adult can see what belongs together and what comes next.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {curriculumAreas.map((area, index) => (
              <Reveal key={area.name} delay={index * 60}>
                <button onClick={() => handleCurriculumClick(area.name)} className="group w-full text-left rounded-2xl overflow-hidden border border-border/60 hover:border-primary/30 hover:shadow-xl transition-all duration-300 bg-card">
                  <div className="relative h-40 overflow-hidden">
                    <img src={area.image} alt={`${area.name} Montessori materials`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{area.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Explore the sequence →</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Authority ─── */}
      <section id="founder" className="py-20 lg:py-28 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid md:grid-cols-5 gap-10 lg:gap-14 items-center">
              <div className="md:col-span-2">
                <img src={founderKerry} alt="Kerry Howard, AMI-trained Montessori guide and founder" className="rounded-2xl shadow-xl object-cover w-full aspect-square border-4 border-card" loading="lazy" />
              </div>
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Meet the founder</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5">Kerry Howard</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 rounded-full text-sm font-medium text-foreground mb-6">
                  <Award className="w-4 h-4 text-accent" /> AMI-trained 3–6 Primary Guide
                </div>
                <p className="text-xl font-semibold text-foreground leading-relaxed mb-4">40+ years of Montessori classroom knowledge, organized so you can actually use it.</p>
                <p className="text-muted-foreground leading-relaxed mb-6">The curriculum draws on Kerry's verified AMI training and experience guiding children in prepared environments.</p>
                <Button variant="outline" onClick={() => navigate('/about')} className="rounded-xl">Read Kerry's biography</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 lg:py-28 bg-background border-t border-border/60 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Premium access</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Choose annual value or monthly flexibility.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <Reveal>
              <Card className="relative h-full border-2 border-primary/40 shadow-xl overflow-hidden bg-card">
                <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold text-center py-2 uppercase tracking-wider">Best value</div>
                <CardContent className="p-7">
                  <h3 className="text-2xl font-bold text-foreground">Premium Annual</h3>
                  <div className="flex items-baseline gap-2 my-4"><span className="text-5xl font-extrabold text-foreground">$199</span><span className="text-muted-foreground">/year</span></div>
                  <p className="font-semibold text-primary mb-1">Equivalent to $16.58/month</p>
                  <p className="text-sm text-muted-foreground mb-6">Save $149 compared with 12 months at the current monthly price.</p>
                  <ul className="space-y-3 mb-7">
                    {['Full curriculum', '100+ activities', 'All curriculum areas', 'Progress tracking', 'Written presentations', 'Materials information', 'Instructional videos where available'].map(item => <li key={item} className="flex gap-2 text-sm text-foreground"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />{item}</li>)}
                  </ul>
                  <Button onClick={onSubscriptionView} size="lg" className="w-full rounded-xl">Start Premium</Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={100}>
              <Card className="h-full border-border/60 bg-card">
                <CardContent className="p-7">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Flexible</p>
                  <h3 className="text-2xl font-bold text-foreground">Premium Monthly</h3>
                  <div className="flex items-baseline gap-2 my-4"><span className="text-5xl font-extrabold text-foreground">$29</span><span className="text-muted-foreground">/month</span></div>
                  <p className="text-muted-foreground mb-6">The same premium access, billed monthly. Cancel anytime.</p>
                  <Button onClick={onSubscriptionView} variant="outline" size="lg" className="w-full rounded-xl">View Monthly Option</Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 lg:py-28 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Questions</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Frequently Asked</h2>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="bg-card border border-border/60 rounded-xl px-5 data-[state=open]:border-primary/25 transition-colors">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4 text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 lg:py-28 relative overflow-hidden border-t border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-accent" />
        <div className="absolute inset-0 bg-shimmer" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Prepare Your Next Presentation?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Use the adult guide to choose an activity, gather the materials, and present the lesson clearly while the child learns through hands-on work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-primary hover:bg-gray-50 px-10 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 font-bold"
              >
                Explore Free Activities <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={onSubscriptionView}
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-10 py-6 text-lg rounded-2xl transition-all duration-300 backdrop-blur-sm font-semibold"
              >
                View Plans & Pricing
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm mb-10">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> No credit card</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Cancel anytime</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> 30-day guarantee</span>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm font-medium mb-4">Connect with our community</p>
              <SocialLinks variant="light" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── AI Image Disclaimer ─── */}
      <div className="py-4 bg-slate-950 text-center border-t border-slate-800">
        <p className="text-xs text-slate-500">Certain images have been modified using AI.</p>
      </div>

      {/* ─── Footer ─── */}
      <footer className="py-12 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center" aria-hidden="true">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </span>
                <span className="font-bold text-white text-lg">Montessori Life Skills</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                An adult preparation and presentation resource for parents, educators, caregivers, and classroom assistants guiding children ages 3–6.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={onGetStarted} className="hover:text-white transition-colors">Activities</button></li>
                <li><button onClick={onDashboardView} className="hover:text-white transition-colors">Progress Tracking</button></li>
                <li><button onClick={onSubscriptionView} className="hover:text-white transition-colors">Pricing</button></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/guarantee" className="hover:text-white transition-colors">30-Day Guarantee</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 border-y border-slate-800 py-4">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 30-day refund</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> No card for free tier</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Built by an AMI guide</span>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Montessori Life Skills. All rights reserved.</p>
            <SocialLinks variant="light" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;