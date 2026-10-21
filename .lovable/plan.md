# Keep the "View as" preview when returning to the portal

## Why it resets
The portal only remembers the "View as" choice while you stay on the portal screen. As soon as you leave it (to open an activity or browse the app), the choice is lost. When you return, the portal starts again in your own School Admin view.

Real assistants are not affected. Their role comes from their login, so they always come back as an Assistant. Only the admin's preview resets.

## Fix
- The portal's web address will store the "View as" choice, the same way it already stores the open tab, classroom and student. "Return to School Portal" and the back button will then bring you back still previewing as Assistant or Teacher, with saving still turned off.
- The preview ends only when you tap "Back to School Admin" or choose School Admin in "View as".
- The address can only start a preview for an account that really is a School Admin. For anyone else it is ignored.

## Technical details
- In `SchoolPortalPage.tsx`, replace the `previewRole` useState with a search param `as` (`teacher` or `assistant`). `rememberSchoolReturn` already saves the full search string, so the return bar keeps it.
- The param is applied only when `realRole === 'school_admin'`. The `schoolCall` block stays in place during a preview.
