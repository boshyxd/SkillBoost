import useSWR from 'swr';
import { fetchQuiz } from '../lib/api';

export function useQuiz(quizId) {
  const { data, error } = useSWR(quizId ? `/api/quizzes/${quizId}` : null, () => fetchQuiz(quizId));

  return {
    quiz: data,
    isLoading: !error && !data,
    error: error
  };
}