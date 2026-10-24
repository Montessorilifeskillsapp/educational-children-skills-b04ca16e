import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import RosterTab from '@/components/school/RosterTab';
import { setSchoolPolicies, type SchoolRole } from '@/components/school/api';

const { call } = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock('@/components/school/api', async (original) => ({ ...await original<typeof import('@/components/school/api')>(), schoolCall: call }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));
const student = { id: 'child', classroom_id: 'room', name: 'Child', date_of_birth: '2022-01-01', family_email: 'family@example.org', parent_one_full_name: 'Alex Morgan', parent_two_full_name: 'Sam Morgan', archived: false, health_notes: 'Nut allergy' };
function mount(role: SchoolRole) {
  setSchoolPolicies({ teacher: { edit_roster: true }, assistant: { edit_roster: true } });
  render(<RosterTab role={role} classroom={{ id: 'room', school_id: 'school', name: 'Classroom', seat_limit: 30 }} students={[student]} seatLimit={30} schoolName="School" onChange={vi.fn()} onOpenStudent={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: role === 'school_admin' ? 'Edit' : 'Child information' }));
}
afterEach(() => { cleanup(); vi.clearAllMocks(); setSchoolPolicies({}); });
it.each(['teacher', 'assistant'] as const)('%s can read both parents and child details but cannot edit or save', (role) => {
  mount(role);
  expect(screen.getByLabelText('Parent 1 first name')).toHaveValue('Alex');
  expect(screen.getByLabelText('Parent 1 surname')).toHaveValue('Morgan');
  expect(screen.getByLabelText('Parent 2 first name')).toHaveValue('Sam');
  expect(screen.getByLabelText('Parent 2 surname')).toHaveValue('Morgan');
  for (const label of ['Student first name', 'Student surname', 'Birth date', 'Parent 1 first name', 'Parent 1 surname', 'Parent 2 first name', 'Parent 2 surname', 'Family email (for reports)', 'Health and allergies (staff only)']) {
    expect(screen.getByLabelText(label)).toHaveAttribute('readonly');
  }
  expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
  expect(call).not.toHaveBeenCalled();
});
it('School Admin saves both parents full names with the child information', async () => {
  call.mockResolvedValue({});
  mount('school_admin');
  fireEvent.change(screen.getByLabelText('Student first name'), { target: { value: 'Jamie' } });
  fireEvent.change(screen.getByLabelText('Student surname'), { target: { value: 'Morgan' } });
  fireEvent.change(screen.getByLabelText('Parent 1 first name'), { target: { value: 'Taylor' } });
  fireEvent.change(screen.getByLabelText('Parent 2 first name'), { target: { value: 'Jordan' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(call).toHaveBeenCalledWith(expect.objectContaining({ action: 'student_save', name: 'Jamie Morgan', parent_one_full_name: 'Taylor Morgan', parent_two_full_name: 'Jordan Morgan' })));
});