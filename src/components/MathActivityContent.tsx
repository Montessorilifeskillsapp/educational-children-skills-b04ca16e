import React from 'react';
import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MathSkillData {
  icon: string;
  title: string;
  ageRange: string;
  difficulty: string;
  purpose: string;
  materialsPurpose?: string[];
  detailedSteps?: string[];
  objectives: string[];
  extensions: string[];
}

interface MathActivityContentProps {
  skill: MathSkillData;
  onBack: () => void;
}

const MathActivityContent: React.FC<MathActivityContentProps> = ({ skill, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-primary/20 p-4">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={onBack} label="Back to Math Skills" />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            {/* Icon with Blue Background - matching logo style */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-xl blur-md opacity-40"></div>
              <div className="relative z-10 bg-blue-200 rounded-xl p-2 shadow-lg">
                <span className="text-4xl">{skill.icon}</span>
              </div>
            </div>
            {skill.title}
          </h1>
          <Badge className="mt-2 bg-blue-100 text-blue-800">
            {skill.ageRange} • {skill.difficulty}
          </Badge>
        </div>

        {/* Purpose Section */}
        <Card className="mb-6 border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Montessori Purpose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800">{skill.purpose}</p>
          </CardContent>
        </Card>

        {/* Materials Section */}
        <Card className="mb-6 border-2 border-amber-300">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              <span className="text-2xl">🧰</span>
              Materials & Their Purpose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skill.materialsPurpose?.map((purpose, index) => (
                <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="font-medium text-amber-900">{purpose}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Steps Section */}
        <Card className="mb-6 border-2 border-green-300">
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Detailed Step-by-Step Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skill.detailedSteps?.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-green-900 flex-1">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Objectives & Extensions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-primary/40">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {skill.objectives.map((objective, index) => (
                  <li key={index} className="flex items-center gap-2 text-primary">
                    <span className="text-primary0">•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-300">
            <CardHeader>
              <CardTitle className="text-orange-900 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Extensions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {skill.extensions.map((extension, index) => (
                  <li key={index} className="flex items-center gap-2 text-orange-800">
                    <span className="text-orange-500">•</span>
                    {extension}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MathActivityContent;