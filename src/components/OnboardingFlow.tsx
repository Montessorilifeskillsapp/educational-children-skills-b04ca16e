import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';

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

const FOCUS_AREAS: { id: string; label: string; emoji: string; desc: string }[] = [
  { id: 'practical-life', label: 'Practical Life', emoji: '🧺', desc: 'Self-care & independence' },
  { id: 'sensorial', label: 'Sensorial', emoji: '🎨', desc: 'Refining the senses' },
  { id: 'language', label: 'Language', emoji: '📚', desc: 'Reading & writing' },
  { id: 'math', label: 'Math', emoji: '🔢', desc: 'Numbers & quantity' },
  { id: 'geography', label: 'Geography', emoji: '🌍', desc: 'World & culture' },
  { id: 'botany', label: 'Botany', emoji: '🌱', desc: 'Plants & nature' },
  { id: 'art', label: 'Art', emoji: '🎭', desc: 'Creative expression' },
  { id: 'grace-courtesy', label: 'Grace & Courtesy', emoji: '🤝', desc: 'Social skills' },
];

const AVATARS = ['🧒', '👧', '👦', '🐻', '🦊', '🐰'];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(4);
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [focusAreas, setFocusAreas] = useState<string[]>([]);

  const toggleFocus = (id: string) => {
    setFocusAreas(prev => {
      if (prev.includes(id)) return prev.filter(f => f !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const canProceed = () => {
    if (currentStep === 0) return name.trim().length > 0 && age > 0;
    if (currentStep === 1) return focusAreas.length >= 2;
    return true;
  };

  const handleComplete = () => {
    const profile: ChildProfile = {
      id: `profile-${Date.now()}`,
      name: name.trim(),
      age,
      avatar,
      interests: focusAreas,
      learningStyle: 'hands-on',
    };
    onComplete([profile]);
  };

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full text-white">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {currentStep === 0 && "Tell us about your child"}
            {currentStep === 1 && "Pick 2–3 focus areas"}
            {currentStep === 2 && "Your skills plan is ready"}
          </CardTitle>
          <p className="text-gray-600 text-sm">
            {currentStep === 0 && "We'll personalize the plan to their age."}
            {currentStep === 1 && "These shape their starting Montessori plan."}
            {currentStep === 2 && "Start with the first activity any time."}
          </p>
          <div className="mt-4">
            <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Step {currentStep + 1} of {totalSteps}</p>
          </div>
        </CardHeader>

        <CardContent>
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="child-name">Child's name</Label>
                <Input
                  id="child-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Emma"
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="child-age">Age</Label>
                <Input
                  id="child-age"
                  type="number"
                  min={2}
                  max={12}
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Pick an avatar</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {AVATARS.map(a => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={`text-3xl p-2 rounded-lg border-2 transition ${
                        avatar === a ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:bg-gray-50'
                      }`}
                      aria-label={`Avatar ${a}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 text-center">
                Selected {focusAreas.length} of 3 (minimum 2)
              </p>
              <div className="grid grid-cols-2 gap-3">
                {FOCUS_AREAS.map(area => {
                  const selected = focusAreas.includes(area.id);
                  const disabled = !selected && focusAreas.length >= 3;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleFocus(area.id)}
                      disabled={disabled}
                      className={`relative text-left p-3 rounded-xl border-2 transition ${
                        selected
                          ? 'border-purple-500 bg-purple-50'
                          : disabled
                          ? 'border-gray-100 opacity-40 cursor-not-allowed'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <div className="text-2xl mb-1">{area.emoji}</div>
                      <div className="font-semibold text-sm">{area.label}</div>
                      <div className="text-xs text-gray-500">{area.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center space-y-4">
              <div className="text-5xl">{avatar}</div>
              <div className="flex items-center justify-center gap-2">
                <p className="text-gray-700">
                  <span className="font-semibold">{name}</span>, age {age}
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="text-xs text-purple-600 hover:text-purple-800 underline font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm text-gray-600">Focus areas:</p>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-purple-600 hover:text-purple-800 underline font-medium"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {focusAreas.map(id => {
                    const area = FOCUS_AREAS.find(a => a.id === id);
                    return (
                      <span key={id} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {area?.emoji} {area?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold text-green-800 mb-2 text-sm">What's next</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Open the dashboard to start the first activity</li>
                  <li>• Add more focus areas any time from the dashboard</li>
                  <li>• Track progress in the Family Dashboard</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep < totalSteps - 1 ? (
              <Button onClick={() => setCurrentStep(prev => prev + 1)} disabled={!canProceed()}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete} className="bg-gradient-to-r from-purple-600 to-pink-600">
                Start Learning
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
