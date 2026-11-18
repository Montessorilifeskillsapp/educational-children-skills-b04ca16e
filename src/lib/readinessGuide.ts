import { CROSSWALK, STANDARDS } from '@/components/school/standardsCrosswalk';
import i18n from '@/i18n';

export type GuideAge = 3 | 4 | 5;

interface SampleLesson { title: string; area: string; purpose: string }

/** Sample week per age, drawn from the app's AMI Primary sequence. */
export const SAMPLE_LESSONS: Record<GuideAge, SampleLesson[]> = {
  3: [
    { title: 'Dry Pouring', area: 'Practical Life', purpose: 'Coordination of movement, concentration and independence.' },
    { title: 'Greeting Others', area: 'Grace and Courtesy', purpose: 'Confidence and respectful social language.' },
    { title: 'Knobbed Cylinders', area: 'Sensorial', purpose: 'Visual discrimination of size; the pincer grip that prepares the hand for writing.' },
    { title: 'Pink Tower', area: 'Sensorial', purpose: 'Visual discrimination of graded size in three dimensions.' },
    { title: 'Sandpaper Letters', area: 'Language', purpose: 'Linking each sound to its written symbol through touch.' },
  ],
  4: [
    { title: 'Red Rods', area: 'Sensorial', purpose: 'Graded length; direct preparation for the Number Rods.' },
    { title: 'Number Rods', area: 'Math', purpose: 'Quantity and symbol 1–10 as single, countable lengths.' },
    { title: 'Spindle Box', area: 'Math', purpose: 'Counting loose quantities and the concept of zero.' },
    { title: 'Sandpaper Letters', area: 'Language', purpose: 'Sound–symbol association for early reading and writing.' },
    { title: 'Land and Water Forms', area: 'Geography', purpose: 'Concrete understanding of the Earth’s land and water.' },
  ],
  5: [
    { title: 'Golden Beads', area: 'Math', purpose: 'The decimal system: units, tens, hundreds and thousands.' },
    { title: 'Moveable Alphabet', area: 'Language', purpose: 'Building words phonetically before the hand can write them.' },
    { title: 'Spindle Box', area: 'Math', purpose: 'Confirming quantity, symbol and zero.' },
    { title: 'Parts of a Plant', area: 'Botany', purpose: 'Naming and observing the parts of living plants.' },
    { title: 'Land and Water Forms', area: 'Geography', purpose: 'Paired land and water forms through touch and naming.' },
  ],
};

export const READINESS_CHECKLIST: Record<GuideAge, string[]> = {
  3: ['Carries a tray or chair with care', 'Pours dry materials with some spilling', 'Follows a two-step request', 'Greets familiar adults', 'Sorts objects by size or color', 'Shows interest in letter sounds'],
  4: ['Pours water with few spills', 'Works on one activity for 10+ minutes', 'Grades objects by size', 'Recognizes several letter sounds', 'Counts objects to 10 with one-to-one correspondence', 'Uses please, thank you and excuse me'],
  5: ['Completes a multi-step activity and puts it away', 'Names most letter sounds', 'Builds simple words by sound', 'Counts and matches quantity to numerals beyond 10', 'Holds a pencil with a tripod grip', 'Takes turns speaking in a group'],
};

const e = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export function standardsFor(title: string): string[] {
  return (CROSSWALK[title]?.codes ?? []).filter((c) => STANDARDS[c]);
}

/** Lesson title in the current language; English titles stay the lookup key for standards. */
export function lessonTitle(title: string): string {
  return i18n.t(`growth.guide.titles.${title}`, { defaultValue: title });
}

/** Print-ready guide in the current language; the visitor saves it as a PDF from the print dialog. */
export function readinessGuideHtml(age: GuideAge, origin: string): string {
  const t = (k: string, o?: Record<string, unknown>) => i18n.t(`growth.guide.${k}`, o) as string;
  const list = (k: string, fallback: string[]) => {
    const v = i18n.t(`growth.guide.${k}`, { returnObjects: true }) as unknown;
    return Array.isArray(v) && v.length === fallback.length ? (v as string[]) : fallback;
  };
  const days = list('days', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const purposes = list(`purposes.${age}`, SAMPLE_LESSONS[age].map((l) => l.purpose));
  const checklist = list(`checks.${age}`, READINESS_CHECKLIST[age]);
  const lessons = SAMPLE_LESSONS[age].map((l, i) => {
    const codes = standardsFor(l.title).map((c) => `<span class="code">${e(c)}</span>`).join(' ');
    const area = i18n.t(`growth.guide.areas.${l.area}`, { defaultValue: l.area }) as string;
    return `<tr><td class="n">${e(days[i])}</td><td><b>${e(lessonTitle(l.title))}</b><div class="area">${e(area)}</div></td><td>${e(purposes[i])}</td><td>${codes || `<span class="area">${e(t('indirect'))}</span>`}</td></tr>`;
  }).join('');
  const checks = checklist.map((c) => `<li><span class="box"></span>${e(c)}</li>`).join('');
  const lang = (i18n.resolvedLanguage || 'en').startsWith('zh') ? 'zh-Hans' : (i18n.resolvedLanguage || 'en');
  return `<!doctype html><html lang="${e(lang)}"><head><meta charset="utf-8"><title>${e(t('docTitle', { age }))}</title><style>
@page{size:Letter;margin:16mm}
body{font-family:Georgia,'Times New Roman',serif;color:#2b2622;font-size:13px;line-height:1.5;max-width:760px;margin:0 auto;padding:24px}
header{border-bottom:2px solid #59A680;padding-bottom:10px;margin-bottom:16px}h1{font-size:24px;margin:0}.sub{color:#6b625a}
h2{font-size:15px;text-transform:uppercase;letter-spacing:.06em;color:#3f7d5f;margin:24px 0 8px}
table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #e3d8cb;padding:6px;text-align:left;vertical-align:top}th{font-size:11px;text-transform:uppercase;color:#6b625a}
.n{width:40px;color:#8b827a}.area{color:#8b827a;font-size:11px}.code{display:inline-block;font-size:10.5px;border:1px solid #cfe3d8;border-radius:4px;padding:0 4px;margin:1px}
ul{list-style:none;padding:0;columns:2}li{margin:6px 0;break-inside:avoid}.box{display:inline-block;width:11px;height:11px;border:1px solid #6b625a;margin-right:8px;vertical-align:-1px}
.cta{margin-top:26px;border:1px solid #59A680;border-radius:8px;padding:14px;background:#f3faf6}footer{margin-top:20px;font-size:10.5px;color:#8b827a}
.print{margin:0 0 16px;padding:8px 14px;border:0;border-radius:6px;background:#59A680;color:#fff;font:inherit;cursor:pointer}@media print{.print{display:none}}
</style></head><body>
<button class="print" onclick="window.print()">${e(t('save'))}</button>
<header><h1>${e(t('docTitle', { age }))}</h1><div class="sub">${e(t('sub'))}</div></header>
<p>${e(t('intro', { age }))}</p>
<h2>${e(t('checklist'))}</h2><p class="area">${e(t('observe'))}</p><ul>${checks}</ul>
<h2>${e(t('week'))}</h2><table><thead><tr><th>${e(t('day'))}</th><th>${e(t('lesson'))}</th><th>${e(t('gains'))}</th><th>${e(t('standards'))}</th></tr></thead><tbody>${lessons}</tbody></table>
<div class="cta"><b>${e(t('ctaTitle'))}</b> ${e(t('cta'))}<br>${e(origin)}/plans</div>
<footer>${e(t('footer', { year: new Date().getFullYear() }))}</footer>
</body></html>`;
}
