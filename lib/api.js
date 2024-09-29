import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    throw new ApiError(error.response.data.message || 'An error occurred', error.response.status);
  } else if (error.request) {
    console.error('Request:', error.request);
    throw new ApiError('No response received from server', 500);
  } else {
    console.error('Error message:', error.message);
    throw new ApiError(error.message, 500);
  }
};

export const fetchLessons = () => api.get('/lessons').then(res => res.data).catch(handleApiError);
export const fetchSkills = () => api.get('/skills').then(res => res.data).catch(handleApiError);
export const fetchProgress = () => api.get('/progress').then(res => res.data).catch(handleApiError);
export const fetchQuiz = (id) => api.get(`/quizzes/${id}`).then(res => res.data).catch(handleApiError);
export const fetchSkill = (id) => api.get(`/skills/${id}`).then(res => res.data).catch(handleApiError);

export const updateProgress = (lessonId, completed) => 
  api.post('/progress', { lessonId, completed }).then(res => res.data).catch(handleApiError);

export const submitQuizResults = (quizId, answers) =>
  api.post('/quiz-results', { quizId, answers }).then(res => res.data).catch(handleApiError);

export const fetchLesson = (id, lessonId) => api.get(`/lessons/${id}/${lessonId}`).then(res => res.data).catch(handleApiError);

export { ApiError };
