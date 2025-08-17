import React from 'react';
import PracticalLifeOverview from '@/components/PracticalLifeOverview';
import PracticalLifeSkills from '@/components/PracticalLifeSkills';
import { useSubscription } from '@/contexts/SubscriptionContext';

const PracticalLifePage: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = React.useState<string>('');
  const [completedSkills, setCompletedSkills] = React.useState<string[]>([]);
  const { isPremium } = useSubscription();

  const practicalSkills = [
    // Care of the Person
    'hand-washing', 'washing-hands', 'dressing-frames', 'brushing-teeth', 'nose-blowing', 'using-napkin', 'packing-lunch', 'brushing-hair',
    // Care of the Environment  
    'sweeping-floor', 'watering-plants', 'dusting-furniture', 'organizing-shelf', 'dishwashing', 'table-wiping', 'window-washing',
    'table-setting', 'flower-arranging', 'polishing-mirror', 'mopping-floor', 'cloth-washing', 'leaf-polishing', 'laundry-sorting',
    // Grace and Courtesy
    'greeting-others', 'saying-please-thank-you', 'waiting-turn', 'interrupting-politely', 'offering-help', 'table-manners', 'walking-indoors',
    // Control of Movement
    'walking-line', 'carrying-objects', 'pouring-exercises', 'pouring-water', 'opening-closing', 'folding-cloth', 'transferring-activities',
    'dry-pouring', 'wet-pouring', 'squeezing-orange-juice', 'spooning-beans'
  ];

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkill(skillId);
  };

  const handleBack = () => {
    setSelectedSkill('');
  };

  const handleComplete = (skillId: string) => {
    setCompletedSkills(prev => [...prev, skillId]);
  };

  const handleBackToHome = () => {
    window.history.back();
  };

  if (selectedSkill && practicalSkills.includes(selectedSkill)) {
    return (
      <PracticalLifeSkills
        skillId={selectedSkill}
        onBack={handleBack}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <PracticalLifeOverview
      onBack={handleBackToHome}
      onSkillSelect={handleSkillSelect}
      completedSkills={completedSkills}
      isPremium={isPremium}
    />
  );
};

export default PracticalLifePage;