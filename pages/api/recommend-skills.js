import { Anthropic } from '@anthropic-ai/sdk';
import { v4 as uuidv4 } from 'uuid'; // Add this import at the top of the file

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

  const { interests } = req.body;

  if (!interests || interests.trim().length < 5) {
    return res.status(400).json({ message: 'Please provide more detailed interests for accurate recommendations.' });
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4000,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: `Based on the following user interests, recommend 4-6 skills. Include skills from this list if relevant: ${availableSkills.map(skill => skill.name).join(", ")}. Also suggest additional skills not in the list that might be relevant. For each recommended skill, provide a match percentage (0-100) indicating how well it aligns with the user's interests, and a brief (20-30 words) explanation of why it's a good match. Format the response as a JSON array of objects, each containing 'skill', 'matchPercentage', and 'explanation' properties. If the interests provided are too vague or short, return an empty array.

User interests: ${interests}

Response format example:
[
  {
    "skill": "Web Development",
    "matchPercentage": 85,
    "explanation": "Your interest in creating digital experiences aligns well with web development, allowing you to build interactive websites and applications."
  },
  {
    "skill": "Data Science",
    "matchPercentage": 70,
    "explanation": "Your analytical mindset and curiosity about patterns make data science a great fit for exploring insights in large datasets."
  }
]

Provide recommendations even if the interests are not directly related to technology, and limit the response to a maximum of 6 skills. Ensure the response is a valid JSON array.`
        }
      ]
    });

    let rawContent = message.content[0].text;
    console.log('Raw AI response:', rawContent);

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