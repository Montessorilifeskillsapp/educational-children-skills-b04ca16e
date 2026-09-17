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

export const classroomImages: Record<string, string> = {
  'child-sized-table': childSizedTable,
  'low-open-shelving': lowOpenShelving,
  'child-height-mirror': childHeightMirror,
  'basket': basket,
  'small-jug': smallJug,
  'small-ceramic-bowls': smallCeramicBowls,
  'small-waste-basket': smallWasteBasket,
  'potted-plant': pottedPlant,
};
