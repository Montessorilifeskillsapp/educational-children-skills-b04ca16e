# Kerry's Montessori Songs bundle

## What users will see
- A new **Songs** page (linked from the Shop and the dashboard) showing the 10-song collection with cover art, titles and a short description.
- Every song has a **30-second free preview** anyone can play — signed in or not.
- A **"Get the full collection"** button. It's a separate purchase for everyone (Premium does not include it).
- Once bought, all 10 full songs play in the app. Songs stream only — no download button, no public file links (same protection as the activity videos).
- A small trademark/copyright line on the page ("© Kerry Howard. All rights reserved.").

## What you (admin) will see
- A new **Songs** admin page to upload each song, set its title, order and cover art, and switch it on/off. The 30-second preview is cut automatically from the start of each song (you can set a different start point per song).
- The Members admin page shows who owns the song collection.
- Until you upload songs, the Songs page stays hidden from users.

## Price
- **Families: $99.99 one-time purchase, lifetime access** — all 10 songs, full-length, forever. Not included with Premium.
- **Schools: annual classroom license** — left for the Schools Portal later, priced against the school-license examples you gave ($125–$2,450/year).

## Phone apps
The website purchase works right away. Buying inside the iPhone/Android apps needs a one-time product registered with Apple and Google plus the native release you already have planned. Until then, the apps show the previews and a note to buy on the website — anyone who buys there gets full access in the app too, because it's the same account.

## Technical details
- Private storage bucket `songs` (full tracks + generated previews); previews served via signed URLs to anyone, full tracks via signed URLs only after an ownership check in a new `song-playback-url` edge function.
- Tables: `songs` (title, sort_order, storage_path, preview_path, preview_start_seconds, cover_path, active) — public read of active rows; `song_purchases` (user_id, product, provider, stripe_session_id, purchased_at) — owner read only. All writes through edge functions (project rule).
- Checkout: extend existing Stripe checkout with a one-time `mode: "payment"` product for the bundle; purchase recorded on the existing Stripe webhook path. Price stored server-side.
- Admin: `admin-songs` edge function (has_role admin) for upload/metadata; preview clipping done in the browser on upload (Web Audio → 30s clip) to avoid server audio tooling.
- Native: later map a RevenueCat non-consumable `songs_bundle` in revenuecat-sync.
- Website-only change; no store release needed now.
