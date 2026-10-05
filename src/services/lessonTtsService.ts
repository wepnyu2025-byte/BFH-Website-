/**
 * High-Definition Lesson Text-to-Speech (TTS) Service
 * 
 * Powered by Google Cloud & Google GenAI TTS (gemini-3.8-flash-lite-tts with Kore neural voice),
 * with client-side cache and seamless fallback to browser Enhanced/Natural voices.
 */

const audioCache = new Map<string, string>();

/**
 * Strips raw markdown formatting for natural, human-sounding pacing
 */
export function cleanMarkdownForSpeech(markdown: string): string {
  return (markdown || '')
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^>\s*/gm, '')
    .replace(/`{1,3}.*?`{1,3}/gs, '')
    .replace(/\|/g, ', ')
    .replace(/[-*+]\s+/g, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Converts a base64 string into a Blob for zero-overhead HTML5 audio playback on Safari and Chrome
 */
function base64ToBlob(base64: string, mimeType: string): Blob {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

/**
 * Fetches high-definition Google AI neural TTS audio for a lesson
 */
export async function getLessonGoogleTtsAudio(
  lessonId: string,
  title: string,
  markdownContent: string
): Promise<string | null> {
  // Check memory cache first (instant response on subsequent plays)
  if (audioCache.has(lessonId)) {
    return audioCache.get(lessonId)!;
  }

  const cleanText = cleanMarkdownForSpeech(markdownContent);
  const endpoints = ['/api/lesson-tts', '/.netlify/functions/lesson-tts'];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          text: cleanText.slice(0, 1600),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.audioBase64) {
          const blob = base64ToBlob(data.audioBase64, data.mimeType || 'audio/wav');
          const blobUrl = URL.createObjectURL(blob);
          audioCache.set(lessonId, blobUrl);
          return blobUrl;
        }
      }
    } catch {
      // Proceed to next fallback
    }
  }

  return null;
}

/**
 * Discovers and selects the best natural/neural voice available in the browser
 */
export function getBestNaturalBrowserVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Search priority: 1. Natural/Neural (Edge/Windows), 2. Google US/UK English (Chrome/Android), 3. Enhanced/Premium (Apple)
  const priorityPatterns = [
    /natural/i,
    /google.*(us|uk|english)/i,
    /enhanced/i,
    /premium/i,
    /jenny/i,
    /aria/i,
    /samantha/i,
    /en-us/i,
    /en-gb/i,
  ];

  for (const pattern of priorityPatterns) {
    const match = voices.find(
      (v) => pattern.test(v.name) && (v.lang.startsWith('en') || !v.lang)
    );
    if (match) return match;
  }

  // Fallback to any English voice
  return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
}
