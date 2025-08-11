// Tactile Montessori Sensorial Skills Data
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

export const tactileSensorialSkills: Record<string, SensorialSkill> = {
  'touch-boards': {
    id: 'touch-boards',
    title: 'Touch Boards',
    icon: '✋',
    category: 'Tactile Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Feeling smooth and rough surfaces to develop tactile discrimination.',
    ageRange: '2.5-4 years',
    materials: ['Rough and smooth boards', 'Blindfold (optional)'],
    steps: [
      'Place the boards on your work mat',
      'Use light fingertip touch on the smooth board',
      'Feel the entire surface gently',
      'Now touch the rough board the same way',
      'Compare the two sensations',
      'Try with eyes closed to focus on touch'
    ],
    purpose: 'Develops tactile discrimination between rough and smooth',
    extensions: ['Find rough and smooth objects around you', 'Grade from smooth to rough', 'Draw the textures'],
    color: 'beige'
  },
  'touch-tablets': {
    id: 'touch-tablets',
    title: 'Touch Tablets',
    icon: '📱',
    category: 'Tactile Discrimination',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Matching pairs of tablets with different textures and gradations.',
    ageRange: '3-5 years',
    materials: ['Touch tablets with various textures', 'Work mat', 'Blindfold'],
    steps: [
      'Arrange tablets randomly on your mat',
      'Feel the first tablet with light touch',
      'Search for its matching pair',
      'Continue until all pairs are matched',
      'Grade tablets from smoothest to roughest',
      'Practice with eyes closed for better focus'
    ],
    purpose: 'Refines tactile discrimination and develops grading skills',
    extensions: ['Create texture patterns', 'Find matching textures in nature', 'Describe textures with words'],
    color: 'tan'
  },
  'mystery-bag': {
    id: 'mystery-bag',
    title: 'Mystery Bag',
    icon: '🎒',
    category: 'Stereognostic',
    difficulty: 'Intermediate',
    isPremium: false,
    description: 'Identifying objects by touch alone to develop stereognostic sense.',
    ageRange: '3-6 years',
    materials: ['Cloth bag', 'Various small objects', 'Matching objects (optional)'],
    steps: [
      'Place familiar objects in the mystery bag',
      'Put your hand in without looking',
      'Feel one object carefully',
      'Explore its shape, size, and texture',
      'Guess what the object is',
      'Remove it to check your answer'
    ],
    purpose: 'Develops stereognostic sense and object recognition through touch',
    extensions: ['Use geometric solids', 'Try with letters or numbers', 'Describe objects before guessing'],
    color: 'brown'
  },
  'thermic-tablets': {
    id: 'thermic-tablets',
    title: 'Thermic Tablets',
    icon: '🌡️',
    category: 'Tactile Discrimination',
    difficulty: 'Advanced',
    isPremium: true,
    description: 'Discriminating between different temperatures through touch.',
    ageRange: '4-6 years',
    materials: ['Thermic tablets (metal, wood, felt, etc.)', 'Work mat'],
    steps: [
      'Arrange tablets on your work mat',
      'Touch each tablet with the back of your hand',
      'Notice the temperature differences',
      'Sort from coolest to warmest',
      'Match pairs of the same material',
      'Discuss why materials feel different temperatures'
    ],
    purpose: 'Develops thermic sense and understanding of material properties',
    extensions: ['Test other materials', 'Explore temperature in daily life', 'Learn about conductivity'],
    color: 'silver'
  }
};