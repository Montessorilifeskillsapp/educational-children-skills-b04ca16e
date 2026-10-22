/** Formal, printable parent-conference report built from the editable plain-text report. */
export interface ConferenceInput {
  schoolName: string; schoolEmail: string | null; studentName: string;
  periodStart: string; periodEnd: string; title: string; body: string; signoff: string;
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const fmt = (d: string) => {
  const t = new Date(`${d}T00:00:00`);
  return Number.isFinite(t.getTime()) ? t.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : d;
};

/** Lines ending in ":" become section headings, "•" lines become lists, everything else becomes paragraphs. */
export function conferenceBodyHtml(body: string): string {
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push(`<ul>${list.map((li) => `<li>${li}</li>`).join('')}</ul>`); list = []; } };
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (line.startsWith('•') || line.startsWith('- ')) { list.push(escapeHtml(line.replace(/^(•|-)\s*/, ''))); continue; }
    flush();
    if (line.endsWith(':') && line.length <= 80) out.push(`<h2>${escapeHtml(line.slice(0, -1))}</h2>`);
    else out.push(`<p>${escapeHtml(line)}</p>`);
  }
  flush();
  return out.join('\n');
}

export function conferenceHtml(r: ConferenceInput): string {
  const e = escapeHtml;
  return `<!doctype html><html><head><meta charset="utf-8"><title>${e(r.title)}</title><style>
@page{size:A4;margin:18mm}
body{font-family:Georgia,'Times New Roman',serif;color:#2b2622;line-height:1.55;max-width:720px;margin:0 auto;padding:24px}
header{border-bottom:2px solid #8a6d4b;padding-bottom:12px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
.school{font-size:22px;font-weight:bold;letter-spacing:.02em}
.contact{font-size:12px;color:#6b625a}
h1{font-size:20px;margin:0 0 4px}
.meta{font-size:13px;color:#6b625a;margin-bottom:18px}
h2{font-size:15px;text-transform:uppercase;letter-spacing:.06em;color:#8a6d4b;border-bottom:1px solid #e3d8cb;padding-bottom:3px;margin:22px 0 8px;page-break-after:avoid}
ul{margin:0 0 8px;padding-left:20px}li{margin:2px 0;page-break-inside:avoid}
p{margin:0 0 8px}
.signoff{margin-top:28px}
.sign{display:flex;gap:40px;margin-top:40px}.sign div{flex:1;border-top:1px solid #2b2622;padding-top:4px;font-size:12px;color:#6b625a}
footer{margin-top:28px;font-size:11px;color:#8b827a;text-align:center}
</style></head><body>
<header><div class="school">${e(r.schoolName)}</div>${r.schoolEmail ? `<div class="contact">${e(r.schoolEmail)}</div>` : ''}</header>
<h1>${e(r.title)}</h1>
<div class="meta">${e(r.studentName)} · ${e(fmt(r.periodStart))} – ${e(fmt(r.periodEnd))}</div>
${conferenceBodyHtml(r.body)}
<p class="signoff">${e(r.signoff || 'With warm regards,')}<br>${e(r.schoolName)}</p>
<div class="sign"><div>Guide signature &amp; date</div><div>Family signature &amp; date</div></div>
<footer>Confidential · prepared for the family of ${e(r.studentName)}</footer>
</body></html>`;
}
