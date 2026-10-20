// Gmail daily sending limit for a regular Gmail account (rolling 24 hours).
export const GMAIL_DAILY_LIMIT = 500
// Warn the owner once the account reaches 80% of the limit.
export const WARNING_THRESHOLD = 400
export const WARNING_SUBJECT = 'Montessori Life Skills: email sending limit almost reached'

export type QuotaLevel = 'ok' | 'warning' | 'limit'

export function quotaLevel(sentLast24h: number): QuotaLevel {
  if (sentLast24h >= GMAIL_DAILY_LIMIT) return 'limit'
  if (sentLast24h >= WARNING_THRESHOLD) return 'warning'
  return 'ok'
}
