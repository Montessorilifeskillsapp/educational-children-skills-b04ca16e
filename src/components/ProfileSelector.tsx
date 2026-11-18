import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Settings, User, Star, BookOpen, Trophy, Target, Calendar, TrendingUp } from 'lucide-react';
import ChildProfileModal from './ChildProfileModal';
import { montessoriTheme } from './ThemeConfig';
import BackButton from '@/components/ui/back-button';
import ChildCoveragePanel from './ChildCoveragePanel';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuthContext } from './AuthProvider';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  interests: string[];
  learningStyle: string;
  covered?: boolean;
}
interface ProfileSelectorProps {
  profiles: ChildProfile[];
  activeProfile: ChildProfile | null;
  onProfileSelect: (profile: ChildProfile) => void;
  onProfileUpdate: (profiles: ChildProfile[]) => void;
  completedSkills?: string[];
  totalSkills?: number;
  onBack?: () => void;
}


const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  profiles,
  activeProfile,
  onProfileSelect,
  onProfileUpdate,
  completedSkills = [],
  totalSkills = 15,
  onBack
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ChildProfile | undefined>();
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);
  const [limitHit, setLimitHit] = useState(false);
  const { childAllowance, isFamily } = useSubscription();
  const { user } = useAuthContext();
  const coveredCount = profiles.filter(p => p.covered !== false).length;

  const handleProfileSave = (profile: ChildProfile) => {
    if (editingProfile) {
      const updatedProfiles = profiles.map(p => 
        p.id === profile.id ? profile : p
      );
      onProfileUpdate(updatedProfiles);
    } else {
      onProfileUpdate([...profiles, profile]);
    }
    setEditingProfile(undefined);
    setShowModal(false);
  };

  const handleEditProfile = (profile: ChildProfile) => {
    setEditingProfile(profile);
    setShowModal(true);
  };

  const handleAddProfile = () => {
    const allowance = user ? childAllowance : 1;
    const full = coveredCount >= allowance;
    if (full) {
      setLimitHit(true);
      return;
    }
    setEditingProfile(undefined);
    setShowModal(true);
  };

  const completionRate = (completedSkills.length / totalSkills) * 100;

  // Mock achievements data
  const achievements = [
    { icon: "🌟", title: t('family.prof.a1t'), description: t('family.prof.a1d'), unlocked: true },
    { icon: "🏆", title: t('family.prof.a2t'), description: t('family.prof.a2d'), unlocked: completedSkills.length >= 5 },
    { icon: "🎯", title: t('family.prof.a3t'), description: t('family.prof.a3d'), unlocked: completedSkills.length >= 10 },
    { icon: "📚", title: t('family.prof.a4t'), description: t('family.prof.a4d'), unlocked: completedSkills.length >= totalSkills }
  ];

  return (
    <div className="space-y-6">
      {onBack && (
        <BackButton 
          onClick={onBack}
          label={t('family.dash.back')}
        />

      )}

      <ChildCoveragePanel highlight={limitHit} />
      {limitHit && !user && (
        <p className="text-sm rounded-md border p-3">{t('family.prof.limitGuest')}</p>
      )}

      {/* Interactive Progress Dashboard for Active Child */}
      {activeProfile && (
        <div className="space-y-4">
          <Card className={`${montessoriTheme.card.base} ${montessoriTheme.card.secondary} hover:shadow-lg transition-all duration-300`}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${montessoriTheme.text.secondary}`}>
                <div className="animate-pulse">
                  <Star className="h-5 w-5 text-blue-500" />
                </div>
                {t('family.prof.journey', { name: activeProfile.name })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{t('family.prof.plProgress')}</span>
                <span className="text-primary font-semibold">{t('family.prof.completedOf', { n: completedSkills.length, total: totalSkills })}</span>
              </div>
              <div className="relative">
                <Progress value={completionRate} className="h-4 mb-4 bg-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  {Math.round(completionRate)}%
                </div>
              </div>
              
              {/* Interactive Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: completedSkills.length, label: t('family.prof.mastered'), color: "text-blue-600", icon: "🎯", bg: "bg-blue-50" },
                  { value: `${Math.round(completionRate)}%`, label: t('family.prof.progress'), color: "text-green-600", icon: "📈", bg: "bg-green-50" },
                  { value: "7", label: t('family.prof.streak'), color: "text-primary", icon: "📅", bg: "bg-primary/10" },
                  { value: "45m", label: t('family.prof.today'), color: "text-orange-600", icon: "📚", bg: "bg-orange-50" }
                ].map((stat, index) => (
                  <div key={index} className={`${stat.bg} p-4 rounded-lg text-center hover:scale-105 transition-transform duration-200 cursor-pointer`}>
                    <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className={`text-sm ${montessoriTheme.text.muted}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Achievements Section */}
          <Card className={`${montessoriTheme.card.base} hover:shadow-lg transition-all duration-300`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-500" />
                {t('family.prof.achievements')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 text-center transition-all duration-300 cursor-pointer ${
                      achievement.unlocked 
                        ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:scale-105'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className={`text-2xl mb-1 ${achievement.unlocked ? 'animate-bounce' : ''}`}>
                      {achievement.unlocked ? achievement.icon : '🔒'}
                    </div>
                    <div className="text-xs font-semibold">{achievement.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <User className="h-5 w-5" />
          {t('family.prof.select')}
        </h2>
        <Button
          onClick={handleAddProfile}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          <Plus className="h-4 w-4" />
          {t('family.prof.add')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
              activeProfile?.id === profile.id
                ? 'ring-2 ring-primary0 bg-primary/10 shadow-lg'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onProfileSelect(profile)}
            onMouseEnter={() => setHoveredProfile(profile.id)}
            onMouseLeave={() => setHoveredProfile(null)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`text-4xl transition-transform duration-300 ${
                  hoveredProfile === profile.id ? 'scale-110 animate-pulse' : ''
                }`}>
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-sm text-gray-600">{t('family.prof.yearsOld', { age: profile.age })}</p>
                  {profile.covered === false && (
                    <Badge variant="outline" className="mt-1 text-xs">{t('family.prof.notIncluded')}</Badge>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {profile.interests.slice(0, 2).map(interest => (
                      <Badge key={interest} variant="secondary" className="text-xs hover:bg-primary/25 transition-colors">
                        {t(`family.prof.int.${interest}`, { defaultValue: interest })}
                      </Badge>
                    ))}
                    {profile.interests.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{profile.interests.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditProfile(profile);
                  }}
                  className={`transition-all duration-200 ${
                    hoveredProfile === profile.id ? 'opacity-100 scale-110' : 'opacity-0'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ChildProfileModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProfile(undefined);
        }}
        onSave={handleProfileSave}
        profile={editingProfile}
      />
    </div>
  );
};

export default ProfileSelector;