import useSWR from 'swr'
import { fetchSkills } from '../lib/api'
import { useAuth } from './useAuth'

export function useSkills() {
  const { user } = useAuth()
  const { data, error, mutate } = useSWR(user ? '/api/skills' : null, fetchSkills)

  return {
    skills: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
