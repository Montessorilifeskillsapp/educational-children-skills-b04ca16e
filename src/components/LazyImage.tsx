import React, { useState, useRef, useEffect } from 'react';
import { LazyImageObserver } from '@/lib/performance';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+',
  loading = 'lazy',
  width,
  height,
  onLoad,
  onError
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
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imgSrc = loading === 'lazy' ? undefined : src;
  const dataSrc = loading === 'lazy' ? src : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
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
          className="bg-red-50 flex items-center justify-center border-2 border-dashed border-red-200 rounded"
          style={{ width, height }}
        >
          <span className="text-red-500 text-sm">Image failed to load</span>
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
        className={`transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding="async"
        {...(loading === 'lazy' && { 'data-lazy': 'true' })}
      />
    </div>
  );
};