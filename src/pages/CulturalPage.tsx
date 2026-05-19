import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CulturalSkills from '@/components/CulturalSkills';
import SkillActivity from '@/components/SkillActivity';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const CulturalPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');
  const { isPremium } = useSubscription();
  const { activeProfile } = useProfile();
  const { completedSkillIds, logCompletion } = useActivityCompletions(activeProfile?.id);

  useSEO({
    title: 'Science & Cultural Activities - Montessori Learning App',
    description: 'Montessori cultural and science activities exploring the natural world, history, and our place in it.',
    canonical: '/cultural',
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
      <CulturalSkills
        onBack={() => navigate('/')}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkillIds}
        isPremium={isPremium}
      />
    </SEOOptimizer>
  );
};

export default CulturalPage;
