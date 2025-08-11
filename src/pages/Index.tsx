import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Target, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Education Children{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Skills
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Empowering young minds through interactive learning experiences 
                  that build essential skills for tomorrow's world.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero" className="text-lg px-8 py-6">
                  <Sparkles className="w-5 h-5" />
                  Start Learning
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Explore Skills
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Kids</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">50+</div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Children learning and developing skills through interactive education"
                  className="w-full h-auto rounded-2xl shadow-glow"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-xl rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Building Tomorrow's{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                Leaders
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform focuses on developing key skills that children need 
              to succeed in an ever-changing world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Interactive Learning
                </h3>
                <p className="text-muted-foreground">
                  Engaging activities and games that make learning fun and effective 
                  for children of all ages.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-glow transition-all duration-300 border-2 hover:border-secondary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Social Skills
                </h3>
                <p className="text-muted-foreground">
                  Collaborative activities that help children develop communication, 
                  teamwork, and leadership abilities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-glow transition-all duration-300 border-2 hover:border-accent/20 md:col-span-2 lg:col-span-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-learning rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Goal Setting
                </h3>
                <p className="text-muted-foreground">
                  Teaching children to set achievable goals and celebrate their 
                  progress along the learning journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Ready to Start Your Child's{" "}
              <span className="bg-gradient-learning bg-clip-text text-transparent">
                Learning Adventure?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of families who are already building their children's 
              skills for a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="learning" className="text-lg px-8 py-6">
                Get Started Today
              </Button>
              <Button size="lg" variant="warm" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;