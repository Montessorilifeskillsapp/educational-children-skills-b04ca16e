import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'
import { Body } from './body.ts'
import { sameClassroom, containsOnlyClassroomStudents } from './validation.ts'
import { roleAllows, resolvePolicies, type SchoolRole, type SchoolPolicies } from './rules.ts'
import { acceptSchoolInvite, queueSchoolInvite } from './invitations.ts'
import { parentOwnsRecord, exactEmailPattern } from './parentRecords.ts'

const checked = async <T extends { error: unknown }>(operation: PromiseLike<T>): Promise<T> => {
  const result = await operation
  if (result.error) throw result.error
  return result
}

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })


Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  try {
    const url = Deno.env.get('SUPABASE_URL')
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !key) return json({ error: 'School service is unavailable.' }, 503)
    const admin = createClient(url, key)
    const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '')
    const { data: u, error: ue } = await admin.auth.getUser(token)
    if (ue || !u.user) return json({ error: 'Unauthorized' }, 401)
    const uid = u.user.id
    const email = (u.user.email ?? '').toLowerCase()

    const raw = await req.text()
    if (new TextEncoder().encode(raw).length > 32768) return json({ error: 'Request is too large.' }, 413)
    let input: unknown
    try { input = JSON.parse(raw) } catch { return json({ error: 'Invalid request.' }, 400) }
    const parsed = Body.safeParse(input)
    if (!parsed.success) return json({ error: parsed.error.flatten() }, 400)
    const b = parsed.data
    const forbidden = () => json({ error: 'You do not have permission for this.' }, 403)

    let auditSchool: string | null = null
    const membership = async (schoolId: string) => {
      const { data } = await checked(admin.from('school_members').select('id, role, schools!inner(active, policies)')
        .eq('school_id', schoolId).eq('user_id', uid).maybeSingle())
      // deno-lint-ignore no-explicit-any
      if (!data || !(data as any).schools?.active) return null
      auditSchool = schoolId
      // deno-lint-ignore no-explicit-any
      return { id: data.id as string, role: data.role as SchoolRole, policies: resolvePolicies((data as any).schools?.policies) as SchoolPolicies }
    }
    // Returns the caller's role in a classroom's school if they may work in that classroom.
    const classAccess = async (classroomId: string, action: string) => {
      const { data: c } = await checked(admin.from('classrooms').select('id, school_id').eq('id', classroomId).maybeSingle())
      if (!c) return null
      const m = await membership(c.school_id)
      if (!m || !roleAllows(m.role, action, m.policies)) return null
      if (m.role !== 'school_admin' && m.policies.staff_scope === 'assigned') {
        const { data: s } = await checked(admin.from('classroom_staff').select('member_id').eq('classroom_id', classroomId).eq('member_id', m.id).maybeSingle())
        if (!s) return null
      }
      return { ...m, school_id: c.school_id as string }
    }
    const studentAccess = async (studentId: string, action: string) => {
      const { data: s } = await checked(admin.from('school_students').select('id, classroom_id, school_id, name, family_email').eq('id', studentId).maybeSingle())
      if (!s) return null
      const a = await classAccess(s.classroom_id, action)
      return a ? { ...a, student: s } : null
    }
    const isAppAdmin = async () => {
      const { data } = await checked(admin.from('user_roles').select('role').eq('user_id', uid).eq('role', 'admin').maybeSingle())
      return !!data
    }

    const res: Response = await (async () => { switch (b.action) {
      case 'parent_access': {
        const a = await studentAccess(b.student_id, 'manage_school')
        if (!a || a.role !== 'school_admin') return forbidden()
        if (b.approved && !a.student.family_email) return json({ error: 'Add and verify the child’s parent email first.' }, 400)
        await checked(admin.from('school_students').update({ parent_access_enabled: b.approved }).eq('id', b.student_id))
        return json({ ok: true })
      }
      case 'parent_records': {
        if (!u.user.email_confirmed_at || !email) return forbidden()
        if (!b.student_id) {
          const { data } = await checked(admin.from('school_students')
            .select('id, name, schools!inner(name, active)').ilike('family_email', exactEmailPattern(email))
            .eq('parent_access_enabled', true).eq('schools.active', true).order('id').limit(100))
          return json({ students: (data ?? []).map((s) => ({ id: s.id, name: s.name,
            school_name: (s.schools as unknown as { name: string }).name })) })
        }
        const { data: student } = await checked(admin.from('school_students')
          .select('id, school_id, name, date_of_birth, family_email, health_notes, parent_access_enabled, schools!inner(name, active)')
          .eq('id', b.student_id).maybeSingle())
        if (!student || !parentOwnsRecord(u.user, student.family_email, student.parent_access_enabled) || !(student.schools as unknown as { active: boolean }).active) return forbidden()
        auditSchool = student.school_id
        const readAll = async (table: string, fields: string, order: string) => {
          const rows: Record<string, unknown>[] = []
          for (let offset = 0; ; offset += 500) {
            const { data } = await checked(admin.from(table).select(fields).eq('student_id', student.id)
              .eq('school_id', student.school_id).order(order).order('id').range(offset, offset + 499))
            const page = (data ?? []) as unknown as Record<string, unknown>[]
            rows.push(...page)
            if (page.length < 500) return rows
          }
        }
        const [observations, progress, reports] = await Promise.all([
          readAll('student_observations', 'id, body, observed_at, edited_at', 'observed_at'),
          readAll('student_progress', 'id, skill_id, status, note, presented_at, updated_at', 'updated_at'),
          readAll('student_reports', 'id, period_start, period_end, summary, created_at, updated_at', 'created_at'),
        ])
        return json({ student: { id: student.id, name: student.name, date_of_birth: student.date_of_birth,
          health_notes: student.health_notes, school_name: (student.schools as unknown as { name: string }).name }, observations, progress, reports })
      }
      case 'school_profile_save': {
        // School Admins maintain their own school's name and official email; places stay platform-managed.
        const m = await membership(b.school_id)
        if (!m || m.role !== 'school_admin') return forbidden()
        const p = z.object({ name: z.string().trim().min(1).max(120), contact_email: z.string().trim().email().max(255) }).safeParse(b)
        if (!p.success) return json({ error: 'Enter a school name and a valid school email.' }, 400)
        const { error } = await checked(admin.from('schools').update({ name: p.data.name, contact_email: p.data.contact_email.toLowerCase() }).eq('id', b.school_id))
        if (error) throw error
        return json({ ok: true })
      }
      case 'policies_save': {
        const m = await membership(b.school_id)
        if (!m || m.role !== 'school_admin') return forbidden()
        const { error } = await checked(admin.from('schools').update({ policies: resolvePolicies(b.policies) }).eq('id', b.school_id))
        if (error) throw error
        return json({ ok: true })
      }
      case 'observation_update': {
        const { data: o } = await checked(admin.from('student_observations').select('student_id, author_id').eq('id', b.id).maybeSingle())
        if (!o) return forbidden()
        const a = await studentAccess(o.student_id, o.author_id === uid ? 'record_progress' : 'edit_others_records')
        if (!a) return forbidden()
        const { error } = await checked(admin.from('student_observations').update({ body: b.body, edited_by: uid, edited_at: new Date().toISOString() }).eq('id', b.id))
        if (error) throw error
        return json({ ok: true })
      }
      case 'report_update': {
        const { data: r } = await checked(admin.from('student_reports').select('student_id, created_by, summary').eq('id', b.id).maybeSingle())
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
          const { data: invites, error: inviteError } = await checked(admin.from('school_invites').select('*').ilike('email', email).is('accepted_at', null))
          if (inviteError) throw inviteError
          for (const inv of invites ?? []) {
            await acceptSchoolInvite(admin, inv, uid, email)
          }
        }
        const { data } = await checked(admin.from('school_members').select('id, role, school_id, schools!inner(id, name, active, seat_limit, contact_email, policies)').eq('user_id', uid))
        // deno-lint-ignore no-explicit-any
        return json({ memberships: (data ?? []).filter((m: any) => m.schools?.active) })
      }
      case 'classroom_save': {
        const m = await membership(b.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        if (b.lead_member_id) {
          const { data: lead } = await checked(admin.from('school_members').select('id').eq('id', b.lead_member_id).eq('school_id', b.school_id).maybeSingle())
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
        const { data: c } = await checked(admin.from('classrooms').select('school_id').eq('id', b.id).maybeSingle())
        const m = c && await membership(c.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        await checked(admin.from('classrooms').delete().eq('id', b.id))
        return json({ ok: true })
      }
      case 'staff_assign': {
        const { data: c } = await checked(admin.from('classrooms').select('school_id').eq('id', b.classroom_id).maybeSingle())
        const m = c && await membership(c.school_id)
        if (!c || !m || !roleAllows(m.role, 'manage_school')) return forbidden()
        const { data: target } = await checked(admin.from('school_members').select('id').eq('id', b.member_id).eq('school_id', c.school_id).maybeSingle())
        if (!target) return forbidden()
        if (b.assigned) await checked(admin.from('classroom_staff').upsert({ classroom_id: b.classroom_id, member_id: b.member_id }))
        else await checked(admin.from('classroom_staff').delete().eq('classroom_id', b.classroom_id).eq('member_id', b.member_id))
        return json({ ok: true })
      }
      case 'invite': {
        const m = await membership(b.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        const inviteEmail = b.email.toLowerCase()
        const { data: already } = await checked(admin.from('school_members').select('id').eq('school_id', b.school_id).ilike('email', inviteEmail).maybeSingle())
        if (already) return json({ error: 'This person is already on your staff. Change their role in the list below instead.' }, 400)
        const roomIds = [...new Set(b.classroom_ids ?? [])]
        if (roomIds.length) {
          const { data: rooms } = await checked(admin.from('classrooms').select('id').eq('school_id', b.school_id).in('id', roomIds))
          if ((rooms ?? []).length !== roomIds.length) return json({ error: 'One of the chosen classrooms does not belong to this school.' }, 400)
        }
        const { error } = await checked(admin.from('school_invites').upsert({ school_id: b.school_id, email: inviteEmail, role: b.role, classroom_ids: roomIds, accepted_at: null }, { onConflict: 'school_id,email' }))
        if (error) throw error
        const { data: school } = await checked(admin.from('schools').select('name').eq('id', b.school_id).single())
        const delivery = await queueSchoolInvite(admin, inviteEmail, school.name, b.role, `${b.school_id}-${inviteEmail}-${Date.now()}`, req.headers.get('Origin'))
        return json({ ok: true, invitation: delivery })
      }
      case 'invite_cancel': {
        const { data: inv } = await checked(admin.from('school_invites').select('school_id').eq('id', b.id).maybeSingle())
        const m = inv && await membership(inv.school_id)
        if (!m || !roleAllows(m.role, 'manage_school')) return forbidden()
        await checked(admin.from('school_invites').delete().eq('id', b.id))
        return json({ ok: true })
      }
      case 'member_role':
      case 'member_remove': {
        const { data: t } = await checked(admin.from('school_members').select('school_id, user_id, role').eq('id', b.id).maybeSingle())
        const m = t && await membership(t.school_id)
        if (!t || !m || !roleAllows(m.role, 'manage_school')) return forbidden()
        if (t.user_id === uid) return json({ error: 'Another School Admin must change or remove your own access.' }, 400)
        // Never leave a school without a School Admin.
        if (t.role === 'school_admin' && (b.action === 'member_remove' || b.role !== 'school_admin')) {
          const { count } = await checked(admin.from('school_members').select('id', { count: 'exact', head: true }).eq('school_id', t.school_id).eq('role', 'school_admin'))
          if ((count ?? 0) <= 1) return json({ error: 'A school needs at least one School Admin.' }, 400)
        }
        if (b.action === 'member_role') await checked(admin.from('school_members').update({ role: b.role }).eq('id', b.id))
        else await checked(admin.from('school_members').delete().eq('id', b.id))
        return json({ ok: true })
      }
      case 'student_save': {
        const a = await classAccess(b.classroom_id, 'edit_roster')
        if (!a) return forbidden()
        const row = { classroom_id: b.classroom_id, school_id: a.school_id, name: b.name, date_of_birth: b.date_of_birth ?? null,
          family_email: b.family_email ?? null, ...(b.archived !== undefined ? { archived: b.archived } : {}),
          ...(b.health_notes !== undefined ? { health_notes: b.health_notes ? String(b.health_notes).slice(0, 1000) : null } : {}) }
        if (b.id) {
          const existing = await studentAccess(b.id, 'edit_roster')
          if (!existing || !sameClassroom(existing.student, { classroom_id: b.classroom_id, school_id: a.school_id })) return forbidden()
        }
        const q = b.id ? admin.from('school_students').update(row).eq('id', b.id).eq('school_id', a.school_id).eq('classroom_id', b.classroom_id) : admin.from('school_students').insert(row)
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
        await checked(admin.rpc('erase_school_student', { _student_id: b.id, _actor_id: uid, _actor_email: email }))
        return json({ ok: true })
      }
      case 'record_export': {
        // Records that a School Admin exported a child's full record; the audit entry is written below.
        const a = await studentAccess(b.student_id, 'manage_school')
        if (!a) return forbidden()
        return json({ ok: true })
      }
      case 'progress_set': {
        const a = await studentAccess(b.student_id, 'record_progress')
        if (!a) return forbidden()
        if (b.status === 'clear') {
          await checked(admin.from('student_progress').delete().eq('student_id', b.student_id).eq('skill_id', b.skill_id))
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
        const { data, error } = await checked(admin.from('student_observations').insert({ student_id: b.student_id, school_id: a.school_id, body: b.body, author_id: uid }).select().single())
        if (error) throw error
        return json({ observation: data })
      }
      case 'observation_delete': {
        const { data: o } = await checked(admin.from('student_observations').select('student_id, author_id').eq('id', b.id).maybeSingle())
        if (!o) return forbidden()
        const a = await studentAccess(o.student_id, o.author_id === uid ? 'record_progress' : 'edit_others_records')
        if (!a) return forbidden()
        await checked(admin.from('student_observations').delete().eq('id', b.id))
        return json({ ok: true })
      }
      case 'plan_save': {
        const a = await classAccess(b.classroom_id, 'plan')
        if (!a) return forbidden()
        const { data: planStudents, error: studentError } = await checked(admin.from('school_students').select('id').eq('classroom_id', b.classroom_id).eq('archived', false).in('id', b.student_ids))
        if (studentError) throw studentError
        if (!containsOnlyClassroomStudents(b.student_ids, (planStudents ?? []).map((s: { id: string }) => s.id))) return forbidden()
        const row = { classroom_id: b.classroom_id, school_id: a.school_id, plan_date: b.plan_date, skill_id: b.skill_id, student_ids: b.student_ids, notes: b.notes ?? null }
        const q = b.id ? admin.from('lesson_plan_items').update(row).eq('id', b.id).eq('classroom_id', b.classroom_id) : admin.from('lesson_plan_items').insert(row)
        const { data, error } = await q.select().single()
        if (error) throw error
        return json({ item: data })
      }
      case 'plan_delete':
      case 'plan_done': {
        const { data: p } = await checked(admin.from('lesson_plan_items').select('*').eq('id', b.id).maybeSingle())
        if (!p) return forbidden()
        const a = await classAccess(p.classroom_id, b.action === 'plan_delete' ? 'plan' : 'record_progress')
        if (!a) return forbidden()
        if (b.action === 'plan_delete') {
          await checked(admin.from('lesson_plan_items').delete().eq('id', b.id))
          return json({ ok: true })
        }
        await checked(admin.from('lesson_plan_items').update({ done: b.done }).eq('id', b.id))
        if (b.done) {
          // A completed plan item counts as a presentation for students without a record yet.
          let ids: string[] = p.student_ids ?? []
          if (!ids.length) {
            const { data: all } = await checked(admin.from('school_students').select('id').eq('classroom_id', p.classroom_id).eq('archived', false))
            ids = (all ?? []).map((r: { id: string }) => r.id)
          }
          const { data: validStudents, error: validError } = await checked(admin.from('school_students').select('id').eq('classroom_id', p.classroom_id).eq('archived', false).in('id', ids))
          if (validError) throw validError
          ids = (validStudents ?? []).map((s: { id: string }) => s.id)
          for (const sid of ids) {
            const { data: ex } = await checked(admin.from('student_progress').select('id').eq('student_id', sid).eq('skill_id', p.skill_id).maybeSingle())
            if (!ex) await checked(admin.from('student_progress').insert({ student_id: sid, school_id: p.school_id, skill_id: p.skill_id, status: 'presented', updated_by: uid }))
          }
        }
        return json({ ok: true })
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
        const { data: schools } = await checked(admin.from('schools').select('*').order('created_at', { ascending: false }))
        const { data: members } = await checked(admin.from('school_members').select('school_id, email, role'))
        const { data: invites } = await checked(admin.from('school_invites').select('school_id, email, role, accepted_at'))
        return json({ schools, members, invites })
      }
      case 'admin_school_save': {
        if (!(await isAppAdmin())) return forbidden()
        auditSchool = b.id ?? null
        const row = { name: b.name, contact_email: b.contact_email.toLowerCase(), seat_limit: b.seat_limit, active: b.active }
        const q = b.id ? admin.from('schools').update(row).eq('id', b.id) : admin.from('schools').insert(row)
        const { data, error } = await q.select().single()
        if (error) throw error
        auditSchool = data.id
        let invitation = null
        if (b.first_admin_email) {
          const e = b.first_admin_email.toLowerCase()
          const { error: inviteError } = await admin.from('school_invites').upsert({ school_id: data.id, email: e, role: 'school_admin', accepted_at: null }, { onConflict: 'school_id,email' })
          if (inviteError) return json({ school: data, invitation: { queued: false, error: 'School saved, but the invitation could not be saved. Edit this school to retry.' } })
          invitation = await queueSchoolInvite(admin, e, data.name, 'school_admin', `${data.id}-${e}-${Date.now()}`, req.headers.get('Origin'))
        }
        return json({ school: data, invitation })
      }
      case 'admin_school_delete': {
        if (!(await isAppAdmin())) return forbidden()
        auditSchool = b.id
        const { error } = await checked(admin.from('schools').delete().eq('id', b.id))
        if (error) throw error
        return json({ ok: true })
      }
      default: return json({ error: "Unknown action" }, 400)
    } })()
    const READS = ['me', 'admin_list', 'student_delete', ...((b.action === 'parent_records' && !b.student_id) ? ['parent_records'] : [])]
    if (res.ok && !READS.includes(b.action)) {
      // deno-lint-ignore no-explicit-any
      const target = (b as any).id ?? (b as any).student_id ?? (b as any).classroom_id ?? null
      const { error: auditError } = await admin.from('school_audit_log').insert({ school_id: auditSchool, actor_id: uid, actor_email: email, action: b.action, target_id: target ? String(target) : null })
      if (auditError) {
        console.error('School audit write failed', { action: b.action, code: auditError.code })
        return json({ error: 'The change was saved, but its audit entry could not be recorded. Reload before retrying.' }, 500)
      }
    }
    return res

  } catch (e) {
    console.error('School request failed', { message: e instanceof Error ? e.name : 'Database error' })
    return json({ error: 'Could not complete this request. Reload and try again.' }, 500)
  }
})

