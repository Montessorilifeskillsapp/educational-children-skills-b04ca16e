import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// App text uses two shared shades: main text (text-foreground) and softer text
// (text-muted-foreground). Only small hints may use a faded softer shade.
// The homepage footer sits on a dark band and keeps its own light greys.
const root = join(process.cwd(), 'src');
const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === '__tests__' ? [] : files(p);
    return /\.tsx?$/.test(name) ? [p] : [];
  });

const strayGrey = /\btext-(gray|slate|zinc|neutral|stone)-\d{2,3}\b|\btext-black\b/;
const fadedMainText = /\btext-foreground\/(60|70|75|80|85|90|95)\b/;

const offending = (pattern: RegExp) =>
  files(root).flatMap((file) => {
    const lines = readFileSync(file, 'utf8').split('\n');
    let inFooter = false;
    return lines.flatMap((line, i) => {
      if (file.endsWith('Home.tsx') && line.includes('<footer')) inFooter = true;
      if (inFooter && line.includes('</footer>')) { inFooter = false; return []; }
      return !inFooter && pattern.test(line) ? [`${file.replace(root, 'src')}:${i + 1}`] : [];
    });
  });

describe('uniform text shades', () => {
  it('uses no fixed grey or black text colors outside the dark footer', () => {
    expect(offending(strayGrey)).toEqual([]);
  });

  it('does not fade the main text shade for body copy', () => {
    expect(offending(fadedMainText)).toEqual([]);
  });
});
