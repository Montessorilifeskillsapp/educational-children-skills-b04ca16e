# Make saved Amazon links appear on every activity that uses that item

## What I found

**Carrying a Chair:** the saved link for "Child-sized wooden chair" uses the exact name that the Carrying a Chair activity lists. In the current version of the app, the Buy link should already show on that page. I couldn't open the page to check, because it's a Premium activity and I can't sign in from here. So I haven't confirmed why it's missing. Two likely causes:
- you were looking at the published site or the phone app, which may be running an older version, or
- something on the page drops the link after the list loads.

**Other activities: yes, the same thing happens.** A link is only attached when the activity's wording matches the saved item's name exactly. Of 378 activity materials, 96 currently pick up a link. About 15 more are worded slightly differently from an item that already has a saved link, so no Buy link appears for them:

| Activity | Activity says | Saved link exists as |
|---|---|---|
| Dressing Frames Practice | Button frame / Zipper frame / Snap frame / Buckle frame / Lacing frame | Button / Zipper / Snap / Buckle / Lacing dressing frame |
| Table setting | Placemats | Placemat |
| Transferring Activities | Tongs | Small tongs |
| Cloth Washing | Basin | Small basin |
| Basic Drawing Skills | Rulers | Ruler |
| Transferring Activities | Small cloth | Cloth / Soft cloth (needs your choice) |
| Sorting Objects | Control chart | none that fits (several are subject-specific, so leave unlinked) |

Some matches are unclear, and I won't guess at those: Small knife vs. Fork, knife and spoon; Plants vs. Plant mister; Cotton pad vs. Cotton balls. They stay unlinked unless you say otherwise.

## What I'll change

1. **Confirm the chair problem first.** I'll load the Carrying a Chair materials list with the live saved links and check whether the Buy link appears. If it does, the cause is an older published or phone version, and publishing fixes it. If it doesn't, I'll fix the cause I find.
2. **Add a short "same item" list** so each confident match above uses the existing saved link. Activity wording, activity order, and saved links stay exactly as they are. Only the Buy link appears.
3. **Leave unclear items alone**, and list them in Admin → Materials so you can link them yourself if you want.
4. **Re-run the audit** afterwards and report the new count of linked materials.

This is a website-only change. No app store release is needed.

## Technical details
- Links are matched by exact normalized key (`normalizeMaterialKey`) in `resolveMaterials`. Add an explicit alias map (activity key → saved `material_key`) in `src/lib/materialCleanup.ts` or a new `materialAliases.ts`, and apply it in `resolveMaterials` only when the material's own key has no link.
- Verification for step 1: a component test that renders `GetTheMaterials` for `carrying-a-chair` with a mocked `child-sized-wooden-chair` link.
- No database or edge function changes.
