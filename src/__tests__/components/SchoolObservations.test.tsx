import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProgressTab from '@/components/school/ProgressTab';
import { Progress } from '@/components/school/api';

const { call } = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock('@/components/school/api', () => ({ schoolCall: call }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));
vi.mock('@/components/school/curriculum', () => ({
  areas: () => [{ key: 'practical', title: 'Practical Life' }],
  orderedSkills: () => [{ id: 'pouring', title: 'Pouring Water', areaKey: 'practical' }],
}));
const students = [
  { id: 'child-a', classroom_id: 'room', name: 'Alex', archived: false, date_of_birth: null, family_email: null },
  { id: 'child-b', classroom_id: 'room', name: 'Sam', archived: false, date_of_birth: null, family_email: null },
];
function mount(canEdit = true, progress: Progress[] = []) {
  return render(<ProgressTab students={students} progress={progress} canEdit={canEdit} nameOf={() => 'Teacher'} onChange={vi.fn()} onOpenStudent={vi.fn()} />);
}
afterEach(() => { cleanup(); vi.clearAllMocks(); vi.restoreAllMocks(); });
describe('student observation recording', () => {
  it('does not write when selecting an observation; saves the selected child and note only on submission', async () => {
    call.mockResolvedValue({}); mount();
    fireEvent.click(screen.getByRole('radio', { name: /Practising/ }));
    fireEvent.change(screen.getByLabelText('Observation notes'), { target: { value: 'Repeated pouring without spilling.' } });
    expect(call).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Save observation' }));
    await waitFor(() => expect(call).toHaveBeenCalledWith({ action: 'progress_set', student_id: 'child-a', skill_id: 'pouring', status: 'practising', note: 'Repeated pouring without spilling.' }));
  });
  it('switches students without carrying the previous child record into the next save', async () => {
    call.mockResolvedValue({}); mount(true, [{ id: 'record', student_id: 'child-a', skill_id: 'pouring', status: 'presented', note: 'Alex note', updated_by: 'teacher', presented_at: '2026-10-19', updated_at: '2026-10-19' }]);
    fireEvent.click(screen.getByRole('button', { name: 'Next student' }));
    expect(screen.getByLabelText('Observation notes')).toHaveValue('');
    fireEvent.click(screen.getByRole('radio', { name: /Working independently/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Save observation' }));
    await waitFor(() => expect(call).toHaveBeenCalledWith({ action: 'progress_set', student_id: 'child-b', skill_id: 'pouring', status: 'mastered', note: null }));
  });
  it('retains the unsaved note when saving fails and permits a retry', async () => {
    call.mockRejectedValueOnce(new Error('Connection lost')).mockResolvedValueOnce({}); mount();
    fireEvent.click(screen.getByRole('radio', { name: /Presented/ }));
    fireEvent.change(screen.getByLabelText('Observation notes'), { target: { value: 'Presentation given.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save observation' }));
    await screen.findByRole('alert');
    expect(screen.getByLabelText('Observation notes')).toHaveValue('Presentation given.');
    fireEvent.click(screen.getByRole('button', { name: 'Save observation' }));
    await waitFor(() => expect(call).toHaveBeenCalledTimes(2));
  });
  it('keeps an unsaved observation when student switching is cancelled', () => {
    mount();
    fireEvent.change(screen.getByLabelText('Observation notes'), { target: { value: 'Still observing Alex.' } });
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    fireEvent.click(screen.getByRole('button', { name: 'Next student' }));
    expect(confirm).toHaveBeenCalled();
    expect(screen.getByLabelText('Observation notes')).toHaveValue('Still observing Alex.');
    expect(call).not.toHaveBeenCalled();
  });
  it('does not offer editing to read-only assistants', () => {
    mount(false);
    expect(screen.queryByRole('button', { name: 'Save observation' })).not.toBeInTheDocument();
    expect(call).not.toHaveBeenCalled();
  });
});