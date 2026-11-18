import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Award, Lightbulb } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <PageLayout title={t('pages.about.title')} onBack={handleBack}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                {t('pages.about.missionTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">{t('pages.about.mission')}</p>
            </CardContent>
          </Card>

          {/* What Makes Us Different */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                {t('pages.about.diffTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.about.d1t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.d1')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.about.d2t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.d2')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.about.d3t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.d3')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.about.d4t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.d4')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                {t('pages.about.teamTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{t('pages.about.team')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold">{t('pages.about.t1t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.t1')}</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{t('pages.about.t2t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.t2')}</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{t('pages.about.t3t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.t3')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Commitment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-green-500" />
                {t('pages.about.commitTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.about.c1t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.c1')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.about.c2t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.c2')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.about.c3t')}</h3>
                  <p className="text-sm text-muted-foreground">{t('pages.about.c3')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">{t('pages.about.qTitle')}</h3>
              <p className="text-muted-foreground mb-4">{t('pages.about.q')}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >{t('pages.about.contact')}</button>
                <button 
                  onClick={() => navigate('/help')}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-accent"
                >{t('pages.about.faq')}</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default AboutPage;