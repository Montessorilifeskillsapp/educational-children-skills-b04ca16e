import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { Body } from './body.ts'

const school = '00000000-0000-4000-8000-000000000001'
const member = '00000000-0000-4000-8000-000000000002'
Deno.test('student save preserves both parents full names', () => {
  const result = Body.parse({ action: 'student_save', classroom_id: school, name: 'Child', parent_one_full_name: 'Alex Morgan', parent_two_full_name: 'Sam Morgan' })
  if (result.action !== 'student_save') throw new Error('Wrong action')
  assertEquals(result.parent_one_full_name, 'Alex Morgan')
  assertEquals(result.parent_two_full_name, 'Sam Morgan')
})
Deno.test('student save preserves health notes and rejects private notes', () => {
  const result = Body.safeParse({ action: 'student_save', classroom_id: school, name: 'Child', health_notes: 'Nut allergy' })
  assertEquals(result.success, true)
  if (result.success && result.data.action === 'student_save') {
    assertEquals(result.data.health_notes, 'Nut allergy')
  }
})
Deno.test('student save rejects separate private notes', () => {
  assertEquals(Body.safeParse({ action: 'student_save', classroom_id: school, name: 'Child', support_notes: 'x' }).success, false)
})
Deno.test('classroom save preserves age group and Lead Guide', () => {
  const result = Body.safeParse({ action: 'classroom_save', school_id: school, name: 'Classroom', age_group: '3–6 years', lead_member_id: member })
  assertEquals(result.success, true)
  if (result.success && result.data.action === 'classroom_save') {
    assertEquals(result.data.age_group, '3–6 years')
    assertEquals(result.data.lead_member_id, member)
  }
})
Deno.test('school profile action accepts required official email', () => {
  assertEquals(Body.safeParse({ action: 'school_profile_save', school_id: school, name: 'School', contact_email: 'office@example.org' }).success, true)
  assertEquals(Body.safeParse({ action: 'school_profile_save', school_id: school, name: 'School' }).success, false)
})
Deno.test('schema drift and reversed report dates are rejected', () => {
  assertEquals(Body.safeParse({ action: 'student_save', classroom_id: school, name: 'Child', unexpected: 'ignored?' }).success, false)
  assertEquals(Body.safeParse({ action: 'report_record', student_id: member, period_start: '2026-10-22', period_end: '2026-10-01', title: 'Report', body: 'Notes' }).success, false)
})
Deno.test('permanent deletion requires explicit confirmation', () => {
  assertEquals(Body.safeParse({ action: 'student_delete', id: member }).success, false)
  assertEquals(Body.safeParse({ action: 'student_delete', id: member, confirmation: 'DELETE' }).success, true)
})
Deno.test('app Gmail report sending is not an available school action', () => {
  assertEquals(Body.safeParse({ action: 'report_send', student_id: member }).success, false)
})