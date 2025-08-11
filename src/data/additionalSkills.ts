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

export const additionalSkills: Record<string, SkillData> = {
  'setting-table': {
    title: 'Setting the Table',
    icon: '🍽️',
    purpose: 'Develops organization skills, spatial awareness, and contributes to family meals.',
    materials: ['Plates', 'Forks', 'Knives', 'Spoons', 'Cups or glasses', 'Napkins', 'Placemats (optional)'],
    steps: [
      { id: '1', instruction: 'Count how many people will eat and get that many plates', completed: false },
      { id: '2', instruction: 'Place one plate at each seat around the table', completed: false },
      { id: '3', instruction: 'Put a fork on the left side of each plate', completed: false },
      { id: '4', instruction: 'Place a knife and spoon on the right side of each plate', completed: false },
      { id: '5', instruction: 'Set a cup or glass above each plate', completed: false },
      { id: '6', instruction: 'Add napkins and check that everything looks neat', completed: false }
    ]
  },
  'preparing-snack': {
    title: 'Preparing a Snack',
    icon: '🥪',
    purpose: 'Teaches food preparation, kitchen safety, and develops independence in nutrition.',
    materials: ['Fresh fruits or vegetables', 'Crackers or bread', 'Cheese or protein', 'Child-safe knife', 'Cutting board', 'Clean plate', 'Napkins'],
    steps: [
      { id: '1', instruction: 'Wash your hands thoroughly before handling food', completed: false },
      { id: '2', instruction: 'Choose healthy ingredients like fruit, crackers, or cheese', completed: false },
      { id: '3', instruction: 'Get a clean plate and any needed utensils', completed: false },
      { id: '4', instruction: 'Carefully prepare food using safe cutting techniques', completed: false },
      { id: '5', instruction: 'Arrange food nicely on the plate', completed: false },
      { id: '6', instruction: 'Clean up workspace and put ingredients away', completed: false }
    ]
  }
};

export type { Step, SkillData };