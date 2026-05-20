export interface StoryBook {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  inStock: boolean;
  author: string;
  pages: number;
  ageRange: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  themes: string[];
  website?: string;
  amazonLink?: string;
}

export const storyBooks: StoryBook[] = [
  {
    id: 'macaroon-owl-planets',
    name: 'Macaroon Owl Learns the Planets',
    price: 19.00,
    originalPrice: 29.00,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/9798349505867.jpg?viewkey=b6a16d38194e3bc54d8831f485bb41148efe3c61b279602de2d88af108658c35',
    rating: 4.8,
    category: 'Story Books',
    description: 'A softly illustrated Montessori life skills story designed to introduce early astronomy to young children',
    inStock: true,
    author: 'Kerry Howard',
    pages: 54,
    ageRange: '3-7 years',
    skillLevel: 'Intermediate',
    themes: ['Astronomy', 'Planets', 'Science', 'Nature', 'Sequencing'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=ELjeOxww7DldvrBBKtqat4kcAKy7dINv2dOVgKn6ARm'
  },
  {
    id: 'biscuit-bunny-learns-to-say-no',
    name: 'Biscuit Bunny Learns to Say No',
    price: 19.00,
    originalPrice: 29.00,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/9798218657703.jpg?viewkey=e7de8919c43473f46c8d05d555e2e8197dced01afd8c4bd6563025a211f03c70',
    rating: 4.8,
    category: 'Story Books',
    description: 'A kind and gentle story about setting boundaries, self-care, and saying no with kindness',
    inStock: true,
    author: 'Kerry Howard',
    pages: 58,
    ageRange: '3-7 years',
    skillLevel: 'Intermediate',
    themes: ['Setting Boundaries', 'Self-Care', 'Empathy', 'Grace and Courtesy', 'Self-Awareness'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=XBd6w4URC2IgcMw5AUnXg9yUjQVUavBLHoUNCNsDCVK'
  },
  {
    id: 'pickles-cat-learns-to-clean-up',
    name: 'Pickles Cat Learns to Clean Up',
    price: 19.00,
    originalPrice: 29.00,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/9798349364129.jpg?viewkey=89c50be260b539a9608ef3c30a49bd84a01cb2f4503095e484047b2ac02f8f61',
    rating: 4.8,
    category: 'Story Books',
    description: 'A Montessori life skills story about learning to clean up with gentle guidance and joyful songs',
    inStock: true,
    author: 'Kerry Howard',
    pages: 54,
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    themes: ['Independence', 'Order', 'Responsibility', 'Care of Environment', 'Practical Life'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=AR0g9S67o7Bv0m3AFeX9zj159nrIKMDfqulgABdmGGy'
  },
  {
    id: 'cupcake-kitten-ready-for-bed',
    name: 'Cupcake Kitten Learns to Get Ready for Bed',
    price: 16.99,
    originalPrice: 25.99,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/197184036X.jpg?viewkey=db1a796c6c6236081a12ae6af75aceaa40878be5d7a9fbcf80f5cb6b6a26fea3',
    rating: 4.8,
    category: 'Story Books',
    description: 'A gentle Montessori life skills story about preparing for bed with calm, confidence, and independence.',
    inStock: true,
    author: 'Kerry Howard',
    pages: 54,
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    themes: ['Care of Self', 'Independence', 'Routine', 'Emotional Regulation', 'Practical Life'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=Mll3lIORQxOWntOdsCRbxnx1QOUCXgBRWMGIsw5qAgd'
  },
  {
    id: 'caramel-kitten-set-the-table',
    name: 'Caramel Kitten Learns to Set the Table',
    price: 16.99,
    originalPrice: 25.99,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/1971840181.jpg?viewkey=c06e542477848e60b20a30f5b852a1cb40bc2c1f884813b567b3f1711d3a9957',
    rating: 4.8,
    category: 'Story Books',
    description: 'A calm, Montessori-aligned life skills story that gently introduces young children to the practical art of table setting.',
    inStock: true,
    author: 'Kerry Howard',
    pages: 54,
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    themes: ['Practical Life', 'Grace and Courtesy', 'Independence', 'Responsibility', 'Order'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=TMRnRMu1UDGa7ujfhqWc8P4HN6pPcpfAYUJByx0REau'
  },
  {
    id: 'marshmallow-muffin-lambs-dress',
    name: 'Marshmallow and Muffin Lambs Learn to Dress',
    price: 16.99,
    originalPrice: 25.99,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/1971840335.jpg?viewkey=28d27b7580998ba172c0bd44e5a3c7853c57c6ad58c50cd4e17fca246e3ad670',
    rating: 4.8,
    category: 'Story Books',
    description: 'A calm, reassuring Montessori life skills story that gently guides children through dressing themselves with confidence and care.',
    inStock: true,
    author: 'Kerry Howard',
    pages: 54,
    ageRange: '3-6 years',
    skillLevel: 'Beginner',
    themes: ['Care of Self', 'Independence', 'Order', 'Control of Movement', 'Practical Life'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=RfVzqx25jbQ0fXvGscZLmpCm1STFxetw8FQ84YViQVH'
  },
  {
    id: 'nougat-puppy-focus',
    name: 'Nougat Puppy Learns to Focus',
    price: 16.99,
    originalPrice: 29.99,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/1971840300.jpg?viewkey=bf8d62866d5b372095b47212484dfd7ad6f9b50875e915b8df80981639b3f486',
    rating: 4.8,
    category: 'Story Books',
    description: 'A calm, developmentally accurate Montessori life skills story that gently supports children as they learn to regulate their attention, body, and choices.',
    inStock: true,
    author: 'Kerry Howard',
    pages: 54,
    ageRange: '3-7 years',
    skillLevel: 'Intermediate',
    themes: ['Concentration', 'Self-Regulation', 'Practical Life', 'Independence', 'Cycle of Activity'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=2xXgC3VsMutWXmvb8KKnZjVayX63v2DY4exImffMx51'
  },
  {
    id: 'waffles-hedgehog-plant-seeds',
    name: 'Waffles Hedgehog Learns to Plant Seeds',
    price: 16.99,
    originalPrice: 29.99,
    image: 'https://image-hub-cloud.lightningsource.com/2011-04-01/Images/front_cover/x320/sku/1971840270.jpg?viewkey=a1b0f209172d00d28691ffceedcba9ee1000cf2d667afad2f571cff4eca4e7a0',
    rating: 4.8,
    category: 'Story Books',
    description: 'A Montessori life skills story that guides children through a real planting sequence, emphasizing patience, order, observation, and care for the earth.',
    inStock: true,
    author: 'Kerry Howard',
    pages: 54,
    ageRange: '3-7 years',
    skillLevel: 'Beginner',
    themes: ['Botany', 'Care of Environment', 'Patience', 'Responsibility', 'Practical Life'],
    website: 'shop.ingramspark.com',
    amazonLink: 'https://shop.ingramspark.com/b/084?params=Q61Vv5ap3CnxktYuaysoDxZJozs2vbWjVOXbtWX69qm'
  }
];