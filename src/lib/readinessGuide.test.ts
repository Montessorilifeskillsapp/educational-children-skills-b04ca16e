import { describe, it, expect } from 'vitest';
import { SAMPLE_LESSONS, standardsFor, readinessGuideHtml } from './readinessGuide';

describe('readiness guide', () => {
  it('every sample lesson cites at least one cataloged standard', () => {
    for (const lessons of Object.values(SAMPLE_LESSONS)) for (const l of lessons) expect(standardsFor(l.title).length, l.title).toBeGreaterThan(0);
  });
  it('quotes the Premium prices', () => {
    const html = readinessGuideHtml(4, 'https://x');
    expect(html).toContain('$199/year');
    expect(html).toContain('$29.99/month');
  });
});
