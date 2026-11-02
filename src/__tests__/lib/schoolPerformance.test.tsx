import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { cacheSchoolData, cachedSchoolData, setPortalOwner, sharedPortalRead } from '@/components/school/portalCache';
import { useSettingsDraft } from '@/components/school/useSettingsDraft';
import { savedSchoolData } from '@/components/school/savedSchoolData';
import type { SchoolData } from '@/components/school/useSchoolData';

afterEach(() => { cleanup(); setPortalOwner(null); });

describe('portal request sharing', () => {
  it('shares overlapping reads and permits a fresh read afterward', async () => {
    setPortalOwner('teacher');
    let finish: (value: string) => void = () => undefined;
    const read = vi.fn(() => new Promise<string>((resolve) => { finish = resolve; }));
    const first = sharedPortalRead('records', read);
    const second = sharedPortalRead('records', read);
    expect(first).toBe(second);
    expect(read).toHaveBeenCalledTimes(1);
    finish('saved');
    expect(await second).toBe('saved');
    await sharedPortalRead('records', async () => 'fresh');
  });
  it('rejects an old account response without filling the next account cache', async () => {
    setPortalOwner('first');
    let finish: (value: string) => void = () => undefined;
    const pending = sharedPortalRead('records', () => new Promise<string>((resolve) => { finish = resolve; }), (value) => cacheSchoolData('school', value));
    setPortalOwner('second');
    finish('private first account records');
    await expect(pending).rejects.toThrow('account changed');
    expect(cachedSchoolData('school')).toBeUndefined();
  });
});

describe('school settings persistence', () => {
  it('accepts late server values but retains an unsaved edit during refresh', () => {
    const { result, rerender } = renderHook(({ incoming }) => useSettingsDraft('school', incoming), { initialProps: { incoming: { name: '' } } });
    rerender({ incoming: { name: 'School' } });
    expect(result.current.draft.name).toBe('School');
    act(() => result.current.setDraft({ name: 'Edited school' }));
    rerender({ incoming: { name: 'Server update' } });
    expect(result.current.draft.name).toBe('Edited school');
    act(() => result.current.acknowledge({ name: 'Edited school' }));
    expect(result.current.dirty).toBe(false);
  });
  it('resets edits on school switch without leaking the previous school form', () => {
    const { result, rerender } = renderHook(({ school, incoming }) => useSettingsDraft(school, incoming), { initialProps: { school: 'first', incoming: { name: 'First' } } });
    act(() => result.current.setDraft({ name: 'Private first draft' }));
    rerender({ school: 'second', incoming: { name: 'Second' } });
    expect(result.current.draft).toEqual({ name: 'Second' });
  });
  it('does not erase a permission edited while an earlier save was pending', () => {
    const { result } = renderHook(() => useSettingsDraft('school', { allowed: false }));
    act(() => result.current.setDraft({ allowed: true }));
    act(() => result.current.acknowledge({ allowed: true }));
    act(() => result.current.setDraft({ allowed: false }));
    expect(result.current.dirty).toBe(true);
    expect(result.current.draft.allowed).toBe(false);
  });
});

describe('confirmed saves update the current records immediately', () => {
  const data: SchoolData = { classrooms: [], staff: [], members: [], invites: [], students: [{ id: 'child', classroom_id: 'room', name: 'Child', date_of_birth: null, family_email: null, archived: false }], progress: [], observations: [], plans: [], reports: [] };
  it('adds a server-confirmed note without waiting for a refresh', () => {
    const note = { id: 'note', student_id: 'child', body: 'Worked independently', author_id: 'teacher', observed_at: '2026-11-02T16:00:00Z' };
    expect(savedSchoolData(data, 'school', { action: 'observation_add', student_id: 'child' }, { observation: note }).observations).toEqual([note]);
  });
  it('never inserts a different child or merely queued record', () => {
    const reply = { observation: { id: 'other-note' } };
    expect(savedSchoolData(data, 'school', { action: 'observation_add', student_id: 'other-child' }, reply)).toBe(data);
    expect(savedSchoolData(data, 'school', { action: 'observation_add', student_id: 'child' }, { ...reply, queued: true })).toBe(data);
  });
});