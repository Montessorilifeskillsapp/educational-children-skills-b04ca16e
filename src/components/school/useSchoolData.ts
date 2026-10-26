import { useCallback, useEffect, useRef, useState } from 'react';
import { db, Classroom, Invite, Member, Observation, PlanItem, Progress, Report, Student } from './api';
import { startQueue, SYNCED_EVENT } from './offlineQueue';
import { cachedSchoolData, cacheSchoolData } from './portalCache';

export interface SchoolData {
  classrooms: Classroom[]; staff: { classroom_id: string; member_id: string }[];
  members: Member[]; invites: Invite[]; students: Student[]; progress: Progress[];
  observations: Observation[]; plans: PlanItem[]; reports: Report[];
}

const EMPTY: SchoolData = { classrooms: [], staff: [], members: [], invites: [], students: [], progress: [], observations: [], plans: [], reports: [] };

/** Loads every record the signed-in member may read for one school. */
export async function fetchSchoolData(schoolId: string): Promise<SchoolData> {
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
  const data: SchoolData = {
    classrooms, staff: staffRes.data ?? [], members: m as Member[], invites: (i as Invite[]).filter((x) => !x.accepted_at),
    students: s as Student[], progress: p as Progress[], observations: o as Observation[], plans: pl as PlanItem[], reports: r as Report[],
  };
  cacheSchoolData(schoolId, data);
  return data;
}

export function useSchoolData(schoolId: string | null) {
  const cached = schoolId ? cachedSchoolData<SchoolData>(schoolId) : undefined;
  const [data, setData] = useState<SchoolData>(cached ?? EMPTY);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);
  const generation = useRef(0);
  const loadedSchool = useRef<string | null>(cached ? schoolId : null);

  const reload = useCallback(async () => {
    const request = ++generation.current;
    setLoading(loadedSchool.current !== schoolId); setError(null);
    if (!schoolId) { setData(EMPTY); setLoading(false); return; }
    try {
      const next = await fetchSchoolData(schoolId);
      if (request !== generation.current) return;
      loadedSchool.current = schoolId;
      setData(next);
    } catch {
      if (request !== generation.current) return;
      // A background refresh that fails (e.g. lost Wi-Fi) keeps what is already on screen.
      if (loadedSchool.current === schoolId) return;
      setData(EMPTY); setError('School records could not be loaded. Please retry.');
    } finally { if (request === generation.current) setLoading(false); }
  }, [schoolId]);

  // Records already fetched for this school show at once; a fresh copy loads behind them.
  useEffect(() => {
    const hit = schoolId ? cachedSchoolData<SchoolData>(schoolId) : undefined;
    loadedSchool.current = hit ? schoolId : null; setData(hit ?? EMPTY); void reload();
    return () => { generation.current++; };
  }, [reload]);

  // Keep linked accounts current: refresh after queued records sync, on return to the app, and every minute while visible.
  useEffect(() => {
    startQueue();
    const refresh = () => { if (document.visibilityState === 'visible' && navigator.onLine) void reload(); };
    window.addEventListener(SYNCED_EVENT, refresh);
    window.addEventListener('online', refresh);
    document.addEventListener('visibilitychange', refresh);
    const t = window.setInterval(refresh, 60_000);
    return () => {
      window.removeEventListener(SYNCED_EVENT, refresh);
      window.removeEventListener('online', refresh);
      document.removeEventListener('visibilitychange', refresh);
      window.clearInterval(t);
    };
  }, [reload]);
  return { data, loading, error, reload };
}
