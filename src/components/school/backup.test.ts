import { describe, it, expect } from 'vitest';
import { backupState, quarterOf, toCsv, buildBackupZip } from './backup';
import JSZip from 'jszip';

describe('quarterly school backup', () => {
  it('uses calendar quarters', () => { expect(quarterOf(new Date(2026, 10, 2)).label).toBe('Q4 2026'); });
  it('is done once backed up in the current quarter', () => {
    expect(backupState([new Date(2026, 9, 5)], new Date(2026, 10, 2)).state).toBe('done');
  });
  it('is due when only last quarter was backed up', () => {
    expect(backupState([new Date(2026, 7, 1)], new Date(2026, 10, 2)).state).toBe('due');
  });
  it('is overdue when last quarter was missed', () => {
    expect(backupState([], new Date(2026, 10, 2), new Date(2025, 0, 1)).state).toBe('overdue');
  });
  it('is not overdue for a school created this quarter', () => {
    expect(backupState([], new Date(2026, 10, 2), new Date(2026, 9, 20)).state).toBe('due');
  });
  it('neutralizes spreadsheet formulas', () => { expect(toCsv([{ a: '=HYPERLINK("x")' }])).toContain(`"'=HYPERLINK(""x"")"`); });
  it('packs one record page per child plus spreadsheets', async () => {
    const d = { exported_at: '2026-11-02T00:00:00Z', exported_by: 'a@s.org', school: { name: 'Oak' }, classrooms: [{ id: 'c', name: 'Rose' }],
      students: [{ id: 's1', name: 'Ava B', classroom_id: 'c' }, { id: 's2', name: 'Ava B', classroom_id: 'c' }], members: [], classroom_staff: [],
      progress: [], progress_history: [], observations: [{ student_id: 's1', body: '<b>hi</b>', observed_at: '2026-10-01' }], reports: [], lesson_plans: [], change_history: [] };
    const { blob, filename } = await buildBackupZip(d);
    expect(filename).toBe('Oak Q4 2026 Backup.zip');
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const pages = Object.keys(zip.files).filter((f) => f.startsWith('Student records/') && !zip.files[f].dir);
    expect(pages).toHaveLength(2);
    expect(await zip.file(pages[0])!.async('string')).toContain('&lt;b&gt;hi');
    expect(zip.file('Spreadsheets/observations.csv')).toBeTruthy();
  });
});
