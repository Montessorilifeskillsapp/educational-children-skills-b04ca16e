import { describe, it, expect } from 'vitest';
import { previewWindow } from './songPreview';

describe('previewWindow', () => {
  it('takes 10 seconds from the middle of a 3-minute song', () => {
    expect(previewWindow(180)).toEqual({ start: 85, end: 95 });
  });
  it('plays a short clip from the start when under 10 seconds', () => {
    expect(previewWindow(8)).toEqual({ start: 0, end: 8 });
  });
});
