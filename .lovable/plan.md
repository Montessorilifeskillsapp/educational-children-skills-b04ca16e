# Amazon product photos for linked "What you'll need" items

## What changes
- Any item in "What you'll need" with an active Buy link shows the photo from its Amazon product page. The picture always matches what the link opens.
- If an item borrows its parent product's link ("Included with …"), it shows that product's photo.
- Items without a link keep the plain grey marker. No guessed or made-up photos.
- The Classroom Setup checklist uses the same rule.
- The 19 photos I generated are deleted and won't be used.

## How the photos get in
- In Admin → Materials, each linked item gets a "Product photo" with a "Fetch from Amazon" button. The button reads the main photo from the saved link.
- One "Fetch all missing photos" button fills every linked item in one go.
- If Amazon blocks a fetch, that item keeps the grey marker and admin shows "Photo not found". You can paste a photo address by hand instead.

## Not changing
- Layouts, Buy links, affiliate tags, the item lists and the commission note all stay as they are.
- Website only. No app store release.

## Technical details
- Migration: add a nullable `image_url text` column to `material_links`. Existing grants and RLS stay as they are (clients read, writes go through edge functions).
- New admin-only edge function `fetch-material-image`: it takes link IDs, scrapes each Amazon URL through Firecrawl (connected first), pulls the main product image (`og:image` / `#landingImage`), and saves `image_url` with the service role.
- Add `image_url` to `useMaterialLinks`. In `resolveMaterials` and `ClassroomMaterials`, prefer the link's `image_url` (own or inherited), then the approved classroom photo, then the marker.
- Delete the generated files in `src/assets/material-items/`.
