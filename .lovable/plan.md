

## Plan: Remove Resources Page

### Files to modify:
1. **Delete** `src/components/Resources.tsx`
2. **`src/components/AppLayout.tsx`** — Remove `Resources` import, remove `'resources'` from `currentView` type, remove `onResourcesView` callbacks, remove the `resources` view rendering block
3. **`src/components/Dashboard.tsx`** — Remove `onResourcesView` prop and the Resources card from the dashboard grid
4. **`src/components/Home.tsx`** — Remove `onResourcesView` prop and any pass-through to NavigationMenu
5. **`src/components/NavigationMenu.tsx`** — Remove `onResourcesView` prop and any Resources menu item
6. **`src/hooks/useSEO.ts`** — Remove the `resources` entry from `SEO_CONFIG`
7. **`src/lib/sitemap.ts`** — Remove the `/resources` entry from the sitemap
8. **`src/__tests__/components/Home.test.tsx`** — Remove `onResourcesView` from test props

### What stays untouched:
- References to the word "resources" in general text/descriptions (e.g., PremiumGate, SEOOptimizer, data files) — these are not related to the Resources page

