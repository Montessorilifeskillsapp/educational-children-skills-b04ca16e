/** Plain object photographs for materials lists; never infer an image from a scene. */
import spoon from '@/assets/materials/item-stock/spoon.jpg';
import pitcher from '@/assets/materials/item-stock/pitcher.jpg';
import bowl from '@/assets/materials/item-stock/bowl.jpg';
import funnel from '@/assets/materials/item-stock/funnel.jpg';
import scissors from '@/assets/materials/item-stock/scissors.jpg';
import cloth from '@/assets/materials/item-stock/cloth.jpg';
import broom from '@/assets/materials/item-stock/broom.jpg';
import dustpan from '@/assets/materials/item-stock/dustpan.jpg';
import sponge from '@/assets/materials/item-stock/sponge.jpg';
import sprayBottle from '@/assets/materials/item-stock/spray-bottle.jpg';
import bucket from '@/assets/materials/item-stock/bucket.jpg';
import woodenTray from '@/assets/materials/item-stock/wooden-tray.jpg';
import basket from '@/assets/materials/item-stock/basket.jpg';
import glass from '@/assets/materials/item-stock/glass.jpg';
import tongs from '@/assets/materials/item-stock/tongs.jpg';
import wateringCan from '@/assets/materials/item-stock/watering-can.jpg';
import chair from '@/assets/materials/item-stock/wooden-chair.jpg';
import workMat from '@/assets/materials/item-stock/work-mat.jpg';
import scoop from '@/assets/materials/item-stock/scoop.jpg';
import beans from '@/assets/materials/item-stock/beans.jpg';
import basin from '@/assets/materials/item-stock/basin.jpg';
import towel from '@/assets/materials/item-stock/towel.jpg';
import vase from '@/assets/materials/item-stock/vase.jpg';
import apron from '@/assets/materials/item-stock/apron.jpg';
import hanger from '@/assets/materials/item-stock/hanger.jpg';
import hairbrush from '@/assets/materials/item-stock/hairbrush.jpg';
import plate from '@/assets/materials/item-stock/plate.jpg';
import fork from '@/assets/materials/item-stock/fork.jpg';
import plant from '@/assets/materials/item-stock/plant.jpg';
import soap from '@/assets/materials/item-stock/soap.jpg';
import paper from '@/assets/materials/item-stock/paper.jpg';
import mirror from '@/assets/materials/item-stock/mirror.jpg';

export const materialPhotos: Record<string, string> = {
  spoon, pitcher, bowl, funnel, scissors, cloth, broom, dustpan, sponge,
  'spray-bottle': sprayBottle, bucket, 'wooden-tray': woodenTray, basket,
  glass, tongs, 'watering-can': wateringCan, 'wooden-chair': chair,
  'work-mat': workMat, scoop, beans, basin, towel, vase, apron, hanger,
  hairbrush, plate, fork, plant, soap, paper, mirror,
};

/** Wording variants that refer to the same physical item (variant key -> canonical key). */
export const materialPhotoAliases: Record<string, string> = {
  placemats: 'placemat',
  'button-frame': 'button-dressing-frame',
  'zipper-frame': 'zipper-dressing-frame',
  'snap-frame': 'snap-dressing-frame',
  'buckle-frame': 'buckle-dressing-frame',
  'lacing-frame': 'lacing-dressing-frame',
  rulers: 'ruler',
  tray: 'wooden-tray',
  'light-object-such-as-a-small-glass': 'glass',
  sponges: 'sponge',
  'small-spoon': 'spoon',
  'teaspoon': 'spoon',
  'small-funnel': 'funnel',
  'small-bowl': 'bowl',
  'ceramic-bowl': 'bowl',
  'small-jug-or-pitcher': 'pitcher',
  'child-sized-pitcher': 'pitcher',
  'small-pitcher': 'pitcher',
  'small-glass': 'glass',
  'small-tongs': 'tongs',
  'child-sized-wooden-chair': 'wooden-chair',
  'child-sized-chair': 'wooden-chair',
  'child-sized-broom': 'broom',
  'small-broom': 'broom',
  'small-dustpan': 'dustpan',
  'ordinary-sponge': 'sponge',
  'cotton-cloth': 'cloth',
  'soft-cloth': 'cloth',
  'small-cloth': 'cloth',
  'small-towel': 'towel',
  'hand-towel': 'towel',
  'small-basin': 'basin',
  'small-basket': 'basket',
  'small-bucket': 'bucket',
  'small-watering-can': 'watering-can',
  'child-sized-apron': 'apron',
  'small-vase': 'vase',
  'potted-plant': 'plant',
  plants: 'plant',
  'small-mirror': 'mirror',
  'hand-mirror': 'mirror',
  'small-plate': 'plate',
  'small-fork': 'fork',
  'wooden-scoop': 'scoop',
  'dry-beans': 'beans',
  'child-safe-scissors': 'scissors',
  'small-scissors': 'scissors',
  'sheet-of-paper': 'paper',
  'plain-paper': 'paper',
  'clothes-hanger': 'hanger',
};
