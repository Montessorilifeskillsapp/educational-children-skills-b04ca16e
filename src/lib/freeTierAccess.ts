export interface FreeTierItem {
  id: string;
  isPremium: boolean;
}

// TEMP: All activities unlocked for everyone. Revert this file to restore paywall.
export const applyFirstFreeItemLimit = <T extends FreeTierItem>(items: T[]): T[] => {
  return items.map((item) => ({ ...item, isPremium: false }));
};

export const canAccessSectionItem = <T extends FreeTierItem>(
  _items: T[],
  _itemId: string,
  _isPremiumUser: boolean,
): boolean => {
  return true;
};
