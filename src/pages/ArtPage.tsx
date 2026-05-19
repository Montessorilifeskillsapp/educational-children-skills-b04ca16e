import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtSkills from '@/components/ArtSkills';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';

const ArtPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState('');

  useSEO({
    title: 'Art Activities - Montessori Learning App',
    description: 'Montessori art activities — drawing, painting, and color theory through hands-on creative work.',
    canonical: '/art',
  });

  return (
    <SEOOptimizer>
      <ArtSkills
        onBack={() => navigate('/')}
        selectedSkill={selectedSkill}
        onSkillSelect={setSelectedSkill}
      />
    </SEOOptimizer>
  );
};

export default ArtPage;
