// Extra-child add-on pricing. Premium covers one child; each add-on covers one more.
// Monthly members pay $24.99/month; annual members pay the same monthly rate billed yearly.
export const ADDON_MONTHLY_CENTS = 2499;
export const ADDON_YEARLY_CENTS = 29988; // 24.99 x 12
export const ADDON_PRODUCT_NAME = "Extra child add-on";
export const MAX_ADDONS = 20;

export const addonCentsFor = (interval: string | null | undefined) =>
  interval === "year" ? ADDON_YEARLY_CENTS : ADDON_MONTHLY_CENTS;

// deno-lint-ignore no-explicit-any
export const isAddonItem = (item: any) => {
  const amount = item?.price?.unit_amount;
  const interval = item?.price?.recurring?.interval;
  return (amount === ADDON_MONTHLY_CENTS && interval === "month") ||
    (amount === ADDON_YEARLY_CENTS && interval === "year");
};
