interface Step {
  id: string;
  instruction: string;
  completed: boolean;
  videoUrl?: string;
}

interface SkillData {
  title: string;
  icon: string;
  purpose: string;
  materials: string[];
  steps: Step[];
}

export const skillsData: Record<string, SkillData> = {
  'brushing-teeth': {
    title: 'Brushing Teeth',
    icon: '🦷',
    purpose: 'Develops daily hygiene routine and self-care independence.',
    materials: ['Toothbrush', 'Toothpaste', 'Cup', 'Mirror', 'Towel'],
    steps: [
      { id: '1', instruction: 'Wet toothbrush with clean water', completed: false },
      { id: '2', instruction: 'Apply small amount of toothpaste to brush', completed: false },
      { id: '3', instruction: 'Brush teeth in circular motions for 2 minutes', completed: false },
      { id: '4', instruction: 'Rinse mouth thoroughly with water', completed: false },
      { id: '5', instruction: 'Clean toothbrush and put away supplies', completed: false }
    ]
  },
  'washing-hands': {
    title: 'Washing Hands',
    icon: '🧼',
    purpose: 'Essential hygiene skill for health and cleanliness.',
    materials: ['Soap', 'Water', 'Towel', 'Sink'],
    steps: [
      { id: '1', instruction: 'Turn on water to comfortable temperature', completed: false },
      { id: '2', instruction: 'Wet hands completely under running water', completed: false },
      { id: '3', instruction: 'Apply soap and rub hands together for 20 seconds', completed: false },
      { id: '4', instruction: 'Rinse hands thoroughly under clean water', completed: false },
      { id: '5', instruction: 'Dry hands with clean towel', completed: false }
    ]
  },
  'getting-dressed': {
    title: 'Getting Dressed',
    icon: '👕',
    purpose: 'Builds independence and fine motor coordination.',
    materials: ['Clothes', 'Mirror', 'Chair'],
    steps: [
      { id: '1', instruction: 'Choose appropriate clothes for the day', completed: false },
      { id: '2', instruction: 'Put on underwear and socks first', completed: false },
      { id: '3', instruction: 'Put on shirt by putting arms through sleeves', completed: false },
      { id: '4', instruction: 'Put on pants or skirt', completed: false },
      { id: '5', instruction: 'Check appearance in mirror and adjust as needed', completed: false }
    ]
  },
  'making-bed': {
    title: 'Making Bed',
    icon: '🛏️',
    purpose: 'Develops responsibility, organization skills, and daily routine habits.',
    materials: ['Bed sheets', 'Pillows', 'Blanket or comforter', 'Pillowcases'],
    steps: [
      { id: '1', instruction: 'Remove pillows and place them on a chair', completed: false },
      { id: '2', instruction: 'Pull sheets tight and smooth out wrinkles', completed: false },
      { id: '3', instruction: 'Arrange blanket or comforter evenly over bed', completed: false },
      { id: '4', instruction: 'Place pillows back at head of bed', completed: false },
      { id: '5', instruction: 'Smooth final wrinkles and check bed looks neat', completed: false }
    ]
  },
  'setting-table': {
    title: 'Setting Table',
    icon: '🍽️',
    purpose: 'Develops grace, courtesy, and meal preparation skills.',
    materials: ['Plates', 'Forks', 'Knives', 'Spoons', 'Napkins', 'Cups'],
    steps: [
      { id: '1', instruction: 'Place plate in center of each place setting', completed: false },
      { id: '2', instruction: 'Put fork on left side of plate', completed: false },
      { id: '3', instruction: 'Place knife and spoon on right side of plate', completed: false },
      { id: '4', instruction: 'Put napkin under fork or on plate', completed: false },
      { id: '5', instruction: 'Place cup above knife and spoon', completed: false }
    ]
  },
  'tying-shoes': {
    title: 'Tying Shoes',
    icon: '👟',
    purpose: 'Masters fine motor coordination and independence skills.',
    materials: ['Shoes with laces', 'Practice board', 'Colored laces'],
    steps: [
      { id: '1', instruction: 'Cross one lace over the other and pull tight', completed: false },
      { id: '2', instruction: 'Make a loop with one lace (bunny ear)', completed: false },
      { id: '3', instruction: 'Wrap other lace around the loop', completed: false },
      { id: '4', instruction: 'Push second lace through hole to make second loop', completed: false },
      { id: '5', instruction: 'Pull both loops tight to secure knot', completed: false }
    ]
  },
  'pouring': {
    title: 'Pouring Water',
    icon: '💧',
    purpose: 'Develops concentration and hand-eye coordination.',
    materials: ['Two matching pitchers', 'Water', 'Tray', 'Sponge', 'Towel'],
    steps: [
      { id: '1', instruction: 'Place both pitchers on tray with sponge', completed: false },
      { id: '2', instruction: 'Hold pitcher handle with dominant hand', completed: false },
      { id: '3', instruction: 'Pour slowly from one pitcher to the other', completed: false },
      { id: '4', instruction: 'Pour water back to original pitcher', completed: false },
      { id: '5', instruction: 'Clean up any spills with sponge', completed: false }
    ]
  },
  'spooning': {
    title: 'Spooning',
    icon: '🥄',
    purpose: 'Refines fine motor skills and prepares for writing.',
    materials: ['Two small bowls', 'Spoon', 'Beans or rice', 'Tray'],
    steps: [
      { id: '1', instruction: 'Place bowls and spoon on tray', completed: false },
      { id: '2', instruction: 'Hold spoon correctly with three fingers', completed: false },
      { id: '3', instruction: 'Scoop small amount from first bowl', completed: false },
      { id: '4', instruction: 'Transfer carefully to second bowl', completed: false },
      { id: '5', instruction: 'Continue until all items are transferred', completed: false }
    ]
  }
};

export type { Step, SkillData };