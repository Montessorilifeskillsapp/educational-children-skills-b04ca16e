/** User-entered school records are plain text, never executable markup. */
export function cleanText(value: string): string {
  return value.replace(/<[^>]*>/g, '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
}

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function sameClassroom(source: { school_id: string; classroom_id: string }, destination: { school_id: string; classroom_id: string }): boolean {
  return source.school_id === destination.school_id && source.classroom_id === destination.classroom_id
}

export function containsOnlyClassroomStudents(requested: string[], allowed: string[]): boolean {
  const valid = new Set(allowed)
  return new Set(requested).size === requested.length && requested.every((id) => valid.has(id))
}