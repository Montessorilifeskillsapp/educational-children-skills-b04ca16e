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
      { id: '1', instruction: 'Select one sandpaper letter and place it directly in front of you, oriented correctly for tracing', completed: false },
      { id: '2', instruction: 'Use index and middle finger together to trace letter following exact writing direction', completed: false },
      { id: '3', instruction: 'Say phonetic sound (not letter name) clearly while tracing - "mmm" not "em"', completed: false },
      { id: '4', instruction: 'Repeat tracing and sounding sequence exactly three times with consistent rhythm', completed: false },
      { id: '5', instruction: 'Trace letter independently while saying sound - check your finger follows correct path', completed: false }
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
      { id: '1', instruction: 'Spread work mat completely flat, position alphabet box at top with easy access to all letters', completed: false },
      { id: '2', instruction: 'Choose a concrete noun you can picture clearly - start with 3-letter words like "cat"', completed: false },
      { id: '3', instruction: 'Segment word into individual phonemes: /c/ /a/ /t/ - say each sound distinctly', completed: false },
      { id: '4', instruction: 'Locate letters matching each sound, arrange left to right in phonetic sequence', completed: false },
      { id: '5', instruction: 'Blend sounds together to read completed word, then construct a new word systematically', completed: false }
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
      { id: '1', instruction: 'Place reading mat in position, select one pink series word card with clear printed text', completed: false },
      { id: '2', instruction: 'Point under each letter individually, saying pure phonetic sound - not letter name', completed: false },
      { id: '3', instruction: 'Blend phonetic sounds smoothly from left to right to decode complete word', completed: false },
      { id: '4', instruction: 'Search among objects to find exact match for word you just read', completed: false },
      { id: '5', instruction: 'Apply same systematic decoding process to additional pink series words', completed: false }
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
      { id: '1', instruction: 'Select geometric metal inset, center frame precisely on paper with equal margins', completed: false },
      { id: '2', instruction: 'Hold frame firmly with non-dominant hand, trace inner edge with controlled pencil pressure', completed: false },
      { id: '3', instruction: 'Remove frame carefully, place inset shape over outline and trace exterior border', completed: false },
      { id: '4', instruction: 'Fill interior with parallel lines, spacing evenly from left margin to right margin', completed: false },
      { id: '5', instruction: 'Complete design with decorative elements, organize materials systematically when finished', completed: false }
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
      { id: '1', instruction: 'Gather 6-8 familiar objects ensuring each begins with distinctly different phonetic sound', completed: false },
      { id: '2', instruction: 'State clearly: "I spy something beginning with /mmm/" - emphasize pure phonetic sound', completed: false },
      { id: '3', instruction: 'Isolate initial sound of each object name until finding correct phonetic match', completed: false },
      { id: '4', instruction: 'Continue game using different initial sounds, varying difficulty systematically', completed: false },
      { id: '5', instruction: 'Progress to medial and final sound games when initial sound mastery is achieved', completed: false }
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
      { id: '1', instruction: 'Pick a blue word card with letters that stick together', completed: false },
      { id: '2', instruction: 'Find the letters that work together (like "bl" or "st") and say their sound', completed: false },
      { id: '3', instruction: 'Say the other letter sounds and put them all together', completed: false },
      { id: '4', instruction: 'Read the whole word smoothly and check if you\'re right', completed: false },
      { id: '5', instruction: 'Practice by reading a blue book with lots of these words', completed: false }
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
      { id: '1', instruction: 'Spread your picture cards out on the mat where you can see them all', completed: false },
      { id: '2', instruction: 'Pick up one object from the basket and say its name out loud', completed: false },
      { id: '3', instruction: 'Look for the picture card that shows the same thing', completed: false },
      { id: '4', instruction: 'Put your object right on top of the matching picture', completed: false },
      { id: '5', instruction: 'Keep going until every object has found its matching picture', completed: false }
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
      { id: '1', instruction: 'Pick three pictures - two that sound alike at the end and one different', completed: false },
      { id: '2', instruction: 'Say each word clearly and listen to how they end', completed: false },
      { id: '3', instruction: 'Find the two words that rhyme (sound the same at the end)', completed: false },
      { id: '4', instruction: 'Put away the picture that doesn\'t rhyme', completed: false },
      { id: '5', instruction: 'Try again with new pictures and find more rhyming pairs', completed: false }
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
      { id: '1', instruction: 'Choose a set of pictures that go together (like animals or fruits)', completed: false },
      { id: '2', instruction: 'Put the picture cards on your mat where you can see them', completed: false },
      { id: '3', instruction: 'Read the word cards and match each one to its picture', completed: false },
      { id: '4', instruction: 'Check your work by looking at the answer cards', completed: false },
      { id: '5', instruction: 'Talk about what makes each thing special or different', completed: false }
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
      { id: '1', instruction: 'Take the story pictures and mix them all up', completed: false },
      { id: '2', instruction: 'Look at each picture carefully and put them in the right order', completed: false },
      { id: '3', instruction: 'Tell the story using your pictures to help you remember', completed: false },
      { id: '4', instruction: 'Add lots of details to make your story interesting', completed: false },
      { id: '5', instruction: 'Tell your story to a friend or grown-up', completed: false }
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
      { id: '1', instruction: 'Pick a picture card and say what you see', completed: false },
      { id: '2', instruction: 'Say the word very slowly so you can hear each sound', completed: false },
      { id: '3', instruction: 'Find the letter cards that match each sound you hear', completed: false },
      { id: '4', instruction: 'Put the letters in order to build your word', completed: false },
      { id: '5', instruction: 'Read your word to check if it looks right', completed: false }
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
      { id: '1', instruction: 'Choose a book that has words you can read', completed: false },
      { id: '2', instruction: 'Look at the cover and guess what the story might be about', completed: false },
      { id: '3', instruction: 'Read the story out loud, sounding out words you don\'t know', completed: false },
      { id: '4', instruction: 'Talk about what happened and what you liked best', completed: false },
      { id: '5', instruction: 'Write the book name in your reading journal', completed: false }
    ]
  }
};

export type { Step, LanguageSkillData };