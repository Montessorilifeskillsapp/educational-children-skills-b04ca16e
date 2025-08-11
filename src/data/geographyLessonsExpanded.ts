// Extended geography lessons for all geography skills

import { GeographyStep, GeographyLesson } from './geographyLessons';

export const expandedGeographyLessons: Record<string, GeographyLesson> = {
  'landforms': {
    title: 'Major Landforms',
    description: 'Mountains, valleys, plains, plateaus, and hills',
    purpose: 'Develops understanding of Earth\'s physical features through hands-on modeling and exploration.',
    materials: ['Clay or play dough', 'Landform nomenclature cards', 'Topographic maps', 'Small figurines', 'Water tray'],
    category: 'Geography',
    difficulty: 'Intermediate',
    ageRange: '5-9',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Examine landform nomenclature cards and name each feature', completed: false },
      { id: '2', instruction: 'Use clay to model a mountain with peaks and valleys', completed: false },
      { id: '3', instruction: 'Create a flat plain area next to your mountain', completed: false },
      { id: '4', instruction: 'Form a plateau (raised flat area) using clay', completed: false },
      { id: '5', instruction: 'Place figurines to show scale of landforms', completed: false },
      { id: '6', instruction: 'Compare your model to real topographic maps', completed: false }
    ]
  },

  'water-bodies': {
    title: 'Bodies of Water',
    description: 'Rivers, lakes, seas, straits, and gulfs',
    purpose: 'Introduces water formations and their role in Earth\'s geography through experimentation.',
    materials: ['Water cycle model', 'Blue sand or water', 'River formation tray', 'Lake ecosystem cards', 'Globe'],
    category: 'Geography',
    difficulty: 'Intermediate',
    ageRange: '5-9',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Set up water cycle demonstration with heat lamp', completed: false },
      { id: '2', instruction: 'Pour water to create a winding river path', completed: false },
      { id: '3', instruction: 'Form a lake by creating a depression and filling with water', completed: false },
      { id: '4', instruction: 'Identify where rivers meet the sea', completed: false },
      { id: '5', instruction: 'Study lake ecosystem cards and discuss water life', completed: false }
    ]
  },

  'climate-zones': {
    title: 'Climate Zones',
    description: 'Tropical, temperate, polar, and desert climates',
    purpose: 'Explores different climate zones and their characteristics through sorting and observation.',
    materials: ['Climate zone cards', 'Weather tracking chart', 'Biome diorama materials', 'Globe', 'Temperature tools'],
    category: 'Geography',
    difficulty: 'Intermediate',
    ageRange: '6-10',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Sort climate zone cards into four main categories', completed: false },
      { id: '2', instruction: 'Track local weather for one week on chart', completed: false },
      { id: '3', instruction: 'Create tropical biome diorama with appropriate plants', completed: false },
      { id: '4', instruction: 'Build desert biome showing adaptation to dry climate', completed: false },
      { id: '5', instruction: 'Locate climate zones on globe and discuss differences', completed: false }
    ]
  }
};

export default expandedGeographyLessons;