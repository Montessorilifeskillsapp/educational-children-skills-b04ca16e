import { sensorialImages } from '@/assets/sensorial';
import { mathImages } from '@/assets/math';
import { languageImages } from '@/assets/language';
import { botanyImages } from '@/assets/botany';
import { geographyImages } from '@/assets/geography';
import { getPracticalLifeImage } from '@/lib/practicalLifeCardImages';

// Use activity-specific photos, never an unrelated material as a banner fallback.
const activityImages: Record<string, string> = {
  ...sensorialImages,
  ...mathImages,
  ...languageImages,
  ...botanyImages,
  ...geographyImages,
};
export function getActivityImage(id: string, skill: { image?: string; imageUrl?: string }) {
  return activityImages[id] || getPracticalLifeImage(id, skill.image || skill.imageUrl);
}
