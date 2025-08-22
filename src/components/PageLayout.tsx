import React from 'react';
import BackButton from '@/components/ui/back-button';

interface PageLayoutProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  showBackButton?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  onBack,
  children,
  showBackButton = true,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 ${className}`}>
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {showBackButton && (
            <BackButton onClick={onBack} />
          )}
          <h1 className="text-2xl font-bold text-foreground flex-1 text-center">
            {title}
          </h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;