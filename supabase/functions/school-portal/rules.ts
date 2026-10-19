export type SchoolRole = 'school_admin' | 'teacher' | 'assistant'

/** Which school roles may perform each portal action. */
export const PERMISSIONS: Record<string, SchoolRole[]> = {
  manage_school: ['school_admin'],
  edit_roster: ['school_admin', 'teacher'],
  delete_student: ['school_admin', 'teacher'],
  plan: ['school_admin', 'teacher'],
  send_report: ['school_admin', 'teacher'],
  record_progress: ['school_admin', 'teacher'],
  view: ['school_admin', 'teacher', 'assistant'],
}

export const DEFAULT_SEAT_LIMIT = 30

export function roleAllows(role: SchoolRole, action: string): boolean {
  return (PERMISSIONS[action] ?? []).includes(role)
}
