interface ReportInput {
  student_id: string; school_id: string; period_start: string; period_end: string;
  title: string; body: string; summary: Record<string, unknown>; recipient: string; user_id: string;
}

// Kept independent of the runtime so failure and suppression paths can be tested.
// deno-lint-ignore no-explicit-any
export async function queueParentReport(admin: any, input: ReportInput) {
  const summary = { ...input.summary, title: input.title, body: input.body, email_status: 'pending' };
  const { data: report, error } = await admin.from('student_reports').insert({
    student_id: input.student_id, school_id: input.school_id,
    period_start: input.period_start, period_end: input.period_end, summary,
    sent_to: input.recipient, sent_at: null, created_by: input.user_id,
  }).select().single();
  if (error) throw error;
  if (!report) throw new Error('Could not save the report. No email was requested.');

  const { data: delivery, error: deliveryError } = await admin.functions.invoke('send-transactional-email', {
    body: { templateName: 'school-notice', recipientEmail: input.recipient,
      idempotencyKey: `school-report-${report.id}`, templateData: { title: input.title, body: input.body } },
  });
  if (deliveryError || delivery?.success !== true || delivery?.queued !== true) {
    throw new Error(delivery?.reason === 'email_suppressed'
      ? 'This family email has unsubscribed from emails. The report was not queued. Confirm another contact method with the parent.'
      : 'The report could not be queued for email. Your preview is still available; please try again.');
  }

  // Queue acceptance is not proof of delivery. Never set sent_at here.
  const queuedReport = { ...report, summary: { ...summary, email_status: 'queued' } };
  const { error: updateError } = await admin.from('student_reports').update({ summary: queuedReport.summary }).eq('id', report.id);
  if (updateError) console.error('Could not record report queue acceptance', { reportId: report.id });
  return { report: queuedReport, queued: true };
}