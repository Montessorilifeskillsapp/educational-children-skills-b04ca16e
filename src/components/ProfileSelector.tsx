import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Pencil, Check } from 'lucide-react';
import ChildProfileModal from './ChildProfileModal';

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
  onContinue?: () => void;
}


const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  profiles,
  activeProfile,
  onProfileSelect,
  onProfileUpdate,
  completedSkills = [],
  totalSkills = 15,
  onBack,
  onContinue
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ChildProfile | undefined>();

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

  const completionRate = totalSkills > 0 ? Math.min(100, (completedSkills.length / totalSkills) * 100) : 0;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Family Dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold text-foreground">Child profiles</h1>
          <p className="mt-2 text-sm text-muted-foreground">Select a child to continue their Montessori work.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {onBack && <Button variant="outline" onClick={onBack}>Back to home</Button>}
          {onContinue && <Button onClick={onContinue}>Continue to learning</Button>}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Select a child</h2>
        <Button onClick={handleAddProfile} variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />Add child
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`border transition-colors ${activeProfile?.id === profile.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <Button
                variant="ghost"
                className="min-w-0 flex-1 justify-start gap-3 px-1 text-left h-auto py-1 hover:bg-transparent"
                onClick={() => onProfileSelect(profile)}
                aria-label={`Select ${profile.name}`}
                aria-pressed={activeProfile?.id === profile.id}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-2xl" aria-hidden="true">{profile.avatar}</span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-foreground">{profile.name}</span>
                  <span className="block text-sm font-normal text-muted-foreground">Age {profile.age}</span>
                </span>
              </Button>
              {activeProfile?.id === profile.id && <Check className="h-5 w-5 shrink-0 text-primary" aria-label="Selected" />}
              <Button variant="ghost" size="icon" onClick={() => handleEditProfile(profile)} aria-label={`Edit ${profile.name}`} title={`Edit ${profile.name}`}>
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeProfile && (
        <section className="border-t border-border pt-6" aria-label={`${activeProfile.name}'s Practical Life progress`}>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <h2 className="font-semibold text-foreground">{activeProfile.name}'s Practical Life progress</h2>
            <span className="text-muted-foreground">{completedSkills.length} of {totalSkills} activities completed</span>
          </div>
          <Progress value={completionRate} className="h-2" aria-label={`${Math.round(completionRate)}% complete`} />
        </section>
      )}

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