# Make staff assignment easy, and tidy School settings

## What changes for you

**1. Pick classrooms when you invite someone**
The invite row gets a "Classrooms" choice: email, role (Teacher / Assistant / School Admin), then tick one or more classrooms. When that person signs in for the first time, they're already placed in those classrooms. You don't have to come back and assign them.

**2. One-tap assignment on each staff member**
In the Staff list, each Teacher or Assistant shows every classroom as a small button. Tap a classroom to add them to it; tap it again to take them off. Their classrooms are always visible on their row, so you don't have to open anything to check.

**3. Classroom cards show the people, not a hidden menu**
The "Assign staff" fold-out goes. Each classroom card shows its Lead Guide, Guides and Assistants as name chips with a small remove (x) on each, plus an "+ Add staff" button that lists only the people not yet in that room.

**4. A clearer School settings page**
Settings is split into four plain sections, in this order:
- **Staff**: invite, list, classrooms per person, role changes
- **Classrooms**: add a classroom, age group, Lead Guide, who works there
- **Permissions**: what Teachers and Assistants may do (the existing switches)
- **School profile**: name and school email

The page opens on Staff. Delete and Remove stay behind the confirmation boxes you have today.

**5. Unassigned staff are flagged**
Anyone who isn't in any classroom yet shows "Not in a classroom" and an "Assign" button next to their name. The Staff heading shows a count, for example "2 people need a classroom".

**6. Larger text across the whole portal**
All text in the portal is bigger so you can read it at a glance:
- Body text: about 17–18px (up from 14–15px).
- Small labels, such as role, dates and "View only": no smaller than 15px.
- Names on child and staff rows: 18–20px.
- Tabs and buttons: larger text with bigger tap areas.
- Page headings: one step larger.

This applies to every portal page (Today, Children, Record, Plans, Reports and School settings) and to the Classroom drawer inside activities. The rest of the app keeps its current size.

## What stays the same
- The top bar and tabs from the last change.
- Who can change roles or remove people (School Admins only, and never on your own row).
- The family app and the public app.

## Technical details
- Invitations get a new `classroom_ids uuid[]` column. The `invite` action accepts optional `classroom_ids`, which are checked to belong to the school. This needs a database change.
- When an invitation is accepted, those `classroom_staff` rows are written in the same step that creates the membership, and the change is logged in Change history. Before building, I'll read the code that accepts invitations to confirm where this belongs. I haven't checked it yet.
- Taps on the classroom buttons call the existing `staff_assign` action. If a save fails, the change is undone on screen and an error message explains it.
- The Staff tab is split into StaffSection, ClassroomsSection and ProfileSection, with section links at the top. StaffPolicies moves into the Permissions section.
- New tests: invites reject classroom IDs from another school; accepting an invitation assigns the chosen classrooms.
- Text sizing: the `.school-theme` wrapper sets a larger base size (`font-size: 112.5%`), and each `text-xs` / `text-sm` inside it maps to at least 15px / 17px. Shadcn controls inside the portal get `h-11` targets. The ClassroomDrawer gets the same scale.
