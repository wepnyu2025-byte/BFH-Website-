import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { query, lessonTitle, lessonContent, moduleTitle } = req.body || {};

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured in production environment variables.',
      });
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
4. Format using clean markdown (paragraphs and bullet points).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are Pedia, the official Early Childhood Development (ECD) learning coach for Baby First Health. You assist healthcare, caregiver, and early childhood students. Keep all answers professional, encouraging, evidence-based (WHO/AAP/UNICEF), and concise. ABSOLUTELY FORBIDDEN: Do not use emojis anywhere in your response.`,
      },
    });

    const reply = response.text || '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ success: true, reply });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
