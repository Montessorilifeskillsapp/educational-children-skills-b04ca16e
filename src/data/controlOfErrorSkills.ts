export const controlOfErrorSkills = {
  'pouring-water': {
    id: 'pouring-water',
    title: 'Pouring Water',
    description: 'Master precise pouring with built-in error control',
    icon: '💧',
    ageRange: '2-4 years',
    duration: '10 minutes',
    isPremium: false,
    purpose: 'Develops control of movement and self-correction',
    materials: ['Two identical pitchers', 'Water', 'Sponge', 'Tray'],
    steps: [
      'Position both pitchers on tray with spouts facing same direction, 2 inches apart',
      'Hold filled pitcher with both hands: dominant hand on handle, other supporting base',
      'Lift and tilt pitcher slowly until water stream is thin as pencil lead',
      'Observe water level rising - any spills create immediate visual feedback on tray',
      'Dab spilled water with sponge using gentle pressing motion, wringing into pitcher',
      'Repeat pouring exercise until you can transfer water with zero spillage'
    ]
  },
  'spooning-beans': {
    id: 'spooning-beans',
    title: 'Spooning Beans',
    description: 'Transfer objects with precision and control',
    icon: '🥄',
    ageRange: '2-3 years',
    duration: '8 minutes',
    isPremium: false,
    purpose: 'Develops fine motor control and concentration',
    materials: ['Two bowls', 'Spoon', 'Dried beans', 'Tray'],
    steps: [
      'Arrange bowls on tray: filled bowl on left, empty on right, spoon beside them',
      'Scoop exactly one bean by sliding spoon under it with gentle lifting motion',
      'Count aloud any beans that fall: "One bean fell, two beans fell" - this shows your control',
      'Use spoon to collect fallen beans individually and place in destination bowl',
      'Transfer all beans one by one until source bowl is completely empty'
    ]
  },
  'folding-cloth': {
    id: 'folding-cloth',
    title: 'Folding Cloth',
    description: 'Learn precise folding with visual feedback',
    icon: '🧺',
    ageRange: '3-5 years',
    duration: '12 minutes',
    isPremium: true,
    purpose: 'Develops order, sequence, and self-correction',
    materials: ['Square cloth with lines marked', 'Basket'],
    steps: [
      'Spread marked cloth flat with guide lines clearly visible and accessible',
      'Align cloth edge precisely with first marked line, using line as folding guide',
      'Check fold accuracy: edges should align perfectly - any mismatch is immediately visible',
      'If edges don\'t match exactly, unfold completely and realign with guide line',
      'When fold is perfect with no overhang, place folded cloth carefully in basket'
    ]
  },
  'sorting-objects': {
    id: 'sorting-objects',
    title: 'Sorting Objects',
    description: 'Classify and organize with self-checking',
    icon: '🔢',
    ageRange: '3-4 years',
    duration: '15 minutes',
    isPremium: false,
    purpose: 'Develops classification and logical thinking',
    materials: ['Mixed objects', 'Sorting trays', 'Control chart'],
    steps: [
      'Examine each object carefully, noting specific characteristics like color, size, texture, shape',
      'Select one sorting criteria (color OR size OR shape) and announce your choice aloud',
      'Place each object in designated tray section based on your chosen criteria',
      'Compare your sorting results with control chart - misplaced items are immediately evident',
      'Correct any errors by moving misplaced objects to appropriate sections',
      'Gather all objects, select different sorting criteria, and repeat entire process'
    ]
  }
};