import { v4 as uuidv4 } from 'uuid';
import { db } from '../../lib/firebase-admin';
import { generateAIResponse } from '../../lib/openrouter';

const availableSkills = [
  { id: "web-development", name: "Web Development" },
  { id: "data-science", name: "Data Science" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "mobile-app-development", name: "Mobile App Development" }
];

function extractJSONFromString(str) {
  const jsonStart = str.indexOf('[');
  const jsonEnd = str.lastIndexOf(']') + 1;
  if (jsonStart !== -1 && jsonEnd !== -1) {
    return str.slice(jsonStart, jsonEnd);
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { interests, userId } = req.body;

    if (!interests || !userId) {
      return res.status(400).json({ message: 'Interests and userId are required' });
    }

    const systemMessage = `You are an AI skill recommender for SkillBoost, a learning platform. Based on the user's interests, recommend 3-5 relevant skills they should learn. Format your response as a JSON array of objects, where each object has these properties:
    - skill: The name of the skill
    - explanation: A brief explanation of why this skill matches their interests
    - matchPercentage: A number between 0-100 indicating how well this matches their interests
    
    Example format:
    [
      {
        "skill": "Web Development",
        "explanation": "Given your interest in creating visual interfaces...",
        "matchPercentage": 85
      }
    ]`;

    const messages = [
      {
        role: 'user',
        content: `These are my interests: ${interests}. Please recommend relevant skills to learn.`
      }
    ];

    const rawContent = await generateAIResponse(messages, systemMessage);
    let jsonContent = extractJSONFromString(rawContent);
    
    if (!jsonContent) {
      console.error('Failed to extract JSON from AI response');
      return res.status(500).json({ message: 'Invalid AI response structure' });
    }

    let recommendations;
    try {
      recommendations = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return res.status(500).json({ message: 'Error parsing AI response', rawResponse: jsonContent });
    }

    if (!Array.isArray(recommendations)) {
      console.error('AI response is not an array:', recommendations);
      return res.status(500).json({ message: 'Invalid AI response format' });
    }

    // Add the 'available' property and 'id' based on whether the skill is in the availableSkills array
    const processedRecommendations = recommendations.map(rec => {
      const availableSkill = availableSkills.find(skill => skill.name.toLowerCase() === rec.skill.toLowerCase());
      return {
        ...rec,
        available: !!availableSkill,
        id: availableSkill ? availableSkill.id : uuidv4(), // Use UUID for generated skills
        isGenerated: !availableSkill
      };
    });

    res.status(200).json({ recommendations: processedRecommendations });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
}