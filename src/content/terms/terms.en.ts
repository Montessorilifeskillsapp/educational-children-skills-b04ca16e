import type { LegalDoc } from '@/content/legal/types';

/**
 * Terms of Service, English source. Translations in ./<lang>.json mirror this exact shape.
 * Inline markup: **bold**, *italic*, [text](link). `{{date}}` in `updated` shows today's date.
 */
export const termsEn: LegalDoc = {
  seoTitle: 'Terms of Service - Montessori Learning App',
  seoDescription: 'Terms of service and user agreement for our Montessori learning application. Learn about your rights and responsibilities.',
  pageTitle: 'Terms of Service',
  updated: 'Last updated: {{date}}',
  translationNote: 'This translation is provided for convenience. If it differs from the English version, the English version applies.',
  sections: [
    { title: 'Agreement to Terms', blocks: [
      { p: 'By accessing and using Montessori Life Skills App, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.' },
    ] },
    { title: 'Description of Service', blocks: [
      { p: "Montessori Life Skills App provides digital Montessori learning activities, progress tracking, and educational content designed to support children's development through guided practical life skills." },
    ] },
    { title: 'User Accounts', blocks: [
      { ul: [
        'You must provide accurate and complete information when creating an account',
        'You are responsible for maintaining the security of your account',
        'You must notify us immediately of any unauthorized use of your account',
        'One account per user is permitted',
      ] },
    ] },
    { title: 'Subscription Terms (Auto-Renewable Subscriptions)', blocks: [
      { p: 'Montessori Life Skills App offers auto-renewable subscriptions that give you access to the full Montessori curriculum, all premium activities, and priority support. Premium includes one child profile; Family includes up to four child profiles.' },
      { h3: 'Available Plans, Length & Price' },
      { ul: [
        '**Premium Monthly** — 1 month of full access for **$29.99 USD**, billed every month.',
        '**Premium Annual** — 12 months of full access for **$199.00 USD**, billed once per year (approximately $16.58/month).',
        '**Family Monthly** — up to four child profiles for **$49.00 USD**, billed every month.',
        '**Family Annual** — up to four child profiles for **$349.00 USD**, billed once per year (approximately $29.08/month).',
        'Prices in other currencies are shown at the point of purchase and may vary by region and applicable taxes.',
      ] },
      { h3: 'Payment & Auto-Renewal' },
      { ul: [
        'Payment will be charged to your Apple ID (iOS), Google Play account (Android), or the payment method on file with Stripe (web) at confirmation of purchase.',
        'Subscriptions **automatically renew** at the same price and duration unless auto-renew is turned off at least 24 hours before the end of the current period.',
        'Your account will be charged for renewal within 24 hours prior to the end of the current period.',
        'You can manage subscriptions and turn off auto-renewal in your account settings on the App Store, Google Play, or Stripe customer portal after purchase.',
        'For annual plans bought on our website, we email a reminder 15 to 30 days before each renewal with the renewal date, the amount and how to cancel.',
      ] },
      { h3: 'Free Trial (if offered)' },
      { ul: [
        'Any unused portion of a free trial period, if offered, will be forfeited when you purchase a subscription.',
      ] },
      { h3: 'Cancellation & Refunds' },
      { ul: [
        'You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period; access continues until then.',
        '**iOS:** Manage or cancel in *Settings > [your name] > Subscriptions*.',
        '**Android:** Manage or cancel in the Google Play Store under *Payments & subscriptions > Subscriptions*.',
        '**Web (Stripe):** Sign in, open the Plans page and choose *Manage or cancel*. You can also use the link in your receipt email or contact support.',
        'Refund requests for App Store purchases are handled by Apple at [reportaproblem.apple.com](https://reportaproblem.apple.com). Web purchases are covered by our 30-day money-back guarantee — contact montessorilifeskills@gmail.com.',
      ] },
      { h3: 'Links' },
      { ul: [
        '[Terms of Use (EULA)](/terms-of-service)',
        '[Privacy Policy](/privacy-policy)',
        'Apple standard EULA: [apple.com/legal/internet-services/itunes/dev/stdeula](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/)',
      ] },
    ] },
    { title: 'Acceptable Use', blocks: [
      { p: 'You agree not to:' },
      { ul: [
        'Share your account credentials with others',
        'Use the service for any illegal or unauthorized purpose',
        'Attempt to gain unauthorized access to our systems',
        'Distribute or reproduce copyrighted content without permission',
        'Use the service in any way that could damage or impair functionality',
      ] },
    ] },
    { title: 'Intellectual Property', blocks: [
      { p: 'The original content in Montessori Life Skills App is protected by intellectual property law. Access to the app or purchase of the song collection gives you permission to use the content as described below; it does not transfer copyright or ownership of the recordings, videos, or other original materials. Montessori principles and methods themselves are not claimed as our exclusive property.' },
      { h3: 'Kerry’s Montessori Songs' },
      { p: 'Kerry Howard retains rights in her original songs and recordings. The family song-collection purchase provides access to stream the full songs through the app for your family. Free previews are available without a purchase. Neither access option permits downloading, copying, recording, redistributing, reselling, or using the songs in another product or publication. Purchasing family access does not grant a school license or rights to use any name or mark.' },
      { h3: 'School license' },
      { p: 'Classroom and other institutional use of the songs is permitted only under a school license arranged directly with Kerry. The school license is a single agreement covering the curriculum app, the School Portal and the song collection for the licensed school and its named staff. Family subscriptions or song purchases cannot be used for classroom or institutional purposes. For school licensing, contact montessorilifeskills@gmail.com. The full [Songs License Agreement](/songs-licence) applies.' },
      { h3: 'Instructional videos and app content' },
      { p: 'Original instructional videos and other original app materials belong to Montessori Life Skills or their respective rights holders. Access is for viewing within the app under your account, subject to the access level shown for each activity. You may not download, record, copy, share, republish, sell, or create derivative works from these videos or materials without written permission from the relevant rights holder. For permission or licensing enquiries, contact montessorilifeskills@gmail.com.' },
    ] },
    { title: 'Limitation of Liability', blocks: [
      { p: 'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.' },
    ] },
    { title: 'Changes to Terms', blocks: [
      { p: 'We reserve the right to modify these terms at any time. We will notify users of significant changes via email or app notification. Continued use of the service constitutes acceptance of modified terms.' },
    ] },
    { title: 'Contact Information', blocks: [
      { p: 'For questions about these Terms of Service, please contact us at:' },
      { p: 'Email: montessorilifeskills@gmail.com' },
    ] },
  ],
};
