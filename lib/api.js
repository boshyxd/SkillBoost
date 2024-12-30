import { getAuth } from 'firebase/auth';
import skillsData from '../data/skills.json';
import lessonsData from '../data/lessons.json';
import quizzesData from '../data/quizzes.json';
import achievementsData from '../data/achievements.json';

// Helper to get the current user's ID token
const getUserToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

// Helper to get today's date as YYYY-MM-DD
const getToday = () => {
  return new Date().toISOString().split('T')[0];
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

// Get all achievements
export const getAchievements = async () => {
  return achievementsData.achievements;
};

// Get user progress
export const getUserProgress = async () => {
  const token = await getUserToken();
  if (!token) return [];
  
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
  
  const cachedSkills = localStorage.getItem('userSkills');
  if (cachedSkills) {
    return JSON.parse(cachedSkills);
  }
  
  return [];
};

// Get user achievements
export const getUserAchievements = async () => {
  const token = await getUserToken();
  if (!token) return [];

  const cachedAchievements = localStorage.getItem('userAchievements');
  if (cachedAchievements) {
    return JSON.parse(cachedAchievements);
  }

  return [];
};

// Update user progress and check for achievements
export const updateProgress = async (progress) => {
  const token = await getUserToken();
  if (!token) return false;
  
  // Store progress
  localStorage.setItem('userProgress', JSON.stringify(progress));

  // Update daily streak
  const today = getToday();
  const streakData = JSON.parse(localStorage.getItem('dailyStreak') || '{"lastDay":"","count":0}');
  
  if (streakData.lastDay !== today) {
    if (new Date(streakData.lastDay).getTime() + 86400000 >= new Date(today).getTime()) {
      // Consecutive day
      streakData.count++;
    } else {
      // Streak broken
      streakData.count = 1;
    }
    streakData.lastDay = today;
    localStorage.setItem('dailyStreak', JSON.stringify(streakData));
  }

  // Check for achievements
  await checkAchievements();
  
  return true;
};

// Update user skills
export const updateUserSkills = async (skills) => {
  const token = await getUserToken();
  if (!token) return false;
  
  localStorage.setItem('userSkills', JSON.stringify(skills));
  await checkAchievements();
  return true;
};

// Submit quiz results and check for achievements
export const submitQuizResults = async (skillId, lessonId, answers) => {
  const token = await getUserToken();
  if (!token) return false;

  const quiz = quizzesData.quizzes[skillId]?.[lessonId];
  if (!quiz) return false;

  const score = quiz.questions.reduce((acc, q, index) => {
    return acc + (answers[index] === q.correctAnswer ? 1 : 0);
  }, 0);

  const resultsKey = `quizResults_${skillId}_${lessonId}`;
  const result = {
    score,
    total: quiz.questions.length,
    answers,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem(resultsKey, JSON.stringify(result));
  await checkAchievements();

  return {
    score,
    total: quiz.questions.length,
    passed: score / quiz.questions.length >= 0.7
  };
};

// Check and update achievements
const checkAchievements = async () => {
  const progress = await getUserProgress();
  const skills = await getUserSkills();
  const achievements = await getUserAchievements();
  const streakData = JSON.parse(localStorage.getItem('dailyStreak') || '{"lastDay":"","count":0}');
  
  const newAchievements = [];

  // Check each achievement condition
  Object.values(achievementsData.achievements).forEach(achievement => {
    if (achievements.includes(achievement.id)) return;

    switch (achievement.condition.type) {
      case 'lesson_completed':
        if (progress.length >= achievement.condition.count) {
          newAchievements.push(achievement.id);
        }
        break;
      case 'perfect_quiz':
        const quizResults = Object.keys(localStorage)
          .filter(key => key.startsWith('quizResults_'))
          .map(key => JSON.parse(localStorage.getItem(key)));
        
        if (quizResults.some(result => result.score === result.total)) {
          newAchievements.push(achievement.id);
        }
        break;
      case 'skill_completed':
        if (skills.some(skill => {
          const lessons = lessonsData.lessons[skill.id] || [];
          return progress.filter(p => p.skillId === skill.id).length === lessons.length;
        })) {
          newAchievements.push(achievement.id);
        }
        break;
      case 'lessons_per_day':
        const today = getToday();
        const todayLessons = progress.filter(p => p.timestamp.startsWith(today));
        if (todayLessons.length >= achievement.condition.count) {
          newAchievements.push(achievement.id);
        }
        break;
      case 'daily_streak':
        if (streakData.count >= achievement.condition.count) {
          newAchievements.push(achievement.id);
        }
        break;
    }
  });

  if (newAchievements.length > 0) {
    const updatedAchievements = [...achievements, ...newAchievements];
    localStorage.setItem('userAchievements', JSON.stringify(updatedAchievements));
    return newAchievements;
  }

  return [];
};
