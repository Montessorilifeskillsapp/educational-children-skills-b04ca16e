import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SchoolRecords from '@/components/family/SchoolRecords';

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { functions: { invoke } } }));
vi.mock('@/components/school/curriculum', () => ({ skillById: () => ({ title: 'Pouring Water' }) }));
describe('parent complete school record', () => {
  beforeEach(() => invoke.mockReset());
  it('shows school notes independently of whether a parent report includes them', async () => {
    invoke.mockResolvedValueOnce({ data: { students: [{ id: 'child-1', name: 'Test Child', school_name: 'Test School' }] }, error: null });
    invoke.mockResolvedValueOnce({ data: {
      student: { id: 'child-1', name: 'Test Child', school_name: 'Test School', date_of_birth: null, health_notes: 'Nut allergy' },
      observations: [{ id: 'note-1', observed_at: '2026-10-23', body: 'Child asked for help with pouring.', edited_at: null }],
      progress: [{ id: 'progress-1', skill_id: 'pouring-water', status: 'practising', note: 'Repeated with care.', updated_at: '2026-10-23' }],
      reports: [{ id: 'report-1', period_start: '2026-10-01', period_end: '2026-10-23', summary: { title: 'October report', body: 'Progress summary only.' } }],
    }, error: null });
    render(<SchoolRecords userId="parent-1" />);
    expect(await screen.findByText('Child asked for help with pouring.')).toBeInTheDocument();
    expect(invoke).toHaveBeenLastCalledWith('school-portal', { body: { action: 'parent_records', student_id: 'child-1' } });
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Health and allergies' }), { button: 0, ctrlKey: false });
    expect(await screen.findByText('Nut allergy')).toBeInTheDocument();
  });
  it('never displays records when the service denies access', async () => {
    invoke.mockResolvedValue({ data: null, error: new Error('Forbidden') });
    render(<SchoolRecords userId="unverified-parent" />);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Notes' })).not.toBeInTheDocument();
  });
});