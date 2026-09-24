# Remediation: restore consultation, add password reset

## Context
Two outstanding issues caused or surfaced during recent work:
1. The private consultation offering ($225, email booking) was dropped from the homepage during a rewrite without approval. It still works on the Plans page.
2. The app has no password reset: no "Forgot password?" link on sign-in, no page to set a new password.

## Compensation note
Monetary compensation (credits/refunds) cannot be issued from within this project — it must be requested from Lovable support, referencing this conversation. This plan covers the technical remediation only.

## Part 1 — Restore the consultation to the homepage
- Restore the original "Private Consultation" card exactly as it was in the homepage pricing area before the rewrite (recovered from the earlier saved version): same name, $225 price, description, and "Book Consultation" button, which opens the existing Plans/booking flow.
- It sits beside the Annual and Monthly options, where it was originally. No new wording, claims, or layout changes elsewhere.
- Uses the existing consultation booking flow (email). No new payment work.
- Web publish makes this live on montessorilifeskillsapp.com immediately at no cost.
- Native apps bundle a copy of the site, so the homepage consultation appears there only with the next native release. The Plans page inside the native apps already offers the consultation today.

## Part 2 — Password reset
- Add a "Forgot password?" link on the sign-in screen.
- Clicking it sends a reset email to the user's address (standard Supabase auth email).
- Add a "Set new password" page the reset email link opens, where the user enters and confirms a new password.
- Show clear success/error messages; sign the user in afterward or return them to sign-in.
- No changes to accounts, data, or security rules — this uses the built-in auth password-reset mechanism.

## Safeguards
- No other homepage sections are added, removed, or reordered.
- Before any future page rewrite: a written checklist of every existing section, approved by you first.
- Verify live on desktop and mobile: consultation section renders and its booking link works; reset email sends; the set-new-password page loads and accepts a valid new password.
- Run the full test suite before reporting done.

## Verification limits
- Sending a real reset email depends on the external Supabase email configuration; I will verify the full flow as far as the sandbox allows and flag anything that can only be confirmed on a real account.
