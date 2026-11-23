import { describe, it, expect, vi } from 'vitest';
import { isStaleBuildError, reloadForNewVersion } from '@/lib/staleBuild';

function memStore() {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) };
}

describe('older published version recovery', () => {
  it('recognizes missing-screen errors from Chrome, Firefox and Safari', () => {
    expect(isStaleBuildError(new TypeError('Failed to fetch dynamically imported module: https://x/assets/A.js'))).toBe(true);
    expect(isStaleBuildError(new TypeError('error loading dynamically imported module'))).toBe(true);
    expect(isStaleBuildError(new TypeError('Importing a module script failed.'))).toBe(true);
  });

  it('ignores ordinary app errors', () => {
    expect(isStaleBuildError(new Error('Cannot read properties of undefined'))).toBe(false);
    expect(isStaleBuildError(undefined)).toBe(false);
  });

  it('reloads once, then not again within 10 seconds (no reload loop)', () => {
    const store = memStore();
    const reload = vi.fn();
    expect(reloadForNewVersion(store, 1_000_000, reload)).toBe(true);
    expect(reloadForNewVersion(store, 1_005_000, reload)).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
    expect(reloadForNewVersion(store, 1_011_000, reload)).toBe(true);
    expect(reload).toHaveBeenCalledTimes(2);
  });
});
