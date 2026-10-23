import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentPanel from '@/components/school/StudentPanel';

const { call } = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock('@/components/school/api', () => ({ schoolCall: call, can: { recordProgress: () => true, sendReport: () => false, plan: () => false, editOthers: () => false } }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));
vi.mock('@/components/school/curriculum', () => {
  const skill = { id: 'pouring', title: 'Pouring Water', areaKey: 'practical-life', areaTitle: 'Practical Life', route: '/practical-life' };
  return { areas: () => [{ key: 'practical-life', title: 'Practical Life' }], orderedSkills: () => [skill], nextSuggestions: () => [], skillById: () => skill, skillLink: () => '/practical-life?activity=pouring' };
});
const alex = { id: 'alex', classroom_id: 'room', name: 'Alex', archived: false, date_of_birth: null, family_email: null };
function mount() {
  const onChange = vi.fn(); const onRecord = vi.fn();
  render(<MemoryRouter><StudentPanel role="teacher" userId="guide" student={alex} progress={[]} observations={[]} reports={[]} onClose={vi.fn()} onChange={onChange} onPlan={vi.fn()} onRecord={onRecord} schoolName="School" schoolEmail={null} classmates={[alex]} onSelect={vi.fn()} nameOf={() => 'Guide'} /></MemoryRouter>);
  return { onChange, onRecord };
}
afterEach(() => { cleanup(); vi.clearAllMocks(); });
describe('streamlined child workflow', () => {
  it('blocks duplicate note submissions while saving and clears only after success', async () => {
    let finish: ((value: unknown) => void) | undefined;
    call.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
    const { onChange } = mount();
    fireEvent.change(screen.getByLabelText('New observation'), { target: { value: 'Repeated pouring carefully.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
    expect(call).toHaveBeenCalledTimes(1);
    expect(call).toHaveBeenCalledWith({ action: 'observation_add', student_id: 'alex', body: 'Repeated pouring carefully.' });
    finish?.({});
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    expect(screen.getByLabelText('New observation')).toHaveValue('');
  });
  it('retains a note after failure for retry', async () => {
    call.mockRejectedValueOnce(new Error('Connection lost'));
    const { onChange } = mount();
    fireEvent.change(screen.getByLabelText('New observation'), { target: { value: 'Observed concentration.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save note' })).toBeEnabled());
    expect(screen.getByLabelText('New observation')).toHaveValue('Observed concentration.');
    expect(onChange).not.toHaveBeenCalled();
  });
  it('opens the shared recorder for the selected child and activity without writing', () => {
    const { onRecord } = mount();
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Progress' }), { button: 0, ctrlKey: false });
    fireEvent.click(screen.getByRole('button', { name: 'Record observation' }));
    expect(onRecord).toHaveBeenCalledWith('alex', expect.objectContaining({ id: 'pouring', areaKey: 'practical-life' }));
    expect(call).not.toHaveBeenCalled();
  });
});