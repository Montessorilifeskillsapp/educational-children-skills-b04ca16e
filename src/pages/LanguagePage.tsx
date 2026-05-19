import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSkills from '@/components/LanguageSkills';
import SkillActivity from '@/components/SkillActivity';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const LanguagePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');
  const { isPremium } = useSubscription();
  const { activeProfile } = useProfile();
  const { completedSkillIds, logCompletion } = useActivityCompletions(activeProfile?.id);

  useSEO({
    title: 'Language Activities - Montessori Learning App',
    description: 'Montessori language activities including sandpaper letters, moveable alphabet, and reading sequences for ages 2–6.',
    canonical: '/language',
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
      <LanguageSkills
        onBack={() => navigate('/')}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkillIds}
        isPremium={isPremium}
        activeProfile={activeProfile}
      />
    </SEOOptimizer>
  );
};

export default LanguagePage;
