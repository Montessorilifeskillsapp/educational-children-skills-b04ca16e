import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';

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
  loading: boolean;
  setProfiles: (profiles: ChildProfile[]) => void;
  setActiveProfile: (profile: ChildProfile) => void;
  completeOnboarding: (profiles: ChildProfile[]) => void;
  updateProfile: (profile: ChildProfile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (s: string) => UUID_RE.test(s);

const extrasKey = (id: string) => `montessori_child_extras_${id}`;

interface ChildExtras {
  avatar: string;
  interests: string[];
  learningStyle: string;
}

const readExtras = (id: string): ChildExtras | null => {
  try {
    const raw = localStorage.getItem(extrasKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeExtras = (id: string, extras: ChildExtras) => {
  try {
    localStorage.setItem(extrasKey(id), JSON.stringify(extras));
  } catch {
    /* ignore quota */
  }
};

const ageFromDob = (dob: string): number => {
  const d = new Date(dob);
  const ms = Date.now() - d.getTime();
  return Math.max(0, Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000)));
};

const dobFromAge = (age: number): string => {
  const today = new Date();
  return `${today.getFullYear() - age}-01-01`;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuthContext();

  const [profiles, setProfilesState] = useState<ChildProfile[]>([]);
  const [activeProfile, setActiveProfileState] = useState<ChildProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---- Local-only loader (guest mode or pre-auth) ----
  const loadLocal = useCallback(() => {
    const savedProfiles = localStorage.getItem('montessori_profiles');
    const savedActiveProfile = localStorage.getItem('montessori_active_profile');
    const savedOnboarded = localStorage.getItem('montessori_onboarded');

    if (savedProfiles) {
      try {
        const parsed: ChildProfile[] = JSON.parse(savedProfiles);
        setProfilesState(parsed);
        if (savedActiveProfile) {
          try {
            const ap: ChildProfile = JSON.parse(savedActiveProfile);
            const found = parsed.find(p => p.id === ap.id);
            setActiveProfileState(found ?? parsed[0] ?? null);
          } catch {
            setActiveProfileState(parsed[0] ?? null);
          }
        } else if (parsed.length > 0) {
          setActiveProfileState(parsed[0]);
        }
      } catch {
        /* ignore */
      }
    }
    setIsOnboarded(savedOnboarded === 'true');
  }, []);

  // ---- Supabase loader (authenticated mode) ----
  const loadFromSupabase = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Migrate any local-only (non-UUID) profiles to DB so progress can sync
      const localRaw = localStorage.getItem('montessori_profiles');
      if (localRaw) {
        try {
          const localProfiles: ChildProfile[] = JSON.parse(localRaw);
          const toMigrate = localProfiles.filter(
            p => !isUuid(p.id) && p.id !== 'demo-child-1'
          );
          for (const p of toMigrate) {
            const { data, error } = await supabase
              .from('child_profiles')
              .insert({
                user_id: user.id,
                name: p.name,
                date_of_birth: dobFromAge(p.age),
              })
              .select('id')
              .single();
            if (error || !data) {
              console.error('Migrate child profile failed:', error);
              continue;
            }
            // Carry extras + completions over to the new UUID
            writeExtras(data.id, {
              avatar: p.avatar,
              interests: p.interests,
              learningStyle: p.learningStyle,
            });
            const oldCompletionsKey = `montessori_completions_${p.id}`;
            const oldCompletions = localStorage.getItem(oldCompletionsKey);
            if (oldCompletions) {
              localStorage.setItem(`montessori_completions_${data.id}`, oldCompletions);
              localStorage.removeItem(oldCompletionsKey);
            }
            localStorage.removeItem(extrasKey(p.id));
          }
          // Clear local profiles cache after migration attempt
          localStorage.removeItem('montessori_profiles');
        } catch (e) {
          console.error('Local profile parse failed:', e);
        }
      }

      // 2. Fetch DB profiles
      const { data, error } = await supabase
        .from('child_profiles')
        .select('id, name, date_of_birth, avatar_url')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Failed to load child_profiles:', error);
        return;
      }

      const hydrated: ChildProfile[] = (data || []).map(row => {
        const extras = readExtras(row.id);
        return {
          id: row.id,
          name: row.name,
          age: ageFromDob(row.date_of_birth),
          avatar: extras?.avatar ?? '👶',
          interests: extras?.interests ?? [],
          learningStyle: extras?.learningStyle ?? 'visual',
        };
      });

      setProfilesState(hydrated);

      // Restore previously-active id from localStorage
      const savedActiveId = localStorage.getItem('montessori_active_profile_id');
      const next =
        (savedActiveId && hydrated.find(p => p.id === savedActiveId)) ||
        hydrated[0] ||
        null;
      setActiveProfileState(next);
      setIsOnboarded(hydrated.length > 0);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Re-run loader when auth state changes
  useEffect(() => {
    if (authLoading) return;
    if (user) {
      loadFromSupabase();
    } else {
      loadLocal();
    }
  }, [user, authLoading, loadFromSupabase, loadLocal]);

  // ---- Public mutators ----

  const persistLocalSnapshot = (next: ChildProfile[], active: ChildProfile | null) => {
    if (user) return; // DB is source of truth when authed
    localStorage.setItem('montessori_profiles', JSON.stringify(next));
    if (active) localStorage.setItem('montessori_active_profile', JSON.stringify(active));
  };

  const setProfiles = (newProfiles: ChildProfile[]) => {
    setProfilesState(newProfiles);
    let nextActive = activeProfile;
    if (activeProfile && !newProfiles.find(p => p.id === activeProfile.id)) {
      nextActive = newProfiles[0] ?? null;
      setActiveProfileState(nextActive);
    }
    persistLocalSnapshot(newProfiles, nextActive);
  };

  const setActiveProfile = (profile: ChildProfile) => {
    setActiveProfileState(profile);
    if (user) {
      localStorage.setItem('montessori_active_profile_id', profile.id);
    } else {
      localStorage.setItem('montessori_active_profile', JSON.stringify(profile));
    }
  };

  const completeOnboarding = async (newProfiles: ChildProfile[]) => {
    // Demo / no profiles → install demo child locally
    if (newProfiles.length === 0) {
      const demoProfile: ChildProfile = {
        id: 'demo-child-1',
        name: 'Demo Child',
        age: 4,
        avatar: '👧',
        interests: ['cooking', 'gardening', 'art'],
        learningStyle: 'visual',
      };
      setProfilesState([demoProfile]);
      setActiveProfileState(demoProfile);
      localStorage.setItem('montessori_profiles', JSON.stringify([demoProfile]));
      localStorage.setItem('montessori_active_profile', JSON.stringify(demoProfile));
      setIsOnboarded(true);
      localStorage.setItem('montessori_onboarded', 'true');
      return;
    }

    if (user) {
      // Insert each new profile into Supabase, then refresh
      for (const p of newProfiles) {
        if (isUuid(p.id)) continue; // already DB-backed
        const { data, error } = await supabase
          .from('child_profiles')
          .insert({
            user_id: user.id,
            name: p.name,
            date_of_birth: dobFromAge(p.age),
          })
          .select('id')
          .single();
        if (error || !data) {
          console.error('Create child failed:', error);
          continue;
        }
        writeExtras(data.id, {
          avatar: p.avatar,
          interests: p.interests,
          learningStyle: p.learningStyle,
        });
      }
      setIsOnboarded(true);
      localStorage.setItem('montessori_onboarded', 'true');
      await loadFromSupabase();
    } else {
      setProfiles(newProfiles);
      if (newProfiles.length > 0) setActiveProfile(newProfiles[0]);
      setIsOnboarded(true);
      localStorage.setItem('montessori_onboarded', 'true');
    }
  };

  const updateProfile = async (updated: ChildProfile) => {
    const next = profiles.map(p => (p.id === updated.id ? updated : p));
    setProfilesState(next);
    if (activeProfile?.id === updated.id) setActiveProfileState(updated);

    if (user && isUuid(updated.id)) {
      writeExtras(updated.id, {
        avatar: updated.avatar,
        interests: updated.interests,
        learningStyle: updated.learningStyle,
      });
      const { error } = await supabase
        .from('child_profiles')
        .update({
          name: updated.name,
          date_of_birth: dobFromAge(updated.age),
        })
        .eq('id', updated.id);
      if (error) console.error('Update child failed:', error);
    } else {
      persistLocalSnapshot(next, activeProfile?.id === updated.id ? updated : activeProfile);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        isOnboarded,
        loading,
        setProfiles,
        setActiveProfile,
        completeOnboarding,
        updateProfile,
      }}
    >
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
