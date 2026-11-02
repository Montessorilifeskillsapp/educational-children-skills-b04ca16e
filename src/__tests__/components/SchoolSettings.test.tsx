import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import StaffTab from '@/components/school/StaffTab';
import StaffPolicies from '@/components/school/StaffPolicies';
const { call } = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock('@/components/school/api', async (original) => ({ ...await original<typeof import('@/components/school/api')>(), schoolCall: call }));
vi.mock('@/components/AuthProvider', () => ({ useAuthContext: () => ({ user: { id: 'admin' } }) }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

it('shows late-loaded school information, saves once, and keeps it on refresh', async () => {
  const base = { schoolId: 'school', members: [], invites: [], classrooms: [], staff: [], onChange: vi.fn() };
  const { rerender } = render(<StaffTab {...base} />);
  rerender(<StaffTab {...base} schoolName="School" schoolEmail="school@example.org" />);
  expect(screen.getByLabelText('School name')).toHaveValue('School');
  fireEvent.change(screen.getByLabelText('School name'), { target: { value: 'New School' } });
  call.mockResolvedValue({ ok: true });
  fireEvent.click(screen.getByRole('button', { name: 'Save profile' }));
  await waitFor(() => expect(call).toHaveBeenCalledWith({ action: 'school_profile_save', school_id: 'school', name: 'New School', contact_email: 'school@example.org' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Save profile' })).toBeDisabled());
  rerender(<StaffTab {...base} schoolName="New School" schoolEmail="school@example.org" />);
  expect(screen.getByLabelText('School name')).toHaveValue('New School');
  expect(call).toHaveBeenCalledTimes(1);
});

it('keeps permission edits on server refresh and acknowledges a successful save', async () => {
  const onSaved = vi.fn();
  const { rerender } = render(<StaffPolicies schoolId="school" policies={{ staff_scope: 'assigned' }} onSaved={onSaved} />);
  fireEvent.click(screen.getByRole('switch', { name: 'Teachers: Plan lessons' }));
  const choice = screen.getByRole('switch', { name: 'Teachers: Plan lessons' }).getAttribute('aria-checked');
  rerender(<StaffPolicies schoolId="school" policies={{ staff_scope: 'school' }} onSaved={onSaved} />);
  expect(screen.getByRole('switch', { name: 'Teachers: Plan lessons' })).toHaveAttribute('aria-checked', choice);
  call.mockResolvedValue({ ok: true });
  fireEvent.click(screen.getByRole('button', { name: 'Save permissions' }));
  await waitFor(() => expect(onSaved).toHaveBeenCalledTimes(1));
  expect(screen.getByRole('button', { name: 'Save permissions' })).toBeDisabled();
});