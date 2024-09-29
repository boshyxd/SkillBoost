import useSWR from 'swr'
import { fetchProgress } from '../lib/api'

export function useProgress() {
  const { data, error, mutate } = useSWR('/api/progress', fetchProgress)

  return {
    progress: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
