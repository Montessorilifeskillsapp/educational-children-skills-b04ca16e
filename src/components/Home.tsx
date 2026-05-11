import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, Star, CheckCircle, Sparkles, BookOpen, Target, Award, Heart,
  Home as HomeIcon, GraduationCap, Users2, Play, Lock, ChevronDown, ChevronUp,
  Baby, Globe, Leaf, Palette, Music, HandHelping, Utensils, Brain,
  Check, Crown, Zap, Shield, Clock, BarChart3, Printer, Headphones
} from 'lucide-react';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import { montessoriImages } from '@/assets/images';
import heroChildPouring from '@/assets/hero-child-pouring.jpg';
import { sensorialImages } from '@/assets/sensorial';
import { mathImages } from '@/assets/math';
import { languageImages } from '@/assets/language';
import { geographyImages } from '@/assets/geography';
import { botanyImages } from '@/assets/botany';
import InstallBanner from './InstallBanner';
import SocialLinks from './SocialLinks';
import ShareThisPage from './ShareThisPage';
import { useAuthContext } from '@/components/AuthProvider';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      className={`transition-all duration-700 ${className}`}
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

const curriculumAreas = [
  { name: 'Practical Life', icon: Utensils, color: 'from-amber-500 to-orange-500', image: montessoriImages['pouring-set'] },
  { name: 'Sensorial', icon: Brain, color: 'from-accent/200 to-accent/200', image: sensorialImages['pink-tower'] },
  { name: 'Mathematics', icon: Target, color: 'from-red-500 to-accent', image: mathImages['golden-beads'] },
  { name: 'Language', icon: BookOpen, color: 'from-sky-500 to-blue-600', image: languageImages['sandpaper-letters'] },
  { name: 'Geography', icon: Globe, color: 'from-cyan-500 to-blue-500', image: geographyImages['continents'] },
  { name: 'Botany', icon: Leaf, color: 'from-emerald-500 to-green-600', image: botanyImages['flower-parts'] },
  { name: 'Art', icon: Palette, color: 'from-orange-500 to-amber-500', image: sensorialImages['color-tablets'] },
  { name: 'Grace & Courtesy', icon: HandHelping, color: 'from-primary/200 to-primary', image: montessoriImages['grace-courtesy-table-setting'] },
];

const howItWorks = [
  {
    step: '01',
    title: 'Choose an Activity',
    desc: 'Browse 100+ authentic Montessori activities organized by skill area and developmental readiness.',
    icon: BookOpen,
    image: sensorialImages['knobbed-cylinders'],
  },
  {
    step: '02',
    title: 'Follow the Guide',
    desc: 'Get step-by-step presentation instructions with photos, videos, and material lists — no Montessori training required.',
    icon: Play,
    image: mathImages['number-rods'],
  },
  {
    step: '03',
    title: 'Track Progress',
    desc: 'Log completions, celebrate milestones, and watch your child build independence day by day.',
    icon: BarChart3,
    image: sensorialImages['brown-stair'],
  },
];

const painPoints = [
  'You want to teach independence but don\'t know where to start',
  'Pinterest has ideas but no real Montessori sequence or methodology',
  'You\'re unsure which activities are age-appropriate for your child',
  'You spend more time planning than actually doing activities together',
];

const benefits = [
  { icon: CheckCircle, title: 'AMI-Aligned Curriculum', desc: 'Every activity follows authentic Montessori sequences and pedagogy.' },
  { icon: Target, title: 'Age-Appropriate Guidance', desc: 'Activities organized by developmental readiness, not just age.' },
  { icon: Award, title: 'No Teaching Experience Needed', desc: 'Clear, visual step-by-step instructions for every activity.' },
  { icon: Clock, title: 'Works Offline', desc: 'Download activities and access them anywhere, anytime.' },
  { icon: BarChart3, title: 'Progress Tracking', desc: 'Visual reports show your child\'s growth across all skill areas.' },
  { icon: Users2, title: 'Multiple Profiles', desc: 'Track progress for each of your children individually.' },
];

const testimonials = [
  { quote: 'My daughter loves the hands-on activities. She\'s gained so much independence in just 3 weeks!', author: 'Sarah M.', role: 'Parent of 4-year-old', stars: 5 },
  { quote: 'Finally, authentic Montessori education at home. The step-by-step guidance is perfect for non-teachers.', author: 'Maria K.', role: 'Montessori Educator', stars: 5 },
  { quote: 'The progress tracking helps me see exactly how my son is developing. Worth every penny.', author: 'David L.', role: 'Father of twins', stars: 5 },
  { quote: 'I went from overwhelmed to confident. My classroom assistant uses this daily for activity prep.', author: 'Jessica T.', role: 'Preschool Teacher', stars: 5 },
];

const pricingPlans = [
  {
    id: 'free',
    name: 'Explorer',
    price: 0,
    period: 'Free forever',
    tagline: 'Start with the basics',
    features: ['3 core activities (pouring, sweeping, rolling a mat)', '1 printable activity sheet', 'Daily Life Skill Prompt', 'Gentle, ad-free experience'],
    cta: 'Start Free',
    highlight: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29,
    period: '/month',
    tagline: 'Unlock full potential',
    features: ['100+ Montessori life skill activities', 'All new content every month', 'Beautifully illustrated printable bundles', 'Voice-guided instructions', 'Progress badges & certificates', 'Family dashboard with skill tracking', 'Bonus seasonal activity packs', 'Yearly plan: $199 (43% off)'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    id: 'consultation',
    name: 'Private Consultation',
    price: 225,
    period: '/session',
    tagline: 'Personalized guidance',
    features: ['1-on-1 with a Montessori guide', 'Customized curriculum for your child', 'Family lifestyle integration', 'Personalized materials recommendations', 'Written homeschool action plan', 'Follow-up email support (2 weeks)', '3-session package: $600 (save $75)'],
    cta: 'Book Consultation',
    highlight: false,
  },
];

const faqs = [
  { q: 'Do I need Montessori training to use this app?', a: 'Not at all. Every activity includes clear, visual step-by-step instructions written for parents and caregivers with no teaching background. We explain the "why" behind each activity so you feel confident guiding your child.' },
  { q: 'What age range is this designed for?', a: 'The activities are designed for children ages 2–6, organized by developmental readiness rather than strict age. This follows true Montessori principles where children progress at their own pace.' },
  { q: 'Can I use this for multiple children?', a: 'Yes. Premium plans include multiple child profiles so you can track each child\'s progress individually, with personalized recommendations based on their developmental stage.' },
  { q: 'Does this work without internet?', a: 'Yes. Once you\'ve loaded an activity, it works offline. This is perfect for using the app in classrooms, while traveling, or in areas with limited connectivity.' },
  { q: 'How is this different from free Montessori resources online?', a: 'Unlike scattered blog posts and Pinterest ideas, our curriculum is a complete, sequenced program aligned with AMI standards. Every activity builds on the last, with proper presentation techniques and control of error.' },
  { q: 'What if I\'m not satisfied?', a: 'We offer a 30-day money-back guarantee on all premium plans. If you don\'t see your child growing in independence and confidence, we\'ll refund your subscription — no questions asked.' },
];

const stats = [
  { value: '100+', label: 'Guided activities' },
  { value: '8', label: 'Curriculum areas' },
  { value: 'AMI', label: 'Aligned method' },
  { value: '2–6', label: 'Years old' },
];

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
    const setVar = () => {
      // Store header's own height so hero can compose: banner + nav + gap.
      const h = el.offsetHeight;
      document.documentElement.style.setProperty('--nav-h', `${Math.ceil(h)}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    window.addEventListener('orientationchange', setVar);
    window.addEventListener('banner-resize', setVar);
    return () => {
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      <InstallBanner />

      {/* ─── Sticky Nav ─── */}
      <header
        ref={headerRef}
        style={{ top: 'var(--banner-h, 0px)' }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className={`font-bold text-lg transition-colors ${scrolled ? 'text-slate-800' : 'text-slate-800'}`}>
                Montessori Skills
              </span>
            </div>
            <div className="flex items-center gap-3">
              {!user && (
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign In</Button>
                </Link>
              )}
              <Button
                onClick={onGetStarted}
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white rounded-full px-5"
              >
                Start Free
              </Button>
            </div>
          </div>
        </div>
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
              <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-foreground mb-6 shadow-sm">
                <Star className="w-4 h-4 text-accent fill-accent" />
                AMI-aligned Montessori for ages 2–6
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-[1.1] animate-reveal-delay-1">
                Teach your child{' '}
                <span className="text-primary">real life skills</span>{' '}
                with confidence.
              </h1>

              <p className="text-base sm:text-lg font-medium text-foreground/80 mb-3 max-w-xl mx-auto lg:mx-0 animate-reveal-delay-2">
                AMI-aligned Montessori activities for ages 2–6, guided step-by-step.
              </p>

              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-reveal-delay-2">
                A complete curriculum for home — authentic materials, clear presentations, and progress tracking. No teaching experience required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-reveal-delay-3">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start Free Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={onSubscriptionView}
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg rounded-2xl transition-all duration-300"
                >
                  View Plans
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>30-day guarantee</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl scale-105" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-card">
                <img
                  src={heroChildPouring}
                  alt="Young child calmly pouring water between glass pitchers in a prepared Montessori environment"
                  width={1280}
                  height={1280}
                  className="w-full h-auto object-cover aspect-square"
                  loading="eager"
                />
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-primary/20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Independence</p>
                      <p className="text-xs text-muted-foreground">Built daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── The Problem ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">The Struggle Is Real</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Does This Sound Familiar?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                You know Montessori could help your child, but getting started feels overwhelming.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-10 items-center">
            {/* Material image collage */}
            <Reveal className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-orange-200/40 rounded-3xl blur-2xl" />
                <div className="relative grid grid-cols-2 gap-3">
                  <img src={sensorialImages['pink-tower']} alt="Pink Tower Montessori material" className="rounded-2xl shadow-lg w-full h-32 object-cover" loading="lazy" />
                  <img src={mathImages['golden-beads']} alt="Golden Beads Montessori material" className="rounded-2xl shadow-lg w-full h-32 object-cover mt-6" loading="lazy" />
                  <img src={languageImages['sandpaper-letters']} alt="Sandpaper Letters Montessori material" className="rounded-2xl shadow-lg w-full h-32 object-cover" loading="lazy" />
                  <img src={sensorialImages['knobbed-cylinders']} alt="Knobbed Cylinders Montessori material" className="rounded-2xl shadow-lg w-full h-32 object-cover mt-6" loading="lazy" />
                </div>
              </div>
            </Reveal>

            {/* Pain points */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {painPoints.map((point, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="flex items-start gap-4 bg-gradient-to-br from-accent/20 to-orange-50 border border-accent/15 rounded-2xl p-5 h-full">
                    <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent0 font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Solution ─── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-primary/50 rounded-3xl blur-2xl" />
                <img
                  src={sensorialImages['brown-stair']}
                  alt="Brown Stair — authentic Montessori sensorial material"
                  className="relative w-64 h-40 object-cover rounded-2xl shadow-xl border-4 border-white mx-auto"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">The Better Way</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Everything You Need, All in One Place
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Authentic Montessori curriculum, expert guidance, and progress tracking — designed for real parents and educators.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card className="h-full bg-white border border-slate-100 hover:border-primary/25 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/200 to-accent/200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <b.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Curriculum Grid ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Complete Curriculum</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                8 Montessori Areas. Endless Growth.
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Covering all primary curriculum areas aligned with AMI standards — from Practical Life to Grace & Courtesy.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {curriculumAreas.map((area, i) => (
              <Reveal key={area.name} delay={i * 80}>
                <button
                  onClick={() => handleCurriculumClick(area.name)}
                  className="group w-full text-left rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/25 hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={area.image}
                      alt={`${area.name} Montessori materials`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${area.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${area.color} text-white shadow-lg`}>
                        <area.icon className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{area.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">Explore activities →</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-primary/20/60 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Simple as 1-2-3</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Get started in minutes, not months. No lesson planning, no prep work.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-blue-200 to-accent" />

            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 150}>
                <div className="relative text-center bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative mx-auto w-32 h-32 mb-5 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={step.image}
                      alt={`Authentic Montessori material — ${step.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl border-2 border-white">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-sm mb-3 mt-3">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Audience Section ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Built For You</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Parents, Teachers & Assistants
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Whether you're homeschooling one child or managing a classroom, we've got you covered.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: HomeIcon,
                title: 'For Parents',
                color: 'from-accent/200 to-accent/200',
                bg: 'from-accent/20 to-accent/20',
                image: montessoriImages['dressing-frames-set'],
                items: ['Easy-to-follow activities for homeschooling', 'Track progress & milestones', 'Build independence at home', 'No teaching experience needed'],
              },
              {
                icon: GraduationCap,
                title: 'For Teachers',
                color: 'from-blue-500 to-primary/200',
                bg: 'from-blue-50 to-primary/20',
                image: sensorialImages['geometric-cabinet'],
                items: ['Complete AMI-aligned curriculum', 'Multi-student progress tracking', 'Ready-to-use lesson plans', 'Detailed reports for parents'],
              },
              {
                icon: Users2,
                title: 'For Assistants',
                color: 'from-primary/200 to-primary/200',
                bg: 'from-primary/20 to-primary/20',
                image: mathImages['spindle-box'],
                items: ['Step-by-step presentation guides', 'Learn Montessori on the job', 'Support teachers with resources', 'Build confidence in the classroom'],
              },
            ].map((audience, i) => (
              <Reveal key={audience.title} delay={i * 120}>
                <Card className={`h-full bg-gradient-to-b ${audience.bg} border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={audience.image}
                      alt={`Authentic Montessori material — ${audience.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${audience.bg} opacity-40`} />
                    <div className={`absolute -bottom-7 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${audience.color} flex items-center justify-center shadow-lg border-4 border-white`}>
                      <audience.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6 pt-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{audience.title}</h3>
                    <ul className="space-y-3">
                      {audience.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-slate-700">
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${i === 0 ? 'text-accent0' : i === 1 ? 'text-blue-500' : 'text-primary0'}`} />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Proof / Testimonials ─── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Loved By Families</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Real Stories, Real Results
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-lg font-bold text-slate-800">4.9/5</span>
              </div>
              <p className="text-slate-500">From 2,000+ reviews</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <Card className="h-full bg-white border border-slate-100 hover:border-primary/15 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(t.stars)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-4 leading-relaxed text-sm italic">"{t.quote}"</p>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t.author}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 lg:py-28" id="pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Simple Pricing</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Start Free. Scale When Ready.
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Choose the plan that fits your family. All premium plans include a 30-day money-back guarantee.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 120}>
                <Card className={`h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? 'border-2 border-primary/40 shadow-xl shadow-primary'
                    : 'border border-slate-100 hover:shadow-lg'
                }`}>
                  {plan.highlight && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold text-center py-1.5 uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-6 ${plan.highlight ? 'pt-10' : ''}`}>
                    <p className="text-sm font-medium text-slate-500 mb-1">{plan.tagline}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                      <span className="text-slate-500 font-medium">{plan.period}</span>
                    </div>
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-primary0' : 'text-emerald-500'}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={plan.id === 'consultation' ? onSubscriptionView : onGetStarted}
                      className={`w-full rounded-xl py-5 font-semibold transition-all duration-300 ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Got Questions?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Frequently Asked
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-slate-100 rounded-xl px-5 data-[state=open]:border-primary/25 transition-colors">
                  <AccordionTrigger className="text-left font-semibold text-slate-800 hover:no-underline py-4 text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-accent" />
        <div className="absolute inset-0 bg-shimmer" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Child's Learning?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of families building independence, confidence, and real-world skills through authentic Montessori education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-primary hover:bg-gray-50 px-10 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 font-bold"
              >
                Start Your Free Journey <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* ─── Footer ─── */}
      <footer className="py-12 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/200 to-accent/200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-lg">Montessori Life Skills</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Helping parents and educators teach essential life skills to children ages 2–6 using the proven Montessori method.
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
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
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