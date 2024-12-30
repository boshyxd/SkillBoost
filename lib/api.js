import { getAuth } from 'firebase/auth';
import skillsData from '../data/skills.json';
import lessonsData from '../data/lessons.json';
import quizzesData from '../data/quizzes.json';

// Helper to get the current user's ID token
const getUserToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

// Get all skills
export const getSkills = async () => {
  return skillsData.skills;
};

// Get lessons for a skill
export const getLessons = async (skillId) => {
  return lessonsData.lessons[skillId] || [];
};

// Get a specific lesson
export const getLesson = async (skillId, lessonId) => {
  const lessons = lessonsData.lessons[skillId] || [];
  return lessons.find(lesson => lesson.id === lessonId);
};

// Get quiz for a lesson
export const getQuiz = async (skillId, lessonId) => {
  return quizzesData.quizzes[skillId]?.[lessonId] || null;
};

// Get user progress
export const getUserProgress = async () => {
  const token = await getUserToken();
  if (!token) return [];
  
  // Store progress in localStorage for offline access
  const cachedProgress = localStorage.getItem('userProgress');
  if (cachedProgress) {
    return JSON.parse(cachedProgress);
  }
  
  return [];
};

// Get user skills
export const getUserSkills = async () => {
  const token = await getUserToken();
  if (!token) return [];
  
  // Store skills in localStorage for offline access
  const cachedSkills = localStorage.getItem('userSkills');
  if (cachedSkills) {
    return JSON.parse(cachedSkills);
  }
  
  return [];
};

// Update user progress
export const updateProgress = async (progress) => {
  const token = await getUserToken();
  if (!token) return false;
  
  // Store in localStorage
  localStorage.setItem('userProgress', JSON.stringify(progress));
  return true;
};

// Update user skills
export const updateUserSkills = async (skills) => {
  const token = await getUserToken();
  if (!token) return false;
  
  // Store in localStorage
  localStorage.setItem('userSkills', JSON.stringify(skills));
  return true;
};

// Submit quiz results
export const submitQuizResults = async (skillId, lessonId, answers) => {
  const token = await getUserToken();
  if (!token) return false;

  const quiz = quizzesData.quizzes[skillId]?.[lessonId];
  if (!quiz) return false;

  // Calculate score
  const score = quiz.questions.reduce((acc, q, index) => {
    return acc + (answers[index] === q.correctAnswer ? 1 : 0);
  }, 0);

  // Store quiz results in localStorage
  const resultsKey = `quizResults_${skillId}_${lessonId}`;
  localStorage.setItem(resultsKey, JSON.stringify({
    score,
    total: quiz.questions.length,
    answers,
    timestamp: new Date().toISOString()
  }));

  return {
    score,
    total: quiz.questions.length,
    passed: score / quiz.questions.length >= 0.7 // Pass if score is 70% or higher
  };
};
