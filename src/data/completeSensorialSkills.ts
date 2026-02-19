// Complete AMI Sensorial Skills - Missing materials
import { MontessoriLearningProcess } from '@/types/montessoriSkill';

export interface SensorialSkill {
  id: string;
  title: string;
  icon: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  description: string;
  ageRange: string;
  materials: string[];
  purpose: string;
  color?: string;
  learningProcess: MontessoriLearningProcess;
}

export const completeSensorialSkills: Record<string, SensorialSkill> = {
  'knobbed-cylinders': {
    id: 'knobbed-cylinders',
    title: 'Knobbed Cylinders',
    icon: '🪵',
    category: 'Visual Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Fit cylinders into matching sockets, developing visual discrimination of dimension.',
    ageRange: '2.5-3.5 years',
    materials: ['4 wooden blocks with 10 cylinders each', 'Work mat'],
    purpose: 'Develops visual discrimination of height, diameter, or both; prepares the hand for writing through the three-finger grip on the knob',
    color: 'natural',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Demonstrate removing and replacing cylinders one block at a time',
        invitation: 'Would you like to work with the Knobbed Cylinders?',
        duration: '8-12 minutes',
        steps: [
          'Invite the child to the Knobbed Cylinders shelf',
          'Carry Block 1 (varying diameter only) to the table with both hands',
          'Place the block horizontally in front of the child',
          'Using the three-finger grip (thumb, index, middle), grasp the knob of the first cylinder on the right',
          'Lift the cylinder straight up and place it on the table in front of the block, in order',
          'Continue removing each cylinder from right to left, placing them in a row',
          'Pause and look at the empty sockets',
          'Pick up a cylinder, examine it, and find the matching socket by visual comparison',
          'Lower the cylinder into the socket gently — it should fit exactly',
          'Continue until all cylinders are replaced',
          'Return the block to the shelf'
        ],
        keyPoints: [
          'Always use the three-finger pincer grip on the knob',
          'Remove cylinders in order; replace by visual matching',
          'The cylinder must drop smoothly into the correct socket',
          'Work with one block at a time initially'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child works with one block independently',
        steps: [
          'Child carries the block to the table',
          'Child removes cylinders using three-finger grip',
          'Child replaces cylinders by visual matching',
          'Observe without interrupting unless child requests help'
        ],
        supportStrategies: [
          'If child uses wrong grip, gently model the pincer grip',
          'If cylinder doesn\'t fit, say "Try another socket"',
          'Allow self-correction — the control of error is built in'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child works with increasing complexity',
        indicators: [
          'Chooses the work independently',
          'Uses correct three-finger grip consistently',
          'Replaces all cylinders without error',
          'Begins combining two blocks simultaneously'
        ],
        troubleshooting: [
          'If mixing up cylinders: return to single block',
          'If losing interest: introduce a new block',
          'If rushing: model slow, deliberate movements'
        ],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child demonstrates complete control',
        assessmentCriteria: [
          'Replaces all cylinders accurately on first attempt',
          'Uses correct grip throughout',
          'Works with calm concentration',
          'Can combine two or more blocks simultaneously'
        ],
        indicators: [
          'Chooses to combine all four blocks',
          'Works with a blindfold for tactile challenge',
          'Demonstrates the activity to younger children'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced variations for continued growth',
        activities: [
          'Combining two blocks at once',
          'Combining three or four blocks simultaneously',
          'Working with a blindfold (stereognostic)',
          'Distance game: place cylinders across the room'
        ],
        variations: [
          'Grade cylinders outside the block in a line',
          'Mix cylinders from multiple blocks and sort',
          'Name dimensions: thick/thin, tall/short'
        ]
      }
    }
  },

  'knobless-cylinders': {
    id: 'knobless-cylinders',
    title: 'Knobless Cylinders',
    icon: '🔴',
    category: 'Visual Discrimination',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Grade colored cylinders by dimension without the guiding sockets.',
    ageRange: '3.5-5 years',
    materials: ['4 boxes of 10 colored cylinders (red, yellow, green, blue)', 'Work mat'],
    purpose: 'Refines visual discrimination of dimension; extends Knobbed Cylinder work without built-in control of error',
    color: 'multi',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Demonstrate grading one set of knobless cylinders',
        invitation: 'Would you like to work with the Knobless Cylinders?',
        duration: '10-12 minutes',
        steps: [
          'Invite the child to the Knobless Cylinders shelf',
          'Carry one box (e.g., red — varying diameter, same height) to the mat',
          'Remove the lid and place it aside',
          'Tip the cylinders gently onto the mat',
          'Select the largest cylinder and place it at the left of the mat',
          'Visually scan the remaining cylinders and select the next largest',
          'Place it directly next to the first, touching edges',
          'Continue grading from largest to smallest, left to right',
          'Run your finger along the tops to verify the gradation',
          'Return cylinders to the box and replace on shelf'
        ],
        keyPoints: [
          'No sockets — child must grade visually without built-in control',
          'Work with one box at a time initially',
          'Run finger along the gradient to verify accuracy',
          'Cylinders should touch edge-to-edge'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child grades one set independently',
        steps: [
          'Child selects one box and carries it to the mat',
          'Child grades the cylinders from largest to smallest',
          'Child verifies by running a finger along the gradient',
          'Observe silently; intervene only if child is frustrated'
        ],
        supportStrategies: [
          'If child struggles: isolate 5 cylinders instead of 10',
          'Model the finger-verification technique',
          'Encourage comparison of two cylinders side by side'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child explores combinations of sets',
        indicators: [
          'Grades one set accurately and independently',
          'Begins combining two sets',
          'Creates patterns and designs with cylinders',
          'Self-corrects by visual verification'
        ],
        troubleshooting: [
          'If inaccurate: return to single set',
          'If bored: introduce a second color set',
          'Encourage building towers and structures'
        ],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child demonstrates refined visual discrimination',
        assessmentCriteria: [
          'Grades each set accurately without hesitation',
          'Combines two or more sets in creative patterns',
          'Uses precise language (thicker, thinner, taller, shorter)',
          'Works with sustained concentration'
        ],
        indicators: [
          'Creates complex designs combining all four sets',
          'Connects work to Knobbed Cylinders conceptually',
          'Teaches younger children the activity'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Creative and complex variations',
        activities: [
          'Combine two sets to build patterns',
          'Combine all four sets for complex structures',
          'Build towers and architectural designs',
          'Create repeating patterns (AB, ABC)'
        ],
        variations: [
          'Grade in reverse order (smallest to largest)',
          'Build concentric circles',
          'Match to Knobbed Cylinder blocks'
        ]
      }
    }
  },

  'constructive-triangles': {
    id: 'constructive-triangles',
    title: 'Constructive Triangles',
    icon: '🔺',
    category: 'Visual Discrimination',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Construct geometric shapes from triangles, discovering that all plane figures can be made from triangles.',
    ageRange: '3.5-5 years',
    materials: ['Rectangular box with colored triangles', 'Work mat'],
    purpose: 'Develops visual discrimination of form; demonstrates that triangles are the constructive basis of all plane geometric figures',
    color: 'multi',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Demonstrate constructing shapes from triangles using the first rectangular box',
        invitation: 'Would you like to work with the Constructive Triangles?',
        duration: '12-15 minutes',
        steps: [
          'Invite the child to the Constructive Triangles shelf',
          'Carry the first rectangular box to the work mat',
          'Remove all triangles and spread them on the mat',
          'Select two right-angled triangles with matching black lines',
          'Place one triangle on the mat',
          'Align the second triangle so the black lines meet edge to edge',
          'Show how the two triangles form a rectangle',
          'Trace the outline of the completed shape with your finger',
          'Separate and reconstruct to reinforce the concept',
          'Continue with other pairs to form squares, parallelograms, and other shapes'
        ],
        keyPoints: [
          'Black lines guide matching — they always meet along edges',
          'Move slowly when aligning triangles',
          'Name the resulting shapes after construction',
          'Each pair of triangles creates a specific quadrilateral'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child constructs shapes using the black-line guides',
        steps: [
          'Child selects triangles and matches black lines',
          'Child constructs shapes independently',
          'Name the shapes together: rectangle, square, parallelogram',
          'Encourage child to trace the outline of each completed shape'
        ],
        supportStrategies: [
          'Point to the black lines if child is unsure where to match',
          'Start with only two pairs of triangles',
          'Use language: "Find the triangle with the matching line"'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child works through all triangle combinations',
        indicators: [
          'Matches all triangle pairs correctly',
          'Names resulting shapes',
          'Explores creating shapes without black-line guidance',
          'Discovers that different triangle pairs make different shapes'
        ],
        troubleshooting: [
          'If struggling with matching: isolate fewer pairs',
          'If not naming shapes: conduct three-period lesson',
          'Ensure black lines are visible and aligned'
        ],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child understands triangles as constructive elements',
        assessmentCriteria: [
          'Constructs all shapes from the rectangular box accurately',
          'Names all resulting geometric shapes',
          'Can construct shapes without relying on black lines',
          'Articulates that "two triangles make a rectangle"'
        ],
        indicators: [
          'Moves to the triangular and hexagonal boxes',
          'Creates shapes spontaneously in other activities',
          'Shows interest in geometry and spatial relationships'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced boxes and creative exploration',
        activities: [
          'Work with the triangular box',
          'Work with the large hexagonal box',
          'Work with the small hexagonal box',
          'Create artistic designs with all boxes combined'
        ],
        variations: [
          'Trace shapes on paper',
          'Find triangles in the environment',
          'Build shapes without black-line guidance'
        ]
      }
    }
  },

  'geometric-solids': {
    id: 'geometric-solids',
    title: 'Geometric Solids',
    icon: '🔷',
    category: 'Stereognostic',
    difficulty: 'Intermediate',
    isPremium: false,
    description: 'Explore three-dimensional geometric forms through touch and sight.',
    ageRange: '3-5 years',
    materials: ['Set of 10 geometric solids (sphere, cube, cylinder, cone, ovoid, ellipsoid, rectangular prism, triangular prism, square pyramid, triangular pyramid)', 'Basket', 'Blindfold', 'Work mat'],
    purpose: 'Develops stereognostic sense (recognizing forms by touch); introduces geometric vocabulary and three-dimensional awareness',
    color: 'blue',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Introduce geometric solids through tactile and visual exploration',
        invitation: 'Would you like to work with the Geometric Solids?',
        duration: '10-15 minutes',
        steps: [
          'Invite the child to the Geometric Solids shelf',
          'Carry the basket of solids to a table or mat',
          'Remove three contrasting solids: sphere, cube, and cylinder',
          'Pick up the sphere and turn it slowly in both hands, feeling the entire surface',
          'Say "Sphere" while holding it',
          'Roll it gently to show it rolls in all directions',
          'Pick up the cube and feel all six flat faces, edges, and vertices',
          'Say "Cube" while exploring it',
          'Place it down to show it stands on any face',
          'Pick up the cylinder and feel the curved surface and two flat faces',
          'Say "Cylinder" — show it can roll and stand',
          'Conduct a three-period lesson with these three solids'
        ],
        keyPoints: [
          'Introduce only three contrasting solids at first',
          'Emphasize tactile exploration with both hands',
          'Use precise geometric vocabulary',
          'Show what each solid can do: roll, stand, slide'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child explores and names solids with support',
        steps: [
          'Child handles each solid and describes what they feel',
          'Practice naming with three-period lesson',
          'Sort solids by properties: those that roll vs. those that don\'t',
          'Match solids to real-world objects in the classroom'
        ],
        supportStrategies: [
          'If overwhelmed: work with only two solids at a time',
          'Use "Show me the..." before "What is this?"',
          'Connect to real life: "A ball is like a sphere"'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child works with all solids and extensions',
        indicators: [
          'Names all introduced solids correctly',
          'Sorts solids by various properties',
          'Matches solids to base shapes',
          'Uses blindfold for stereognostic identification'
        ],
        troubleshooting: [
          'If confusing names: reduce to three solids and re-teach',
          'If rushing: encourage slow tactile exploration',
          'Model deliberate, careful handling'
        ],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child identifies and classifies all solids',
        assessmentCriteria: [
          'Names all 10 geometric solids',
          'Identifies solids by touch alone (blindfolded)',
          'Describes properties: faces, edges, curved surfaces',
          'Matches solids to their plane figure bases'
        ],
        indicators: [
          'Finds geometric solids in the environment',
          'Uses vocabulary spontaneously',
          'Creates constructions with the solids'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Connecting solids to the real world and geometry',
        activities: [
          'Blindfold identification (mystery bag style)',
          'Match solids to corresponding base plane figures',
          'Find solid shapes in the classroom environment',
          'Trace bases to discover plane figure connections'
        ],
        variations: [
          'Sort by number of faces',
          'Sort into curved vs. flat surfaces',
          'Print solid footprints by dipping bases in paint'
        ]
      }
    }
  },

  'geometric-cabinet': {
    id: 'geometric-cabinet',
    title: 'Geometric Cabinet',
    icon: '📐',
    category: 'Visual Discrimination',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Match and name plane geometric figures using insets in a wooden cabinet.',
    ageRange: '3-5 years',
    materials: ['Geometric cabinet with 6 drawers', 'Card material (3 sets)', 'Work mat'],
    purpose: 'Develops visual discrimination of form; introduces nomenclature of plane geometric figures; prepares for geometry',
    color: 'yellow',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Introduce the presentation tray with three contrasting shapes',
        invitation: 'Would you like to work with the Geometric Cabinet?',
        duration: '10-12 minutes',
        steps: [
          'Invite the child to the Geometric Cabinet',
          'Remove the presentation tray (circle, square, triangle)',
          'Carry the tray to a table',
          'Remove the circle inset by its knob and place it on the table',
          'Trace the edge of the frame with two fingers (index and middle) — left hand clockwise',
          'Trace the edge of the inset the same way',
          'Replace the inset into the frame, aligning carefully',
          'Repeat with the square: trace frame, trace inset, replace',
          'Repeat with the triangle: trace frame, trace inset, replace',
          'Name each shape using a three-period lesson'
        ],
        keyPoints: [
          'Always trace the frame first, then the inset',
          'Use two-finger tracing (index and middle together)',
          'Trace slowly and deliberately along the entire edge',
          'Replace inset carefully, feeling it click into place'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child traces and replaces shapes from the presentation tray',
        steps: [
          'Child removes each inset by the knob',
          'Child traces the frame with two fingers',
          'Child traces the inset edge with two fingers',
          'Child replaces the inset into the correct frame'
        ],
        supportStrategies: [
          'Guide fingers if tracing is inaccurate',
          'Ensure child uses two fingers together',
          'Start with the presentation tray only (3 shapes)'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child works through all six drawers progressively',
        indicators: [
          'Traces all presentation tray shapes independently',
          'Moves to drawer 1 (6 circles of different sizes)',
          'Names shapes with increasing vocabulary',
          'Begins matching shapes to card material'
        ],
        troubleshooting: [
          'If skipping tracing: gently model the importance',
          'If placing insets incorrectly: remove and try again',
          'Introduce one new drawer at a time'
        ],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child works with all drawers and card material',
        assessmentCriteria: [
          'Traces and replaces all shapes from all 6 drawers',
          'Names major geometric figures',
          'Matches insets to all three sets of card material',
          'Can identify geometric shapes in the environment'
        ],
        indicators: [
          'Works through an entire drawer with concentration',
          'Uses geometric vocabulary spontaneously',
          'Shows interest in drawing geometric shapes'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Card material and real-world connections',
        activities: [
          'Match insets to Card Set 1 (solid blue shape)',
          'Match insets to Card Set 2 (thick outline)',
          'Match insets to Card Set 3 (thin outline)',
          'Trace insets on paper with colored pencils'
        ],
        variations: [
          'Find shapes in the classroom environment',
          'Create geometric art by tracing multiple shapes',
          'Sort shapes by number of sides'
        ]
      }
    }
  },

  'binomial-cube': {
    id: 'binomial-cube',
    title: 'Binomial Cube',
    icon: '🧊',
    category: 'Visual Discrimination',
    difficulty: 'Advanced',
    isPremium: false,
    description: 'Reconstruct a three-dimensional puzzle representing the binomial formula (a+b)³.',
    ageRange: '3.5-5 years',
    materials: ['Binomial Cube box with painted lid pattern', 'Work mat'],
    purpose: 'Develops visual discrimination of color and form; indirect preparation for algebra; builds spatial reasoning and logical thinking',
    color: 'multi',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Demonstrate assembling the Binomial Cube using the lid pattern as guide',
        invitation: 'Would you like to work with the Binomial Cube?',
        duration: '10-15 minutes',
        steps: [
          'Invite the child to the Binomial Cube shelf',
          'Carry the box to the table',
          'Open the box and lay the lid flat with the painted pattern visible',
          'Remove each layer of blocks carefully, keeping them in order',
          'Point to the lid pattern — this is the guide for the bottom layer',
          'Select the large red cube and place it in the corner matching the pattern',
          'Place the matching red and black rectangular prisms around it',
          'Complete the first layer following the color pattern on the lid',
          'Build the second layer on top, matching colors above and below',
          'When complete, carefully slide the assembled cube back into the box',
          'Close the lid'
        ],
        keyPoints: [
          'The lid pattern guides the bottom layer arrangement',
          'Colors on touching faces must always match',
          'Build layer by layer, not randomly',
          'At this age, it is a sensorial puzzle — not an algebra lesson'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child assembles the cube using the lid pattern',
        steps: [
          'Child opens the box and removes the blocks',
          'Child references the lid pattern for placement',
          'Child builds the bottom layer matching the pattern',
          'Child stacks the second layer, matching colors on touching faces'
        ],
        supportStrategies: [
          'Point to the lid pattern if child is stuck',
          'Remind: "The colors that touch must be the same"',
          'If overwhelmed: build the first layer together'
        ],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child reconstructs the cube independently',
        indicators: [
          'Assembles the cube without adult guidance',
          'Uses the lid pattern only for verification',
          'Works with concentration and precision',
          'Returns materials properly'
        ],
        troubleshooting: [
          'If frustrated: simplify to one layer at a time',
          'If blocks won\'t fit: check color matching on all faces',
          'Encourage trial and error — it\'s a puzzle'
        ],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child assembles the cube with ease',
        assessmentCriteria: [
          'Assembles the complete cube without referring to the lid',
          'Works smoothly and efficiently',
          'Can articulate the color-matching rule',
          'Handles the blocks with care and precision'
        ],
        indicators: [
          'Builds the cube quickly and confidently',
          'Seeks out the Trinomial Cube as next challenge',
          'Shows interest in other spatial puzzles'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced challenges beyond the basic assembly',
        activities: [
          'Assemble without the lid pattern',
          'Build outside the box on the mat',
          'Progress to the Trinomial Cube',
          'In elementary: connect to algebraic formula (a+b)³'
        ],
        variations: [
          'Time yourself building the cube',
          'Build with eyes closed for stereognostic challenge',
          'Discover the pattern of layers'
        ]
      }
    }
  },

  'trinomial-cube': {
    id: 'trinomial-cube',
    title: 'Trinomial Cube',
    icon: '🟦',
    category: 'Visual Discrimination',
    difficulty: 'Advanced',
    isPremium: true,
    description: 'Reconstruct a complex three-dimensional puzzle representing (a+b+c)³.',
    ageRange: '4-6 years',
    materials: ['Trinomial Cube box with painted lid pattern', 'Work mat'],
    purpose: 'Refines visual discrimination of color and form; indirect preparation for advanced algebra; develops persistence and problem-solving',
    color: 'multi',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Demonstrate assembling the Trinomial Cube layer by layer',
        invitation: 'Would you like to work with the Trinomial Cube?',
        duration: '15-20 minutes',
        steps: [
          'Invite the child to the Trinomial Cube (prerequisite: Binomial Cube mastery)',
          'Carry the box to the table and open it',
          'Lay the lid flat with the painted pattern visible',
          'Remove blocks layer by layer, keeping layers grouped',
          'Begin with the bottom layer, using the lid as a guide',
          'Place the large red cube in its corner position',
          'Add the matching prisms around it following the color pattern',
          'Continue placing the blue cube and yellow cube sections',
          'Complete the first layer, then build the second and third layers',
          'Match colors on all touching faces — this is the guiding principle',
          'Slide the completed cube into the box and close'
        ],
        keyPoints: [
          'Child must have mastered the Binomial Cube first',
          'Three layers instead of two — more complex',
          'Same principle: touching faces must match in color',
          'Patience is essential — this is a challenging puzzle'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child works through each layer with support',
        steps: [
          'Child removes blocks and groups by layer',
          'Child builds bottom layer using lid pattern',
          'Child attempts second and third layers with color matching',
          'Offer minimal guidance — allow productive struggle'
        ],
        supportStrategies: [
          'If stuck: point to the lid pattern',
          'Remind of the color-matching rule',
          'Build one layer together, let child do the next independently'
        ],
        duration: '20-30 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child completes the Trinomial Cube independently',
        indicators: [
          'Assembles all three layers correctly',
          'Uses lid pattern only for final verification',
          'Works with sustained concentration',
          'Shows satisfaction upon completion'
        ],
        troubleshooting: [
          'If losing patience: work on one layer per session',
          'If blocks misaligned: review color-matching principle',
          'Ensure Binomial Cube mastery before continuing'
        ],
        duration: '20-35 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child assembles the cube fluently',
        assessmentCriteria: [
          'Builds the complete cube without the lid pattern',
          'Works efficiently with minimal hesitation',
          'Handles all 27 blocks with care',
          'Can describe the color-matching principle'
        ],
        indicators: [
          'Builds outside the box on a mat',
          'Completes the work in under 10 minutes',
          'In elementary: connects to (a+b+c)³'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced work and algebraic connections',
        activities: [
          'Build entirely outside the box',
          'Assemble without the lid pattern',
          'In elementary: label each block with algebraic notation',
          'Compare structure to Binomial Cube'
        ],
        variations: [
          'Disassemble one layer at a time and rebuild',
          'Build from top layer down',
          'Explore the mathematical relationships between pieces'
        ]
      }
    }
  },

  'mystery-bag': {
    id: 'mystery-bag',
    title: 'Mystery Bag',
    icon: '👜',
    category: 'Stereognostic',
    difficulty: 'Intermediate',
    isPremium: false,
    description: 'Identify objects by touch alone, developing the stereognostic sense.',
    ageRange: '3-5 years',
    materials: ['Cloth bag (opaque)', '6-8 familiar objects of contrasting shapes', 'Work mat'],
    purpose: 'Develops the stereognostic sense — the ability to identify objects by touch alone using muscular and tactile memory',
    color: 'beige',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Demonstrate identifying objects by touch inside the bag',
        invitation: 'Would you like to work with the Mystery Bag?',
        duration: '8-12 minutes',
        steps: [
          'Invite the child to the Mystery Bag activity',
          'Place the bag with objects on the mat',
          'Show the child each object, naming it, then place all objects in the bag',
          'Put one hand inside the bag without looking',
          'Feel one object carefully — run fingers over all surfaces',
          'Say "I think this is the... key" (name the object)',
          'Remove the object to verify',
          'Place the identified object on the mat',
          'Continue until all objects have been identified',
          'Return objects to the bag'
        ],
        keyPoints: [
          'Never look inside the bag',
          'Feel the entire object before guessing',
          'Start with 3-4 very different objects',
          'Name the object before removing it from the bag'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child identifies objects by touch',
        steps: [
          'Child places hand in the bag',
          'Child feels one object thoroughly',
          'Child names the object before removing',
          'Child verifies by looking at the object'
        ],
        supportStrategies: [
          'Start with only 3 contrasting objects',
          'Ask "What does it feel like? Is it smooth or rough?"',
          'If incorrect, say "Feel it again" rather than correcting'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child works with increasing difficulty',
        indicators: [
          'Identifies familiar objects consistently',
          'Works with more objects (6-8)',
          'Begins using more similar objects',
          'Plays the game with a friend'
        ],
        troubleshooting: [
          'If guessing without feeling: encourage slower exploration',
          'If frustrated: reduce number of objects',
          'If too easy: use similar-shaped objects'
        ],
        duration: '10-15 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child has strong stereognostic skills',
        assessmentCriteria: [
          'Identifies 8+ objects by touch alone',
          'Describes objects by tactile properties',
          'Works with similar-shaped objects successfully',
          'Uses appropriate vocabulary: smooth, rough, curved, pointed'
        ],
        indicators: [
          'Creates own Mystery Bag collections',
          'Identifies Geometric Solids by touch',
          'Transfers skill to other blindfold activities'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced stereognostic challenges',
        activities: [
          'Use Geometric Solids in the bag',
          'Match pairs of objects by touch (two bags)',
          'Include objects from nature: shells, stones, seeds',
          'Sort objects by property inside the bag (round vs. angular)'
        ],
        variations: [
          'Use fabrics of different textures',
          'Include classroom objects for practical connection',
          'Partner game: one describes, other guesses'
        ]
      }
    }
  },

  'thermic-tablets': {
    id: 'thermic-tablets',
    title: 'Thermic Tablets',
    icon: '🌡️',
    category: 'Thermic',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Discriminate between materials that conduct heat differently by touch.',
    ageRange: '3.5-5 years',
    materials: ['Thermic tablets: pairs of wood, felt, marble, metal, cork, glass', 'Blindfold', 'Work mat'],
    purpose: 'Develops thermic sense — the ability to distinguish temperature differences caused by thermal conductivity of materials',
    color: 'gray',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Introduce contrasting thermic tablets (wood and metal)',
        invitation: 'Would you like to work with the Thermic Tablets?',
        duration: '8-10 minutes',
        steps: [
          'Invite the child to the Thermic Tablets',
          'Place two contrasting tablets on the mat: wood and metal',
          'Press the inside of your wrist gently against the wood tablet',
          'Pause and say "This feels warm"',
          'Press the inside of your wrist against the metal tablet',
          'Pause and say "This feels cool"',
          'Invite the child to feel each tablet on their wrist',
          'Introduce a third material (marble) and compare',
          'Match pairs of the same material',
          'Conduct a three-period lesson with warm/cool vocabulary'
        ],
        keyPoints: [
          'Use the inner wrist — it is most sensitive to temperature',
          'Start with only two contrasting materials',
          'The temperature difference is due to conductivity, not actual temperature',
          'Work in silence to focus on the sensation'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child compares and matches thermic tablets',
        steps: [
          'Child presses wrist against each tablet',
          'Child sorts tablets from warmest to coolest feeling',
          'Child matches pairs of the same material',
          'Use blindfold for increased challenge'
        ],
        supportStrategies: [
          'If child can\'t feel difference: press wrist more firmly',
          'Start with the most contrasting pair (metal vs. felt)',
          'Allow sufficient time — thermic differences are subtle'
        ],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child grades and matches all tablets',
        indicators: [
          'Matches all pairs by thermic property',
          'Grades tablets from warmest to coolest',
          'Works with blindfold independently',
          'Uses vocabulary: warm, cool, cold'
        ],
        troubleshooting: [
          'If struggling: reduce to 3 pairs',
          'If tablets feel the same: ensure hands are at room temperature',
          'Allow child to rest between comparisons'
        ],
        duration: '10-15 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child discriminates thermic properties accurately',
        assessmentCriteria: [
          'Matches all pairs blindfolded',
          'Grades all tablets from warm to cool',
          'Names the materials and their thermic quality',
          'Understands why metal feels cooler than wood'
        ],
        indicators: [
          'Notices thermic properties of objects in daily life',
          'Compares surfaces around the classroom',
          'Uses thermic vocabulary spontaneously'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Real-world thermic exploration',
        activities: [
          'Feel and compare surfaces in the classroom',
          'Touch objects outdoors in sun and shade',
          'Explore hot and cold water (supervised)',
          'Discuss why metal door handles feel cold in winter'
        ],
        variations: [
          'Compare the same material in sun vs. shade',
          'Use a thermometer to verify predictions',
          'Group classroom objects by thermic quality'
        ]
      }
    }
  },

  'baric-tablets': {
    id: 'baric-tablets',
    title: 'Baric Tablets',
    icon: '⚖️',
    category: 'Baric',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Discriminate between tablets of different weights using the baric sense.',
    ageRange: '3.5-5 years',
    materials: ['Three sets of wooden tablets: light (basswood), medium (walnut), heavy (mahogany)', 'Blindfold', 'Work mat'],
    purpose: 'Develops the baric sense — discrimination of weight differences through careful handling and comparison',
    color: 'brown',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Introduce contrasting weight tablets',
        invitation: 'Would you like to work with the Baric Tablets?',
        duration: '8-10 minutes',
        steps: [
          'Invite the child to the Baric Tablets',
          'Place one light and one heavy tablet on the mat',
          'Pick up the light tablet and place it flat on your fingertips, arm extended',
          'Gently bounce it up and down to feel the weight',
          'Say "This one is light"',
          'Pick up the heavy tablet the same way',
          'Bounce it gently and say "This one is heavy"',
          'Invite the child to feel each one',
          'Introduce the medium-weight tablet',
          'Grade all three from lightest to heaviest'
        ],
        keyPoints: [
          'Hold tablets flat on open fingertips, not gripped in hand',
          'Use gentle up-and-down motion to sense weight',
          'Close eyes to heighten sensitivity',
          'Start with only the lightest and heaviest pair'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child compares and grades tablets by weight',
        steps: [
          'Child holds tablets flat on fingertips',
          'Child compares two tablets and identifies lighter/heavier',
          'Child grades three tablets from lightest to heaviest',
          'Use blindfold for sensory focus'
        ],
        supportStrategies: [
          'If struggling: use only the two most contrasting tablets',
          'Ensure proper hand position (flat on fingertips)',
          'Allow ample time for comparison'
        ],
        duration: '10-12 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child works with all three sets',
        indicators: [
          'Grades tablets from light to heavy accurately',
          'Works blindfolded with confidence',
          'Can sort all tablets from all three sets',
          'Uses vocabulary: light, medium, heavy, lighter, heavier'
        ],
        troubleshooting: [
          'If can\'t distinguish: return to two contrasting weights',
          'If gripping tablets: model flat-fingertip position',
          'Allow child to work at own pace'
        ],
        duration: '10-15 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child discriminates weight differences reliably',
        assessmentCriteria: [
          'Grades all tablets accurately',
          'Matches pairs by weight blindfolded',
          'Describes weight differences using precise vocabulary',
          'Works with concentration and care'
        ],
        indicators: [
          'Compares weights of everyday objects',
          'Uses comparative language spontaneously',
          'Shows interest in balance and scales'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Weight exploration beyond the tablets',
        activities: [
          'Compare classroom objects by weight',
          'Use a balance scale to verify predictions',
          'Sort natural objects by weight: stones, shells, seeds',
          'Estimate and check weight of everyday items'
        ],
        variations: [
          'Compare objects of same size but different weight',
          'Predict which is heavier before lifting',
          'Create a weight gradient with found objects'
        ]
      }
    }
  },

  'smelling-bottles': {
    id: 'smelling-bottles',
    title: 'Smelling Bottles',
    icon: '👃',
    category: 'Olfactory',
    difficulty: 'Intermediate',
    isPremium: false,
    description: 'Match pairs of scents to develop olfactory discrimination.',
    ageRange: '3-5 years',
    materials: ['Two sets of 6 matching bottles with scents (e.g., vanilla, cinnamon, lavender, coffee, mint, lemon)', 'Tray', 'Work mat'],
    purpose: 'Develops olfactory sense — the ability to distinguish and match different scents; enriches sensory awareness',
    color: 'white',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Introduce matching scents from two contrasting pairs',
        invitation: 'Would you like to work with the Smelling Bottles?',
        duration: '8-10 minutes',
        steps: [
          'Invite the child to the Smelling Bottles shelf',
          'Carry both sets of bottles to the mat on a tray',
          'Place one set on the left, one set on the right',
          'Take one bottle from the left set and remove the lid',
          'Hold the bottle under your nose and fan the scent gently with your hand',
          'Close your eyes and inhale slowly',
          'Take a bottle from the right set, smell it the same way',
          'If it matches, place the pair together in the center',
          'If not, try another bottle from the right set',
          'Continue until all pairs are matched'
        ],
        keyPoints: [
          'Fan the scent toward your nose — don\'t inhale directly from the bottle',
          'Start with only 2-3 very different pairs',
          'Close eyes to focus on the scent',
          'Rest your nose between scents if needed'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child matches scent pairs with support',
        steps: [
          'Child smells a bottle from the first set',
          'Child compares with bottles from the second set',
          'Child pairs matching scents together',
          'Name the scents using three-period lesson'
        ],
        supportStrategies: [
          'Start with 2 very contrasting pairs (vanilla vs. coffee)',
          'If nose fatigues: take a break, smell own wrist to reset',
          'Model the fanning technique for gentle sniffing'
        ],
        duration: '10-12 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child matches all scent pairs',
        indicators: [
          'Matches all pairs independently',
          'Names familiar scents',
          'Works carefully and methodically',
          'Can grade pleasant to strong scents'
        ],
        troubleshooting: [
          'If difficulty: reduce to 3 pairs',
          'If nose fatigue: work with fewer pairs per session',
          'Refresh scents periodically (cotton balls inside)'
        ],
        duration: '10-15 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child discriminates and identifies scents',
        assessmentCriteria: [
          'Matches all 6 pairs accurately',
          'Names common scents',
          'Can grade scents from mild to strong',
          'Works with concentration'
        ],
        indicators: [
          'Identifies scents in cooking and nature',
          'Uses descriptive scent vocabulary',
          'Shows interest in herbs and spices'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Olfactory exploration beyond the bottles',
        activities: [
          'Identify cooking ingredients by smell',
          'Smell garden herbs and flowers',
          'Create a scent memory game',
          'Grade scents from pleasant to strong'
        ],
        variations: [
          'Match scents to their source (vanilla bean, cinnamon stick)',
          'Blindfold scent identification',
          'Seasonal scent collections'
        ]
      }
    }
  },

  'tasting-bottles': {
    id: 'tasting-bottles',
    title: 'Tasting Bottles',
    icon: '👅',
    category: 'Gustatory',
    difficulty: 'Advanced',
    isPremium: true,
    description: 'Discriminate between basic tastes: sweet, sour, salty, and bitter.',
    ageRange: '4-6 years',
    materials: ['8 small dropper bottles (4 pairs)', 'Tasting spoon or dropper', 'Cup of water for rinsing', 'Tray'],
    purpose: 'Develops gustatory sense — discrimination of the four basic tastes; enriches vocabulary and sensory awareness',
    color: 'white',
    learningProcess: {
      presentation: {
        title: 'Presentation',
        description: 'Introduce two contrasting tastes (sweet and sour)',
        invitation: 'Would you like to work with the Tasting Bottles?',
        duration: '8-10 minutes',
        steps: [
          'Invite the child to the Tasting Bottles',
          'Place two bottles on the mat: sweet (sugar water) and sour (lemon water)',
          'Place a drop from the first bottle onto the tasting spoon',
          'Taste it slowly and say "This is sweet"',
          'Rinse mouth with water',
          'Place a drop from the second bottle onto a clean spoon',
          'Taste it and say "This is sour"',
          'Invite the child to taste each one',
          'Conduct a three-period lesson for sweet and sour'
        ],
        keyPoints: [
          'Always check for allergies before this activity',
          'Use only food-safe solutions',
          'Rinse between tastes to cleanse the palate',
          'Start with just two contrasting tastes'
        ]
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child tastes and identifies flavors',
        steps: [
          'Child tastes from the dropper onto spoon',
          'Child names the taste: sweet, sour, salty, or bitter',
          'Child rinses mouth between tastes',
          'Match pairs of the same taste from two sets'
        ],
        supportStrategies: [
          'Start with sweet and sour only',
          'If child dislikes bitter: skip until ready',
          'Use very dilute solutions',
          'Always have water for rinsing available'
        ],
        duration: '8-12 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child matches and grades tastes',
        indicators: [
          'Identifies all four basic tastes',
          'Matches pairs from two sets',
          'Names tastes correctly',
          'Uses vocabulary: sweet, sour, salty, bitter'
        ],
        troubleshooting: [
          'If confused: return to two-taste comparison',
          'If refusing to taste: never force — observe others first',
          'Keep solutions very dilute and fresh'
        ],
        duration: '10-12 minutes'
      },
      mastery: {
        title: 'Mastery Indicators',
        description: 'Child identifies and describes basic tastes',
        assessmentCriteria: [
          'Identifies all four tastes consistently',
          'Matches all pairs from two sets',
          'Uses taste vocabulary in daily life',
          'Describes foods using basic taste words'
        ],
        indicators: [
          'Identifies tastes in everyday foods',
          'Uses comparative language: sweeter, more sour',
          'Shows interest in cooking and flavor'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Gustatory exploration with real foods',
        activities: [
          'Identify tastes in real foods during snack time',
          'Classify foods by predominant taste',
          'Combine tastes: sweet and sour together',
          'Explore umami as a fifth taste (elementary)'
        ],
        variations: [
          'Blindfold taste testing',
          'Create taste maps of fruits',
          'Cook simple recipes highlighting different tastes'
        ]
      }
    }
  }
};
