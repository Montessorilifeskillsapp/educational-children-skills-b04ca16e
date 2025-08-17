import React, { useState } from 'react';
import PracticalLifeOverview from '@/components/PracticalLifeOverview';
import PracticalLifeSkills from '@/components/PracticalLifeSkills';
import { useSubscription } from '@/contexts/SubscriptionContext';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const PracticalLifePage: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const { isPremium } = useSubscription();
  
  // SEO optimization for practical life page
  useSEO({
    title: "Practical Life Skills - Montessori Learning App",
    description: "Discover authentic Montessori practical life activities that build independence and confidence in children aged 2-6. Learn care of person, environment, grace & courtesy.",
    keywords: "montessori practical life, children independence, self care skills, montessori activities, hands on learning",
    canonical: "/practical-life"
  });

  const practicalSkills = [
    // Care of the Person
    'hand-washing', 'dressing-frames', 'brushing-teeth', 'nose-blowing', 'using-napkin', 'packing-lunch', 'brushing-hair',
    // Care of the Environment  
    'sweeping-floor', 'watering-plants', 'dusting-furniture', 'organizing-shelf', 'dishwashing', 'table-wiping', 'window-washing',
    'table-setting', 'flower-arranging', 'polishing-mirror',
    // Grace and Courtesy
    'greeting-people', 'saying-please-thank-you', 'waiting-turn', 'interrupting-politely', 'offering-help',
    // Control of Movement
    'walking-line', 'carrying-objects', 'pouring-exercises', 'opening-closing', 'folding-cloth', 'transferring-activities',
    'dry-pouring', 'wet-pouring', 'squeezing-orange-juice'
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
      <SEOOptimizer>
        <PracticalLifeSkills
          skillId={selectedSkill}
          onBack={handleBack}
          onComplete={handleComplete}
        />
      </SEOOptimizer>
    );
  }

  return (
    <SEOOptimizer>
      <PracticalLifeOverview
        onBack={handleBackToHome}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
      />
    </SEOOptimizer>
  );
};

export default PracticalLifePage;