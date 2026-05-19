import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GraceAndCourtesySkills from '@/components/GraceAndCourtesySkills';
import SkillActivity from '@/components/SkillActivity';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const GraceCourtesyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');
  const { isPremium } = useSubscription();
  const { activeProfile } = useProfile();
  const { completedSkillIds, logCompletion } = useActivityCompletions(activeProfile?.id);

  useSEO({
    title: 'Grace & Courtesy Activities - Montessori Learning App',
    description: 'Montessori grace and courtesy lessons that nurture respect, kindness, and social awareness in young children.',
    canonical: '/grace-courtesy',
  });

  if (selectedSkill) {
    return (
      <SEOOptimizer>
        <SkillActivity skillId={selectedSkill} onBack={() => setSelectedSkill('')} onComplete={logCompletion} />
      </SEOOptimizer>
    );
  }

  return (
    <SEOOptimizer>
      <GraceAndCourtesySkills
        onBack={() => navigate('/')}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkillIds}
        isPremium={isPremium}
      />
    </SEOOptimizer>
  );
};

export default GraceCourtesyPage;
