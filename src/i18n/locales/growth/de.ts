// "growth" namespace, de: must match the English shape in ./en.ts.
import type { en } from './en';

export const de: typeof en = {
  shared: { invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', genericError: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', close: 'Schließen', email: 'E-Mail' },
  readiness: {
    readyTitle: 'Ihr Leitfaden ist fertig', readyBody: 'Er wurde in einem neuen Tab geöffnet. Mit „Als PDF speichern“ behalten Sie eine Kopie.',
    openAgain: 'Leitfaden erneut öffnen', seePremium: 'Die vollständige Abfolge mit Premium ansehen',
    eyebrow: 'Kostenloser Leitfaden', titleHome: 'Ihr kostenloser Montessori-Leitfaden zur Schulreife', titleActivity: 'Sehen Sie, wo diese Lektion in der Abfolge Ihres Kindes steht',
    body: 'Eine altersgerechte Checkliste zur Schulreife und eine AMI-Beispielwoche mit den US-Bildungsstandards, die jede Lektion unterstützt.',
    ageGroup: 'Alter des Kindes', years: '{{age}} Jahre', preparing: 'Wird vorbereitet…', submit: 'Kostenlosen Leitfaden erhalten',
    footnote: 'Gelegentliche Montessori-Tipps. Jederzeit abbestellbar.', privacy: 'Datenschutz',
  },
  cookies: {
    region: 'Cookie-Auswahl', title: 'Ihre Datenschutzeinstellungen',
    body: 'Wir zählen Besuche ohne Cookies. Wenn Sie zustimmen, verwenden wir außerdem Analyse-Cookies und erfassen, welche Seiten und Aktivitäten genutzt werden, um die App zu verbessern. Siehe unsere <1>Datenschutzerklärung</1>.',
    acceptAll: 'Alle akzeptieren', rejectAll: 'Alle ablehnen', settings: 'Cookie-Einstellungen',
    dialogBody: 'Legen Sie fest, was diese App auf Ihrem Gerät verwenden darf. Sie können dies jederzeit über den Link „Cookie-Einstellungen“ ändern.',
    gpc: 'Ihr Browser sendet ein Datenschutzsignal (Global Privacy Control), daher bleibt die Analyse ausgeschaltet.',
    necessary: 'Notwendig', necessaryBody: 'Hält Sie angemeldet und speichert Ihre Einstellungen und Lektionen für die Offline-Nutzung. Immer aktiv.', alwaysOn: 'Immer aktiv',
    analytics: 'Analyse',
    analyticsBody: 'Bereitgestellt von Google und Montessori Life Skills. Analyse-Cookies und eine Aufzeichnung, welche Seiten und Aktivitäten genutzt werden. Die cookiefreie Besuchszählung durch Lovable läuft in jedem Fall weiter.',
    save: 'Auswahl speichern',
  },
  consult: {
    errName: 'Bitte geben Sie Ihren Namen ein', errNameLong: 'Der Name muss kürzer als 100 Zeichen sein', errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    errAge: 'Die Altersangabe muss kürzer als 60 Zeichen sein', errTopics: 'Bitte teilen Sie uns mit, worüber Sie sprechen möchten', errTopicsLong: 'Die Themen müssen kürzer als 2000 Zeichen sein',
    errTimes: 'Die Wunschzeiten müssen kürzer als 500 Zeichen sein', sendFailed: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    sentTitle: 'Anfrage gesendet', sentBody: 'Vielen Dank. Ihre Anfrage ist bei Kerry eingegangen. Sie antwortet an <1>{{email}}</1>, um einen Termin zu vereinbaren.',
    title: 'Private Beratung buchen', body: 'Erzählen Sie uns ein wenig über Ihr Kind und wobei Sie Unterstützung wünschen. Kerry antwortet per E-Mail, um einen Termin zu vereinbaren.',
    name: 'Ihr Name', childAge: 'Alter des Kindes', optional: '(optional)', agePlaceholder: 'z. B. 4 Jahre', package: 'Paket',
    single: 'Einzelsitzung', bundle: 'Drei Sitzungen', topics: 'Worüber möchten Sie sprechen?',
    topicsPlaceholder: 'Ziele, Tagesabläufe, Gestaltung Ihrer Umgebung, Fragen zum Lehrplan…',
    times: 'Bevorzugte Tage und Uhrzeiten', timesPlaceholder: 'z. B. werktags vormittags, US-Central-Zeit',
    cancel: 'Abbrechen', sending: 'Wird gesendet…', send: 'Anfrage senden',
  },
  exit: {
    doneTitle: 'Sie stehen auf der Liste', doneBody: 'Vielen Dank – wir melden uns mit Neuigkeiten und frühem Zugang.', back: 'Zurück zur Seite',
    title: 'Bevor Sie gehen', body: 'Tragen Sie sich ein und erhalten Sie frühen Zugang zu neuen Aktivitäten und Neuigkeiten von Montessori Life Skills. Kein Spam – jederzeit abbestellbar.',
    placeholder: 'Ihre E-Mail-Adresse', emailLabel: 'E-Mail-Adresse', submitting: 'Wird eingetragen…', submit: 'Auf dem Laufenden bleiben',
    footnote: 'Früher Zugang und gelegentliche Neuigkeiten. Jederzeit abbestellbar.',
  },
  guidePage: {
  "title": "Montessori-Leitfaden zur Schulreife",
  "body": "Eine Checkliste zur Schulreife und eine AMI-Kinderhaus-Beispielwoche für das Alter Ihres Kindes, mit den US-Bildungsstandards, die jede Lektion unterstützt.",
  "b1": "Altersgerechte Checkliste zur Schulreife",
  "b2": "Fünf Beispiellektionen aus der AMI-Abfolge",
  "b3": "Zuordnung zu Common Core und NGSS für jede Lektion",
  "b4": "Druckbar – als PDF speichern",
  "childAge": "Alter Ihres Kindes",
  "included": "Enthalten für {{age}} Jahre:",
  "points": "+ Checkliste zur Schulreife mit {{count}} Punkten",
  "footnote": "Wir senden Ihnen gelegentlich Montessori-Tipps. Jederzeit abbestellbar.",
  "privacy": "Datenschutzerklärung"
},
  guide: {
  "docTitle": "Montessori-Leitfaden zur Schulreife – {{age}} Jahre",
  "save": "Als PDF speichern",
  "sub": "Eine AMI-Kinderhaus-Beispielwoche mit Zuordnung zu US-Bildungsstandards · Montessori Life Skills",
  "intro": "Wie Dr. Maria Montessori beobachtete, ist die Hand das Werkzeug des Geistes. Dieser Leitfaden zeigt eine Beispielwoche aus der AMI-Kinderhaus-Abfolge für ein {{age}}-jähriges Kind, mit den US-Bildungsstandards, die jede Lektion unterstützt.",
  "checklist": "Checkliste zur Schulreife",
  "observe": "Beobachten, nicht testen. Jedes Kind folgt seinem eigenen Tempo.",
  "week": "Beispielwoche",
  "day": "Tag",
  "lesson": "Lektion",
  "gains": "Was das Kind gewinnt",
  "standards": "Standards",
  "days": [
    "Mo",
    "Di",
    "Mi",
    "Do",
    "Fr"
  ],
  "indirect": "Indirekte Vorbereitung",
  "ctaTitle": "Die vollständige Abfolge.",
  "cta": "Premium enthält jede AMI-Kinderhaus-Darbietung in der richtigen Reihenfolge, Anleitungen Schritt für Schritt, Lektionsvideos und druckbare Portfolios für den Heimunterricht. Premium Jährlich kostet $199/Jahr oder $29.99/Monat, mit 30 Tagen Garantie.",
  "footer": "Standardcodes: Common Core (CCSS), NGSS, NCSS und National Core Arts Standards. Dies ist eine Zuordnungsübersicht, keine Zertifizierung. © {{year}} Montessori Life Skills.",
  "titles": {
    "Dry Pouring": "Trockenes Schütten",
    "Greeting Others": "Andere begrüßen",
    "Knobbed Cylinders": "Einsatzzylinder",
    "Pink Tower": "Rosa Turm",
    "Sandpaper Letters": "Sandpapierbuchstaben",
    "Red Rods": "Rote Stangen",
    "Number Rods": "Numerische Stangen",
    "Spindle Box": "Spindelkasten",
    "Land and Water Forms": "Land- und Wasserformen",
    "Golden Beads": "Goldenes Perlenmaterial",
    "Moveable Alphabet": "Bewegliches Alphabet",
    "Parts of a Plant": "Teile der Pflanze"
  },
  "areas": {
    "Practical Life": "Übungen des täglichen Lebens",
    "Grace and Courtesy": "Anmut und Höflichkeit",
    "Sensorial": "Sinnesmaterial",
    "Language": "Sprache",
    "Math": "Mathematik",
    "Geography": "Geographie",
    "Botany": "Botanik"
  },
  "purposes": {
    "3": [
      "Bewegungskoordination, Konzentration und Selbstständigkeit.",
      "Selbstvertrauen und respektvolle soziale Sprache.",
      "Visuelle Unterscheidung von Größen; der Pinzettengriff als Vorbereitung der Hand auf das Schreiben.",
      "Visuelle Unterscheidung abgestufter Größen in drei Dimensionen.",
      "Jeden Laut über den Tastsinn mit seinem Schriftzeichen verbinden."
    ],
    "4": [
      "Abgestufte Länge; direkte Vorbereitung auf die Numerischen Stangen.",
      "Menge und Ziffer 1–10 als einzelne, zählbare Längen.",
      "Lose Mengen zählen und der Begriff der Null.",
      "Laut-Zeichen-Zuordnung für erstes Lesen und Schreiben.",
      "Konkretes Verständnis von Land und Wasser auf der Erde."
    ],
    "5": [
      "Das Dezimalsystem: Einer, Zehner, Hunderter und Tausender.",
      "Wörter lautgetreu legen, bevor die Hand sie schreiben kann.",
      "Menge, Ziffer und Null festigen.",
      "Die Teile lebender Pflanzen benennen und beobachten.",
      "Paarige Land- und Wasserformen durch Tasten und Benennen."
    ]
  },
  "checks": {
    "3": [
      "Trägt ein Tablett oder einen Stuhl sorgfältig",
      "Schüttet trockene Materialien mit etwas Verschütten",
      "Folgt einer Bitte mit zwei Schritten",
      "Begrüßt vertraute Erwachsene",
      "Sortiert Gegenstände nach Größe oder Farbe",
      "Zeigt Interesse an Buchstabenlauten"
    ],
    "4": [
      "Gießt Wasser mit wenig Verschütten",
      "Arbeitet 10 Minuten und länger an einer Aktivität",
      "Ordnet Gegenstände nach Größe",
      "Erkennt mehrere Buchstabenlaute",
      "Zählt Gegenstände bis 10 mit Eins-zu-eins-Zuordnung",
      "Sagt bitte, danke und Entschuldigung"
    ],
    "5": [
      "Schließt eine Aktivität mit mehreren Schritten ab und räumt sie weg",
      "Benennt die meisten Buchstabenlaute",
      "Legt einfache Wörter nach Lauten",
      "Zählt Mengen über 10 und ordnet sie Ziffern zu",
      "Hält den Stift im Dreipunktgriff",
      "Wartet in der Gruppe, bis es an der Reihe ist zu sprechen"
    ]
  }
},
};
