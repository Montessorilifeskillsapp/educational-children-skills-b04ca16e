import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
const APP_VERSION = "1.0.0";
// Every screen except the home page downloads only when opened, so the app starts quickly.
const Dashboard = lazy(() => import('./Dashboard'));
const PracticalLifeOverview = lazy(() => import('./PracticalLifeOverview'));
const SensorialSkills = lazy(() => import('./SensorialSkills'));
const LanguageSkills = lazy(() => import('./LanguageSkills'));
const MathSkills = lazy(() => import('./MathSkills'));
const GeographySkills = lazy(() => import('./GeographySkills'));
const BotanySkills = lazy(() => import('./BotanySkills'));
const ArtSkills = lazy(() => import('./ArtSkills'));
const CulturalSkills = lazy(() => import('./CulturalSkills'));
const GraceAndCourtesySkills = lazy(() => import('./GraceAndCourtesySkills'));
const SubscriptionPlans = lazy(() => import('./SubscriptionPlans'));
const FamilyDashboard = lazy(() => import('./family/FamilyDashboard'));
const OnboardingFlow = lazy(() => import('./OnboardingFlow'));
const ProfilesView = lazy(() => import('./layout/ProfilesView'));
const ActivityView = lazy(() => import('./layout/ActivityView'));

import Home from './Home';
import i18n from '@/i18n';

import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuthContext } from '@/components/AuthProvider';
import { useActivityCompletions } from '@/hooks/useActivityCompletions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useIsSchoolStaff } from '@/components/school/useIsSchoolStaff';
import { LogIn, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AppLayoutViews: React.FC = () => {
  // State
  const initialView = (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('view') === 'dashboard') ? 'dashboard' : 'home';
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'skills' | 'activity' | 'practical' | 'sensorial' | 'language' | 'math' | 'geography' | 'botany' | 'art' | 'cultural' | 'grace-courtesy' | 'subscription' | 'parent' | 'profiles'>(initialView);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const { t } = useTranslation();

  // Hooks - called in same order every time
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuthContext();
  const { isPremium } = useSubscription();
  const { profiles, activeProfile, isOnboarded, completeOnboarding, setProfiles, setActiveProfile, loading: profilesLoading } = useProfile();
  const isSchoolStaff = useIsSchoolStaff(user?.id);
  const { completedSkillIds, logCompletion, streak } = useActivityCompletions(activeProfile?.id);
  const completedSkills = completedSkillIds;

  // Reset to the landing/home view whenever the user taps the persistent Home button
  useEffect(() => {
    if (location.pathname === '/' && !location.search.includes('view=')) {
      setCurrentView('home');
      setSelectedSkill('');
    }
  }, [location.key, location.pathname, location.search]);

  // Always show newly opened views from the top of the page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentView, selectedSkill]);

  // Callbacks - all defined at top level
  const handleSkillSelect = useCallback((skillId: string) => {
    setSelectedSkill(skillId);
    setCurrentView('activity');
  }, []);

  const handleComplete = useCallback((skillId: string) => {
    logCompletion(skillId);
  }, [logCompletion]);

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

  // School staff without their own family children use the School Portal, never child setup.
  const staffOnly = !!user && isSchoolStaff === true && !profilesLoading && profiles.length === 0;
  const familyView = currentView === 'dashboard' || currentView === 'parent' || currentView === 'profiles';
  useEffect(() => {
    if (staffOnly && (familyView || (!isOnboarded && currentView !== 'home'))) navigate('/school');
  }, [staffOnly, familyView, isOnboarded, currentView, navigate]);
  // When staff open the app, start them in the School Portal once per visit.
  useEffect(() => {
    if (!staffOnly || location.pathname !== '/' || location.search) return;
    try {
      if (sessionStorage.getItem('school_auto_open')) return;
      sessionStorage.setItem('school_auto_open', '1');
    } catch { /* ignore */ }
    navigate('/school', { replace: true });
  }, [staffOnly, location.pathname, location.search, navigate]);

  // Early returns after all hooks are called
  // Show marketing landing page regardless of auth state
  if (currentView === 'home') {
    return (
      <Home 
        onGetStarted={() => (staffOnly ? navigate('/school') : handleViewChange('dashboard'))}
        onSubscriptionView={() => handleViewChange('subscription')}
        onDashboardView={() => handleViewChange('dashboard')}
        onPracticalView={() => navigate('/practical-life')}
        onSensorialView={() => navigate('/sensorial')}
        onLanguageView={() => navigate('/language')}
        onMathView={() => navigate('/math')}
        onGeographyView={() => navigate('/geography')}
        onBotanyView={() => navigate('/botany')}
        onArtView={() => navigate('/art')}
        onCulturalView={() => navigate('/cultural')}
        onGraceCourtesyView={() => navigate('/grace-courtesy')}
        onParentView={() => handleViewChange('parent')}
        onProfilesView={() => handleViewChange('profiles')}
      />
    );
  }

  if (!loading && !user && !isOnboarded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">{t('auth.welcomeCard.title')}</CardTitle>
            <p className="text-muted-foreground">{t('auth.welcomeCard.body')}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent" 
              size="lg"
              onClick={() => completeOnboarding([])}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {t('auth.welcomeCard.explore')}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('auth.welcomeCard.or')}
                </span>
              </div>
            </div>
            <Link to="/auth">
              <Button variant="outline" className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                {t('auth.welcomeCard.signIn')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Never show child setup to school staff (or while their staff status is still being checked).
  if (!isOnboarded && user && (isSchoolStaff !== false || profilesLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" aria-label={t('auth.welcomeCard.openingPortal')} />
      </div>
    );
  }

  if (!isOnboarded || (!profilesLoading && !loading && !activeProfile && profiles.length === 0)) {
    return <OnboardingFlow onComplete={(profiles) => { completeOnboarding(profiles); setCurrentView('dashboard'); }} />;
  }

  // View routing (home already handled above)

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

  if (currentView === 'cultural') {
    return (
      <CulturalSkills
        onBack={handleBack}
        onSkillSelect={handleSkillSelect}
        completedSkills={completedSkills}
        isPremium={isPremium}
      />
    );
  }


  if (currentView === 'subscription') {
    return <SubscriptionPlans onBack={handleBack} />;
  }

  if (currentView === 'parent') {
    return <FamilyDashboard onBack={handleBackToDashboard} onManageProfiles={() => setCurrentView('profiles')} />;
  }




  if (currentView === 'profiles') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 p-4">
        <div className="max-w-4xl mx-auto">
          <ProfilesView
            profiles={profiles}
            activeProfile={activeProfile}
            onProfileSelect={setActiveProfile}
            onProfileUpdate={setProfiles}
            completedSkills={completedSkills}
            onBack={handleBackToDashboard}
          />
          <div className="mt-6">
            <BackButton onClick={handleBack} label={i18n.t('chrome.continueLearning')} variant="default" />
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'activity') {
    return (
      <ActivityView
        skillId={selectedSkill}
        onComplete={handleComplete}
        onBack={handleBack}
        onBackTo={handleViewChange}
      />
    );
  }

  if (!activeProfile) {
    if (!profilesLoading && !loading && profiles.length > 0) {
      return <ProfilesView profiles={profiles} activeProfile={null} onProfileSelect={setActiveProfile} onProfileUpdate={setProfiles} completedSkills={completedSkills} onBack={handleBackToHome} />;
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      onSkillSelect={handleSkillSelect}
      onPracticalLifeView={() => navigate('/practical-life')}
      onSensorialView={() => navigate('/sensorial')}
      onLanguageView={() => navigate('/language')}
      onMathView={() => navigate('/math')}
      onGeographyView={() => navigate('/geography')}
      onBotanyView={() => navigate('/botany')}
      onArtView={() => navigate('/art')}
      onCulturalView={() => navigate('/cultural')}
      onGraceCourtesyView={() => navigate('/grace-courtesy')}
      
      onSubscriptionView={() => handleViewChange('subscription')}
      onParentView={() => handleViewChange('parent')}
      onProfilesView={() => handleViewChange('profiles')}
      onBack={handleBackToHome}
      completedSkills={completedSkills}
      streak={streak}
      isPremium={isPremium}
      activeProfile={activeProfile}
    />
  );
};

const ViewLoading = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
  </div>
);

const AppLayout: React.FC = () => (
  <Suspense fallback={<ViewLoading />}>
    <AppLayoutViews />
  </Suspense>
);

export default AppLayout;