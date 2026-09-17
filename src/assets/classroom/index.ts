// Exact photos for Classroom Setup "Furniture and essentials" items.
// Keyed by normalized material key (see normalizeMaterialKey). Exact entries
// only — no fuzzy matching; items without a verified photo render no image.
import childSizedTable from './child-sized-table.jpg';
import lowOpenShelving from './low-open-shelving.jpg';
import childHeightMirror from './child-height-mirror.jpg';
import basket from './basket.jpg';
import smallJug from './small-jug-or-pitcher.jpg';
import smallCeramicBowls from './small-ceramic-bowls.jpg';
import smallWasteBasket from './small-waste-basket.jpg';
import pottedPlant from './potted-plant.jpg';
import childSizedChair from './child-sized-chair.jpg';
import lowCoatHooks from './low-coat-hooks.jpg';
import smallGlassTumbler from './small-glass-tumbler.jpg';
import broomAndDustpan from './child-sized-broom-and-dustpan-set.jpg';
import childSizedMop from './child-sized-mop.jpg';
import dustingCloths from './dusting-cloths.jpg';
import sponges from './sponges.jpg';
import apron from './apron.jpg';
import wateringCan from './watering-can.jpg';
import smallVase from './small-vase-for-flowers.jpg';
import tray from './tray.jpg';

export const classroomImages: Record<string, string> = {
  'child-sized-table': childSizedTable,
  'low-open-shelving': lowOpenShelving,
  'child-height-mirror': childHeightMirror,
  'basket': basket,
  'small-jug': smallJug,
  'small-ceramic-bowls': smallCeramicBowls,
  'small-waste-basket': smallWasteBasket,
  'potted-plant': pottedPlant,
  'child-sized-chair': childSizedChair,
  'low-coat-hooks': lowCoatHooks,
  'small-glass-tumbler': smallGlassTumbler,
  'child-sized-broom-and-dustpan-set': broomAndDustpan,
  'child-sized-mop': childSizedMop,
  'dusting-cloths': dustingCloths,
  'sponges': sponges,
  'apron': apron,
  'watering-can': wateringCan,
  'small-vase-for-flowers': smallVase,
  'tray': tray,
};
