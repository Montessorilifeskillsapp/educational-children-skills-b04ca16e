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
  mats: 'Mat',
  'small mat': 'Mat',
  'reading mat': 'Work mat',
  'large work mat': 'Work mat',
  'work mat or small rug on the floor': 'Work mat',
  'small cotton or woven work mat': 'Work mat',
  'floor mat': 'Work mat',
  trays: 'Tray',
  'tray for materials': 'Tray',
  'tray for supplies': 'Tray',
  'tray with low edges': 'Tray',
  'small tray for carrying': 'Small tray',
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
  'golden bead ten bars and units': 'Golden bead ten bars',
  'colored bead bars 1-9': 'Colored bead bars',
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
  'globe or world map': 'World globe',
  'world map or globe': 'World globe',
  globe: 'World globe',
  'small planet models or cards': 'Set of small planet models',
  'matching planet picture cards': 'Planet cards',
  'grammar box materials': 'Grammar boxes',
  'grammar symbol set': 'Grammar symbols',
  'grammar symbol shapes': 'Grammar symbols',
  'moveable alphabet (for support)': 'Large moveable alphabet box',
  'sandpaper letters for reference': 'Sandpaper letters',
  'sandpaper letters (consonants and vowels)': 'Sandpaper letters',
  'colored pencils (green, blue, red)': 'Colored pencils',
  'blindfold (optional)': 'Blindfold',
  'control chart (optional)': 'Control chart',
  'control chart showing all 10 forms': 'Control chart',
  'control chart showing planet order': 'Control chart',
  'various objects to carry': 'Objects to carry',
  'optional: objects to carry': 'Objects to carry',
  'small objects to transfer': 'Small objects',
  'small objects (6-10)': 'Small objects',
  'collection of small objects': 'Small objects',
  'collection of small objects (buttons, shells, beads)': 'Small objects',
  'small objects to pass': 'Small objects',
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
  'notched number cards (optional)': 'Number cards',
  'number cards 1-9': 'Number cards 1-10',
  'number cards': 'Number cards 1-10',
  'small number cards': 'Number cards 1-10',
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
  'small figurines': 'Small figurine',
  'small sponge': 'Sponge',
  'small tray': 'Tray',
  'soft cloths': 'Soft cloth',
  'spray bottle with water': 'Water spray bottle',
  'two small bowls': 'Two bowls',
  'real root specimens': 'Root specimens',
  'various plant stems': 'Plant stems',
  'various objects of different sizes and weights': 'Objects of different sizes',
  'small basket with assorted containers': 'Basket',
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
