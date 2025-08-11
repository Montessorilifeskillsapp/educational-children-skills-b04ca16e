import { graceAndCourtesySkillsComplete } from './graceAndCourtesySkillsComplete';

export const graceAndCourtesySkills = {
  'greeting-others': {
    id: 'greeting-others',
    title: 'Greeting Others',
    description: 'Learn proper ways to greet friends, family, and teachers',
    ageRange: '2-6 years',
    duration: '10-15 minutes',
    materials: ['Mirror', 'Practice cards'],
    isPremium: false,
    category: 'grace-courtesy',
    objectives: [
      'Practice saying hello and goodbye',
      'Learn appropriate greetings for different times of day',
      'Understand eye contact and smiling'
    ],
    instructions: [
      'Stand in front of a mirror and practice different greetings',
      'Practice saying "Good morning," "Good afternoon," and "Good evening"',
      'Make eye contact and smile when greeting others',
      'Practice handshakes and waves appropriately'
    ],
    tips: [
      'Model appropriate greetings throughout the day',
      'Encourage children to greet visitors and guests',
      'Practice greetings in different languages for cultural awareness'
    ]
  },
  'saying-please-thank-you': {
    id: 'saying-please-thank-you',
    title: 'Saying Please and Thank You',
    description: 'Practice using polite words in daily interactions',
    ageRange: '2-6 years',
    duration: '10-15 minutes',
    materials: ['Role-play scenarios', 'Picture cards'],
    isPremium: false,
    category: 'grace-courtesy',
    objectives: [
      'Use "please" when asking for something',
      'Say "thank you" when receiving help',
      'Understand when to use polite words'
    ],
    instructions: [
      'Practice asking for items using "please"',
      'Role-play scenarios where thank you is appropriate',
      'Use picture cards to identify polite situations',
      'Practice with real-life situations during snack time'
    ],
    tips: [
      'Model polite language consistently',
      'Gently remind children when they forget',
      'Praise children when they use polite words naturally'
    ]
  },
  'waiting-turn': {
    id: 'waiting-turn',
    title: 'Waiting Your Turn',
    description: 'Learn patience and respect for others in group activities',
    ageRange: '3-6 years',
    duration: '15-20 minutes',
    materials: ['Timer', 'Activity cards'],
    isPremium: true,
    category: 'grace-courtesy',
    objectives: [
      'Practice waiting patiently',
      'Respect others\' time with materials',
      'Learn to observe while waiting'
    ],
    instructions: [
      'Use a timer to show how long each person gets with materials',
      'Practice sitting quietly while others work',
      'Learn to observe and appreciate others\' work',
      'Take turns with popular classroom materials'
    ],
    tips: [
      'Start with shorter waiting periods and gradually increase',
      'Provide alternative activities for children who are waiting',
      'Acknowledge and praise patient waiting behavior'
    ]
  },
  ...graceAndCourtesySkillsComplete
};

export default graceAndCourtesySkills;