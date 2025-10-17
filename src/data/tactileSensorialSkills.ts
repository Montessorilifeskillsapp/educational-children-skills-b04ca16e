// Tactile Montessori Sensorial Skills Data
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
        title: 'Presentation',
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
        title: 'Guided Practice',
        description: 'Child practices with observation',
        duration: '1-2 weeks',
        steps: ['Child touches boards', 'Names textures', 'Tries with eyes closed'],
        supportStrategies: ['Model gentle touch', 'Allow repetition', 'Use minimal language']
      },
      independentPractice: {
        title: 'Independent Practice',
        description: 'Independent exploration',
        duration: '2-4 weeks',
        indicators: ['Correct texture identification', 'Gentle touch', 'Sustained focus'],
        troubleshooting: ['If too rough, guide hand gently', 'Remind to use fingertips only']
      },
      mastery: {
        title: 'Mastery',
        description: 'Complete understanding',
        assessmentCriteria: ['Accurate identification', 'Can explain differences'],
        indicators: ['Confident discrimination', 'Can teach others']
      },
      extensions: {
        title: 'Extensions',
        description: 'Advanced tactile activities',
        activities: ['Find rough/smooth objects', 'Grade textures', 'Draw textures'],
        variations: ['Create texture collections', 'Tactile matching games']
      }
    }
  }
};
