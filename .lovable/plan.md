# Buy links for items included with another product

Right now an item that comes packed inside another product (blue strips, red strips,
natural wooden strips, mallet, bell damper) shows the note "Included with …" and no
way to buy it. The parent product usually has an Amazon link saved. Those items
should offer that parent's purchase link, so a parent can reach the right product in
one tap.

## What changes for the user

- Activity pages ("What you'll need" and "Get the materials"): an included item now
  shows "Included with Subtraction strip board" **and** a Buy link that opens the
  parent product — the same affiliate-tagged link used by the parent.
- The link is labelled so it is clear what is being bought, e.g. "Buy Subtraction
  strip board".
- If the parent product has no saved link yet, the item keeps the plain
  "Included with …" note with no Buy link (no dead ends).
- "Buy all" continues to use real product links only, never a duplicate of the
  parent link.
- Admin → Materials: each included item keeps its "Included with …" chip and gains a
  small read-only line showing which link it inherits, so it is obvious the item is
  covered without needing its own link. Still no link field for included items, and
  they stay out of the "missing links" counts.

## Technical notes

- `resolveMaterials` in `src/components/MaterialBundle.tsx`: when a material has no
  link of its own and `resolveIncludedWith` returns a parent, look the parent up in
  the link map by `normalizeMaterialKey(parent)` and adopt its `amazon_url`,
  `affiliate_tag` and `vendor`. Add `inheritedFrom?: string` to `ResolvedMaterial` so
  the UI can distinguish an inherited link from an own link.
- `MaterialBundle` render: show the "Included with …" note whenever `includedWith`
  is set (not only when there is no link), and label the Buy anchor with the parent
  name when `inheritedFrom` is set.
- Exclude inherited links from the `buyAllUrl` pick and from the `allLinked` check so
  the "Buy all" button does not resolve to a child row.
- `src/components/SkillActivity.tsx`: same inherited-link resolution for the
  "What you'll need" tiles, using the material links already loaded there.
- `src/pages/AdminMaterialsPage.tsx`: for bundled rows, render the parent's saved URL
  (or "Parent link not set yet") beneath the existing chip. No changes to counts or
  filters.
- Tests: extend `src/__tests__/components/MaterialBundle.test.tsx` — an included item
  with a linked parent renders a Buy link to the parent URL; with an unlinked parent
  renders the note and no link. Add a case asserting "Buy all" ignores inherited
  links.
- Verify with `bunx tsc --noEmit` and `bunx vitest run`. No database or pipeline
  change, so the spreadsheet and alphabetized list stay as they are.
