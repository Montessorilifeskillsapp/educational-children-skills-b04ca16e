import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MathSkills from '@/components/MathSkills';
import MathActivityContent from '@/components/MathActivityContent';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import { mathSkillsData } from '@/data/mathSkills';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const MathPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');
  const { isPremium } = useSubscription();
  const { activeProfile } = useProfile();
  const { completedSkillIds } = useActivityCompletions(activeProfile?.id);

  useSEO({
    title: 'Math Activities - Montessori Learning App',
    description: 'Montessori math activities — number rods, sandpaper numerals, golden beads — building concrete number sense.',
    canonical: '/math',
  });

  if (selectedSkill && mathSkillsData[selectedSkill]) {
    return (
      <SEOOptimizer>
        <MathActivityContent skill={mathSkillsData[selectedSkill]} onBack={() => setSelectedSkill('')} />
      </SEOOptimizer>
    );
  }

  return (
    <SEOOptimizer>
      <MathSkills
        onBack={() => navigate('/')}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkillIds}
        isPremium={isPremium}
        activeProfile={activeProfile}
      />
    </SEOOptimizer>
  );
};

export default MathPage;
