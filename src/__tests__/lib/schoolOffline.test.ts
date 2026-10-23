import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

describe('offline notes queue', () => {
  beforeEach(() => { localStorage.clear(); vi.resetModules(); });

  it('sends only the signed-in staff member’s waiting notes, in order, then empties the queue', async () => {
    const q = await import('@/components/school/offlineQueue');
    const sent: unknown[] = [];
    q.configureQueue(async (b) => { sent.push(b.body); }, async () => 'u1');
    q.enqueue('u1', { action: 'observation_add', body: 'first' });
    q.enqueue('u2', { action: 'observation_add', body: 'other teacher' });
    q.enqueue('u1', { action: 'observation_add', body: 'second' });
    await q.flushQueue();
    expect(sent).toEqual(['first', 'second']);
    expect(JSON.parse(localStorage.getItem('school:outbox')!)).toHaveLength(1);
  });

  it('keeps waiting notes when the connection drops mid-sync', async () => {
    const q = await import('@/components/school/offlineQueue');
    q.configureQueue(async () => { throw Object.assign(new Error('x'), { name: 'FunctionsFetchError' }); }, async () => 'u1');
    q.enqueue('u1', { action: 'observation_add', body: 'kept' });
    await q.flushQueue();
    expect(JSON.parse(localStorage.getItem('school:outbox')!)).toHaveLength(1);
  });
});

describe('draft autosave', () => {
  beforeEach(() => localStorage.clear());

  it('restores a draft when returning to the same child', async () => {
    const { useDraft } = await import('@/components/school/drafts');
    const { result, rerender } = renderHook(({ k }) => useDraft(k, ''), { initialProps: { k: 'u1:note:a' } });
    act(() => result.current[1]('half-written note'));
    rerender({ k: 'u1:note:b' });
    expect(result.current[0]).toBe('');
    rerender({ k: 'u1:note:a' });
    expect(result.current[0]).toBe('half-written note');
    act(() => result.current[2]());
    expect(localStorage.getItem('school:draft:u1:note:a')).toBeNull();
  });
});
