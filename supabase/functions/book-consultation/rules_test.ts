import { assertEquals } from 'jsr:@std/assert@1'
import { BookingSchema, OWNER_EMAIL, packageLabel } from './rules.ts'

Deno.test('requests are delivered to the single contact inbox', () => {
  assertEquals(OWNER_EMAIL, 'montessorilifeskills@gmail.com')
})

Deno.test('single session is $225 and three sessions are $600', () => {
  assertEquals(packageLabel('single'), 'Single session ($225)')
  assertEquals(packageLabel('bundle'), 'Three-session package ($600)')
})

Deno.test('a request needs a name, valid email and topics', () => {
  assertEquals(BookingSchema.safeParse({ name: '', email: 'a@b.co', package: 'single', topics: 'x' }).success, false)
  assertEquals(BookingSchema.safeParse({ name: 'A', email: 'not-an-email', package: 'single', topics: 'x' }).success, false)
  assertEquals(BookingSchema.safeParse({ name: 'A', email: 'a@b.co', package: 'single', topics: '  ' }).success, false)
  assertEquals(BookingSchema.safeParse({ name: 'A', email: 'A@B.co', package: 'single', topics: 'Help' }).success, true)
})

Deno.test('unknown packages and extra fields are rejected', () => {
  assertEquals(BookingSchema.safeParse({ name: 'A', email: 'a@b.co', package: 'free', topics: 'x' }).success, false)
  assertEquals(BookingSchema.safeParse({ name: 'A', email: 'a@b.co', package: 'single', topics: 'x', admin: true }).success, false)
})
