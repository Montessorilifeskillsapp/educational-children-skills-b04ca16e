# Activity Video Archive

A managed library of demonstration videos — one per activity — hosted on your YouTube channel, embedded inside every activity guide, and gated behind premium.

## How it works

1. You upload each demonstration to your YouTube channel (public or unlisted).
2. In a new admin screen (`/admin/videos`), you paste the YouTube URL against the matching activity, add a title/caption, and save.
3. Every activity guide shows a "Watch the Presentation" video section directly under the activity header.
   - Premium members: the video plays inline.
   - Free users: a blurred/locked preview with the activity thumbnail and an "Unlock with Premium" button leading to the plans page.
   - The one free starter activity per section is not exempt — video stays premium-only, as requested.
4. Activities with no video yet simply show nothing (free users see no locked teaser either), so the scaffold can roll out across the whole curriculum without empty placeholders.

## Admin screen

- Lists every activity across all eight curriculum areas (pulled from the existing activity data), grouped by area, with a search box and a "missing video" filter so you can see coverage at a glance.
- Per row: YouTube URL field, optional caption, save/clear, and a coverage counter (e.g. "42 of 310 activities have video").
- Admin-only, matching the existing access-code admin pattern (role check + edge function with service role).

## Technical notes

- New table `activity_videos`: `activity_id` (unique text, matches the skill id used by `SkillActivity`), `youtube_url`, `youtube_id`, `title`, `caption`, `published` flag, timestamps. Public read is allowed only for `published` rows; all writes go through an `admin-activity-videos` edge function (RLS denies direct writes, per existing security policy).
- New hook `useActivityVideo(activityId)` fetches the row; a `useActivityVideos()` batch hook feeds the admin table.
- New component `ActivityVideo.tsx`: YouTube iframe (privacy-enhanced `youtube-nocookie.com`, lazy-loaded) for premium, locked card for free users. Reuses the existing subscription context for the premium check and the same lock styling as `PremiumGate`.
- `SkillActivity.tsx` renders `ActivityVideo` once, above the Materials section, so all curriculum areas get it from a single change.
- The existing per-step `VideoPlayer` stays untouched.
- URL parsing accepts `youtube.com/watch?v=`, `youtu.be/`, and `/shorts/` forms and stores the canonical video id.

## Out of scope for this pass

- Producing/uploading the actual videos (you supply them on YouTube).
- Automatic YouTube API sync of titles/thumbnails — can be added later if you want the archive to self-populate from a playlist.

---

# Shop: Amazon Affiliate Materials

Turn the shop into a materials sourcing hub, where every activity's materials can be bought on Amazon through your affiliate links.

## What the user sees

- A new **Materials** section on `/shop`, alongside the existing sections.
- Browse by curriculum area, then by activity. Each activity shows a **materials bundle card**: its material checklist (essential items marked), a thumbnail, and two actions — "Buy all on Amazon" (opens each linked item, or a pre-built Amazon list) and per-item "Buy" links.
- Items with no Amazon link yet show as "source locally" instead of a dead button, so partial coverage looks intentional.
- The same bundle appears as a compact "Get the materials" block at the bottom of each activity guide, linking into the shop.
- Required affiliate disclosure line ("As an Amazon Associate we earn from qualifying purchases") on the shop page and near each bundle.

## Admin

The `/admin` area gets a **Materials links** screen: every distinct material across the curriculum in one searchable table, with an Amazon URL field, optional product title/price note, and a coverage counter. Links are saved once per material and reused by every activity that needs it, so you don't paste the same tape-measure link twenty times.

## Technical notes

- New table `material_links`: `material_key` (normalised material name, unique), `display_name`, `amazon_url`, `notes`, `active`, timestamps. Public read of active rows; writes only through an `admin-material-links` edge function.
- Affiliate tag is appended centrally at render time by a `withAffiliateTag()` helper reading a single configured Associates tag, so the tag can change in one place and pasted URLs don't need it.
- Bundles are derived, not hand-authored: `src/data/activityMaterials.ts` already maps activity id to material list, so a `useMaterialLinks()` hook joins those names to saved links. Activities missing from that map fall back to the `materials` array on the activity data.
- All outbound links use `target="_blank" rel="sponsored noopener noreferrer"`.
- Existing shop products and story books are untouched; the Materials section is additive.

## Needed from you

Your Amazon Associates tracking ID (e.g. `yourstore-20`) — I'll store it as configuration. Without it the links still work, they just won't be attributed.
