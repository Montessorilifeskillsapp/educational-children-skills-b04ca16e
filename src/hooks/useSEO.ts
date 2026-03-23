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
    // Update title
    if (title) {
      document.title = `${title} | Montessori Skills Guide`;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Update Open Graph image
    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', ogImage);
      }
      let twitterImageMeta = document.querySelector('meta[property="twitter:image"]');
      if (twitterImageMeta) {
        twitterImageMeta.setAttribute('content', ogImage);
      }
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
    title: 'Practical Life Skills for Children - Montessori Learning App',
    description: 'Teach your child essential life skills with our Montessori-based app. Interactive activities, progress tracking, and premium materials for ages 2-6. Start free today!',
    keywords: 'montessori, children education, life skills, practical life, toddler activities, preschool learning, child development, independence skills',
    canonical: 'https://montessorilifeskillsapp.com',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Montessori Skills Guide",
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
  resources: {
    title: 'Montessori Learning Resources & Educational Materials',
    description: 'Download comprehensive Montessori guides, activity packs, and educational resources for home learning.',
    keywords: 'montessori resources, educational downloads, learning guides, activity packs, home learning',
    canonical: 'https://montessorilifeskillsapp.com/resources'
  }
};