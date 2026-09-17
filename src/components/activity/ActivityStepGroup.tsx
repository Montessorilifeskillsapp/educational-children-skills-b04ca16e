import React from 'react';
import { Check } from 'lucide-react';

export interface ActivityStep {
  id: string;
  instruction: string;
  completed: boolean;
}

export interface StepPhase {
  key: string;
  label: string;
  hint: string;
  steps: ActivityStep[];
}

const PHASES: { key: string; prefix: string; label: string; hint: string }[] = [
  {
    key: 'presentation',
    prefix: 'presentation-',
    label: 'Show the child',
    hint: 'Present slowly and silently, one movement at a time.',
  },
  {
    key: 'guided',
    prefix: 'guided-',
    label: 'Guide their practice',
    hint: 'Step back and offer help only when it is needed.',
  },
  {
    key: 'independent',
    prefix: 'independent-',
    label: 'Signs of mastery',
    hint: 'What you will notice when the work is truly theirs.',
  },
];

/**
 * Splits a flat step list into the three Montessori phases. Steps that do not
 * carry a phase prefix fall into a single unlabelled group so nothing is lost.
 */
export function groupSteps(steps: ActivityStep[]): StepPhase[] {
  const groups: StepPhase[] = [];

  for (const phase of PHASES) {
    const matching = steps.filter((s) => s.id.startsWith(phase.prefix));
    if (matching.length > 0) {
      groups.push({ key: phase.key, label: phase.label, hint: phase.hint, steps: matching });
    }
  }

  const claimed = new Set(groups.flatMap((g) => g.steps.map((s) => s.id)));
  const rest = steps.filter((s) => !claimed.has(s.id));
  if (rest.length > 0) {
    groups.push({ key: 'steps', label: 'Show the child', hint: 'Present slowly and silently, one movement at a time.', steps: rest });
  }

  return groups;
}

interface ActivityStepsProps {
  steps: ActivityStep[];
  onToggle: (stepId: string) => void;
}

export const ActivitySteps: React.FC<ActivityStepsProps> = ({ steps, onToggle }) => {
  const groups = groupSteps(steps);
  if (groups.length === 0) return null;

  return (
    <div className="space-y-6 mb-8">
      {groups.map((group) => (
        <section key={group.key}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {group.label}
          </h2>
          {group.hint && <p className="mt-0.5 text-sm text-muted-foreground/80">{group.hint}</p>}

          <ol className="mt-3 rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
            {group.steps.map((step, index) => (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => onToggle(step.id)}
                  aria-pressed={step.completed}
                  className="w-full flex items-start gap-3 text-left px-3 py-2.5 hover:bg-muted/50 transition-colors"
                >
                  <span
                    className={`mt-0.5 w-6 h-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-semibold ${
                      step.completed
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {step.completed ? <Check className="w-3.5 h-3.5" /> : index + 1}
                  </span>
                  <span
                    className={`text-sm sm:text-base leading-snug ${
                      step.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}
                  >
                    {step.instruction}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
};

export default ActivitySteps;
