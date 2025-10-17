// Additional Montessori Sensorial Skills Data
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
        title: 'Presentation',
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
        title: 'Guided Practice',
        description: 'Child practices matching colors with educator observing',
        duration: '1-2 weeks with Box 1, then progress to Box 2 and Box 3',
        steps: [
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
        title: 'Independent Practice',
        description: 'Child works independently with all Color Tablet boxes',
        duration: '4-8 weeks',
        indicators: [
          'Matches all colors accurately in Box 1 and Box 2',
          'Grades colors from light to dark correctly in Box 3',
          'Handles tablets carefully by the edges',
          'Can name all primary and secondary colors',
          'Works with sustained focus and care'
        ],
        troubleshooting: [
          'If color gradation is difficult, work with only 2-3 gradations first',
          'If touching color surfaces, gently remind about edges',
          'If lighting is poor, move near a window'
        ]
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates color expertise and creative exploration',
        assessmentCriteria: [
          'Accurately matches and grades all color tablets',
          'Names all colors including tertiary colors',
          'Explains the concept of gradation (light to dark)',
          'Handles materials with consistent care and respect',
          'Can identify matching colors in the environment'
        ],
        indicators: [
          'Confident color discrimination',
          'Can teach others',
          'Shows refined color sense'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced color activities',
        activities: [
          'Find objects in the classroom matching each tablet color',
          'Create a color scavenger hunt using the tablets',
          'Match paint samples to the tablets',
          'Learn color mixing concepts with art materials',
          'Create artwork inspired by specific color tablets'
        ],
        variations: [
          'Identify warm vs cool colors',
          'Learn color names in different languages',
          'Match fabric swatches to color tablets',
          'Create a color sorting activity with natural objects'
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
        title: 'Presentation',
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
        title: 'Guided Practice',
        description: 'Child practices matching sound cylinders with minimal support',
        duration: '2-3 weeks of practice',
        steps: [
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
        title: 'Independent Practice',
        description: 'Child works independently with sound cylinders',
        duration: '4-6 weeks',
        indicators: [
          'Consistently matches all cylinder pairs correctly',
          'Shakes each cylinder consistently and gently',
          'Shows sustained auditory focus',
          'Self-corrects by re-listening',
          'Works in silence without reminders',
          'Handles materials carefully'
        ],
        troubleshooting: [
          'If environment is noisy, schedule during quiet times',
          'If shaking too hard, demonstrate gentle motion again',
          'If frustrated, start with fewer pairs (3-4)'
        ]
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates refined auditory discrimination',
        assessmentCriteria: [
          'Matches all pairs accurately on first try',
          'Works completely independently',
          'Can verbalize what they hear (loud, soft, high, low)',
          'Shows refined listening skills in other contexts',
          'Maintains focus for the entire activity'
        ],
        indicators: [
          'Confident auditory discrimination',
          'Can teach others',
          'Shows refined listening skills'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced sound activities',
        activities: [
          'Grade all cylinders from softest to loudest sound',
          'Create rhythm patterns by shaking cylinders in sequence',
          'Identify which cylinder is louder/softer between two',
          'Make your own sound cylinders with identical containers and different materials',
          'Explore musical instruments and their sound qualities'
        ],
        variations: [
          'Match with eyes closed',
          'Work with only 3-4 pairs for quicker activity',
          'Create a "memory" game: shake red, then find blue from memory',
          'Close eyes and identify classroom sounds'
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
        title: 'Presentation',
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
        title: 'Guided Practice',
        description: 'Child practices matching fabrics with educator present',
        duration: '1-2 weeks of regular practice',
        steps: [
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
        title: 'Independent Practice',
        description: 'Child works independently with Fabric Box',
        duration: '3-6 weeks',
        indicators: [
          'Matches all fabric pairs accurately',
          'Uses fingertips purposefully to explore texture',
          'Can name and describe each texture',
          'Works with focus and care',
          'Attempts matching with eyes closed or blindfolded'
        ],
        troubleshooting: [
          'If relying only on sight, encourage eyes-closed practice',
          'If rushing, model slow touching again',
          'If avoiding certain textures, respect sensitivity and offer gradually'
        ]
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates refined tactile discrimination',
        assessmentCriteria: [
          'Accurately matches all pairs without visual cues',
          'Uses rich texture vocabulary (velvety, coarse, satiny, nubby)',
          'Can describe subtle differences between similar textures',
          'Shows heightened tactile awareness in daily life',
          'Handles materials with consistent care'
        ],
        indicators: [
          'Confident tactile discrimination',
          'Can teach others',
          'Shows refined touch sensitivity'
        ]
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced texture activities',
        activities: [
          'Find classroom objects with matching textures',
          'Create a texture book with fabric samples',
          'Match natural materials (leaves, bark, stones) by texture',
          'Explore textures during nature walks',
          'Create art projects using different textured materials'
        ],
        variations: [
          'Match with eyes completely closed',
          'Sort fabrics by texture type (all soft ones, all rough ones)',
          'Arrange fabrics from smoothest to roughest',
          'Create patterns or designs with the fabric squares'
        ]
      }
    }
  }
};
