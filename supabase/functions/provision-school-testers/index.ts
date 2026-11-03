import { createClient } from 'npm:@supabase/supabase-js@2';

const SCHOOL = 'a091e088-b70a-4a83-b006-5ae34de2300c';
const TEACHERS = ['taylor.stephie.1981@gmail.com', 'jill@fiorentino.it', 'pattyjean.kelly@gmail.com', 'luisacaso@virgilio.it'];
const ADMIN = 'ambobrow@gmail.com';
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

// Temporary internal operation; no caller-selected school, account, role or password.
Deno.serve(async (req) => {
  const internalKey = Deno.env.get('LOVABLE_API_KEY');
  if (!internalKey || req.headers.get('Authorization') !== `Bearer ${internalKey}`) return json({ error: 'Unauthorized' }, 401);
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) return json({ error: 'Account management unavailable' }, 503);
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const results: unknown[] = [];
  try {
    const { data: school, error: schoolError } = await db.from('schools').select('name,active').eq('id', SCHOOL).single();
    if (schoolError || !school?.active) throw new Error('School unavailable');
    const { data: rooms, error: roomsError } = await db.from('classrooms').select('id').eq('school_id', SCHOOL);
    if (roomsError || rooms?.length !== 7) throw new Error('Classroom setup changed');
    for (const email of [...TEACHERS, ADMIN]) {
      const role = email === ADMIN ? 'school_admin' : 'teacher';
      const { data: invite, error: inviteError } = await db.from('school_invites').select('id,role').eq('school_id', SCHOOL).eq('email', email).single();
      if (inviteError || invite?.role !== role) throw new Error('Expected invitation missing');
      let account;
      for (let page = 1; ; page++) {
        const { data, error } = await db.auth.admin.listUsers({ page, perPage: 100 });
        if (error) throw new Error('Account lookup failed');
        account = data.users.find(u => u.email?.toLowerCase() === email);
        if (account || data.users.length < 100) break;
      }
      let password: string | undefined;
      if (!account) {
        if (email === ADMIN) throw new Error('Existing administrator account missing');
        password = Array.from(crypto.getRandomValues(new Uint8Array(24)), b => b.toString(16).padStart(2, '0')).join('') + 'aA7!';
        const { data, error } = await db.auth.admin.createUser({ email, password, email_confirm: true });
        if (error || !data.user) throw new Error('Account creation failed');
        account = data.user;
      }
      if (!account.email_confirmed_at) throw new Error('Existing account must be confirmed by its owner');
      const { data: existing, error: lookupError } = await db.from('school_members').select('id,role').eq('school_id', SCHOOL).eq('user_id', account.id).maybeSingle();
      if (lookupError) throw new Error('Membership lookup failed');
      if (existing && existing.role !== role) throw new Error('Existing membership role differs');
      const member = existing ?? (await db.from('school_members').insert({ school_id: SCHOOL, user_id: account.id, email, role }).select('id').single()).data;
      if (!member) throw new Error('Membership creation failed');
      if (role === 'teacher') {
        const { error } = await db.from('classroom_staff').upsert(rooms.map(room => ({ classroom_id: room.id, member_id: member.id })));
        if (error) throw new Error('Classroom assignment failed');
      }
      const { error: acceptError } = await db.from('school_invites').update({ accepted_at: new Date().toISOString() }).eq('id', invite.id);
      if (acceptError) throw new Error('Invitation activation failed');
      let emailAccepted = false;
      if (password) {
        const { data, error } = await db.functions.invoke('send-transactional-email', { body: {
          templateName: 'school-notice', recipientEmail: email,
          templateData: { title: 'Your School Portal account is ready', body: `Your Teacher account at ${school.name} is ready with access to all seven classrooms.\nOpen the shared preview link Kerry sends you, then choose Sign In.\nEmail: ${email}\nYour individual password: ${password}\nNo signup or email confirmation is needed. Keep this password private. You can choose a new password using Forgot password on the sign-in page.`, cta: 'Contact Kerry', url: 'mailto:montessorilifeskills@gmail.com' }
        } });
        emailAccepted = !error && data?.sent === true;
      }
      results.push({ email, role, accountCreated: !!password, accountConfirmed: true, classrooms: role === 'teacher' ? rooms.length : 'all', credentialsEmailAccepted: emailAccepted, existingLoginPreserved: !password });
    }
    return json({ results });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Provisioning failed', results }, 500);
  }
});