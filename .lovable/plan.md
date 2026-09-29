# Premium for one child, plus a $24.99 add-on for each extra child

## What changes for families
- **Explorer (free):** one child profile.
- **Premium Monthly ($29.99/month):** covers one child.
- **Premium Annual ($199/year, about $16.58/month):** covers one child.
- **Extra child add-on:** $24.99/month for each child after the first.
  - Monthly members: added to the monthly bill.
  - Annual members: added to the yearly bill as $24.99 × 12 = **$299.88 per extra child per year**.
- **Current members:** every child after the first needs an add-on. Existing profiles are kept, but only the first child stays open until add-ons are bought. Parents choose which child is covered.
- The private consultation card does not change.

## What parents will see
- The Premium cards say "for one child" and show the add-on price.
- If a parent tries to add a child beyond their allowance, they see a short message explaining the add-on price and an "Add a child" button. The button opens secure checkout for that one extra child.
- Profiles over the allowance appear as "Needs a child add-on." Their saved progress stays safe but cannot be opened until an add-on is bought.
- Manage Child Profiles shows "Children covered: 2 of 3" with options to add or remove add-ons.
- The Members admin page shows each member's number of add-ons.

## Before this can go live
- **Website:** everything above can go live on the website without a store release.
- **iPhone/Android apps:** Apple and Google need matching add-on products created in App Store Connect and Google Play (monthly and yearly), plus a new app release. Until then, app users can buy add-ons on the website, and access carries over to the app. Add-on prices will not appear inside the apps before that release, to comply with store rules.
- The Terms of Service, Help answers about extra family members, and plan descriptions will be updated to match.

## Technical details
- Continue with the Stripe setup the project already uses. The Premium subscription gets a quantity-based add-on item ($2,499/month, or $29,988/year for Annual) on the same subscription, and checkout/customer portal updates change that quantity.
- `check-subscription` returns `child_allowance` = 1 + add-on quantity, and the frontend exposes it from the subscription state. The Free plan allowance is 1.
- Migration: add `child_addons integer default 0` to `subscribers` and `is_covered boolean default true` to `child_profiles`. Access writes happen only through edge functions.
- New edge functions: `update-child-addons` (validated quantity, Stripe proration) and `set-covered-children` (the parent chooses which children are covered within the allowance). Child creation is checked server-side against the allowance.
- One-time run after deployment: each existing account keeps its oldest child covered and marks the others as needing an add-on.
- RevenueCat: define `child_addon_monthly` and `child_addon_annual` store products later; `revenuecat-sync` maps the purchased quantity to `child_addons`.
- Update copy in `SubscriptionPlans.tsx`, `HelpPage.tsx`, `TermsOfServicePage.tsx`, and the admin Members page, then record this in memory and on the roadmap.
