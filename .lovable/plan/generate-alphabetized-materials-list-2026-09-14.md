# Generate alphabetized materials list

## Goal
Produce a plain-text (.txt) file containing every distinct material used across the curriculum, sorted alphabetically, with each material followed by the curriculum section(s) where it appears.

## Output
`/mnt/documents/montessori-materials-alphabetized.txt`

## Contents
- One material per entry.
- Each entry formatted as:
  ```
  Material Name
    - Section Name
  ```
  (or comma-separated section names if the material appears in multiple areas).
- Sorted A–Z case-insensitively.
- Based on the current cleaned `getMaterialsForSkill` pipeline so the list matches what parents and the admin page see.

## Steps
1. Run a one-off script that imports the existing curriculum sections and `getMaterialsForSkill` logic.
2. Extract every activity's materials, record each material's section(s), and normalize/clean names via the shared `cleanMaterialName` path.
3. De-duplicate by normalized material key while preserving all sections per material.
4. Sort alphabetically and write to the .txt file.
5. Report the total count and file path.

## Not in scope
- No app UI changes.
- No changes to material cleanup rules, affiliate links, or curriculum data.
