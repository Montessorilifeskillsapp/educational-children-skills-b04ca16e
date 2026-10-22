const ROLE_LABEL: Record<string, string> = { school_admin: 'School Admin', teacher: 'Teacher', assistant: 'Assistant' };

// Saving an invitation and delivering its email are separate outcomes.
// deno-lint-ignore no-explicit-any
export async function queueSchoolInvite(admin: any, to: string, schoolName: string, role: string, key: string) {
  try {
    const { data, error } = await admin.functions.invoke('send-transactional-email', {
      body: { templateName: 'school-notice', recipientEmail: to, idempotencyKey: key, templateData: {
        title: `You're invited to ${schoolName}`,
        body: `Welcome! You've been added to ${schoolName} on Montessori Life Skills as ${ROLE_LABEL[role]}.\nHow to sign in:\n1. Tap "Open School Portal" below (or go to montessorilifeskillsapp.com/school).\n2. Sign in with this email address (${to}). Already have a Montessori Life Skills login? Use it. New here? Choose "Sign up" and create your own password.\n3. Your school access is added automatically once you're signed in.\nNo separate school password is issued. Questions? Reply to this email or write to montessorilifeskills@gmail.com.`,
        cta: 'Open School Portal', url: 'https://montessorilifeskillsapp.com/school',
      } },
    });
    if (!error && data?.success === true && data?.queued === true) return { queued: true, error: null };
  } catch {
    // Preserve the saved invitation when the email service is unavailable.
  }
  return { queued: false, error: 'Invitation saved, but its email could not be queued. Share https://montessorilifeskillsapp.com/school directly. They must sign in or create an account using the invited email address; no separate school password is issued.' };
}

// Never consume an invitation before its membership write succeeds.
// deno-lint-ignore no-explicit-any
export async function acceptSchoolInvite(admin: any, inv: { id: string; school_id: string; role: string; classroom_ids?: string[] | null }, uid: string, email: string) {
  const { data: existing, error: lookupError } = await admin.from('school_members').select('id').eq('school_id', inv.school_id).eq('user_id', uid).maybeSingle();
  if (lookupError) throw lookupError;
  if (!existing) {
    const { data: prof, error: profileError } = await admin.from('user_profiles').select('full_name').eq('user_id', uid).maybeSingle();
    if (profileError) throw profileError;
    const { error } = await admin.from('school_members').insert({ school_id: inv.school_id, user_id: uid, email, role: inv.role, full_name: prof?.full_name ?? null });
    if (error) throw error;
  }
  const rooms = inv.classroom_ids ?? [];
  if (rooms.length && inv.role !== 'school_admin') {
    const { data: member, error: memberError } = await admin.from('school_members').select('id').eq('school_id', inv.school_id).eq('user_id', uid).single();
    if (memberError) throw memberError;
    const { data: valid, error: roomError } = await admin.from('classrooms').select('id').eq('school_id', inv.school_id).in('id', rooms);
    if (roomError) throw roomError;
    const rows = (valid ?? []).map((c: { id: string }) => ({ classroom_id: c.id, member_id: member.id }));
    if (rows.length) { const { error: assignError } = await admin.from('classroom_staff').upsert(rows); if (assignError) throw assignError; }
  }
  const { error } = await admin.from('school_invites').update({ accepted_at: new Date().toISOString() }).eq('id', inv.id);
  if (error) throw error;
}