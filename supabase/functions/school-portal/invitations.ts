const ROLE_LABEL: Record<string, string> = { school_admin: 'School Admin', teacher: 'Teacher', assistant: 'Assistant' };

// Saving an invitation and delivering its email are separate outcomes.
// deno-lint-ignore no-explicit-any
export async function queueSchoolInvite(admin: any, to: string, schoolName: string, role: string, key: string) {
  try {
    const { data, error } = await admin.functions.invoke('send-transactional-email', {
      body: { templateName: 'school-notice', recipientEmail: to, idempotencyKey: key, templateData: {
        title: `You're invited to ${schoolName}`,
        body: `You've been added to ${schoolName} on Montessori Life Skills as ${ROLE_LABEL[role]}.\nUse your existing Montessori Life Skills login with this email address. If you don't have an account, create one and choose your own password. Then open the School Portal. No separate school password is issued.`,
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
export async function acceptSchoolInvite(admin: any, inv: { id: string; school_id: string; role: string }, uid: string, email: string) {
  const { data: existing, error: lookupError } = await admin.from('school_members').select('id').eq('school_id', inv.school_id).eq('user_id', uid).maybeSingle();
  if (lookupError) throw lookupError;
  if (!existing) {
    const { data: prof, error: profileError } = await admin.from('user_profiles').select('full_name').eq('user_id', uid).maybeSingle();
    if (profileError) throw profileError;
    const { error } = await admin.from('school_members').insert({ school_id: inv.school_id, user_id: uid, email, role: inv.role, full_name: prof?.full_name ?? null });
    if (error) throw error;
  }
  const { error } = await admin.from('school_invites').update({ accepted_at: new Date().toISOString() }).eq('id', inv.id);
  if (error) throw error;
}