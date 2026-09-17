import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MaterialAlternativesPage from '@/pages/MaterialAlternativesPage';
import type { MaterialLink } from '@/hooks/useMaterialLinks';

const state: { byKey: Map<string, MaterialLink> } = { byKey: new Map() };

vi.mock('@/hooks/useMaterialLinks', () => ({
  useMaterialLinks: () => ({
    links: [],
    byKey: state.byKey,
    getLink: () => undefined,
    loading: false,
    error: null,
  }),
}));

function renderPage(key: string) {
  return render(
    <MemoryRouter initialEntries={[`/materials/${key}`]}>
      <Routes>
        <Route path="/materials/:materialKey" element={<MaterialAlternativesPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('MaterialAlternativesPage', () => {
  beforeEach(() => {
    state.byKey = new Map();
  });

  it('shows general encouragement when nothing has been written', () => {
    renderPage('work-mat');
    expect(screen.getByText('Use what you already have')).toBeInTheDocument();
    expect(screen.getByText('How to gather it at home')).toBeInTheDocument();
  });

  it('shows the saved suggestions when they exist', () => {
    state.byKey.set('work-mat', {
      id: '1',
      material_key: 'work-mat',
      display_name: 'Work mat',
      amazon_url: null,
      notes: null,
      active: true,
      affiliate_tag: null,
      vendor: null,
      home_alternatives: 'A rolled bath mat or a small rug works perfectly.',
    });
    renderPage('work-mat');
    expect(screen.getByText('Ideas for this material')).toBeInTheDocument();
    expect(
      screen.getByText('A rolled bath mat or a small rug works perfectly.')
    ).toBeInTheDocument();
  });
});
