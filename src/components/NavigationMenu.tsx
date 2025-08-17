import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SecurityStatusIndicator } from './SecurityStatusIndicator';
import CartModal from './CartModal';
import { useCart } from '@/contexts/CartContext';
import { 
  Menu, ShoppingBag, BookOpen, Settings, Home, Brain, 
  Palette, Calculator, Globe, Leaf, Heart, User, Users,
  ChevronDown, ChevronUp, ShoppingCart
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
  onShopView?: () => void;
  onResourcesView?: () => void;
  onSubscriptionView?: () => void;
  onParentView?: () => void;
  onProfilesView?: () => void;
  showCart?: boolean; // New prop to control cart visibility
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onGraceCourtesyView, onShopView, onResourcesView,
  onSubscriptionView, onParentView, onProfilesView, showCart = true
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
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
    { label: 'Shop', icon: ShoppingBag, onClick: onShopView, color: 'border-gray-300' },
    { label: 'Resources', icon: BookOpen, onClick: onResourcesView, color: 'border-gray-300' },
    { label: 'Plans', icon: Settings, onClick: () => { onSubscriptionView?.(); navigate('/plans'); }, color: 'border-gray-300' },
    { label: 'Parent Dashboard', icon: User, onClick: onParentView, color: 'border-gray-300' },
    { label: 'Profiles', icon: Users, onClick: onProfilesView, color: 'border-gray-300' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-2">
        <SecurityStatusIndicator />
        {/* Conditionally show cart button based on showCart prop */}
        {showCart && (
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            size="sm"
            className="bg-white border-2 border-purple-400 hover:bg-purple-50 relative shadow-md"
          >
            <ShoppingCart className="w-4 h-4 text-purple-600" />
            <span className="ml-2 font-medium text-purple-600">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </Button>
        )}
      </div>
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        variant="outline"
        size="sm"
        className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50"
      >
        <Menu className="w-4 h-4 mr-2" />
        Menu
        {isMenuOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
      </Button>
      
      {isMenuOpen && (
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
                    setIsMenuOpen(false);
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
      
      <CartModal />
    </div>
  );
};


export default NavigationMenu;