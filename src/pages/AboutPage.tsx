import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Award, Lightbulb } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  // SEO optimization
  useSEO({
    title: "About Us - Montessori Learning App",
    description: "Learn about our mission to bring authentic Montessori education to families worldwide through beautifully designed digital learning experiences.",
    keywords: "about montessori app, our mission, montessori education, child development, learning philosophy",
    canonical: "/about"
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <SEOOptimizer>
      <PageLayout title="About Us" onBack={handleBack}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We believe every child deserves to develop independence, confidence, and a love of learning through 
                hands-on experiences. Our app brings the time-tested Montessori method into the digital age, making 
                these transformative educational principles accessible to families worldwide.
              </p>
            </CardContent>
          </Card>

          {/* What Makes Us Different */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                What Makes Us Different
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Authentic Montessori Approach</h3>
                  <p className="text-sm text-muted-foreground">
                    Every activity is designed by certified Montessori educators and follows traditional principles 
                    of self-directed learning and hands-on exploration.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real-World Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    We focus on practical life skills that children can actually use in their daily lives, 
                    building confidence and independence.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Beautiful Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Our carefully crafted illustrations and gentle interface create a calm, focused learning 
                    environment that supports concentration.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Family-Centered</h3>
                  <p className="text-sm text-muted-foreground">
                    We support the parent-child relationship with tools for tracking progress and celebrating 
                    achievements together.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Our diverse team brings together expertise in Montessori education, child development, 
                digital design, and family support.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold">Montessori Educators</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified teachers with decades of classroom experience guide our educational approach.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">Child Development Experts</h3>
                  <p className="text-sm text-muted-foreground">
                    Specialists ensure our activities align with developmental milestones and best practices.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">Creative Professionals</h3>
                  <p className="text-sm text-muted-foreground">
                    Illustrators and designers create beautiful, engaging content that supports learning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Commitment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-green-500" />
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Quality Over Quantity</h3>
                  <p className="text-sm text-muted-foreground">
                    We carefully curate each activity to ensure it meets the highest educational standards 
                    and provides meaningful learning experiences.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Continuous Improvement</h3>
                  <p className="text-sm text-muted-foreground">
                    We listen to families and educators to continuously refine and expand our offerings 
                    based on real needs and feedback.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Accessible Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    We believe quality Montessori education should be accessible to all families, 
                    regardless of location or background.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Questions or Feedback?</h3>
              <p className="text-muted-foreground mb-4">
                We'd love to hear from you! Share your experiences, ask questions, or suggest new features.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Contact Us
                </button>
                <button 
                  onClick={() => navigate('/help')}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-accent"
                >
                  View FAQ
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default AboutPage;