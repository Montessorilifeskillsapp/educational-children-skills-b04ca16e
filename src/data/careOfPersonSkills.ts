import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const careOfPersonSkills: Record<string, EnhancedMontessoriSkill> = {
  'hand-washing': {
    id: 'hand-washing',
    title: 'Hand Washing',
    description: 'Master proper handwashing technique for hygiene and health',
    purpose: 'Develop independence in personal hygiene and understanding of cleanliness',
    ageRange: '2-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🧼',
    materials: [
      'Child-sized washbasin',
      'Small pitcher of warm water', 
      'Bar of soap or liquid soap dispenser',
      'Clean towel',
      'Small sponge or washcloth',
      'Apron to protect clothing'
    ],
    materialsPurpose: [
      'Child-sized washbasin: Appropriate size for independence',
      'Small pitcher of warm water: Controlled water amount and temperature',
      'Bar of soap or liquid soap dispenser: Effective cleaning agent',
      'Clean towel: For proper drying and hygiene',
      'Small sponge or washcloth: For gentle cleaning',
      'Apron to protect clothing: Maintains cleanliness during activity'
    ],
    directAims: [
      'Learn proper handwashing sequence',
      'Develop independence in hygiene',
      'Understand cleanliness importance'
    ],
    indirectAims: [
      'Build self-care habits',
      'Develop fine motor coordination',
      'Foster health awareness',
      'Prepare for food preparation activities'
    ],
    controlOfError: [
      'Visual check for soap lather',
      'Feel of clean vs dirty hands',
      'Mirror feedback for technique',
      'Adult guidance and modeling'
    ],
    learningProcess: {
      presentation: {
        title: 'Handwashing Demonstration',
        description: 'Complete handwashing sequence emphasizing independence, thoroughness, and hygiene for developing gross motor, fine motor, and sequencing skills',
        steps: [
          'Purpose: I am learning to wash my hands to keep them clean and healthy, developing my independence and motor skills',
          'I gather my supplies: a basin, a jug of water, soap, and towels',
          'I roll up my sleeves to keep them dry',
          'I carefully pour water from the jug into the basin',
          'I wet my hands thoroughly by scooping water and pouring it over my palms and the backs of my hands',
          'I apply soap to my hands and create a lather',
          'I wash the palms, the backs of my hands, and between my fingers',
          'I gently rotate my thumb with the opposite hand, and do the same for my wrists and fingertips',
          'I scrub for at least 20 seconds, or long enough to sing "Happy Birthday" twice in my head',
          'I hold my hands with fingertips pointing down',
          'I rinse all the soap off by scooping water over my hands until no bubbles remain',
          'I gently shake my hands and then dry them thoroughly with a clean towel',
          'I use the towel to turn off the tap if I am at a sink',
          'I empty the basin into a bucket or sink',
          'I clean and dry the basin and place all supplies back in their designated spots'
        ],
        keyPoints: [
          'Use gentle, thorough movements',
          'Wash all surfaces of hands',
          'Rinse completely to remove soap',
          'Dry thoroughly to prevent germs'
        ],
        duration: '5-8 minutes'
      },
      guidedPractice: {
        title: 'Supported Handwashing',
        description: 'Child practices with teacher guidance and support',
        steps: [
          'Help child put on apron properly',
          'Guide water pouring and temperature checking',
          'Assist with soap application and lathering',
          'Encourage thorough washing of all hand surfaces',
          'Support proper rinsing and drying technique'
        ],
        supportStrategies: [
          'Use songs or counting for washing duration',
          'Hand-over-hand guidance for thoroughness',
          'Visual reminders about hand areas to wash',
          'Positive reinforcement for effort'
        ],
        duration: '8-12 minutes per session'
      },
      independentPractice: {
        title: 'Independent Handwashing',
        description: 'Child performs handwashing independently',
        indicators: [
          'Completes sequence without reminders',
          'Washes all hand surfaces thoroughly',
          'Uses appropriate amount of soap and water',
          'Cleans workspace independently'
        ],
        troubleshooting: [
          'If rushing: use timer or washing songs',
          'If missing areas: use visual hand diagram',
          'If using too much soap: demonstrate proper amount',
          'If avoiding cleanup: model and encourage'
        ],
        duration: '5-8 minutes per session'
      },
      mastery: {
        title: 'Hygiene Independence',
        description: 'Child demonstrates complete competence in handwashing',
        assessmentCriteria: [
          'Washes hands at appropriate times without reminders',
          'Uses proper technique consistently',
          'Maintains clean hands throughout day',
          'Helps teach others handwashing'
        ],
        indicators: [
          'Initiates handwashing before meals',
          'Washes after using bathroom independently',
          'Recognizes need for handwashing',
          'Shows pride in clean hands'
        ]
      },
      extensions: {
        title: 'Hygiene Awareness Extensions',
        description: 'Advanced activities to reinforce hygiene concepts',
        activities: [
          'Germ awareness experiments',
          'Teaching handwashing to dolls',
          'Creating hygiene reminder charts',
          'Learning about different soaps'
        ],
        variations: [
          'Handwashing in different settings',
          'Cultural handwashing practices',
          'Seasonal hygiene considerations',
          'Community health awareness'
        ]
      }
    }
  },
  
  'dressing-frames': {
    id: 'dressing-frames',
    title: 'Dressing Frames Practice',
    description: 'Practice buttons, zippers, snaps, and other clothing fasteners',
    purpose: 'Develop fine motor skills and independence in dressing',
    ageRange: '3-5 years',
    difficulty: 'Intermediate',
    category: 'Care of Self',
    isPremium: false,
    icon: '👕',
    materials: [
      'Button frame',
      'Zipper frame', 
      'Snap frame',
      'Velcro frame',
      'Buckle frame',
      'Lacing frame'
    ],
    materialsPurpose: [
      'Button frame: Practice buttoning and unbuttoning motions',
      'Zipper frame: Develop zipper manipulation skills',
      'Snap frame: Learn snapping and unsnapping technique',
      'Velcro frame: Practice pulling apart and pressing together',
      'Buckle frame: Master buckling and unbuckling',
      'Lacing frame: Develop lacing and tying skills'
    ],
    directAims: [
      'Master various fastening techniques',
      'Develop fine motor precision',
      'Build dressing independence'
    ],
    indirectAims: [
      'Enhance bilateral coordination',
      'Develop concentration and patience',
      'Prepare for real clothing management',
      'Build confidence in self-care'
    ],
    controlOfError: [
      'Visual alignment of fasteners',
      'Tactile feedback from mechanisms',
      'Complete closure indicates success',
      'Frame design guides proper technique'
    ],
    learningProcess: {
      presentation: {
        title: 'Dressing Frame Demonstration',
        description: 'Teacher demonstrates proper technique for each frame type',
        steps: [
          'Choose appropriate frame for child\'s skill level',
          'Place frame flat on table at comfortable height',
          'Demonstrate opening fasteners slowly and deliberately',
          'Show proper finger positioning and movements',
          'Practice specific fastening motion repeatedly',
          'Close all fasteners completely and check alignment',
          'Return frame to designated shelf location'
        ],
        keyPoints: [
          'Move slowly to show each step clearly',
          'Use proper finger positioning',
          'Maintain frame stability during use',
          'Check completion before finishing'
        ],
        duration: '8-12 minutes'
      },
      guidedPractice: {
        title: 'Supported Dressing Frame Practice',
        description: 'Child practices with teacher guidance and support',
        steps: [
          'Help child select appropriate frame',
          'Guide proper frame positioning',
          'Support finger placement for fasteners',
          'Encourage slow, deliberate movements',
          'Assist with completion checking'
        ],
        supportStrategies: [
          'Hand-over-hand guidance for complex motions',
          'Break down movements into smaller steps',
          'Use verbal cues for sequencing',
          'Provide encouragement for persistence'
        ],
        duration: '12-18 minutes per session'
      },
      independentPractice: {
        title: 'Independent Dressing Frame Work',
        description: 'Child uses frames independently with increasing skill',
        indicators: [
          'Selects and positions frame independently',
          'Completes fastening sequence without help',
          'Shows improvement in speed and accuracy',
          'Returns materials properly after use'
        ],
        troubleshooting: [
          'If struggling with buttons: start with larger buttons',
          'If zipper sticks: check alignment and guide gently',
          'If losing patience: break into shorter sessions',
          'If avoiding practice: make it a choice activity'
        ],
        duration: '15-25 minutes per session'
      },
      mastery: {
        title: 'Fastening Mastery',
        description: 'Child demonstrates competence across all frame types',
        assessmentCriteria: [
          'Uses all frame types with confidence',
          'Applies skills to real clothing',
          'Shows pride in dressing independence',
          'Helps others with fastening skills'
        ],
        indicators: [
          'Dresses and undresses independently',
          'Chooses challenging frames willingly',
          'Demonstrates techniques to peers',
          'Shows creativity in practice variations'
        ]
      },
      extensions: {
        title: 'Advanced Dressing Skills',
        description: 'Extension activities to enhance dressing competence',
        activities: [
          'Practice on real clothing items',
          'Help younger children with frames',
          'Create fastening sequences or patterns',
          'Explore different types of fasteners in environment'
        ],
        variations: [
          'Timed fastening challenges',
          'Blindfolded fastening practice',
          'Teaching fastening to dolls',
          'Creating new fastening combinations'
        ]
      }
    }
  },

  'brushing-teeth': {
    id: 'brushing-teeth',
    title: 'Brushing Teeth',
    description: 'Learn proper dental hygiene habits',
    purpose: 'Establish independence in oral hygiene and health awareness',
    ageRange: '2-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: false,
    icon: '🦷',
    materials: [
      'Child-sized toothbrush',
      'Child-safe toothpaste',
      'Small cup for water',
      'Mirror at child height',
      'Small towel'
    ],
    materialsPurpose: [
      'Child-sized toothbrush: Proper fit for small hands and mouth',
      'Child-safe toothpaste: Age-appropriate fluoride content',
      'Small cup for water: Controlled rinsing amount',
      'Mirror at child height: Visual feedback for technique',
      'Small towel: Cleanup and mouth drying'
    ],
    directAims: [
      'Learn proper brushing technique',
      'Develop oral hygiene routine',
      'Build dental care independence'
    ],
    indirectAims: [
      'Foster health awareness',
      'Develop fine motor coordination',
      'Build daily routine habits',
      'Prepare for advanced self-care'
    ],
    controlOfError: [
      'Mirror provides visual feedback',
      'Taste of clean teeth',
      'Timer for proper duration',
      'Adult supervision and guidance'
    ],
    learningProcess: {
      presentation: {
        title: 'Tooth Brushing Demonstration',
        description: 'Teacher shows complete tooth brushing routine',
        steps: [
          'Wet toothbrush with small amount of water',
          'Apply pea-sized amount of toothpaste',
          'Brush front teeth using circular motions',
          'Brush back teeth carefully and thoroughly',
          'Brush tongue gently to remove bacteria',
          'Rinse mouth thoroughly with water',
          'Clean toothbrush and store properly'
        ],
        keyPoints: [
          'Use gentle circular motions',
          'Brush for full 2 minutes',
          'Include all tooth surfaces',
          'Don\'t forget tongue and gums'
        ],
        duration: '6-10 minutes'
      },
      guidedPractice: {
        title: 'Supported Tooth Brushing',
        description: 'Child practices with teacher guidance',
        steps: [
          'Help child hold toothbrush correctly',
          'Guide toothpaste application',
          'Support proper brushing motions',
          'Encourage thorough coverage of all teeth',
          'Assist with rinsing and cleanup'
        ],
        supportStrategies: [
          'Use brushing songs for timing',
          'Hand-over-hand guidance for technique',
          'Visual tooth chart for reference',
          'Positive reinforcement for effort'
        ],
        duration: '8-12 minutes per session'
      },
      independentPractice: {
        title: 'Independent Tooth Brushing',
        description: 'Child brushes teeth without assistance',
        indicators: [
          'Completes routine without reminders',
          'Uses proper brushing technique',
          'Brushes for appropriate duration',
          'Maintains clean toothbrush and area'
        ],
        troubleshooting: [
          'If rushing: use timer or counting',
          'If missing areas: use visual guides',
          'If avoiding: make routine enjoyable',
          'If technique poor: return to guided practice'
        ],
        duration: '5-8 minutes per session'
      },
      mastery: {
        title: 'Oral Hygiene Independence',
        description: 'Child demonstrates complete dental care competence',
        assessmentCriteria: [
          'Brushes teeth twice daily without reminders',
          'Shows understanding of oral health importance',
          'Maintains consistently clean teeth',
          'Takes responsibility for dental appointments'
        ],
        indicators: [
          'Initiates brushing routine independently',
          'Shows pride in clean teeth',
          'Reminds others about tooth brushing',
          'Asks questions about dental health'
        ]
      },
      extensions: {
        title: 'Advanced Oral Care',
        description: 'Extension activities to enhance dental awareness',
        activities: [
          'Learning about dental tools and checkups',
          'Brushing stuffed animal teeth',
          'Exploring tooth-healthy vs unhealthy foods',
          'Creating tooth brushing reminder charts'
        ],
        variations: [
          'Different brushing techniques',
          'Electric vs manual toothbrush comparison',
          'Flossing introduction (age appropriate)',
          'Cultural dental care practices'
        ]
      }
    }
  },

  'nose-blowing': {
    id: 'nose-blowing',
    title: 'Blowing Nose',
    description: 'Learn proper technique for nose care',
    purpose: 'Develop hygiene awareness and independence in self-care',
    ageRange: '3-5 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: true,
    icon: '🤧',
    materials: [
      'Soft tissues',
      'Tissue disposal container',
      'Hand sanitizer or access to handwashing'
    ],
    materialsPurpose: [
      'Soft tissues: Gentle on sensitive nose area',
      'Tissue disposal container: Proper hygiene disposal',
      'Hand sanitizer or access to handwashing: Prevent germ spread'
    ],
    directAims: [
      'Learn proper nose blowing technique',
      'Develop hygiene awareness',
      'Build self-care independence'
    ],
    indirectAims: [
      'Foster health consciousness',
      'Develop responsibility for cleanliness',
      'Prepare for illness management',
      'Build community health awareness'
    ],
    controlOfError: [
      'Clear nasal passages indicate success',
      'Proper tissue disposal shows understanding',
      'Clean hands after procedure',
      'No spreading of germs to surfaces'
    ],
    learningProcess: {
      presentation: {
        title: 'Nose Blowing Demonstration',
        description: 'Teacher shows proper nose care technique',
        steps: [
          'Take one fresh tissue from box',
          'Hold tissue gently over nose',
          'Close one nostril and blow gently through the other',
          'Switch and repeat with other nostril',
          'Dispose of tissue immediately in container',
          'Wash hands or use sanitizer thoroughly'
        ],
        keyPoints: [
          'Use gentle pressure, not forceful blowing',
          'Always use fresh tissue',
          'Dispose of tissue immediately',
          'Clean hands after each use'
        ],
        duration: '4-6 minutes'
      },
      guidedPractice: {
        title: 'Supported Nose Care',
        description: 'Child practices with guidance and support',
        steps: [
          'Help child select appropriate tissue',
          'Guide gentle blowing technique',
          'Support proper disposal habits',
          'Assist with handwashing routine',
          'Reinforce hygiene importance'
        ],
        supportStrategies: [
          'Model gentle pressure technique',
          'Use visual cues for handwashing',
          'Praise proper hygiene habits',
          'Explain health benefits simply'
        ],
        duration: '5-8 minutes per session'
      },
      independentPractice: {
        title: 'Independent Nose Care',
        description: 'Child manages nose care independently',
        indicators: [
          'Uses tissues appropriately when needed',
          'Blows nose gently without force',
          'Disposes of tissues properly',
          'Washes hands without reminders'
        ],
        troubleshooting: [
          'If blowing too hard: demonstrate gentle pressure',
          'If forgetting disposal: place container nearby',
          'If avoiding handwashing: explain germ spread',
          'If overusing tissues: teach when needed'
        ],
        duration: '3-5 minutes per use'
      },
      mastery: {
        title: 'Hygiene Responsibility',
        description: 'Child demonstrates complete nose care competence',
        assessmentCriteria: [
          'Uses nose care skills appropriately',
          'Shows awareness of when care is needed',
          'Maintains hygiene without reminders',
          'Demonstrates care for community health'
        ],
        indicators: [
          'Manages nose care discreetly and appropriately',
          'Reminds others about proper hygiene',
          'Shows understanding of illness prevention',
          'Takes responsibility for personal health'
        ]
      },
      extensions: {
        title: 'Health Awareness Extensions',
        description: 'Activities to enhance health and hygiene understanding',
        activities: [
          'Learning about germs and illness prevention',
          'Practicing cough and sneeze etiquette',
          'Understanding when to stay home when sick',
          'Teaching hygiene to younger children'
        ],
        variations: [
          'Different tissue types and their uses',
          'Cultural practices for nose care',
          'Seasonal nose care (allergies, colds)',
          'Community health responsibility'
        ]
      }
    }
  },

  'using-napkin': {
    id: 'using-napkin',
    title: 'Using a Napkin',
    description: 'Practice proper table manners and cleanliness',
    purpose: 'Develop table etiquette and awareness of cleanliness',
    ageRange: '2-4 years',
    difficulty: 'Beginner',
    category: 'Care of Self',
    isPremium: true,
    icon: '🍽️',
    materials: [
      'Cloth or paper napkins',
      'Practice meal setting'
    ],
    materialsPurpose: [
      'Cloth or paper napkins: Maintain cleanliness during meals',
      'Practice meal setting: Realistic environment for learning'
    ],
    directAims: [
      'Learn proper napkin use',
      'Develop table manners',
      'Build mealtime etiquette'
    ],
    indirectAims: [
      'Foster social awareness',
      'Develop fine motor skills',
      'Prepare for formal dining',
      'Build cultural understanding'
    ],
    controlOfError: [
      'Visual check for clean face and hands',
      'Napkin placement indicates understanding',
      'Neat eating area shows success',
      'Social feedback from dining companions'
    ],
    learningProcess: {
      presentation: {
        title: 'Napkin Etiquette Demonstration',
        description: 'Teacher shows proper napkin use during meals',
        steps: [
          'Place napkin on lap before beginning to eat',
          'Use napkin to dab mouth gently when needed',
          'Keep napkin on lap throughout the meal',
          'Use napkin to wipe fingers if necessary',
          'Place napkin beside plate when meal is finished'
        ],
        keyPoints: [
          'Use gentle dabbing motions, not wiping',
          'Keep napkin accessible but out of the way',
          'Use napkin frequently for cleanliness',
          'Proper placement shows meal completion'
        ],
        duration: '8-12 minutes with meal'
      },
      guidedPractice: {
        title: 'Supported Napkin Practice',
        description: 'Child practices napkin use with guidance',
        steps: [
          'Help child place napkin properly',
          'Remind about napkin use during meal',
          'Guide gentle dabbing technique',
          'Support proper meal completion habits',
          'Encourage consistency in practice'
        ],
        supportStrategies: [
          'Visual reminders about napkin placement',
          'Gentle prompts during meals',
          'Model appropriate use throughout meal',
          'Praise good table manners'
        ],
        duration: '10-15 minutes per meal'
      },
      independentPractice: {
        title: 'Independent Table Manners',
        description: 'Child uses napkin appropriately without reminders',
        indicators: [
          'Places napkin on lap automatically',
          'Uses napkin throughout meal as needed',
          'Shows awareness of face and finger cleanliness',
          'Completes napkin etiquette at meal end'
        ],
        troubleshooting: [
          'If forgetting placement: use visual cues',
          'If not using during meal: gentle reminders',
          'If using too much: demonstrate efficiency',
          'If placing incorrectly: re-demonstrate'
        ],
        duration: 'Throughout each meal'
      },
      mastery: {
        title: 'Table Etiquette Mastery',
        description: 'Child demonstrates complete napkin etiquette',
        assessmentCriteria: [
          'Uses napkin appropriately in all dining situations',
          'Shows awareness of cultural dining expectations',
          'Maintains cleanliness throughout meals',
          'Demonstrates etiquette to others'
        ],
        indicators: [
          'Adapts napkin use to different meal settings',
          'Helps others with table manners',
          'Shows pride in proper etiquette',
          'Maintains standards without supervision'
        ]
      },
      extensions: {
        title: 'Advanced Table Etiquette',
        description: 'Activities to enhance dining and social skills',
        activities: [
          'Formal dining practice with multiple courses',
          'Cultural dining etiquette exploration',
          'Teaching table manners to younger children',
          'Special occasion dining preparation'
        ],
        variations: [
          'Different napkin types and their uses',
          'International dining customs',
          'Restaurant etiquette practice',
          'Host/guest responsibilities'
        ]
      }
    }
  },

  'packing-lunch': {
    id: 'packing-lunch',
    title: 'Packing Lunch',
    description: 'Learn to prepare and organize meals independently',
    purpose: 'Develop planning skills, nutrition awareness, and independence',
    ageRange: '4-6 years',
    difficulty: 'Intermediate',
    category: 'Care of Self',
    isPremium: true,
    icon: '🥪',
    materials: [
      'Lunch box or bag',
      'Healthy food options',
      'Napkins',
      'Utensils if needed',
      'Water bottle'
    ],
    materialsPurpose: [
      'Lunch box or bag: Portable meal organization and transport',
      'Healthy food options: Nutritious meal components',
      'Napkins: Cleanliness during eating',
      'Utensils if needed: Proper eating tools',
      'Water bottle: Hydration throughout day'
    ],
    directAims: [
      'Learn meal planning and preparation',
      'Develop nutritional awareness',
      'Build independence in food choices'
    ],
    indirectAims: [
      'Foster responsibility and planning',
      'Develop organizational skills',
      'Build healthy eating habits',
      'Prepare for self-sufficient living'
    ],
    controlOfError: [
      'Complete lunch indicates successful packing',
      'Balanced nutrition shows understanding',
      'Organized lunch box demonstrates skill',
      'Satisfying meal provides feedback'
    ],
    learningProcess: {
      presentation: {
        title: 'Lunch Preparation Demonstration',
        description: 'Teacher shows complete lunch packing process',
        steps: [
          'Choose variety of healthy foods from available options',
          'Pack main food items carefully to prevent damage',
          'Include appropriate napkins and utensils',
          'Add water bottle for proper hydration',
          'Organize items efficiently in lunch container',
          'Close lunch box securely for transport'
        ],
        keyPoints: [
          'Include foods from different nutrition groups',
          'Pack items to maintain freshness',
          'Consider eating order and accessibility',
          'Ensure all necessary items are included'
        ],
        duration: '12-18 minutes'
      },
      guidedPractice: {
        title: 'Supported Lunch Planning',
        description: 'Child practices lunch preparation with guidance',
        steps: [
          'Help child assess available food options',
          'Guide nutritional balance decisions',
          'Support efficient packing techniques',
          'Assist with container organization',
          'Encourage independent decision-making'
        ],
        supportStrategies: [
          'Use visual nutrition guides',
          'Discuss food group representation',
          'Model efficient packing methods',
          'Encourage child preferences within healthy limits'
        ],
        duration: '15-20 minutes per session'
      },
      independentPractice: {
        title: 'Independent Meal Preparation',
        description: 'Child packs lunch independently with increasing skill',
        indicators: [
          'Selects balanced, nutritious food combinations',
          'Packs lunch efficiently and neatly',
          'Includes all necessary items without reminders',
          'Shows pride in meal preparation abilities'
        ],
        troubleshooting: [
          'If choices unbalanced: review nutrition concepts',
          'If packing poorly: demonstrate organization',
          'If forgetting items: use checklist initially',
          'If avoiding vegetables: offer choices within category'
        ],
        duration: '10-15 minutes per session'
      },
      mastery: {
        title: 'Meal Planning Independence',
        description: 'Child demonstrates complete lunch preparation competence',
        assessmentCriteria: [
          'Plans and packs nutritious meals consistently',
          'Shows understanding of nutrition principles',
          'Adapts meal planning to different situations',
          'Takes responsibility for meal preparation'
        ],
        indicators: [
          'Plans meals in advance',
          'Helps with grocery shopping decisions',
          'Teaches lunch packing to others',
          'Shows creativity in meal combinations'
        ]
      },
      extensions: {
        title: 'Advanced Meal Planning',
        description: 'Activities to enhance nutrition and planning skills',
        activities: [
          'Weekly meal planning and shopping lists',
          'Learning about food groups and nutrition',
          'Exploring cultural foods and meal customs',
          'Teaching meal preparation to younger children'
        ],
        variations: [
          'Special dietary needs accommodation',
          'Seasonal food choices and availability',
          'Budget-conscious meal planning',
          'Environmental considerations in food choices'
        ]
      }
    }
  }
};