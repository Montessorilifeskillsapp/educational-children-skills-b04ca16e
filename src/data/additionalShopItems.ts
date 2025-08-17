import { MontessoriMaterial } from './montessoriMaterials';
import { montessoriImages } from '@/assets/images';

// Additional shop items for practical life activities
export const additionalShopItems: MontessoriMaterial[] = [
  {
    id: 'child-table-setting',
    name: 'Child Table Setting Kit',
    price: 35.99,
    category: 'Practical Life',
    subcategory: 'Grace and Courtesy',
    description: 'Complete table setting kit with child-sized plates, utensils, napkins, and placemat',
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.6,
    image: montessoriImages['dressing-frames-set'],
    materials: ['Child-sized plates', 'Utensils (fork, knife, spoon)', 'Cloth napkins', 'Placemats', 'Small vase']
  },
  {
    id: 'child-toothbrush-set',
    name: 'Child Toothbrush & Care Set',
    price: 12.99,
    category: 'Practical Life',
    subcategory: 'Care of Self',
    description: 'Child-sized toothbrush, cup, timer, and mirror for independent tooth care',
    ageRange: '2-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.5,
    image: montessoriImages['cleaning-set'],
    materials: ['Soft bristle toothbrush', 'Plastic cup', '2-minute timer', 'Child mirror']
  },
  {
    id: 'hair-care-set',
    name: 'Child Hair Care Set',
    price: 18.99,
    category: 'Practical Life',
    subcategory: 'Care of Self',
    description: 'Child-appropriate brush, comb, mirror, and hair accessories for independent hair care',
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.4,
    image: montessoriImages['dressing-frames-set'],
    materials: ['Child brush', 'Wide-tooth comb', 'Hand mirror', 'Hair ties', 'Spray bottle']
  },
  {
    id: 'dry-pouring-set',
    name: 'Dry Pouring Exercise Set',
    price: 19.99,
    category: 'Practical Life',
    subcategory: 'Preliminary Exercises',
    description: 'Two small pitchers with dry materials (rice/beans) and cleanup brush on wooden tray',
    ageRange: '2.5-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.7,
    image: montessoriImages['pouring-set'],
    materials: ['2 small ceramic pitchers', 'Organic rice', 'Small brush', 'Wooden tray', 'Child apron']
  },
  {
    id: 'glass-pitcher-set',
    name: 'Glass Pitcher Pouring Set',
    price: 32.99,
    category: 'Practical Life',
    subcategory: 'Preliminary Exercises',
    description: 'Real glass pitchers for advanced liquid pouring with sponge and tray',
    ageRange: '3-5 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.8,
    image: montessoriImages['pouring-set'],
    materials: ['2 glass pitchers', 'Wooden tray with sides', 'Natural sponge', 'Small cloth', 'Waterproof apron']
  }
];

// Merge with existing skillBasedProducts
export const allShopItems = [
  ...additionalShopItems
];