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
      { id: '1', instruction: 'Find a spot on the line and stand with both feet together', completed: false },
      { id: '2', instruction: 'Place your right foot carefully on the line', completed: false },
      { id: '3', instruction: 'Put your left foot in front, touching your right heel', completed: false },
      { id: '4', instruction: 'Walk slowly, always keeping one foot touching the other', completed: false },
      { id: '5', instruction: 'Hold your arms out to help you balance', completed: false },
      { id: '6', instruction: 'Walk all the way around the line without stepping off', completed: false }
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
      { id: '1', instruction: 'Look at what you need to carry and think about how heavy it is', completed: false },
      { id: '2', instruction: 'Use both hands to pick up the object safely', completed: false },
      { id: '3', instruction: 'Hold the object close to your body like a hug', completed: false },
      { id: '4', instruction: 'Walk slowly and carefully, taking small steps', completed: false },
      { id: '5', instruction: 'Look where you are going and watch for things in your way', completed: false },
      { id: '6', instruction: 'Gently put the object down where it belongs', completed: false }
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
      { id: '1', instruction: 'Put the full pitcher on your left side and empty one on your right', completed: false },
      { id: '2', instruction: 'Hold the pitcher handle with your stronger hand', completed: false },
      { id: '3', instruction: 'Use your other hand to support the bottom of the pitcher', completed: false },
      { id: '4', instruction: 'Pour very slowly and watch the beans move', completed: false },
      { id: '5', instruction: 'Stop pouring when the second pitcher is almost full', completed: false },
      { id: '6', instruction: 'Put the pitcher back on the tray gently', completed: false },
      { id: '7', instruction: 'Use the sponge to clean up any beans that fell', completed: false }
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
      { id: '1', instruction: 'Pick a container that looks interesting to you', completed: false },
      { id: '2', instruction: 'Look at how it opens - twist, lift, or pull?', completed: false },
      { id: '3', instruction: 'Open the container slowly and carefully', completed: false },
      { id: '4', instruction: 'Put something small inside or take something out', completed: false },
      { id: '5', instruction: 'Close the container so it fits tightly', completed: false },
      { id: '6', instruction: 'Try another container that opens differently', completed: false }
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
      { id: '1', instruction: 'Spread the cloth out flat on the table', completed: false },
      { id: '2', instruction: 'Use your hands to make the cloth smooth and flat', completed: false },
      { id: '3', instruction: 'Fold the cloth in half, making the edges meet perfectly', completed: false },
      { id: '4', instruction: 'Press down on the fold with your hand to make it neat', completed: false },
      { id: '5', instruction: 'Fold it again if you want to make it smaller', completed: false },
      { id: '6', instruction: 'Put your folded cloth carefully in the basket', completed: false }
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
      { id: '1', instruction: 'Put the full bowl on your left and empty bowl on your right', completed: false },
      { id: '2', instruction: 'Choose the best tool - spoon for big things, tongs for small', completed: false },
      { id: '3', instruction: 'Pick up just one item with your tool', completed: false },
      { id: '4', instruction: 'Move it carefully to the empty bowl', completed: false },
      { id: '5', instruction: 'Keep going until you move everything to the other bowl', completed: false },
      { id: '6', instruction: 'Wipe the table clean when you are all done', completed: false }
    ]
  }
};