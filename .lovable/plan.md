# In-app purchase of extra children (iPhone and Android)

## Goal
A parent who subscribes inside the iPhone or Android app can add (and remove) an extra child without leaving the app. The website flow stays as it is.

## What the parent will see (in the app)
- On Manage Child Profiles: "Add a child" button showing the store price (set to match $24.99/month, or $299.88/year for Annual members).
- Tapping it opens the normal Apple/Google payment sheet. After paying, the locked child unlocks right away.
- "Manage add-ons" opens the phone's own subscription settings (stores require cancellation to happen there).
- "Restore purchases" also restores add-ons.

## What you need to do in the stores (I can't do these for you)
1. App Store Connect and Google Play Console: create the add-on subscriptions. Because a store subscription can't be "bought twice", each extra child is its own product, in its own subscription group:
   - `child_addon_monthly_1` ... `child_addon_monthly_4` at $24.99/month
   - `child_addon_annual_1` ... `child_addon_annual_4` at $299.88/year
   This allows up to 4 extra children in-app (5 total). Tell me if you want a different maximum.
2. RevenueCat: add those products and attach them to a new entitlement `child_addon` (not to `pro`).
3. Submit a new app version to Apple and Google, bundled with all the other pending changes, as agreed.

Note: Apple and Google keep about 15–30% of in-app add-on sales.

## Technical details
- `src/lib/revenuecat.ts`: add the add-on product ids; `purchaseChildAddon(plan)` picks the next unowned slot for the member's billing period (monthly members see monthly slots, annual see annual) and buys it; `openManageSubscriptions()` via RevenueCat's management URL.
- `src/components/ChildCoveragePanel.tsx`: on native, replace "Extra children can be added on our website" with the in-app Add/Manage buttons, showing the store's localized price (store rules forbid showing a web price in-app).
- `revenuecat-sync` and `revenuecat-webhook`: count active `child_addon_*` subscriptions and store as the store add-on count; `childAddons.ts` totals store + website add-ons into `subscribers.child_addons`, then runs existing `reconcile_child_coverage`. Add-on events must never change the Premium tier/entitlement fields.
- Website add-ons for app members keep working; both sources add together, so nothing double-counts or gets lost.
- Admin Members page: show add-on source (Store / Website).
- Until the new app version ships, current behavior (buy on website) remains.

## Verification
- Typecheck, build, tests.
- Unit test for add-on counting (store + website totals; expiry lowers the count and re-locks the newest child).
- Real purchase test must be done by you on a test device with a store sandbox account.
