import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Create axios instance with default config
const openRouterClient = axios.create({
  baseURL: OPENROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': 'SkillBoost',
    'Content-Type': 'application/json',
  },
  timeout: 60000
});

function cleanJsonResponse(content) {
  // Remove markdown code blocks if present
  content = content.replace(/^```json\n|\n```$/g, '');
  
  // Remove any non-printable characters
  content = content.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  
  // Find the first valid JSON start ([ or {) and matching end (] or })
  const startObject = content.indexOf('{');
  
  if (startObject === -1) {
    throw new Error('No valid JSON structure found in response');
  }
  
  // Find matching closing brace by counting opening and closing braces
  let braceCount = 0;
  let endObject = -1;
  
  for (let i = startObject; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endObject = i;
        break;
      }
    }
  }
  
  if (endObject === -1) {
    throw new Error('No matching closing brace found in JSON');
  }
  
  // Extract just the JSON part
  content = content.substring(startObject, endObject + 1);
  
  // Fix common JSON issues
  content = content.replace(/,\s*}/g, '}'); // Remove trailing commas in objects
  content = content.replace(/\n/g, ' '); // Remove newlines
  content = content.replace(/\r/g, ' '); // Remove carriage returns
  content = content.replace(/\t/g, ' '); // Remove tabs
  content = content.replace(/\s+/g, ' '); // Normalize whitespace
  content = content.replace(/([{,:])\s+/g, '$1'); // Remove whitespace after structural characters
  content = content.replace(/\s+([},:])/g, '$1'); // Remove whitespace before structural characters
  
  // Replace single quotes with double quotes, but only when they're used for strings
  content = content.replace(/:\s*'([^']*)'(?=\s*[,}])/g, ': "$1"');
  content = content.replace(/{\s*'([^']*)':/g, '{"$1":');
  
  // Remove empty string properties
  content = content.replace(/,\s*""\s*(?=}|,)/g, '');
  content = content.replace(/,\s*"[^"]+"\s*:\s*""(?=}|,)/g, '');
  
  // Fix malformed property patterns (consecutive commas, missing values)
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/{\s*,/g, '{');
  content = content.replace(/,\s*}/g, '}');
  
  // Remove any trailing commas in arrays
  content = content.replace(/,(\s*])/g, '$1');
  
  // Validate the cleaned JSON
  try {
    const parsed = JSON.parse(content);
    
    // Recursively remove empty or null properties
    const cleanObject = (obj) => {
      if (typeof obj !== 'object' || obj === null) return obj;
      
      if (Array.isArray(obj)) {
        return obj.map(cleanObject).filter(item => item !== null && item !== undefined && item !== '');
      }
      
      return Object.fromEntries(
        Object.entries(obj)
          .map(([key, value]) => [key, cleanObject(value)])
          .filter(([_, value]) => value !== null && value !== undefined && value !== '' && 
                                (typeof value !== 'object' || Object.keys(value).length > 0))
      );
    };
    
    const cleaned = cleanObject(parsed);
    return JSON.stringify(cleaned);
  } catch (error) {
    console.error('Failed to parse cleaned JSON:', error);
    throw new Error('Invalid JSON structure after cleaning');
  }
}

export async function generateAIResponse(messages, type = 'chat') {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const systemMessage = type === 'chat' ? 
      `You are an AI Skill Advisor, an expert in teaching and explaining technical concepts. Your responses should be:
      1. Comprehensive - Cover all aspects of the topic thoroughly
      2. Well-structured - Use clear headings (##) and sections
      3. Step-by-step - Break down complex concepts into manageable steps
      4. Example-rich - Provide practical examples and code snippets when relevant
      5. Beginner-friendly - Explain technical terms and concepts
      6. Actionable - Include specific tasks and exercises for practice` 
      : `CRITICAL INSTRUCTION: You are a JSON generator. You must output ONLY a valid JSON object.

DO NOT include ANY text before or after the JSON.
DO NOT add any explanations or commentary.
DO NOT use markdown formatting or code blocks.

YOUR ENTIRE RESPONSE MUST:
1. START with {
2. END with }
3. BE valid JSON
4. USE double quotes for all keys and string values

Example of CORRECT response format:
{
  "key": "value"
}

${messages[0].content}`;

    // Prepare messages array based on type
    const messageArray = type === 'chat' ? messages : [
      { role: 'system', content: systemMessage },
      { role: 'user', content: `Return ONLY a JSON object for a skill about "${messages[1].content}". Start with { and end with }. No other text.` }
    ];

    const response = await openRouterClient.post('/chat/completions', {
      model: 'anthropic/claude-3.5-haiku-20241022:beta',
      messages: messageArray,
      temperature: 0.1,
      max_tokens: 4000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      stop: type === 'chat' ? undefined : ['```', 'Here', 'Let me', 'I will']
    });

    if (!response.data) {
      console.error('No response data received');
      throw new Error('No response received from OpenRouter');
    }

    if (!response.data.choices || !response.data.choices[0] || !response.data.choices[0].message) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response format from OpenRouter');
    }

    let content = response.data.choices[0].message.content;
    if (!content) {
      console.error('Empty content received');
      throw new Error('Empty response from OpenRouter');
    }

    content = content.trim();
    console.log('Raw AI response:', content);
    
    // For chat responses, return content directly
    if (type === 'chat') {
      return content;
    }
    
    // For JSON responses, ensure we have a JSON object
    if (!content.startsWith('{') || !content.endsWith('}')) {
      // Try to extract JSON if it's embedded
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}');
      
      if (jsonStart === -1 || jsonEnd === -1) {
        console.error('Invalid content structure:', content);
        throw new Error('Response does not contain a valid JSON object');
      }
      
      content = content.slice(jsonStart, jsonEnd + 1);
    }
    
    try {
      // Try to parse it directly first
      const parsed = JSON.parse(content);
      return parsed;
    } catch (parseError) {
      // If direct parsing fails, try to clean it up
      console.log('Direct JSON parse failed:', parseError.message);
      console.log('Attempting to clean response');
      const cleanedContent = cleanJsonResponse(content);
      return JSON.parse(cleanedContent);
    }

  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    
    // Handle specific OpenRouter error codes
    if (error.response?.data?.error) {
      const { code, message } = error.response.data.error;
      switch (code) {
        case 400:
          throw new Error(`Bad request: ${message}`);
        case 401:
          throw new Error('Invalid OpenRouter API key');
        case 402:
          throw new Error('Insufficient credits');
        case 403:
          throw new Error('Content moderation failed');
        case 404:
          throw new Error(`Not found: ${message}`);
        case 408:
          throw new Error('Request timed out');
        case 429:
          throw new Error('Rate limit exceeded');
        case 502:
          throw new Error('Model is currently unavailable');
        case 503:
          throw new Error('No available model provider');
        default:
          throw new Error(`OpenRouter error: ${message}`);
      }
    }
    
    throw error;
  }
} 