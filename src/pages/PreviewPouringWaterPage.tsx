import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import pouringSet from '@/assets/pouring-set.jpg';
import heroPouring from '@/assets/hero-child-pouring.jpg';

const STEPS = [
  { title: 'Prepare the tray', body: 'Set out two small glass pitchers on a tray. Fill the left pitcher about one-third with water (add a drop of food colouring to make the level visible).' },
  { title: 'Invite the child', body: '"Would you like me to show you how to pour water?" Walk together to a small table with the child to your dominant-hand side.' },
  { title: 'Show the grasp', body: 'Slowly grasp the handle with your dominant hand. Place your non-dominant hand on the table, calm and still. Pause so the child sees the grip clearly.' },
  { title: 'Pour, slowly', body: 'Lift, move over the empty pitcher, and tilt until water flows in a steady stream. Stop before the first pitcher is empty. Replace it gently.' },
  { title: 'Pour back', body: 'Repeat in the other direction so the exercise has a clear cycle. The child watches the full sequence in silence.' },
  { title: 'Hand over', body: '"Would you like a turn?" Step back. Let the child work uninterrupted, even if they spill. A small sponge nearby invites them to clean up themselves.' },
];

const PreviewPouringWaterPage: React.FC = () => {
  useSEO({
    title: 'Pouring Water — A Free Montessori Activity for Ages 2½–4',
    description: 'A complete AMI-aligned Montessori Practical Life activity. Step-by-step photo guide for teaching pouring water at home. No signup required.',
    canonical: 'https://montessorilifeskillsapp.com/preview/pouring-water',
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-foreground hover:text-primary">← Montessori Life Skills</Link>
          <Link to="/auth"><Button size="sm">Get the full app</Button></Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-10 lg:py-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary mb-5">
          <Sparkles className="w-3.5 h-3.5" /> Free preview · No signup
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
          Pouring Water
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Practical Life · Ages 2½–4 · ~10 minutes
        </p>
        <div className="flex items-center gap-1 text-amber-500 mb-8">
          {[0,1,2,3,4].map(i => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
          <span className="text-sm text-muted-foreground ml-2">Loved by 1,200+ families</span>
        </div>

        <img
          src={heroPouring}
          alt="Young child pouring water between two small glass pitchers in a Montessori prepared environment"
          width={1280} height={720}
          className="w-full rounded-2xl shadow-xl border-4 border-card mb-10 aspect-video object-cover"
          loading="eager"
          // @ts-expect-error fetchpriority
          fetchpriority="high"
        />

        <section className="prose prose-lg max-w-none mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">Why this activity matters</h2>
          <p className="text-foreground/80 leading-relaxed">
            Pouring is one of the first true Practical Life lessons in an AMI Montessori environment.
            It looks simple — but for a 2½-year-old, it integrates concentration, hand-eye coordination,
            judgment of volume, control of movement, and the pride of doing real work for themselves.
            Done properly, it sets the foundation for every later lesson.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Materials you'll need</h2>
          <img src={pouringSet} alt="Two small glass pitchers, a wooden tray, and a small sponge — the exact materials for a Montessori pouring water activity" width={1024} height={1024} className="w-full max-w-md rounded-xl border border-border mb-4" loading="lazy" />
          <ul className="space-y-2 text-foreground/80">
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Two small, identical glass pitchers (child-sized — ~150ml)</li>
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> A small wooden or wicker tray</li>
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> A small natural sponge for spills</li>
            <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> Water + (optional) a single drop of natural food colouring</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Presentation — step by step</h2>
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold flex items-center justify-center">{i + 1}</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-foreground/80 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">There are 100+ more like this</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            The full app guides you through a sequenced curriculum across Practical Life, Sensorial,
            Language, Math, Geography, Botany, Zoology and Art — all from an AMI-trained guide.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8">
              Start your free Week 1 <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-3">No credit card · Cancel anytime · 30-day guarantee</p>
        </section>
      </article>
    </div>
  );
};

export default PreviewPouringWaterPage;
