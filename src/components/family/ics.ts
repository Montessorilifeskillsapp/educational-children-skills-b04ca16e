import { CalEvent } from './api';

const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (s: string) => s.replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');

export function downloadIcs(e: CalEvent, childName: string) {
  const start = new Date(e.starts_at);
  const end = new Date(start.getTime() + e.duration_minutes * 60_000);
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Montessori Life Skills//Family Dashboard//EN',
    'BEGIN:VEVENT', `UID:${e.id}@montessorilifeskillsapp.com`, `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`, `SUMMARY:${esc(`${e.title} with ${childName}`)}`,
    `DESCRIPTION:${esc(e.notes ?? 'Montessori activity')}`, 'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY',
    `DESCRIPTION:${esc(e.title)}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${e.title.replace(/[^\w]+/g, '-')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
