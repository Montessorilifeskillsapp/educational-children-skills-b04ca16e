import { describe, it, expect } from 'vitest';
import { roleAllows, resolvePolicies, DEFAULT_SEAT_LIMIT } from '../../../supabase/functions/school-portal/rules';

describe('school portal rules', () => {
  it('classrooms default to 30 places', () => { expect(DEFAULT_SEAT_LIMIT).toBe(30); });
  it('assistants cannot delete students or send reports', () => {
    expect(roleAllows('assistant', 'delete_student')).toBe(false);
    expect(roleAllows('assistant', 'send_report')).toBe(false);
  });
  it('assistants are view only: they cannot record progress or notes', () => { expect(roleAllows('assistant', 'record_progress')).toBe(false); expect(roleAllows('assistant', 'view')).toBe(true); expect(roleAllows('teacher', 'record_progress')).toBe(true); expect(roleAllows('school_admin', 'record_progress')).toBe(true); });
  it('only School Admins manage staff and classrooms', () => {
    expect(roleAllows('teacher', 'manage_school')).toBe(false);
    expect(roleAllows('school_admin', 'manage_school')).toBe(true);
  });
});

describe('removing staff', () => {
  it('only a School Admin may remove or re-role staff, including other School Admins', () => {
    expect(roleAllows('school_admin', 'manage_school')).toBe(true)
    expect(roleAllows('teacher', 'manage_school')).toBe(false)
    expect(roleAllows('assistant', 'manage_school')).toBe(false)
  })
})

describe('school-controlled staff permissions', () => {
  it('admins can let assistants record progress', () => {
    const p = resolvePolicies({ assistant: { record_progress: true } })
    expect(roleAllows('assistant', 'record_progress', p)).toBe(true)
    expect(roleAllows('assistant', 'send_report', p)).toBe(false)
  })
  it('admins can stop teachers sending reports', () => {
    expect(roleAllows('teacher', 'send_report', resolvePolicies({ teacher: { send_report: false } }))).toBe(false)
  })
  it('School Admins keep full access whatever the settings', () => {
    const p = resolvePolicies({ teacher: { record_progress: false } })
    expect(roleAllows('school_admin', 'record_progress', p)).toBe(true)
    expect(roleAllows('teacher', 'manage_school', resolvePolicies({ teacher: { manage_school: true } }))).toBe(false)
  })
  it('staff see only assigned classrooms unless the admin widens it', () => {
    expect(resolvePolicies({}).staff_scope).toBe('assigned')
    expect(resolvePolicies({ staff_scope: 'school' }).staff_scope).toBe('school')
  })
})
