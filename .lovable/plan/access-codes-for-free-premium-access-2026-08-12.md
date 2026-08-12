# Access Codes for Free Premium Access

Give selected people full access to the paid app with a code they redeem after signing up.

## How it will work for you

1. Open the admin area (visible only to your admin account) and click "Create access code".
2. Choose how many people can use it (1 for a single person, or more for a group) and when it expires — options will be "Never", "12 months", or a custom date. You can decide per code, so nothing is locked in now.
3. Copy the generated code (e.g. `MLS-7K4Q-2XPD`) and send it to the person.
4. See who redeemed each code, and revoke a code or an individual's access at any time.

## How it will work for them

1. They create a normal account (or sign in).
2. On the plans screen there's a "Have an access code?" link that opens a small field.
3. They enter the code; if valid it unlocks full premium access immediately, and the plans screen shows "Plan activated" like a paid subscriber.
4. Invalid, expired, used-up, or revoked codes show a clear message and grant nothing.

## Technical details

**Database (one migration)**
- `access_codes`: code (unique, uppercase), label/note, max_redemptions, redemption_count, expires_at (nullable = lifetime), grant_duration_days (nullable = lifetime access), revoked, created_by, timestamps.
- `access_code_redemptions`: code_id, user_id, email, redeemed_at; unique on (code_id, user_id).
- RLS: no client reads or writes on either table (deny all for anon/authenticated); all access goes through edge functions with the service role, matching the existing hardened pattern. Grants to `service_role` only.

**Edge functions**
- `redeem-access-code` — validates the caller's JWT, normalizes the code, checks it exists, is not revoked/expired/exhausted and not already redeemed by this user, then records the redemption and upserts `subscribers` with `subscribed = true`, `provider = 'access_code'`, `subscription_tier = 'Premium Annual'`, and `subscription_end` from the code's duration (null for lifetime).
- `admin-access-codes` — admin-only (verified with `has_role(uid,'admin')`): list, create, and revoke codes, plus revoke an individual redemption. Codes are generated server-side.

**Subscription check fix (required)**
`check-subscription` currently only honors `provider = 'revenuecat'` cached rows and otherwise falls through to Stripe, which would wipe a manually granted row back to unsubscribed. It will be extended to honor `provider` values of `access_code` and `manual` the same way RevenueCat is honored (respecting `subscription_end`), so granted access survives every refresh. This also fixes the existing Apple-review seeded account.

**Frontend**
- `src/components/SubscriptionPlans.tsx`: add a "Have an access code?" input + redeem action that calls the edge function and then `refreshSubscription()`.
- New admin page `src/pages/AdminAccessCodesPage.tsx` at `/admin/access-codes`, routed in `App.tsx` and linked from the existing admin-only navigation entry — one screen with a create form and a table of codes with redemption counts and a revoke button.
- No changes to Stripe or RevenueCat flows; mobile shows the same redeem field (no pricing shown), so it stays App Store safe.
