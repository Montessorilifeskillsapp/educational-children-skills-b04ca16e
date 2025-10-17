// Montessori Sensorial Skills Data
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
        title: 'Presentation',
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
        title: 'Guided Practice',
        description: 'Support the child as they build the tower independently',
        duration: '2-3 weeks of daily practice',
        steps: [
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
        title: 'Independent Practice',
        description: 'Child works with Pink Tower completely independently',
        duration: '4-6 weeks',
        indicators: [
          'Carries all cubes without assistance',
          'Builds tower with accurate centering',
          'Self-corrects misalignments without prompting',
          'Works with sustained concentration',
          'Returns materials properly to shelf'
        ],
        troubleshooting: [
          'If cubes fall, suggest building more slowly',
          'If alignment is off, view tower from the side together',
          'If rushing, model careful movements again'
        ]
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates complete mastery and explores extensions',
        assessmentCriteria: [
          'Builds tower perfectly centered every time',
          'Works independently without reminders',
          'Shows respect for materials through careful handling',
          'Can explain the purpose of the activity',
          'Demonstrates sustained focus throughout the activity'
        ],
        indicators: [
          'Confident and independent work',
          'Can teach others',
          'Shows pride in precise work'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced activities to extend learning',
        activities: [
          'Count the cubes (1-10)',
          'Build the tower with eyes closed using tactile sense',
          'Measure real objects using the cubes as units',
          'Draw or paint the tower'
        ],
        variations: [
          'Build horizontally instead of vertically',
          'Create patterns with the cubes',
          'Combine with Brown Stair or Red Rods'
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
        title: 'Presentation',
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
        title: 'Guided Practice',
        description: 'Child practices building the Brown Stair with observation',
        duration: '2-3 weeks of regular practice',
        steps: [
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
        title: 'Independent Practice',
        description: 'Child works independently with the Brown Stair',
        duration: '4-6 weeks',
        indicators: [
          'Correctly orders prisms from thickest to thinnest',
          'Aligns left ends without measuring',
          'Builds with sustained concentration',
          'Self-corrects errors independently',
          'Handles materials with care and respect'
        ],
        troubleshooting: [
          'If order is incorrect, suggest comparing two prisms side by side',
          'If alignment is off, use a straight edge as a guide',
          'If carrying multiple prisms, reinforce one-at-a-time rule'
        ]
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates complete mastery and explores extensions',
        assessmentCriteria: [
          'Builds perfect stair formation consistently',
          'Works independently from start to finish',
          'Recognizes and corrects own errors',
          'Can verbalize the concept of thickness gradation',
          'Shows pride in precise work'
        ],
        indicators: [
          'Confident independent work',
          'Can teach others',
          'Understands thickness gradation'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced activities to extend learning',
        activities: [
          'Combine Brown Stair with Pink Tower for complex designs',
          'Match prisms to corresponding Pink Tower cubes',
          'Find objects in the environment matching each thickness',
          'Trace the stair shape on paper'
        ],
        variations: [
          'Build the stair vertically (with educator permission)',
          'Build from thinnest to thickest',
          'Place the stair in different orientations',
          'Create patterns with the prisms'
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
        title: 'Presentation',
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
        title: 'Guided Practice',
        description: 'Child practices arranging Red Rods with minimal guidance',
        duration: '3-4 weeks of regular practice',
        steps: [
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
        title: 'Independent Practice',
        description: 'Child works completely independently with Red Rods',
        duration: '4-8 weeks',
        indicators: [
          'Carries rods safely without assistance',
          'Correctly orders all ten rods from longest to shortest',
          'Aligns left ends accurately',
          'Works with focus for the entire activity',
          'Returns materials without reminders'
        ],
        troubleshooting: [
          'If order is incorrect, have child compare rods side by side',
          'If rods roll, ensure mat is on flat, stable surface',
          'If child is fatigued, break into two sessions'
        ]
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates complete mastery and explores extensions',
        assessmentCriteria: [
          'Arranges all rods perfectly every time',
          'Works independently and confidently',
          'Self-corrects any errors quickly',
          'Can explain the concept of length gradation',
          'Shows consistent care for materials',
          'Maintains concentration throughout long activity'
        ],
        indicators: [
          'Confident independent work',
          'Can teach others',
          'Understands length gradation'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced activities to extend learning',
        activities: [
          'Combine Red Rods with Number Rods for math introduction',
          'Measure classroom objects using specific rods as units',
          'Estimate lengths before measuring',
          'Draw the rod configuration on paper'
        ],
        variations: [
          'Build the rods vertically against a wall',
          'Arrange in reverse order (shortest to longest)',
          'Create different formations (circular, radial)',
          'Create a maze using all the rods'
        ]
      }
    }
  }
};
