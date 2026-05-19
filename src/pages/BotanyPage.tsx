import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotanySkills from '@/components/BotanySkills';
import SkillActivity from '@/components/SkillActivity';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const BotanyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');
  const { isPremium } = useSubscription();
  const { activeProfile } = useProfile();
  const { completedSkillIds, logCompletion } = useActivityCompletions(activeProfile?.id);

  useSEO({
    title: 'Botany Activities - Montessori Learning App',
    description: 'Montessori botany activities — parts of a plant, leaf shapes, and care of growing things.',
    canonical: '/botany',
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
      <BotanySkills
        onBack={() => navigate('/')}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkillIds}
        isPremium={isPremium}
      />
    </SEOOptimizer>
  );
};

export default BotanyPage;
