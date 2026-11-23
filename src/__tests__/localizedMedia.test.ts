import { describe, it, expect } from 'vitest';
import { pouringPhotoFor } from '@/lib/localizedMedia';

describe('language-matched pouring photo', () => {
  it('English, Spanish and German share the original photo', () => {
    expect(pouringPhotoFor('es')).toBe(pouringPhotoFor('en'));
    expect(pouringPhotoFor('de')).toBe(pouringPhotoFor('en'));
  });
  it('Kiswahili, Hindi and Chinese each have their own photo', () => {
    const set = new Set(['en', 'sw', 'hi', 'zh'].map(pouringPhotoFor));
    expect(set.size).toBe(4);
  });
});

import { localizedImageFor } from '@/lib/localizedMedia';
import greeting from '@/assets/materials/pl/greeting.jpg';

describe('language-matched activity photos', () => {
  it('English, Spanish and German keep the original activity photo', () => {
    for (const l of ['en', 'es', 'de']) expect(localizedImageFor(greeting, l)).toBe(greeting);
  });
  it('Kiswahili, Hindi and Chinese each show their own activity photo', () => {
    const set = new Set(['en', 'sw', 'hi', 'zh'].map((l) => localizedImageFor(greeting, l)));
    expect(set.size).toBe(4);
  });
});
