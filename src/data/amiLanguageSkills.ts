// AMI-aligned Language curriculum additions
import type { LanguageSkillData } from './languageSkills';

export const amiLanguageSkills: Record<string, LanguageSkillData> = {
  // Oral Language Development
  'vocabulary-enrichment': {
    title: 'Vocabulary Enrichment',
    description: 'Three-period lesson for precise vocabulary acquisition',
    icon: '🗣️',
    purpose: 'To expand vocabulary through the Montessori three-period lesson, building precise language for naming and describing the world.',
    materials: ['Nomenclature objects', 'Three-period lesson cards', 'Real objects from the environment'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I select three objects or cards with contrasting names', completed: false },
      { id: '2', instruction: 'Period 1 – I name each object clearly: "This is a…"', completed: false },
      { id: '3', instruction: 'Period 2 – I ask "Show me the…" and child points to correct object', completed: false },
      { id: '4', instruction: 'Period 3 – I point to object and ask "What is this?"', completed: false },
      { id: '5', instruction: 'I introduce new vocabulary only after mastery of previous set', completed: false }
    ]
  },
  'conversation-skills': {
    title: 'Conversation & Discussion',
    description: 'Turn-taking, active listening, and expressing ideas',
    icon: '💬',
    purpose: 'To develop conversational skills including listening, responding, and expressing thoughts clearly and respectfully.',
    materials: ['Conversation topic cards', 'Talking stick or object', 'Timer (optional)'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I sit in circle and introduce the talking stick rule', completed: false },
      { id: '2', instruction: 'I select a conversation topic card and read it aloud', completed: false },
      { id: '3', instruction: 'I hold the talking stick and share my thoughts', completed: false },
      { id: '4', instruction: 'I pass the stick and listen without interrupting', completed: false },
      { id: '5', instruction: 'I respond to what the previous speaker said before adding new ideas', completed: false }
    ]
  },
  'poetry-recitation': {
    title: 'Poetry & Recitation',
    description: 'Memorizing and performing poems, songs, and fingerplays',
    icon: '🎶',
    purpose: 'To develop memory, rhythm, and expressive language through learning and performing poems and songs.',
    materials: ['Poetry cards', 'Illustrated poem books', 'Fingerplay props'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I read the poem aloud with expression and rhythm', completed: false },
      { id: '2', instruction: 'I repeat the first line together until memorized', completed: false },
      { id: '3', instruction: 'I add one new line at a time, building up the whole poem', completed: false },
      { id: '4', instruction: 'I add hand movements or fingerplay actions to match words', completed: false },
      { id: '5', instruction: 'I perform the complete poem from memory with expression', completed: false }
    ]
  },

  // Phonemic Awareness
  'initial-sound-sorting': {
    title: 'Initial Sound Sorting',
    description: 'Sorting objects by beginning phoneme',
    icon: '🔊',
    purpose: 'To isolate and identify initial sounds in words, building the phonemic awareness foundation for reading.',
    materials: ['Small objects (6-10)', 'Two sorting mats', 'Letter cards for target sounds'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I place two letter cards on separate mats (e.g., /m/ and /s/)', completed: false },
      { id: '2', instruction: 'I pick up one object and say its name clearly', completed: false },
      { id: '3', instruction: 'I listen for the very first sound in the word', completed: false },
      { id: '4', instruction: 'I place the object on the mat matching its initial sound', completed: false },
      { id: '5', instruction: 'I continue until all objects are sorted correctly', completed: false }
    ]
  },
  'syllable-clapping': {
    title: 'Syllable Work',
    description: 'Breaking words into syllables through clapping and movement',
    icon: '👏',
    purpose: 'To develop awareness of syllable structure in words through kinesthetic and auditory activities.',
    materials: ['Picture cards of multi-syllable words', 'Drum or clapping hands', 'Syllable counting mat'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I show a picture card and say the word clearly', completed: false },
      { id: '2', instruction: 'I clap once for each syllable while saying the word slowly', completed: false },
      { id: '3', instruction: 'I count how many claps (syllables) the word has', completed: false },
      { id: '4', instruction: 'I sort picture cards by number of syllables (1, 2, 3+)', completed: false },
      { id: '5', instruction: 'I try with new words, including my own name', completed: false }
    ]
  },

  // Writing
  'chalkboard-writing': {
    title: 'Chalkboard Writing',
    description: 'Large-scale letter formation on chalkboard before paper',
    icon: '🖊️',
    purpose: 'To practice letter formation with large arm movements before transitioning to smaller pencil work on paper.',
    materials: ['Chalkboard', 'Chalk', 'Damp sponge', 'Sandpaper letters for reference'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I trace the sandpaper letter to recall the formation', completed: false },
      { id: '2', instruction: 'I write the letter large on the chalkboard using whole arm', completed: false },
      { id: '3', instruction: 'I say the phonetic sound while forming the letter', completed: false },
      { id: '4', instruction: 'I write the letter several times, refining the shape', completed: false },
      { id: '5', instruction: 'I erase with damp sponge and try a new letter', completed: false }
    ]
  },
  'creative-writing': {
    title: 'Creative Writing',
    description: 'Composing original sentences and stories',
    icon: '📝',
    purpose: 'To express ideas through written language, progressing from single words to sentences and stories.',
    materials: ['Writing paper with lines', 'Pencils', 'Moveable alphabet (for support)', 'Picture prompts'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'I choose a picture prompt or topic that interests me', completed: false },
      { id: '2', instruction: 'I tell my idea aloud before writing it down', completed: false },
      { id: '3', instruction: 'I write my sentence, sounding out each word', completed: false },
      { id: '4', instruction: 'I read my writing back to check it makes sense', completed: false },
      { id: '5', instruction: 'I add details or write a second sentence to extend my idea', completed: false }
    ]
  },

  // Reading Comprehension
  'command-cards': {
    title: 'Command Cards',
    description: 'Reading and acting out written instructions',
    icon: '📋',
    purpose: 'To build reading comprehension by reading action phrases and demonstrating understanding through movement.',
    materials: ['Command cards (action phrases)', 'Props as needed', 'Reading mat'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I pick a command card from the basket', completed: false },
      { id: '2', instruction: 'I read the instruction silently first', completed: false },
      { id: '3', instruction: 'I act out exactly what the card says to do', completed: false },
      { id: '4', instruction: 'I return the card and select another command', completed: false },
      { id: '5', instruction: 'I try writing my own command cards for a friend to read', completed: false }
    ]
  },
  'reading-classification': {
    title: 'Reading Classification',
    description: 'Reading labels and sorting into categories',
    icon: '🏷️',
    purpose: 'To combine reading practice with logical thinking by reading words and classifying them into groups.',
    materials: ['Category heading cards', 'Word cards for sorting', 'Sorting mat', 'Control chart'],
    category: 'Language',
    difficulty: 'Intermediate',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'I lay out category heading cards (e.g., "Fruits" and "Vegetables")', completed: false },
      { id: '2', instruction: 'I read each word card carefully', completed: false },
      { id: '3', instruction: 'I decide which category the word belongs to', completed: false },
      { id: '4', instruction: 'I place the word under the correct heading', completed: false },
      { id: '5', instruction: 'I check my work against the control chart', completed: false }
    ]
  },

  // Grammar – Extended
  'noun-classification': {
    title: 'Noun Classification',
    description: 'Common, proper, abstract, and collective nouns',
    icon: '▲',
    purpose: 'To deepen understanding of nouns by classifying them into types using the grammar symbols.',
    materials: ['Noun classification cards', 'Black grammar triangles', 'Sorting mat', 'Labels'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'I review the noun symbol (large black triangle)', completed: false },
      { id: '2', instruction: 'I read word cards and identify each as a noun', completed: false },
      { id: '3', instruction: 'I sort nouns: common (dog) vs. proper (London)', completed: false },
      { id: '4', instruction: 'I discover collective nouns (flock, herd) and abstract nouns (love, joy)', completed: false },
      { id: '5', instruction: 'I write my own examples of each noun type', completed: false }
    ]
  },
  'verb-conjugation': {
    title: 'Verb Study',
    description: 'Action words, tenses, and verb conjugation',
    icon: '🔴',
    purpose: 'To explore verbs through action, understanding tense changes and how verbs drive meaning in sentences.',
    materials: ['Verb cards', 'Red grammar circles', 'Tense sorting mat', 'Action props'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'I read a verb card and act out the action', completed: false },
      { id: '2', instruction: 'I say the verb in present tense: "I walk"', completed: false },
      { id: '3', instruction: 'I change to past tense: "I walked"', completed: false },
      { id: '4', instruction: 'I change to future tense: "I will walk"', completed: false },
      { id: '5', instruction: 'I sort verb cards by tense on the sorting mat', completed: false }
    ]
  },
  // ============ PINK SERIES (3-letter phonetic CVC words) ============
  'pink-object-box': {
    title: 'Pink Series – Object Box',
    description: 'Stage 1: Match three-letter phonetic words to miniature objects',
    icon: '🎁',
    purpose: 'To give the child their first total reading experience: decoding a written word and recognising it represents a real, known object.',
    materials: ['Pink box with 6–8 miniature objects (cat, pig, hat, jug, pen, bus)', 'Matching printed word cards in pink', 'Small mat'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I unroll the mat and place all miniature objects in a column on the left', completed: false },
      { id: '2', instruction: 'I take one word card, point under each letter and say its pure phonetic sound', completed: false },
      { id: '3', instruction: 'I blend the sounds smoothly: /c/-/a/-/t/ → cat', completed: false },
      { id: '4', instruction: 'I place the word card beside the matching object', completed: false },
      { id: '5', instruction: 'I continue until every object has its word, then return the material to the shelf', completed: false }
    ]
  },
  'pink-picture-cards': {
    title: 'Pink Series – Picture & Word Cards',
    description: 'Stage 2: Read CVC words and match to picture cards',
    icon: '🖼️',
    purpose: 'To progress from concrete objects to two-dimensional representation, strengthening decoding of three-letter phonetic words.',
    materials: ['Set of pink picture cards (CVC words)', 'Matching word cards', 'Control cards', 'Mat'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I lay out the picture cards in a column on the left of the mat', completed: false },
      { id: '2', instruction: 'I take one word card and sound out each letter from left to right', completed: false },
      { id: '3', instruction: 'I blend the sounds and place the word beside its matching picture', completed: false },
      { id: '4', instruction: 'I complete all matches, then turn over the control card to check my work', completed: false },
      { id: '5', instruction: 'I correct any errors quietly on my own before returning the material', completed: false }
    ]
  },
  'pink-word-lists': {
    title: 'Pink Series – Word Lists',
    description: 'Stage 3: Read columns of three-letter phonetic words',
    icon: '📋',
    purpose: 'To build reading fluency by decoding lists of phonetic words without picture support, preparing the child for continuous text.',
    materials: ['Pink word list cards (grouped by vowel: -at, -ig, -un, -et, -op)', 'Pointer or finger', 'Mat'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I choose one word list grouped by a single vowel sound', completed: false },
      { id: '2', instruction: 'I point under the first word and sound out each letter', completed: false },
      { id: '3', instruction: 'I blend the sounds to read the word aloud', completed: false },
      { id: '4', instruction: 'I move down the list, reading each word smoothly', completed: false },
      { id: '5', instruction: 'I notice the vowel pattern repeating in every word on the list', completed: false }
    ]
  },
  'pink-phrases': {
    title: 'Pink Series – Phrases',
    description: 'Stage 4: Read short phrases made of phonetic words',
    icon: '🔗',
    purpose: 'To extend reading from single words to meaningful groups of words, building the bridge to sentence-level comprehension.',
    materials: ['Pink phrase strips (e.g., "a red hat", "the big pig")', 'Matching picture cards', 'Mat'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I lay out the picture cards on the mat', completed: false },
      { id: '2', instruction: 'I pick up one phrase strip and read each word in turn', completed: false },
      { id: '3', instruction: 'I re-read the whole phrase smoothly to hear its meaning', completed: false },
      { id: '4', instruction: 'I place the phrase beside the picture it describes', completed: false },
      { id: '5', instruction: 'I continue until every phrase is matched to its picture', completed: false }
    ]
  },
  'pink-sentences': {
    title: 'Pink Series – Sentences',
    description: 'Stage 5: Read complete sentences of phonetic words',
    icon: '✏️',
    purpose: 'To read full sentences composed entirely of three-letter phonetic words, demonstrating reading comprehension through action or matching.',
    materials: ['Pink sentence strips', 'Small objects or picture cards for acting out', 'Mat'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I take one sentence strip and read each word in order', completed: false },
      { id: '2', instruction: 'I re-read the sentence smoothly from beginning to end', completed: false },
      { id: '3', instruction: 'I act out the sentence or arrange objects to show what it means', completed: false },
      { id: '4', instruction: 'I return the strip and choose another sentence', completed: false },
      { id: '5', instruction: 'I notice that I am truly reading – understanding written language', completed: false }
    ]
  },
  'pink-booklets': {
    title: 'Pink Series – Booklets',
    description: 'Stage 6: First little books with phonetic words',
    icon: '📕',
    purpose: 'To experience the joy of reading a complete little book, consolidating decoding of three-letter phonetic words in continuous text.',
    materials: ['Small pink-covered phonetic booklets', 'Quiet reading mat or cushion', 'Bookmark'],
    category: 'Language',
    difficulty: 'Beginner',
    isPremium: false,
    steps: [
      { id: '1', instruction: 'I choose one pink booklet and sit comfortably', completed: false },
      { id: '2', instruction: 'I look at the cover and read the title aloud', completed: false },
      { id: '3', instruction: 'I read each page slowly, sounding out any new word', completed: false },
      { id: '4', instruction: 'I turn each page carefully from the top right corner', completed: false },
      { id: '5', instruction: 'I close the booklet and tell what the little story was about', completed: false }
    ]
  },

  'function-of-words': {
    title: 'Function of Words',
    description: 'Articles, prepositions, conjunctions, and adverbs',
    icon: '🔷',
    purpose: 'To understand how small function words connect and modify meaning within sentences.',
    materials: ['Grammar symbol set', 'Sentence strips', 'Function word cards', 'Grammar box materials'],
    category: 'Language',
    difficulty: 'Advanced',
    isPremium: true,
    steps: [
      { id: '1', instruction: 'I read a sentence strip and place grammar symbols above each word', completed: false },
      { id: '2', instruction: 'I identify the article (a, the) and its light blue triangle', completed: false },
      { id: '3', instruction: 'I find prepositions (on, in, under) and test by replacing them', completed: false },
      { id: '4', instruction: 'I locate conjunctions (and, but) that join ideas', completed: false },
      { id: '5', instruction: 'I discuss how removing function words changes the meaning', completed: false }
    ]
  }
};

export default amiLanguageSkills;
