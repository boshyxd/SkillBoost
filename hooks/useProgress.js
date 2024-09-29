import useSWR from 'swr'
import { fetchProgress } from '../lib/api'
import { useAuth } from './useAuth'

export function useProgress() {
  const { user } = useAuth()
  const { data, error, mutate } = useSWR(user ? '/api/progress' : null, fetchProgress)

  return {
    progress: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
