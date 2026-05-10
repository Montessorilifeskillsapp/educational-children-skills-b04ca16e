import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Lock } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';

interface Skill {
  id: string;
  title: string;
  icon: string;
  category: string;
  difficulty: string;
  isPremium: boolean;
  color?: string;
  image?: string;
}

interface SkillCardProps {
  skill: Skill;
  isCompleted: boolean;
  onSelect: () => void;
  isPremium: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  skill, 
  isCompleted, 
  onSelect, 
  isPremium 
}) => {
  const isLocked = skill.isPremium && !isPremium;
  
  const getCategoryColor = (category: string, skillColor?: string) => {
    // If skill has specific color, use it with vibrant styling (no borders)
    if (skillColor === 'pink') {
      return 'bg-accent/25 hover:bg-accent/40 shadow-accent';
    }
    if (skillColor === 'red') {
      return 'bg-red-200 hover:bg-red-300 shadow-red-200';
    }
    if (skillColor === 'amber') {
      return 'bg-amber-200 hover:bg-amber-300 shadow-amber-200';
    }
    
    // Default category colors (no borders)
    switch (category) {
      case 'Practical Life': return 'bg-amber-50';
      case 'Sensorial': return 'bg-blue-50';
      case 'Mathematics': return 'bg-red-50';
      case 'Language': return 'bg-yellow-50';
      case 'Geography': return 'bg-blue-50';
      case 'Botany': return 'bg-green-50';
      case 'Visual Discrimination': return 'bg-blue-50';
      case 'Auditory Discrimination': return 'bg-primary/10';
      case 'Tactile Discrimination': return 'bg-orange-50';
      case 'Stereognostic': return 'bg-teal-50';
      default: return 'bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return `${montessoriTheme.text.secondary} bg-green-100`;
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return `${montessoriTheme.text.muted} bg-gray-100`;
    }
  };

  const getDifficultyBorderColor = (difficulty: string) => {
    // Remove borders for all difficulties
    switch (difficulty) {
      case 'Beginner': return 'bg-green-50';
      case 'Intermediate': return 'bg-blue-50';
      case 'Advanced': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  const getTitleColor = (skillColor?: string) => {
    if (skillColor === 'pink') {
      return 'text-accent font-bold';
    }
    if (skillColor === 'red') {
      return 'text-red-800 font-bold';
    }
    if (skillColor === 'amber') {
      return 'text-amber-800 font-bold';
    }
    return montessoriTheme.text.primary;
  };

  return (
    <article>
      <Card 
        className={`cursor-pointer transition-all hover:shadow-lg ${
          skill.category === 'Visual Discrimination' || skill.category === 'Auditory Discrimination' || skill.category === 'Tactile Discrimination' || skill.category === 'Stereognostic' || skill.category === 'Sensorial'
            ? getDifficultyBorderColor(skill.difficulty)
            : getCategoryColor(skill.category, skill.color)
        } relative ${
          isLocked ? 'opacity-60' : ''
        }`}
        onClick={isLocked ? undefined : onSelect}
        role="button"
        tabIndex={isLocked ? -1 : 0}
        aria-label={`${skill.title} - ${skill.difficulty} level ${skill.category} activity. ${isCompleted ? 'Completed' : 'Not completed'}. ${isLocked ? 'Premium required' : 'Click to start'}`}
        onKeyDown={(e) => {
          if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect();
          }
        }}
      >
        {skill.isPremium && (
          <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1" aria-label="Premium activity">
            <Crown className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
        )}
        
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Lock className="w-6 h-6 text-gray-600" aria-hidden="true" />
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          {skill.image ? (
            <div className="mb-3">
              <img
                src={skill.image}
                alt={`${skill.title} Montessori material`}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="text-center mb-2 flex justify-center">
              <div className="text-4xl" role="img" aria-label={`${skill.title} activity icon`}>
                {skill.icon}
              </div>
            </div>
          )}
          <div className="text-center">
            <CardTitle className={`text-lg ${getTitleColor(skill.color)}`}>
              {skill.title}
            </CardTitle>
          </div>
        </CardHeader>


        <CardContent className="pt-0 text-center">
          <div className="flex justify-between items-center mb-3">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(skill.difficulty)}`}>
              {skill.difficulty}
            </span>
            <span className={`text-xs ${montessoriTheme.text.muted}`}>
              {skill.category}
            </span>
          </div>

          {isCompleted && (
            <div className="flex justify-center mb-2">
              <div className={`text-white px-3 py-1 rounded-full text-sm font-medium ${montessoriTheme.button.secondary}`}>
                ✓ Completed
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  );
};

export default SkillCard;