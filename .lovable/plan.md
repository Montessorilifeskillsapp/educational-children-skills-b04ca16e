# Label the menu's "Admin" entry in full

In the main Menu dropdown, the item currently called **"Admin"** becomes **"School Administration"**, its full name.

- Only the wording changes. It still opens the same page, and only owners can see it.
- Nothing else in the menu changes.

## Technical details
- `src/components/NavigationMenu.tsx`, line 86: change `label: 'Admin'` to `label: 'School Administration'`.
