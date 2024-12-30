import { db } from '../../lib/firebase-admin';
import { generateAIResponse } from '../../lib/openrouter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!Array.isArray(messages)) {
      return res.status(400).json({ message: 'Messages must be an array' });
    }

    // Fetch user's skills with a simpler query
    const skillsSnapshot = await db.collection('userSkills')
      .where('userId', '==', userId)
      .get();

    const userSkills = skillsSnapshot.docs.map(doc => doc.data().skill);

    // Format messages for OpenRouter
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    const systemMessage = `You are a helpful AI learning companion, assisting users with their educational journey on SkillBoost. 
    The user has learned the following skills: ${userSkills.length > 0 ? userSkills.join(', ') : 'No skills recorded yet'}.
    Use this information to provide personalized responses and suggestions.
    When discussing skills, always reference their actual learned skills from the database.
    If they ask about their skills, tell them what they've learned based on the data above.
    Be encouraging and suggest related skills they might want to learn next.
    Format your responses in a clear, readable way using markdown for better presentation.`;

    const reply = await generateAIResponse(formattedMessages, systemMessage);

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error in AI Companion API:', error);
    res.status(500).json({ 
      message: 'Error processing your request', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    });
  }
}