import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MaterialBundle, resolveMaterials } from '@/components/MaterialBundle';
import type { ActivityMaterial } from '@/lib/materials';

const materials: ActivityMaterial[] = [
  { key: 'subtraction-strip-board', displayName: 'Subtraction strip board', essential: true },
  { key: 'blue-strips-1-9', displayName: 'Blue strips (1–9)', essential: false },
  { key: 'work-mat', displayName: 'Work mat', essential: false },
];

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
    expect(screen.getAllByText('Source locally')).toHaveLength(1);
    expect(screen.queryByRole('link', { name: /Buy Blue strips/i })).not.toBeInTheDocument();
  });
});
