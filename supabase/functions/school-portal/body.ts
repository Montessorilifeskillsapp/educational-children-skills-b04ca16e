import { z } from 'npm:zod@3.23.8'
import { CAPABILITIES } from './rules.ts'
import { cleanText, isCalendarDate } from './validation.ts'
const text = (max: number, required = true) => z.string().max(max).transform(cleanText).pipe(required ? z.string().min(1).max(max) : z.string().max(max))
const date = z.string().refine(isCalendarDate, 'Enter a valid date in YYYY-MM-DD format.')
const uuid = z.string().uuid()
const role = z.enum(['school_admin', 'teacher', 'assistant'])
export const Body = z.discriminatedUnion('action', [
  z.object({ action: z.literal('me') }),
  z.object({ action: z.literal('classroom_save'), school_id: uuid, id: uuid.optional(), name: text(120),
    age_group: text(60, false).nullable().optional(), lead_member_id: uuid.nullable().optional().or(z.literal('')) }),
  z.object({ action: z.literal('school_profile_save'), school_id: uuid, name: text(120), contact_email: z.string().trim().email().max(255) }),
  z.object({ action: z.literal('classroom_delete'), id: uuid }),
  z.object({ action: z.literal('staff_assign'), classroom_id: uuid, member_id: uuid, assigned: z.boolean() }),
  z.object({ action: z.literal('invite'), school_id: uuid, email: z.string().email().max(255), role }),
  z.object({ action: z.literal('invite_cancel'), id: uuid }),
  z.object({ action: z.literal('member_role'), id: uuid, role }),
  z.object({ action: z.literal('member_remove'), id: uuid }),
  z.object({ action: z.literal('student_save'), classroom_id: uuid, id: uuid.optional(),
    name: text(120), date_of_birth: date.nullable().optional(),
    family_email: z.string().email().max(255).nullable().optional(), archived: z.boolean().optional(),
    health_notes: text(1000, false).nullable().optional(), support_notes: text(1000, false).nullable().optional() }),
  z.object({ action: z.literal('student_delete'), id: uuid, confirmation: z.literal('DELETE') }),
  z.object({ action: z.literal('progress_set'), student_id: uuid, skill_id: text(160),
    status: z.enum(['presented', 'practising', 'mastered', 'clear']), note: text(1000, false).nullable().optional() }),
  z.object({ action: z.literal('observation_add'), student_id: uuid, body: text(2000) }),
  z.object({ action: z.literal('observation_delete'), id: uuid }),
  z.object({ action: z.literal('plan_save'), classroom_id: uuid, id: uuid.optional(), plan_date: date,
    skill_id: text(160), student_ids: z.array(uuid).max(100), notes: text(1000, false).nullable().optional() }),
  z.object({ action: z.literal('plan_delete'), id: uuid }),
  z.object({ action: z.literal('plan_done'), id: uuid, done: z.boolean() }),
  z.object({ action: z.literal('report_record'), student_id: uuid, period_start: date, period_end: date,
    title: text(200), body: text(8000) }),
  z.object({ action: z.literal('policies_save'), school_id: uuid, policies: z.object({
    staff_scope: z.enum(['assigned', 'school']),
    teacher: z.object(Object.fromEntries(CAPABILITIES.map((c) => [c, z.boolean()]))),
    assistant: z.object(Object.fromEntries(CAPABILITIES.map((c) => [c, z.boolean()]))),
  }) }),
  z.object({ action: z.literal('observation_update'), id: uuid, body: text(2000) }),
  z.object({ action: z.literal('report_update'), id: uuid, title: text(200), body: text(8000) }),
  z.object({ action: z.literal('admin_list') }),
  z.object({ action: z.literal('admin_school_save'), id: uuid.optional(), name: text(160),
    contact_email: z.string().trim().email().max(255), seat_limit: z.number().int().min(1).max(500),
    active: z.boolean(), first_admin_email: z.string().email().max(255).optional() }),
  z.object({ action: z.literal('admin_school_delete'), id: uuid }),
].map((schema) => schema.strict()) as [z.ZodDiscriminatedUnionOption<'action'>, ...z.ZodDiscriminatedUnionOption<'action'>[]])
  .superRefine((b, ctx) => {
    if (b.action === 'report_record' && b.period_start > b.period_end) ctx.addIssue({ code: 'custom', message: 'Report start must not be after its end.' });
  })

