import { MathSkillData } from './mathSkills';

export const advancedMathSkills: Record<string, MathSkillData> = {
  'spindle-box': {
    title: 'Spindle Box',
    description: 'Reinforcement of quantities 0-9 and introduction to zero',
    purpose: 'To reinforce the association of quantity and symbol for numbers 0-9, introduce the concept of zero as "nothing," and develop precise counting skills.',
    materials: ['Spindle box with compartments 0-9', '45 spindles', 'Rubber bands'],
    materialsPurpose: [
      'Spindle box with compartments: Provides organized space for each quantity 0-9',
      '45 spindles: Exact quantity needed for all numbers 0-9 (0+1+2+3+4+5+6+7+8+9=45)',
      'Rubber bands: Used to bundle each set of spindles as a cohesive unit'
    ],
    steps: [
      'Count out correct number of spindles for each compartment',
      'Bundle spindles with rubber bands', 
      'Emphasize that zero means nothing',
      'Practice counting and bundling'
    ],
    detailedSteps: [
      'Start with compartment 1: Count out one spindle and place in compartment',
      'Continue with compartment 2: Count "one, two" and bundle with rubber band',
      'Proceed through all compartments, always counting aloud',
      'Emphasize compartment 0: "Zero means nothing - no spindles go here"',
      'Bundle each set of spindles except zero with a rubber band',
      'Practice by removing all spindles and repeating the exercise'
    ],
    ageRange: '3-5 years',
    difficulty: 'Beginner', 
    category: 'Mathematics',
    isPremium: false,
    icon: '📦',
    videoUrl: '/videos/spindle-box.mp4',
    imageUrl: '/images/spindle-box.jpg',
    objectives: [
      'Reinforce counting skills',
      'Understand zero concept',
      'Practice bundling and organization',
      'Associate quantity with symbol',
      'Develop fine motor skills'
    ],
    extensions: [
      'Skip counting by 2s, 5s, 10s',
      'Odd and even number exploration',
      'Greater than/less than concepts',
      'Simple addition with spindles'
    ]
  },

  'cards-counters': {
    title: 'Cards and Counters',
    description: 'Introduction to odd and even numbers using counters',
    purpose: 'To introduce the concept of odd and even numbers through concrete manipulation, reinforce counting skills, and develop understanding of number relationships.',
    materials: ['Number cards 1-10', '55 red counters', 'Floor mat'],
    materialsPurpose: [
      'Number cards 1-10: Provide visual symbols for quantities',
      '55 red counters: Exact quantity needed for numbers 1-10 (1+2+3+...+10=55)',
      'Floor mat: Defines workspace and organizes materials'
    ],
    steps: [
      'Lay out number cards in sequence',
      'Count out counters for each number',
      'Arrange counters in pairs under each card',
      'Identify odd numbers (with one left over)'
    ],
    detailedSteps: [
      'Place number cards 1-10 in sequence on the mat',
      'Start with card 1: Place one counter below it',
      'Continue with card 2: Place two counters in a pair below it',
      'For each subsequent card, count out the correct number of counters',
      'Arrange counters in pairs, noting when one is left over',
      'Introduce vocabulary: "Even numbers make pairs, odd numbers have one left over"',
      'Practice identifying odd and even numbers'
    ],
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: true,
    icon: '🔴',
    videoUrl: '/videos/cards-counters.mp4',
    imageUrl: '/images/cards-counters.jpg',
    objectives: [
      'Learn odd and even concepts',
      'Practice accurate counting',
      'Understand pairing and grouping',
      'Develop pattern recognition',
      'Strengthen number sequence knowledge'
    ],
    extensions: [
      'Skip counting by 2s (even numbers)',
      'Pattern recognition activities',
      'Introduction to multiplication concepts',
      'Sorting activities with odd/even'
    ]
  }
};