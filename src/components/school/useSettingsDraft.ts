import { useEffect, useState } from 'react';

/** Refresh saved values without replacing edits; reset drafts when the school changes. */
export function useSettingsDraft<T>(schoolId: string, incoming: T) {
  const signature = JSON.stringify(incoming);
  const [state, setState] = useState({ schoolId, saved: incoming, draft: incoming });
  useEffect(() => {
    setState((old) => ({ schoolId, saved: incoming, draft: old.schoolId !== schoolId || JSON.stringify(old.draft) === JSON.stringify(old.saved) ? incoming : old.draft }));
  }, [schoolId, signature]);
  const draft = state.schoolId === schoolId ? state.draft : incoming;
  const saved = state.schoolId === schoolId ? state.saved : incoming;
  const setDraft = (value: T | ((old: T) => T)) => setState((old) => {
    const current = old.schoolId === schoolId ? old : { schoolId, saved: incoming, draft: incoming };
    return { ...current, draft: typeof value === 'function' ? (value as (old: T) => T)(current.draft) : value };
  });
  const acknowledge = (value: T) => setState((old) => old.schoolId === schoolId ? { ...old, saved: value } : old);
  return { draft, setDraft, acknowledge, dirty: JSON.stringify(draft) !== JSON.stringify(saved), discard: () => setDraft(saved) };
}