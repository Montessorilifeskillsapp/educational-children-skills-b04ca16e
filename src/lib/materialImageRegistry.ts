// Central registry mapping material name keywords to AMI-accurate photos.
// Used by SkillActivity to render an authentic Montessori image next to each
// material listed on an activity, across every curriculum area.

// Practical-life material composites
import carryingTray from '@/assets/materials/carrying-tray.jpg';
import carryingChair from '@/assets/materials/carrying-chair.jpg';
import workMat from '@/assets/materials/work-mat.jpg';
import puttingOnCoat from '@/assets/materials/putting-on-coat.jpg';
import shoePolishing from '@/assets/materials/shoe-polishing.jpg';
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
import artSupplies from '@/assets/materials/art-supplies.jpg';
import writingMaterials from '@/assets/materials/writing-materials.jpg';
import storageContainers from '@/assets/materials/storage-containers.jpg';
import waterBasin from '@/assets/materials/water-basin.jpg';
import beadMaterial from '@/assets/materials/bead-material.jpg';
import moveableAlphabet from '@/assets/materials/moveable-alphabet.jpg';
import animalFigures from '@/assets/materials/animal-figures.jpg';
import chartsDiagrams from '@/assets/materials/charts-diagrams.jpg';

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
  // Disambiguation — these must win over the broader patterns below
  { test: /blindfold/i, image: mysteryBag },
  { test: /nomenclature card|three.?part card/i, image: pictureCards },
  { test: /utensil|fork,? (knife|and)|knife and spoon/i, image: graceCourtesyTable },
  { test: /magnif/i, image: sorting },
  { test: /collection of (small )?objects|mixed objects|assorted objects|collection of objects/i, image: sorting },
  { test: /bar magnet|magnet\b/i, image: sorting },
  { test: /tectonic|continental drift/i, image: worldMap },
  { test: /land and water form|river formation|water tray|ocean puzzle/i, image: worldMap },
  { test: /solar system|planet (size|model|order)|set of small planet models|orbit/i, image: chartsDiagrams },
  { test: /flag/i, image: pictureCards },
  { test: /grammar (box|boxes|symbol|material)/i, image: moveableAlphabet },
  { test: /fraction inset/i, image: geometricCabinet },
  { test: /bead frame|bead stair|black and white (verification )?stair/i, image: beadMaterial },
  { test: /place setting/i, image: graceCourtesyTable },
  { test: /flat sheet|fitted sheet|pillowcase/i, image: bedMaking },
  { test: /textures? of fabric|fabric swatch|fabric box/i, image: fabricBox },
  { test: /burlap|embroidery|hoop|punched holes/i, image: threading },
  { test: /sand tray|salt tray|tray of sand/i, image: writingMaterials },
  { test: /baking tray|baking sheet/i, image: foodPrep },
  { test: /template|colou?r wheel/i, image: artSupplies },
  { test: /marker|blending stump|charcoal/i, image: artSupplies },
  { test: /knives|knife/i, image: foodPrep },

  // Sensorial
  { test: /pink tower/i, image: pinkTower },
  { test: /brown stair|broad stair/i, image: brownStair },
  { test: /red rod/i, image: redRods },
  { test: /color tablet/i, image: colorTablets },
  { test: /sound cylinder|sound box/i, image: soundCylinders },
  { test: /fabric box|fabric swatch/i, image: fabricBox },
  { test: /touch board|rough.*smooth|tactile board/i, image: touchBoards },
  { test: /knobbed cylinder|cylinder block|block.*cylinder|wooden block.*cylinder/i, image: knobbedCylinders },
  { test: /knobless cylinder|colou?red cylinders/i, image: knoblessCylinders },
  { test: /constructive triangle/i, image: constructiveTriangles },
  { test: /geometric solid/i, image: geometricSolids },
  { test: /geometric cabinet|geometric inset/i, image: geometricCabinet },
  { test: /binomial cube/i, image: binomialCube },
  { test: /trinomial cube/i, image: trinomialCube },
  { test: /mystery bag|stereognostic bag/i, image: mysteryBag },
  { test: /thermic|thermal tablet/i, image: thermicTablets },
  { test: /baric tablet|weight tablet|light.*medium.*heavy|basswood|wooden tablets/i, image: baricTablets },
  { test: /smell|scent/i, image: smellingBottles },
  { test: /tasting bottle|taste bottle|dropper bottle/i, image: tastingBottles },
  { test: /mystery bag|stereognostic bag|cloth bag|opaque bag/i, image: mysteryBag },
  { test: /colou?red triangles|box of triangles/i, image: constructiveTriangles },

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

  // Practical life — movement & workspace
  { test: /carrying.*tray|small tray|wooden tray|\btrays?\b/i, image: carryingTray },
  { test: /carrying.*chair|child-sized chair/i, image: carryingChair },
  { test: /work mat|rolling mat|floor mat|small mat/i, image: workMat },

  // Practical life — transfer & control of movement
  { test: /tong|tweezer|dropper|eye dropper|transfer/i, image: transferTools },
  { test: /spoon|scoop|ladle/i, image: spooning },
  { test: /pitcher|pour|funnel/i, image: pouringSet },

  // Practical life — food prep
  { test: /knife|cutting board|whisk|apron|mixing bowl|measuring (cup|spoon)|recipe|baking|fruit|vegetable|bread|cheese/i, image: foodPrep },

  // Practical life — dressing & shoe
  { test: /dressing frame|button frame|buckle frame|zipper|snap frame|velcro|bow frame|hook.*eye/i, image: dressingFrame },
  { test: /shoe polish|polishing.*shoe|cleaning.*shoe|leather shoe/i, image: shoePolishing },
  { test: /putting on.*coat|child.*coat|coat hook|bench/i, image: puttingOnCoat },
  { test: /shoe.*lace|lace.*shoe|tying|shoelace/i, image: shoeTying },
  { test: /clothes|hanger|laundry|folding board/i, image: foldingCloths },
  { test: /cloth|napkin|fold/i, image: foldingCloths },

  // Practical life — household & grace
  { test: /mattress|fitted sheet|pillowcase|blanket|bed/i, image: bedMaking },
  { test: /placemat|cloth napkin|plate|utensil|fork|cup|glass|table setting/i, image: graceCourtesyTable },
  { test: /walking line|line.*tape|balance beam|bell|flag/i, image: walkingLine },

  // Sorting & manipulatives
  { test: /sort|categor|classification|basket|compartment/i, image: sorting },
  { test: /scissor|cutting strip|paper strip/i, image: cuttingWork },
  { test: /padlock|key|lock/i, image: sorting },

  // Generic dressing frames fallback
  { test: /frame/i, image: dressingFrames },

  // Broad coverage — keep last so specific materials above win
  { test: /moveable alphabet|movable alphabet|letter (board|tile)|wooden letter/i, image: moveableAlphabet },
  { test: /bead (bar|chain|material|stair)|unit bead|ten bar|hundred square|bead/i, image: beadMaterial },
  { test: /chart|diagram|timeline|graph|poster|model of|volcano model|solar system|earth layer|life cycle (chart|puzzle)/i, image: chartsDiagrams },
  { test: /map|atlas|globe|compass|seismic|topograph/i, image: worldMap },
  { test: /animal|figurine|figure(s)?\b|miniature object|animal cards?/i, image: animalFigures },
  { test: /paint|brush(es)?|crayon|clay|play ?dough|modeling|collage|glue|craft|colored pencil|palette|sketch|watercolou?r|drawing/i, image: artSupplies },
  { test: /paper|pencil|pen\b|chalk|eraser|chalkboard|notebook|writing|ruler|bookmark|reading log|booklet|book(s)?\b|word list|sentence strip|strip of paper/i, image: writingMaterials },
  { test: /card(s)?\b|label(s)?\b|slide(s)?\b/i, image: pictureCards },
  { test: /basin|water|sink|soap|towel|wipe|tissue|bucket|wringing|washboard|dispenser/i, image: waterBasin },
  { test: /box|bin|container|jar|pouch|bag|rack|shelf|shelves|drawer|hook|stand|holder|storage|dish(es)?|bowl|vase|saucer|dresser/i, image: storageContainers },
  { test: /seed|leaf|leaves|stem|root|plant|flower|tree|specimen|soil|nature/i, image: botanyCare },
  { test: /mat\b|mats\b|rug|cushion|pillow|floor space|table|chair|stool|space|environment|area|path|line/i, image: workMat },
  { test: /food|snack|fruit|banana|cracker|rice|bean|ingredient|meal|lunch/i, image: foodPrep },
  { test: /mirror|comb|brush|tooth|cotton|nail|hair/i, image: careOfPerson },
  { test: /thread|yarn|needle|\blaces?\b|string|fabric|cloth|sheet|blanket|panel/i, image: threading },
  { test: /timer|clock|bell|drum|music|rhythm|instrument|stick/i, image: walkingLine },
  { test: /tool|guide|instruction|prop|supplies|set\b|object/i, image: sorting },
  { test: /pink .*cube|wooden cube/i, image: pinkTower },
  { test: /prism|stair/i, image: brownStair },
  { test: /wooden rod|segmented rod/i, image: redRods },
  { test: /grammar|symbol|triangle|circle|arrow/i, image: moveableAlphabet },
  { test: /board|tile|strip|counter|skittle|disc|puzzle|inset|spheres?|bottle|magnet|sand\b/i, image: stampGame },
  { test: /knife|knives|polish|mallet|tape|marker|stylus|pointer|rubber band|foil|lid|solution|lamp|flashlight|recording|photo|picture|prompt|phrase|rope|replica|attachment|divider|damper|stump|measuring|room|surface|location|suggestion|research|material|activit|practice|shoe|pet|None required|Optional/i, image: sorting },


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
