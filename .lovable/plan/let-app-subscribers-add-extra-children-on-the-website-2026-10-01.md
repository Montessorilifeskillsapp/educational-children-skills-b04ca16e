# Let app subscribers add extra children on the website

## The problem (confirmed)
A parent who bought Premium inside the iPhone/Android app can end up with their second child marked "Needs a child add-on". On the website they see the $24.99 price, but there is no button to buy it, and the server also refuses the request. So the child stays locked with no way to unlock them. The add-on plan already promised that app subscribers could buy add-ons on the website.

## What will change
- On the website, app subscribers will see an "Add a child — $24.99/month" button on Manage Child Profiles.
- It opens a normal website checkout for the add-on on its own (their Premium stays with Apple/Google, untouched).
- After paying, the extra child unlocks straight away and stays unlocked when they open the app.
- They can remove the add-on later from the same page (or through the usual billing portal).
- Inside the apps, nothing changes: no add-on price is shown there, to follow store rules.
- If their app Premium ends, the add-on no longer unlocks children (the same as today for website members).

## Technical details
- `update-child-addons`: for non-Stripe providers, create (or update quantity on) a separate Stripe subscription containing only the add-on item, monthly by default; first purchase returns a Checkout URL (`mode: subscription`, metadata `kind: child_addons`).
- `check-subscription` / `revenuecat-sync`: on the RevenueCat path, read the add-on quantity from the user's Stripe add-on-only subscription instead of resetting `child_addons`, then run `reconcile_child_coverage`.
- `ChildCoveragePanel`: show add/remove buttons when premium and on web regardless of provider; redirect to the Checkout URL when returned; return to the page on success and refresh.
- `child_allowance()` already requires an active subscription, so add-ons stop counting when Premium lapses.
- No database changes.
