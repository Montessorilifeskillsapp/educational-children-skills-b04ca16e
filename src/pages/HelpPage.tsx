import React from 'react';
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

  const faqData = [
    {
      category: "Getting Started",
      icon: <Book className="w-5 h-5" />,
      questions: [
        {
          question: "What is the Montessori approach?",
          answer: "The Montessori method is an educational approach that emphasizes hands-on learning, self-directed activity, and collaborative play. Our app brings these principles to digital practical life skills, helping children develop independence, confidence, and real-world capabilities."
        },
        {
          question: "What age group is this app designed for?",
          answer: "Our app is designed for children aged 2-6 years, covering the primary Montessori age range. Activities are carefully crafted to match developmental stages and can be adapted based on your child's individual progress."
        },
        {
          question: "Do I need any special materials?",
          answer: "Many activities can be done with common household items. Our app includes detailed material lists and suggests alternatives when special items are needed. Premium subscribers get access to printable guides and material recommendations."
        }
      ]
    },
    {
      category: "Subscriptions & Billing",
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes 3 core activities (pouring, sweeping, rolling a mat), 1 printable activity sheet, and daily life skill prompts. It's perfect for getting started with Montessori learning at home."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes! You can cancel your subscription at any time through your account settings or the Stripe customer portal. Your premium features will remain active until the end of your current billing period."
        },
        {
          question: "What's the difference between monthly, annual, and lifetime plans?",
          answer: "Monthly ($9.99) bills every month, Annual ($79.99) saves 33% and includes bonus seasonal packs, and Lifetime ($149) is a one-time payment for permanent access to all current and future premium features."
        }
      ]
    },
    {
      category: "Using the App",
      icon: <Settings className="w-5 h-5" />,
      questions: [
        {
          question: "How do I track my child's progress?",
          answer: "Premium subscribers have access to a detailed parent dashboard showing completed activities, skill development, and personalized recommendations. You can also generate progress reports and certificates."
        },
        {
          question: "Can I use the app offline?",
          answer: "Currently, the app requires an internet connection for full functionality. However, you can download and print activity guides to use offline with your child."
        },
        {
          question: "How often are new activities added?",
          answer: "We add new activities monthly for premium subscribers. Free users receive occasional new content and updates to existing activities."
        }
      ]
    },
    {
      category: "Family & Profiles",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "Can I create profiles for multiple children?",
          answer: "Yes! Premium subscribers can create multiple child profiles to track individual progress and customize activities for each child's developmental stage and interests."
        },
        {
          question: "Is the app safe for children?",
          answer: "Absolutely. We prioritize child safety with no external links, ads, or social features. All content is created by certified Montessori educators and reviewed for age-appropriateness."
        },
        {
          question: "Can other family members access the account?",
          answer: "Your subscription covers your family's use. We recommend sharing account credentials securely within your household. Each child can have their own profile for personalized tracking."
        }
      ]
    }
  ];

  return (
    <SEOOptimizer>
      <PageLayout title="Help & FAQ" onBack={handleBack}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6" />
                How can we help you?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Find answers to common questions about our Montessori learning app. 
                If you can't find what you're looking for, don't hesitate to contact our support team.
              </p>
              <Button onClick={handleContactUs} variant="outline">
                Contact Support
              </Button>
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
              <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <Button onClick={handleContactUs}>
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default HelpPage;