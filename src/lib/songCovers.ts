// Song artwork matching the website (montessoristorybooks.com/songs), keyed by song title.
import child from '@/assets/songs/child.jpg.asset.json';
import numbers from '@/assets/songs/numbers.jpg.asset.json';
import shapes from '@/assets/songs/shapes.jpg.asset.json';
import rainbow from '@/assets/songs/rainbow.jpg.asset.json';
import dwarf from '@/assets/songs/dwarf.webp.asset.json';
import lineup from '@/assets/songs/lineup.jpg.asset.json';

const PICKLES = '/__l5e/assets-v1/8c31a694-a4ee-4ee1-a44d-a46b4ed1be8b/pickles-cat-learns-to-clean-up.jpg';
const RED_FOX = '/__l5e/assets-v1/7c373cf1-78c9-4090-9698-d85a88cb4725/red-velvet-fox-learns-to-read.jpg';
const FUDGE = '/__l5e/assets-v1/100d9963-d393-43c9-a379-4ce32f93dbc9/fudge-bear-continents.jpg';
const MACAROON = '/__l5e/assets-v1/9ca50038-23b2-4775-a051-e94f4f153bd0/macaroon-owl-planets.jpg';

// Order matters: "dwarf" must match before "planet".
const RULES: [RegExp, string][] = [
  [/montessori child/i, child.url],
  [/love our work|clean.?up/i, PICKLES],
  [/letter sounds/i, RED_FOX],
  [/numbers/i, numbers.url],
  [/shapes/i, shapes.url],
  [/continent/i, FUDGE],
  [/dwarf/i, dwarf.url],
  [/planet|round the sun/i, MACAROON],
  [/rainbow|colou?rs/i, rainbow.url],
  [/line.?up/i, lineup.url],
];

export function songCoverFor(title: string): string | null {
  return RULES.find(([re]) => re.test(title))?.[1] ?? null;
}
