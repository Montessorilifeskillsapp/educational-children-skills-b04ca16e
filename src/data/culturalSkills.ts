// Cultural Studies skills data — AMI-aligned activities covering History, Music, Science, and World Cultures

export const culturalSkillsData: Record<string, {
  title: string;
  description: string;
  icon: string;
  category: string;
  isPremium: boolean;
  difficulty: string;
  ageRange: string;
  purpose: string;
  materials: string[];
  steps: { id: string; instruction: string; completed: boolean }[];
}> = {
  // === History / Time ===
  'personal-timeline': {
    title: 'Personal Timeline',
    description: 'Create a timeline of the child\'s own life events',
    icon: '📅',
    category: 'Cultural - History',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    purpose: 'Introduces the concept of sequential time through personally meaningful events, building the foundation for historical thinking.',
    materials: ['Long strip of paper', 'Photos from birth to present', 'Glue', 'Markers', 'Ruler'],
    steps: [
      { id: '1', instruction: 'Lay out a long strip of paper on the work mat', completed: false },
      { id: '2', instruction: 'Mark the left end "Born" and the right end "Now"', completed: false },
      { id: '3', instruction: 'Discuss key life events with the child chronologically', completed: false },
      { id: '4', instruction: 'Place photos or drawings along the timeline in order', completed: false },
      { id: '5', instruction: 'Label each event with the child\'s age at that time', completed: false },
      { id: '6', instruction: 'Read through the completed timeline together', completed: false }
    ]
  },
  'clock-of-eras': {
    title: 'Clock of Eras',
    description: 'Explore Earth\'s history through the Montessori Clock of Eras',
    icon: '🕰️',
    category: 'Cultural - History',
    isPremium: true,
    difficulty: 'Advanced',
    ageRange: '5-6',
    purpose: 'Provides a visual impression of the vast span of Earth\'s history and the relatively recent appearance of humans, fostering cosmic awareness.',
    materials: ['Clock of Eras chart', 'Timeline of Life', 'Colored pencils', 'Animal and plant figures'],
    steps: [
      { id: '1', instruction: 'Present the Clock of Eras chart on a large surface', completed: false },
      { id: '2', instruction: 'Explain that the clock represents all of Earth\'s history', completed: false },
      { id: '3', instruction: 'Point out each colored era and name it', completed: false },
      { id: '4', instruction: 'Place animal figures in their corresponding eras', completed: false },
      { id: '5', instruction: 'Discuss how humans appear only in the last tiny sliver', completed: false },
      { id: '6', instruction: 'Invite the child to color their own Clock of Eras', completed: false },
      { id: '7', instruction: 'Connect to the Timeline of Life for further exploration', completed: false }
    ]
  },
  'days-of-the-week': {
    title: 'Days of the Week',
    description: 'Learn the sequence and names of the days',
    icon: '📆',
    category: 'Cultural - History',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-5',
    purpose: 'Develops temporal awareness and sequential ordering through the familiar weekly cycle.',
    materials: ['Day labels on cards', 'Weekly calendar board', 'Activity picture cards'],
    steps: [
      { id: '1', instruction: 'Present the seven day cards in order', completed: false },
      { id: '2', instruction: 'Read each day name clearly, pointing to the card', completed: false },
      { id: '3', instruction: 'Use the three-period lesson to teach day names', completed: false },
      { id: '4', instruction: 'Associate each day with a routine activity card', completed: false },
      { id: '5', instruction: 'Ask "What day is today? What was yesterday?"', completed: false },
      { id: '6', instruction: 'Place the cards in sequence independently', completed: false }
    ]
  },
  'seasons-cycle': {
    title: 'Seasons of the Year',
    description: 'Explore the four seasons and their characteristics',
    icon: '🍂',
    category: 'Cultural - History',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-5',
    purpose: 'Connects the child to natural cycles, building awareness of change, passage of time, and the relationship between Earth and Sun.',
    materials: ['Season picture cards', 'Nature collection items', 'Season sorting mat', 'Colored pencils'],
    steps: [
      { id: '1', instruction: 'Lay out the four season labels in a circle', completed: false },
      { id: '2', instruction: 'Present picture cards showing each season\'s characteristics', completed: false },
      { id: '3', instruction: 'Sort nature items by season (leaves, flowers, pinecones, snow crystals)', completed: false },
      { id: '4', instruction: 'Discuss what clothing we wear in each season', completed: false },
      { id: '5', instruction: 'Draw or paint a favorite season scene', completed: false },
      { id: '6', instruction: 'Identify the current season and observe outdoor changes', completed: false }
    ]
  },

  // === Music ===
  'sound-cylinders': {
    title: 'Sound Cylinders',
    description: 'Match and grade sounds using Montessori sound cylinders',
    icon: '🔔',
    category: 'Cultural - Music',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-5',
    purpose: 'Refines auditory discrimination and develops the ability to compare, contrast, and grade sounds — foundational skills for musical appreciation.',
    materials: ['Two sets of sound cylinders (red and blue)', 'Work mat', 'Blindfold (optional)'],
    steps: [
      { id: '1', instruction: 'Place the two sets of cylinders on the work mat', completed: false },
      { id: '2', instruction: 'Shake one red cylinder and listen carefully', completed: false },
      { id: '3', instruction: 'Shake blue cylinders one by one to find the matching sound', completed: false },
      { id: '4', instruction: 'Place matched pairs side by side', completed: false },
      { id: '5', instruction: 'Continue until all pairs are matched', completed: false },
      { id: '6', instruction: 'Grade one set from quietest to loudest', completed: false },
      { id: '7', instruction: 'Verify by shaking in sequence', completed: false }
    ]
  },
  'bells-introduction': {
    title: 'Montessori Bells',
    description: 'Explore musical pitch with the Montessori bells',
    icon: '🎵',
    category: 'Cultural - Music',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '4-6',
    purpose: 'Develops pitch discrimination and introduces the musical scale through concrete, hands-on experience with individual tones.',
    materials: ['Montessori bells (brown and white sets)', 'Mallet', 'Damper', 'Work mat'],
    steps: [
      { id: '1', instruction: 'Place the brown (control) bells in order on the mat', completed: false },
      { id: '2', instruction: 'Strike the first brown bell with the mallet and listen', completed: false },
      { id: '3', instruction: 'Strike white bells to find the matching pitch', completed: false },
      { id: '4', instruction: 'Place the matching white bell next to its brown pair', completed: false },
      { id: '5', instruction: 'Use the damper to stop vibrations between strikes', completed: false },
      { id: '6', instruction: 'Continue matching all bell pairs', completed: false },
      { id: '7', instruction: 'Play the scale in order from lowest to highest', completed: false }
    ]
  },
  'rhythm-patterns': {
    title: 'Rhythm Patterns',
    description: 'Clap and repeat simple rhythmic patterns',
    icon: '🥁',
    category: 'Cultural - Music',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-5',
    purpose: 'Develops auditory memory, concentration, and motor coordination through rhythmic repetition and pattern recognition.',
    materials: ['Rhythm sticks or claves', 'Hand drum (optional)', 'Rhythm pattern cards'],
    steps: [
      { id: '1', instruction: 'Sit facing the child with rhythm sticks', completed: false },
      { id: '2', instruction: 'Clap a simple two-beat pattern: tap-tap', completed: false },
      { id: '3', instruction: 'Invite the child to repeat the pattern', completed: false },
      { id: '4', instruction: 'Gradually increase complexity: tap-tap-pause-tap', completed: false },
      { id: '5', instruction: 'Let the child create a pattern for you to repeat', completed: false },
      { id: '6', instruction: 'Try patterns with varying volume: soft-loud-soft', completed: false }
    ]
  },
  'songs-and-movement': {
    title: 'Songs and Movement',
    description: 'Sing traditional songs with coordinated movements',
    icon: '🎶',
    category: 'Cultural - Music',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '2.5-5',
    purpose: 'Integrates language, music, and gross motor development while building cultural knowledge through traditional songs and finger plays.',
    materials: ['Song lyric cards with illustrations', 'Open floor space'],
    steps: [
      { id: '1', instruction: 'Choose a simple traditional song with actions', completed: false },
      { id: '2', instruction: 'Sing the song slowly, demonstrating each movement', completed: false },
      { id: '3', instruction: 'Repeat, inviting the child to join in movements first', completed: false },
      { id: '4', instruction: 'Add the words gradually as movements become familiar', completed: false },
      { id: '5', instruction: 'Sing together at normal tempo with full movements', completed: false },
      { id: '6', instruction: 'Explore songs from different cultures and languages', completed: false }
    ]
  },

  // === Science ===
  'sink-or-float': {
    title: 'Sink or Float',
    description: 'Predict and test which objects sink or float in water',
    icon: '🌊',
    category: 'Cultural - Science',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-5',
    purpose: 'Introduces the scientific method through hands-on experimentation — making predictions, testing hypotheses, and recording observations.',
    materials: ['Clear water basin', 'Collection of objects (cork, stone, feather, coin, sponge, leaf)', 'Towel', 'Prediction chart'],
    steps: [
      { id: '1', instruction: 'Fill the basin with water and place on a towel', completed: false },
      { id: '2', instruction: 'Lay out the collection of objects', completed: false },
      { id: '3', instruction: 'Hold up each object and ask: "Will it sink or float?"', completed: false },
      { id: '4', instruction: 'Record the prediction on the chart', completed: false },
      { id: '5', instruction: 'Gently place the object in water and observe', completed: false },
      { id: '6', instruction: 'Record the result next to the prediction', completed: false },
      { id: '7', instruction: 'Compare predictions with results and discuss why', completed: false }
    ]
  },
  'magnet-exploration': {
    title: 'Magnet Exploration',
    description: 'Discover which materials are magnetic and which are not',
    icon: '🧲',
    category: 'Cultural - Science',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-5',
    purpose: 'Develops classification skills and introduces invisible forces through concrete experimentation with magnetic and non-magnetic materials.',
    materials: ['Bar magnet', 'Collection of metal and non-metal objects', 'Sorting tray with "Magnetic" and "Not Magnetic" labels'],
    steps: [
      { id: '1', instruction: 'Present the magnet and demonstrate how it attracts a paper clip', completed: false },
      { id: '2', instruction: 'Lay out the collection of objects on the mat', completed: false },
      { id: '3', instruction: 'Test each object by bringing the magnet near it', completed: false },
      { id: '4', instruction: 'Sort into "Magnetic" and "Not Magnetic" groups', completed: false },
      { id: '5', instruction: 'Observe what the magnetic objects have in common', completed: false },
      { id: '6', instruction: 'Test objects around the room for magnetic properties', completed: false }
    ]
  },
  'life-cycle-butterfly': {
    title: 'Life Cycle of a Butterfly',
    description: 'Learn the four stages of butterfly metamorphosis',
    icon: '🦋',
    category: 'Cultural - Science',
    isPremium: false,
    difficulty: 'Intermediate',
    ageRange: '3-6',
    purpose: 'Introduces biological transformation and life cycles through a compelling, observable example that inspires wonder and respect for nature.',
    materials: ['Life cycle figures (egg, caterpillar, chrysalis, butterfly)', 'Life cycle puzzle or chart', 'Magnifying glass', 'Drawing paper'],
    steps: [
      { id: '1', instruction: 'Present the four life cycle figures in order', completed: false },
      { id: '2', instruction: 'Name each stage: egg, larva (caterpillar), pupa (chrysalis), adult (butterfly)', completed: false },
      { id: '3', instruction: 'Describe what happens at each stage', completed: false },
      { id: '4', instruction: 'Arrange the figures in a circular cycle', completed: false },
      { id: '5', instruction: 'Draw and label each stage of the life cycle', completed: false },
      { id: '6', instruction: 'If possible, observe a real caterpillar or butterfly outdoors', completed: false }
    ]
  },

  // === World Cultures ===
  'flags-of-the-world': {
    title: 'Flags of the World',
    description: 'Identify and match flags to their countries',
    icon: '🏳️',
    category: 'Cultural - World Cultures',
    isPremium: false,
    difficulty: 'Intermediate',
    ageRange: '4-6',
    purpose: 'Builds global awareness and visual discrimination while fostering respect for the diversity of nations and cultures.',
    materials: ['Flag cards with country labels', 'World map or globe', 'Flag matching mat', 'Pin flags'],
    steps: [
      { id: '1', instruction: 'Present 3-5 flag cards from one continent', completed: false },
      { id: '2', instruction: 'Name each country and point to it on the map', completed: false },
      { id: '3', instruction: 'Use the three-period lesson to learn flag-country pairs', completed: false },
      { id: '4', instruction: 'Place pin flags on the corresponding countries on the map', completed: false },
      { id: '5', instruction: 'Match flag cards to country name cards independently', completed: false },
      { id: '6', instruction: 'Gradually add flags from other continents', completed: false }
    ]
  },
  'food-around-the-world': {
    title: 'Food Around the World',
    description: 'Explore traditional foods from different cultures',
    icon: '🍱',
    category: 'Cultural - World Cultures',
    isPremium: false,
    difficulty: 'Beginner',
    ageRange: '3-6',
    purpose: 'Connects children to global diversity through the universally engaging topic of food, building cultural respect and sensory vocabulary.',
    materials: ['Food picture cards sorted by continent', 'World map', 'Real food samples when possible', 'Sorting mat'],
    steps: [
      { id: '1', instruction: 'Show picture cards of familiar foods and name their origin countries', completed: false },
      { id: '2', instruction: 'Point to each country on the world map', completed: false },
      { id: '3', instruction: 'Sort food cards by continent', completed: false },
      { id: '4', instruction: 'Taste a sample food from a featured culture (if available)', completed: false },
      { id: '5', instruction: 'Discuss how different climates grow different foods', completed: false },
      { id: '6', instruction: 'Draw or paint a favorite food from another culture', completed: false }
    ]
  },
  'celebrations-traditions': {
    title: 'Celebrations & Traditions',
    description: 'Learn about festivals and traditions from around the world',
    icon: '🎉',
    category: 'Cultural - World Cultures',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '4-6',
    purpose: 'Cultivates empathy and cultural sensitivity by exploring how different communities celebrate, fostering a sense of shared humanity.',
    materials: ['Celebration picture cards', 'World map', 'Craft materials', 'Music from different cultures'],
    steps: [
      { id: '1', instruction: 'Present picture cards of a celebration from another culture', completed: false },
      { id: '2', instruction: 'Locate the country of origin on the world map', completed: false },
      { id: '3', instruction: 'Describe what people do during this celebration', completed: false },
      { id: '4', instruction: 'Listen to traditional music associated with the celebration', completed: false },
      { id: '5', instruction: 'Create a simple craft related to the celebration', completed: false },
      { id: '6', instruction: 'Compare and connect: "How do we celebrate in our family?"', completed: false }
    ]
  },
  'traditional-clothing': {
    title: 'Traditional Clothing',
    description: 'Explore traditional garments from different cultures',
    icon: '👘',
    category: 'Cultural - World Cultures',
    isPremium: true,
    difficulty: 'Intermediate',
    ageRange: '4-6',
    purpose: 'Develops appreciation for cultural identity and diversity through the tangible, visual medium of traditional dress.',
    materials: ['Clothing picture cards', 'Fabric swatches', 'World map', 'Dressing figures or paper dolls'],
    steps: [
      { id: '1', instruction: 'Present picture cards of traditional clothing from 3 cultures', completed: false },
      { id: '2', instruction: 'Name each garment and its country of origin', completed: false },
      { id: '3', instruction: 'Feel fabric swatches that represent each garment type', completed: false },
      { id: '4', instruction: 'Locate each country on the world map', completed: false },
      { id: '5', instruction: 'Discuss why clothing differs (climate, materials, customs)', completed: false },
      { id: '6', instruction: 'Dress paper figures in traditional clothing', completed: false }
    ]
  }
};
