import { sensorialImages } from '@/assets/sensorial';
import { mathImages } from '@/assets/math';
import { languageImages } from '@/assets/language';
import { botanyImages } from '@/assets/botany';
import { geographyImages } from '@/assets/geography';
import { getPracticalLifeImage } from '@/lib/practicalLifeCardImages';
import vocabulary from '@/assets/activity-banners/vocabulary-enrichment.jpg';
import plant from '@/assets/activity-banners/parts-of-plant.jpg';
import landWater from '@/assets/activity-banners/land-water-forms.jpg';
import days from '@/assets/activity-banners/days-of-week.jpg';
import drawing from '@/assets/activity-banners/basic-drawing.jpg';

// Use activity-specific photos, never an unrelated material as a banner fallback.
const activityImages: Record<string, string> = {
  'vocabulary-enrichment': vocabulary,
  'plant-parts': plant,
  'land-water-forms': landWater,
  'days-of-the-week': days,
  'basic-drawing': drawing,
  ...sensorialImages,
  ...mathImages,
  ...languageImages,
  ...botanyImages,
  ...geographyImages,
};
export function getActivityImage(id: string, skill: { image?: string; imageUrl?: string }) {
  return activityImages[id] || getPracticalLifeImage(id, skill.image || skill.imageUrl);
}
