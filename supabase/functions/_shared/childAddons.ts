// Extra-child add-on pricing. Premium covers one child; each add-on covers one more.
// Monthly members pay $24.99/month; annual members pay the same monthly rate billed yearly.
export const ADDON_MONTHLY_CENTS = 2499;
export const ADDON_YEARLY_CENTS = 19900; // matches Premium Annual
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

// App-store (RevenueCat) members buy extra children on the website as a separate
// Stripe subscription that contains only add-on items. Returns it, if any.
// deno-lint-ignore no-explicit-any
export const findAddonOnlySubscription = async (stripe: any, email: string) => {
  const customers = await stripe.customers.list({ email, limit: 1 });
  const customer = customers.data[0];
  if (!customer) return { customer: null, sub: null };
  const subs = await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 10 });
  // deno-lint-ignore no-explicit-any
  const sub = subs.data.find((s: any) => s.items.data.length > 0 && s.items.data.every(isAddonItem)) ?? null;
  return { customer, sub };
};
