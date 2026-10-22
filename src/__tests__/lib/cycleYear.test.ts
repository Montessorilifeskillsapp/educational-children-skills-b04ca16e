import { describe, it, expect } from 'vitest';
import { cycleYear } from '@/components/school/ClassroomPulse';

const now = new Date(2026, 9, 22);
describe('cycleYear', () => {
  it('three on 1 September is first year', () => expect(cycleYear('2023-03-01', now)).toBe(1));
  it('four on 1 September is second year', () => expect(cycleYear('2022-03-01', now)).toBe(2));
  it('five on 1 September is third year', () => expect(cycleYear('2021-03-01', now)).toBe(3));
  it('missing birth date has no year', () => expect(cycleYear(null, now)).toBeNull());
});
