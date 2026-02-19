export interface MathSkillData {
  title: string;
  description: string;
  purpose: string;
  materials: string[];
  materialsPurpose: string[];
  steps: string[];
  detailedSteps: string[];
  ageRange: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isPremium: boolean;
  icon: string;
  videoUrl?: string;
  imageUrl?: string;
  objectives: string[];
  extensions: string[];
}

// Import all math skills from separate files
import { completeMathSkills } from './completeMathSkills';
import { advancedMathSkills } from './advancedMathSkills';
import { additionalMathSkills } from './additionalMathSkills';
import { amiMathSkills } from './amiMathSkills';

// Enhanced math skills with comprehensive information
export const mathSkillsData: Record<string, MathSkillData> = {
  ...completeMathSkills,
  ...advancedMathSkills,
  ...additionalMathSkills,
  ...amiMathSkills,
  
  'teen-boards': {
    title: 'Teen Boards',
    description: 'Introduction to numbers 11-19 and teen number formation',
    purpose: 'To introduce the formation of teen numbers using the decimal system, showing how ten plus units creates the teen numbers 11-19.',
    materials: ['Teen boards', 'Golden bead ten bars and units', 'Teen number cards 11-19'],
    materialsPurpose: [
      'Teen boards: Provide structured layout for teen number formation',
      'Golden bead ten bars and units: Concrete representation of quantities',
      'Teen number cards 11-19: Connect symbols to quantities'
    ],
    steps: [
      'Place ten bar on board',
      'Add unit beads to show teen numbers',
      'Read the number formed',
      'Match with teen number cards'
    ],
    detailedSteps: [
      'Place one ten bar on the teen board',
      'Add one unit bead: "Ten and one makes eleven"',
      'Continue adding units: "Ten and two makes twelve"',
      'Practice reading each teen number formed',
      'Match corresponding number cards to quantities',
      'Emphasize the pattern: ten plus units equals teens'
    ],
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: true,
    icon: '🔢',
    videoUrl: '/videos/teen-boards.mp4',
    imageUrl: '/images/teen-boards.jpg',
    objectives: [
      'Understand teen number formation',
      'Learn numbers 11-19',
      'Connect quantity to symbol',
      'Understand decimal system application'
    ],
    extensions: [
      'Teen number addition',
      'Skip counting with teens',
      'Hundred board introduction'
    ]
  },

  'ten-boards': {
    title: 'Ten Boards',
    description: 'Introduction to multiples of ten and the decimal system',
    purpose: 'To introduce multiples of ten (10, 20, 30, etc.) and reinforce understanding of the decimal system through concrete materials.',
    materials: ['Ten boards', 'Golden bead ten bars', 'Ten number cards 10-90'],
    materialsPurpose: [
      'Ten boards: Structured layout for organizing ten bars',
      'Golden bead ten bars: Concrete representation of tens',
      'Ten number cards 10-90: Symbol representation of multiples of ten'
    ],
    steps: [
      'Place ten bars on boards to show 10, 20, 30, etc.',
      'Count by tens',
      'Match with ten number cards',
      'Practice sequence of tens'
    ],
    detailedSteps: [
      'Place one ten bar on board: "This is ten"',
      'Add another ten bar: "Two tens make twenty"',
      'Continue building: "Three tens make thirty"',
      'Practice counting by tens: 10, 20, 30, 40...',
      'Match number cards to corresponding quantities',
      'Emphasize the pattern of adding tens'
    ],
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: true,
    icon: '🔟',
    videoUrl: '/videos/ten-boards.mp4',
    imageUrl: '/images/ten-boards.jpg',
    objectives: [
      'Learn multiples of ten',
      'Understand place value',
      'Skip counting by tens',
      'Decimal system reinforcement'
    ],
    extensions: [
      'Hundred board work',
      'Large number formation',
      'Addition with multiples of ten'
    ]
  }
};