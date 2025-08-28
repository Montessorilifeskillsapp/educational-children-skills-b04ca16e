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
    description: 'Master proper handwashing for health',
    purpose: 'Develop hygiene habits and independence',
    ageRange: '2-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🧼',
    materials: [
      'Child washbasin',
      'Pitcher with warm water',
      'Soap',
      'Clean towel',
      'Sponge',
      'Apron'
    ],
    materialsPurpose: [
      'Washbasin: Right size for independence',
      'Pitcher: Controlled water amount',
      'Soap: Effective cleaning',
      'Towel: Proper drying',
      'Sponge: Gentle cleaning',
      'Apron: Clothing protection'
    ],
    directAims: [
      'Learn washing sequence',
      'Develop hygiene independence',
      'Understand cleanliness'
    ],
    indirectAims: [
      'Build self-care habits',
      'Develop coordination',
      'Foster health awareness',
      'Prepare for food activities'
    ],
    controlOfError: [
      'Soap lather visibility',
      'Clean vs dirty feel',
      'Mirror feedback',
      'Adult guidance'
    ],
    learningProcess: {
      presentation: {
        title: 'Handwashing Demo',
        description: 'Show complete sequence',
        steps: [
          'Put on apron',
          'Pour water in basin',
          'Wet hands completely',
          'Apply soap, create lather',
          'Scrub all surfaces',
          'Rinse thoroughly',
          'Dry hands completely',
          'Empty basin',
          'Clean workspace'
        ],
        keyPoints: [
          'Gentle movements',
          'Cover all surfaces',
          'Rinse completely',
          'Dry thoroughly'
        ],
        duration: '4-6 minutes'
      },
      guidedPractice: {
        title: 'Supported Washing',
        description: 'Practice with help',
        steps: [
          'Guide through sequence',
          'Check hand coverage'
        ],
        supportStrategies: [
          'Counting songs',
          'Hand-over-hand',
          'Visual reminders',
          'Positive reinforcement'
        ],
        duration: '6-10 minutes'
      },
      independentPractice: {
        title: 'Independent Washing',
        description: 'Wash alone',
        indicators: [
          'Complete independently'
        ],
        troubleshooting: [
          'Use timer if rushing',
          'Visual guides for missed areas',
          'Show proper soap amount',
          'Model cleanup'
        ],
        duration: '4-6 minutes'
      },
      mastery: {
        title: 'Hygiene Independence',
        description: 'Complete competence',
        assessmentCriteria: [
          'Washes when needed',
          'Proper technique',
          'Clean hands maintained',
          'Teaches others'
        ],
        indicators: [
          'Initiates before meals',
          'Washes after bathroom',
          'Recognizes need',
          'Shows pride'
        ]
      },
      extensions: {
        title: 'Hygiene Extensions',
        description: 'Advanced hygiene concepts',
        activities: [
          'Germ experiments',
          'Teaching dolls',
          'Hygiene charts',
          'Different soaps'
        ],
        variations: [
          'Different settings',
          'Cultural practices',
          'Seasonal considerations',
          'Community health'
        ]
      }
    }
  },

  'brushing-teeth': {
    id: 'brushing-teeth',
    title: 'Brushing Teeth',
    description: 'Learn proper dental hygiene',
    purpose: 'Establish oral health habits',
    ageRange: '2-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🦷',
    materials: [
      'Child toothbrush',
      'Child toothpaste',
      'Water cup',
      'Mirror',
      'Towel'
    ],
    materialsPurpose: [
      'Toothbrush: Proper size',
      'Toothpaste: Age-appropriate',
      'Cup: Controlled rinsing',
      'Mirror: Visual feedback',
      'Towel: Cleanup'
    ],
    directAims: [
      'Learn brushing technique',
      'Develop oral routine',
      'Build independence'
    ],
    indirectAims: [
      'Foster health awareness',
      'Develop coordination',
      'Build daily habits',
      'Advanced self-care prep'
    ],
    controlOfError: [
      'Mirror feedback',
      'Clean teeth taste',
      'Timer for duration',
      'Adult supervision'
    ],
    learningProcess: {
      presentation: {
        title: 'Tooth Brushing Demo',
        description: 'Show complete routine',
        steps: [
          'Wet toothbrush',
          'Apply pea-sized paste',
          'Brush front teeth circles',
          'Brush back teeth',
          'Clean tongue gently',
          'Rinse mouth',
          'Clean toothbrush'
        ],
        keyPoints: [
          'Gentle circles',
          'Full 2 minutes',
          'All surfaces',
          'Include tongue'
        ],
        duration: '4-6 minutes'
      },
      guidedPractice: {
        title: 'Supported Brushing',
        description: 'Practice with help',
        steps: [
          'Guide brush holding',
          'Support proper motions',
          'Encourage thoroughness',
          'Help with cleanup'
        ],
        supportStrategies: [
          'Brushing songs',
          'Hand guidance',
          'Tooth charts',
          'Positive reinforcement'
        ],
        duration: '6-10 minutes'
      },
      independentPractice: {
        title: 'Independent Brushing',
        description: 'Brush alone',
        indicators: [
          'Complete without reminders',
          'Proper technique',
          'Appropriate duration',
          'Clean area maintained'
        ],
        troubleshooting: [
          'Timer for rushing',
          'Visual guides',
          'Make enjoyable',
          'Return to guided practice'
        ],
        duration: '3-5 minutes'
      },
      mastery: {
        title: 'Oral Independence',
        description: 'Complete dental care',
        assessmentCriteria: [
          'Twice daily routine',
          'Health understanding',
          'Consistent cleanliness',
          'Appointment responsibility'
        ],
        indicators: [
          'Initiates independently',
          'Shows pride',
          'Reminds others',
          'Asks health questions'
        ]
      },
      extensions: {
        title: 'Advanced Oral Care',
        description: 'Extended dental awareness',
        activities: [
          'Dental tool learning',
          'Animal tooth brushing',
          'Healthy food exploration',
          'Brushing charts'
        ],
        variations: [
          'Different techniques',
          'Electric vs manual',
          'Flossing introduction',
          'Cultural practices'
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