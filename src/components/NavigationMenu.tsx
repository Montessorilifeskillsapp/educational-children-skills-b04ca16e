import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { schoolCall } from '@/components/school/api';
import {
  Menu, BookOpen, Settings, Home, Brain,
  Palette, Calculator, Globe, Leaf, Heart, User, Users,
  ChevronDown, ChevronUp, LogIn, BarChart3, ShoppingBag, KeyRound, School
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
  onClassroomSetupView?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  onDashboardView, onPracticalView, onSensorialView,
  onLanguageView, onMathView, onGeographyView, onBotanyView,
  onArtView, onCulturalView, onGraceCourtesyView,
  onSubscriptionView, onParentView, onProfilesView, onClassroomSetupView
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSchoolStaff, setIsSchoolStaff] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthContext();

  useEffect(() => {
    setIsSchoolStaff(false);
    if (!user) return;
    let cancelled = false;
    let checking = false;
    const refresh = async () => {
      if (checking || !navigator.onLine) return;
      checking = true;
      try {
        // The server accepts matching pending invitations before returning active memberships.
        const result = await schoolCall<{ memberships: { id: string }[] }>({ action: 'me' });
        if (!cancelled) setIsSchoolStaff(!!result.memberships?.length);
      } catch {
        // Keep existing access visible during a temporary connection failure.
      } finally { checking = false; }
    };
    void refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
    };
  }, [user?.id, isOpen]);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsSchoolStaff(false);
      return;
    }
    const checkAdmin = async () => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      setIsAdmin(!!data);
    };

    checkAdmin();
  }, [user]);

  const navigationItems = [
    ...(!user ? [{ label: t('chrome.menu.login'), icon: LogIn, onClick: () => navigate('/auth'), color: 'border-primary/30' }] : []),
    { label: t('chrome.menu.dashboard'), icon: Home, onClick: onDashboardView, color: 'border-border' },
    { label: t('nav.practicalLife'), icon: Heart, onClick: () => { onPracticalView?.(); navigate('/practical-life'); }, color: 'border-primary/40' },
    { label: t('nav.sensorial'), icon: Brain, onClick: onSensorialView, color: 'border-primary/40' },
    { label: t('nav.language'), icon: BookOpen, onClick: onLanguageView, color: 'border-primary/40' },
    { label: t('nav.math'), icon: Calculator, onClick: onMathView, color: 'border-primary/40' },
    { label: t('nav.geography'), icon: Globe, onClick: onGeographyView, color: 'border-primary/40' },
    { label: t('nav.botany'), icon: Leaf, onClick: onBotanyView, color: 'border-primary/40' },
    { label: t('nav.art'), icon: Palette, onClick: onArtView, color: 'border-primary/40' },
    { label: t('chrome.menu.cultural'), icon: Globe, onClick: onCulturalView, color: 'border-primary/40' },
    { label: t('nav.graceCourtesy'), icon: Heart, onClick: onGraceCourtesyView, color: 'border-primary/40' },
    { label: t('nav.shop'), icon: ShoppingBag, onClick: () => navigate('/shop'), color: 'border-primary/30' },
    { label: t('nav.classroomSetup'), icon: School, onClick: () => { onClassroomSetupView?.(); navigate('/classroom-setup'); }, color: 'border-primary/30' },
    { label: t('chrome.menu.plans'), icon: Settings, onClick: () => { onSubscriptionView?.(); navigate('/plans'); }, color: 'border-border' },
    { label: t('chrome.menu.familyDashboard'), icon: User, onClick: onParentView, color: 'border-border' },
    { label: t('chrome.menu.profiles'), icon: Users, onClick: onProfilesView, color: 'border-border' },
    ...(isSchoolStaff ? [{ label: t('chrome.menu.schoolAdmin'), icon: School, onClick: () => navigate('/school'), color: 'border-primary/30' }] : []),
    ...(isAdmin ? [
      { label: t('chrome.menu.appAdmin'), icon: BarChart3, onClick: () => navigate('/admin'), color: 'border-destructive/40' },
      { label: t('chrome.menu.accessCodes'), icon: KeyRound, onClick: () => navigate('/admin/access-codes'), color: 'border-destructive/40' },
    ] : []),
    { label: t('chrome.menu.terms'), icon: BookOpen, onClick: () => navigate('/terms-of-service'), color: 'border-border' },
    { label: t('chrome.menu.privacy'), icon: BookOpen, onClick: () => navigate('/privacy-policy'), color: 'border-border' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-2">
        <ThemeToggle />
        <LanguageSelector />
      </div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent"
      >
        <Menu className="w-4 h-4 mr-2" />
        {t('chrome.menu.menu')}
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