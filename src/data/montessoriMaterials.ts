export interface MontessoriMaterial {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  description: string;
  ageRange: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  inStock: boolean;
  rating: number;
  image?: string;
  amazonLink?: string;
  materials?: string[];
}

export const montessoriMaterials: MontessoriMaterial[] = [
  // Practical Life Materials
  {
    id: 'dressing-frames-set',
    name: 'Dressing Frames Set (6 frames)',
    price: 89.99,
    category: 'Practical Life',
    subcategory: 'Care of Self',
    description: 'Complete set of wooden dressing frames: buttons, zippers, snaps, buckles, lacing, and velcro',
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.8,
    amazonLink: 'https://amazon.com/montessori-dressing-frames'
  },
  {
    id: 'child-broom-set',
    name: 'Child-Sized Cleaning Set',
    price: 34.99,
    category: 'Practical Life',
    subcategory: 'Care of Environment',
    description: 'Real wooden broom, dustpan, and brush sized for children',
    ageRange: '2-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'pouring-set',
    name: 'Pouring Exercise Set',
    price: 24.99,
    category: 'Practical Life',
    subcategory: 'Preliminary Exercises',
    description: 'Two matching ceramic pitchers with tray and sponge',
    ageRange: '2.5-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'spooning-set',
    name: 'Spooning Transfer Set',
    price: 18.99,
    category: 'Practical Life',
    subcategory: 'Preliminary Exercises',
    description: 'Two wooden bowls with wooden spoon for transfer exercises',
    ageRange: '2-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'polishing-set',
    name: 'Silver Polishing Set',
    price: 28.99,
    category: 'Practical Life',
    subcategory: 'Care of Environment',
    description: 'Child-sized silver objects, polish, and cloths on wooden tray',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.4
  },

  // Sensorial Materials
  {
    id: 'pink-tower',
    name: 'Pink Tower',
    price: 45.99,
    category: 'Sensorial',
    subcategory: 'Visual Discrimination',
    description: '10 wooden cubes from 1cm³ to 10cm³ in natural pink wood',
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.9
  },
  {
    id: 'brown-stair',
    name: 'Brown Stair (Broad Stair)',
    price: 52.99,
    category: 'Sensorial',
    subcategory: 'Visual Discrimination',
    description: '10 wooden prisms varying in thickness from 1cm to 10cm',
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'red-rods',
    name: 'Red Rods',
    price: 48.99,
    category: 'Sensorial',
    subcategory: 'Visual Discrimination',
    description: '10 wooden rods from 10cm to 1 meter in length',
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'color-tablets-box1',
    name: 'Color Tablets Box 1',
    price: 28.99,
    category: 'Sensorial',
    subcategory: 'Visual Discrimination',
    description: 'Primary colors: red, blue, yellow tablets with wooden handles',
    ageRange: '2.5-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'color-tablets-box2',
    name: 'Color Tablets Box 2',
    price: 35.99,
    category: 'Sensorial',
    subcategory: 'Visual Discrimination',
    description: 'Secondary colors and variations with wooden handles',
    ageRange: '3-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'sound-boxes',
    name: 'Sound Boxes',
    price: 32.99,
    category: 'Sensorial',
    subcategory: 'Auditory Discrimination',
    description: 'Wooden boxes with different materials for sound matching',
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.3
  },
  {
    id: 'fabric-box',
    name: 'Fabric Matching Box',
    price: 26.99,
    category: 'Sensorial',
    subcategory: 'Tactile Discrimination',
    description: 'Pairs of fabric squares for tactile matching exercises',
    ageRange: '2.5-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.4
  },

  // Mathematics Materials
  {
    id: 'golden-beads-set',
    name: 'Golden Bead Material Complete Set',
    price: 125.99,
    category: 'Mathematics',
    subcategory: 'Decimal System',
    description: 'Units, tens, hundreds, thousands with wooden trays',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.9
  },
  {
    id: 'number-rods',
    name: 'Number Rods',
    price: 65.99,
    category: 'Mathematics',
    subcategory: 'Introduction to Quantity',
    description: '10 wooden rods in red and blue segments representing 1-10',
    ageRange: '3-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'spindle-boxes',
    name: 'Spindle Boxes',
    price: 42.99,
    category: 'Mathematics',
    subcategory: 'Introduction to Quantity',
    description: 'Two wooden boxes with compartments and 45 wooden spindles',
    ageRange: '3.5-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'cards-counters',
    name: 'Cards and Counters',
    price: 29.99,
    category: 'Mathematics',
    subcategory: 'Introduction to Quantity',
    description: 'Number cards 1-10 with 55 red wooden counters',
    ageRange: '3.5-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'teen-boards',
    name: 'Teen Boards',
    price: 38.99,
    category: 'Mathematics',
    subcategory: 'Decimal System',
    description: 'Wooden boards and cards for numbers 11-19',
    ageRange: '4-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'hundred-board',
    name: 'Hundred Board',
    price: 45.99,
    category: 'Mathematics',
    subcategory: 'Decimal System',
    description: 'Wooden board with number tiles 1-100',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.7
  },

  // Language Materials
  {
    id: 'sandpaper-letters',
    name: 'Sandpaper Letters',
    price: 78.99,
    category: 'Language',
    subcategory: 'Writing Preparation',
    description: 'Complete set of lowercase sandpaper letters on wooden boards',
    ageRange: '3-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'moveable-alphabet',
    name: 'Moveable Alphabet',
    price: 95.99,
    category: 'Language',
    subcategory: 'Writing and Reading',
    description: 'Large wooden letters in a compartmented box',
    ageRange: '3.5-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'metal-insets',
    name: 'Metal Insets',
    price: 68.99,
    category: 'Language',
    subcategory: 'Writing Preparation',
    description: '10 geometric metal insets with frames for tracing',
    ageRange: '3-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'phonetic-objects',
    name: 'Phonetic Objects Box',
    price: 42.99,
    category: 'Language',
    subcategory: 'Reading',
    description: 'Small objects for phonetic word building exercises',
    ageRange: '3.5-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.4
  },

  // Cultural Studies - Geography
  {
    id: 'puzzle-maps',
    name: 'World Puzzle Map',
    price: 68.99,
    category: 'Cultural Studies',
    subcategory: 'Geography',
    description: 'Wooden world map puzzle with removable continents',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'continent-map',
    name: 'North America Puzzle Map',
    price: 45.99,
    category: 'Cultural Studies',
    subcategory: 'Geography',
    description: 'Detailed wooden puzzle map of North America',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'land-water-forms',
    name: 'Land and Water Forms',
    price: 89.99,
    category: 'Cultural Studies',
    subcategory: 'Geography',
    description: 'Wooden trays showing island, lake, peninsula, etc.',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.7
  },

  // Cultural Studies - Biology
  {
    id: 'botany-cabinet',
    name: 'Botany Cabinet',
    price: 125.99,
    category: 'Cultural Studies',
    subcategory: 'Biology',
    description: 'Wooden cabinet with leaf shape puzzles and cards',
    ageRange: '3.5-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'animal-puzzles',
    name: 'Animal Puzzle Set',
    price: 65.99,
    category: 'Cultural Studies',
    subcategory: 'Biology',
    description: 'Wooden puzzles of vertebrate animals with control charts',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.6
  },

  // Cultural Studies - History
  {
    id: 'timeline-life',
    name: 'Timeline of Life',
    price: 38.99,
    category: 'Cultural Studies',
    subcategory: 'History',
    description: 'Long strip showing evolution of life on Earth',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.4
  },

  // Additional Practical Life Materials
  {
    id: 'washing-station',
    name: 'Hand Washing Station',
    price: 45.99,
    category: 'Practical Life',
    subcategory: 'Care of Self',
    description: 'Child-sized pitcher, basin, soap, and towel on wooden stand',
    ageRange: '2-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'flower-arranging',
    name: 'Flower Arranging Set',
    price: 32.99,
    category: 'Practical Life',
    subcategory: 'Care of Environment',
    description: 'Small vases, funnel, scissors, and sponge for flower care',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'table-scrubbing',
    name: 'Table Scrubbing Set',
    price: 29.99,
    category: 'Practical Life',
    subcategory: 'Care of Environment',
    description: 'Small brush, soap, bucket, and sponge for table cleaning',
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.4
  },
  {
    id: 'food-preparation',
    name: 'Food Preparation Set',
    price: 38.99,
    category: 'Practical Life',
    subcategory: 'Food Preparation',
    description: 'Child-safe knife, cutting board, and bowls for food prep',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.6
  },

  // Additional Sensorial Materials
  {
    id: 'knobless-cylinders',
    name: 'Knobless Cylinders',
    price: 85.99,
    category: 'Sensorial',
    subcategory: 'Visual Discrimination',
    description: 'Four sets of wooden cylinders varying in height and diameter',
    ageRange: '3-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'geometric-solids',
    name: 'Geometric Solids',
    price: 62.99,
    category: 'Sensorial',
    subcategory: 'Stereognostic',
    description: '10 wooden geometric forms: sphere, cube, prism, etc.',
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'thermic-bottles',
    name: 'Thermic Bottles',
    price: 34.99,
    category: 'Sensorial',
    subcategory: 'Thermic',
    description: 'Metal bottles with different temperatures for thermal discrimination',
    ageRange: '3-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.3
  },
  {
    id: 'baric-tablets',
    name: 'Baric Tablets',
    price: 28.99,
    category: 'Sensorial',
    subcategory: 'Baric',
    description: 'Wooden tablets of different weights for weight discrimination',
    ageRange: '3-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.4
  },
  {
    id: 'rough-smooth-boards',
    name: 'Rough and Smooth Boards',
    price: 26.99,
    category: 'Sensorial',
    subcategory: 'Tactile Discrimination',
    description: 'Wooden boards with alternating rough and smooth surfaces',
    ageRange: '2.5-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.5
  },

  // Additional Mathematics Materials
  {
    id: 'addition-strip-board',
    name: 'Addition Strip Board',
    price: 42.99,
    category: 'Mathematics',
    subcategory: 'Operations',
    description: 'Wooden board with strips for addition exercises',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'subtraction-strip-board',
    name: 'Subtraction Strip Board',
    price: 42.99,
    category: 'Mathematics',
    subcategory: 'Operations',
    description: 'Wooden board with strips for subtraction exercises',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'multiplication-board',
    name: 'Multiplication Board',
    price: 38.99,
    category: 'Mathematics',
    subcategory: 'Operations',
    description: 'Wooden board with beads for multiplication exercises',
    ageRange: '5-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'division-board',
    name: 'Division Board',
    price: 45.99,
    category: 'Mathematics',
    subcategory: 'Operations',
    description: 'Wooden board with skittles and beads for division',
    ageRange: '5-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'snake-game',
    name: 'Snake Game (Addition)',
    price: 52.99,
    category: 'Mathematics',
    subcategory: 'Operations',
    description: 'Colored and golden bead bars for addition practice',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.8
  },

  // Additional Language Materials
  {
    id: 'pink-reading-series',
    name: 'Pink Reading Series',
    price: 35.99,
    category: 'Language',
    subcategory: 'Reading',
    description: 'Phonetic word cards and pictures for beginning readers',
    ageRange: '3.5-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'blue-reading-series',
    name: 'Blue Reading Series',
    price: 42.99,
    category: 'Language',
    subcategory: 'Reading',
    description: 'Phonogram word cards for intermediate readers',
    ageRange: '4-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'grammar-symbols',
    name: 'Grammar Symbols',
    price: 48.99,
    category: 'Language',
    subcategory: 'Grammar',
    description: 'Wooden symbols representing parts of speech',
    ageRange: '4.5-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'command-cards',
    name: 'Command Cards',
    price: 24.99,
    category: 'Language',
    subcategory: 'Reading',
    description: 'Action cards for reading comprehension exercises',
    ageRange: '4-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.4
  },

  // Additional Cultural Studies Materials
  {
    id: 'solar-system',
    name: 'Solar System Model',
    price: 78.99,
    category: 'Cultural Studies',
    subcategory: 'Astronomy',
    description: 'Wooden model of the solar system with planets',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'parts-of-flower',
    name: 'Parts of a Flower Puzzle',
    price: 32.99,
    category: 'Cultural Studies',
    subcategory: 'Biology',
    description: 'Wooden puzzle showing flower anatomy with nomenclature',
    ageRange: '3.5-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'parts-of-tree',
    name: 'Parts of a Tree Puzzle',
    price: 35.99,
    category: 'Cultural Studies',
    subcategory: 'Biology',
    description: 'Wooden puzzle showing tree parts with labels',
    ageRange: '3.5-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.4
  },
  {
    id: 'continent-boxes',
    name: 'Continent Study Boxes',
    price: 125.99,
    category: 'Cultural Studies',
    subcategory: 'Geography',
    description: 'Seven boxes with cultural artifacts from each continent',
    ageRange: '4-6 years',
    skillLevel: 'Advanced',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'clock-time',
    name: 'Clock for Time Teaching',
    price: 28.99,
    category: 'Cultural Studies',
    subcategory: 'Time',
    description: 'Wooden clock with moveable hands for time lessons',
    ageRange: '4-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.3
  },

  // Art and Music Materials
  {
    id: 'color-mixing-set',
    name: 'Color Mixing Set',
    price: 34.99,
    category: 'Art',
    subcategory: 'Color Theory',
    description: 'Watercolors, brushes, and paper for color exploration',
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.5
  },
  {
    id: 'clay-modeling',
    name: 'Clay Modeling Set',
    price: 26.99,
    category: 'Art',
    subcategory: 'Sculpture',
    description: 'Natural clay with tools for three-dimensional art',
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.4
  },
  {
    id: 'musical-bells',
    name: 'Musical Bells Set',
    price: 89.99,
    category: 'Music',
    subcategory: 'Pitch',
    description: 'Chromatic set of metal bells for musical education',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'rhythm-instruments',
    name: 'Rhythm Instruments Set',
    price: 45.99,
    category: 'Music',
    subcategory: 'Rhythm',
    description: 'Wooden instruments for rhythm and tempo exercises',
    ageRange: '2.5-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.6
  }
];