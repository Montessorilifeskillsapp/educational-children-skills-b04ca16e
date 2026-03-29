import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SecurityStatusIndicator } from './SecurityStatusIndicator';
import { useAuthContext } from '@/components/AuthProvider';
import {
  Menu, BookOpen, Settings, Home, Brain,
  Palette, Calculator, Globe, Leaf, Heart, User, Users,
  ChevronDown, ChevronUp, LogIn
} from 'lucide-react';

interface NavigationMenuProps {
  onDashboardView?: () => void;
  
  onPracticalView?: () => void;
  onSensorialView?: () => void;
  onLanguageView?: () => void;
  onMathView?: () => void;
  onGeographyView?: () => void;
  onBotanyView?: () => void;
  onArtView?: () => void;
  onCulturalView?: () => void;
  onGraceCourtesyView?: () => void;
  onSubscriptionView?: () => void;
  onParentView?: () => void;
  onProfilesView?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onCulturalView, onGraceCourtesyView,
  onSubscriptionView, onParentView, onProfilesView
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const navigationItems = [
    ...(!user ? [{ label: 'Login', icon: LogIn, onClick: () => navigate('/auth'), color: 'border-primary/30' }] : []),
    { label: 'Dashboard', icon: Home, onClick: onDashboardView, color: 'border-border' },
    { label: 'Practical Life', icon: Heart, onClick: () => { onPracticalView?.(); navigate('/practical-life'); }, color: 'border-primary/40' },
    { label: 'Sensorial', icon: Brain, onClick: onSensorialView, color: 'border-primary/40' },
    { label: 'Language', icon: BookOpen, onClick: onLanguageView, color: 'border-primary/40' },
    { label: 'Math', icon: Calculator, onClick: onMathView, color: 'border-primary/40' },
    { label: 'Geography', icon: Globe, onClick: onGeographyView, color: 'border-primary/40' },
    { label: 'Botany', icon: Leaf, onClick: onBotanyView, color: 'border-primary/40' },
    { label: 'Art', icon: Palette, onClick: onArtView, color: 'border-primary/40' },
    { label: 'Cultural', icon: Globe, onClick: onCulturalView, color: 'border-primary/40' },
    { label: 'Grace & Courtesy', icon: Heart, onClick: onGraceCourtesyView, color: 'border-primary/40' },
    { label: 'Plans', icon: Settings, onClick: () => { onSubscriptionView?.(); navigate('/plans'); }, color: 'border-border' },
    { label: 'Family Dashboard', icon: User, onClick: onParentView, color: 'border-border' },
    { label: 'Profiles', icon: Users, onClick: onProfilesView, color: 'border-border' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-2">
        <SecurityStatusIndicator />
      </div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent"
      >
        <Menu className="w-4 h-4 mr-2" />
        Menu
        {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border z-30 max-h-96 overflow-y-auto">
          <div className="p-2">
            {navigationItems.map((item, index) => {
              if (!item.onClick) return null;
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start mb-1 hover:bg-accent border ${item.color}`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;