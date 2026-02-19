import { MathSkillData } from './mathSkills';

export const amiMathSkills: Record<string, MathSkillData> = {
  'sandpaper-numbers': {
    title: 'Sandpaper Numbers',
    description: 'Tracing textured numerals 0-9 to learn symbol formation through touch',
    purpose: 'To teach the child the symbols for quantities 0-9 through tactile and muscular memory, connecting the visual symbol to its name and preparing the hand for writing numerals.',
    materials: ['Sandpaper number cards 0-9', 'Tray of sand (optional)'],
    materialsPurpose: [
      'Sandpaper number cards: Tactile numerals on smooth boards for multi-sensory learning',
      'Tray of sand: For practice writing numerals after tracing'
    ],
    steps: [
      'Trace numeral with two fingers while saying the name',
      'Conduct three-period lesson',
      'Practice writing numeral in sand tray',
      'Associate numeral with corresponding quantity'
    ],
    detailedSteps: [
      'Select three contrasting numerals (e.g., 1, 4, 7)',
      'Trace the first numeral slowly with index and middle finger: "This is one"',
      'Repeat tracing 2-3 times while saying the name',
      'Invite child to trace: "Now you trace one"',
      'Introduce second and third numerals the same way',
      'Three-period lesson: "Show me four" / "What is this?"',
      'Practice writing in sand tray after tracing',
      'Once all 10 numerals are learned, match to Number Rods and Spindle Box'
    ],
    ageRange: '3-5 years',
    difficulty: 'Beginner',
    category: 'Mathematics',
    isPremium: false,
    icon: '✋',
    objectives: [
      'Learn numeral symbols 0-9',
      'Develop muscular memory for writing',
      'Connect symbol to name',
      'Prepare hand for numeral formation'
    ],
    extensions: [
      'Write numerals on paper',
      'Match numerals to quantities',
      'Numeral formation in various media (clay, paint)',
      'Create numeral booklets'
    ]
  },

  'short-bead-stair': {
    title: 'Short Bead Stair',
    description: 'Colored bead bars 1-9 for counting and quantity recognition',
    purpose: 'To provide a concrete, color-coded representation of quantities 1-9, establishing the bead bar colors used throughout all subsequent Montessori math materials.',
    materials: ['Colored bead bars 1-9', 'Work mat', 'Number cards 1-9'],
    materialsPurpose: [
      'Colored bead bars: Each quantity has a unique color (1=red, 2=green, 3=pink, 4=yellow, 5=light blue, 6=purple, 7=white, 8=brown, 9=dark blue)',
      'Work mat: Defines workspace',
      'Number cards: For symbol-quantity matching'
    ],
    steps: [
      'Lay out bead bars in order from 1 to 9',
      'Count each bead bar',
      'Build the stair pattern',
      'Match number cards to bead bars'
    ],
    detailedSteps: [
      'Place the one-bead bar (red) on the left of the mat',
      'Place the two-bead bar (green) next to it',
      'Continue building the stair from 1 to 9',
      'Count each bar: "One... one, two... one, two, three..."',
      'Name the colors: "The red bar is one, the green bar is two"',
      'Match number cards to each bead bar',
      'Practice three-period lesson with colors and quantities'
    ],
    ageRange: '3.5-5 years',
    difficulty: 'Beginner',
    category: 'Mathematics',
    isPremium: false,
    icon: '📿',
    objectives: [
      'Learn quantities 1-9 with bead bars',
      'Associate colors with quantities',
      'Build foundation for all bead material work',
      'Develop counting precision'
    ],
    extensions: [
      'Combine bead bars for addition',
      'Find combinations that make 10',
      'Skip counting with same-color bars',
      'Connect to golden bead decimal system'
    ]
  },

  'memory-game-numbers': {
    title: 'Memory Game of Numbers',
    description: 'Fetch quantities from memory to develop number sense and concentration',
    purpose: 'To develop the child\'s ability to hold a number in memory, count out a corresponding quantity, and carry it back — strengthening number sense, memory, and independence.',
    materials: ['Number cards 1-10', 'Collection of small objects (buttons, shells, beads)', 'Two mats or tables set apart'],
    materialsPurpose: [
      'Number cards: Child draws a card and must remember the number',
      'Small objects: Source of countable quantities placed across the room',
      'Two separated spaces: Create distance to challenge memory'
    ],
    steps: [
      'Child draws a number card',
      'Walks to the object collection across the room',
      'Counts out the matching quantity from memory',
      'Returns to verify against the card'
    ],
    detailedSteps: [
      'Set up: Place number cards face-down on one mat, objects on another mat across the room',
      'Child turns over a number card and reads it silently',
      'Child places the card face-down and walks to the object collection',
      'Child counts out the quantity they remember',
      'Child carries the objects back to the first mat',
      'Child turns the card face-up and verifies the count',
      'If correct, celebrate; if incorrect, return objects and try again'
    ],
    ageRange: '4-5 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: false,
    icon: '🧠',
    objectives: [
      'Strengthen number memory',
      'Practice accurate counting',
      'Develop independence',
      'Build concentration over distance'
    ],
    extensions: [
      'Use larger numbers (11-20)',
      'Use two-digit number cards',
      'Add operation cards (e.g., "3+2")',
      'Partner game with verification'
    ]
  },

  'addition-snake-game': {
    title: 'Addition Snake Game',
    description: 'Build colorful bead snakes and exchange for golden ten bars',
    purpose: 'To provide concrete experience with addition, practice exchanging quantities for tens, and reinforce the bead bar color associations while developing mental arithmetic foundations.',
    materials: ['Colored bead bars', 'Golden ten bars', 'Black and white verification stair', 'Notched number cards (optional)'],
    materialsPurpose: [
      'Colored bead bars: Form the "snake" — addends to be combined',
      'Golden ten bars: Used for exchanging when groups of 10 are found',
      'Black and white stair: Verification tool for counting remainders'
    ],
    steps: [
      'Lay colored bead bars end-to-end as a snake',
      'Count from the beginning, exchanging every 10 for a golden bar',
      'Continue until entire snake is counted',
      'Verify by counting golden bars and remainder'
    ],
    detailedSteps: [
      'Select 5-7 colored bead bars and lay them end-to-end in a "snake"',
      'Starting from the left, count beads: 1, 2, 3...',
      'When you reach 10, remove those bead bars and replace with one golden ten bar',
      'Place any remaining beads (using the black/white stair for the partial bar) at the start of the next count',
      'Continue counting and exchanging until the entire snake is golden',
      'Count the golden bars and any remainder to find the total sum',
      'Verify: lay original colored bars back out and recount'
    ],
    ageRange: '5-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: true,
    icon: '🐍',
    objectives: [
      'Practice addition concretely',
      'Understand exchanging for tens',
      'Reinforce bead bar color values',
      'Develop mental arithmetic foundations'
    ],
    extensions: [
      'Use longer snakes with more bead bars',
      'Record equations on paper',
      'Subtraction snake game',
      'Negative snake game (subtraction version)'
    ]
  },

  'subtraction-snake-game': {
    title: 'Subtraction Snake Game',
    description: 'Use gray bead bars to subtract from a golden snake',
    purpose: 'To provide concrete experience with subtraction using the snake game format, reinforcing the concept of "taking away" and exchanging within the decimal system.',
    materials: ['Golden ten bars', 'Gray bead bars (subtrahends)', 'Colored bead bars', 'Black and white stair'],
    materialsPurpose: [
      'Golden ten bars: Form the initial snake (minuend)',
      'Gray bead bars: Represent quantities to subtract',
      'Colored bead bars: Used for exchanges when breaking a ten',
      'Black and white stair: Verification and remainder tool'
    ],
    steps: [
      'Lay golden ten bars and gray bead bars alternately',
      'Count forward on golden, count back on gray',
      'Exchange when needed',
      'Find the difference'
    ],
    detailedSteps: [
      'Lay golden ten bars in a snake, interspersed with gray bead bars',
      'Starting from the left, count forward on golden beads',
      'When reaching a gray bar, count those beads backward (subtract)',
      'If gray bar is larger than remaining count, exchange a golden bar for colored bars',
      'Continue counting and subtracting through the entire snake',
      'The remaining golden bars and colored remainder are the answer'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '🐍',
    objectives: [
      'Practice subtraction concretely',
      'Understand borrowing/exchanging',
      'Reinforce place value concepts',
      'Develop problem-solving skills'
    ],
    extensions: [
      'Record subtraction equations',
      'Create own snake problems',
      'Connect to stamp game subtraction',
      'Word problems using snake format'
    ]
  },

  'stamp-game': {
    title: 'Stamp Game',
    description: 'Perform all four operations using color-coded stamps for place value',
    purpose: 'To provide a more abstract representation of the four mathematical operations, bridging between the golden bead material and purely abstract computation using stamps that represent units, tens, hundreds, and thousands.',
    materials: ['Stamp game box with color-coded stamps', 'Small skittles (for division)', 'Pencil and paper', 'Work mat'],
    materialsPurpose: [
      'Green stamps marked "1": Represent units',
      'Blue stamps marked "10": Represent tens',
      'Red stamps marked "100": Represent hundreds',
      'Green stamps marked "1000": Represent thousands',
      'Skittles: Used as divisors in division problems'
    ],
    steps: [
      'Form numbers using stamps by place value',
      'Perform operations: add, subtract, multiply, or divide',
      'Exchange stamps when necessary (10 units = 1 ten)',
      'Record results on paper'
    ],
    detailedSteps: [
      'For addition: Form both addends with stamps, combine, exchange if needed, read result',
      'For subtraction: Form minuend with stamps, take away subtrahend stamps, exchange if needed, read result',
      'For multiplication: Form multiplicand, repeat for each multiplier, combine all, exchange, read result',
      'For division: Form dividend, distribute stamps equally among skittles (divisor), read quotient',
      'Always record the equation and answer on paper',
      'Practice exchanging: 10 green units = 1 blue ten stamp'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '📮',
    objectives: [
      'Perform four operations with more abstract material',
      'Reinforce place value and exchanging',
      'Bridge from concrete to abstract arithmetic',
      'Develop recording and notation skills'
    ],
    extensions: [
      'Multi-digit operations',
      'Problems with exchanging across multiple places',
      'Word problems solved with stamps',
      'Connect to bead frame work'
    ]
  },

  'dot-game': {
    title: 'Dot Game',
    description: 'Practice addition with carrying using a hierarchical dot board',
    purpose: 'To practice dynamic addition (with carrying/exchanging) in a more abstract format, preparing the child for pencil-and-paper arithmetic.',
    materials: ['Dot game board (columns for units, tens, hundreds, thousands)', 'Colored pencils (green, blue, red)', 'Number cards or dice'],
    materialsPurpose: [
      'Dot board: Hierarchical columns matching place value colors',
      'Colored pencils: Green for units, blue for tens, red for hundreds',
      'Number cards: Source of addends'
    ],
    steps: [
      'Write addends on the board in correct columns',
      'Place dots for each digit in correct column',
      'Count dots in each column',
      'Exchange 10 dots for 1 dot in next column'
    ],
    detailedSteps: [
      'Write the first addend number, placing each digit in the correct colored column',
      'Place dots in each column representing each digit',
      'Write the second addend below and add those dots to each column',
      'Count dots in units column — if 10 or more, cross out 10 and place 1 dot in tens column',
      'Continue exchanging in each column as needed',
      'Read the final answer from the dots remaining in each column'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '⚫',
    objectives: [
      'Practice dynamic addition',
      'Understand carrying/exchanging on paper',
      'Bridge to written arithmetic',
      'Reinforce place value colors'
    ],
    extensions: [
      'Add three or more addends',
      'Use with larger numbers',
      'Create own addition problems',
      'Connect to stamp game verification'
    ]
  },

  'multiplication-board': {
    title: 'Multiplication Board',
    description: 'Explore multiplication facts using bead placement on a perforated board',
    purpose: 'To provide concrete experience with multiplication facts through repeated addition, helping the child memorize multiplication tables through hands-on practice.',
    materials: ['Multiplication board (perforated)', '100 red beads', 'Multiplication fact cards', 'Red disc for multiplier'],
    materialsPurpose: [
      'Perforated board: Grid of 100 holes for bead placement',
      '100 red beads: Placed in rows to show multiplication',
      'Fact cards: Guide which problems to solve',
      'Red disc: Slides along the top to indicate the multiplicand'
    ],
    steps: [
      'Select a multiplication fact card',
      'Place red disc at the multiplicand number',
      'Place beads in rows for each factor',
      'Count total beads for the product'
    ],
    detailedSteps: [
      'Select a fact card (e.g., 3 × 4)',
      'Place the red disc above the "3" on the top row',
      'Place 3 beads in the first row (one row of 3)',
      'Place 3 beads in the second row (two rows of 3)',
      'Place 3 beads in the third row (three rows of 3)',
      'Place 3 beads in the fourth row (four rows of 3)',
      'Count all beads: "3 taken 4 times equals 12"',
      'Record: 3 × 4 = 12',
      'Continue with next fact card'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '✖️',
    objectives: [
      'Learn multiplication facts',
      'Understand multiplication as repeated addition',
      'Develop pattern recognition',
      'Memorize times tables'
    ],
    extensions: [
      'Complete multiplication tables',
      'Discover commutative property (3×4 = 4×3)',
      'Find square numbers',
      'Connect to division board'
    ]
  },

  'division-board': {
    title: 'Division Board',
    description: 'Explore division facts by distributing beads equally among skittles',
    purpose: 'To provide concrete experience with division as equal distribution, helping the child understand and memorize division facts through hands-on practice.',
    materials: ['Division board (perforated)', '81 green beads', 'Green skittles (divisors)', 'Division fact cards', 'Cup for remainders'],
    materialsPurpose: [
      'Perforated board: Grid for organizing equal distribution',
      'Green beads: Represent the dividend to be distributed',
      'Green skittles: Placed along the top to represent the divisor',
      'Fact cards: Guide which problems to solve',
      'Cup: Holds any remainder beads'
    ],
    steps: [
      'Select a division fact card',
      'Place skittles for the divisor',
      'Distribute beads equally among skittles',
      'Count rows for the quotient'
    ],
    detailedSteps: [
      'Select a fact card (e.g., 12 ÷ 3)',
      'Place 3 green skittles across the top of the board',
      'Count out 12 beads from the cup',
      'Distribute beads one at a time to each skittle (one row)',
      'Continue distributing until all 12 beads are placed',
      'Count the number of rows: "12 divided by 3 equals 4"',
      'Record: 12 ÷ 3 = 4',
      'If beads remain after even distribution, they are the remainder'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '➗',
    objectives: [
      'Learn division facts',
      'Understand division as equal sharing',
      'Develop understanding of remainders',
      'Connect division to multiplication'
    ],
    extensions: [
      'Division with remainders',
      'Connect to multiplication board (inverse)',
      'Long division preparation',
      'Word problems with division'
    ]
  },

  'subtraction-strip-board': {
    title: 'Subtraction Strip Board',
    description: 'Concrete introduction to subtraction facts using colored strips',
    purpose: 'To provide concrete experience with subtraction combinations and help memorize basic subtraction facts through repeated practice with the strip board.',
    materials: ['Subtraction strip board', 'Blue strips (minuend)', 'Red strips (subtrahend)', 'Number line'],
    materialsPurpose: [
      'Subtraction strip board: Grid for organizing subtraction problems',
      'Blue strips: Represent the starting number (minuend)',
      'Red strips: Represent the amount to take away (subtrahend)',
      'Number line: Visual reference for counting back'
    ],
    steps: [
      'Place blue strip for the minuend',
      'Place red strip to subtract',
      'Read the difference',
      'Record the equation'
    ],
    detailedSteps: [
      'Choose minuend — place blue strip starting at 1 (e.g., blue 7 = seven spaces)',
      'Choose subtrahend — place red strip at the end of the blue strip, pointing left',
      'The red strip covers part of the number line',
      'Read where the red strip begins — that is the difference',
      'Example: 7 - 3 = 4 (blue 7, red 3, difference shows at 4)',
      'Record the equation on paper'
    ],
    ageRange: '5-7 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '➖',
    objectives: [
      'Learn subtraction facts',
      'Understand subtraction as taking away',
      'Develop mental subtraction skills',
      'Connect to addition strip board (inverse)'
    ],
    extensions: [
      'Subtraction fact memorization',
      'Connect addition and subtraction fact families',
      'Word problems with strips',
      'Missing addend problems'
    ]
  },

  'small-bead-frame': {
    title: 'Small Bead Frame',
    description: 'Perform operations with a four-row abacus representing place value',
    purpose: 'To provide a more abstract tool for performing the four operations, bridging from the stamp game toward written computation using a hierarchical bead frame.',
    materials: ['Small bead frame (4 rows: units, tens, hundreds, thousands)', 'Pencil and paper', 'Problem cards'],
    materialsPurpose: [
      'Small bead frame: 4 wires with 10 beads each — green (units), blue (tens), red (hundreds), green (thousands)',
      'Paper: For recording problems and answers',
      'Problem cards: Prepared arithmetic problems'
    ],
    steps: [
      'Form a number by sliding beads to the right',
      'Perform the operation (add, subtract, multiply, divide)',
      'Exchange: push 10 beads back and slide 1 bead on next wire',
      'Read and record the result'
    ],
    detailedSteps: [
      'Clear the frame: all beads to the left',
      'Form the first number by sliding beads right on each wire',
      'For addition: add beads for the second number, starting from units',
      'When a wire reaches 10: push all 10 back left and slide 1 bead right on the next wire',
      'For subtraction: remove beads starting from units, exchanging from higher wires if needed',
      'Read the answer from right-positioned beads on each wire',
      'Record the equation and answer on paper'
    ],
    ageRange: '6-8 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '🧮',
    objectives: [
      'Perform operations more abstractly',
      'Reinforce place value and exchanging',
      'Bridge toward written arithmetic',
      'Develop speed and fluency'
    ],
    extensions: [
      'Progress to large bead frame (7 categories)',
      'Multi-digit multiplication',
      'Long division on the frame',
      'Compare to stamp game results'
    ]
  },

  'large-bead-frame': {
    title: 'Large Bead Frame',
    description: 'Extend operations to millions using a seven-row hierarchical abacus',
    purpose: 'To extend understanding of the decimal system to millions, providing practice with large-number operations and reinforcing the hierarchical structure of the number system.',
    materials: ['Large bead frame (7 rows: units through millions)', 'Pencil and paper', 'Problem cards'],
    materialsPurpose: [
      'Large bead frame: 7 wires representing units, tens, hundreds, thousands, ten-thousands, hundred-thousands, millions',
      'Paper: For recording problems and results',
      'Problem cards: Large-number arithmetic problems'
    ],
    steps: [
      'Form large numbers on the frame',
      'Perform operations with multi-digit numbers',
      'Exchange across multiple hierarchies',
      'Record results'
    ],
    detailedSteps: [
      'Clear all beads to the left',
      'Form large numbers by sliding beads right on appropriate wires',
      'Practice reading large numbers: "three million, two hundred forty-five thousand, six hundred seventeen"',
      'Perform addition and subtraction with large numbers',
      'Exchange when any wire reaches 10 beads',
      'Record all work on paper for verification'
    ],
    ageRange: '6-9 years',
    difficulty: 'Advanced',
    category: 'Mathematics',
    isPremium: true,
    icon: '🧮',
    objectives: [
      'Work with numbers to millions',
      'Understand hierarchical number system',
      'Perform operations with large numbers',
      'Prepare for abstract long multiplication and division'
    ],
    extensions: [
      'Multiply multi-digit numbers',
      'Long division with large numbers',
      'Explore number patterns at each hierarchy',
      'Connect to checkerboard multiplication'
    ]
  },

  'fraction-skittles': {
    title: 'Fraction Skittles',
    description: 'Introduction to fractions using divided circular insets',
    purpose: 'To introduce the concept of fractions as equal parts of a whole, develop fraction vocabulary, and prepare for fraction operations through concrete, visual manipulation.',
    materials: ['Fraction insets (circles divided into 1 through 10 equal parts)', 'Metal frame', 'Labels'],
    materialsPurpose: [
      'Fraction insets: 10 metal circles divided into equal parts from 1 whole to 1/10',
      'Metal frame: Holds each circle for precise lifting and replacing',
      'Labels: Fraction names for three-period lesson'
    ],
    steps: [
      'Present the whole circle and name it "one whole"',
      'Compare halves, thirds, fourths to the whole',
      'Name each fraction using proper vocabulary',
      'Explore equivalences'
    ],
    detailedSteps: [
      'Begin with the whole circle: "This is one whole"',
      'Remove one half: "When we divide into two equal parts, each part is one half"',
      'Show that two halves make one whole',
      'Introduce thirds: "Three equal parts — each is one third"',
      'Continue with fourths, fifths, up to tenths',
      'Compare: "Which is bigger, one half or one third?"',
      'Overlay pieces to demonstrate equivalences (e.g., 2/4 = 1/2)',
      'Label each fraction with proper notation'
    ],
    ageRange: '5-7 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: true,
    icon: '🥧',
    objectives: [
      'Understand fractions as equal parts',
      'Learn fraction vocabulary',
      'Compare fraction sizes',
      'Discover equivalent fractions'
    ],
    extensions: [
      'Addition of fractions with same denominator',
      'Equivalent fraction exploration',
      'Fraction of a set',
      'Connect to measurement and cooking'
    ]
  },

  'bank-game': {
    title: 'Bank Game',
    description: 'Collaborative game introducing the four operations with golden bead material',
    purpose: 'To introduce the four mathematical operations (addition, subtraction, multiplication, division) through a collaborative, multi-child activity using the golden bead decimal system material.',
    materials: ['Golden bead material (units, tens, hundreds, thousands)', 'Large number cards', 'Small number cards', 'Trays', 'Work mat'],
    materialsPurpose: [
      'Golden beads: Concrete representation of quantities in the decimal system',
      'Large number cards: Represent the total or result',
      'Small number cards: Represent individual addends or factors',
      'Trays: Each child carries their quantity on a tray',
      'Work mat: Central workspace for combining quantities'
    ],
    steps: [
      'Each child receives a small number card',
      'Children fetch the matching quantity in golden beads',
      'Bring beads to the central mat',
      'Combine and exchange to find the result'
    ],
    detailedSteps: [
      'For addition: Give each child a small number card (e.g., 2,435 and 1,342)',
      'Each child goes to the "bank" and collects the matching golden bead quantity on their tray',
      'Children bring their trays to the central mat and combine all beads',
      'Count combined beads, exchanging 10 units for 1 ten bar, etc.',
      'Find the large number card that matches the result',
      'Read the equation together: "2,435 plus 1,342 equals 3,777"',
      'For subtraction: start with a large quantity, one child takes away a specified amount',
      'For multiplication: one child fetches the same quantity multiple times',
      'For division: distribute a large quantity equally among children'
    ],
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: false,
    icon: '🏦',
    objectives: [
      'Understand the four operations concretely',
      'Practice exchanging in the decimal system',
      'Develop collaborative learning skills',
      'Connect quantities to symbols'
    ],
    extensions: [
      'Larger numbers requiring more exchanging',
      'Multi-child division with remainders',
      'Dynamic subtraction (with borrowing)',
      'Progress to stamp game for individual work'
    ]
  },

  'number-composition': {
    title: 'Number Composition',
    description: 'Build numbers using large, medium, and small number cards',
    purpose: 'To help the child understand how multi-digit numbers are composed from units, tens, hundreds, and thousands through overlapping number cards that reveal place value structure.',
    materials: ['Large number cards (1-9000)', 'Work mat'],
    materialsPurpose: [
      'Large number cards: Color-coded overlapping cards — green (units 1-9), blue (tens 10-90), red (hundreds 100-900), green (thousands 1000-9000)',
      'Work mat: Workspace for card arrangement'
    ],
    steps: [
      'Lay out cards by category',
      'Build a number by overlapping cards',
      'Read the composed number',
      'Decompose back into components'
    ],
    detailedSteps: [
      'Lay out thousands cards, hundreds cards, tens cards, and units cards in rows',
      'Ask child to build a number: "Make 3,452"',
      'Child selects 3000, 400, 50, and 2 cards',
      'Overlap the cards: 3000 + 400 + 50 + 2 = 3,452',
      'Show how the zeros are covered: "3 thousands, 4 hundreds, 5 tens, 2 units"',
      'Decompose: slide cards apart to reveal each component',
      'Practice with various numbers'
    ],
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Mathematics',
    isPremium: false,
    icon: '🃏',
    objectives: [
      'Understand place value composition',
      'Read multi-digit numbers',
      'Decompose numbers by place value',
      'Prepare for operations with large numbers'
    ],
    extensions: [
      'Compose numbers to thousands',
      'Read numbers aloud',
      'Compare composed numbers (greater than, less than)',
      'Connect to golden bead quantities'
    ]
  }
};
