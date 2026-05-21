import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle } from 'lucide-react';
import { skillsData, type Step } from '@/data/skillsData';
import { sensorialSkills } from '@/data/sensorialSkills';
import { additionalSensorialSkills } from '@/data/sensorialSkills2';
import { tactileSensorialSkills } from '@/data/tactileSensorialSkills';
import { languageSkillsData } from '@/data/languageSkills';
import { mathSkillsData } from '@/data/mathSkills';
import { geographySkillsData } from '@/data/geographySkills';
import { artSkillsEnhanced } from '@/data/artSkillsEnhanced';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { botanySkillsData } from '@/data/botanySkills';
import { concisePracticalLifeSkills } from '@/data/concisePracticalLifeSkills';
import { enhancedMathSkills } from '@/data/enhancedMathSkills';
import { culturalSkillsData } from '@/data/culturalSkills';
import { useSEO } from '@/hooks/useSEO';
import ShareWinCard from '@/components/ShareWinCard';
import MontessoriLearningProcessComponent from './MontessoriLearningProcess';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { canAccessSectionItem } from '@/lib/freeTierAccess';

interface SkillActivityProps {
  skillId: string;
  onBack: () => void;
  onComplete: (skillId: string) => void;
}

const allSensorialSkills = {
  ...sensorialSkills,
  ...additionalSensorialSkills,
  ...tactileSensorialSkills
};

const allMathSkills = {
  ...mathSkillsData,
  ...enhancedMathSkills,
};

const SkillActivity: React.FC<SkillActivityProps> = ({ skillId, onBack, onComplete }) => {
  const { isPremium } = useSubscription();

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

  const skill = concisePracticalLifeSkill || enhancedMathSkill || mathSkill || botanySkill || graceCourtesySkill || artSkill || geographySkill || languageSkill || culturalSkill || sensorialSkill || regularSkill;
  const isEnhancedSkill = Boolean(concisePracticalLifeSkill || enhancedMathSkill);

  const category = (mathSkill || enhancedMathSkill) ? 
    { 
      name: 'Mathematics', 
      icon: '🔢', 
      color: 'bg-blue-100 border-blue-300 text-blue-800', 
      description: 'Developing mathematical understanding through hands-on materials' 
    } :
    concisePracticalLifeSkill ? 
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

    if (isEnhancedSkill && skill.learningProcess?.presentation?.steps) {
      return skill.learningProcess.presentation.steps.map((step: string, index: number) => ({ 
        id: `step-${index}`, 
        instruction: step, 
        completed: false 
      }));
    }
    if (mathSkill?.steps) {
      return mathSkill.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    if (botanySkill?.steps) {
      return botanySkill.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    if (graceCourtesySkill?.learningProcess?.presentation?.steps) {
      return graceCourtesySkill.learningProcess.presentation.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    if (artSkill?.steps) {
      return artSkill.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    if (geographySkill?.activities) {
      return geographySkill.activities.map((activity, index) => ({ id: `step-${index}`, instruction: activity, completed: false }));
    }
    if (culturalSkill?.steps) {
      return culturalSkill.steps;
    }
    if (languageSkill?.steps) {
      return languageSkill.steps;
    }
    if (sensorialSkill?.learningProcess?.presentation?.steps) {
      return sensorialSkill.learningProcess.presentation.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    if (skill.steps) {
      return Array.isArray(skill.steps) ? skill.steps.map((step: any, index: number) => {
        if (typeof step === 'string') {
          return { id: `step-${index}`, instruction: step, completed: false };
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

  const [steps, setSteps] = useState<Step[]>(getSkillSteps());

  useEffect(() => {
    setSteps(getSkillSteps());
  }, [skillId]);

  if (!skill) {
    return <div>Skill not found</div>;
  }

  const hasAccess = concisePracticalLifeSkill
    ? true
    : (mathSkill || enhancedMathSkill)
      ? canAccessSectionItem(Object.entries(allMathSkills).map(([id, sectionSkill]) => ({ id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
      : botanySkill
        ? canAccessSectionItem(Object.entries(botanySkillsData).map(([id, sectionSkill]) => ({ id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
        : graceCourtesySkill
          ? canAccessSectionItem(Object.values(graceAndCourtesySkills).map((sectionSkill) => ({ id: sectionSkill.id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
          : artSkill
            ? canAccessSectionItem(Object.entries(artSkillsEnhanced).map(([id, sectionSkill]) => ({ id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
            : geographySkill
              ? canAccessSectionItem(Object.entries(geographySkillsData).map(([id, sectionSkill]) => ({ id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
              : culturalSkill
                ? canAccessSectionItem(Object.entries(culturalSkillsData).map(([id, sectionSkill]) => ({ id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
                : languageSkill
                  ? canAccessSectionItem(Object.entries(languageSkillsData).map(([id, sectionSkill]) => ({ id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
                  : sensorialSkill
                    ? canAccessSectionItem(Object.entries(allSensorialSkills).map(([id, sectionSkill]) => ({ id, isPremium: sectionSkill.isPremium })), skillId, isPremium)
                    : !skill.isPremium || isPremium;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
        <div className="max-w-xl mx-auto pt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Premium activity</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">Only the first existing free activity in this section is available on the free plan.</p>
              <Button onClick={onBack}>Go back</Button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className={`${category.color} border-4 border-current rounded-xl p-6 mb-6 text-center shadow-lg`}>
          <div className="text-6xl mb-3">{category.icon}</div>
          <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
          <p className="text-lg font-medium opacity-90">{category.description}</p>
        </div>

        <header className="flex items-center justify-between mb-6">
          <BackButton onClick={onBack} />
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="text-4xl">{skill.icon}</div>
            </div>
            <h1 className="text-2xl font-bold text-amber-900">{skill.title}</h1>
            <Badge className={`mt-2 ${category.color} border-2 text-lg px-4 py-2`}>
              {category.name} Activity
            </Badge>
          </div>
          <div className="w-20"></div>
        </header>

        {skill.materials && skill.materials.length > 0 && (
          <div className="mb-6 p-4 bg-white/70 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📦</span>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/70">What you'll need</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.materials.map((m, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-sm text-amber-900">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
        {skill.purpose && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Purpose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{skill.purpose}</p>
            </CardContent>
          </Card>
        )}


        {skill.purpose && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Purpose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{skill.purpose}</p>
            </CardContent>
          </Card>
        )}

        {!sensorialSkill?.learningProcess && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Activity Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-white border">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${category.color}`}>
                        Step {index + 1}
                      </span>
                    </div>
                    <p className={`${step.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {step.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {sensorialSkill?.learningProcess && (
          <div className="mb-6">
            <MontessoriLearningProcessComponent 
              learningProcess={sensorialSkill.learningProcess} 
              skillTitle={sensorialSkill.title}
            />
          </div>
        )}

        {graceCourtesySkill?.learningProcess?.presentation?.keyPoints && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Key Teaching Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {graceCourtesySkill.learningProcess.presentation.keyPoints.map((tip, index) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {graceCourtesySkill?.directAims && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Direct Aims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {graceCourtesySkill.directAims.map((objective, index) => (
                  <li key={index} className="text-gray-700">{objective}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {isEnhancedSkill && skill.learningProcess && (
          <div className="mb-6">
            <MontessoriLearningProcessComponent 
              learningProcess={skill.learningProcess} 
              skillTitle={skill.title}
            />
          </div>
        )}

        {isComplete && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Skill Mastered!
              </h3>
              <p className="text-green-700 mb-4">
                Congratulations! You've completed all steps for {skill.title}.
              </p>
              <Badge className="bg-green-200 text-green-800 text-lg px-4 py-2">
                <span className="mr-2">{category.icon}</span>
                {category.name} Master
              </Badge>
              <div className="mt-6">
                <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                  Continue Learning
                </Button>
              </div>
              <ShareWinCard skillTitle={skill.title} categoryName={category.name} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillActivity;