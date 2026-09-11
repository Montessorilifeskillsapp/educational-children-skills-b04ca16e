/**
 * Cleans raw material labels coming from curriculum data so the materials list
 * only contains real, sourceable items:
 *  - drops non-items (environment, people, vague placeholders)
 *  - trims descriptive tails, parentheticals and "or ..." alternatives
 *  - merges near-duplicates onto one canonical name
 */

const DROP_EXACT = new Set(
  [
    'a child working at the mat',
    'calm environment',
    'quiet environment',
    'quiet observation spot',
    'comfortable reading area',
    'darkened room',
    'clear table space',
    'clear walking path',
    'open floor space',
    'floor space or table space',
    'small bench or floor space',
    'visual waiting spot',
    'none required',
    'popular classroom materials',
    'practice activities requiring assistance',
    'practice objects for requesting',
    'practice foods',
    'props as needed',
    'research materials',
    'craft materials',
    'art supplies',
    'biome diorama materials',
    'real objects from the environment',
    'real food samples when possible',
    'simple ingredients',
    'simple prepared foods',
    'simple snack',
    'sunny and shady locations',
    'small group of children or two adults for modeling',
    'small object or activity that only one child can use',
    'hook or place to hang apron',
    'pointer or finger',
    'stylus or finger',
    'drum or clapping hands',
    'temperature tools',
    'measuring tools',
    'model phrases',
    'objects to dust',
    'various maps',
    'nature collection items',
    'nomenclature objects',
    'action props',
    'fingerplay props',
    'clear water basin',
    'water',
    'colored water',
    'table',
    'elliptical line marked on floor',
    'large ellipse taped on the floor',
    'tape lines on floor',
    'two mats or tables set apart',
    'simple food such as banana slices',
    'quiet peace table',
  ].map((s) => s.toLowerCase())
);

/** Explicit merges for near-duplicate labels (lowercased key -> canonical name). */
const ALIASES: Record<string, string> = {
  baskets: 'Basket',
  'basket for objects': 'Basket',
  'basket for scraps': 'Basket',
  'basket or tray': 'Basket',
  mats: 'Work mat',
  'small mat': 'Work mat',
  'reading mat': 'Work mat',
  'large work mat': 'Work mat',
  'work mat or small rug on the floor': 'Work mat',
  'small cotton or woven work mat': 'Work mat',
  'small cotton': 'Work mat',
  music: 'Music samples',
  'floor mat': 'Work mat',
  trays: 'Tray',
  'tray for materials': 'Tray',
  'tray for supplies': 'Tray',
  'tray with low edges': 'Tray',
  'small tray for carrying': 'Tray',
  'small wooden tray': 'Wooden tray',
  cloths: 'Cloth',
  'dry cloths': 'Cloth',
  'drying cloth': 'Cloth',
  'cloth for drying': 'Cloth',
  'small cotton cloths': 'Cotton cloth',
  'cloth napkins': 'Cloth napkin',
  napkins: 'Napkin',
  'bucket for dirty water': 'Bucket',
  'small bucket': 'Bucket',
  'cup for water': 'Cup',
  'cup for remainders': 'Cup',
  'cup of water for rinsing': 'Cup',
  'towel for spills': 'Towel',
  'hand towel': 'Towel',
  'small towel': 'Towel',
  'waste bin': 'Waste basket',
  'golden ten bars': 'Golden bead ten bars',
  'ten bars': 'Golden bead ten bars',
  'golden bead ten bars and units': 'Golden bead ten bars and unit beads',
  'colored bead bars 1-9': 'Colored bead stair (1–9)',
  'small basin or child-height sink': 'Small basin',
  'small basin with warm water': 'Small basin',
  'basin with soapy water': 'Small basin',
  'water with mild soap': 'Mild soap',
  'small bar of soap or soap flakes': 'Bar of soap',
  'bar of soap in a soap dish': 'Bar of soap',
  'pitcher of warm water': 'Child-sized pitcher',
  'child-sized pitcher and cups': 'Child-sized pitcher',
  'two identical small pitchers': 'Two matching pitchers',
  'small pitcher of water tinted with blue food colouring': 'Child-sized pitcher',
  globe: 'Globe',
  'world globe': 'Colored globe',
  'colored continent globe': 'Colored globe',
  'small planet models or cards': 'Set of small planet models',
  'matching planet picture cards': 'Planet cards',
  'grammar box materials': 'Grammar boxes',
  'grammar symbol set': 'Complete grammar symbol set',
  'grammar symbol shapes': 'Complete grammar symbol set',
  'moveable alphabet': 'Moveable alphabet',
  'sandpaper letters for reference': 'Sandpaper letters',
  'sandpaper letters (consonants and vowels)': 'Sandpaper letters',
  'colored pencils (green, blue, red)': 'Colored pencils',
  'blindfold (optional)': 'Blindfold',
  'control chart showing all 10 forms': 'Land and water forms control chart',
  'control chart showing planet order': 'Solar system control chart',
  'various objects to carry': 'Objects to carry',
  'optional: objects to carry': 'Objects to carry',
  'small objects to transfer': 'Transfer objects',
  'small objects (6-10)': 'Sound game objects (6–10)',
  'collection of small objects': 'Counting objects',
  'collection of small objects (buttons, shells, beads)': 'Counting objects',
  'small objects to pass': 'Grace and Courtesy passing object',
  'small objects or picture cards for acting out': 'Pink sentence objects or picture cards',
  'leaf shape cards (3 sets)': 'Leaf shape cards',
  'seeds or seedlings': 'Seeds',
  'plant specimens at different stages': 'Plant specimens',
  'real leaf specimens': 'Leaf specimens',
  'various leaf specimens': 'Leaf specimens',
  'small watering can': 'Watering can',
  'timer (optional)': 'Timer',
  'music (optional)': 'Music samples',
  'hand drum (optional)': 'Hand drum',
  'recording device (optional)': 'Recording device',
  'tray of sand (optional)': 'Sand tray',
  'small reading rug (optional)': 'Reading mat',
  'notched number cards': 'Notched number cards',
  'number cards 1-9': 'Number cards 1–9',
  'number cards 1-10': 'Number cards 1–10',
  'number cards': 'Number cards',
  'small number cards': 'Small number cards',
  'large number cards (1-9000)': 'Large number cards',
  'child-sized apron': 'Apron',
  'small bar of soap': 'Bar of soap',
  'small brush': 'Brush',
  'child-sized placemat': 'Placemat',
  'small cups': 'Cup',
  'small mirror': 'Mirror',
  'small plants': 'Plants',
  'tray of sand': 'Sand tray',
  'small planet models': 'Set of small planet models',
  'small figurines': 'Miniature figures',
  'small sponge': 'Sponge',
  'small tray': 'Tray',
  'soft cloths': 'Soft cloth',
  'spray bottle with water': 'Spray bottle',
  'water spray bottle': 'Spray bottle',
  'two small bowls': 'Two bowls',
  'real root specimens': 'Root specimens',
  'various plant stems': 'Plant stems',
  'various objects of different sizes and weights': 'Objects varying in size and weight',
  'small basket with assorted containers': 'Opening and closing containers in a basket',

  // Practical Life materials
  'lids that screw, snap': 'Opening and closing containers',
  'fabric panels shaped like shoe fronts': 'Lacing dressing frame panels',
  'two fabric panels': 'Lacing dressing frame panels',
  'wooden frame with eyelets': 'Lacing dressing frame',
  'wooden dressing frame with bow ties': 'Bow-tying dressing frame',
  'wooden dressing frame with buckle strap': 'Buckle dressing frame',
  'wooden dressing frame with large buttons': 'Button dressing frame',
  'wooden frame with metal snaps': 'Snap dressing frame',
  'wooden frame with separating zipper': 'Zipper dressing frame',

  // Sensorial materials
  '10 brown wooden prisms': 'Brown Stair (10 prisms)',
  '10 pink wooden cubes': 'Pink Tower (10 cubes)',
  '10 red wooden rods': 'Red Rods (10 rods)',
  '4 boxes of 10 colored cylinders (red, yellow, green, blue)': 'Knobless Cylinders (four boxes)',
  '4 wooden blocks with 10 cylinders each': 'Cylinder Blocks (four blocks)',
  '6-8 familiar objects of contrasting shapes': 'Mystery Bag with familiar objects',
  '8 small dropper bottles (4 pairs)': 'Tasting Bottles (four matching pairs)',
  'card material (3 sets)': 'Geometric Cabinet cards (three series)',
  'fabric box with pairs of different textures (silk, cotton, velvet, burlap, corduroy, felt, etc.)': 'Fabric Box with matching fabric pairs',
  'geometric cabinet with 6 drawers': 'Geometric Cabinet',
  'rectangular box with colored triangles': 'Constructive Triangles box',
  'set of 10 geometric solids (sphere, cube, cylinder, cone, ovoid, ellipsoid, rectangular prism, triangular prism, square pyramid, triangular pyramid)': 'Geometric Solids (set of 10)',
  'three sets of wooden tablets': 'Baric Tablets (three weight sets)',
  'two sets of 6 matching bottles with scents': 'Smelling Bottles (six matching pairs)',
  'two sets of sound cylinders (red and blue)': 'Sound Cylinders (red and blue boxes)',
  'binomial cube box with painted lid pattern': 'Binomial Cube',
  'trinomial cube box with painted lid pattern': 'Trinomial Cube',

  // Mathematics materials
  'black and white stair': 'Black and White Bead Stair',
  'black and white verification stair': 'Black and White Bead Stair',
  '45 spindles': 'Spindles (45)',
  '55 red counters': 'Red counters (55)',
  '100 red beads': 'Red unit beads (100)',
  '81 green beads': 'Green unit beads (81)',
  'spindle box with compartments 0-9': 'Spindle Boxes (0–9)',
  'sandpaper number cards 0-9': 'Sandpaper Numerals (0–9)',
  'red and blue number rods': 'Number Rods',

  // Language, Geography, and Cultural materials
  'large moveable alphabet box': 'Large Moveable Alphabet',
  'set of 10 metal insets': 'Metal Insets (set of 10)',
  'three-part nomenclature cards (picture, label, control)': 'Three-part nomenclature cards',
  'sun card or yellow ball': 'Sun model',
  'montessori bells (brown and white sets)': 'Montessori Bells (brown and white series)',
  damper: 'Bell damper',

  // Mats
  mat: 'Work mat',
  'quiet reading mat': 'Work mat',
  'small reading rug': 'Work mat',
  'story mat': 'Work mat',
  'waiting mat': 'Work mat',
  'two sorting mats': 'Sorting mat',
  'sorting trays': 'Tray',

  // Cleaning
  'child-sized broom, dustpan and mop': 'Child-sized broom',
  'small brush and dustpan': 'Brush',
  'sponge or brush': 'Sponge',
  'damp sponge': 'Sponge',
  'small natural sponge': 'Sponge',
  'sponge and towel': 'Sponge',
  'soft cloth for cleaning': 'Soft cloth',
  'cotton cloth': 'Cloth',
  'small cloths to wash': 'Cloth',

  // Kitchen / containers
  'small bowl of water': 'Small bowl',
  'small bowl for sliced pieces': 'Small bowl',
  'small blunt knife': 'Small knife',
  'small plates and utensils': 'Plate',
  'cloth napkin': 'Napkin',

  // Paper and writing
  'pencil and paper': 'Pencils',
  paper: 'Drawing paper',
  'white paper': 'Drawing paper',
  'long strip of paper': 'Drawing paper',
  'small scissors': 'Child-safe scissors',

  // Cards
  'activity picture cards': 'Activity cards',
  'matching picture cards': 'Picture cards',
  'matching word cards': 'Word cards',
  'word cards for sorting': 'Word cards',
  'season picture cards': 'Season cards',
  'habitat pictures': 'Habitat cards',
  'flag cards with country labels': 'Flag cards',
  'landform nomenclature cards': 'Land and water form nomenclature cards',

  // Nature
  'bean seeds': 'Seeds',
  'seed collection': 'Seeds',

  // Art / misc
  'clay or plasticine': 'Clay',
  'clay or play dough': 'Clay',
  'play dough in four colors': 'Play dough',
  'music from different cultures': 'Music samples',
};

/** Trailing purpose clauses that add nothing to a shopping list. */
const TAIL_PATTERNS: RegExp[] = [
  /\s*\(optional\)\s*$/i,
  /\s*,?\s*for (cleanup|spills|drying|support|reference|modeling|carrying|advanced practice)\s*$/i,
  /\s*\bwhen possible\b\s*$/i,
];

/** Index of the first match that is not inside parentheses, or -1. */
function indexOutsideBrackets(text: string, pattern: RegExp): number {
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth = Math.max(0, depth - 1);
    else if (depth === 0 && pattern.test(text.slice(i, i + 4))) {
      if (new RegExp(`^(?:${pattern.source})`, pattern.flags).test(text.slice(i))) return i;
    }
  }
  return -1;
}

/** Drops a dangling "(" clause left behind by trimming. */
function balanceBrackets(text: string): string {
  const open = (text.match(/\(/g) || []).length;
  const close = (text.match(/\)/g) || []).length;
  if (open === close) return text;
  return text.slice(0, text.indexOf('(')).replace(/[,\s]+$/, '').trim();
}

function titleFirst(name: string): string {
  if (!name) return name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Returns a cleaned, canonical material name, or null when the entry is not a
 * real material and should be dropped from materials lists.
 */
export function cleanMaterialName(raw: string): string | null {
  let name = raw.replace(/\s+/g, ' ').trim();
  if (!name) return null;

  // Strip leading "Optional:" prefixes.
  name = name.replace(/^optional:\s*/i, '').trim();

  if (DROP_EXACT.has(name.toLowerCase())) return null;

  for (const pattern of TAIL_PATTERNS) {
    name = name.replace(pattern, '').trim();
  }

  // Drop "e.g." / example parentheticals but keep meaningful specs.
  name = name.replace(/\s*\((e\.g\.|such as)[^)]*\)\s*$/i, '').trim();

  // Trim descriptive tails after a colon/semicolon that sits outside brackets.
  const separator = indexOutsideBrackets(name, /[:;]/);
  if (separator > 3) name = name.slice(0, separator).trim();

  // Keep only the first option in "A or B" phrases, unless it reads as a spec.
  const orIndex = indexOutsideBrackets(name, /\sor\s/i);
  if (
    orIndex > 8 &&
    name.length > 12 &&
    !/^(rough and smooth|black and white)/i.test(name)
  ) {
    name = name.slice(0, orIndex).trim();
  }

  name = name.replace(/[,\s]+$/, '').trim();
  name = balanceBrackets(name);
  if (!name) return null;

  const alias = ALIASES[name.toLowerCase()];
  if (alias) return alias;

  if (DROP_EXACT.has(name.toLowerCase())) return null;

  return titleFirst(name);
}
