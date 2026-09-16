# Correct the Snake Game material names

The gray bead bars are the AMI **gray bead stair**: nine gray bead bars, one through nine, held in their own box and used as the quantities to take away in the Subtraction Snake Game. Bars one to five are light gray and six to nine are darker gray so the child can keep count while counting backward.

Today the app calls it "Gray bead bars (subtrahends)" — a teaching note rather than the material's name — and the two snake-game activities carry other loose names too. This plan fixes the names at source, keeps older spellings mapped to the right place, and refreshes the materials lists.

## Naming changes

| Where it appears now | Becomes |
| --- | --- |
| Gray bead bars (subtrahends) | Gray bead stair |
| Colored bead bars | Colored bead stair (1–9) |
| Golden ten bars | Golden bead ten bars (already the standard name; source will use it directly) |
| Black and white stair / Black and white verification stair | Black and white bead stair |
| Notched number cards (optional) | Notched card (bridge) |

"Notched card (bridge)" is the single card the child lays across the snake to hold the black and white bar. It is a different object from the notched number cards used with the strip boards, so the two are no longer merged under one label.

## Changes

1. **Snake-game activities** (`src/data/amiMathSkills.ts`) — the Addition Snake Game and Subtraction Snake Game material lists are rewritten with the names above. The Subtraction Snake Game description, its materials-purpose notes and its presentation steps are reworded to say "gray bead stair" instead of "gray bead bars", and the light-gray / dark-gray detail is added where it helps the adult understand the material.

2. **Normalisation rules** (`src/lib/materialCleanup.ts`) — add mappings so any older or variant spelling still lands on the correct name: gray/grey bead bars, gray bead bars (subtrahends), gray bead stair (1–9) and negative bead bars all become "Gray bead stair"; the bare label "colored bead bars" joins "Colored bead stair (1–9)" (these two currently sit side by side in the list as near-duplicates); the notched card spellings map to "Notched card (bridge)".

3. **Shop catalog entry** (`src/data/montessoriMaterials.ts`) — the "Snake Game (Addition)" listing describes "Colored and golden bead bars". Its wording is corrected to the stair terminology so the shop and the activity pages agree.

4. **Refresh the deliverables** — regenerate `montessori-materials-alphabetized.txt` and `montessori-materials-by-section.xlsx` in Files so the new names, the merged colored-bead entry and the corrected material count carry through.

### Optional, tell me if you want it

AMI albums also specify a **gray felt mat** (green binding for subtraction, red for addition) for both snake games; the activities do not currently list a mat of their own. I have not added it — say the word and it goes in.

## Technical details

- The activity pages, Admin → Materials, and the spreadsheet all read the same cleaned extraction in `src/lib/materials.ts`, so correcting the source arrays and the alias table updates every surface at once. No database changes; `material_links` is untouched, so any saved Amazon links stay put (the affiliate tag `kerryhoward-20` is still applied automatically).
- New alias keys are added as lowercase-normalised entries, matching the existing table style in `src/lib/materialCleanup.ts`, and are checked so no two rules resolve to the same key with different casing.
- The gray bead stair currently resolves to the existing bead-material photo in `src/lib/materialImageRegistry.ts` (the pattern already matches "bead stair"), so nothing breaks visually. A dedicated gray bead stair photo can be commissioned separately.

## Verification

- TypeScript check and the full Vitest suite pass.
- A read-only extraction prints the cleaned material list for both snake-game skills, confirming the five names above and that no old spelling survives.
- The regenerated alphabetized list is searched for each new name and for each removed one, and the distinct-material count is compared with the current 400.
- The Mathematics group in Admin → Materials is checked to show the corrected names with the affiliate badge unchanged.
