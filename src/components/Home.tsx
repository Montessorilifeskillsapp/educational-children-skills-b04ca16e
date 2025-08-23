import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, Star, Users, CheckCircle, Sparkles, Award, BookOpen, Target, Shield } from 'lucide-react';
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
  onGraceCourtesyView?: () => void;
  onParentView?: () => void;
  onProfilesView?: () => void;
}

const Home: React.FC<HomeProps> = ({ 
  onGetStarted, onShopView, onResourcesView, onSubscriptionView,
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onGraceCourtesyView, onParentView, onProfilesView
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
    <div className="min-h-screen bg-gradient-to-br from-montessori-cream via-montessori-sand to-montessori-sky relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-montessori-sage/30 to-montessori-forest/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-montessori-terracotta/30 to-montessori-wood/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-montessori-sage/20 to-accent/30 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-gradient-to-br from-primary/20 to-montessori-terracotta/20 rounded-full blur-sm animate-bounce"></div>
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
          onGraceCourtesyView={onGraceCourtesyView}
          onShopView={onShopView}
          onResourcesView={onResourcesView}
          onSubscriptionView={onSubscriptionView}
          onParentView={onParentView}
          onProfilesView={onProfilesView}
          showCart={false}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-montessori-forest rounded-full text-sm font-medium mb-8 shadow-lg animate-fade-in">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 10,000+ families worldwide
              </div>

              {/* Hero Image */}
              <div className="mb-8 animate-scale-in">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-montessori-wood rounded-3xl blur-2xl opacity-30 scale-110"></div>
                  <div className="relative bg-gradient-to-r from-primary to-montessori-wood rounded-3xl p-2 shadow-2xl">
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
                <span className="bg-gradient-to-r from-primary via-montessori-wood to-montessori-sage bg-clip-text text-transparent">
                  Montessori Life Skills
                </span>
                <br />
                <span className="bg-gradient-to-r from-montessori-sage via-montessori-wood to-primary bg-clip-text text-transparent">for Every Child</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-montessori-earth mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in">
                Transform your child's learning journey with authentic Montessori activities that build independence, confidence, and real-world skills
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <feature.icon className={`w-5 h-5 mr-2 ${feature.color}`} />
                    <span className="text-montessori-earth font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-montessori-wood hover:from-primary/90 hover:to-montessori-wood/90 text-primary-foreground px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  Start Free Journey <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <div className="flex items-center gap-2 text-montessori-earth bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
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
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Parents Choose Our Platform
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the authentic Montessori method with modern technology and expert guidance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-montessori-sky/30 to-montessori-sky/50 border-montessori-sky hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-montessori-wood rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl text-montessori-forest group-hover:text-montessori-forest/80 transition-colors">Child-Led Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-montessori-earth text-center text-lg leading-relaxed">
                    Follow your child's natural curiosity and developmental pace with activities that spark genuine interest and sustained focus
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-montessori-sage/30 to-montessori-sage/50 border-montessori-sage hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-montessori-sage to-montessori-forest rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-montessori-forest group-hover:text-montessori-forest/80 transition-colors">Hands-On Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-montessori-earth text-center text-lg leading-relaxed">
                    Real Montessori materials and purposeful activities that develop practical life skills, coordination, and independence
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-montessori-terracotta/30 to-montessori-terracotta/50 border-montessori-terracotta hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-montessori-terracotta to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-montessori-forest group-hover:text-montessori-forest/80 transition-colors">Expert Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-montessori-earth text-center text-lg leading-relaxed">
                    Comprehensive step-by-step instructions and progress tracking to support both child and parent through the learning journey
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Loved by Families Everywhere
              </h2>
              <p className="text-xl text-muted-foreground">Real stories from parents and educators</p>
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
                    <p className="text-lg text-montessori-earth mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-montessori-wood to-montessori-sage">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Child's Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of families building independence, confidence, and real-world skills through authentic Montessori education
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50 px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
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