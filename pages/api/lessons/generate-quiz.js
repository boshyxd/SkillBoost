import { auth } from '../../../lib/firebase-admin'
import { generateAIResponse } from '../../../lib/openrouter'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify authentication
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    await auth.verifyIdToken(token)

    const { lessonContent } = req.body
    if (!lessonContent) {
      return res.status(400).json({ error: 'Lesson content is required' })
    }

    // Generate quiz questions using AI
    const prompt = `
      Based on the following lesson content, generate 5 quiz questions that test understanding of key concepts.
      Each question should have 4 options with one correct answer.
      Also provide a brief explanation for each correct answer.
      Format the response as a JSON array of objects with the following structure:
      {
        "questions": [
          {
            "id": number,
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": number (0-3),
            "explanation": "string"
          }
        ]
      }

      Lesson Content:
      ${lessonContent}
    `

    const response = await generateAIResponse(prompt, {
      max_tokens: 1000,
      temperature: 0.7
    })

    // Parse and validate the response
    const quizData = JSON.parse(response)
    if (!quizData.questions || !Array.isArray(quizData.questions)) {
      throw new Error('Invalid quiz data format')
    }

    return res.status(200).json(quizData)
  } catch (error) {
    console.error('Error generating quiz:', error)
    return res.status(500).json({ error: 'Failed to generate quiz' })
  }
} 