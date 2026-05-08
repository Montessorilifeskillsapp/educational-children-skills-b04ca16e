import { useState, useEffect, useCallback } from 'react';

export interface CompletionEntry {
  skillId: string;
  completedAt: string; // ISO string
}

const keyFor = (profileId: string) => `montessori_completions_${profileId}`;

export const useActivityCompletions = (profileId: string | undefined) => {
  const [completions, setCompletions] = useState<CompletionEntry[]>([]);

  useEffect(() => {
    if (!profileId) {
      setCompletions([]);
      return;
    }
    try {
      const raw = localStorage.getItem(keyFor(profileId));
      setCompletions(raw ? JSON.parse(raw) : []);
    } catch {
      setCompletions([]);
    }
  }, [profileId]);

  const persist = useCallback((entries: CompletionEntry[]) => {
    if (!profileId) return;
    setCompletions(entries);
    localStorage.setItem(keyFor(profileId), JSON.stringify(entries));
  }, [profileId]);

  const logCompletion = useCallback((skillId: string) => {
    if (!profileId) return;
    setCompletions(prev => {
      // Keep only one entry per skill (most recent)
      const filtered = prev.filter(e => e.skillId !== skillId);
      const next = [...filtered, { skillId, completedAt: new Date().toISOString() }];
      localStorage.setItem(keyFor(profileId), JSON.stringify(next));
      return next;
    });
  }, [profileId]);

  const completedSkillIds = completions.map(c => c.skillId);

  // Streak: consecutive calendar days (UTC-local) with at least one completion,
  // ending today or yesterday (yesterday allowed so current day not yet active doesn't break streak).
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
    // Allow start from today or yesterday
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

  return {
    completions,
    completedSkillIds,
    logCompletion,
    streak: computeStreak(),
    reset: () => persist([]),
  };
};
