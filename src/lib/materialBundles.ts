/**
 * Materials that are not sold on their own: they arrive packed inside another
 * product. Flagging them means parents see "Included with …" instead of hunting
 * for a separate supplier link, and the Materials admin page does not count them
 * as missing links.
 *
 * Keys are the canonical cleaned display names produced by the materials
 * pipeline (see src/lib/materials.ts + src/lib/materialCleanup.ts). Each child
 * maps to the products it can arrive inside; the note shown on screen names
 * whichever of those products is actually on the page being read.
 */

import { normalizeMaterialKey } from '@/lib/materials';

export const MATERIAL_BUNDLES: Record<string, string[]> = {
  'Natural wooden strips (1–18)': ['Subtraction strip board'],
  'Blue strips (1–9)': ['Addition strip board', 'Subtraction strip board'],
  'Red strips (1–9)': ['Addition strip board', 'Subtraction strip board'],
  'Mallet': ['Montessori Bells (brown and white series)'],
  'Bell damper': ['Montessori Bells (brown and white series)'],
};

/** childKey -> parent display names, in declaration order */
const CHILD_KEYS = new Map<string, string[]>();
/** parentKey -> canonical parent display name */
const PARENT_KEYS = new Map<string, string>();

for (const [child, parents] of Object.entries(MATERIAL_BUNDLES)) {
  CHILD_KEYS.set(normalizeMaterialKey(child), parents);
  for (const parent of parents) {
    PARENT_KEYS.set(normalizeMaterialKey(parent), parent);
  }
}

function toKey(nameOrKey: string): string {
  return normalizeMaterialKey(nameOrKey);
}

/** Parent products this material arrives inside, or null when it is bought on its own. */
export function bundledParents(nameOrKey: string): string[] | null {
  const parents = CHILD_KEYS.get(toKey(nameOrKey));
  return parents && parents.length > 0 ? parents : null;
}

/** True when the material ships inside another product and needs no link of its own. */
export function isBundledMaterial(nameOrKey: string): boolean {
  return bundledParents(nameOrKey) !== null;
}

/**
 * The product this material comes inside, named for the list it is being shown
 * in: the first parent present among `siblings`, otherwise the first declared
 * parent. Returns null for materials you buy separately.
 */
export function resolveIncludedWith(
  nameOrKey: string,
  siblings: Iterable<string> = []
): string | null {
  const parents = bundledParents(nameOrKey);
  if (!parents) return null;

  const siblingKeys = new Set<string>();
  for (const sibling of siblings) siblingKeys.add(toKey(sibling));

  for (const parent of parents) {
    if (siblingKeys.has(toKey(parent))) return parent;
  }
  return parents[0];
}

/** Display name for a product that other materials arrive inside, or null. */
export function bundledProductName(nameOrKey: string): string | null {
  return PARENT_KEYS.get(toKey(nameOrKey)) ?? null;
}
