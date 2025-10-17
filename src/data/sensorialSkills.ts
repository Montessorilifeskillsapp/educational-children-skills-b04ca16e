// Montessori Sensorial Skills Data
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

export const sensorialSkills: Record<string, SensorialSkill> = {
  'pink-tower': {
    id: 'pink-tower',
    title: 'Pink Tower',
    icon: '🟩',
    category: 'Visual Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Building a tower with cubes of different sizes to develop visual discrimination of dimension.',
    ageRange: '2.5-4 years',
    materials: ['10 pink wooden cubes', 'Work mat'],
    purpose: 'Develops visual discrimination of size, concentration, and coordination',
    color: 'pink',
    learningProcess: {
      presentation: {
        description: 'Demonstrate building the Pink Tower with precision and control',
        duration: '10-15 minutes',
        steps: [
          'Invite the child to the shelf where the Pink Tower is kept',
          'Carry the largest cube with both hands to the work mat, placing it gently',
          'Return for each cube, carrying them one at a time from largest to smallest',
          'Place the largest cube in the center of the mat as the base',
          'Lift the second largest cube with both hands at chest level',
          'Carefully center it on top of the first cube, aligning edges',
          'Continue with each cube, always checking for proper centering',
          'After placing the smallest cube, run your hand down the tower to show the progression',
          'Pause to admire the completed tower',
          'Dismantle the tower cube by cube, from smallest to largest',
          'Return each cube to the shelf in order'
        ],
        keyPoints: [
          'Use slow, deliberate movements to show precision',
          'Emphasize careful centering of each cube',
          'Maintain silence during the presentation',
          'Show respect for the materials through gentle handling',
          'Check alignment by looking from the side at eye level'
        ]
      },
      guidedPractice: {
        description: 'Support the child as they build the tower independently',
        duration: '2-3 weeks of daily practice',
        activities: [
          'Child carries cubes one by one to the mat',
          'Child builds the tower with educator observing nearby',
          'Child checks their own work by viewing from different angles',
          'Child dismantles and returns materials independently'
        ],
        supportStrategies: [
          'Remain present but avoid intervening unless child asks for help',
          'If cube is misaligned, wait to see if child notices and self-corrects',
          'Use minimal language - point or gesture if guidance is needed',
          'Celebrate effort and concentration, not just accuracy',
          'Allow repetition as many times as child chooses'
        ]
      },
      independentPractice: {
        description: 'Child works with Pink Tower completely independently',
        indicators: [
          'Carries all cubes without assistance',
          'Builds tower with accurate centering',
          'Self-corrects misalignments without prompting',
          'Works with sustained concentration',
          'Returns materials properly to shelf'
        ],
        variations: [
          'Build the tower in different locations in the room',
          'Build horizontally instead of vertically',
          'Create patterns with the cubes',
          'Combine with Brown Stair or Red Rods'
        ]
      },
      mastery: {
        description: 'Child demonstrates complete mastery and explores extensions',
        assessmentCriteria: [
          'Builds tower perfectly centered every time',
          'Works independently without reminders',
          'Shows respect for materials through careful handling',
          'Can explain the purpose of the activity',
          'Demonstrates sustained focus throughout the activity'
        ],
        extensions: [
          'Count the cubes (1-10)',
          'Use mathematical language: largest, smallest, bigger than, smaller than',
          'Build the tower with eyes closed using tactile sense',
          'Create geometric designs by combining with other materials',
          'Measure real objects using the cubes as units',
          'Draw or paint the tower',
          'Build cooperative towers with multiple children'
        ]
      },
      troubleshooting: {
        commonChallenges: [
          'Child rushes and cubes fall over',
          'Cubes are not centered properly',
          'Child becomes frustrated with the challenge',
          'Child loses interest quickly'
        ],
        solutions: [
          'Model slower movements and emphasize the beauty of careful work',
          'Show the side view to help child see alignment',
          'Break the activity into smaller goals (build just 5 cubes first)',
          'Ensure child has mastered carrying activities before introducing Pink Tower',
          'Vary the location or time of day for the activity'
        ]
      }
    }
  },
  'brown-stair': {
    id: 'brown-stair',
    title: 'Brown Stair',
    icon: '🟫',
    category: 'Visual Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Building a stair with prisms of different thickness to develop understanding of dimension.',
    ageRange: '2.5-4 years',
    materials: ['10 brown wooden prisms', 'Work mat'],
    purpose: 'Develops understanding of thickness and dimension',
    color: 'brown',
    learningProcess: {
      presentation: {
        description: 'Demonstrate building the Brown Stair with attention to thickness gradation',
        duration: '10-15 minutes',
        steps: [
          'Invite the child to the Brown Stair shelf',
          'Carry the thickest prism horizontally with both hands to the mat',
          'Continue carrying each prism one at a time, thickest to thinnest',
          'Place the thickest prism horizontally on the left side of the mat',
          'Place the second thickest prism parallel to the first, aligning left ends',
          'Continue placing each prism, creating a stair ascending to the right',
          'Ensure all left ends are perfectly aligned',
          'Run your fingers up the stair steps to show the progression',
          'Walk two fingers up the stair like climbing steps',
          'Dismantle from thinnest to thickest',
          'Return prisms to shelf in order'
        ],
        keyPoints: [
          'Emphasize horizontal carrying to show length is constant',
          'Show careful alignment of left ends',
          'Demonstrate the stair formation clearly',
          'Use smooth, flowing movements',
          'Highlight the gradual change in thickness'
        ]
      },
      guidedPractice: {
        description: 'Child practices building the Brown Stair with observation',
        duration: '2-3 weeks of regular practice',
        activities: [
          'Child selects and carries each prism independently',
          'Child builds the stair formation',
          'Child checks alignment of left ends',
          'Child explores walking fingers up the stair',
          'Child returns materials to shelf'
        ],
        supportStrategies: [
          'Allow child to discover the correct order through trial and error',
          'If prisms are out of order, let child notice the irregular stair',
          'Resist the urge to correct immediately',
          'Offer a gentle observation: "I notice something different about this step"',
          'Encourage multiple attempts in one work period'
        ]
      },
      independentPractice: {
        description: 'Child works independently with the Brown Stair',
        indicators: [
          'Correctly orders prisms from thickest to thinnest',
          'Aligns left ends without measuring',
          'Builds with sustained concentration',
          'Self-corrects errors independently',
          'Handles materials with care and respect'
        ],
        variations: [
          'Build the stair vertically (with educator permission)',
          'Build from thinnest to thickest',
          'Place the stair in different orientations',
          'Create patterns with the prisms',
          'Build in different locations around the room'
        ]
      },
      mastery: {
        description: 'Child demonstrates complete mastery and explores extensions',
        assessmentCriteria: [
          'Builds perfect stair formation consistently',
          'Works independently from start to finish',
          'Recognizes and corrects own errors',
          'Can verbalize the concept of thickness gradation',
          'Shows pride in precise work'
        ],
        extensions: [
          'Combine Brown Stair with Pink Tower for complex designs',
          'Use mathematical vocabulary: thick, thin, thicker, thinnest',
          'Match prisms to corresponding Pink Tower cubes',
          'Find objects in the environment matching each thickness',
          'Trace the stair shape on paper',
          'Build the stair blindfolded using tactile sense',
          'Create symmetrical patterns using two Brown Stairs'
        ]
      },
      troubleshooting: {
        commonChallenges: [
          'Child mixes up the order of middle prisms',
          'Left ends are not aligned',
          'Child carries multiple prisms at once',
          'Prisms roll off the mat'
        ],
        solutions: [
          'Show child how to compare two prisms side by side to check thickness',
          'Use a marker or small object to show alignment point',
          'Reinforce one-at-a-time carrying through modeling',
          'Ensure mat is on a stable, level surface',
          'Consider if the child needs more time with simpler materials first'
        ]
      }
    }
  },
  'red-rods': {
    id: 'red-rods',
    title: 'Red Rods',
    icon: '📏',
    category: 'Visual Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Arranging rods by length to develop understanding of long and short.',
    ageRange: '2.5-4 years',
    materials: ['10 red wooden rods', 'Large work mat'],
    purpose: 'Develops visual discrimination of length and introduces measurement concepts',
    color: 'red',
    learningProcess: {
      presentation: {
        description: 'Demonstrate arranging the Red Rods by length with precision',
        duration: '15-20 minutes',
        steps: [
          'Invite the child to the Red Rods storage area',
          'Unroll a large work mat on the floor',
          'Carry the longest rod horizontally with both hands, one hand at each end',
          'Place it horizontally near the top of the mat',
          'Return for each rod, carrying them one at a time in descending order',
          'Place all rods randomly on the mat initially',
          'Pick up the longest rod and place it at the top left of the mat',
          'Find the next longest rod and place it below, aligning left ends',
          'Continue placing rods in descending order of length',
          'Ensure all left ends are perfectly aligned in a vertical line',
          'Run your hand along the top edge to show the stair formation',
          'Walk alongside the rods to show the length progression',
          'Dismantle by returning rods from shortest to longest',
          'Roll up the mat and return materials'
        ],
        keyPoints: [
          'Carry rods at both ends to show full length and prevent dropping',
          'Move slowly and deliberately to show control',
          'Emphasize visual comparison when selecting each rod',
          'Show the stair pattern formed by the aligned rods',
          'Demonstrate respect for the large material and workspace'
        ]
      },
      guidedPractice: {
        description: 'Child practices arranging Red Rods with minimal guidance',
        duration: '3-4 weeks of regular practice',
        activities: [
          'Child lays out the work mat',
          'Child carries and places all rods on the mat',
          'Child arranges rods in order from longest to shortest',
          'Child checks alignment and order',
          'Child returns all materials properly'
        ],
        supportStrategies: [
          'Stand back and observe without interfering',
          'If child struggles with order, suggest comparing two rods directly',
          'Avoid verbal corrections; let the material provide feedback',
          'If alignment is off, ask "How does it look from this side?"',
          'Celebrate the child\'s problem-solving efforts',
          'Allow plenty of time for the activity without rushing'
        ]
      },
      independentPractice: {
        description: 'Child works completely independently with Red Rods',
        indicators: [
          'Carries rods safely without assistance',
          'Correctly orders all ten rods from longest to shortest',
          'Aligns left ends accurately',
          'Works with focus for the entire activity',
          'Returns materials without reminders'
        ],
        variations: [
          'Build the rods vertically against a wall',
          'Arrange in reverse order (shortest to longest)',
          'Create different formations (circular, radial)',
          'Use rods in different areas of the room',
          'Time challenge (with child\'s consent): "Can you arrange them before the sand timer runs out?"'
        ]
      },
      mastery: {
        description: 'Child demonstrates complete mastery and explores extensions',
        assessmentCriteria: [
          'Arranges all rods perfectly every time',
          'Works independently and confidently',
          'Self-corrects any errors quickly',
          'Can explain the concept of length gradation',
          'Shows consistent care for materials',
          'Maintains concentration throughout long activity'
        ],
        extensions: [
          'Combine Red Rods with Number Rods for math introduction',
          'Measure classroom objects using specific rods as units',
          'Use mathematical vocabulary: long, short, longer, longest, shortest',
          'Compare lengths: "This rod is 3 units longer than this one"',
          'Create a maze using all the rods',
          'Build geometric designs with Pink Tower and Brown Stair',
          'Estimate lengths before measuring',
          'Draw the rod configuration on paper',
          'Build a fence or structure using the rods creatively'
        ]
      },
      troubleshooting: {
        commonChallenges: [
          'Child struggles to identify correct rod order',
          'Rods roll or fall off the mat',
          'Child becomes fatigued by the physical demand',
          'Alignment is consistently inaccurate',
          'Child loses interest midway'
        ],
        solutions: [
          'Have child directly compare rods by placing them side by side',
          'Ensure mat is on a completely flat, stable surface',
          'Break activity into two sessions: first gather rods, then arrange',
          'Use a straight edge or pointer to show the alignment line',
          'Ensure child has had success with simpler sensorial materials first',
          'Offer the activity when child is well-rested and focused'
        ]
      }
    }
  }
};