# Prepublication diagnostic — 6 October 2026

## Verdict
Full functionality is **not verified**. Do not treat this diagnostic as a complete release sign-off. No website functionality, prices, subscriptions, or native settings were changed and nothing was published.

## Checks completed
- Automated tests: **53 passed across 9 test files** (Vitest).
- Public preview: **36 routes × desktop and phone = 72 views**. No page exceptions, broken loaded image elements, or page-level horizontal overflow detected in these views. Lazy imagery was scrolled into view. This is sampled visual coverage, not a guarantee of asset accuracy or every interaction.
- Opened the free starter in all **nine curriculum areas**, inspected loaded images and material links, and returned using each activity's Back control (installation banner had to be dismissed).
- Classroom Setup → Explore the full AMI curriculum reached `/#curriculum` and displayed the target; Culture globe loaded in both preview and published site.
- Signup: mismatched passwords produce an inline error; password visibility toggle works; blank forgot-password request prompts for an email. No real account created, email sent or password changed.
- Plans: billing toggle changes displayed monthly/annual plan; consultation control invokes the email-booking code path. Actual email application and delivery not verified.
- Songs: public catalog responds successfully but presents a coming-soon/empty state; sign-in-to-purchase button routes to `/auth?redirect=/songs`.
- Actual services: dashboard-data, admin-members, admin-lead-stats, update-child-addons and set-covered-children return **401** without a member session. create-checkout and video-playback-url return **400** for empty requests; this proves availability/input rejection only, not authenticated behavior. song-playback-url returns **200** for public catalog.
- Hosted Supabase auth settings read successfully: signup enabled; email, Google and Apple enabled; email confirmation required. This verifies settings, not completed OAuth or email delivery.
- Five published pages (home, Plans, Shop, Classroom Setup, Pouring Water preview) rendered app-specific headings/titles.
- Basic backend security checks: no issues reported. **Deep code security analysis was not performed.** Project monitoring has no pending findings. Older persisted scanner results are stale and are not a fresh clean bill of health.

## Confirmed problems
1. **Password reset cannot display for an authenticated recovery session.** `src/pages/AuthPage.tsx:175` returns null whenever `user` exists; the reset form at 187–195 requires that same user. The reset route skips the normal redirect, leaving an authenticated reset user with blank content. Confirmed by source control flow; a real recovery-session browser flow was unavailable.
2. **Plans contain contradictory child limits and savings.** `src/components/SubscriptionPlans.tsx:528` says “Whole family” for $199/year, while features say one child. Lines 74, 631 and 697 use $149 savings; line 553 uses 43%. $29.99 × 12 − $199 = **$160.88**, approximately **44.7%**. The annual description's “Two months free” also does not match these prices. Prices themselves were not altered.
3. **Install banner blocks Back.** A reproduced desktop click fails because the full-width top banner container intercepts the Back button although the visible banner is centered away from that button. Dismissing the banner restores Back. Evidence screenshot and hit test captured. `src/components/InstallBanner.tsx:173`.
4. **Empty song collection still offers purchase.** Songs currently shows “The song collection is coming soon” alongside its purchase/sign-in CTA. `src/pages/SongsPage.tsx:138–149,164–169`; handler 69–89 has no loaded/available catalog guard. No checkout or payment was attempted.
5. **Invalid font preload.** `src/components/SEOOptimizer.tsx:17` preloads `/fonts/inter.woff2`, which does not exist. It is appended repeatedly on mounting pages; remove or replace with the actual font source and avoid duplicate hints. Not classified as a core functionality blocker.
6. **Lint fails: 110 findings — 72 errors and 38 warnings.** Mostly explicit-any types, hook dependencies, and development export warnings. These are not 110 reproduced visitor defects, but the code-quality check does not pass.
7. **Dependency security scan is not clean.** Fresh scan reports critical advisories in locked Capacitor Android/iOS 8.4.1 (reported fix 8.4.3), plus a critical tar advisory through Capacitor CLI, and high/moderate advisories through other packages. Some involve development tooling, Node-only transitive dependencies or APIs not exercised by this SPA; exploitability needs triage before choosing compatible upgrades. Do not claim the whole site is exploitable from the advisory list alone, or dismiss native runtime advisories. Exact scanner output retained in the diagnostic tool result.

## Not verified / external blockers
- Signed-in Family Dashboard, per-child analytics, goal prioritization, calendar creation/edit/read-back, preferences persistence, child creation/edit/coverage, Premium activities/videos and Admin member/leads/material edits: this project uses external unmanaged Supabase auth and no reusable authorized browser session was available. Do not use simulated sessions to count these as verified.
- Real Stripe/Apple/Google purchases, renewals, cancellations, restoration and mixed website/store add-on child counts.
- Password-reset email receipt and successful reset, signup email receipt and completion, Google/Apple sign-in end-to-end.
- Notification email and push delivery, scheduling across time zones and platform permission behavior.
- Native iOS/Android launch, safe areas, native links, media playback and store product configuration on real devices.
- Each Amazon product's continued availability, shipping/localization and photo-to-product accuracy; inspected links are present but not all external purchase pages were opened.
- Every Premium activity's pedagogical/photo accuracy. Public image loading is not an authenticity review.
- Google indexing/Search Console and store listing submission; document edits do not update Apple/Google listings.

## Evidence
Temporary browser evidence: `/tmp/browser/prepublish/` (page JSON, desktop/phone screenshots, activity checks, signup validation, service checks, banner hit-test/screenshot).
Test output: `/tmp/prepublish-tests.log`; lint output: `/tmp/prepublish-lint.log`.

Read-only audit hypotheses about future sitemap dates were rejected: May 2026 is in the past as of this diagnostic date. Unused local purchasedItems is not the songs entitlement gate; songs use server-validated access. Potential browser-history/state-only activity navigation limitations require a separate explicitly scoped fix, not a speculative release-blocker claim.
