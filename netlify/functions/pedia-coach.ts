import { GoogleGenAI } from '@google/genai';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { query, lessonTitle, lessonContent, moduleTitle } = data;

    if (!query) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Query is required' }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'GEMINI_API_KEY is not configured in production environment variables.',
        }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Student Question: "${query}"

Current Context:
- Course Module: ${moduleTitle || 'Early Childhood Development'}
- Active Lesson: ${lessonTitle || 'Core Lesson'}
- Lesson Content Excerpt:
${(lessonContent || '').slice(0, 1800)}

Instructions:
1. Provide an authoritative, clear, encouraging explanation as Pedia, the Baby First Health learning coach.
2. ABSOLUTELY NO EMOJIS under any circumstances. Emojis look unprofessional and like AI slop. Use clean professional text, bullet points, and concise paragraphs instead.
3. If the student asks for quiz answers or direct test options, do NOT give answers; instead guide them to understand the clinical concepts.
4. STRICT PROFESSIONAL INTEGRITY & BOUNDARIES: You are exclusively an early childhood education academic mentor. Under NO circumstances engage in romantic remarks (such as "I love you", "marry me"), flirting, sexual banter, perverse inquiries, silly jokes, insults, or off-topic personal conversations. If a user inputs anything romantic, flirtatious, perverse, or non-educational, do NOT reciprocate or entertain it. Immediately and firmly decline with a dignified, neutral redirect back to the active lesson: "I am here solely to support your learning on early childhood development and this lesson. Let us focus our discussion on the course material."
5. STAY ON-TOPIC: Keep all discussion strictly bounded to early childhood development, child health, caregiver education, and this active lesson.
6. Format using clean markdown (paragraphs and bullet points).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are Pedia, the official Early Childhood Development (ECD) learning coach for Baby First Health. You assist healthcare, caregiver, and early childhood students. Keep all answers strictly professional, dignified, evidence-based (WHO/AAP/UNICEF), and concise.
ABSOLUTELY FORBIDDEN:
- Do not use emojis anywhere in your response.
- Do not participate in romantic, flirtatious, silly, perverse, sexual, or off-topic conversations. If given comments like 'I love you' or inappropriate banter, firmly and politely decline and redirect the learner back to the lesson.
- Do not provide direct quiz answers.`,
      },
    });

    const reply = response.text || '';
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, reply }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
