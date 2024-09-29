import { Anthropic } from '@anthropic-ai/sdk';
import { db, auth } from '../../lib/firebase-admin';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages, userId } = req.body;

    // Fetch user data from Firebase
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    // Fetch user's stored interests
    const interestsSnapshot = await db.collection('userInterests').where('userId', '==', userId).get();
    const userInterests = interestsSnapshot.docs.map(doc => doc.data().interest);

    // Fetch user's skills
    const skillsSnapshot = await db.collection('userSkills').where('userId', '==', userId).get();
    const userSkills = skillsSnapshot.docs.map(doc => doc.data().skill);

    const systemMessage = `You are a helpful AI learning companion, assisting users with their educational journey on SkillBoost. 
    User Info: ${JSON.stringify(userData)}
    User Interests: ${userInterests.join(', ')}
    User Skills: ${userSkills.join(', ')}
    Use this information to provide personalized responses.`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0.7,
      system: systemMessage,
      messages: messages
    });

    res.status(200).json({ reply: response.content[0].text });
  } catch (error) {
    console.error('Error in AI Companion API:', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
}