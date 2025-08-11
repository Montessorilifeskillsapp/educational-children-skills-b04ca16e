interface Step {
  id: string;
  instruction: string;
  completed: boolean;
}

interface SkillData {
  title: string;
  icon: string;
  purpose: string;
  materials: string[];
  steps: Step[];
}

export const moreSkills: Record<string, SkillData> = {
  'wiping-table': {
    title: 'Wiping the Table',
    icon: '🧽',
    purpose: 'Develops cleaning skills, attention to detail, and contributes to household care.',
    materials: ['Damp cloth', 'Dry towel', 'Spray bottle', 'Table cleaner', 'Paper towels'],
    steps: [
      { id: '1', instruction: 'Clear all items from the table surface', completed: false },
      { id: '2', instruction: 'Spray table cleaner evenly across the surface', completed: false },
      { id: '3', instruction: 'Wipe the table with a damp cloth in circular motions', completed: false },
      { id: '4', instruction: 'Pay special attention to sticky spots and crumbs', completed: false },
      { id: '5', instruction: 'Dry the table completely with a clean towel', completed: false },
      { id: '6', instruction: 'Put cleaning supplies away in their proper place', completed: false }
    ]
  },
  'feeding-pet': {
    title: 'Feeding the Pet',
    icon: '🐕',
    purpose: 'Teaches responsibility, care for living things, and daily routine.',
    materials: ['Pet food', 'Food bowl', 'Water bowl', 'Measuring cup', 'Pet treats'],
    steps: [
      { id: '1', instruction: 'Measure the correct amount of pet food', completed: false },
      { id: '2', instruction: 'Pour food carefully into the pet\'s bowl', completed: false },
      { id: '3', instruction: 'Check that the water bowl is clean and full', completed: false },
      { id: '4', instruction: 'Place food and water bowls in the pet\'s eating area', completed: false },
      { id: '5', instruction: 'Call your pet gently to come eat', completed: false },
      { id: '6', instruction: 'Put away pet food and clean up any spills', completed: false }
    ]
  },
  'folding-clothes': {
    title: 'Folding Clothes',
    icon: '👕',
    purpose: 'Develops fine motor skills, order, and care for personal belongings.',
    materials: ['Clean clothes', 'Flat surface', 'Hangers', 'Dresser drawers', 'Laundry basket'],
    steps: [
      { id: '1', instruction: 'Lay the clothing item flat on a clean surface', completed: false },
      { id: '2', instruction: 'Smooth out any wrinkles with your hands', completed: false },
      { id: '3', instruction: 'Fold sleeves toward the center of the shirt', completed: false },
      { id: '4', instruction: 'Fold the bottom of the shirt up to meet the top', completed: false },
      { id: '5', instruction: 'Make sure edges line up neatly', completed: false },
      { id: '6', instruction: 'Place folded clothes in dresser or on shelf', completed: false }
    ]
  }
};

export type { Step, SkillData };