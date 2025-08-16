import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Database types
export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  subscription_status: 'free' | 'premium'
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

// Database operations
export const dbOperations = {
  // User profiles
  async createUserProfile(userId: string, email: string, fullName: string) {
    return await supabase
      .from('user_profiles')
      .insert([
        {
          id: userId,
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
      .eq('id', userId)
      .single()
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    return await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
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
    return await supabase
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
  },

  async getActivitySessions(childId: string, limit = 50) {
    return await supabase
      .from('activity_sessions')
      .select('*')
      .eq('child_id', childId)
      .order('created_at', { ascending: false })
      .limit(limit)
  }
}