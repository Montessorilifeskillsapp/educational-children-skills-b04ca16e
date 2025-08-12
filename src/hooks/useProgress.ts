import { useState, useEffect } from 'react'
import { dbOperations, SkillProgress } from '@/lib/supabase'
import { useAuth } from './useAuth'

export const useProgress = (childId?: string) => {
  const { user } = useAuth()
  const [progress, setProgress] = useState<SkillProgress[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProgress = async (selectedChildId?: string) => {
    if (!selectedChildId || !user) return

    setLoading(true)
    try {
      const { data, error } = await dbOperations.getSkillProgress(selectedChildId)
      if (error) throw error
      setProgress(data || [])
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (childId) {
      fetchProgress(childId)
    }
  }, [childId, user])

  const updateSkillProgress = async (
    selectedChildId: string,
    skillId: string,
    skillCategory: string,
    updates: Partial<SkillProgress>
  ) => {
    try {
      const { data, error } = await dbOperations.upsertSkillProgress(
        selectedChildId,
        skillId,
        skillCategory,
        updates
      )
      if (error) throw error
      
      // Refresh progress
      await fetchProgress(selectedChildId)
      return { data, error: null }
    } catch (error) {
      console.error('Error updating progress:', error)
      return { data: null, error }
    }
  }

  const completeSkill = async (
    selectedChildId: string,
    skillId: string,
    skillCategory: string,
    stepsCompleted: number[] = []
  ) => {
    return await updateSkillProgress(selectedChildId, skillId, skillCategory, {
      completed: true,
      completed_at: new Date().toISOString(),
      steps_completed: stepsCompleted
    })
  }

  const getSkillProgress = (skillId: string): SkillProgress | undefined => {
    return progress.find(p => p.skill_id === skillId)
  }

  const isSkillCompleted = (skillId: string): boolean => {
    const skillProgress = getSkillProgress(skillId)
    return skillProgress?.completed || false
  }

  const getCompletedSteps = (skillId: string): number[] => {
    const skillProgress = getSkillProgress(skillId)
    return skillProgress?.steps_completed || []
  }

  return {
    progress,
    loading,
    updateSkillProgress,
    completeSkill,
    getSkillProgress,
    isSkillCompleted,
    getCompletedSteps,
    refreshProgress: () => fetchProgress(childId)
  }
}