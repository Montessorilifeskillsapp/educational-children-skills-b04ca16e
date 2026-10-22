import { X } from 'lucide-react';
import { useAuthContext } from '@/components/AuthProvider';
import { setFocus, useFocusStudent } from './focusStudent';

const LABEL = { presented: 'Presented', practising: 'Practicing', mastered: 'Working independently' } as const;
const STYLE = {
  presented: 'bg-accent text-accent-foreground',
  practising: 'bg-secondary text-secondary-foreground',
  mastered: 'bg-primary text-primary-foreground',
} as const;

/** Status of the focused School Portal student for this activity. Renders nothing for families and visitors. */
export default function CardStatus({ skillId }: { skillId: string }) {
  const focus = useFocusStudent();
  const { user } = useAuthContext();
  if (!focus || !user) return null;
  const status = focus.statuses[skillId];
  return (
    <div className="flex justify-center mb-2" data-testid="school-card-status">
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${status ? STYLE[status] : 'bg-muted text-muted-foreground'}`}>
        {focus.name}: {status ? LABEL[status] : 'Not presented'}
      </span>
    </div>
  );
}

/** Small bar telling staff whose statuses the cards show, with a way to stop showing them. */
export function FocusBar() {
  const focus = useFocusStudent();
  const { user } = useAuthContext();
  if (!focus || !user) return null;
  return (
    <div className="mb-4 flex items-center justify-between gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground print:hidden">
      <span>Showing <strong>{focus.name}</strong>'s recorded progress on each activity.</span>
      <button type="button" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground" onClick={() => setFocus(null)} aria-label="Stop showing this student's progress">
        <X className="h-4 w-4" />Hide
      </button>
    </div>
  );
}
