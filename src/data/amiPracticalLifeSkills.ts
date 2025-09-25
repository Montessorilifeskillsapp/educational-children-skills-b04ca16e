import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const amiPracticalLifeSkills: Record<string, EnhancedMontessoriSkill> = {
  // CARE OF SELF ACTIVITIES
  'dressing-frame-buttons': {
    id: 'dressing-frame-buttons',
    title: 'Dressing Frame - Large Buttons',
    description: 'Learn to button and unbutton using large buttons on a wooden frame',
    purpose: 'Develop fine motor skills, hand-eye coordination, and independence in dressing',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🧥',
    materials: ['Wooden dressing frame with large buttons', 'Two fabric panels'],
    directAims: ['Master buttoning technique', 'Develop pincer grasp', 'Improve bilateral coordination'],
    indirectAims: ['Prepare for independent dressing', 'Develop concentration', 'Build self-confidence'],
    controlOfError: ['Visual feedback of aligned buttons', 'Tactile feedback of proper insertion'],
    learningProcess: {
      presentation: {
        title: 'Button Frame Presentation',
        description: 'Teacher demonstrates slow, precise buttoning sequence',
        steps: [
          'Place frame on table in front of child',
          'Open frame completely by unbuttoning from top to bottom',
          'Hold button between thumb and forefinger',
          'Locate corresponding buttonhole',
          'Insert button through hole completely',
          'Pull fabric to secure button',
          'Repeat for each button from top to bottom',
          'Close frame completely, then reopen to check work'
        ],
        keyPoints: ['Move slowly and deliberately', 'Use pincer grasp', 'Work systematically top to bottom'],
        duration: '8-10 minutes'
      },
      guidedPractice: {
        title: 'Supported Buttoning',
        description: 'Child practices with teacher guidance',
        steps: [
          'Invite child to try buttoning',
          'Guide proper finger position if needed',
          'Encourage slow, careful movements',
          'Support completion of difficult buttons',
          'Celebrate successful attempts'
        ],
        supportStrategies: ['Hand-over-hand assistance initially', 'Verbal cues for finger placement', 'Break task into smaller steps'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Buttoning',
        description: 'Child works independently with increasing skill',
        indicators: ['Chooses activity spontaneously', 'Completes buttoning without assistance', 'Shows persistence with difficult buttons'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower movements'],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Buttoning Mastery',
        description: 'Child demonstrates complete competence',
        assessmentCriteria: ['Buttons accurately and efficiently', 'Works with sustained concentration', 'Shows pride in accomplishment'],
        indicators: ['Helps others with buttoning', 'Transfers skills to personal clothing', 'Chooses more challenging dressing frames']
      },
      extensions: {
        title: 'Advanced Buttoning',
        description: 'More complex buttoning challenges',
        activities: ['Smaller buttons', 'Multiple button garments', 'Different button styles'],
        variations: ['Coat buttoning practice', 'Doll dressing with buttons', 'Real clothing practice']
      }
    }
  },

  'dressing-frame-zippers': {
    id: 'dressing-frame-zippers',
    title: 'Dressing Frame - Zipper',
    description: 'Master zipper operation through systematic practice',
    purpose: 'Develop bilateral coordination and independence in clothing management',
    ageRange: '3-5 years',
    difficulty: 'Intermediate',
    category: 'Care of Self',
    isPremium: false,
    icon: '🤐',
    materials: ['Wooden frame with separating zipper', 'Two fabric panels'],
    directAims: ['Master zipper operation', 'Develop bilateral coordination', 'Build finger strength'],
    indirectAims: ['Prepare for independent dressing', 'Develop problem-solving skills', 'Build confidence'],
    controlOfError: ['Zipper alignment shows proper technique', 'Sound feedback indicates smooth operation'],
    learningProcess: {
      presentation: {
        title: 'Zipper Frame Presentation',
        description: 'Demonstrate complete zipper operation sequence',
        steps: [
          'Hold bottom of zipper with non-dominant hand',
          'Grasp zipper pull with dominant hand',
          'Pull zipper down slowly to separate completely',
          'Align bottom edges of zipper carefully',
          'Insert one side into zipper pull mechanism',
          'Hold alignment while pulling zipper up',
          'Pull zipper down and up several times to practice',
          'Leave frame in closed position'
        ],
        keyPoints: ['Maintain tension at bottom', 'Work slowly for proper alignment', 'Use both hands coordinately'],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Zipper Practice',
        description: 'Child learns with teacher support',
        steps: [
          'Guide child\'s hand placement',
          'Help maintain proper tension',
          'Support alignment of zipper parts',
          'Encourage multiple practice repetitions',
          'Celebrate successful zipping'
        ],
        supportStrategies: ['Physical guidance for hand position', 'Verbal cues for coordination', 'Practice separation before joining'],
        duration: '12-18 minutes'
      },
      independentPractice: {
        title: 'Independent Zipper Work',
        description: 'Child operates zippers independently',
        indicators: ['Aligns zipper parts correctly', 'Operates zipper smoothly', 'Persists through difficulties'],
        troubleshooting: ['If zipper jams: demonstrate gentle wiggling', 'If alignment difficult: practice separation first'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Zipper Operation Mastery',
        description: 'Expert zipper handling in all contexts',
        assessmentCriteria: ['Operates various zipper types', 'Troubleshoots zipper problems', 'Teaches technique to others'],
        indicators: ['Helps classmates with zippers', 'Manages personal clothing zippers', 'Shows patience with stuck zippers']
      },
      extensions: {
        title: 'Advanced Zipper Skills',
        description: 'Complex zipper applications',
        activities: ['Jacket zipper practice', 'Bag and backpack zippers', 'Two-way zippers'],
        variations: ['Different zipper sizes', 'Hidden zippers', 'Zipper repair basics']
      }
    }
  },

  'dressing-frame-snaps': {
    id: 'dressing-frame-snaps',
    title: 'Dressing Frame - Snaps',
    description: 'Learn to fasten and unfasten snaps with precision',
    purpose: 'Develop finger strength, coordination, and independence in clothing care',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '📌',
    materials: ['Wooden frame with metal snaps', 'Two fabric panels'],
    directAims: ['Master snap fastening technique', 'Develop finger strength', 'Improve precision'],
    indirectAims: ['Build independence in dressing', 'Develop concentration', 'Prepare for complex fasteners'],
    controlOfError: ['Audible click confirms proper fastening', 'Visual alignment shows accuracy'],
    learningProcess: {
      presentation: {
        title: 'Snap Frame Presentation',
        description: 'Demonstrate precise snap operation',
        steps: [
          'Unfasten all snaps from top to bottom',
          'Identify male and female snap parts',
          'Align snap parts directly over each other',
          'Press firmly with thumb until click is heard',
          'Check that snap is securely fastened',
          'Repeat for each snap systematically',
          'Unfasten by pulling fabric apart gently',
          'Practice fastening and unfastening sequence'
        ],
        keyPoints: ['Press firmly for secure fastening', 'Align parts precisely', 'Listen for confirmation click'],
        duration: '6-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Snap Practice',
        description: 'Child practices with teacher assistance',
        steps: [
          'Help child locate snap parts',
          'Guide alignment of male and female parts',
          'Support pressing motion for fastening',
          'Encourage listening for click sound',
          'Practice unfastening technique'
        ],
        supportStrategies: ['Hand-over-hand for pressing', 'Visual cues for alignment', 'Celebrate each successful snap'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Snap Work',
        description: 'Child fastens snaps independently',
        indicators: ['Aligns snap parts accurately', 'Applies appropriate pressure', 'Works systematically through all snaps'],
        troubleshooting: ['If not clicking: check alignment', 'If too difficult: build finger strength with other activities'],
        duration: '12-18 minutes'
      },
      mastery: {
        title: 'Snap Fastening Mastery',
        description: 'Expert snap operation skills',
        assessmentCriteria: ['Fastens snaps quickly and accurately', 'Helps others with snap technique', 'Shows confidence with various snap types'],
        indicators: ['Chooses snap activities frequently', 'Manages personal clothing snaps', 'Demonstrates to younger children']
      },
      extensions: {
        title: 'Advanced Snap Applications',
        description: 'Complex snap fastening situations',
        activities: ['Pajama snap practice', 'Bib fastening', 'Snap-on accessories'],
        variations: ['Different snap sizes', 'Multiple snap garments', 'Decorative snap items']
      }
    }
  },

  'dressing-frame-lacing': {
    id: 'dressing-frame-lacing',
    title: 'Dressing Frame - Lacing',
    description: 'Master shoe lacing technique through systematic practice',
    purpose: 'Develop complex bilateral coordination and prepare for shoe tying',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Care of Self',
    isPremium: true,
    icon: '👟',
    materials: ['Wooden frame with eyelets', 'Two shoe laces', 'Fabric panels shaped like shoe fronts'],
    directAims: ['Master lacing sequence', 'Develop bilateral coordination', 'Prepare for shoe tying'],
    indirectAims: ['Build persistence and concentration', 'Develop spatial awareness', 'Foster independence'],
    controlOfError: ['Even tension across all eyelets', 'Symmetrical lacing pattern', 'Proper crossing sequence'],
    learningProcess: {
      presentation: {
        title: 'Lacing Frame Presentation',
        description: 'Demonstrate systematic lacing technique',
        steps: [
          'Remove laces completely from frame',
          'Identify starting eyelets at bottom',
          'Insert lace up through bottom left eyelet',
          'Pull lace across and up through bottom right eyelet',
          'Continue crisscross pattern to top',
          'Maintain even tension throughout',
          'Pull laces to tighten evenly',
          'Practice unlacing and re-lacing'
        ],
        keyPoints: ['Maintain consistent crossing pattern', 'Keep tension even', 'Work systematically upward'],
        duration: '12-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Lacing Practice',
        description: 'Child practices with teacher guidance',
        steps: [
          'Help child identify starting position',
          'Guide proper lace threading technique',
          'Support crossing pattern maintenance',
          'Encourage even tension adjustment',
          'Practice complete lacing sequence'
        ],
        supportStrategies: ['Color-coded eyelets initially', 'Hand-over-hand for threading', 'Verbal cues for pattern'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Lacing',
        description: 'Child laces independently with skill',
        indicators: ['Maintains consistent crossing pattern', 'Achieves even tension', 'Completes lacing without assistance'],
        troubleshooting: ['If pattern confused: use color guides', 'If tension uneven: practice adjustment technique'],
        duration: '20-30 minutes'
      },
      mastery: {
        title: 'Lacing Expertise',
        description: 'Advanced lacing skills and variations',
        assessmentCriteria: ['Masters multiple lacing patterns', 'Teaches others lacing technique', 'Applies skills to real shoes'],
        indicators: ['Helps with shoe lacing in class', 'Experiments with decorative lacing', 'Shows pride in neat lacing']
      },
      extensions: {
        title: 'Advanced Lacing Skills',
        description: 'Complex lacing applications and variations',
        activities: ['Different lacing patterns', 'Actual shoe lacing', 'Boot lacing practice'],
        variations: ['Decorative lacing styles', 'Speed lacing techniques', 'One-handed lacing methods']
      }
    }
  },

  'shoe-polishing': {
    id: 'shoe-polishing',
    title: 'Shoe Polishing',
    description: 'Learn to clean and polish shoes to maintain their appearance and condition',
    purpose: 'Develop care for personal belongings and attention to detail',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Care of Self',
    isPremium: true,
    icon: '👞',
    materials: ['Leather shoes', 'Shoe polish', 'Soft cloths', 'Brush', 'Newspaper', 'Apron'],
    directAims: ['Learn shoe care technique', 'Develop circular polishing motion', 'Understand material care'],
    indirectAims: ['Develop responsibility for belongings', 'Build work ethic', 'Prepare for adult responsibilities'],
    controlOfError: ['Visual improvement in shoe appearance', 'Shine reflects proper technique', 'Even coverage shows thoroughness'],
    learningProcess: {
      presentation: {
        title: 'Shoe Polishing Demonstration',
        description: 'Teacher shows complete shoe care process',
        steps: [
          'Lay newspaper to protect work surface',
          'Put on apron to protect clothing',
          'Remove laces if present',
          'Clean shoes with damp cloth first',
          'Apply small amount of polish to cloth',
          'Rub polish into leather with circular motions',
          'Cover entire shoe surface evenly',
          'Let polish dry completely',
          'Buff with clean cloth until shiny',
          'Replace laces if removed'
        ],
        keyPoints: ['Use small amounts of polish', 'Work in circular motions', 'Allow proper drying time'],
        duration: '20-25 minutes'
      },
      guidedPractice: {
        title: 'Supported Shoe Care',
        description: 'Child polishes with teacher assistance',
        steps: [
          'Help child set up workspace',
          'Guide proper amount of polish application',
          'Support circular rubbing technique',
          'Encourage patience during drying',
          'Assist with final buffing process'
        ],
        supportStrategies: ['Demonstrate circular motion', 'Help with polish amount', 'Encourage thoroughness over speed'],
        duration: '25-35 minutes'
      },
      independentPractice: {
        title: 'Independent Shoe Polishing',
        description: 'Child cares for shoes independently',
        indicators: ['Sets up workspace correctly', 'Uses appropriate polish amount', 'Achieves good shine results'],
        troubleshooting: ['If using too much polish: demonstrate small amounts', 'If uneven coverage: practice systematic application'],
        duration: '30-40 minutes'
      },
      mastery: {
        title: 'Shoe Care Mastery',
        description: 'Expert shoe maintenance skills',
        assessmentCriteria: ['Achieves professional-quality results', 'Cares for various shoe types', 'Takes initiative in shoe maintenance'],
        indicators: ['Volunteers to polish class shoes', 'Maintains personal shoes regularly', 'Teaches younger children']
      },
      extensions: {
        title: 'Advanced Shoe Care',
        description: 'Comprehensive footwear maintenance',
        activities: ['Different polish colors', 'Boot care techniques', 'Shoe repair basics'],
        variations: ['Canvas shoe cleaning', 'Waterproofing application', 'Shoe storage organization']
      }
    }
  },

  // CARE OF ENVIRONMENT ACTIVITIES
  'dusting': {
    id: 'dusting',
    title: 'Dusting',
    description: 'Clean surfaces and objects by removing dust with careful attention to detail',
    purpose: 'Develop care for the environment and attention to cleanliness',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🧹',
    materials: ['Feather duster or soft cloth', 'Spray bottle with water', 'Objects to dust', 'Tray'],
    directAims: ['Learn proper dusting technique', 'Develop systematic cleaning approach', 'Care for classroom materials'],
    indirectAims: ['Develop attention to detail', 'Build responsibility for environment', 'Prepare for home responsibilities'],
    controlOfError: ['Visible dust removal', 'Clean appearance of objects', 'No streaks or residue'],
    learningProcess: {
      presentation: {
        title: 'Dusting Demonstration',
        description: 'Teacher shows systematic dusting process',
        steps: [
          'Select objects that need dusting',
          'Remove objects carefully to clear surface',
          'Dust surface with systematic motions',
          'Clean each object individually with care',
          'Check for missed areas',
          'Replace objects in original positions',
          'Clean dusting materials',
          'Return materials to storage'
        ],
        keyPoints: ['Work systematically', 'Handle objects with care', 'Check work thoroughly'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Dusting Practice',
        description: 'Child dusts with teacher guidance',
        steps: [
          'Help child select appropriate objects',
          'Guide systematic dusting pattern',
          'Support careful object handling',
          'Encourage thoroughness',
          'Assist with material cleanup'
        ],
        supportStrategies: ['Model systematic approach', 'Verbal cues for thoroughness', 'Praise careful handling'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Dusting',
        description: 'Child dusts areas independently',
        indicators: ['Chooses dusting work spontaneously', 'Works systematically', 'Handles materials carefully'],
        troubleshooting: ['If missing areas: demonstrate systematic pattern', 'If rough handling: emphasize care'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Dusting Mastery',
        description: 'Expert care of environment through dusting',
        assessmentCriteria: ['Notices areas needing dusting', 'Works thoroughly and carefully', 'Takes pride in clean environment'],
        indicators: ['Dusts without being asked', 'Helps maintain classroom cleanliness', 'Shows others proper technique']
      },
      extensions: {
        title: 'Advanced Cleaning Skills',
        description: 'Expanded environmental care activities',
        activities: ['Different dusting tools', 'Delicate object care', 'Systematic room cleaning'],
        variations: ['High and low surface dusting', 'Electronic equipment care', 'Plant leaf dusting']
      }
    }
  },

  'washing-tables': {
    id: 'washing-tables',
    title: 'Washing Tables',
    description: 'Clean table surfaces thoroughly using systematic washing technique',
    purpose: 'Maintain clean learning environment and develop work responsibility',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🪑',
    materials: ['Basin with soapy water', 'Sponge', 'Dry cloths', 'Apron', 'Bucket for dirty water'],
    directAims: ['Learn table washing technique', 'Develop systematic cleaning approach', 'Maintain clean workspace'],
    indirectAims: ['Build responsibility for shared spaces', 'Develop work completion skills', 'Prepare for household tasks'],
    controlOfError: ['Clean, streak-free surface', 'Dry table surface', 'No soap residue remaining'],
    learningProcess: {
      presentation: {
        title: 'Table Washing Demonstration',
        description: 'Complete table cleaning process demonstration',
        steps: [
          'Clear table surface completely',
          'Put on apron to protect clothing',
          'Wet sponge in soapy water',
          'Wring out excess water from sponge',
          'Wash table in systematic pattern (left to right)',
          'Rinse sponge and rewash if needed',
          'Dry table thoroughly with clean cloth',
          'Clean and store all materials',
          'Check table is completely clean and dry'
        ],
        keyPoints: ['Work systematically across surface', 'Wring sponge properly', 'Dry thoroughly to prevent streaks'],
        duration: '12-18 minutes'
      },
      guidedPractice: {
        title: 'Supported Table Washing',
        description: 'Child washes tables with teacher support',
        steps: [
          'Help child organize materials',
          'Guide systematic washing pattern',
          'Support proper sponge wringing',
          'Encourage thorough drying',
          'Assist with material cleanup'
        ],
        supportStrategies: ['Demonstrate washing pattern', 'Help with water control', 'Praise systematic approach'],
        duration: '15-25 minutes'
      },
      independentPractice: {
        title: 'Independent Table Washing',
        description: 'Child maintains tables independently',
        indicators: ['Organizes materials efficiently', 'Washes systematically', 'Achieves streak-free results'],
        troubleshooting: ['If streaky: check drying technique', 'If too wet: practice sponge wringing'],
        duration: '20-30 minutes'
      },
      mastery: {
        title: 'Table Care Mastery',
        description: 'Expert table and surface maintenance',
        assessmentCriteria: ['Consistently achieves excellent results', 'Notices tables needing cleaning', 'Takes initiative in maintenance'],
        indicators: ['Volunteers for table washing', 'Maintains multiple work surfaces', 'Teaches others proper technique']
      },
      extensions: {
        title: 'Advanced Surface Care',
        description: 'Comprehensive surface cleaning skills',
        activities: ['Different surface types', 'Stain removal techniques', 'Disinfecting procedures'],
        variations: ['Chair washing', 'Shelf cleaning', 'Wall washing']
      }
    }
  },

  'sweeping': {
    id: 'sweeping',
    title: 'Sweeping',
    description: 'Clean floors by sweeping debris into dustpan with proper technique',
    purpose: 'Maintain clean environment and develop gross motor coordination',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🧽',
    materials: ['Child-sized broom', 'Dustpan', 'Small brush for dustpan edge'],
    directAims: ['Master sweeping technique', 'Develop coordination with tools', 'Maintain floor cleanliness'],
    indirectAims: ['Build responsibility for environment', 'Develop gross motor skills', 'Prepare for household maintenance'],
    controlOfError: ['Visible debris collection', 'Clean floor appearance', 'Effective dustpan use'],
    learningProcess: {
      presentation: {
        title: 'Sweeping Demonstration',
        description: 'Complete floor sweeping process',
        steps: [
          'Assess area needing sweeping',
          'Hold broom with both hands properly',
          'Sweep debris toward center area',
          'Use short, controlled strokes',
          'Gather debris into pile',
          'Position dustpan against pile',
          'Sweep debris into dustpan',
          'Use small brush for dustpan edge if needed',
          'Empty dustpan in appropriate location',
          'Return tools to storage'
        ],
        keyPoints: ['Use both hands on broom', 'Work debris toward center', 'Position dustpan effectively'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Sweeping Practice',
        description: 'Child practices sweeping with assistance',
        steps: [
          'Help child hold broom correctly',
          'Guide effective sweeping motions',
          'Support dustpan positioning',
          'Encourage thorough debris collection',
          'Assist with tool storage'
        ],
        supportStrategies: ['Hand-over-hand for broom technique', 'Visual cues for debris direction', 'Practice dustpan angle'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Sweeping',
        description: 'Child sweeps areas independently',
        indicators: ['Uses broom effectively', 'Collects debris thoroughly', 'Operates dustpan successfully'],
        troubleshooting: ['If debris escaping: check dustpan angle', 'If ineffective sweeping: review technique'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Sweeping Mastery',
        description: 'Expert floor maintenance skills',
        assessmentCriteria: ['Achieves thoroughly clean results', 'Works efficiently with tools', 'Takes initiative in floor care'],
        indicators: ['Sweeps without prompting', 'Maintains classroom floors', 'Helps others with technique']
      },
      extensions: {
        title: 'Advanced Floor Care',
        description: 'Comprehensive floor maintenance skills',
        activities: ['Different broom types', 'Outdoor sweeping', 'Mopping introduction'],
        variations: ['Carpet sweeping', 'Stair sweeping', 'Large area maintenance']
      }
    }
  },

  'plant-care': {
    id: 'plant-care',
    title: 'Plant Care',
    description: 'Water, trim, and care for living plants in the classroom environment',
    purpose: 'Develop responsibility for living things and connection to nature',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🪴',
    materials: ['Watering can', 'Small scissors', 'Spray bottle', 'Soft cloth', 'Saucer for water'],
    directAims: ['Learn plant care routine', 'Develop gentle handling of living things', 'Understand plant needs'],
    indirectAims: ['Foster connection to nature', 'Develop empathy and responsibility', 'Build observation skills'],
    controlOfError: ['Plant health and appearance', 'Soil moisture level', 'Leaf condition'],
    learningProcess: {
      presentation: {
        title: 'Plant Care Demonstration',
        description: 'Complete plant maintenance routine',
        steps: [
          'Observe plant condition carefully',
          'Check soil moisture with finger',
          'Water slowly if soil is dry',
          'Mist leaves gently if appropriate',
          'Remove any dead or yellowing leaves',
          'Wipe dust from leaves with soft cloth',
          'Turn plant for even light exposure',
          'Clean up any spilled water',
          'Return materials to storage'
        ],
        keyPoints: ['Observe before acting', 'Water gently and appropriately', 'Handle plant parts carefully'],
        duration: '15-20 minutes'
      },
      guidedPractice: {
        title: 'Supported Plant Care',
        description: 'Child cares for plants with guidance',
        steps: [
          'Help child observe plant needs',
          'Guide appropriate watering amount',
          'Support gentle leaf cleaning',
          'Encourage careful handling',
          'Assist with cleanup'
        ],
        supportStrategies: ['Model gentle touch', 'Explain plant needs', 'Praise careful observation'],
        duration: '20-25 minutes'
      },
      independentPractice: {
        title: 'Independent Plant Care',
        description: 'Child maintains plants independently',
        indicators: ['Observes plants regularly', 'Provides appropriate care', 'Handles plants gently'],
        troubleshooting: ['If overwatering: teach soil check', 'If rough handling: emphasize gentleness'],
        duration: '20-30 minutes'
      },
      mastery: {
        title: 'Plant Care Mastery',
        description: 'Expert care of living plants',
        assessmentCriteria: ['Maintains healthy plants', 'Notices plant changes', 'Takes responsibility for plant wellness'],
        indicators: ['Cares for plants daily', 'Teaches others about plant needs', 'Advocates for plant welfare']
      },
      extensions: {
        title: 'Advanced Plant Activities',
        description: 'Expanded plant care and gardening',
        activities: ['Repotting plants', 'Growing from seeds', 'Plant propagation'],
        variations: ['Different plant types', 'Outdoor gardening', 'Herb garden maintenance']
      }
    }
  },

  // CONTROL OF MOVEMENT ACTIVITIES
  'walking-the-line': {
    id: 'walking-the-line',
    title: 'Walking the Line',
    description: 'Walk carefully along an elliptical line to develop balance and control',
    purpose: 'Develop balance, coordination, concentration, and body awareness',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Control of Movement',
    isPremium: false,
    icon: '👣',
    materials: ['Elliptical line marked on floor', 'Optional: objects to carry', 'Music (optional)'],
    directAims: ['Develop balance and coordination', 'Improve posture', 'Control body movement'],
    indirectAims: ['Develop concentration', 'Build self-confidence', 'Prepare body for other activities'],
    controlOfError: ['Staying on the line', 'Maintaining balance', 'Smooth, controlled movement'],
    learningProcess: {
      presentation: {
        title: 'Line Walking Demonstration',
        description: 'Teacher demonstrates careful line walking',
        steps: [
          'Stand at starting point on line',
          'Place one foot carefully on line',
          'Walk slowly placing each foot on line',
          'Maintain upright posture throughout',
          'Keep eyes focused ahead, not down',
          'Walk complete circuit of line',
          'Stop gracefully at starting point',
          'Step off line carefully'
        ],
        keyPoints: ['Move slowly and deliberately', 'Maintain balance and posture', 'Focus attention on movement'],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Line Walking',
        description: 'Child practices with teacher support',
        steps: [
          'Help child find starting position',
          'Encourage slow, careful steps',
          'Support balance if needed',
          'Praise controlled movement',
          'Practice multiple circuits'
        ],
        supportStrategies: ['Physical support initially if needed', 'Verbal cues for pace', 'Celebrate balance achievements'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Line Walking',
        description: 'Child walks line with increasing skill',
        indicators: ['Maintains balance on line', 'Walks at appropriate pace', 'Shows improved body control'],
        troubleshooting: ['If losing balance: practice slower movement', 'If rushing: emphasize controlled pace'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Line Walking Mastery',
        description: 'Expert balance and movement control',
        assessmentCriteria: ['Walks line with perfect balance', 'Maintains graceful posture', 'Shows body awareness and control'],
        indicators: ['Walks line while carrying objects', 'Helps others with balance', 'Demonstrates various walking styles']
      },
      extensions: {
        title: 'Advanced Movement Activities',
        description: 'Complex balance and coordination challenges',
        activities: ['Carrying objects while walking', 'Walking to music', 'Backwards line walking'],
        variations: ['Different walking speeds', 'Heel-to-toe walking', 'Balance beam activities']
      }
    }
  },

  'carrying-objects': {
    id: 'carrying-objects',
    title: 'Carrying Objects',
    description: 'Learn to transport various objects safely and gracefully',
    purpose: 'Develop coordination, spatial awareness, and care for materials',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Control of Movement',
    isPremium: false,
    icon: '📦',
    materials: ['Various objects of different sizes and weights', 'Trays', 'Baskets', 'Mats'],
    directAims: ['Master safe carrying techniques', 'Develop spatial awareness', 'Build confidence in movement'],
    indirectAims: ['Develop responsibility for materials', 'Build body awareness', 'Prepare for work transport'],
    controlOfError: ['Successful transport without dropping', 'No damage to objects or environment', 'Controlled, graceful movement'],
    learningProcess: {
      presentation: {
        title: 'Object Carrying Demonstration',
        description: 'Teacher shows proper carrying techniques',
        steps: [
          'Assess object size, weight, and fragility',
          'Position body appropriately for lifting',
          'Lift object with proper grip and posture',
          'Hold object securely against body if needed',
          'Walk slowly and deliberately to destination',
          'Place object down gently and precisely',
          'Check object is secure in new position',
          'Return to starting position'
        ],
        keyPoints: ['Assess before lifting', 'Use proper body mechanics', 'Move slowly and carefully'],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Carrying Practice',
        description: 'Child practices with teacher guidance',
        steps: [
          'Help child assess object characteristics',
          'Guide proper lifting technique',
          'Support safe carrying posture',
          'Encourage slow, careful movement',
          'Assist with precise placement'
        ],
        supportStrategies: ['Start with lightweight objects', 'Model proper technique', 'Praise careful handling'],
        duration: '12-18 minutes'
      },
      independentPractice: {
        title: 'Independent Object Carrying',
        description: 'Child transports objects safely alone',
        indicators: ['Assesses objects appropriately', 'Uses proper carrying technique', 'Moves with control and care'],
        troubleshooting: ['If dropping objects: practice with lighter items', 'If moving too fast: emphasize control'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Carrying Mastery',
        description: 'Expert object transportation skills',
        assessmentCriteria: ['Handles various object types skillfully', 'Shows excellent body mechanics', 'Transports materials safely consistently'],
        indicators: ['Helps others with carrying tasks', 'Volunteers for material transport', 'Shows confidence with challenging objects']
      },
      extensions: {
        title: 'Advanced Carrying Skills',
        description: 'Complex transportation challenges',
        activities: ['Multiple object carrying', 'Tray carrying variations', 'Team carrying projects'],
        variations: ['Different object types', 'Obstacle course carrying', 'Distance carrying challenges']
      }
    }
  },

  // GRACE AND COURTESY ACTIVITIES
  'greeting-lesson': {
    id: 'greeting-lesson',
    title: 'Greeting Others',
    description: 'Learn appropriate ways to greet people in various social situations',
    purpose: 'Develop social skills, cultural awareness, and respectful interactions',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '👋',
    materials: ['None required', 'Optional: cultural greeting examples'],
    directAims: ['Learn greeting protocols', 'Develop social confidence', 'Practice respectful interaction'],
    indirectAims: ['Build community connections', 'Develop cultural awareness', 'Prepare for social situations'],
    controlOfError: ['Positive social responses', 'Appropriate greeting delivery', 'Cultural sensitivity'],
    learningProcess: {
      presentation: {
        title: 'Greeting Demonstration',
        description: 'Teacher models appropriate greetings',
        steps: [
          'Approach person at appropriate distance',
          'Make eye contact respectfully',
          'Offer appropriate greeting for situation',
          'Use clear, friendly voice',
          'Listen for response',
          'Respond appropriately to their greeting',
          'Maintain respectful body language',
          'Conclude interaction gracefully'
        ],
        keyPoints: ['Maintain appropriate distance', 'Use eye contact respectfully', 'Match greeting to situation'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Greeting Practice',
        description: 'Child practices greetings with support',
        steps: [
          'Set up practice scenarios',
          'Guide appropriate approach distance',
          'Support eye contact and voice use',
          'Encourage appropriate responses',
          'Practice various greeting types'
        ],
        supportStrategies: ['Role-play different scenarios', 'Model appropriate responses', 'Praise social efforts'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Greeting',
        description: 'Child greets others independently',
        indicators: ['Initiates greetings appropriately', 'Responds well to others\' greetings', 'Shows cultural sensitivity'],
        troubleshooting: ['If too shy: practice with familiar people first', 'If too bold: discuss appropriate boundaries'],
        duration: 'Ongoing throughout day'
      },
      mastery: {
        title: 'Greeting Mastery',
        description: 'Expert social greeting skills',
        assessmentCriteria: ['Greets appropriately in all contexts', 'Shows cultural sensitivity', 'Helps others with social skills'],
        indicators: ['Welcomed by community members', 'Helps shy children with greetings', 'Shows social leadership']
      },
      extensions: {
        title: 'Advanced Social Skills',
        description: 'Complex social interaction skills',
        activities: ['Cultural greeting variations', 'Formal vs informal greetings', 'Group greeting situations'],
        variations: ['Different age group interactions', 'Professional greetings', 'Family vs school greetings']
      }
    }
  },

  'saying-excuse-me': {
    id: 'saying-excuse-me',
    title: 'Saying "Excuse Me"',
    description: 'Learn when and how to use "excuse me" in various social situations',
    purpose: 'Develop polite interaction skills and social awareness',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🙏',
    materials: ['None required'],
    directAims: ['Learn polite interruption techniques', 'Develop social awareness', 'Practice respectful communication'],
    indirectAims: ['Build considerate behavior', 'Develop empathy', 'Prepare for social situations'],
    controlOfError: ['Appropriate timing of phrase', 'Positive social responses', 'Effective communication'],
    learningProcess: {
      presentation: {
        title: 'Excuse Me Demonstration',
        description: 'Teacher shows appropriate use of "excuse me"',
        steps: [
          'Identify situation requiring "excuse me"',
          'Approach person at appropriate time',
          'Wait for natural pause in conversation',
          'Say "excuse me" clearly and politely',
          'Wait for acknowledgment',
          'Make request or statement respectfully',
          'Thank person for their attention',
          'Step away appropriately'
        ],
        keyPoints: ['Wait for appropriate moment', 'Use polite, clear voice', 'Respect others\' responses'],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported "Excuse Me" Practice',
        description: 'Child practices with teacher guidance',
        steps: [
          'Set up practice scenarios',
          'Help child identify appropriate moments',
          'Guide polite approach technique',
          'Support clear communication',
          'Practice various situations'
        ],
        supportStrategies: ['Role-play common scenarios', 'Discuss timing importance', 'Practice voice tone'],
        duration: '12-18 minutes'
      },
      independentPractice: {
        title: 'Independent Polite Interruption',
        description: 'Child uses "excuse me" appropriately',
        indicators: ['Uses phrase at appropriate times', 'Waits for acknowledgment', 'Communicates requests clearly'],
        troubleshooting: ['If interrupting inappropriately: discuss timing', 'If too quiet: practice voice projection'],
        duration: 'Ongoing throughout day'
      },
      mastery: {
        title: 'Polite Communication Mastery',
        description: 'Expert respectful interaction skills',
        assessmentCriteria: ['Uses phrase naturally and appropriately', 'Shows social sensitivity', 'Helps others communicate politely'],
        indicators: ['Teaches phrase to younger children', 'Models polite behavior', 'Shows social leadership']
      },
      extensions: {
        title: 'Advanced Polite Communication',
        description: 'Complex social communication skills',
        activities: ['Different cultural politeness expressions', 'Formal vs informal situations', 'Written polite requests'],
        variations: ['Emergency vs non-emergency situations', 'Group vs individual interactions', 'Phone vs in-person communication']
      }
    }
  },

  'offering-help': {
    id: 'offering-help',
    title: 'Offering Help',
    description: 'Learn to recognize when others need help and offer assistance appropriately',
    purpose: 'Develop empathy, community spirit, and helpful behavior',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🤝',
    materials: ['None required'],
    directAims: ['Learn to offer help appropriately', 'Develop observation skills', 'Practice helpful behavior'],
    indirectAims: ['Build empathy and community spirit', 'Develop social awareness', 'Foster cooperative behavior'],
    controlOfError: ['Positive response to offers', 'Successful help provided', 'Appropriate timing of offers'],
    learningProcess: {
      presentation: {
        title: 'Help Offering Demonstration',
        description: 'Teacher shows how to offer help appropriately',
        steps: [
          'Observe others to notice potential need for help',
          'Approach person respectfully',
          'Ask "May I help you?" clearly',
          'Listen to their response carefully',
          'If yes, ask "How can I help?"',
          'Provide assistance as requested',
          'Continue until task is complete',
          'Ask if anything else is needed'
        ],
        keyPoints: ['Observe before offering', 'Ask permission first', 'Follow their lead on how to help'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Help Offering',
        description: 'Child practices offering help with guidance',
        steps: [
          'Help child notice help opportunities',
          'Guide appropriate approach',
          'Support polite questioning',
          'Encourage appropriate assistance',
          'Celebrate helpful behavior'
        ],
        supportStrategies: ['Point out help opportunities', 'Model appropriate offers', 'Praise helpfulness'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Help Offering',
        description: 'Child offers help spontaneously',
        indicators: ['Notices when others need help', 'Offers assistance appropriately', 'Provides effective help'],
        troubleshooting: ['If not noticing needs: practice observation', 'If help unwanted: discuss asking permission'],
        duration: 'Ongoing throughout day'
      },
      mastery: {
        title: 'Helpful Behavior Mastery',
        description: 'Expert community helper',
        assessmentCriteria: ['Consistently notices help opportunities', 'Offers and provides help effectively', 'Inspires others to be helpful'],
        indicators: ['Known as a helpful class member', 'Teaches others to be helpful', 'Takes initiative in community care']
      },
      extensions: {
        title: 'Advanced Community Service',
        description: 'Complex helping and service skills',
        activities: ['Organizing help for others', 'Teaching helping skills', 'Community service projects'],
        variations: ['Different types of assistance', 'Group helping projects', 'Helping in various environments']
      }
    }
  }
};