# Premium Demo Account

Get you a ready-to-use premium demo login that works on the website and in the phone apps.

## What you will have

- A dedicated demo account: **applereview2@montessorilifeskillsapp.com** / **AppleReview2026!** — full premium access, no payment, already provisioned by the existing `seed-apple-review` function.
- The demo account shows a populated Family Dashboard: a demo child profile (with name/age) is created if none exists, so goals, calendar, and progress screens are not empty during your demo.
- The same email and password sign in on the website (montessorilifeskillsapp.com) and on the iPhone/Android apps — no store purchase or code redemption needed for the demo.

## Steps

1. **Re-run the seed** — invoke the existing `seed-apple-review` edge function so the demo account is confirmed to exist and its premium row (provider `manual`, one year) is refreshed.
2. **Seed demo data** — extend that same function to upsert one demo child profile for the account (service-role write, safe to re-run). No schema or RLS changes.
3. **Verify on the web** — sign in through the app's own sign-in screen in a browser, confirm the Plans screen shows "Plan activated", open a premium activity, and confirm the Family Dashboard shows the demo child.
4. **Give you the walkthrough** — a short list of what to show in the demo: homepage → Explore/Sign in → a curriculum section → a premium activity → Family Dashboard → Plans.

## Notes

- On the phone apps, the demo works by installing the current store build and signing in with the demo credentials. Native in-app purchases are not exercised in the demo — the account already has access.
- The demo account is separate from your real admin account; nothing you demo can affect real subscribers.
- No changes to pricing, subscriptions, or the access-code system.
