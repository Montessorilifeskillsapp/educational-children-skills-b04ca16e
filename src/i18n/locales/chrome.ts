// "chrome" namespace: navigation, back buttons, section titles and shared app frame. English is the source; other languages must match its shape.
const en = {
  back: 'Back', home: 'Home', goHome: 'Go to home screen', curriculumSections: 'Curriculum sections', sequence: 'Sequence: {{sequence}}',
  continueLearning: 'Continue to Learning',
  titles: {
    practicalLife: 'Practical Life', sensorial: 'Sensorial Development', mathematics: 'Mathematics', language: 'Language', geography: 'Geography',
    botany: 'Botany', art: 'Art', cultural: 'Cultural Studies', graceCourtesy: 'Grace and Courtesy', allPracticalLife: 'All Practical Life Skills',
  },
  menu: {
    menu: 'Menu', login: 'Login', dashboard: 'Dashboard', cultural: 'Cultural', plans: 'Plans', familyDashboard: 'Family Dashboard', profiles: 'Profiles',
    schoolAdmin: 'School Administration', appAdmin: 'App Admin', accessCodes: 'Access Codes', terms: 'Terms of Service', privacy: 'Privacy Policy',
  },
  shop: {
    region: 'Shop Montessori life skills story books', title: 'Shop Montessori Life Skills Story Books', graceTitle: 'Shop Grace & Courtesy Materials',
    body: 'Beautifully illustrated story books that bring Montessori life skills to life.', browse: 'Browse Books',
  },
  card: {
    premium: 'Premium activity', completed: '✓ Completed', materialAlt: '{{title}} Montessori material', iconAlt: '{{title}} activity icon',
    aria: '{{title}} - {{difficulty}} level {{category}} activity. {{status}}. {{action}}',
    done: 'Completed', notDone: 'Not completed', lockedAction: 'Premium activity, open to see how to unlock', start: 'Click to start',
    difficulty: { Beginner: 'Beginner', Intermediate: 'Intermediate', Advanced: 'Advanced' },
  },
  notFound: {
    title: 'Oops! Page Not Found', body: "The page you're looking for seems to have wandered off on its own learning adventure. Let's get you back to exploring!",
    goHome: 'Go Home', goBack: 'Go Back', looking: 'What you might be looking for:',
    s1: '• Practical Life Skills', s2: '• Learning Activities', s3: '• Progress Dashboard', s4: '• Premium Plans',
  },
};

const es: typeof en = {
  back: 'Atrás', home: 'Inicio', goHome: 'Ir a la pantalla de inicio', curriculumSections: 'Áreas del currículo', sequence: 'Secuencia: {{sequence}}',
  continueLearning: 'Continuar aprendiendo',
  titles: {
    practicalLife: 'Vida Práctica', sensorial: 'Desarrollo sensorial', mathematics: 'Matemáticas', language: 'Lenguaje', geography: 'Geografía',
    botany: 'Botánica', art: 'Arte', cultural: 'Estudios culturales', graceCourtesy: 'Gracia y Cortesía', allPracticalLife: 'Todas las actividades de Vida Práctica',
  },
  menu: {
    menu: 'Menú', login: 'Iniciar sesión', dashboard: 'Panel', cultural: 'Cultura', plans: 'Planes', familyDashboard: 'Panel familiar', profiles: 'Perfiles',
    schoolAdmin: 'Administración escolar', appAdmin: 'Administración de la app', accessCodes: 'Códigos de acceso', terms: 'Términos del servicio', privacy: 'Política de privacidad',
  },
  shop: {
    region: 'Tienda de libros de cuentos Montessori Life Skills', title: 'Compra los libros de cuentos de Montessori Life Skills', graceTitle: 'Compra materiales de Gracia y Cortesía',
    body: 'Libros de cuentos bellamente ilustrados que dan vida a las habilidades Montessori para la vida.', browse: 'Ver libros',
  },
  card: {
    premium: 'Actividad Premium', completed: '✓ Completada', materialAlt: 'Material Montessori: {{title}}', iconAlt: 'Icono de la actividad {{title}}',
    aria: '{{title}}: actividad de {{category}}, nivel {{difficulty}}. {{status}}. {{action}}',
    done: 'Completada', notDone: 'Sin completar', lockedAction: 'Actividad Premium, ábrela para ver cómo desbloquearla', start: 'Haz clic para empezar',
    difficulty: { Beginner: 'Inicial', Intermediate: 'Intermedio', Advanced: 'Avanzado' },
  },
  notFound: {
    title: '¡Vaya! Página no encontrada', body: 'Parece que la página que buscas se fue a su propia aventura de aprendizaje. ¡Volvamos a explorar!',
    goHome: 'Ir al inicio', goBack: 'Volver', looking: 'Quizás buscabas:',
    s1: '• Actividades de Vida Práctica', s2: '• Actividades de aprendizaje', s3: '• Panel de progreso', s4: '• Planes Premium',
  },
};

const de: typeof en = {
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
    difficulty: { Beginner: 'Einstieg', Intermediate: 'Mittelstufe', Advanced: 'Fortgeschritten' },
  },
  notFound: {
    title: 'Hoppla! Seite nicht gefunden', body: 'Die gesuchte Seite ist wohl zu ihrem eigenen Lernabenteuer aufgebrochen. Lassen Sie uns weiter entdecken!',
    goHome: 'Zur Startseite', goBack: 'Zurück', looking: 'Vielleicht suchen Sie:',
    s1: '• Übungen des täglichen Lebens', s2: '• Lernaktivitäten', s3: '• Fortschritts-Dashboard', s4: '• Premium-Pläne',
  },
};

const zh: typeof en = {
  back: '返回', home: '首页', goHome: '前往主屏幕', curriculumSections: '课程领域', sequence: '序列：{{sequence}}',
  continueLearning: '继续学习',
  titles: {
    practicalLife: '日常生活', sensorial: '感官发展', mathematics: '数学', language: '语言', geography: '地理',
    botany: '植物学', art: '艺术', cultural: '文化研究', graceCourtesy: '优雅与礼仪', allPracticalLife: '全部日常生活活动',
  },
  menu: {
    menu: '菜单', login: '登录', dashboard: '面板', cultural: '文化', plans: '方案', familyDashboard: '家庭面板', profiles: '档案',
    schoolAdmin: '学校管理', appAdmin: '应用管理', accessCodes: '访问码', terms: '服务条款', privacy: '隐私政策',
  },
  shop: {
    region: '选购 Montessori Life Skills 故事书', title: '选购 Montessori Life Skills 故事书', graceTitle: '选购优雅与礼仪教具',
    body: '精美插图故事书，让蒙台梭利生活技能生动起来。', browse: '浏览图书',
  },
  card: {
    premium: '高级版活动', completed: '✓ 已完成', materialAlt: '{{title}}蒙台梭利教具', iconAlt: '{{title}}活动图标',
    aria: '{{title}}——{{category}}活动，{{difficulty}}级别。{{status}}。{{action}}',
    done: '已完成', notDone: '未完成', lockedAction: '高级版活动，打开查看解锁方式', start: '点击开始',
    difficulty: { Beginner: '入门', Intermediate: '中级', Advanced: '进阶' },
  },
  notFound: {
    title: '哎呀！页面未找到', body: '您要找的页面似乎自己去探险学习了。我们带您回去继续探索吧！',
    goHome: '返回首页', goBack: '返回', looking: '您可能在找：',
    s1: '• 日常生活活动', s2: '• 学习活动', s3: '• 进度面板', s4: '• 高级版方案',
  },
};

const sw: typeof en = {
  "back": "Rudi",
  "home": "Mwanzo",
  "goHome": "Nenda kwenye skrini ya mwanzo",
  "curriculumSections": "Sehemu za mtaala",
  "sequence": "Mfuatano: {{sequence}}",
  "continueLearning": "Endelea kujifunza",
  "titles": {
    "practicalLife": "Maisha ya vitendo",
    "sensorial": "Ukuzaji wa hisi",
    "mathematics": "Hisabati",
    "language": "Lugha",
    "geography": "Jiografia",
    "botany": "Botania",
    "art": "Sanaa",
    "cultural": "Masomo ya utamaduni",
    "graceCourtesy": "Uungwana na adabu",
    "allPracticalLife": "Stadi zote za Maisha ya vitendo"
  },
  "menu": {
    "menu": "Menyu",
    "login": "Ingia",
    "dashboard": "Dashibodi",
    "cultural": "Utamaduni",
    "plans": "Mipango",
    "familyDashboard": "Dashibodi ya familia",
    "profiles": "Wasifu",
    "schoolAdmin": "Usimamizi wa shule",
    "appAdmin": "Msimamizi wa programu",
    "accessCodes": "Misimbo ya ufikiaji",
    "terms": "Masharti ya huduma",
    "privacy": "Sera ya faragha"
  },
  "shop": {
    "region": "Nunua vitabu vya hadithi vya Montessori Life Skills",
    "title": "Nunua vitabu vya hadithi vya Montessori Life Skills",
    "graceTitle": "Nunua vifaa vya Uungwana na adabu",
    "body": "Vitabu vya hadithi vyenye michoro mizuri vinavyohuisha stadi za Maisha ya vitendo za Montessori.",
    "browse": "Vinjari vitabu"
  },
  "card": {
    "premium": "Shughuli ya Premium",
    "completed": "✓ Imekamilika",
    "materialAlt": "Kifaa cha Montessori cha {{title}}",
    "iconAlt": "Aikoni ya shughuli ya {{title}}",
    "aria": "{{title}} - shughuli ya {{category}} ya kiwango cha {{difficulty}}. {{status}}. {{action}}",
    "done": "Imekamilika",
    "notDone": "Haijakamilika",
    "lockedAction": "Shughuli ya Premium, fungua uone jinsi ya kuifungua kwa matumizi",
    "start": "Bofya kuanza",
    "difficulty": {
      "Beginner": "Mwanzo",
      "Intermediate": "Kati",
      "Advanced": "Juu"
    }
  },
  "notFound": {
    "title": "Samahani! Ukurasa haujapatikana",
    "body": "Ukurasa unaoutafuta unaonekana umeenda kwenye safari yake ya kujifunza. Turudi tuendelee kugundua!",
    "goHome": "Nenda mwanzo",
    "goBack": "Rudi nyuma",
    "looking": "Huenda unatafuta:",
    "s1": "• Stadi za maisha ya vitendo",
    "s2": "• Shughuli za kujifunza",
    "s3": "• Dashibodi ya maendeleo",
    "s4": "• Mipango ya kulipia"
  }
};
const hi: typeof en = {
  "back": "पीछे",
  "home": "होम",
  "goHome": "होम स्क्रीन पर जाएँ",
  "curriculumSections": "पाठ्यक्रम के खंड",
  "sequence": "क्रम: {{sequence}}",
  "continueLearning": "सीखने के लिए आगे बढ़ें",
  "titles": {
    "practicalLife": "व्यावहारिक जीवन",
    "sensorial": "इंद्रिय विकास",
    "mathematics": "गणित",
    "language": "भाषा",
    "geography": "भूगोल",
    "botany": "वनस्पति विज्ञान",
    "art": "कला",
    "cultural": "सांस्कृतिक अध्ययन",
    "graceCourtesy": "शालीनता और शिष्टाचार",
    "allPracticalLife": "व्यावहारिक जीवन के सभी कौशल"
  },
  "menu": {
    "menu": "मेन्यू",
    "login": "लॉगिन",
    "dashboard": "डैशबोर्ड",
    "cultural": "सांस्कृतिक",
    "plans": "प्लान",
    "familyDashboard": "परिवार डैशबोर्ड",
    "profiles": "प्रोफ़ाइल",
    "schoolAdmin": "स्कूल प्रशासन",
    "appAdmin": "ऐप एडमिन",
    "accessCodes": "एक्सेस कोड",
    "terms": "सेवा की शर्तें",
    "privacy": "गोपनीयता नीति"
  },
  "shop": {
    "region": "Montessori Life Skills की कहानी की किताबें खरीदें",
    "title": "Montessori Life Skills की कहानी की किताबें खरीदें",
    "graceTitle": "शालीनता और शिष्टाचार की सामग्री खरीदें",
    "body": "सुंदर चित्रों वाली कहानी की किताबें, जो मोंटेसरी जीवन कौशल को जीवंत बनाती हैं।",
    "browse": "किताबें देखें"
  },
  "card": {
    "premium": "प्रीमियम गतिविधि",
    "completed": "✓ पूरी हुई",
    "materialAlt": "{{title}} मोंटेसरी सामग्री",
    "iconAlt": "{{title}} गतिविधि का आइकन",
    "aria": "{{title}} - {{difficulty}} स्तर की {{category}} गतिविधि। {{status}}। {{action}}",
    "done": "पूरी हुई",
    "notDone": "पूरी नहीं हुई",
    "lockedAction": "प्रीमियम गतिविधि, अनलॉक करने का तरीका देखने के लिए खोलें",
    "start": "शुरू करने के लिए क्लिक करें",
    "difficulty": {
      "Beginner": "शुरुआती",
      "Intermediate": "मध्यम",
      "Advanced": "उन्नत"
    }
  },
  "notFound": {
    "title": "ओह! पेज नहीं मिला",
    "body": "लगता है, आप जिस पेज को ढूँढ़ रहे हैं, वह सीखने के अपने ही सफ़र पर निकल गया है। चलिए, आपको फिर से नई चीज़ें खोजने की राह पर ले चलें!",
    "goHome": "होम पर जाएँ",
    "goBack": "वापस जाएँ",
    "looking": "शायद आप यह ढूँढ रहे हैं:",
    "s1": "• व्यावहारिक जीवन कौशल",
    "s2": "• सीखने की गतिविधियाँ",
    "s3": "• प्रगति डैशबोर्ड",
    "s4": "• प्रीमियम प्लान"
  }
};
export const chrome = { en, es, de, zh, sw, hi };
