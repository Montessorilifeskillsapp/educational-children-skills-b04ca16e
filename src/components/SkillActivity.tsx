import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Play, Pause } from 'lucide-react';
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
import { useSEO } from '@/hooks/useSEO';
import MontessoriLearningProcessComponent from './MontessoriLearningProcess';

interface SkillActivityProps {
  skillId: string;
  onBack: () => void;
  onComplete: (skillId: string) => void;
}

const SkillActivity: React.FC<SkillActivityProps> = ({ skillId, onBack, onComplete }) => {
  // Check concise skills first
  const concisePracticalLifeSkill = concisePracticalLifeSkills[skillId];
  const enhancedMathSkill = enhancedMathSkills[skillId];
  
  // Check all skill sources
  const allSensorialSkills = {
    ...sensorialSkills,
    ...additionalSensorialSkills,
    ...tactileSensorialSkills
  };
  
  const sensorialSkill = allSensorialSkills[skillId];
  const languageSkill = languageSkillsData[skillId];
  const mathSkill = mathSkillsData[skillId];
  const geographySkill = geographySkillsData[skillId];
  const artSkill = artSkillsEnhanced[skillId];
  const graceCourtesySkill = graceAndCourtesySkills[skillId];
  const botanySkill = botanySkillsData[skillId];
  const regularSkill = skillsData[skillId];
  
  // Determine which skill data to use - prioritize concise skills
  const skill = concisePracticalLifeSkill || enhancedMathSkill || mathSkill || botanySkill || graceCourtesySkill || artSkill || geographySkill || languageSkill || sensorialSkill || regularSkill;
  const isEnhancedSkill = concisePracticalLifeSkill || enhancedMathSkill;
  
  if (!skill) {
    return <div>Skill not found</div>;
  }
  
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
      color: 'bg-purple-100 border-purple-300 text-purple-800', 
      description: 'Building social skills and respectful interactions' 
    } :
    artSkill ? 
    { 
      name: 'Art Skills', 
      icon: '🎨', 
      color: 'bg-pink-100 border-pink-300 text-pink-800', 
      description: 'Creative expression through drawing, painting, and color theory' 
    } :
    geographySkill ? 
    { 
      name: 'Geography', 
      icon: '🌍', 
      color: 'bg-emerald-100 border-emerald-300 text-emerald-800', 
      description: 'Exploring our world through Montessori geography' 
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
  
  function getCategoryIcon(category: string) {
    switch (category) {
      case 'Visual Discrimination': return '👁️';
      case 'Auditory Discrimination': return '👂';
      case 'Tactile Discrimination': return '✋';
      case 'Stereognostic': return '🤲';
      default: return '🎯';
    }
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'Visual Discrimination': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'Auditory Discrimination': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'Tactile Discrimination': return 'bg-green-100 border-green-300 text-green-800';
      case 'Stereognostic': return 'bg-orange-100 border-orange-300 text-orange-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  }

  function getCategoryDescription(category: string) {
    switch (category) {
      case 'Visual Discrimination': return 'Refining visual perception and discrimination';
      case 'Auditory Discrimination': return 'Developing listening skills and sound awareness';
      case 'Tactile Discrimination': return 'Enhancing touch sensitivity and texture recognition';
      case 'Stereognostic': return 'Building object recognition through touch';
      default: return 'Sensorial development';
    }
  }
  
  useSEO({
    title: `${skill.title} - ${category.name} - Montessori Skills`,
    description: `Learn ${skill.title.toLowerCase()} with step-by-step Montessori method.`,
    keywords: `montessori, ${category.name.toLowerCase()}, ${skill.title.toLowerCase()}`,
    canonical: `https://montessori-skills.com/skill/${skillId}`
  });
  
  // Convert steps to proper format based on skill type
  const getSkillSteps = (): Step[] => {
    // Enhanced skills with learningProcess
    if (isEnhancedSkill && skill.learningProcess?.presentation?.steps) {
      return skill.learningProcess.presentation.steps.map((step: string, index: number) => ({ 
        id: `step-${index}`, 
        instruction: step, 
        completed: false 
      }));
    }
    // Math skills with steps array
    if (mathSkill?.steps) {
      return mathSkill.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    // Botany skills
    if (botanySkill?.steps) {
      return botanySkill.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    // Grace & Courtesy skills
    if (graceCourtesySkill?.learningProcess?.presentation?.steps) {
      return graceCourtesySkill.learningProcess.presentation.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    // Art skills
    if (artSkill?.steps) {
      return artSkill.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    // Geography skills
    if (geographySkill?.activities) {
      return geographySkill.activities.map((activity, index) => ({ id: `step-${index}`, instruction: activity, completed: false }));
    }
    // Language skills
    if (languageSkill?.steps) {
      return languageSkill.steps;
    }
    // Sensorial skills with learningProcess
    if (sensorialSkill?.learningProcess?.presentation?.steps) {
      return sensorialSkill.learningProcess.presentation.steps.map((step, index) => ({ id: `step-${index}`, instruction: step, completed: false }));
    }
    // Regular skills with steps
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
    
  const [steps, setSteps] = useState<Step[]>(getSkillSteps());
  
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  const isComplete = completedSteps === steps.length;

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
        {/* Category Banner */}
        <div className={`${category.color} border-4 border-current rounded-xl p-6 mb-6 text-center shadow-lg`}>
          <div className="text-6xl mb-3">{category.icon}</div>
          <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
          <p className="text-lg font-medium opacity-90">{category.description}</p>
        </div>

        <header className="flex items-center justify-between mb-6">
          <BackButton onClick={onBack} />
          <div className="text-center">
            {/* Icon without background */}
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
        {/* Materials Section */}
        {skill.materials && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📦</span>
                Materials Needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {skill.materials.map((material, index) => (
                  <li key={index} className="text-gray-700">{material}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Purpose Section */}
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

        {/* Steps Section - Only show for non-sensorial skills that don't have learningProcess */}
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

        {/* Enhanced Montessori Learning Process for Sensorial Skills */}
        {sensorialSkill?.learningProcess && (
          <div className="mb-6">
            <MontessoriLearningProcessComponent 
              learningProcess={sensorialSkill.learningProcess} 
              skillTitle={sensorialSkill.title}
            />
          </div>
        )}

        {/* Key Points Section for Grace & Courtesy Skills */}
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

        {/* Direct Aims Section for Grace & Courtesy Skills */}
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

        {/* Enhanced Montessori Learning Process */}
        {isEnhancedSkill && skill.learningProcess && (
          <div className="mb-6">
            <MontessoriLearningProcessComponent 
              learningProcess={skill.learningProcess} 
              skillTitle={skill.title}
            />
          </div>
        )}

        {/* Completion Section */}
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillActivity;