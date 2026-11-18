// "dashboard" namespace: signed-in home screen with progress, badges and area cards. English is the source; other languages must match its shape.
const en = {
  "back": "Back to Home",
  "welcome": "Welcome back, {{name}}!",
  "loggedIn": "Logged in as: {{email}}",
  "selectAria": "Select child profile",
  "selectPh": "Select child",
  "signIn": "Sign In",
  "signOut": "Sign Out",
  "nav": "Account pages",
  "profiles": "Manage Child Profiles",
  "profilesSub": "Choose or edit a child",
  "family": "Family Dashboard",
  "familySub": "View learning progress",
  "plans": "Premium Plans",
  "plansSub": "Plans & pricing, plus a private consultation with Kerry",
  "setupEyebrow": "Start here · AMI",
  "setupTitle": "Set Up Your Montessori Classroom",
  "setupBody": "Before any activity, the environment itself must be prepared. The AMI guide to the prepared environment, the five curriculum areas, and the role of the adult.",
  "noteFrom": "A note from Kerry",
  "b": {
    "first": "First Step",
    "firstD": "Complete 1 activity",
    "five": "Five Strong",
    "fiveD": "Complete 5 activities",
    "ten": "Ten Explorer",
    "tenD": "Complete 10 activities",
    "s3": "3-Day Streak",
    "s3D": "Practice 3 days in a row",
    "s7": "Week Streak",
    "s7D": "Practice 7 days in a row",
    "area": "Focus Master",
    "areaD": "Complete a full focus area"
  },
  "days_one": "day",
  "days_other": "days",
  "streakStart": "Start a streak today!",
  "streakCurrent": "Current learning streak",
  "achievements": "Achievements",
  "focusPlan": "{{name}}'s Focus Plan",
  "nCompleted": "{{done}} of {{total}} activities completed",
  "allAreas": "Progress Across All Areas",
  "explore": "Explore Skill Categories",
  "principle": "Montessori Principle:",
  "why": "Why:",
  "pl": {
    "t": "Practical Life Skills",
    "s": "Daily living activities",
    "w": "Practical Life is the foundation of Montessori education. These activities develop concentration, coordination, independence, and order—the four pillars of learning. Children gain confidence through meaningful work that mirrors real adult tasks, satisfying their innate desire to contribute to family and community life."
  },
  "se": {
    "t": "Sensorial Skills",
    "s": "Refine the senses",
    "w": "Dr. Maria Montessori believed the senses are the gateway to intelligence. Sensorial materials isolate specific qualities (size, color, texture, sound, weight) to sharpen perception and develop powers of observation. This refined sensory awareness forms the foundation for mathematical thinking, scientific exploration, and artistic expression."
  },
  "la": {
    "t": "Language Skills",
    "s": "Reading and writing",
    "w": "Language development follows the child's sensitive period for oral and written communication. Montessori's phonetic approach with tactile sandpaper letters engages multiple senses, making abstract symbols concrete. Children naturally progress from spoken language to writing (encoding) before reading (decoding), respecting natural developmental stages."
  },
  "ma": {
    "t": "Mathematics Skills",
    "s": "Numbers and counting",
    "w": "Mathematics is presented as concrete experiences before abstract concepts. The child manipulates physical materials (Golden Beads, Number Rods) to internalize quantity, sequence, and operations. This hands-on approach builds the \"mathematical mind\"—understanding relationships, patterns, and logic that extend far beyond arithmetic."
  },
  "ge": {
    "t": "Geography Skills",
    "s": "Explore our world",
    "w": "Geography cultivates cosmic education—the child's place within the larger world. Through tactile puzzle maps and cultural studies, children develop spatial awareness, respect for diversity, and interconnectedness. This fosters global citizenship and environmental stewardship from an early age."
  },
  "bo": {
    "t": "Botany Skills",
    "s": "Learn about plants",
    "w": "Botany connects children to the natural world through direct observation and care. Understanding plant life cycles, structure, and needs teaches responsibility, patience, and scientific inquiry. Children develop reverence for life and ecological awareness while practicing categorization and nomenclature skills."
  },
  "ar": {
    "t": "Art Skills",
    "s": "Creative expression",
    "w": "Art in Montessori is process-oriented, not product-focused. Children explore materials freely to express inner creativity, refine fine motor control, and develop aesthetic sensibility. Open-ended art experiences build confidence in self-expression while respecting each child's unique creative voice and developmental readiness."
  },
  "cu": {
    "t": "Cultural Studies",
    "s": "History, music, science & world cultures",
    "w": "Cultural studies unite all areas of knowledge into Montessori's vision of cosmic education. Through history, music, science, and world cultures, children discover their place in the universe and develop respect for human achievement and diversity across time and place."
  }
};

const es: typeof en = {
  "back": "Volver al inicio",
  "welcome": "¡Hola de nuevo, {{name}}!",
  "loggedIn": "Sesión iniciada como: {{email}}",
  "selectAria": "Elegir perfil infantil",
  "selectPh": "Elegir niño",
  "signIn": "Iniciar sesión",
  "signOut": "Cerrar sesión",
  "nav": "Páginas de la cuenta",
  "profiles": "Gestionar perfiles infantiles",
  "profilesSub": "Elige o edita un niño",
  "family": "Panel familiar",
  "familySub": "Ver el progreso de aprendizaje",
  "plans": "Planes Premium",
  "plansSub": "Planes y precios, además de una consulta privada con Kerry",
  "setupEyebrow": "Empieza aquí · AMI",
  "setupTitle": "Prepara tu ambiente Montessori",
  "setupBody": "Antes de cualquier actividad, hay que preparar el propio ambiente. La guía AMI del ambiente preparado, las cinco áreas del currículo y el papel del adulto.",
  "noteFrom": "Una nota de Kerry",
  "b": {
    "first": "Primer paso",
    "firstD": "Completa 1 actividad",
    "five": "Cinco logradas",
    "fiveD": "Completa 5 actividades",
    "ten": "Diez exploradas",
    "tenD": "Completa 10 actividades",
    "s3": "3 días seguidos",
    "s3D": "Practica 3 días seguidos",
    "s7": "Semana seguida",
    "s7D": "Practica 7 días seguidos",
    "area": "Maestro del enfoque",
    "areaD": "Completa un área de enfoque entera"
  },
  "days_one": "día",
  "days_other": "días",
  "streakStart": "¡Empieza una racha hoy!",
  "streakCurrent": "Racha de aprendizaje actual",
  "achievements": "Logros",
  "focusPlan": "Plan de enfoque de {{name}}",
  "nCompleted": "{{done}} de {{total}} actividades completadas",
  "allAreas": "Progreso en todas las áreas",
  "explore": "Explora las áreas",
  "principle": "Principio Montessori:",
  "why": "Por qué:",
  "pl": {
    "t": "Vida Práctica",
    "s": "Actividades de la vida diaria",
    "w": "La Vida Práctica es la base de la educación Montessori. Estas actividades desarrollan la concentración, la coordinación, la independencia y el orden, los cuatro pilares del aprendizaje. Los niños ganan confianza mediante un trabajo significativo que refleja tareas reales de los adultos, lo que satisface su deseo innato de contribuir a la vida familiar y comunitaria."
  },
  "se": {
    "t": "Sensorial",
    "s": "Refinar los sentidos",
    "w": "La Dra. Maria Montessori creía que los sentidos son la puerta de la inteligencia. Los materiales sensoriales aíslan cualidades concretas (tamaño, color, textura, sonido, peso) para afinar la percepción y desarrollar la capacidad de observación. Esta conciencia sensorial refinada es la base del pensamiento matemático, la exploración científica y la expresión artística."
  },
  "la": {
    "t": "Lenguaje",
    "s": "Lectura y escritura",
    "w": "El desarrollo del lenguaje sigue el período sensible del niño para la comunicación oral y escrita. El enfoque fonético Montessori con letras de lija táctiles involucra varios sentidos y hace concretos los símbolos abstractos. Los niños pasan de forma natural del lenguaje hablado a la escritura (codificación) antes que a la lectura (decodificación), respetando las etapas naturales del desarrollo."
  },
  "ma": {
    "t": "Matemáticas",
    "s": "Números y conteo",
    "w": "Las matemáticas se presentan como experiencias concretas antes que como conceptos abstractos. El niño manipula materiales físicos (Perlas doradas, Barras numéricas) para interiorizar la cantidad, la secuencia y las operaciones. Este enfoque práctico construye la \"mente matemática\": comprender relaciones, patrones y lógica que van mucho más allá de la aritmética."
  },
  "ge": {
    "t": "Geografía",
    "s": "Explora nuestro mundo",
    "w": "La geografía cultiva la educación cósmica: el lugar del niño dentro del mundo. Mediante mapas de rompecabezas táctiles y estudios culturales, los niños desarrollan conciencia espacial, respeto por la diversidad y sentido de interconexión. Esto fomenta desde temprana edad la ciudadanía global y el cuidado del medio ambiente."
  },
  "bo": {
    "t": "Botánica",
    "s": "Aprende sobre las plantas",
    "w": "La botánica conecta a los niños con el mundo natural mediante la observación directa y el cuidado. Comprender los ciclos de vida, la estructura y las necesidades de las plantas enseña responsabilidad, paciencia e indagación científica. Los niños desarrollan respeto por la vida y conciencia ecológica mientras practican la clasificación y la nomenclatura."
  },
  "ar": {
    "t": "Arte",
    "s": "Expresión creativa",
    "w": "En Montessori, el arte se centra en el proceso, no en el resultado. Los niños exploran los materiales libremente para expresar su creatividad interior, afinar la motricidad fina y desarrollar la sensibilidad estética. Las experiencias artísticas abiertas fortalecen la confianza en la propia expresión y respetan la voz creativa y el momento de desarrollo de cada niño."
  },
  "cu": {
    "t": "Estudios culturales",
    "s": "Historia, música, ciencias y culturas del mundo",
    "w": "Los estudios culturales unen todas las áreas del conocimiento en la visión Montessori de la educación cósmica. A través de la historia, la música, las ciencias y las culturas del mundo, los niños descubren su lugar en el universo y desarrollan respeto por los logros humanos y la diversidad a lo largo del tiempo y el espacio."
  }
};

const de: typeof en = {
  "back": "Zurück zur Startseite",
  "welcome": "Willkommen zurück, {{name}}!",
  "loggedIn": "Angemeldet als: {{email}}",
  "selectAria": "Kinderprofil auswählen",
  "selectPh": "Kind auswählen",
  "signIn": "Anmelden",
  "signOut": "Abmelden",
  "nav": "Kontoseiten",
  "profiles": "Kinderprofile verwalten",
  "profilesSub": "Kind auswählen oder bearbeiten",
  "family": "Familien-Dashboard",
  "familySub": "Lernfortschritt ansehen",
  "plans": "Premium-Pläne",
  "plansSub": "Pläne und Preise sowie eine private Beratung mit Kerry",
  "setupEyebrow": "Hier beginnen · AMI",
  "setupTitle": "Richten Sie Ihre Montessori-Umgebung ein",
  "setupBody": "Vor jeder Aktivität muss die Umgebung selbst vorbereitet werden. Der AMI-Leitfaden zur vorbereiteten Umgebung, zu den fünf Lehrplanbereichen und zur Rolle des Erwachsenen.",
  "noteFrom": "Eine Notiz von Kerry",
  "b": {
    "first": "Erster Schritt",
    "firstD": "1 Aktivität abschließen",
    "five": "Starke Fünf",
    "fiveD": "5 Aktivitäten abschließen",
    "ten": "Zehn entdeckt",
    "tenD": "10 Aktivitäten abschließen",
    "s3": "3 Tage in Folge",
    "s3D": "3 Tage in Folge üben",
    "s7": "Eine Woche in Folge",
    "s7D": "7 Tage in Folge üben",
    "area": "Schwerpunkt-Meister",
    "areaD": "Einen ganzen Schwerpunktbereich abschließen"
  },
  "days_one": "Tag",
  "days_other": "Tage",
  "streakStart": "Beginnen Sie heute eine Serie!",
  "streakCurrent": "Aktuelle Lernserie",
  "achievements": "Erfolge",
  "focusPlan": "Schwerpunktplan von {{name}}",
  "nCompleted": "{{done}} von {{total}} Aktivitäten abgeschlossen",
  "allAreas": "Fortschritt in allen Bereichen",
  "explore": "Bereiche entdecken",
  "principle": "Montessori-Prinzip:",
  "why": "Warum:",
  "pl": {
    "t": "Übungen des täglichen Lebens",
    "s": "Tätigkeiten des Alltags",
    "w": "Die Übungen des täglichen Lebens sind das Fundament der Montessori-Pädagogik. Sie fördern Konzentration, Koordination, Selbstständigkeit und Ordnung – die vier Säulen des Lernens. Kinder gewinnen Selbstvertrauen durch sinnvolle Arbeit, die echte Tätigkeiten Erwachsener widerspiegelt, und stillen so ihr angeborenes Bedürfnis, zum Familien- und Gemeinschaftsleben beizutragen."
  },
  "se": {
    "t": "Sinnesmaterial",
    "s": "Die Sinne verfeinern",
    "w": "Dr. Maria Montessori sah in den Sinnen das Tor zur Intelligenz. Das Sinnesmaterial isoliert bestimmte Eigenschaften (Größe, Farbe, Oberfläche, Klang, Gewicht), um die Wahrnehmung zu schärfen und die Beobachtungsgabe zu entwickeln. Diese verfeinerte Sinneswahrnehmung bildet die Grundlage für mathematisches Denken, naturwissenschaftliches Forschen und künstlerischen Ausdruck."
  },
  "la": {
    "t": "Sprache",
    "s": "Lesen und Schreiben",
    "w": "Die Sprachentwicklung folgt der sensiblen Phase des Kindes für mündliche und schriftliche Kommunikation. Der lautorientierte Montessori-Ansatz mit Sandpapierbuchstaben spricht mehrere Sinne an und macht abstrakte Zeichen greifbar. Kinder gehen ganz natürlich von der gesprochenen Sprache zum Schreiben (Kodieren) über, bevor sie lesen (Dekodieren) – im Einklang mit den natürlichen Entwicklungsstufen."
  },
  "ma": {
    "t": "Mathematik",
    "s": "Zahlen und Zählen",
    "w": "Mathematik wird als konkrete Erfahrung dargeboten, bevor abstrakte Begriffe folgen. Das Kind arbeitet mit Material (Goldenes Perlenmaterial, Numerische Stangen), um Menge, Reihenfolge und Rechenoperationen zu verinnerlichen. Dieser handelnde Zugang bildet den „mathematischen Geist“ – das Verständnis von Beziehungen, Mustern und Logik weit über das Rechnen hinaus."
  },
  "ge": {
    "t": "Geographie",
    "s": "Unsere Welt entdecken",
    "w": "Geographie pflegt die kosmische Erziehung – den Platz des Kindes in der größeren Welt. Mit tastbaren Puzzlekarten und kulturellen Studien entwickeln Kinder räumliches Vorstellungsvermögen, Respekt vor Vielfalt und ein Gefühl der Verbundenheit. Das fördert schon früh Weltbürgertum und Verantwortung für die Umwelt."
  },
  "bo": {
    "t": "Botanik",
    "s": "Pflanzen kennenlernen",
    "w": "Botanik verbindet Kinder durch direktes Beobachten und Pflegen mit der Natur. Das Verständnis von Lebenszyklen, Aufbau und Bedürfnissen der Pflanzen lehrt Verantwortung, Geduld und forschendes Fragen. Kinder entwickeln Ehrfurcht vor dem Leben und ökologisches Bewusstsein und üben dabei Ordnen und Benennen."
  },
  "ar": {
    "t": "Kunst",
    "s": "Kreativer Ausdruck",
    "w": "Kunst ist bei Montessori prozess- statt ergebnisorientiert. Kinder erkunden Materialien frei, um ihre innere Kreativität auszudrücken, die Feinmotorik zu verfeinern und ästhetisches Empfinden zu entwickeln. Offene künstlerische Erfahrungen stärken das Vertrauen in den eigenen Ausdruck und achten die kreative Stimme und den Entwicklungsstand jedes Kindes."
  },
  "cu": {
    "t": "Kosmische Erziehung",
    "s": "Geschichte, Musik, Naturwissenschaft und Kulturen der Welt",
    "w": "Die kosmische Erziehung vereint alle Wissensbereiche in Montessoris Vision. Über Geschichte, Musik, Naturwissenschaft und die Kulturen der Welt entdecken Kinder ihren Platz im Universum und entwickeln Respekt vor menschlichen Leistungen und der Vielfalt über Zeiten und Orte hinweg."
  }
};

const zh: typeof en = {
  "back": "返回首页",
  "welcome": "欢迎回来，{{name}}！",
  "loggedIn": "当前登录：{{email}}",
  "selectAria": "选择儿童档案",
  "selectPh": "选择孩子",
  "signIn": "登录",
  "signOut": "退出登录",
  "nav": "账户页面",
  "profiles": "管理儿童档案",
  "profilesSub": "选择或编辑孩子",
  "family": "家庭面板",
  "familySub": "查看学习进度",
  "plans": "高级版方案",
  "plansSub": "方案与价格，以及与 Kerry 的私人咨询",
  "setupEyebrow": "从这里开始 · AMI",
  "setupTitle": "布置您的蒙台梭利环境",
  "setupBody": "在任何活动之前，必须先预备好环境本身。AMI 关于预备环境、五大课程领域和成人角色的指南。",
  "noteFrom": "Kerry 的话",
  "b": {
    "first": "第一步",
    "firstD": "完成 1 项活动",
    "five": "五项达成",
    "fiveD": "完成 5 项活动",
    "ten": "十项探索",
    "tenD": "完成 10 项活动",
    "s3": "连续 3 天",
    "s3D": "连续练习 3 天",
    "s7": "连续一周",
    "s7D": "连续练习 7 天",
    "area": "重点领域大师",
    "areaD": "完成一个完整的重点领域"
  },
  "days_one": "天",
  "days_other": "天",
  "streakStart": "今天就开始连续学习吧！",
  "streakCurrent": "当前连续学习天数",
  "achievements": "成就",
  "focusPlan": "{{name}}的重点计划",
  "nCompleted": "已完成 {{done}} / {{total}} 项活动",
  "allAreas": "所有领域的进度",
  "explore": "探索各领域",
  "principle": "蒙台梭利原则：",
  "why": "原因：",
  "pl": {
    "t": "日常生活技能",
    "s": "日常生活活动",
    "w": "日常生活是蒙台梭利教育的基础。这些活动培养专注、协调、独立和秩序——学习的四大支柱。孩子通过模仿成人真实任务的有意义工作获得自信，满足他们为家庭和社区生活做贡献的天生愿望。"
  },
  "se": {
    "t": "感官技能",
    "s": "精炼感官",
    "w": "玛利亚·蒙台梭利博士认为，感官是通往智力的大门。感官教具孤立出特定属性（大小、颜色、质地、声音、重量），以敏锐知觉、培养观察力。这种精炼的感官意识是数学思维、科学探索和艺术表达的基础。"
  },
  "la": {
    "t": "语言技能",
    "s": "阅读与书写",
    "w": "语言发展遵循孩子口头和书面交流的敏感期。蒙台梭利的语音法借助可触摸的砂纸字母调动多种感官，使抽象符号具体化。孩子会自然地从口语过渡到书写（编码），再到阅读（解码），尊重自然的发展阶段。"
  },
  "ma": {
    "t": "数学技能",
    "s": "数字与计数",
    "w": "数学先以具体经验呈现，再引入抽象概念。孩子操作实物教具（金色串珠、数棒）来内化数量、顺序和运算。这种动手方式构建“数学心智”——理解远超算术的关系、规律和逻辑。"
  },
  "ge": {
    "t": "地理技能",
    "s": "探索我们的世界",
    "w": "地理培养宇宙教育——孩子在更大世界中的位置。通过可触摸的拼图地图和文化研究，孩子培养空间意识、对多样性的尊重以及相互联系的意识，从小培养全球公民意识和环境责任感。"
  },
  "bo": {
    "t": "植物学技能",
    "s": "认识植物",
    "w": "植物学通过直接观察和照料将孩子与自然世界联系起来。了解植物的生命周期、结构和需求，教会孩子责任、耐心和科学探究。孩子在练习分类和命名的同时，培养对生命的敬畏和生态意识。"
  },
  "ar": {
    "t": "艺术技能",
    "s": "创意表达",
    "w": "蒙台梭利的艺术注重过程而非作品。孩子自由探索材料，表达内在创造力，精炼精细动作并培养审美感受。开放式的艺术体验在尊重每个孩子独特创造声音和发展准备的同时，建立自我表达的自信。"
  },
  "cu": {
    "t": "文化研究",
    "s": "历史、音乐、科学与世界文化",
    "w": "文化研究将所有知识领域融入蒙台梭利的宇宙教育愿景。通过历史、音乐、科学和世界文化，孩子发现自己在宇宙中的位置，并培养对人类成就以及跨越时空的多样性的尊重。"
  }
};

export const dashboard = { en, es, de, zh };
