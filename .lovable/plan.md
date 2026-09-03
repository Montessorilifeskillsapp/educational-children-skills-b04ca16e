# Shop: Amazon Affiliate Materials

Turn the shop into a materials sourcing hub, where every activity's materials can be bought on Amazon through your affiliate links. (The video archive plan is set aside for now.)

## What the user sees

- A new **Materials** section on `/shop`, alongside the existing sections.
- Browse by curriculum area, then by activity. Each activity shows a **materials bundle card**: its material checklist (essential items marked), a thumbnail, and two actions — "Buy all on Amazon" (opens each linked item) and per-item "Buy" links.
- Items with no Amazon link yet show as "source locally" instead of a dead button, so partial coverage looks intentional.
- The same bundle appears as a compact "Get the materials" block at the bottom of each activity guide, linking into the shop.
- Required affiliate disclosure line ("As an Amazon Associate we earn from qualifying purchases") on the shop page and near each bundle.

## Admin

The `/admin` area gets a **Materials links** screen: every distinct material across the curriculum in one searchable table, with an Amazon URL field, optional product title/price note, and a coverage counter. Links are saved once per material and reused by every activity that needs it, so you don't paste the same tape-measure link twenty times.

## Build order

1. Database table + admin edge function.
2. Admin screen at `/admin/materials` with search, coverage counter, save/clear.
3. Shop Materials section (area → activity → bundle card).
4. "Get the materials" block on activity guides.
5. Disclosure copy and link hygiene pass.

## Technical notes

- New table `material_links`: `material_key` (normalised material name, unique), `display_name`, `amazon_url`, `notes`, `active`, timestamps. Public read of active rows; writes only through an `admin-material-links` edge function (RLS denies direct client writes, per existing security policy).
- Affiliate tag `kerryhoward-20` is appended centrally at render time by a `withAffiliateTag()` helper. The tag is stored in one configurable location (Supabase edge-function env var / site config) so it can be changed without scattering it through URLs or components.
- Bundles are derived, not hand-authored: activity material lists already exist in the curriculum data, so a `useMaterialLinks()` hook joins those material names to saved links; activities without a curated list fall back to the `materials` array on the activity data.
- All outbound links use `target="_blank" rel="sponsored noopener noreferrer"`.
- Existing shop products and story books are untouched; the Materials section is additive.

## Provided

- Amazon Associates tracking ID: `kerryhoward-20`.
