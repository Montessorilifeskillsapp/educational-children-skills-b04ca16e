import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const enhancedPracticalLifeSkills: Record<string, EnhancedMontessoriSkill> = {
  'pouring-water': {
    id: 'pouring-water',
    title: 'Pouring Water',
    description: 'Learn to pour water from one container to another with control and precision',
    purpose: 'Develop hand-eye coordination, concentration, and practical life skills',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Practical Life',
    isPremium: false,
    icon: '💧',
    shopItems: ['pouring-set'],
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
    },
    videoUrl: '/videos/pouring-water.mp4',
    imageUrl: '/images/pouring-water.jpg'
  }
};