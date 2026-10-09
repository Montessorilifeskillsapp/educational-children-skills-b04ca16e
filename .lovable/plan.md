# Screen-Recorded App Demo for TV

Record real footage of the app working, as clean video clips your editor can cut into a TV spot. Nothing is invented or animated: every frame comes from the live app.

## What you will receive

High-quality MP4 clips saved to your Files, one clip per scene, with no sound and no captions, so your editor has full control:

1. **Homepage**: slow scroll through the hero, how it works, and the curriculum areas.
2. **Choosing a curriculum area**: opening Practical Life and browsing activities from beginner to advanced.
3. **A full activity (Pouring Water)**: materials with photos, preparation, step-by-step presentation, and what to observe next.
4. **Instructional video**: a protected activity video playing inside the app.
5. **Family Dashboard**: a child's progress, prioritized goals, and the calendar.
6. **Plans**: Premium and Family plans side by side, plus the consultation with Kerry.
7. **Phone view**: the same key moments in a phone-sized frame, for picture-in-picture or vertical cuts.

## Format

- Widescreen 1920x1080 (TV standard) at a smooth frame rate. Phone clips are 1080x1920.
- Paced like a person using the app, with gentle scrolling, deliberate taps, and short pauses on key screens.
- The browser frame and address bar are hidden, so only the app shows.

## How it is made

- Recorded from the published site, signed in to a premium demo account. No real customer data appears on screen.
- The demo account gets one sample child with a few completed activities and goals, so the dashboard looks lived-in. This sample data stays on the demo account only.
- Nothing in the app itself changes.

## Limits to know

- Phone clips are the website shown at phone size, not footage from the installed iPhone/Android app. For true native-app footage, use the iPhone's built-in screen recording on a device signed in to the demo account. I'll give you the steps.
- I can't add a voiceover, music, or logo cards here. Those happen in your editor.

## Technical details

- Recording is scripted browser automation with video capture at 1920x1080, then converted with ffmpeg to H.264 MP4 at high bitrate. Each scene is cut into its own file.
- The session uses the seeded `applereview2@` demo account, which already has manual premium access. The `seed-apple-review` function is extended to add one demo child profile plus sample progress and goals using the service role. This is safe to re-run, and there are no schema changes.
- Before delivery, each clip is checked by pulling still frames, to make sure no install banners, error toasts, or blank images appear.
