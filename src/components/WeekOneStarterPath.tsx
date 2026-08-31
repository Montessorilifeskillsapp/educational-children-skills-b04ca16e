import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Sparkles, ArrowRight } from 'lucide-react';
import { montessoriImages } from '@/assets/images';
import walkingLine from '@/assets/materials/walking-line.jpg';
import spooningImg from '@/assets/materials/spooning.jpg';
import careOfPerson from '@/assets/materials/care-of-person.jpg';
import cleaningTools from '@/assets/materials/cleaning-tools.jpg';

interface DayActivity {
  day: number;
  area: string;
  title: string;
  why: string;
  skillId: string;
  image: string;
}

// AMI sequence: the child's first week is Practical Life only — control of
// movement, then transferring, then care of self, then care of environment.
// No other curriculum area is introduced until Practical Life work is settled.
const WEEK_ONE: DayActivity[] = [
  {
    day: 1,
    area: 'Practical Life · Control of Movement',
    title: 'Carrying a Tray',
    why: 'The first lesson of all: how to carry work carefully to a table and back to the shelf.',
    skillId: 'carrying-objects',
    image: walkingLine,
  },
  {
    day: 2,
    area: 'Practical Life · Preliminary Exercises',
    title: 'Spooning Beans',
    why: 'A dry transfer before a wet one — refines the hand and builds the pincer grip.',
    skillId: 'spooning-beans',
    image: spooningImg,
  },
  {
    day: 3,
    area: 'Practical Life · Preliminary Exercises',
    title: 'Pouring Water',
    why: 'The wet transfer. Concentration, control, and a self-correcting spill to clean up.',
    skillId: 'pouring-water',
    image: montessoriImages['pouring-set'],
  },
  {
    day: 4,
    area: 'Practical Life · Care of Self',
    title: 'Hand Washing',
    why: 'A long, ordered sequence the child can complete entirely alone.',
    skillId: 'hand-washing',
    image: careOfPerson,
  },
  {
    day: 5,
    area: 'Practical Life · Care of the Environment',
    title: 'Dusting a Shelf',
    why: 'Turns the child into a carer of the room — the root of belonging and responsibility.',
    skillId: 'dusting',
    image: cleaningTools,
  },
];


interface WeekOneStarterPathProps {
  completedSkills: string[];
  onSkillSelect: (skillId: string) => void;
}

const WeekOneStarterPath: React.FC<WeekOneStarterPathProps> = ({ completedSkills, onSkillSelect }) => {
  const doneCount = WEEK_ONE.filter(a => completedSkills.includes(a.skillId)).length;
  const allDone = doneCount === WEEK_ONE.length;
  const pct = Math.round((doneCount / WEEK_ONE.length) * 100);
  const next = WEEK_ONE.find(a => !completedSkills.includes(a.skillId)) ?? WEEK_ONE[0];

  if (allDone) return null;

  const isFirstTime = doneCount === 0;

  return (
    <section className="mb-8">
      <div className="flex items-end justify-between mb-4 gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25 text-[11px] font-semibold text-primary uppercase tracking-wider mb-2">
            <Sparkles className="h-3 w-3" />
            Start Here · Ages 3–6
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Your Week 1 Journey
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            {isFirstTime
              ? "Five carefully sequenced activities — one per day. Just open the app each morning and we'll tell you exactly what to do."
              : 'Keep going — one activity a day builds focus, coordination, and confidence.'}
          </p>
        </div>
        <div className="text-right min-w-[140px]">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Day {Math.min(doneCount + 1, WEEK_ONE.length)} of {WEEK_ONE.length}
          </p>
          <Progress value={pct} className="h-2 w-36" />
        </div>
      </div>

      {/* Featured next-up card */}
      <Card className="mb-4 overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <CardContent className="p-0">
          <div className="grid sm:grid-cols-5 gap-0">
            <div className="sm:col-span-2 aspect-[4/3] sm:aspect-auto overflow-hidden bg-muted">
              <img
                src={next.image}
                alt={next.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="sm:col-span-3 p-5 sm:p-6 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Day {next.day} · Up next
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-2">{next.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{next.why}</p>
              <Button
                onClick={() => onSkillSelect(next.skillId)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 self-start"
              >
                Start today's activity <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day strip */}
      <div className="grid grid-cols-5 gap-2">
        {WEEK_ONE.map((a) => {
          const done = completedSkills.includes(a.skillId);
          const isNext = a.skillId === next.skillId;
          return (
            <button
              key={a.day}
              onClick={() => onSkillSelect(a.skillId)}
              className={`group flex flex-col items-center text-center p-2 sm:p-3 rounded-xl border transition-all ${
                done
                  ? 'bg-secondary/15 border-secondary/40'
                  : isNext
                  ? 'bg-primary/10 border-primary/40 ring-2 ring-primary/20'
                  : 'bg-card border-border/60 hover:border-primary/30'
              }`}
              title={`${a.title} — ${a.area}`}
            >
              <div className="mb-1.5">
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                ) : (
                  <Circle className={`w-5 h-5 ${isNext ? 'text-primary' : 'text-muted-foreground/40'}`} />
                )}
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight">
                Day {a.day}
              </p>
              <p className="hidden sm:block text-[10px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">
                {a.title}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default WeekOneStarterPath;
