import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { useAuth } from '@/hooks/useAuth'
import { initRevenueCat, isNativePurchaseAvailable } from '@/lib/revenuecat'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  signInWithGoogle: () => Promise<{ error: any }>
  signInWithApple: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth()

  // Initialize RevenueCat on native, identifying the user with their Supabase user id
  // so web (Stripe) and mobile (RevenueCat) share the same entitlement record.
  useEffect(() => {
    if (!isNativePurchaseAvailable()) return
    if (auth.loading) return
    initRevenueCat(auth.user?.id ?? null).catch((err) => {
      console.error('RevenueCat init failed', err)
    })
  }, [auth.loading, auth.user?.id])


  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}