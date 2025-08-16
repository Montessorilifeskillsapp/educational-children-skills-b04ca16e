export const careOfPersonSkills = {
  'hand-washing': {
    id: 'hand-washing',
    title: 'Hand Washing',
    description: 'Master proper handwashing technique for hygiene and health',
    icon: '🧼',
    ageRange: '2-4 years',
    duration: '5 minutes',
    isPremium: false,
    purpose: 'Develop independence in personal hygiene and understanding of cleanliness',
    materials: [
      'Child-sized washbasin',
      'Small pitcher of warm water', 
      'Bar of soap or liquid soap dispenser',
      'Clean towel',
      'Small sponge or washcloth',
      'Apron to protect clothing'
    ],
    steps: [
      { id: '1', instruction: 'Put on apron to protect clothing', completed: false },
      { id: '2', instruction: 'Pour water from pitcher into basin', completed: false },
      { id: '3', instruction: 'Wet hands in the water', completed: false },
      { id: '4', instruction: 'Apply soap to hands', completed: false },
      { id: '5', instruction: 'Rub hands together to create lather', completed: false },
      { id: '6', instruction: 'Wash between fingers and under nails', completed: false },
      { id: '7', instruction: 'Rinse hands thoroughly in basin', completed: false },
      { id: '8', instruction: 'Dry hands with towel', completed: false },
      { id: '9', instruction: 'Empty basin and clean workspace', completed: false }
    ]
  },
  
  'dressing-frames': {
    id: 'dressing-frames',
    title: 'Dressing Frames Practice',
    description: 'Practice buttons, zippers, snaps, and other clothing fasteners',
    icon: '👕',
    ageRange: '3-5 years',
    duration: '10-15 minutes',
    isPremium: false,
    purpose: 'Develop fine motor skills and independence in dressing',
    materials: [
      'Button frame',
      'Zipper frame', 
      'Snap frame',
      'Velcro frame',
      'Buckle frame',
      'Lacing frame'
    ],
    steps: [
      { id: '1', instruction: 'Choose a dressing frame to practice', completed: false },
      { id: '2', instruction: 'Place frame on table or lap', completed: false },
      { id: '3', instruction: 'Open all fasteners slowly and deliberately', completed: false },
      { id: '4', instruction: 'Practice the specific motion (button, zip, snap)', completed: false },
      { id: '5', instruction: 'Close all fasteners completely', completed: false },
      { id: '6', instruction: 'Return frame to its place', completed: false }
    ]
  },

  'brushing-teeth': {
    id: 'brushing-teeth',
    title: 'Brushing Teeth',
    description: 'Learn proper dental hygiene habits',
    icon: '🦷',
    ageRange: '2-4 years',
    duration: '5 minutes',
    isPremium: false,
    purpose: 'Establish independence in oral hygiene and health awareness',
    materials: [
      'Child-sized toothbrush',
      'Child-safe toothpaste',
      'Small cup for water',
      'Mirror at child height',
      'Small towel'
    ],
    steps: [
      { id: '1', instruction: 'Wet toothbrush with small amount of water', completed: false },
      { id: '2', instruction: 'Apply pea-sized amount of toothpaste', completed: false },
      { id: '3', instruction: 'Brush front teeth in circular motions', completed: false },
      { id: '4', instruction: 'Brush back teeth carefully', completed: false },
      { id: '5', instruction: 'Brush tongue gently', completed: false },
      { id: '6', instruction: 'Rinse mouth with water', completed: false },
      { id: '7', instruction: 'Clean toothbrush and put away', completed: false }
    ]
  },

  'nose-blowing': {
    id: 'nose-blowing',
    title: 'Blowing Nose',
    description: 'Learn proper technique for nose care',
    icon: '🤧',
    ageRange: '3-5 years',
    duration: '3 minutes',
    isPremium: true,
    purpose: 'Develop hygiene awareness and independence in self-care',
    materials: [
      'Soft tissues',
      'Tissue disposal container',
      'Hand sanitizer or access to handwashing'
    ],
    steps: [
      { id: '1', instruction: 'Take one tissue from box', completed: false },
      { id: '2', instruction: 'Hold tissue over nose', completed: false },
      { id: '3', instruction: 'Blow gently, one nostril at a time', completed: false },
      { id: '4', instruction: 'Dispose of tissue properly', completed: false },
      { id: '5', instruction: 'Wash hands or use sanitizer', completed: false }
    ]
  },

  'using-napkin': {
    id: 'using-napkin',
    title: 'Using a Napkin',
    description: 'Practice proper table manners and cleanliness',
    icon: '🍽️',
    ageRange: '2-4 years',
    duration: '3 minutes',
    isPremium: true,
    purpose: 'Develop table etiquette and awareness of cleanliness',
    materials: [
      'Cloth or paper napkins',
      'Practice meal setting'
    ],
    steps: [
      { id: '1', instruction: 'Place napkin on lap before eating', completed: false },
      { id: '2', instruction: 'Dab mouth gently when needed', completed: false },
      { id: '3', instruction: 'Keep napkin on lap during meal', completed: false },
      { id: '4', instruction: 'Place napkin beside plate when finished', completed: false }
    ]
  },

  'packing-lunch': {
    id: 'packing-lunch',
    title: 'Packing Lunch',
    description: 'Learn to prepare and organize meals independently',
    icon: '🥪',
    ageRange: '4-6 years',
    duration: '15 minutes',
    isPremium: true,
    purpose: 'Develop planning skills, nutrition awareness, and independence',
    materials: [
      'Lunch box or bag',
      'Healthy food options',
      'Napkins',
      'Utensils if needed',
      'Water bottle'
    ],
    steps: [
      { id: '1', instruction: 'Choose healthy foods from available options', completed: false },
      { id: '2', instruction: 'Pack main food items carefully', completed: false },
      { id: '3', instruction: 'Add napkin and utensils', completed: false },
      { id: '4', instruction: 'Include water bottle', completed: false },
      { id: '5', instruction: 'Close lunch box securely', completed: false }
    ]
  }
};