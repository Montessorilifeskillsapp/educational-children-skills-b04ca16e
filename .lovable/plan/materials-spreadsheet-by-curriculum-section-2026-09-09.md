# Materials Spreadsheet by Curriculum Section

Generate an Excel workbook listing every material used by every activity, ordered by curriculum section (Practical Life, Sensorial, Mathematics, Language, Geography, Botany, Art, Cultural Studies, Grace & Courtesy) and, within each section, by activity in its existing beginner-to-advanced order.

## What you get

A single `.xlsx` file with two tabs:

**Tab 1 — By Activity**
One row for each activity/material pair.

| Section | Activity | Material | Essential | Supplier link | Supplier |

**Tab 2 — By Material**
One row per unique material within a section, deduplicated.

| Section | Material | Essential | Used in (activities) | Times used | Supplier link | Supplier |

Both tabs get a frozen, bold header row, sensible column widths, an autofilter, and a consistent professional font. A short summary block at the top of Tab 2 shows totals per section and how many materials already have a supplier link.

Supplier links come from the saved materials list in the admin area, with the Amazon tag `kerryhoward-20` applied where relevant. Materials with no link saved yet are left blank so the sheet doubles as a to-do list.

## How it is built

- A one-off Node script reads the curriculum data directly from the project (`curriculumSectionsForMaterials`) and resolves materials per activity with the same helpers the app uses (`getMaterialsForSkill`), so the sheet always matches what the app shows.
- Saved supplier links are pulled from the `material_links` table and matched on material key.
- The workbook is written to the documents area and attached in chat for download.

## Notes

- No changes to the app itself — this is a generated file, not a new page or feature.
- If you later want this as a downloadable export button inside the admin area, that would be a separate follow-up.
