import { describe, it, expect, beforeEach } from 'vitest';
import { orderedSkills } from '@/components/school/curriculum';
import { allPracticalLifeSkills } from '@/data/practicalLifeAll';
import { conferenceHtml, conferenceBodyHtml } from '@/components/school/conferenceReport';
import { readFocus, setFocus, updateFocusStatus } from '@/components/school/focusStudent';

describe('portal activity links', () => {
  it('every Practical Life activity the portal links to opens on the Practical Life page', () => {
    const missing = orderedSkills().filter((s) => s.areaKey === 'practical-life' && !(s.id in allPracticalLifeSkills));
    expect(missing.map((s) => s.id)).toEqual([]);
  });
  it('Carrying a Chair is linkable from the portal', () => {
    expect(orderedSkills().some((s) => s.id === 'carrying-a-chair')).toBe(true);
  });
});

describe('conference report', () => {
  it('never lets typed report text become markup', () => {
    const html = conferenceHtml({ schoolName: 'A<b>', schoolEmail: null, studentName: 'Ava', periodStart: '2026-09-01', periodEnd: '2026-10-01', title: 't', body: '<script>x</script>', signoff: '' });
    expect(html).not.toContain('<script>x');
    expect(html).toContain('&lt;script&gt;');
  });
  it('turns headings and bullets into report sections', () => {
    expect(conferenceBodyHtml('Practical Life:\n• Pouring water')).toBe('<h2>Practical Life</h2>\n<ul><li>Pouring water</li></ul>');
  });
});

describe('focused student card statuses', () => {
  beforeEach(() => setFocus(null));
  it('updates only the focused child', () => {
    setFocus({ id: 's1', name: 'Ava', statuses: {} });
    updateFocusStatus('s2', 'pouring-water', 'mastered');
    expect(readFocus()?.statuses).toEqual({});
    updateFocusStatus('s1', 'pouring-water', 'practising');
    expect(readFocus()?.statuses['pouring-water']).toBe('practising');
    updateFocusStatus('s1', 'pouring-water', 'clear');
    expect(readFocus()?.statuses['pouring-water']).toBeUndefined();
  });
});
