// Use the integrated Supabase client
import { supabase } from '@/integrations/supabase/client'
export { supabase }

// Database types that match our schema
export interface UserProfile {
  id: string
  user_id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_status: 'free' | 'premium' | 'family'
  created_at: string
  updated_at: string
}

export interface ChildProfile {
  id: string
  user_id: string
  name: string
  date_of_birth: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface SkillProgress {
  id: string
  child_id: string
  skill_id: string
  skill_category: string
  completed: boolean
  completed_at?: string
  steps_completed: number[]
  notes?: string
  created_at: string
  updated_at: string
}

export interface ActivitySession {
  id: string
  child_id: string
  skill_id: string
  duration_minutes: number
  notes?: string
  completed: boolean
  created_at: string
}

// Database operations using the integrated client
export const dbOperations = {
  // User profiles
  async createUserProfile(userId: string, email: string, fullName?: string) {
    return await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: userId,
          email,
          full_name: fullName,
          subscription_status: 'free'
        }
      ])
      .select()
      .single()
  },

  async getUserProfile(userId: string) {
    return await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    return await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()
  },

  // Child profiles
  async createChildProfile(userId: string, name: string, dateOfBirth: string) {
    return await supabase
      .from('child_profiles')
      .insert([
        {
          user_id: userId,
          name,
          date_of_birth: dateOfBirth
        }
      ])
      .select()
      .single()
  },

  async getChildProfiles(userId: string) {
    return await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
  },

  async updateChildProfile(childId: string, updates: Partial<ChildProfile>) {
    return await supabase
      .from('child_profiles')
      .update(updates)
      .eq('id', childId)
      .select()
      .single()
  },

  async deleteChildProfile(childId: string) {
    return await supabase
      .from('child_profiles')
      .delete()
      .eq('id', childId)
  },

  // Skill progress
  async upsertSkillProgress(childId: string, skillId: string, skillCategory: string, data: Partial<SkillProgress>) {
    return await supabase
      .from('skill_progress')
      .upsert([
        {
          child_id: childId,
          skill_id: skillId,
          skill_category: skillCategory,
          ...data
        }
      ])
      .select()
      .single()
  },

  async getSkillProgress(childId: string, skillId?: string) {
    let query = supabase
      .from('skill_progress')
      .select('*')
      .eq('child_id', childId)

    if (skillId) {
      query = query.eq('skill_id', skillId)
    }

    return await query.order('updated_at', { ascending: false })
  },

  async getChildProgress(childId: string) {
    return await supabase
      .from('skill_progress')
      .select('*')
      .eq('child_id', childId)
      .eq('completed', true)
      .order('completed_at', { ascending: false })
  },

  // Activity sessions
  async createActivitySession(childId: string, skillId: string, durationMinutes: number, notes?: string, completed: boolean = false) {
    const result = await supabase
      .from('activity_sessions')
      .insert([
        {
          child_id: childId,
          skill_id: skillId,
          duration_minutes: durationMinutes,
          notes,
          completed
        }
      ])
      .select()
      .single()
    try {
      const { analytics } = await import('@/lib/analytics');
      analytics.track(completed ? 'activity_completed' : 'activity_started', {
        skill_id: skillId,
        duration_minutes: durationMinutes,
      });
    } catch { /* ignore */ }
    return result
  },

  async getActivitySessions(childId: string, limit = 50) {
    return await supabase
      .from('activity_sessions')
      .select('*')
      .eq('child_id', childId)
      .order('created_at', { ascending: false })
      .limit(limit)
  },

  // Subscription management
  async getSubscriberInfo(userId: string) {
    return await supabase
      .from('subscribers')
      .select('*')
      .eq('user_id', userId)
      .single()
  },

  async updateSubscriberInfo(userId: string, updates: any) {
    return await supabase
      .from('subscribers')
      .upsert([
        {
          user_id: userId,
          ...updates
        }
      ])
      .select()
      .single()
  }
}