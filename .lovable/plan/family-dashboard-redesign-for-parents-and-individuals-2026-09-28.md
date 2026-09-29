# Family Dashboard redesign for parents and individuals

## What changes for the user

The current dashboard is kept aside (unused) as a starting template for the future Schools Portal. Parents get a new, simpler dashboard built around their real children and real activity.

Layout: a child switcher at the top (one tab per child profile), then five sections: **Overview, Goals, Calendar, Weekly Reports, Settings**. The Educator and old Reports sections are removed.

### Overview (per child)
- Real numbers only, from activities actually completed: this week's activities, minutes, streak, progress in each of the 9 curriculum areas, recent completions, and top-priority goals.
- Empty state for a new child ("Complete a first activity to see progress here").

### Goals (tied to the Montessori sequence)
- Parent picks a curriculum area or specific activities; optional target date.
- Progress fills in automatically as activities are completed.
- Parent sets priority (drag to reorder, or High / Medium / Low); highest shows first on Overview.
- Suggested next activity for each goal follows the beginner-to-advanced order.

### Calendar (interactive)
- Month and week views per child (or all children).
- Schedule an activity on a date/time, move it, mark it done, delete it.
- Completed activities appear on their day automatically.
- "Add to my calendar" button downloads the session to the phone/computer calendar (Apple, Google, Outlook).

### Weekly Reports
- Generated every week for each child: activities completed, time, areas worked on, goal progress, what to present next.
- Viewable and printable in the dashboard, and emailed to the parent (can be turned off).

### Settings (all working, saved to the account)
- Daily reminder (on/off + time), weekly report email (on/off + day), goal alerts (reached / due soon), scheduled-activity reminders (how long before).
- Channels: email and push, each on/off.
- Enable push on this device (phone app or browser); manage child profiles; account email/name.

## Notifications
- **Email**: daily reminder, weekly report, goal reached/due soon, activity reminders; each has unsubscribe.
- **Push**: same events on iPhone/Android apps and supported browsers. Browser push needs the app open in its own tab (not the editor preview).
- Phone-app push requires a new App Store / Play Store release; the web parts go live on publish.

## What you'll need to do
- Approve connecting Firebase Cloud Messaging (card will appear) and, for browser push, provide the web app key and VAPID key in that card.
- Apple push key uploaded in Firebase for iPhone (one-time, in the Firebase console).

## Technical details
- New tables (with grants + RLS scoped to the parent's children): `child_goals` (child_id, area/skill_ids, priority, target_date, status), `calendar_events` (child_id, skill_id, starts_at, duration, completed), `notification_preferences` (user_id, toggles, times, timezone), `push_tokens` (user_id, token, platform), `weekly_reports` (child_id, week_start, summary jsonb). Writes go through edge functions per project rule.
- Analytics derived from existing `skill_progress` / `activity_sessions`; activity completion will also log a session with duration.
- Edge functions: `dashboard-data` (goals/calendar/prefs CRUD), `register-push-token`, `send-notifications` (hourly pg_cron: daily reminders, activity reminders, goal alerts), `generate-weekly-reports` (weekly pg_cron, stores report + emails via existing transactional email templates + push).
- Push: FCM via connector gateway; web via firebase SDK + `firebase-messaging-sw.js`; native via `@capacitor/push-notifications`. Stale tokens removed on UNREGISTERED.
- Calendar export: generated `.ics` file.
- Old `ParentDashboard`, `EducatorCommunication`, `CalendarScheduling`, `ReportGeneration`, `ProgressAnalytics`, `GoalCustomization`, `NotificationSettings` moved to `src/components/schools-template/` and no longer routed.
- Record the structure decision in AGENTS.md; update roadmap.md.
