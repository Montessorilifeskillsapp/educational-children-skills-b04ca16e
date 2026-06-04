import { amiLanguageSkills } from './amiLanguageSkills';

interface Step {
  id: string;
  instruction: string;
  completed: boolean;
  videoUrl?: string;
}

interface LanguageSkillData {
  title: string;
  description?: string;
  icon: string;
  purpose: string;
  materials: string[];
  steps: Step[];
  category: string;
  difficulty: string;
  isPremium: boolean;
}

const baseLanguageSkills: Record<string, LanguageSkillData> = {
  'sandpaper-letters': {
    title: 'Sandpaper Letters',
    icon: '🔤',
    purpose: 'To introduce letter shapes through tactile exploration, building muscle memory for writing while learning phonetic sounds.',
    materials: ['Sandpaper letters (consonants and vowels)', 'Small tray', 'Soft cloth for cleaning'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I select one sandpaper letter and place it directly in front of me, oriented correctly for tracing', completed: false },
      { id: '2', instruction: 'I use index and middle finger together to trace letter following exact writing direction', completed: false },
      { id: '3', instruction: 'I say phonetic sound (not letter name) clearly while tracing - "mmm" not "em"', completed: false },
      { id: '4', instruction: 'I repeat tracing and sounding sequence exactly three times with consistent rhythm', completed: false },
      { id: '5', instruction: 'I trace letter independently while saying sound - check my finger follows correct path', completed: false }
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
      { id: '1', instruction: 'I spread work mat completely flat, position alphabet box at top with easy access to all letters', completed: false },
      { id: '2', instruction: 'I choose a concrete noun I can picture clearly - start with 3-letter words like "cat"', completed: false },
      { id: '3', instruction: 'I segment word into individual phonemes: /c/ /a/ /t/ - say each sound distinctly', completed: false },
      { id: '4', instruction: 'I locate letters matching each sound, arrange left to right in phonetic sequence', completed: false },
      { id: '5', instruction: 'I blend sounds together to read completed word, then construct a new word systematically', completed: false }
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
      { id: '1', instruction: 'I select geometric metal inset, center frame precisely on paper with equal margins', completed: false },
      { id: '2', instruction: 'I hold frame firmly with non-dominant hand, trace inner edge with controlled pencil pressure', completed: false },
      { id: '3', instruction: 'I remove frame carefully, place inset shape over outline and trace exterior border', completed: false },
      { id: '4', instruction: 'I fill interior with parallel lines, spacing evenly from left margin to right margin', completed: false },
      { id: '5', instruction: 'I complete design with decorative elements, organize materials systematically when finished', completed: false }
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
      { id: '1', instruction: 'I gather 6-8 familiar objects ensuring each begins with distinctly different phonetic sound', completed: false },
      { id: '2', instruction: 'I state clearly: "I spy something beginning with /mmm/" - emphasize pure phonetic sound', completed: false },
      { id: '3', instruction: 'I isolate initial sound of each object name until finding correct phonetic match', completed: false },
      { id: '4', instruction: 'I continue game using different initial sounds, varying difficulty systematically', completed: false },
      { id: '5', instruction: 'I progress to medial and final sound games when initial sound mastery is achieved', completed: false }
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
      { id: '1', instruction: 'I pick a blue word card with letters that stick together', completed: false },
      { id: '2', instruction: 'I find the letters that work together (like "bl" or "st") and say their sound', completed: false },
      { id: '3', instruction: 'I say the other letter sounds and put them all together', completed: false },
      { id: '4', instruction: 'I read the whole word smoothly and check if I\'m right', completed: false },
      { id: '5', instruction: 'I practice by reading a blue book with lots of these words', completed: false }
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
      { id: '1', instruction: 'I spread my picture cards out on the mat where I can see them all', completed: false },
      { id: '2', instruction: 'I pick up one object from the basket and say its name out loud', completed: false },
      { id: '3', instruction: 'I look for the picture card that shows the same thing', completed: false },
      { id: '4', instruction: 'I put my object right on top of the matching picture', completed: false },
      { id: '5', instruction: 'I keep going until every object has found its matching picture', completed: false }
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
      { id: '1', instruction: 'I select green series card with phonogram (ai, oa, ee)', completed: false },
      { id: '2', instruction: 'I identify the phonogram and its sound', completed: false },
      { id: '3', instruction: 'I sound out entire word including phonogram', completed: false },
      { id: '4', instruction: 'I read word smoothly and discuss meaning', completed: false },
      { id: '5', instruction: 'I practice with green series booklet', completed: false }
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
      { id: '1', instruction: 'I present black triangle for noun symbol', completed: false },
      { id: '2', instruction: 'I place noun word cards above triangle', completed: false },
      { id: '3', instruction: 'I introduce red circle for verb symbol', completed: false },
      { id: '4', instruction: 'I match verb cards to red circle', completed: false },
      { id: '5', instruction: 'I continue with adjective (blue triangle) and other symbols', completed: false }
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
      { id: '1', instruction: 'I select tracing board with simple pattern', completed: false },
      { id: '2', instruction: 'I use finger to trace pattern from left to right', completed: false },
      { id: '3', instruction: 'I repeat tracing with stylus for precision', completed: false },
      { id: '4', instruction: 'I practice same pattern in sand tray', completed: false },
      { id: '5', instruction: 'I progress to more complex patterns', completed: false }
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
      { id: '1', instruction: 'I pick three pictures - two that sound alike at the end and one different', completed: false },
      { id: '2', instruction: 'I say each word clearly and listen to how they end', completed: false },
      { id: '3', instruction: 'I find the two words that rhyme (sound the same at the end)', completed: false },
      { id: '4', instruction: 'I put away the picture that doesn\'t rhyme', completed: false },
      { id: '5', instruction: 'I try again with new pictures and find more rhyming pairs', completed: false }
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
      { id: '1', instruction: 'I choose a set of pictures that go together (like animals or fruits)', completed: false },
      { id: '2', instruction: 'I put the picture cards on my mat where I can see them', completed: false },
      { id: '3', instruction: 'I read the word cards and match each one to its picture', completed: false },
      { id: '4', instruction: 'I check my work by looking at the answer cards', completed: false },
      { id: '5', instruction: 'I talk about what makes each thing special or different', completed: false }
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
      { id: '1', instruction: 'I take the story pictures and mix them all up', completed: false },
      { id: '2', instruction: 'I look at each picture carefully and put them in the right order', completed: false },
      { id: '3', instruction: 'I tell the story using my pictures to help me remember', completed: false },
      { id: '4', instruction: 'I add lots of details to make my story interesting', completed: false },
      { id: '5', instruction: 'I tell my story to a friend or grown-up', completed: false }
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
      { id: '1', instruction: 'I pick a picture card and say what I see', completed: false },
      { id: '2', instruction: 'I say the word very slowly so I can hear each sound', completed: false },
      { id: '3', instruction: 'I find the letter cards that match each sound I hear', completed: false },
      { id: '4', instruction: 'I put the letters in order to build my word', completed: false },
      { id: '5', instruction: 'I read my word to check if it looks right', completed: false }
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
      { id: '1', instruction: 'I read simple sentence strip aloud', completed: false },
      { id: '2', instruction: 'I identify and mark the verb with red circle', completed: false },
      { id: '3', instruction: 'I find subject noun and mark with black triangle', completed: false },
      { id: '4', instruction: 'I identify any adjectives and mark with blue triangles', completed: false },
      { id: '5', instruction: 'I discuss how words work together in sentence', completed: false }
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
      { id: '1', instruction: 'I choose a book that has words I can read', completed: false },
      { id: '2', instruction: 'I look at the cover and guess what the story might be about', completed: false },
      { id: '3', instruction: 'I read the story out loud, sounding out words I don\'t know', completed: false },
      { id: '4', instruction: 'I talk about what happened and what I liked best', completed: false },
      { id: '5', instruction: 'I write the book name in my reading journal', completed: false }
    ]
  }
};

export const languageSkillsData: Record<string, LanguageSkillData> = {
  ...baseLanguageSkills,
  ...amiLanguageSkills
};

export type { Step, LanguageSkillData };