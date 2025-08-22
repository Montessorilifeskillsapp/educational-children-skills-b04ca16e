import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  // SEO optimization
  useSEO({
    title: "Privacy Policy - Montessori Learning App",
    description: "Our privacy policy explains how we collect, use, and protect your personal information in our Montessori learning application.",
    keywords: "privacy policy, data protection, montessori app privacy, user data",
    canonical: "/privacy-policy"
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <SEOOptimizer>
      <PageLayout title="Privacy Policy" onBack={handleBack}>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <p className="text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Introduction</h2>
                <p>
                  Welcome to Montessori Life Skills App. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you use our application.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Email address (for account creation and communication)</li>
                  <li>Name (optional, for personalization)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2">Usage Data</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>App usage patterns and preferences</li>
                  <li>Learning progress and activity completion</li>
                  <li>Device information and technical data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide and maintain our learning services</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Personalize your learning experience</li>
                  <li>Send important updates and notifications</li>
                  <li>Improve our app and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. Payment information is processed securely through Stripe and we never 
                  store complete credit card information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
                <p>
                  Our app is designed for children under parental supervision. We do not knowingly collect personal information 
                  directly from children under 13. If you are a parent or guardian and believe your child has provided us with 
                  personal information, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mt-2">
                  Email: privacy@montessorilifeskills.com<br />
                  Address: [Your Business Address]
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default PrivacyPolicyPage;