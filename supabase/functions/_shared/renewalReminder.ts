// Annual renewal reminders for web (Stripe) subscribers.
// One email per subscription renewal date, sent 15–30 days before it renews.
// App Store / Google Play subscriptions are billed by the store and are not handled here.
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { ADDON_EXPAND, isAddonItem } from './childAddons.ts'

export const REMINDER_MIN_DAYS = 15
export const REMINDER_MAX_DAYS = 30
const DAY_MS = 86_400_000

/** True while the renewal is more than 15 and at most 30 days away. */
export function isReminderDue(periodEndSec: number, nowMs: number): boolean {
  const days = (periodEndSec * 1000 - nowMs) / DAY_MS
  return days > REMINDER_MIN_DAYS && days <= REMINDER_MAX_DAYS
}

// deno-lint-ignore no-explicit-any
type Sub = any

/** Annual plans that will renew (not already set to cancel). */
export function isRenewingAnnual(sub: Sub): boolean {
  if (sub?.cancel_at_period_end || sub?.cancel_at) return false
  const items = sub?.items?.data ?? []
  return items.some((i: Sub) => i?.price?.recurring?.interval === 'year')
}

/** Sum of every item on the subscription, in the smallest currency unit. */
export function renewalCents(sub: Sub): number {
  return (sub?.items?.data ?? []).reduce((t: number, i: Sub) => t + (i?.price?.unit_amount ?? 0) * (i?.quantity ?? 1), 0)
}

export function formatMoney(cents: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100)
}

export function planLabel(sub: Sub): string {
  const base = (sub?.items?.data ?? []).find((i: Sub) => !isAddonItem(i))
  const product = base?.price?.product
  const id = `${sub?.metadata?.planId ?? ''} ${product && typeof product === 'object' ? `${product.name ?? ''} ${product.metadata?.plan_id ?? ''}` : ''}`.toLowerCase()
  return id.includes('family') ? 'Family Annual' : 'Premium Annual'
}

export function renewalDateLabel(periodEndSec: number): string {
  return new Date(periodEndSec * 1000).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })
}

// deno-lint-ignore no-explicit-any
export async function sendRenewalReminders(admin: any, nowMs = Date.now()): Promise<number> {
  const key = Deno.env.get('STRIPE_SECRET_KEY')
  if (!key) { console.error('renewal reminders: STRIPE_SECRET_KEY missing'); return 0 }
  const stripe = new Stripe(key, { apiVersion: '2023-10-16', maxNetworkRetries: 1 })
  let sent = 0
  const subs = stripe.subscriptions.list({ status: 'active', limit: 100, expand: [...ADDON_EXPAND, 'data.customer'] })
  let seen = 0
  for await (const sub of subs) {
    if (++seen > 5000) break
    if (!isRenewingAnnual(sub) || !isReminderDue(sub.current_period_end, nowMs)) continue
    const customer = sub.customer as Sub
    const email = typeof customer === 'object' && !customer?.deleted ? customer?.email : null
    if (!email) continue
    const periodEnd = new Date(sub.current_period_end * 1000).toISOString()
    // Claim the reminder first so the hourly job can never send it twice.
    const { error: claimErr } = await admin.from('subscription_renewal_notices')
      .insert({ stripe_subscription_id: sub.id, period_end: periodEnd, email })
    if (claimErr) { if (claimErr.code !== '23505') console.error('renewal claim', claimErr); continue }
    const templateData = {
      plan: planLabel(sub),
      amount: formatMoney(renewalCents(sub), sub.currency),
      renewalDate: renewalDateLabel(sub.current_period_end),
    }
    const { data, error } = await admin.functions.invoke('send-transactional-email', {
      body: { templateName: 'renewal-reminder', recipientEmail: email, templateData },
    })
    if (error || data?.success === false) {
      console.error('renewal email', sub.id, error ?? data)
      // Release the claim so tomorrow's run tries again (still inside the window).
      await admin.from('subscription_renewal_notices').delete().eq('stripe_subscription_id', sub.id).eq('period_end', periodEnd)
      continue
    }
    sent++
  }
  return sent
}
