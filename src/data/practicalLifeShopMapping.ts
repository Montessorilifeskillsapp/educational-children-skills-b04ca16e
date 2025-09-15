// Mapping of practical life skills to shop items
export const practicalLifeShopMapping: Record<string, string[]> = {
  // Care of Person/Self
  'hand-washing': ['washing-station'],
  'washing-hands': ['washing-station'],
  'dressing-frames': ['dressing-frames-set'],
  'brushing-teeth': ['child-toothbrush-set'],
  'brushing-hair': ['hair-care-set'],
  'shoe-tying': ['shoe-tying-frame'],
  'buttoning': ['dressing-frames-set'],
  'zipping': ['dressing-frames-set'],
  'snapping': ['dressing-frames-set'],
  'lacing': ['dressing-frames-set'],
  'buckling': ['dressing-frames-set'],
  'velcro': ['dressing-frames-set'],
  'self-dressing': ['dressing-frames-set'],
  'personal-hygiene': ['personal-hygiene-kit'],

  // Care of Environment 
  'sweeping-floor': ['child-broom-set'],
  'watering-plants': ['flower-arranging', 'plant-care-set'],
  'dusting-furniture': ['polishing-set'],
  'table-wiping': ['table-scrubbing'],
  'window-washing': ['table-scrubbing', 'window-cleaning-set'],
  'mopping-floor': ['child-broom-set', 'child-mop-set'],
  'dishwashing': ['washing-station', 'dish-washing-set'],
  'leaf-polishing': ['polishing-set'],
  'flower-arranging': ['flower-arranging'],
  'table-setting': ['child-table-setting'],
  'polishing-mirror': ['polishing-set'],
  'vacuuming': ['child-vacuum-set'],
  'organizing-shelves': ['sorting-baskets'],
  'caring-for-plants': ['plant-care-set'],
  'feeding-pets': ['pet-care-set'],
  'washing-dishes': ['dish-washing-set'],
  'making-beds': ['bed-making-set'],
  'folding-laundry': ['laundry-care-set'],

  // Grace and Courtesy
  'greeting-people': ['grace-courtesy-cards'],
  'saying-please-thank-you': ['grace-courtesy-cards'],
  'waiting-turn': ['grace-courtesy-cards'],
  'interrupting-politely': ['grace-courtesy-cards'],
  'offering-help': ['grace-courtesy-cards'],
  'walking-quietly': ['grace-courtesy-cards'],
  'sitting-properly': ['grace-courtesy-cards'],
  'listening-skills': ['grace-courtesy-cards'],

  // Control of Movement
  'walking-line': ['balance-beam-set'],
  'carrying-objects': ['carrying-trays'],
  'pouring-exercises': ['pouring-set'],
  'pouring-water': ['pouring-set', 'glass-pitcher-set'],
  'dry-pouring': ['dry-pouring-set'],
  'wet-pouring': ['glass-pitcher-set'],
  'opening-closing': ['dressing-frames-set', 'locks-keys-set'],
  'folding-cloth': ['dressing-frames-set', 'cloth-folding-set'],
  'transferring-activities': ['spooning-set', 'transferring-set'],
  'spooning': ['spooning-set'],
  'spooning-beans': ['spooning-set'],
  'squeezing-orange-juice': ['food-preparation'],
  'threading-beads': ['threading-set'],
  'cutting-paper': ['child-scissors-set'],
  'pincer-grasp': ['pincer-grasp-set'],
  'sorting-objects': ['sorting-trays'],

  // Food Preparation
  'food-preparation': ['food-preparation'],
  'cutting-vegetables': ['food-preparation'],
  'juicing': ['food-preparation'],
  'peeling-carrots': ['food-preparation'],
  'slicing-bananas': ['food-preparation'],
  'spreading-butter': ['food-preparation'],
  'making-sandwiches': ['food-preparation'],
  'washing-fruit': ['food-preparation'],
  'setting-snack-table': ['child-table-setting', 'food-preparation'],
  'preparing-drinks': ['glass-pitcher-set', 'food-preparation'],
  'measuring-ingredients': ['measuring-tools-set'],
  'mixing-ingredients': ['mixing-bowls-set'],
  'baking-simple-recipes': ['child-baking-set']
};

// Function to get shop items for a skill
export const getShopItemsForSkill = (skillId: string): string[] => {
  return practicalLifeShopMapping[skillId] || [];
};