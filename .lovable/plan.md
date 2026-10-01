# An exact photo for every item in "What you'll need"

## Current state
- 99 activities list about 380 distinct items.
- 42 activities show a picture for every item, 50 are mixed, and 10 show none.
- Items without a picture get a small tick or an empty circle instead.
- Most pictures that do appear are general scene photos chosen by keywords, not the item itself. For example, "Funnel" shows a pouring set, "Cutting lines template" shows a table setting, and all five dressing frames share one photo.

## What I'll build
1. **One photo per item, matched by exact name.** I'll remove the keyword guessing so no item borrows a scene photo again.
2. **Consistent style.** Each photo shows the single item, photorealistic, on a plain light background, square, with no logos or brands. Montessori materials follow AMI specifications: correct colours, quantities and numerals.
3. **Batches you review before anything goes in.** I'll work section by section, starting with Practical Life, then Sensorial, Math, Language, Botany, Geography, Science, Art and Grace and Courtesy, about 25–40 items per batch. Each batch arrives as a contact sheet showing the item name under each photo. You approve or reject each one. Only approved photos are placed. Rejected ones are redone or left out, never placed.
4. **Until an item has an approved photo**, every activity shows the same neutral marker in that spot. No blank gaps, no mixed icons, and rows line up.
5. **Same item, same photo everywhere.** Items that are the same but worded differently share one photo. For example, "Placemat" and "Placemats", or "Button frame" and "Button dressing frame". I'll list each pairing in the first batch so you can confirm it.
6. **Saved Amazon product photos are not used.** Earlier you found that product pictures didn't match the linked item.

## What stays the same
Activity wording, order, steps, layout and Buy links all stay as they are. This is a website change. The phone apps pick it up in your next store release.

## Scope note
About 380 photos means roughly 10–14 review rounds. I'll start with the first Practical Life batch and wait for your approval before continuing.

## Technical details
- New `src/data/materialPhotos.ts`: a map from normalized material key to an imported image in `src/assets/material-items/`, plus an alias map for wording variants. Exact match first, then alias, otherwise `undefined`.
- `getMaterialImage` uses this map only. Remove `PATTERNS`, and keep the exact entries in `classroomImages` only if you approve them.
- `MaterialBundle` renders one shared neutral placeholder tile (same 48px size, theme tokens) when there's no image, replacing the tick and circle.
- Contact sheets are generated to `/mnt/documents/material-photos/batch-N.jpg` for review. Approved files are copied into the project.
