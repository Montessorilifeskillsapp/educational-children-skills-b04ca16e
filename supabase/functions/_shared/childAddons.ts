// Extra-child add-on pricing. Premium covers one child; each add-on covers one more.
// Monthly members pay $24.99/month; annual members pay $199/year per extra child.
export const ADDON_MONTHLY_CENTS = 2499;
export const ADDON_YEARLY_CENTS = 19900; // same amount as Premium Annual, so never identify add-ons by price alone
const LEGACY_ADDON_YEARLY_CENTS = 29988;
export const ADDON_PRODUCT_NAME = "Extra child add-on";
export const MAX_ADDONS = 20;

// Stripe list calls must expand the product so add-ons are recognised by name.
export const ADDON_EXPAND = ["data.items.data.price.product"];

export const addonCentsFor = (interval: string | null | undefined) =>
  interval === "year" ? ADDON_YEARLY_CENTS : ADDON_MONTHLY_CENTS;

// An add-on is an item on the "Extra child add-on" product. Legacy amounts that no
// base plan uses are also accepted. A $199/year item is never an add-on by price alone.
// deno-lint-ignore no-explicit-any
export const isAddonItem = (item: any) => {
  const product = item?.price?.product;
  if (product && typeof product === "object" && product.name === ADDON_PRODUCT_NAME) return true;
  const amount = item?.price?.unit_amount;
  const interval = item?.price?.recurring?.interval;
  return (amount === ADDON_MONTHLY_CENTS && interval === "month") ||
    (amount === LEGACY_ADDON_YEARLY_CENTS && interval === "year");
};

// App-store (RevenueCat) members buy extra children on the website as a separate
// Stripe subscription that contains only add-on items. Returns it, if any.
// deno-lint-ignore no-explicit-any
export const findAddonOnlySubscription = async (stripe: any, email: string) => {
  const customers = await stripe.customers.list({ email, limit: 1 });
  const customer = customers.data[0];
  if (!customer) return { customer: null, sub: null };
  const subs = await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 10, expand: ADDON_EXPAND });
  // deno-lint-ignore no-explicit-any
  const sub = subs.data.find((s: any) => s.items.data.length > 0 && s.items.data.every(isAddonItem)) ?? null;
  return { customer, sub };
};
