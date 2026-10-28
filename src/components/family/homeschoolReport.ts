import { orderedSkills } from '@/components/school/curriculum';
import { CROSSWALK, STANDARDS, ALIGNMENT_LABEL } from '@/components/school/standardsCrosswalk';
import { escapeHtml as e } from '@/components/school/conferenceReport';
import type { Completion } from './api';

export interface PortfolioRow { code: string; framework: string; summary: string; activities: { title: string; date: string | null }[] }

/** Groups a child's completed activities (within the date range) under the standards they address. */
export function portfolioRows(completions: Completion[], from: string, to: string): PortfolioRow[] {
  const byId = new Map<string, { title: string }>();
  for (const s of orderedSkills()) if (!byId.has(s.id)) byId.set(s.id, s);
  const rows = new Map<string, PortfolioRow>();
  const seen = new Set<string>();
  for (const c of completions) {
    const day = c.completed_at ? c.completed_at.slice(0, 10) : null;
    if (day && (day < from || day > to)) continue;
    const sk = byId.get(c.skill_id);
    if (!sk || seen.has(c.skill_id)) continue;
    seen.add(c.skill_id);
    for (const code of CROSSWALK[sk.title]?.codes ?? []) {
      const st = STANDARDS[code];
      if (!st) continue;
      const row = rows.get(code) ?? { code, framework: st.framework, summary: st.summary, activities: [] };
      row.activities.push({ title: sk.title, date: day });
      rows.set(code, row);
    }
  }
  return [...rows.values()].sort((a, b) => a.framework.localeCompare(b.framework) || a.code.localeCompare(b.code, undefined, { numeric: true }));
}

const STYLE = `@page{size:Letter;margin:16mm}
body{font-family:Georgia,'Times New Roman',serif;color:#2b2622;font-size:12px;line-height:1.5;margin:0 auto;max-width:820px;padding:20px}
header{border-bottom:2px solid #8a6d4b;padding-bottom:10px;margin-bottom:14px}h1{font-size:22px;margin:0 0 4px}.sub{color:#6b625a}
h2{font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:#8a6d4b;margin:20px 0 6px}
table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #e3d8cb;padding:5px 6px;text-align:left;vertical-align:top}
th{font-size:11px;text-transform:uppercase;color:#6b625a}tr{page-break-inside:avoid}.fw{color:#8b827a;font-size:10.5px}
.sign{margin-top:36px;display:grid;grid-template-columns:1fr 1fr;gap:28px}.line{border-top:1px solid #2b2622;padding-top:4px;font-size:11px}
footer{margin-top:24px;font-size:10.5px;color:#8b827a}`;

const fmt = (d: string) => new Date(d + 'T00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export function portfolioHtml(childName: string, completions: Completion[], from: string, to: string): string {
  const rows = portfolioRows(completions, from, to);
  const groups = [...new Set(rows.map((r) => r.framework))].map((fw) => {
    const body = rows.filter((r) => r.framework === fw).map((r) =>
      `<tr><td><b>${e(r.code)}</b><div class="fw">${e(r.summary)}</div></td><td>${r.activities.map((a) => `${e(a.title)}${a.date ? ` <span class="fw">(${e(fmt(a.date))})</span>` : ''}`).join('<br>')}</td></tr>`).join('');
    return `<h2>${e(fw)}</h2><table><thead><tr><th style="width:45%">Standard</th><th>Evidence: completed Montessori activities</th></tr></thead><tbody>${body}</tbody></table>`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Homeschool Portfolio – ${e(childName)}</title><style>${STYLE}</style></head><body>
<header><h1>Homeschool Progress Portfolio</h1><div class="sub">${e(childName)} · ${e(fmt(from))} – ${e(fmt(to))}</div></header>
<p>This portfolio lists the AMI Primary (3–6) Montessori activities ${e(childName)} completed during the reporting period, grouped under the U.S. standards each activity addresses: Common Core (CCSS) for Mathematics and English Language Arts, NGSS for science, NCSS for social studies and the National Core Arts Standards for art and music.</p>
${groups || '<p><i>No completed activities with a matching standard were recorded in this period.</i></p>'}
<div class="sign"><div class="line">Parent / home educator signature &amp; date</div><div class="line">Evaluator signature &amp; date</div></div>
<footer>Standard descriptions are summaries; consult the official CCSS, NGSS, NCSS and NCAS documents for full wording. Homeschool requirements vary by state; check your state's rules.</footer>
</body></html>`;
}

export { ALIGNMENT_LABEL };
