import { amiBotanySkills } from './amiBotanySkills';

const baseBotanySkills = {
  // Plant Parts
  'plant-parts': {
    title: 'Parts of a Plant',
    description: 'Learn about roots, stems, leaves, flowers, and seeds',
    icon: '🌿',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    materials: ['Plant specimens', 'Magnifying glass', 'Plant puzzle', 'Drawing paper', 'Colored pencils'],
    purpose: 'To help children identify and understand the basic parts of a plant and their functions',
    steps: [
      'Show the child a real plant and point out each part',
      'Name each part: roots, stem, leaves, flowers, seeds',
      'Explain the function of each part in simple terms',
      'Use the plant puzzle to reinforce learning',
      'Have the child draw and label a plant',
      'Practice identifying parts on different plants'
    ],
    activities: ['Plant part puzzle', 'Leaf pressing', 'Root observation']
  },
  'leaf-shapes': {
    title: 'Leaf Shapes and Types',
    description: 'Explore different leaf shapes, margins, and arrangements',
    icon: '🍃',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '4-7',
    materials: ['Various leaf specimens', 'Leaf shape cards', 'Magnifying glass', 'Paper', 'Crayons'],
    purpose: 'To develop observation skills and learn to classify leaves by their characteristics',
    steps: [
      'Collect different types of leaves from nature',
      'Observe and compare leaf shapes using magnifying glass',
      'Match leaves to shape cards (oval, heart-shaped, lobed, etc.)',
      'Examine leaf margins (smooth, serrated, wavy)',
      'Create leaf rubbings to show details',
      'Sort leaves by different characteristics'
    ],
    activities: ['Leaf collection', 'Shape sorting', 'Leaf rubbings']
  },
  'flower-parts': {
    title: 'Parts of a Flower',
    description: 'Petals, sepals, stamens, and pistils',
    icon: '🌸',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-8',
    materials: ['Fresh flowers', 'Tweezers', 'Magnifying glass', 'Flower diagram', 'Small dishes'],
    purpose: 'To understand flower structure and the role of each part in plant reproduction',
    steps: [
      'Examine a whole flower and identify its parts',
      'Carefully remove petals one by one',
      'Identify and examine sepals at the base',
      'Locate stamens and observe pollen',
      'Find the pistil in the center',
      'Discuss how flowers help plants reproduce'
    ],
    activities: ['Flower dissection', 'Pollination demonstration', 'Flower pressing']
  },

  // Plant Life Cycle
  'seed-germination': {
    title: 'Seed Germination',
    description: 'How seeds grow into plants',
    icon: '🌱',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    materials: ['Bean seeds', 'Clear containers', 'Cotton balls', 'Water', 'Measuring tools'],
    purpose: 'To observe and understand how seeds develop into plants',
    steps: [
      'Place bean seeds between wet cotton and container wall',
      'Keep seeds moist and in a warm place',
      'Observe daily changes and record growth',
      'Watch for the first root (radicle) to appear',
      'Observe the shoot growing upward',
      'Measure and chart growth over time'
    ],
    activities: ['Bean sprouting', 'Seed observation', 'Growth measurement']
  },
  'plant-lifecycle': {
    title: 'Plant Life Cycle',
    description: 'From seed to mature plant and back to seed',
    icon: '🔄',
    category: 'Botany',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-9',
    materials: ['Life cycle cards', 'Seeds', 'Soil', 'Pots', 'Plant specimens at different stages'],
    purpose: 'To understand the complete cycle of plant growth and reproduction',
    steps: [
      'Arrange life cycle cards in correct order',
      'Plant seeds and observe germination',
      'Watch seedling develop leaves and grow',
      'Observe mature plant producing flowers',
      'Watch flowers develop into fruits with seeds',
      'Collect new seeds to complete the cycle'
    ],
    activities: ['Life cycle wheel', 'Plant diary', 'Seed collection']
  },

  // Plant Needs
  'plant-needs': {
    title: 'What Plants Need',
    description: 'Sunlight, water, air, and nutrients',
    icon: '☀️',
    category: 'Botany',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    materials: ['Small plants', 'Watering can', 'Spray bottle', 'Plant food', 'Sunny and shady locations'],
    purpose: 'To learn about the basic needs of plants for healthy growth',
    steps: [
      'Identify what plants need: water, sunlight, air, nutrients',
      'Demonstrate proper watering techniques',
      'Show plants in sunny vs. shady locations',
      'Discuss how plants get air through their leaves',
      'Add plant food to soil to provide nutrients',
      'Create a plant care routine and follow it daily'
    ],
    activities: ['Plant care routine', 'Light experiment', 'Watering practice']
  }
};

export const botanySkillsData = {
  ...baseBotanySkills,
  ...amiBotanySkills
};

export default botanySkillsData;