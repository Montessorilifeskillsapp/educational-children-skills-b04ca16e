import { montessoriImages } from '@/assets/images';

export interface MontessoriPicture {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  ageRange: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  inStock: boolean;
  rating: number;
  image: string;
  amazonLink?: string;
  educationalValue: string[];
}

export const montessoriPictures: MontessoriPicture[] = [
  {
    id: 'pink-tower-picture',
    name: 'Pink Tower Educational Picture',
    price: 12.99,
    category: 'Educational Pictures',
    description: 'Beautiful high-quality print showing the Pink Tower in use, perfect for classroom walls or home learning spaces',
    ageRange: '2-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.8,
    image: montessoriImages['pink-tower'],
    educationalValue: ['Visual discrimination', 'Size concepts', 'Mathematical preparation', 'Concentration']
  },
  {
    id: 'golden-beads-picture',
    name: 'Golden Beads System Picture',
    price: 14.99,
    category: 'Educational Pictures',
    description: 'Detailed image showing the complete golden bead material system for teaching decimal concepts',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.9,
    image: montessoriImages['golden-beads-set'],
    educationalValue: ['Decimal system', 'Mathematical concepts', 'Quantity recognition', 'Abstract thinking']
  },
  {
    id: 'dressing-frames-picture',
    name: 'Dressing Frames Collection Picture',
    price: 11.99,
    category: 'Educational Pictures',
    description: 'Inspiring image of various dressing frames showing practical life skills development',
    ageRange: '2-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.7,
    image: montessoriImages['dressing-frames-set'],
    educationalValue: ['Fine motor skills', 'Independence', 'Self-care', 'Coordination']
  },
  {
    id: 'pouring-exercise-picture',
    name: 'Pouring Exercise Picture',
    price: 10.99,
    category: 'Educational Pictures',
    description: 'Elegant photograph of pouring exercises demonstrating grace and coordination',
    ageRange: '2-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.6,
    image: montessoriImages['pouring-set'],
    educationalValue: ['Hand-eye coordination', 'Concentration', 'Precision', 'Practical life skills']
  },
  {
    id: 'sandpaper-letters-picture',
    name: 'Sandpaper Letters in Action Picture',
    price: 13.99,
    category: 'Educational Pictures',
    description: 'Beautiful image showing a child exploring sandpaper letters for language development',
    ageRange: '3-5 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.8,
    image: montessoriImages['sandpaper-letters'],
    educationalValue: ['Letter recognition', 'Tactile learning', 'Phonetic awareness', 'Writing preparation']
  },
  {
    id: 'color-tablets-picture',
    name: 'Color Tablets Exploration Picture',
    price: 12.99,
    category: 'Educational Pictures',
    description: 'Vibrant image showcasing color tablets and their use in sensorial education',
    ageRange: '2-4 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.7,
    image: montessoriImages['color-tablets-box1'],
    educationalValue: ['Color discrimination', 'Visual perception', 'Sensorial refinement', 'Aesthetic development']
  },
  {
    id: 'cleaning-activities-picture',
    name: 'Practical Life Cleaning Picture',
    price: 11.99,
    category: 'Educational Pictures',
    description: 'Inspiring image of children engaged in meaningful cleaning activities',
    ageRange: '2-6 years',
    skillLevel: 'Beginner',
    inStock: true,
    rating: 4.5,
    image: montessoriImages['child-broom-set'],
    educationalValue: ['Care of environment', 'Responsibility', 'Motor skills', 'Community contribution']
  },
  {
    id: 'world-map-picture',
    name: 'Geography Exploration Picture',
    price: 15.99,
    category: 'Educational Pictures',
    description: 'Educational image featuring world map puzzles and geography materials in use',
    ageRange: '3-6 years',
    skillLevel: 'Intermediate',
    inStock: true,
    rating: 4.9,
    image: montessoriImages['puzzle-maps'],
    educationalValue: ['Cultural awareness', 'Geography concepts', 'World knowledge', 'Spatial understanding']
  }
];