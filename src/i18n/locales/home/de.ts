// "home" namespace, de: must match the English shape in ./en.ts.
import type { en } from './en';

export const de: typeof en = {
  header: { curriculumSections: 'Lehrplanbereiche', openSectionMenu: 'Bereichsmenü öffnen', openMenu: 'Menü öffnen' },
  hero: {
    badge: 'Authentische AMI/AMS-Darbietungen',
    title: 'Wissen Sie genau, was Sie vermitteln – und wie Sie es darbieten.',
    subtitle: 'Montessori-Aktivitäten Schritt für Schritt für Kinder von 2 bis 6 Jahren – für Eltern, Pädagogen und Assistenzkräfte.',
    body: 'Sehen Sie, was vorzubereiten ist, wie jede Aktivität dargeboten wird, worauf Sie achten sollten und was als Nächstes kommt.',
    seeHow: 'So funktioniert es',
    statActivities: '100+ Aktivitäten', statAges: '2–6 Jahre', statAreas: '9 Lehrplanbereiche', statGuidance: 'Anleitung Schritt für Schritt',
  },
  problem: {
    eyebrow: 'Ein klarerer Anfang',
    title: 'Montessori sollte keine stundenlange Suche erfordern.',
    body: 'Sie möchten einem Kind sinnvolle Arbeit anbieten, doch verstreute Informationen machen es schwer zu wissen, was wann vorzubereiten ist.',
    q1: 'Welche Aktivität kommt als Nächstes?', q2: 'Ist das Kind bereit?', q3: 'Welche Materialien werden benötigt?', q4: 'Wie wird sie richtig dargeboten?',
    q5: 'Was sollten Sie sagen – und was nicht?', q6: 'Worauf achten Sie beim Beobachten?', q7: 'Wann ist es Zeit für den nächsten Schritt?',
    closing: 'Montessori Life Skills gibt Ihnen diese Antworten an die Hand.',
    steps: [
      {
        "title": "Die Abfolge",
        "body": "Montessori-Arbeit geht vom Einfachen zum Komplexen, vom Trockenen zum Nassen und vom Konkreten zum Abstrakten. Jede Aktivität bereitet Hand und Geist auf die nächste vor.",
        "points": [
          "Das Umschütten von Körnern kommt vor dem Umgießen von Wasser.",
          "Das Umgießen zwischen zwei Kännchen kommt vor dem Gießen in mehrere Gläser oder durch einen Trichter.",
          "Der Lehrplan führt die Aktivitäten jedes Bereichs in der Reihenfolge ihrer Darbietung auf."
        ],
        "link": "Die Abfolge ansehen"
      },
      {
        "title": "Bereitschaft",
        "body": "Bereitschaft wird beobachtet, nicht vom Alter bestimmt. Beobachten Sie das Kind bei der Arbeit, bevor Sie etwas Neues anbieten.",
        "points": [
          "Trägt ein Tablett mit beiden Händen, gerade und ruhig.",
          "Beherrscht die vorherige Arbeit der Abfolge, etwa das Umschütten von Körnern.",
          "Kann ruhig bei einer Aktivität bleiben, bis sie abgeschlossen ist.",
          "Zeigt Interesse, indem es anderen zuschaut oder nach dem Material greift."
        ],
        "link": "Den Bereitschaftsleitfaden öffnen"
      },
      {
        "title": "Die Umgebung vorbereiten",
        "body": "Bereiten Sie die vollständige Aktivität vor, bevor Sie das Kind einladen, damit alles Nötige auf dem Tablett bereitsteht.",
        "points": [
          "Echte Materialien in Kindergröße: zwei gleiche kleine Kännchen, eines mit Wasser.",
          "Ein Tablett, das alles aufnimmt, mit einem Schwamm für Tropfen und einem Tuch zum Trocknen.",
          "Ein niedriges, offenes Regal, aus dem das Kind das Tablett selbstständig nehmen und zurückstellen kann.",
          "Alles sauber, vollständig und in gutem Zustand."
        ],
        "link": "Die Beispielaktivität ansehen"
      },
      {
        "title": "Die Darbietung",
        "body": "Bieten Sie langsam und mit präzisen Bewegungen dar, damit das Kind jeden Schritt deutlich sieht.",
        "points": [
          "Setzen Sie sich neben das Kind, damit es Ihre Hände gut sieht.",
          "Trennen Sie Worte und Bewegung: erst sprechen, dann schweigend handeln.",
          "Werden Sie im entscheidenden Moment langsamer, wenn das Wasser die Tülle erreicht.",
          "Schließen Sie den ganzen Zyklus ab, einschließlich Tropfen aufwischen und Tablett zurückstellen."
        ],
        "link": "Die vollständige Darbietung ansehen"
      },
      {
        "title": "Die Einladung und Ihre Worte",
        "body": "Beginnen Sie mit einer einfachen Einladung und lassen Sie dann das Material sprechen. Weniger Worte halten die Aufmerksamkeit des Kindes bei Ihren Händen.",
        "points": [
          "Gehen Sie auf Augenhöhe und laden Sie ein: „Möchtest du lernen, Wasser umzugießen?“",
          "Sagt das Kind nein, nehmen Sie das ruhig an und bieten Sie es ein andermal an.",
          "Nennen Sie die Aktivität und bleiben Sie dann still, während Sie zeigen.",
          "Vermeiden Sie Lob oder Korrektur während der Arbeit; Verschüttetes gehört zum Lernen."
        ],
        "link": "Die vollständige Darbietung ansehen"
      },
      {
        "title": "Beobachtung",
        "body": "Wenn das Kind beginnt, treten Sie zurück. Beobachten Sie, ohne zu unterbrechen; das Material selbst zeigt dem Kind, wenn etwas zu korrigieren ist.",
        "points": [
          "Griff und Kontrolle: wie das Kind das Kännchen hält und neigt.",
          "Konzentration: wie lange das Kind bei der Arbeit bleibt.",
          "Wiederholung: ob das Kind erneut umgießen möchte.",
          "Fehlerkontrolle: was das Kind mit Verschüttetem macht, mit dem Schwamm auf dem Tablett."
        ],
        "link": "Sehen, wo die Beobachtung ihren Platz hat"
      },
      {
        "title": "Der nächste Schritt",
        "body": "Gehen Sie weiter, wenn das Kind selbstständig arbeitet und den ganzen Zyklus abschließt, vom Regal und zurück ins Regal.",
        "points": [
          "Nimmt das Tablett aus dem Regal und stellt es bereit für die nächste Person zurück.",
          "Gießt kontrolliert und wischt Verschüttetes auf, ohne dazu aufgefordert zu werden.",
          "Die Wiederholung lässt nach und das Interesse wendet sich anderem zu: Bieten Sie die nächste Aktivität an.",
          "Wird die Arbeit nachlässig, bieten Sie sie an einem anderen Tag erneut dar, statt weiterzugehen."
        ],
        "link": "Sehen, was als Nächstes kommt"
      }
    ],
  },
  sample: {
    eyebrow: 'Eine echte Aktivität', title: 'Damit arbeiten Sie.',
    subtitle: 'Wasser umgießen · Ziel: Koordination, Konzentration und Selbstständigkeit.',
    imageAlt: 'Ein Kind gießt auf einem Holztablett Wasser aus einem kleinen Glaskännchen in ein anderes, eine Hand am Griff, die andere stützt das Kännchen',
    materialsTitle: 'Materialien', materialsText: 'Zwei gleiche kindgerechte Kännchen, Wasser, ein Tablett, ein Schwamm und ein Trockentuch.',
    preparationTitle: 'Vorbereitung', preparationText: 'Richten Sie die vollständige Aktivität her, bevor Sie das Kind einladen.',
    presentationTitle: 'Darbietung', presentationText: 'Zeigen Sie langsam das Greifen, Anheben, kontrollierte Gießen, Zurückstellen und Aufräumen.',
    observationTitle: 'Beobachtung', observationText: 'Achten Sie auf Bewegungskontrolle, Konzentration, Wiederholung und selbstständiges Aufräumen.',
    nextLabel: 'Nächste Aktivität', nextText: 'Die weiterführende Abfolge steht mit vollem Zugang offen.',
    cta: 'Mit einer kostenlosen Aktivität beginnen',
  },
  how: {
    eyebrow: 'Ihr erster Arbeitszyklus', title: 'Vorbereiten. Darbieten. Beobachten.',
    body: 'Erleben Sie mit einer kostenlosen Einstiegsaktivität den gesamten Ablauf, bevor Sie sich für Premium entscheiden.',
    prepareTitle: 'Vorbereiten', prepareText: 'Öffnen Sie die Aktivität, legen Sie die aufgeführten Materialien bereit und lesen Sie die schriftliche Darbietung.',
    presentTitle: 'Darbieten', presentText: 'Arbeiten Sie ohne Bildschirm mit dem Kind und folgen Sie der Abfolge langsam und deutlich.',
    observeTitle: 'Beobachten', observeText: 'Halten Sie die Aktivität nach Abschluss fest und entscheiden Sie anhand der Abfolge, was als Nächstes kommt.',
    move: 'Vom <1>Suchen nach einer Aktivität</1> zum <3>Wissen, was Sie vorbereiten und darbieten.</3>',
    cta: 'Ihre erste Aktivität abschließen',
  },
  curriculum: {
    eyebrow: 'Ein zusammenhängender Lehrplan', title: 'Hören Sie auf, Aktivitäten zu sammeln. Folgen Sie einer Abfolge.',
    body: 'Einzelne Ideen beantworten eine Frage. Montessori Life Skills ordnet die Arbeit von der Einführung bis zur Vertiefung, damit der Erwachsene sieht, was zusammengehört und was als Nächstes kommt.',
    explore: 'Abfolge entdecken →', imageAlt: 'Montessori-Materialien: {{area}}',
  },
  areas: {
    practicalLife: 'Übungen des täglichen Lebens', sensorial: 'Sinnesmaterial', mathematics: 'Mathematik', language: 'Sprache',
    geography: 'Geographie', botany: 'Botanik', art: 'Kunst', graceCourtesy: 'Anmut und Höflichkeit',
  },
  founder: {
    eyebrow: 'Die Gründerin', imageAlt: 'Kerry Howard, AMI-ausgebildete Montessori-Pädagogin und Gründerin',
    badge: 'AMI-ausgebildete Pädagogin (Kinderhaus 3–6)',
    lead: 'Jede Aktivität in dieser App ist geprägt von Kerrys Ausbildung und 40 Jahren Begleitung von Kindern in der vorbereiteten Umgebung – so können Sie darauf vertrauen, dass das, was Sie zu Hause darbieten, der Methode von Dr. Maria Montessori treu bleibt und keine Pinterest-Annäherung ist.',
    body: 'Ihre Mission: authentisches Montessori für jede Familie zugänglich machen – ganz ohne Klassenzimmer.',
    cta: 'Kerrys Biografie lesen',
  },
  pricing: {
    eyebrow: 'Premium-Zugang', title: 'Setzen Sie den gesamten Lehrplan fort.',
    body: 'Nach einer Einstiegsaktivität öffnet Premium die vollständige, geordnete Abfolge – für weniger als einen Monat üblicher Montessori-Kindergartengebühren, inklusive Leitfaden zu Bildungsstandards für den Heimunterricht und druckbarem Portfolio.',
    guarantee: '30 Tage Geld-zurück-Garantie · Jederzeit kündbar',
    bestValue: 'Bestes Angebot', annualTitle: 'Premium Jährlich', perYear: '/Jahr', perMonth: '/Monat', perSession: '/Sitzung',
    annualEquivalent: 'Entspricht $16.58/Monat', annualNote: 'Ein Kind. Sie sparen $160.88 gegenüber 12 Monatszahlungen.',
    fFullCurriculum: 'Vollständiger Lehrplan', fActivities: '100+ Aktivitäten', fAllAreas: 'Alle Lehrplanbereiche', fProgress: 'Fortschrittsverfolgung',
    fPresentations: 'Schriftliche Darbietungen', fMaterials: 'Informationen zu Materialien', fVideos: 'Anleitungsvideos, sofern verfügbar',
    startPremium: 'Premium starten',
    flexible: 'Flexibel', monthlyTitle: 'Premium Monatlich', monthlyBody: 'Derselbe Premium-Zugang, monatlich abgerechnet. Jederzeit kündbar.', monthlyCta: 'Monatsoption ansehen',
    familyEyebrow: 'Bis zu vier Kinder', familyTitle: 'Familienplan', familyBody: 'Oder $49/Monat. Eigene Profile, Ziele und Fortschritte für jedes Kind.', familyCta: 'Familienoptionen ansehen',
    consultEyebrow: 'Persönlich', consultTitle: 'Private Beratung',
    consultBody: 'Eine 60-minütige Videositzung mit einer AMI-ausgebildeten Pädagogin, abgestimmt auf Ihr Kind und Ihre Ziele.',
    cGuidance: 'Individuelle Beratung zum Lehrplan', cRoutine: 'Einbindung in den Familienalltag', cPlan: 'Schriftlicher Handlungsplan', cFollowUp: 'Zwei Wochen Nachbetreuung per E-Mail',
    cPackage: 'Paket mit 3 Sitzungen: $600', consultCta: 'Beratung buchen',
  },
  beyond: {
    eyebrow: 'Über die erste Aktivität hinaus', title: 'Zur Abfolge zurückkehren. Teilen, was funktioniert.',
    continueTitle: 'Die Arbeit fortsetzen', continueText: 'Kehren Sie zum Profil jedes Kindes zurück, halten Sie Fortschritte fest und wählen Sie die nächste passende Aktivität.',
    shareTitle: 'Mit anderen teilen', shareText: 'Teilen Sie Montessori Life Skills mit anderen Eltern, Pädagogen, Betreuungspersonen oder Assistenzkräften.',
    schoolsTitle: 'Für Schulen', schoolsText: 'Authentische Darbietungen im Einklang mit der Association Montessori Internationale (AMI) und der American Montessori Society (AMS), geeignet für AMI-, AMS- und unabhängige Montessori-Schulen. Kontaktieren Sie uns, um die Bedürfnisse Ihrer Schule zu besprechen.',
    contactUs: 'Kontakt',
  },
  faq: {
    eyebrow: 'Fragen', title: 'Häufige Fragen',
    q1: 'Brauche ich eine Montessori-Ausbildung, um diese App zu nutzen?', a1: 'Nein. Die Aktivitäten enthalten schriftliche Darbietungsschritte und Hinweise für Eltern, Betreuungspersonen, Assistenzkräfte und Pädagogen.',
    q2: 'Für welches Alter ist die App gedacht?', a2: 'Der Lehrplan richtet sich an Erwachsene, die Kinder von 3 bis 6 Jahren begleiten. Die Aktivitäten sind nach Entwicklungsbereitschaft geordnet, nicht nach einem starren Altersplan.',
    q3: 'Kann ich die App für mehrere Kinder nutzen?', a3: 'Ja. Premium gilt für ein Kind, der Familienplan für bis zu vier Kinder mit getrenntem Fortschritt für jedes Kind.',
    q4: 'Sind Kerrys Lieder in Premium enthalten?', a4: 'Nein. Die Sammlung mit 10 Liedern ist ein separater Einmalkauf für $99.99 mit lebenslangem Zugang und Downloads für Ihren Haushalt. Die kostenlosen 10-Sekunden-Hörproben kann jeder abspielen.',
    q5: 'Funktioniert die App ohne Internet?', a5: 'Für aktuelle Aktivitätsinhalte, Kauflinks, Kontofunktionen und geschützte Videos ist eine Internetverbindung erforderlich.',
    q6: 'Wie ist der Lehrplan aufgebaut?', a6: 'Innerhalb jedes Bereichs sind die Aktivitäten von der Einführung bis zur Vertiefung geordnet, mit Materialien und Darbietungshinweisen an einem Ort.',
    q7: 'Was, wenn ich nicht zufrieden bin?', a7: 'Premium-Pläne beinhalten eine 30-tägige Geld-zurück-Garantie. Einzelheiten finden Sie auf der Garantieseite.',
    q8: 'Benutzt mein Kind die App?', a8: 'Nein. Montessori Life Skills ist ein Hilfsmittel für den Erwachsenen. Sie lesen die Darbietung, bereiten die Materialien vor und begleiten Ihr Kind – mit den Händen, ohne Bildschirm. Die App wird für das Kind nie zur Bildschirmzeit.',
    q9: 'Stehen die Darbietungen im Einklang mit AMI und AMS?', a9: 'Ja. Die Darbietungen folgen dem Montessori-Ansatz der Association Montessori Internationale (AMI), gegründet von Dr. Maria Montessori, und der American Montessori Society (AMS). Verfasst wurden sie von einer AMI-ausgebildeten Fachkraft für die Altersstufe 3–6, für Familien und Klassenräume.',
  },
  cta: {
    title: 'Bereit für Ihre nächste Darbietung?',
    body: 'Wählen Sie mit dem Leitfaden für Erwachsene eine Aktivität, legen Sie die Materialien bereit und bieten Sie die Lektion klar dar, während das Kind durch praktisches Tun lernt.',
    explore: 'Kostenlose Aktivitäten entdecken', viewPlans: 'Pläne und Preise ansehen',
    noCard: 'Keine Kreditkarte', cancelAnytime: 'Jederzeit kündbar', guarantee: '30 Tage Garantie', community: 'Treten Sie unserer Gemeinschaft bei',
  },
  aiDisclaimer: 'Einige Bilder wurden mithilfe von KI bearbeitet.',
  footer: {
    tagline: 'Ein Hilfsmittel zur Vorbereitung und Darbietung für Eltern, Pädagogen, Betreuungspersonen und Assistenzkräfte, die Kinder von 3 bis 6 Jahren begleiten.',
    product: 'Produkt', activities: 'Aktivitäten', progress: 'Fortschrittsverfolgung', pricing: 'Preise', about: 'Über uns', readinessGuide: 'Kostenloser Schulreife-Leitfaden',
    support: 'Hilfe', help: 'Hilfe-Center', contact: 'Kontakt', guarantee: '30-Tage-Garantie', privacy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen',
    accessibility: 'Barrierefreiheit', cookies: 'Cookie-Einstellungen',
    trustRefund: '30 Tage Rückerstattung', trustCancel: 'Jederzeit kündbar', trustNoCard: 'Keine Karte für den kostenlosen Zugang', trustBuilt: 'Von einer AMI-Pädagogin entwickelt',
    complianceLabel: 'Datenschutz und Schutz von Kinderdaten',
    complianceRegions: { us: 'USA', eu: 'EU und Vereinigtes Königreich', de: 'Deutschland', es: 'Spanien und Lateinamerika', cn: 'China', in: 'Indien', ea: 'Kenia und Uganda' },
    complianceNoAds: 'Keine Werbung, kein Tracking von Kindern',
    rights: '© {{year}} Montessori Life Skills. Alle Rechte vorbehalten.',
  },
};
