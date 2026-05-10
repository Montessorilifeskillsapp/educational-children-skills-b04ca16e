// Skill category definitions and utilities
export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const SKILL_CATEGORIES: Record<string, SkillCategory> = {
  'personal-care': {
    name: 'Personal Care',
    icon: '🧼',
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    description: 'Essential self-care and hygiene skills'
  },
  'food-preparation': {
    name: 'Food Preparation',
    icon: '🍽️',
    color: 'bg-green-100 border-green-300 text-green-800',
    description: 'Kitchen skills and meal preparation'
  },
  'fine-motor': {
    name: 'Fine Motor Skills',
    icon: '✋',
    color: 'bg-primary/15 border-primary/40 text-primary',
    description: 'Hand coordination and dexterity development'
  },
  'environment-care': {
    name: 'Environment Care',
    icon: '🌿',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    description: 'Caring for surroundings and living things'
  },
  'room-organization': {
    name: 'Room Organization',
    icon: '🏠',
    color: 'bg-orange-100 border-orange-300 text-orange-800',
    description: 'Organizing and maintaining living spaces'
  },
  'pet-care': {
    name: 'Pet Care',
    icon: '🐕',
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    description: 'Responsibility and care for animals'
  },
  'art': {
    name: 'Art Skills',
    icon: '🎨',
    color: 'bg-accent/15 border-accent/40 text-accent',
    description: 'Creative expression through drawing, painting, and color theory'
  }
};

// Function to determine skill category based on skill ID
export const getSkillCategory = (skillId: string): SkillCategory => {
  const personalCareSkills = ['brushing-teeth', 'washing-hands', 'getting-dressed'];
  const foodPrepSkills = ['setting-table', 'preparing-snack'];
  const fineMotorSkills = ['tying-shoes', 'pouring', 'spooning', 'cutting-with-scissors'];
  const environmentCareSkills = ['flower-arranging', 'polishing', 'sweeping', 'folding-clothes', 'watering-plants', 'wiping-table', 'sweeping-floor'];
  const roomOrgSkills = ['making-bed', 'organizing-toys'];
  const petCareSkills = ['feeding-pet'];
  const artSkills = ['basic-drawing', 'observational-drawing', 'primary-colors', 'color-mixing', 'watercolor-basics', 'finger-painting'];

  if (personalCareSkills.includes(skillId)) {
    return SKILL_CATEGORIES['personal-care'];
  } else if (foodPrepSkills.includes(skillId)) {
    return SKILL_CATEGORIES['food-preparation'];
  } else if (fineMotorSkills.includes(skillId)) {
    return SKILL_CATEGORIES['fine-motor'];
  } else if (environmentCareSkills.includes(skillId)) {
    return SKILL_CATEGORIES['environment-care'];
  } else if (roomOrgSkills.includes(skillId)) {
    return SKILL_CATEGORIES['room-organization'];
  } else if (petCareSkills.includes(skillId)) {
    return SKILL_CATEGORIES['pet-care'];
  } else if (artSkills.includes(skillId)) {
    return SKILL_CATEGORIES['art'];
  }
  
  // Default to personal care if not found
  return SKILL_CATEGORIES['personal-care'];
};