export interface ArtSkill {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  isPremium: boolean;
  difficulty: string;
  ageRange: string;
  purpose: string;
  materials: string[];
  steps: string[];
  activities: string[];
}

export const artSkillsEnhanced: Record<string, ArtSkill> = {
  'basic-drawing': {
    id: 'basic-drawing',
    title: 'Basic Drawing Skills',
    description: 'Develop fundamental drawing abilities through line work and shape recognition',
    icon: '✏️',
    category: 'Art',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    purpose: 'To develop fine motor control, hand-eye coordination, and visual perception through basic drawing exercises',
    materials: [
      'Pencils (various hardness)',
      'Drawing paper',
      'Erasers',
      'Rulers',
      'Shape templates'
    ],
    steps: [
      'Begin with proper pencil grip demonstration',
      'Practice drawing straight lines in different directions',
      'Draw basic shapes: circles, squares, triangles',
      'Combine shapes to create simple objects',
      'Practice shading techniques with light pressure'
    ],
    activities: ['Line practice', 'Shape drawing', 'Object sketching']
  },

  'observational-drawing': {
    id: 'observational-drawing',
    title: 'Observational Drawing',
    description: 'Learn to draw from real objects and nature with careful observation',
    icon: '👁️',
    category: 'Art',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '6-10',
    purpose: 'To enhance observation skills, attention to detail, and ability to translate 3D objects into 2D representations',
    materials: [
      'Sketch pads',
      'Drawing pencils (2H, HB, 2B)',
      'Blending stumps',
      'Real objects for observation',
      'Natural specimens (leaves, flowers, shells)'
    ],
    steps: [
      'Select an interesting object to draw',
      'Observe the object carefully, noting shapes and proportions',
      'Start with basic outline shapes',
      'Add details gradually from general to specific',
      'Include shading to show form and depth'
    ],
    activities: ['Still life drawing', 'Nature sketching', 'Portrait basics']
  },

  'primary-colors': {
    id: 'primary-colors',
    title: 'Primary Colors',
    description: 'Explore the foundation of all colors through red, blue, and yellow',
    icon: '🎨',
    category: 'Art',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    purpose: 'To understand color theory fundamentals and develop color recognition and discrimination skills',
    materials: [
      'Red, blue, and yellow paint',
      'Color sorting cards',
      'Paint brushes',
      'Mixing palette',
      'Color wheel template'
    ],
    steps: [
      'Introduce the three primary colors individually',
      'Sort objects by primary colors',
      'Paint with each primary color separately',
      'Create a simple color wheel with primary colors',
      'Identify primary colors in the environment'
    ],
    activities: ['Color sorting', 'Primary mixing', 'Color wheel']
  },

  'color-mixing': {
    id: 'color-mixing',
    title: 'Color Mixing',
    description: 'Discover how primary colors combine to create secondary and tertiary colors',
    icon: '🌈',
    category: 'Art',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '5-9',
    purpose: 'To understand color relationships and develop skills in creating new colors through systematic mixing',
    materials: [
      'Primary color paints',
      'Mixing palette',
      'Paint brushes',
      'Water containers',
      'Color mixing chart'
    ],
    steps: [
      'Review primary colors: red, blue, yellow',
      'Mix red and blue to create purple',
      'Mix blue and yellow to create green',
      'Mix yellow and red to create orange',
      'Experiment with different proportions for color variations'
    ],
    activities: ['Paint mixing', 'Color experiments', 'Shade creation']
  },

  'watercolor-basics': {
    id: 'watercolor-basics',
    title: 'Watercolor Painting',
    description: 'Master fundamental watercolor techniques and paint handling',
    icon: '🖌️',
    category: 'Art',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '6-12',
    purpose: 'To develop control over watercolor medium and understand transparency, flow, and blending techniques',
    materials: [
      'Watercolor paints',
      'Watercolor paper',
      'Round brushes (sizes 6, 10, 14)',
      'Water containers',
      'Paper towels',
      'Masking tape'
    ],
    steps: [
      'Prepare watercolor paper by taping edges',
      'Practice wet-on-wet technique with clean water',
      'Apply paint to wet paper and observe bleeding',
      'Try wet-on-dry for controlled shapes',
      'Practice color blending while paint is still wet'
    ],
    activities: ['Wet-on-wet', 'Dry brush', 'Color blending']
  },

  'finger-painting': {
    id: 'finger-painting',
    title: 'Finger Painting',
    description: 'Explore texture, movement, and color through tactile painting',
    icon: '🖐️',
    category: 'Art',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '2-5',
    purpose: 'To develop tactile sensitivity, creativity, and emotional expression through direct hand contact with paint',
    materials: [
      'Finger paints (non-toxic)',
      'Large paper sheets',
      'Aprons or old clothes',
      'Wet wipes',
      'Plastic tablecloth'
    ],
    steps: [
      'Set up protected work area with plastic covering',
      'Put on aprons to protect clothing',
      'Start with one color and explore finger movements',
      'Add second color and observe mixing',
      'Create patterns using different finger techniques'
    ],
    activities: ['Texture exploration', 'Hand prints', 'Abstract creation']
  }
};

export default artSkillsEnhanced;