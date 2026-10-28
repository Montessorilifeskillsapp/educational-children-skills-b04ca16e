import { describe, expect, it } from 'vitest';
import { orderedSkills } from './curriculum';
import { CROSSWALK, STANDARDS } from './standardsCrosswalk';
import { crosswalkHtml } from './crosswalkReport';

describe('standards crosswalk', () => {
  it('covers every curriculum activity', () => {
    const missing = orderedSkills().filter((s) => !CROSSWALK[s.title]).map((s) => s.title);
    expect(missing).toEqual([]);
  });
  it('cites only standards defined in the catalog', () => {
    const unknown = Object.values(CROSSWALK).flatMap((c) => c.codes).filter((c) => !STANDARDS[c]);
    expect(unknown).toEqual([]);
  });
  it('labels CCSS only for Math and ELA', () => {
    for (const st of Object.values(STANDARDS)) {
      if (st.framework.startsWith('CCSS')) expect(st.code).toMatch(/^(K|[1-4])\.(CC|OA|NBT|MD|G|NF)\.|^MP\.|^(RL|RF|W|SL|L)\.(K|1)/);
    }
  });
  it('marks Grade 1+ content as an extension', () => {
    expect(CROSSWALK['Stamp Game'].alignment).toBe('extension');
    expect(CROSSWALK['Teen Boards'].alignment).toBe('direct');
    expect(CROSSWALK['Pouring Water'].alignment).toBe('indirect');
  });
  it('builds the printable document', () => {
    expect(crosswalkHtml('Test School')).toContain('K.NBT.A.1');
  });
});
