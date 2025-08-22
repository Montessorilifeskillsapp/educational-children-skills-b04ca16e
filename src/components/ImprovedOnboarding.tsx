import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Heart, Users, Lightbulb, CheckCircle } from 'lucide-react';

interface ImprovedOnboardingProps {
  onComplete: () => void;
}

const ImprovedOnboarding: React.FC<ImprovedOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to Montessori Life Skills",
      icon: <Heart className="w-8 h-8 text-red-500" />,
      content: (
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            Gentle, purposeful learning for little hands
          </p>
          <p>
            Introduce your child to everyday independence through hands-on, beautifully guided 
            Montessori activities. From pouring and sweeping to setting the table, our app nurtures 
            confidence, coordination, and calm.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-700 font-medium">
              ✨ Created with Montessori educators, illustrators, and child development experts
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What Makes Montessori Special?",
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Real-World Skills</h3>
              <p className="text-sm text-green-700">
                Children learn practical life skills they can use every day, building genuine independence.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">Self-Directed Learning</h3>
              <p className="text-sm text-purple-700">
                Activities follow the child's natural development and interests, fostering intrinsic motivation.
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">Hands-On Experience</h3>
              <p className="text-sm text-orange-700">
                Learning through movement and touch helps children understand concepts deeply.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Calm Environment</h3>
              <p className="text-sm text-blue-700">
                Beautiful, organized spaces help children focus and develop concentration skills.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Free Plan Includes",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Everything you need to get started!
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">3 Activities</Badge>
                <span className="text-sm">Pouring, sweeping, and rolling a mat</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Printable Guides</Badge>
                <span className="text-sm">1 beautifully illustrated activity sheet</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Daily Prompts</Badge>
                <span className="text-sm">Fresh life skill ideas every day</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Ad-Free</Badge>
                <span className="text-sm">Gentle, distraction-free experience</span>
              </div>
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            Perfect for exploring Montessori learning at home!
          </p>
        </div>
      )
    },
    {
      title: "Ready to Begin?",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="text-center space-y-6">
          <p className="text-lg">
            You're all set to start your Montessori journey! Remember:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Follow the Child</h3>
              <p className="text-sm text-blue-700">
                Let your child's interests guide the activities they choose.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Practice Makes Progress</h3>
              <p className="text-sm text-green-700">
                Repetition helps build muscle memory and confidence.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">Prepare the Environment</h3>
              <p className="text-sm text-purple-700">
                Create a calm, organized space for activities.
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">Celebrate Small Wins</h3>
              <p className="text-sm text-orange-700">
                Every step toward independence is worth celebrating!
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
            <p className="text-pink-700 font-medium">
              💝 Ready to unlock even more activities? Upgrade anytime to access 20+ premium skills!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {steps[currentStep].icon}
          </div>
          <CardTitle className="text-2xl">
            {steps[currentStep].title}
          </CardTitle>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {steps[currentStep].content}
          
          <div className="flex justify-between items-center pt-4">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Start Learning' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovedOnboarding;