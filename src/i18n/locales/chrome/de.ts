// "chrome" namespace, de: must match the English shape in ./en.ts.
import type { en } from './en';

export const de: typeof en = {
  back: 'Zurück', home: 'Start', goHome: 'Zum Startbildschirm', curriculumSections: 'Lehrplanbereiche', sequence: 'Abfolge: {{sequence}}',
  continueLearning: 'Weiter lernen',
  titles: {
    practicalLife: 'Übungen des täglichen Lebens', sensorial: 'Sinnesentwicklung', mathematics: 'Mathematik', language: 'Sprache', geography: 'Geographie',
    botany: 'Botanik', art: 'Kunst', cultural: 'Kosmische Erziehung', graceCourtesy: 'Anmut und Höflichkeit', allPracticalLife: 'Alle Übungen des täglichen Lebens',
  },
  menu: {
    menu: 'Menü', login: 'Anmelden', dashboard: 'Dashboard', cultural: 'Kosmische Erziehung', plans: 'Pläne', familyDashboard: 'Familien-Dashboard', profiles: 'Profile',
    schoolAdmin: 'Schulverwaltung', appAdmin: 'App-Verwaltung', accessCodes: 'Zugangscodes', terms: 'Nutzungsbedingungen', privacy: 'Datenschutzerklärung',
  },
  shop: {
    region: 'Montessori-Life-Skills-Bilderbücher kaufen', title: 'Montessori-Life-Skills-Bilderbücher entdecken', graceTitle: 'Materialien für Anmut und Höflichkeit',
    body: 'Liebevoll illustrierte Bilderbücher, die Montessori-Alltagsfertigkeiten lebendig werden lassen.', browse: 'Bücher ansehen',
  },
  card: {
    premium: 'Premium-Aktivität', completed: '✓ Abgeschlossen', materialAlt: 'Montessori-Material: {{title}}', iconAlt: 'Symbol der Aktivität {{title}}',
    aria: '{{title}} – Aktivität im Bereich {{category}}, Stufe {{difficulty}}. {{status}}. {{action}}',
    done: 'Abgeschlossen', notDone: 'Nicht abgeschlossen', lockedAction: 'Premium-Aktivität – öffnen, um zu sehen, wie sie freigeschaltet wird', start: 'Zum Starten klicken',
    difficulty: { Beginner: 'Einstieg', Intermediate: 'Mittelstufe', Advanced: 'Fortgeschritten', Easy: 'Leicht', Medium: 'Mittel' },
  },
  notFound: {
    title: 'Hoppla! Seite nicht gefunden', body: 'Die gesuchte Seite ist wohl zu ihrem eigenen Lernabenteuer aufgebrochen. Lassen Sie uns weiter entdecken!',
    goHome: 'Zur Startseite', goBack: 'Zurück', looking: 'Vielleicht suchen Sie:',
    s1: '• Übungen des täglichen Lebens', s2: '• Lernaktivitäten', s3: '• Fortschritts-Dashboard', s4: '• Premium-Pläne',
  },
};
