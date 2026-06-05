
## Current launch-readiness status

**Passing**
- 34/34 frontend tests pass
- TypeScript compiles with no errors
- No high/critical dependency vulnerabilities
- All routes render (verified `/` and `/math` in the live preview, no console or network errors)
- RLS policies are tight: every user-data table denies anon, scopes to `auth.uid()`, and writes to sensitive tables (`leads`, `subscribers`, `email_schedule`, `stripe_webhook_events`) are fully denied to clients and handled by edge functions

**Issues found**

1. `internal_get_secret()` is a `SECURITY DEFINER` function in the `public` schema with `EXECUTE` granted to `anon` and `authenticated`. It reads from `vault.decrypted_secrets`, so any signed-in user (or anon, depending on exposure) could call it via PostgREST RPC and read decrypted secrets. This is the single real security risk before launch.
2. 22 Supabase linter warnings about tables being visible in the auto-generated GraphQL schema. The app uses the REST client, not GraphQL, so this is informational — not a launch blocker.
3. 48 ESLint errors and 31 warnings, all inside `supabase/functions/**` (mostly `no-explicit-any` in edge functions and `react-refresh/only-export-components` in email templates). Non-blocking at runtime.
4. PWA "Add to Home Screen" banner overlays the hero on first load — a UX polish item, not a blocker.

## Proposed plan

### Step 1 — Lock down `internal_get_secret` (required before launch)

Migration:
- Revoke `EXECUTE` on `public.internal_get_secret(text)` from `PUBLIC`, `anon`, and `authenticated`
- Keep `EXECUTE` for `service_role` only (edge functions use the service role internally)

This closes the secret-disclosure path without affecting any edge function that calls it server-side.

### Step 2 — Clean up edge-function lint errors (optional, recommended)

Replace `any` types with proper types in:
- `supabase/functions/_shared/transactional-email-templates/registry.ts`
- `supabase/functions/admin-funnel-stats/index.ts`
- `supabase/functions/admin-lead-stats/index.ts`
- `supabase/functions/customer-portal/index.ts`
- `supabase/functions/send-transactional-email/index.ts`
- `supabase/functions/subscribe-lead-magnet/index.ts`

No behavior change, just type safety.

### Step 3 — Delay PWA install banner (optional UX polish)

Show the "Add to Home Screen" banner after the first scroll or after ~10 seconds, instead of immediately over the hero on landing.

### Step 4 — Re-run diagnostics

After Step 1 lands: re-run the Supabase linter and security scan to confirm the SECURITY DEFINER finding is resolved.

## Out of scope

- The 22 GraphQL-exposure warnings (not used by the app)
- Repository-wide ESLint cleanup in non-edge-function code (already clean)
- Any feature/UI changes

## Recommendation

Apply Step 1 before launch. Steps 2–3 can ship post-launch.
