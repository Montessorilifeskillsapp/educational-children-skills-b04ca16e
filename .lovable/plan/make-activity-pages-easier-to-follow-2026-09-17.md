# Make activity pages easier to follow

## What's clunky right now

Looking at a real activity page (Carrying a Tray):

1. **Materials are listed twice.** A grey "Required Materials" box, then immediately a second "Get the materials" box with the same items and pictures. The adult reads the same list twice before reaching the presentation.
2. **All the steps are one flat numbered run.** Fourteen boxes numbered 1–14. Steps 1–7 are the presentation you give, 8–11 are how to guide the child's practice, 12–14 are signs the child has mastered it. Nothing on screen tells them apart, so it reads as a 14-step chore.
3. **Every step is its own big white card.** Huge vertical scroll, a lot of empty space, and the eye has to jump between widely spaced lines instead of reading a sequence.
4. **The title gets cut off.** The heading sits between the Back button and nothing, so longer names run off the edge at this width.
5. **Two different page designs exist.** Practical Life activities use one layout, every other section uses another (big coloured category banner, emoji, "Activity Steps" card). Same app, two experiences.

## What to build

**One shared activity layout, used by every section.**

Top of page
- Back button on its own line, full-width title underneath so it never clips.
- Small section label (Practical Life, Sensorial, …) instead of the oversized coloured banner.
- Photo.
- One short purpose line — no card frame around a single sentence.

One materials section, not two
- Merge "Required Materials" and "Get the materials" into a single "What you'll need" block: picture, name, and either Buy, "Included with …", or "Use what you have" per item, plus the Buy-all button and the disclosure. All current link behaviour stays exactly as it is.

Steps grouped into the three phases
- **Show the child** (presentation steps), **Guide their practice**, **Signs of mastery** — each a labelled group with its own numbering restarting at 1, so a 14-step wall becomes 7 + 4 + 3.
- Compact rows inside each group: number, text, tick — a list, not a stack of cards. Roughly half the current scroll length.
- Ticking a step still works the same; the completion card at the end is unchanged.

Sections that already carry the full Montessori learning process (Sensorial and the enhanced activities) keep that component; it slots in below the materials in the same shell.

## Technical notes

- New `src/components/activity/ActivityLayout.tsx` plus `ActivityStepGroup.tsx`, holding header, photo, purpose, materials, steps.
- `PracticalLifeSkills.tsx` and `SkillActivity.tsx` both render through it; step-building keeps its existing `presentation-*`, `guided-*`, `independent-*` ids, which is what the phase grouping keys off.
- Materials merge reuses `GetTheMaterials` / `MaterialBundle`; no changes to `materialBundles`, affiliate tagging, or the alternatives route.
- Colours and spacing come from existing tokens; no new palette.
- Video, Buy-all, and completion behaviour untouched.
