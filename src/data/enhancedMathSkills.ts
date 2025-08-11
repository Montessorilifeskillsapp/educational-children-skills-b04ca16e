import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const enhancedMathSkills: Record<string, EnhancedMontessoriSkill> = {
  'number-rods': {
    id: 'number-rods',
    title: 'Number Rods',
    description: 'Introduction to quantity 1-10 using concrete materials',
    purpose: 'Introduce the concept of quantity and sequence of numbers 1-10',
    ageRange: '3-5 years',
    difficulty: 'Beginner',
    category: 'Mathematics',
    isPremium: false,
    icon: '📏',
    materials: ['Set of 10 red and blue number rods', 'Number cards 1-10', 'Floor mat'],
    materialsPurpose: [
      'Number rods: Concrete representation of quantities 1-10',
      'Number cards: Connect symbols to quantities',
      'Floor mat: Provides workspace and defines activity area'
    ],
    directAims: [
      'Learn quantities 1-10',
      'Understand sequence and order',
      'Develop visual discrimination of length'
    ],
    indirectAims: [
      'Prepare for addition and subtraction',
      'Develop mathematical mind',
      'Build concentration and order',
      'Prepare for decimal system'
    ],
    controlOfError: [
      'Visual: rods increase in length progressively',
      'Physical: rods must fit in order on mat',
      'Auditory: counting sequence must match rod length'
    ],
    learningProcess: {
      presentation: {
        title: 'First Presentation',
        description: 'Introduce the rods and establish the concept of quantity',
        steps: [
          'Invite child: "Would you like to work with the number rods?"',
          'Unroll floor mat in quiet area',
          'Bring rods one at a time, starting with shortest',
          'Place rods in random order on mat',
          'Begin with shortest rod: "This is one"',
          'Count each section while touching: "One"',
          'Continue with next rod: "This is two. One, two"',
          'Build sequence 1-10, counting each rod',
          'Point out the pattern: each rod is one unit longer'
        ],
        keyPoints: [
          'Touch each section while counting',
          'Emphasize the quantity, not just the name',
          'Move slowly and deliberately',
          'Maintain child\'s attention on the counting'
        ],
        duration: '15-20 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices building and counting with support',
        steps: [
          'Mix up rods and invite child to build the stair',
          'Guide child to find the shortest rod first',
          'Support counting of each rod section',
          'Help child notice the pattern of increasing length',
          'Introduce "What comes next?" questioning',
          'Practice identifying rods by quantity'
        ],
        supportStrategies: [
          'Point to sections if child loses count',
          'Use "Show me five" type requests',
          'Help child self-correct by comparing lengths',
          'Encourage touching while counting'
        ],
        duration: '20-25 minutes per session'
      },
      independentPractice: {
        title: 'Independent Work',
        description: 'Child works independently with the number rods',
        indicators: [
          'Builds the stair correctly without help',
          'Counts each rod accurately',
          'Self-corrects when rods are out of order',
          'Shows sustained concentration'
        ],
        troubleshooting: [
          'If miscounting: return to touching each section',
          'If building incorrectly: ask "Does this look right?"',
          'If losing interest: introduce number cards',
          'If rushing: remind to count carefully'
        ],
        duration: '25-30 minutes per session'
      },
      mastery: {
        title: 'Mastery Achievement',
        description: 'Child demonstrates complete understanding of quantities 1-10',
        assessmentCriteria: [
          'Builds number rod stair accurately',
          'Counts each rod without errors',
          'Identifies any rod by its quantity',
          'Explains the pattern of increasing length'
        ],
        indicators: [
          'Child teaches activity to others',
          'Requests more challenging math materials',
          'Shows confidence with numbers 1-10',
          'Makes connections to other counting activities'
        ]
      },
      extensions: {
        title: 'Extension Work',
        description: 'Advanced activities building on number rod foundation',
        activities: [
          'Number rods and cards combination',
          'Addition with number rods',
          'Subtraction with number rods',
          'Odd and even with number rods',
          'Measurement activities using rods'
        ],
        variations: [
          'Building the stair backwards (10 to 1)',
          'Finding missing rods in sequence',
          'Comparing rods to real objects',
          'Creating patterns with multiple sets'
        ]
      }
    },
    videoUrl: '/videos/number-rods.mp4',
    imageUrl: '/images/number-rods.jpg'
  }
};