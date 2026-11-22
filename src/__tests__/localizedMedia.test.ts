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
