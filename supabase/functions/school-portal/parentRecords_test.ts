import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { parentOwnsRecord, exactEmailPattern } from './parentRecords.ts'

Deno.test('only the child’s own verified parent email may read their record', () => {
  assertEquals(parentOwnsRecord({ email: 'parent@example.org', email_confirmed_at: '2026-10-23' }, 'PARENT@example.org'), true)
  assertEquals(parentOwnsRecord({ email: 'other@example.org', email_confirmed_at: '2026-10-23' }, 'parent@example.org'), false)
  assertEquals(parentOwnsRecord({ email: 'parent@example.org' }, 'parent@example.org'), false)
  assertEquals(parentOwnsRecord({ email: 'parent@example.org', email_confirmed_at: '2026-10-23' }, null), false)
})
Deno.test('parent email lookup cannot match other families with wildcards', () => {
  assertEquals(exactEmailPattern('parent_%@example.org'), 'parent\\_\\%@example.org')
})