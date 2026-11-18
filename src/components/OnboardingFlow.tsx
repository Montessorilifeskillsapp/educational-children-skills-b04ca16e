import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowRight, ArrowLeft, Sparkles, Check, PartyPopper, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { PREMIUM_BENEFIT_KEYS } from './upgrade/UpgradeDialog';
import { Trans, useTranslation } from 'react-i18next';

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
  { id: 'cultural', label: 'Cultural Studies', emoji: '🌎', desc: 'Science & human culture' },
  { id: 'grace-courtesy', label: 'Grace & Courtesy', emoji: '🤝', desc: 'Social skills' },
];

const AVATARS = ['🧒', '👧', '👦', '🐻', '🦊', '🐰'];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(4);
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [savedProfile, setSavedProfile] = useState<ChildProfile | null>(null);
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  const { t } = useTranslation();
  const areaLabel = (id: string) => t(`auth.onboarding.areas.${id}.label`);

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
    setSavedProfile(profile);
  };

  const handleFinish = () => {
    if (savedProfile) onComplete([savedProfile]);
  };
  const handleFinishPremium = () => {
    handleFinish();
    navigate('/plans');
  };

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-gradient-to-br from-primary/200 to-accent/200 p-3 rounded-full text-white">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {currentStep === 0 && t('auth.onboarding.step0Title')}
            {currentStep === 1 && t('auth.onboarding.step1Title')}
            {currentStep === 2 && t('auth.onboarding.step2Title')}
          </CardTitle>
          <p className="text-gray-600 text-sm">
            {currentStep === 0 && t('auth.onboarding.step0Body')}
            {currentStep === 1 && t('auth.onboarding.step1Body')}
            {currentStep === 2 && t('auth.onboarding.step2Body')}
          </p>
          <div className="mt-4">
            <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">{t('auth.onboarding.stepOf', { current: currentStep + 1, total: totalSteps })}</p>
          </div>
        </CardHeader>

        <CardContent>
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="child-name">{t('auth.onboarding.childName')}</Label>
                <Input
                  id="child-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('auth.onboarding.namePlaceholder')}
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="child-age">{t('auth.onboarding.age')}</Label>
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
                <Label>{t('auth.onboarding.avatar')}</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {AVATARS.map(a => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={`text-3xl p-2 rounded-lg border-2 transition ${
                        avatar === a ? 'border-primary/100 bg-primary/10' : 'border-transparent hover:bg-gray-50'
                      }`}
                      aria-label={t('auth.onboarding.avatarLabel', { avatar: a })}
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
                {t('auth.onboarding.selected', { count: focusAreas.length })}
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
                          ? 'border-primary/100 bg-primary/10'
                          : disabled
                          ? 'border-gray-100 opacity-40 cursor-not-allowed'
                          : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2 bg-primary/100 text-white rounded-full p-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <div className="text-2xl mb-1">{area.emoji}</div>
                      <div className="font-semibold text-sm">{areaLabel(area.id)}</div>
                      <div className="text-xs text-gray-500">{t(`auth.onboarding.areas.${area.id}.desc`)}</div>
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
                  <Trans i18nKey="auth.onboarding.nameAge" values={{ name, age }} components={[<span key="n" className="font-semibold" />]} />
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="text-xs text-primary hover:text-primary underline font-medium"
                >
                  {t('auth.onboarding.edit')}
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm text-gray-600">{t('auth.onboarding.focusAreas')}</p>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-primary hover:text-primary underline font-medium"
                  >
                    {t('auth.onboarding.edit')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {focusAreas.map(id => {
                    const area = FOCUS_AREAS.find(a => a.id === id);
                    return (
                      <span key={id} className="px-3 py-1 bg-primary/15 text-primary rounded-full text-sm font-medium">
                        {area?.emoji} {areaLabel(id)}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold text-green-800 mb-2 text-sm">{t('auth.onboarding.nextTitle')}</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>{t('auth.onboarding.next1')}</li>
                  <li>{t('auth.onboarding.next2')}</li>
                  <li>{t('auth.onboarding.next3')}</li>
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
              {t('auth.onboarding.back')}
            </Button>

            {currentStep < totalSteps - 1 ? (
              <Button onClick={() => setCurrentStep(prev => prev + 1)} disabled={!canProceed()}>
                {t('auth.onboarding.next')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete} size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent font-semibold shadow-lg">
                <Check className="h-4 w-4 mr-2" />
                {t('auth.onboarding.save')}
              </Button>
            )}
          </div>

          {currentStep < totalSteps - 1 && (
            <div className="mt-5 pt-4 border-t border-border/60 text-center">
              <button
                type="button"
                onClick={() => onComplete([])}
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors"
              >
                {t('auth.onboarding.skip')}
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!savedProfile} onOpenChange={(open) => { if (!open) handleFinish(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-full text-white w-fit">
              <PartyPopper className="h-7 w-7" />
            </div>
            <DialogTitle className="text-center text-2xl">{t('auth.onboarding.savedTitle')}</DialogTitle>
            <DialogDescription className="text-center">
              {t('auth.onboarding.savedBody')}
            </DialogDescription>
          </DialogHeader>

          {savedProfile && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <span className="text-4xl">{savedProfile.avatar}</span>
                <div>
                  <div className="font-semibold text-primary">{savedProfile.name}</div>
                  <div className="text-sm text-primary">{t('auth.onboarding.ageN', { age: savedProfile.age })}</div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {t('auth.onboarding.focusCount', { count: savedProfile.interests.length })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {savedProfile.interests.map(id => {
                    const area = FOCUS_AREAS.find(a => a.id === id);
                    return (
                      <span key={id} className="px-3 py-1 bg-primary/15 text-primary rounded-full text-sm font-medium">
                        {area?.emoji} {areaLabel(id)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {!isPremium && savedProfile && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
              <p className="font-semibold text-foreground">{t('auth.onboarding.sequenceReady', { name: savedProfile.name, age: savedProfile.age })}</p>
              <ul className="space-y-1.5">
                {PREMIUM_BENEFIT_KEYS.map(key => (
                  <li key={key} className="flex gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />{t(key)}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{t('auth.onboarding.premiumFrom')}</p>
            </div>
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            {!isPremium && (
              <Button onClick={handleFinishPremium} className="w-full" size="lg">
                {t('auth.onboarding.startPremium')}
              </Button>
            )}
            <Button
              onClick={handleFinish}
              variant={isPremium ? 'default' : 'outline'}
              className="w-full"
              size="lg"
            >
              {isPremium ? t('auth.onboarding.goDashboard') : t('auth.onboarding.tryFree')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            {!isPremium && (
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" aria-hidden="true" /> {t('auth.onboarding.guarantee')}
              </p>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingFlow;
