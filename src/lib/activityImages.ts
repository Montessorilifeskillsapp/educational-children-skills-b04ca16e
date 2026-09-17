import { getPracticalLifeImage } from '@/lib/practicalLifeCardImages';
import { sensorialImages } from '@/assets/sensorial';
import { mathImages } from '@/assets/math';
import { languageImages } from '@/assets/language';
import { botanyImages } from '@/assets/botany';
import { geographyImages } from '@/assets/geography';
import { graceCourtesyImages } from '@/assets/grace-courtesy';
import { artImages } from '@/assets/art';
import { culturalImages } from '@/assets/cultural';

/**
 * Resolve only exact, activity-specific photographs. There are deliberately
 * no generic or neighbouring-activity fallbacks.
 */
export function getActivityImage(
  id: string,
  skill: { category?: string; image?: string; imageUrl?: string },
) {
  const category = skill.category ?? '';

  if (category.startsWith('Cultural')) return culturalImages[id];
  if (category === 'Art') return artImages[id];
  if (category === 'Grace and Courtesy') return graceCourtesyImages[id];
  if (category === 'Mathematics') return mathImages[id];
  if (category === 'Language') return languageImages[id];
  if (category === 'Botany') return botanyImages[id];
  if (category === 'Geography') return geographyImages[id];
  if (sensorialImages[id]) return sensorialImages[id];

  return getPracticalLifeImage(id, skill.image ?? skill.imageUrl);
}
