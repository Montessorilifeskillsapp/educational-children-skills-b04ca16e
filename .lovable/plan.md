# Teachers / School Portal — first version

## What schools get
- **Access by arrangement with Kerry.** A "School licensing" button emails montessorilifeskills@gmail.com. Kerry or an admin then sets up the school in Admin → Schools. Schools never see a checkout.
- **Three roles inside a school:**
  - School Admin: invites and removes staff, creates classrooms, assigns teachers, and sees every class.
  - Teacher: manages their own classrooms, students, plans and reports.
  - Assistant: views assigned classrooms and records progress. Cannot delete students or send reports.
- **Classroom size:** up to 30 students per classroom by default. Kerry can raise the limit for a school in Admin when they ask. When a teacher hits the limit, they see a "Request more places" button that emails Kerry.

## Portal pages (/school)
1. **Overview:** a list of classrooms with student counts and activity this week.
2. **Class roster:** add, edit and archive students (name, birth date, optional photo), with a per-student detail view.
3. **Progress & records:** a class grid with students down the side and activities across the top, in the curriculum's beginner-to-advanced order across all nine areas. Each cell steps through Presented, Practising and Mastered, with an optional note. Each student also gets their own progress view.
4. **Lesson planning:** a weekly planner and calendar per classroom. Staff assign activities to students or groups on specific days and mark them done, and done items flow into progress.
5. **Parent reports:** build a progress summary for one student over a date range, preview it, then email it to the family address on file. Sent reports are kept in a history.
6. **Staff (School Admin only):** invite people by email with a chosen role, change roles, remove staff.

The existing unused Schools template is reused for layout where it fits. Its fake educator and messaging sections are left out.

## Improvements over the first draft
- **Observation notes:** quick dated notes per student, kept in the order they were written, the way Montessori guides record observations. They can be included in parent reports.
- **"Ready for next" suggestions:** once a student masters an activity, the next activity in the curriculum sequence appears as a suggestion for planning.
- **Class view:** see at a glance which students haven't had a presentation lately, so no child is overlooked.
- **Print-friendly reports and plans,** for staff who keep paper records or post plans on the wall.
- **Activity guides link straight through:** an activity in the grid or planner opens the existing activity page for that activity.

## The rest of the app stays the same
- Nothing changes on the homepage, activity pages, Family Dashboard, plans, prices or shop.
- The only visible additions outside the portal are a "School Portal" menu entry, shown only to staff of a school, and the existing licensing contact button.
- The portal uses the app's current colours, fonts and buttons. It gets no new theme.
- A teacher who also has a family account keeps both, separately.

## Admin additions
- Admin → Schools: create a school, set its first School Admin's email, set the per-classroom limit, and turn the school on or off.

## Not included in this version
- Online payment for schools
- Parent logins into the school portal (parents get emailed reports)
- Native app store changes. This is a web feature, and the phone apps open it after your next store release.

## Technical details
- New tables: schools, school_members (role enum school_admin/teacher/assistant), classrooms, classroom_staff, school_students, student_progress, lesson_plan_items, student_reports, school_invites. Each gets explicit GRANTs and RLS that allows members to read only within their own school.
- All writes go through a new `school-portal` edge function that checks role and school membership. This follows the project rule that clients never write to tables directly.
- Seat limit is enforced by a server-side trigger on school_students, and the limit is stored on schools.
- Invites go out through send-transactional-email with a new `school-invite` template. Accepting an invite links the signed-in account.
- Reports are emailed through the existing transactional email function.
- Kept separate from family child_profiles and subscriptions, so family billing is unaffected.
- All portal code lives in its own folder (`src/components/school/`) and its own lazy-loaded /school routes. Shared components and existing tables are not modified, apart from one conditional menu item.
- Observation notes are stored in a student_observations table.
- Tests for: the 30-seat default and override, the assistant not being able to delete or send, and members not seeing other schools.
