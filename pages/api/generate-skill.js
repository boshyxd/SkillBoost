import { Anthropic } from '@anthropic-ai/sdk';
import { db } from '../../lib/firebase-admin';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_CONTENT_LENGTH = 100000; // Adjust this value as needed

function cleanAndValidateJSON(str) {
  // Remove any non-printable characters
  str = str.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  
  // Remove any text before the first '{' and after the last '}'
  str = str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);

  // Attempt to parse and stringify to ensure valid JSON
  try {
    return JSON.stringify(JSON.parse(str));
  } catch (error) {
    console.error('Error parsing cleaned JSON:', error);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { skillName, description } = req.body;

  if (!skillName) {
    return res.status(400).json({ message: 'Skill name is required' });
  }

  try {
    // Generate a URL-friendly ID from the skill name
    const skillId = skillName.toLowerCase().replace(/\s+/g, '-');

    // Check if the skill already exists
    const existingSkill = await db.collection('generatedSkills').doc(skillId).get();
    if (existingSkill.exists) {
      // If the skill exists, return the existing data
      return res.status(200).json({ 
        id: skillId, 
        ...existingSkill.data()
      });
    }

    // If the skill doesn't exist, generate new content
    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4000,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: `Generate a comprehensive skill page overview and 3 lessons for the skill "${skillName}". Use this description as a starting point: "${description}".

The response should be a valid JSON object with the following structure:

{
  "skillPage": {
    "title": "string",
    "description": "string",
    "learningObjectives": ["string", "string", ...],
    "importance": "string",
    "applications": ["string", "string", ...],
    "prerequisites": "string",
    "estimatedTime": "string"
  },
  "lessons": [
    {
      "title": "string",
      "content": "string (HTML format)",
      "keyTakeaways": ["string", "string", ...],
      "task": {
        "description": "string",
        "steps": ["string", "string", ...],
        "tips": ["string", "string", ...]
      }
    },
    // ... (2 more lesson objects)
  ]
}

For each lesson, provide engaging content that builds upon the previous lessons. The task should be practical and help reinforce the lesson's concepts. Use prompt engineering techniques to make the lessons and tasks more effective for learning.

Ensure that the response is a valid JSON object without any additional text or formatting.`
        }
      ]
    });

    let rawContent = message.content[0].text;
    
    // Clean and validate the JSON
    const cleanedContent = cleanAndValidateJSON(rawContent);

    if (!cleanedContent) {
      console.error('Failed to clean and validate JSON');
      console.error('Raw AI response:', rawContent);
      return res.status(500).json({ message: 'Invalid AI response structure' });
    }

    let generatedContent;
    try {
      generatedContent = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Error parsing cleaned AI response:', parseError);
      console.error('Cleaned AI response:', cleanedContent);
      return res.status(500).json({ message: 'Error parsing AI response', error: parseError.message });
    }

    if (!generatedContent.skillPage || !generatedContent.lessons || generatedContent.lessons.length !== 3) {
      return res.status(500).json({ message: 'Invalid AI response structure' });
    }

    // Save the generated skill to the database with the generated ID
    await db.collection('generatedSkills').doc(skillId).set({
      skillPage: generatedContent.skillPage,
      lessons: generatedContent.lessons
    });

    // Return the full skill data including the new ID
    res.status(200).json({ 
      id: skillId, 
      skillPage: generatedContent.skillPage,
      lessons: generatedContent.lessons
    });
  } catch (error) {
    console.error('Error generating skill content:', error);
    res.status(500).json({ message: 'Error generating skill content', error: error.message });
  }
}