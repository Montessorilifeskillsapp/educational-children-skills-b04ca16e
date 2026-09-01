import pouringSet from '@/assets/materials/pouring-set.jpg';
import dryPouringSet from '@/assets/materials/dry-pouring-set.jpg';
import spooningImg from '@/assets/materials/spooning.jpg';
import tableSettingImg from '@/assets/materials/grace-courtesy-table-setting.jpg';
import waterBasinImg from '@/assets/materials/water-basin.jpg';
import careOfPersonImg from '@/assets/materials/care-of-person.jpg';
import botanyCareImg from '@/assets/materials/botany-care.jpg';
import cleaningToolsImg from '@/assets/materials/cleaning-tools.jpg';
import foodPrepImg from '@/assets/materials/food-prep.jpg';
import dressingFrameImg from '@/assets/materials/dressing-frame.jpg';
import dishwashingImg from '@/assets/materials/dishwashing.jpg';

/**
 * Older Practical Life activity sets predate the AMI rewrite and carry no
 * photo of their own. These map each legacy activity id to an authentic
 * material photo so every card and activity screen shows an image.
 */
export const legacyPracticalLifeImages: Record<string, string> = {
  'pouring-water': pouringSet,
  'dry-pouring': pouringSet,
  'spooning-beans': spooningImg,
  'table-setting': tableSettingImg,
  'hand-washing': waterBasinImg,
  'brushing-teeth': careOfPersonImg,
  'brushing-hair': careOfPersonImg,
  'flower-arranging': botanyCareImg,
  'polishing-mirror': cleaningToolsImg,
  'squeezing-orange-juice': foodPrepImg,
  'getting-dressed': dressingFrameImg,
  dishwashing: dishwashingImg,
};

export const getPracticalLifeImage = (id: string, image?: string) =>
  image || legacyPracticalLifeImages[id];
