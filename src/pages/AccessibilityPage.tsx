import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';

const AccessibilityPage: React.FC = () => {
  const navigate = useNavigate();
  useSEO({
    title: 'Accessibility Statement - Montessori Life Skills',
    description: 'How Montessori Life Skills works toward an accessible app for parents, teachers and school staff, known gaps, and how to ask for help.',
    keywords: 'accessibility statement, WCAG 2.1 AA, Section 508, ADA, montessori app accessibility',
    canonical: '/accessibility',
  });

  return (
    <SEOOptimizer>
      <PageLayout title="Accessibility Statement" onBack={() => navigate(-1)}>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <p className="text-sm text-muted-foreground mb-6">Last updated: November 16, 2026</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Our commitment</h2>
                <p className="mb-4">
                  We want every parent, teacher, assistant and school administrator to be able to use Montessori Life Skills, including people who
                  use a screen reader, a keyboard instead of a mouse, magnification, or captions.
                </p>
                <p className="mb-4">
                  We are working toward the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, the standard used by U.S. public schools under
                  the Americans with Disabilities Act (ADA) and Section 508. This applies to the website, the iPhone and Android apps, and the School Portal.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">What we do</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Text descriptions for activity and material photos.</li>
                  <li>The app follows your device's reduced-motion and high-contrast settings.</li>
                  <li>Clear headings and step-by-step instructions written in plain language.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Known gaps we are working on</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Lesson video captions:</strong> lesson videos do not have captions yet. We plan to add them. Until then, every activity has written step-by-step instructions covering the same presentation.</li>
                  <li><strong>Full review:</strong> we have not yet completed a full WCAG 2.1 AA review of every page. If something does not work for you, please tell us.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Ask for help or report a problem</h2>
                <p className="mb-4">
                  If you have trouble using any part of the app, or need content in another format, email{' '}
                  <a href="mailto:montessorilifeskills@gmail.com" className="text-primary hover:underline">montessorilifeskills@gmail.com</a>.
                  Tell us the page or activity and what happened, and we will help you get the information another way while we fix it.
                </p>
                <p className="mb-4">
                  Schools that need an accessibility conformance report (VPAT) for a purchasing review can request one at the same address.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default AccessibilityPage;
