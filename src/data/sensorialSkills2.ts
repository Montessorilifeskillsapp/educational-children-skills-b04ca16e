// Additional Montessori Sensorial Skills Data
export interface MontessoriLearningProcess {
  presentation: {
    description: string;
    duration: string;
    steps: string[];
    keyPoints: string[];
  };
  guidedPractice: {
    description: string;
    duration: string;
    activities: string[];
    supportStrategies: string[];
  };
  independentPractice: {
    description: string;
    indicators: string[];
    variations: string[];
  };
  mastery: {
    description: string;
    assessmentCriteria: string[];
    extensions: string[];
  };
  troubleshooting?: {
    commonChallenges: string[];
    solutions: string[];
  };
}

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

export const additionalSensorialSkills: Record<string, SensorialSkill> = {
  'color-tablets': {
    id: 'color-tablets',
    title: 'Color Tablets',
    icon: '🎨',
    category: 'Visual Discrimination',
    difficulty: 'Intermediate',
    isPremium: false,
    description: 'Matching and grading colors to develop visual discrimination of color.',
    ageRange: '3-5 years',
    materials: ['Color tablets (Box 1, 2, or 3)', 'Work mat'],
    purpose: 'Develops visual discrimination of color and color vocabulary',
    color: 'rainbow',
    learningProcess: {
      presentation: {
        description: 'Demonstrate matching and grading color tablets with Box 1 (primary colors)',
        duration: '10-12 minutes',
        steps: [
          'Invite the child to the Color Tablets Box 1 shelf',
          'Carry the box with both hands to a work table or mat',
          'Remove all six tablets and place them randomly on the mat',
          'Pick up one red tablet, holding it by the white wooden edges',
          'Place it at the top of the work area',
          'Look at the remaining tablets and select the matching red tablet',
          'Place the matching tablet next to the first red tablet',
          'Say "These are the same" or "Red" while pointing',
          'Continue with blue tablets, placing them below the red pair',
          'Finish with yellow tablets at the bottom',
          'Run your finger down each color pair to emphasize the match',
          'Conduct the three-period lesson for color names if appropriate',
          'Mix tablets again and invite the child to match',
          'Return tablets to box carefully'
        ],
        keyPoints: [
          'Always hold tablets by the white wooden edges to avoid touching the color surface',
          'Work in good lighting for accurate color perception',
          'Use minimal language initially - let the color speak',
          'Introduce formal color names through three-period lesson',
          'Show deliberate visual comparison when matching'
        ]
      },
      guidedPractice: {
        description: 'Child practices matching colors with educator observing',
        duration: '1-2 weeks with Box 1, then progress to Box 2 and Box 3',
        activities: [
          'Child removes tablets and places them randomly',
          'Child matches each color pair independently',
          'Child names colors during or after matching',
          'Child explores Box 2 (11 color pairs) when ready',
          'Child grades Box 3 (9 colors, 7 gradations each) from light to dark'
        ],
        supportStrategies: [
          'For Box 1: Allow child to discover matches through trial and error',
          'For Box 2: If child is overwhelmed, work with just 3-4 colors at first',
          'For Box 3: Demonstrate grading with one color family first',
          'Use the three-period lesson to reinforce color names',
          'Encourage child to check work by comparing tablets side by side',
          'Celebrate discoveries: "You found two colors that match!"'
        ]
      },
      independentPractice: {
        description: 'Child works independently with all Color Tablet boxes',
        indicators: [
          'Matches all colors accurately in Box 1 and Box 2',
          'Grades colors from light to dark correctly in Box 3',
          'Handles tablets carefully by the edges',
          'Can name all primary and secondary colors',
          'Works with sustained focus and care'
        ],
        variations: [
          'Match colors in Box 2 with eyes partially closed',
          'Grade just two color families together for comparison',
          'Create patterns or designs with the tablets',
          'Work with tablets in different lighting conditions (with supervision)',
          'Mix tablets from different boxes for a challenge'
        ]
      },
      mastery: {
        description: 'Child demonstrates color expertise and creative exploration',
        assessmentCriteria: [
          'Accurately matches and grades all color tablets',
          'Names all colors including tertiary colors',
          'Explains the concept of gradation (light to dark)',
          'Handles materials with consistent care and respect',
          'Can identify matching colors in the environment'
        ],
        extensions: [
          'Find objects in the classroom matching each tablet color',
          'Create a color scavenger hunt using the tablets',
          'Match paint samples to the tablets',
          'Learn color mixing concepts with art materials',
          'Identify warm vs cool colors',
          'Create artwork inspired by specific color tablets',
          'Learn color names in different languages',
          'Explore color theory: complementary colors, analogous colors',
          'Match fabric swatches to color tablets',
          'Create a color sorting activity with natural objects'
        ]
      },
      troubleshooting: {
        commonChallenges: [
          'Child struggles with color gradation in Box 3',
          'Child touches color surfaces instead of edges',
          'Color names are confused or forgotten',
          'Child loses interest in matching activity',
          'Lighting makes color discrimination difficult'
        ],
        solutions: [
          'Work with only 2-3 gradations at first, then expand',
          'Gently remind and model proper handling',
          'Use the three-period lesson more frequently',
          'Introduce color scavenger hunts to renew interest',
          'Move activity near a window for natural light',
          'Check for color vision differences; adapt as needed',
          'Pair color work with art activities for variety'
        ]
      }
    }
  },
  'sound-cylinders': {
    id: 'sound-cylinders',
    title: 'Sound Cylinders',
    icon: '🔔',
    category: 'Auditory Discrimination',
    difficulty: 'Intermediate',
    isPremium: true,
    description: 'Matching sounds to develop auditory discrimination and listening skills.',
    ageRange: '3-6 years',
    materials: ['Two sets of sound cylinders (red and blue)', 'Work mat', 'Quiet environment'],
    purpose: 'Develops auditory discrimination and concentration',
    color: 'blue',
    learningProcess: {
      presentation: {
        description: 'Demonstrate matching sound cylinders through careful listening',
        duration: '10-15 minutes',
        steps: [
          'Choose a quiet time and location with minimal background noise',
          'Invite the child to the Sound Cylinders shelf',
          'Carry the box containing both sets (red and blue) to the work mat',
          'Remove red cylinders and line them up horizontally at the top of the mat',
          'Remove blue cylinders and place them randomly at the bottom',
          'Pick up the first red cylinder with your dominant hand',
          'Hold it vertically near your ear',
          'Shake gently with a slight up-and-down motion',
          'Listen intently, showing focused facial expression',
          'Place the red cylinder back in its position',
          'Pick up one blue cylinder and shake it near your ear',
          'If it doesn\'t match, place it down and try another blue cylinder',
          'When you find the matching sound, place the blue cylinder directly below the red one',
          'Continue until all pairs are matched',
          'Shake each matched pair together to confirm',
          'Return cylinders to their box, separating red and blue'
        ],
        keyPoints: [
          'Model attentive listening through body language and facial expressions',
          'Shake each cylinder consistently (same motion, same intensity)',
          'Work in silence to emphasize the importance of listening',
          'Show genuine focus and concentration',
          'Maintain a calm, unhurried pace'
        ]
      },
      guidedPractice: {
        description: 'Child practices matching sound cylinders with minimal support',
        duration: '2-3 weeks of practice',
        activities: [
          'Child sets up materials independently',
          'Child shakes cylinders one at a time, listening carefully',
          'Child matches all pairs through auditory comparison',
          'Child verifies matches by shaking pairs together',
          'Child returns materials to the shelf organized by color'
        ],
        supportStrategies: [
          'Ensure the environment remains quiet during the activity',
          'If child shakes too hard, model gentle shaking again',
          'Resist the urge to point out incorrect matches immediately',
          'If child seems stuck, suggest shaking the cylinders again',
          'Encourage self-checking by shaking suspected pairs together',
          'Celebrate the process of careful listening, not just accuracy'
        ]
      },
      independentPractice: {
        description: 'Child works independently with sound cylinders',
        indicators: [
          'Consistently matches all cylinder pairs correctly',
          'Shakes each cylinder consistently and gently',
          'Shows sustained auditory focus',
          'Self-corrects by re-listening',
          'Works in silence without reminders',
          'Handles materials carefully'
        ],
        variations: [
          'Match with eyes closed to emphasize auditory sense',
          'Work with only 3-4 pairs for a quicker activity',
          'Grade cylinders from softest to loudest after matching',
          'Switch which color set you match first',
          'Create a "memory" game: shake red, then find blue from memory'
        ]
      },
      mastery: {
        description: 'Child demonstrates refined auditory discrimination',
        assessmentCriteria: [
          'Matches all pairs accurately on first try',
          'Works completely independently',
          'Can verbalize what they hear (loud, soft, high, low)',
          'Shows refined listening skills in other contexts',
          'Maintains focus for the entire activity'
        ],
        extensions: [
          'Grade all cylinders from softest to loudest sound',
          'Create rhythm patterns by shaking cylinders in sequence',
          'Identify which cylinder is louder/softer between two',
          'Make your own sound cylinders with identical containers and different materials (rice, beans, sand)',
          'Match environmental sounds to cylinder sounds',
          'Explore musical instruments and their sound qualities',
          'Learn vocabulary: loud, soft, volume, pitch, tone',
          'Close eyes and identify classroom sounds',
          'Create a sound walk: listen to outdoor sounds and describe them'
        ]
      },
      troubleshooting: {
        commonChallenges: [
          'Environment is too noisy for accurate listening',
          'Child shakes cylinders too vigorously',
          'Child becomes frustrated when struggling to match',
          'Child rushes through without careful listening',
          'Cylinders are difficult to distinguish'
        ],
        solutions: [
          'Schedule activity during quiet times; use "quiet work" sign',
          'Demonstrate gentle shaking again; perhaps hold child\'s hand to guide',
          'Start with fewer pairs (3-4) to build confidence',
          'Model the peaceful, patient attitude needed for listening',
          'Check that cylinders haven\'t been damaged; refill if needed',
          'Ensure child has had silence game or other listening preparation',
          'Consider individual differences in auditory processing'
        ]
      }
    }
  },
  'fabric-box': {
    id: 'fabric-box',
    title: 'Fabric Box',
    icon: '🧵',
    category: 'Tactile Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Feeling and matching different fabric textures to develop tactile sensitivity.',
    ageRange: '2.5-5 years',
    materials: ['Fabric box with pairs of different textures (silk, cotton, velvet, burlap, corduroy, felt, etc.)', 'Blindfold (optional)'],
    purpose: 'Develops tactile discrimination and texture vocabulary',
    color: 'green',
    learningProcess: {
      presentation: {
        description: 'Demonstrate matching fabric textures through careful touch',
        duration: '8-10 minutes',
        steps: [
          'Invite the child to the Fabric Box shelf',
          'Carry the box to a work table or mat',
          'Remove all fabric squares and place them randomly on the mat',
          'Select one fabric square',
          'Hold it with both hands, one on each side',
          'Run your fingertips slowly across the surface',
          'Show focused attention to the tactile sensation',
          'Place that square at the top of the work area',
          'Pick up another square and feel it carefully',
          'If textures don\'t match, place it aside',
          'Continue feeling fabrics until you find the matching pair',
          'Place the matching square next to the first',
          'Continue until all pairs are matched',
          'Introduce texture vocabulary with three-period lesson if appropriate',
          'Invite the child to match while you observe',
          'Return fabrics to the box when finished'
        ],
        keyPoints: [
          'Use slow, deliberate finger movements to emphasize tactile exploration',
          'Show facial expressions that indicate sensing differences',
          'Keep visual attention on fingers during touching',
          'Model careful, respectful handling of fabrics',
          'Introduce vocabulary: smooth, rough, soft, hard, bumpy, fuzzy, silky'
        ]
      },
      guidedPractice: {
        description: 'Child practices matching fabrics with educator present',
        duration: '1-2 weeks of regular practice',
        activities: [
          'Child removes and arranges all fabric squares',
          'Child matches pairs through touch and sight',
          'Child names textures using descriptive vocabulary',
          'Child matches with reduced visual input (dim lighting or eyes partially closed)',
          'Child returns materials organized by pairs'
        ],
        supportStrategies: [
          'Allow child to use both sight and touch initially',
          'Encourage slow, exploratory touching',
          'If child is unsure, suggest: "Feel this one again"',
          'Use three-period lesson to reinforce texture vocabulary',
          'Avoid correcting immediately; let child discover through re-checking',
          'Celebrate sensory awareness: "You really noticed the difference!"'
        ]
      },
      independentPractice: {
        description: 'Child works independently with Fabric Box',
        indicators: [
          'Matches all fabric pairs accurately',
          'Uses fingertips purposefully to explore texture',
          'Can name and describe each texture',
          'Works with focus and care',
          'Attempts matching with eyes closed or blindfolded'
        ],
        variations: [
          'Match fabrics with eyes completely closed',
          'Sort fabrics by texture type (all soft ones, all rough ones)',
          'Arrange fabrics from smoothest to roughest',
          'Match fabrics with one hand behind back',
          'Create patterns or designs with the fabric squares'
        ]
      },
      mastery: {
        description: 'Child demonstrates refined tactile discrimination',
        assessmentCriteria: [
          'Accurately matches all pairs without visual cues',
          'Uses rich texture vocabulary (velvety, coarse, satiny, nubby)',
          'Can describe subtle differences between similar textures',
          'Shows heightened tactile awareness in daily life',
          'Handles materials with consistent care'
        ],
        extensions: [
          'Find classroom objects with matching textures',
          'Create a texture book with fabric samples',
          'Match natural materials (leaves, bark, stones) by texture',
          'Explore textures during nature walks',
          'Sort fabrics by multiple criteria (soft AND smooth)',
          'Learn about fabric sources (cotton plant, sheep\'s wool, silkworm)',
          'Create art projects using different textured materials',
          'Develop texture vocabulary in multiple languages',
          'Match fabrics to descriptive word cards',
          'Design a texture sensory path with different materials'
        ]
      },
      troubleshooting: {
        commonChallenges: [
          'Child relies entirely on visual matching',
          'Child rushes through without careful feeling',
          'Textures are too similar for child to distinguish',
          'Child avoids certain textures due to sensitivity',
          'Fabric squares are becoming worn or dirty'
        ],
        solutions: [
          'Encourage eyes-closed practice from early stages',
          'Model slow, mindful touching again',
          'Start with very different textures (silk vs. sandpaper)',
          'Respect sensory sensitivities; don\'t force touching',
          'Replace worn fabrics to maintain clear differences',
          'Ensure fabrics are clean and pleasant to touch',
          'Pair with other tactile activities: sand, water, textured objects'
        ]
      }
    }
  },
  'geometric-solids': {
    id: 'geometric-solids',
    title: 'Geometric Solids',
    icon: '📐',
    category: 'Stereognostic',
    difficulty: 'Advanced',
    isPremium: true,
    description: 'Exploring three-dimensional shapes through touch and sight.',
    ageRange: '4-6 years',
    materials: ['Set of 10 geometric solids (sphere, cube, cone, cylinder, square-based pyramid, triangular-based pyramid, ovoid, ellipsoid, rectangular prism, triangular prism)', 'Mystery bag or basket', 'Work mat'],
    purpose: 'Develops stereognostic sense (recognition through touch), geometric vocabulary, and spatial awareness',
    color: 'purple',
    learningProcess: {
      presentation: {
        description: 'Introduce geometric solids through sensorial exploration and naming',
        duration: '15-20 minutes for initial presentation',
        steps: [
          'Invite the child to the Geometric Solids shelf',
          'Carry the basket of solids to a work mat or table',
          'Remove three contrasting solids first (e.g., sphere, cube, cone)',
          'Hold the sphere with both hands',
          'Rotate it slowly, exploring its surface with your fingertips',
          'Roll it gently on the mat to show it rolls in all directions',
          'Set it aside and pick up the cube',
          'Feel each face, edge, and corner deliberately',
          'Try to roll it - show that it doesn\'t roll',
          'Pick up the cone and explore its features',
          'Feel the circular base, the curved surface, the pointed apex',
          'Show that it rolls in a circle',
          'Conduct three-period lesson for names: "This is a sphere. This is a cube. This is a cone."',
          'Introduce remaining solids gradually over multiple sessions',
          'Once several solids are familiar, introduce the mystery bag activity',
          'Place one solid in the bag without child seeing',
          'Model reaching in, feeling carefully, and identifying before removing',
          'Invite child to try with a familiar solid'
        ],
        keyPoints: [
          'Introduce 2-3 solids at a time to avoid overwhelming',
          'Emphasize tactile exploration over visual',
          'Use precise geometric vocabulary from the start',
          'Show the properties: which roll, which stack, which slide',
          'Model thoughtful, slow exploration of each feature'
        ]
      },
      guidedPractice: {
        description: 'Child explores solids independently and with mystery bag',
        duration: '3-4 weeks, introducing 2-3 new solids each week',
        activities: [
          'Child freely explores all introduced solids',
          'Child names each solid independently',
          'Child identifies solids in the mystery bag by touch',
          'Child sorts solids by properties (rolls, doesn\'t roll)',
          'Child describes each solid\'s features (faces, edges, corners)',
          'Child matches solids to corresponding shapes in the environment'
        ],
        supportStrategies: [
          'If child struggles with mystery bag, let them look first, then feel with eyes closed',
          'Use three-period lesson frequently to reinforce vocabulary',
          'Ask open-ended questions: "What do you feel?" "How is this different from the cube?"',
          'Encourage child to rotate solids and explore from all angles',
          'Celebrate discoveries: "You found that the cylinder has two circular faces!"',
          'Allow ample time for free exploration before structured activities'
        ]
      },
      independentPractice: {
        description: 'Child works independently with all geometric solids',
        indicators: [
          'Names all solids correctly',
          'Identifies solids in mystery bag accurately',
          'Can describe features using geometric vocabulary',
          'Explores solids methodically (faces, edges, vertices)',
          'Recognizes solid shapes in the environment',
          'Works with sustained concentration'
        ],
        variations: [
          'Identify solids with eyes completely closed',
          'Sort by number of faces, edges, or vertices',
          'Arrange solids by complexity (simple to complex)',
          'Create structures by stacking compatible solids',
          'Match solids to photographic cards',
          'Trace faces of solids onto paper'
        ]
      },
      mastery: {
        description: 'Child demonstrates complete understanding of three-dimensional geometry',
        assessmentCriteria: [
          'Accurately identifies all 10 solids by touch alone',
          'Uses precise geometric vocabulary consistently',
          'Can describe properties: number of faces, shape of faces, edges, vertices',
          'Recognizes solids in real-world objects',
          'Explains differences between similar solids (cube vs. rectangular prism)',
          'Shows confidence and independence with material'
        ],
        extensions: [
          'Find real objects matching each solid (ball=sphere, box=rectangular prism)',
          'Learn the relationship between 2D shapes and solid faces',
          'Match solids to their 2D "footprints" (base shapes)',
          'Draw solids from different perspectives',
          'Learn mathematical properties: count faces, edges, vertices',
          'Introduce Euler\'s formula: F + V - E = 2',
          'Build with solid blocks and describe the structures',
          'Create art projects using solid-shaped objects',
          'Learn about solids in nature and architecture',
          'Compare volume by filling hollow versions with rice or water',
          'Study cross-sections of solids',
          'Learn vocabulary in multiple languages'
        ]
      },
      troubleshooting: {
        commonChallenges: [
          'Child confuses similar solids (cone vs. pyramid)',
          'Child struggles with stereognostic identification',
          'Vocabulary is difficult to remember or pronounce',
          'Child loses interest in exploration',
          'Child rushes through without careful examination'
        ],
        solutions: [
          'Work with only very different solids initially',
          'Practice with eyes open first, then partially closed, then fully closed',
          'Use frequent three-period lessons and name games',
          'Introduce real-world connections: "The ball is a sphere!"',
          'Model slow, thoughtful exploration again',
          'Ensure child has strong experience with 2D geometric shapes first',
          'Make the mystery bag activity into a game with family members',
          'Create art or building projects using the solids to renew interest'
        ]
      }
    }
  }
};