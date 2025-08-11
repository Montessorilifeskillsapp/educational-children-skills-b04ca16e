import { MathSkillData } from './mathSkills';

export const additionalMathSkills: Record<string, MathSkillData> = {
  'hundred-board': {
    title: 'Hundred Board',
    description: 'Introduction to numbers 1-100 and number patterns',
    purpose: 'To introduce the sequence of numbers 1-100, develop pattern recognition, and prepare for advanced mathematical operations.',
    materials: ['Hundred board', 'Number tiles 1-100', 'Control chart'],
    materialsPurpose: [
      'Hundred board: Grid layout showing number relationships',
      'Number tiles 1-100: Individual numbers for placement',
      'Control chart: Reference for checking accuracy'
    ],
    steps: [
      'Place numbers in sequence on board',
      'Identify patterns (skip counting)',
      'Practice missing number games',
      'Explore odd/even patterns'
    ],
    detailedSteps: [
      'Start with numbers 1-10 in first row',
      'Continue placing numbers in sequence',
      'Point out patterns: "Every row ends in 0"',
      'Practice skip counting by 2s, 5s, 10s',
      'Remove random numbers for child to replace',
      'Explore vertical and horizontal patterns'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '💯',
    videoUrl: '/videos/hundred-board.mp4',
    imageUrl: '/images/hundred-board.jpg',
    objectives: [
      'Learn numbers 1-100',
      'Recognize number patterns',
      'Develop skip counting skills',
      'Understand number relationships'
    ],
    extensions: [
      'Addition and subtraction on hundred board',
      'Multiplication patterns',
      'Prime number exploration'
    ]
  },

  'addition-strip-board': {
    title: 'Addition Strip Board',
    description: 'Concrete introduction to addition facts',
    purpose: 'To provide concrete experience with addition combinations and help memorize basic addition facts through repeated practice.',
    materials: ['Addition strip board', 'Red and blue strips', 'Number cards'],
    materialsPurpose: [
      'Addition strip board: Grid for organizing addition problems',
      'Red and blue strips: Visual representation of addends',
      'Number cards: Abstract symbols for sums'
    ],
    steps: [
      'Place red strip for first addend',
      'Add blue strip for second addend',
      'Count total length for sum',
      'Record addition equation'
    ],
    detailedSteps: [
      'Choose first addend (red strip)',
      'Place red strip on board starting at 1',
      'Choose second addend (blue strip)',
      'Place blue strip continuing from red strip',
      'Count total length to find sum',
      'Write equation: 3 + 4 = 7'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '➕',
    videoUrl: '/videos/addition-strip-board.mp4',
    imageUrl: '/images/addition-strip-board.jpg',
    objectives: [
      'Learn addition facts',
      'Understand addition concept',
      'Develop mathematical reasoning',
      'Prepare for abstract addition'
    ],
    extensions: [
      'Addition fact memorization',
      'Word problems with strips',
      'Commutative property exploration'
    ]
  }
};