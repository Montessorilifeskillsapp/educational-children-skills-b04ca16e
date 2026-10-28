import { areas, orderedSkills } from './curriculum';
import { ALIGNMENT_LABEL, CROSSWALK, STANDARDS } from './standardsCrosswalk';
import { escapeHtml as e } from './conferenceReport';

/** Formal, print-ready crosswalk document for boards, districts and accreditation reviews. */
export function crosswalkHtml(schoolName: string): string {
  const all = orderedSkills();
  const sections = areas().map((a) => {
    const rows = all.filter((s) => s.areaKey === a.key).map((sk, n) => {
      const c = CROSSWALK[sk.title];
      const codes = (c?.codes ?? []).map((code) => {
        const st = STANDARDS[code];
        return `<div><b>${e(code)}</b> <span class="fw">${e(st.framework)}</span> ${e(st.summary)}</div>`;
      }).join('') || '<div class="fw">No matching content standard</div>';
      return `<tr><td class="n">${n + 1}</td><td><b>${e(sk.title)}</b>${c?.note ? `<div class="note">${e(c.note)}</div>` : ''}</td><td class="lvl">${e(c ? ALIGNMENT_LABEL[c.alignment] : '')}</td><td>${codes}</td></tr>`;
    }).join('');
    return `<h2>${e(a.title)}</h2><table><thead><tr><th>#</th><th>AMI presentation</th><th>Alignment</th><th>Standards</th></tr></thead><tbody>${rows}</tbody></table>`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>AMI Primary – U.S. Standards Crosswalk</title><style>
@page{size:Letter landscape;margin:14mm}
body{font-family:Georgia,'Times New Roman',serif;color:#2b2622;font-size:12px;line-height:1.45;margin:0 auto;max-width:1000px;padding:20px}
header{border-bottom:2px solid #8a6d4b;padding-bottom:10px;margin-bottom:14px}
h1{font-size:22px;margin:0 0 4px}.sub{color:#6b625a}
h2{font-size:15px;text-transform:uppercase;letter-spacing:.06em;color:#8a6d4b;margin:22px 0 6px;page-break-after:avoid}
table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #e3d8cb;padding:5px 6px;text-align:left;vertical-align:top}
th{font-size:11px;text-transform:uppercase;color:#6b625a}tr{page-break-inside:avoid}
.n{width:24px;color:#8b827a}.lvl{width:120px}.fw{color:#8b827a;font-size:10.5px}.note{color:#6b625a;font-style:italic}
.key p{margin:4px 0}footer{margin-top:24px;font-size:10.5px;color:#8b827a}
</style></head><body>
<header><h1>AMI Primary (3–6) – U.S. Standards Crosswalk</h1><div class="sub">${e(schoolName)}</div></header>
<section class="key">
<p><b>Scope.</b> Common Core State Standards (CCSS) cover Mathematics and English Language Arts only. Science is aligned to the Next Generation Science Standards (NGSS), social studies to the NCSS thematic strands, and art and music to the National Core Arts Standards (NCAS).</p>
<p><b>Kindergarten core</b> – the presentation directly teaches a Kindergarten standard. <b>Grade 1+ extension</b> – the AMI Primary sequence reaches beyond Kindergarten. <b>Indirect preparation</b> – no content standard applies; the work builds the practices, coordination or speaking and listening skills cited.</p>
<p>As Dr. Maria Montessori observed, the hand prepares the mind: Practical Life and Sensorial work are the indirect preparation on which the academic standards rest.</p>
</section>
${sections}
<footer>Standard descriptions are summaries; consult the official CCSS, NGSS, NCSS and NCAS documents for full wording. © Common Core State Standards: NGA Center and CCSSO.</footer>
</body></html>`;
}
