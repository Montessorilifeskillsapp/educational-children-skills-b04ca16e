import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, CheckCircle2, Leaf, Menu, PlayCircle, ShoppingBag, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import { useAuthContext } from '@/components/AuthProvider';
import { montessoriImages } from '@/assets/images';
import heroChildPouring from '@/assets/hero-child-pouring.jpg';
import founderKerry from '@/assets/founder-kerry-howard.png';
import { sensorialImages } from '@/assets/sensorial';
import { mathImages } from '@/assets/math';
import { languageImages } from '@/assets/language';
import { geographyImages } from '@/assets/geography';
import { botanyImages } from '@/assets/botany';
import { culturalImages } from '@/assets/cultural';
import { artImages } from '@/assets/art';
import { graceCourtesyImages } from '@/assets/grace-courtesy';
import SocialLinks from './SocialLinks';

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

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, revealed };
}

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const { ref, revealed } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 motion-reduce:transition-none ${className}`}
      style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const activityContents = [
  { icon: BookOpen, title: 'Written presentation', text: 'A sequenced set of steps for the adult to review before presenting.' },
  { icon: ShoppingBag, title: 'Materials guidance', text: 'A materials list, home alternatives, and purchase links where they have been added.' },
  { icon: PlayCircle, title: 'Video where available', text: 'Protected instructional playback appears within the activity when a video has been added.' },
  { icon: CheckCircle2, title: 'Teaching notes', text: 'Purpose, points of interest, control of error, and signs of readiness where relevant.' },
];

const faqs = [
  { q: 'Who uses the app?', a: 'The app is for parents, homeschoolers, caregivers, classroom assistants, and teachers. The adult prepares with the guide; the child works off-screen with real materials.' },
  { q: 'What does an activity page include?', a: 'Each page includes an activity photograph, materials guidance, written presentation steps, and teaching notes. Purchase links and protected instructional videos appear where they have been added.' },
  { q: 'What can I explore for free?', a: 'You can open one starter activity in each section before choosing a paid plan.' },
  { q: 'Do I need Montessori training?', a: 'No. The resource is written to help adults prepare carefully. It does not replace formal Montessori training or observation of the child.' },
  { q: 'Does the child use the app?', a: 'No. Montessori Life Skills is an adult preparation resource. The child’s work takes place with real materials, away from the screen.' },
];

const Home: React.FC<HomeProps> = ({
  onGetStarted, onSubscriptionView, onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView, onArtView,
  onCulturalView, onGraceCourtesyView,
}) => {
  useSEO(SEO_CONFIG.home);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const sections = [
    { name: 'Practical Life', short: 'Practical Life', image: montessoriImages['pouring-set'], onClick: onPracticalView },
    { name: 'Sensorial', short: 'Sensorial', image: sensorialImages['pink-tower'], onClick: onSensorialView },
    { name: 'Mathematics', short: 'Math', image: mathImages['golden-beads'], onClick: onMathView },
    { name: 'Language', short: 'Language', image: languageImages['sandpaper-letters'], onClick: onLanguageView },
    { name: 'Botany', short: 'Botany', image: botanyImages['flower-parts'], onClick: onBotanyView },
    { name: 'Geography', short: 'Geography', image: geographyImages['continents'], onClick: onGeographyView },
    { name: 'Science & Culture', short: 'Science', image: culturalImages['sink-or-float'], onClick: onCulturalView },
    { name: 'Art', short: 'Art', image: artImages['color-mixing'], onClick: onArtView },
    { name: 'Grace & Courtesy', short: 'Grace & Courtesy', image: graceCourtesyImages['greeting-others'], onClick: onGraceCourtesyView },
  ];

  const navLinks = [
    ...sections.map(({ short, onClick }) => ({ label: short, onClick })),
    { label: 'Shop', onClick: () => navigate('/shop') },
    { label: 'Classroom Setup', onClick: () => navigate('/classroom-setup') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;
    const setHeight = () => document.documentElement.style.setProperty('--nav-h', `${Math.ceil(node.offsetHeight)}px`);
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(node);
    window.addEventListener('resize', setHeight);
    window.addEventListener('banner-resize', setHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', setHeight);
      window.removeEventListener('banner-resize', setHeight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        ref={headerRef}
        style={{ top: 'var(--banner-h, 0px)' }}
        className={`fixed inset-x-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'bg-background/95 border-border shadow-sm backdrop-blur-md' : 'bg-background/90 border-border/60 backdrop-blur-md'}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-left" aria-label="Montessori Life Skills home">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary"><Leaf className="h-5 w-5 text-primary-foreground" /></span>
            <span className="max-w-32 text-sm font-bold leading-tight sm:max-w-none sm:text-base">Montessori Life Skills</span>
          </button>
          <nav className="hidden items-center gap-1 text-xs font-medium text-muted-foreground xl:flex">
            {navLinks.map((link) => (
              <Button key={link.label} variant="ghost" size="sm" onClick={link.onClick} className="h-8 px-2 text-xs">{link.label}</Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {!user && <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/auth">Sign In</Link></Button>}
            <Button onClick={onGetStarted} size="sm" className="hidden sm:inline-flex">Start Free</Button>
            <Sheet>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open section menu"><Menu className="h-5 w-5" /></Button></SheetTrigger>
              <SheetContent side="right" className="z-[70] w-80 overflow-y-auto">
                <nav className="mt-8 flex flex-col gap-1">
                  {navLinks.map((link) => <SheetClose key={link.label} asChild><Button variant="ghost" onClick={link.onClick} className="justify-start">{link.label}</Button></SheetClose>)}
                  {!user && <SheetClose asChild><Button asChild variant="outline" className="mt-4"><Link to="/auth">Sign In</Link></Button></SheetClose>}
                  <SheetClose asChild><Button onClick={onGetStarted}>Start Free</Button></SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <nav aria-label="Curriculum sections" className="overflow-x-auto border-t border-border/50 xl:hidden">
          <div className="flex w-max items-center gap-1 px-3 py-1.5">
            {navLinks.map((link) => <Button key={link.label} variant="ghost" size="sm" onClick={link.onClick} className="h-8 whitespace-nowrap px-2.5 text-xs">{link.label}</Button>)}
          </div>
        </nav>
      </header>

      <main>
        <section className="relative flex min-h-[78vh] items-end overflow-hidden" style={{ paddingTop: 'calc(var(--banner-h, 0px) + var(--nav-h, 64px))' }}>
          <img src={heroChildPouring} alt="Montessori pouring activity prepared with real materials" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-foreground/65" />
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-20">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase text-accent">For the adult who prepares the environment</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-background sm:text-5xl lg:text-6xl">
                Montessori presentation guidance for adults working with children ages 3–6.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-background/90 sm:text-lg">
                Review the materials, written sequence, and teaching notes before inviting the child to work independently with real materials.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={onGetStarted} size="lg">Explore Free Activities <ArrowRight className="ml-2 h-4 w-4" /></Button>
                <Button onClick={onSubscriptionView} size="lg" variant="secondary">View Access Options</Button>
              </div>
              <p className="mt-5 text-sm text-background/80">One free starter activity in each section. No credit card required.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-4">
            {activityContents.map((item) => (
              <div key={item.title} className="bg-card px-6 py-7">
                <item.icon className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-base font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="curriculum" className="scroll-mt-28 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase text-primary">Curriculum sections</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Choose the work you are preparing to present.</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Activities are ordered from introductory work toward more advanced presentations within each section.</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section, index) => (
                <Reveal key={section.name} delay={(index % 3) * 70}>
                  <button type="button" onClick={section.onClick} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <img src={section.image} alt={`${section.name} Montessori activity materials`} className="h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.03]" loading="lazy" />
                    <span className="absolute inset-0 bg-foreground/35 transition-colors group-hover:bg-foreground/50" />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-background">
                      <span className="text-xl font-bold">{section.name}</span><ArrowRight className="h-5 w-5" />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/40 py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <Reveal className="lg:col-span-5">
              <p className="text-sm font-semibold uppercase text-primary">The adult workflow</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Prepare first. Present with care. Then observe.</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">This is not a child-facing learning app. It is a reference for the adult before and during preparation; the child’s activity remains hands-on and off-screen.</p>
              <Button onClick={onGetStarted} variant="outline" className="mt-7">Open the activity guide <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
              {[
                ['01', 'Choose', 'Select a presentation appropriate to the child’s readiness and prior experience.'],
                ['02', 'Prepare', 'Gather the listed materials and review the complete written sequence.'],
                ['03', 'Present', 'Invite the child, demonstrate precisely, then step back and observe.'],
              ].map(([number, title, text], index) => (
                <Reveal key={number} delay={index * 90} className="border-t-2 border-primary pt-5">
                  <p className="text-sm font-bold text-primary">{number}</p>
                  <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <Reveal><img src={founderKerry} alt="Kerry Howard, AMI-trained Montessori guide" className="aspect-[4/5] w-full rounded-md object-cover" loading="lazy" /></Reveal>
            <Reveal delay={100}>
              <p className="text-sm font-semibold uppercase text-primary">Experience behind the guidance</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Created by Kerry Howard</h2>
              <div className="mt-5 inline-flex items-center gap-2 border-y border-border py-3 text-sm font-semibold"><Award className="h-5 w-5 text-primary" /> AMI-trained 3–6 Primary Guide</div>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">The curriculum draws on Kerry’s AMI training and 40 years of experience guiding children in prepared environments.</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">It is written for adults who want an organized reference for materials, sequence, presentation, and observation.</p>
              <Button asChild variant="outline" className="mt-7"><Link to="/about">Read about Kerry’s approach</Link></Button>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-card py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-sm font-semibold uppercase text-primary">Begin with the curriculum</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Explore before choosing an access plan.</h2>
              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">Open one starter activity in each section, see the actual activity-page structure, and decide whether the complete curriculum suits your setting.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button onClick={onGetStarted} size="lg">Explore Free Activities</Button>
                <Button onClick={onSubscriptionView} size="lg" variant="outline">Compare Access Options</Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            <Reveal>
              <p className="text-sm font-semibold uppercase text-primary">Clear answers</p>
              <h2 className="mt-3 text-3xl font-bold">What the app is—and is not.</h2>
            </Reveal>
            <Reveal className="lg:col-span-2">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-foreground py-12 text-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div><p className="font-bold">Montessori Life Skills</p><p className="mt-3 max-w-sm text-sm leading-relaxed text-background/70">An adult preparation resource for guiding children ages 3–6 with real Montessori materials.</p></div>
            <div><p className="text-sm font-bold">Explore</p><div className="mt-3 flex flex-col items-start gap-2 text-sm text-background/70"><button onClick={onGetStarted}>Activities</button><button onClick={onDashboardView}>Family Dashboard</button><button onClick={onSubscriptionView}>Access options</button><Link to="/shop">Shop</Link></div></div>
            <div><p className="text-sm font-bold">Information</p><div className="mt-3 flex flex-col items-start gap-2 text-sm text-background/70"><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/privacy-policy">Privacy</Link><Link to="/terms-of-service">Terms</Link></div></div>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-background/20 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-background/60">© {new Date().getFullYear()} Montessori Life Skills. Certain images have been modified using AI.</p><SocialLinks variant="light" /></div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
