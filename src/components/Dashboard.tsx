import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { User, Crown, Users, BookOpen, Star, FileText, Eye, Shield, Baby } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import { useSEO } from '@/hooks/useSEO';
import BackButton from '@/components/ui/back-button';
import { useAuthContext } from '@/components/AuthProvider';
import { Link } from 'react-router-dom';

interface DashboardProps {
  onSkillSelect: (skillId: string) => void;
  onPracticalLifeView?: () => void;
  onSensorialView?: () => void;
  onLanguageView?: () => void;
  onMathView?: () => void;
  onGeographyView?: () => void;
  onBotanyView?: () => void;
  onArtView?: () => void;
  onSubscriptionView: () => void;
  onParentView: () => void;
  onProfilesView?: () => void;
  onResourcesView: () => void;
  onBack?: () => void;
  completedSkills: string[];
  isPremium: boolean;
  activeProfile?: any;
}


const Dashboard: React.FC<DashboardProps> = ({
  onSkillSelect,
  onPracticalLifeView,
  onSensorialView,
  onLanguageView,
  onMathView,
  onGeographyView,
  onBotanyView,
  onArtView,
  onSubscriptionView,
  onParentView,
  onProfilesView,
  onResourcesView,
  onBack,
  completedSkills,
  isPremium,
  activeProfile
}) => {
  const { user, signOut } = useAuthContext();
  
  // SEO optimization for dashboard
  useSEO({
    title: 'Child Progress Dashboard - Track Learning Milestones',
    description: 'Track your child\'s learning progress with detailed analytics and skill development milestones in our Montessori-based learning app.',
    keywords: 'child progress, learning analytics, montessori tracking, skill development, educational dashboard',
    canonical: 'https://montessori-skills.com/dashboard'
  });


  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.dashboard} p-4`}>
      <div className="max-w-6xl mx-auto">
        {onBack && <BackButton onClick={onBack} label="Back to Home" />}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            {/* Logo with Blue Background */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-xl blur-md opacity-40"></div>
              <div className="relative z-10 bg-blue-200 rounded-xl p-3 shadow-lg">
                <img 
                  src="https://d64gsuwffb70l.cloudfront.net/688778d3289f1c9b05c2ffb1_1753917128245_83f1e130.jpeg" 
                  alt="Montessori Life Skills Logo" 
                  className="w-16 h-10 rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${montessoriTheme.text.secondary} flex items-center gap-2`}>
                <Star className="h-6 w-6 text-green-600" />
                Montessori Life Skills
              </h1>
              {activeProfile && (
                <p className={`${montessoriTheme.text.muted} flex items-center gap-2 mt-1`}>
                  <span className="text-xl">{activeProfile.avatar}</span>
                  Welcome back, {activeProfile.name}!
                </p>
              )}
              {user && (
                <p className="text-sm text-gray-600 mt-1">
                  Logged in as: {user.email}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {!user ? (
              <Link to="/auth">
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Skill Categories Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-300 mb-4 text-center">
            Explore Skill Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {onPracticalLifeView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.practical} cursor-pointer hover:shadow-lg transition-all border-amber-200`}
                onClick={onPracticalLifeView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🏠</span>
                    <div>
                      <h3 className="text-amber-800 font-semibold">Practical Life Skills</h3>
                      <p className="text-sm text-gray-700">Daily living activities</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}
            
            {onSensorialView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.sensorial} cursor-pointer hover:shadow-lg transition-all border-pink-200`}
                onClick={onSensorialView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">👁️</span>
                    <div>
                      <h3 className="text-pink-800">Sensorial Skills</h3>
                      <p className="text-sm text-gray-700">Refine the senses</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}

            {onLanguageView && (
              <Card 
                className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-yellow-200 bg-yellow-50`}
                onClick={onLanguageView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h3 className="text-yellow-700">Language Skills</h3>
                      <p className="text-sm text-gray-600">Reading and writing</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}

            {onMathView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.math} cursor-pointer hover:shadow-lg transition-all border-red-200`}
                onClick={onMathView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🔢</span>
                    <div>
                      <h3 className="text-red-700">Mathematics Skills</h3>
                      <p className="text-sm text-gray-700">Numbers and counting</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}

            {onGeographyView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.geography} cursor-pointer hover:shadow-lg transition-all border-blue-200`}
                onClick={onGeographyView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h3 className="text-blue-700">Geography Skills</h3>
                      <p className="text-sm text-gray-700">Explore our world</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}

            {onBotanyView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.botany} cursor-pointer hover:shadow-lg transition-all border-green-200`}
                onClick={onBotanyView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <h3 className="text-green-700">Botany Skills</h3>
                      <p className="text-sm text-gray-700">Learn about plants</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}
            {onArtView && (
              <Card 
                className={`${montessoriTheme.card.base} ${montessoriTheme.backgrounds.art} cursor-pointer hover:shadow-lg transition-all border-orange-200`}
                onClick={onArtView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h3 className="text-orange-800">Art Skills</h3>
                      <p className="text-sm text-gray-700">Creative expression</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
        {/* Additional Pages Navigation */}
        <section className="mb-8">
          <h2 className={`text-xl font-semibold ${montessoriTheme.text.secondary} mb-4`}>
            Additional Pages & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 transform hover:scale-105"
              onClick={onSubscriptionView}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-purple-700 font-bold">Premium Plans</h3>
                    <p className="text-sm text-purple-600">Unlock all features & content</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card 
              className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-teal-200 bg-teal-50`}
              onClick={onParentView}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-teal-600" />
                  <div>
                    <h3 className="text-teal-700">Family Dashboard</h3>
                    <p className="text-sm text-gray-600">Track progress</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            {onProfilesView && (
              <Card 
                className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-indigo-200 bg-indigo-50`}
                onClick={onProfilesView}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-indigo-600" />
                    <div>
                      <h3 className="text-indigo-700">Child Profiles</h3>
                      <p className="text-sm text-gray-600">Manage profiles</p>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            )}

            <Card 
              className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-cyan-200 bg-cyan-50`}
              onClick={onParentView}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-cyan-600" />
                  <div>
                    <h3 className="text-cyan-700">Child Page</h3>
                    <p className="text-sm text-gray-600">Child activities & progress</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card 
              className={`${montessoriTheme.card.base} cursor-pointer hover:shadow-lg transition-all border-pink-200 bg-pink-50`}
              onClick={onResourcesView}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-pink-600" />
                  <div>
                    <h3 className="text-pink-700">Resources</h3>
                    <p className="text-sm text-gray-600">Learning guides</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;