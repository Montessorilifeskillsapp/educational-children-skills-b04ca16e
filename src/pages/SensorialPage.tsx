import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SensorialSkills from '@/components/SensorialSkills';
import SkillActivity from '@/components/SkillActivity';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const SensorialPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');
  const { isPremium } = useSubscription();
  const { activeProfile } = useProfile();
  const { completedSkillIds, logCompletion } = useActivityCompletions(activeProfile?.id);

  useSEO({
    title: 'Sensorial Activities - Montessori Learning App',
    description: 'Authentic Montessori sensorial activities to refine the senses — Pink Tower, Brown Stair, Color Tablets, and more.',
    canonical: '/sensorial',
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
      <SensorialSkills
        onBack={() => navigate('/')}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkillIds}
        isPremium={isPremium}
      />
    </SEOOptimizer>
  );
};

export default SensorialPage;
