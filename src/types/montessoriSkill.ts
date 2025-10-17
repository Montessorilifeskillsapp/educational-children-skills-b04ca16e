export interface MontessoriLearningProcess {
  presentation: {
    title: string;
    description: string;
    invitation?: string;
    steps: string[];
    keyPoints: string[];
    duration: string;
  };
  guidedPractice: {
    title: string;
    description: string;
    steps: string[];
    supportStrategies: string[];
    duration: string;
  };
  independentPractice: {
    title: string;
    description: string;
    indicators: string[];
    troubleshooting: string[];
    duration: string;
  };
  mastery: {
    title: string;
    description: string;
    assessmentCriteria: string[];
    indicators: string[];
  };
  extensions: {
    title: string;
    description: string;
    activities: string[];
    variations: string[];
  };
}

export interface EnhancedMontessoriSkill {
  id: string;
  title: string;
  description: string;
  purpose: string;
  ageRange: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isPremium: boolean;
  icon: string;
  materials?: string[];
  materialsPurpose?: string[];
  shopItems?: string[]; // IDs of shop items needed for this skill
  directAims: string[];
  indirectAims: string[];
  controlOfError: string[];
  learningProcess: MontessoriLearningProcess;
  videoUrl?: string;
  imageUrl?: string;
}