import { describe, it, expect } from 'vitest';
import { previewWindow } from './songPreview';

describe('previewWindow', () => {
  it('takes 15 seconds from the middle of a 3-minute song', () => {
    expect(previewWindow(180)).toEqual({ start: 82.5, end: 97.5 });
  });
  it('plays a short clip from the start when under 15 seconds', () => {
    expect(previewWindow(10)).toEqual({ start: 0, end: 10 });
  });
});
