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
      { id: '1', instruction: 'Stand at any point on the line', completed: false },
      { id: '2', instruction: 'Place right foot on the line, heel to toe', completed: false },
      { id: '3', instruction: 'Bring left foot forward, heel touching right toe', completed: false },
      { id: '4', instruction: 'Continue walking heel-to-toe around the line', completed: false },
      { id: '5', instruction: 'Keep arms balanced and body upright', completed: false },
      { id: '6', instruction: 'Complete full circle maintaining balance', completed: false }
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
      { id: '1', instruction: 'Assess the object to be carried', completed: false },
      { id: '2', instruction: 'Use both hands when possible', completed: false },
      { id: '3', instruction: 'Hold object close to body', completed: false },
      { id: '4', instruction: 'Walk slowly and deliberately', completed: false },
      { id: '5', instruction: 'Watch path for obstacles', completed: false },
      { id: '6', instruction: 'Place object gently at destination', completed: false }
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
      { id: '1', instruction: 'Place full pitcher on left, empty on right', completed: false },
      { id: '2', instruction: 'Grasp pitcher handle with dominant hand', completed: false },
      { id: '3', instruction: 'Support pitcher bottom with other hand', completed: false },
      { id: '4', instruction: 'Pour slowly and steadily into empty pitcher', completed: false },
      { id: '5', instruction: 'Stop pouring before pitcher is full', completed: false },
      { id: '6', instruction: 'Return pitcher to tray', completed: false },
      { id: '7', instruction: 'Clean any spills with sponge', completed: false }
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
      { id: '1', instruction: 'Choose container to practice with', completed: false },
      { id: '2', instruction: 'Use appropriate grip for the mechanism', completed: false },
      { id: '3', instruction: 'Open container carefully', completed: false },
      { id: '4', instruction: 'Place or remove objects as desired', completed: false },
      { id: '5', instruction: 'Close container securely', completed: false },
      { id: '6', instruction: 'Try different types of containers', completed: false }
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
      { id: '1', instruction: 'Lay cloth flat on surface', completed: false },
      { id: '2', instruction: 'Smooth out any wrinkles', completed: false },
      { id: '3', instruction: 'Fold cloth in half, matching edges exactly', completed: false },
      { id: '4', instruction: 'Smooth fold with hand', completed: false },
      { id: '5', instruction: 'Continue folding as desired', completed: false },
      { id: '6', instruction: 'Place folded cloth in basket', completed: false }
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
      { id: '1', instruction: 'Place full bowl on left, empty on right', completed: false },
      { id: '2', instruction: 'Select appropriate tool for material', completed: false },
      { id: '3', instruction: 'Pick up one item at a time', completed: false },
      { id: '4', instruction: 'Transfer carefully to empty bowl', completed: false },
      { id: '5', instruction: 'Continue until all items are transferred', completed: false },
      { id: '6', instruction: 'Clean workspace when finished', completed: false }
    ]
  }
};