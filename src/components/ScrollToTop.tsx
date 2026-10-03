import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global scroll restoration.
 * Scrolls the window to the top on every route change, unless the navigation
 * targets an in-page anchor (hash).
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect hash/anchor links so in-page jumps still work.
    if (hash) {
      // Wait for the target section to render, then jump to it.
      let tries = 0;
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setInterval(() => {
        const el = document.getElementById(id);
        if (el || ++tries > 20) {
          window.clearInterval(timer);
          el?.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 100);
      return () => window.clearInterval(timer);
    }

    // Force scroll to top across browsers and mobile webviews.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll any commonly used scrollable containers just in case.
    const scrollContainers = document.querySelectorAll('[data-scroll-container], .scroll-container');
    scrollContainers.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
