import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, BookOpen, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import ChildProfileModal from './ChildProfileModal';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  interests: string[];
  learningStyle: string;
}

interface OnboardingFlowProps {
  onComplete: (profiles: ChildProfile[]) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const steps = [
    {
      title: "Welcome to Montessori Life Skills!",
      subtitle: "Let's set up your child's learning journey",
      icon: "❤️",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🌟</div>
          <p className="text-gray-600 text-lg">
            Our app helps children develop independence and confidence through hands-on Montessori activities.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">Interactive Learning</h3>
              <p className="text-sm text-blue-600">Engaging activities for practical life skills</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">Progress Tracking</h3>
              <p className="text-sm text-purple-600">Monitor your child's development</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Create Your Child's Profile",
      subtitle: "Tell us about your little learner",
      icon: "👥",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            Create a personalized profile to tailor the learning experience for your child.
          </p>
          
          {childProfiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Created Profiles:</h3>
              {childProfiles.map(profile => (
                <div key={profile.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{profile.avatar}</span>
                  <div>
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-sm text-gray-600">{profile.age} years old</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Button 
            onClick={() => setShowProfileModal(true)}
            className="w-full"
            variant={childProfiles.length === 0 ? "default" : "outline"}
          >
            {childProfiles.length === 0 ? "Create First Profile" : "Add Another Child"}
          </Button>
        </div>
      )
    },
    {
      title: "You're All Set!",
      subtitle: "Ready to start your Montessori journey",
      icon: "⭐",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-gray-600 text-lg">
            Everything is ready! Your child can now explore interactive Montessori activities designed to build independence and confidence.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Explore practical life skills activities</li>
              <li>• Track progress in the parent dashboard</li>
              <li>• Unlock new activities as skills develop</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleProfileSave = (profile: ChildProfile) => {
    setChildProfiles(prev => [...prev, profile]);
    setShowProfileModal(false);
  };

  const canProceed = () => {
    if (currentStep === 1) return childProfiles.length > 0;
    return true;
  };

  const handleComplete = () => {
    onComplete(childProfiles);
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
             <div className="bg-purple-100 p-3 rounded-full text-2xl">
               {StepIcon}
             </div>
          </div>
          <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
          <p className="text-gray-600">{currentStepData.subtitle}</p>
          
          <div className="mt-4">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          {currentStepData.content}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Start Learning!
                <Star className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <ChildProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default OnboardingFlow;