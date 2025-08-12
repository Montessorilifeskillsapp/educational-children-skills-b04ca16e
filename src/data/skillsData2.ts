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

export const skillsData2: Record<string, SkillData> = {
  'flower-arranging': {
    title: 'Flower Arranging',
    icon: '🌸',
    purpose: 'Cultivates aesthetic sense and care for living things.',
    materials: ['Fresh flowers', 'Clean vase', 'Water', 'Small scissors', 'Newspaper'],
    steps: [
      { id: '1', instruction: 'Fill vase with clean water', completed: false },
      { id: '2', instruction: 'Trim flower stems at an angle', completed: false },
      { id: '3', instruction: 'Remove leaves below water line', completed: false },
      { id: '4', instruction: 'Arrange flowers in vase by height', completed: false },
      { id: '5', instruction: 'Clean up workspace and enjoy arrangement', completed: false }
    ]
  },
  'polishing': {
    title: 'Polishing',
    icon: '✨',
    purpose: 'Learns care of environment through detailed work.',
    materials: ['Object to polish', 'Polish', 'Soft cloth', 'Tray', 'Newspaper'],
    steps: [
      { id: '1', instruction: 'Place object and materials on tray', completed: false },
      { id: '2', instruction: 'Apply small amount of polish to cloth', completed: false },
      { id: '3', instruction: 'Rub polish into object in circular motions', completed: false },
      { id: '4', instruction: 'Buff with clean cloth until shiny', completed: false },
      { id: '5', instruction: 'Clean and put away all materials', completed: false }
    ]
  },
  'sweeping': {
    title: 'Sweeping',
    icon: '🧹',
    purpose: 'Develops coordination and environmental responsibility.',
    materials: ['Child-sized broom', 'Dustpan', 'Small brush', 'Waste basket'],
    steps: [
      { id: '1', instruction: 'Hold broom with both hands', completed: false },
      { id: '2', instruction: 'Sweep debris into a pile', completed: false },
      { id: '3', instruction: 'Hold dustpan steady against floor', completed: false },
      { id: '4', instruction: 'Sweep pile into dustpan', completed: false },
      { id: '5', instruction: 'Empty dustpan into waste basket', completed: false }
    ]
  },
  'folding-clothes': {
    title: 'Folding Clothes',
    icon: '👕',
    purpose: 'Develops order, sequence, and care of belongings.',
    materials: ['Clean clothes', 'Flat surface', 'Laundry basket'],
    steps: [
      { id: '1', instruction: 'Lay garment flat on surface', completed: false },
      { id: '2', instruction: 'Smooth out wrinkles with hands', completed: false },
      { id: '3', instruction: 'Fold sleeves inward toward center', completed: false },
      { id: '4', instruction: 'Fold bottom up to create rectangle', completed: false },
      { id: '5', instruction: 'Place folded item in basket', completed: false }
    ]
  },
  'watering-plants': {
    title: 'Watering Plants',
    icon: '🪴',
    purpose: 'Develops care for living things and responsibility.',
    materials: ['Small watering can', 'Water', 'Plants', 'Towel for spills', 'Tray'],
    steps: [
      { id: '1', instruction: 'Fill watering can with appropriate amount', completed: false },
      { id: '2', instruction: 'Check soil moisture with finger', completed: false },
      { id: '3', instruction: 'Pour water slowly at base of plant', completed: false },
      { id: '4', instruction: 'Stop when soil is moist but not soggy', completed: false },
      { id: '5', instruction: 'Clean up spills and put away materials', completed: false }
    ]
  },
  'cutting-with-scissors': {
    title: 'Cutting with Scissors',
    icon: '✂️',
    purpose: 'Develops hand strength and precision for writing preparation.',
    materials: ['Child-safe scissors', 'Paper strips', 'Basket for scraps', 'Tray'],
    steps: [
      { id: '1', instruction: 'Hold scissors correctly with thumb and fingers', completed: false },
      { id: '2', instruction: 'Start cutting at edge of paper strip', completed: false },
      { id: '3', instruction: 'Open and close scissors in smooth motion', completed: false },
      { id: '4', instruction: 'Cut along lines or make straight cuts', completed: false },
      { id: '5', instruction: 'Put scraps in basket and scissors away', completed: false }
    ]
  },
  'preparing-snack': {
    title: 'Preparing Snack',
    icon: '🍎',
    purpose: 'Develops independence and healthy eating habits.',
    materials: ['Plate', 'Napkin', 'Healthy snack items', 'Child-safe knife', 'Cutting board'],
    steps: [
      { id: '1', instruction: 'Wash hands before handling food', completed: false },
      { id: '2', instruction: 'Place plate and napkin on table', completed: false },
      { id: '3', instruction: 'Arrange snack items on plate', completed: false },
      { id: '4', instruction: 'Cut fruit or vegetables if needed', completed: false },
      { id: '5', instruction: 'Clean up preparation area', completed: false }
    ]
  },
  'sweeping-floor': {
    title: 'Sweeping the Floor',
    icon: '🧹',
    purpose: 'Develops care of environment and responsibility.',
    materials: ['Child-sized broom', 'Dustpan', 'Small brush'],
    steps: [
      { id: '1', instruction: 'Hold broom properly with both hands', completed: false },
      { id: '2', instruction: 'Sweep in small sections', completed: false },
      { id: '3', instruction: 'Collect debris with dustpan', completed: false },
      { id: '4', instruction: 'Empty dustpan in trash', completed: false },
      { id: '5', instruction: 'Return tools to proper place', completed: false }
    ]
  },
  'dusting-furniture': {
    title: 'Dusting Furniture',
    icon: '🪶',
    purpose: 'Develops care of environment and attention to detail.',
    materials: ['Dust cloth', 'Spray bottle with water', 'Tray'],
    steps: [
      { id: '1', instruction: 'Spray cloth lightly with water', completed: false },
      { id: '2', instruction: 'Dust surfaces in circular motions', completed: false },
      { id: '3', instruction: 'Pay attention to corners and edges', completed: false },
      { id: '4', instruction: 'Rinse cloth when dirty', completed: false },
      { id: '5', instruction: 'Return materials to proper place', completed: false }
    ]
  },
  'organizing-shelf': {
    title: 'Organizing Shelf',
    icon: '📚',
    purpose: 'Develops care of environment and order.',
    materials: ['Shelf with materials', 'Cleaning cloth'],
    steps: [
      { id: '1', instruction: 'Remove all items from shelf', completed: false },
      { id: '2', instruction: 'Clean shelf surface', completed: false },
      { id: '3', instruction: 'Sort items by category', completed: false },
      { id: '4', instruction: 'Place items back neatly', completed: false },
      { id: '5', instruction: 'Check that everything has its place', completed: false }
    ]
  },
  'table-wiping': {
    title: 'Table Wiping',
    icon: '🧽',
    purpose: 'Develops care of environment, order, and coordinated movement.',
    materials: ['Small bucket', 'Sponge', 'Water with a drop of soap', 'Tray', 'Towel'],
    steps: [
      { id: '1', instruction: 'Fill the bucket with a small amount of soapy water', completed: false },
      { id: '2', instruction: 'Dip sponge and gently wring out excess water', completed: false },
      { id: '3', instruction: 'Wipe the table in straight lines from top to bottom', completed: false },
      { id: '4', instruction: 'Rinse sponge and repeat as needed', completed: false },
      { id: '5', instruction: 'Dry the table and put materials away', completed: false }
    ]
  },
  'window-washing': {
    title: 'Window Washing',
    icon: '🪟',
    purpose: 'Develops care of environment and attention to detail.',
    materials: ['Small spray bottle with water', 'Microfiber cloth or squeegee', 'Tray', 'Towel'],
    steps: [
      { id: '1', instruction: 'Spray the window lightly with water', completed: false },
      { id: '2', instruction: 'Wipe from top to bottom in straight lines', completed: false },
      { id: '3', instruction: 'Dry edges and corners with a towel', completed: false },
      { id: '4', instruction: 'Clean any drips on the floor or sill', completed: false },
      { id: '5', instruction: 'Return all materials to the shelf', completed: false }
    ]
  }
};

export type { Step, SkillData };