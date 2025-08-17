import React, { useState, useRef, useEffect } from 'react';
import { LazyImageObserver } from '@/lib/performance';

interface LaunchOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
}

export const LaunchOptimizedImage: React.FC<LaunchOptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 75,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || loading !== 'lazy') return;

    LazyImageObserver.observe(img);

    return () => {
      if (img) LazyImageObserver.unobserve(img);
    };
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const imgSrc = loading === 'lazy' ? undefined : src;
  const dataSrc = loading === 'lazy' ? src : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <svg
            className="w-8 h-8 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div
          className="bg-red-50 flex items-center justify-center border-2 border-dashed border-red-200"
          style={{ width, height }}
        >
          <span className="text-red-500 text-sm">Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={imgSrc}
        data-src={dataSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding="async"
        // Performance optimization attributes
        {...(loading === 'lazy' && { 'data-lazy': 'true' })}
      />
    </div>
  );
};

export default LaunchOptimizedImage;