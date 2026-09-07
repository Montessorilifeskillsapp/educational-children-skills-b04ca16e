# Video Archive: an instructional video for every activity

Every activity in the curriculum gets its own instructional video. The videos are your own proprietary files, kept private behind the subscription and played only inside the app — no download option, and no links sending people out to YouTube.

## What families will see

- On every activity guide, a video sits at the top of the presentation, styled like the rest of the page.
- Members press play and it streams in the app's own player.
- Non-members see the video thumbnail with a lock and an upgrade prompt — except on the one free starter activity per section, which plays in full (matching the existing free-access rule).
- No download button, no "watch on YouTube" link, no outbound links of any kind on the player.

## How the videos stay protected

- Video files live in a private storage bucket, never reachable by a public URL.
- When a member presses play, the app asks the server for a short-lived playback link. The server checks their subscription first and refuses if they are not entitled.
- Guests and expired subscribers get no link at all, only the thumbnail.
- The player has downloads disabled and no right-click save menu.

## Admin side

A new **Videos** screen at `/admin/videos`, built to match the Materials screen you already use:

- Every activity across all nine curriculum areas, grouped by area, collapsible, with search.
- Coverage bars: overall and per area ("X of Y activities have a video").
- Per activity: upload a video file, optional thumbnail, title, duration, and an Active toggle.
- Upload progress and replace/remove actions.

## Build order

1. Database table `activity_videos` (activity/skill id, storage path, thumbnail, title, duration, active). Reads limited to non-sensitive fields; all writes through an edge function.
2. Private storage bucket `activity-videos`, plus a thumbnails bucket for poster images.
3. Edge function `video-playback-url` — verifies the signed-in user, checks entitlement via the existing subscription check, allows the free starter activity for everyone, and returns a short-lived signed URL.
4. Edge function `admin-activity-videos` — admin-only create/update/delete and issuing upload URLs.
5. `ActivityVideo` component wrapping the current `VideoPlayer` on activity guides: locked state, poster, play, download controls disabled.
6. `/admin/videos` screen with the grouped list, uploads and coverage.
7. Checks: typecheck, tests, and a locked/unlocked pass on an activity page.

## Technical notes

- Reuse `curriculumSectionsForMaterials` from `src/data/curriculumSections.ts` to enumerate every activity and group the admin list.
- Entitlement reuses the existing server-side `check-subscription` logic; free-starter detection reuses the same rule as `applyFirstFreeItemLimit`.
- Existing `videoUrl` values in the data files stay supported as a fallback so nothing breaks while the archive is filled in.
- Signed URLs are short-lived (about 1 hour) and re-issued per playback.
- `<video controlsList="nodownload" disablePictureInPicture>` and no `download` attribute anywhere.
- Large source files upload straight to storage from the admin screen, so they never enter the codebase.

## Open item

Encoding: uploads are stored as-is. If your source files are large, a 720p H.264 MP4 target keeps streaming smooth on phones — worth agreeing before bulk uploading.
