import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const concisePracticalLifeSkills: Record<string, EnhancedMontessoriSkill> = {
  'pouring-water': {
    id: 'pouring-water',
    title: 'Pouring Water',
    description: 'Pour water between containers with precision',
    purpose: 'Develop hand-eye coordination and concentration',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Practical Life',
    isPremium: false,
    icon: '💧',
    shopItems: ['pouring-set'],
    materialsPurpose: [
      'Two identical pitchers: One source, one receiving',
      'Colored water: Visible spills and progress',
      'Tray: Contains activity',
      'Sponge: Independent cleanup'
    ],
    directAims: [
      'Master pouring technique',
      'Develop hand control',
      'Build concentration'
    ],
    indirectAims: [
      'Prepare for food activities',
      'Develop independence',
      'Care for environment'
    ],
    controlOfError: [
      'Visible spills',
      'Sound feedback',
      'Water level changes',
      'Self-correction with sponge'
    ],
    learningProcess: {
      presentation: {
        title: 'Pouring Demonstration',
        description: 'Show complete pouring sequence',
        steps: [
          'Carry tray to table',
          'Grip pitcher handles firmly',
          'Pour steadily between pitchers',
          'Pour back to original',
          'Clean spills immediately',
          'Return materials'
        ],
        keyPoints: [
          'Move slowly',
          'Steady grip',
          'Control flow',
          'Clean up'
        ],
        duration: '3-5 minutes'
      },
      guidedPractice: {
        title: 'Guided Pouring',
        description: 'Support child practice',
        steps: [
          'Guide tray carrying',
          'Support hand placement',
          'Encourage slow movement',
          'Help with cleanup'
        ],
        supportStrategies: [
          'Hand-over-hand guidance',
          'Reduce water amount',
          'Verbal cues for speed',
          'Model cleanup'
        ],
        duration: '8-12 minutes'
      },
      independentPractice: {
        title: 'Independent Pouring',
        description: 'Child works alone',
        indicators: [
          'Chooses activity independently',
          'Pours with control',
          'Cleans spills alone',
          'Returns materials properly'
        ],
        troubleshooting: [
          'Reduce water if spilling',
          'Remind to slow down',
          'Encourage cleanup',
          'Vary water color'
        ],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Pouring Mastery',
        description: 'Complete competence achieved',
        assessmentCriteria: [
          'Pours without spills',
          'Maintains focus',
          'Cleans independently',
          'Shows material care'
        ],
        indicators: [
          'Repeats activity multiple times',
          'Teaches others',
          'Seeks challenges',
          'Shows pride'
        ]
      },
      extensions: {
        title: 'Advanced Pouring',
        description: 'Challenging variations',
        activities: [
          'Smaller containers',
          'Pour rice or beans',
          'Use funnel',
          'Multiple containers',
          'Measure while pouring'
        ],
        variations: [
          'Different pitcher sizes',
          'Various safe liquids',
          'Outdoor activities',
          'Cooking preparation'
        ]
      }
    },
    videoUrl: '/videos/pouring-water.mp4',
    imageUrl: '/images/pouring-water.jpg'
  },

  'table-setting': {
    id: 'table-setting',
    title: 'Table Setting',
    description: 'Prepare table for meals with proper placement',
    purpose: 'Develop order, sequence, and dining preparation',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🍽️',
    shopItems: ['child-table-setting'],
    directAims: [
      'Learn table setting sequence',
      'Develop spatial awareness',
      'Handle items carefully'
    ],
    indirectAims: [
      'Prepare for social dining',
      'Build hosting confidence',
      'Strengthen coordination'
    ],
    controlOfError: [
      'Placemat guides positioning',
      'Visual comparison',
      'Items show fit errors',
      'Adult modeling available'
    ],
    learningProcess: {
      presentation: {
        title: 'Table Setting Demo',
        description: 'Show complete setting sequence',
        steps: [
          'Place placemat flat',
          'Center plate on mat',
          'Fork left of plate',
          'Knife right, blade inward',
          'Cup above knife',
          'Fold napkin neatly',
          'Add flower decoration'
        ],
        keyPoints: [
          'Move with purpose',
          'Handle carefully',
          'Create beauty',
          'Check alignment'
        ],
        duration: '5-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Setting',
        description: 'Practice with guidance',
        steps: [
          'Guide material choice',
          'Support placement',
          'Encourage observation',
          'Help with clearing'
        ],
        supportStrategies: [
          'Gentle verbal cues',
          'Point without touching',
          'Encourage self-correction',
          'Focus on beauty'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Setting',
        description: 'Set tables alone',
        indicators: [
          'Chooses activity spontaneously',
          'Carries materials carefully',
          'Places logically',
          'Shows pride in result'
        ],
        troubleshooting: [
          'Remind about beauty',
          'Provide visual reference',
          'Demonstrate gentle touch',
          'Add color variations'
        ],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Setting Expertise',
        description: 'Complete competence',
        assessmentCriteria: [
          'Sets accurately',
          'Handles gracefully',
          'Shows aesthetic sense',
          'Adapts to variations'
        ],
        indicators: [
          'Sets for multiple people',
          'Teaches others',
          'Creates variations',
          'Shows meal joy'
        ]
      },
      extensions: {
        title: 'Advanced Setting',
        description: 'Complex table preparation',
        activities: [
          'Multiple place settings',
          'Different meal types',
          'Serving dishes',
          'Special occasions',
          'Teaching others'
        ],
        variations: [
          'Cultural styles',
          'Outdoor picnics',
          'Formal dinners',
          'Tea parties'
        ]
      }
    },
    videoUrl: '/videos/table-setting.mp4',
    imageUrl: '/images/table-setting.jpg'
  },

  'hand-washing': {
    id: 'hand-washing',
    title: 'Hand Washing',
    description: 'Master proper handwashing for health and independence',
    purpose: 'To develop independence, order, sequencing, and care of self',
    ageRange: '2-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🧼',
    directAims: [
      'Learn proper washing sequence',
      'Develop self-care independence',
      'Master hygiene technique'
    ],
    indirectAims: [
      'Build daily routines',
      'Develop order and sequence',
      'Foster health awareness',
      'Prepare for food preparation'
    ],
    controlOfError: [
      'Soap lather visibility',
      'Clean vs dirty sensation',
      'Water clarity changes',
      'Tray organization'
    ],
    learningProcess: {
      presentation: {
        title: 'Hand Washing Presentation',
        description: 'Present slowly and silently to model the process',
        steps: [
          '1. Roll up your sleeves - Gently push sleeves up so they don\'t get wet',
          '2. Pour water into basin - Use small pitcher to pour a little water',
          '3. Wet your hands - Dip both hands into water, make sure they get wet all over',
          '4. Rub the soap - Pick up bar of soap and rub between hands to make bubbles',
          '5. Wash your hands - Rub palms, backs of hands, between fingers, and thumbs',
          '6. Scrub with nail brush - If using, gently brush nails to clean under them',
          '7. Rinse your hands - Dip hands back into water to rinse off soap',
          '8. Dry your hands - Use towel to dry hands carefully',
          '9. Empty the basin - Carry basin to sink and pour out water',
          '10. Wipe the area - Use sponge or cloth to wipe tray or table dry'
        ],
        keyPoints: [
          'Use real materials, not toys',
          'Present silently first time',
          'Move slowly and deliberately',
          'Left-to-right material order'
        ],
        duration: '5-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Practice',
        description: 'Guide child through sequence with minimal intervention',
        steps: [
          'Observe child\'s technique',
          'Guide gently if needed'
        ],
        supportStrategies: [
          'Point to next material',
          'Demonstrate specific step if needed',
          'Encourage thoroughness',
          'Allow repetition'
        ],
        duration: '8-12 minutes'
      },
      independentPractice: {
        title: 'Independent Washing',
        description: 'Child completes activity alone',
        indicators: [
          'Follows complete sequence',
          'Handles materials carefully',
          'Cleans area thoroughly'
        ],
        troubleshooting: [
          'Return to presentation if confused',
          'Ensure materials are accessible',
          'Check water temperature',
          'Replenish materials as needed'
        ],
        duration: '6-10 minutes'
      },
      mastery: {
        title: 'Washing Mastery',
        description: 'Complete independence achieved',
        assessmentCriteria: [
          'Initiates washing when needed',
          'Completes full sequence',
          'Maintains clean workspace',
          'Shows care for materials'
        ],
        indicators: [
          'Chooses activity regularly',
          'Demonstrates to others',
          'Applies to daily routines',
          'Shows pride in cleanliness'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced applications',
        activities: [
          'Washing different objects',
          'Teaching younger children',
          'Preparing for food work',
          'Cultural hand washing practices'
        ],
        variations: [
          'Different soap types',
          'Warm vs cool water',
          'Various bowl sizes',
          'Outdoor washing station'
        ]
      }
    },
    videoUrl: '/videos/hand-washing.mp4',
    imageUrl: '/images/hand-washing.jpg'
  },

  'brushing-teeth': {
    id: 'brushing-teeth',
    title: 'Montessori Teeth Brushing',
    description: 'Child-centered practical life steps for independent teeth brushing',
    purpose: 'To support independence, sequencing, care of the body, and the development of healthy daily routines',
    ageRange: '2-6 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🪥',
    materials: [
      'Child toothbrush',
      'Child toothpaste',
      'Water cup',
      'Mirror',
      'Towel or cloth'
    ],
    materialsPurpose: [
      'Toothbrush: Child-sized for proper handling',
      'Toothpaste: Gentle formula for children',
      'Cup: For rinsing and water access',
      'Mirror: Visual feedback for technique',
      'Towel: For drying mouth and cleanup'
    ],
    directAims: [
      'Learn proper brushing sequence',
      'Develop oral hygiene habits',
      'Build independence in self-care'
    ],
    indirectAims: [
      'Foster health awareness',
      'Develop fine motor coordination',
      'Build responsibility for body care',
      'Strengthen sequential thinking'
    ],
    controlOfError: [
      'Mirror provides visual feedback',
      'Clean teeth taste indicates thoroughness',
      'Organized materials guide sequence',
      'Adult modeling when needed'
    ],
    learningProcess: {
      presentation: {
        title: 'Teeth Brushing Demonstration',
        description: 'Show complete child-friendly sequence',
        steps: [
          '1️⃣ Pick up your toothbrush - Use one hand to hold the brush and the other to steady the cup or counter',
          '2️⃣ Squeeze a small bit of toothpaste - Gently squeeze a tiny dot onto the bristles — just a pea-sized amount',
          '3️⃣ Wet the brush - Dip the brush into the cup of water or briefly under running water',
          '4️⃣ Brush your teeth slowly - Start with your front teeth using small circles, then brush the sides and back teeth, including the inside',
          '5️⃣ Brush your tongue - Gently brush your tongue from back to front to make your mouth feel fresh',
          '6️⃣ Spit into the sink or cup - Lean forward and spit the toothpaste foam carefully',
          '7️⃣ Rinse your mouth - Take a small sip of water, swish it gently, and spit it out',
          '8️⃣ Rinse the toothbrush - Hold the brush under water and rinse until clean',
          '9️⃣ Wipe your mouth - Use your towel or cloth to gently dry around your mouth',
          '🔟 Put everything away - Place the toothbrush and cup back in their places'
        ],
        keyPoints: [
          'Move slowly and carefully',
          'Use gentle circular motions',
          'Clean all tooth surfaces',
          'Keep everything organized'
        ],
        duration: '5-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Brushing Practice',
        description: 'Practice sequence with gentle guidance',
        steps: [
          'Guide toothbrush holding technique',
          'Support proper circular motions',
          'Encourage complete sequence',
          'Help with material organization'
        ],
        supportStrategies: [
          'Gentle verbal reminders',
          'Point to next step without touching',
          'Encourage self-correction',
          'Celebrate small successes'
        ],
        duration: '8-12 minutes'
      },
      independentPractice: {
        title: 'Independent Teeth Brushing',
        description: 'Complete routine alone with confidence',
        indicators: [
          'Follows all 10 steps in sequence',
          'Uses appropriate amount of toothpaste',
          'Brushes thoroughly and gently',
          'Maintains clean workspace'
        ],
        troubleshooting: [
          'Visual step cards if sequence forgotten',
          'Timer for adequate brushing duration',
          'Return to guided practice if needed',
          'Focus on one challenging step at a time'
        ],
        duration: '5-8 minutes'
      },
      mastery: {
        title: 'Oral Care Independence',
        description: 'Confident, consistent dental hygiene routine',
        assessmentCriteria: [
          'Initiates brushing without reminders',
          'Demonstrates proper technique consistently',
          'Maintains twice-daily routine',
          'Takes pride in oral health'
        ],
        indicators: [
          'Teaches technique to others',
          'Asks questions about dental health',
          'Shows responsibility for oral care',
          'Seeks to improve technique'
        ]
      },
      extensions: {
        title: 'Advanced Oral Care Activities',
        description: 'Expanding dental health awareness',
        activities: [
          'Create brushing time charts',
          'Learn about different types of teeth',
          'Practice brushing dolls or stuffed animals',
          'Explore healthy foods for teeth'
        ],
        variations: [
          'Morning vs evening routines',
          'Different toothbrush types exploration',
          'Introduction to flossing concepts',
          'Cultural dental care practices'
        ]
      }
    }
  },

  'spooning-beans': {
    id: 'spooning-beans',
    title: 'Spooning Beans',
    description: 'Transfer objects with precision',
    purpose: 'Develop fine motor control and concentration',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Control of Movement',
    isPremium: false,
    icon: '🥄',
    materials: ['Two bowls', 'Spoon', 'Dried beans', 'Tray'],
    materialsPurpose: [
      'Bowls: Source and receiving',
      'Spoon: Child-sized grip',
      'Beans: Safe transfer objects',
      'Tray: Activity containment'
    ],
    directAims: [
      'Master spooning technique',
      'Improve fine motor control',
      'Practice precise transfer'
    ],
    indirectAims: [
      'Develop concentration',
      'Prepare eating skills',
      'Build movement confidence',
      'Care for materials'
    ],
    controlOfError: [
      'Visible/audible drops',
      'Empty bowl progress',
      'Tray catches spills',
      'Bean counting'
    ],
    learningProcess: {
      presentation: {
        title: 'Spooning Demo',
        description: 'Show proper technique',
        steps: [
          'Position tray on table',
          'Grip spoon correctly',
          'Scoop beans carefully',
          'Transfer to second bowl',
          'Pick up dropped beans',
          'Return to original bowl'
        ],
        keyPoints: [
          'Proper grip',
          'Careful scooping',
          'Deliberate movement',
          'Immediate cleanup'
        ],
        duration: '3-5 minutes'
      },
      guidedPractice: {
        title: 'Supported Spooning',
        description: 'Practice with help',
        steps: [
          'Position materials',
          'Guide spoon grip',
          'Encourage slow movement',
          'Help cleanup'
        ],
        supportStrategies: [
          'Larger beans first',
          'Hand-over-hand grip',
          'Count together',
          'Demo cleanup'
        ],
        duration: '8-12 minutes'
      },
      independentPractice: {
        title: 'Independent Spooning',
        description: 'Transfer alone',
        indicators: [
          'Correct grip',
          'Increasing accuracy',
          'Independent cleanup',
          'Focused completion'
        ],
        troubleshooting: [
          'Reduce scoop size',
          'Return to guided practice',
          'Count for motivation',
          'Praise persistence'
        ],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Spooning Mastery',
        description: 'Complete competence',
        assessmentCriteria: [
          'Transfers without drops',
          'Maintains concentration',
          'Works independently',
          'Shows material care'
        ],
        indicators: [
          'Chooses activity regularly',
          'Seeks challenges',
          'Demonstrates to others',
          'Applies to eating'
        ]
      },
      extensions: {
        title: 'Advanced Transfer',
        description: 'Challenging variations',
        activities: [
          'Smaller objects',
          'Different utensils',
          'Liquid spooning',
          'Sorting while spooning',
          'Timed transfers'
        ],
        variations: [
          'Various spoon sizes',
          'Different containers',
          'Outdoor activities',
          'Cooking preparation'
        ]
      }
    }
  }
};