import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const additionalPracticalLifeSkills: Record<string, EnhancedMontessoriSkill> = {

  'flower-arranging': {
    id: 'flower-arranging',
    title: 'Flower Arranging',
    description: 'Create beautiful flower arrangements while caring for living things',
    purpose: 'Develop aesthetic sense, care for living things, and appreciation of natural beauty',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Environment',
    isPremium: false,
    icon: '🌸',
    shopItems: ['flower-arranging'],
    directAims: [
      'Learn to handle flowers with gentle care',
      'Develop cutting and trimming skills',
      'Create aesthetically pleasing arrangements'
    ],
    indirectAims: [
      'Develop appreciation for natural beauty',
      'Build confidence in creative expression',
      'Prepare for care of living things',
      'Develop color and design awareness'
    ],
    controlOfError: [
      'Flowers that are too long won\'t fit in vase',
      'Cut stems that are too short become obvious',
      'Unbalanced arrangements tip over',
      'Water level shows if more is needed'
    ],
    learningProcess: {
      presentation: {
        title: 'Gentle Flower Arrangement',
        description: 'Teacher demonstrates with reverence for the flowers\' beauty',
        steps: [
          'Invite child: "Would you like to create something beautiful with these flowers?"',
          'Examine flowers together, appreciating their colors and scents',
          'Fill vase about half full with water',
          'Select first flower and measure against vase height',
          'Trim stem at an angle under water if too long',
          'Place flower in vase, turning to find best position',
          'Add remaining flowers one by one',
          'Turn vase to view from all sides',
          'Clean workspace and enjoy the arrangement'
        ],
        keyPoints: [
          'Handle flowers with gentle, respectful touch',
          'Take time to appreciate each flower\'s unique beauty',
          'Consider color and height when arranging',
          'Clean up water spills immediately'
        ],
        duration: '10-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Flower Creating',
        description: 'Child creates arrangements with gentle guidance',
        steps: [
          'Invite child to make their own arrangement',
          'Encourage child to feel and smell the flowers first',
          'Support measuring and cutting with verbal cues',
          'Allow child to make aesthetic choices',
          'Appreciate the child\'s creative decisions',
          'Help child find perfect spot to display arrangement'
        ],
        supportStrategies: [
          'Ask open questions: "How do these colors look together?"',
          'Support cutting hand-over-hand if needed initially',
          'Encourage experimentation: "Try turning it this way"',
          'Celebrate uniqueness: "Your arrangement is special because..."'
        ],
        duration: '15-18 minutes per session'
      },
      independentPractice: {
        title: 'Creative Flower Expression',
        description: 'Child creates arrangements with personal artistic vision',
        indicators: [
          'Child chooses flowers thoughtfully',
          'Uses scissors safely and appropriately',
          'Creates balanced and pleasing arrangements',
          'Shows care for flowers and workspace',
          'Shares arrangements with others proudly'
        ],
        troubleshooting: [
          'If cutting stems too short: demonstrate measuring first',
          'If handling flowers roughly: model gentle touch',
          'If arrangements seem unbalanced: ask child to step back and look',
          'If losing interest: introduce different flower types or colors'
        ],
        duration: '20-25 minutes per session'
      },
      mastery: {
        title: 'Flower Arrangement Artistry',
        description: 'Child demonstrates artistic sense and care for beauty',
        assessmentCriteria: [
          'Creates visually pleasing arrangements consistently',
          'Handles flowers and tools with complete care',
          'Shows personal aesthetic preferences',
          'Cares for arrangements over multiple days'
        ],
        indicators: [
          'Child creates arrangements spontaneously',
          'Teaches others about flower care',
          'Notices and appreciates flowers in environment',
          'Requests to arrange flowers for special occasions'
        ]
      },
      extensions: {
        title: 'Advanced Floral Arts',
        description: 'Complex arrangements and flower care activities',
        activities: [
          'Creating arrangements for different occasions',
          'Learning about flower types and needs',
          'Pressing flowers for art projects',
          'Growing flowers in garden',
          'Making bouquets as gifts'
        ],
        variations: [
          'Seasonal flower arrangements',
          'Mixing flowers with greenery',
          'Different vase shapes and sizes',
          'Wild flower collecting and arranging'
        ]
      }
    },
    videoUrl: '/videos/flower-arranging.mp4',
    imageUrl: '/images/flower-arranging.jpg'
  },

  'polishing-mirror': {
    id: 'polishing-mirror',
    title: 'Polishing Mirror',
    description: 'Clean mirrors to sparkling clarity with careful, controlled movements',
    purpose: 'Develop care of environment, attention to detail, and satisfaction in creating clarity',
    ageRange: '4-6 years',
    difficulty: 'Advanced',
    category: 'Care of Environment',
    isPremium: true,
    icon: '🪞',
    shopItems: ['polishing-set'],
    directAims: [
      'Learn proper mirror cleaning technique',
      'Develop controlled circular motions',
      'Achieve streak-free, clear results'
    ],
    indirectAims: [
      'Develop persistence and attention to quality',
      'Build pride in creating beauty and clarity',
      'Prepare for care of delicate objects',
      'Develop bilateral coordination'
    ],
    controlOfError: [
      'Streaks or spots remain visible on mirror',
      'Water or cleaner drips indicate too much spray',
      'Cloth texture leaves marks if inappropriate',
      'Child can see their reflection clearly when done well'
    ],
    learningProcess: {
      presentation: {
        title: 'Creating Mirror Clarity',
        description: 'Teacher demonstrates with precision and care',
        steps: [
          'Invite child: "Would you like to help this mirror become perfectly clear?"',
          'Place towel under mirror area to catch drips',
          'Examine mirror together, noticing spots or cloudiness',
          'Spray mirror lightly with cleaner (not too much)',
          'Wipe in circular motions, working from top to bottom',
          'Use clean part of cloth for final polishing',
          'Step back to admire the clear, sparkling result',
          'Clean and return materials to tray'
        ],
        keyPoints: [
          'Use minimal amount of cleaner to prevent streaking',
          'Work systematically across entire surface',
          'Apply consistent pressure for even cleaning',
          'Take time to appreciate the transformation'
        ],
        duration: '8-10 minutes'
      },
      guidedPractice: {
        title: 'Supported Mirror Polishing',
        description: 'Child practices with guidance toward perfect clarity',
        steps: [
          'Invite child to try polishing',
          'Help child spray appropriate amount of cleaner',
          'Guide circular motion technique if needed',
          'Encourage child to inspect their work',
          'Help child see and correct any streaks',
          'Celebrate the clarity achieved together'
        ],
        supportStrategies: [
          'Demonstrate hand position for effective wiping',
          'Use verbal cues: "Small circles, light pressure"',
          'Help child notice: "Look how this part sparkles now!"',
          'Adjust amount of cleaner if child uses too much'
        ],
        duration: '12-15 minutes per session'
      },
      independentPractice: {
        title: 'Independent Mirror Care',
        description: 'Child polishes mirrors to professional clarity',
        indicators: [
          'Child chooses activity when mirrors need cleaning',
          'Uses appropriate amount of cleaning solution',
          'Achieves streak-free, clear results',
          'Works systematically across entire surface',
          'Takes pride in sparkling results'
        ],
        troubleshooting: [
          'If streaking occurs: demonstrate using less cleaner',
          'If missing spots: encourage systematic checking',
          'If using too much pressure: model gentle touch',
          'If rushing: emphasize quality over speed'
        ],
        duration: '15-20 minutes per session'
      },
      mastery: {
        title: 'Mirror Polishing Expertise',
        description: 'Child consistently achieves professional-quality results',
        assessmentCriteria: [
          'Achieves perfectly clear, streak-free mirrors',
          'Works efficiently with minimal materials',
          'Shows pride in quality of work',
          'Can teach technique to others'
        ],
        indicators: [
          'Child notices and cleans mirrors throughout environment',
          'Others seek child\'s help with mirror cleaning',
          'Child maintains mirrors in personal spaces',
          'Shows satisfaction in creating clarity and beauty'
        ]
      },
      extensions: {
        title: 'Advanced Reflective Surface Care',
        description: 'Caring for various reflective surfaces and objects',
        activities: [
          'Polishing different types of mirrors',
          'Cleaning glass windows and doors',
          'Caring for reflective decorative objects',
          'Maintaining eyeglasses or magnifying glasses',
          'Teaching others proper technique'
        ],
        variations: [
          'Different sizes and shapes of mirrors',
          'Antique or delicate mirror care',
          'Outdoor reflective surfaces',
          'Car mirrors and windows'
        ]
      }
    },
    videoUrl: '/videos/polishing-mirror.mp4',
    imageUrl: '/images/polishing-mirror.jpg'
  },

  'squeezing-orange-juice': {
    id: 'squeezing-orange-juice',
    title: 'Squeezing Orange Juice',
    description: 'Extract fresh juice from oranges using proper technique and care',
    purpose: 'Develop hand strength, understand food preparation, and experience farm-to-table concepts',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Food Preparation',
    isPremium: false,
    icon: '🍊',
    shopItems: ['food-preparation'],
    directAims: [
      'Learn proper fruit cutting technique',
      'Develop hand strength through squeezing',
      'Experience complete food preparation process'
    ],
    indirectAims: [
      'Understand where food comes from',
      'Develop appreciation for natural flavors',
      'Build independence in food preparation',
      'Strengthen bilateral coordination'
    ],
    controlOfError: [
      'Juice flow indicates effective squeezing technique',
      'Dry pulp shows when orange is fully squeezed',
      'Taste reveals quality of extraction',
      'Amount of juice shows efficiency'
    ],
    learningProcess: {
      presentation: {
        title: 'Fresh Juice Creation',
        description: 'Teacher demonstrates complete process with appreciation for the fruit',
        steps: [
          'Invite child: "Would you like to make fresh orange juice?"',
          'Examine orange together - feel, smell, appreciate',
          'Roll orange on table to soften (optional)',
          'Cut orange in half carefully on cutting board',
          'Show child the inside - seeds, pulp, juice',
          'Place half orange cut-side down on juicer',
          'Twist and press to extract juice',
          'Strain juice if desired',
          'Taste and enjoy the fresh juice together'
        ],
        keyPoints: [
          'Appreciate the orange before transforming it',
          'Use steady, controlled pressure when squeezing',
          'Work over bowl to catch all juice',
          'Clean hands and workspace when finished'
        ],
        duration: '10-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Juice Making',
        description: 'Child creates juice with guidance and encouragement',
        steps: [
          'Invite child to make their own fresh juice',
          'Help child feel orange to assess ripeness',
          'Support safe cutting technique',
          'Guide effective squeezing motion',
          'Encourage child to taste and describe flavors',
          'Help child clean up and store remaining oranges'
        ],
        supportStrategies: [
          'Hand-over-hand support for cutting initially',
          'Demonstrate effective twisting motion on juicer',
          'Encourage experimentation with pressure',
          'Celebrate the accomplishment of fresh juice'
        ],
        duration: '15-18 minutes per session'
      },
      independentPractice: {
        title: 'Independent Juice Production',
        description: 'Child makes juice safely and efficiently',
        indicators: [
          'Child chooses ripe oranges appropriately',
          'Cuts fruit safely with proper technique',
          'Extracts maximum juice efficiently',
          'Cleans workspace thoroughly',
          'Shares juice with others generously'
        ],
        troubleshooting: [
          'If struggling to cut: ensure knife is appropriate and orange is stable',
          'If not getting much juice: demonstrate better squeezing technique',
          'If making mess: provide more towels and model cleanup',
          'If oranges too hard: suggest rolling to soften first'
        ],
        duration: '20-25 minutes per session'
      },
      mastery: {
        title: 'Fresh Juice Expertise',
        description: 'Child demonstrates complete competence in juice making',
        assessmentCriteria: [
          'Consistently produces quality fresh juice',
          'Uses tools safely and effectively',
          'Maintains clean workspace throughout process',
          'Shows understanding of fruit selection'
        ],
        indicators: [
          'Child makes juice for family members',
          'Teaches others the process',
          'Experiments with different citrus fruits',
          'Shows pride in homemade juice quality'
        ]
      },
      extensions: {
        title: 'Advanced Food Preparation',
        description: 'Expanded fruit preparation and juice making activities',
        activities: [
          'Juicing different citrus fruits',
          'Making fruit salads',
          'Learning about fruit growing',
          'Comparing fresh vs. store-bought juice',
          'Teaching juice making to others'
        ],
        variations: [
          'Different juicing methods and tools',
          'Mixing different fruit juices',
          'Making juice for special occasions',
          'Learning about nutrition in fresh fruit'
        ]
      }
    },
    videoUrl: '/videos/squeezing-orange-juice.mp4',
    imageUrl: '/images/squeezing-orange-juice.jpg'
  },

  'brushing-hair': {
    id: 'brushing-hair',
    title: 'Brushing Hair',
    description: 'Learn to care for hair with gentle, proper technique',
    purpose: 'Develop self-care skills, body awareness, and personal hygiene habits',
    ageRange: '3-6 years',
    difficulty: 'Beginner',
    category: 'Care of the Person',
    isPremium: false,
    icon: '🪮',
    shopItems: ['hair-care-set'],
    directAims: [
      'Learn proper brushing technique',
      'Develop gentle, caring touch',
      'Practice using mirror for self-care'
    ],
    indirectAims: [
      'Build independence in personal care',
      'Develop body awareness and coordination',
      'Build confidence in self-presentation',
      'Prepare for caring for others'
    ],
    controlOfError: [
      'Mirror shows if hair looks neat and cared for',
      'Tangles indicate areas needing more attention',
      'Comfort level shows if technique is gentle enough',
      'Smooth brush strokes indicate proper method'
    ],
    learningProcess: {
      presentation: {
        title: 'Gentle Hair Care',
        description: 'Teacher demonstrates with tenderness and respect for the body',
        steps: [
          'Invite child: "Would you like to learn to care for your beautiful hair?"',
          'Place towel around shoulders to protect clothing',
          'Start brushing at the ends of hair, working up',
          'Use gentle strokes, never pulling or forcing',
          'Work through any tangles slowly and carefully',
          'Brush from root to tip once tangles are removed',
          'Use mirror to check all areas are neat',
          'Style hair if desired with ties or clips'
        ],
        keyPoints: [
          'Always be gentle - hair care should never hurt',
          'Work systematically from ends to roots first',
          'Use mirror to see your progress',
          'Take time to appreciate healthy, clean hair'
        ],
        duration: '6-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Hair Brushing',
        description: 'Child practices with guidance toward gentle, effective technique',
        steps: [
          'Invite child to brush their own hair',
          'Help position mirror for best view',
          'Guide gentle technique if child is too rough',
          'Help child work through tangles patiently',
          'Celebrate the neat, cared-for result',
          'Help child clean brush when finished'
        ],
        supportStrategies: [
          'Model gentle pressure: "Light touches, like petting a cat"',
          'Help hold sections of hair to prevent pulling',
          'Use encouraging words: "You\'re being so gentle and careful"',
          'Show how to angle brush to avoid discomfort'
        ],
        duration: '10-12 minutes per session'
      },
      independentPractice: {
        title: 'Independent Hair Care',
        description: 'Child cares for hair independently with confidence',
        indicators: [
          'Child brushes hair without being reminded',
          'Uses appropriate gentleness and care',
          'Works through tangles patiently',
          'Achieves neat, well-groomed appearance',
          'Shows pride in personal appearance'
        ],
        troubleshooting: [
          'If being too rough: remind about gentleness and model',
          'If avoiding tangles: show how to work through them gradually',
          'If rushing: emphasize care over speed',
          'If frustrated: offer help or suggest water for tangles'
        ],
        duration: '8-10 minutes per session'
      },
      mastery: {
        title: 'Hair Care Mastery',
        description: 'Child demonstrates complete independence in hair care',
        assessmentCriteria: [
          'Maintains neat, well-cared-for hair daily',
          'Uses gentle, appropriate technique consistently',
          'Can help others with their hair care',
          'Shows pride and confidence in appearance'
        ],
        indicators: [
          'Child maintains hair care as daily routine',
          'Offers to help brush others\' hair gently',
          'Notices and cares for hair throughout day',
          'Shows increased confidence in self-presentation'
        ]
      },
      extensions: {
        title: 'Advanced Hair Care and Styling',
        description: 'More complex hair care and simple styling activities',
        activities: [
          'Learning different brushing patterns',
          'Simple braiding or ponytails',
          'Caring for different hair types',
          'Learning about hair health and nutrition',
          'Helping family members with hair care'
        ],
        variations: [
          'Different brush types for different hair',
          'Seasonal hair care (sun protection, winter dryness)',
          'Cultural hair care traditions',
          'Special occasion styling'
        ]
      }
    },
    videoUrl: '/videos/brushing-hair.mp4',
    imageUrl: '/images/brushing-hair.jpg'
  },

  'dry-pouring': {
    id: 'dry-pouring',
    title: 'Dry Pouring',
    description: 'Learn precise pouring technique using dry materials with complete control',
    purpose: 'Develop hand-eye coordination, concentration, and controlled movement without the complication of spills',
    ageRange: '2.5-4 years',
    difficulty: 'Beginner',
    category: 'Control of Movement',
    isPremium: false,
    icon: '🌾',
    shopItems: ['dry-pouring-set'],
    directAims: [
      'Develop precise pouring movement',
      'Coordinate both hands in bilateral activity',
      'Practice controlled, deliberate motion'
    ],
    indirectAims: [
      'Prepare for wet pouring activities',
      'Develop concentration and focus',
      'Build confidence through success',
      'Prepare for mathematics through one-to-one correspondence'
    ],
    controlOfError: [
      'Spilled material is visible and audible',
      'Empty source pitcher shows completion',
      'Sound changes as material flows',
      'Visual feedback of material transfer'
    ],
    learningProcess: {
      presentation: {
        title: 'Gentle Introduction to Pouring',
        description: 'Teacher demonstrates with reverence and slow, deliberate movements',
        steps: [
          'Invite child: "Would you like to see how to pour carefully?"',
          'Put on apron together, showing preparation for work',
          'Carry tray with both hands to workspace',
          'Place tray on table, materials arranged left to right',
          'Sit with child to your right (adjust for left-handed children)',
          'Place two fingers of non-dominant hand under spout of full pitcher',
          'Grasp handle of full pitcher with dominant hand',
          'Lift slowly, keeping spout close to receiving pitcher',
          'Pour steadily, watching the stream of material',
          'Stop pouring when source pitcher is empty',
          'Return first pitcher to left side of tray',
          'Repeat process pouring back to original pitcher',
          'Brush any spilled material back into pitcher',
          'Return materials to shelf with same care'
        ],
        keyPoints: [
          'Always place two fingers under the spout for control',
          'Move slowly and deliberately throughout',
          'Keep spout close to receiving vessel',
          'Watch the material, not the child',
          'Clean up immediately shows care for environment'
        ],
        duration: '6-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Pouring Practice',
        description: 'Child practices with gentle guidance and encouragement',
        steps: [
          'Invite child: "Now you may try pouring"',
          'Help child put on apron independently',
          'Guide child to carry tray properly',
          'Remind about two fingers under spout placement',
          'Support proper grip and posture if needed',
          'Encourage slow, controlled movements',
          'Help child clean up any spills without criticism',
          'Celebrate the child\'s concentration and effort'
        ],
        supportStrategies: [
          'Use hand-over-hand guidance for finger placement initially',
          'Verbal cues: "Two fingers under, lift slowly"',
          'Reduce amount of material if child struggles',
          'Model patience: "Take your time, there\'s no hurry"',
          'Focus on process, not perfection'
        ],
        duration: '10-12 minutes per session'
      },
      independentPractice: {
        title: 'Independent Pouring Mastery',
        description: 'Child pours independently with increasing precision',
        indicators: [
          'Child chooses activity spontaneously',
          'Places two fingers under spout automatically',
          'Pours with minimal spilling',
          'Completes full cycles of pouring back and forth',
          'Cleans workspace independently'
        ],
        troubleshooting: [
          'If spilling frequently: reduce material amount, check finger placement',
          'If rushing: remind to enjoy the process, no time pressure',
          'If avoiding cleanup: model and emphasize care for materials',
          'If losing concentration: ensure appropriate material amount'
        ],
        duration: '15-20 minutes per session'
      },
      mastery: {
        title: 'Dry Pouring Expertise',
        description: 'Child demonstrates complete control and understanding',
        assessmentCriteria: [
          'Pours with precision and minimal spilling',
          'Maintains concentration throughout activity',
          'Shows automatic correct finger placement',
          'Demonstrates care for materials and environment'
        ],
        indicators: [
          'Child repeats activity multiple times joyfully',
          'Ready to progress to wet pouring',
          'Shows others the proper technique',
          'Chooses increasingly challenging materials'
        ]
      },
      extensions: {
        title: 'Advanced Dry Pouring',
        description: 'Variations to maintain interest and develop skills',
        activities: [
          'Pouring different sized materials (large beans to small seeds)',
          'Using containers with smaller openings',
          'Pouring into multiple containers',
          'Combining pouring with sorting activities',
          'Using different shaped pitchers'
        ],
        variations: [
          'Outdoor pouring with natural materials',
          'Pouring from height variations',
          'Group pouring activities',
          'Seasonal materials (colored rice, dried corn)'
        ]
      }
    },
    videoUrl: '/videos/dry-pouring.mp4',
    imageUrl: '/images/dry-pouring.jpg'
  },

  'wet-pouring': {
    id: 'wet-pouring',
    title: 'Wet Pouring',
    description: 'Master liquid pouring with precision, control, and grace',
    purpose: 'Develop advanced coordination, prepare for real-life tasks, and experience the satisfaction of mastering a challenging skill',
    ageRange: '3-5 years',
    difficulty: 'Intermediate',
    category: 'Control of Movement',
    isPremium: false,
    icon: '💧',
    shopItems: ['glass-pitcher-set'],
    directAims: [
      'Master liquid pouring technique',
      'Develop precise hand and wrist control',
      'Experience handling real, breakable materials'
    ],
    indirectAims: [
      'Prepare for kitchen and daily life tasks',
      'Develop responsibility and careful handling',
      'Build confidence through mastering difficulty',
      'Prepare for grace and courtesy in serving others'
    ],
    controlOfError: [
      'Water spills are immediately visible',
      'Sound of water shows pouring speed',
      'Water level indicates amount transferred',
      'Wet surfaces show need for cleanup'
    ],
    learningProcess: {
      presentation: {
        title: 'Mastering Liquid Grace',
        description: 'Teacher demonstrates with utmost care and precision',
        steps: [
          'Invite child: "Today you will learn to pour water like an expert"',
          'Put on waterproof apron together with ceremony',
          'Carry tray with both hands, moving slowly and smoothly',
          'Place tray on workspace, arrange materials carefully',
          'Check that towel and sponge are easily accessible',
          'Place two fingers of non-dominant hand firmly under spout',
          'Grasp pitcher handle with confident but gentle grip',
          'Lift pitcher slowly, bringing spout close to receiving pitcher rim',
          'Begin pouring with steady, controlled stream',
          'Watch the water flow, adjusting speed as needed',
          'Stop pouring when desired amount is transferred',
          'Return first pitcher to left side of tray',
          'Immediately clean any drops with sponge',
          'Pour water back to complete the cycle',
          'Dry all surfaces with cloth',
          'Return materials with same careful attention'
        ],
        keyPoints: [
          'Two fingers under spout is essential for control',
          'Spout must be close to receiving vessel',
          'Pour slowly and steadily, never rushing',
          'Clean spills immediately as part of the work',
          'Handle glass pitchers with respect and care'
        ],
        duration: '8-10 minutes'
      },
      guidedPractice: {
        title: 'Supported Liquid Mastery',
        description: 'Child practices with careful guidance and immediate support',
        steps: [
          'Invite child: "Now you will pour the water"',
          'Help child put on apron and check readiness',
          'Support proper carrying of tray',
          'Guide correct finger placement under spout',
          'Help establish proper pitcher grip',
          'Encourage slow lifting and positioning',
          'Support controlled pouring movement',
          'Guide immediate cleanup of any spills',
          'Celebrate successful transfers with quiet joy'
        ],
        supportStrategies: [
          'Stand ready to support pitcher if needed',
          'Use calm, encouraging voice: "Slowly, you have control"',
          'Help position receiving pitcher if child struggles',
          'Model immediate cleanup without criticism',
          'Reduce water amount if spills are frequent'
        ],
        duration: '12-15 minutes per session'
      },
      independentPractice: {
        title: 'Independent Liquid Mastery',
        description: 'Child pours liquids with confidence and precision',
        indicators: [
          'Child chooses activity eagerly and independently',
          'Automatically places two fingers under spout',
          'Pours with steady, controlled stream',
          'Manages spills calmly and completely',
          'Shows pride in handling real, breakable materials'
        ],
        troubleshooting: [
          'If frequent spills: return to dry pouring for more practice',
          'If afraid of glass: reassure and model confident handling',
          'If rushing: emphasize that mastery takes patience',
          'If avoiding cleanup: show that cleanup is part of the beauty'
        ],
        duration: '15-20 minutes per session'
      },
      mastery: {
        title: 'Liquid Pouring Mastery',
        description: 'Child demonstrates expert-level pouring skills',
        assessmentCriteria: [
          'Pours liquids with minimal spilling consistently',
          'Handles glass materials with complete confidence',
          'Integrates cleanup seamlessly into process',
          'Shows readiness to serve others'
        ],
        indicators: [
          'Child offers to pour for others at snack time',
          'Demonstrates technique to younger children',
          'Seeks opportunities to use pouring in other contexts',
          'Shows satisfaction and pride in liquid handling mastery'
        ]
      },
      extensions: {
        title: 'Advanced Liquid Activities',
        description: 'Complex pouring activities and real-life applications',
        activities: [
          'Pouring for tea service or snack preparation',
          'Using different shaped containers and spouts',
          'Pouring measured amounts for cooking activities',
          'Serving water to plants or classroom pets',
          'Teaching pouring technique to younger children'
        ],
        variations: [
          'Different liquid viscosities (water, oil, honey)',
          'Pouring from various heights and angles',
          'Outdoor water play and garden activities',
          'Cultural pouring ceremonies and rituals'
        ]
      }
    },
    videoUrl: '/videos/wet-pouring.mp4',
    imageUrl: '/images/wet-pouring.jpg'
  }
};