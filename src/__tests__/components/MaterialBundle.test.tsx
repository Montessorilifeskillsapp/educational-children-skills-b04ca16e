import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MaterialBundle, resolveMaterials } from '@/components/MaterialBundle';
import type { ActivityMaterial } from '@/lib/materials';
import type { MaterialLink } from '@/hooks/useMaterialLinks';

const materials: ActivityMaterial[] = [
  { key: 'subtraction-strip-board', displayName: 'Subtraction strip board', essential: true },
  { key: 'blue-strips-1-9', displayName: 'Blue strips (1–9)', essential: false },
  { key: 'work-mat', displayName: 'Work mat', essential: false },
];

function linkMap(entries: Array<Partial<MaterialLink> & { material_key: string }>) {
  const map = new Map<string, MaterialLink>();
  for (const entry of entries) {
    map.set(entry.material_key, {
      id: entry.material_key,
      material_key: entry.material_key,
      display_name: null,
      amazon_url: null,
      notes: null,
      active: true,
      affiliate_tag: null,
      vendor: null,
      ...entry,
    } as MaterialLink);
  }
  return map;
}

describe('MaterialBundle included-with notes', () => {
  it('flags materials that arrive inside another product', () => {
    const resolved = resolveMaterials(materials, new Map());
    const strips = resolved.find((m) => m.key === 'blue-strips-1-9');
    expect(strips?.includedWith).toBe('Subtraction strip board');
    expect(resolved.find((m) => m.key === 'work-mat')?.includedWith).toBeNull();
  });

  it('shows the note in place of "Source locally" and adds no buy link', () => {
    render(<MaterialBundle title="Suggested materials" materials={resolveMaterials(materials, new Map())} />);
    expect(screen.getByText('Included with Subtraction strip board')).toBeInTheDocument();
    // The board and the mat are bought separately, the strips arrive in the box.
    expect(screen.getAllByText('Source locally')).toHaveLength(2);
    expect(screen.queryByRole('link', { name: /Buy Blue strips/i })).not.toBeInTheDocument();
  });

  it('borrows the parent product link when the child has none', () => {
    const links = linkMap([
      { material_key: 'subtraction-strip-board', amazon_url: 'https://www.amazon.com/dp/B000BOARD' },
    ]);
    const resolved = resolveMaterials(materials, links);
    const strips = resolved.find((m) => m.key === 'blue-strips-1-9');

    expect(strips?.inheritedFrom).toBe('Subtraction strip board');
    expect(strips?.amazonUrl).toContain('B000BOARD');
    expect(strips?.amazonUrl).toContain('kerryhoward-20');

    render(<MaterialBundle title="Suggested materials" materials={resolved} />);
    const link = screen.getByRole('link', { name: /Buy Subtraction strip board on/i });
    expect(link).toHaveAttribute('href', strips?.amazonUrl);
    expect(screen.getByText('Included with Subtraction strip board')).toBeInTheDocument();
  });

  it('keeps the plain note when the parent product has no link yet', () => {
    const resolved = resolveMaterials(materials, new Map());
    expect(resolved.find((m) => m.key === 'blue-strips-1-9')?.amazonUrl).toBeNull();
  });

  it('never points "Buy all" at a borrowed parent link', () => {
    const links = linkMap([
      { material_key: 'subtraction-strip-board', amazon_url: 'https://www.amazon.com/dp/B000BOARD' },
    ]);
    render(<MaterialBundle title="Suggested materials" materials={resolveMaterials(materials, links)} />);
    const buyAll = screen.getByRole('link', { name: /Buy materials on/i });
    expect(buyAll).toHaveAttribute('href', expect.stringContaining('B000BOARD'));
  });
});
