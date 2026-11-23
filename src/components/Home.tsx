import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Star, CheckCircle, BookOpen, Target, Award,
  Lock, Globe, Leaf, Palette, HandHelping, Utensils, Brain, Menu, Check,
  ClipboardCheck, Eye, RotateCcw, Share2, School
} from 'lucide-react';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import { montessoriImages } from '@/assets/images';
import founderKerry from '@/assets/founder-kerry-howard.png';
import { usePouringPhoto } from '@/lib/localizedMedia';
import { sensorialImages } from '@/assets/sensorial';
import { mathImages } from '@/assets/math';
import { languageImages } from '@/assets/language';
import { geographyImages } from '@/assets/geography';
import { botanyImages } from '@/assets/botany';
import InstallBanner from './InstallBanner';
import ExitIntentCapture from './ExitIntentCapture';
import ConsultationDialog from './ConsultationDialog';
import { openCookieSettings } from './consent/openCookieSettings';
import SocialLinks from './SocialLinks';
import ShareThisPage from './ShareThisPage';
import { useAuthContext } from '@/components/AuthProvider';
import { useIsSchoolStaff } from '@/components/school/useIsSchoolStaff';
import { schoolReturnTarget } from '@/components/school/navigation';
import { Link, useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/** Privacy-law codes shown in the footer, keyed by the region label in home.footer.complianceRegions. */
const COMPLIANCE_CODES = [
  ['us', 'COPPA · FERPA · CCPA'],
  ['eu', 'GDPR · UK GDPR'],
  ['de', 'DSGVO · TDDDG'],
  ['es', 'LOPDGDD · LFPDPPP'],
  ['cn', 'PIPL'],
  ['in', 'DPDP'],
  ['ea', 'DPA · DPPA'],
] as const;


/**
 * "A clearer starting point": each question opens a guide card in place; its link leads to the
 * place that goes deeper, in question order (in-page section ids, or app pages with a leading slash).
 */
const STARTING_POINT_TARGETS = [
  'curriculum',             // Which activity comes next? -> the sequence
  '/readiness-guide',       // Is the child ready? -> readiness guide
  'sample-activity',        // What materials are needed? -> sample activity
  '/preview/pouring-water', // How is it presented correctly? -> full presentation
  '/preview/pouring-water', // What should you say — or not say? -> full presentation
  'how-it-works',           // What do you observe? -> Prepare. Present. Observe.
  'curriculum',             // When should you move on? -> the sequence
] as const;

interface StartingPointStep { title: string; body: string; points: string[]; link: string }

function scrollToSection(id: string) {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

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
// One shared observer for every fade-in section instead of one per section.
const revealCallbacks = new WeakMap<Element, () => void>();
let revealObserver: IntersectionObserver | null = null;
function observeReveal(el: Element, onReveal: () => void): () => void {
  if (typeof IntersectionObserver === 'undefined') { onReveal(); return () => {}; }
  revealObserver ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      revealCallbacks.get(entry.target)?.();
      revealCallbacks.delete(entry.target);
      revealObserver?.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  revealCallbacks.set(el, onReveal);
  revealObserver.observe(el);
  return () => { revealCallbacks.delete(el); revealObserver?.unobserve(el); };
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el, () => setRevealed(true));
  }, []);
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
  { name: 'Practical Life', key: 'practicalLife', icon: Utensils, color: AREA_BADGE, image: montessoriImages['pouring-set'] },
  { name: 'Sensorial', key: 'sensorial', icon: Brain, color: AREA_BADGE, image: sensorialImages['pink-tower'] },
  { name: 'Mathematics', key: 'mathematics', icon: Target, color: AREA_BADGE, image: mathImages['golden-beads'] },
  { name: 'Language', key: 'language', icon: BookOpen, color: AREA_BADGE, image: languageImages['sandpaper-letters'] },
  { name: 'Geography', key: 'geography', icon: Globe, color: AREA_BADGE, image: geographyImages['continents'] },
  { name: 'Botany', key: 'botany', icon: Leaf, color: AREA_BADGE, image: botanyImages['flower-parts'] },
  { name: 'Art', key: 'art', icon: Palette, color: AREA_BADGE, image: sensorialImages['color-tablets'] },
  { name: 'Grace & Courtesy', key: 'graceCourtesy', icon: HandHelping, color: AREA_BADGE, image: montessoriImages['grace-courtesy-table-setting'] },
];

const faqs = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ q: `home.faq.q${n}`, a: `home.faq.a${n}` }));

// Curriculum area nav links are built inside the component to access handlers

const Home: React.FC<HomeProps> = ({
  onGetStarted, onSubscriptionView,
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onCulturalView, onGraceCourtesyView, onParentView, onProfilesView
}) => {
  useSEO(SEO_CONFIG.home);
  const { user } = useAuthContext();
  // Only server-verified school staff ever see the portal link; private families never do.
  const isSchoolStaff = useIsSchoolStaff(user?.id) === true;
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rawSteps = t('home.problem.steps', { returnObjects: true }) as unknown;
  const startingPointSteps: StartingPointStep[] = Array.isArray(rawSteps) ? rawSteps : [];
  const pouringPhoto = usePouringPhoto();
  const [consultOpen, setConsultOpen] = useState(false);

  const homeNavLinks: { label: string; onClick?: () => void; href?: string }[] = [
    { label: t('nav.practicalLife'), onClick: onPracticalView },
    { label: t('nav.sensorial'), onClick: onSensorialView },
    { label: t('nav.math'), onClick: onMathView },
    { label: t('nav.language'), onClick: onLanguageView },
    { label: t('nav.botany'), onClick: onBotanyView },
    { label: t('nav.geography'), onClick: onGeographyView },
    { label: t('nav.science'), onClick: onCulturalView },
    { label: t('nav.art'), onClick: onArtView },
    { label: t('nav.graceCourtesy'), onClick: onGraceCourtesyView },
    { label: t('nav.shop'), onClick: () => navigate('/shop') },
    { label: t('nav.classroomSetup'), onClick: () => navigate('/classroom-setup') },
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
            <div className="flex items-center gap-3">
              {isSchoolStaff && (
                <Button onClick={() => navigate(schoolReturnTarget())} size="sm" variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/5 px-3">
                  <School className="w-4 h-4 sm:mr-1.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{t('common.schoolPortal')}</span>
                  <span className="sr-only sm:hidden">{t('common.schoolPortal')}</span>
                </Button>
              )}
              {!user && (
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">{t('common.signIn')}</Button>
                </Link>
              )}
              <Button
                onClick={onGetStarted}
                size="sm"
                className="hidden sm:inline-flex bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white rounded-full px-5"
              >
                {t('common.startFree')}
              </Button>
              <LanguageSelector />
              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden text-primary hover:bg-primary/10" aria-label={t('home.header.openSectionMenu')}>
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">{t('home.header.openMenu')}</span>
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
                      <LanguageSelector showLabel className="self-start" />
                      {isSchoolStaff && (
                        <SheetClose asChild>
                          <Button variant="outline" onClick={() => navigate(schoolReturnTarget())} className="w-full rounded-full border-primary/40 text-primary">
                            <School className="w-4 h-4 mr-2" aria-hidden="true" />
                            {t('common.schoolPortal')}
                          </Button>
                        </SheetClose>
                      )}
                      {!user && (
                        <SheetClose asChild>
                          <Link to="/auth">
                            <Button variant="outline" className="w-full">{t('common.signIn')}</Button>
                          </Link>
                        </SheetClose>
                      )}
                      <SheetClose asChild>
                        <Button
                          onClick={onGetStarted}
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white rounded-full"
                        >
                          {t('common.startFree')}
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
          aria-label={t('home.header.curriculumSections')}
          className="border-t border-border/40 overflow-x-auto"
        >
          <div className="flex items-center gap-1 px-3 py-1.5 w-max mx-auto text-sm font-medium text-muted-foreground">
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
                {t('home.hero.badge')}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15] animate-reveal-delay-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('home.hero.title')}
              </h1>

              <div className="max-w-xl mx-auto lg:mx-0 mb-8 space-y-3 animate-reveal-delay-2">
                <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t('home.hero.body')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-8 animate-reveal-delay-3">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-primary-foreground px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t('common.startFree')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-6 text-base rounded-2xl bg-background/70 backdrop-blur-sm"
                >
                  {t('home.hero.seeHow')}
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-sm font-medium text-muted-foreground border-t border-border/60 pt-5 animate-reveal-delay-3">
                <span>{t('home.hero.statActivities')}</span>
                <span aria-hidden="true" className="text-primary">·</span>
                <span>{t('home.hero.statAges')}</span>
                <span aria-hidden="true" className="text-primary">·</span>
                <span>{t('home.hero.statAreas')}</span>
                <span aria-hidden="true" className="text-primary">·</span>
                <span>{t('home.hero.statGuidance')}</span>
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section id="struggle" className="py-16 lg:py-24 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <Reveal>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.problem.eyebrow')}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.15]">
                {t('home.problem.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.problem.body')}
              </p>
            </Reveal>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {STARTING_POINT_TARGETS.map((target, index) => {
                const question = t(`home.problem.q${index + 1}`);
                const step = startingPointSteps[index];
                const linkClass = "inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
                const linkContent = (
                  <>
                    {step?.link}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                );
                return (
                  <Reveal key={`${index}-${question}`} delay={index * 50}>
                    <AccordionItem
                      value={`step-${index + 1}`}
                      className="rounded-xl border border-border/60 bg-card shadow-sm transition-colors data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
                    >
                      <AccordionTrigger className="gap-3 px-4 py-4 text-left hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                        <span className="flex-1 font-medium text-foreground">{question}</span>
                      </AccordionTrigger>
                      {step && (
                        <AccordionContent className="px-4 pb-5 sm:pl-14">
                          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{step.title}</p>
                          <p className="text-base text-foreground leading-relaxed mb-3">{step.body}</p>
                          <ul className="space-y-2 mb-4">
                            {step.points.map((point) => (
                              <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                          {target.startsWith('/') ? (
                            <Link to={target} className={linkClass}>{linkContent}</Link>
                          ) : (
                            <button type="button" onClick={() => scrollToSection(target)} className={linkClass}>{linkContent}</button>
                          )}
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  </Reveal>
                );
              })}
            </Accordion>
          </div>
          <Reveal className="mt-10 text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary">{t('home.problem.closing')}</p>
          </Reveal>
        </div>
      </section>

      {/* ─── Real Activity ─── */}
      <section id="sample-activity" className="py-20 lg:py-28 bg-background border-t border-border/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.sample.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{t('home.sample.title')}</h2>
            <p className="text-lg text-muted-foreground mt-3">{t('home.sample.subtitle')}</p>
          </Reveal>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <Card className="h-full border-border/60 bg-card">
                <CardContent className="p-6 lg:p-8">
                  <img decoding="async"
                    src={pouringPhoto}
                    alt={t('home.sample.imageAlt')}
                    width={1024}
                    height={1024}
                    className="w-full aspect-video object-cover rounded-xl mb-6"
                    loading="lazy"
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { title: t('home.sample.materialsTitle'), text: t('home.sample.materialsText') },
                      { title: t('home.sample.preparationTitle'), text: t('home.sample.preparationText') },
                      { title: t('home.sample.presentationTitle'), text: t('home.sample.presentationText') },
                      { title: t('home.sample.observationTitle'), text: t('home.sample.observationText') },
                    ].map(item => (
                      <div key={item.title} className="border-l-2 border-primary/30 pl-4">
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{t('home.sample.nextLabel')}</p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-foreground">{t('home.sample.nextText')}</p>
                      <Lock className="w-5 h-5 shrink-0 text-muted-foreground" />
                    </div>
                  </div>
                   <Button onClick={onGetStarted} size="lg" className="mt-6 w-full rounded-xl">{t('home.sample.cta')} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── First Activity Experience ─── */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.how.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('home.how.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('home.how.body')}</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ClipboardCheck, number: '01', title: t('home.how.prepareTitle'), text: t('home.how.prepareText') },
              { icon: BookOpen, number: '02', title: t('home.how.presentTitle'), text: t('home.how.presentText') },
              { icon: Eye, number: '03', title: t('home.how.observeTitle'), text: t('home.how.observeText') },
            ].map((step, index) => (
              <Reveal key={step.title} delay={index * 100}>
                <div className="h-full border-t-2 border-primary/30 pt-6">
                  <step.icon className="w-7 h-7 text-primary mb-5" aria-hidden="true" />
                  <span className="text-sm font-bold text-primary">{step.number}</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <p className="text-lg sm:text-xl text-muted-foreground mb-7">
              <Trans i18nKey="home.how.move" components={{ 1: <span className="font-semibold text-foreground" />, 3: <span className="font-semibold text-primary" /> }} />
            </p>
            <Button onClick={onGetStarted} size="lg" className="rounded-xl px-8">{t('home.how.cta')} <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Reveal>
        </div>
      </section>

      {/* ─── Curriculum ─── */}
      <section id="curriculum" className="py-20 lg:py-28 bg-background border-t border-border/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.curriculum.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('home.curriculum.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('home.curriculum.body')}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {curriculumAreas.map((area, index) => (
              <Reveal key={area.name} delay={index * 60}>
                <button onClick={() => handleCurriculumClick(area.name)} className="group w-full text-left rounded-2xl overflow-hidden border border-border/60 hover:border-primary/30 hover:shadow-xl transition-all duration-300 bg-card">
                  <div className="relative h-40 overflow-hidden">
                    <img decoding="async" src={area.image} alt={t('home.curriculum.imageAlt', { area: t(`home.areas.${area.key}`) })} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{t(`home.areas.${area.key}`)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t('home.curriculum.explore')}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Authority ─── */}
      <section id="founder" className="py-20 lg:py-28 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid md:grid-cols-5 gap-10 lg:gap-14 items-center">
              <div className="md:col-span-2">
                <img decoding="async" src={founderKerry} alt={t('home.founder.imageAlt')} className="rounded-2xl shadow-xl object-cover w-full aspect-square border-4 border-card" loading="lazy" />
              </div>
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.founder.eyebrow')}</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5">Kerry Howard</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 rounded-full text-sm font-medium text-foreground mb-6">
                  <Award className="w-4 h-4 text-accent" /> {t('home.founder.badge')}
                </div>
                <p className="text-xl font-semibold text-foreground leading-relaxed mb-4">{t('home.founder.lead')}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{t('home.founder.body')}</p>
                <Button variant="outline" onClick={() => navigate('/about')} className="rounded-xl">{t('home.founder.cta')}</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 lg:py-28 bg-background border-t border-border/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.pricing.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('home.pricing.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('home.pricing.body')}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground"><Check className="w-4 h-4 text-primary" aria-hidden="true" />{t('home.pricing.guarantee')}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <Reveal>
              <Card className="relative h-full border-2 border-primary/40 shadow-xl overflow-hidden bg-card">
                <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold text-center py-2 uppercase tracking-wider">{t('home.pricing.bestValue')}</div>
                <CardContent className="p-7">
                  <h3 className="text-2xl font-bold text-foreground">{t('home.pricing.annualTitle')}</h3>
                  <div className="flex items-baseline gap-2 my-4"><span className="text-5xl font-extrabold text-foreground">$199</span><span className="text-muted-foreground">{t('home.pricing.perYear')}</span></div>
                  <p className="font-semibold text-primary mb-1">{t('home.pricing.annualEquivalent')}</p>
                  <p className="text-sm text-muted-foreground mb-6">{t('home.pricing.annualNote')}</p>
                  <ul className="space-y-3 mb-7">
                    {['fFullCurriculum', 'fActivities', 'fAllAreas', 'fProgress', 'fPresentations', 'fMaterials', 'fVideos'].map(k => t(`home.pricing.${k}`)).map(item => <li key={item} className="flex gap-2 text-sm text-foreground"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />{item}</li>)}
                  </ul>
                  <Button onClick={onSubscriptionView} size="lg" className="w-full rounded-xl">{t('home.pricing.startPremium')}</Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={100}>
              <Card className="h-full border-border/60 bg-card">
                <CardContent className="p-7 flex flex-col h-full">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('home.pricing.flexible')}</p>
                  <h3 className="text-2xl font-bold text-foreground">{t('home.pricing.monthlyTitle')}</h3>
                  <div className="flex items-baseline gap-2 my-4"><span className="text-5xl font-extrabold text-foreground">$29.99</span><span className="text-muted-foreground">{t('home.pricing.perMonth')}</span></div>
                  <p className="text-muted-foreground mb-6">{t('home.pricing.monthlyBody')}</p>
                  <Button onClick={onSubscriptionView} variant="outline" size="lg" className="w-full rounded-xl mt-auto">{t('home.pricing.monthlyCta')}</Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={200}>
              <Card className="h-full border-primary/40 bg-card">
                <CardContent className="p-7 flex flex-col h-full">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{t('home.pricing.familyEyebrow')}</p>
                  <h3 className="text-2xl font-bold text-foreground">{t('home.pricing.familyTitle')}</h3>
                  <div className="flex items-baseline gap-2 my-4"><span className="text-5xl font-extrabold text-foreground">$349</span><span className="text-muted-foreground">{t('home.pricing.perYear')}</span></div>
                  <p className="text-muted-foreground mb-6">{t('home.pricing.familyBody')}</p>
                  <Button onClick={onSubscriptionView} size="lg" className="w-full rounded-xl mt-auto">{t('home.pricing.familyCta')}</Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={300}>
              <Card className="h-full border-accent/40 bg-card">
                <CardContent className="p-7 flex flex-col h-full">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('home.pricing.consultEyebrow')}</p>
                  <h3 className="text-2xl font-bold text-foreground">{t('home.pricing.consultTitle')}</h3>
                  <div className="flex items-baseline gap-2 my-4"><span className="text-5xl font-extrabold text-foreground">$225</span><span className="text-muted-foreground">{t('home.pricing.perSession')}</span></div>
                  <p className="text-muted-foreground mb-5">{t('home.pricing.consultBody')}</p>
                  <ul className="space-y-3 mb-7">
                    {['cGuidance', 'cRoutine', 'cPlan', 'cFollowUp'].map(k => t(`home.pricing.${k}`)).map(item => <li key={item} className="flex gap-2 text-sm text-foreground"><Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />{item}</li>)}
                    <li className="flex gap-2 text-sm text-foreground"><Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />{t('home.pricing.cPackage')}</li>
                  </ul>
                  <Button onClick={() => setConsultOpen(true)} variant="outline" size="lg" className="w-full rounded-xl mt-auto">{t('home.pricing.consultCta')}</Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Continue and Share ─── */}
      <section className="py-20 lg:py-28 bg-muted/40 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.beyond.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{t('home.beyond.title')}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: RotateCcw, id: 'continue', title: t('home.beyond.continueTitle'), text: t('home.beyond.continueText') },
              { icon: Share2, id: 'share', title: t('home.beyond.shareTitle'), text: t('home.beyond.shareText') },
              { icon: School, id: 'schools', title: t('home.beyond.schoolsTitle'), text: t('home.beyond.schoolsText') },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <div className="text-center px-4">
                  <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  {item.id === 'schools' && <Button variant="outline" onClick={() => navigate('/contact')} className="mt-5 rounded-xl">{t('home.beyond.contactUs')}</Button>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 lg:py-28 bg-muted/40 border-t border-border/60 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t('home.faq.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{t('home.faq.title')}</h2>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="bg-card border border-border/60 rounded-xl px-5 data-[state=open]:border-primary/25 transition-colors">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4 text-base">{t(faq.q)}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{t(faq.a)}</AccordionContent>
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
              {t('home.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-primary hover:bg-gray-50 px-10 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 font-bold"
              >
                {t('home.cta.explore')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={onSubscriptionView}
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-10 py-6 text-lg rounded-2xl transition-all duration-300 backdrop-blur-sm font-semibold"
              >
                {t('home.cta.viewPlans')}
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm mb-10">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> {t('home.cta.noCard')}</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> {t('home.cta.cancelAnytime')}</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> {t('home.cta.guarantee')}</span>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm font-medium mb-4">{t('home.cta.community')}</p>
              <SocialLinks variant="light" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── AI Image Disclaimer ─── */}
      <div className="py-4 bg-slate-950 text-center border-t border-slate-800">
        <p className="text-xs text-slate-500">{t('home.aiDisclaimer')}</p>
      </div>

      {/* ─── Exit-intent email capture ─── */}
      <ExitIntentCapture />
      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />

      {/* ─── Footer ─── */}
      <footer className="py-12 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center" aria-hidden="true">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </span>
                <span className="font-bold text-white text-lg">Montessori Life Skills</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                {t('home.footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">{t('home.footer.product')}</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={onGetStarted} className="hover:text-white transition-colors">{t('home.footer.activities')}</button></li>
                <li><button onClick={onDashboardView} className="hover:text-white transition-colors">{t('home.footer.progress')}</button></li>
                <li><button onClick={onSubscriptionView} className="hover:text-white transition-colors">{t('home.footer.pricing')}</button></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t('home.footer.about')}</Link></li>
                <li><Link to="/readiness-guide" className="hover:text-white transition-colors">{t('home.footer.readinessGuide')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">{t('home.footer.support')}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white transition-colors">{t('home.footer.help')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('home.footer.contact')}</Link></li>
                <li><Link to="/guarantee" className="hover:text-white transition-colors">{t('home.footer.guarantee')}</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{t('home.footer.privacy')}</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">{t('home.footer.terms')}</Link></li>
                <li><Link to="/accessibility" className="hover:text-white transition-colors">{t('home.footer.accessibility')}</Link></li>
                <li><button type="button" onClick={openCookieSettings} className="hover:text-white transition-colors">{t('home.footer.cookies')}</button></li>
              </ul>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 border-y border-slate-800 py-4">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {t('home.footer.trustRefund')}</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {t('home.footer.trustCancel')}</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {t('home.footer.trustNoCard')}</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {t('home.footer.trustBuilt')}</span>
          </div>

          {/* Privacy-law compliance line: each code opens its region in the Privacy Policy */}
          <nav aria-label={t('home.footer.complianceLabel')} className="mb-8 text-center text-xs text-slate-400">
            <p className="mb-2 font-semibold uppercase tracking-wider text-slate-300">{t('home.footer.complianceLabel')}</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {COMPLIANCE_CODES.map(([region, codes]) => (
                <li key={region}>
                  <Link to="/privacy-policy#regional-compliance" className="hover:text-white transition-colors">
                    <span className="font-semibold text-slate-200">{codes}</span> <span>({t(`home.footer.complianceRegions.${region}`)})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/privacy-policy#schools-student-records" className="hover:text-white transition-colors">{t('home.footer.complianceNoAds')}</Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <LanguageSelector showLabel className="text-slate-400 hover:text-white hover:bg-slate-800" />
            <p className="text-sm text-slate-500">{t('home.footer.rights', { year: new Date().getFullYear() })}</p>
            <SocialLinks variant="light" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;