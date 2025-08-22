import React, { useState, useCallback } from 'react';
import Dashboard from './Dashboard';
import SkillActivity from './SkillActivity';
import PracticalLifeOverview from './PracticalLifeOverview';
import PracticalLifeSkills from './PracticalLifeSkills';
import SensorialSkills from './SensorialSkills';
import LanguageSkills from './LanguageSkills';
import MathSkills from './MathSkills';
import MathActivityContent from './MathActivityContent';
import GeographySkills from './GeographySkills';
import BotanySkills from './BotanySkills';
import ArtSkills from './ArtSkills';
import GraceAndCourtesySkills from './GraceAndCourtesySkills';
import Shop from './Shop';
import Home from './Home';
import SubscriptionPlans from './SubscriptionPlans';
import ParentDashboard from './ParentDashboard';
import OnboardingFlow from './OnboardingFlow';
import ProfileSelector from './ProfileSelector';
import Resources from './Resources';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuthContext } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Link } from 'react-router-dom';
import { LogIn, Heart } from 'lucide-react';
import { sensorialSkills } from '@/data/sensorialSkills';
import { languageSkillsData } from '@/data/languageSkills';
import { mathSkillsData } from '@/data/mathSkills';
import { geographySkillsData } from '@/data/geographySkills';
import { artSkillsData } from '@/data/artSkills';
import { graceAndCourtesySkills } from '@/data/graceAndCourtesySkills';
import { botanySkillsData } from '@/data/botanySkills';

const AppLayout: React.FC = () => {
  // State
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'skills' | 'activity' | 'practical' | 'sensorial' | 'language' | 'math' | 'geography' | 'botany' | 'art' | 'grace-courtesy' | 'shop' | 'subscription' | 'parent' | 'profiles' | 'resources'>('home');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);

  // Hooks - called in same order every time
  const { user, loading } = useAuthContext();
  const { isPremium } = useSubscription(); 
  const { profiles, activeProfile, isOnboarded, completeOnboarding, setProfiles, setActiveProfile } = useProfile();
  
  // Callbacks - all defined at top level
  const handleSkillSelect = useCallback((skillId: string) => {
    setSelectedSkill(skillId);
    setCurrentView('activity');
  }, []);

  const handleComplete = useCallback((skillId: string) => {
    setCompletedSkills(prev => [...prev, skillId]);
  }, []);

  const handleBackToPractical = useCallback(() => setCurrentView('practical'), []);
  const handleBackToSensorial = useCallback(() => setCurrentView('sensorial'), []);
  const handleBackToLanguage = useCallback(() => setCurrentView('language'), []);
  const handleBackToMath = useCallback(() => setCurrentView('math'), []);
  const handleBackToGeography = useCallback(() => setCurrentView('geography'), []);
  const handleBackToBotany = useCallback(() => setCurrentView('botany'), []);
  const handleBackToDashboard = useCallback(() => setCurrentView('dashboard'), []);
  const handleBackToHome = useCallback(() => setCurrentView('home'), []);

  const handleViewChange = useCallback((view: typeof currentView) => {
    setCurrentView(view);
  }, []);

  const handleBack = useCallback(() => {
    if (currentView === 'activity') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('dashboard');
    }
    setSelectedSkill('');
  }, [currentView]);

  // Constants
  const practicalSkills = [
    'brushing-teeth', 'washing-hands', 'getting-dressed', 'making-bed', 
    'setting-table', 'tying-shoes', 'pouring', 'spooning', 
    'flower-arranging', 'polishing', 'sweeping', 'folding-clothes',
    'watering-plants', 'cutting-with-scissors', 'preparing-snack'
  ];

  // Early returns after all hooks are called
  if (!loading && !user && !isOnboarded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">Welcome to Montessori Learning</CardTitle>
            <p className="text-gray-600">Sign in to access your dashboard and track progress</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
              size="lg"
              onClick={() => completeOnboarding([])}
            >
              <Heart className="mr-2 h-4 w-4" />
              Try Demo (No Account Needed)
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign in for full access
                </span>
              </div>
            </div>
            <Link to="/auth">
              <Button variant="outline" className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In / Create Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  // View routing
  if (currentView === 'home') {
    return (
      <Home 
        onGetStarted={() => handleViewChange('dashboard')}
        onShopView={() => handleViewChange('shop')}
        onResourcesView={() => handleViewChange('resources')}
        onSubscriptionView={() => handleViewChange('subscription')}
        onDashboardView={() => handleViewChange('dashboard')}
        onPracticalView={() => handleViewChange('practical')}
        onSensorialView={() => handleViewChange('sensorial')}
        onLanguageView={() => handleViewChange('language')}
        onMathView={() => handleViewChange('math')}
        onGeographyView={() => handleViewChange('geography')}
        onBotanyView={() => handleViewChange('botany')}
        onArtView={() => handleViewChange('art')}
        onGraceCourtesyView={() => handleViewChange('grace-courtesy')}
        onParentView={() => handleViewChange('parent')}
        onProfilesView={() => handleViewChange('profiles')}
      />
    );
  }

  if (currentView === 'grace-courtesy') {
    return (
      <GraceAndCourtesySkills
        onBack={handleBack}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
      />
    );
  }

  if (currentView === 'practical') {
    return (
      <PracticalLifeOverview
        onBack={handleBack}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
      />
    );
  }

  if (currentView === 'sensorial') {
    return (
      <SensorialSkills
        onBack={handleBack}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
      />
    );
  }

  if (currentView === 'language') {
    return (
      <LanguageSkills
        onBack={handleBack}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
        activeProfile={activeProfile}
      />
    );
  }

  if (currentView === 'math') {
    return (
      <MathSkills
        onBack={handleBack}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
        activeProfile={activeProfile}
      />
    );
  }

  if (currentView === 'geography') {
    return (
      <GeographySkills
        onBack={handleBack}
        onSkillSelect={setSelectedSkill}
        completedSkills={completedSkills}
        isPremium={isPremium}
        selectedSkill={selectedSkill}
      />
    );
  }

  if (currentView === 'botany') {
    return (
      <BotanySkills
        onBack={handleBack}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
      />
    );
  }

  if (currentView === 'art') {
    return (
      <ArtSkills
        onBack={handleBack}
        selectedSkill={selectedSkill}
        onSkillSelect={setSelectedSkill}
      />
    );
  }

  if (currentView === 'shop') {
    return <Shop onBack={handleBack} />;
  }

  if (currentView === 'subscription') {
    return <SubscriptionPlans onBack={handleBack} />;
  }

  if (currentView === 'parent') {
    return <ParentDashboard onBack={handleBackToDashboard} />;
  }

  if (currentView === 'resources') {
    return <Resources onBack={handleBack} />;
  }

  if (currentView === 'profiles') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <ProfileSelector
            profiles={profiles}
            activeProfile={activeProfile}
            onProfileSelect={setActiveProfile}
            onProfileUpdate={setProfiles}
            completedSkills={completedSkills}
            totalSkills={practicalSkills.length}
            onBack={() => setCurrentView('home')}
          />
          <div className="mt-6">
            <BackButton onClick={handleBack} label="Continue to Learning" variant="default" />
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'activity') {
    if (practicalSkills.includes(selectedSkill)) {
      return (
        <PracticalLifeSkills
          skillId={selectedSkill}
          onBack={handleBackToPractical}
          onComplete={handleComplete}
        />
      );
    }

    if (graceAndCourtesySkills[selectedSkill]) {
      return (
        <SkillActivity
          skillId={selectedSkill}
          onBack={handleBackToPractical}
          onComplete={handleComplete}
        />
      );
    }

    if (sensorialSkills[selectedSkill]) {
      return (
        <SkillActivity
          skillId={selectedSkill}
          onBack={handleBackToSensorial}
          onComplete={handleComplete}
        />
      );
    }

    if (languageSkillsData[selectedSkill]) {
      return (
        <SkillActivity
          skillId={selectedSkill}
          onBack={handleBackToLanguage}
          onComplete={handleComplete}
        />
      );
    }

    if (mathSkillsData[selectedSkill]) {
      return (
        <MathActivityContent
          skill={mathSkillsData[selectedSkill]}
          onBack={handleBackToMath}
        />
      );
    }

    if (geographySkillsData[selectedSkill]) {
      return (
        <SkillActivity
          skillId={selectedSkill}
          onBack={handleBackToGeography}
          onComplete={handleComplete}
        />
      );
    }

    if (botanySkillsData[selectedSkill]) {
      return (
        <SkillActivity
          skillId={selectedSkill}
          onBack={handleBackToBotany}
          onComplete={handleComplete}
        />
      );
    }
    
    return (
      <SkillActivity
        skillId={selectedSkill}
        onBack={handleBack}
        onComplete={handleComplete}
      />
    );
  }

  if (!activeProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      onSkillSelect={handleSkillSelect}
      onPracticalLifeView={() => handleViewChange('practical')}
      onSensorialView={() => handleViewChange('sensorial')}
      onLanguageView={() => handleViewChange('language')}
      onMathView={() => handleViewChange('math')}
      onGeographyView={() => handleViewChange('geography')}
      onBotanyView={() => handleViewChange('botany')}
      onArtView={() => handleViewChange('art')}
      onShopView={() => handleViewChange('shop')}
      onSubscriptionView={() => handleViewChange('subscription')}
      onParentView={() => handleViewChange('parent')}
      onResourcesView={() => handleViewChange('resources')}
      onBack={handleBackToHome}
      completedSkills={completedSkills}
      isPremium={isPremium}
      activeProfile={activeProfile}
    />
  );
};

export default AppLayout;