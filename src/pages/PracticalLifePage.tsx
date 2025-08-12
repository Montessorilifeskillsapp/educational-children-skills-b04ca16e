import React, { useState } from 'react';
import PracticalLifeOverview from '@/components/PracticalLifeOverview';
import PracticalLifeSkills from '@/components/PracticalLifeSkills';
import { useSubscription } from '@/contexts/SubscriptionContext';

const PracticalLifePage: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const { isPremium } = useSubscription();

  const practicalSkills = [
    'brushing-teeth', 'washing-hands', 'getting-dressed', 'making-bed',
    'setting-table', 'tying-shoes', 'pouring', 'spooning',
    'flower-arranging', 'polishing', 'sweeping', 'sweeping-floor', 'dusting-furniture', 'organizing-shelf',
    'folding-clothes', 'watering-plants', 'cutting-with-scissors', 'preparing-snack', 'table-wiping', 'window-washing'
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