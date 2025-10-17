// Tactile Montessori Sensorial Skills Data
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

export const tactileSensorialSkills: Record<string, SensorialSkill> = {
  'touch-boards': {
    id: 'touch-boards',
    title: 'Touch Boards',
    icon: '✋',
    category: 'Tactile Discrimination',
    difficulty: 'Beginner',
    isPremium: false,
    description: 'Feeling smooth and rough surfaces to develop tactile discrimination.',
    ageRange: '2.5-4 years',
    materials: ['Rough and smooth boards', 'Blindfold (optional)'],
    purpose: 'Develops tactile discrimination between rough and smooth',
    color: 'beige',
    learningProcess: {
      presentation: {
        description: 'Introduce rough and smooth sensations',
        duration: '5-8 minutes',
        steps: [
          'Invite child to Touch Boards',
          'Place boards on work mat',
          'Use light fingertip touch on smooth board',
          'Feel entire surface gently',
          'Touch rough board the same way',
          'Compare the two sensations'
        ],
        keyPoints: ['Use light touch', 'Work in silence', 'Show focused attention']
      },
      guidedPractice: {
        description: 'Child practices with observation',
        duration: '1-2 weeks',
        activities: ['Child touches boards', 'Names textures', 'Tries with eyes closed'],
        supportStrategies: ['Model gentle touch', 'Allow repetition', 'Use minimal language']
      },
      independentPractice: {
        description: 'Independent exploration',
        indicators: ['Correct texture identification', 'Gentle touch', 'Sustained focus'],
        variations: ['Eyes closed practice', 'Find similar textures in room']
      },
      mastery: {
        description: 'Complete understanding',
        assessmentCriteria: ['Accurate identification', 'Can explain differences'],
        extensions: ['Find rough/smooth objects', 'Grade textures', 'Draw textures']
      }
    }
  }
};
