import { describe, expect, it } from 'vitest';
import { cleanText, isCalendarDate, sameClassroom, containsOnlyClassroomStudents } from '../../../supabase/functions/school-portal/validation';

describe('school student data protection', () => {
  it('stores health and support notes as plain text while preserving line breaks', () => {
    expect(cleanText(' <b>Nut allergy</b>\u0000\nCarries inhaler ')).toBe('Nut allergy\nCarries inhaler');
  });
  it('rejects impossible calendar dates', () => {
    expect(isCalendarDate('2026-02-30')).toBe(false);
    expect(isCalendarDate('2024-02-29')).toBe(true);
    expect(isCalendarDate('2026-10-22')).toBe(true);
  });
  it('cannot move student records to another school', () => {
    expect(sameClassroom({ school_id: 'school-a', classroom_id: 'room-a' }, { school_id: 'school-b', classroom_id: 'room-a' })).toBe(false);
  });
  it('cannot silently transfer a student to another classroom', () => {
    expect(sameClassroom({ school_id: 'school-a', classroom_id: 'room-a' }, { school_id: 'school-a', classroom_id: 'room-b' })).toBe(false);
    expect(sameClassroom({ school_id: 'school-a', classroom_id: 'room-a' }, { school_id: 'school-a', classroom_id: 'room-a' })).toBe(true);
  });
  it('plans cannot include students outside their classroom', () => {
    expect(containsOnlyClassroomStudents(['child-a', 'child-b'], ['child-a'])).toBe(false);
    expect(containsOnlyClassroomStudents(['child-a'], ['child-a'])).toBe(true);
  });
  it('does not accept duplicate students in a group plan', () => {
    expect(containsOnlyClassroomStudents(['child-a', 'child-a'], ['child-a'])).toBe(false);
  });
});