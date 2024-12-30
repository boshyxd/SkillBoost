import { db } from '../../lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const skillsSnapshot = await db.collection('userSkills')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const skills = skillsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString()
    }));

    res.status(200).json({ skills });
  } catch (error) {
    console.error('Error fetching user skills:', error);
    res.status(500).json({ message: 'Error fetching user skills', error: error.message });
  }
} 