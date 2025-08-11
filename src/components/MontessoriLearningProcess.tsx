import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Circle, Clock, Target, Lightbulb, Star } from 'lucide-react';
import { MontessoriLearningProcess } from '@/types/montessoriSkill';

interface MontessoriLearningProcessProps {
  learningProcess: MontessoriLearningProcess;
  skillTitle: string;
}

const MontessoriLearningProcessComponent: React.FC<MontessoriLearningProcessProps> = ({ 
  learningProcess, 
  skillTitle 
}) => {
  const [currentPhase, setCurrentPhase] = useState('presentation');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (phase: string, stepIndex: number) => {
    const key = `${phase}-${stepIndex}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const phases = [
    { 
      id: 'presentation', 
      title: 'Presentation', 
      icon: '👨‍🏫', 
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      data: learningProcess.presentation 
    },
    { 
      id: 'guidedPractice', 
      title: 'Guided Practice', 
      icon: '🤝', 
      color: 'bg-green-100 border-green-300 text-green-800',
      data: learningProcess.guidedPractice 
    },
    { 
      id: 'independentPractice', 
      title: 'Independent Practice', 
      icon: '🎯', 
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      data: learningProcess.independentPractice 
    },
    { 
      id: 'mastery', 
      title: 'Mastery', 
      icon: '🏆', 
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      data: learningProcess.mastery 
    },
    { 
      id: 'extensions', 
      title: 'Extensions', 
      icon: '🌟', 
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      data: learningProcess.extensions 
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <span className="text-3xl">🎓</span>
            Montessori Learning Process: {skillTitle}
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={currentPhase} onValueChange={setCurrentPhase} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {phases.map((phase) => (
            <TabsTrigger key={phase.id} value={phase.id} className="text-xs">
              <span className="mr-1">{phase.icon}</span>
              {phase.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{phase.icon}</span>
                    {phase.data.title}
                  </CardTitle>
                  <Badge className={`${phase.color} border-2`}>
                    {phase.title}
                  </Badge>
                </div>
                <p className="text-gray-600 mt-2">{phase.data.description}</p>
                {phase.data.duration && (
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{phase.data.duration}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Steps */}
                {phase.data.steps && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Steps
                    </h4>
                    <div className="space-y-2">
                      {phase.data.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white border">
                          <button
                            onClick={() => toggleStep(phase.id, index)}
                            className="mt-1 flex-shrink-0"
                          >
                            {completedSteps[`${phase.id}-${index}`] ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                          <p className={`text-sm ${
                            completedSteps[`${phase.id}-${index}`] 
                              ? 'line-through text-gray-500' 
                              : 'text-gray-800'
                          }`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Points */}
                {phase.data.keyPoints && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Key Points
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {phase.data.keyPoints.map((point, index) => (
                        <li key={index} className="text-gray-700">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Support Strategies */}
                {phase.data.supportStrategies && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Support Strategies
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {phase.data.supportStrategies.map((strategy, index) => (
                        <li key={index} className="text-gray-700">{strategy}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Indicators */}
                {phase.data.indicators && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Success Indicators
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {phase.data.indicators.map((indicator, index) => (
                        <li key={index} className="text-gray-700">{indicator}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Assessment Criteria */}
                {phase.data.assessmentCriteria && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Assessment Criteria
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {phase.data.assessmentCriteria.map((criteria, index) => (
                        <li key={index} className="text-gray-700">{criteria}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Activities */}
                {phase.data.activities && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Extension Activities
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {phase.data.activities.map((activity, index) => (
                        <li key={index} className="text-gray-700">{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Variations */}
                {phase.data.variations && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Variations
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {phase.data.variations.map((variation, index) => (
                        <li key={index} className="text-gray-700">{variation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Troubleshooting */}
                {phase.data.troubleshooting && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Troubleshooting
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {phase.data.troubleshooting.map((tip, index) => (
                        <li key={index} className="text-gray-700">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MontessoriLearningProcessComponent;