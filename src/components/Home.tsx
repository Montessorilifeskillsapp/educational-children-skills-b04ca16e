import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, Star, Users } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import NavigationMenu from './NavigationMenu';

interface HomeProps {
  onGetStarted: () => void;
  onShopView?: () => void;
  onResourcesView?: () => void;
  onSubscriptionView?: () => void;
  onDashboardView?: () => void;
  onSkillsView?: () => void;
  onPracticalView?: () => void;
  onSensorialView?: () => void;
  onLanguageView?: () => void;
  onMathView?: () => void;
  onGeographyView?: () => void;
  onBotanyView?: () => void;
  onArtView?: () => void;
  onGraceCourtesyView?: () => void;
  onParentView?: () => void;
  onProfilesView?: () => void;
}
const Home: React.FC<HomeProps> = ({ 
  onGetStarted, onShopView, onResourcesView, onSubscriptionView,
  onDashboardView, onSkillsView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onGraceCourtesyView, onParentView, onProfilesView
}) => {
  useSEO(SEO_CONFIG.home);

  return (
    <div className={`min-h-screen ${montessoriTheme.backgrounds.home} p-4 relative overflow-hidden`}>
      {/* Navigation Menu */}
      <div className="absolute top-4 right-4 z-20">
        <NavigationMenu
          onDashboardView={onDashboardView}
          onSkillsView={onSkillsView}
          onPracticalView={onPracticalView}
          onSensorialView={onSensorialView}
          onLanguageView={onLanguageView}
          onMathView={onMathView}
          onGeographyView={onGeographyView}
          onBotanyView={onBotanyView}
          onArtView={onArtView}
          onGraceCourtesyView={onGraceCourtesyView}
          onShopView={onShopView}
          onResourcesView={onResourcesView}
          onSubscriptionView={onSubscriptionView}
          onParentView={onParentView}
          onProfilesView={onProfilesView}
          showCart={false}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-32 right-16 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-25"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Welcome Header */}
        <div className="text-center py-12">
          <div className="flex flex-col items-center justify-center mb-6">
            {/* Logo Section with Yellow Background */}
            {/* Logo Section with Purple Background */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-40"></div>
              <div className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-3 shadow-xl">
                <img 
                  src="https://d64gsuwffb70l.cloudfront.net/688778d3289f1c9b05c2ffb1_1753917128245_83f1e130.jpeg" 
                  alt="Montessori Life Skills Logo - Children learning together" 
                  className="w-64 h-40 mx-auto rounded-xl object-cover shadow-lg"
                />
              </div>
            </div>
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4 mr-2" />
                Welcome to Your Learning Journey
              </span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Montessori Life Skills for Children
            </h1>
            
            {/* 50+ Life Skills and 100% Montessori Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg">
                <span className="text-2xl font-bold mr-2">50+</span>
                <span className="text-lg font-semibold">Life Skills</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg">
                <span className="text-2xl font-bold mr-2">100%</span>
                <span className="text-lg font-semibold">Montessori</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-5 h-5 text-blue-500 fill-current" />
              <Star className="w-5 h-5 text-blue-500 fill-current" />
              <Star className="w-5 h-5 text-blue-500 fill-current" />
              <Star className="w-5 h-5 text-blue-500 fill-current" />
              <Star className="w-5 h-5 text-blue-500 fill-current" />
              <span className="ml-2 text-sm text-gray-600">Trusted by 10,000+ families worldwide</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
            <p className={`text-xl ${montessoriTheme.text.secondary} mb-6 max-w-3xl mx-auto leading-relaxed`}>
              <span className="text-2xl font-semibold text-purple-600">"Help me to do it myself"</span>
              <br />
              <span className="text-lg">- Dr. Maria Montessori</span>
            </p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
              🌟 Develop independence, concentration, and care for your environment through meaningful, real-world activities designed for ages 2-6.
            </p>
            
            {/* Enhanced Features Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-green-600 mr-2">50+</span>
                  <span className="text-lg font-semibold text-green-800">Practical Life Skills</span>
                </div>
                <p className="text-sm text-green-700 text-center">
                  From pouring water to food preparation, care of self, and care of environment
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-blue-600 mr-2">100%</span>
                  <span className="text-lg font-semibold text-blue-800">Authentic Montessori</span>
                </div>
                <p className="text-sm text-blue-700 text-center">
                  Based on Dr. Maria Montessori's original methods and materials
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 text-lg rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              aria-label="Start your child's Montessori learning journey"
            >
              Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Join 10,000+ happy families</span>
            </div>
          </div>
        </div>

        {/* Montessori Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl" role="img" aria-label="observation">👁️</span>
              </div>
              <CardTitle className="text-xl text-blue-800">Child-Led Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-blue-700">
                We observe each child's natural interests and readiness to learn new practical life skills at their own developmental pace.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl" role="img" aria-label="hands-on">🤲</span>
              </div>
              <CardTitle className="text-xl text-green-800">Hands-On Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-700">
                Real Montessori materials and purposeful activities that connect to daily life and develop essential practical skills.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl" role="img" aria-label="environment">🏠</span>
              </div>
              <CardTitle className="text-xl text-purple-800">Prepared Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-700">
                A carefully organized learning space that promotes independence, order, and respect for educational materials.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;