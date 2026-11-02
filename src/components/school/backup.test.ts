import { Blob as NodeBlob } from 'node:buffer';
// jsdom's Blob cannot be read back; use Node's.
globalThis.Blob = NodeBlob as unknown as typeof Blob;
import { describe, it, expect } from 'vitest';
import { backupState, periodOf, quarterOf, toCsv, buildBackupZip, type BackupData } from './backup';
import { BlobReader, TextWriter, ZipReader } from '@zip.js/zip.js';

const d = { exported_at: '2026-11-02T00:00:00Z', exported_by: 'a@s.org', school: { name: 'Oak' }, classrooms: [{ id: 'c', name: 'Rose' }],
  students: [{ id: 's1', name: 'Ava B', classroom_id: 'c' }, { id: 's2', name: 'Ava B', classroom_id: 'c' }], members: [], classroom_staff: [],
  progress: [], progress_history: [], observations: [{ student_id: 's1', body: '<b>hi</b>', observed_at: '2026-10-01' }], reports: [], lesson_plans: [], change_history: [] } as BackupData;

describe('quarterly school backup', () => {
  it('semesters split on July 1', () => {
    expect(periodOf(new Date(2026, 5, 30), 'semester').label).toBe('Spring semester 2026');
    expect(periodOf(new Date(2026, 6, 1), 'semester').label).toBe('Fall semester 2026');
  });
  it('quarters split on April 1', () => { expect(periodOf(new Date(2026, 2, 31)).label).toBe('Q1 2026'); expect(periodOf(new Date(2026, 3, 1)).label).toBe('Q2 2026'); });
  it('a semester backup in August covers November', () => { expect(backupState([new Date(2026, 7, 1)], new Date(2026, 10, 2), undefined, 'semester').state).toBe('done'); });
  it('uses calendar quarters', () => { expect(quarterOf(new Date(2026, 10, 2)).label).toBe('Q4 2026'); });
  it('is done once backed up in the current quarter', () => { expect(backupState([new Date(2026, 9, 5)], new Date(2026, 10, 2)).state).toBe('done'); });
  it('is due when only last quarter was backed up', () => { expect(backupState([new Date(2026, 7, 1)], new Date(2026, 10, 2)).state).toBe('due'); });
  it('is overdue when last quarter was missed', () => { expect(backupState([], new Date(2026, 10, 2), new Date(2025, 0, 1)).state).toBe('overdue'); });
  it('is not overdue for a school created this quarter', () => { expect(backupState([], new Date(2026, 10, 2), new Date(2026, 9, 20)).state).toBe('due'); });
  it('neutralizes spreadsheet formulas', () => { expect(toCsv([{ a: '=HYPERLINK("x")' }])).toContain(`"'=HYPERLINK(""x"")"`); });
  it('packs a summary and one record page per child', async () => {
    const { blob, filename } = await buildBackupZip(d);
    expect(filename).toBe('Oak Q4 2026 Backup.zip');
    const entries = await new ZipReader(new BlobReader(blob)).getEntries();
    const pages = entries.filter((e) => e.filename.startsWith('Student records/'));
    expect(pages).toHaveLength(2);
    expect(entries.some((e) => e.filename === 'School summary.html')).toBe(true);
    const page = entries.find((e) => e.filename === pages[0].filename)!;
    expect(await (page as any).getData(new TextWriter())).toContain('&lt;b&gt;hi');
  });
  it('password-protected backups cannot be read without the password', async () => {
    const { blob } = await buildBackupZip(d, undefined, 'correct horse');
    const entries = await new ZipReader(new BlobReader(blob)).getEntries();
    expect(entries[0].encrypted).toBe(true);
    await expect((entries[0] as any).getData(new TextWriter(), { password: 'wrong pass' })).rejects.toThrow();
    expect(await (entries[0] as any).getData(new TextWriter(), { password: 'correct horse' })).toContain('Oak');
  });
});
