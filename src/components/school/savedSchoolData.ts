import type { SchoolData } from './useSchoolData';

/** Only server-confirmed changes affect displayed records; queued/failed saves do not. */
export function savedSchoolData(data: SchoolData, schoolId: string, body: Record<string, unknown>, reply: Record<string, unknown>): SchoolData {
  const action = body.action;
  const upsert = <T extends { id: string }>(rows: T[], row: T) => rows.some((x) => x.id === row.id) ? rows.map((x) => x.id === row.id ? row : x) : [...rows, row];
  const studentKnown = data.students.some((x) => x.id === body.student_id);
  const roomKnown = data.classrooms.some((x) => x.id === body.classroom_id);
  if (reply.queued) return data;
  if (action === 'progress_set' && studentKnown) {
    const progress = data.progress.filter((x) => x.student_id !== body.student_id || x.skill_id !== body.skill_id);
    return { ...data, progress: reply.progress ? [...progress, reply.progress as SchoolData['progress'][number]] : progress };
  }
  if (action === 'observation_add' && studentKnown && reply.observation) return { ...data, observations: upsert(data.observations, reply.observation as SchoolData['observations'][number]) };
  if (action === 'report_record' && studentKnown && reply.report) return { ...data, reports: upsert(data.reports, reply.report as SchoolData['reports'][number]) };
  if (action === 'plan_save' && roomKnown && reply.item) return { ...data, plans: upsert(data.plans, reply.item as SchoolData['plans'][number]) };
  if (action === 'student_save' && roomKnown && reply.student) return { ...data, students: upsert(data.students, reply.student as SchoolData['students'][number]) };
  if (action === 'classroom_save' && body.school_id === schoolId && reply.classroom) return { ...data, classrooms: upsert(data.classrooms, reply.classroom as SchoolData['classrooms'][number]) };
  if (action === 'observation_delete') return { ...data, observations: data.observations.filter((x) => x.id !== body.id) };
  if (action === 'observation_update') return { ...data, observations: data.observations.map((x) => x.id === body.id ? { ...x, body: String(body.body) } : x) };
  if (action === 'report_update') return { ...data, reports: data.reports.map((x) => x.id === body.id ? { ...x, summary: { ...x.summary, title: String(body.title), body: String(body.body) } } : x) };
  if (action === 'plan_delete') return { ...data, plans: data.plans.filter((x) => x.id !== body.id) };
  if (action === 'plan_done') return { ...data, plans: data.plans.map((x) => x.id === body.id ? { ...x, done: body.done === true } : x) };
  return data;
}