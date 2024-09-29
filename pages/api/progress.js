import { db, auth } from '../../lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const token = authorization.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(token);
      const userId = decodedToken.uid;

      const progressSnapshot = await db.collection('progress').where('userId', '==', userId).get();
      const progress = progressSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      res.status(200).json(progress);
    } catch (error) {
      console.error('Error fetching progress:', error);
      res.status(500).json({ error: 'Error fetching progress', details: error.message });
    }
  } else if (req.method === 'POST') {
    // Existing POST logic...
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
