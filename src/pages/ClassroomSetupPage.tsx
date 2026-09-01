import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight, CheckCircle2, Sparkles, Eye, Hand, BookOpen,
  Globe2, Ruler, Leaf, Armchair, LayoutGrid, User,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { montessoriImages } from '@/assets/images';
import cleaningTools from '@/assets/materials/cleaning-tools.jpg';
import spooningImg from '@/assets/materials/spooning.jpg';
import walkingLine from '@/assets/materials/walking-line.jpg';

const PRINCIPLES = [
  {
    title: 'Order',
    body: 'The environment must be ordered, because the child between three and six is in the sensitive period for order. Every material has a fixed place on the shelf, and the child always returns it there. Order in the environment builds order in the mind.',
  },
  {
    title: 'Beauty',
    body: 'The room must be beautiful — light, airy, with fresh flowers, plants, and carefully chosen pictures hung at the child\u2019s eye level. Beauty invites the child to work and to care for the space.',
  },
  {
    title: 'Reality',
    body: 'Tools must be real and they must work. The child drinks from a real glass, pours from a real ceramic jug, sweeps with a real broom. Breakable objects are deliberate: they teach the child to move with care.',
  },
  {
    title: 'Freedom within limits',
    body: 'The child is free to choose work, to work with it for as long as they wish, and to repeat it — provided the work is not misused and does not disturb others. Freedom is built on discipline, not licence.',
  },
  {
    title: 'Child-sized proportions',
    body: 'Every piece of furniture, every shelf, every tool is proportioned to the child and light enough for the child to move. Nothing in the room requires an adult\u2019s strength or permission.',
  },
  {
    title: 'One of each material',
    body: 'There is only one of each material in the room. This is intentional: it teaches waiting, turn-taking, and respect for another\u2019s work — the social fabric of the classroom.',
  },
];

const AREAS = [
  {
    icon: Hand,
    name: 'Practical Life',
    position: 'The first area. Everything begins here.',
    image: cleaningTools,
    groups: [
      'Preliminary exercises — spooning, pouring, carrying a tray, opening and closing',
      'Care of the person — dressing frames, hand washing, food preparation',
      'Care of the environment — dusting, sweeping, washing a table, flower arranging',
      'Grace and courtesy — greeting, offering, waiting, observing another\u2019s work',
      'Control of movement — walking on the line, the silence game',
    ],
    note: 'Practical Life is offered exclusively at the start. No other curriculum area is introduced until the child\u2019s Practical Life work is settled — concentration, order, coordination, and independence must be established first.',
  },
  {
    icon: Eye,
    name: 'Sensorial',
    position: 'Introduced once Practical Life work is settled.',
    image: montessoriImages['color-tablets-box1'],
    groups: [
      'Visual — pink tower, brown stair, red rods, knobbed cylinders',
      'Tactile — touch boards, touch tablets, fabric box',
      'Chromatic — colour tablets, boxes one through three',
      'Auditory — sound cylinders, the bells',
      'Baric, thermic, and stereognostic — baric tablets, thermic bottles, mystery bag',
      'Olfactory and gustatory — smelling bottles, tasting exercises',
    ],
    note: 'Each material isolates a single sensory quality — isolation of difficulty — and carries its own control of error, so the child can see and correct mistakes without an adult.',
  },
  {
    icon: BookOpen,
    name: 'Language',
    position: 'Runs alongside Sensorial, once speech is confident.',
    image: montessoriImages['sandpaper-letters'],
    groups: [
      'Enrichment of vocabulary — classified cards, three-period lessons',
      'Sound games (I Spy) — isolating beginning, ending, then middle sounds',
      'Sandpaper letters — tracing sound and shape together',
      'Moveable alphabet — composing words before writing by hand',
      'Writing — insets for design, metal insets, then chalk and pencil',
      'Reading — phonetic words first, then phonograms and puzzle words',
    ],
    note: 'Writing precedes reading in the AMI sequence. The child composes with the moveable alphabet long before being asked to decode another\u2019s writing.',
  },
  {
    icon: Ruler,
    name: 'Mathematics',
    position: 'Introduced when the child shows readiness through Practical Life and Sensorial work.',
    image: montessoriImages['golden-beads-set'],
    groups: [
      'Numbers one to ten — number rods, sandpaper numbers, spindle box, cards and counters',
      'The decimal system — golden beads: unit, ten, hundred, thousand',
      'Teens and tens — Seguin boards, coloured bead stair',
      'Linear counting — the hundred chain and thousand chain',
      'Memorization — addition, subtraction, multiplication and division tables',
    ],
    note: 'Every quantity is first presented concretely with the golden beads; the symbol always follows the concrete experience, never precedes it.',
  },
  {
    icon: Globe2,
    name: 'Culture',
    position: 'Woven through the environment from the start.',
    image: montessoriImages['puzzle-maps'],
    groups: [
      'Geography — land and water forms, sandpaper and coloured globes, puzzle maps',
      'Botany — leaf cabinet, parts of a plant, care of plants in the room',
      'Zoology — classification of the animal kingdom, care of classroom animals',
      'Art and music — real art at child height, singing, the bells',
    ],
    note: 'Geography begins with the whole and moves to the parts: the globe of land and water before continents, the continent before the country.',
  },
];

const SHELF_RULES = [
  'Materials are arranged left to right, top to bottom, simplest to most complex — the order in which the child reads and the order in which the sequence unfolds.',
  'Every activity is complete and self-contained on its own tray, basket, or stand. Nothing is missing; nothing extra is added.',
  'Each material isolates one difficulty. A pouring set does not also teach colour; a dressing frame does not also teach language.',
  'Wherever possible the material carries a control of error — the child can see the mistake without an adult pointing it out.',
  'Broken, incomplete, or worn materials are repaired or removed the same day. An incomplete set is worse than none at all.',
  'Low, open shelving lets the child see the whole room\u2019s work at a glance and choose freely.',
];

const ADULT_RULES = [
  'Prepare the environment, then step back. The adult is the link between the child and the environment — not the centre of it.',
  'Observe before intervening. Most "problems" resolve when the child is given time.',
  'Present each activity individually, slowly, with precise and economical movements. Analysis of movement: every motion is shown clearly enough for the child to imitate.',
  'Present, then withdraw. The child learns through repetition, not through the adult\u2019s commentary.',
  'Guard concentration above all. Never interrupt a child who is working, not even to praise.',
  'Re-present an activity as often as needed. A lesson that did not land is simply presented again another day, without comment.',
];

const CHECKLIST = [
  'Low open shelves, no higher than the child\u2019s shoulder',
  'Child-sized tables and chairs, light enough to be moved by the child',
  'Work rugs rolled and standing in a basket — each rug defines one child\u2019s workspace',
  'An ellipse marked on the floor for Walking on the Line',
  'Real, breakable glasses, jugs and plates in the Practical Life area',
  'Child-sized broom, dustpan, mop, dusting and polishing cloths, all accessible',
  'A food preparation area with real child-sized tools',
  'Plants to care for, fresh flowers to arrange, and a source of natural light',
  'One complete set of each material, arranged on trays, simplest to most complex',
  'Art prints hung at the child\u2019s eye level, rotated regularly',
  'A quiet corner of the shelf for the Silence Game',
  'Nothing decorative that does not serve the child\u2019s work',
];

const ClassroomSetupPage: React.FC = () => {
  useSEO({
    title: 'How to Set Up a Montessori Classroom | AMI Guide',
    description:
      'An AMI-exact guide to preparing an authentic Montessori environment: the prepared environment, the five curriculum areas, material arrangement, and the role of the adult.',
    canonical: 'https://montessorilifeskillsapp.com/classroom-setup',
  });

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="container relative mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            The Prepared Environment · AMI
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            How to Set Up Your Montessori Classroom
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            In Montessori, the environment is the teacher. Before a single lesson is given,
            the room itself must be prepared — ordered, beautiful, real, and proportioned
            to the child. This is the AMI guide to getting it exactly right.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Armchair className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-semibold tracking-tight">The Prepared Environment</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mb-8 leading-relaxed">
          Maria Montessori called the classroom the <em>prepared environment</em>. It is not
          decorated; it is prepared — deliberately, for the child\u2019s developmental needs.
          Six principles govern every decision.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map((p) => (
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
          <h2 className="text-3xl font-semibold tracking-tight">The Areas of the Environment</h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          An AMI classroom holds five curriculum areas, each on its own shelving, each with
          its own internal sequence. They are introduced in a strict order — and the order
          is not negotiable.
        </p>
        <div className="space-y-6">
          {AREAS.map((area, i) => (
            <Card key={area.name} className="overflow-hidden border-border/60">
              <div className="grid md:grid-cols-3">
                <div className="relative aspect-[4/3] md:aspect-auto bg-muted">
                  <img
                    src={area.image}
                    alt={`Montessori ${area.name} materials`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="md:col-span-2 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Area {i + 1} · {area.position}
                  </p>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <area.icon className="w-5 h-5 text-secondary" />
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
          ))}
        </div>
      </section>

      {/* Shelf rules */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold tracking-tight">Arranging the Materials</h2>
            </div>
            <ul className="space-y-4">
              {SHELF_RULES.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted">
            <img
              src={spooningImg}
              alt="A complete Montessori spooning activity on its own tray"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              Every activity is complete on its own tray: nothing missing, nothing extra.
            </p>
          </div>
        </div>
      </section>

      {/* The adult */}
      <section className="container mx-auto px-6 pb-20 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-muted order-2 lg:order-1">
            <img
              src={walkingLine}
              alt="A child walking on the line, developing control of movement"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground p-4 italic">
              The adult presents slowly and precisely, then steps back and observes.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold tracking-tight">The Prepared Adult</h2>
            </div>
            <ul className="space-y-4">
              {ADULT_RULES.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="container mx-auto px-6 pb-24 max-w-4xl">
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-2">The Setup Checklist</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Walk your room against this list before the first child enters.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {CHECKLIST.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full px-6">
                  Explore the full AMI curriculum
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/home-setup">
                <Button size="lg" variant="outline" className="rounded-full px-6">
                  Setting up at home?
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
