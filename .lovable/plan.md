# Teacher portal: same look and layout as the app and Family Dashboard

## What changes for teachers

**1. Same text, fonts and colors as the rest of the app**
- The portal's separate cream background, serif headings, peach/mint colors and small all-caps teal labels go away.
- It uses the app's own colors, fonts, buttons and cards, the same as the Family Dashboard. Dark mode then works the same way too.
- Text returns to the app's normal size. (Today the portal and the classroom drawer use slightly larger text.)

**2. A top area laid out like the Family Dashboard**

```text
< Back to app                                 [sync status] [Language]
Sunrise Montessori School
School Admin · Room 2 · Monday, November 23

( Room 1 ) ( Room 2 ) ( Room 3 )        <- classroom pills, like child pills

[ Today | Children | Record | Plans | Reports | Curriculum | School settings ]
```

- "Leave portal" becomes the "Back to app" link at top-left, in the same place as on the Family Dashboard.
- The school name becomes the page heading, with the role, classroom and date underneath.
- The classroom drop-down becomes a row of pills, like the child pills parents use. Teachers with only one classroom see no pills.
- The six sections use the same tab strip as the Family Dashboard. "School settings" is the last tab, for School Admins only.
- Sync status and language sit together at the top right.
- **School leadership:** the same tab strip shows Classrooms and staff, School-wide review, Staff activity and Change history, plus a "Back to classroom" link. School Admins keep the school picker and "Preview as" controls under it.

**3. The inside of every section matches**
- Today's lessons, Children, Record, Plans, Reports, Curriculum, the student window, the classroom drawer on activity pages, and the planning pop-ups all use the app's standard cards and headings.

## What stays the same
- The portal still opens on Today's lessons.
- Every button and feature, plus permissions, saved records, offline saving and screenshot protection.
- The public app and the Family Dashboard don't change.

## Technical details
- Remove the `.school-theme` token overrides, Fraunces, `.school-card/.school-label/.school-cta` and the `.school-scale` size overrides from `src/index.css`. Swap those classes for shadcn `Card`, standard heading classes and `Button` variants across `src/components/school/*` and `SchoolPortalPage.tsx`.
- Rebuild the portal header in `SchoolPortalPage.tsx` with `BackButton`, `h1`, pill-style classroom tabs and shadcn `Tabs` driven by the existing `tab` state and `allowSchoolNavigation` guards. URL params and `go()` behavior stay the same.
- Replace `mem://ux/school-portal-layout` with the new rule: the portal matches the app and Family Dashboard. Keep the list of rejected layouts.
- Run the school tests. Check the layout with Playwright using sample portal data at phone, tablet (834 px) and desktop sizes.
