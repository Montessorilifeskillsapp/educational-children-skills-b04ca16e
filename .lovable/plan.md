# Label the menu's "Admin" entry in full

In the main Menu dropdown, the item currently called **"Admin"** becomes **"Administration"**. That way nobody mistakes it for a school's own admin area.

- Only the wording changes. It still opens the same page, and only app owners can see it.
- Nothing else in the menu changes, including "Access Codes" and "School Portal".

## Technical details
- `src/components/NavigationMenu.tsx`, line 86: change `label: 'Admin'` to `label: 'Administration'`.
