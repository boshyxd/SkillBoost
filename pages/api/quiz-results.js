import { db, auth } from '../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authorization.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { quizId, answers } = req.body;

    const quizResult = {
      userId,
      quizId,
      answers,
      timestamp: new Date().toISOString(),
    };

    await db.collection('quizResults').add(quizResult);
    res.status(201).json({ message: 'Quiz results submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting quiz results' });
  }
}