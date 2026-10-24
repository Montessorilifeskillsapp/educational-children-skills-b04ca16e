export type SchoolRole = 'school_admin' | 'teacher' | 'assistant'

/** Capabilities a School Admin can grant or withhold per staff role. */
export const CAPABILITIES = ['record_progress', 'edit_others_records', 'edit_roster', 'delete_student', 'plan', 'send_report'] as const
export type Capability = typeof CAPABILITIES[number]

export interface SchoolPolicies {
  /** 'assigned' = staff see only their classrooms; 'school' = staff may work in every classroom. */
  staff_scope: 'assigned' | 'school'
  teacher: Record<Capability, boolean>
  assistant: Record<Capability, boolean>
}

/** Defaults apply when a school never configures anything. School Admins always hold every capability. */
export const DEFAULT_POLICIES: SchoolPolicies = {
  staff_scope: 'assigned',
  teacher: { record_progress: true, edit_others_records: true, edit_roster: true, delete_student: true, plan: true, send_report: true },
  assistant: { record_progress: false, edit_others_records: false, edit_roster: false, delete_student: false, plan: false, send_report: false },
}

export function resolvePolicies(raw: unknown): SchoolPolicies {
  // deno-lint-ignore no-explicit-any
  const r = (raw && typeof raw === 'object' ? raw : {}) as any
  const pick = (role: 'teacher' | 'assistant') => Object.fromEntries(CAPABILITIES.map((c) =>
    [c, typeof r?.[role]?.[c] === 'boolean' ? r[role][c] : DEFAULT_POLICIES[role][c]])) as Record<Capability, boolean>
  return { staff_scope: r.staff_scope === 'school' ? 'school' : 'assigned', teacher: pick('teacher'), assistant: pick('assistant') }
}

export const DEFAULT_SEAT_LIMIT = 30

/** Whether a role may perform an action under the school's policies. */
export function roleAllows(role: SchoolRole, action: string, policies: SchoolPolicies = DEFAULT_POLICIES): boolean {
  if (role === 'school_admin') return true
  if (action === 'view') return true
  if (action === 'manage_school') return false
  if (action === 'edit_roster') return false
  return !!policies[role][action as Capability]
}
