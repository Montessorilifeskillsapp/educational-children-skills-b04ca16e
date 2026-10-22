import { useEffect, useState } from 'react';

/**
 * The student a staff member last opened in the School Portal, with that child's recorded status per activity.
 * Kept only in this browser tab so curriculum cards can show the child's status at a glance while staff browse.
 * Families and public visitors never have a focus, so their cards are unchanged.
 */
export type FocusStatus = 'presented' | 'practising' | 'mastered';
export interface FocusStudent { id: string; name: string; statuses: Record<string, FocusStatus> }

const KEY = 'school-focus-student';
const EVENT = 'school-focus-change';

export function readFocus(): FocusStudent | null {
  try { const raw = sessionStorage.getItem(KEY); return raw ? JSON.parse(raw) as FocusStudent : null; } catch { return null; }
}

export function setFocus(focus: FocusStudent | null) {
  try { if (focus) sessionStorage.setItem(KEY, JSON.stringify(focus)); else sessionStorage.removeItem(KEY); } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event(EVENT));
}

/** Update one activity's status for the focused child after a save elsewhere (e.g. the Classroom drawer). */
export function updateFocusStatus(studentId: string, skillId: string, status: FocusStatus | 'clear') {
  const f = readFocus();
  if (!f || f.id !== studentId) return;
  const statuses = { ...f.statuses };
  if (status === 'clear') delete statuses[skillId]; else statuses[skillId] = status;
  setFocus({ ...f, statuses });
}

export function useFocusStudent(): FocusStudent | null {
  const [focus, setState] = useState<FocusStudent | null>(() => readFocus());
  useEffect(() => {
    const sync = () => setState(readFocus());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return focus;
}
