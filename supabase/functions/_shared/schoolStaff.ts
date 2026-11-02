// School staff (admins, teachers, assistants) at an active school get the full
// app, videos and songs under the school license.
// deno-lint-ignore no-explicit-any
export async function isActiveSchoolStaff(admin: any, userId: string): Promise<boolean> {
  const { data } = await admin
    .from('school_members')
    .select('id, schools!inner(active)')
    .eq('user_id', userId)
    .eq('schools.active', true)
    .limit(1);
  return Array.isArray(data) && data.length > 0;
}
