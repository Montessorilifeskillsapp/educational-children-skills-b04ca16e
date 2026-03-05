import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, Star, Users, CheckCircle, Sparkles, Award, BookOpen, Target, Shield, GraduationCap, Home as HomeIcon, Users2 } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import NavigationMenu from './NavigationMenu';
import realisticHeroImage from '@/assets/realistic-montessori-children.jpg';
import { useAuthContext } from '@/components/AuthProvider';
import { Link } from 'react-router-dom';

interface HomeProps {
  onGetStarted: () => void;
  onShopView?: () => void;
  onResourcesView?: () => void;
  onSubscriptionView?: () => void;
  onDashboardView?: () => void;
  
  onPracticalView?: () => void;
  onSensorialView?: () => void;
  onLanguageView?: () => void;
  onMathView?: () => void;
  onGeographyView?: () => void;
  onBotanyView?: () => void;
  onArtView?: () => void;
  onCulturalView?: () => void;
  onGraceCourtesyView?: () => void;
  onParentView?: () => void;
  onProfilesView?: () => void;
}

const Home: React.FC<HomeProps> = ({ 
  onGetStarted, onResourcesView, onSubscriptionView,
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onCulturalView, onGraceCourtesyView, onParentView, onProfilesView
}) => {
  useSEO(SEO_CONFIG.home);
  const { user } = useAuthContext();

  const features = [
    { icon: CheckCircle, text: "50+ Life Skills Activities", color: "text-emerald-600" },
    { icon: Award, text: "100% Authentic Montessori", color: "text-blue-600" },
    { icon: Target, text: "Ages 2-6 Curriculum", color: "text-purple-600" },
    { icon: Shield, text: "Safe & Secure Platform", color: "text-indigo-600" }
  ];

  const testimonials = [
    {
      quote: "My daughter loves the hands-on activities. She's gained so much independence!",
      author: "Sarah M.",
      role: "Parent of 4-year-old"
    },
    {
      quote: "Finally, authentic Montessori education at home. The step-by-step guidance is perfect.",
      author: "Maria K.",
      role: "Montessori Educator"
    },
    {
      quote: "The progress tracking helps me see exactly how my son is developing.",
      author: "David L.",
      role: "Father of twins"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-sm animate-bounce"></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {!user && (
          <Link to="/auth">
            <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
              Sign In
            </Button>
          </Link>
        )}
        <NavigationMenu
          onDashboardView={onDashboardView}
          
          onPracticalView={onPracticalView}
          onSensorialView={onSensorialView}
          onLanguageView={onLanguageView}
          onMathView={onMathView}
          onGeographyView={onGeographyView}
          onBotanyView={onBotanyView}
          onArtView={onArtView}
          onCulturalView={onCulturalView}
          onGraceCourtesyView={onGraceCourtesyView}
          onResourcesView={onResourcesView}
          onSubscriptionView={onSubscriptionView}
          onParentView={onParentView}
          onProfilesView={onProfilesView}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium mb-8 shadow-lg animate-fade-in">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 10,000+ families worldwide
              </div>

              {/* Hero Image */}
              <div className="mb-8 animate-scale-in">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 scale-110"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-2 shadow-2xl">
                    <img 
                      src={realisticHeroImage} 
                      alt="Children learning with Montessori materials - puzzle and leaf" 
                      className="w-96 h-56 mx-auto rounded-2xl object-cover shadow-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Montessori Life Skills
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">for Every Child</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in">
                Transform your child's learning journey with authentic Montessori activities for homeschooling parents and classroom teachers that build independence, confidence, and real-world skills
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <feature.icon className={`w-5 h-5 mr-2 ${feature.color}`} />
                    <span className="text-slate-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  Start Free Journey <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <div className="flex items-center gap-2 text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium">4.9/5 from 2,000+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Why Homeschooling Parents & Classroom Teachers Choose Our Platform
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Experience the authentic Montessori method with modern technology and expert guidance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-blue-800 group-hover:text-blue-900 transition-colors">Child-Led Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-blue-700 text-center text-lg leading-relaxed">
                    Follow your child's natural curiosity and developmental pace with activities that spark genuine interest and sustained focus
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-emerald-800 group-hover:text-emerald-900 transition-colors">Hands-On Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-emerald-700 text-center text-lg leading-relaxed">
                    Real Montessori materials and purposeful activities that develop practical life skills, coordination, and independence
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-800 group-hover:text-purple-900 transition-colors">Expert Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-700 text-center text-lg leading-relaxed">
                    Comprehensive step-by-step instructions and progress tracking to support children, parents, and teachers through the learning journey
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User Types Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Built for Parents, Teachers & Assistants
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Whether you're homeschooling, teaching in a classroom, or assisting in early education, our platform adapts to your unique needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-2 border-pink-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-rose-500"></div>
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <HomeIcon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-slate-800 group-hover:text-pink-600 transition-colors">For Parents</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Easy-to-follow activities for homeschooling success</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Track your child's progress and developmental milestones</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Build independence and confidence at home</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">No teaching experience required</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-blue-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-slate-800 group-hover:text-blue-600 transition-colors">For Teachers</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Complete curriculum aligned with Montessori principles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Manage multiple students with individual progress tracking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Save time with ready-to-use lesson plans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Generate detailed progress reports for parents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-purple-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users2 className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-slate-800 group-hover:text-purple-600 transition-colors">For Assistants</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Step-by-step guidance for presenting activities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Learn authentic Montessori methods on the job</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Support teachers with organized activity resources</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">Build confidence in early childhood education</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Loved by Families Everywhere
              </h2>
              <p className="text-xl text-slate-600">Real stories from parents and educators</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-slate-700 mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold text-slate-800">{testimonial.author}</p>
                      <p className="text-slate-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Child's Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of homeschooling parents and classroom teachers building independence, confidence, and real-world skills through authentic Montessori education
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-50 px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Start Your Free Trial <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <Button 
                  onClick={onSubscriptionView}
                  size="lg"
                  variant="outline"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold backdrop-blur-sm"
                >
                  View Plans & Pricing
                </Button>
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;