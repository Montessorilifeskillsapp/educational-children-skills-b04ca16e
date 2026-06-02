import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

export const useSEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage,
  structuredData 
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | Montessori Life Skills` : document.title;

    // Update title
    if (title) {
      document.title = fullTitle;
    }

    const setMeta = (selector: string, attr: string, key: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // Update meta description
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }

    // OG / Twitter title sync
    if (title) {
      setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    }

    // Update meta keywords
    if (keywords) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // Update canonical URL + og:url
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
      setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
      setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', canonical);
    }

    // Update Open Graph image
    if (ogImage) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    // Add structured data
    if (structuredData) {
      let existingScript = document.querySelector('script[type="application/ld+json"]#dynamic-seo');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'dynamic-seo';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonical, ogImage, structuredData]);
};

// Enhanced SEO configurations for different pages
export const SEO_CONFIG = {
  home: {
    title: 'Montessori Activities Ages 2–6 | AMI-Aligned',
    description: 'AMI-aligned Montessori activities for ages 2–6. Step-by-step photo guides, real Practical Life, Sensorial & Math lessons. Start free.',
    keywords: 'montessori, children education, life skills, practical life, toddler activities, preschool learning, child development, independence skills',
    canonical: 'https://montessorilifeskillsapp.com',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Montessori Life Skills",
      "description": "Montessori-based learning app for children's practical life skills development",
      "url": "https://montessorilifeskillsapp.com",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "audience": {
        "@type": "Audience",
        "audienceType": "Parents, Teachers, and Educators",
        "suggestedMinAge": 2,
        "suggestedMaxAge": 6
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  dashboard: {
    title: 'Child Progress Dashboard - Track Learning Milestones',
    description: 'Track your child\'s learning progress with detailed analytics and skill development milestones in our Montessori-based learning app.',
    keywords: 'child progress, learning analytics, montessori tracking, skill development, educational dashboard',
    canonical: 'https://montessorilifeskillsapp.com/dashboard'
  },
  shop: {
    title: 'Montessori Learning Materials & Educational Bundles',
    description: 'Premium Montessori learning materials and activity bundles. High-quality educational tools to enhance your child\'s practical life skills development.',
    keywords: 'montessori materials, educational toys, learning bundles, practical life materials, child development tools',
    canonical: 'https://montessorilifeskillsapp.com/shop',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Montessori Learning Materials Shop",
      "description": "Premium educational materials for Montessori learning"
    }
  },
  subscription: {
    title: 'Premium Family Learning Plans - Unlock Advanced Activities',
    description: 'Unlock advanced Montessori activities and exclusive content with our premium plans for families and educators. 30-day money-back guarantee.',
    keywords: 'montessori premium, family learning plan, educational subscription, advanced activities, teacher resources',
    canonical: 'https://montessorilifeskillsapp.com/subscription'
  },
  parentDashboard: {
    title: 'Family Dashboard - Monitor Child Development',
    description: 'Comprehensive family and educator dashboard to monitor children\'s Montessori learning progress, set goals, and track development.',
    keywords: 'family dashboard, teacher dashboard, child monitoring, learning progress, montessori tools',
    canonical: 'https://montessorilifeskillsapp.com/parent-dashboard'
  },
  skillActivity: {
    title: 'Interactive Montessori Activity',
    description: 'Engage in hands-on Montessori practical life activities designed to develop independence and essential life skills.',
    keywords: 'montessori activity, practical life skills, interactive learning, child independence',
    canonical: 'https://montessorilifeskillsapp.com/activity'
  },


};