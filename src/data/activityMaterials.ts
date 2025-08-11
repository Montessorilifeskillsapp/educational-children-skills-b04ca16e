export interface Material {
  name: string;
  quantity?: string;
  essential: boolean;
  category: 'tool' | 'container' | 'supply' | 'safety';
}

export const activityMaterials: Record<string, Material[]> = {
  'brushing-teeth': [
    { name: 'Toothbrush', essential: true, category: 'tool' },
    { name: 'Toothpaste', quantity: 'pea-sized amount', essential: true, category: 'supply' },
    { name: 'Cup for water', essential: true, category: 'container' },
    { name: 'Small towel', essential: true, category: 'supply' },
    { name: 'Mirror', essential: false, category: 'tool' },
    { name: 'Timer', quantity: '2 minutes', essential: false, category: 'tool' }
  ],
  'washing-hands': [
    { name: 'Soap dispenser', essential: true, category: 'supply' },
    { name: 'Clean towel', essential: true, category: 'supply' },
    { name: 'Step stool', essential: false, category: 'safety' },
    { name: 'Nail brush', essential: false, category: 'tool' }
  ],
  'getting-dressed': [
    { name: 'Clean clothes', essential: true, category: 'supply' },
    { name: 'Underwear', essential: true, category: 'supply' },
    { name: 'Socks', essential: true, category: 'supply' },
    { name: 'Shoes', essential: true, category: 'supply' },
    { name: 'Mirror', essential: false, category: 'tool' },
    { name: 'Laundry basket', essential: false, category: 'container' }
  ],
  'making-bed': [
    { name: 'Bed sheets', essential: true, category: 'supply' },
    { name: 'Blanket or comforter', essential: true, category: 'supply' },
    { name: 'Pillows', essential: true, category: 'supply' },
    { name: 'Pillowcases', essential: true, category: 'supply' }
  ],
  'setting-table': [
    { name: 'Plates', quantity: 'one per person', essential: true, category: 'container' },
    { name: 'Forks', quantity: 'one per person', essential: true, category: 'tool' },
    { name: 'Knives', quantity: 'one per person', essential: true, category: 'tool' },
    { name: 'Spoons', quantity: 'one per person', essential: true, category: 'tool' },
    { name: 'Napkins', quantity: 'one per person', essential: true, category: 'supply' },
    { name: 'Cups or glasses', quantity: 'one per person', essential: true, category: 'container' },
    { name: 'Placemats', essential: false, category: 'supply' },
    { name: 'Centerpiece', essential: false, category: 'supply' }
  ],
  'tying-shoes': [
    { name: 'Shoes with laces', essential: true, category: 'supply' },
    { name: 'Practice board', essential: false, category: 'tool' },
    { name: 'Different colored laces', essential: false, category: 'supply' }
  ],
  'pouring': [
    { name: 'Two matching pitchers', essential: true, category: 'container' },
    { name: 'Water', essential: true, category: 'supply' },
    { name: 'Tray', essential: true, category: 'container' },
    { name: 'Sponge', essential: true, category: 'tool' },
    { name: 'Small towel', essential: true, category: 'supply' },
    { name: 'Funnel', essential: false, category: 'tool' }
  ],
  'spooning': [
    { name: 'Two small bowls', essential: true, category: 'container' },
    { name: 'Spoon', essential: true, category: 'tool' },
    { name: 'Beans or rice', quantity: 'small amount', essential: true, category: 'supply' },
    { name: 'Tray', essential: true, category: 'container' },
    { name: 'Small brush', essential: false, category: 'tool' }
  ],
  'flower-arranging': [
    { name: 'Fresh flowers', quantity: '5-7 stems', essential: true, category: 'supply' },
    { name: 'Clean vase', essential: true, category: 'container' },
    { name: 'Water', essential: true, category: 'supply' },
    { name: 'Small scissors', essential: true, category: 'tool' },
    { name: 'Newspaper or cloth', essential: true, category: 'supply' },
    { name: 'Flower food', essential: false, category: 'supply' }
  ],
  'polishing': [
    { name: 'Object to polish', quantity: 'metal or wood item', essential: true, category: 'supply' },
    { name: 'Polish', quantity: 'appropriate type', essential: true, category: 'supply' },
    { name: 'Soft cloth', quantity: '2-3 pieces', essential: true, category: 'tool' },
    { name: 'Tray', essential: true, category: 'container' },
    { name: 'Newspaper', essential: true, category: 'supply' },
    { name: 'Small brush', essential: false, category: 'tool' }
  ],
  'sweeping': [
    { name: 'Child-sized broom', essential: true, category: 'tool' },
    { name: 'Dustpan', essential: true, category: 'tool' },
    { name: 'Small brush', essential: false, category: 'tool' },
    { name: 'Waste basket', essential: true, category: 'container' },
    { name: 'Masking tape', quantity: 'for outline', essential: false, category: 'supply' }
  ],
  'folding-clothes': [
    { name: 'Clean clothes', essential: true, category: 'supply' },
    { name: 'Flat surface', essential: true, category: 'tool' },
    { name: 'Laundry basket', essential: true, category: 'container' },
    { name: 'Hangers', essential: false, category: 'tool' },
    { name: 'Folding board', essential: false, category: 'tool' }
  ],
  'watering-plants': [
    { name: 'Small watering can', essential: true, category: 'tool' },
    { name: 'Water', essential: true, category: 'supply' },
    { name: 'Plants', essential: true, category: 'supply' },
    { name: 'Towel for spills', essential: true, category: 'supply' },
    { name: 'Tray', essential: true, category: 'container' },
    { name: 'Plant mister', essential: false, category: 'tool' }
  ],
  'cutting-with-scissors': [
    { name: 'Child-safe scissors', essential: true, category: 'tool' },
    { name: 'Paper strips', essential: true, category: 'supply' },
    { name: 'Basket for scraps', essential: true, category: 'container' },
    { name: 'Tray', essential: true, category: 'container' },
    { name: 'Different paper types', essential: false, category: 'supply' },
    { name: 'Cutting lines template', essential: false, category: 'supply' }
  ],
  'preparing-snack': [
    { name: 'Plate', essential: true, category: 'container' },
    { name: 'Napkin', essential: true, category: 'supply' },
    { name: 'Healthy snack items', essential: true, category: 'supply' },
    { name: 'Child-safe knife', essential: false, category: 'tool' },
    { name: 'Cutting board', essential: false, category: 'tool' },
    { name: 'Cup for water', essential: false, category: 'container' }
  ]
};