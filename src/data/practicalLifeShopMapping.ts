// Mapping of practical life skills to shop items
export const practicalLifeShopMapping: Record<string, string[]> = {
  // Care of Person
  'hand-washing': ['washing-station'],
  'dressing-frames': ['dressing-frames-set'],
  'brushing-teeth': ['child-toothbrush-set'],
  'brushing-hair': ['hair-care-set'],

  // Care of Environment 
  'sweeping-floor': ['child-broom-set'],
  'watering-plants': ['flower-arranging'],
  'dusting-furniture': ['polishing-set'],
  'table-wiping': ['table-scrubbing'],
  'window-washing': ['table-scrubbing'],
  'mopping-floor': ['child-broom-set'],
  'dishwashing': ['washing-station'],
  'leaf-polishing': ['polishing-set'],
  'flower-arranging': ['flower-arranging'],
  'table-setting': ['child-table-setting'],
  'polishing-mirror': ['polishing-set'],

  // Grace and Courtesy
  'greeting-people': [],
  'saying-please-thank-you': [],
  'waiting-turn': [],
  'interrupting-politely': [],
  'offering-help': [],

  // Control of Movement
  'walking-line': [],
  'carrying-objects': [],
  'pouring-exercises': ['pouring-set'],
  'pouring-water': ['pouring-set', 'glass-pitcher-set'],
  'dry-pouring': ['dry-pouring-set'],
  'wet-pouring': ['glass-pitcher-set'],
  'opening-closing': ['dressing-frames-set'],
  'folding-cloth': ['dressing-frames-set'],
  'transferring-activities': ['spooning-set'],
  'spooning': ['spooning-set'],
  'squeezing-orange-juice': ['food-preparation'],

  // Food Preparation
  'food-preparation': ['food-preparation'],
  'cutting-vegetables': ['food-preparation'],
  'juicing': ['food-preparation']
};

// Function to get shop items for a skill
export const getShopItemsForSkill = (skillId: string): string[] => {
  return practicalLifeShopMapping[skillId] || [];
};