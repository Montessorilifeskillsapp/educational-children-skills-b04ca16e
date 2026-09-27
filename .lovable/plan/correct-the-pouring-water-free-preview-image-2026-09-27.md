# Correct the Pouring Water free-preview image

## Change
- Replace only the main photograph on the free Pouring Water preview page. The current photo shows a child pouring from a pitcher into a drinking glass; the lesson calls for pouring between two small pitchers.
- Use the existing pouring photograph you identified as looking right, which shows water going from one pitcher into another. Keep its existing use in the homepage activity example unchanged.
- Show the whole photograph without cropping out the supporting hand, spout, or receiving pitcher, and make its description match what is visible.
- Leave the rest of the preview page, homepage layout, links, and other activity photos untouched. The separate materials photograph is outside this single-image correction.

## Verification
- Open the free preview on desktop and mobile; confirm the main photo loads, both pitchers and the hand remain visible, and no other content or photos changed.

## Technical detail
- Change the main image import and its display treatment in `PreviewPouringWaterPage.tsx` only; reuse the existing `hero-child-pouring-approved.jpg` file, without generating or replacing assets.
