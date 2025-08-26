export const controlOfMovementSkills = {
  'walking-line': {
    id: 'walking-line',
    title: 'Walking on the Line',
    description: 'Develop balance, coordination, and body awareness',
    icon: '👣',
    ageRange: '3-6 years',
    duration: '10 minutes',
    isPremium: false,
    purpose: 'Improve gross motor control, concentration, and spatial awareness',
    materials: [
      'Elliptical line marked on floor (tape or painted)',
      'Optional: objects to carry while walking',
      'Optional: music for rhythm'
    ],
    steps: [
      { id: '1', instruction: 'Stand at any point on the ellipse with both feet together on the line', completed: false },
      { id: '2', instruction: 'Place your right foot heel directly in front of your left foot toes', completed: false },
      { id: '3', instruction: 'Step forward with left foot, placing heel against right foot toes', completed: false },
      { id: '4', instruction: 'Continue heel-to-toe steps, moving slowly with control', completed: false },
      { id: '5', instruction: 'Keep arms slightly out for balance, eyes looking ahead', completed: false },
      { id: '6', instruction: 'Complete one full circle around the ellipse staying on the line', completed: false }
    ]
  },

  'carrying-objects': {
    id: 'carrying-objects',
    title: 'Carrying Objects',
    description: 'Learn to transport items safely and gracefully',
    icon: '📦',
    ageRange: '2-5 years',
    duration: '5 minutes',
    isPremium: false,
    purpose: 'Develop coordination, responsibility, and awareness of surroundings',
    materials: [
      'Various objects of different sizes and weights',
      'Trays',
      'Baskets',
      'Designated carrying paths'
    ],
    steps: [
      { id: '1', instruction: 'Examine the object - is it heavy, light, fragile, or has parts that might fall?', completed: false },
      { id: '2', instruction: 'Place hands on opposite sides or use both hands to support the bottom', completed: false },
      { id: '3', instruction: 'Lift close to your chest, keeping object between your hands and body', completed: false },
      { id: '4', instruction: 'Take deliberate steps - lift foot completely, place down carefully', completed: false },
      { id: '5', instruction: 'Focus eyes on your destination, pause if obstacles appear in path', completed: false },
      { id: '6', instruction: 'Lower the object by bending knees, set down gently with control', completed: false }
    ]
  },

  'pouring-exercises': {
    id: 'pouring-exercises',
    title: 'Pouring Exercises',
    description: 'Develop hand-eye coordination and concentration',
    icon: '🫗',
    ageRange: '3-5 years',
    duration: '8 minutes',
    isPremium: false,
    purpose: 'Refine fine motor skills and develop careful, controlled movements',
    materials: [
      'Two matching pitchers',
      'Dry materials (beans, rice, etc.)',
      'Small sponge for cleanup',
      'Tray to contain activity'
    ],
    steps: [
      { id: '1', instruction: 'Place filled pitcher on left, empty pitcher on right, both centered on tray', completed: false },
      { id: '2', instruction: 'Grasp handle with dominant hand, thumb on top pointing toward spout', completed: false },
      { id: '3', instruction: 'Support pitcher bottom with non-dominant hand for steady control', completed: false },
      { id: '4', instruction: 'Tilt pitcher slowly until material begins flowing in thin, steady stream', completed: false },
      { id: '5', instruction: 'Stop when receiving pitcher is 3/4 full, avoiding overflow', completed: false },
      { id: '6', instruction: 'Return pitcher to left position with controlled, deliberate movement', completed: false },
      { id: '7', instruction: 'Collect any spilled material with sponge, returning it to pitcher', completed: false }
    ]
  },

  'opening-closing': {
    id: 'opening-closing',
    title: 'Opening and Closing',
    description: 'Practice fine motor control with various containers',
    icon: '🫙',
    ageRange: '2-4 years',
    duration: '6 minutes',
    isPremium: true,
    purpose: 'Strengthen hand muscles and develop bilateral coordination',
    materials: [
      'Various containers with lids',
      'Boxes with different opening mechanisms',
      'Small objects to place inside',
      'Tray for organization'
    ],
    steps: [
      { id: '1', instruction: 'Select one container and examine the lid or opening mechanism', completed: false },
      { id: '2', instruction: 'Identify the opening method: twist counterclockwise, lift straight up, or slide sideways', completed: false },
      { id: '3', instruction: 'Use appropriate finger grip: pincer for small lids, whole hand for large ones', completed: false },
      { id: '4', instruction: 'Place one small object inside, feeling how it fits in the space', completed: false },
      { id: '5', instruction: 'Close by reversing opening motion until lid sits flush and secure', completed: false },
      { id: '6', instruction: 'Choose container with different mechanism and repeat the sequence', completed: false }
    ]
  },

  'folding-cloth': {
    id: 'folding-cloth',
    title: 'Folding Cloth',
    description: 'Develop precise movements and spatial reasoning',
    icon: '🧺',
    ageRange: '3-6 years',
    duration: '7 minutes',
    isPremium: true,
    purpose: 'Enhance fine motor precision and mathematical concepts',
    materials: [
      'Various sizes of cloth squares',
      'Different textures of fabric',
      'Flat surface for folding',
      'Basket for storage'
    ],
    steps: [
      { id: '1', instruction: 'Lay cloth completely flat with all corners visible and edges straight', completed: false },
      { id: '2', instruction: 'Smooth from center outward using palm to remove all wrinkles and air', completed: false },
      { id: '3', instruction: 'Bring one edge to meet opposite edge exactly, creating precise alignment', completed: false },
      { id: '4', instruction: 'Press fold firmly from one end to other using side of hand', completed: false },
      { id: '5', instruction: 'For second fold: bring folded edge to opposite edge, maintaining corners', completed: false },
      { id: '6', instruction: 'Carry folded cloth with both hands and place gently in basket center', completed: false }
    ]
  },

  'transferring-activities': {
    id: 'transferring-activities',
    title: 'Transferring Activities',
    description: 'Use tools to move materials from one container to another',
    icon: '🥄',
    ageRange: '2-5 years',
    duration: '10 minutes',
    isPremium: true,
    purpose: 'Develop tool use, concentration, and hand-eye coordination',
    materials: [
      'Two bowls',
      'Various tools (spoons, tongs, tweezers)',
      'Materials to transfer (beans, pompoms, etc.)',
      'Small cloth for cleanup'
    ],
    steps: [
      { id: '1', instruction: 'Position source bowl on left, destination bowl on right, tools between them', completed: false },
      { id: '2', instruction: 'Select appropriate tool: spoon for round objects, tongs for irregular shapes', completed: false },
      { id: '3', instruction: 'Grasp tool properly and pick up exactly one item with controlled pressure', completed: false },
      { id: '4', instruction: 'Transport item smoothly without dropping, moving deliberately to target bowl', completed: false },
      { id: '5', instruction: 'Continue transferring one item at a time until source bowl is completely empty', completed: false },
      { id: '6', instruction: 'Clean work surface using cloth in systematic left-to-right motions', completed: false }
    ]
  }
};