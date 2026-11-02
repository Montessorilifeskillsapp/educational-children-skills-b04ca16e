import JSZip from 'jszip';

/** Calendar quarter helpers for the mandatory quarterly school backup. */
export function quarterOf(d: Date) {
  const q = Math.floor(d.getMonth() / 3);
  const start = new Date(d.getFullYear(), q * 3, 1);
  const end = new Date(d.getFullYear(), q * 3 + 3, 1); // exclusive
  return { label: `Q${q + 1} ${d.getFullYear()}`, q: q + 1, year: d.getFullYear(), start, end };
}

export type BackupState = 'done' | 'due' | 'overdue';

/** Done when a backup exists in the current quarter; overdue when the previous quarter was also missed (after the first quarter). */
export function backupState(backups: Date[], now = new Date(), schoolCreated?: Date): { state: BackupState; daysLeft: number; quarter: string } {
  const cur = quarterOf(now);
  const daysLeft = Math.max(0, Math.ceil((cur.end.getTime() - now.getTime()) / 86_400_000));
  const inCur = backups.some((b) => b >= cur.start && b < cur.end);
  if (inCur) return { state: 'done', daysLeft, quarter: cur.label };
  const prev = quarterOf(new Date(cur.start.getTime() - 86_400_000));
  const prevApplies = !schoolCreated || schoolCreated < prev.end;
  const inPrev = backups.some((b) => b >= prev.start && b < prev.end);
  return { state: prevApplies && !inPrev ? 'overdue' : 'due', daysLeft, quarter: cur.label };
}

type Row = Record<string, unknown>;
export interface BackupData {
  exported_at: string; exported_by: string;
  school: Row & { name: string };
  classrooms: Row[]; students: Row[]; members: Row[]; classroom_staff: Row[]; progress: Row[]; progress_history: Row[];
  observations: Row[]; reports: Row[]; lesson_plans: Row[]; change_history: Row[];
}

const cell = (v: unknown) => {
  if (v == null) return '';
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s; // keep spreadsheet formulas from running
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};
export function toCsv(rows: Row[]): string {
  const cols = Array.from(rows.reduce((set, r) => { Object.keys(r).forEach((k) => set.add(k)); return set; }, new Set<string>()));
  return '\uFEFF' + [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\r\n');
}

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const fileSafe = (s: string) => s.replace(/[^\p{L}\p{N} _-]+/gu, '').trim().slice(0, 60) || 'Student';
const day = (v: unknown) => (v ? new Date(String(v)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '');
const STATUS: Record<string, string> = { presented: 'Presented', practising: 'Practicing', mastered: 'Mastered' };

function studentPage(d: BackupData, s: Row, room: string, title: (id: string) => string, staffName: (id: unknown) => string) {
  const id = s.id;
  const prog = d.progress.filter((p) => p.student_id === id);
  const hist = d.progress_history.filter((p) => p.student_id === id).sort((a, b) => String(b.recorded_at).localeCompare(String(a.recorded_at)));
  const obs = d.observations.filter((o) => o.student_id === id).sort((a, b) => String(b.observed_at).localeCompare(String(a.observed_at)));
  const reps = d.reports.filter((r) => r.student_id === id);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(s.name)} — ${esc(d.school.name)}</title>
<style>body{font-family:Georgia,serif;color:#332115;background:#FCF6E9;max-width:820px;margin:32px auto;padding:0 20px;line-height:1.5}
h1{margin:0}h2{border-bottom:2px solid #46A08F;padding-bottom:4px;margin-top:32px}table{width:100%;border-collapse:collapse;font-size:14px}
td,th{text-align:left;padding:6px 8px;border-bottom:1px solid #F8CFB4;vertical-align:top}.muted{color:#7a6556}.card{background:#fff;border-radius:10px;padding:12px 16px;margin:8px 0}
@media print{body{background:#fff}}</style></head><body>
<p class="muted">${esc(d.school.name)} · Backup of ${day(d.exported_at)}</p><h1>${esc(s.name)}</h1>
<p>Classroom: ${esc(room)}${s.date_of_birth ? ` · Born ${day(s.date_of_birth)}` : ''}${s.archived ? ' · Archived' : ''}</p>
<p>Parents: ${esc([s.parent_one_full_name, s.parent_two_full_name].filter(Boolean).join(', ') || '—')} · ${esc(s.family_email || 'No family email')}</p>
${s.health_notes ? `<div class="card"><strong>Health and allergy details</strong><br>${esc(s.health_notes)}</div>` : ''}
<h2>Current progress (${prog.length})</h2>${prog.length ? `<table><tr><th>Activity</th><th>Status</th><th>Since</th><th>Note</th></tr>${prog.map((p) => `<tr><td>${esc(title(String(p.skill_id)))}</td><td>${esc(STATUS[String(p.status)] ?? p.status)}</td><td>${day(p.presented_at ?? p.updated_at)}</td><td>${esc(p.note)}</td></tr>`).join('')}</table>` : '<p class="muted">None recorded.</p>'}
<h2>Every recording (${hist.length})</h2>${hist.length ? `<table><tr><th>Date</th><th>Activity</th><th>Status</th><th>By</th><th>Note</th></tr>${hist.map((p) => `<tr><td>${day(p.recorded_at)}</td><td>${esc(title(String(p.skill_id)))}</td><td>${esc(STATUS[String(p.status)] ?? p.status)}</td><td>${esc(staffName(p.recorded_by))}</td><td>${esc(p.note)}</td></tr>`).join('')}</table>` : '<p class="muted">None recorded.</p>'}
<h2>Observations (${obs.length})</h2>${obs.map((o) => `<div class="card"><span class="muted">${day(o.observed_at)} · ${esc(staffName(o.author_id))}</span><br>${esc(o.body)}</div>`).join('') || '<p class="muted">None recorded.</p>'}
<h2>Parent reports (${reps.length})</h2>${reps.map((r) => { const sm = (r.summary ?? {}) as Row; return `<div class="card"><strong>${esc(sm.title ?? 'Report')}</strong> <span class="muted">${day(r.period_start)} – ${day(r.period_end)}${r.sent_at ? ` · sent ${day(r.sent_at)}` : ''}</span><div style="white-space:pre-wrap">${esc(sm.body ?? '')}</div></div>`; }).join('') || '<p class="muted">None recorded.</p>'}
</body></html>`;
}

/** Builds the school's backup archive: readable student records, spreadsheets of every table, and a complete JSON copy. */
export async function buildBackupZip(d: BackupData, title: (id: string) => string = (id) => id): Promise<{ blob: Blob; filename: string; counts: Record<string, number> }> {
  const zip = new JSZip();
  const q = quarterOf(new Date(d.exported_at));
  const base = `${fileSafe(d.school.name)} ${q.label.replace(' ', ' ')} Backup`;
  const roomName = (id: unknown) => String(d.classrooms.find((c) => c.id === id)?.name ?? '');
  const staffName = (id: unknown) => { const m = d.members.find((x) => x.user_id === id); return String(m?.full_name || m?.email || (id ? 'Former staff' : '')); };
  const counts = { classrooms: d.classrooms.length, students: d.students.length, staff: d.members.length, progress_recordings: d.progress_history.length,
    observations: d.observations.length, reports: d.reports.length, lesson_plans: d.lesson_plans.length, change_history: d.change_history.length };

  zip.file('README.txt', [
    `${d.school.name} — quarterly records backup (${q.label})`,
    `Exported ${new Date(d.exported_at).toLocaleString('en-US')} by ${d.exported_by}`, '',
    'Contents', ...Object.entries(counts).map(([k, v]) => `  ${k.replace(/_/g, ' ')}: ${v}`), '',
    'Folders',
    '  Student records/  One printable page per child (open in any web browser).',
    '  Spreadsheets/     Every table as a CSV file (opens in Excel, Numbers or Google Sheets).',
    '  school-backup.json Complete machine-readable copy of all records.', '',
    'Keep this file on your school’s own secure system. It contains sensitive information about',
    'children; store it only where your school’s privacy policy allows, and share it with no one',
    'other than authorized school staff and each child’s own parents.',
  ].join('\r\n'));
  zip.file('school-backup.json', JSON.stringify(d, null, 2));
  const sheets: [string, Row[]][] = [['students', d.students], ['classrooms', d.classrooms], ['staff', d.members], ['classroom-staff', d.classroom_staff],
    ['progress-current', d.progress], ['progress-every-recording', d.progress_history], ['observations', d.observations],
    ['parent-reports', d.reports.map((r) => ({ ...r, title: (r.summary as Row | null)?.title, body: (r.summary as Row | null)?.body }))],
    ['lesson-plans', d.lesson_plans], ['change-history', d.change_history]];
  for (const [n, rows] of sheets) zip.file(`Spreadsheets/${n}.csv`, toCsv(rows));
  const used = new Set<string>();
  for (const s of d.students) {
    let n = `${fileSafe(String(s.name))} - ${fileSafe(roomName(s.classroom_id))}`;
    while (used.has(n)) n += ' 2';
    used.add(n);
    zip.file(`Student records/${n}.html`, studentPage(d, s, roomName(s.classroom_id), title, staffName));
  }
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  return { blob, filename: `${base}.zip`, counts };
}
