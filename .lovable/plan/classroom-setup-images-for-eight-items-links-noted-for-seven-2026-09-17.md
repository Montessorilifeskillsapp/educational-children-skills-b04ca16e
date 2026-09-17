# Classroom setup: images for eight items, links noted for seven

## Goal
Give eight classroom basics an accurate photograph each on the Classroom Setup page, matching the style of the images already there. No other changes.

## Images to create (8)
1. Child-sized table
2. Low open shelving
3. Child-height mirror
4. Basket
5. Small jug or pitcher
6. Small ceramic bowls
7. Small waste basket
8. Potted plant

## How
1. Generate one photorealistic image per item in the established style: natural materials, soft daylight, no people, no readable text, no brands.
2. Review every image for accuracy before wiring it in — a missing image is better than a wrong one. Failures are regenerated or left out, and I'll tell you which.
3. Wire each approved image to its item in "Furniture and essentials" on the Classroom Setup page only. No text, order, link, or layout changes beyond adding the photos.
4. Verify live on `/classroom-setup`: all eight photos load beside the correct items, existing Buy links untouched.
5. Run typecheck and the 51-test suite before reporting done.

## Links — your action, no code change
These seven items still show "Use what you have" until you paste Amazon links in **Materials admin → Classroom Setup**: jug/pitcher, bowls, tumbler/glass, broom and dustpan, mop, dusting cloths, sponges. No app work is needed for this — the link fields already exist.

## Working agreement (standing, from your feedback)
- Smallest possible edit per request; no unrequested side changes.
- Shared data files, navigation, and multi-page changes get a written plan first.
- The 22-item classroom basics list stays as-is apart from adding these images.

## Technical details
- Images saved under `src/assets/classroom/` and mapped by exact material name in a small registry, following the existing section registry pattern (`src/assets/*/index.ts`).
- The Classroom Setup page renders an item's image only when a registry entry exists — no generic fallbacks.
