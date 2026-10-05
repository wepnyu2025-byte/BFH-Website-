import { GoogleGenAI } from '@google/genai';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { query, lessonTitle, lessonContent, moduleTitle } = data;

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Query is required' }),
      };
    }

    const ai = new GoogleGenAI({});
    const prompt = `Student Question: "${query}"

Current Context:
- Course Module: ${moduleTitle || 'Early Childhood Development'}
- Active Lesson: ${lessonTitle || 'Core Lesson'}
- Lesson Content Excerpt:
${(lessonContent || '').slice(0, 1800)}

Instructions:
1. Provide an authoritative, clear, encouraging explanation as Pedia, the Baby First Health learning coach.
2. ABSOLUTELY NO EMOJIS under any circumstances.
3. If the student asks for quiz answers or direct test options, do NOT give answers; guide them to understand the core concept.
4. Format using clean markdown (paragraphs and bullet points).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are Pedia, the official Early Childhood Development (ECD) learning coach for Baby First Health. You assist healthcare, caregiver, and early childhood students. Keep all answers professional, encouraging, evidence-based (WHO/AAP/UNICEF), and concise. ABSOLUTELY FORBIDDEN: Do not use emojis anywhere in your response.`,
      },
    });

    const reply = response.text || '';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, reply }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
