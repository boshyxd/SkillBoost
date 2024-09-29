import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const quizDoc = await db.collection('quizzes').doc(id).get();
      if (!quizDoc.exists) {
        res.status(404).json({ error: 'Quiz not found' });
      } else {
        res.status(200).json({ id: quizDoc.id, ...quizDoc.data() });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching quiz' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}