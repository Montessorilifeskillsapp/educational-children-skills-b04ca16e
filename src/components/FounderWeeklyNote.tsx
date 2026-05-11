import React from 'react';
import founderKerry from '@/assets/founder-kerry-howard.png';
import { Calendar } from 'lucide-react';

/**
 * Weekly note from the founder.
 * To update: change `currentNote` each Sunday — that's the entire workflow.
 * (Later, this can be wired to a Supabase table so non-devs can edit.)
 */
const currentNote = {
  weekOf: 'Week of May 11, 2026',
  focus: 'Concentration',
  body: `This week's focus is concentration — the single most under-appreciated Montessori outcome. If your child finishes Pouring Water and immediately wants to do it again, do not interrupt. Repetition is the work. Quietly refill the pitcher and step back. The third or fourth round is when the magic happens.`,
  signoff: 'Kerry',
};

const FounderWeeklyNote: React.FC = () => {
  return (
    <section className="rounded-2xl border border-primary/15 bg-gradient-to-br from-card via-background to-primary/5 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={founderKerry}
          alt="Kerry Howard, AMI-trained 3–6 Primary Guide and founder"
          width={48} height={48}
          className="w-12 h-12 rounded-full object-cover border-2 border-card shadow-sm"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">A note from Kerry</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {currentNote.weekOf} · Focus: {currentNote.focus}
          </p>
        </div>
      </div>
      <p className="text-foreground/85 leading-relaxed text-[15px]">{currentNote.body}</p>
      <p className="mt-3 text-sm font-medium text-foreground/70 italic">— {currentNote.signoff}</p>
    </section>
  );
};

export default FounderWeeklyNote;
