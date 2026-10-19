import React from 'react';
import { useNavigate } from 'react-router-dom';
import GeographySkills from '@/components/GeographySkills';
import SchoolReturnBar from '@/components/school/SchoolReturnBar';
import { useActivityParam } from '@/hooks/useActivityParam';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const GeographyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useActivityParam();
  const { isPremium } = useSubscription();
  const { activeProfile } = useProfile();
  const { completedSkillIds } = useActivityCompletions(activeProfile?.id);

  useSEO({
    title: 'Geography Activities - Montessori Learning App',
    description: 'Montessori geography activities — continents, land and water forms, and cultural exploration for children.',
    canonical: '/geography',
  });

  return (
    <SEOOptimizer>
      {selectedSkill && <SchoolReturnBar />}
      <GeographySkills
        onBack={() => navigate('/')}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkillIds}
        isPremium={isPremium}
        selectedSkill={selectedSkill}
      />
    </SEOOptimizer>
  );
};

export default GeographyPage;
