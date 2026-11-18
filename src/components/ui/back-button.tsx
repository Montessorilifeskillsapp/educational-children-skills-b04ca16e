import React from 'react';
import { useTranslation } from 'react-i18next';
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
  label,
  variant = 'ghost',
  className = ''
}) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size="sm"
      className={`flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label ?? t('chrome.back')}
    </Button>
  );
};
export default BackButton;