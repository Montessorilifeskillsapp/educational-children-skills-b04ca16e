import { EnhancedMontessoriSkill } from '../types/montessoriSkill';

export const graceAndCourtesySkillsComplete: Record<string, EnhancedMontessoriSkill> = {
  'table-manners': {
    id: 'table-manners',
    title: 'Table Manners',
    description: 'Proper behavior and etiquette during meals with grace and consideration',
    purpose: 'Develop mealtime grace, social awareness, and respect for shared dining experiences',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Grace and Courtesy',
    isPremium: true,
    icon: '🍽️',
    materials: ['Complete place setting', 'Cloth napkins', 'Practice foods', 'Child-sized utensils', 'Placemat'],
    materialsPurpose: [
      'Place setting: Real dishes for authentic practice',
      'Cloth napkins: For learning proper napkin use',
      'Practice foods: Safe foods for utensil practice',
      'Child-sized utensils: Appropriate for small hands',
      'Placemat: Guide for proper placement'
    ],
    directAims: [
      'Use utensils correctly and gracefully',
      'Sit properly with good posture',
      'Practice mealtime conversation'
    ],
    indirectAims: [
      'Develop social grace',
      'Build confidence in dining situations',
      'Prepare for community meals',
      'Foster pleasant mealtime atmosphere'
    ],
    controlOfError: [
      'Visual feedback from proper placement',
      'Adult modeling throughout',
      'Natural consequences of technique',
      'Social feedback from dining companions'
    ],
    learningProcess: {
      presentation: {
        title: 'Graceful Dining Demonstration',
        description: 'Teacher models elegant, respectful mealtime behavior',
        steps: [
          'Set table beautifully together, placing items carefully',
          'Approach table calmly and sit with good posture',
          'Place napkin on lap gently',
          'Wait until everyone is seated before beginning',
          'Hold utensils correctly: fork in left hand (or right), knife in right',
          'Cut food into small, manageable pieces',
          'Bring food to mouth (not mouth to plate)',
          'Chew with mouth closed, take time between bites',
          'Place utensils on plate when speaking',
          'Use napkin to dab mouth gently as needed',
          'Finish chewing before speaking',
          'Ask politely for items: "Please pass the water"',
          'When finished: place utensils parallel on plate',
          'Place napkin beside plate (not on it)',
          'Thank host or cook'
        ],
        keyPoints: [
          'Move with grace and deliberation',
          'Never speak with mouth full',
          'Pass items with care',
          'Maintain pleasant conversation'
        ],
        duration: '20-25 minutes'
      },
      guidedPractice: {
        title: 'Supported Dining Practice',
        description: 'Child practices table manners with gentle guidance',
        steps: [
          'Practice table setting together first',
          'Guide proper sitting and napkin placement',
          'Model correct utensil holding',
          'Practice cutting soft foods',
          'Encourage small bites and thorough chewing',
          'Demonstrate polite requesting and passing',
          'Practice pleasant conversation topics',
          'Guide proper completion of meal'
        ],
        supportStrategies: [
          'Start with finger foods, add utensils gradually',
          'Practice with softer, easier foods first',
          'Make mealtimes pleasant and unpressured',
          'Model consistently without criticism'
        ],
        duration: 'Each meal time, 20-30 minutes'
      },
      independentPractice: {
        title: 'Independent Graceful Dining',
        description: 'Child demonstrates table manners naturally',
        indicators: [
          'Uses utensils correctly and gracefully',
          'Maintains good posture throughout meal',
          'Participates in pleasant conversation appropriately',
          'Shows consideration for others at table'
        ],
        troubleshooting: [
          'If slouching: gentle reminder about sitting tall',
          'If speaking with full mouth: pause and wait',
          'If struggling with utensils: return to easier foods',
          'If rushing: model slower, mindful eating'
        ],
        duration: 'Every meal time'
      },
      mastery: {
        title: 'Dining Grace Mastery',
        description: 'Child embodies graceful, considerate dining behavior',
        assessmentCriteria: [
          'Demonstrates proper table manners consistently',
          'Adapts behavior to different dining situations',
          'Makes others comfortable at table',
          'Shows genuine enjoyment of shared meals'
        ],
        indicators: [
          'Models behavior for younger children',
          'Comfortable in various dining settings',
          'Helps set table beautifully',
          'Contributes to pleasant mealtime atmosphere'
        ]
      },
      extensions: {
        title: 'Advanced Dining Etiquette',
        description: 'Complex dining situations and cultural awareness',
        activities: [
          'Formal table setting practice',
          'Different cultural dining customs',
          'Restaurant etiquette',
          'Serving guests properly',
          'Special occasion meals'
        ],
        variations: [
          'Different types of utensils and their uses',
          'Finger foods vs. utensil foods',
          'Buffet etiquette',
          'Cultural meal traditions'
        ]
      }
    }
  },

  'offering-help': {
    id: 'offering-help',
    title: 'Offering Help',
    description: 'Learn to recognize when others need assistance and offer help respectfully',
    purpose: 'Develop empathy, community awareness, and respectful helping skills',
    ageRange: '3-6 years',
    difficulty: 'Intermediate',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🤝',
    materials: ['Scenario cards', 'Practice activities requiring assistance', 'Props for role-play'],
    materialsPurpose: [
      'Scenario cards: Visual guides for helping situations',
      'Practice activities: Real situations for offering help',
      'Role-play props: Items for practicing helping scenarios'
    ],
    directAims: [
      'Recognize when someone might need help',
      'Ask respectfully if help is wanted',
      'Provide appropriate assistance'
    ],
    indirectAims: [
      'Develop empathy and awareness',
      'Build community connection',
      'Understand consent and respect',
      'Foster helpful attitude'
    ],
    controlOfError: [
      'Response from person being helped',
      'Success or struggle of helping attempt',
      'Adult modeling and guidance',
      'Natural social feedback'
    ],
    learningProcess: {
      presentation: {
        title: 'Respectful Helping Demonstration',
        description: 'Teacher models noticing needs and offering help appropriately',
        steps: [
          'Notice someone working or struggling (staged scenario)',
          'Observe for a moment to assess the situation',
          'Approach calmly and respectfully',
          'Make eye contact and speak clearly: "I notice you\'re carrying many things. May I help you?"',
          'Wait for response - respect if they say no',
          'If yes: "How would you like me to help?"',
          'Provide requested help, not more',
          'When finished: "You\'re welcome" if thanked',
          'Demonstrate also: "I can do it myself, but thank you for asking"',
          'Show that asking is helpful even if help is declined'
        ],
        keyPoints: [
          'Observe before offering',
          'Ask, don\'t assume help is wanted',
          'Respect if help is declined',
          'Provide only the help requested'
        ],
        duration: '15-20 minutes'
      },
      guidedPractice: {
        title: 'Supported Helping Practice',
        description: 'Child practices offering and providing help with guidance',
        steps: [
          'Create natural opportunities for helping',
          'Guide child to notice: "Look, do you think Sarah needs help with those blocks?"',
          'Help formulate offer: "How can you ask if she wants help?"',
          'Support respectful approach and clear asking',
          'Guide appropriate helping without taking over',
          'Discuss when help is declined: "That\'s okay, asking was kind"',
          'Practice both offering and declining help'
        ],
        supportStrategies: [
          'Model noticing others\' needs throughout day',
          'Praise thoughtful observations',
          'Discuss why someone might not want help',
          'Practice specific helping phrases'
        ],
        duration: 'Throughout daily activities, 10-15 minutes per practice'
      },
      independentPractice: {
        title: 'Independent Thoughtful Helping',
        description: 'Child offers help appropriately without prompting',
        indicators: [
          'Notices when others might need assistance',
          'Asks respectfully before helping',
          'Accepts gracefully if help is declined',
          'Provides helpful assistance without taking over'
        ],
        troubleshooting: [
          'If forcing help: discuss respecting others\' wishes',
          'If not noticing needs: practice observation games',
          'If hurt when declined: explain it\'s about independence',
          'If taking over: practice letting others lead'
        ],
        duration: 'Throughout the day'
      },
      mastery: {
        title: 'Empathetic Helping Mastery',
        description: 'Child demonstrates mature, respectful helping skills',
        assessmentCriteria: [
          'Consistently notices others\' needs',
          'Offers help respectfully and appropriately',
          'Respects independence and boundaries',
          'Provides effective, considerate assistance'
        ],
        indicators: [
          'Helps without being asked when appropriate',
          'Knows when to offer and when to let be',
          'Models respectful helping for peers',
          'Shows genuine desire to support community'
        ]
      },
      extensions: {
        title: 'Advanced Helping and Community Care',
        description: 'Complex helping situations and community awareness',
        activities: [
          'Identifying different types of help people need',
          'Understanding when NOT to help',
          'Helping with complex tasks requiring coordination',
          'Teaching others skills they want to learn',
          'Community service concepts'
        ],
        variations: [
          'Helping in different settings (home, school, community)',
          'Emotional support vs. physical help',
          'Helping adults respectfully',
          'Cultural perspectives on helping'
        ]
      }
    }
  },

  'walking-indoors': {
    id: 'walking-indoors',
    title: 'Walking Indoors',
    description: 'Practice moving gracefully and quietly indoors with awareness and control',
    purpose: 'Develop body control, spatial awareness, and respect for the peaceful environment',
    ageRange: '2-5 years',
    difficulty: 'Beginner',
    category: 'Grace and Courtesy',
    isPremium: false,
    icon: '🚶',
    materials: ['Tape lines on floor', 'Various objects to carry', 'Bell or fragile items for advanced practice'],
    materialsPurpose: [
      'Tape lines: Guides for controlled walking practice',
      'Objects to carry: Practice balance and care while moving',
      'Bell: Advanced control exercise',
      'Fragile items: Develops extreme care and awareness'
    ],
    directAims: [
      'Walk without running indoors',
      'Move quietly and carefully',
      'Carry objects safely while walking'
    ],
    indirectAims: [
      'Develop balance and coordination',
      'Build self-control and awareness',
      'Respect others\' concentration',
      'Prepare for carrying work materials'
    ],
    controlOfError: [
      'Sound of footsteps reveals control',
      'Bell rings if movement isn\'t smooth',
      'Objects drop if carrying isn\'t careful',
      'Bumping into things shows lack of awareness'
    ],
    learningProcess: {
      presentation: {
        title: 'Graceful Walking Demonstration',
        description: 'Teacher models controlled, aware indoor movement',
        steps: [
          'Stand with good posture, feet together',
          'Begin walking slowly, heel to toe',
          'Keep eyes forward, looking where you\'re going',
          'Walk along the line, placing each foot carefully',
          'Move arms gently, naturally at sides',
          'Walk around others\' work mats without stepping on them',
          'Demonstrate wide arc around someone working',
          'Show careful movement between furniture',
          'Practice carrying a tray while walking the line',
          'Demonstrate quiet, controlled movement throughout'
        ],
        keyPoints: [
          'Heel-to-toe walking for control',
          'Eyes forward, aware of surroundings',
          'Move smoothly without rushing',
          'Respect others\' work space'
        ],
        duration: '10-15 minutes'
      },
      guidedPractice: {
        title: 'Supported Walking Practice',
        description: 'Child practices controlled indoor walking with guidance',
        steps: [
          'Invite child to walk the line',
          'Guide posture and initial position',
          'Encourage slow, controlled steps',
          'Practice walking around obstacles',
          'Add carrying simple objects',
          'Guide movement around work areas',
          'Practice quiet footsteps',
          'Gradually increase complexity of carried items'
        ],
        supportStrategies: [
          'Walk behind child initially for support',
          'Use music for rhythm and pacing',
          'Praise controlled, graceful movement',
          'Make game of carrying increasingly delicate items'
        ],
        duration: '15-20 minutes per session'
      },
      independentPractice: {
        title: 'Independent Graceful Movement',
        description: 'Child moves through environment with grace and awareness',
        indicators: [
          'Walks without running throughout the day',
          'Moves quietly without disturbing others',
          'Carries materials carefully and safely',
          'Shows awareness of others\' work spaces'
        ],
        troubleshooting: [
          'If running: gently redirect to walking',
          'If loud footsteps: practice softer steps',
          'If bumping into things: practice spatial awareness games',
          'If disturbing others: review respectful movement'
        ],
        duration: 'Throughout the day'
      },
      mastery: {
        title: 'Movement Grace Mastery',
        description: 'Child embodies graceful, aware movement at all times',
        assessmentCriteria: [
          'Moves gracefully without reminders',
          'Naturally avoids disturbing others',
          'Carries even delicate items safely',
          'Shows complete body control and awareness'
        ],
        indicators: [
          'Models graceful movement for younger children',
          'Can carry water without spilling',
          'Walks with bell without ringing it',
          'Shows pride in controlled movement'
        ]
      },
      extensions: {
        title: 'Advanced Movement and Control',
        description: 'Complex movement challenges and applications',
        activities: [
          'Walking with glass of water without spilling',
          'Carrying bell without ringing',
          'Walking on raised line (balance beam)',
          'Carrying multiple or heavy items',
          'Moving chairs and furniture quietly'
        ],
        variations: [
          'Walking on different surfaces',
          'Moving through crowded spaces',
          'Walking backward along line',
          'Cultural walking and movement styles'
        ]
      }
    }
  }
};

export default graceAndCourtesySkillsComplete;
