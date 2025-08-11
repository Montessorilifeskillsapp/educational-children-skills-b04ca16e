import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from './PageLayout';
import { Palette, Leaf, Globe, Calculator, BookOpen, Lightbulb, Utensils } from 'lucide-react';

interface SkillsOverviewProps {
  onBack: () => void;
  onPracticalLifeView: () => void;
  onSensorialView: () => void;
  onLanguageView: () => void;
  onMathView: () => void;
  onGeographyView: () => void;
  onBotanyView: () => void;
  onArtView: () => void;
}

const SkillsOverview: React.FC<SkillsOverviewProps> = ({
  onBack,
  onPracticalLifeView,
  onSensorialView,
  onLanguageView,
  onMathView,
  onGeographyView,
  onBotanyView,
  onArtView,
}) => {
  const skillCategories = [
    {
      title: 'Practical Life',
      description: 'Daily living skills and independence',
      icon: Utensils,
      color: 'bg-green-100 text-green-700',
      onClick: onPracticalLifeView,
    },
    {
      title: 'Sensorial',
      description: 'Refining the senses through exploration',
      icon: Lightbulb,
      color: 'bg-blue-100 text-blue-700',
      onClick: onSensorialView,
    },
    {
      title: 'Language',
      description: 'Reading, writing, and communication',
      icon: BookOpen,
      color: 'bg-yellow-100 text-yellow-700',
      onClick: onLanguageView,
    },
    {
      title: 'Mathematics',
      description: 'Numbers, operations, and problem solving',
      icon: Calculator,
      color: 'bg-red-100 text-red-700',
      onClick: onMathView,
    },
    {
      title: 'Geography',
      description: 'Exploring our world and cultures',
      icon: Globe,
      color: 'bg-blue-100 text-blue-700',
      onClick: onGeographyView,
    },
    {
      title: 'Botany',
      description: 'Plants, nature, and life sciences',
      icon: Leaf,
      color: 'bg-green-100 text-green-700',
      onClick: onBotanyView,
    },
    {
      title: 'Art',
      description: 'Creative expression and fine motor skills',
      icon: Palette,
      color: 'bg-pink-100 text-pink-700',
      onClick: onArtView,
    }
  ];

  return (
    <PageLayout title="Montessori Skills" onBack={onBack}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card
              key={category.title}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={category.onClick}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a skill area to begin your Montessori learning journey. Each area is designed to build independence, confidence, and a love of learning through hands-on exploration and discovery.
        </p>
      </div>
    </PageLayout>
  );
};

export default SkillsOverview;