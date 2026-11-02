# Automatic school records backup

## What changes for the school

- **The "Backup overdue" banner is removed from the portal's front page.** It won't come back.
- **Backups happen on their own.** When a backup is due, the next time a School Admin opens the School Portal, the password-protected backup file downloads quietly in the background. Nothing for them to click. A small note in the corner says "Records backup saved to this device."
- **Confirmation email.** As soon as the file is saved, a short email goes to the school's primary email: "Your [Quarter/Semester] records backup was saved on [date] by [admin name]." It contains no student information.
- **New school settings (School Admin only), on the Staff tab's backup card:**
  - **Backup schedule** toggle: Quarterly (4 a year) or Semester (Jan–Jun, Jul–Dec).
  - **Backup file password**: set once and reused for every automatic backup. It stays on the admin's own device, not on our server, so the app never holds the key to the school's file.
- **Manual backup** stays on the backup card for anyone who wants an extra copy.
- **Reminder emails are reduced to one safety net.** If a whole period ends with no backup (for example, no admin signed in or no password was set), one email goes to the School Admins. The 21-day and 7-day "due soon" emails are removed.

## Things to know

- The automatic download only runs on a device where a School Admin has set the backup password. On a new device, the backup card asks for the password once.
- The browser decides where the file is saved, usually the Downloads folder. The email confirms that it was saved, so the school can move it to their own system.
- If two School Admins open the portal at the same moment, only one backup is made per period.

## Technical details

- Database: add `schools.backup_frequency text not null default 'quarterly'`, checked by a validation trigger to be 'quarterly' or 'semester'.
- `school-portal`: new admin-only `backup_settings_set` action; `school_backup` records the period label; new `backup_auto_done` action logs an audit entry and sends the confirmation email (`family-notice` template) to `schools.contact_email`, once per period per school (an idempotency key stops duplicates).
- `backup.ts`: add `periodOf(date, frequency)` (quarter or half-year) and make `backupState` follow the chosen frequency; tests cover semester boundaries (Jun 30 / Jul 1) and quarterly boundaries.
- New `AutoBackup` component mounted in the portal for School Admins: on open, checks the status; if due and a password is saved on the device, builds the AES-encrypted ZIP with the existing builder, starts the download, then calls `backup_auto_done`. A short-lived claim in the browser's storage stops repeat runs across tabs.
- Remove `BackupReminder` from `SchoolPortalPage`.
- `family-notifications`: keep only the "period missed" stage, and follow each school's frequency.
- Update the AGENTS.md backup rule and the backup memory.
