interface Step {
  id: string;
  instruction: string;
  completed: boolean;
}

interface SkillData {
  title: string;
  icon: string;
  purpose: string;
  materials: string[];
  steps: Step[];
}

const moreSkills2: Record<string, SkillData> = {
  'organizing-toys': {
    title: 'Organizing Toys',
    icon: '🧸',
    purpose: 'Builds organizational skills, responsibility, and creates peaceful play environment.',
    materials: ['Toy containers', 'Storage bins', 'Labels', 'Shelves', 'Sorting baskets'],
    steps: [
      { id: '1', instruction: 'Look at all the toys that need to be put away', completed: false },
      { id: '2', instruction: 'Sort toys into groups: blocks, dolls, books, etc.', completed: false },
      { id: '3', instruction: 'Put each group of toys in their special place', completed: false },
      { id: '4', instruction: 'Make sure toy containers are not overstuffed', completed: false },
      { id: '5', instruction: 'Arrange remaining toys neatly on shelves', completed: false },
      { id: '6', instruction: 'Step back and admire your organized space', completed: false }
    ]
  },
  'sweeping-floor': {
    title: 'Sweeping the Floor',
    icon: '🧹',
    purpose: 'Develops coordination, contributes to household care, and builds work satisfaction.',
    materials: ['Child-sized broom', 'Dustpan', 'Small brush', 'Trash bin', 'Storage hook'],
    steps: [
      { id: '1', instruction: 'Get a child-sized broom and dustpan', completed: false },
      { id: '2', instruction: 'Start sweeping from one corner of the room', completed: false },
      { id: '3', instruction: 'Use short, gentle strokes to gather dirt and crumbs', completed: false },
      { id: '4', instruction: 'Sweep debris into a small pile', completed: false },
      { id: '5', instruction: 'Use dustpan to collect the pile of dirt', completed: false },
      { id: '6', instruction: 'Empty dustpan in trash and put tools away', completed: false }
    ]
  }
};

// Import and merge with original moreSkills
import { moreSkills } from './moreSkills';
export const allMoreSkills = { ...moreSkills, ...moreSkills2 };

export type { Step, SkillData };