import { db, auth } from '../../lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const token = authorization.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(token);
      const userId = decodedToken.uid;

      const { lessonId, completed } = req.body;

      await db.collection('progress').add({
        userId,
        lessonId,
        completed,
        timestamp: new Date().toISOString()
      });

      res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({ error: 'Error updating progress', details: error.message });
    }
  } else if (req.method === 'GET') {
    // Existing GET logic...
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
