import { useCallback, useEffect, useState } from 'react';

/** In-progress portal text kept on this device until it is saved or sent. */
const PREFIX = 'school:draft:';

function read<T>(key: string): T | undefined {
  try { const raw = localStorage.getItem(PREFIX + key); return raw == null ? undefined : (JSON.parse(raw) as T); } catch { return undefined; }
}
function write(key: string, value: unknown, empty: unknown) {
  try {
    if (JSON.stringify(value) === JSON.stringify(empty)) localStorage.removeItem(PREFIX + key);
    else localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch { /* storage full or blocked: keep in memory only */ }
}

/** State that autosaves per key (scope it to the signed-in user and the child) and restores when the key returns. */
export function useDraft<T>(key: string | null, empty: T): [T, (v: T) => void, () => void] {
  const [state, setState] = useState<{ key: string | null; value: T }>(() => ({ key, value: (key && read<T>(key)) ?? empty }));
  const current = state.key === key ? state.value : ((key && read<T>(key)) ?? empty);
  useEffect(() => { if (state.key !== key) setState({ key, value: (key && read<T>(key)) ?? empty }); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const set = useCallback((v: T) => { setState({ key, value: v }); if (key) write(key, v, empty); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const clear = useCallback(() => set(empty), [set]); // eslint-disable-line react-hooks/exhaustive-deps
  return [current, set, clear];
}

/** Remove every portal draft on this device (used on sign-out). */
export function clearAllDrafts() {
  try { Object.keys(localStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ }
}
