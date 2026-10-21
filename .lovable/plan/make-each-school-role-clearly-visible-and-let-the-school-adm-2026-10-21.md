# Make each school role clearly visible, and let the School Admin preview other roles

## How it works today
- The role comes from the person's login. One account has one role in each school. Nobody switches roles by tapping anything.
- The only visible difference is the small grey line under "School Portal" (for example "montessori test · School Admin") and three extra tabs that only the School Admin sees: Classrooms & staff, Staff activity and School-wide review.
- A teacher and an assistant see almost the same screen. The only difference is that the assistant's buttons are hidden and the line under the title says "View only".
- A School Admin cannot see what a teacher or assistant sees unless they sign in with that person's account.

## What changes
1. **Clear role banner at the top of the portal.** A coloured strip shows the person's role and what it allows:
   - School Admin: "You oversee the whole school: all classrooms, staff, grades and reports."
   - Teacher: "Your classrooms: record progress, write notes and send parent reports."
   - Assistant: "View only. You can look up students, plans and records." If the admin has turned on recording for assistants, the banner says so instead.
2. **Title matches the role.** The heading reads "School Administration", "Teacher Workspace" or "Assistant Workspace".
3. **"View as" switch for School Admins only.** It has three options: School Admin, Teacher and Assistant. Choosing Teacher or Assistant shows the portal exactly as that role would see it, with the same tabs and the same hidden buttons. A notice says "Previewing as Teacher. Changes are turned off", with a "Back to School Admin" button. Nothing can be saved during a preview.
4. Teachers and assistants never see the switch. Their role still comes only from their login.

## Not changed
- Permissions, the security checks on saving, the rest of the app, colours and fonts.
- The bigger visual redesign of the portal is not part of this plan.

## Technical details
- `SchoolPortalPage.tsx`: add a `previewRole` state that only School Admins can use, and a derived `effectiveRole` passed to tabs and to the `can.*` checks. During a preview, edit actions are blocked on the client and the server still enforces the real role.
- Add a small `RoleBanner` component in `src/components/school/` that uses the existing tokens and the badge from the existing `ui` components.
