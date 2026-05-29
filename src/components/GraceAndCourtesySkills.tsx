import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/ui/back-button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Lock, HandHelping } from 'lucide-react';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import ShopSectionCTA from './ShopSectionCTA';
import { applyFirstFreeItemLimit } from '@/lib/freeTierAccess';

interface GraceAndCourtesySkillsProps {
  onBack: () => void;
  onSkillSelect: (skillId: string) => void;
  completedSkills: string[];
  isPremium: boolean;
}

const GraceAndCourtesySkills: React.FC<GraceAndCourtesySkillsProps> = ({
  onBack,
  onSkillSelect,
  completedSkills,
  isPremium,
}) => {
  const skills = applyFirstFreeItemLimit(Object.values(graceAndCourtesySkills));

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={onBack} label="Back to Skills" />
        </div>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg mb-4">
            <HandHelping className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Grace and Courtesy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Social skills and polite behavior</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const isCompleted = completedSkills.includes(skill.id);
            const canAccess = !skill.isPremium || isPremium;

            return (
              <Card
                key={skill.id}
                className={`hover:shadow-lg transition-all cursor-pointer group ${
                  isCompleted ? 'ring-2 ring-green-200 bg-green-50' : ''
                } ${!canAccess ? 'opacity-60' : ''}`}
                onClick={() => canAccess && onSkillSelect(skill.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-accent transition-colors">
                      {skill.title}
                    </CardTitle>
                    <div className="flex gap-1">
                      {skill.isPremium && !isPremium && (
                        <Lock className="w-4 h-4 text-amber-500" />
                      )}
                      {isCompleted && (
                        <Star className="w-4 h-4 text-green-500 fill-current" />
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {skill.ageRange}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {skill.learningProcess?.presentation?.duration || skill.ageRange}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Individual
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-700">Materials:</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.materials.slice(0, 2).map((material, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                      {skill.materials.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{skill.materials.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Grace and Courtesy activities help children develop social skills, respect for others, and confidence in social situations. These skills form the foundation for positive relationships and community participation.
          </p>
        </div>
        <ShopSectionCTA category="Practical Life" label="Shop Grace & Courtesy Materials" />
      </div>
    </div>
  );
};

export default GraceAndCourtesySkills;