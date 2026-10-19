import { useCallback, useEffect, useState } from 'react';
import { db, Classroom, Invite, Member, Observation, PlanItem, Progress, Report, Student } from './api';

export interface SchoolData {
  classrooms: Classroom[]; staff: { classroom_id: string; member_id: string }[];
  members: Member[]; invites: Invite[]; students: Student[]; progress: Progress[];
  observations: Observation[]; plans: PlanItem[]; reports: Report[];
}

const EMPTY: SchoolData = { classrooms: [], staff: [], members: [], invites: [], students: [], progress: [], observations: [], plans: [], reports: [] };

export function useSchoolData(schoolId: string | null) {
  const [data, setData] = useState<SchoolData>(EMPTY);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!schoolId) return;
    const q = (t: string, order?: string) => {
      let r = db.from(t).select('*').eq('school_id', schoolId);
      if (order) r = r.order(order, { ascending: true });
      return r.limit(5000);
    };
    const [c, m, i, s, p, o, pl, r] = await Promise.all([
      q('classrooms', 'created_at'), q('school_members', 'created_at'), q('school_invites', 'created_at'),
      q('school_students', 'name'), q('student_progress'), q('student_observations', 'observed_at'),
      q('lesson_plan_items', 'plan_date'), q('student_reports', 'created_at'),
    ]);
    const classrooms = (c.data ?? []) as Classroom[];
    const staffRes = classrooms.length
      ? await db.from('classroom_staff').select('*').in('classroom_id', classrooms.map((x) => x.id))
      : { data: [] };
    setData({
      classrooms, staff: staffRes.data ?? [], members: m.data ?? [], invites: (i.data ?? []).filter((x: Invite) => !x.accepted_at),
      students: s.data ?? [], progress: p.data ?? [], observations: o.data ?? [], plans: pl.data ?? [], reports: r.data ?? [],
    });
    setLoading(false);
  }, [schoolId]);

  useEffect(() => { setLoading(true); reload(); }, [reload]);
  return { data, loading, reload };
}
