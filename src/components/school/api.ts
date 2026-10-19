import { supabase } from '@/integrations/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';

export type SchoolRole = 'school_admin' | 'teacher' | 'assistant';
export const ROLE_LABEL: Record<SchoolRole, string> = { school_admin: 'School Admin', teacher: 'Teacher', assistant: 'Assistant' };

export interface Membership { id: string; role: SchoolRole; school_id: string; schools: { id: string; name: string; seat_limit: number } }
export interface Classroom { id: string; school_id: string; name: string; seat_limit: number | null }
export interface Member { id: string; user_id: string; email: string; full_name: string | null; role: SchoolRole }
export interface Invite { id: string; email: string; role: SchoolRole; accepted_at: string | null }
export interface Student { id: string; classroom_id: string; name: string; date_of_birth: string | null; family_email: string | null; archived: boolean }
export interface Progress { id: string; student_id: string; skill_id: string; status: 'presented' | 'practising' | 'mastered'; note: string | null; presented_at: string; updated_at: string }
export interface Observation { id: string; student_id: string; body: string; author_id: string | null; observed_at: string }
export interface PlanItem { id: string; classroom_id: string; plan_date: string; skill_id: string; student_ids: string[]; notes: string | null; done: boolean }
export interface Report { id: string; student_id: string; period_start: string; period_end: string; sent_to: string | null; sent_at: string | null; summary: { title?: string; body?: string } }

// New tables may not be in generated types yet.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

export async function schoolCall<T = unknown>(body: Record<string, unknown>): Promise<T> {
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

/** Mirrors supabase/functions/school-portal/rules.ts for showing or hiding buttons. The server enforces it. */
export const can = {
  manageSchool: (r: SchoolRole) => r === 'school_admin',
  editRoster: (r: SchoolRole) => r !== 'assistant',
  plan: (r: SchoolRole) => r !== 'assistant',
  sendReport: (r: SchoolRole) => r !== 'assistant',
  recordProgress: (_r: SchoolRole) => true,
};

export const KERRY_EMAIL = 'montessorilifeskills@gmail.com';
