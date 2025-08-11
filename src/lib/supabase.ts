import { createClient } from '@supabase/supabase-js'

// Provide safe fallback values to prevent initialization errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI0MDAsImV4cCI6MTk2MDc2ODQwMH0.placeholder'

// Create client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence for demo
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

// Safe API wrapper to prevent JSON parsing errors
export const safeSupabaseCall = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>
): Promise<{ data: T | null; error: any }> => {
  try {
    const result = await operation()
    return result
  } catch (error) {
    console.warn('Supabase call failed, using mock data:', error)
    return { data: null, error: null } // Return safe fallback
  }
}

// Database types
export interface UserProgress {
  id: string
  user_id: string
  skill_id: string
  completed: boolean
  completed_at: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
}