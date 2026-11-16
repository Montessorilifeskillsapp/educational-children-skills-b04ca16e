import { assert, assertEquals, assertFalse } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { formatMoney, isRenewingAnnual, isReminderDue, planLabel, renewalCents } from './renewalReminder.ts'

const NOW = Date.UTC(2026, 10, 16)
const inDays = (d: number) => (NOW + d * 86_400_000) / 1000

Deno.test('reminder is due 15–30 days before renewal, not earlier or later', () => {
  assertFalse(isReminderDue(inDays(31), NOW))
  assert(isReminderDue(inDays(30), NOW))
  assert(isReminderDue(inDays(16), NOW))
  assertFalse(isReminderDue(inDays(15), NOW))
  assertFalse(isReminderDue(inDays(3), NOW))
})

const annual = (extra: Record<string, unknown> = {}, items: Record<string, unknown>[] = [{ price: { unit_amount: 19900, recurring: { interval: 'year' }, product: { name: 'Premium Annual' } }, quantity: 1 }]) =>
  ({ items: { data: items }, metadata: {}, ...extra })

Deno.test('only annual plans that will renew get a reminder', () => {
  assert(isRenewingAnnual(annual()))
  assertFalse(isRenewingAnnual(annual({ cancel_at_period_end: true })))
  assertFalse(isRenewingAnnual(annual({}, [{ price: { unit_amount: 2999, recurring: { interval: 'month' }, product: {} }, quantity: 1 }])))
})

Deno.test('reminder states the renewal price: $199 Premium, $349 Family', () => {
  assertEquals(formatMoney(renewalCents(annual()), 'usd'), '$199.00')
  assertEquals(planLabel(annual()), 'Premium Annual')
  const fam = annual({}, [{ price: { unit_amount: 34900, recurring: { interval: 'year' }, product: { name: 'Family Annual' } }, quantity: 1 }])
  assertEquals(formatMoney(renewalCents(fam), 'usd'), '$349.00')
  assertEquals(planLabel(fam), 'Family Annual')
})
