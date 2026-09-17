# Home alternatives page for materials without a supplier link

Today, a material with no supplier link shows a dead-end note that just says "Source locally". This adds a real destination: a page that encourages the adult to use what they already have at home or in the classroom.

## What changes for the reader

- On an activity page, any material without a supplier link becomes tappable and reads "Use what you have" instead of "Source locally".
- Tapping opens a page for that material with:
  - the material name,
  - your own suggestions for that material, when you have written them,
  - a general encouragement message about improvising with everyday household items when you haven't written anything yet,
  - a link back to the activity they came from.
- Materials that already have a supplier link keep their Buy link and are unchanged.
- Items marked "Included with another product" keep their existing note and parent Buy link.

## What changes for you (admin)

On the Materials page, each material gains a "Home alternatives" text box next to the link fields. Whatever you type there appears on that material's page. Leave it empty and the general message shows instead. Fully editable at any time, same Save behaviour as the link fields.

A small indicator on each material card shows whether home alternatives have been written.

## Technical notes

- Migration: add a nullable `home_alternatives text` column to `material_links`. Existing public read policy (active rows) already covers it; no new table, no policy change.
- `useMaterialLinks` selects the new column and `MaterialLink` gains `home_alternatives`.
- New route `/materials/:materialKey` rendering `MaterialAlternativesPage`, using `normalizeMaterialKey` for lookup, reverse-resolving the display name from the curriculum materials pipeline (`extractAllMaterialsFromSkills` across `curriculumSectionsForMaterials`) so the page works even when no `material_links` row exists. Unknown keys render the general message with the prettified name. Uses `PageLayout` + back button, and `useSEO` with a noindex-safe title.
- `MaterialBundle.tsx`: when `amazonUrl` is null and `includedWith` is null, render a `Link` to `/materials/:key` labelled "Use what you have" in place of the current static "Source locally" text.
- `SkillActivity.tsx` "What you'll need" tiles: same treatment for unlinked, non-bundled items, passing the current activity route as a `?from=` param for the back link.
- `admin-material-links` edge function: accept and persist `home_alternatives` on upsert (trimmed, nullable, length-capped).
- `AdminMaterialsPage.tsx`: add the textarea to the per-material form, include it in the dirty-state comparison and save payload, and show a "Home ideas added" chip.
- Tests: extend `MaterialBundle.test.tsx` for the new link, and add a render test for the alternatives page (with and without saved text).
