import { useState, useEffect } from 'react'
import { supabase, UserProgress } from '@/lib/supabase'
import { useAuth } from './useAuth'

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchProgress()
    } else {
      setProgress([])
      setLoading(false)
    }
  }, [user])

  const fetchProgress = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching progress:', error)
    } else {
      setProgress(data || [])
    }
    setLoading(false)
  }

  const markSkillComplete = async (skillId: string) => {
    if (!user) return

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        skill_id: skillId,
        completed: true,
        completed_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Error updating progress:', error)
    } else {
      fetchProgress()
    }
  }

  const isSkillCompleted = (skillId: string) => {
    return progress.some(p => p.skill_id === skillId && p.completed)
  }

  return {
    progress,
    loading,
    markSkillComplete,
    isSkillCompleted,
  }
}