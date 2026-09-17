# App-wide error and usability check

## Scope
Review the app for broken pages, failed actions, missing images, confusing links, and layout problems. Preserve the current design, curriculum, wording, and visible section navigation; no redesign or unrelated changes.

## Checks
1. **Navigation and activities:** Visit every main section, check activity links and back buttons, and test activity pages across curriculum areas. Check titles, materials, presentation steps, and the required Practical Life ordering.
2. **Materials and shopping:** Check saved purchase links, the `kerryhoward-20` affiliate tag, “Buy on Amazon” labels, included-item inheritance, and “Use what you have” pages. Confirm materials remain editable and missing links do not create dead buttons.
3. **Access and videos:** Check free starter access, protected activities, sign-in redirects, and in-app video loading where access permits. Do not make purchases or alter customer data.
4. **Installation and updates:** Review the 72-hour dismissal rule, installed-app suppression, duplicate prompts, and update-store destinations. Distinguish browser checks from behavior that requires a real installed phone app.
5. **Layout and reliability:** Check wide and narrow screens for clipping, overlap, broken images, missing section navigation, browser errors, and failed requests.
6. **Automated checks:** Run the existing test suite and lint checks; review platform build results. Investigate failures rather than assuming existing tests establish that every page works.

## Handling findings
- Reproduce each suspected issue and record its severity, affected page, and evidence.
- Fix confirmed functional defects within this scope, then repeat the affected checks and add focused regression tests where useful.
- Present subjective design changes, curriculum changes, and security or payment policy changes separately for approval.
- Clearly identify checks blocked by account access, unavailable services, or native-device requirements; do not report them as passed.

## Technical approach
Use route and curriculum inventories to drive coverage, browser checks for rendered behavior and failed requests, and focused source review for shared activity, material, access, and installation logic. Review available monitoring findings as leads, not verified diagnoses. Use authorized test access only for protected areas.

## Result
A concise summary of what was checked, what was fixed, and any remaining issues or checks requiring your help. No publishing as part of this review.