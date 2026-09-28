/** Shared by Classroom Setup and Materials admin so saved links use identical keys. */
export const classroomSetupMaterials = [
  // Furniture
  'Child-sized chair',
  'Child-sized table',
  'Low open shelving',
  'Low coat hooks',
  'Child-height mirror',
  // Work surfaces and carriers
  'Work mat',
  'Tray',
  'Basket',
  'Small jug or pitcher',
  'Small ceramic bowls',
  'Small glass tumbler',
  // Care of the environment
  'Child-sized broom and dustpan set',
  'Child-sized mop',
  'Dusting cloths',
  'Sponges',
  'Child-sized apron',
  'Small watering can',
  'Small waste basket',
  // Beauty and care of the room
  'Potted plant',
  'Small vase for flowers',
];

/**
 * Same items, grouped for display. Every name here must exist in
 * classroomSetupMaterials above so admin-managed links keep matching.
 */
export const classroomSetupMaterialGroups: { title: string; materials: string[] }[] = [
  {
    title: 'Furniture',
    materials: [
      'Child-sized chair',
      'Child-sized table',
      'Low open shelving',
      'Low coat hooks',
      'Child-height mirror',
    ],
  },
  {
    title: 'Work surfaces and carriers',
    materials: [
      'Work mat',
      'Tray',
      'Basket',
      'Small jug or pitcher',
      'Small ceramic bowls',
      'Small glass tumbler',
    ],
  },
  {
    title: 'Care of the environment',
    materials: [
      'Child-sized broom and dustpan set',
      'Child-sized mop',
      'Dusting cloths',
      'Sponges',
      'Child-sized apron',
      'Small watering can',
      'Small waste basket',
    ],
  },
  {
    title: 'Beauty and care of the room',
    materials: [
      'Potted plant',
      'Small vase for flowers',
    ],
  },
];

export const classroomSetupMaterialSkills = {
  'classroom-setup-basics': {
    title: 'Classroom basics',
    materials: classroomSetupMaterials,
  },
};
