import { getAuth } from 'firebase/auth';
import skillsData from '../data/skills.json';

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

// Get user progress from Firebase
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

// Get user skills from Firebase
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
