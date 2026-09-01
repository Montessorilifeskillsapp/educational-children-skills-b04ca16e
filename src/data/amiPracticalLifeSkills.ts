import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

import carryingTray from '@/assets/materials/carrying-tray.jpg';
import carryingChair from '@/assets/materials/carrying-chair.jpg';
import workMat from '@/assets/materials/work-mat.jpg';
import puttingOnCoat from '@/assets/materials/putting-on-coat.jpg';
import shoePolishing from '@/assets/materials/shoe-polishing.jpg';
import spooning from '@/assets/materials/spooning.jpg';
import pouringSet from '@/assets/materials/pouring-set.jpg';
import transferTools from '@/assets/materials/transfer-tools.jpg';
import cleaningTools from '@/assets/materials/cleaning-tools.jpg';
import dishwashing from '@/assets/materials/dishwashing.jpg';
import foldingCloths from '@/assets/materials/folding-cloths.jpg';
import foodPrep from '@/assets/materials/food-prep.jpg';
import dressingFrame from '@/assets/materials/dressing-frame.jpg';
import shoeTying from '@/assets/materials/shoe-tying.jpg';
import bedMaking from '@/assets/materials/bed-making.jpg';
import walkingLine from '@/assets/materials/walking-line.jpg';
import walkingAroundWork from '@/assets/materials/pl/walking-around-work.jpg';
import graceCourtesyTable from '@/assets/materials/grace-courtesy-table-setting.jpg';
import careOfPerson from '@/assets/materials/care-of-person.jpg';
import botanyCare from '@/assets/materials/botany-care.jpg';
import threading from '@/assets/materials/threading.jpg';
import cuttingWork from '@/assets/materials/cutting-work.jpg';
import sorting from '@/assets/materials/sorting.jpg';

import plFrameButtons from '@/assets/materials/pl/frame-buttons.jpg';
import plFrameZipper from '@/assets/materials/pl/frame-zipper.jpg';
import plFrameSnaps from '@/assets/materials/pl/frame-snaps.jpg';
import plFrameLacing from '@/assets/materials/pl/frame-lacing.jpg';
import plFrameBuckles from '@/assets/materials/pl/frame-buckles.jpg';
import plFrameBows from '@/assets/materials/pl/frame-bows.jpg';
import plDusting from '@/assets/materials/pl/dusting.jpg';
import plWashingTables from '@/assets/materials/pl/washing-tables.jpg';
import plSweeping from '@/assets/materials/pl/sweeping.jpg';
import plGreeting from '@/assets/materials/pl/greeting.jpg';
import plExcuseMe from '@/assets/materials/pl/excuse-me.jpg';
import plOfferingHelp from '@/assets/materials/pl/offering-help.jpg';
import plObserving from '@/assets/materials/pl/observing.jpg';
import plWaitingTurn from '@/assets/materials/pl/waiting-turn.jpg';
import plPleaseThankYou from '@/assets/materials/pl/please-thank-you.jpg';
import plPeaceTable from '@/assets/materials/pl/peace-table.jpg';
import plServingMeal from '@/assets/materials/pl/serving-meal.jpg';
import plOpeningContainers from '@/assets/materials/pl/opening-containers.jpg';
import plSponge from '@/assets/materials/pl/sponge.jpg';
import plWashingCloths from '@/assets/materials/pl/washing-cloths.jpg';
import plCarryingObjects from '@/assets/materials/pl/carrying-objects.jpg';
import plSimpleFood from '@/assets/materials/pl/simple-food.jpg';
import plApron from '@/assets/materials/pl/apron.jpg';
import plSnack from '@/assets/materials/pl/snack.jpg';
import plPeelingSlicing from '@/assets/materials/pl/peeling-slicing.jpg';
import plBaking from '@/assets/materials/pl/baking.jpg';
import plCleaningRoutine from '@/assets/materials/pl/cleaning-routine.jpg';

export const amiPracticalLifeSkills: Record<string, EnhancedMontessoriSkill> = {
  // CARE OF SELF ACTIVITIES
  'dressing-frame-buttons': {
    id: 'dressing-frame-buttons',
    title: 'Dressing Frame - Large Buttons',
    description: 'Learn to button and unbutton using large buttons on a wooden frame',
    purpose: 'Develop fine motor skills, hand-eye coordination, and independence in dressing',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🧥',
    image: plFrameButtons,
    materials: ['Wooden dressing frame with large buttons', 'Two fabric panels'],
    directAims: ['Master buttoning technique', 'Develop pincer grasp', 'Improve bilateral coordination'],
    indirectAims: ['Prepare for independent dressing', 'Develop concentration', 'Build self-confidence'],
    controlOfError: ['Visual feedback of aligned buttons', 'Tactile feedback of proper insertion'],
    learningProcess: {
      presentation: {
        title: 'Button Frame Presentation',
        description: 'Teacher demonstrates slow, precise buttoning sequence',
        steps: [
          'Place frame on table in front of child',
          'Open frame completely by unbuttoning from top to bottom',
          'Hold button between thumb and forefinger',
          'Locate corresponding buttonhole',
          'Insert button through hole completely',
          'Pull fabric to secure button',
          'Repeat for each button from top to bottom',
          'Close frame completely, then reopen to check work'
        ],
        keyPoints: ['Move slowly and deliberately', 'Use pincer grasp', 'Work systematically top to bottom'],
        duration: '8-10 minutes'
      },
      guidedPractice: {
        title: 'Supported Buttoning',
        description: 'Child practices with teacher guidance',
        steps: [
          'Invite child to try buttoning',
          'Guide proper finger position if needed',
          'Encourage slow, careful movements',
          'Support completion of difficult buttons',
          'Celebrate successful attempts'
        ],
        supportStrategies: ['Hand-over-hand assistance initially', 'Verbal cues for finger placement', 'Break task into smaller steps'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Buttoning',
        description: 'Child works independently with increasing skill',
        indicators: ['Chooses activity spontaneously', 'Completes buttoning without assistance', 'Shows persistence with difficult buttons'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower movements'],
        duration: '15-20 minutes'
      },
      mastery: {
        title: 'Buttoning Mastery',
        description: 'Child demonstrates complete competence',
        assessmentCriteria: ['Buttons accurately and efficiently', 'Works with sustained concentration', 'Shows pride in accomplishment'],
        indicators: ['Helps others with buttoning', 'Transfers skills to personal clothing', 'Chooses more challenging dressing frames']
      },
      extensions: {
        title: 'Advanced Buttoning',
        description: 'More complex buttoning challenges',
        activities: ['Smaller buttons', 'Multiple button garments', 'Different button styles'],
        variations: ['Coat buttoning practice', 'Doll dressing with buttons', 'Real clothing practice']
      }
    }
  },

  'dressing-frame-zippers': {
    id: 'dressing-frame-zippers',
    title: 'Dressing Frame - Zipper',
    description: 'Master zipper operation through systematic practice',
    purpose: 'Develop bilateral coordination and independence in clothing management',
    ageRange: '3-5 years',
    difficulty: 'Intermediate',
    category: 'Care of Self',
    isPremium: false,
    icon: '🤐',
    image: plFrameZipper,
    materials: ['Wooden frame with separating zipper', 'Two fabric panels'],
    directAims: ['Master zipper operation', 'Develop bilateral coordination', 'Build finger strength'],
    indirectAims: ['Prepare for independent dressing', 'Develop problem-solving skills', 'Build confidence'],
    controlOfError: ['Zipper alignment shows proper technique', 'Sound feedback indicates smooth operation'],
    learningProcess: {
      presentation: {
        title: 'Zipper Frame Presentation',
        description: 'Demonstrate complete zipper operation sequence',
        steps: [
          'Hold bottom of zipper with non-dominant hand',
          'Grasp zipper pull with dominant hand',
          'Pull zipper down slowly to separate completely',
          'Align bottom edges of zipper carefully',
          'Insert one side into zipper pull mechanism',
          'Hold alignment while pulling zipper up',
          'Pull zipper down and up several times to practice',
          'Leave frame in closed position'
        ],
        keyPoints: ['Maintain tension at bottom', 'Work slowly for proper alignment', 'Use both hands coordinately'],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Zipper Practice',
        description: 'Child learns with teacher support',
        steps: [
          "Guide child's hand placement",
'Help maintain proper tension',
          'Support alignment of zipper parts',
          'Encourage multiple practice repetitions',
          'Celebrate successful zipping'
        ],
        supportStrategies: ['Physical guidance for hand position', 'Verbal cues for coordination', 'Practice separation before joining'],
        duration: '12-18 minutes'
      },
      independentPractice: {
        title: 'Independent Zipper Work',
        description: 'Child operates zippers independently',
        indicators: ['Aligns zipper parts correctly', 'Operates zipper smoothly', 'Persists through difficulties'],
        troubleshooting: ['If zipper jams: demonstrate gentle wiggling', 'If alignment difficult: practice separation first'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Zipper Operation Mastery',
        description: 'Expert zipper handling in all contexts',
        assessmentCriteria: ['Operates various zipper types', 'Troubleshoots zipper problems', 'Teaches technique to others'],
        indicators: ['Helps classmates with zippers', 'Manages personal clothing zippers', 'Shows patience with stuck zippers']
      },
      extensions: {
        title: 'Advanced Zipper Skills',
        description: 'Complex zipper applications',
        activities: ['Jacket zipper practice', 'Bag and backpack zippers', 'Two-way zippers'],
        variations: ['Different zipper sizes', 'Hidden zippers', 'Zipper repair basics']
      }
    }
  },

  'dressing-frame-snaps': {
    id: 'dressing-frame-snaps',
    title: 'Dressing Frame - Snaps',
    description: 'Learn to fasten and unfasten snaps with precision',
    purpose: 'Develop finger strength, coordination, and independence in clothing care',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '📌',
    image: plFrameSnaps,
    materials: ['Wooden frame with metal snaps', 'Two fabric panels'],
    directAims: ['Master snap fastening technique', 'Develop finger strength', 'Improve precision'],
    indirectAims: ['Build independence in dressing', 'Develop concentration', 'Prepare for complex fasteners'],
    controlOfError: ['Audible click confirms proper fastening', 'Visual alignment shows accuracy'],
    learningProcess: {
      presentation: {
        title: 'Snap Frame Presentation',
        description: 'Demonstrate precise snap operation',
        steps: [
          'Unfasten all snaps from top to bottom',
          'Identify male and female snap parts',
          'Align snap parts directly over each other',
          'Press firmly with thumb until click is heard',
          'Check that snap is securely fastened',
          'Repeat for each snap systematically',
          'Unfasten by pulling fabric apart gently',
          'Practice fastening and unfastening sequence'
        ],
        keyPoints: ['Press firmly for secure fastening', 'Align parts precisely', 'Listen for confirmation click'],
        duration: '6-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Snap Practice',
        description: 'Child practices with teacher assistance',
        steps: [
          'Help child locate snap parts',
          'Guide alignment of male and female parts',
          'Support pressing motion for fastening',
          'Encourage listening for click sound',
          'Practice unfastening technique'
        ],
        supportStrategies: ['Hand-over-hand for pressing', 'Visual cues for alignment', 'Celebrate each successful snap'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Snap Work',
        description: 'Child fastens snaps independently',
        indicators: ['Aligns snap parts accurately', 'Applies appropriate pressure', 'Works systematically through all snaps'],
        troubleshooting: ['If not clicking: check alignment', 'If too difficult: build finger strength with other activities'],
        duration: '12-18 minutes'
      },
      mastery: {
        title: 'Snap Fastening Mastery',
        description: 'Expert snap operation skills',
        assessmentCriteria: ['Fastens snaps quickly and accurately', 'Helps others with snap technique', 'Shows confidence with various snap types'],
        indicators: ['Chooses snap activities frequently', 'Manages personal clothing snaps', 'Demonstrates to younger children']
      },
      extensions: {
        title: 'Advanced Snap Applications',
        description: 'Complex snap fastening situations',
        activities: ['Pajama snap practice', 'Bib fastening', 'Snap-on accessories'],
        variations: ['Different snap sizes', 'Multiple snap garments', 'Decorative snap items']
      }
    }
  },

  'dressing-frame-lacing': {
    id: 'dressing-frame-lacing',
    title: 'Dressing Frame - Lacing',
    description: 'Master shoe lacing technique through systematic practice',
    purpose: 'Develop complex bilateral coordination and prepare for shoe tying',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Care of Self',
    isPremium: true,
    icon: '👟',
    image: plFrameLacing,
    materials: ['Wooden frame with eyelets', 'Two shoe laces', 'Fabric panels shaped like shoe fronts'],
    directAims: ['Master lacing sequence', 'Develop bilateral coordination', 'Prepare for shoe tying'],
    indirectAims: ['Build persistence and concentration', 'Develop spatial awareness', 'Foster independence'],
    controlOfError: ['Even tension across all eyelets', 'Symmetrical lacing pattern', 'Proper crossing sequence'],
    learningProcess: {
      presentation: {
        title: 'Lacing Frame Presentation',
        description: 'Demonstrate systematic lacing technique',
        steps: [
          'Remove laces completely from frame',
          'Identify starting eyelets at bottom',
          'Insert lace up through bottom left eyelet',
          'Pull lace across and up through bottom right eyelet',
          'Continue crisscross pattern to top',
          'Maintain even tension throughout',
          'Pull laces to tighten evenly',
          'Practice unlacing and re-lacing'
        ],
        keyPoints: ['Maintain consistent crossing pattern', 'Keep tension even', 'Work systematically upward'],
        duration: '12-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Lacing Practice',
        description: 'Child practices with teacher guidance',
        steps: [
          'Help child identify starting position',
          'Guide proper lace threading technique',
          'Support crossing pattern maintenance',
          'Encourage even tension adjustment',
          'Practice complete lacing sequence'
        ],
        supportStrategies: ['Color-coded eyelets initially', 'Hand-over-hand for threading', 'Verbal cues for pattern'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Lacing',
        description: 'Child laces independently with skill',
        indicators: ['Maintains consistent crossing pattern', 'Achieves even tension', 'Completes lacing without assistance'],
        troubleshooting: ['If pattern confused: use color guides', 'If tension uneven: practice adjustment technique'],
        duration: '20-30 minutes'
      },
      mastery: {
        title: 'Lacing Expertise',
        description: 'Advanced lacing skills and variations',
        assessmentCriteria: ['Masters multiple lacing patterns', 'Teaches others lacing technique', 'Applies skills to real shoes'],
        indicators: ['Helps with shoe lacing in class', 'Experiments with decorative lacing', 'Shows pride in neat lacing']
      },
      extensions: {
        title: 'Advanced Lacing Skills',
        description: 'Complex lacing applications and variations',
        activities: ['Different lacing patterns', 'Actual shoe lacing', 'Boot lacing practice'],
        variations: ['Decorative lacing styles', 'Speed lacing techniques', 'One-handed lacing methods']
      }
    }
  },

  'shoe-polishing': {
    id: 'shoe-polishing',
    title: 'Shoe Polishing',
    description: 'Learn to clean and polish shoes to maintain their appearance and condition',
    purpose: 'Develop care for personal belongings and attention to detail',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Care of Self',
    isPremium: false,
    icon: '👞',
    image: shoePolishing,
    materials: ['Leather shoes', 'Shoe polish', 'Soft cloths', 'Brush', 'Newspaper', 'Apron'],
    directAims: ['Learn shoe care technique', 'Develop circular polishing motion', 'Understand material care'],
    indirectAims: ['Develop responsibility for belongings', 'Build work ethic', 'Prepare for adult responsibilities'],
    controlOfError: ['Visual improvement in shoe appearance', 'Shine reflects proper technique', 'Even coverage shows thoroughness'],
    learningProcess: {
      presentation: {
        title: 'Shoe Polishing Demonstration',
        description: 'Teacher shows complete shoe care process',
        steps: [
          'Lay newspaper to protect work surface',
          'Put on apron to protect clothing',
          'Remove laces if present',
          'Clean shoes with damp cloth first',
          'Apply small amount of polish to cloth',
          'Rub polish into leather with circular motions',
          'Cover entire shoe surface evenly',
          'Let polish dry completely',
          'Buff with clean cloth until shiny',
          'Replace laces if removed'
        ],
        keyPoints: ['Use small amounts of polish', 'Work in circular motions', 'Allow proper drying time'],
        duration: '20-25 minutes'
      },
      guidedPractice: {
        title: 'Supported Shoe Care',
        description: 'Child polishes with teacher assistance',
        steps: [
          'Help child set up workspace',
          'Guide proper amount of polish application',
          'Support circular rubbing technique',
          'Encourage patience during drying',
          'Assist with final buffing process'
        ],
        supportStrategies: ['Demonstrate circular motion', 'Help with polish amount', 'Encourage thoroughness over speed'],
        duration: '25-35 minutes'
      },
      independentPractice: {
        title: 'Independent Shoe Polishing',
        description: 'Child cares for shoes independently',
        indicators: ['Sets up workspace correctly', 'Uses appropriate polish amount', 'Achieves good shine results'],
        troubleshooting: ['If using too much polish: demonstrate small amounts', 'If uneven coverage: practice systematic application'],
        duration: '30-40 minutes'
      },
      mastery: {
        title: 'Shoe Care Mastery',
        description: 'Expert shoe maintenance skills',
        assessmentCriteria: ['Achieves professional-quality results', 'Cares for various shoe types', 'Takes initiative in shoe maintenance'],
        indicators: ['Volunteers to polish class shoes', 'Maintains personal shoes regularly', 'Teaches younger children']
      },
      extensions: {
        title: 'Advanced Shoe Care',
        description: 'Comprehensive footwear maintenance',
        activities: ['Different polish colors', 'Boot care techniques', 'Shoe repair basics'],
        variations: ['Canvas shoe cleaning', 'Waterproofing application', 'Shoe storage organization']
      }
    }
  },

  // CARE OF ENVIRONMENT ACTIVITIES
  'dusting': {
    id: 'dusting',
    title: 'Dusting',
    description: 'Clean surfaces and objects by removing dust with careful attention to detail',
    purpose: 'Develop care for the environment and attention to cleanliness',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🧹',
    image: plDusting,
    materials: ['Feather duster or soft cloth', 'Spray bottle with water', 'Objects to dust', 'Tray'],
    directAims: ['Learn proper dusting technique', 'Develop systematic cleaning approach', 'Care for classroom materials'],
    indirectAims: ['Develop attention to detail', 'Build responsibility for environment', 'Prepare for home responsibilities'],
    controlOfError: ['Visible dust removal', 'Clean appearance of objects', 'No streaks or residue'],
    learningProcess: {
      presentation: {
        title: 'Dusting Demonstration',
        description: 'Teacher shows systematic dusting process',
        steps: [
          'Select objects that need dusting',
          'Remove objects carefully to clear surface',
          'Dust surface with systematic motions',
          'Clean each object individually with care',
          'Check for missed areas',
          'Replace objects in original positions',
          'Clean dusting materials',
          'Return materials to storage'
        ],
        keyPoints: ['Work systematically', 'Handle objects with care', 'Check work thoroughly'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Dusting Practice',
        description: 'Child dusts with teacher guidance',
        steps: [
          'Help child select appropriate objects',
          'Guide systematic dusting pattern',
          'Support careful object handling',
          'Encourage thoroughness',
          'Assist with material cleanup'
        ],
        supportStrategies: ['Model systematic approach', 'Verbal cues for thoroughness', 'Praise careful handling'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Dusting',
        description: 'Child dusts areas independently',
        indicators: ['Chooses dusting work spontaneously', 'Works systematically', 'Handles materials carefully'],
        troubleshooting: ['If missing areas: demonstrate systematic pattern', 'If rough handling: emphasize care'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Dusting Mastery',
        description: 'Expert care of environment through dusting',
        assessmentCriteria: ['Notices areas needing dusting', 'Works thoroughly and carefully', 'Takes pride in clean environment'],
        indicators: ['Dusts without being asked', 'Helps maintain classroom cleanliness', 'Shows others proper technique']
      },
      extensions: {
        title: 'Advanced Cleaning Skills',
        description: 'Expanded environmental care activities',
        activities: ['Different dusting tools', 'Delicate object care', 'Systematic room cleaning'],
        variations: ['High and low surface dusting', 'Electronic equipment care', 'Plant leaf dusting']
      }
    }
  },

  'washing-tables': {
    id: 'washing-tables',
    title: 'Washing Tables',
    description: 'Clean table surfaces thoroughly using systematic washing technique',
    purpose: 'Maintain clean learning environment and develop work responsibility',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🪑',
    image: plWashingTables,
    materials: ['Basin with soapy water', 'Sponge', 'Dry cloths', 'Apron', 'Bucket for dirty water'],
    directAims: ['Learn table washing technique', 'Develop systematic cleaning approach', 'Maintain clean workspace'],
    indirectAims: ['Build responsibility for shared spaces', 'Develop work completion skills', 'Prepare for household tasks'],
    controlOfError: ['Clean, streak-free surface', 'Dry table surface', 'No soap residue remaining'],
    learningProcess: {
      presentation: {
        title: 'Table Washing Demonstration',
        description: 'Complete table cleaning process demonstration',
        steps: [
          'Clear table surface completely',
          'Put on apron to protect clothing',
          'Wet sponge in soapy water',
          'Wring out excess water from sponge',
          'Wash table in systematic pattern (left to right)',
          'Rinse sponge and rewash if needed',
          'Dry table thoroughly with clean cloth',
          'Clean and store all materials',
          'Check table is completely clean and dry'
        ],
        keyPoints: ['Work systematically across surface', 'Wring sponge properly', 'Dry thoroughly to prevent streaks'],
        duration: '12-18 minutes'
      },
      guidedPractice: {
        title: 'Supported Table Washing',
        description: 'Child washes tables with teacher support',
        steps: [
          'Help child organize materials',
          'Guide systematic washing pattern',
          'Support proper sponge wringing',
          'Encourage thorough drying',
          'Assist with material cleanup'
        ],
        supportStrategies: ['Demonstrate washing pattern', 'Help with water control', 'Praise systematic approach'],
        duration: '15-25 minutes'
      },
      independentPractice: {
        title: 'Independent Table Washing',
        description: 'Child maintains tables independently',
        indicators: ['Organizes materials efficiently', 'Washes systematically', 'Achieves streak-free results'],
        troubleshooting: ['If streaky: check drying technique', 'If too wet: practice sponge wringing'],
        duration: '20-30 minutes'
      },
      mastery: {
        title: 'Table Care Mastery',
        description: 'Expert table and surface maintenance',
        assessmentCriteria: ['Consistently achieves excellent results', 'Notices tables needing cleaning', 'Takes initiative in maintenance'],
        indicators: ['Volunteers for table washing', 'Maintains multiple work surfaces', 'Teaches others proper technique']
      },
      extensions: {
        title: 'Advanced Surface Care',
        description: 'Comprehensive surface cleaning skills',
        activities: ['Different surface types', 'Stain removal techniques', 'Disinfecting procedures'],
        variations: ['Chair washing', 'Shelf cleaning', 'Wall washing']
      }
    }
  },

  'sweeping': {
    id: 'sweeping',
    title: 'Sweeping',
    description: 'Clean floors by sweeping debris into dustpan with proper technique',
    purpose: 'Maintain clean environment and develop gross motor coordination',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🧽',
    image: plSweeping,
    materials: ['Child-sized broom', 'Dustpan', 'Small brush for dustpan edge'],
    directAims: ['Master sweeping technique', 'Develop coordination with tools', 'Maintain floor cleanliness'],
    indirectAims: ['Build responsibility for environment', 'Develop gross motor skills', 'Prepare for household maintenance'],
    controlOfError: ['Visible debris collection', 'Clean floor appearance', 'Effective dustpan use'],
    learningProcess: {
      presentation: {
        title: 'Sweeping Demonstration',
        description: 'Complete floor sweeping process',
        steps: [
          'Assess area needing sweeping',
          'Hold broom with both hands properly',
          'Sweep debris toward center area',
          'Use short, controlled strokes',
          'Gather debris into pile',
          'Position dustpan against pile',
          'Sweep debris into dustpan',
          'Use small brush for dustpan edge if needed',
          'Empty dustpan in appropriate location',
          'Return tools to storage'
        ],
        keyPoints: ['Use both hands on broom', 'Work debris toward center', 'Position dustpan effectively'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Sweeping Practice',
        description: 'Child practices sweeping with assistance',
        steps: [
          'Help child hold broom correctly',
          'Guide effective sweeping motions',
          'Support dustpan positioning',
          'Encourage thorough debris collection',
          'Assist with tool storage'
        ],
        supportStrategies: ['Hand-over-hand for broom technique', 'Visual cues for debris direction', 'Practice dustpan angle'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Sweeping',
        description: 'Child sweeps areas independently',
        indicators: ['Uses broom effectively', 'Collects debris thoroughly', 'Operates dustpan successfully'],
        troubleshooting: ['If debris escaping: check dustpan angle', 'If ineffective sweeping: review technique'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Sweeping Mastery',
        description: 'Expert floor maintenance skills',
        assessmentCriteria: ['Achieves thoroughly clean results', 'Works efficiently with tools', 'Takes initiative in floor care'],
        indicators: ['Sweeps without prompting', 'Maintains classroom floors', 'Helps others with technique']
      },
      extensions: {
        title: 'Advanced Floor Care',
        description: 'Comprehensive floor maintenance skills',
        activities: ['Different broom types', 'Outdoor sweeping', 'Mopping introduction'],
        variations: ['Carpet sweeping', 'Stair sweeping', 'Large area maintenance']
      }
    }
  },

  'plant-care': {
    id: 'plant-care',
    title: 'Plant Care',
    description: 'Water, trim, and care for living plants in the classroom environment',
    purpose: 'Develop responsibility for living things and connection to nature',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Advanced Activities',
    isPremium: false,
    icon: '🪴',
    image: botanyCare,
    materials: ['Watering can', 'Small scissors', 'Spray bottle', 'Soft cloth', 'Saucer for water'],
    directAims: ['Learn plant care routine', 'Develop gentle handling of living things', 'Understand plant needs'],
    indirectAims: ['Foster connection to nature', 'Develop empathy and responsibility', 'Build observation skills'],
    controlOfError: ['Plant health and appearance', 'Soil moisture level', 'Leaf condition'],
    learningProcess: {
      presentation: {
        title: 'Plant Care Demonstration',
        description: 'Complete plant maintenance routine',
        steps: [
          'Observe plant condition carefully',
          'Check soil moisture with finger',
          'Water slowly if soil is dry',
          'Mist leaves gently if appropriate',
          'Remove any dead or yellowing leaves',
          'Wipe dust from leaves with soft cloth',
          'Turn plant for even light exposure',
          'Clean up any spilled water',
          'Return materials to storage'
        ],
        keyPoints: ['Observe before acting', 'Water gently and appropriately', 'Handle plant parts carefully'],
        duration: '15-20 minutes'
      },
      guidedPractice: {
        title: 'Supported Plant Care',
        description: 'Child cares for plants with guidance',
        steps: [
          'Help child observe plant needs',
          'Guide appropriate watering amount',
          'Support gentle leaf cleaning',
          'Encourage careful handling',
          'Assist with cleanup'
        ],
        supportStrategies: ['Model gentle touch', 'Explain plant needs', 'Praise careful observation'],
        duration: '20-25 minutes'
      },
      independentPractice: {
        title: 'Independent Plant Care',
        description: 'Child maintains plants independently',
        indicators: ['Observes plants regularly', 'Provides appropriate care', 'Handles plants gently'],
        troubleshooting: ['If overwatering: teach soil check', 'If rough handling: emphasize gentleness'],
        duration: '20-30 minutes'
      },
      mastery: {
        title: 'Plant Care Mastery',
        description: 'Expert care of living plants',
        assessmentCriteria: ['Maintains healthy plants', 'Notices plant changes', 'Takes responsibility for plant wellness'],
        indicators: ['Cares for plants daily', 'Teaches others about plant needs', 'Advocates for plant welfare']
      },
      extensions: {
        title: 'Advanced Plant Activities',
        description: 'Expanded plant care and gardening',
        activities: ['Repotting plants', 'Growing from seeds', 'Plant propagation'],
        variations: ['Different plant types', 'Outdoor gardening', 'Herb garden maintenance']
      }
    }
  },

  // CONTROL OF MOVEMENT ACTIVITIES
  'walking-the-line': {
    id: 'walking-the-line',
    title: 'Walking the Line',
    description: 'Walk carefully along an elliptical line to develop balance and control',
    purpose: 'Develop balance, coordination, concentration, and body awareness',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '👣',
    image: walkingLine,
    materials: ['Elliptical line marked on floor', 'Optional: objects to carry', 'Music (optional)'],
    directAims: ['Develop balance and coordination', 'Improve posture', 'Control body movement'],
    indirectAims: ['Develop concentration', 'Build self-confidence', 'Prepare body for other activities'],
    controlOfError: ['Staying on the line', 'Maintaining balance', 'Smooth, controlled movement'],
    learningProcess: {
      presentation: {
        title: 'Line Walking Demonstration',
        description: 'Teacher demonstrates careful line walking',
        steps: [
          'Stand at starting point on line',
          'Place one foot carefully on line',
          'Walk slowly placing each foot on line',
          'Maintain upright posture throughout',
          'Keep eyes focused ahead, not down',
          'Walk complete circuit of line',
          'Stop gracefully at starting point',
          'Step off line carefully'
        ],
        keyPoints: ['Move slowly and deliberately', 'Maintain balance and posture', 'Focus attention on movement'],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Line Walking',
        description: 'Child practices with teacher support',
        steps: [
          'Help child find starting position',
          'Encourage slow, careful steps',
          'Support balance if needed',
          'Praise controlled movement',
          'Practice multiple circuits'
        ],
        supportStrategies: ['Physical support initially if needed', 'Verbal cues for pace', 'Celebrate balance achievements'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Line Walking',
        description: 'Child walks line with increasing skill',
        indicators: ['Maintains balance on line', 'Walks at appropriate pace', 'Shows improved body control'],
        troubleshooting: ['If losing balance: practice slower movement', 'If rushing: emphasize controlled pace'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Line Walking Mastery',
        description: 'Expert balance and movement control',
        assessmentCriteria: ['Walks line with perfect balance', 'Maintains graceful posture', 'Shows body awareness and control'],
        indicators: ['Walks line while carrying objects', 'Helps others with balance', 'Demonstrates various walking styles']
      },
      extensions: {
        title: 'Advanced Movement Activities',
        description: 'Complex balance and coordination challenges',
        activities: ['Carrying objects while walking', 'Walking to music', 'Backwards line walking'],
        variations: ['Different walking speeds', 'Heel-to-toe walking', 'Balance beam activities']
      }
    }
  },

  'carrying-objects': {
    id: 'carrying-objects',
    title: 'Carrying Objects',
    description: 'Learn to transport various objects safely and gracefully',
    purpose: 'Develop coordination, spatial awareness, and care for materials',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '📦',
    image: plCarryingObjects,
    materials: ['Various objects of different sizes and weights', 'Trays', 'Baskets', 'Mats'],
    directAims: ['Master safe carrying techniques', 'Develop spatial awareness', 'Build confidence in movement'],
    indirectAims: ['Develop responsibility for materials', 'Build body awareness', 'Prepare for work transport'],
    controlOfError: ['Successful transport without dropping', 'No damage to objects or environment', 'Controlled, graceful movement'],
    learningProcess: {
      presentation: {
        title: 'Object Carrying Demonstration',
        description: 'Teacher shows proper carrying techniques',
        steps: [
          'Assess object size, weight, and fragility',
          'Position body appropriately for lifting',
          'Lift object with proper grip and posture',
          'Hold object securely against body if needed',
          'Walk slowly and deliberately to destination',
          'Place object down gently and precisely',
          'Check object is secure in new position',
          'Return to starting position'
        ],
        keyPoints: ['Assess before lifting', 'Use proper body mechanics', 'Move slowly and carefully'],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Carrying Practice',
        description: 'Child practices with teacher guidance',
        steps: [
          'Help child assess object characteristics',
          'Guide proper lifting technique',
          'Support safe carrying posture',
          'Encourage slow, careful movement',
          'Assist with precise placement'
        ],
        supportStrategies: ['Start with lightweight objects', 'Model proper technique', 'Praise careful handling'],
        duration: '12-18 minutes'
      },
      independentPractice: {
        title: 'Independent Object Carrying',
        description: 'Child transports objects safely alone',
        indicators: ['Assesses objects appropriately', 'Uses proper carrying technique', 'Moves with control and care'],
        troubleshooting: ['If dropping objects: practice with lighter items', 'If moving too fast: emphasize control'],
        duration: '15-25 minutes'
      },
      mastery: {
        title: 'Carrying Mastery',
        description: 'Expert object transportation skills',
        assessmentCriteria: ['Handles various object types skillfully', 'Shows excellent body mechanics', 'Transports materials safely consistently'],
        indicators: ['Helps others with carrying tasks', 'Volunteers for material transport', 'Shows confidence with challenging objects']
      },
      extensions: {
        title: 'Advanced Carrying Skills',
        description: 'Complex transportation challenges',
        activities: ['Multiple object carrying', 'Tray carrying variations', 'Team carrying projects'],
        variations: ['Different object types', 'Obstacle course carrying', 'Distance carrying challenges']
      }
    }
  },

  // GRACE AND COURTESY ACTIVITIES
  'greeting-lesson': {
    id: 'greeting-lesson',
    title: 'Greeting Others',
    description: 'Learn appropriate ways to greet people in various social situations',
    purpose: 'Develop social skills, cultural awareness, and respectful interactions',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '👋',
    image: plGreeting,
    materials: ['None required', 'Optional: cultural greeting examples'],
    directAims: ['Learn greeting protocols', 'Develop social confidence', 'Practice respectful interaction'],
    indirectAims: ['Build community connections', 'Develop cultural awareness', 'Prepare for social situations'],
    controlOfError: ['Positive social responses', 'Appropriate greeting delivery', 'Cultural sensitivity'],
    learningProcess: {
      presentation: {
        title: 'Greeting Demonstration',
        description: 'Teacher models appropriate greetings',
        steps: [
          'Approach person at appropriate distance',
          'Make eye contact respectfully',
          'Offer appropriate greeting for situation',
          'Use clear, friendly voice',
          'Listen for response',
          'Respond appropriately to their greeting',
          'Maintain respectful body language',
          'Conclude interaction gracefully'
        ],
        keyPoints: ['Maintain appropriate distance', 'Use eye contact respectfully', 'Match greeting to situation'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Greeting Practice',
        description: 'Child practices greetings with support',
        steps: [
          'Set up practice scenarios',
          'Guide appropriate approach distance',
          'Support eye contact and voice use',
          'Encourage appropriate responses',
          'Practice various greeting types'
        ],
        supportStrategies: ['Role-play different scenarios', 'Model appropriate responses', 'Praise social efforts'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Greeting',
        description: 'Child greets others independently',
        indicators: ['Initiates greetings appropriately', "Responds well to others' greetings", 'Shows cultural sensitivity'],
        troubleshooting: ['If too shy: practice with familiar people first', 'If too bold: discuss appropriate boundaries'],
        duration: 'Ongoing throughout day'
      },
      mastery: {
        title: 'Greeting Mastery',
        description: 'Expert social greeting skills',
        assessmentCriteria: ['Greets appropriately in all contexts', 'Shows cultural sensitivity', 'Helps others with social skills'],
        indicators: ['Welcomed by community members', 'Helps shy children with greetings', 'Shows social leadership']
      },
      extensions: {
        title: 'Advanced Social Skills',
        description: 'Complex social interaction skills',
        activities: ['Cultural greeting variations', 'Formal vs informal greetings', 'Group greeting situations'],
        variations: ['Different age group interactions', 'Professional greetings', 'Family vs school greetings']
      }
    }
  },

  'saying-excuse-me': {
    id: 'saying-excuse-me',
    title: 'Saying "Excuse Me"',
    description: 'Learn when and how to use "excuse me" in various social situations',
    purpose: 'Develop polite interaction skills and social awareness',
    ageRange: '2.5-6 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🙏',
    image: plExcuseMe,
    materials: ['None required'],
    directAims: ['Learn polite interruption techniques', 'Develop social awareness', 'Practice respectful communication'],
    indirectAims: ['Build considerate behavior', 'Develop empathy', 'Prepare for social situations'],
    controlOfError: ['Appropriate timing of phrase', 'Positive social responses', 'Effective communication'],
    learningProcess: {
      presentation: {
        title: 'Excuse Me Demonstration',
        description: 'Teacher shows appropriate use of "excuse me"',
        steps: [
          'Identify situation requiring "excuse me"',
          'Approach person at appropriate time',
          'Wait for natural pause in conversation',
          'Say "excuse me" clearly and politely',
          'Wait for acknowledgment',
          'Make request or statement respectfully',
          'Thank person for their attention',
          'Step away appropriately'
        ],
        keyPoints: ['Wait for appropriate moment', 'Use polite, clear voice', "Respect others' responses"],
duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported "Excuse Me" Practice',
        description: 'Child practices with teacher guidance',
        steps: [
          'Set up practice scenarios',
          'Help child identify appropriate moments',
          'Guide polite approach technique',
          'Support clear communication',
          'Practice various situations'
        ],
        supportStrategies: ['Role-play common scenarios', 'Discuss timing importance', 'Practice voice tone'],
        duration: '12-18 minutes'
      },
      independentPractice: {
        title: 'Independent Polite Interruption',
        description: 'Child uses "excuse me" appropriately',
        indicators: ['Uses phrase at appropriate times', 'Waits for acknowledgment', 'Communicates requests clearly'],
        troubleshooting: ['If interrupting inappropriately: discuss timing', 'If too quiet: practice voice projection'],
        duration: 'Ongoing throughout day'
      },
      mastery: {
        title: 'Polite Communication Mastery',
        description: 'Expert respectful interaction skills',
        assessmentCriteria: ['Uses phrase naturally and appropriately', 'Shows social sensitivity', 'Helps others communicate politely'],
        indicators: ['Teaches phrase to younger children', 'Models polite behavior', 'Shows social leadership']
      },
      extensions: {
        title: 'Advanced Polite Communication',
        description: 'Complex social communication skills',
        activities: ['Different cultural politeness expressions', 'Formal vs informal situations', 'Written polite requests'],
        variations: ['Emergency vs non-emergency situations', 'Group vs individual interactions', 'Phone vs in-person communication']
      }
    }
  },

  'offering-help': {
    id: 'offering-help',
    title: 'Offering Help',
    description: 'Learn to recognize when others need help and offer assistance appropriately',
    purpose: 'Develop empathy, community spirit, and helpful behavior',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🤝',
    image: plOfferingHelp,
    materials: ['None required'],
    directAims: ['Learn to offer help appropriately', 'Develop observation skills', 'Practice helpful behavior'],
    indirectAims: ['Build empathy and community spirit', 'Develop social awareness', 'Foster cooperative behavior'],
    controlOfError: ['Positive response to offers', 'Successful help provided', 'Appropriate timing of offers'],
    learningProcess: {
      presentation: {
        title: 'Help Offering Demonstration',
        description: 'Teacher shows how to offer help appropriately',
        steps: [
          'Observe others to notice potential need for help',
          'Approach person respectfully',
          'Ask "May I help you?" clearly',
          'Listen to their response carefully',
          'If yes, ask "How can I help?"',
          'Provide assistance as requested',
          'Continue until task is complete',
          'Ask if anything else is needed'
        ],
        keyPoints: ['Observe before offering', 'Ask permission first', 'Follow their lead on how to help'],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Help Offering',
        description: 'Child practices offering help with guidance',
        steps: [
          'Help child notice help opportunities',
          'Guide appropriate approach',
          'Support polite questioning',
          'Encourage appropriate assistance',
          'Celebrate helpful behavior'
        ],
        supportStrategies: ['Point out help opportunities', 'Model appropriate offers', 'Praise helpfulness'],
        duration: '15-20 minutes'
      },
      independentPractice: {
        title: 'Independent Help Offering',
        description: 'Child offers help spontaneously',
        indicators: ['Notices when others need help', 'Offers assistance appropriately', 'Provides effective help'],
        troubleshooting: ['If not noticing needs: practice observation', 'If help unwanted: discuss asking permission'],
        duration: 'Ongoing throughout day'
      },
      mastery: {
        title: 'Helpful Behavior Mastery',
        description: 'Expert community helper',
        assessmentCriteria: ['Consistently notices help opportunities', 'Offers and provides help effectively', 'Inspires others to be helpful'],
        indicators: ['Known as a helpful class member', 'Teaches others to be helpful', 'Takes initiative in community care']
      },
      extensions: {
        title: 'Advanced Community Service',
        description: 'Complex helping and service skills',
        activities: ['Organizing help for others', 'Teaching helping skills', 'Community service projects'],
        variations: ['Different types of assistance', 'Group helping projects', 'Helping in various environments']
      }
    }
  },
  'carrying-a-tray': {
    id: 'carrying-a-tray',
    title: 'Carrying a Tray',
    description: 'Carry a tray with both hands, keeping it level while walking carefully',
    purpose: 'Develop gross motor control, balance, and preparation for carrying materials',
    ageRange: '2-3 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '🍽️',
    image: carryingTray,
    materials: [
      'Small wooden tray',
      'Light object such as a small glass or folded cloth',
      'Clear table space',
    ],
    directAims: ['Learn the correct technique for carrying a tray', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Carrying a Tray Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child and ask them to watch.',
      'Stand behind the tray with feet slightly apart.',
      'Place one hand on each side of the tray.',
      'Lift the tray to waist height, keeping it level.',
      'Walk slowly to the destination, eyes on the tray.',
      'Lower the tray carefully onto the table.',
      'Release hands and return the tray to the shelf.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'carrying-a-chair': {
    id: 'carrying-a-chair',
    title: 'Carrying a Chair',
    description: 'Lift and carry a small chair safely using two hands',
    purpose: 'Develop gross motor coordination, care for furniture, and body control',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '🪑',
    image: carryingChair,
    materials: [
      'Child-sized wooden chair',
      'Clear walking path',
    ],
    directAims: ['Learn the correct technique for carrying a chair', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Carrying a Chair Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to watch.',
      'Stand at the right side of the chair.',
      'Grip the back and side of the chair firmly.',
      'Lift the chair slightly off the ground.',
      'Carry the chair without dragging or bumping.',
      'Place it down gently where needed.',
      'Return the chair to its place the same way.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'rolling-unrolling-mat': {
    id: 'rolling-unrolling-mat',
    title: 'Rolling and Unrolling a Mat',
    description: 'Unroll a work mat to define a workspace and roll it up again when finished',
    purpose: 'Develop bilateral coordination and understanding of personal workspace',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '🧘',
    image: workMat,
    materials: [
      'Small cotton or woven work mat',
      'Floor space or table space',
    ],
    directAims: ['Learn the correct technique for rolling and unrolling a mat', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Rolling and Unrolling a Mat Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the mat area.',
      'Kneel beside the rolled mat.',
      'Hold both ends of the mat.',
      'Unroll it slowly toward you, keeping edges straight.',
      'Smooth the mat flat with both hands.',
      'To roll: grasp the far edge and roll tightly toward you.',
      'Place the rolled mat back in its basket or corner.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'opening-closing-containers': {
    id: 'opening-closing-containers',
    title: 'Opening and Closing Containers',
    description: 'Practice opening and closing lids, boxes, and jars of varying types',
    purpose: 'Develop wrist rotation, fine motor control, and problem-solving',
    ageRange: '2-3.5 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '🫙',
    image: plOpeningContainers,
    materials: [
      'Small basket with assorted containers',
      'Lids that screw, snap or flip',
      'Tray',
    ],
    directAims: ['Learn the correct technique for opening and closing containers', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Opening and Closing Containers Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to a table.',
      'Place the basket of containers on the tray.',
      'Select one container and show how to open it.',
      'Close it slowly and deliberately.',
      'Place the container back in the basket.',
      'Repeat with each type of lid.',
      'Return the tray to the shelf.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'folding-cloths': {
    id: 'folding-cloths',
    title: 'Folding Cloths',
    description: 'Fold small cloths in half and quarters with careful, precise movements',
    purpose: 'Develop hand-eye coordination, sense of order, and preparation for later folding tasks',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '🧻',
    image: foldingCloths,
    materials: [
      'Small cotton cloths',
      'Folding board or table with clear space',
      'Basket',
    ],
    directAims: ['Learn the correct technique for folding cloths', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Folding Cloths Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the table.',
      'Lay the cloth flat, tag side down.',
      'Find the two adjacent corners with both hands.',
      'Fold the cloth in half lengthwise, edges together.',
      'Smooth the fold with fingertips.',
      'Fold in half again or into quarters.',
      'Place the folded cloth in the basket.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'using-tongs': {
    id: 'using-tongs',
    title: 'Using Tongs',
    description: 'Transfer small objects from one container to another using tongs',
    purpose: 'Develop pincer grasp strength, hand-eye coordination, and concentration',
    ageRange: '3-4.5 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '🥢',
    image: transferTools,
    materials: [
      'Small tongs',
      'Two small bowls',
      'Small objects to transfer',
      'Tray',
    ],
    directAims: ['Learn the correct technique for using tongs', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Using Tongs Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the table.',
      'Set one bowl of objects on the left and an empty bowl on the right.',
      'Hold the tongs with thumb and fingers in the loops.',
      'Squeeze to open, grasp one object, lift and transfer.',
      'Release into the right bowl.',
      'Continue until all objects are transferred.',
      'Return objects to the left bowl and replace the tray.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'using-a-sponge': {
    id: 'using-a-sponge',
    title: 'Using a Sponge',
    description: 'Squeeze and wipe with a sponge to absorb water and clean surfaces',
    purpose: 'Develop hand strength, care of environment, and preparation for cleaning tasks',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Beginning Activities',
    isPremium: false,
    icon: '🧽',
    image: plSponge,
    materials: [
      'Small natural sponge',
      'Small bowl of water',
      'Tray with low edges',
      'Cloth for drying',
    ],
    directAims: ['Learn the correct technique for using a sponge', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Using a Sponge Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the table.',
      'Squeeze the sponge dry over the bowl.',
      'Place the sponge flat on the table.',
      'Press it slowly with the whole hand.',
      'Lift and squeeze water back into the bowl.',
      'Repeat until most water is transferred.',
      'Wipe the tray and return materials.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'washing-cloths': {
    id: 'washing-cloths',
    title: 'Washing Cloths',
    description: 'Wash small cloths by hand using soap and water, then wring and hang to dry',
    purpose: 'Develop sequential care of environment skills and understanding of laundering',
    ageRange: '3.5-5 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🧺',
    image: plWashingCloths,
    materials: [
      'Small basin with warm water',
      'Small bar of soap or soap flakes',
      'Clothesline and pegs',
      'Small cloths to wash',
    ],
    directAims: ['Learn the correct technique for washing cloths', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Washing Cloths Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the washing area.',
      'Fill the basin with a little warm water.',
      'Immerse the cloth and squeeze it gently.',
      'Rub soap on the cloth and scrub lightly.',
      'Rinse in clean water.',
      'Squeeze out excess water.',
      'Hang the cloth on the line with a peg.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'preparing-simple-food': {
    id: 'preparing-simple-food',
    title: 'Preparing Simple Food',
    description: 'Prepare a simple food item such as spreading butter or slicing a banana',
    purpose: 'Develop independence, sequencing, and contribution to community life',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🥪',
    image: plSimpleFood,
    materials: [
      'Child-sized cutting board',
      'Small knife or spreader',
      'Small bowl',
      'Simple food such as banana slices or crackers',
    ],
    directAims: ['Learn the correct technique for preparing simple food', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Preparing Simple Food Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to wash hands.',
      'Place food on the cutting board.',
      'Demonstrate safe knife grip and cutting motion.',
      'Cut food into pieces or spread with a small utensil.',
      'Place prepared food into a small bowl.',
      'Offer the food or place it on a serving plate.',
      'Clean up spills and return materials.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'blowing-the-nose': {
    id: 'blowing-the-nose',
    title: 'Blowing the Nose',
    description: 'Learn to blow the nose into a tissue and dispose of it hygienically',
    purpose: 'Develop self-care independence and awareness of personal hygiene',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🤧',
    image: careOfPerson,
    materials: [
      'Box of tissues',
      'Small mirror',
      'Waste bin',
    ],
    directAims: ['Learn the correct technique for blowing the nose', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Blowing the Nose Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child when needed.',
      'Take one tissue from the box.',
      'Hold it to the nose with both hands.',
      'Press one nostril gently and blow through the other.',
      'Repeat with the other nostril.',
      'Dispose of the tissue in the bin.',
      'Wash hands.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'putting-on-apron': {
    id: 'putting-on-apron',
    title: 'Putting On and Removing an Apron',
    description: 'Learn to put on and remove an apron independently before messy work',
    purpose: 'Develop dressing independence and preparation for practical life activities',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '👕',
    image: plApron,
    materials: [
      'Child-sized apron',
      'Mirror',
      'Hook or place to hang apron',
    ],
    directAims: ['Learn the correct technique for putting on and removing an apron', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Putting On and Removing an Apron Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to put on the apron.',
      'Hold the apron by the neck strap.',
      'Place the neck loop over the head.',
      'Reach behind to find the waist ties.',
      'Tie or fasten the waist ties.',
      'Check in the mirror that the apron is straight.',
      'To remove, untie and lift over the head.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'dressing-frame-buckles': {
    id: 'dressing-frame-buckles',
    title: 'Dressing Frame - Buckles',
    description: 'Learn to fasten and unfasten buckles using a wooden dressing frame',
    purpose: 'Develop finger strength, coordination, and independence in dressing',
    ageRange: '3-5 years',
    difficulty: 'Intermediate',
    category: 'Care of Self',
    isPremium: false,
    icon: '🎒',
    image: plFrameBuckles,
    materials: [
      'Wooden dressing frame with buckle strap',
      'Table',
    ],
    directAims: ['Learn the correct technique for dressing frame - buckles', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Dressing Frame - Buckles Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the table.',
      'Place the frame flat in front of the child.',
      'Show how to unfasten the buckle by lifting the metal prong.',
      'Pull the strap free from the buckle.',
      'To fasten: thread the strap through the buckle.',
      'Insert the prong through the correct hole.',
      'Press the buckle closed and check it is secure.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'dressing-frame-bows': {
    id: 'dressing-frame-bows',
    title: 'Dressing Frame - Bows',
    description: 'Master tying a bow using ribbons mounted on a wooden dressing frame',
    purpose: 'Develop complex bilateral coordination and prepare for shoe tying',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Care of Self',
    isPremium: false,
    icon: '🎀',
    image: plFrameBows,
    materials: [
      'Wooden dressing frame with bow ties',
      'Table',
    ],
    directAims: ['Learn the correct technique for dressing frame - bows', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Dressing Frame - Bows Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the table.',
      'Lay the frame flat and untie the bow.',
      'Cross the two lace ends.',
      'Make a loop with one end.',
      'Wrap the other end around the loop.',
      'Pull the second end through to form a second loop.',
      'Tighten the bow and arrange the loops evenly.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'putting-on-a-coat': {
    id: 'putting-on-a-coat',
    title: 'Putting on a Coat',
    description: "Learn the Montessori 'flip' technique to put on a coat independently",
    purpose: 'Develop independence in dressing and problem-solving',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🧥',
    image: puttingOnCoat,
    materials: [
      'Child-sized coat',
      'Low hook',
      'Small bench or floor space',
    ],
    directAims: ['Learn the correct technique for putting on a coat', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Putting on a Coat Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the coat area.',
      'Lay the coat on the floor, opening facing up.',
      'Stand at the head of the coat and place toes against the collar.',
      'Bend down and insert hands into the sleeve openings.',
      'Lift the coat up and over the head in one movement.',
      'Pull the coat down over the shoulders.',
      'Fasten any buttons or zipper from bottom to top.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'preparing-serving-snack': {
    id: 'preparing-serving-snack',
    title: 'Preparing and Serving a Snack',
    description: 'Prepare a simple snack and serve it to oneself or a friend',
    purpose: 'Develop independence, sequencing, and grace in serving others',
    ageRange: '3.5-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Self',
    isPremium: false,
    icon: '🍎',
    image: plSnack,
    materials: [
      'Small tray',
      'Child-sized pitcher',
      'Small cups or plates',
      'Simple snack',
      'Napkins',
    ],
    directAims: ['Learn the correct technique for preparing and serving a snack', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Preparing and Serving a Snack Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the snack area.',
      'Wash hands and put on an apron.',
      'Place snack items on the tray.',
      'Pour drinks carefully into cups.',
      'Arrange plates, napkins and food on the tray.',
      'Carry the tray to the table safely.',
      'Serve each place setting politely.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'watching-without-interrupting': {
    id: 'watching-without-interrupting',
    title: 'Watching Without Interrupting',
    description: "Learn to observe another person's work quietly without disturbing them",
    purpose: "Develop respect for others' concentration and self-control",
    ageRange: '2.5-5 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '👀',
    image: plObserving,
    materials: [
      'Small group of children or two adults for modeling',
      'Quiet observation spot',
    ],
    directAims: ['Learn the correct technique for watching without interrupting', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Watching Without Interrupting Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Gather a small group at circle time.',
      'Explain that sometimes we watch quietly.',
      'Demonstrate one child working while another watches.',
      'Model standing or sitting still with hands to self.',
      'Model returning to own work without speaking.',
      'Invite children to practice in pairs.',
      'Praise calm observation and respect for work.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'waiting-for-a-turn': {
    id: 'waiting-for-a-turn',
    title: 'Waiting for a Turn',
    description: 'Learn to wait patiently until a material or turn becomes available',
    purpose: 'Develop patience, self-regulation, and social awareness',
    ageRange: '2.5-5 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '⏳',
    image: plWaitingTurn,
    materials: [
      'Small object or activity that only one child can use',
      'Visual waiting spot',
    ],
    directAims: ['Learn the correct technique for waiting for a turn', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Waiting for a Turn Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Introduce the activity at circle time.',
      'Explain that only one child may use it at a time.',
      'Demonstrate placing a hand on the waiting spot.',
      'Model calm waiting and looking at the activity.',
      'When the turn comes, use the activity carefully.',
      'Return it and thank the child who was using it.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'saying-please-thank-you': {
    id: 'saying-please-thank-you',
    title: 'Saying "Please" and "Thank You"',
    description: 'Practice using polite words when making requests and receiving help',
    purpose: 'Develop courteous speech and social awareness',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🙏',
    image: plPleaseThankYou,
    materials: [
      'Small objects to pass',
      'Model phrases',
      'Calm environment',
    ],
    directAims: ['Learn the correct technique for saying "please" and "thank you"', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Saying "Please" and "Thank You" Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Gather the children in a circle.',
      'Introduce the words \'please\' and \'thank you\'.',
      'Model asking for an object using \'please\'.',
      'Hand the object and model \'thank you\'.',
      'Invite children to pass the object with the phrases.',
      'Practice during natural moments throughout the day.',
      'Acknowledge polite exchanges gently.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'walking-around-work': {
    id: 'walking-around-work',
    title: "Walking Around Another Child's Work",
    description: 'Learn to walk around a mat or work rather than stepping over it',
    purpose: "Develop respect for others' workspace and spatial awareness",
    ageRange: '2.5-5 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🚶',
    image: walkingLine,
    materials: [
      'Work mat or small rug on the floor',
      'A child working at the mat',
    ],
    directAims: ["Learn the correct technique for walking around another child's work", 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: "Walking Around Another Child's Work Presentation",
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite children to watch.',
      'Show a child working quietly on a mat.',
      'Demonstrate walking slowly around the mat.',
      'Model not stepping on or over the mat.',
      'Explain that the mat protects the work and the worker.',
      'Invite a child to practice walking around the mat.',
      'Thank the child for respecting the workspace.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Walking Around Another Child\'s Work',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'solving-disagreements': {
    id: 'solving-disagreements',
    title: 'Solving Disagreements Respectfully',
    description: 'Learn simple phrases and steps to resolve conflicts calmly with peers',
    purpose: 'Develop emotional regulation, empathy, and communication skills',
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🤝',
    image: plPeaceTable,
    materials: [
      'Peace rose or talking object',
      'Quiet peace table',
      'Optional: picture cards of feelings',
    ],
    directAims: ['Learn the correct technique for solving disagreements respectfully', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Solving Disagreements Respectfully Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'When two children disagree, invite them to the peace table.',
      'One child holds the rose and speaks.',
      'The other listens without interrupting.',
      'The second child takes the rose and responds.',
      'Together they suggest a solution.',
      'Adult guides only if needed.',
      'Children shake hands or agree on next steps.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'cutting-with-scissors': {
    id: 'cutting-with-scissors',
    title: 'Cutting with Scissors',
    description: 'Learn to cut paper along straight and curved lines using child-safe scissors',
    purpose: 'Develop fine motor control, hand strength, and bilateral coordination',
    ageRange: '3-5 years',
    difficulty: 'Intermediate',
    category: 'Advanced Activities',
    isPremium: false,
    icon: '✂️',
    image: cuttingWork,
    materials: [
      'Child-sized scissors with blunt tip',
      'Small paper strips',
      'Tray or basket',
    ],
    directAims: ['Learn the correct technique for cutting with scissors', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Cutting with Scissors Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the table.',
      'Hold scissors with thumb in small loop, fingers in large loop.',
      'Open and close scissors several times.',
      'Hold the paper strip in the non-dominant hand.',
      'Cut the strip into pieces along pre-drawn lines.',
      'Place cut pieces in a small container.',
      'Return scissors and tray to the shelf.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'threading-and-sewing': {
    id: 'threading-and-sewing',
    title: 'Threading and Sewing',
    description: 'Learn to thread a needle and sew a simple running stitch',
    purpose: 'Develop fine motor precision, concentration, and hand-eye coordination',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Advanced Activities',
    isPremium: false,
    icon: '🧵',
    image: threading,
    materials: [
      'Blunt tapestry needle',
      'Yarn or embroidery thread',
      'Cardboard with punched holes or burlap in an embroidery hoop',
      'Small scissors',
    ],
    directAims: ['Learn the correct technique for threading and sewing', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Threading and Sewing Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the table.',
      'Thread the needle and knot the end.',
      'Hold the material with one hand.',
      'Push the needle up through the first hole from underneath.',
      'Pull the yarn through and down into the next hole.',
      'Continue the in-and-out pattern evenly.',
      'Tie off the thread and trim.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'peeling-slicing-food': {
    id: 'peeling-slicing-food',
    title: 'Peeling and Slicing Food',
    description: 'Learn to peel and slice soft fruits and vegetables safely',
    purpose: 'Develop knife skills, independence, and contribution to food preparation',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Advanced Activities',
    isPremium: false,
    icon: '🥕',
    image: plPeelingSlicing,
    materials: [
      'Child-sized cutting board',
      'Small blunt knife or vegetable peeler',
      'Vegetable such as carrot or cucumber',
      'Small bowl for sliced pieces',
    ],
    directAims: ['Learn the correct technique for peeling and slicing food', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Peeling and Slicing Food Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to wash hands and put on an apron.',
      'Place the vegetable on the board.',
      'Hold it firmly with one hand.',
      'Show how to peel away from the body.',
      'Place the peeled vegetable flat and slice downward.',
      'Transfer slices to the bowl.',
      'Clean board and tools, compost scraps.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'baking': {
    id: 'baking',
    title: 'Baking',
    description: 'Follow a simple recipe to measure, mix, and bake a food item',
    purpose: 'Develop sequencing, math concepts, and pride in creating food for others',
    ageRange: '4.5-6 years',
    difficulty: 'Advanced',
    category: 'Advanced Activities',
    isPremium: false,
    icon: '🍞',
    image: plBaking,
    materials: [
      'Child-sized mixing bowls',
      'Measuring cups and spoons',
      'Wooden spoon',
      'Recipe card with pictures',
      'Simple ingredients',
      'Baking tray',
    ],
    directAims: ['Learn the correct technique for baking', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Baking Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child and wash hands.',
      'Read the recipe card together.',
      'Measure each ingredient carefully.',
      'Mix ingredients in order.',
      'Pour or shape dough onto the tray.',
      'Place in oven with adult help.',
      'Clean up and wait for baking to finish.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'planning-serving-meal': {
    id: 'planning-serving-meal',
    title: 'Planning and Serving a Meal',
    description: 'Plan a simple meal, prepare it, and serve it to others graciously',
    purpose: 'Develop executive function, independence, and grace in hospitality',
    ageRange: '5-6 years',
    difficulty: 'Advanced',
    category: 'Advanced Activities',
    isPremium: false,
    icon: '🍲',
    image: plServingMeal,
    materials: [
      'Child-sized pitcher and cups',
      'Small plates and utensils',
      'Napkins',
      'Simple prepared foods',
      'Tray',
    ],
    directAims: ['Learn the correct technique for planning and serving a meal', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Planning and Serving a Meal Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child to the serving area.',
      'Discuss what will be served.',
      'Count out the right number of plates, cups and utensils.',
      'Place food neatly on plates.',
      'Pour drinks carefully.',
      'Carry items to the table safely.',
      'Invite others to the table and serve politely.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
  'full-cleaning-routine': {
    id: 'full-cleaning-routine',
    title: 'Completing a Full Cleaning Routine',
    description: 'Complete a multi-step cleaning routine such as tidying and cleaning a full work area',
    purpose: 'Develop sustained concentration, sequencing, and responsibility for environment',
    ageRange: '5-6 years',
    difficulty: 'Advanced',
    category: 'Advanced Activities',
    isPremium: false,
    icon: '🧹',
    image: plCleaningRoutine,
    materials: [
      'Child-sized broom, dustpan and mop',
      'Spray bottle',
      'Cloths',
      'Bucket',
      'Tray for supplies',
    ],
    directAims: ['Learn the correct technique for completing a full cleaning routine', 'Develop fine and gross motor control', 'Build independence'],
    indirectAims: ['Develop concentration', 'Build confidence and self-esteem', 'Prepare for more complex practical life work'],
    controlOfError: ['Visual and physical feedback from the materials', 'Teacher observation and gentle guidance'],
    learningProcess: {
      presentation: {
        title: 'Completing a Full Cleaning Routine Presentation',
        description: 'Teacher demonstrates the activity slowly and precisely, isolating each movement',
        steps: [
      'Invite the child when a spill or mess occurs.',
      'Identify what needs cleaning.',
      'Gather the right tools on a tray.',
      'Sweep or wipe the area methodically.',
      'Put dirty cloths or water in the right place.',
      'Return tools to their shelf.',
      'Check that the area is clean and dry.',
    ],
        keyPoints: ['Move slowly and deliberately', 'Isolate the difficulty', 'Model care and respect for materials'],
        duration: '5-10 minutes'
      },
      guidedPractice: {
        title: 'Guided Practice',
        description: 'Child practices with teacher support as needed',
        steps: [
          'Invite the child to try the activity',
          'Offer gentle guidance only when necessary',
          'Encourage slow, careful movements',
          'Support the child in completing the sequence'
        ],
        supportStrategies: ['Hand-over-hand guidance if needed', 'Verbal cues rather than physical correction', 'Positive, specific encouragement'],
        duration: '10-15 minutes'
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Child repeats the activity independently for mastery',
        indicators: ['Chooses the activity spontaneously', 'Completes the sequence without help', 'Shows concentration and care'],
        troubleshooting: ['If struggling: return to guided practice', 'If rushing: encourage slower, more careful movement'],
        duration: '10-20 minutes'
      },
      mastery: {
        title: 'Mastery',
        description: 'Child demonstrates full competence and confidence',
        assessmentCriteria: ['Completes activity accurately and independently', 'Works with sustained concentration', 'Shows pride in the result'],
        indicators: ['Repeats activity by choice', 'Helps or teaches other children', 'Transfers skill to daily life']
      },
      extensions: {
        title: 'Extensions',
        description: 'Related activities that build on this skill',
        activities: ['Variations using different materials', 'Applying the skill in real-life contexts'],
        variations: ['Increasing complexity gradually', 'Combining with other practical life skills']
      }
    }
  },
};
