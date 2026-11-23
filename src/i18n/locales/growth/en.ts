// "growth" namespace: pop-ups, cookie choices, consultation booking. English is the source; other languages must match its shape.
export const en = {
  shared: { invalidEmail: 'Please enter a valid email address.', genericError: 'Something went wrong. Please try again.', close: 'Close', email: 'Email' },
  readiness: {
    readyTitle: 'Your guide is ready', readyBody: 'It opened in a new tab. Use “Save as PDF” to keep a copy.',
    openAgain: 'Open the guide again', seePremium: 'See the full sequence with Premium',
    eyebrow: 'Free guide', titleHome: 'Get your free Montessori Kindergarten Readiness Guide', titleActivity: 'See where this lesson fits in your child’s sequence',
    body: 'An age-matched readiness checklist and a sample AMI week, with the U.S. standards each lesson supports.',
    ageGroup: "Child's age", years: '{{age}} years', preparing: 'Preparing…', submit: 'Get my free guide',
    footnote: 'Occasional Montessori tips. Unsubscribe anytime.', privacy: 'Privacy',
  },
  cookies: {
    region: 'Cookie choices', title: 'Your privacy choices',
    body: 'We count visits without cookies. If you accept, we also use analytics cookies and record which pages and activities are used, so we can improve the app. See our <1>Privacy Policy</1>.',
    acceptAll: 'Accept all', rejectAll: 'Reject all', settings: 'Cookie settings',
    dialogBody: 'Choose what this app may use on your device. You can change this at any time from the Cookie settings link.',
    gpc: 'Your browser is sending a privacy signal (Global Privacy Control), so analytics stays off.',
    necessary: 'Necessary', necessaryBody: 'Keeps you signed in, saves your settings and lessons for offline use. Always on.', alwaysOn: 'Always on',
    analytics: 'Analytics',
    analyticsBody: 'Provided by Google and by Montessori Life Skills. Analytics cookies and a record of which pages and activities are used. Visit counts without cookies, provided by Lovable, continue either way.',
    save: 'Save choices',
  },
  consult: {
    errName: 'Please enter your name', errNameLong: 'Name must be under 100 characters', errEmail: 'Please enter a valid email address',
    errAge: 'Child age must be under 60 characters', errTopics: 'Please tell us what you would like to discuss', errTopicsLong: 'Topics must be under 2000 characters',
    errTimes: 'Preferred times must be under 500 characters', sendFailed: 'We could not send your request. Please try again.',
    sentTitle: 'Request sent', sentBody: 'Thank you. Your request has reached Kerry, who will reply to <1>{{email}}</1> to arrange a time.',
    title: 'Book a private consultation', body: 'Tell us a little about your child and what you would like help with. Kerry will reply by email to arrange a time.',
    name: 'Your name', childAge: "Child's age", optional: '(optional)', agePlaceholder: 'e.g. 4 years', package: 'Package',
    single: 'Single session', bundle: 'Three sessions', topics: 'What would you like to discuss?',
    topicsPlaceholder: 'Goals, routines, setting up your space, questions about the curriculum…',
    times: 'Preferred dates and times', timesPlaceholder: 'e.g. Weekday mornings, Central time',
    cancel: 'Cancel', sending: 'Sending…', send: 'Send request',
  },
  exit: {
    doneTitle: "You're on the list", doneBody: "Thank you — we'll be in touch with updates and early access.", back: 'Back to the page',
    title: 'Before you go', body: 'Join the list for early access to new activities and updates from Montessori Life Skills. No spam — you can unsubscribe anytime.',
    placeholder: 'Your email address', emailLabel: 'Email address', submitting: 'Signing you up…', submit: 'Keep me posted',
    footnote: 'Early access and occasional updates. Unsubscribe anytime.',
  },
  guidePage: {
  "title": "Montessori Kindergarten Readiness Guide",
  "body": "A readiness checklist and a sample AMI Primary week for your child’s age, with the U.S. standards each lesson supports.",
  "b1": "Age-matched readiness checklist",
  "b2": "Five sample lessons from the AMI sequence",
  "b3": "Common Core and NGSS alignment for each lesson",
  "b4": "Printable – save it as a PDF",
  "childAge": "Your child’s age",
  "included": "Included for age {{age}}:",
  "points": "+ {{count}}-point readiness checklist",
  "footnote": "We’ll email you occasional Montessori tips. Unsubscribe anytime.",
  "privacy": "Privacy Policy"
},
  guide: {
  "docTitle": "Montessori Readiness Guide – Age {{age}}",
  "save": "Save as PDF",
  "sub": "A sample AMI Primary week with U.S. standards alignment · Montessori Life Skills",
  "intro": "As Dr. Maria Montessori observed, the hand is the instrument of the mind. This guide shows one sample week from the AMI Primary sequence for a {{age}}-year-old, with the U.S. standards each lesson supports.",
  "checklist": "Readiness checklist",
  "observe": "Observe, don’t test. Each child follows their own timeline.",
  "week": "Sample week",
  "day": "Day",
  "lesson": "Lesson",
  "gains": "What the child gains",
  "standards": "Standards",
  "days": [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri"
  ],
  "indirect": "Indirect preparation",
  "ctaTitle": "The complete sequence.",
  "cta": "Premium includes every AMI Primary presentation in order, step-by-step guides, lesson videos and printable homeschool portfolios. Premium Annual is $199/year or $29.99/month, with a 30-day guarantee.",
  "footer": "Standard codes: Common Core (CCSS), NGSS, NCSS and National Core Arts Standards. This is an alignment map, not a certification. © {{year}} Montessori Life Skills.",
  "titles": {
    "Dry Pouring": "Dry Pouring",
    "Greeting Others": "Greeting Others",
    "Knobbed Cylinders": "Knobbed Cylinders",
    "Pink Tower": "Pink Tower",
    "Sandpaper Letters": "Sandpaper Letters",
    "Red Rods": "Red Rods",
    "Number Rods": "Number Rods",
    "Spindle Box": "Spindle Box",
    "Land and Water Forms": "Land and Water Forms",
    "Golden Beads": "Golden Beads",
    "Moveable Alphabet": "Moveable Alphabet",
    "Parts of a Plant": "Parts of a Plant"
  },
  "areas": {
    "Practical Life": "Practical Life",
    "Grace and Courtesy": "Grace and Courtesy",
    "Sensorial": "Sensorial",
    "Language": "Language",
    "Math": "Math",
    "Geography": "Geography",
    "Botany": "Botany"
  },
  "purposes": {
    "3": [
      "Coordination of movement, concentration and independence.",
      "Confidence and respectful social language.",
      "Visual discrimination of size; the pincer grip that prepares the hand for writing.",
      "Visual discrimination of graded size in three dimensions.",
      "Linking each sound to its written symbol through touch."
    ],
    "4": [
      "Graded length; direct preparation for the Number Rods.",
      "Quantity and symbol 1–10 as single, countable lengths.",
      "Counting loose quantities and the concept of zero.",
      "Sound–symbol association for early reading and writing.",
      "Concrete understanding of the Earth’s land and water."
    ],
    "5": [
      "The decimal system: units, tens, hundreds and thousands.",
      "Building words phonetically before the hand can write them.",
      "Confirming quantity, symbol and zero.",
      "Naming and observing the parts of living plants.",
      "Paired land and water forms through touch and naming."
    ]
  },
  "checks": {
    "3": [
      "Carries a tray or chair with care",
      "Pours dry materials with some spilling",
      "Follows a two-step request",
      "Greets familiar adults",
      "Sorts objects by size or color",
      "Shows interest in letter sounds"
    ],
    "4": [
      "Pours water with few spills",
      "Works on one activity for 10+ minutes",
      "Grades objects by size",
      "Recognizes several letter sounds",
      "Counts objects to 10 with one-to-one correspondence",
      "Uses please, thank you and excuse me"
    ],
    "5": [
      "Completes a multi-step activity and puts it away",
      "Names most letter sounds",
      "Builds simple words by sound",
      "Counts and matches quantity to numerals beyond 10",
      "Holds a pencil with a tripod grip",
      "Takes turns speaking in a group"
    ]
  }
},
};
