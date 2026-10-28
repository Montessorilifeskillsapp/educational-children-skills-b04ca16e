import { describe, it, expect } from 'vitest';
import { orderedSkills } from '@/components/school/curriculum';
import { CROSSWALK } from '@/components/school/standardsCrosswalk';
import { portfolioRows } from './homeschoolReport';

const mapped = orderedSkills().find((s) => (CROSSWALK[s.title]?.codes.length ?? 0) > 0)!;

describe('homeschool portfolio', () => {
  it('lists a completed activity under each of its standards', () => {
    const rows = portfolioRows([{ skill_id: mapped.id, skill_category: mapped.areaKey, completed_at: '2026-09-10T12:00:00Z' }], '2026-08-01', '2026-10-28');
    expect(rows.map((r) => r.code).sort()).toEqual([...CROSSWALK[mapped.title].codes].sort());
  });
  it('excludes activities completed outside the reporting period', () => {
    const rows = portfolioRows([{ skill_id: mapped.id, skill_category: mapped.areaKey, completed_at: '2026-07-31T12:00:00Z' }], '2026-08-01', '2026-10-28');
    expect(rows).toEqual([]);
  });
});
