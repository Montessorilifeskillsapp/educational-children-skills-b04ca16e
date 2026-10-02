# Full app click-through and fix pass

## Scope
Click every page, button, link and form in the app and fix whatever is broken. The design, wording, curriculum, prices and section navigation stay as they are. Any change that isn't a clear fix (design, copy, curriculum, pricing or policy) goes on a list for your approval and is not made.

## What gets checked
1. **Homepage and sign-up:** hero buttons, How It Works, the Pouring Water sample, all three pricing cards (Annual $199, Monthly $29.99, Consultation $225/$600), Book a Consultation, the email signup popup, sign up, sign in, Google/Apple sign-in buttons, and password reset.
2. **All 9 curriculum areas:** every section page, every activity card, the back buttons and the section navigation bar. Free starter activities open. Locked activities show the upgrade prompt. Activity order follows the Practical Life standard.
3. **Activity pages:** title, photos, "What you'll need" (photos or the plain marker, no blanks), Buy on Amazon links with the kerryhoward-20 tag, "Included with …" items, the commission note, steps and video loading.
4. **Shop, Classroom Setup, Home Setup and "Use what you have" pages:** every item link, the book covers, live book prices and the book buy links, plus the materials counts.
5. **Songs:** previews, the $99.99 purchase button, the schools licensing email and the copyright link.
6. **Family Dashboard and profiles:** child switcher, Overview, Goals (add, prioritise, complete), Calendar (add, edit, delete, export), Weekly Reports, Settings saving, and notification toggles. Add, edit and remove a child, the add-a-child payment button, Unlock, and choosing which children are covered.
7. **Plans and payments:** each checkout button opens the right price, plus the active-plan screen, access codes, payment success/cancel pages and Manage subscription. No real purchases.
8. **Help, About, Contact, Terms, Privacy, Guarantee, Install and Unsubscribe:** every link works, the only email shown is montessorilifeskills@gmail.com, and no placeholder text remains. The Contact form actually sends.
9. **Admin pages:** Home, Members, Leads, Access Codes, Materials, Videos, Songs, Analytics and Verify all load, and their buttons respond.
10. **Phone and desktop sizes:** no clipped or overlapping content, no broken images, no browser errors and no failed requests. The install banner and update prompt follow their rules.
11. **Automated checks:** the full test suite (including the add-on test that hasn't been running), lint, a security scan and the open monitoring alerts.

## How findings are handled
- Each problem is reproduced first, then recorded with the page, what happens and how serious it is.
- Clear defects get fixed, the check is repeated, and a test is added where it helps.
- Each fix is a small edit. Nothing unrelated is touched.
- Anything I cannot verify is listed as **not verified**, never reported as passing. That includes signed-in Premium pages, real payments and the native phone apps. You'll get exact steps to check those yourself.

## Known open items to confirm during the pass
- Contact form only shows a success message today. It needs to actually deliver to montessorilifeskills@gmail.com.
- Leads are stored but not listed in Admin.
- The welcome text still claims "three activities".
- About 15 materials have no Buy link because their names differ slightly from the saved link (e.g. Button frame vs Button dressing frame). Exact matches get fixed; unclear ones are listed for you.
- The add-on test file isn't being picked up by the test run.

## Technical notes
Playwright runs against the routes listed in App.tsx at 1280px and 390px widths, capturing console errors and network errors. Signed-in checks aren't possible because this project's sign-in can't be simulated from here. Edge functions get a check with no sign-in, which should reply "unauthorised". Changes stay on the website only; no app store release.

## Result
A short report listing what was checked, what was fixed, what's waiting for your decision, and what you need to test on a phone or with a Premium account.
