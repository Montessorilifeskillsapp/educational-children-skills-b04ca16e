# Agents
- Family Dashboard lives in `src/components/family/`; old demo dashboard is kept unrouted in `src/components/schools-template/` as the future Schools Portal template. Why: parents need real per-child data; schools reuse the richer layout later.
- Dashboard writes (goals, calendar, prefs, push tokens, reports) go through the `dashboard-data` edge function; tables are read-only to clients via owner RLS. Why: project rule of no direct client writes.
- Notifications run from one hourly `family-notifications` cron job (email via send-transactional-email `family-notice`, push via FCM using FIREBASE_SERVICE_ACCOUNT_JSON). Why: single bounded job, per-timezone hour granularity.
