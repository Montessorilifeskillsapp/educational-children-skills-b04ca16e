import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  interests: string[];
  learningStyle: string;
}

interface ProfileContextType {
  profiles: ChildProfile[];
  activeProfile: ChildProfile | null;
  isOnboarded: boolean;
  setProfiles: (profiles: ChildProfile[]) => void;
  setActiveProfile: (profile: ChildProfile) => void;
  completeOnboarding: (profiles: ChildProfile[]) => void;
  updateProfile: (profile: ChildProfile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock profiles for creator browsing
  const [profiles, setProfilesState] = useState<ChildProfile[]>([
    {
      id: 'creator-child-1',
      name: 'Emma',
      age: 4,
      avatar: '👧',
      interests: ['cooking', 'gardening', 'art'],
      learningStyle: 'visual'
    }
  ]);
  const [activeProfile, setActiveProfile] = useState<ChildProfile | null>(profiles[0]);
  const [isOnboarded, setIsOnboarded] = useState(true); // Skip onboarding for creator browsing

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('montessori_profiles');
    const savedActiveProfile = localStorage.getItem('montessori_active_profile');
    const savedOnboarded = localStorage.getItem('montessori_onboarded');
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        setProfilesState(parsedProfiles);
        
        if (savedActiveProfile) {
          try {
            const parsedActiveProfile = JSON.parse(savedActiveProfile);
            const foundProfile = parsedProfiles.find((p: ChildProfile) => p.id === parsedActiveProfile.id);
            if (foundProfile) {
              setActiveProfile(foundProfile);
            }
          } catch (error) {
            console.warn('Failed to parse active profile from localStorage:', error);
          }
        } else if (parsedProfiles.length > 0) {
          setActiveProfile(parsedProfiles[0]);
        }
      } catch (error) {
        console.warn('Failed to parse profiles from localStorage:', error);
      }
    }

    if (savedOnboarded === 'true') {
      setIsOnboarded(true);
    }
  }, []);

  const setProfiles = (newProfiles: ChildProfile[]) => {
    setProfilesState(newProfiles);
    localStorage.setItem('montessori_profiles', JSON.stringify(newProfiles));
    
    // If active profile is not in new profiles, set to first profile or null
    if (activeProfile && !newProfiles.find(p => p.id === activeProfile.id)) {
      const newActiveProfile = newProfiles.length > 0 ? newProfiles[0] : null;
      setActiveProfile(newActiveProfile);
    }
  };

  const setActiveProfileAndSave = (profile: ChildProfile) => {
    setActiveProfile(profile);
    localStorage.setItem('montessori_active_profile', JSON.stringify(profile));
  };

  const completeOnboarding = (newProfiles: ChildProfile[]) => {
    setProfiles(newProfiles);
    setIsOnboarded(true);
    localStorage.setItem('montessori_onboarded', 'true');
    
    if (newProfiles.length > 0) {
      setActiveProfileAndSave(newProfiles[0]);
    }
  };

  const updateProfile = (updatedProfile: ChildProfile) => {
    const newProfiles = profiles.map(p => 
      p.id === updatedProfile.id ? updatedProfile : p
    );
    setProfiles(newProfiles);
    
    if (activeProfile?.id === updatedProfile.id) {
      setActiveProfileAndSave(updatedProfile);
    }
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      activeProfile,
      isOnboarded,
      setProfiles,
      setActiveProfile: setActiveProfileAndSave,
      completeOnboarding,
      updateProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};