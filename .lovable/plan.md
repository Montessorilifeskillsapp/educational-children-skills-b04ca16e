# Video Archive: an instructional video for every activity

Every activity in the curriculum gets its own instructional video. The videos are your own proprietary files, kept private behind the subscription, playable inside the app, and downloadable so families can watch them with no internet. A public YouTube version can be linked alongside each one for reach.

## What families will see

- On every activity guide, a video sits at the top of the presentation, in the same visual style as the rest of the page.
- Members can play it, and tap **Save for offline** to keep it on the device. Saved videos show a "Available offline" badge and play with no connection.
- A **Downloads** control on each video lets them remove it again to free up space.
- Non-members see the video thumbnail with a lock and an upgrade prompt — except on the one free starter activity per section, which plays in full (matching the existing free-access rule).
- If a video also exists publicly on YouTube, a small "Watch on YouTube" link appears under the player.

## How the videos stay protected

- Video files live in a private storage bucket. They are never publicly reachable by URL.
- When a member presses play, the app asks the server for a short-lived playback link. The server checks their subscription first and refuses if they are not entitled.
- Offline copies are stored inside the app's own cache on the device, not as a downloadable file in the user's file system, so they cannot be casually shared.
- Guests and expired subscribers get no link at all, only the thumbnail.

## Admin side

A new **Videos** screen at `/admin/videos`, built to match the Materials screen you already use:

- Every activity across all nine curriculum areas, grouped by area, collapsible, with search.
- Coverage bars: overall and per area ("X of Y activities have a video").
- Per activity: upload a video file (or paste a storage path), optional thumbnail, title, duration, a public YouTube URL field, and an Active toggle.
- Upload progress and replace/remove actions.

## Build order

1. Database table `activity_videos` (activity/skill id, storage path, thumbnail, title, duration, youtube_url, active) with public read limited to non-sensitive fields; all writes through an edge function.
2. Private storage bucket `activity-videos` plus a thumbnails bucket that can be public.
3. Edge function `video-playback-url` — verifies the signed-in user, checks entitlement via the existing subscription check, allows the free starter activity for everyone, and returns a short-lived signed URL.
4. Edge function `admin-activity-videos` — admin-only create/update/delete, and issuing upload URLs.
5. `ActivityVideo` component replacing/wrapping the current `VideoPlayer` on activity guides: locked state, play, offline save/remove, YouTube link.
6. Offline layer: a small download manager that fetches the signed URL, stores the file in a dedicated Cache Storage bucket keyed by activity, records saved items, and serves them first when offline. Registered with the existing PWA service worker.
7. `/admin/videos` screen with grouped list, uploads and coverage.
8. Checks: typecheck, tests, a locked/unlocked pass on an activity page, and an offline playback test.

## Technical notes

- Reuse `curriculumSectionsForMaterials` from `src/data/curriculumSections.ts` for the grouped admin list and for enumerating every activity.
- Entitlement reuses the existing server-side `check-subscription` logic; free-starter detection reuses the same rule as `applyFirstFreeItemLimit`.
- Existing `videoUrl` values in the data files stay supported as a fallback so nothing breaks while the archive is filled in.
- Signed URLs are short-lived (about 1 hour); offline playback uses the cached blob, so expiry does not affect saved videos.
- Cache Storage (not IndexedDB) keeps blobs streamable; on iOS via Capacitor this maps to the WKWebView cache, so large libraries should be saved selectively rather than all at once.
- Large source files are uploaded straight to storage from the admin screen, so they never enter the codebase.

## Open item

Encoding: uploads are stored as-is. If your source files are large (over ~100 MB each), we should agree on a target size/format (720p H.264 MP4) before bulk uploading, so offline downloads stay practical on phones.
