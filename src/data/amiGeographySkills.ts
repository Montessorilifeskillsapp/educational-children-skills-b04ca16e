// AMI-aligned Geography curriculum additions
export const amiGeographySkills = {
  // Solar System & Earth
  'solar-system': {
    title: 'Solar System',
    description: 'The sun, planets, and their relationship to Earth',
    icon: '🪐',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-9',
    purpose: 'To understand Earth\'s place in the solar system and the relationship between planets and the sun.',
    materials: ['Solar system model', 'Planet cards', 'Scale rope for distances', 'Planet size comparison spheres'],
    steps: [
      { id: '1', instruction: 'Present the solar system model and identify the sun at center', completed: false },
      { id: '2', instruction: 'Name each planet in order from the sun', completed: false },
      { id: '3', instruction: 'Compare planet sizes using spheres', completed: false },
      { id: '4', instruction: 'Use rope to demonstrate relative distances between planets', completed: false },
      { id: '5', instruction: 'Match planet cards with facts about each planet', completed: false },
      { id: '6', instruction: 'Discuss why Earth is special (water, atmosphere, life)', completed: false }
    ]
  },
  'day-night': {
    title: 'Day and Night',
    description: 'Earth\'s rotation and how it creates day and night',
    icon: '🌗',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    purpose: 'To understand how Earth\'s rotation causes the cycle of day and night.',
    materials: ['Globe', 'Flashlight or lamp', 'Small figurine', 'Darkened room'],
    steps: [
      { id: '1', instruction: 'Place the globe in a darkened room', completed: false },
      { id: '2', instruction: 'Shine the flashlight on the globe to represent the sun', completed: false },
      { id: '3', instruction: 'Place a figurine on your location on the globe', completed: false },
      { id: '4', instruction: 'Slowly rotate the globe and observe light and shadow', completed: false },
      { id: '5', instruction: 'Identify when the figurine is in daylight vs. nighttime', completed: false },
      { id: '6', instruction: 'Discuss what happens during sunrise and sunset', completed: false }
    ]
  },
  'seasons': {
    title: 'Seasons of the Year',
    description: 'Earth\'s tilt and orbit create four seasons',
    icon: '🍂',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-9',
    purpose: 'To understand how Earth\'s tilted axis and orbit around the sun create seasonal changes.',
    materials: ['Globe on tilted axis', 'Lamp (sun)', 'Season cards', 'Orbit path mat'],
    steps: [
      { id: '1', instruction: 'Place lamp in center and globe on orbit path', completed: false },
      { id: '2', instruction: 'Show Earth\'s tilted axis and explain it stays tilted the same way', completed: false },
      { id: '3', instruction: 'Move globe to summer position: tilt toward sun', completed: false },
      { id: '4', instruction: 'Move to winter position: tilt away from sun', completed: false },
      { id: '5', instruction: 'Identify spring and autumn as transition positions', completed: false },
      { id: '6', instruction: 'Match season cards to each position on the orbit', completed: false }
    ]
  },

  // Globe Work
  'sandpaper-globe': {
    title: 'Sandpaper Globe',
    description: 'First introduction to land and water on Earth',
    icon: '🌐',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-5',
    purpose: 'To provide a tactile introduction to the concept of land and water covering Earth\'s surface.',
    materials: ['Sandpaper globe', 'Blindfold (optional)', 'Water spray bottle'],
    steps: [
      { id: '1', instruction: 'Present the sandpaper globe on a mat', completed: false },
      { id: '2', instruction: 'Feel the rough parts (land) with fingertips', completed: false },
      { id: '3', instruction: 'Feel the smooth parts (water) with fingertips', completed: false },
      { id: '4', instruction: 'Say "This is land" and "This is water" while touching', completed: false },
      { id: '5', instruction: 'Observe that there is more water than land', completed: false },
      { id: '6', instruction: 'Rotate the globe slowly, feeling land and water', completed: false }
    ]
  },
  'colored-globe': {
    title: 'Colored Globe',
    description: 'Continents identified by color on a painted globe',
    icon: '🌎',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    purpose: 'To transition from tactile to visual identification of continents using Montessori color coding.',
    materials: ['Colored continent globe', 'Continent color chart', 'Puzzle map'],
    steps: [
      { id: '1', instruction: 'Present the colored globe next to the sandpaper globe', completed: false },
      { id: '2', instruction: 'Compare: rough/smooth becomes colored/blue', completed: false },
      { id: '3', instruction: 'Name each color-coded continent', completed: false },
      { id: '4', instruction: 'Find the same continent on both globes', completed: false },
      { id: '5', instruction: 'Match continent puzzle pieces to globe colors', completed: false }
    ]
  },

  // Puzzle Maps
  'continent-puzzle-maps': {
    title: 'Continent Puzzle Maps',
    description: 'Individual continent maps with country pieces',
    icon: '🧩',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-8',
    purpose: 'To learn the countries within each continent through hands-on puzzle work.',
    materials: ['Individual continent puzzle maps', 'Control maps', 'Country labels', 'Atlas'],
    steps: [
      { id: '1', instruction: 'Select a continent puzzle map to work with', completed: false },
      { id: '2', instruction: 'Remove all country pieces from the frame', completed: false },
      { id: '3', instruction: 'Replace each piece, naming the country', completed: false },
      { id: '4', instruction: 'Use control map to check placement', completed: false },
      { id: '5', instruction: 'Add country name labels to each piece', completed: false },
      { id: '6', instruction: 'Locate the continent on the world puzzle map', completed: false }
    ]
  },

  // Cultural Geography
  'people-world': {
    title: 'People of the World',
    description: 'Cultural diversity, traditions, homes, and daily life',
    icon: '👨‍👩‍👧‍👦',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-9',
    purpose: 'To develop respect for cultural diversity by exploring how people live around the world.',
    materials: ['Cultural cards', 'Traditional clothing pictures', 'Food cards', 'Music samples', 'Artifact replicas'],
    steps: [
      { id: '1', instruction: 'Select a continent to explore its people', completed: false },
      { id: '2', instruction: 'Examine cultural cards showing homes, clothing, food', completed: false },
      { id: '3', instruction: 'Listen to traditional music from the region', completed: false },
      { id: '4', instruction: 'Compare and contrast with your own daily life', completed: false },
      { id: '5', instruction: 'Discuss what all people have in common (needs)', completed: false },
      { id: '6', instruction: 'Create a cultural presentation for the class', completed: false }
    ]
  },
  'animals-continents': {
    title: 'Animals of the Continents',
    description: 'Native animals and their habitats across continents',
    icon: '🦁',
    category: 'Geography',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '4-7',
    purpose: 'To connect animal life to geography by learning which animals live on each continent.',
    materials: ['Animal figurines', 'Continent mat', 'Animal cards', 'Habitat pictures'],
    steps: [
      { id: '1', instruction: 'Lay out the continent mat on the floor', completed: false },
      { id: '2', instruction: 'Sort animal figurines by the continent they live on', completed: false },
      { id: '3', instruction: 'Match animal cards to figurines for more detail', completed: false },
      { id: '4', instruction: 'Discuss why certain animals live in certain places', completed: false },
      { id: '5', instruction: 'Identify animals that live on your continent', completed: false }
    ]
  },
  'natural-resources': {
    title: 'Natural Resources',
    description: 'Earth\'s resources: water, minerals, soil, forests, and energy',
    icon: '💎',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '6-10',
    purpose: 'To understand Earth\'s natural resources, their uses, and the importance of conservation.',
    materials: ['Resource specimens (rocks, soil, water)', 'Resource cards', 'World map', 'Sorting trays'],
    steps: [
      { id: '1', instruction: 'Examine real resource specimens: rocks, soil, water samples', completed: false },
      { id: '2', instruction: 'Sort resources into categories: renewable and non-renewable', completed: false },
      { id: '3', instruction: 'Match resources to products they create', completed: false },
      { id: '4', instruction: 'Locate major resource areas on world map', completed: false },
      { id: '5', instruction: 'Discuss conservation and responsible use', completed: false },
      { id: '6', instruction: 'Create a plan for conserving one resource at home', completed: false }
    ]
  },

  // Earth Science
  'layers-earth': {
    title: 'Layers of the Earth',
    description: 'Crust, mantle, outer core, and inner core',
    icon: '🌋',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '6-10',
    purpose: 'To understand Earth\'s internal structure and how it relates to surface features.',
    materials: ['Earth layer model', 'Play dough in four colors', 'Earth cross-section chart', 'Labels'],
    steps: [
      { id: '1', instruction: 'Present the Earth layer model and name each layer', completed: false },
      { id: '2', instruction: 'Make a small ball of red dough for the inner core', completed: false },
      { id: '3', instruction: 'Wrap orange dough around it for the outer core', completed: false },
      { id: '4', instruction: 'Add thick yellow layer for the mantle', completed: false },
      { id: '5', instruction: 'Cover with thin brown layer for the crust', completed: false },
      { id: '6', instruction: 'Cut the model in half to see all layers', completed: false }
    ]
  },
  'volcanoes-earthquakes': {
    title: 'Volcanoes and Earthquakes',
    description: 'How tectonic forces shape Earth\'s surface',
    icon: '🌋',
    category: 'Geography',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '7-10',
    purpose: 'To understand how internal forces create volcanoes and earthquakes that shape Earth\'s landscape.',
    materials: ['Volcano model', 'Baking soda and vinegar', 'Tectonic plate puzzle', 'World seismic map'],
    steps: [
      { id: '1', instruction: 'Examine tectonic plate puzzle and how plates fit together', completed: false },
      { id: '2', instruction: 'Demonstrate plate movement: pushing together, pulling apart', completed: false },
      { id: '3', instruction: 'Build volcano model and simulate eruption safely', completed: false },
      { id: '4', instruction: 'Locate major volcanoes and earthquake zones on map', completed: false },
      { id: '5', instruction: 'Identify the "Ring of Fire" around the Pacific', completed: false },
      { id: '6', instruction: 'Discuss how these forces create mountains and ocean trenches', completed: false }
    ]
  }
};

export default amiGeographySkills;
