// Same first-free activities as the ordered section cards. Full Pouring Water
// preview remains on its separate public /preview/pouring-water page.
export const FREE_STARTER_IDS = new Set([
  'carrying-a-tray', 'knobbed-cylinders', 'number-rods',
  'vocabulary-enrichment', 'land-water-forms', 'plant-parts',
  'basic-drawing', 'greeting-others', 'days-of-the-week',
]);

export function canOpenActivity(skillId: string, premium: boolean): boolean {
  return premium || FREE_STARTER_IDS.has(skillId);
}