// Montessori Sensorial Skills Data
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

export const sensorialSkills: Record<string, SensorialSkill> = {
  'pink-tower': {
    id: 'pink-tower',
    title: 'Pink Tower',
    icon: '🟩',
    category: 'Visual Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Building a tower with cubes of different sizes to develop visual discrimination of dimension.',
    ageRange: '2.5-4 years',
    materials: ['10 pink wooden cubes', 'Work mat'],
    steps: [
      'Carry the cubes one by one to your work mat',
      'Start with the largest cube as the base',
      'Place each cube carefully on top, largest to smallest',
      'Check that each cube is centered',
      'Admire your completed tower'
    ],
    purpose: 'Develops visual discrimination of size, concentration, and coordination',
    extensions: ['Build horizontally', 'Make patterns', 'Count the cubes'],
    color: 'pink'
  },
  'brown-stair': {
    id: 'brown-stair',
    title: 'Brown Stair',
    icon: '🟫',
    category: 'Visual Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Building a stair with prisms of different thickness to develop understanding of dimension.',
    ageRange: '2.5-4 years',
    materials: ['10 brown wooden prisms', 'Work mat'],
    steps: [
      'Carry the prisms one by one to your work mat',
      'Start with the thickest prism',
      'Arrange from thickest to thinnest in a stair pattern',
      'Align the left ends of all prisms',
      'Walk your fingers up the stair'
    ],
    purpose: 'Develops understanding of thickness and dimension',
    extensions: ['Combine with Pink Tower', 'Make patterns', 'Build vertically'],
    color: 'brown'
  },
  'red-rods': {
    id: 'red-rods',
    title: 'Red Rods',
    icon: '📏',
    category: 'Visual Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Arranging rods by length to develop understanding of long and short.',
    ageRange: '2.5-4 years',
    materials: ['10 red wooden rods', 'Large work mat'],
    steps: [
      'Carry rods carefully to your mat',
      'Find the longest rod first',
      'Arrange from longest to shortest',
      'Align the left ends',
      'Walk along the rods to see the progression'
    ],
    purpose: 'Develops visual discrimination of length and introduces measurement concepts',
    extensions: ['Measure objects with rods', 'Create geometric patterns'],
    color: 'red'
  }
};