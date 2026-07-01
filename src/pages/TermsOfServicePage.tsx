import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfServicePage: React.FC = () => {
  const navigate = useNavigate();

  // SEO optimization
  useSEO({
    title: "Terms of Service - Montessori Learning App",
    description: "Terms of service and user agreement for our Montessori learning application. Learn about your rights and responsibilities.",
    keywords: "terms of service, user agreement, montessori app terms, conditions",
    canonical: "/terms-of-service"
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <SEOOptimizer>
      <PageLayout title="Terms of Service" onBack={handleBack}>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <p className="text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
                <p>
                  By accessing and using Montessori Life Skills App, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Description of Service</h2>
                <p>
                  Montessori Life Skills App provides digital Montessori learning activities, progress tracking, and 
                  educational content designed to support children's development through guided practical life skills.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>One account per user is permitted</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Subscription Terms (Auto-Renewable Subscriptions)</h2>
                <p className="mb-3">
                  Montessori Life Skills App offers auto-renewable subscriptions that give you access to the full
                  Montessori curriculum, all premium activities, multiple child profiles, printable bundles, and priority support.
                </p>

                <h3 className="text-lg font-medium mb-2">Available Plans, Length &amp; Price</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li><strong>Premium Monthly</strong> — 1 month of full access for <strong>$29.00 USD</strong>, billed every month.</li>
                  <li><strong>Premium Annual</strong> — 12 months of full access for <strong>$199.00 USD</strong>, billed once per year (approximately $16.58/month).</li>
                  <li>Prices in other currencies are shown at the point of purchase and may vary by region and applicable taxes.</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Payment &amp; Auto-Renewal</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Payment will be charged to your Apple ID (iOS), Google Play account (Android), or the payment method on file with Stripe (web) at confirmation of purchase.</li>
                  <li>Subscriptions <strong>automatically renew</strong> at the same price and duration unless auto-renew is turned off at least 24 hours before the end of the current period.</li>
                  <li>Your account will be charged for renewal within 24 hours prior to the end of the current period.</li>
                  <li>You can manage subscriptions and turn off auto-renewal in your account settings on the App Store, Google Play, or Stripe customer portal after purchase.</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Free Trial (if offered)</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Any unused portion of a free trial period, if offered, will be forfeited when you purchase a subscription.</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Cancellation &amp; Refunds</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period; access continues until then.</li>
                  <li><strong>iOS:</strong> Manage or cancel in <em>Settings &gt; [your name] &gt; Subscriptions</em>.</li>
                  <li><strong>Android:</strong> Manage or cancel in the Google Play Store under <em>Payments &amp; subscriptions &gt; Subscriptions</em>.</li>
                  <li><strong>Web (Stripe):</strong> Manage or cancel via the customer portal link in your receipt email or by contacting support.</li>
                  <li>Refund requests for App Store purchases are handled by Apple at <a className="underline" href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">reportaproblem.apple.com</a>. Web purchases are covered by our 30-day money-back guarantee — contact support@montessorilifeskills.com.</li>
                </ul>

                <h3 className="text-lg font-medium mb-2">Links</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><a className="underline" href="/terms-of-service">Terms of Use (EULA)</a></li>
                  <li><a className="underline" href="/privacy-policy">Privacy Policy</a></li>
                  <li>Apple standard EULA: <a className="underline" href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noreferrer">apple.com/legal/internet-services/itunes/dev/stdeula</a></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Share your account credentials with others</li>
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Distribute or reproduce copyrighted content without permission</li>
                  <li>Use the service in any way that could damage or impair functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
                <p>
                  All content, features, and functionality of the app are owned by us and are protected by copyright, 
                  trademark, and other intellectual property laws. You may not reproduce, distribute, or create 
                  derivative works without our written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
                <p>
                  We shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                  resulting from your use of or inability to use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of significant changes 
                  via email or app notification. Continued use of the service constitutes acceptance of modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="mt-2">
                  Email: support@montessorilifeskills.com<br />
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

export default TermsOfServicePage;