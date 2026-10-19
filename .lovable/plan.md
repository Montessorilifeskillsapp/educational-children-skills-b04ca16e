# School Portal: roles, student switching, and read-only Assistants

## What changes for each role

**School Admin**
- A clear "Staff & roles" area on the Staff tab: each person's role (School Admin, Teacher, Assistant) and their classrooms, with a menu to change the role and checkboxes to assign classrooms. You still can't change your own role, and the school keeps at least one School Admin.
- Sees every classroom and everything in it: all progress records, notes, plans and reports, each showing **who recorded it and when** (for example "Mastered · J. Smith · Oct 19").
- New "Staff activity" view: pick a staff member to see their recent progress records, notes and plans across the school.

**Teacher**
- Records progress (Presented / Practising / Mastered) and writes notes for every student in their classrooms.
- The student panel gets **Previous / Next** buttons and a student picker, so you can move from one child to the next without closing it.
- In the Progress grid, tapping a student's name opens their panel, and you can step through the class from there.
- Leaving the portal only happens through "Exit portal". Back and opening activities never send you to the homepage.

**Assistant (view only)**
- Sees students, progress, notes, lesson plans and reports for the classrooms they're assigned to.
- Can't change anything: progress cells, note boxes, plan and report buttons are hidden, and the server refuses any edit.
- A small "View only" label appears next to their role.

## How roles get set (and how you test them)
- Roles only change through the Staff tab, not through invites, so a role never switches by itself.
- To preview Teacher or Assistant, invite a second email address with that role, assign it a classroom, and sign in with that address in another browser. Your own account stays School Admin.

## Technical details
- `rules.ts`: `record_progress` becomes School Admin and Teacher only. Add a `view` permission for all roles. Update tests: assistant can't record progress, add notes or plan; admin and teacher can.
- `index.ts`: observation_add, progress_set and plan_done use the updated rules. Add a read action `staff_activity` (admin only) that returns progress, observations and plans filtered by `updated_by`/`author_id`, and redeploy. Existing `updated_by`/`author_id` columns already record the author, so no database change is needed.
- `useSchoolData`/UI: map member ids to names so author labels can be shown. Add Previous/Next and a picker to `StudentPanel`, and hide edit controls behind `can.*` checks for assistants.
- `StaffTab`: group each member's role and classroom assignments in one row.
