import { describe, it, expect, vi } from 'vitest';
import { acceptSchoolInvite, queueSchoolInvite } from '../../../supabase/functions/school-portal/invitations';

describe('school invitation delivery', () => {
  it.each([
    { data: null, error: new Error('Unavailable') },
    { data: { success: false, reason: 'email_suppressed' }, error: null },
    { data: { success: true }, error: null },
  ])('does not confirm an unaccepted email request', async (response) => {
    const admin = { functions: { invoke: vi.fn().mockResolvedValue(response) } };
    expect((await queueSchoolInvite(admin, 'staff@example.com', 'School', 'teacher', 'key')).queued).toBe(false);
  });
  it('confirms only explicit email queue acceptance', async () => {
    const admin = { functions: { invoke: vi.fn().mockResolvedValue({ data: { success: true, queued: true }, error: null }) } };
    expect(await queueSchoolInvite(admin, 'staff@example.com', 'School', 'teacher', 'key')).toEqual({ queued: true, error: null });
  });
});

describe('school invitation acceptance', () => {
  function setup(existing: boolean, insertError: Error | null = null) {
    const insert = vi.fn().mockResolvedValue({ error: insertError });
    const update = vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) });
    const query = { eq: () => query, maybeSingle: async () => ({ data: existing ? { id: 'member' } : null, error: null }) };
    const admin = { from: (table: string) => table === 'school_members' ? { select: () => query, insert } : table === 'user_profiles' ? { select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { full_name: 'Staff' }, error: null }) }) }) } : { update } };
    return { admin, insert, update };
  }
  const inv = { id: 'invite', school_id: 'school', role: 'teacher' };
  it('leaves the invitation pending when membership creation fails', async () => {
    const { admin, update } = setup(false, new Error('Write failed'));
    await expect(acceptSchoolInvite(admin, inv, 'user', 'staff@example.com')).rejects.toThrow('Write failed');
    expect(update).not.toHaveBeenCalled();
  });
  it('preserves the role of an existing school member', async () => {
    const { admin, insert, update } = setup(true);
    await acceptSchoolInvite(admin, inv, 'user', 'staff@example.com');
    expect(insert).not.toHaveBeenCalled();
    expect(update).toHaveBeenCalledTimes(1);
  });
  it('accepts only after writing the invited membership', async () => {
    const { admin, insert, update } = setup(false);
    await acceptSchoolInvite(admin, inv, 'user', 'staff@example.com');
    expect(insert).toHaveBeenCalledWith({ school_id: 'school', user_id: 'user', email: 'staff@example.com', role: 'teacher', full_name: 'Staff' });
    expect(insert.mock.invocationCallOrder[0]).toBeLessThan(update.mock.invocationCallOrder[0]);
  });
});