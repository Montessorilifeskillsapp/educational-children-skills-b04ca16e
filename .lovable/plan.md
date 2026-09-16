# Rename "Analysis charts" to "Sentence analysis chart"

The materials list currently shows a jargon item, "Analysis charts", which comes from a single
place in the curriculum data. Renaming it to **"Sentence analysis chart"** makes it read as one
clear item: the chart a guide prints or draws showing how the parts of a sentence are laid out.

## What changes

1. **Curriculum data (the source of the name)**
   - In the Sentence Analysis activity in Language, replace the material label
     "Analysis charts" with "Sentence analysis chart".
   - This is the only occurrence in the app, so the activity page, the "What you'll need" tiles,
     the "Get the materials" block and the Materials admin page all pick the new name up
     automatically — no other code needs touching.

2. **Safety net in the cleanup list**
   - Add an alias so the old label "Analysis charts" still resolves to the new name. Any older
     copy of the data (or a previously saved Amazon link filed under the old name) then points at
     the same single item instead of appearing as a second, duplicate row.
   - No database changes are needed: the materials table currently holds no saved links.

3. **Refresh the two downloaded lists**
   - Regenerate the spreadsheet (By Activity / By Material / Summary) and the alphabetized text
     list so both show "Sentence analysis chart | Language".
   - The export scripts were temporary and are gone, so they will be rebuilt and re-run against
     the current curriculum data; the existing files are replaced with the refreshed versions.

## What does not change

- The activity itself, its steps, its position in the Language section and its premium status.
- Every other material name, the Practical Life ordering, the shop links and affiliate tagging.
- "Sentence analysis chart" stays a locally-sourced item (printed or hand-made), so it gains no
  "Buy" link.

## How it is checked

- Typecheck and the existing test suite run clean.
- Search the codebase to confirm no remaining "Analysis charts" label.
- Confirm the regenerated spreadsheet and text list each contain exactly one "Sentence analysis
  chart" row and no "Analysis charts" row.
