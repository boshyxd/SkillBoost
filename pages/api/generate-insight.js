import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 150,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: "Generate a brief, insightful statement about the future of technology and its impact on society. Make it thought-provoking and forward-thinking."
        }
      ]
    });

    const insight = message.content[0].text;
    res.status(200).json({ insight });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating insight' });
  }
}