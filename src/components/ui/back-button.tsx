import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = 'Back',
  variant = 'ghost',
  className = ''
}) => {
  return (
    <div className="mb-6">
      <Button
        variant={variant}
        onClick={onClick}
        className={`flex items-center gap-2 hover:bg-accent/50 transition-colors ${className}`}
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Button>
    </div>
  );
};
export default BackButton;