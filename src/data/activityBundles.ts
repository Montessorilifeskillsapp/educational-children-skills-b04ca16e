import { activityMaterials } from './activityMaterials';

export interface ActivityBundle {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  inStock: boolean;
  materials: string[];
  ageRange: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const activityBundles: ActivityBundle[] = [
  {
    id: 'pouring-bundle',
    name: 'Pouring Mastery',
    price: 34.99,
    originalPrice: 42.99,
    image: '',
    rating: 4.9,
    category: 'Practical Life',
    description: 'Complete pouring activity set with pitchers, tray, and cleanup materials',
    inStock: true,
    materials: activityMaterials['pouring']?.map(m => m.name) || [],
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner'
  },
  {
    id: 'spooning-bundle',
    name: 'Spooning Transfer',
    price: 28.99,
    originalPrice: 35.99,
    image: '',
    rating: 4.8,
    category: 'Practical Life',
    description: 'Fine motor development kit with bowls, spoons, and transfer materials',
    inStock: true,
    materials: activityMaterials['spooning']?.map(m => m.name) || [],
    ageRange: '2-4 years',
    skillLevel: 'Beginner'
  },
  {
    id: 'sweeping-bundle',
    name: 'Sweeping & Cleaning',
    price: 31.99,
    originalPrice: 39.99,
    image: '',
    rating: 4.7,
    category: 'Practical Life',
    description: 'Child-sized cleaning tools for developing responsibility and motor skills',
    inStock: true,
    materials: activityMaterials['sweeping']?.map(m => m.name) || [],
    ageRange: '3-6 years',
    skillLevel: 'Beginner'
  },
  {
    id: 'dusting-bundle',
    name: 'Dusting Essentials',
    price: 26.99,
    originalPrice: 33.99,
    image: '',
    rating: 4.6,
    category: 'Practical Life',
    description: 'Complete dusting kit with microfiber cloths and child-safe cleaning tools',
    inStock: true,
    materials: activityMaterials['dusting']?.map(m => m.name) || [],
    ageRange: '3-6 years',
    skillLevel: 'Beginner'
  },
  {
    id: 'folding-clothes-bundle',
    name: 'Clothes Folding Kit',
    price: 22.99,
    originalPrice: 28.99,
    image: '',
    rating: 4.5,
    category: 'Practical Life',
    description: 'Learn organization skills with folding boards and practice clothes',
    inStock: true,
    materials: activityMaterials['folding-clothes']?.map(m => m.name) || [],
    ageRange: '4-8 years',
    skillLevel: 'Intermediate'
  },
  {
    id: 'dish-washing-bundle',
    name: 'Dish Washing Station',
    price: 39.99,
    originalPrice: 48.99,
    image: '',
    rating: 4.8,
    category: 'Practical Life',
    description: 'Complete dish washing setup with child-safe soap and drying accessories',
    inStock: true,
    materials: activityMaterials['dish-washing']?.map(m => m.name) || [],
    ageRange: '4-8 years',
    skillLevel: 'Intermediate'
  },
  {
    id: 'tongs-activity-bundle',
    name: 'Tongs Transfer Kit',
    price: 19.99,
    originalPrice: 24.99,
    image: '',
    rating: 4.7,
    category: 'Practical Life',
    description: 'Fine motor development with various tongs and transfer materials',
    inStock: true,
    materials: activityMaterials['tongs-activity']?.map(m => m.name) || [],
    ageRange: '2.5-5 years',
    skillLevel: 'Beginner'
  },
  {
    id: 'containers-bundle',
    name: 'Opening & Closing Kit',
    price: 24.99,
    originalPrice: 31.99,
    image: '',
    rating: 4.6,
    category: 'Practical Life',
    description: 'Various containers and lids for developing fine motor skills and problem-solving',
    inStock: true,
    materials: activityMaterials['opening-closing-containers']?.map(m => m.name) || [],
    ageRange: '2-5 years',
    skillLevel: 'Beginner'
  },
  {
    id: 'table-setting-bundle',
    name: 'Table Setting Mastery',
    price: 38.99,
    originalPrice: 46.99,
    image: '',
    rating: 4.8,
    category: 'Practical Life',
    description: 'Complete table setting kit with placemats, utensils, and napkins',
    inStock: true,
    materials: ['Child-sized plates', 'Utensil set', 'Cloth napkins', 'Placemats', 'Cups', 'Serving tray'],
    ageRange: '3-6 years',
    skillLevel: 'Intermediate'
  },
  {
    id: 'food-preparation-bundle',
    name: 'Food Preparation Basics',
    price: 49.99,
    originalPrice: 59.99,
    image: '',
    rating: 4.9,
    category: 'Practical Life',
    description: 'Safe food preparation tools for cutting, slicing, and serving',
    inStock: true,
    materials: ['Child-safe knives', 'Cutting boards', 'Measuring cups', 'Mixing bowls', 'Apron', 'Serving utensils'],
    ageRange: '4-8 years',
    skillLevel: 'Advanced'
  },
  {
    id: 'plant-care-bundle',
    name: 'Plant Care & Gardening',
    price: 42.99,
    originalPrice: 52.99,
    image: '',
    rating: 4.7,
    category: 'Practical Life',
    description: 'Complete plant care set with watering tools and gardening supplies',
    inStock: true,
    materials: ['Small watering can', 'Plant mister', 'Small pots', 'Soil scoop', 'Seeds', 'Care instructions'],
    ageRange: '3-7 years',
    skillLevel: 'Intermediate'
  }
];