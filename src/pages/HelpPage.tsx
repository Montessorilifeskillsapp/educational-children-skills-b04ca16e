import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, Book, Settings, CreditCard, Users } from 'lucide-react';

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // SEO optimization
  useSEO({
    title: "Help & FAQ - Montessori Learning App",
    description: "Find answers to frequently asked questions about our Montessori learning app, subscriptions, activities, and more.",
    keywords: "help, FAQ, questions, montessori app support, troubleshooting, guide",
    canonical: "/help"
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  type Faq = { q: string; a: string };
  const faqList = (key: string): Faq[] => {
    const v = t(`pages.help.faq.${key}`, { returnObjects: true }) as unknown;
    return Array.isArray(v) ? (v as Faq[]) : [];
  };
  const faqData = [
    { key: 'start', icon: <Book className="w-5 h-5" /> },
    { key: 'billing', icon: <CreditCard className="w-5 h-5" /> },
    { key: 'using', icon: <Settings className="w-5 h-5" /> },
    { key: 'family', icon: <Users className="w-5 h-5" /> },
  ].map(({ key, icon }) => ({
    category: t(`pages.help.cats.${key}`),
    icon,
    questions: faqList(key).map(({ q, a }) => ({ question: q, answer: a })),
  }));

  return (
    <SEOOptimizer>
      <PageLayout title={t('pages.help.title')} onBack={handleBack}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6" />{t('pages.help.introTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{t('pages.help.intro')}</p>
              <Button onClick={handleContactUs} variant="outline">{t('pages.help.contactSupport')}</Button>
            </CardContent>
          </Card>

          {/* FAQ Sections */}
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}

          {/* Still Need Help */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">{t('pages.help.stillTitle')}</h3>
              <p className="text-muted-foreground mb-4">{t('pages.help.still')}</p>
              <Button onClick={handleContactUs}>{t('pages.help.contactUs')}</Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default HelpPage;