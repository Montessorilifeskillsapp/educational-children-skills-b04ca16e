# Full restoration of the Private Consultation

The goal is to make it as if the consultation had never gone missing, not only to put a card back.

## 1. Put back exactly what was removed
- Bring back the original "Private Consultation" offer from the saved earlier homepage, word for word:
  - $225 per session, "Personalized guidance"
  - 1-on-1 with a Montessori guide; customized curriculum for your child; family lifestyle integration; personalized materials recommendations; written homeschool action plan; follow-up email support (2 weeks); 3-session package: $600 (save $75)
  - "Book Consultation" button, going to the same booking flow as before
- Put it back in its original place: third option beside Premium Annual and Premium Monthly in the homepage pricing area, with the same card style as those two.
- Nothing else on the homepage gets added, removed, or reordered.

## 2. Check every other place the consultation should appear
- Compare the Plans page, the welcome page, the founder/About page, the menu, and the booking email link against their earlier versions. Anything that disappeared or changed without your approval gets restored the same way.
- Confirm the booking email opens correctly on web, iPhone, and Android.

## 3. Get it back to people using the phone apps
- The phone apps carry their own copy of the site, so publishing the website alone does not fix them.
- Prepare the phone apps for a new release that includes the restored consultation: raise the version number and sync the app files for both stores.
- Set the minimum required version in the existing "Update available" setup (Firebase). Everyone on an older version then sees the update prompt each time they open the app, until they update. That way current users get the fix, not only new downloads.
- Submitting to the App Store and Google Play has to be done from your developer accounts. I'll give you a short step-by-step for each.

## 4. Password reset (reported alongside)
- Add "Forgot password?" on the sign-in screen, a reset email, and a "Set new password" page. This goes into the same phone release, so it costs you only one store update.

## 5. Stop it happening again
- Before any page is rewritten, I list every existing section and offer and get your sign-off. After the rewrite I compare the new page against that list before reporting done.
- Add an automatic test that fails if the consultation offer ever disappears from the homepage or Plans page.

## Verification
- Compare the restored card with the earlier version word for word, and check it on desktop and mobile.
- Click "Book Consultation" all the way through.
- Run the full test suite, including the new safeguard test.
- Check the password reset as far as the external account setup allows, and flag anything that can only be confirmed on a real device.

## Limits, stated honestly
- I can't submit store releases or give credits. Credits go through Lovable support (support@lovable.dev).
