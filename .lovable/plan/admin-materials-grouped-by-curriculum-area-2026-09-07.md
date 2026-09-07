# Admin Materials: Grouped by Curriculum Area

The `/admin/materials` page currently shows all ~560 materials in one flat, searchable list. The shop already groups materials by curriculum area; we will bring the same area-based grouping into the admin so you can work through materials section by section.

## What changes

- **Curriculum-area sections on `/admin/materials`** — materials are grouped under the same nine areas used in the shop (Practical Life, Sensorial, Mathematics, Language, Geography, Botany, Art, Cultural Studies, Grace & Courtesy).
- **Area-level progress counters and bars** — each area shows "X of Y linked" and a mini progress bar, plus an overall total at the top.
- **Sticky area navigation** — a sidebar or horizontal jump-bar lets you jump to a section and highlights the one currently in view.
- **Essential-only filter** — a toggle that hides non-essential items so you can link the must-have materials first.
- **Search still works globally** — the existing search box filters materials within every area.
- **Compact card design** — slightly tighter spacing and collapsed-by-default sections so the page loads faster and scrolls less.

## What stays the same

- Each material keeps the same edit fields (Display name, Product URL, Supplier, Affiliate tag override, Notes, Active).
- Save/Clear actions remain per-material.
- The default Amazon tag stays `kerryhoward-20`.
- The edge function and database table do not change.

## Build order

1. Compute grouped material lists from `curriculumSectionsForMaterials` in `AdminMaterialsPage.tsx`.
2. Add area progress counters, essential-only toggle, and sticky section navigation.
3. Collapse sections by default and wire search to filter within each group.
4. Run typecheck, tests, and a quick visual check on `/admin/materials`.

## Technical notes

- Reuse `extractAllMaterialsFromSkills` per section from `src/lib/materials.ts`.
- Reuse the area metadata from `src/data/curriculumSections.ts`.
- Keep existing `LinkForm` state shape; only the render order changes.
- Essential detection uses the existing `essential` boolean from `ActivityMaterial`.
