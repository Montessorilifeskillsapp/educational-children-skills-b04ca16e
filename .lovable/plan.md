
Goal: limit the free tier to exactly 1 existing free activity in each top-level section, using the section’s current display order. Everything else in that section should behave as premium-locked for non-premium users.

What I found
- Each curriculum section renders its own list/grid and already uses `skill.isPremium` plus the viewer’s `isPremium` subscription state to lock cards.
- The practical life page is special: it groups activities into subcategories, but your clarification says the limit should apply at the top-level section, not per subgroup.
- Printables currently have 3 “free” items and 6 premium items, and the component is temporarily rendering premium printables as unlocked.
- Art has a separate bug: `ArtSkills` passes the skill’s premium flag as the user premium prop to `SkillCard`, so premium locking there is not reliable today.
- Detail pages (`SkillActivity`, `PracticalLifeSkills`, `PrintableDetail`) do not currently enforce this “only 1 free starter item” rule by themselves, so list-level changes alone could leave direct-access gaps.

Implementation approach
1. Add one shared access helper
- Create a small utility that:
  - accepts an ordered list of section items
  - finds the first item where `isPremium === false`
  - returns a normalized list where:
    - that first free item stays free
    - every later item becomes premium for gating purposes
- Keep this purely presentational so existing source data files stay untouched.

2. Apply the helper to each top-level section list
- Practical Life: apply once to the merged/ordered full practical list before category grouping, so only one total practical-life activity remains free.
- Sensorial
- Language
- Math
- Geography
- Botany
- Cultural
- Grace & Courtesy
- Art
- Printables: keep only the first currently free printable free; move the rest into the locked experience.

3. Enforce access beyond the card grids
- Add the same rule wherever activity detail views open, so a non-premium user cannot bypass the limit by navigating directly or through stale state.
- This likely means resolving “effective premium access” centrally before rendering:
  - `SkillActivity`
  - `PracticalLifeSkills`
  - `PrintableDetail` / printable selection flow

4. Fix section-specific inconsistencies while doing this
- Art: pass the actual subscription state into `ArtSkills` and then into `SkillCard`.
- Printables: stop hardcoding `locked={false}` and derive lock state from the new effective-access rule.

Recommended files to update
- `src/components/PracticalLifeOverview.tsx`
- `src/components/SensorialSkills.tsx`
- `src/components/LanguageSkills.tsx`
- `src/components/MathSkills.tsx`
- `src/components/GeographySkills.tsx`
- `src/components/BotanySkills.tsx`
- `src/components/CulturalSkills.tsx`
- `src/components/GraceAndCourtesySkills.tsx`
- `src/components/ArtSkills.tsx`
- `src/components/MontessoriPrintables.tsx`
- `src/components/SkillActivity.tsx`
- `src/components/PracticalLifeSkills.tsx`
- plus a new shared helper, e.g. `src/lib/freeTierAccess.ts`

Behavior after the change
- Free users:
  - see exactly 1 free starter activity in each top-level section
  - see all other activities visually present but locked
  - cannot open locked activities from the grid or by direct detail rendering
- Premium users:
  - continue to access everything normally

Technical notes
- I would preserve current object/list order, since you chose “keep first existing free.”
- For Practical Life, “first existing free” should be determined from the merged practical list before splitting into Care of Self / Environment / etc., otherwise each subgroup could accidentally keep one free item.
- For Printables, there will still be a “Free Printables” area, but it would contain only 1 item unless you want the layout renamed later.

Validation plan
- Confirm each top-level section leaves only 1 unlocked card for a free user.
- Confirm the same locked items cannot open their detail view.
- Confirm premium users still see full access.
- Check the flow end-to-end in the preview, especially Art and Printables, because those currently have inconsistent gating behavior.
