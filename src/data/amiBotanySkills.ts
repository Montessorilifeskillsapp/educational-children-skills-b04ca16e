// Complete AMI-aligned Botany curriculum additions
export const amiBotanySkills = {
  // Plant Classification
  'tree-parts': {
    title: 'Parts of a Tree',
    description: 'Trunk, branches, roots, crown, and bark',
    icon: '🌳',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    materials: ['Tree puzzle', 'Tree specimens or pictures', 'Labels', 'Drawing paper'],
    purpose: 'To identify and name the parts of a tree and understand their functions',
    steps: [
      'Present the wooden tree puzzle',
      'Remove each piece and name it: roots, trunk, branches, leaves, crown',
      'Explain the function of each part simply',
      'Have the child reassemble the puzzle',
      'Observe a real tree outdoors and identify parts',
      'Draw and label a tree'
    ],
    activities: ['Tree puzzle work', 'Outdoor tree observation', 'Tree labeling']
  },
  'root-types': {
    title: 'Types of Roots',
    description: 'Taproot, fibrous, adventitious, and tuberous roots',
    icon: '🌾',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-8',
    materials: ['Root type cards', 'Real root specimens', 'Magnifying glass', 'Root puzzle'],
    purpose: 'To classify different root systems and understand their adaptations',
    steps: [
      'Present the root puzzle showing different types',
      'Examine real root specimens (carrot for taproot, grass for fibrous)',
      'Match roots to classification cards',
      'Discuss how each root type helps the plant',
      'Sort pictures of plants by root type',
      'Record observations in botany notebook'
    ],
    activities: ['Root classification', 'Specimen examination', 'Root type matching']
  },
  'stem-types': {
    title: 'Types of Stems',
    description: 'Herbaceous, woody, climbing, and underground stems',
    icon: '🌿',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-8',
    materials: ['Stem type cards', 'Various plant stems', 'Magnifying glass', 'Cross-section slides'],
    purpose: 'To identify and classify different stem types and their functions',
    steps: [
      'Present different stem specimens side by side',
      'Compare herbaceous (soft) and woody (hard) stems',
      'Identify climbing stems (vine) and underground stems (potato)',
      'Examine a stem cross-section with magnifying glass',
      'Match stems to classification cards',
      'Create a stem type chart'
    ],
    activities: ['Stem sorting', 'Cross-section study', 'Classification chart']
  },

  // Leaf Studies
  'leaf-venation': {
    title: 'Leaf Venation',
    description: 'Parallel, pinnate, and palmate vein patterns',
    icon: '🍂',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Intermediate',
    ageRange: '4-7',
    materials: ['Leaf specimens', 'Venation cards', 'Magnifying glass', 'White paper', 'Crayons'],
    purpose: 'To observe and classify the vein patterns in leaves',
    steps: [
      'Collect leaves with different venation patterns',
      'Observe veins with magnifying glass',
      'Introduce terms: parallel, pinnate, palmate',
      'Match leaves to venation type cards',
      'Make leaf rubbings to highlight veins',
      'Sort a collection by venation type'
    ],
    activities: ['Vein pattern matching', 'Leaf rubbings', 'Sorting by venation']
  },
  'leaf-arrangement': {
    title: 'Leaf Arrangement',
    description: 'Alternate, opposite, and whorled patterns on stems',
    icon: '🌱',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-8',
    materials: ['Plant specimens', 'Arrangement cards', 'Magnifying glass', 'Botany notebook'],
    purpose: 'To observe how leaves are arranged on stems and classify the patterns',
    steps: [
      'Examine a plant stem with leaves attached',
      'Observe how leaves attach: one at a time or in pairs',
      'Introduce terms: alternate, opposite, whorled',
      'Compare different plants for arrangement patterns',
      'Match specimens to arrangement cards',
      'Draw leaf arrangements in botany notebook'
    ],
    activities: ['Pattern identification', 'Outdoor observation', 'Drawing arrangements']
  },

  // Botany Cabinet & Classification
  'botany-cabinet': {
    title: 'Botany Cabinet',
    description: 'Leaf shape insets for visual discrimination and classification',
    icon: '🗄️',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Beginner',
    ageRange: '3-6',
    materials: ['Botany cabinet with leaf insets', 'Leaf shape cards (3 sets)', 'Real leaf specimens'],
    purpose: 'To refine visual discrimination of leaf shapes and develop classification skills',
    steps: [
      'Present three contrasting leaf shapes from the cabinet',
      'Trace the inset frame with two fingers',
      'Remove the inset and trace around it on paper',
      'Match the shape to the corresponding card',
      'Progress through all leaf shapes in the cabinet',
      'Match real leaves to cabinet shapes'
    ],
    activities: ['Inset tracing', 'Shape matching', 'Real leaf matching']
  },
  'plant-classification': {
    title: 'Plant Classification',
    description: 'Grouping plants by characteristics: trees, shrubs, herbs, grasses',
    icon: '📋',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '6-9',
    materials: ['Classification cards', 'Plant pictures', 'Definition labels', 'Sorting mat'],
    purpose: 'To classify plants into major groups based on observable characteristics',
    steps: [
      'Present pictures of different plants',
      'Group by size and form: trees, shrubs, herbs, grasses',
      'Discuss key characteristics of each group',
      'Match definition labels to each group',
      'Sort a mixed set of plant pictures independently',
      'Find examples of each group outdoors'
    ],
    activities: ['Plant sorting', 'Definition matching', 'Outdoor hunt']
  },

  // Ecology & Habitat
  'photosynthesis': {
    title: 'Photosynthesis',
    description: 'How plants make food from sunlight, water, and air',
    icon: '☀️',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '6-9',
    materials: ['Photosynthesis chart', 'Plant in jar', 'Aluminum foil', 'Iodine solution'],
    purpose: 'To understand how plants produce their own food using sunlight',
    steps: [
      'Present the photosynthesis chart',
      'Explain: plants use sunlight, water, and carbon dioxide to make food',
      'Cover part of a leaf with foil for 3 days',
      'Compare covered and uncovered parts',
      'Test for starch with iodine (teacher demonstration)',
      'Discuss why plants are green (chlorophyll)'
    ],
    activities: ['Light experiment', 'Starch test', 'Photosynthesis diagram']
  },
  'pollination': {
    title: 'Pollination & Seed Dispersal',
    description: 'How plants reproduce and spread their seeds',
    icon: '🐝',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-8',
    materials: ['Flower specimens', 'Seed collection', 'Pollination cards', 'Cotton swabs'],
    purpose: 'To understand how pollen transfers between flowers and how seeds travel',
    steps: [
      'Observe pollen on a flower using magnifying glass',
      'Demonstrate pollination by transferring pollen with cotton swab',
      'Discuss pollinators: bees, butterflies, wind',
      'Examine different seed types: winged, hooked, fluffy',
      'Match seeds to dispersal method cards (wind, water, animal)',
      'Plant collected seeds and observe growth'
    ],
    activities: ['Pollen transfer demo', 'Seed dispersal sorting', 'Seed planting']
  },
  'plant-habitats': {
    title: 'Plant Habitats',
    description: 'Desert, rainforest, aquatic, and temperate plant adaptations',
    icon: '🏜️',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '6-9',
    materials: ['Habitat cards', 'Plant adaptation pictures', 'Globe or world map', 'Sorting mat'],
    purpose: 'To understand how plants adapt to different environments',
    steps: [
      'Present pictures of four different habitats',
      'Discuss climate conditions in each habitat',
      'Show plants adapted to each environment',
      'Examine adaptations: thick leaves (desert), aerial roots (rainforest)',
      'Match plants to their habitats on sorting mat',
      'Locate habitats on the globe'
    ],
    activities: ['Habitat matching', 'Adaptation discussion', 'Globe work']
  },

  // Practical Gardening
  'composting': {
    title: 'Composting',
    description: 'Turning organic waste into nutrient-rich soil',
    icon: '♻️',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '4-7',
    materials: ['Small compost bin', 'Brown materials (leaves, cardboard)', 'Green materials (food scraps)', 'Watering can'],
    purpose: 'To understand decomposition and the cycle of nutrients in nature',
    steps: [
      'Introduce the compost bin and its purpose',
      'Sort materials into brown (dry) and green (wet) categories',
      'Layer brown and green materials in the bin',
      'Add water to keep the compost moist',
      'Turn the compost weekly and observe changes',
      'Use finished compost in the garden'
    ],
    activities: ['Material sorting', 'Compost layering', 'Decomposition observation']
  },
  'gardening-basics': {
    title: 'Garden Care',
    description: 'Planting, watering, weeding, and harvesting',
    icon: '🧑‍🌾',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    materials: ['Child-sized garden tools', 'Seeds or seedlings', 'Watering can', 'Garden bed or pots'],
    purpose: 'To develop responsibility and understanding through hands-on plant care',
    steps: [
      'Prepare the soil by loosening and removing debris',
      'Make holes at proper spacing for seeds or seedlings',
      'Place seeds or plants carefully in each hole',
      'Cover with soil and pat gently',
      'Water thoroughly using the watering can',
      'Establish a daily care routine: water, weed, observe'
    ],
    activities: ['Seed planting', 'Daily watering', 'Weed identification']
  }
};

export default amiBotanySkills;
