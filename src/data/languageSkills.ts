interface Step {
  id: string;
  instruction: string;
  completed: boolean;
  videoUrl?: string;
}

interface LanguageSkillData {
  title: string;
  icon: string;
  purpose: string;
  materials: string[];
  steps: Step[];
  category: string;
  difficulty: string;
  isPremium: boolean;
}

export const languageSkillsData: Record<string, LanguageSkillData> = {
  'sandpaper-letters': {
    title: 'Sandpaper Letters',
    icon: '🔤',
    purpose: 'To introduce letter shapes through tactile exploration, building muscle memory for writing while learning phonetic sounds.',
    materials: ['Sandpaper letters (consonants and vowels)', 'Small tray', 'Soft cloth for cleaning'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Choose a sandpaper letter and place on table', completed: false },
      { id: '2', instruction: 'Trace letter with index and middle finger in writing direction', completed: false },
      { id: '3', instruction: 'Say the phonetic sound (not letter name) while tracing', completed: false },
      { id: '4', instruction: 'Repeat tracing and sound three times', completed: false },
      { id: '5', instruction: 'Have child trace and say sound independently', completed: false }
    ]
  },
  'moveable-alphabet': {
    title: 'Moveable Alphabet',
    icon: '📝',
    purpose: 'To enable word building and early writing composition before reading mastery, allowing creative expression through spelling.',
    materials: ['Large moveable alphabet box', 'Small objects for spelling', 'Work mat', 'Word lists'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Unroll mat and place alphabet box at top', completed: false },
      { id: '2', instruction: 'Think of or choose an object to spell', completed: false },
      { id: '3', instruction: 'Sound out word slowly and find each letter', completed: false },
      { id: '4', instruction: 'Place letters in sequence to build word', completed: false },
      { id: '5', instruction: 'Read completed word and build another', completed: false }
    ]
  },
  'pink-series': {
    title: 'Pink Series Reading',
    icon: '🌸',
    purpose: 'To provide first reading experience with simple three-letter phonetic words, building confidence in decoding skills.',
    materials: ['Pink series word cards', 'Matching small objects', 'Reading mat', 'Pink series booklets'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Lay out reading mat and select pink word card', completed: false },
      { id: '2', instruction: 'Point to each letter and say its sound', completed: false },
      { id: '3', instruction: 'Blend sounds together slowly to read word', completed: false },
      { id: '4', instruction: 'Find matching object and place beside card', completed: false },
      { id: '5', instruction: 'Continue with more pink series words', completed: false }
    ]
  },
  'metal-insets': {
    title: 'Metal Insets',
    icon: '✏️',
    purpose: 'To develop fine motor control, pencil grip, and hand coordination necessary for writing while creating beautiful geometric designs.',
    materials: ['Set of 10 metal insets', 'Colored pencils', 'White paper', 'Tray for materials'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Select metal inset and place frame on paper', completed: false },
      { id: '2', instruction: 'Hold frame steady and trace inside edge with pencil', completed: false },
      { id: '3', instruction: 'Remove frame and trace around outside of shape', completed: false },
      { id: '4', instruction: 'Fill shape with parallel lines from left to right', completed: false },
      { id: '5', instruction: 'Add decorative elements and return materials to tray', completed: false }
    ]
  },
  'sound-games': {
    title: 'Sound Games',
    icon: '🎵',
    purpose: 'To develop phonemic awareness and auditory discrimination skills essential for reading and spelling success.',
    materials: ['Collection of small objects', 'Basket or tray', 'Sound game cards (optional)'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Gather 6-8 objects with clear beginning sounds', completed: false },
      { id: '2', instruction: 'Say "I spy with my little eye something beginning with /m/"', completed: false },
      { id: '3', instruction: 'Child identifies object with that beginning sound', completed: false },
      { id: '4', instruction: 'Continue with different beginning sounds', completed: false },
      { id: '5', instruction: 'Progress to middle and ending sound games', completed: false }
    ]
  },
  'blue-series': {
    title: 'Blue Series Reading',
    icon: '💙',
    purpose: 'To advance reading skills with consonant blends, digraphs, and longer phonetic words for fluent reading development.',
    materials: ['Blue series word cards', 'Blue series booklets', 'Reading mat', 'Control cards'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Select blue series card with consonant blend', completed: false },
      { id: '2', instruction: 'Identify and sound out the blend (bl, cr, st, etc.)', completed: false },
      { id: '3', instruction: 'Sound out remaining letters and blend together', completed: false },
      { id: '4', instruction: 'Read word smoothly and check with control card', completed: false },
      { id: '5', instruction: 'Practice with blue series booklet for fluency', completed: false }
    ]
  },
  'matching-cards-objects': {
    title: 'Matching Cards with Objects',
    icon: '🃏',
    purpose: 'To connect real objects with their pictorial representations, building vocabulary and visual discrimination skills.',
    materials: ['Picture cards', 'Matching miniature objects', 'Basket for objects', 'Work mat'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Spread picture cards on work mat', completed: false },
      { id: '2', instruction: 'Take one object from basket and name it', completed: false },
      { id: '3', instruction: 'Find matching picture card for the object', completed: false },
      { id: '4', instruction: 'Place object on top of corresponding card', completed: false },
      { id: '5', instruction: 'Continue until all objects are matched', completed: false }
    ]
  },
  'green-series': {
    title: 'Green Series Reading',
    icon: '💚',
    purpose: 'To introduce phonograms and sight words, advancing reading skills with more complex spelling patterns.',
    materials: ['Green series word cards', 'Phonogram cards', 'Green series booklets', 'Reading mat'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Select green series card with phonogram (ai, oa, ee)', completed: false },
      { id: '2', instruction: 'Identify the phonogram and its sound', completed: false },
      { id: '3', instruction: 'Sound out entire word including phonogram', completed: false },
      { id: '4', instruction: 'Read word smoothly and discuss meaning', completed: false },
      { id: '5', instruction: 'Practice with green series booklet', completed: false }
    ]
  },
  'grammar-symbols': {
    title: 'Grammar Symbols',
    icon: '🔺',
    purpose: 'To introduce parts of speech through visual symbols, making abstract grammar concepts concrete and memorable.',
    materials: ['Grammar symbol shapes', 'Word cards', 'Grammar boxes', 'Work mat'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Present black triangle for noun symbol', completed: false },
      { id: '2', instruction: 'Place noun word cards above triangle', completed: false },
      { id: '3', instruction: 'Introduce red circle for verb symbol', completed: false },
      { id: '4', instruction: 'Match verb cards to red circle', completed: false },
      { id: '5', instruction: 'Continue with adjective (blue triangle) and other symbols', completed: false }
    ]
  },
  'writing-preparation': {
    title: 'Writing Preparation',
    icon: '✍️',
    purpose: 'To develop pre-writing skills through tracing, pattern work, and fine motor exercises before formal letter writing.',
    materials: ['Tracing boards', 'Stylus or finger', 'Pattern cards', 'Sand tray'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Select tracing board with simple pattern', completed: false },
      { id: '2', instruction: 'Use finger to trace pattern from left to right', completed: false },
      { id: '3', instruction: 'Repeat tracing with stylus for precision', completed: false },
      { id: '4', instruction: 'Practice same pattern in sand tray', completed: false },
      { id: '5', instruction: 'Progress to more complex patterns', completed: false }
    ]
  },
  'rhyming-games': {
    title: 'Rhyming Games',
    icon: '🎭',
    purpose: 'To develop phonological awareness and sound pattern recognition through playful rhyming activities.',
    materials: ['Rhyming picture cards', 'Small objects that rhyme', 'Rhyming books', 'Basket'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Select three pictures, two that rhyme and one that doesn\'t', completed: false },
      { id: '2', instruction: 'Say each word clearly and listen to ending sounds', completed: false },
      { id: '3', instruction: 'Identify which two words rhyme', completed: false },
      { id: '4', instruction: 'Remove the non-rhyming picture', completed: false },
      { id: '5', instruction: 'Continue with new sets of rhyming pictures', completed: false }
    ]
  },
  'classified-cards': {
    title: 'Classified Cards',
    icon: '📚',
    purpose: 'To expand vocabulary and classification skills through themed picture cards with labels for reading practice.',
    materials: ['Classified card sets (animals, plants, etc.)', 'Labels', 'Control cards', 'Work mat'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Choose classified card set (e.g., farm animals)', completed: false },
      { id: '2', instruction: 'Spread picture cards on work mat', completed: false },
      { id: '3', instruction: 'Read label cards and match to pictures', completed: false },
      { id: '4', instruction: 'Check work with control cards', completed: false },
      { id: '5', instruction: 'Discuss characteristics of each item', completed: false }
    ]
  },
  'storytelling-oral': {
    title: 'Storytelling & Oral Language',
    icon: '📖',
    purpose: 'To develop narrative skills, vocabulary, and oral expression through structured storytelling activities.',
    materials: ['Story sequence cards', 'Picture prompts', 'Recording device (optional)', 'Story mat'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Choose story sequence cards and mix them up', completed: false },
      { id: '2', instruction: 'Look at pictures and arrange in logical order', completed: false },
      { id: '3', instruction: 'Tell story using sequence cards as guide', completed: false },
      { id: '4', instruction: 'Add details and descriptive language', completed: false },
      { id: '5', instruction: 'Retell story to another person or record it', completed: false }
    ]
  },
  'word-building': {
    title: 'Word Building with Letter Cards',
    icon: '🔤',
    purpose: 'To practice spelling and word construction using individual letter cards for hands-on learning.',
    materials: ['Letter cards (lowercase)', 'Word lists', 'Picture cards', 'Work mat'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Select picture card and name the object', completed: false },
      { id: '2', instruction: 'Say word slowly to hear each sound', completed: false },
      { id: '3', instruction: 'Find letter cards for each sound heard', completed: false },
      { id: '4', instruction: 'Arrange letters to spell the word', completed: false },
      { id: '5', instruction: 'Check spelling and read completed word', completed: false }
    ]
  },
  'sentence-analysis': {
    title: 'Sentence Analysis',
    icon: '📝',
    purpose: 'To understand sentence structure and word relationships through systematic analysis of simple sentences.',
    materials: ['Sentence strips', 'Grammar symbols', 'Analysis charts', 'Colored pencils'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'Read simple sentence strip aloud', completed: false },
      { id: '2', instruction: 'Identify and mark the verb with red circle', completed: false },
      { id: '3', instruction: 'Find subject noun and mark with black triangle', completed: false },
      { id: '4', instruction: 'Identify any adjectives and mark with blue triangles', completed: false },
      { id: '5', instruction: 'Discuss how words work together in sentence', completed: false }
    ]
  },
  'phonetic-reading': {
    title: 'Phonetic Reading Books',
    icon: '📘',
    purpose: 'To practice reading fluency with carefully graded phonetic books that match child\'s decoding level.',
    materials: ['Phonetic reading books', 'Reading log', 'Bookmark', 'Comfortable reading area'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'Choose book at appropriate phonetic level', completed: false },
      { id: '2', instruction: 'Look at cover and predict story content', completed: false },
      { id: '3', instruction: 'Read story aloud, sounding out unfamiliar words', completed: false },
      { id: '4', instruction: 'Discuss story meaning and favorite parts', completed: false },
      { id: '5', instruction: 'Record book title in reading log', completed: false }
    ]
  }
};

export type { Step, LanguageSkillData };