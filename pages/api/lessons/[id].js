import { db, auth } from '../../../lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const token = authorization.split('Bearer ')[1];
      await auth.verifyIdToken(token);

      const lessonDoc = await db.collection('lessons').doc(id).get();
      
      if (!lessonDoc.exists) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      const lessonData = lessonDoc.data();
      res.status(200).json({ id: lessonDoc.id, ...lessonData });
    } catch (error) {
      console.error('Error fetching lesson:', error);
      res.status(500).json({ error: 'Error fetching lesson', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}