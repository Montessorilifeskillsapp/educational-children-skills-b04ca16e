import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const comprehensivePracticalLifeSkills: Record<string, EnhancedMontessoriSkill> = {
  'brushing-teeth': {
    id: 'brushing-teeth',
    title: 'Brushing Teeth',
    description: 'Learn proper dental hygiene through systematic brushing technique',
    purpose: 'Develops daily hygiene routine, self-care independence, and oral health awareness',
    ageRange: '2.5-5 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🦷',
    materials: ['Toothbrush', 'Toothpaste', 'Cup', 'Mirror', 'Towel'],
    materialsPurpose: [
      'Toothbrush: Child-sized for proper grip and reach',
      'Toothpaste: Small amount for effective cleaning',
      'Cup: For rinsing mouth thoroughly',
      'Mirror: For visual feedback and proper technique',
      'Towel: For drying mouth and maintaining cleanliness'
    ],
    directAims: [
      'Learn proper brushing technique',
      'Develop daily hygiene habits',
      'Understand oral health importance'
    ],
    indirectAims: [
      'Build self-care independence',
      'Develop fine motor coordination',
      'Foster responsibility for personal health',
      'Prepare for more complex self-care tasks'
    ],
    controlOfError: [
      'Mirror provides visual feedback',
      'Taste feedback from clean teeth',
      'Timer or counting for proper duration',
      'Adult guidance and praise'
    ],
    learningProcess: {
      presentation: {
        title: 'Brushing Technique Demonstration',
        description: 'Teacher shows proper brushing sequence and technique',
        steps: [
          'Gather all materials: toothbrush, toothpaste, cup, towel',
          'Wet toothbrush with clean water',
          'Apply pea-sized amount of toothpaste',
          'Demonstrate circular brushing motions on front teeth',
          'Show brushing technique for back teeth',
          'Demonstrate tongue cleaning',
          'Rinse mouth thoroughly with water',
          'Clean toothbrush and put away materials'
        ],
        keyPoints: [
          'Use gentle, circular motions',
          'Brush for full 2 minutes',
          'Don\'t forget tongue and gums',
          'Rinse thoroughly'
        ],
        duration: '5-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Brushing Practice',
        description: 'Child practices with teacher guidance and support',
        steps: [
          'Guide child through material gathering',
          'Help position toothbrush correctly',
          'Count or sing during brushing time',
          'Encourage thorough rinsing',
          'Assist with cleanup and storage'
        ],
        supportStrategies: [
          'Use songs or timers for duration',
          'Hand-over-hand guidance for technique',
          'Positive reinforcement for effort',
          'Visual reminders with mirror'
        ],
        duration: '8-12 minutes per session'
      },
      independentPractice: {
        title: 'Independent Tooth Brushing',
        description: 'Child performs routine independently with minimal supervision',
        indicators: [
          'Gathers materials without reminders',
          'Brushes for appropriate duration',
          'Uses proper technique consistently',
          'Cleans up materials independently'
        ],
        troubleshooting: [
          'If rushing: use timer or counting song',
          'If technique poor: return to guided practice',
          'If avoiding: make routine fun with songs',
          'If forgetting steps: use visual checklist'
        ],
        duration: '5-8 minutes per session'
      },
      mastery: {
        title: 'Independent Oral Hygiene',
        description: 'Child demonstrates complete competence in dental care',
        assessmentCriteria: [
          'Brushes teeth thoroughly without reminders',
          'Uses proper technique consistently',
          'Maintains clean teeth and fresh breath',
          'Takes pride in oral hygiene routine'
        ],
        indicators: [
          'Initiates brushing routine independently',
          'Teaches technique to younger children',
          'Shows awareness of oral health importance',
          'Requests dental checkups'
        ]
      },
      extensions: {
        title: 'Advanced Oral Care',
        description: 'Additional activities to enhance oral hygiene understanding',
        activities: [
          'Learning about dental tools',
          'Brushing stuffed animal teeth',
          'Learning about healthy foods for teeth',
          'Creating tooth brushing charts'
        ],
        variations: [
          'Different flavored toothpastes',
          'Electric vs manual toothbrush comparison',
          'Learning about dentist visits',
          'Flossing introduction (age appropriate)'
        ]
      }
    }
  },

  'washing-hands': {
    id: 'washing-hands',
    title: 'Washing Hands',
    description: 'Master proper hand washing technique for health and cleanliness',
    purpose: 'Essential hygiene skill for health, cleanliness, and germ prevention',
    ageRange: '2-5 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🧼',
    materials: ['Soap', 'Water', 'Towel', 'Sink'],
    materialsPurpose: [
      'Soap: Removes dirt and germs effectively',
      'Water: Comfortable temperature for washing and rinsing',
      'Towel: Clean, dry towel for proper drying',
      'Sink: Appropriate height for child access'
    ],
    directAims: [
      'Learn proper hand washing steps',
      'Understand hygiene importance',
      'Develop independent self-care'
    ],
    indirectAims: [
      'Build health awareness',
      'Develop routine habits',
      'Foster responsibility for cleanliness',
      'Prepare for food preparation activities'
    ],
    controlOfError: [
      'Visual check for soap suds',
      'Feel of clean vs dirty hands',
      'Timer for proper washing duration',
      'Adult praise and guidance'
    ],
    learningProcess: {
      presentation: {
        title: 'Proper Hand Washing Technique',
        description: 'Demonstrate complete hand washing sequence',
        steps: [
          'Turn on water to comfortable temperature',
          'Wet hands completely under running water',
          'Apply soap and work into lather',
          'Scrub hands together for 20 seconds',
          'Clean between fingers and under nails',
          'Rinse hands thoroughly under clean water',
          'Dry hands completely with clean towel'
        ],
        keyPoints: [
          'Use warm, not hot water',
          'Scrub for full 20 seconds',
          'Don\'t forget thumbs and wrists',
          'Dry completely to prevent germs'
        ],
        duration: '3-5 minutes'
      },
      guidedPractice: {
        title: 'Supported Hand Washing',
        description: 'Child practices with teacher guidance',
        steps: [
          'Help child reach sink comfortably',
          'Guide water temperature selection',
          'Count or sing during scrubbing time',
          'Check that all areas are cleaned',
          'Assist with thorough drying'
        ],
        supportStrategies: [
          'Use step stool for sink access',
          'Sing 20-second washing songs',
          'Visual reminders about hand areas',
          'Positive reinforcement for thoroughness'
        ],
        duration: '5-8 minutes per session'
      },
      independentPractice: {
        title: 'Independent Hand Washing',
        description: 'Child washes hands without assistance',
        indicators: [
          'Approaches sink independently',
          'Adjusts water temperature appropriately',
          'Scrubs for adequate duration',
          'Dries hands thoroughly'
        ],
        troubleshooting: [
          'If rushing: use timer or songs',
          'If water too hot/cold: practice temperature testing',
          'If missing areas: use visual hand diagram',
          'If not drying: emphasize importance'
        ],
        duration: '3-5 minutes per session'
      },
      mastery: {
        title: 'Hygiene Awareness',
        description: 'Child demonstrates understanding of when and how to wash hands',
        assessmentCriteria: [
          'Washes hands at appropriate times',
          'Uses proper technique consistently',
          'Recognizes need for hand washing',
          'Helps others with hand washing'
        ],
        indicators: [
          'Washes hands before eating without reminders',
          'Washes after using bathroom independently',
          'Notices and responds to dirty hands',
          'Explains importance of hand washing'
        ]
      },
      extensions: {
        title: 'Hygiene Awareness Extensions',
        description: 'Advanced activities to reinforce hygiene concepts',
        activities: [
          'Germ experiment with glitter',
          'Learning when to wash hands',
          'Teaching hand washing to dolls',
          'Creating hand washing reminder signs'
        ],
        variations: [
          'Different soaps and their purposes',
          'Hand sanitizer vs soap comparison',
          'Learning about germs and bacteria',
          'Cultural hand washing practices'
        ]
      }
    }
  },

  'pouring-water': {
    id: 'pouring-water',
    title: 'Pouring Water',
    description: 'Learn to pour water from one container to another with control and precision',
    purpose: 'Develop hand-eye coordination, concentration, and practical life skills',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Control of Movement',
    isPremium: false,
    icon: '💧',
    materials: ['Two identical pitchers', 'Colored water', 'Tray', 'Sponge', 'Funnel (optional)'],
    materialsPurpose: [
      'Two identical pitchers: One for pouring from, one for receiving',
      'Colored water: Makes the activity more appealing and visible',
      'Tray: Contains the activity and catches spills',
      'Sponge: For cleaning up spills independently',
      'Funnel: For children who need additional support'
    ],
    directAims: [
      'Develop pouring skills',
      'Improve hand-eye coordination',
      'Practice controlled movement'
    ],
    indirectAims: [
      'Develop concentration',
      'Build confidence',
      'Prepare for more complex practical life activities',
      'Develop care of environment'
    ],
    controlOfError: [
      'Spilled water is visible',
      'Sound of water hitting the pitcher',
      'Visual feedback of water level',
      'Sponge available for immediate cleanup'
    ],
    learningProcess: {
      presentation: {
        title: 'Initial Presentation',
        description: 'Teacher demonstrates the complete activity slowly and deliberately',
        steps: [
          'Invite child to observe: "Would you like to see how to pour water?"',
          'Carry tray to table using both hands',
          'Sit with child to your right (left-handed: child to left)',
          'Place hands on pitcher handles, lift slowly',
          'Pour steadily from pitcher to pitcher at moderate speed',
          'Set down first pitcher, lift second pitcher',
          'Pour water back to original pitcher',
          'Wipe any spills with sponge',
          'Return materials to shelf'
        ],
        keyPoints: [
          'Move slowly and deliberately',
          'Maintain eye contact with the pouring',
          'Keep movements smooth and controlled',
          'Clean up immediately after spills'
        ],
        duration: '5-8 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice Phase',
        description: 'Child practices with teacher support and guidance',
        steps: [
          'Invite child to try: "Now you may try"',
          'Guide child to carry tray properly',
          'Support child\'s hands if needed during first attempts',
          'Encourage slow, controlled movements',
          'Help child clean up spills without criticism',
          'Praise effort and concentration, not just results'
        ],
        supportStrategies: [
          'Use hand-over-hand guidance initially',
          'Reduce water amount if child struggles',
          'Provide verbal cues: "Slowly, watch the water"',
          'Model cleanup process each time'
        ],
        duration: '10-15 minutes per session'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child works independently with minimal adult intervention',
        indicators: [
          'Child chooses activity independently',
          'Carries tray without assistance',
          'Pours with increasing control',
          'Cleans up spills independently',
          'Returns materials properly'
        ],
        troubleshooting: [
          'If spilling frequently: reduce water amount',
          'If rushing: remind to move slowly',
          'If avoiding cleanup: model and encourage',
          'If losing interest: vary water color or add scent'
        ],
        duration: '15-20 minutes per session'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child demonstrates complete competence in the activity',
        assessmentCriteria: [
          'Pours without spilling consistently',
          'Maintains concentration throughout activity',
          'Cleans up independently and thoroughly',
          'Shows care for materials and environment'
        ],
        indicators: [
          'Child repeats activity multiple times in one session',
          'Demonstrates activity to other children',
          'Seeks more challenging pouring activities',
          'Shows pride in accomplishment'
        ]
      },
      extensions: {
        title: 'Extension Activities',
        description: 'Advanced variations to maintain challenge and interest',
        activities: [
          'Pouring with smaller containers',
          'Pouring rice or beans',
          'Using funnel for precision pouring',
          'Pouring into multiple containers',
          'Measuring while pouring'
        ],
        variations: [
          'Different sized pitchers',
          'Various liquids (safe)',
          'Outdoor pouring with garden tools',
          'Pouring for cooking activities'
        ]
      }
    }
  },

  'spooning-beans': {
    id: 'spooning-beans',
    title: 'Spooning Beans',
    description: 'Transfer objects with precision and develop fine motor control',
    purpose: 'Develops fine motor control, concentration, and hand-eye coordination',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Control of Movement',
    isPremium: false,
    icon: '🥄',
    materials: ['Two small bowls', 'Spoon', 'Dried beans', 'Tray'],
    materialsPurpose: [
      'Two small bowls: One for beans, one for receiving',
      'Spoon: Child-sized for proper grip',
      'Dried beans: Large enough to prevent choking hazard',
      'Tray: Contains activity and defines work space'
    ],
    directAims: [
      'Develop spooning technique',
      'Improve fine motor control',
      'Practice controlled transfer'
    ],
    indirectAims: [
      'Develop concentration',
      'Prepare for eating skills',
      'Build confidence in precise movements',
      'Develop care of materials'
    ],
    controlOfError: [
      'Beans that drop are visible and audible',
      'Empty bowl shows progress',
      'Tray catches dropped beans',
      'Count of beans for self-checking'
    ],
    learningProcess: {
      presentation: {
        title: 'Spooning Demonstration',
        description: 'Teacher shows proper spooning technique',
        steps: [
          'Place tray with bowls and spoon on table',
          'Show proper spoon grip with three fingers',
          'Demonstrate scooping motion in first bowl',
          'Transfer beans slowly to second bowl',
          'Show how to pick up dropped beans',
          'Return all beans to original bowl',
          'Return materials to shelf'
        ],
        keyPoints: [
          'Hold spoon with proper grip',
          'Scoop carefully to avoid spills',
          'Move deliberately between bowls',
          'Pick up dropped beans immediately'
        ],
        duration: '5-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Spooning Practice',
        description: 'Child practices with guidance and encouragement',
        steps: [
          'Help child position materials correctly',
          'Guide proper spoon grip',
          'Encourage slow, careful movements',
          'Help pick up dropped beans without judgment',
          'Praise concentration and effort'
        ],
        supportStrategies: [
          'Start with larger beans if needed',
          'Use hand-over-hand for grip correction',
          'Count beans together for motivation',
          'Demonstrate cleanup process'
        ],
        duration: '10-15 minutes per session'
      },
      independentPractice: {
        title: 'Independent Spooning',
        description: 'Child transfers beans independently',
        indicators: [
          'Grips spoon correctly without help',
          'Transfers beans with increasing accuracy',
          'Picks up dropped beans independently',
          'Completes activity with focus'
        ],
        troubleshooting: [
          'If dropping many beans: reduce amount per scoop',
          'If grip incorrect: return to guided practice',
          'If rushing: encourage slower movements',
          'If losing focus: reduce session length'
        ],
        duration: '10-20 minutes per session'
      },
      mastery: {
        title: 'Precision Transfer Mastery',
        description: 'Child demonstrates expert spooning control',
        assessmentCriteria: [
          'Transfers beans with minimal dropping',
          'Maintains concentration throughout',
          'Shows pride in neat work',
          'Helps others with technique'
        ],
        indicators: [
          'Chooses activity repeatedly',
          'Works with sustained focus',
          'Demonstrates to younger children',
          'Requests more challenging transfers'
        ]
      },
      extensions: {
        title: 'Advanced Transfer Activities',
        description: 'More challenging spooning and transfer work',
        activities: [
          'Spooning smaller objects like rice',
          'Using tongs for transfer',
          'Multiple bowl sorting while spooning',
          'Spooning liquids (thick soups)',
          'Color sorting while transferring'
        ],
        variations: [
          'Different sized spoons',
          'Various objects to transfer',
          'Different bowl sizes and shapes',
          'Spooning for cooking activities'
        ]
      }
    }
  },

  'flower-arranging': {
    id: 'flower-arranging',
    title: 'Flower Arranging',
    description: 'Create beautiful flower arrangements while developing aesthetic sense',
    purpose: 'Cultivates aesthetic sense, care for living things, and appreciation of beauty',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🌸',
    materials: ['Fresh flowers', 'Clean vase', 'Water', 'Small scissors', 'Newspaper', 'Towel'],
    materialsPurpose: [
      'Fresh flowers: Various colors and sizes for arrangement',
      'Clean vase: Appropriate size for flower stems',
      'Water: Fresh, clean water for flower health',
      'Small scissors: Child-safe for stem cutting',
      'Newspaper: Protects work surface',
      'Towel: For cleanup and spill management'
    ],
    directAims: [
      'Learn flower arrangement principles',
      'Develop aesthetic appreciation',
      'Practice careful handling of living things'
    ],
    indirectAims: [
      'Develop visual discrimination',
      'Foster care for beauty in environment',
      'Build confidence in creative expression',
      'Prepare for more complex art activities'
    ],
    controlOfError: [
      'Visual assessment of arrangement balance',
      'Flowers drooping if improperly cut',
      'Water level feedback',
      'Adult guidance and appreciation'
    ],
    learningProcess: {
      presentation: {
        title: 'Flower Arranging Demonstration',
        description: 'Teacher demonstrates complete flower arranging process',
        steps: [
          'Spread newspaper to protect work surface',
          'Fill vase with fresh, clean water',
          'Select flowers considering color and height',
          'Trim flower stems at 45-degree angle under water',
          'Remove leaves that would be below water line',
          'Arrange tallest flowers in center',
          'Add shorter flowers around edges',
          'Step back to assess arrangement',
          'Make adjustments for balance',
          'Clean up workspace thoroughly'
        ],
        keyPoints: [
          'Cut stems under running water',
          'Remove underwater leaves to prevent bacteria',
          'Consider height, color, and balance',
          'Handle flowers gently'
        ],
        duration: '15-20 minutes'
      },
      guidedPractice: {
        title: 'Supported Arranging Practice',
        description: 'Child creates arrangements with teacher guidance',
        steps: [
          'Help child select appropriate flowers',
          'Guide proper scissor use for stem cutting',
          'Discuss color and height relationships',
          'Encourage creative expression',
          'Assist with final adjustments'
        ],
        supportStrategies: [
          'Start with fewer, sturdier flowers',
          'Provide color guidance without overwhelming',
          'Praise creative choices',
          'Help with scissor safety'
        ],
        duration: '15-25 minutes per session'
      },
      independentPractice: {
        title: 'Independent Flower Arranging',
        description: 'Child creates arrangements independently',
        indicators: [
          'Selects flowers thoughtfully',
          'Cuts stems safely and properly',
          'Creates balanced arrangements',
          'Cleans workspace independently'
        ],
        troubleshooting: [
          'If arrangement unbalanced: guide observation skills',
          'If rushing: encourage taking time to observe',
          'If afraid of scissors: return to guided practice',
          'If flowers drooping: check water and stem cutting'
        ],
        duration: '15-30 minutes per session'
      },
      mastery: {
        title: 'Aesthetic Arrangement Mastery',
        description: 'Child demonstrates artistic sense and technical skill',
        assessmentCriteria: [
          'Creates visually pleasing arrangements',
          'Shows care for flower health',
          'Demonstrates color and balance awareness',
          'Takes pride in beautiful work'
        ],
        indicators: [
          'Arranges flowers for special occasions',
          'Teaches arrangement to others',
          'Shows preference for beautiful environments',
          'Seeks flowers for arrangement independently'
        ]
      },
      extensions: {
        title: 'Advanced Floral Arts',
        description: 'Extended activities in floral design and plant care',
        activities: [
          'Learning flower names and types',
          'Pressing flowers for art projects',
          'Creating seasonal arrangements',
          'Learning about flower meanings',
          'Growing flowers for arranging'
        ],
        variations: [
          'Different container types and shapes',
          'Seasonal flower varieties',
          'Mixed arrangements with foliage',
          'Miniature arrangements',
          'Float arrangements in bowls'
        ]
      }
    }
  },

  'sweeping-floor': {
    id: 'sweeping-floor',
    title: 'Sweeping the Floor',
    description: 'Learn to keep floors clean through systematic sweeping technique',
    purpose: 'Develops care of environment, coordination, and responsibility',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🧹',
    materials: ['Child-sized broom', 'Dustpan', 'Small brush', 'Waste basket'],
    materialsPurpose: [
      'Child-sized broom: Appropriate height for effective sweeping',
      'Dustpan: Sized for child to handle and control',
      'Small brush: For detailed corner cleaning',
      'Waste basket: For proper debris disposal'
    ],
    directAims: [
      'Learn proper sweeping technique',
      'Develop coordinated movement',
      'Understand floor care importance'
    ],
    indirectAims: [
      'Build environmental responsibility',
      'Develop gross motor coordination',
      'Foster pride in clean spaces',
      'Prepare for more complex cleaning tasks'
    ],
    controlOfError: [
      'Visible debris on floor',
      'Sound of broom on floor',
      'Visual check of cleaned area',
      'Adult guidance and praise'
    ],
    learningProcess: {
      presentation: {
        title: 'Sweeping Technique Demonstration',
        description: 'Teacher shows complete floor sweeping process',
        steps: [
          'Gather broom, dustpan, and brush',
          'Hold broom with both hands properly',
          'Start sweeping from one corner',
          'Use short, controlled strokes',
          'Sweep debris into a pile',
          'Hold dustpan firmly against floor',
          'Sweep pile into dustpan carefully',
          'Use small brush for remaining debris',
          'Empty dustpan into waste basket',
          'Return all tools to proper storage'
        ],
        keyPoints: [
          'Keep broom close to floor',
          'Use consistent, overlapping strokes',
          'Work systematically across area',
          'Check corners and edges carefully'
        ],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Sweeping Practice',
        description: 'Child practices sweeping with teacher guidance',
        steps: [
          'Help child grip broom correctly',
          'Guide systematic sweeping pattern',
          'Assist with dustpan positioning',
          'Encourage thorough corner cleaning',
          'Praise effort and improvement'
        ],
        supportStrategies: [
          'Start with smaller areas',
          'Demonstrate proper grip repeatedly',
          'Use visual cues for swept areas',
          'Celebrate clean results'
        ],
        duration: '15-20 minutes per session'
      },
      independentPractice: {
        title: 'Independent Floor Sweeping',
        description: 'Child sweeps floors without assistance',
        indicators: [
          'Holds broom correctly without help',
          'Sweeps systematically across area',
          'Uses dustpan effectively',
          'Checks work for completeness'
        ],
        troubleshooting: [
          'If missing debris: teach systematic patterns',
          'If broom technique poor: return to guided practice',
          'If rushing: emphasize thoroughness over speed',
          'If avoiding corners: demonstrate corner technique'
        ],
        duration: '10-20 minutes per session'
      },
      mastery: {
        title: 'Environmental Care Mastery',
        description: 'Child demonstrates responsibility for clean environment',
        assessmentCriteria: [
          'Sweeps thoroughly without reminders',
          'Takes initiative to clean messes',
          'Uses proper technique consistently',
          'Shows pride in clean spaces'
        ],
        indicators: [
          'Notices and cleans messes independently',
          'Helps others with sweeping technique',
          'Maintains clean personal spaces',
          'Requests to sweep regularly'
        ]
      },
      extensions: {
        title: 'Advanced Cleaning Skills',
        description: 'Extended activities in floor and space care',
        activities: [
          'Sweeping different floor types',
          'Learning about different brooms',
          'Sweeping outdoor areas',
          'Coordinating with mopping',
          'Teaching sweeping to others'
        ],
        variations: [
          'Different broom sizes and types',
          'Various floor surfaces',
          'Wet and dry sweeping',
          'Large and small area sweeping'
        ]
      }
    }
  },

  'table-wiping': {
    id: 'table-wiping',
    title: 'Table Wiping',
    description: 'Clean tables methodically using proper technique and materials',
    purpose: 'Develops care of environment, order, and coordinated movement',
    ageRange: '3-5 years',
    difficulty: 'Beginner',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🧽',
    materials: ['Small bucket', 'Sponge', 'Water with mild soap', 'Tray', 'Towel'],
    materialsPurpose: [
      'Small bucket: Child-sized for easy handling',
      'Sponge: Appropriate size for child\'s hand',
      'Soapy water: Gentle cleaning solution',
      'Tray: Contains materials and manages spills',
      'Towel: For drying table surface'
    ],
    directAims: [
      'Learn systematic wiping technique',
      'Develop care for furniture',
      'Practice controlled movement'
    ],
    indirectAims: [
      'Build responsibility for environment',
      'Develop coordinated arm movements',
      'Foster pride in clean spaces',
      'Prepare for more complex cleaning'
    ],
    controlOfError: [
      'Visual feedback of clean vs dirty surface',
      'Feel of smooth, dry table',
      'Water level in bucket',
      'Adult guidance and appreciation'
    ],
    learningProcess: {
      presentation: {
        title: 'Table Wiping Demonstration',
        description: 'Teacher demonstrates systematic table cleaning',
        steps: [
          'Fill bucket with small amount of soapy water',
          'Place all materials on tray',
          'Carry tray to table carefully',
          'Dip sponge in water and wring gently',
          'Wipe table in straight lines from left to right',
          'Work from top of table to bottom',
          'Rinse sponge and repeat as needed',
          'Dry table surface with clean towel',
          'Empty bucket and clean materials',
          'Return all items to proper place'
        ],
        keyPoints: [
          'Wring sponge to prevent oversaturation',
          'Use systematic left-to-right pattern',
          'Work from clean to dirty areas',
          'Dry completely to prevent water spots'
        ],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Table Cleaning',
        description: 'Child practices table wiping with guidance',
        steps: [
          'Help child prepare cleaning materials',
          'Guide systematic wiping pattern',
          'Demonstrate proper sponge wringing',
          'Assist with thorough drying',
          'Praise systematic approach'
        ],
        supportStrategies: [
          'Use visual guides for wiping pattern',
          'Start with smaller table surfaces',
          'Demonstrate wringing technique',
          'Celebrate clean results'
        ],
        duration: '10-15 minutes per session'
      },
      independentPractice: {
        title: 'Independent Table Maintenance',
        description: 'Child cleans tables without assistance',
        indicators: [
          'Prepares materials independently',
          'Wipes systematically across surface',
          'Wrings sponge appropriately',
          'Dries table thoroughly'
        ],
        troubleshooting: [
          'If leaving streaks: check drying technique',
          'If over-wetting: practice sponge wringing',
          'If missing areas: reinforce systematic pattern',
          'If rushing: emphasize thoroughness'
        ],
        duration: '8-15 minutes per session'
      },
      mastery: {
        title: 'Table Care Mastery',
        description: 'Child demonstrates expertise in table maintenance',
        assessmentCriteria: [
          'Cleans tables to spotless condition',
          'Works systematically without guidance',
          'Takes initiative to clean messy tables',
          'Shows pride in well-maintained furniture'
        ],
        indicators: [
          'Notices and cleans table messes immediately',
          'Teaches wiping technique to others',
          'Maintains clean eating and work surfaces',
          'Requests responsibility for table care'
        ]
      },
      extensions: {
        title: 'Advanced Surface Care',
        description: 'Extended activities in furniture and surface maintenance',
        activities: [
          'Cleaning different table materials',
          'Learning about wood care vs other surfaces',
          'Cleaning chairs and other furniture',
          'Using different cleaning solutions appropriately',
          'Setting up cleaning stations'
        ],
        variations: [
          'Different table sizes and shapes',
          'Various surface materials',
          'Different cleaning tools',
          'Seasonal deep cleaning projects'
        ]
      }
    }
  },

  'setting-table': {
    id: 'setting-table',
    title: 'Setting the Table',
    description: 'Learn proper table setting for meals with grace and courtesy',
    purpose: 'Develops grace, courtesy, meal preparation skills, and social awareness',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🍽️',
    materials: ['Plates', 'Forks', 'Knives', 'Spoons', 'Napkins', 'Cups', 'Placemats'],
    materialsPurpose: [
      'Plates: Child-sized and unbreakable for safety',
      'Utensils: Properly sized for child hands',
      'Napkins: Cloth preferred for elegance',
      'Cups: Appropriate size for child portions',
      'Placemats: Define individual space and protect table'
    ],
    directAims: [
      'Learn proper table setting arrangement',
      'Develop grace in meal preparation',
      'Understand dining courtesy'
    ],
    indirectAims: [
      'Build social awareness',
      'Foster hospitality skills',
      'Develop spatial awareness',
      'Prepare for formal dining situations'
    ],
    controlOfError: [
      'Visual check of symmetrical arrangement',
      'Comparison with control placemat',
      'Adult guidance for proper placement',
      'Appreciation from family/guests'
    ],
    learningProcess: {
      presentation: {
        title: 'Table Setting Demonstration',
        description: 'Teacher demonstrates proper place setting arrangement',
        steps: [
          'Place placemat in front of each chair',
          'Set plate in center of placemat',
          'Place fork on left side of plate',
          'Put knife on right side, blade facing plate',
          'Place spoon to right of knife',
          'Fold napkin and place under fork or on plate',
          'Set cup above knife and spoon',
          'Check that all items are aligned',
          'Add centerpiece if desired',
          'Invite others to appreciate the setting'
        ],
        keyPoints: [
          'Maintain consistent spacing',
          'Keep utensils aligned with plate edge',
          'Ensure knife blade faces inward',
          'Consider left-handed family members'
        ],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Table Setting',
        description: 'Child sets table with teacher guidance',
        steps: [
          'Guide placement of each item',
          'Help child remember proper order',
          'Assist with spacing and alignment',
          'Encourage attention to detail',
          'Celebrate beautiful table setting'
        ],
        supportStrategies: [
          'Use placemat with outlined positions',
          'Practice with one place setting first',
          'Create memory aids for utensil placement',
          'Praise effort and improvement'
        ],
        duration: '12-20 minutes per session'
      },
      independentPractice: {
        title: 'Independent Table Setting',
        description: 'Child sets table without assistance',
        indicators: [
          'Remembers proper utensil placement',
          'Maintains consistent spacing',
          'Checks work for completeness',
          'Shows pride in attractive table'
        ],
        troubleshooting: [
          'If forgetting placement: use visual reminders',
          'If rushing: emphasize care over speed',
          'If uneven spacing: practice measuring with fingers',
          'If avoiding task: make it more special/fun'
        ],
        duration: '8-15 minutes per session'
      },
      mastery: {
        title: 'Hospitality Skills Mastery',
        description: 'Child demonstrates understanding of gracious table preparation',
        assessmentCriteria: [
          'Sets table beautifully without reminders',
          'Adapts setting for different meals',
          'Shows consideration for others\' needs',
          'Takes pride in welcoming others'
        ],
        indicators: [
          'Offers to set table for family meals',
          'Adjusts settings for special occasions',
          'Teaches table setting to younger children',
          'Shows appreciation for well-set tables'
        ]
      },
      extensions: {
        title: 'Advanced Hospitality Skills',
        description: 'Extended activities in table preparation and dining courtesy',
        activities: [
          'Learning formal vs informal settings',
          'Setting table for special occasions',
          'Understanding different cultural table settings',
          'Creating centerpieces and decorations',
          'Learning serving etiquette'
        ],
        variations: [
          'Different types of meals and utensils',
          'Seasonal table decorations',
          'Cultural dining traditions',
          'Outdoor dining setups',
          'Buffet vs seated meal preparations'
        ]
      }
    }
  },

  'getting-dressed': {
    id: 'getting-dressed',
    title: 'Getting Dressed',
    description: 'Learn to dress independently with proper sequence and technique',
    purpose: 'Builds independence, fine motor coordination, and self-care skills',
    ageRange: '2.5-5 years',
    difficulty: 'Intermediate',
    category: 'Care of Self',
    isPremium: false,
    icon: '👕',
    materials: ['Weather-appropriate clothes', 'Mirror', 'Chair or stool', 'Shoe storage'],
    materialsPurpose: [
      'Appropriate clothes: Season and activity suitable garments',
      'Mirror: For self-checking and adjustment',
      'Chair or stool: For sitting while dressing',
      'Shoe storage: Organized space for footwear'
    ],
    directAims: [
      'Learn dressing sequence',
      'Develop clothing manipulation skills',
      'Build independence in self-care'
    ],
    indirectAims: [
      'Foster decision-making skills',
      'Develop body awareness',
      'Build confidence and autonomy',
      'Prepare for more complex life skills'
    ],
    controlOfError: [
      'Mirror provides visual feedback',
      'Physical comfort when properly dressed',
      'Weather appropriateness feedback',
      'Adult guidance and praise'
    ],
    learningProcess: {
      presentation: {
        title: 'Dressing Sequence Demonstration',
        description: 'Teacher demonstrates logical dressing order',
        steps: [
          'Choose weather-appropriate clothing',
          'Sit on chair for stability',
          'Put on underwear first',
          'Add socks, checking for heel placement',
          'Put on shirt - arms first, then head',
          'Put on pants or skirt',
          'Put on shoes and fasten appropriately',
          'Check appearance in mirror',
          'Adjust clothing as needed',
          'Appreciate neat, comfortable appearance'
        ],
        keyPoints: [
          'Follow logical sequence from inside out',
          'Check clothing orientation before putting on',
          'Use mirror for self-assessment',
          'Take time to do each step properly'
        ],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Dressing Practice',
        description: 'Child practices dressing with teacher support',
        steps: [
          'Help child choose appropriate clothes',
          'Guide through each step of sequence',
          'Provide physical assistance as needed',
          'Encourage self-checking in mirror',
          'Praise effort and progress'
        ],
        supportStrategies: [
          'Break complex tasks into smaller steps',
          'Use clothing with easier fasteners initially',
          'Provide physical support for balance',
          'Celebrate independence achievements'
        ],
        duration: '15-25 minutes per session'
      },
      independentPractice: {
        title: 'Independent Dressing',
        description: 'Child dresses without assistance',
        indicators: [
          'Chooses appropriate clothing independently',
          'Follows proper dressing sequence',
          'Manages fasteners and closures',
          'Self-checks appearance in mirror'
        ],
        troubleshooting: [
          'If sequence confused: use visual reminder chart',
          'If fasteners difficult: practice on dressing frames',
          'If clothing backwards: emphasize pre-checking',
          'If rushing: encourage taking time for quality'
        ],
        duration: '10-20 minutes per session'
      },
      mastery: {
        title: 'Independent Self-Care',
        description: 'Child demonstrates complete dressing independence',
        assessmentCriteria: [
          'Dresses appropriately for weather/activity',
          'Manages all clothing fasteners',
          'Takes pride in neat appearance',
          'Helps others with dressing skills'
        ],
        indicators: [
          'Chooses and dresses without reminders',
          'Adjusts clothing throughout day as needed',
          'Shows awareness of appropriate dress',
          'Teaches dressing skills to younger children'
        ]
      },
      extensions: {
        title: 'Advanced Dressing Skills',
        description: 'Extended activities in clothing care and selection',
        activities: [
          'Learning to fold and put away clothes',
          'Understanding weather-appropriate dressing',
          'Care of special clothing items',
          'Learning about fabric types and care',
          'Coordinating colors and patterns'
        ],
        variations: [
          'Different types of fasteners and closures',
          'Seasonal clothing variations',
          'Special occasion dressing',
          'Cultural clothing exploration',
          'Care and maintenance of clothing'
        ]
      }
    }
  },

  'dishwashing': {
    id: 'dishwashing',
    title: 'Dishwashing',
    description: 'Learn to wash and care for dishes with systematic technique',
    purpose: 'Develops independence, order, care of environment, and responsibility',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Care of Environment',
    isPremium: true,
    icon: '🍽️',
    materials: ['Small basin', 'Sponge or brush', 'Mild soap', 'Drying rack', 'Towel', 'Apron'],
    materialsPurpose: [
      'Small basin: Child-sized for comfortable use',
      'Sponge or brush: Gentle but effective cleaning tools',
      'Mild soap: Safe, effective cleaning agent',
      'Drying rack: Proper drainage and organization',
      'Towel: For drying dishes and cleanup',
      'Apron: Protects clothing from splashes'
    ],
    directAims: [
      'Learn proper dishwashing technique',
      'Develop care for household items',
      'Practice systematic cleaning process'
    ],
    indirectAims: [
      'Build responsibility for family contributions',
      'Develop fine motor coordination',
      'Foster appreciation for clean dishes',
      'Prepare for independent living skills'
    ],
    controlOfError: [
      'Visual check for cleanliness',
      'Feel of smooth, clean surfaces',
      'No soap residue when dry',
      'Adult guidance and appreciation'
    ],
    learningProcess: {
      presentation: {
        title: 'Dishwashing Demonstration',
        description: 'Teacher demonstrates complete dishwashing process',
        steps: [
          'Put on apron to protect clothing',
          'Fill basin with warm, soapy water',
          'Gather dishes to be washed',
          'Wash cleanest items first (glasses)',
          'Scrub each dish thoroughly with sponge',
          'Rinse dishes in clean water',
          'Place dishes on drying rack carefully',
          'Drain dirty water and clean basin',
          'Dry dishes when completely air-dried',
          'Put clean dishes away in proper places'
        ],
        keyPoints: [
          'Wash from cleanest to dirtiest items',
          'Use circular motions for thorough cleaning',
          'Rinse completely to remove all soap',
          'Handle dishes carefully to prevent breaking'
        ],
        duration: '15-25 minutes'
      },
      guidedPractice: {
        title: 'Supported Dishwashing',
        description: 'Child practices dishwashing with guidance',
        steps: [
          'Help child adjust water temperature',
          'Guide proper washing order',
          'Assist with thorough scrubbing technique',
          'Check that all soap is rinsed away',
          'Praise careful handling of dishes'
        ],
        supportStrategies: [
          'Start with plastic or unbreakable dishes',
          'Use step stool for comfortable height',
          'Demonstrate proper scrubbing technique',
          'Celebrate clean, sparkling results'
        ],
        duration: '20-30 minutes per session'
      },
      independentPractice: {
        title: 'Independent Dish Care',
        description: 'Child washes dishes without assistance',
        indicators: [
          'Prepares washing station independently',
          'Washes dishes in proper order',
          'Rinses thoroughly and completely',
          'Dries and puts away dishes properly'
        ],
        troubleshooting: [
          'If dishes not clean: review scrubbing technique',
          'If soap residue remains: emphasize rinsing',
          'If breaking dishes: return to guided practice',
          'If avoiding task: make it more enjoyable'
        ],
        duration: '15-25 minutes per session'
      },
      mastery: {
        title: 'Household Responsibility Mastery',
        description: 'Child demonstrates complete competence in dish care',
        assessmentCriteria: [
          'Washes dishes to sparkling cleanliness',
          'Handles all dishes carefully and safely',
          'Takes initiative to wash dirty dishes',
          'Shows pride in contributing to household'
        ],
        indicators: [
          'Offers to wash dishes after meals',
          'Maintains clean dish-washing area',
          'Teaches dishwashing to others',
          'Shows appreciation for clean dishes'
        ]
      },
      extensions: {
        title: 'Advanced Kitchen Skills',
        description: 'Extended activities in kitchen care and responsibility',
        activities: [
          'Learning to wash different types of dishes',
          'Understanding water conservation',
          'Organizing dish storage systems',
          'Learning about dish materials and care',
          'Coordinating with meal preparation'
        ],
        variations: [
          'Hand washing vs dishwasher loading',
          'Different cleaning agents for different items',
          'Care of special dishes and serving pieces',
          'Seasonal deep cleaning of kitchen items'
        ]
      }
    }
  },

  'watering-plants': {
    id: 'watering-plants',
    title: 'Watering Plants',
    description: 'Learn to care for living plants through proper watering technique',
    purpose: 'Develops care for living things, responsibility, and environmental awareness',
    ageRange: '2.5-5 years',
    difficulty: 'Beginner',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🪴',
    materials: ['Small watering can', 'Water', 'Plants', 'Towel for spills', 'Tray'],
    materialsPurpose: [
      'Small watering can: Child-sized with controlled pour spout',
      'Water: Room temperature, clean water',
      'Plants: Variety of plants needing different care',
      'Towel: For cleaning spills and excess water',
      'Tray: Protects surfaces and contains activity'
    ],
    directAims: [
      'Learn proper plant watering technique',
      'Develop care for living things',
      'Understand plant needs and growth'
    ],
    indirectAims: [
      'Foster environmental responsibility',
      'Build nurturing instincts',
      'Develop observation skills',
      'Connect with natural world'
    ],
    controlOfError: [
      'Visual check of soil moisture',
      'Plant health and appearance',
      'Water drainage from pots',
      'Adult guidance about plant needs'
    ],
    learningProcess: {
      presentation: {
        title: 'Plant Watering Demonstration',
        description: 'Teacher demonstrates caring plant watering process',
        steps: [
          'Fill watering can with room temperature water',
          'Observe plant to assess watering needs',
          'Check soil moisture with finger',
          'Water slowly at base of plant, not leaves',
          'Stop when soil is moist but not soggy',
          'Allow excess water to drain',
          'Clean up any spills with towel',
          'Return watering can to proper place',
          'Observe plant appreciation for water',
          'Record or remember when plant was watered'
        ],
        keyPoints: [
          'Check soil moisture before watering',
          'Water slowly to allow soil absorption',
          'Avoid watering leaves to prevent disease',
          'Different plants need different amounts'
        ],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Plant Care',
        description: 'Child waters plants with teacher guidance',
        steps: [
          'Help child assess plant watering needs',
          'Guide proper watering technique',
          'Teach recognition of plant health signs',
          'Assist with cleanup and care',
          'Celebrate healthy, happy plants'
        ],
        supportStrategies: [
          'Start with plants that need daily water',
          'Use clear containers to see soil moisture',
          'Create watering schedule chart',
          'Point out positive plant responses'
        ],
        duration: '10-15 minutes per session'
      },
      independentPractice: {
        title: 'Independent Plant Care',
        description: 'Child cares for plants without assistance',
        indicators: [
          'Assesses plant needs independently',
          'Waters appropriately without over/under-watering',
          'Cleans up spills and maintains area',
          'Shows concern for plant health'
        ],
        troubleshooting: [
          'If over-watering: teach soil moisture testing',
          'If under-watering: create reminder system',
          'If plant declining: review care technique',
          'If losing interest: vary plant types'
        ],
        duration: '8-15 minutes per session'
      },
      mastery: {
        title: 'Plant Care Expertise',
        description: 'Child demonstrates understanding of plant needs and care',
        assessmentCriteria: [
          'Maintains healthy, thriving plants',
          'Recognizes different plant watering needs',
          'Takes initiative in plant care',
          'Shows deep appreciation for living things'
        ],
        indicators: [
          'Establishes routine plant care schedule',
          'Notices and responds to plant problems',
          'Seeks to learn about different plants',
          'Takes pride in plant growth and health'
        ]
      },
      extensions: {
        title: 'Advanced Plant Care and Botany',
        description: 'Extended activities in plant care and botanical learning',
        activities: [
          'Learning different plant species and needs',
          'Starting plants from seeds',
          'Transplanting and repotting',
          'Learning about plant parts and growth',
          'Creating plant care schedules and charts'
        ],
        variations: [
          'Indoor vs outdoor plant care',
          'Different watering methods and tools',
          'Seasonal plant care adjustments',
          'Caring for flowering vs foliage plants',
          'Propagating plants for gifts'
        ]
      }
    }
  }
};