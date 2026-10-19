import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArtSkills from '@/components/ArtSkills';
import SEOOptimizer from '@/components/SEOOptimizer';
import SchoolReturnBar from '@/components/school/SchoolReturnBar';
import { useSEO } from '@/hooks/useSEO';
import { useActivityParam } from '@/hooks/useActivityParam';

const ArtPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useActivityParam();

  useSEO({
    title: 'Art Activities - Montessori Learning App',
    description: 'Montessori art activities — drawing, painting, and color theory through hands-on creative work.',
    canonical: '/art',
  });

  return (
    <SEOOptimizer>
      {selectedSkill && <SchoolReturnBar />}
      <ArtSkills
        onBack={() => navigate('/')}
        selectedSkill={selectedSkill}
        onSkillSelect={setSelectedSkill}
      />
    </SEOOptimizer>
  );
};

export default ArtPage;
