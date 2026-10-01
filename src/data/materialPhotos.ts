/**
 * Exact, approved item photos for "What you'll need" lists.
 * Keys are normalized material keys. Only photos the owner has approved
 * from a review batch are added here — never keyword guesses.
 */
export const materialPhotos: Record<string, string> = {};

/** Wording variants that refer to the same physical item (variant key -> canonical key). */
export const materialPhotoAliases: Record<string, string> = {
  placemats: 'placemat',
  'button-frame': 'button-dressing-frame',
  'zipper-frame': 'zipper-dressing-frame',
  'snap-frame': 'snap-dressing-frame',
  'buckle-frame': 'buckle-dressing-frame',
  'lacing-frame': 'lacing-dressing-frame',
  tongs: 'small-tongs',
  basin: 'small-basin',
  rulers: 'ruler',
  tray: 'wooden-tray',
  'light-object-such-as-a-small-glass': 'small-glass',
  sponges: 'sponge',
};
