import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export function useUserSkills() {
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserSkills();
    }
  }, [user]);

  const fetchUserSkills = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'userSkills'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserSkills(skills);
    } catch (error) {
      console.error('Error fetching user skills:', error);
    }
    setLoading(false);
  };

  const addUserSkill = async (skillData) => {
    try {
      const docRef = await addDoc(collection(db, 'userSkills'), {
        ...skillData,
        userId: user.uid,
        createdAt: new Date()
      });
      setUserSkills([...userSkills, { id: docRef.id, ...skillData }]);
    } catch (error) {
      console.error('Error adding user skill:', error);
    }
  };

  const deleteUserSkill = async (skillId) => {
    try {
      await deleteDoc(doc(db, 'userSkills', skillId));
      setUserSkills(userSkills.filter(skill => skill.id !== skillId));
    } catch (error) {
      console.error('Error deleting user skill:', error);
    }
  };

  return { userSkills, loading, addUserSkill, deleteUserSkill, fetchUserSkills };
}