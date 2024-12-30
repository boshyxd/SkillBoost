import { db } from '../../lib/firebase-admin';
import { generateAIResponse } from '../../lib/openrouter';

const MAX_CONTENT_LENGTH = 100000;

const SKILL_SYSTEM_MESSAGE = `You are a Skill Content Generator for SkillBoost. Your task is to create comprehensive, well-structured learning content in STRICT JSON format.

CRITICAL JSON FORMATTING RULES:
1. Use ONLY double quotes (") for ALL property names and string values - NEVER use single quotes (')
2. ALL property names MUST be quoted with double quotes - Example: "title": "value"
3. NEVER leave properties with empty or null values - either provide a complete value or omit the property
4. COMMAS ARE CRITICAL:
   - ALWAYS add a comma after each object/array item EXCEPT the last one
   - NEVER add a comma after the last item in an array or object
   - Example array: ["item1", "item2", "item3"]  // NO comma after item3
   - Example object: {"key1": "value1", "key2": "value2"}  // NO comma after value2
5. ALL arrays and objects MUST be properly terminated with ] or }
6. NEVER use comments, ellipsis (...), or placeholders in the JSON
7. NEVER use unquoted text anywhere except true, false, or numbers
8. String values MUST be properly quoted and escaped
9. Arrays MUST have at least one item or be omitted entirely
10. Objects MUST have at least one property or be omitted entirely
11. NEVER use spaces or special characters in property names
12. ALWAYS use commas to separate items in arrays and objects

CONTENT RULES:
1. Generate COMPLETE content for every field - no shortcuts or placeholders
2. If you need to keep the response shorter, include fewer items but make each one COMPLETE
3. Each lesson MUST have ALL required fields filled out
4. Better to provide one fully detailed lesson than multiple incomplete ones
5. ALL string values must be proper English sentences or phrases
6. URLs must be complete and valid, or omitted entirely
7. Code examples must be complete and valid, or omitted entirely
8. NEVER use commas within string values - use semicolons or other separators instead

Required JSON Structure (EVERY property name MUST be in double quotes):
{
  "title": "string",
  "description": "string",
  "difficulty": "beginner"|"intermediate"|"advanced",
  "estimatedTime": "string",
  "prerequisites": [{
    "skill": "string",
    "description": "string",
    "minimumProficiency": "string"
  }],
  "objectives": [{
    "objective": "string",
    "importance": "string",
    "applicationScenarios": ["string"]
  }],
  "lessons": [{
    "title": "string",
    "description": "string",
    "content": "string",
    "duration": "string",
    "keyTakeaways": [{
      "point": "string",
      "explanation": "string",
      "examples": ["string"]
    }],
    "quiz": {
      "question": "string",
      "options": ["string"],
      "correctAnswer": 0,
      "explanation": "string"
    },
    "task": {
      "description": "string",
      "prerequisites": [{
        "requirement": "string",
        "reason": "string"
      }],
      "steps": [{
        "instruction": "string",
        "explanation": "string",
        "codeExample": "string",
        "commonIssues": ["string"],
        "successCriteria": "string",
        "tips": ["string"]
      }],
      "verificationSteps": [{
        "check": "string",
        "criteria": "string",
        "troubleshooting": ["string"]
      }],
      "tips": [{
        "tip": "string",
        "context": "string",
        "examples": ["string"]
      }],
      "commonMistakes": [{
        "mistake": "string",
        "impact": "string",
        "prevention": "string",
        "solution": "string"
      }],
      "examples": [{
        "scenario": "string",
        "implementation": "string",
        "explanation": "string",
        "bestPractices": ["string"]
      }],
      "codeExamples": ["string"]
    }
  }],
  "resources": [{
    "type": "string",
    "title": "string",
    "url": "string",
    "description": "string"
  }]
}

QUIZ RULES:
1. Each lesson MUST have exactly one quiz question
2. Quiz question should test the main concept of the lesson
3. Provide exactly 4 options for each question
4. Only one option should be correct
5. correctAnswer must be the index (0-3) of the correct option
6. Include a clear explanation of why the answer is correct
7. Options should be plausible but clearly distinguishable
8. Question should be specific and unambiguous

REMEMBER:
- Every property name MUST be in double quotes
- Every string value MUST be in double quotes
- NO comments or placeholders anywhere
- Commas MUST separate items but NEVER appear after the last item
- Complete, detailed content only
- If you need to make it shorter, provide fewer items but make each one complete
- Use semicolons instead of commas in string values`;

function cleanAndValidateJSON(rawContent) {
  try {
    // Extract just the JSON part
    const jsonStart = rawContent.indexOf('{');
    const jsonEnd = rawContent.lastIndexOf('}') + 1;
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No JSON structure found');
    }
    
    let jsonContent = rawContent.slice(jsonStart, jsonEnd);

    // First pass: Clean up the content while preserving string values
    const stringValues = [];
    jsonContent = jsonContent.replace(/"([^"\\]|\\.)*"/g, (match) => {
      stringValues.push(match);
      return `"__STRING_${stringValues.length - 1}__"`;
    });

    // Second pass: Clean up the structure
    jsonContent = jsonContent
      // Remove all whitespace between tokens
      .replace(/\s+/g, '')
      // Ensure proper spacing after colons and commas
      .replace(/:/g, ': ')
      .replace(/,/g, ', ')
      // Fix any double spaces
      .replace(/\s+/g, ' ')
      .trim();

    // Third pass: Restore string values with proper cleaning
    jsonContent = jsonContent.replace(/"__STRING_(\d+)__"/g, (_, index) => {
      let str = stringValues[index];
      // Clean up the string value
      str = str
        .slice(1, -1) // Remove quotes
        .replace(/;/g, ',') // Replace semicolons with commas
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
      return `"${str}"`;
    });

    // Parse the JSON
    const parsed = JSON.parse(jsonContent);
    
    // Simple recursive cleaner that removes empty values
    const cleanObject = (obj) => {
      if (!obj || typeof obj !== 'object') return obj;
      
      if (Array.isArray(obj)) {
        return obj
          .map(cleanObject)
          .filter(item => item != null && (!Array.isArray(item) || item.length));
      }
      
      const cleaned = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value == null) continue;
        if (Array.isArray(value) && !value.length) continue;
        if (typeof value === 'object' && !Object.keys(value).length) continue;
        
        cleaned[key] = typeof value === 'string' 
          ? value.trim().replace(/\s+/g, ' ')
          : cleanObject(value);
      }
      return cleaned;
    };
    
    return cleanObject(parsed);
  } catch (error) {
    console.error('JSON cleaning error:', error);
    throw new Error('Invalid skill structure');
  }
}

// Helper function to clean and validate skill data
const cleanSkillData = (data) => {
  // Remove any undefined values recursively
  const clean = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
        clean(obj[key]);
      } else if (obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  };

  // Create a deep copy and clean it
  const cleanedData = clean(JSON.parse(JSON.stringify(data)));

  // Ensure required fields exist
  const required = {
    title: cleanedData.title || 'Untitled Skill',
    description: cleanedData.description || 'No description provided',
    content: cleanedData.content || '',
    difficulty: cleanedData.difficulty || 'beginner',
    estimatedTime: cleanedData.estimatedTime || '1 hour',
    prerequisites: cleanedData.prerequisites || [],
    objectives: cleanedData.objectives || [],
    skills: cleanedData.skills || [],
    lessons: cleanedData.lessons || [],
    resources: cleanedData.resources || []
  };

  // Ensure each lesson has required fields
  if (required.lessons) {
    required.lessons = required.lessons.map(lesson => ({
      title: lesson.title || 'Untitled Lesson',
      description: lesson.description || 'No description provided',
      content: lesson.content || '',
      order: lesson.order || 1,
      duration: lesson.duration || '15 minutes',
      keyTakeaways: lesson.keyTakeaways || [],
      quiz: lesson.quiz ? {
        question: lesson.quiz.question || 'Quiz question not provided',
        options: lesson.quiz.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correctAnswer: typeof lesson.quiz.correctAnswer === 'number' ? lesson.quiz.correctAnswer : 0,
        explanation: lesson.quiz.explanation || 'Explanation not provided'
      } : {
        question: 'Default quiz question',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correctAnswer: 0,
        explanation: 'Default explanation'
      },
      task: lesson.task ? {
        description: lesson.task.description || '',
        steps: lesson.task.steps || [],
        tips: lesson.task.tips || []
      } : null
    }));
  }

  return required;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, additionalContext, userId } = req.body;
    console.log('Received request:', { topic, userId });

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const messages = [
      {
        role: 'system',
        content: SKILL_SYSTEM_MESSAGE
      },
      {
        role: 'user',
        content: `Generate a comprehensive skill about "${topic}". ${additionalContext || ''}`
      }
    ];

    // Generate the skill content
    console.log('Generating AI response...');
    const rawContent = await generateAIResponse(messages, 'skill');
    console.log('Raw AI response received');

    // Clean and validate the JSON
    let skillData;
    try {
      console.log('Processing AI response...');
      // First try to parse it as is
      if (typeof rawContent === 'object' && rawContent !== null) {
        skillData = rawContent;
      } else {
        // If it's a string, clean and parse it
        skillData = cleanAndValidateJSON(rawContent);
      }

      console.log('Validating skill structure...');
      // Basic structure validation
      if (!skillData || typeof skillData !== 'object' || Array.isArray(skillData)) {
        throw new Error('Invalid skill structure: must be an object');
      }

      // Required fields validation
      const requiredFields = ['title', 'description', 'difficulty', 'estimatedTime', 'lessons'];
      const missingFields = requiredFields.filter(field => !skillData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate lessons array
      if (!Array.isArray(skillData.lessons) || skillData.lessons.length === 0) {
        throw new Error('At least one lesson is required');
      }

      // Generate IDs
      const skillId = `skill-${Date.now()}`;
      console.log('Generated skillId:', skillId);
      
      // Clean and normalize the data
      const cleanedData = {
        id: skillId,
        userId,
        title: String(skillData.title).trim(),
        description: String(skillData.description).trim(),
        difficulty: String(skillData.difficulty).toLowerCase(),
        estimatedTime: String(skillData.estimatedTime).trim(),
        prerequisites: Array.isArray(skillData.prerequisites) ? skillData.prerequisites : [],
        objectives: Array.isArray(skillData.objectives) ? skillData.objectives : [],
        resources: Array.isArray(skillData.resources) ? skillData.resources : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Saving skill to Firestore...');
      // Save the skill
      try {
        await db.collection('skills').doc(skillId).set(cleanedData);
      } catch (firestoreError) {
        console.error('Firestore save error:', firestoreError);
        throw new Error(`Failed to save skill: ${firestoreError.message}`);
      }

      console.log('Processing lessons...');
      // Process and save each lesson
      const lessons = await Promise.all(skillData.lessons.map(async (lesson, index) => {
        const lessonId = `${skillId}-lesson-${index + 1}`;
        const lessonData = {
          id: lessonId,
          skillId,
          order: index + 1,
          title: String(lesson.title || '').trim() || 'Untitled Lesson',
          description: String(lesson.description || '').trim() || 'No description provided',
          content: String(lesson.content || '').trim(),
          duration: String(lesson.duration || '').trim() || '15 minutes',
          keyTakeaways: Array.isArray(lesson.keyTakeaways) ? lesson.keyTakeaways : [],
          quiz: lesson.quiz ? {
            question: lesson.quiz.question || 'Quiz question not provided',
            options: lesson.quiz.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: typeof lesson.quiz.correctAnswer === 'number' ? lesson.quiz.correctAnswer : 0,
            explanation: lesson.quiz.explanation || 'Explanation not provided'
          } : {
            question: 'Default quiz question',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 0,
            explanation: 'Default explanation'
          },
          task: lesson.task ? {
            description: String(lesson.task.description || '').trim(),
            prerequisites: Array.isArray(lesson.task.prerequisites) ? lesson.task.prerequisites : [],
            steps: Array.isArray(lesson.task.steps) ? lesson.task.steps : [],
            verificationSteps: Array.isArray(lesson.task.verificationSteps) ? lesson.task.verificationSteps : [],
            tips: Array.isArray(lesson.task.tips) ? lesson.task.tips : [],
            commonMistakes: Array.isArray(lesson.task.commonMistakes) ? lesson.task.commonMistakes : [],
            examples: Array.isArray(lesson.task.examples) ? lesson.task.examples : []
          } : null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        try {
          await db.collection('skills').doc(skillId).collection('lessons').doc(lessonId).set(lessonData);
        } catch (firestoreError) {
          console.error(`Failed to save lesson ${lessonId}:`, firestoreError);
          throw new Error(`Failed to save lesson: ${firestoreError.message}`);
        }
        return lessonData;
      }));

      console.log('Successfully generated and saved skill and lessons');
      // Success response
      res.status(200).json({
        ...cleanedData,
        lessons
      });
    } catch (error) {
      console.error('Error processing skill data:', error);
      res.status(500).json({ 
        error: 'Error processing skill content', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  } catch (error) {
    console.error('Error in skill generation:', error);
    res.status(500).json({ 
      error: 'Error generating skill content', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}