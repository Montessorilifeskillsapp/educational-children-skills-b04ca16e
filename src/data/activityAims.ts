/**
 * AMI Direct and Indirect Aims for activities whose own data does not list them.
 * Activity data that already carries directAims/indirectAims always wins.
 */
export interface ActivityAims { direct: string[]; indirect: string[] }

export const activityAims: Record<string, ActivityAims> = {
  "flags-of-the-world": {
    "direct": [
      "Visual discrimination of color, shape, and pattern",
      "Knowledge of flags and their corresponding countries",
      "Enrichment of geographic vocabulary"
    ],
    "indirect": [
      "Preparation for geography and history",
      "Development of global awareness and respect for nations",
      "Preparation for reading"
    ]
  },
  "food-around-the-world": {
    "direct": [
      "Acquisition of vocabulary related to traditional foods and culinary practices",
      "Classification of foods according to culture and geographic origin"
    ],
    "indirect": [
      "Development of cultural awareness and empathy",
      "Preparation for geography and human ecology",
      "Enrichment of spoken language"
    ]
  },
  "celebrations-traditions": {
    "direct": [
      "Knowledge of cultural celebrations, festivals, and traditions",
      "Enrichment of vocabulary related to global customs"
    ],
    "indirect": [
      "Understanding of fundamental human needs and shared humanity",
      "Preparation for history and cultural studies",
      "Cultivation of respect and open-mindedness toward diversity"
    ]
  },
  "traditional-clothing": {
    "direct": [
      "Recognition and naming of traditional garments across cultures",
      "Visual discrimination of cultural attire, patterns, and textiles"
    ],
    "indirect": [
      "Appreciation of cultural identity and human adaptation to environment",
      "Preparation for geography and anthropology",
      "Enrichment of descriptive language"
    ]
  },
  "stamp-game": {
    "direct": [
      "Practice with the four operations into thousands",
      "Transition toward greater abstraction in decimal operations"
    ],
    "indirect": [
      "Preparation for pencil-and-paper arithmetic",
      "Reinforcement of place value and hierarchies",
      "Independence in mathematical calculation"
    ]
  },
  "dot-game": {
    "direct": [
      "Understanding the mechanism of dynamic column addition",
      "Experience with carrying across decimal hierarchies"
    ],
    "indirect": [
      "Preparation for abstract written addition",
      "Reinforcement of the decimal system",
      "Development of concentration and precision"
    ]
  },
  "multiplication-board": {
    "direct": [
      "Memorization of essential multiplication tables",
      "Concrete representation of multiplication as repeated addition"
    ],
    "indirect": [
      "Preparation for abstract multiplication",
      "Development of the mathematical mind",
      "Visual memory of number combinations"
    ]
  },
  "division-board": {
    "direct": [
      "Memorization of division combinations within eighty-one",
      "Concrete experience of division as equal distribution"
    ],
    "indirect": [
      "Introduction to the concept of a remainder",
      "Preparation for abstract long division",
      "Development of order and concentration"
    ]
  },
  "subtraction-strip-board": {
    "direct": [
      "Memorization of essential subtraction facts",
      "Concrete experience of subtraction combinations"
    ],
    "indirect": [
      "Preparation for abstract mental subtraction",
      "Recognition of numerical patterns",
      "Development of logical thinking"
    ]
  },
  "small-bead-frame": {
    "direct": [
      "Passage to abstraction in the four operations up to thousands",
      "Written notation of operations aligned with place value"
    ],
    "indirect": [
      "Preparation for pencil-and-paper arithmetic",
      "Understanding the function of zero as a place holder",
      "Refinement of precision and fine motor control"
    ]
  },
  "large-bead-frame": {
    "direct": [
      "Execution of the four operations into millions",
      "Understanding hierarchical notation across periods"
    ],
    "indirect": [
      "Preparation for abstract multi-digit operations",
      "Consolidation of the decimal system structure",
      "Independence in complex calculation"
    ]
  },
  "fraction-skittles": {
    "direct": [
      "Sensorial experience of fractions as equal parts of a whole",
      "Introduction to fraction terminology"
    ],
    "indirect": [
      "Preparation for arithmetic operations with fractions",
      "Visual discrimination of proportional division",
      "Sensorial foundation for geometry"
    ]
  },
  "bank-game": {
    "direct": [
      "Understanding the mechanics of the four operations",
      "Experience with dynamic operations and exchanging"
    ],
    "indirect": [
      "Cooperation and social collaboration",
      "Preparation for abstract arithmetic",
      "Reinforcement of decimal system structure"
    ]
  },
  "number-composition": {
    "direct": [
      "Association of numerals with decimal quantities",
      "Formation of multi-digit numbers using hierarchical cards"
    ],
    "indirect": [
      "Understanding place value and expanded notation",
      "Visual discrimination of numerical symbols",
      "Preparation for the four operations"
    ]
  },
  "teen-boards": {
    "direct": [
      "Association of quantities and symbols for numbers 11 through 19",
      "Understanding teen numbers as one ten and units"
    ],
    "indirect": [
      "Familiarity with the number sequence beyond ten",
      "Preparation for linear counting to one hundred",
      "Development of mathematical language"
    ]
  },
  "ten-boards": {
    "direct": [
      "Association of symbols and quantities for the tens from 10 to 90",
      "Formation and sequence of numbers 11 through 99"
    ],
    "indirect": [
      "Consolidation of the decimal hierarchy",
      "Preparation for counting to one hundred",
      "Development of order and concentration"
    ]
  },
  "sandpaper-letters": {
    "direct": [
      "Association of the graphic symbol with its phonetic sound",
      "Muscular and visual memory of letter forms"
    ],
    "indirect": [
      "Preparation for writing",
      "Preparation for reading",
      "Refinement of tactile sensitivity and lightness of touch"
    ]
  },
  "moveable-alphabet": {
    "direct": [
      "Analysis of spoken words into component sounds",
      "Composition of words through graphic symbols before hand can write"
    ],
    "indirect": [
      "Preparation for reading",
      "Preparation for written expression",
      "Reinforcement of phonemic awareness"
    ]
  },
  "metal-insets": {
    "direct": [
      "Pencil control and lightness of touch",
      "Execution of controlled parallel strokes within a boundary"
    ],
    "indirect": [
      "Preparation for handwriting",
      "Refinement of hand-eye coordination",
      "Development of aesthetic appreciation and geometric sense"
    ]
  },
  "sound-games": {
    "direct": [
      "Analysis of sounds in spoken words",
      "Development of phonemic awareness"
    ],
    "indirect": [
      "Preparation for writing",
      "Preparation for reading",
      "Auditory discrimination"
    ]
  },
  "blue-series": {
    "direct": [
      "Reading of longer phonetic words containing consonant blends",
      "Synthesis of sounds into words"
    ],
    "indirect": [
      "Preparation for total reading",
      "Enrichment of vocabulary",
      "Confidence in independent reading"
    ]
  },
  "matching-cards-objects": {
    "direct": [
      "Association of three-dimensional objects with two-dimensional representations",
      "Acquisition of precise vocabulary"
    ],
    "indirect": [
      "Visual discrimination of form and detail",
      "Preparation for reading",
      "Classification of the environment"
    ]
  },
  "green-series": {
    "direct": [
      "Recognition and reading of key phonograms",
      "Reading of words with non-phonetic spelling patterns"
    ],
    "indirect": [
      "Preparation for total reading",
      "Understanding the irregularities of English orthography",
      "Independent reading fluency"
    ]
  },
  "grammar-symbols": {
    "direct": [
      "Sensorial impression of the parts of speech",
      "Understanding the function of words within a phrase or sentence"
    ],
    "indirect": [
      "Preparation for sentence analysis",
      "Preparation for total reading",
      "Refinement of written and spoken expression"
    ]
  },
  "writing-preparation": {
    "direct": [
      "Control of the writing instrument",
      "Lightness of touch and execution of directed lines"
    ],
    "indirect": [
      "Preparation for handwriting",
      "Eye-hand coordination",
      "Development of the three-finger pencil grip"
    ]
  },
  "rhyming-games": {
    "direct": [
      "Auditory discrimination of ending sounds",
      "Recognition of rhyming patterns in spoken language"
    ],
    "indirect": [
      "Phonological awareness",
      "Appreciation of the musicality and rhythm of language",
      "Preparation for reading and writing"
    ]
  },
  "classified-cards": {
    "direct": [
      "Enrichment of precise vocabulary",
      "Classification and categorization of objects in the environment"
    ],
    "indirect": [
      "Preparation for reading",
      "Organization of the intellect",
      "Foundation for biological and cultural studies"
    ]
  },
  "storytelling-oral": {
    "direct": [
      "Development of listening comprehension and oral expression",
      "Understanding sequential order in narrative"
    ],
    "indirect": [
      "Preparation for creative writing",
      "Development of imagination based on reality",
      "Enrichment of vocabulary and sentence structure"
    ]
  },
  "word-building": {
    "direct": [
      "Analysis of words into component sounds",
      "Composition of words using physical symbols for sounds"
    ],
    "indirect": [
      "Preparation for mechanical writing",
      "Preparation for reading",
      "Self-expression through written language"
    ]
  },
  "sentence-analysis": {
    "direct": [
      "Analysis of the structural parts of a simple sentence",
      "Identification of the subject, predicate, and object"
    ],
    "indirect": [
      "Preparation for total reading",
      "Development of logical thinking",
      "Understanding syntax and style"
    ]
  },
  "phonetic-reading": {
    "direct": [
      "Reading of phonetic text in sentence context",
      "Reading comprehension"
    ],
    "indirect": [
      "Development of reading fluency",
      "Preparation for total reading",
      "Love of literature and independent learning"
    ]
  },
  "vocabulary-enrichment": {
    "direct": [
      "Acquisition of precise nomenclature for objects and concepts",
      "Enrichment of spoken vocabulary through the three-period lesson"
    ],
    "indirect": [
      "Classification of the child's environment",
      "Confidence in verbal self-expression",
      "Preparation for reading and writing"
    ]
  },
  "conversation-skills": {
    "direct": [
      "Development of articulate speech and expressive vocabulary",
      "Practice of conversational courtesies including listening and turn-taking"
    ],
    "indirect": [
      "Social development and grace and courtesy",
      "Confidence in public speaking",
      "Logical organization of thought"
    ]
  },
  "poetry-recitation": {
    "direct": [
      "Appreciation of the rhythm, cadence, and beauty of verse",
      "Memorization and expressive recitation of poems"
    ],
    "indirect": [
      "Development of auditory memory",
      "Refinement of pronunciation and enunciation",
      "Preparation for literary appreciation"
    ]
  },
  "continent-puzzle-maps": {
    "direct": [
      "Visual and tactile recognition of the countries of each continent",
      "Learning the names of the countries within each continent"
    ],
    "indirect": [
      "Preparation for writing through the use of the knobs",
      "Refinement of visual-motor coordination",
      "Understanding the political divisions of the world"
    ]
  },
  "people-world": {
    "direct": [
      "Awareness of the diverse cultures and peoples of the world",
      "Learning about traditional clothing, homes, and ways of life"
    ],
    "indirect": [
      "Development of empathy and global citizenship",
      "Enrichment of vocabulary and language skills",
      "Sense of belonging to the human family"
    ]
  },
  "animals-continents": {
    "direct": [
      "Association of native animals with their respective continents",
      "Learning the names of various animals from around the world"
    ],
    "indirect": [
      "Understanding of global biodiversity and natural habitats",
      "Preparation for zoology and classification",
      "Development of visual memory and sorting skills"
    ]
  },
  "natural-resources": {
    "direct": [
      "Identification of Earth's natural resources and their everyday uses",
      "Introduction to the concept of conservation and environmental care"
    ],
    "indirect": [
      "Development of environmental awareness and responsibility",
      "Preparation for future earth sciences",
      "Classification and logical thinking"
    ]
  },
  "layers-earth": {
    "direct": [
      "Identification and naming of the internal layers of the Earth",
      "Understanding the relative positions of the crust, mantle, and core"
    ],
    "indirect": [
      "Preparation for physical geography and geology",
      "Development of spatial awareness and abstract thinking",
      "Enrichment of scientific vocabulary"
    ]
  },
  "volcanoes-earthquakes": {
    "direct": [
      "Understanding the basic structure and function of a volcano",
      "Introduction to the concepts of earthquakes and tectonic movement"
    ],
    "indirect": [
      "Understanding the dynamic nature of Earth's surface",
      "Preparation for earth sciences and geology",
      "Cultivation of respect and awe for natural forces"
    ]
  },
  "plant-parts": {
    "direct": [
      "Identification and naming of the main parts of a plant",
      "Understanding the basic function of roots, stem, leaves, and flowers"
    ],
    "indirect": [
      "Preparation for botany and scientific observation",
      "Fine motor development through handling puzzle pieces",
      "Cultivation of respect and care for living things"
    ]
  },
  "leaf-shapes": {
    "direct": [
      "Visual discrimination and classification of various leaf shapes",
      "Learning the botanical names for common leaf shapes"
    ],
    "indirect": [
      "Refinement of observation of nature",
      "Preparation for botany and geometry",
      "Preparation for reading and writing through nomenclature"
    ]
  },
  "flower-parts": {
    "direct": [
      "Identification and naming of the parts of a flower",
      "Understanding the structure and reproductive role of each part"
    ],
    "indirect": [
      "Refinement of fine motor control through delicate manipulation",
      "Preparation for botany and natural sciences",
      "Appreciation of natural beauty and order"
    ]
  },
  "seed-germination": {
    "direct": [
      "Observation of the process of a seed sprouting into a plant",
      "Learning the sequence of germination from seed to seedling"
    ],
    "indirect": [
      "Development of patience and longitudinal observation",
      "Understanding the life cycle of living organisms",
      "Care and responsibility toward living things"
    ]
  },
  "plant-lifecycle": {
    "direct": [
      "Understanding the cyclical stages of plant growth and reproduction",
      "Ordering and naming the stages from seed to mature plant and back to seed"
    ],
    "indirect": [
      "Development of sequential and logical thinking",
      "Preparation for biological sciences",
      "Understanding the concept of time and continuity in nature"
    ]
  },
  "plant-needs": {
    "direct": [
      "Identifying the essential elements needed for plant growth",
      "Understanding the roles of sunlight, water, air, and soil"
    ],
    "indirect": [
      "Development of responsibility through the practical care of plants",
      "Preparation for scientific experimentation and reasoning",
      "Awareness of living organisms' interdependence with their environment"
    ]
  },
  "tree-parts": {
    "direct": [
      "Identification and naming of the parts of a tree",
      "Understanding the basic function of the trunk, branches, roots, crown, and bark"
    ],
    "indirect": [
      "Preparation for further botanical studies",
      "Refinement of observation skills in the outdoor environment",
      "Fine motor coordination through puzzle or card work"
    ]
  },
  "root-types": {
    "direct": [
      "Classification and naming of different types of root systems",
      "Understanding how various roots anchor plants and absorb nutrients"
    ],
    "indirect": [
      "Development of keen observational skills in nature",
      "Preparation for advanced botany and scientific classification",
      "Expansion of precise scientific vocabulary"
    ]
  },
  "stem-types": {
    "direct": [
      "Identification and classification of various types of plant stems",
      "Understanding the supporting and transport functions of stems"
    ],
    "indirect": [
      "Refinement of classification skills and attention to detail",
      "Preparation for formal botany and biology",
      "Appreciation of diversity and adaptation in the plant kingdom"
    ]
  },
  "pink-tower": {
    "direct": [
      "Visual discrimination of dimension in three directions",
      "Refinement of voluntary movement"
    ],
    "indirect": [
      "Preparation for mathematics and the decimal system",
      "Preparation for the concept of volume",
      "Development of concentration and balance"
    ]
  },
  "brown-stair": {
    "direct": [
      "Visual discrimination of dimension in two directions",
      "Refinement of voluntary movement"
    ],
    "indirect": [
      "Preparation for mathematics and the decimal system",
      "Preparation for geometry and calculation of area",
      "Development of muscular memory of dimension"
    ]
  },
  "red-rods": {
    "direct": [
      "Visual discrimination of dimension in one direction",
      "Refinement of voluntary movement"
    ],
    "indirect": [
      "Preparation for mathematics and the number rods",
      "Development of muscular memory of length",
      "Coordination of gross motor movement"
    ]
  },
  "color-tablets": {
    "direct": [
      "Visual discrimination of color",
      "Development of the chromatic sense"
    ],
    "indirect": [
      "Appreciation of color and beauty in the environment",
      "Preparation for art and creative expression",
      "Development of vocabulary related to color and shades"
    ]
  },
  "sound-cylinders": {
    "direct": [
      "Refinement of the auditory sense",
      "Pairing and grading contrasting sound intensities"
    ],
    "indirect": [
      "Preparation for music and language",
      "Development of auditory memory and concentration",
      "Control and coordination of movement"
    ]
  },
  "fabric-box": {
    "direct": [
      "Tactile discrimination of different textures",
      "Refinement of the tactile sense"
    ],
    "indirect": [
      "Lightness of touch necessary for writing",
      "Heightened awareness of materials in the environment",
      "Development of tactile vocabulary"
    ]
  },
  "touch-boards": {
    "direct": [
      "Tactile discrimination between rough and smooth",
      "Refinement of the tactile sense"
    ],
    "indirect": [
      "Preparation of the hand for writing",
      "Lightness of touch and finger control",
      "Preparation for the sandpaper letters"
    ]
  },
  "knobbed-cylinders": {
    "direct": [
      "Visual discrimination of dimension",
      "Coordination of voluntary movement"
    ],
    "indirect": [
      "Preparation of the hand for writing through the three-finger pincer grasp",
      "Preparation for mathematics through seriation and base ten",
      "Development of visual memory"
    ]
  },
  "knobless-cylinders": {
    "direct": [
      "Visual discrimination of dimension without mechanical control of error",
      "Refinement of fine motor coordination"
    ],
    "indirect": [
      "Preparation for mathematics and dimensional relationships",
      "Development of spatial awareness",
      "Preparation of the mathematical mind"
    ]
  },
  "constructive-triangles": {
    "direct": [
      "Visual discrimination of form",
      "Discovery that all plane geometric figures can be constructed from triangles"
    ],
    "indirect": [
      "Preparation for plane geometry",
      "Understanding of equivalence and decomposition of figures",
      "Preparation of the mathematical mind"
    ]
  },
  "geometric-solids": {
    "direct": [
      "Refinement of the stereognostic sense",
      "Recognition of three-dimensional geometric figures by touch and sight"
    ],
    "indirect": [
      "Preparation for solid geometry and spatial reasoning",
      "Awareness of geometric forms in the environment",
      "Enrichment of mathematical vocabulary"
    ]
  },
  "geometric-cabinet": {
    "direct": [
      "Visual discrimination of plane geometric form",
      "Refinement of voluntary movement through tracing contours"
    ],
    "indirect": [
      "Preparation for reading through visual discrimination of abstract shapes",
      "Preparation for writing through pencil grasp and muscular movement",
      "Preparation for geometry and nomenclature of shapes"
    ]
  },
  "binomial-cube": {
    "direct": [
      "Visual discrimination of color and form in three dimensions",
      "Development of three-dimensional problem solving"
    ],
    "indirect": [
      "Preparation for algebra and the algebraic formula (a + b)³",
      "Preparation for mathematics and volume",
      "Development of spatial reasoning and concentration"
    ]
  },
  "trinomial-cube": {
    "direct": [
      "Visual discrimination of color and form in three dimensions",
      "Ability to solve a complex three-dimensional puzzle"
    ],
    "indirect": [
      "Preparation for algebra and the algebraic formula (a + b + c)³",
      "Preparation for advanced mathematics and solid geometry",
      "Refinement of logical thinking and perseverance"
    ]
  },
  "mystery-bag": {
    "direct": [
      "Development and refinement of the stereognostic sense",
      "Recognition of familiar objects by touch alone"
    ],
    "indirect": [
      "Development of mental representations and abstraction",
      "Enrichment of vocabulary",
      "Strengthening of tactile and muscular memory"
    ]
  },
  "leaf-venation": {
    "direct": [
      "Visual discrimination of leaf vein patterns",
      "Acquisition of botanical nomenclature for leaf venation"
    ],
    "indirect": [
      "Refinement of observation of the natural world",
      "Preparation for botanical classification",
      "Development of classification and order in thought"
    ]
  },
  "leaf-arrangement": {
    "direct": [
      "Visual discrimination of leaf arrangements on stems",
      "Acquisition of botanical nomenclature for leaf patterns"
    ],
    "indirect": [
      "Refinement of observation of nature",
      "Preparation for formal scientific study",
      "Development of analytical thinking"
    ]
  },
  "botany-cabinet": {
    "direct": [
      "Visual discrimination of leaf shapes",
      "Tactile exploration of leaf contours",
      "Acquisition of botanical nomenclature for leaf forms"
    ],
    "indirect": [
      "Preparation for writing through the tracing of contours",
      "Preparation for geometry and botany",
      "Refinement of fine motor coordination"
    ]
  },
  "plant-classification": {
    "direct": [
      "Classification of plants into major groups based on observable characteristics",
      "Acquisition of vocabulary for plant forms"
    ],
    "indirect": [
      "Organization of thought and classification skills",
      "Deepened appreciation for biodiversity",
      "Preparation for elementary biology"
    ]
  },
  "photosynthesis": {
    "direct": [
      "Basic understanding of how plants produce food using sunlight, water, and air",
      "Awareness of the function of leaves in plant nutrition"
    ],
    "indirect": [
      "Foundation for understanding ecological interconnectedness",
      "Preparation for cosmic education",
      "Development of reverence for the natural world"
    ]
  },
  "pollination": {
    "direct": [
      "Understanding the transfer of pollen and plant reproduction",
      "Familiarity with the methods of seed dispersal in nature"
    ],
    "indirect": [
      "Awareness of mutual dependence among living organisms",
      "Development of curiosity about life cycles",
      "Preparation for scientific inquiry"
    ]
  },
  "plant-habitats": {
    "direct": [
      "Understanding plant adaptations to different environmental conditions",
      "Association of particular plant characteristics with specific habitats"
    ],
    "indirect": [
      "Development of ecological consciousness",
      "Preparation for physical and cultural geography",
      "Strengthening of logical classification skills"
    ]
  },
  "composting": {
    "direct": [
      "Understanding the organic process of decomposition",
      "Familiarity with the transformation of plant waste into fertile soil"
    ],
    "indirect": [
      "Development of environmental stewardship and responsibility",
      "Practical experience with ecological cycles",
      "Appreciation for natural recycling"
    ]
  },
  "gardening-basics": {
    "direct": [
      "Acquisition of practical garden care techniques including planting, weeding, and watering",
      "Development of skills required to sustain living plants"
    ],
    "indirect": [
      "Coordination of gross and fine motor movement",
      "Development of patience, responsibility, and independence",
      "Connection to the origin of food"
    ]
  },
  "basic-drawing": {
    "direct": [
      "Exploration and controlled rendering of lines, shapes, and forms",
      "Proper handling and control of drawing implements"
    ],
    "indirect": [
      "Preparation for writing through pincer grasp and pencil control",
      "Development of hand-eye coordination",
      "Cultivation of creative self-expression"
    ]
  },
  "observational-drawing": {
    "direct": [
      "Accurate observation and graphical recording of real objects and natural specimens",
      "Representation of three-dimensional objects in two dimensions"
    ],
    "indirect": [
      "Refinement of visual perception and focus",
      "Development of patience and sustained concentration",
      "Preparation for scientific recording and illustration"
    ]
  },
  "primary-colors": {
    "direct": [
      "Visual identification and naming of the primary colors",
      "Discrimination of red, yellow, and blue hues"
    ],
    "indirect": [
      "Refinement of chromatic sense",
      "Preparation for color mixing and artistic composition",
      "Aesthetic appreciation"
    ]
  },
  "color-mixing": {
    "direct": [
      "Discovery of secondary and tertiary color creation",
      "Controlled manipulation of pigments to alter hues"
    ],
    "indirect": [
      "Understanding cause and effect relationships",
      "Refinement of fine motor control and delicacy of movement",
      "Development of aesthetic judgment"
    ]
  },
  "watercolor-basics": {
    "direct": [
      "Controlled handling of paintbrush, water container, and watercolor paint",
      "Understanding the interaction of pigment and water on paper"
    ],
    "indirect": [
      "Refinement of light motor touch and wrist flexibility",
      "Development of orderly work habits and sequential steps",
      "Cultivation of artistic sensibility"
    ]
  },
  "finger-painting": {
    "direct": [
      "Sensory exploration of paint texture, temperature, and viscosity",
      "Free exploration of hand and finger marks on paper"
    ],
    "indirect": [
      "Refinement of tactile discrimination",
      "Coordination of voluntary arm and hand movements",
      "Emotional release and creative confidence"
    ]
  },
  "thermic-tablets": {
    "direct": [
      "Refinement of the thermic sense",
      "Discrimination of differences in temperature through touch"
    ],
    "indirect": [
      "Heightened awareness of temperatures in the environment",
      "Preparation for physical sciences"
    ]
  },
  "baric-tablets": {
    "direct": [
      "Refinement of the baric sense",
      "Discrimination of differences in weight"
    ],
    "indirect": [
      "Delicacy of touch and fine motor control",
      "Concentration and poise"
    ]
  },
  "smelling-bottles": {
    "direct": [
      "Refinement of the olfactory sense",
      "Discrimination and matching of scents"
    ],
    "indirect": [
      "Development of olfactory memory",
      "Awareness and appreciation of scents in the environment"
    ]
  },
  "tasting-bottles": {
    "direct": [
      "Refinement of the gustatory sense",
      "Classification of the four basic tastes"
    ],
    "indirect": [
      "Enrichment of vocabulary related to taste",
      "Awareness of distinct flavors in nutrition"
    ]
  },
  "number-rods": {
    "direct": [
      "Sensorial experience of quantities 1 to 10 as fixed units",
      "Introduction to the spoken names of quantities 1 to 10"
    ],
    "indirect": [
      "Preparation for the decimal system",
      "Preparation for arithmetic operations"
    ]
  },
  "golden-beads": {
    "direct": [
      "Sensorial impression of the decimal system",
      "Introduction to the hierarchies of units, tens, hundreds, and thousands",
      "Understanding the function of the decimal system"
    ],
    "indirect": [
      "Preparation for the four operations",
      "Preparation for mental calculation"
    ]
  },
  "spindle-box": {
    "direct": [
      "Association of loose quantities with numerals 0 to 9",
      "Introduction to the concept of zero as an empty set"
    ],
    "indirect": [
      "Reinforcement of the sequence of numbers",
      "Understanding that zero represents nothing"
    ]
  },
  "cards-counters": {
    "direct": [
      "Reinforcement of quantities and numerals 1 to 10",
      "Introduction to the concept of odd and even numbers"
    ],
    "indirect": [
      "Visual impression of divisibility by two",
      "Preparation for advanced arithmetic"
    ]
  },
  "hundred-board": {
    "direct": [
      "Reinforcement of the sequence of numbers from 1 to 100",
      "Recognition of numerical patterns in tens and units"
    ],
    "indirect": [
      "Preparation for skip counting and multiplication",
      "Development of independent work habits"
    ]
  },
  "addition-strip-board": {
    "direct": [
      "Memorization of addition combinations",
      "Systematic practice of addition tables"
    ],
    "indirect": [
      "Preparation for mental arithmetic",
      "Understanding of the commutative property of addition"
    ]
  },
  "sandpaper-numbers": {
    "direct": [
      "Association of the numeral with its name",
      "Tactile and muscular impression of the shape of numerals 0 to 9"
    ],
    "indirect": [
      "Preparation for writing numerals",
      "Muscular memory for numeral formation"
    ]
  },
  "short-bead-stair": {
    "direct": [
      "Association of quantities 1 to 9 with distinct colors",
      "Sensorial experience of quantities 1 to 9 as individual units"
    ],
    "indirect": [
      "Preparation for the snake games",
      "Preparation for addition, subtraction, and multiplication"
    ]
  },
  "memory-game-numbers": {
    "direct": [
      "Association of numeral and quantity retained in memory",
      "Independent counting of quantities 0 to 10"
    ],
    "indirect": [
      "Development of working memory and concentration",
      "Independence and self-reliance in mathematical concepts"
    ]
  },
  "addition-snake-game": {
    "direct": [
      "Practice with number combinations that make ten",
      "Familiarization with basic addition combinations"
    ],
    "indirect": [
      "Preparation for the memorization of addition facts",
      "Preparation for mental arithmetic"
    ]
  },
  "subtraction-snake-game": {
    "direct": [
      "Practice with basic subtraction facts",
      "Concrete experience of subtraction as taking away"
    ],
    "indirect": [
      "Preparation for the memorization of subtraction tables",
      "Preparation for mental subtraction"
    ]
  },
  "personal-timeline": {
    "direct": [
      "Awareness of chronological sequence of one's own life",
      "Understanding the passage of personal time",
      "Language enrichment related to past and present"
    ],
    "indirect": [
      "Preparation for historical study",
      "Sense of personal identity and narrative",
      "Development of sequential thinking"
    ]
  },
  "clock-of-eras": {
    "direct": [
      "Visual impression of the major geologic eras of Earth",
      "Awareness of the vast scale of geological time compared to human history"
    ],
    "indirect": [
      "Foundation for cosmic education",
      "Cultivation of wonder and gratitude toward the natural world",
      "Preparation for elementary science and history"
    ]
  },
  "days-of-the-week": {
    "direct": [
      "Acquisition of the names of the seven days of the week",
      "Understanding the cyclical sequence of the weekly routine"
    ],
    "indirect": [
      "Orientation in time",
      "Preparation for reading and calendar work",
      "Development of sequential memory"
    ]
  },
  "seasons-cycle": {
    "direct": [
      "Identification and naming of the four seasons",
      "Understanding the cyclical nature of seasonal change",
      "Recognition of characteristics associated with each season"
    ],
    "indirect": [
      "Orientation in the annual cycle of time",
      "Preparation for geography and meteorology",
      "Appreciation of the natural world"
    ]
  },
  "bells-introduction": {
    "direct": [
      "Refinement of auditory perception of pitch",
      "Pairing of identical musical tones"
    ],
    "indirect": [
      "Preparation for singing and music appreciation",
      "Development of an ear for tonal differences",
      "Fine motor control and auditory memory"
    ]
  },
  "rhythm-patterns": {
    "direct": [
      "Reproduction of simple auditory rhythm patterns",
      "Discrimination of tempo and rhythmic intervals"
    ],
    "indirect": [
      "Preparation for music and dance",
      "Development of auditory memory and concentration",
      "Gross and fine motor coordination"
    ]
  },
  "songs-and-movement": {
    "direct": [
      "Learning traditional songs and finger plays",
      "Coordination of body movement with vocal expression"
    ],
    "indirect": [
      "Development of rhythm and musical sense",
      "Social cohesion and group participation",
      "Language development and vocabulary expansion"
    ]
  },
  "sink-or-float": {
    "direct": [
      "Experiential discrimination between objects that sink and float",
      "Classification of objects based on buoyancy"
    ],
    "indirect": [
      "Introduction to the scientific method of prediction and observation",
      "Preparation for physical science",
      "Refinement of voluntary movement and judgment"
    ]
  },
  "magnet-exploration": {
    "direct": [
      "Discovery of magnetic and non-magnetic materials",
      "Classification of objects based on magnetism"
    ],
    "indirect": [
      "Introduction to physical forces and scientific experimentation",
      "Development of concentration and independent exploration",
      "Preparation for physics"
    ]
  },
  "life-cycle-butterfly": {
    "direct": [
      "Knowledge of the sequential stages in the life cycle of a butterfly",
      "Acquisition of specific biological vocabulary"
    ],
    "indirect": [
      "Wonder and respect for living organisms",
      "Foundation for biological and natural sciences",
      "Understanding cyclical change and metamorphosis in nature"
    ]
  },
  "planet-object-picture-matching": {
    "direct": [
      "Matching three-dimensional models to two-dimensional representations",
      "Recognition and naming of the planets in the solar system"
    ],
    "indirect": [
      "Visual discrimination of form and detail",
      "Preparation for reading and cosmic education",
      "Development of astronomical awareness"
    ]
  },
  "orbiting-movement": {
    "direct": [
      "Kinesthetic experience of orbital motion around a central point",
      "Understanding that planets revolve around the Sun"
    ],
    "indirect": [
      "Equilibrium and gross motor coordination",
      "Preparation for astronomical concepts",
      "Spatial orientation and body awareness"
    ]
  },
  "solar-system-puzzle": {
    "direct": [
      "Assembly of the solar system puzzle using the control chart",
      "Sequential ordering of planets from the Sun"
    ],
    "indirect": [
      "Hand-eye coordination and fine motor control",
      "Visual discrimination of size, color, and position",
      "Preparation for cosmic education"
    ]
  },
  "planet-nomenclature-cards": {
    "direct": [
      "Enrichment of vocabulary related to the solar system",
      "Matching pictures, labels, and control cards"
    ],
    "indirect": [
      "Preparation for reading and classification",
      "Visual discrimination of written symbols",
      "Development of concentration and orderly work habits"
    ]
  },
  "land-water-forms": {
    "direct": [
      "Visual and tactile recognition of the major land and water forms",
      "Acquisition of geographical nomenclature for land and water formations"
    ],
    "indirect": [
      "Preparation for physical geography",
      "Refinement of fine motor control through pouring and sponge work",
      "Development of visual discrimination of form"
    ]
  },
  "continents": {
    "direct": [
      "Visual recognition and naming of the seven continents",
      "Understanding the relative position of the continents on the globe and world map"
    ],
    "indirect": [
      "Preparation for the individual continent puzzle maps",
      "Development of the three-finger pincer grasp for writing",
      "Fostering an appreciation for world geography"
    ]
  },
  "oceans": {
    "direct": [
      "Identification and naming of the five major oceans",
      "Recognition of the locations of major oceans on the globe and world map"
    ],
    "indirect": [
      "Understanding the continuity of the world's water bodies",
      "Preparation for advanced studies in physical geography",
      "Development of global spatial awareness"
    ]
  },
  "landforms": {
    "direct": [
      "Identification and naming of major physical landforms",
      "Understanding the variation in Earth's surface features"
    ],
    "indirect": [
      "Preparation for earth science and physical geography",
      "Development of visual discrimination of topographical forms",
      "Enrichment of descriptive vocabulary"
    ]
  },
  "water-bodies": {
    "direct": [
      "Recognition and naming of different bodies of water",
      "Understanding the characteristics and flow of various water formations"
    ],
    "indirect": [
      "Preparation for future ecological and environmental studies",
      "Refinement of classification skills",
      "Awareness of the role of water on Earth"
    ]
  },
  "climate-zones": {
    "direct": [
      "Introduction to the primary climate zones of the Earth",
      "Understanding the relationship between temperature and geographical location"
    ],
    "indirect": [
      "Preparation for botany, zoology, and human geography",
      "Development of classification and observation skills",
      "Foundation for Cosmic Education"
    ]
  },
  "countries-capitals": {
    "direct": [
      "Identification and naming of countries and their capital cities",
      "Visual discrimination of political boundaries on continental maps"
    ],
    "indirect": [
      "Preparation for political geography and world history",
      "Refinement of visual memory",
      "Development of the three-finger grasp through map knob manipulation"
    ]
  },
  "world-flags": {
    "direct": [
      "Recognition and naming of national flags",
      "Association of flags with their corresponding countries"
    ],
    "indirect": [
      "Awakening of interest in other cultures and nations",
      "Refinement of visual discrimination of color and design",
      "Preparation for the study of world history"
    ]
  },
  "compass-directions": {
    "direct": [
      "Introduction to the cardinal directions: North, South, East, and West",
      "Understanding how to orient oneself using a compass"
    ],
    "indirect": [
      "Preparation for map reading and cartography",
      "Development of spatial orientation within the environment",
      "Preparation for mathematical concepts of degrees and coordinates"
    ]
  },
  "map-reading": {
    "direct": [
      "Understanding map symbols, legends, and basic orientation",
      "Interpretation of a two-dimensional representation of physical space"
    ],
    "indirect": [
      "Preparation for abstract spatial thinking",
      "Development of navigation skills",
      "Encouragement of independent exploration"
    ]
  },
  "solar-system": {
    "direct": [
      "Introduction to the sun and the planets of the solar system",
      "Recognition of Earth's position relative to the sun and other planets"
    ],
    "indirect": [
      "Awakening a sense of wonder about the universe",
      "Preparation for future astronomical and scientific studies",
      "Foundation for Cosmic Education"
    ]
  },
  "day-night": {
    "direct": [
      "Understanding that Earth's rotation on its axis creates day and night",
      "Recognition of the continuous cycle of light and darkness"
    ],
    "indirect": [
      "Preparation for the concept of time and passage of hours",
      "Foundation for planetary science and astronomy",
      "Development of logical thinking and cause-and-effect reasoning"
    ]
  },
  "seasons": {
    "direct": [
      "Understanding how Earth's tilted axis and orbit create the four seasons",
      "Recognition of seasonal changes in weather, plants, and animal behavior"
    ],
    "indirect": [
      "Preparation for the concept of the yearly calendar",
      "Deepening connection to natural cycles in the environment",
      "Foundation for meteorological and botanical studies"
    ]
  },
  "sandpaper-globe": {
    "direct": [
      "Tactile distinction between land and water",
      "Introduction to the spherical shape of the Earth"
    ],
    "indirect": [
      "Preparation for the colored globe and puzzle maps",
      "Refinement of the tactile sense",
      "Sensorial foundation for physical geography"
    ]
  },
  "colored-globe": {
    "direct": [
      "Visual identification of the continents by color",
      "Understanding that the land surfaces of the Earth are divided into continents"
    ],
    "indirect": [
      "Preparation for the puzzle map of the world",
      "Internalization of the Montessori color-coding system for continents",
      "Development of global spatial awareness"
    ]
  },
  "initial-sound-sorting": {
    "direct": [
      "Auditory isolation of initial sounds in words",
      "Classification of objects by beginning phonetic sound"
    ],
    "indirect": [
      "Preparation for the Sandpaper Letters",
      "Preparation for writing and reading",
      "Development of concentration"
    ]
  },
  "syllable-clapping": {
    "direct": [
      "Auditory discrimination of rhythmic beats in words",
      "Identification of syllable units in spoken language"
    ],
    "indirect": [
      "Refinement of auditory perception",
      "Preparation for total reading and spelling",
      "Coordination of movement"
    ]
  },
  "chalkboard-writing": {
    "direct": [
      "Correct formation of letters on a vertical or flat surface",
      "Development of muscular control through large arm movements"
    ],
    "indirect": [
      "Preparation for writing with pencil on paper",
      "Visual and muscular memory of letter forms",
      "Refinement of the pincer grip"
    ]
  },
  "creative-writing": {
    "direct": [
      "Expression of personal thoughts and ideas in written form",
      "Application of phonetic knowledge to word and sentence construction"
    ],
    "indirect": [
      "Preparation for reading one's own thoughts",
      "Development of logical thinking and communication",
      "Fostering of self-expression and confidence"
    ]
  },
  "command-cards": {
    "direct": [
      "Reading comprehension of imperative phrases",
      "Execution of movements corresponding to written text"
    ],
    "indirect": [
      "Internalization of the function of verbs",
      "Total reading",
      "Development of self-discipline and purposeful movement"
    ]
  },
  "reading-classification": {
    "direct": [
      "Reading and comprehension of classified vocabulary labels",
      "Categorization of related words into scientific or cultural groups"
    ],
    "indirect": [
      "Enrichment of reading vocabulary",
      "Development of logical classification skills",
      "Expansion of general cultural knowledge"
    ]
  },
  "noun-classification": {
    "direct": [
      "Identification and sorting of nouns into categories",
      "Association of the black triangle symbol with the naming of things"
    ],
    "indirect": [
      "Awareness of grammatical structure in language",
      "Preparation for sentence analysis",
      "Refinement of logical categorization"
    ]
  },
  "verb-conjugation": {
    "direct": [
      "Understanding of the verb as the word of action",
      "Awareness of changes in verb forms across time and person"
    ],
    "indirect": [
      "Deepened comprehension of sentence structure",
      "Preparation for formal grammatical study",
      "Enrichment of spoken and written expression"
    ]
  },
  "pink-object-box": {
    "direct": [
      "Decoding three-letter phonetic words",
      "Matching printed words to real three-dimensional objects"
    ],
    "indirect": [
      "Experience of total reading",
      "Confidence in independent decoding",
      "Left-to-right visual tracking"
    ]
  },
  "pink-picture-cards": {
    "direct": [
      "Reading three-letter phonetic words",
      "Matching phonetic word cards to two-dimensional pictures"
    ],
    "indirect": [
      "Transition from concrete objects to abstract representations",
      "Consolidation of mechanical reading",
      "Independence in reading practice"
    ]
  },
  "pink-word-lists": {
    "direct": [
      "Reading lists of three-letter phonetic words without pictorial clues",
      "Development of phonetic reading fluency"
    ],
    "indirect": [
      "Internal visualization of decoded words",
      "Development of sustained concentration",
      "Preparation for reading connected text"
    ]
  },
  "pink-phrases": {
    "direct": [
      "Reading short phrases composed of phonetic words",
      "Comprehension of phrase meaning through object or picture matching"
    ],
    "indirect": [
      "Bridge between single-word reading and sentence reading",
      "Development of phrasing and natural inflection",
      "Understanding the relationship between words"
    ]
  },
  "pink-sentences": {
    "direct": [
      "Reading complete phonetic sentences",
      "Demonstration of sentence comprehension through action or matching"
    ],
    "indirect": [
      "Understanding of basic sentence structure and punctuation",
      "Experience of total reading at the sentence level",
      "Preparation for reading books"
    ]
  },
  "pink-booklets": {
    "direct": [
      "Reading a complete narrative composed of phonetic words",
      "Decoding continuous text across multiple pages"
    ],
    "indirect": [
      "Joy of independent book reading",
      "Care and handling of books",
      "Preparation for non-phonetic literature"
    ]
  },
  "function-of-words": {
    "direct": [
      "Sensory impression of how individual words function within phrases and sentences",
      "Introduction to grammar symbols through physical manipulation of language"
    ],
    "indirect": [
      "Preparation for sentence analysis",
      "Deepened reading comprehension",
      "Refinement of written composition"
    ]
  }
};

export function aimsFor(skillId: string, skill?: { directAims?: string[]; indirectAims?: string[] }): ActivityAims {
  const fallback = activityAims[skillId];
  return {
    direct: skill?.directAims?.length ? skill.directAims : fallback?.direct ?? [],
    indirect: skill?.indirectAims?.length ? skill.indirectAims : fallback?.indirect ?? [],
  };
}
