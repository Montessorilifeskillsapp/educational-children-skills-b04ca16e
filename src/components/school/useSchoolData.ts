import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const generation = useRef(0);

  const reload = useCallback(async () => {
    const request = ++generation.current;
    setLoading(true); setError(null);
    if (!schoolId) { setData(EMPTY); setLoading(false); return; }
    // Fetch every page: the hosted API may cap each response at 1,000 rows.
    const q = async (table: string, order = 'id') => {
      const rows: unknown[] = [];
      for (let offset = 0; ; offset += 500) {
        let query = db.from(table).select('*').eq('school_id', schoolId).order(order, { ascending: true });
        if (order !== 'id') query = query.order('id', { ascending: true });
        const result = await query.range(offset, offset + 499);
        if (result.error) throw result.error;
        rows.push(...(result.data ?? []));
        if ((result.data?.length ?? 0) < 500) return rows;
      }
    };
    try {
      const [c, m, i, s, p, o, pl, r] = await Promise.all([
        q('classrooms', 'created_at'), q('school_members', 'created_at'), q('school_invites', 'created_at'),
        q('school_students', 'name'), q('student_progress'), q('student_observations', 'observed_at'),
        q('lesson_plan_items', 'plan_date'), q('student_reports', 'created_at'),
      ]);
      const classrooms = c as Classroom[];
      const staffRes = classrooms.length
        ? await db.from('classroom_staff').select('*').in('classroom_id', classrooms.map((x) => x.id))
        : { data: [], error: null };
      if (staffRes.error) throw staffRes.error;
      if (request !== generation.current) return;
      setData({
        classrooms, staff: staffRes.data ?? [], members: m as Member[], invites: (i as Invite[]).filter((x) => !x.accepted_at),
        students: s as Student[], progress: p as Progress[], observations: o as Observation[], plans: pl as PlanItem[], reports: r as Report[],
      });
    } catch {
      if (request !== generation.current) return;
      setData(EMPTY); setError('School records could not be loaded. Please retry.');
    } finally { if (request === generation.current) setLoading(false); }
  }, [schoolId]);

  useEffect(() => { setData(EMPTY); void reload(); return () => { generation.current++; }; }, [reload]);
  return { data, loading, error, reload };
}
