// Additional Montessori Sensorial Skills Data
export interface SensorialSkill {
  id: string;
  title: string;
  icon: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  description: string;
  ageRange: string;
  materials: string[];
  steps: string[];
  purpose: string;
  extensions: string[];
  color?: string;
}

export const additionalSensorialSkills: Record<string, SensorialSkill> = {
  'color-tablets': {
    id: 'color-tablets',
    title: 'Color Tablets',
    icon: '🎨',
    category: 'Visual Discrimination',
    difficulty: 'Intermediate',
    isPremium: false,
    description: 'Matching and grading colors to develop visual discrimination of color.',
    ageRange: '3-5 years',
    materials: ['Color tablets (Box 1, 2, or 3)', 'Work mat'],
    steps: [
      'Choose your color tablet box',
      'Carry tablets carefully to your work mat',
      'Start with primary colors (red, blue, yellow)',
      'Match identical colors together',
      'Name each color as you work',
      'Return tablets to their box when finished'
    ],
    purpose: 'Develops visual discrimination of color and color vocabulary',
    extensions: ['Grade colors from light to dark', 'Find objects that match colors', 'Create color patterns'],
    color: 'rainbow'
  },
  'sound-cylinders': {
    id: 'sound-cylinders',
    title: 'Sound Cylinders',
    icon: '🔔',
    category: 'Auditory Discrimination',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Matching sounds to develop auditory discrimination and listening skills.',
    ageRange: '3-6 years',
    materials: ['Two sets of sound cylinders', 'Work mat', 'Quiet environment'],
    steps: [
      'Choose one cylinder from each set',
      'Shake the first cylinder near your ear',
      'Listen carefully to the sound',
      'Shake cylinders from the second set',
      'Find the matching sound',
      'Continue until all pairs are matched'
    ],
    purpose: 'Develops auditory discrimination and concentration',
    extensions: ['Grade sounds from soft to loud', 'Create sound patterns', 'Identify sounds with eyes closed'],
    color: 'blue'
  },
  'fabric-box': {
    id: 'fabric-box',
    title: 'Fabric Box',
    icon: '🧵',
    category: 'Tactile Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Feeling and matching different fabric textures to develop tactile sensitivity.',
    ageRange: '2.5-5 years',
    materials: ['Fabric box with pairs of different textures', 'Blindfold (optional)'],
    steps: [
      'Take out all fabric pieces',
      'Feel the first piece with your fingertips',
      'Find its matching pair by touch',
      'Continue matching all fabric pairs',
      'Name the textures (smooth, rough, soft, etc.)',
      'Try matching with eyes closed'
    ],
    purpose: 'Develops tactile discrimination and texture vocabulary',
    extensions: ['Sort by texture type', 'Find objects with similar textures', 'Create texture patterns'],
    color: 'green'
  },
  'geometric-solids': {
    id: 'geometric-solids',
    title: 'Geometric Solids',
    icon: '📐',
    category: 'Stereognostic',
    difficulty: 'Advanced',
    isPremium: true,
    description: 'Exploring three-dimensional shapes through touch and sight.',
    ageRange: '4-6 years',
    materials: ['Set of geometric solids', 'Mystery bag', 'Work mat'],
    steps: [
      'Examine each solid carefully',
      'Feel all surfaces and edges',
      'Name each shape (sphere, cube, cylinder, etc.)',
      'Place one solid in the mystery bag',
      'Feel the shape without looking',
      'Identify the shape by touch alone'
    ],
    purpose: 'Develops stereognostic sense and geometric vocabulary',
    extensions: ['Find real objects with similar shapes', 'Draw the shapes', 'Build with the solids'],
    color: 'purple'
  }
};