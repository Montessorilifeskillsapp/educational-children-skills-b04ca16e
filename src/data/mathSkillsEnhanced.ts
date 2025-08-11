import { MathSkillData } from './mathSkills';

// Enhanced math skills with complete information
export const enhancedMathSkills: Record<string, MathSkillData> = {
  'golden-beads': {
    title: 'Golden Beads',
    description: 'Introduction to the decimal system using concrete materials',
    purpose: 'To give the child a sensorial impression of quantity in the decimal system and prepare for the four operations through concrete manipulation of hierarchical materials.',
    materials: ['Unit beads', 'Ten bars', 'Hundred squares', 'Thousand cubes', 'Number cards'],
    materialsPurpose: [
      'Unit beads: Represent the concept of "one" - individual quantities',
      'Ten bars: Show that 10 units make one ten - linear representation',
      'Hundred squares: Demonstrate 10 tens make one hundred - square representation', 
      'Thousand cubes: Illustrate 10 hundreds make one thousand - cubic representation',
      'Number cards: Connect concrete quantities to abstract symbols'
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
      'Practice subtraction: Take away quantities and count what remains'
    ],
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: true,
    icon: '🟡',
    objectives: ['Understand decimal system', 'Learn place value', 'Concrete to abstract thinking'],
    extensions: ['Large number formation', 'Four operations']
  },

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
    objectives: ['Reinforce counting', 'Understand zero concept', 'Practice bundling'],
    extensions: ['Skip counting', 'Odd and even numbers']
  }
};