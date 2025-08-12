import { useState, useEffect } from 'react'
import { dbOperations, ChildProfile } from '@/lib/supabase'
import { useAuth } from './useAuth'

export const useChildProfiles = () => {
  const { user } = useAuth()
  const [children, setChildren] = useState<ChildProfile[]>([])
  const [loading, setLoading] = useState(false)

  const fetchChildren = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await dbOperations.getChildProfiles(user.id)
      if (error) throw error
      setChildren(data || [])
    } catch (error) {
      console.error('Error fetching children:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChildren()
  }, [user])

  const createChild = async (name: string, dateOfBirth: string) => {
    if (!user) return { data: null, error: new Error('Not authenticated') }

    try {
      const { data, error } = await dbOperations.createChildProfile(
        user.id,
        name,
        dateOfBirth
      )
      if (error) throw error
      
      await fetchChildren() // Refresh the list
      return { data, error: null }
    } catch (error) {
      console.error('Error creating child:', error)
      return { data: null, error }
    }
  }

  const updateChild = async (childId: string, updates: Partial<ChildProfile>) => {
    try {
      const { data, error } = await dbOperations.updateChildProfile(childId, updates)
      if (error) throw error
      
      await fetchChildren() // Refresh the list
      return { data, error: null }
    } catch (error) {
      console.error('Error updating child:', error)
      return { data: null, error }
    }
  }

  const deleteChild = async (childId: string) => {
    try {
      const { error } = await dbOperations.deleteChildProfile(childId)
      if (error) throw error
      
      await fetchChildren() // Refresh the list
      return { error: null }
    } catch (error) {
      console.error('Error deleting child:', error)
      return { error }
    }
  }

  return {
    children,
    loading,
    createChild,
    updateChild,
    deleteChild,
    refreshChildren: fetchChildren
  }
}