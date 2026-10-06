# Replace child add-ons with a Family Plan

## Agreed offer
- **Premium:** one child, **$29.99/month** or **$199/year**.
- **Family:** up to four children, **$49/month** or **$349/year**.
- Parents add and edit children normally in **Manage Child Profiles**; no per-child purchase step.
- Families needing more than four profiles are directed to **montessorilifeskills@gmail.com**.
- Existing customers paying for child add-ons move to the equivalent Family billing cycle at their next renewal.

## What will change
1. **Plans and checkout**
   - Add monthly and annual Family choices beside Premium across the homepage and Plans page.
   - Remove every extra-child price, purchase, removal, and “unlock child” control.
   - Add Family products to website checkout and native purchase handling.
   - Keep consultation and songs pricing unchanged.

2. **Child management**
   - Derive the limit from the active tier: Free/Premium = 1; Family = 4.
   - Let Family members create up to four profiles through the normal child form.
   - Keep saved profiles and progress safe when a plan changes; if a household has more profiles than its allowance, retain the records and ask the parent to select covered profiles.
   - At four profiles, replace purchasing prompts with a clear contact-support path.

3. **Subscription authority and migration**
   - Update Stripe, RevenueCat, webhooks, subscription checks, and database allowance enforcement to recognize Premium and Family by product identity—not price alone.
   - Preserve legacy add-on recognition during transition so existing access is not lost.
   - Move website add-on subscribers to Family at renewal without changing or cancelling their current billing mid-cycle.
   - For Apple/Google subscribers, preserve current access and present the required in-app Family switch; app stores do not permit a silent server-side plan change.
   - Keep website and app-store entitlements independent so syncing one provider cannot overwrite valid access from another.

4. **Admin, legal, and store text**
   - Show Premium or Family clearly in Admin Members and CSV exports instead of add-on counts.
   - Update Help, Terms, homepage FAQs, pricing disclosures, and app-store listing copy.
   - Replace the obsolete store-product checklist with the four subscription IDs and migration notes.

## Store products required
- `premium_monthly` — $29.99/month
- `premium_annual` — $199/year
- `family_monthly` — $49/month
- `family_annual` — $349/year

The Family products must be created in App Store Connect, Google Play, and RevenueCat before native Family purchases can be tested or released. Store-specific price points may display slightly different local amounts.

## Verification
- Run subscription and child-limit tests for Free, Premium, Family, downgrade, renewal migration, and more-than-four profiles.
- Test website checkout in non-payment mode and verify signed-in child creation/coverage behavior.
- Test native product discovery, purchase, restore, cancellation, and cross-device sync once the four store products are configured.
- Re-run the full test suite, build diagnostics, and public desktop/phone checks.

## Not included
- No family plan beyond four children; those households contact support.
- No changes to consultations, songs, books, curriculum content, or visual design outside affected pricing and child-management areas.
