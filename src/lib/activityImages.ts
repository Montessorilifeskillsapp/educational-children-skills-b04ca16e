import { getPracticalLifeImage } from '@/lib/practicalLifeCardImages';

/**
 * Only return photographs from the curated Practical Life registry.
 * Other curriculum areas remain intentionally image-free until an exact,
 * activity-specific photograph has been reviewed and approved.
 */
export function getActivityImage(id: string, _skill: { image?: string; imageUrl?: string }) {
  return getPracticalLifeImage(id);
}
