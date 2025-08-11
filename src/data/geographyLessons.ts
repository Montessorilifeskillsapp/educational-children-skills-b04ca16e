// Geography lessons with detailed step-by-step instructions
import { expandedGeographyLessons } from './geographyLessonsExpanded';

export interface GeographyStep {
  id: string;
  instruction: string;
  completed: boolean;
  videoUrl?: string;
}

export interface GeographyLesson {
  title: string;
  description: string;
  purpose: string;
  materials: string[];
  steps: GeographyStep[];
  category: string;
  difficulty: string;
  ageRange: string;
  isPremium: boolean;
}

export const geographyLessons: Record<string, GeographyLesson> = {
  'land-water-forms': {
    title: 'Land and Water Forms',
    description: 'Explore islands, peninsulas, lakes, and bays',
    purpose: 'Introduces basic geographical concepts through tactile exploration and visual recognition of land and water formations.',
    materials: ['Sandpaper land forms', 'Blue water trays', 'Small objects for islands', 'Pouring materials', 'Towels'],
    category: 'Geography',
    difficulty: 'Beginner',
    ageRange: '3-6',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Set up land and water form trays on work mat', completed: false },
      { id: '2', instruction: 'Feel the sandpaper land forms with fingertips', completed: false },
      { id: '3', instruction: 'Pour water carefully into the blue sections', completed: false },
      { id: '4', instruction: 'Place small objects to represent islands and peninsulas', completed: false },
      { id: '5', instruction: 'Name each formation: "This is an island, this is a lake"', completed: false }
    ]
  },

  'continents': {
    title: 'Seven Continents',
    description: 'Learn about Asia, Africa, North America, South America, Antarctica, Europe, Australia',
    purpose: 'Develops global awareness and introduces the seven continents through puzzle work and cultural exploration.',
    materials: ['Continent puzzle map', 'Continent cards', 'World globe', 'Flag cards', 'Cultural objects'],
    category: 'Geography',
    difficulty: 'Beginner',
    ageRange: '4-8',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Place world map puzzle on work mat', completed: false },
      { id: '2', instruction: 'Remove continent pieces one by one', completed: false },
      { id: '3', instruction: 'Name each continent as you handle it', completed: false },
      { id: '4', instruction: 'Replace continents in correct positions', completed: false },
      { id: '5', instruction: 'Match continent cards to puzzle pieces', completed: false },
      { id: '6', instruction: 'Sing continent song while pointing to each one', completed: false }
    ]
  },

  'compass-directions': {
    title: 'Compass and Directions',
    description: 'North, South, East, West, and intermediate directions',
    purpose: 'Teaches spatial orientation and navigation skills essential for map reading and environmental awareness.',
    materials: ['Compass', 'Direction cards', 'Classroom map', 'Sun tracking chart', 'Direction arrows'],
    category: 'Geography',
    difficulty: 'Intermediate',
    ageRange: '6-10',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Hold compass flat in palm of hand', completed: false },
      { id: '2', instruction: 'Wait for needle to stop moving and point north', completed: false },
      { id: '3', instruction: 'Turn body to face north direction', completed: false },
      { id: '4', instruction: 'Identify east (right), west (left), and south (behind)', completed: false },
      { id: '5', instruction: 'Practice navigation game around classroom', completed: false },
      { id: '6', instruction: 'Create simple map showing directional movements', completed: false }
    ]
  },
  
  // Merge expanded lessons
  ...expandedGeographyLessons
};

export default geographyLessons;