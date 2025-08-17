import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PageLayoutProps {
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
  showBackButton?: boolean;
  className?: string;
  headerAction?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  onBack,
  children,
  showBackButton = true,
  className = '',
  headerAction
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 ${className}`}>
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {showBackButton && onBack && (
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <h1 className="text-2xl font-bold text-gray-800">
              {title}
            </h1>
          </div>
          {headerAction && (
            <div className="flex items-center gap-2">
              {headerAction}
            </div>
          )}
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