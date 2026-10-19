import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import SchoolReturnBar, { rememberSchoolReturn } from '@/components/school/SchoolReturnBar';
import { useActivityParam } from '@/hooks/useActivityParam';
import { allowSchoolNavigation, schoolReturnTarget, SCHOOL_LEAVE_EVENT } from '@/components/school/navigation';

function Page() {
  const location = useLocation();
  const [, select] = useActivityParam();
  return <><SchoolReturnBar /><button onClick={() => select('')}>Activity back</button><output aria-label="Location">{location.pathname}{location.search}</output></>;
}
afterEach(() => { cleanup(); sessionStorage.clear(); vi.restoreAllMocks(); });
describe('school app navigation', () => {
  it('keeps return available after browsing another app page without the school marker', () => {
    rememberSchoolReturn('/school?tab=progress&recordStudent=alex&recordActivity=pink-tower');
    render(<MemoryRouter initialEntries={['/botany']}><Page /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Return to School Portal' }));
    expect(screen.getByLabelText('Location')).toHaveTextContent('/school?tab=progress&recordStudent=alex&recordActivity=pink-tower');
  });
  it('returns activity Back directly to the saved portal spot', () => {
    rememberSchoolReturn('/school?room=room&tab=planning');
    render(<MemoryRouter initialEntries={['/math?activity=golden-beads&from=school']}><Page /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Activity back' }));
    expect(screen.getByLabelText('Location')).toHaveTextContent('/school?room=room&tab=planning');
  });
  it('keeps ordinary family activity Back in the curriculum section', () => {
    render(<MemoryRouter initialEntries={['/math?activity=golden-beads']}><Page /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Activity back' }));
    expect(screen.getByLabelText('Location')).toHaveTextContent('/math');
    expect(screen.getByLabelText('Location')).not.toHaveTextContent('activity=');
  });
  it('rejects saved destinations outside the portal', () => {
    rememberSchoolReturn('//external.example');
    expect(schoolReturnTarget()).toBe('/school');
  });
  it('allows a draft guard to cancel leaving the portal', () => {
    const guard = (event: Event) => event.preventDefault();
    window.addEventListener(SCHOOL_LEAVE_EVENT, guard);
    expect(allowSchoolNavigation()).toBe(false);
    window.removeEventListener(SCHOOL_LEAVE_EVENT, guard);
    expect(allowSchoolNavigation()).toBe(true);
  });
});