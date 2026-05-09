import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface CompletionEntry {
  skillId: string;
  completedAt: string; // ISO string
}

const keyFor = (profileId: string) => `montessori_completions_${profileId}`;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isDbProfile = (id: string | undefined) => !!id && UUID_RE.test(id);

const readLocal = (profileId: string): CompletionEntry[] => {
  try {
    const raw = localStorage.getItem(keyFor(profileId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocal = (profileId: string, entries: CompletionEntry[]) => {
  localStorage.setItem(keyFor(profileId), JSON.stringify(entries));
};

export const useActivityCompletions = (profileId: string | undefined) => {
  const { user } = useAuth();
  const [completions, setCompletions] = useState<CompletionEntry[]>([]);
  const syncMode = isDbProfile(profileId) && !!user; // sync to Supabase only when child is a real DB row + user is authed
  const migratedRef = useRef<Set<string>>(new Set());

  // Load + (one-time) migrate localStorage → Supabase
  useEffect(() => {
    let cancelled = false;
    if (!profileId) {
      setCompletions([]);
      return;
    }

    if (!syncMode) {
      setCompletions(readLocal(profileId));
      return;
    }

    (async () => {
      // 1. Pull existing DB completions
      const { data, error } = await supabase
        .from('skill_progress')
        .select('skill_id, completed, completed_at, updated_at')
        .eq('child_id', profileId)
        .eq('completed', true);

      if (error) {
        console.error('Failed to load skill_progress, falling back to localStorage:', error);
        if (!cancelled) setCompletions(readLocal(profileId));
        return;
      }

      const dbEntries: CompletionEntry[] = (data || []).map(r => ({
        skillId: r.skill_id,
        completedAt: r.completed_at || r.updated_at || new Date().toISOString(),
      }));

      // 2. One-time migration of legacy localStorage entries
      if (!migratedRef.current.has(profileId)) {
        migratedRef.current.add(profileId);
        const local = readLocal(profileId);
        const dbIds = new Set(dbEntries.map(e => e.skillId));
        const toMigrate = local.filter(e => !dbIds.has(e.skillId));
        if (toMigrate.length > 0) {
          const rows = toMigrate.map(e => ({
            child_id: profileId,
            skill_id: e.skillId,
            skill_category: 'general',
            completed: true,
            completed_at: e.completedAt,
          }));
          const { error: upErr } = await supabase
            .from('skill_progress')
            .upsert(rows, { onConflict: 'child_id,skill_id' });
          if (upErr) {
            console.error('Migration upsert failed:', upErr);
          } else {
            dbEntries.push(...toMigrate);
            // Clear localStorage after successful migration
            localStorage.removeItem(keyFor(profileId));
          }
        }
      }

      if (!cancelled) setCompletions(dbEntries);
    })();

    return () => {
      cancelled = true;
    };
  }, [profileId, syncMode]);

  const logCompletion = useCallback(
    (skillId: string) => {
      if (!profileId) return;
      const entry: CompletionEntry = { skillId, completedAt: new Date().toISOString() };

      // Optimistic local state update (dedupe by skillId, keep latest)
      setCompletions(prev => {
        const filtered = prev.filter(e => e.skillId !== skillId);
        const next = [...filtered, entry];
        if (!syncMode) writeLocal(profileId, next);
        return next;
      });

      if (syncMode) {
        supabase
          .from('skill_progress')
          .upsert(
            {
              child_id: profileId,
              skill_id: skillId,
              skill_category: 'general',
              completed: true,
              completed_at: entry.completedAt,
            },
            { onConflict: 'child_id,skill_id' }
          )
          .then(({ error }) => {
            if (error) console.error('Failed to persist completion to Supabase:', error);
          });
      }
    },
    [profileId, syncMode]
  );

  const completedSkillIds = completions.map(c => c.skillId);

  // Streak: consecutive calendar days ending today or yesterday
  const computeStreak = (): number => {
    if (completions.length === 0) return 0;
    const days = new Set(
      completions.map(c => {
        const d = new Date(c.completedAt);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    );
    const today = new Date();
    let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let streak = 0;
    const todayKey = `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;
    if (!days.has(todayKey)) {
      cursor.setDate(cursor.getDate() - 1);
      const yKey = `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;
      if (!days.has(yKey)) return 0;
    }
    while (true) {
      const key = `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`;
      if (days.has(key)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const reset = useCallback(async () => {
    if (!profileId) return;
    setCompletions([]);
    if (syncMode) {
      const { error } = await supabase.from('skill_progress').delete().eq('child_id', profileId);
      if (error) console.error('Failed to reset Supabase progress:', error);
    } else {
      writeLocal(profileId, []);
    }
  }, [profileId, syncMode]);

  return {
    completions,
    completedSkillIds,
    logCompletion,
    streak: computeStreak(),
    reset,
    syncMode, // true = synced to Supabase, false = localStorage only
  };
};
