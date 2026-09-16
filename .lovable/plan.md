# Correct the snake-game and strip-board material names

The gray bead bars are the AMI **gray bead stair**: nine gray bead bars, one through nine, held in their own box and used as the quantities to take away in the Subtraction Snake Game. Bars one to five are light gray and six to nine are darker gray, so the child can keep count while counting backward.

The blue strips are the numbered wooden strips supplied with the strip boards, and here the app has them backwards: the authentic Subtraction Strip Board uses plain wooden strips for the number you subtract from and the blue strips for the amount subtracted, while the app labels the blue strips as the minuend and the red strips as the subtrahend.

This plan corrects those names at source, keeps older spellings mapped to the right place, and refreshes the materials lists.

## Naming changes

| Where it appears now | Becomes |
| --- | --- |
| Gray bead bars (subtrahends) | Gray bead stair |
| Colored bead bars | Colored bead stair (1–9) |
| Black and white stair / Black and white verification stair | Black and white bead stair |
| Notched number cards (optional) | Notched card (bridge) |
| Blue strips (minuend) | Natural wooden strips (1–18) |
| Red strips (subtrahend) | Blue strips (1–9) |
| Red and blue strips | Red strips (1–9) and Blue strips (1–9) |

Golden ten bars already normalises to "Golden bead ten bars"; the activities will use that name directly instead of relying on the mapping.

"Notched card (bridge)" is the single card the child lays across the snake to hold the black and white bar. It is a different object from the notched number cards used with the strip boards, so the two are no longer merged under one label. The same blue and red strip sets are named identically on both boards, so one shopping entry covers each.

## Changes

1. **Snake-game activities** (`src/data/amiMathSkills.ts`) — the Addition Snake Game and Subtraction Snake Game material lists are rewritten with the names above. The Subtraction Snake Game description, its materials-purpose notes and its presentation steps are reworded to say "gray bead stair", with the light-gray / dark-gray detail added where it helps the adult understand the material.

2. **Strip-board activities** (`src/data/amiMathSkills.ts`, `src/data/additionalMathSkills.ts`) — the Subtraction Strip Board material list and its presentation steps are corrected so plain wooden strips carry the starting number and the blue strips do the taking away. The Addition Strip Board lists its two strip sets separately rather than as one combined line.

3. **Normalisation rules** (`src/lib/materialCleanup.ts`) — add mappings so any older or variant spelling still lands on the correct name: gray/grey bead bars, gray bead bars (subtrahends) and negative bead bars become "Gray bead stair"; the bare label "colored bead bars" joins "Colored bead stair (1–9)" (these two currently sit side by side in the list as near-duplicates); the notched card and strip spellings map to the new names above.

4. **Shop catalog entries** (`src/data/montessoriMaterials.ts`) — the Snake Game and Strip Board listings describe "colored and golden bead bars" and "wooden board with strips". Their wording is corrected so the shop and the activity pages agree.

5. **Refresh the deliverables** — regenerate `montessori-materials-alphabetized.txt` and `montessori-materials-by-section.xlsx` in Files so the new names, the merged colored-bead entry and the corrected material count carry through.

### Optional, tell me if you want it

AMI albums also specify a **gray felt mat** (green binding for subtraction, red for addition) for both snake games; the activities do not currently list a mat of their own. I have not added it — say the word and it goes in.

## Technical details

- The activity pages, Admin → Materials, and the spreadsheet all read the same cleaned extraction in `src/lib/materials.ts`, so correcting the source arrays and the alias table updates every surface at once. No database changes; `material_links` is untouched, so any saved Amazon links stay put (the affiliate tag `kerryhoward-20` is still applied automatically).
- New alias keys are added as lowercase-normalised entries, matching the existing table style in `src/lib/materialCleanup.ts`, and are checked so no two rules resolve to the same key with different casing.
- The gray bead stair resolves to the existing bead-material photo in `src/lib/materialImageRegistry.ts` (the pattern already matches "bead stair"), so nothing breaks visually. A dedicated gray bead stair photo can be commissioned separately.

## Verification

- TypeScript check and the full Vitest suite pass.
- A read-only extraction prints the cleaned material list for both snake-game and both strip-board activities, confirming the new names and that no old spelling survives.
- The regenerated alphabetized list is searched for each new name and for each removed one, and the distinct-material count is compared with the current 400.
- The Mathematics group in Admin → Materials is checked to show the corrected names with the affiliate badge unchanged.
