# Classroom setup: images for the eight furniture and essential items

## Goal
Give the eight listed classroom basics an accurate photograph each, shown on the Classroom Setup page next to the item, matching the style of the images already on that page.

## Items to photograph (8)
1. Child-sized table
2. Low open shelving
3. Child-height mirror
4. Basket
5. Small jug or pitcher
6. Small ceramic bowls
7. Small waste basket
8. Potted plant

## How
1. Generate one photorealistic image per item in the established style: natural wood or simple classroom setting, soft daylight, no people, no readable text, no brands.
2. Review every image for accuracy before wiring it in — a missing image is better than a wrong one. Any image that fails review is regenerated or left out, and I'll tell you which.
3. Wire each approved image to its item in the "Furniture and essentials" list on the Classroom Setup page only. Nothing else on the page changes: no text, order, links, or layout beyond adding the photos.
4. Verify live: open `/classroom-setup`, confirm all eight photos load beside the correct items, and confirm existing Buy links are untouched.
5. Run typecheck and the 51-test suite before reporting done.

## Working agreement (standing, from your feedback)
- Smallest possible edit per request; no unrequested side changes.
- Shared data files, navigation, and multi-page changes get a written plan first.
- The 22-item classroom basics list stays as-is apart from adding these images.

## Technical details
- Images saved under `src/assets/classroom/` and mapped by exact material name in a small registry, following the existing section registry pattern (`src/assets/*/index.ts`).
- The Classroom Setup page renders an item's image only when a registry entry exists — no generic fallbacks.
