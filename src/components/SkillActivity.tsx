import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle } from 'lucide-react';
import { skillsData, type Step } from '@/data/skillsData';
import { sensorialSkills } from '@/data/sensorialSkills';
import { additionalSensorialSkills } from '@/data/sensorialSkills2';
import { tactileSensorialSkills } from '@/data/tactileSensorialSkills';
import { completeSensorialSkills } from '@/data/completeSensorialSkills';
import { languageSkillsData } from '@/data/languageSkills';
import { mathSkillsData } from '@/data/mathSkills';
import { geographySkillsData } from '@/data/geographySkills';
import { artSkillsEnhanced } from '@/data/artSkillsEnhanced';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { botanySkillsData } from '@/data/botanySkills';
import { concisePracticalLifeSkills } from '@/data/concisePracticalLifeSkills';
import { amiPracticalLifeSkills } from '@/data/amiPracticalLifeSkills';
import { enhancedMathSkills } from '@/data/enhancedMathSkills';
import { culturalSkillsData } from '@/data/culturalSkills';
import { useSEO } from '@/hooks/useSEO';
import { montessoriTheme } from './ThemeConfig';
import ShareWinCard from '@/components/ShareWinCard';
import ActivityTeachingNotes, { ActivityNoteList } from './activity/ActivityTeachingNotes';
import { getMaterialImage } from '@/lib/materialImageRegistry';
import { getActivityImage } from '@/lib/activityImages';
import { resolveIncludedWith } from '@/lib/materialBundles';
import { cleanMaterialName } from '@/lib/materialCleanup';
import { normalizeMaterialKey } from '@/lib/materials';
import { useMaterialLinks } from '@/hooks/useMaterialLinks';
import { withAffiliateTag } from '@/lib/affiliate';
import GetTheMaterials from './GetTheMaterials';
import ActivityVideo from './ActivityVideo';
import ActivityLayout from './activity/ActivityLayout';
import ActivitySteps from './activity/ActivityStepGroup';

interface SkillActivityProps {
  skillId: string;
  onBack: () => void;
  onComplete: (skillId: string) => void;
}

const allSensorialSkills = {
  ...sensorialSkills,
  ...additionalSensorialSkills,
  ...tactileSensorialSkills,
  ...completeSensorialSkills
};

const allMathSkills = {
  ...mathSkillsData,
  ...enhancedMathSkills,
};

const SkillActivity: React.FC<SkillActivityProps> = ({ skillId, onBack, onComplete }) => {
  const amiPracticalLifeSkill = amiPracticalLifeSkills[skillId];
  const concisePracticalLifeSkill = concisePracticalLifeSkills[skillId];
  const enhancedMathSkill = enhancedMathSkills[skillId];
  const sensorialSkill = allSensorialSkills[skillId];
  const languageSkill = languageSkillsData[skillId];
  const mathSkill = mathSkillsData[skillId];
  const geographySkill = geographySkillsData[skillId];
  const artSkill = artSkillsEnhanced[skillId];
  const graceCourtesySkill = graceAndCourtesySkills[skillId];
  const botanySkill = botanySkillsData[skillId];
  const culturalSkill = culturalSkillsData[skillId];
  const regularSkill = skillsData[skillId];

  const skill = amiPracticalLifeSkill || concisePracticalLifeSkill || enhancedMathSkill || mathSkill || botanySkill || graceCourtesySkill || artSkill || geographySkill || languageSkill || culturalSkill || sensorialSkill || regularSkill;
  const isEnhancedSkill = Boolean(amiPracticalLifeSkill || concisePracticalLifeSkill || enhancedMathSkill);

  const category = (mathSkill || enhancedMathSkill) ? 
    { 
      name: 'Mathematics', 
      icon: '🔢', 
      color: 'bg-blue-100 border-blue-300 text-blue-800', 
      description: 'Developing mathematical understanding through hands-on materials' 
    } :
    (amiPracticalLifeSkill || concisePracticalLifeSkill) ? 
    { 
      name: 'Practical Life', 
      icon: '🏠', 
      color: 'bg-amber-100 border-amber-300 text-amber-800', 
      description: 'Building independence through everyday activities' 
    } :
    botanySkill ? 
    { 
      name: 'Botany', 
      icon: '🌱', 
      color: 'bg-green-100 border-green-300 text-green-800', 
      description: 'Discovering the wonderful world of plants through hands-on activities' 
    } :
    graceCourtesySkill ? 
    { 
      name: 'Grace & Courtesy', 
      icon: '🤝', 
      color: 'bg-primary/15 border-primary/40 text-primary', 
      description: 'Building social skills and respectful interactions' 
    } :
    artSkill ? 
    { 
      name: 'Art Skills', 
      icon: '🎨', 
      color: 'bg-accent/15 border-accent/40 text-accent', 
      description: 'Creative expression through drawing, painting, and color theory' 
    } :
    geographySkill ? 
    { 
      name: 'Geography', 
      icon: '🌍', 
      color: 'bg-emerald-100 border-emerald-300 text-emerald-800', 
      description: 'Exploring our world through Montessori geography' 
    } :
    culturalSkill ? 
    { 
      name: 'Cultural Studies', 
      icon: '🏛️', 
      color: 'bg-primary/15 border-primary/40 text-primary', 
      description: 'Exploring history, music, science, and world cultures' 
    } :
    languageSkill ?
    { 
      name: 'Language', 
      icon: '📚', 
      color: 'bg-blue-100 border-blue-300 text-blue-800', 
      description: 'Developing language and literacy skills' 
    } :
    sensorialSkill ? 
    { 
      name: sensorialSkill.category, 
      icon: getCategoryIcon(sensorialSkill.category), 
      color: getCategoryColor(sensorialSkill.category), 
      description: getCategoryDescription(sensorialSkill.category) 
    } :
    { name: 'Skills', icon: '🎯', color: 'bg-gray-100 border-gray-300 text-gray-800', description: 'General skill development' };

  function getCategoryIcon(categoryName: string) {
    switch (categoryName) {
      case 'Visual Discrimination': return '👁️';
      case 'Auditory Discrimination': return '👂';
      case 'Tactile Discrimination': return '✋';
      case 'Stereognostic': return '🤲';
      default: return '🎯';
    }
  }

  function getCategoryColor(categoryName: string) {
    switch (categoryName) {
      case 'Visual Discrimination': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'Auditory Discrimination': return 'bg-primary/15 border-primary/40 text-primary';
      case 'Tactile Discrimination': return 'bg-green-100 border-green-300 text-green-800';
      case 'Stereognostic': return 'bg-orange-100 border-orange-300 text-orange-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  }

  function getCategoryDescription(categoryName: string) {
    switch (categoryName) {
      case 'Visual Discrimination': return 'Refining visual perception and discrimination';
      case 'Auditory Discrimination': return 'Developing listening skills and sound awareness';
      case 'Tactile Discrimination': return 'Enhancing touch sensitivity and texture recognition';
      case 'Stereognostic': return 'Building object recognition through touch';
      default: return 'Sensorial development';
    }
  }

  const getSkillSteps = (): Step[] => {
    if (!skill) {
      return [];
    }

    const process = 'learningProcess' in skill ? skill.learningProcess : undefined;
    if (process?.presentation?.steps) {
      return [
        ...process.presentation.steps.map((instruction: string, index: number) => ({ id: `presentation-${index}`, instruction, completed: false })),
        ...(process.guidedPractice?.steps ?? []).map((instruction: string, index: number) => ({ id: `guided-${index}`, instruction, completed: false })),
        ...(process.independentPractice?.indicators ?? []).map((instruction: string, index: number) => ({ id: `independent-${index}`, instruction, completed: false })),
      ];
    }
    if (mathSkill?.steps) {
      return mathSkill.steps.map((step, index) => ({ id: `presentation-${index}`, instruction: step, completed: false }));
    }
    if (botanySkill?.steps) {
      return botanySkill.steps.map((step, index) => ({ id: `presentation-${index}`, instruction: step, completed: false }));
    }
    if (graceCourtesySkill?.learningProcess?.presentation?.steps) {
      return graceCourtesySkill.learningProcess.presentation.steps.map((step, index) => ({ id: `presentation-${index}`, instruction: step, completed: false }));
    }
    if (artSkill?.steps) {
      return artSkill.steps.map((step, index) => ({ id: `presentation-${index}`, instruction: step, completed: false }));
    }
    if (geographySkill?.activities) {
      return geographySkill.activities.map((activity, index) => ({ id: `presentation-${index}`, instruction: activity, completed: false }));
    }
    if (culturalSkill?.steps) {
      return culturalSkill.steps;
    }
    if (languageSkill?.steps) {
      return languageSkill.steps;
    }
    if (sensorialSkill?.learningProcess?.presentation?.steps) {
      return sensorialSkill.learningProcess.presentation.steps.map((step, index) => ({ id: `presentation-${index}`, instruction: step, completed: false }));
    }
    if (skill.steps) {
      return Array.isArray(skill.steps) ? skill.steps.map((step: any, index: number) => {
        if (typeof step === 'string') {
          return { id: `presentation-${index}`, instruction: step, completed: false };
        }
        return step;
      }) : [];
    }
    return [];
  };

  useSEO({
    title: skill ? `${skill.title} - ${category.name} - Montessori Skills` : 'Skill Not Found - Montessori Skills',
    description: skill ? `Learn ${skill.title.toLowerCase()} with step-by-step Montessori method.` : 'Montessori skill activity.',
    keywords: skill ? `montessori, ${category.name.toLowerCase()}, ${skill.title.toLowerCase()}` : 'montessori skill',
    canonical: `https://montessori-skills.com/skill/${skillId}`
  });

  const { byKey: materialLinksByKey } = useMaterialLinks();

  const [steps, setSteps] = useState<Step[]>(getSkillSteps());

  useEffect(() => {
    setSteps(getSkillSteps());
    if (typeof window === 'undefined') return;
    const toTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    toTop();
    const raf = requestAnimationFrame(toTop);
    const t = window.setTimeout(toTop, 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [skillId]);

  if (!skill) {
    return (
      <div className={`min-h-screen ${montessoriTheme.backgrounds.activity} p-6`}>
        <div className="max-w-xl mx-auto">
          <BackButton onClick={onBack} label="Back to activities" />
          <Card className="mt-8">
            <CardContent className="py-8 text-center">
              <p className="font-semibold text-foreground">This activity could not be loaded.</p>
              <Button className="mt-4" onClick={onBack}>Return to activities</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const completedSteps = steps.filter(step => step.completed).length;
  const isComplete = steps.length > 0 && completedSteps === steps.length;

  const toggleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const handleComplete = () => {
    onComplete(skillId);
    onBack();
  };

  const heroImage = getActivityImage(skillId, skill as { category?: string; image?: string; imageUrl?: string });

  return (
    <ActivityLayout
      sectionLabel={category.name}
      title={skill.title}
      purpose={skill.purpose}
      image={heroImage}
      onBack={onBack}
      background={montessoriTheme.backgrounds.activity}
    >
        <GetTheMaterials skillId={skillId} skillMaterials={skill.materials} />
        <ActivityVideo skillId={skillId} activityTitle={skill.title} />

        <ActivitySteps steps={steps} onToggle={toggleStep} />
        <ActivityTeachingNotes process={'learningProcess' in skill ? skill.learningProcess : undefined} />
        <ActivityNoteList title="Direct aims" items={graceCourtesySkill?.directAims} />
        <ActivityNoteList title="Materials & their purpose" items={mathSkill?.materialsPurpose} />
        <ActivityNoteList title="Learning objectives" items={mathSkill?.objectives} />
        <ActivityNoteList title="Extensions" items={mathSkill?.extensions} />

        {isComplete && (
          <div className="mt-8 mb-8 text-center">
            <Card className="bg-secondary/10 border-secondary/40">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">🌟</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Excellent Work!</h2>
                <p className="text-muted-foreground mb-4">You have mastered {skill.title.toLowerCase()}!</p>
                <Button onClick={handleComplete}>Mark as Complete</Button>
              </CardContent>
            </Card>
          </div>
        )}
    </ActivityLayout>
  );
};

export default SkillActivity;