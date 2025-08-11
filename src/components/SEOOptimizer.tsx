import { useEffect } from 'react';
import { injectStructuredData, generateOrganizationSchema, generateWebsiteSchema } from '../lib/seo';

interface SEOOptimizerProps {
  children: React.ReactNode;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({ children }) => {
  useEffect(() => {
    // Inject global structured data
    injectStructuredData(generateOrganizationSchema());
    injectStructuredData(generateWebsiteSchema());

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/fonts/inter.woff2';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);

    // Add performance hints
    const dnsPreconnect = document.createElement('link');
    dnsPreconnect.rel = 'preconnect';
    dnsPreconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(dnsPreconnect);

    const dnsPreconnect2 = document.createElement('link');
    dnsPreconnect2.rel = 'preconnect';
    dnsPreconnect2.href = 'https://fonts.gstatic.com';
    dnsPreconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(dnsPreconnect2);

    // Add manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Add theme color
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = '#10B981';
    document.head.appendChild(themeColorMeta);

    // Add mobile viewport optimization
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
    }
  }, []);

  return <>{children}</>;
};

export default SEOOptimizer;