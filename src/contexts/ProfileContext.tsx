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
  // Start with empty profiles - let users choose demo or create account
  const [profiles, setProfilesState] = useState<ChildProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<ChildProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false); // Start with false to show proper flow

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
    // If no profiles provided, set up demo mode with default profile
    if (newProfiles.length === 0) {
      const demoProfile: ChildProfile = {
        id: 'demo-child-1',
        name: 'Demo Child',
        age: 4,
        avatar: '👧',
        interests: ['cooking', 'gardening', 'art'],
        learningStyle: 'visual'
      };
      setProfiles([demoProfile]);
      setActiveProfileAndSave(demoProfile);
    } else {
      setProfiles(newProfiles);
      if (newProfiles.length > 0) {
        setActiveProfileAndSave(newProfiles[0]);
      }
    }
    
    setIsOnboarded(true);
    localStorage.setItem('montessori_onboarded', 'true');
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