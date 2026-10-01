# Add a child inside the app — one tap, no detours

## The parent's experience (the priority)
1. Parent taps **Add a child** (same button they already use).
2. They enter the name and age as usual.
3. If their plan already covers another child, it's saved. Done.
4. If not, the save button simply reads **Add [name] — $24.99/month** (or the yearly price for Annual members). One tap opens the familiar Apple/Google confirm sheet (Face ID / fingerprint).
5. The child appears immediately, unlocked. No website, no separate add-on screen, no "slots", no extra steps.

Also:
- An existing locked child shows one button: **Unlock [name]** — same one-tap payment.
- Removing a child shows a clear note with one button that opens the phone's subscription settings (Apple/Google require cancellation there).
- If payment is cancelled, the details they typed are kept so they don't retype anything.
- Clear, friendly messages for every outcome (paid, cancelled, card declined, no connection).

The website works exactly the same way (Stripe instead of Apple/Google), so both feel identical.

## What you need to do once in the stores
I'll give you a short, exact click-by-click checklist (names, prices, IDs to copy-paste) for App Store Connect, Google Play Console and RevenueCat. Behind the scenes each extra child is a separate store subscription (Apple/Google don't allow buying the same one twice); parents never see this. Up to 4 extra children in the app. Then the next store release ships it, together with your other pending changes.

Note: Apple and Google keep about 15–30% of in-app sales.

## Technical details
- `src/lib/revenuecat.ts`: add-on product ids (`child_addon_monthly_1..4`, `child_addon_annual_1..4`), `purchaseChildAddon()` auto-picks the next unowned product matching the member's billing period; `openManageSubscriptions()`.
- Child add/edit form and `ChildCoveragePanel.tsx`: merge purchase into the save step; on native use the store's localized price; on web the existing Stripe add-on checkout returns straight to the saved child.
- `revenuecat-sync` / `revenuecat-webhook` + `_shared/childAddons.ts`: count active store add-ons, add to website add-ons into `subscribers.child_addons`, run `reconcile_child_coverage`; add-on events never alter Premium tier fields.
- Admin Members: show add-on source (Store / Website).
- Until the new app version ships, current behavior remains.

## Verification
- Typecheck, build, tests, plus unit tests for add-on counting and expiry re-locking.
- Real purchase test on your device with a store test account (I can't sign in as an app subscriber).
