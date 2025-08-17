// Performance optimization utilities

// Lazy loading helper for images
export const LazyImageObserver = (() => {
  let observer: IntersectionObserver | null = null;

  const getObserver = () => {
    if (!observer && typeof window !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer?.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01,
        }
      );
    }
    return observer;
  };

  return {
    observe: (img: HTMLImageElement) => {
      const obs = getObserver();
      if (obs) obs.observe(img);
    },
    unobserve: (img: HTMLImageElement) => {
      const obs = getObserver();
      if (obs) obs.unobserve(img);
    },
  };
})();

// Debounce function for search and form inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Preload critical resources
export const preloadResource = (href: string, as: string = 'script') => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  }
};

// Web vitals reporting
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    console.log(metric);
  }
};

// Optimize images for different screen sizes
export const getOptimizedImageUrl = (
  baseUrl: string,
  width?: number,
  quality: number = 75
): string => {
  if (!width) return baseUrl;
  
  // This would integrate with your image optimization service
  // For now, return the original URL
  return baseUrl;
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log({
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    });
  }
};