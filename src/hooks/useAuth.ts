import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { dbOperations } from '@/lib/supabase'
import { analytics } from '@/lib/analytics'

const getAuthCallbackUrl = () => {
  const url = new URL('/auth/callback', window.location.origin)
  try {
    const redirect = sessionStorage.getItem('post_auth_redirect')
    if (redirect?.startsWith('/') && !redirect.startsWith('//')) {
      url.searchParams.set('redirect', redirect)
    }
  } catch {
    // Keep the default callback URL if storage is unavailable.
  }
  return url.toString()
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      analytics.init(session?.user?.id ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        analytics.init(session?.user?.id ?? null)

        // User profile creation is now handled by database trigger

        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error) analytics.track('signin', { method: 'password' })
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAuthCallbackUrl()
      }
    })
    if (!error) analytics.track('signup', { method: 'password' })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const signInWithGoogle = async () => {
    analytics.track('signin_started', { method: 'google' })
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getAuthCallbackUrl(),
      }
    })
    return { error }
  }

  const signInWithApple = async () => {
    analytics.track('signin_started', { method: 'apple' })
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: getAuthCallbackUrl(),
      }
    })
    return { error }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
  }
}