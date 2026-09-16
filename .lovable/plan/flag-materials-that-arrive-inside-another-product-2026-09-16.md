# Flag materials that arrive inside another product

Some entries in the materials list are not things you can buy on their own — they arrive packed inside a board or a bell set. You currently see them as separate lines and go hunting for a product page that doesn't exist. This marks them as included, both where parents read the list and where you manage links, so only genuinely separate purchases need a link.

## What changes

**1. A small registry of bundled items**

A new list pairing each included item with the product it comes inside. Seeded with the verified cases:

```text
Natural wooden strips (1–18)   →  Subtraction strip board
Blue strips (1–9)              →  Addition strip board / Subtraction strip board
Red strips (1–9)               →  Addition strip board / Subtraction strip board
Mallet                         →  Montessori Bells (brown and white series)
Bell damper                    →  Montessori Bells (brown and white series)
```

Where an item belongs to more than one product (the strips), the note names whichever product is on the page you're reading: on the Subtraction Strip Board activity it reads "Included with Subtraction strip board", on the Addition Strip Board activity it reads "Included with Addition strip board".

**2. Activity pages**

- "Get the materials" card: instead of "Source locally" under these items, it reads "Included with Subtraction strip board". No "Buy" link is invented for them.
- "What you'll need" grid: the same short note appears under the item's name.
- Nothing else about the two lists moves — names, images, essential markers and existing supplier links stay exactly as they are.

**3. Materials page in admin**

- Each bundled item shows an "Included with …" chip next to "Essential".
- Bundled items are removed from the progress count, so progress reads as links you actually still need to add: for example "12 of 396 linked · 5 included with another product".
- The product URL field stays editable for these items — if you ever find strips sold on their own, you can still paste a link and it works as before, affiliate tag included.

**4. The two lists you download**

- `montessori-materials-by-section.xlsx`: a new "Included with" column on both tabs, and the summary tab gains a per-section count of included items.
- `montessori-materials-alphabetized.txt`: included items are annotated, e.g. `Natural wooden strips (1–18) — included with Subtraction strip board | Mathematics`.

## Deliberately not flagged

Items that do come packed inside a larger set elsewhere but which the app also treats as real standalone purchases, so marking them would send you away from a genuine product: Golden bead ten bars, Colored bead stair (1–9), Gray bead stair, Black and white bead stair, Notched card (bridge). Tell me if you want any of these marked too.

Also spotted, not touched: "Golden bead ten bars and unit beads" still exists as its own line in the list, which is really the two items "Golden bead ten bars" and "Unit beads" written as one. Say the word and I'll split it.

## Technical notes

- New `src/lib/materialBundles.ts`: `Record<materialKey, parentKey[]>` plus `resolveIncludedWith(displayName, siblings)` returning the parent's display name or null. Parents resolve against the current activity's own material list first, then fall back to the first declared parent. Reuses `normalizeMaterialKey` from `src/lib/materials.ts`.
- `src/components/MaterialBundle.tsx`: `ResolvedMaterial` gains `includedWith?: string`, filled in `resolveMaterials` from the sibling list; the sub-line renders the note instead of "Source locally" when there is no supplier link.
- `src/components/SkillActivity.tsx` "What you'll need" grid: per-item note using `cleanMaterialName` on the raw label, so the grid's wording is unchanged apart from the added note.
- `src/pages/AdminMaterialsPage.tsx`: chip next to the Essential badge; `allMaterialsCount` and `coveredCount` skip bundled keys, with a separate included count in the header.
- Deliverables: extend `/tmp/materials-dump.ts` to emit `includedWith` per row and `/tmp/build_deliverables.py` to write the new column and the annotated text file; regenerated into `/mnt/documents`.
- Tests: new Vitest covering parent resolution with and without a matching sibling, and that unbundled materials return null.
- Verification: `bunx tsc --noEmit`, `bunx vitest run`, a read-only dump of the four strip-board and bells activities, and a Playwright check of the Subtraction Strip Board activity page confirming the note renders and no "Buy" link appears for the strips.
