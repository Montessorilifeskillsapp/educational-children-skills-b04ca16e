import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Rule: the Sign Out button lives only in the homepage side menu, below Start Free.
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === '__tests__' ? [] : files(p);
    return /\.tsx?$/.test(f) ? [p] : [];
  });
}

describe('Sign Out placement', () => {
  it('only the homepage uses the Sign Out action', () => {
    const users = files('src').filter((p) => !p.endsWith(join('lib', 'signOut.ts')) && readFileSync(p, 'utf8').includes('signOutAndReset('));
    expect(users).toEqual([join('src', 'components', 'Home.tsx')]);
  });

  it('appears once, after Start Free in the side menu', () => {
    const src = readFileSync('src/components/Home.tsx', 'utf8');
    expect(src.match(/signOutAndReset\(\)/g)).toHaveLength(1);
    const sheet = src.slice(src.indexOf('<SheetContent'), src.indexOf('</SheetContent>'));
    expect(sheet.indexOf("t('common.startFree')")).toBeGreaterThan(-1);
    expect(sheet.indexOf('signOutAndReset()')).toBeGreaterThan(sheet.indexOf("t('common.startFree')"));
  });
});
