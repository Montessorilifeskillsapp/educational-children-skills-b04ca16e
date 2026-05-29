import React from 'react';
import { Palette } from 'lucide-react';
import BackButton from '@/components/ui/back-button';
import SkillCard from './SkillCard';
import ShopSectionCTA from './ShopSectionCTA';
import { artSkillsEnhanced } from '../data/artSkillsEnhanced';
import SkillActivity from './SkillActivity';
import { montessoriTheme } from './ThemeConfig';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface ArtSkillsProps {
  selectedSkill?: string;
  onSkillSelect: (skillId: string) => void;
  onBack?: () => void;
}

export const ArtSkills: React.FC<ArtSkillsProps> = ({ selectedSkill, onSkillSelect, onBack }) => {
  const { isPremium } = useSubscription();
  const skills = applyFirstFreeItemLimit(Object.entries(artSkillsEnhanced).map(([key, skill]) => ({ id: key, ...skill })));

  if (selectedSkill && artSkillsEnhanced[selectedSkill]) {
    return (
      <SkillActivity
        skillId={selectedSkill}
        onBack={() => onSkillSelect('')}
        onComplete={() => {}}
      />
    );
  }

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.art}`}><div className="container mx-auto px-4 py-8">
      {onBack && (
        <BackButton onClick={onBack} label="Back to Skills" />
      )}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg mb-4">
          <Palette className="h-7 w-7" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">
          Montessori Art Skills
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore creativity through drawing, painting, and color theory with hands-on Montessori art activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isCompleted={false}
            isPremium={isPremium}
            onSelect={() => onSkillSelect(skill.id)}
          />
        ))}
      </div>
      <ShopSectionCTA category="Art" />
      </div>
    </div>
  );
};

export default ArtSkills;