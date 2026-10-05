import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'netlify-functions-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (
              (req.url?.startsWith('/api/pedia-coach') || req.url?.startsWith('/.netlify/functions/pedia-coach')) &&
              req.method === 'POST'
            ) {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const { query, lessonTitle, lessonContent, moduleTitle } = data;
                  const { GoogleGenAI } = await import('@google/genai');
                  const ai = new GoogleGenAI({});

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
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, reply }));
                } catch (err: any) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
              return;
            }

            if (req.url?.startsWith('/.netlify/functions/send-broadcast') && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const apiKey = process.env.RESEND_API_KEY;
                  if (apiKey) {
                    const { Resend } = await import('resend');
                    const resend = new Resend(apiKey);
                    const recipients = data.recipients || [];
                    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Baby First Health <updates@babyfirsthealth.com>';
                    const result = await resend.emails.send({
                      from: fromAddress,
                      to: data.isTest ? recipients[0] : recipients,
                      subject: data.payload.subject,
                      html: `<p>${data.payload.body}</p>`,
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, result }));
                  } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                      JSON.stringify({
                        success: true,
                        simulated: true,
                        message: 'Dev preview send successful. On Netlify, your RESEND_API_KEY delivers live.',
                      })
                    );
                  }
                } catch (err: any) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
