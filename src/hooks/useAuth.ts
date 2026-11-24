import { requestSignup } from '@/lib/accountSignup'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { supabase } from '@/integrations/supabase/client'
import { dbOperations } from '@/lib/supabase'
import { analytics } from '@/lib/analytics'
import { accessTokenIsRecovery, clearPasswordRecovery, markPasswordRecovery } from '@/lib/passwordRecovery'
import type { Session } from '@supabase/supabase-js'

const WEB_CALLBACK_ORIGIN = 'https://educational-children-skills.lovable.app'

const getAuthCallbackUrl = () => {
  // For native platforms (iOS/Android), use the Lovable-hosted https callback so the
  // in-app browser lands on a real web page. That page then bounces back into the app
  // via the com.montessorilifeskills.app:// deep-link scheme.
  if (Capacitor.isNativePlatform()) {
    return `${WEB_CALLBACK_ORIGIN}/auth/callback?native=1`
  }

  // For web, use the full URL with optional redirect parameter
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

/**
 * Where a password-reset email link should land. Uses the same callback page as sign-up
 * confirmations; on the phone apps it hands the link back into the app.
 */
export const getPasswordResetUrl = () =>
  Capacitor.isNativePlatform()
    ? `${WEB_CALLBACK_ORIGIN}/auth/callback?native=1&type=recovery`
    : new URL('/auth/callback?type=recovery', window.location.origin).toString()

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  // A reset-link sign-in is never treated as signed in: it can only choose a new password.
  const [recoveryUser, setRecoveryUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const applySession = (session: Session | null) => {
    const recovering = accessTokenIsRecovery(session?.access_token)
    if (recovering) markPasswordRecovery()
    setRecoveryUser(recovering ? session?.user ?? null : null)
    setUser(recovering ? null : session?.user ?? null)
    analytics.init(recovering ? null : session?.user?.id ?? null)
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') markPasswordRecovery()
        if (event === 'SIGNED_OUT') clearPasswordRecovery()
        applySession(session)

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
    // Signing in with the password proves the owner; drop any unfinished reset from this device.
    if (!error) { clearPasswordRecovery(); analytics.track('signin', { method: 'password' }) }
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    // Confirmation emails are sent by the app (account-signup), not the auth service's mailer.
    const { error, existing } = await requestSignup(email, password)
    if (!error && !existing) analytics.track('signup', { method: 'password' })
    return { error: error ? { message: error } : null, existing }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const signInWithGoogle = async () => {
    analytics.track('signin_started', { method: 'google' })
    if (Capacitor.isNativePlatform()) {
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getAuthCallbackUrl(),
          skipBrowserRedirect: true,
        }
      })
      if (data?.url && !error) {
        await Browser.open({ url: data.url })
      }
      return { error }
    }
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
    if (Capacitor.isNativePlatform()) {
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: getAuthCallbackUrl(),
          skipBrowserRedirect: true,
        }
      })
      if (data?.url && !error) {
        await Browser.open({ url: data.url })
      }
      return { error }
    }
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
    recoveryUser,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
  }
}
