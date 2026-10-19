import { describe, it, expect } from 'vitest';
import { roleAllows, DEFAULT_SEAT_LIMIT } from '../../../supabase/functions/school-portal/rules';

describe('school portal rules', () => {
  it('classrooms default to 30 places', () => { expect(DEFAULT_SEAT_LIMIT).toBe(30); });
  it('assistants cannot delete students or send reports', () => {
    expect(roleAllows('assistant', 'delete_student')).toBe(false);
    expect(roleAllows('assistant', 'send_report')).toBe(false);
  });
  it('assistants can record progress', () => { expect(roleAllows('assistant', 'record_progress')).toBe(true); });
  it('only School Admins manage staff and classrooms', () => {
    expect(roleAllows('teacher', 'manage_school')).toBe(false);
    expect(roleAllows('school_admin', 'manage_school')).toBe(true);
  });
});
