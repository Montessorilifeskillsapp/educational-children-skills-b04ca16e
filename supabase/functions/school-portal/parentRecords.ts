export function parentOwnsRecord(user: { email?: string | null; email_confirmed_at?: string | null }, familyEmail: string | null | undefined, approved: boolean): boolean {
  return Boolean(approved && user.email_confirmed_at && user.email && familyEmail && user.email.trim().toLowerCase() === familyEmail.trim().toLowerCase());
}

/** Escape pattern characters so an email is never treated as a wildcard. */
export function exactEmailPattern(email: string): string {
  return email.replace(/[\\%_]/g, '\\$&');
}