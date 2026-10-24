import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlanningTab from '@/components/school/PlanningTab';
import { schoolCall, setSchoolPolicies } from '@/components/school/api';
import { monthDays, moveCalendar, planDate, weekDays } from '@/components/school/planningDates';

vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: { getSession: vi.fn() } } }));
vi.mock('@/components/school/offlineQueue', () => ({ configureQueue: vi.fn(), QUEUEABLE: new Set(), enqueue: vi.fn(), isConnectionError: vi.fn() }));
vi.mock('@/components/school/api', async (original) => ({ ...await original<typeof import('@/components/school/api')>(), schoolCall: vi.fn().mockResolvedValue({}) }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));

const classroom = { id: 'room-one', school_id: 'school-one', name: 'Maple classroom', seat_limit: 30 };
const students = [{ id: 'child-one', classroom_id: classroom.id, name: 'Alex Morgan', date_of_birth: null, family_email: null, archived: false }];
const basePlan = { id: 'lesson-one', classroom_id: classroom.id, plan_date: '2026-10-19', skill_id: 'pouring-water', student_ids: ['child-one'], notes: 'Presentation at the small table', done: false };
const onChange = vi.fn();
function show(role: 'school_admin' | 'teacher' | 'assistant' = 'school_admin', plans = [basePlan]) {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2026, 9, 19, 12));
  return render(<MemoryRouter><PlanningTab role={role} classroom={classroom} students={students} plans={plans} onChange={onChange} onInitialUsed={vi.fn()} /></MemoryRouter>);
}
afterEach(() => { cleanup(); vi.useRealTimers(); vi.clearAllMocks(); setSchoolPolicies(null); });

describe('School planner', () => {
  it('uses a Monday–Friday week and a full Monday–Sunday monthly grid', () => {
    expect(weekDays(new Date(2026, 9, 24)).map(planDate)).toEqual(['2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23']);
    const days = monthDays(new Date(2026, 9, 24));
    expect(planDate(days[0])).toBe('2026-09-28');
    expect(planDate(days[days.length - 1])).toBe('2026-11-01');
    expect(planDate(moveCalendar(new Date(2026, 0, 31), 'month', 1))).toBe('2026-02-28');
  });
  it('opens month dates and retains the selected date when adding a lesson', () => {
    show();
    fireEvent.click(screen.getByRole('button', { name: 'Month', exact: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Show lessons for Wednesday, October 21' }));
    fireEvent.click(within(screen.getByRole('region', { name: 'Selected day lessons' })).getByRole('button', { name: 'Add lesson' }));
    expect(screen.getByLabelText('Date')).toHaveValue('2026-10-21');
  });
  it('saves the chosen activity, individual student, date and notes through the existing service', async () => {
    show();
    fireEvent.click(screen.getByRole('button', { name: 'Add lesson for Tuesday, October 20' }));
    fireEvent.change(screen.getByLabelText('Activity'), { target: { value: 'pouring water' } });
    const activity = within(screen.getByRole('group', { name: 'Activities' })).getAllByRole('button')[0];
    fireEvent.click(activity);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Alex Morgan' }));
    fireEvent.change(screen.getByLabelText('Notes'), { target: { value: 'A quiet presentation' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save lesson' }));
    await waitFor(() => expect(schoolCall).toHaveBeenCalledWith({ action: 'plan_save', classroom_id: 'room-one', id: undefined, plan_date: '2026-10-20', skill_id: 'pouring-water', student_ids: ['child-one'], notes: 'A quiet presentation' }));
    expect(onChange).toHaveBeenCalledOnce();
  });
  it('edits existing lessons and requires confirmation before removing them', async () => {
    show();
    fireEvent.click(screen.getByRole('button', { name: /^Edit / }));
    expect(screen.getByLabelText('Notes')).toHaveValue('Presentation at the small table');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    fireEvent.click(screen.getByRole('button', { name: /^Remove / }));
    expect(schoolCall).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Remove lesson', exact: true }));
    await waitFor(() => expect(schoolCall).toHaveBeenCalledWith({ action: 'plan_delete', id: 'lesson-one' }));
  });
  it('shows no write controls to an assistant without planning or recording permission', () => {
    show('assistant');
    expect(screen.queryByRole('button', { name: /Add lesson|Edit |Remove |Mark as given/ })).not.toBeInTheDocument();
  });
  it('records given status without changing the lesson or classroom', async () => {
    show();
    fireEvent.click(screen.getByRole('button', { name: /^Mark as given:/ }));
    await waitFor(() => expect(schoolCall).toHaveBeenCalledWith({ action: 'plan_done', id: 'lesson-one', done: true }));
  });
  it('does not display plans belonging to another classroom', () => {
    show('school_admin', [{ ...basePlan, classroom_id: 'other-room', notes: 'Other classroom note' }]);
    expect(screen.queryByText('Other classroom note')).not.toBeInTheDocument();
  });
});