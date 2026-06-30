
# RevenueCat In-App Purchases (Mobile)

Web continues to use Stripe. iOS/Android apps will use RevenueCat → Apple/Google IAP. A user's premium entitlement is honored regardless of which system granted it.

## 1. Database (migration)

Add fields to `subscribers` to track provider:

```sql
ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'stripe',
  ADD COLUMN IF NOT EXISTS revenuecat_app_user_id TEXT,
  ADD COLUMN IF NOT EXISTS revenuecat_entitlement TEXT,
  ADD COLUMN IF NOT EXISTS revenuecat_product_id TEXT,
  ADD COLUMN IF NOT EXISTS platform TEXT; -- 'web' | 'ios' | 'android'

CREATE INDEX IF NOT EXISTS idx_subscribers_rc_app_user
  ON public.subscribers(revenuecat_app_user_id);
```

## 2. Secrets (Supabase)

- `REVENUECAT_IOS_API_KEY` — public iOS key (`appl_…`), used in app
- `REVENUECAT_ANDROID_API_KEY` — public Android key (`goog_…`), used in app
- `REVENUECAT_WEBHOOK_AUTH` — random string you also paste in RC dashboard
- `REVENUECAT_REST_API_KEY` — secret v2 key (`sk_…`) for server-side lookups

The two public app keys will be embedded as Vite env vars (`VITE_REVENUECAT_IOS_KEY`, `VITE_REVENUECAT_ANDROID_KEY`) since they're meant to ship in client binaries.

## 3. Client SDK

Install `@revenuecat/purchases-capacitor`. Create `src/lib/revenuecat.ts`:

- `initRevenueCat()` — called once at app start on native only; uses `supabase.auth` user id as `appUserID` so web and mobile share identity.
- `getOfferings()` — returns the `default` offering's packages.
- `purchasePackage(pkg)` — wraps `Purchases.purchasePackage`, on success calls our `revenuecat-sync` edge function so the DB updates immediately (don't wait for webhook).
- `restorePurchases()` — required by Apple.

## 4. Plans page

`src/pages/PlansPage.tsx` (or wherever current plans live) becomes platform-aware:

```ts
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
```

- **Web** → existing Stripe checkout, unchanged.
- **Native** → render packages from RevenueCat offering; Monthly + Annual buttons call `purchasePackage`. Add a "Restore Purchases" link (Apple requirement). Consultation card uses a **consumable** IAP product `consultation_session` (per your choice).

## 5. Edge functions

**`revenuecat-sync`** (called by client right after successful purchase):
- Validates JWT, reads `customerInfo` payload, upserts `subscribers` row with `provider='revenuecat'`, platform, entitlement expiry.

**`revenuecat-webhook`** (called by RevenueCat server):
- Verifies `Authorization` header equals `REVENUECAT_WEBHOOK_AUTH`.
- Handles `INITIAL_PURCHASE`, `RENEWAL`, `CANCELLATION`, `EXPIRATION`, `PRODUCT_CHANGE`, `BILLING_ISSUE`, `NON_RENEWING_PURCHASE` (consultation).
- Looks up user by `app_user_id` (= Supabase user id) and updates `subscribers`.

**`check-subscription`** (modify):
- If `provider='stripe'` → existing Stripe path.
- If `provider='revenuecat'` → trust DB `subscription_end` (kept current by webhook); optionally cross-check via RC REST API.
- "Recognize Stripe entitlement on mobile" works automatically because the same user row is read regardless of platform.

## 6. Capacitor config

No code change needed beyond installing the plugin — `npx cap sync` after pulling.

## 7. RevenueCat dashboard setup (you do this)

1. Project → add iOS app (bundle `com.montessorilifeskills.app`) + Android app.
2. Paste App Store Connect shared secret & Google Play service account JSON.
3. Create products in App Store Connect / Play Console:
   - `premium_monthly` — auto-renewing $29.99/mo
   - `premium_annual` — auto-renewing $199.99/yr
   - `consultation_session` — consumable $224.99 (Apple requires .99)
4. In RevenueCat: create Entitlement `premium`, attach the two subs. Create Offering `default` with Monthly + Annual packages.
5. Webhooks → URL = `https://lpdvohgfkjnjarrpsnqr.supabase.co/functions/v1/revenuecat-webhook`, Authorization header = the value you'll give me for `REVENUECAT_WEBHOOK_AUTH`.

## 8. Local build steps (after I push)

```bash
git pull && npm install
npm run build
npx cap sync ios && npx cap sync android
```

Then run on a real device — IAP does **not** work in the iOS simulator.

## Out of scope

- Promo codes / intro offers (configure in App Store Connect later; RC picks them up automatically).
- Family Sharing (off by default; enable in App Store Connect when ready).
- Receipt validation custom logic — RevenueCat handles it.
