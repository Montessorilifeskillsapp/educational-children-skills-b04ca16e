# Exit-intent email capture on the landing page

## What will change
- When a visitor starts to leave the homepage (mouse moving toward closing/leaving the page on desktop; on mobile, after scrolling most of the page then starting to scroll back to the top), a polite pop-up appears inviting them to join the list.
- The pop-up offers early access and updates — no download promised, no false claims.
- The visitor enters their email and taps "Sign Up Free" (wording adjusted since no download is promised: "Keep me posted" or similar).
- The email is saved with its source ("exit-intent") and any campaign tracking tags already present in the page address, so you can see which adverts produce signups in the existing admin Leads dashboard.

## Behavior rules
- Shows at most once per visitor session, and never again for someone who has already signed up or dismissed it (remembered on that device).
- Never appears for visitors who are already signed in, or on pages other than the homepage.
- Fully dismissible (X, click outside, Escape) and respects reduced-motion settings.
- Duplicate emails are handled gracefully — signing up twice shows the same friendly confirmation rather than an error.

## What happens to the email
- Stored in the existing `leads` table (already in place, fully locked down).
- Visible in the existing admin Leads dashboard with source and campaign breakdown.
- Existing unsubscribe and suppression handling continues to apply to any emails sent.

## Technical details
- New edge function `capture-lead`: validates the email (zod), enforces a per-address rate limit to deter abuse, upserts into `leads` with source `exit-intent` and UTM tags, uses the service role key server-side only.
- New component `ExitIntentCapture.tsx` rendered once on the homepage: mouse-exit detection on desktop, scroll-up reversal on mobile, sessionStorage/localStorage guards, existing dialog styling so it matches the app.
- No new tables, no changes to existing pages beyond rendering the component in `Home.tsx`.
- Homepage copy otherwise untouched.

## Verification
- Typecheck and full test suite.
- Playwright: trigger the prompt, submit a valid email, confirm success state; confirm it does not reappear after dismissal or after signup; confirm it never appears when signed in.
- Confirm the lead lands in the admin Leads dashboard with the correct source.
