export interface FreeTierItem {
  id: string;
  isPremium: boolean;
}

export const applyFirstFreeItemLimit = <T extends FreeTierItem>(items: T[]): T[] => {
  let firstFreeItemFound = false;

  return items.map((item) => {
    if (item.isPremium) {
      return item;
    }

    if (!firstFreeItemFound) {
      firstFreeItemFound = true;
      return item;
    }

    return {
      ...item,
      isPremium: true,
    };
  });
};

export const canAccessSectionItem = <T extends FreeTierItem>(
  items: T[],
  itemId: string,
  isPremiumUser: boolean,
): boolean => {
  if (isPremiumUser) {
    return true;
  }

  const limitedItems = applyFirstFreeItemLimit(items);
  const selectedItem = limitedItems.find((item) => item.id === itemId);

  return Boolean(selectedItem && !selectedItem.isPremium);
};
