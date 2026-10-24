import { addDays, addMonths, endOfMonth, format, startOfMonth, startOfWeek } from 'date-fns';

/** School plans are date-only values in the device's local calendar, never UTC timestamps. */
export const planDate = (date: Date) => format(date, 'yyyy-MM-dd');
export const schoolWeek = (date: Date) => startOfWeek(date, { weekStartsOn: 1 });
export const weekDays = (date: Date) => Array.from({ length: 5 }, (_, i) => addDays(schoolWeek(date), i));
export function monthDays(date: Date): Date[] {
  const start = schoolWeek(startOfMonth(date));
  const last = endOfMonth(date);
  const count = Math.ceil((Math.round((schoolWeek(last).getTime() - start.getTime()) / 864e5) + 7) / 7) * 7;
  return Array.from({ length: count }, (_, i) => addDays(start, i));
}
export const moveCalendar = (date: Date, view: 'week' | 'month', direction: number) => view === 'month' ? addMonths(date, direction) : addDays(date, direction * 7);

/** Reuse the portal's semantic accent families, consistently across cards and the activity picker. */
export function planAreaStyle(area?: string) {
  if (['math', 'geography', 'cultural'].includes(area ?? '')) return 'bg-accent/35 text-accent-foreground border-accent/60';
  if (['language', 'art', 'grace-courtesy'].includes(area ?? '')) return 'bg-secondary text-secondary-foreground border-secondary';
  return 'bg-primary/10 text-foreground border-primary/25';
}