import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SecurityStatusIndicator } from './SecurityStatusIndicator';
import { 
  Menu, BookOpen, Settings, Home, Brain, 
  Palette, Calculator, Globe, Leaf, Heart, User, Users,
  ChevronDown, ChevronUp
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
  onGraceCourtesyView?: () => void;
  onResourcesView?: () => void;
  onSubscriptionView?: () => void;
  onParentView?: () => void;
  onProfilesView?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onGraceCourtesyView, onResourcesView,
  onSubscriptionView, onParentView, onProfilesView
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', icon: Home, onClick: onDashboardView, color: 'border-gray-300' },
    
    { label: 'Practical Life', icon: Heart, onClick: () => { onPracticalView?.(); navigate('/practical-life'); }, color: 'border-amber-400' },
    { label: 'Sensorial', icon: Brain, onClick: onSensorialView, color: 'border-blue-400' },
    { label: 'Language', icon: BookOpen, onClick: onLanguageView, color: 'border-yellow-400' },
    { label: 'Math', icon: Calculator, onClick: onMathView, color: 'border-red-400' },
    { label: 'Geography', icon: Globe, onClick: onGeographyView, color: 'border-cyan-400' },
    { label: 'Botany', icon: Leaf, onClick: onBotanyView, color: 'border-green-400' },
    { label: 'Art', icon: Palette, onClick: onArtView, color: 'border-pink-400' },
    { label: 'Grace & Courtesy', icon: Heart, onClick: onGraceCourtesyView, color: 'border-purple-400' },
    { label: 'Resources', icon: BookOpen, onClick: onResourcesView, color: 'border-gray-300' },
    { label: 'Plans', icon: Settings, onClick: () => { onSubscriptionView?.(); navigate('/plans'); }, color: 'border-gray-300' },
    { label: 'Family Dashboard', icon: User, onClick: onParentView, color: 'border-gray-300' },
    { label: 'Profiles', icon: Users, onClick: onProfilesView, color: 'border-gray-300' }
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
        className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50"
      >
        <Menu className="w-4 h-4 mr-2" />
        Menu
        {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-purple-200 z-30 max-h-96 overflow-y-auto">
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
                  className={`w-full justify-start mb-1 hover:bg-purple-50 border ${item.color}`}
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