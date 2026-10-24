import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ProgressTab from '@/components/school/ProgressTab';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';

vi.mock('@/components/school/api', () => ({ schoolCall: vi.fn() }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));

function Location() {
  const location = useLocation();
  return <output aria-label="Current location">{location.pathname}{location.search}</output>;
}

afterEach(cleanup);

describe('Record activity selection', () => {
  it.each(curriculumSectionsForMaterials)('makes every $title activity selectable and opens its guide', (section) => {
    render(<MemoryRouter initialEntries={[`/school?tab=progress&area=${section.key}`]}>
      <ProgressTab students={[{ id: 'test-child', classroom_id: 'test-room', name: 'Test child', archived: false, date_of_birth: null, family_email: null }]}
        progress={[]} canEdit={false} nameOf={() => 'Test teacher'} onChange={vi.fn()} onOpenStudent={vi.fn()} />
      <Location />
    </MemoryRouter>);
    const buttons = within(screen.getByRole('navigation', { name: 'Activities' })).getAllByRole('button');
    const ids = Object.keys(section.skills);
    expect(buttons).toHaveLength(ids.length);
    for (const button of buttons) {
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    }
    fireEvent.click(screen.getByRole('button', { name: 'Open activity guide' }));
    expect(screen.getByLabelText('Current location')).toHaveTextContent(`${section.route}?activity=${encodeURIComponent(ids[ids.length - 1])}&from=school`);
  });
});