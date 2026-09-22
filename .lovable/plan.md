# Make the homepage factual and transparent

## Changes
- Remove the entire testimonials and ratings section, including the invented names, quotations, star rating, and “2,000+ reviews” claim.
- Remove unsupported founder credentials and experience claims from the homepage unless they can be independently substantiated.
- Replace outcome promises and inflated social proof such as “join thousands,” guaranteed child development, “no prep work,” and “all new content every month” with plain descriptions of what visitors can verify in the app.
- Correct homepage and `/welcome` wording so it describes the adult guidance, curriculum areas, activity photographs, materials lists, purchase links, and free starter access without claiming endorsements or results.
- Preserve the existing navigation, section order, pricing, purchase flow, photographs, and visual layout except where a removed testimonial section leaves space.

## Verification
- Search both public entry pages for testimonial names, ratings, review counts, unsupported credentials, and inflated audience claims.
- Check the homepage and `/welcome` at desktop and mobile sizes.
- Run the existing automated tests and type check.

## Technical details
- Update only `src/components/Home.tsx` and `src/pages/LandingPage.tsx`, plus the task checklist.
- Keep claims limited to behavior visible in the current product or facts already established by the owner.
