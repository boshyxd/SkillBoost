import { db, auth } from '../../../lib/firebase-admin';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Verify the Firebase ID token
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const idToken = authorization.split('Bearer ')[1];
      await auth.verifyIdToken(idToken);

      // Check if it's a generated skill
      const generatedSkillDoc = await db.collection('generatedSkills').doc(id).get();
      
      if (generatedSkillDoc.exists) {
        const skillData = generatedSkillDoc.data();
        res.status(200).json({ 
          id: generatedSkillDoc.id, 
          skillPage: skillData,
          lessons: skillData.lessons
        });
      } else {
        // If not a generated skill, check regular skills
        const skillDoc = await db.collection('skills').doc(id).get();
        if (skillDoc.exists) {
          const skillData = skillDoc.data();
          const lessonsSnapshot = await db.collection('lessons').where('skillId', '==', id).get();
          const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          res.status(200).json({ 
            id: skillDoc.id, 
            skillPage: skillData,
            lessons: lessons
          });
        } else {
          res.status(404).json({ error: 'Skill not found' });
        }
      }
    } catch (error) {
      console.error('Error fetching skill:', error);
      res.status(500).json({ error: 'Error fetching skill', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}