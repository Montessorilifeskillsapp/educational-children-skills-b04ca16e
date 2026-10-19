import { describe, it, expect, vi } from 'vitest';
import { queueParentReport } from '../../../supabase/functions/school-portal/reportDelivery';

const input = { student_id: 'student-1', school_id: 'school-1', period_start: '2026-10-01', period_end: '2026-10-19', title: 'Progress report', body: 'Observed careful pouring.', summary: {}, recipient: 'parent@example.com', user_id: 'teacher-1' };
function setup(response: { data: unknown; error: unknown }) {
  const insert = vi.fn().mockReturnValue({ select: () => ({ single: async () => ({ data: { id: 'report-1' }, error: null }) }) });
  const update = vi.fn().mockReturnValue({ eq: async () => ({ error: null }) });
  const invoke = vi.fn().mockResolvedValue(response);
  return { admin: { from: () => ({ insert, update }), functions: { invoke } }, insert, update, invoke };
}
describe('parent report queue confirmation', () => {
  it('rejects an email request failure without marking the report sent or queued', async () => {
    const { admin, insert, update } = setup({ data: null, error: new Error('Email unavailable') });
    await expect(queueParentReport(admin, input)).rejects.toThrow('could not be queued');
    expect(insert.mock.calls[0][0].sent_at).toBeNull();
    expect(update).not.toHaveBeenCalled();
  });
  it('rejects suppression even when the email function returns HTTP success', async () => {
    const { admin, update } = setup({ data: { success: false, reason: 'email_suppressed' }, error: null });
    await expect(queueParentReport(admin, input)).rejects.toThrow('unsubscribed');
    expect(update).not.toHaveBeenCalled();
  });
  it('requires explicit queue acceptance instead of assuming a missing response succeeded', async () => {
    const { admin, update } = setup({ data: { success: true }, error: null });
    await expect(queueParentReport(admin, input)).rejects.toThrow('could not be queued');
    expect(update).not.toHaveBeenCalled();
  });
  it('confirms accepted reports as queued, never as sent or delivered', async () => {
    const { admin, insert, update, invoke } = setup({ data: { success: true, queued: true }, error: null });
    const result = await queueParentReport(admin, input);
    expect(result.queued).toBe(true);
    expect(result.report.summary.email_status).toBe('queued');
    expect(insert.mock.calls[0][0].sent_at).toBeNull();
    expect(update.mock.calls[0][0]).not.toHaveProperty('sent_at');
    expect(invoke.mock.calls[0][1].body.recipientEmail).toBe('parent@example.com');
  });
});