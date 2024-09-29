import useSWR from 'swr'
import { fetchLessons } from '../lib/api'

export function useLessons() {
  const { data, error, mutate } = useSWR('/api/lessons', fetchLessons)

  return {
    lessons: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}