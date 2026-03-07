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
    description: 'Explore all 5 paired land and water forms: Island/Lake, Peninsula/Gulf, Isthmus/Strait, Cape/Bay, Archipelago/System of Lakes',
    purpose: 'Introduces the 5 paired land and water forms through tactile exploration with clay trays. Each land form has an opposite water form, helping the child understand how land and water relate to one another.',
    materials: [
      'Land and water form trays (5 pairs, 10 trays total)',
      'Small pitcher of water tinted with blue food colouring',
      'Sponge and towel for cleanup',
      'Land and water form nomenclature cards',
      'Clay or plasticine for modeling',
      'Control chart showing all 10 forms'
    ],
    category: 'Geography',
    difficulty: 'Beginner',
    ageRange: '3-6',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Invite the child: "Would you like to work with the land and water forms?"', completed: false },
      { id: '2', instruction: 'Carry the first pair of trays (Island / Lake) to the work mat', completed: false },
      { id: '3', instruction: 'Pour water into the Island tray — feel the land surrounded by water. Say: "This is an island."', completed: false },
      { id: '4', instruction: 'Pour water into the Lake tray — feel the water surrounded by land. Say: "This is a lake."', completed: false },
      { id: '5', instruction: 'Present the Peninsula / Gulf pair: Peninsula is land surrounded by water on three sides; Gulf is water surrounded by land on three sides', completed: false },
      { id: '6', instruction: 'Present the Isthmus / Strait pair: Isthmus is a narrow strip of land connecting two larger land masses; Strait is a narrow strip of water connecting two larger bodies of water', completed: false },
      { id: '7', instruction: 'Present the Cape / Bay pair: Cape is a point of land extending into water; Bay is a body of water partly enclosed by land', completed: false },
      { id: '8', instruction: 'Present the Archipelago / System of Lakes pair: Archipelago is a chain of islands; System of Lakes is a chain of lakes', completed: false },
      { id: '9', instruction: 'Lay out all 10 nomenclature cards and match each card to its tray', completed: false },
      { id: '10', instruction: 'Three-period lesson: "Show me the isthmus," "What is this?", reviewing all forms', completed: false },
      { id: '11', instruction: 'Child models a chosen pair in clay and pours water to verify the form', completed: false },
      { id: '12', instruction: 'Return all trays to the shelf, emptying and drying each one', completed: false }
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