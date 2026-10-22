import { supabase } from '@/integrations/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { DEFAULT_POLICIES, resolvePolicies, roleAllows, type SchoolPolicies } from '../../../supabase/functions/school-portal/rules';
export { CAPABILITIES, DEFAULT_POLICIES, resolvePolicies, type Capability, type SchoolPolicies } from '../../../supabase/functions/school-portal/rules';

export type SchoolRole = 'school_admin' | 'teacher' | 'assistant';
export const ROLE_LABEL: Record<SchoolRole, string> = { school_admin: 'School Admin', teacher: 'Teacher', assistant: 'Assistant' };

export interface Membership { id: string; role: SchoolRole; school_id: string; schools: { id: string; name: string; seat_limit: number; contact_email: string | null; policies?: unknown } }
export interface Classroom { id: string; school_id: string; name: string; seat_limit: number | null; age_group?: string | null; lead_member_id?: string | null }
export interface Member { id: string; user_id: string; email: string; full_name: string | null; role: SchoolRole }
export interface Invite { id: string; email: string; role: SchoolRole; accepted_at: string | null }
export interface Student { id: string; classroom_id: string; name: string; date_of_birth: string | null; family_email: string | null; archived: boolean; health_notes?: string | null; support_notes?: string | null }
export interface Progress { id: string; student_id: string; skill_id: string; status: 'presented' | 'practising' | 'mastered'; note: string | null; updated_by: string | null; presented_at: string; updated_at: string }
export interface Observation { id: string; student_id: string; body: string; author_id: string | null; observed_at: string; edited_by?: string | null; edited_at?: string | null }
export interface PlanItem { id: string; classroom_id: string; plan_date: string; skill_id: string; student_ids: string[]; notes: string | null; done: boolean }
export interface Report { id: string; student_id: string; period_start: string; period_end: string; sent_to: string | null; sent_at: string | null; created_by?: string | null; created_at?: string; updated_by?: string | null; updated_at?: string | null; summary: { title?: string; body?: string; email_status?: 'pending' | 'queued' | 'school_mail' } }

// New tables may not be in generated types yet.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

let previewing = false;
/** While a School Admin previews another role, nothing may be saved. */
export function setRolePreview(on: boolean) { previewing = on; }
export const PREVIEW_BLOCKED = 'Previewing another role. Changes are turned off.';

export async function schoolCall<T = unknown>(body: Record<string, unknown>): Promise<T> {
  if (previewing && body.action !== 'me') throw new Error(PREVIEW_BLOCKED);
  const { data, error } = await supabase.functions.invoke('school-portal', { body });
  if (error) {
    let msg = error.message;
    if (error instanceof FunctionsHttpError) {
      try { msg = (await error.context.json()).error ?? msg; } catch { /* keep */ }
    }
    throw new Error(typeof msg === 'string' ? msg : 'Something went wrong');
  }
  return data as T;
}

let active: SchoolPolicies = DEFAULT_POLICIES;
/** Set the current school's policies so buttons match what the server will allow. */
export function setSchoolPolicies(raw: unknown) { active = resolvePolicies(raw); }
export const currentPolicies = () => active;

/** Mirrors supabase/functions/school-portal/rules.ts for showing or hiding buttons. The server enforces it. */
export const can = {
  manageSchool: (r: SchoolRole) => r === 'school_admin',
  editRoster: (r: SchoolRole) => roleAllows(r, 'edit_roster', active),
  deleteStudent: (r: SchoolRole) => roleAllows(r, 'delete_student', active),
  plan: (r: SchoolRole) => roleAllows(r, 'plan', active),
  sendReport: (r: SchoolRole) => roleAllows(r, 'send_report', active),
  recordProgress: (r: SchoolRole) => roleAllows(r, 'record_progress', active),
  editOthers: (r: SchoolRole) => roleAllows(r, 'edit_others_records', active),
  seeAllRooms: (r: SchoolRole) => r === 'school_admin' || active.staff_scope === 'school',
};

export const KERRY_EMAIL = 'montessorilifeskills@gmail.com';
