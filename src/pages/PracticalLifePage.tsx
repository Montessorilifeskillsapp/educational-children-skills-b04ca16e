import React, { useState } from 'react';
import PracticalLifeOverview from '@/components/PracticalLifeOverview';
import PracticalLifeSkills from '@/components/PracticalLifeSkills';
import { useSubscription } from '@/contexts/SubscriptionContext';

const PracticalLifePage: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const { isPremium } = useSubscription();

  const practicalSkills = [
    // Care of the Person
    'hand-washing', 'dressing-frames', 'brushing-teeth', 'nose-blowing', 'using-napkin', 'packing-lunch',
    // Care of the Environment  
    'sweeping-floor', 'watering-plants', 'dusting-furniture', 'organizing-shelf', 'dishwashing', 'table-wiping', 'window-washing',
    // Grace and Courtesy
    'greeting-people', 'saying-please-thank-you', 'waiting-turn', 'interrupting-politely', 'offering-help',
    // Control of Movement
    'walking-line', 'carrying-objects', 'pouring-exercises', 'opening-closing', 'folding-cloth', 'transferring-activities'
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