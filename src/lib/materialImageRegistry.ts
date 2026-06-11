// Central registry mapping material name keywords to AMI-accurate photos.
// Used by SkillActivity to render an authentic Montessori image next to each
// material listed on an activity, across every curriculum area.

// Practical-life material composites
import transferTools from '@/assets/materials/transfer-tools.jpg';
import cleaningTools from '@/assets/materials/cleaning-tools.jpg';
import careOfPerson from '@/assets/materials/care-of-person.jpg';
import foodPrep from '@/assets/materials/food-prep.jpg';
import botanyCare from '@/assets/materials/botany-care.jpg';
import threading from '@/assets/materials/threading.jpg';
import cuttingWork from '@/assets/materials/cutting-work.jpg';
import spooning from '@/assets/materials/spooning.jpg';
import foldingCloths from '@/assets/materials/folding-cloths.jpg';
import dishwashing from '@/assets/materials/dishwashing.jpg';
import sorting from '@/assets/materials/sorting.jpg';
import dressingFrame from '@/assets/materials/dressing-frame.jpg';
import shoeTying from '@/assets/materials/shoe-tying.jpg';
import bedMaking from '@/assets/materials/bed-making.jpg';
import walkingLine from '@/assets/materials/walking-line.jpg';
import pictureCards from '@/assets/materials/picture-cards.jpg';

// Existing area-specific photos
import pinkTower from '@/assets/sensorial/pink-tower.jpg';
import brownStair from '@/assets/sensorial/brown-stair.jpg';
import redRods from '@/assets/sensorial/red-rods.jpg';
import colorTablets from '@/assets/sensorial/color-tablets.jpg';
import soundCylinders from '@/assets/sensorial/sound-cylinders.jpg';
import fabricBox from '@/assets/sensorial/fabric-box.jpg';
import touchBoards from '@/assets/sensorial/touch-boards.jpg';
import knobbedCylinders from '@/assets/sensorial/knobbed-cylinders.jpg';
import knoblessCylinders from '@/assets/sensorial/knobless-cylinders.jpg';
import constructiveTriangles from '@/assets/sensorial/constructive-triangles.jpg';
import geometricSolids from '@/assets/sensorial/geometric-solids.jpg';
import geometricCabinet from '@/assets/sensorial/geometric-cabinet.jpg';
import binomialCube from '@/assets/sensorial/binomial-cube.jpg';
import trinomialCube from '@/assets/sensorial/trinomial-cube.jpg';
import mysteryBag from '@/assets/sensorial/mystery-bag.jpg';
import thermicTablets from '@/assets/sensorial/thermic-tablets.jpg';
import baricTablets from '@/assets/sensorial/baric-tablets.jpg';
import smellingBottles from '@/assets/sensorial/smelling-bottles.jpg';
import tastingBottles from '@/assets/sensorial/tasting-bottles.jpg';

import numberRods from '@/assets/math/number-rods.jpg';
import goldenBeads from '@/assets/math/golden-beads.jpg';
import sandpaperNumbers from '@/assets/math/sandpaper-numbers.jpg';
import spindleBox from '@/assets/math/spindle-box.jpg';
import stampGame from '@/assets/math/stamp-game.jpg';

import sandpaperLetters from '@/assets/language/sandpaper-letters.jpg';
import metalInsets from '@/assets/language/metal-insets.jpg';

import leafShapes from '@/assets/botany/leaf-shapes.jpg';
import flowerParts from '@/assets/botany/flower-parts.jpg';

import continentsMap from '@/assets/geography/continents.jpg';
import worldMap from '@/assets/world-map.jpg';

import pouringSet from '@/assets/pouring-set.jpg';
import dressingFrames from '@/assets/dressing-frames.jpg';
import graceCourtesyTable from '@/assets/grace-courtesy-table-setting.jpg';

// Pattern → image. First match wins. Order matters: most specific first.
const PATTERNS: Array<{ test: RegExp; image: string }> = [
  // Sensorial
  { test: /pink tower/i, image: pinkTower },
  { test: /brown stair|broad stair/i, image: brownStair },
  { test: /red rod/i, image: redRods },
  { test: /color tablet/i, image: colorTablets },
  { test: /sound cylinder|sound box/i, image: soundCylinders },
  { test: /fabric box|fabric swatch/i, image: fabricBox },
  { test: /touch board|rough.*smooth|tactile board/i, image: touchBoards },
  { test: /knobbed cylinder/i, image: knobbedCylinders },
  { test: /knobless cylinder/i, image: knoblessCylinders },
  { test: /constructive triangle/i, image: constructiveTriangles },
  { test: /geometric solid/i, image: geometricSolids },
  { test: /geometric cabinet|geometric inset/i, image: geometricCabinet },
  { test: /binomial cube/i, image: binomialCube },
  { test: /trinomial cube/i, image: trinomialCube },
  { test: /mystery bag|stereognostic bag/i, image: mysteryBag },
  { test: /thermic|thermal tablet/i, image: thermicTablets },
  { test: /baric tablet|weight tablet/i, image: baricTablets },
  { test: /smelling bottle|scent bottle/i, image: smellingBottles },
  { test: /tasting bottle|taste bottle/i, image: tastingBottles },

  // Math
  { test: /number rod/i, image: numberRods },
  { test: /golden bead|hundred square|thousand cube|decimal system material/i, image: goldenBeads },
  { test: /sandpaper number/i, image: sandpaperNumbers },
  { test: /spindle box|spindle/i, image: spindleBox },
  { test: /stamp game|stamps?$/i, image: stampGame },
  { test: /hundred board|hundred chart/i, image: stampGame },

  // Language
  { test: /sandpaper letter/i, image: sandpaperLetters },
  { test: /metal inset/i, image: metalInsets },
  { test: /picture card|word card|three.?period|classified card|label card|nomenclature/i, image: pictureCards },
  { test: /lacing card|threading card|threading|bead.*string|stringing/i, image: threading },

  // Botany / Geography
  { test: /leaf (shape|inset|specimen|card)|leaves|venation/i, image: leafShapes },
  { test: /flower|petal|pollin/i, image: flowerParts },
  { test: /continent|globe/i, image: continentsMap },
  { test: /world map|puzzle map/i, image: worldMap },
  { test: /watering can|seedling|seeds?|plant mister|trowel|garden|soil|compost|pot(s|ted)?/i, image: botanyCare },

  // Practical life — care of person
  { test: /toothbrush|toothpaste|comb|hair tie|hairbrush|hand mirror|child mirror|nail/i, image: careOfPerson },
  { test: /washcloth|gentle soap|small towel|hand washing|washbasin|hand-?washing/i, image: careOfPerson },

  // Practical life — cleaning / care of environment
  { test: /broom|dustpan|mop|bucket|squeegee|vacuum|spray bottle|glass cleaner|floor cleaner|sponge|cleaning/i, image: cleaningTools },
  { test: /dish (soap|towel|rack)|washing basin|scrub brush|dishwashing/i, image: dishwashing },

  // Practical life — transfer & control of movement
  { test: /tong|tweezer|dropper|eye dropper|transfer/i, image: transferTools },
  { test: /spoon|scoop|ladle/i, image: spooning },
  { test: /pitcher|pour|funnel/i, image: pouringSet },

  // Practical life — food prep
  { test: /knife|cutting board|whisk|apron|mixing bowl|measuring (cup|spoon)|recipe|baking|fruit|vegetable|bread|cheese/i, image: foodPrep },

  // Practical life — dressing & shoe
  { test: /dressing frame|button frame|buckle frame|zipper|snap frame|velcro|bow frame|hook.*eye/i, image: dressingFrame },
  { test: /shoe.*lace|lace.*shoe|tying|shoelace/i, image: shoeTying },
  { test: /clothes|hanger|laundry|folding board/i, image: foldingCloths },
  { test: /cloth|napkin|fold/i, image: foldingCloths },

  // Practical life — household & grace
  { test: /mattress|fitted sheet|pillowcase|blanket|bed/i, image: bedMaking },
  { test: /placemat|cloth napkin|plate|utensil|fork|cup|glass|table setting/i, image: graceCourtesyTable },
  { test: /walking line|line.*tape|balance beam|bell|flag/i, image: walkingLine },

  // Sorting & manipulatives
  { test: /sort|categor|classification|basket|tray|compartment/i, image: sorting },
  { test: /scissor|cutting strip|paper strip/i, image: cuttingWork },
  { test: /padlock|key|lock/i, image: sorting },

  // Generic dressing frames fallback
  { test: /frame/i, image: dressingFrames },
];

/**
 * Resolve a material label to an AMI-accurate photo. Returns undefined when
 * no pattern matches (caller should render the label without a thumbnail).
 */
export function getMaterialImage(material: string): string | undefined {
  for (const { test, image } of PATTERNS) {
    if (test.test(material)) return image;
  }
  return undefined;
}
