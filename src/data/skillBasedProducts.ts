import { MontessoriMaterial } from './montessoriMaterials';
import { montessoriImages } from '@/assets/images';

// Products mapped to specific skills
export const skillBasedProducts: Record<string, MontessoriMaterial[]> = {
  // Practical Life Skills
  'brushing-teeth': [
    {
      id: 'child-toothbrush-set',
      name: 'Child Toothbrush & Cup Set',
      price: 12.99,
      category: 'Practical Life',
      subcategory: 'Care of Self',
      description: 'Child-sized toothbrush, cup, and timer for independent tooth brushing',
      ageRange: '2-6 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.5,
      image: montessoriImages['cleaning-set'] || montessoriImages['child-broom-set'],
      materials: ['Soft bristle toothbrush', 'Plastic cup', '2-minute timer']
    }
  ],
  'washing-hands': [
    {
      id: 'hand-washing-station',
      name: 'Portable Hand Washing Station',
      price: 45.99,
      category: 'Practical Life',
      subcategory: 'Care of Self',
      description: 'Complete hand washing setup with soap dispenser and towel holder',
      ageRange: '2-6 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.7,
      image: montessoriImages['pouring-set'],
      materials: ['Soap dispenser', 'Towel holder', 'Water basin', 'Step stool']
    }
  ],
  'pouring': [
    {
      id: 'pouring-set',
      name: 'Pouring Exercise Set',
      price: 24.99,
      category: 'Practical Life',
      subcategory: 'Preliminary Exercises',
      description: 'Two matching ceramic pitchers with tray and sponge',
      ageRange: '2.5-4 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.7,
      image: montessoriImages['pouring-set'],
      materials: ['2 ceramic pitchers', 'Wooden tray', 'Natural sponge']
    }
  ],
  'spooning': [
    {
      id: 'spooning-set',
      name: 'Spooning Transfer Set',
      price: 18.99,
      category: 'Practical Life',
      subcategory: 'Preliminary Exercises',
      description: 'Two wooden bowls with wooden spoon for transfer exercises',
      ageRange: '2-4 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.5,
      image: montessoriImages['pouring-set'],
      materials: ['2 wooden bowls', 'Wooden spoon', 'Wooden tray', 'Transfer beans']
    }
  ],
  'setting-table': [
    {
      id: 'child-table-setting',
      name: 'Child Table Setting Kit',
      price: 35.99,
      category: 'Practical Life',
      subcategory: 'Grace and Courtesy',
      description: 'Child-sized plates, utensils, and napkins for table setting practice',
      ageRange: '2.5-6 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.6,
      image: montessoriImages['dressing-frames-set'],
      materials: ['Child plates', 'Utensils', 'Cloth napkins', 'Placemats']
    }
  ],
  'tying-shoes': [
    {
      id: 'shoe-tying-frame',
      name: 'Shoe Tying Practice Frame',
      price: 22.99,
      category: 'Practical Life',
      subcategory: 'Care of Self',
      description: 'Wooden frame with real shoe for practicing lace tying',
      ageRange: '3-6 years',
      skillLevel: 'Intermediate',
      inStock: true,
      rating: 4.4,
      image: montessoriImages['dressing-frames-set'],
      materials: ['Wooden frame', 'Real shoe', 'Colored laces', 'Instructions']
    }
  ],

  // Sensorial Skills
  'pink-tower': [
    {
      id: 'pink-tower',
      name: 'Pink Tower',
      price: 45.99,
      category: 'Sensorial',
      subcategory: 'Visual Discrimination',
      description: '10 wooden cubes from 1cm³ to 10cm³ in natural pink wood',
      ageRange: '2.5-5 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.9,
      image: montessoriImages['pink-tower'],
      materials: ['10 wooden cubes', 'Storage tray', 'Control chart']
    }
  ],
  'brown-stair': [
    {
      id: 'brown-stair',
      name: 'Brown Stair (Broad Stair)',
      price: 52.99,
      category: 'Sensorial',
      subcategory: 'Visual Discrimination',
      description: '10 wooden prisms varying in thickness from 1cm to 10cm',
      ageRange: '2.5-5 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.8,
      image: montessoriImages['pink-tower'],
      materials: ['10 wooden prisms', 'Storage rack', 'Measurement guide']
    }
  ],
  'red-rods': [
    {
      id: 'red-rods',
      name: 'Red Rods',
      price: 48.99,
      category: 'Sensorial',
      subcategory: 'Visual Discrimination',
      description: '10 wooden rods from 10cm to 1 meter in length',
      ageRange: '2.5-5 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.7,
      image: montessoriImages['pink-tower'],
      materials: ['10 red wooden rods', 'Storage stand', 'Length cards']
    }
  ],

  // Math Skills
  'number-rods': [
    {
      id: 'number-rods',
      name: 'Number Rods',
      price: 65.99,
      category: 'Mathematics',
      subcategory: 'Introduction to Quantity',
      description: '10 wooden rods in red and blue segments representing 1-10',
      ageRange: '3-5 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.8,
      image: montessoriImages['golden-beads-set'],
      materials: ['10 segmented rods', 'Number cards', 'Storage rack']
    }
  ],
  'golden-beads': [
    {
      id: 'golden-beads-set',
      name: 'Golden Bead Material Complete Set',
      price: 125.99,
      category: 'Mathematics',
      subcategory: 'Decimal System',
      description: 'Units, tens, hundreds, thousands with wooden trays',
      ageRange: '3-6 years',
      skillLevel: 'Intermediate',
      inStock: true,
      rating: 4.9,
      image: montessoriImages['golden-beads-set'],
      materials: ['Golden beads', 'Wooden trays', 'Number cards', 'Counting mat']
    }
  ],

  // Language Skills
  'sandpaper-letters': [
    {
      id: 'sandpaper-letters',
      name: 'Sandpaper Letters',
      price: 78.99,
      category: 'Language',
      subcategory: 'Writing Preparation',
      description: 'Complete set of lowercase sandpaper letters on wooden boards',
      ageRange: '3-5 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.8,
      image: montessoriImages['sandpaper-letters'],
      materials: ['26 letter boards', 'Storage box', 'Tracing guide']
    }
  ],
  'moveable-alphabet': [
    {
      id: 'moveable-alphabet',
      name: 'Moveable Alphabet',
      price: 95.99,
      category: 'Language',
      subcategory: 'Writing and Reading',
      description: 'Large wooden letters in a compartmented box',
      ageRange: '3.5-6 years',
      skillLevel: 'Intermediate',
      inStock: true,
      rating: 4.7,
      image: montessoriImages['sandpaper-letters'],
      materials: ['Wooden letters', 'Compartmented box', 'Word cards']
    }
  ],

  // Geography Skills
  'land-water-forms': [
    {
      id: 'land-water-forms',
      name: 'Land and Water Forms',
      price: 89.99,
      category: 'Cultural Studies',
      subcategory: 'Geography',
      description: 'Wooden trays showing island, lake, peninsula, etc.',
      ageRange: '3-6 years',
      skillLevel: 'Intermediate',
      inStock: true,
      rating: 4.7,
      image: montessoriImages['puzzle-maps'],
      materials: ['10 form trays', 'Water', 'Sand', 'Vocabulary cards']
    }
  ],
  'world-map': [
    {
      id: 'puzzle-maps',
      name: 'World Puzzle Map',
      price: 68.99,
      category: 'Cultural Studies',
      subcategory: 'Geography',
      description: 'Wooden world map puzzle with removable continents',
      ageRange: '3-6 years',
      skillLevel: 'Intermediate',
      inStock: true,
      rating: 4.6,
      image: montessoriImages['puzzle-maps'],
      materials: ['Wooden puzzle', 'Continent pieces', 'Control map', 'Flag cards']
    }
  ],

  // Art Skills
  'basic-drawing': [
    {
      id: 'art-supplies-basic',
      name: 'Basic Drawing Materials',
      price: 29.99,
      category: 'Art',
      subcategory: 'Drawing',
      description: 'Quality pencils, paper, and erasers for beginning artists',
      ageRange: '3-8 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.5,
      image: montessoriImages['color-tablets-box1'],
      materials: ['Drawing pencils', 'Sketch paper', 'Erasers', 'Pencil holder']
    }
  ],
  'color-mixing': [
    {
      id: 'color-mixing-set',
      name: 'Color Mixing Paint Set',
      price: 42.99,
      category: 'Art',
      subcategory: 'Painting',
      description: 'Primary colors and mixing tools for color exploration',
      ageRange: '3-7 years',
      skillLevel: 'Beginner',
      inStock: true,
      rating: 4.6,
      image: montessoriImages['color-tablets-box1'],
      materials: ['Primary paints', 'Mixing palette', 'Brushes', 'Water cups']
    }
  ]
};

export default skillBasedProducts;