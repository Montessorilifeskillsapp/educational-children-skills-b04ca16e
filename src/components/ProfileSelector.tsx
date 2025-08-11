import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Settings, User, Star, BookOpen, Trophy, Target, Calendar, TrendingUp } from 'lucide-react';
import ChildProfileModal from './ChildProfileModal';
import { montessoriTheme } from './ThemeConfig';
import BackButton from '@/components/ui/back-button';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  interests: string[];
  learningStyle: string;
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
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ChildProfile | undefined>();
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

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
    setEditingProfile(undefined);
    setShowModal(true);
  };

  const completionRate = (completedSkills.length / totalSkills) * 100;

  // Mock achievements data
  const achievements = [
    { icon: "🌟", title: "First Steps", description: "Completed first activity", unlocked: true },
    { icon: "🏆", title: "Week Warrior", description: "7 days in a row", unlocked: completedSkills.length >= 5 },
    { icon: "🎯", title: "Skill Master", description: "Master 10 skills", unlocked: completedSkills.length >= 10 },
    { icon: "📚", title: "Learning Champion", description: "Complete all activities", unlocked: completedSkills.length >= totalSkills }
  ];

  return (
    <div className="space-y-6">
      {onBack && (
        <BackButton 
          onClick={onBack}
          label="Back to Dashboard"
        />

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
                {activeProfile.name}'s Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Practical Life Skills Progress</span>
                <span className="text-purple-600 font-semibold">{completedSkills.length} of {totalSkills} completed</span>
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
                  { value: completedSkills.length, label: "Skills Mastered", color: "text-blue-600", icon: "🎯", bg: "bg-blue-50" },
                  { value: `${Math.round(completionRate)}%`, label: "Progress", color: "text-green-600", icon: "📈", bg: "bg-green-50" },
                  { value: "7", label: "Day Streak", color: "text-purple-600", icon: "📅", bg: "bg-purple-50" },
                  { value: "45m", label: "Today", color: "text-orange-600", icon: "📚", bg: "bg-orange-50" }
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
                Achievements
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
          Select Child Profile
        </h2>
        <Button
          onClick={handleAddProfile}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Child
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
              activeProfile?.id === profile.id
                ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg'
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
                  <p className="text-sm text-gray-600">{profile.age} years old</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {profile.interests.slice(0, 2).map(interest => (
                      <Badge key={interest} variant="secondary" className="text-xs hover:bg-purple-200 transition-colors">
                        {interest}
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