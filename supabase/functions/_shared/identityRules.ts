/** Email identity checks must treat SQL pattern characters literally. */
export function exactEmailPattern(email: string): string {
  return email.replace(/[\\%_]/g, '\\$&');
}

export function canAcceptInvite(user: { email?: string | null; email_confirmed_at?: string | null }, invitationEmail: string): boolean {
  return Boolean(user.email_confirmed_at && user.email && user.email.trim().toLowerCase() === invitationEmail.trim().toLowerCase());
}

export function signupAccountAction(exists: boolean, confirmed: boolean): 'create' | 'resend' | 'none' {
  return exists ? (confirmed ? 'none' : 'resend') : 'create';
}
