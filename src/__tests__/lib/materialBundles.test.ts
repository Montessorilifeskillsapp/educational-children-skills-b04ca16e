import { describe, expect, it } from 'vitest';
import {
  MATERIAL_BUNDLES,
  bundledParents,
  isBundledMaterial,
  resolveIncludedWith,
} from '@/lib/materialBundles';

describe('materialBundles', () => {
  it('names the product a material arrives inside', () => {
    expect(
      resolveIncludedWith('Natural wooden strips (1–18)', [
        'Subtraction strip board',
        'Blue strips (1–9)',
        'Number line',
      ])
    ).toBe('Subtraction strip board');
  });

  it('names whichever product is on the page being read', () => {
    expect(resolveIncludedWith('Blue strips (1–9)', ['Addition strip board', 'Number cards'])).toBe(
      'Addition strip board'
    );
    expect(
      resolveIncludedWith('Red strips (1–9)', ['Subtraction strip board', 'Number line'])
    ).toBe('Subtraction strip board');
  });

  it('falls back to the first declared product when none is listed', () => {
    expect(resolveIncludedWith('Blue strips (1–9)')).toBe('Addition strip board');
    expect(resolveIncludedWith('Bell damper', ['Work mat'])).toBe(
      'Montessori Bells (brown and white series)'
    );
  });

  it('accepts material keys as well as display names', () => {
    expect(resolveIncludedWith('mallet', ['montessori-bells-brown-and-white-series'])).toBe(
      'Montessori Bells (brown and white series)'
    );
  });

  it('leaves materials that are bought on their own unflagged', () => {
    expect(isBundledMaterial('Work mat')).toBe(false);
    expect(bundledParents('Golden bead ten bars')).toBeNull();
    expect(resolveIncludedWith('Colored bead stair (1–9)', ['Golden bead ten bars'])).toBeNull();
  });

  it('declares every bundled product with a usable name', () => {
    for (const [child, parents] of Object.entries(MATERIAL_BUNDLES)) {
      expect(child.trim()).toBe(child);
      expect(parents.length).toBeGreaterThan(0);
      for (const parent of parents) {
        expect(parent.trim()).toBe(parent);
        expect(isBundledMaterial(parent)).toBe(false);
      }
    }
  });
});
