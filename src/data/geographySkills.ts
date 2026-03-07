// Geography skills data with emoji icons and step-by-step activities
import { amiGeographySkills } from './amiGeographySkills';

const baseGeographySkills = {
  // Basic Geography Concepts
  'land-water-forms': {
    title: 'Land and Water Forms',
    description: 'Explore all 5 paired land and water forms: Island/Lake, Peninsula/Gulf, Isthmus/Strait, Cape/Bay, Archipelago/System of Lakes',
    icon: '🌊',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    purpose: 'Introduces the 5 paired land and water forms through tactile exploration with clay trays. Each land form has an opposite water form, helping the child understand how land and water relate to one another.',
    materials: [
      'Land and water form trays (5 pairs, 10 trays total)',
      'Small pitcher of water tinted with blue food colouring',
      'Sponge and towel for cleanup',
      'Land and water form nomenclature cards',
      'Clay or plasticine for modeling',
      'Control chart showing all 10 forms'
    ],
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
    icon: '🌍',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '4-8',
    purpose: 'Develops global awareness and introduces the seven continents through puzzle work and cultural exploration.',
    materials: ['Continent puzzle map', 'Continent cards', 'World globe', 'Flag cards', 'Cultural objects'],
    steps: [
      { id: '1', instruction: 'Place world map puzzle on work mat', completed: false },
      { id: '2', instruction: 'Remove continent pieces one by one', completed: false },
      { id: '3', instruction: 'Name each continent as you handle it', completed: false },
      { id: '4', instruction: 'Replace continents in correct positions', completed: false },
      { id: '5', instruction: 'Match continent cards to puzzle pieces', completed: false },
      { id: '6', instruction: 'Sing continent song while pointing to each one', completed: false }
    ]
  },
  'oceans': {
    title: 'Five Oceans',
    description: 'Pacific, Atlantic, Indian, Arctic, and Southern Oceans',
    icon: '🌊',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '4-8',
    purpose: 'Introduces the five major oceans and their characteristics through hands-on exploration.',
    materials: ['Ocean puzzle', 'Marine life cards', 'Temperature tools', 'Globe', 'Ocean fact cards'],
    steps: [
      { id: '1', instruction: 'Identify each ocean on the globe', completed: false },
      { id: '2', instruction: 'Complete ocean puzzle naming each one', completed: false },
      { id: '3', instruction: 'Sort marine life cards by ocean habitat', completed: false },
      { id: '4', instruction: 'Compare ocean temperatures using fact cards', completed: false },
      { id: '5', instruction: 'Discuss ocean currents and their effects', completed: false }
    ]
  },

  // Physical Geography
  'landforms': {
    title: 'Major Landforms',
    description: 'Mountains, valleys, plains, plateaus, and hills',
    icon: '⛰️',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Intermediate',
    ageRange: '5-9',
    purpose: 'Develops understanding of Earth\'s physical features through hands-on modeling and exploration.',
    materials: ['Clay or play dough', 'Landform nomenclature cards', 'Topographic maps', 'Small figurines', 'Water tray'],
    steps: [
      { id: '1', instruction: 'Examine landform nomenclature cards and name each feature', completed: false },
      { id: '2', instruction: 'Use clay to model a mountain with peaks and valleys', completed: false },
      { id: '3', instruction: 'Create a flat plain area next to your mountain', completed: false },
      { id: '4', instruction: 'Form a plateau (raised flat area) using clay', completed: false },
      { id: '5', instruction: 'Place figurines to show scale of landforms', completed: false },
      { id: '6', instruction: 'Compare your model to real topographic maps', completed: false }
    ]
  },
  'water-bodies': {
    title: 'Bodies of Water',
    description: 'Rivers, lakes, seas, straits, and gulfs',
    icon: '🌊',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-9',
    purpose: 'Introduces water formations and their role in Earth\'s geography through experimentation.',
    materials: ['Water cycle model', 'Blue sand or water', 'River formation tray', 'Lake ecosystem cards', 'Globe'],
    steps: [
      { id: '1', instruction: 'Set up water cycle demonstration with heat lamp', completed: false },
      { id: '2', instruction: 'Pour water to create a winding river path', completed: false },
      { id: '3', instruction: 'Form a lake by creating a depression and filling with water', completed: false },
      { id: '4', instruction: 'Identify where rivers meet the sea', completed: false },
      { id: '5', instruction: 'Study lake ecosystem cards and discuss water life', completed: false }
    ]
  },
  'climate-zones': {
    title: 'Climate Zones',
    description: 'Tropical, temperate, polar, and desert climates',
    icon: '☀️',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '6-10',
    purpose: 'Explores different climate zones and their characteristics through sorting and observation.',
    materials: ['Climate zone cards', 'Weather tracking chart', 'Biome diorama materials', 'Globe', 'Temperature tools'],
    steps: [
      { id: '1', instruction: 'Sort climate zone cards into four main categories', completed: false },
      { id: '2', instruction: 'Track local weather for one week on chart', completed: false },
      { id: '3', instruction: 'Create tropical biome diorama with appropriate plants', completed: false },
      { id: '4', instruction: 'Build desert biome showing adaptation to dry climate', completed: false },
      { id: '5', instruction: 'Locate climate zones on globe and discuss differences', completed: false }
    ]
  },

  // Political Geography
  'countries-capitals': {
    title: 'Countries and Capitals',
    description: 'Major countries and their capital cities',
    icon: '📍',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '7-12',
    purpose: 'Develops knowledge of world political geography through matching and research activities.',
    materials: ['World map', 'Country-capital cards', 'Research materials', 'Flags', 'Atlas'],
    steps: [
      { id: '1', instruction: 'Match country cards with their capital cities', completed: false },
      { id: '2', instruction: 'Locate countries and capitals on world map', completed: false },
      { id: '3', instruction: 'Research interesting facts about selected countries', completed: false },
      { id: '4', instruction: 'Create a presentation about a chosen country', completed: false }
    ]
  },
  'world-flags': {
    title: 'World Flags',
    description: 'Flags of different countries and their meanings',
    icon: '🏳️',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '6-10',
    purpose: 'Introduces world flags and their cultural significance through matching and design activities.',
    materials: ['Flag cards', 'Country cards', 'Art supplies', 'Flag reference books'],
    steps: [
      { id: '1', instruction: 'Match flags to their corresponding countries', completed: false },
      { id: '2', instruction: 'Learn about flag symbols and their meanings', completed: false },
      { id: '3', instruction: 'Design your own flag with meaningful symbols', completed: false },
      { id: '4', instruction: 'Present your flag design and explain its meaning', completed: false }
    ]
  },

  // Map Skills
  'compass-directions': {
    title: 'Compass and Directions',
    description: 'North, South, East, West, and intermediate directions',
    icon: '🧭',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Intermediate',
    ageRange: '6-10',
    purpose: 'Teaches spatial orientation and navigation skills essential for map reading and environmental awareness.',
    materials: ['Compass', 'Direction cards', 'Classroom map', 'Sun tracking chart', 'Direction arrows'],
    steps: [
      { id: '1', instruction: 'Hold compass flat in palm of hand', completed: false },
      { id: '2', instruction: 'Wait for needle to stop moving and point north', completed: false },
      { id: '3', instruction: 'Turn body to face north direction', completed: false },
      { id: '4', instruction: 'Identify east (right), west (left), and south (behind)', completed: false },
      { id: '5', instruction: 'Practice navigation game around classroom', completed: false },
      { id: '6', instruction: 'Create simple map showing directional movements', completed: false }
    ]
  },
  'map-reading': {
    title: 'Map Reading Skills',
    description: 'Understanding symbols, legends, and scales',
    icon: '🗺️',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '7-12',
    purpose: 'Develops map reading skills through symbol interpretation and scale understanding.',
    materials: ['Various maps', 'Map symbols guide', 'Measuring tools', 'Colored pencils'],
    steps: [
      { id: '1', instruction: 'Identify different map symbols using legend', completed: false },
      { id: '2', instruction: 'Practice measuring distances using map scale', completed: false },
      { id: '3', instruction: 'Create a treasure map with symbols and legend', completed: false },
      { id: '4', instruction: 'Navigate using your created map', completed: false }
    ]
  }
};

export const geographySkillsData = {
  ...baseGeographySkills,
  ...amiGeographySkills
};

export default geographySkillsData;