import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'
import { roleAllows, resolvePolicies, CAPABILITIES, type SchoolRole, type SchoolPolicies } from './rules.ts'
import { queueParentReport } from './reportDelivery.ts'
import { acceptSchoolInvite, queueSchoolInvite } from './invitations.ts'

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const uuid = z.string().uuid()
const role = z.enum(['school_admin', 'teacher', 'assistant'])
const Body = z.discriminatedUnion('action', [
  z.object({ action: z.literal('me') }),
  z.object({ action: z.literal('classroom_save'), school_id: uuid, id: uuid.optional(), name: z.string().min(1).max(120) }),
  z.object({ action: z.literal('classroom_delete'), id: uuid }),
  z.object({ action: z.literal('staff_assign'), classroom_id: uuid, member_id: uuid, assigned: z.boolean() }),
  z.object({ action: z.literal('invite'), school_id: uuid, email: z.string().email().max(255), role }),
  z.object({ action: z.literal('invite_cancel'), id: uuid }),
  z.object({ action: z.literal('member_role'), id: uuid, role }),
  z.object({ action: z.literal('member_remove'), id: uuid }),
  z.object({ action: z.literal('student_save'), classroom_id: uuid, id: uuid.optional(),
    name: z.string().min(1).max(120), date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
    family_email: z.string().email().max(255).nullable().optional(), archived: z.boolean().optional() }),
  z.object({ action: z.literal('student_delete'), id: uuid }),
  z.object({ action: z.literal('progress_set'), student_id: uuid, skill_id: z.string().min(1).max(160),
    status: z.enum(['presented', 'practising', 'mastered', 'clear']), note: z.string().max(1000).nullable().optional() }),
  z.object({ action: z.literal('observation_add'), student_id: uuid, body: z.string().min(1).max(2000) }),
  z.object({ action: z.literal('observation_delete'), id: uuid }),
  z.object({ action: z.literal('plan_save'), classroom_id: uuid, id: uuid.optional(), plan_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    skill_id: z.string().min(1).max(160), student_ids: z.array(uuid).max(100), notes: z.string().max(1000).nullable().optional() }),
  z.object({ action: z.literal('plan_delete'), id: uuid }),
  z.object({ action: z.literal('plan_done'), id: uuid, done: z.boolean() }),
  z.object({ action: z.literal('report_send'), student_id: uuid, period_start: z.string(), period_end: z.string(),
    title: z.string().min(1).max(200), body: z.string().min(1).max(8000), summary: z.record(z.unknown()) }),
  z.object({ action: z.literal('report_record'), student_id: uuid, period_start: z.string(), period_end: z.string(),
    title: z.string().min(1).max(200), body: z.string().min(1).max(8000) }),
  z.object({ action: z.literal('policies_save'), school_id: uuid, policies: z.object({
    staff_scope: z.enum(['assigned', 'school']),
    teacher: z.object(Object.fromEntries(CAPABILITIES.map((c) => [c, z.boolean()]))),
    assistant: z.object(Object.fromEntries(CAPABILITIES.map((c) => [c, z.boolean()]))),
  }) }),
  z.object({ action: z.literal('observation_update'), id: uuid, body: z.string().min(1).max(2000) }),
  z.object({ action: z.literal('report_update'), id: uuid, title: z.string().min(1).max(200), body: z.string().min(1).max(8000) }),
  z.object({ action: z.literal('admin_list') }),
  z.object({ action: z.literal('admin_school_save'), id: uuid.optional(), name: z.string().min(1).max(160),
    contact_email: z.string().trim().email().max(255), seat_limit: z.number().int().min(1).max(500),
    active: z.boolean(), first_admin_email: z.string().email().max(255).optional() }),
  z.object({ action: z.literal('admin_school_delete'), id: uuid }),
])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '')
    const { data: u, error: ue } = await admin.auth.getUser(token)
    if (ue || !u.user) return json({ error: 'Unauthorized' }, 401)
    const uid = u.user.id
    const email = (u.user.email ?? '').toLowerCase()

    const parsed = Body.safeParse(await req.json())
    if (!parsed.success) return json({ error: parsed.error.flatten() }, 400)
    const b = parsed.data
    const forbidden = () => json({ error: 'You do not have permission for this.' }, 403)

    let auditSchool: string | null = null
    const membership = async (schoolId: string) => {
      const { data } = await admin.from('school_members').select('id, role, schools!inner(active, policies)')
        .eq('school_id', schoolId).eq('user_id', uid).maybeSingle()
      // deno-lint-ignore no-explicit-any
      if (!data || !(data as any).schools?.active) return null
      auditSchool = schoolId
      // deno-lint-ignore no-explicit-any
      return { id: data.id as string, role: data.role as SchoolRole, policies: resolvePolicies((data as any).schools?.policies) as SchoolPolicies }
    }
    // Returns the caller's role in a classroom's school if they may work in that classroom.
    const classAccess = async (classroomId: string, action: string) => {
      const { data: c } = await admin.from('classrooms').select('id, school_id').eq('id', classroomId).maybeSingle()
      if (!c) return null
      const m = await membership(c.school_id)
      if (!m || !roleAllows(m.role, action, m.policies)) return null
      if (m.role !== 'school_admin' && m.policies.staff_scope === 'assigned') {
        const { data: s } = await admin.from('classroom_staff').select('member_id').eq('classroom_id', classroomId).eq('member_id', m.id).maybeSingle()
        if (!s) return null
      }
      return { ...m, school_id: c.school_id as string }
    }
    const studentAccess = async (studentId: string, action: string) => {
      const { data: s } = await admin.from('school_students').select('id, classroom_id, school_id, name, family_email').eq('id', studentId).maybeSingle()
      if (!s) return null
      const a = await classAccess(s.classroom_id, action)
      return a ? { ...a, student: s } : null
    }
    const isAppAdmin = async () => {
      const { data } = await admin.from('user_roles').select('role').eq('user_id', uid).eq('role', 'admin').maybeSingle()
      return !!data
    }

    const res: Response = await (async () => { switch (b.action) {
      case 'school_profile_save': {
        // School Admins maintain their own school's name and official email; places stay platform-managed.
        const m = await membership(b.school_id)
        if (!m || m.role !== 'school_admin') return forbidden()
        const p = z.object({ name: z.string().trim().min(1).max(120), contact_email: z.string().trim().email().max(255) }).safeParse(b)
        if (!p.success) return json({ error: 'Enter a school name and a valid school email.' }, 400)
        const { error } = await admin.from('schools').update({ name: p.data.name, contact_email: p.data.contact_email.toLowerCase() }).eq('id', b.school_id)
        if (error) throw error
        return json({ ok: true })
      }
      case 'policies_save': {
        const m = await membership(b.school_id)
        if (!m || m.role !== 'school_admin') return forbidden()
        const { error } = await admin.from('schools').update({ policies: resolvePolicies(b.policies) }).eq('id', b.school_id)
        if (error) throw error
        return json({ ok: true })
      }
      case 'observation_update': {
        const { data: o } = await admin.from('student_observations').select('student_id, author_id').eq('id', b.id).maybeSingle()
        if (!o) return forbidden()
        const a = await studentAccess(o.student_id, o.author_id === uid ? 'record_progress' : 'edit_others_records')
        if (!a) return forbidden()
        const { error } = await admin.from('student_observations').update({ body: b.body, edited_by: uid, edited_at: new Date().toISOString() }).eq('id', b.id)
        if (error) throw error
        return json({ ok: true })
      }
      case 'report_update': {
        const { data: r } = await admin.from('student_reports').select('student_id, created_by, summary').eq('id', b.id).maybeSingle()
        if (!r) return forbidden()
        const a = await studentAccess(r.student_id, r.created_by === uid ? 'send_report' : 'edit_others_records')
        if (!a) return forbidden()
        const { error } = await admin.from('student_reports').update({ summary: { ...(r.summary ?? {}), title: b.title, body: b.body },
          updated_by: uid, updated_at: new Date().toISOString() }).eq('id', b.id)
        if (error) throw error
        return json({ ok: true })
      }
      case 'me': {
        if (email) {
          const { data: invites, error: inviteError } = await admin.from('school_invites').select('*').ilike('email', email).is('accepted_at', null)
          if (inviteError) throw inviteError
          for (const inv of invites ?? []) {
            await acceptSchoolInvite(admin, inv, uid, email)
          }
        }
        const { data } = await admin.from('school_members').select('id, role, school_id, schools!inner(id, name, active, seat_limit, contact_email, policies)').eq('user_id', uid)
        // deno-lint-ignore no-explicit-any
        return json({ memberships: (data ?? []).filter((m: any) => m.schools?.active) })
      }
      case 'classroom_save': {
        const m = await membership(b.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        if (b.lead_member_id) {
          const { data: lead } = await admin.from('school_members').select('id').eq('id', b.lead_member_id).eq('school_id', b.school_id).maybeSingle()
          if (!lead) return forbidden()
        }
        const fields: Record<string, unknown> = { name: b.name }
        if (b.age_group !== undefined) fields.age_group = b.age_group ? String(b.age_group).slice(0, 60) : null
        if (b.lead_member_id !== undefined) fields.lead_member_id = b.lead_member_id || null
        const q = b.id
          ? admin.from('classrooms').update(fields).eq('id', b.id).eq('school_id', b.school_id)
          : admin.from('classrooms').insert({ school_id: b.school_id, ...fields })
        const { data, error } = await q.select().single()
        if (error) throw error
        return json({ classroom: data })
      }
      case 'classroom_delete': {
        const { data: c } = await admin.from('classrooms').select('school_id').eq('id', b.id).maybeSingle()
        const m = c && await membership(c.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        await admin.from('classrooms').delete().eq('id', b.id)
        return json({ ok: true })
      }
      case 'staff_assign': {
        const { data: c } = await admin.from('classrooms').select('school_id').eq('id', b.classroom_id).maybeSingle()
        const m = c && await membership(c.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        const { data: target } = await admin.from('school_members').select('id').eq('id', b.member_id).eq('school_id', c!.school_id).maybeSingle()
        if (!target) return forbidden()
        if (b.assigned) await admin.from('classroom_staff').upsert({ classroom_id: b.classroom_id, member_id: b.member_id })
        else await admin.from('classroom_staff').delete().eq('classroom_id', b.classroom_id).eq('member_id', b.member_id)
        return json({ ok: true })
      }
      case 'invite': {
        const m = await membership(b.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        const inviteEmail = b.email.toLowerCase()
        const { data: already } = await admin.from('school_members').select('id').eq('school_id', b.school_id).ilike('email', inviteEmail).maybeSingle()
        if (already) return json({ error: 'This person is already on your staff. Change their role in the list below instead.' }, 400)
        const { error } = await admin.from('school_invites').upsert({ school_id: b.school_id, email: inviteEmail, role: b.role, accepted_at: null }, { onConflict: 'school_id,email' })
        if (error) throw error
        const { data: school } = await admin.from('schools').select('name').eq('id', b.school_id).single()
        const delivery = await queueSchoolInvite(admin, inviteEmail, school.name, b.role, `${b.school_id}-${inviteEmail}-${Date.now()}`)
        return json({ ok: true, invitation: delivery })
      }
      case 'invite_cancel': {
        const { data: inv } = await admin.from('school_invites').select('school_id').eq('id', b.id).maybeSingle()
        const m = inv && await membership(inv.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        await admin.from('school_invites').delete().eq('id', b.id)
        return json({ ok: true })
      }
      case 'member_role':
      case 'member_remove': {
        const { data: t } = await admin.from('school_members').select('school_id, user_id, role').eq('id', b.id).maybeSingle()
        const m = t && await membership(t.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        if (t!.user_id === uid) return json({ error: 'Another School Admin must change or remove your own access.' }, 400)
        // Never leave a school without a School Admin.
        if (t!.role === 'school_admin' && (b.action === 'member_remove' || b.role !== 'school_admin')) {
          const { count } = await admin.from('school_members').select('id', { count: 'exact', head: true }).eq('school_id', t!.school_id).eq('role', 'school_admin')
          if ((count ?? 0) <= 1) return json({ error: 'A school needs at least one School Admin.' }, 400)
        }
        if (b.action === 'member_role') await admin.from('school_members').update({ role: b.role }).eq('id', b.id)
        else await admin.from('school_members').delete().eq('id', b.id)
        return json({ ok: true })
      }
      case 'student_save': {
        const a = await classAccess(b.classroom_id, 'edit_roster')
        if (!a) return forbidden()
        const row = { classroom_id: b.classroom_id, school_id: a.school_id, name: b.name, date_of_birth: b.date_of_birth ?? null,
          family_email: b.family_email ?? null, ...(b.archived !== undefined ? { archived: b.archived } : {}),
          ...(b.health_notes !== undefined ? { health_notes: b.health_notes ? String(b.health_notes).slice(0, 1000) : null } : {}),
          ...(b.support_notes !== undefined ? { support_notes: b.support_notes ? String(b.support_notes).slice(0, 1000) : null } : {}) }
        if (b.id) {
          const existing = await studentAccess(b.id, 'edit_roster')
          if (!existing) return forbidden()
        }
        const q = b.id ? admin.from('school_students').update(row).eq('id', b.id) : admin.from('school_students').insert(row)
        const { data, error } = await q.select().single()
        if (error) {
          if (String(error.message).includes('CLASSROOM_FULL')) return json({ error: 'CLASSROOM_FULL' }, 409)
          throw error
        }
        return json({ student: data })
      }
      case 'student_delete': {
        const a = await studentAccess(b.id, 'delete_student')
        if (!a) return forbidden()
        await admin.from('school_students').delete().eq('id', b.id)
        return json({ ok: true })
      }
      case 'progress_set': {
        const a = await studentAccess(b.student_id, 'record_progress')
        if (!a) return forbidden()
        if (b.status === 'clear') {
          await admin.from('student_progress').delete().eq('student_id', b.student_id).eq('skill_id', b.skill_id)
          return json({ ok: true })
        }
        const { data, error } = await admin.from('student_progress').upsert({ student_id: b.student_id, school_id: a.school_id, skill_id: b.skill_id,
          status: b.status, note: b.note ?? null, updated_by: uid }, { onConflict: 'student_id,skill_id' }).select().single()
        if (error) throw error
        return json({ progress: data })
      }
      case 'observation_add': {
        const a = await studentAccess(b.student_id, 'record_progress')
        if (!a) return forbidden()
        const { data, error } = await admin.from('student_observations').insert({ student_id: b.student_id, school_id: a.school_id, body: b.body, author_id: uid }).select().single()
        if (error) throw error
        return json({ observation: data })
      }
      case 'observation_delete': {
        const { data: o } = await admin.from('student_observations').select('student_id, author_id').eq('id', b.id).maybeSingle()
        if (!o) return forbidden()
        const a = await studentAccess(o.student_id, o.author_id === uid ? 'record_progress' : 'edit_others_records')
        if (!a) return forbidden()
        await admin.from('student_observations').delete().eq('id', b.id)
        return json({ ok: true })
      }
      case 'plan_save': {
        const a = await classAccess(b.classroom_id, 'plan')
        if (!a) return forbidden()
        const row = { classroom_id: b.classroom_id, school_id: a.school_id, plan_date: b.plan_date, skill_id: b.skill_id, student_ids: b.student_ids, notes: b.notes ?? null }
        const q = b.id ? admin.from('lesson_plan_items').update(row).eq('id', b.id).eq('classroom_id', b.classroom_id) : admin.from('lesson_plan_items').insert(row)
        const { data, error } = await q.select().single()
        if (error) throw error
        return json({ item: data })
      }
      case 'plan_delete':
      case 'plan_done': {
        const { data: p } = await admin.from('lesson_plan_items').select('*').eq('id', b.id).maybeSingle()
        if (!p) return forbidden()
        const a = await classAccess(p.classroom_id, b.action === 'plan_delete' ? 'plan' : 'record_progress')
        if (!a) return forbidden()
        if (b.action === 'plan_delete') {
          await admin.from('lesson_plan_items').delete().eq('id', b.id)
          return json({ ok: true })
        }
        await admin.from('lesson_plan_items').update({ done: b.done }).eq('id', b.id)
        if (b.done) {
          // A completed plan item counts as a presentation for students without a record yet.
          let ids: string[] = p.student_ids ?? []
          if (!ids.length) {
            const { data: all } = await admin.from('school_students').select('id').eq('classroom_id', p.classroom_id).eq('archived', false)
            ids = (all ?? []).map((r: { id: string }) => r.id)
          }
          for (const sid of ids) {
            const { data: ex } = await admin.from('student_progress').select('id').eq('student_id', sid).eq('skill_id', p.skill_id).maybeSingle()
            if (!ex) await admin.from('student_progress').insert({ student_id: sid, school_id: p.school_id, skill_id: p.skill_id, status: 'presented', updated_by: uid })
          }
        }
        return json({ ok: true })
      }
      case 'report_send': {
        const a = await studentAccess(b.student_id, 'send_report')
        if (!a) return forbidden()
        const to = a.student.family_email
        if (!to) return json({ error: 'Add a family email to this student first.' }, 400)
        const result = await queueParentReport(admin, { ...b, school_id: a.school_id, recipient: to, user_id: uid })
        return json(result)
      }
      case 'report_record': {
        // The teacher sends the report from the school's own email app; we keep a record of it.
        const a = await studentAccess(b.student_id, 'send_report')
        if (!a) return forbidden()
        const to = a.student.family_email
        if (!to) return json({ error: 'Add a family email to this student first.' }, 400)
        const { data, error } = await admin.from('student_reports').insert({
          student_id: b.student_id, school_id: a.school_id, period_start: b.period_start, period_end: b.period_end,
          summary: { title: b.title, body: b.body, email_status: 'school_mail' }, sent_to: to, sent_at: null, created_by: uid,
        }).select().single()
        if (error) throw error
        return json({ report: data })
      }
      case 'admin_list': {
        if (!(await isAppAdmin())) return forbidden()
        const { data: schools } = await admin.from('schools').select('*').order('created_at', { ascending: false })
        const { data: members } = await admin.from('school_members').select('school_id, email, role')
        const { data: invites } = await admin.from('school_invites').select('school_id, email, role, accepted_at')
        return json({ schools, members, invites })
      }
      case 'admin_school_save': {
        if (!(await isAppAdmin())) return forbidden()
        const row = { name: b.name, contact_email: b.contact_email.toLowerCase(), seat_limit: b.seat_limit, active: b.active }
        const q = b.id ? admin.from('schools').update(row).eq('id', b.id) : admin.from('schools').insert(row)
        const { data, error } = await q.select().single()
        if (error) throw error
        let invitation = null
        if (b.first_admin_email) {
          const e = b.first_admin_email.toLowerCase()
          const { error: inviteError } = await admin.from('school_invites').upsert({ school_id: data.id, email: e, role: 'school_admin', accepted_at: null }, { onConflict: 'school_id,email' })
          if (inviteError) return json({ school: data, invitation: { queued: false, error: 'School saved, but the invitation could not be saved. Edit this school to retry.' } })
          invitation = await queueSchoolInvite(admin, e, data.name, 'school_admin', `${data.id}-${e}-${Date.now()}`)
        }
        return json({ school: data, invitation })
      }
      case 'admin_school_delete': {
        if (!(await isAppAdmin())) return forbidden()
        const { error } = await admin.from('schools').delete().eq('id', b.id)
        if (error) throw error
        return json({ ok: true })
      }
      default: return json({ error: "Unknown action" }, 400)
    } })()
    const READS = ['me', 'admin_list']
    if (res.ok && !READS.includes(b.action)) {
      // deno-lint-ignore no-explicit-any
      const target = (b as any).id ?? (b as any).student_id ?? (b as any).classroom_id ?? null
      await admin.from('school_audit_log').insert({ school_id: auditSchool, actor_id: uid, actor_email: email, action: b.action, target_id: target ? String(target) : null })
    }
    return res

  } catch (e) {
    console.error(e)
    return json({ error: e instanceof Error ? e.message : 'Server error' }, 500)
  }
})

