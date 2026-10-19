export const SCHOOL_RETURN_KEY = 'school-return-url';
export const SCHOOL_LEAVE_EVENT = 'school-before-leave';

export function hasSchoolReturn(): boolean {
  try { return sessionStorage.getItem(SCHOOL_RETURN_KEY) !== null; }
  catch { return false; }
}

export function schoolReturnTarget(): string {
  try {
    const saved = sessionStorage.getItem(SCHOOL_RETURN_KEY);
    if (saved === '/school' || saved?.startsWith('/school?')) return saved;
  } catch { /* storage unavailable */ }
  return '/school';
}

export function allowSchoolNavigation(): boolean {
  return window.dispatchEvent(new Event(SCHOOL_LEAVE_EVENT, { cancelable: true }));
}