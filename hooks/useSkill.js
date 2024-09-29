import useSWR from 'swr'
import { fetchSkill } from '../lib/api'

export function useSkill(id) {
  const { data, error } = useSWR(id ? `/api/skills/${id}` : null, () => fetchSkill(id), {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 3 times.
      if (retryCount >= 3) return
      // Don't retry if it's a 404 error
      if (error.status === 404) return
      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
  })

  return {
    skill: data,
    isLoading: !error && !data,
    isError: error
  }
}