import { MathSkillData } from './mathSkills';

export const completeMathSkills: Record<string, MathSkillData> = {
  'number-rods': {
    title: 'Number Rods',
    description: 'Introduction to quantity and the sequence of numbers 1-10',
    purpose: 'To provide a concrete sensorial impression of quantity and introduce the child to the sequence of numbers 1-10, building foundation for mathematical understanding through visual and tactile experience.',
    materials: ['Red and blue number rods', 'Number cards 1-10', 'Floor mat'],
    materialsPurpose: [
      'Red and blue number rods: Provide visual representation of quantity with alternating colors to aid counting',
      'Number cards 1-10: Connect abstract symbols to concrete quantities',
      'Floor mat: Provides defined workspace for rod arrangement'
    ],
    steps: [
      'Lay out the rods in order from shortest to longest',
      'Count each section on each rod',
      'Match number cards to corresponding rods',
      'Practice building the stair pattern'
    ],
    detailedSteps: [
      'Invite the child to carry the rods one by one to the mat, starting with the longest rod',
      'Place the rods in random order, then guide the child to arrange them from shortest to longest',
      'Point to each red and blue section while counting aloud: "one, two, three..." for each rod',
      'Introduce number cards by placing them at the end of each corresponding rod',
      'Practice the three-period lesson: "This is one, this is two..." / "Show me three" / "What is this?"',
      'Encourage the child to build the stair pattern independently and count each rod'
    ],
    ageRange: '3-5 years',
    difficulty: 'Beginner',
    category: 'Mathematics',
    isPremium: false,
    icon: '📏',
    videoUrl: '/videos/number-rods.mp4',
    imageUrl: '/images/number-rods.jpg',
    objectives: [
      'Understand quantity 1-10',
      'Learn number sequence',
      'Develop counting skills',
      'Prepare for addition and subtraction',
      'Develop visual discrimination of length'
    ],
    extensions: [
      'Add and subtract with rods',
      'Create patterns with rods',
      'Measure objects using rods',
      'Introduction to fractions'
    ]
  },

  'golden-beads': {
    title: 'Golden Beads',
    description: 'Introduction to the decimal system using concrete materials',
    purpose: 'To give the child a sensorial impression of quantity in the decimal system and prepare for the four operations through concrete manipulation of hierarchical materials.',
    materials: ['Unit beads', 'Ten bars', 'Hundred squares', 'Thousand cubes', 'Number cards', 'Trays'],
    materialsPurpose: [
      'Unit beads: Represent the concept of "one" - individual quantities',
      'Ten bars: Show that 10 units make one ten - linear representation',
      'Hundred squares: Demonstrate 10 tens make one hundred - square representation', 
      'Thousand cubes: Illustrate 10 hundreds make one thousand - cubic representation',
      'Number cards: Connect concrete quantities to abstract symbols',
      'Trays: Organize and transport materials systematically'
    ],
    steps: [
      'Present units, tens, hundreds, thousands',
      'Show the exchange: 10 units = 1 ten bar',
      'Practice forming numbers with beads',
      'Introduce addition and subtraction'
    ],
    detailedSteps: [
      'Present each hierarchy separately: "This is one unit, this is one ten, this is one hundred, this is one thousand"',
      'Demonstrate exchanges: Show how 10 units can be exchanged for 1 ten bar',
      'Practice the bank game: Child requests quantities and adult provides the beads',
      'Form numbers: Ask child to make specific numbers using the golden beads',
      'Introduce simple addition: Combine two quantities and count the result',
      'Practice subtraction: Take away quantities and count what remains',
      'Progress to multiplication and division with advanced students'
    ],
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: true,
    icon: '🟡',
    videoUrl: '/videos/golden-beads.mp4',
    imageUrl: '/images/golden-beads.jpg',
    objectives: [
      'Understand decimal system',
      'Learn place value concept',
      'Develop concrete to abstract thinking',
      'Prepare for four operations',
      'Build number sense'
    ],
    extensions: [
      'Large number formation (thousands)',
      'Four operations with golden beads',
      'Exchange games',
      'Static and dynamic addition/subtraction'
    ]
  }
};