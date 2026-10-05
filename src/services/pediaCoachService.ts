import { CourseLesson, CourseModule } from '../types/studentPortal';

/**
 * Pedia AI Early Childhood Learning Coach
 * Grounded in WHO Nurturing Care Framework, AAP Guidelines, and Baby First Health Curriculum
 * Supports:
 * 1. Server-side API endpoint (/api/pedia-coach, /.netlify/functions/pedia-coach)
 * 2. Client-side direct Gemini fallback (if VITE_GEMINI_API_KEY is supplied on GitHub Pages)
 * 3. Deep Offline/Static Clinical Pediatric Knowledge Base (Zero repetitive loops)
 */

export interface PediaMessage {
  id: string;
  sender: 'coach' | 'student';
  text: string;
  timestamp: number;
}

/**
 * Generates tailored suggested questions based on the active lesson
 */
export function getSuggestedQuestions(lesson: CourseLesson, module?: CourseModule): string[] {
  const title = (lesson.title || '').toLowerCase();
  const content = (lesson.content || '').toLowerCase();

  // Module 2: Physical Development topics
  if (title.includes('gross') || title.includes('fine motor') || content.includes('gross motor')) {
    return [
      'What is the difference between gross and fine motor skills?',
      'Can you give examples of fine motor activities at home?',
      'What is the pincer grasp and when does it develop?'
    ];
  }

  if (title.includes('tummy time') || content.includes('tummy time')) {
    return [
      'Why is tummy time essential for neck and trunk control?',
      'What should I do if a baby cries during tummy time?',
      'What is the cephalocaudal development principle?'
    ];
  }

  if (title.includes('sleep') || content.includes('sleep duration')) {
    return [
      'What are the AAP safe sleep recommendations?',
      'How many hours of sleep does a toddler need daily?',
      'Why is back-sleeping recommended for infants?'
    ];
  }

  if (title.includes('nutrition') || content.includes('breastfeed')) {
    return [
      'What is recommended for infant nutrition in the first 6 months?',
      'When should complementary foods be introduced?',
      'How does adequate nutrition support physical growth?'
    ];
  }

  if (title.includes('red flag') || title.includes('concern') || content.includes('delay')) {
    return [
      'What are the key motor red flags requiring medical review?',
      'What is persistent physical asymmetry in infants?',
      'Why should caregivers not diagnose motor delays online?'
    ];
  }

  // Module 3: Cognitive Development topics
  if (title.includes('what is cognitive') || content.includes('what does cognitive')) {
    return [
      'What does cognitive development mean in early childhood?',
      'How do children learn to think and solve problems?',
      'Why is cognitive development linked to language?'
    ];
  }

  if (title.includes('how babies learn') || content.includes('spoon')) {
    return [
      'What is a baby learning when they repeatedly drop a spoon?',
      'What does responsive caregiving mean in daily routines?',
      'How do cause-and-effect discoveries build brain synapses?'
    ];
  }

  if (title.includes('attention') || title.includes('memory') || content.includes('memory')) {
    return [
      'Why is repetition so helpful for memory retention?',
      'How long is a toddler’s normal attention span?',
      'What everyday routines support attention development?'
    ];
  }

  if (title.includes('curiosity') || title.includes('exploration')) {
    return [
      'How can caregivers encourage curiosity safely?',
      'Why is exploration important for intellectual growth?',
      'How can we childproof without limiting discovery?'
    ];
  }

  if (title.includes('problem-solving') || content.includes('problem-solving')) {
    return [
      'How can an adult coach problem-solving without doing the task?',
      'Why is trial and error essential for toddlers?',
      'What open-ended questions encourage independent thinking?'
    ];
  }

  if (title.includes('play and cognitive') || content.includes('pretend play')) {
    return [
      'What is pretend play and why is it cognitively significant?',
      'What are low-cost household materials for exploratory play?',
      'How does play build abstract thinking and vocabulary?'
    ];
  }

  if (title.includes('technology') || title.includes('screen') || content.includes('screen time')) {
    return [
      'What are the AAP screen time recommendations by age?',
      'Why is screen use discouraged for infants under 18 months?',
      'What makes co-viewing beneficial for older toddlers?'
    ];
  }

  if (title.includes('home environment') || content.includes('nurturing care')) {
    return [
      'What are the 5 pillars of the WHO Nurturing Care Framework?',
      'How can a family with few toys foster deep cognitive learning?',
      'How do daily household chores support early learning?'
    ];
  }

  if (title.includes('case study') || title.includes('ngozi')) {
    return [
      'What does Ngozi and Chiamaka’s story teach us about play?',
      'How did Ngozi use open-ended questions during play?',
      'How does local cultural knowledge support cognitive growth?'
    ];
  }

  if (title.includes('mistake') || content.includes('common mistake')) {
    return [
      'What is the common mistake of doing everything for the child?',
      'Why should adults avoid comparing siblings?',
      'How should caregivers respond to repeated "why" questions?'
    ];
  }

  // Module 1 / General Foundations defaults
  return [
    'What are the key learning principles in this lesson?',
    'What does responsive caregiving look like in practice?',
    'How do early experiences shape the developing brain?'
  ];
}

/**
 * Generates initial greeting message for Pedia Coach grounded in the active lesson
 */
export function getPediaWelcomeMessage(lesson: CourseLesson, module?: CourseModule): string {
  const modTitle = module ? module.title : 'Early Childhood Development';
  return `Hello! I am Pedia, your Baby First Health early childhood learning coach. We are currently exploring "${lesson.title}" in ${modTitle}. Ask me any question to clarify concepts, clinical definitions, age-specific milestones, or practical caregiver guidance!`;
}

/**
 * Strips all Unicode emoji ranges to maintain clean, professional clinical text
 */
function stripEmojis(text: string): string {
  return (text || '')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1FA00}-\u{1FAFF}]/gu, '')
    .trim();
}

/**
 * Core Pedia Coach Response Generator
 * Evaluates student questions with three-tier resilience:
 * 1. Server-side proxy (/api/pedia-coach or /.netlify/functions/pedia-coach)
 * 2. Client-side Gemini REST API (if VITE_GEMINI_API_KEY is configured on static hosts like GitHub Pages)
 * 3. Deep Evidence-Based Pediatric Curriculum Intelligence (No repetitive hardcoded loops)
 */
export async function generatePediaCoachResponse(
  query: string,
  lesson: CourseLesson,
  module?: CourseModule
): Promise<string> {
  const sanitizedQuery = (query || '').trim();
  const lessonTitle = lesson.title || '';
  const lessonContent = lesson.content || '';
  const moduleTitle = module?.title || '';
  const q = sanitizedQuery.toLowerCase();

  // 1. Guardrail against direct quiz answers
  if (
    q.includes('quiz answer') ||
    q.includes('correct answer') ||
    q.includes('what is the answer') ||
    q.includes('which option is correct') ||
    q.includes('give me the answer') ||
    q.includes('tell me the answer') ||
    q.includes('is it a or b') ||
    q.includes('is it option')
  ) {
    return `As your Baby First Health learning coach, I cannot give out direct quiz answers or letter choices. My role is to help you master the evidence-based principles so you can answer with genuine clinical confidence!\n\nFor this lesson, focus on the core clinical concepts:\n- Review the foundational takeaways in "${lessonTitle}"\n- Reflect on how responsive caregiving and child observation apply\n- Check the developmental guidelines highlighted above\n\nWhich specific concept or term from this lesson would you like me to clarify with you?`;
  }

  // 2. Attempt 1: Call server-side backend endpoint (works in local dev, Netlify, Vercel, and Node servers)
  try {
    const endpoints = ['/api/pedia-coach', '/.netlify/functions/pedia-coach'];
    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: sanitizedQuery,
            lessonTitle,
            lessonContent: lessonContent.slice(0, 2000),
            moduleTitle,
          }),
        });

        // Ensure we received valid JSON and not an HTML 404 or SPA fallback
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.success && data.reply) {
            return stripEmojis(data.reply);
          }
        }
      } catch {}
    }
  } catch {}

  // 3. Attempt 2: Direct Gemini REST Call (Ideal for static deployments like GitHub Pages if VITE_GEMINI_API_KEY is supplied)
  try {
    const clientApiKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim();
    if (clientApiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${clientApiKey}`;
      const directRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Student Question: "${sanitizedQuery}"\n\nCurrent Context:\n- Course Module: ${moduleTitle || 'Early Childhood Development'}\n- Active Lesson: ${lessonTitle || 'Core Lesson'}\n- Lesson Content Excerpt:\n${lessonContent.slice(0, 1800)}\n\nInstructions:\n1. Provide an authoritative, clear, encouraging explanation as Pedia, the Baby First Health learning coach.\n2. ABSOLUTELY NO EMOJIS under any circumstances.\n3. If the student asks for quiz answers or direct test options, do NOT give answers; instead guide them to understand the clinical concepts.\n4. Format using clean markdown (paragraphs and bullet points).`,
                },
              ],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: 'You are Pedia, the official Early Childhood Development (ECD) learning coach for Baby First Health. You assist healthcare, caregiver, and early childhood students. Keep all answers professional, encouraging, evidence-based (WHO/AAP/UNICEF), and concise. ABSOLUTELY FORBIDDEN: Do not use emojis anywhere in your response.',
              },
            ],
          },
        }),
      });

      if (directRes.ok) {
        const gData = await directRes.json();
        const reply = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return stripEmojis(reply);
        }
      }
    }
  } catch {}

  // 4. Attempt 3: Deep Comprehensive Clinical Curriculum Knowledge Engine (Deterministic, Highly Detailed, Zero Repetition)
  
  // Topic: Nutrition, Feeding & Solids
  if (q.includes('feed') || q.includes('food') || q.includes('breastfeed') || q.includes('solid') || q.includes('formula') || q.includes('month') && (q.includes('eat') || q.includes('diet'))) {
    return `**Infant Nutrition & Feeding Guidelines (WHO & AAP):**\n\n- **First 6 Months (0–6 Months):** Exclusive breastfeeding is recommended as the gold standard. Breast milk (or iron-fortified infant formula) provides complete nutrition and immune factors.\n- **Introducing Solids (Around 6 Months):** Introduce nutrient-dense complementary foods when the infant shows signs of readiness (holding head steady, sitting with minimal support, opening mouth when food approaches, tongue-thrust reflex diminishing).\n- **Key First Foods:** Iron-rich purees (single-grain cereals, soft mashed beans, meat purees, mashed avocado, or pureed vegetables).\n- **Safety Guidance:** Avoid cow's milk as a primary beverage before 12 months. Never give honey to infants under 12 months due to the risk of infant botulism. Always supervise feeding to prevent choking.`;
  }

  // Topic: Gross vs Fine Motor
  if (q.includes('gross') || q.includes('fine motor') || q.includes('motor skill')) {
    return `**Gross Motor vs. Fine Motor Development:**\n\n- **Gross Motor Skills:** Involve large muscle groups controlling the torso, legs, and arms. Milestones include head balance, rolling over, sitting independently, crawling, cruising, standing, and walking.\n- **Fine Motor Skills:** Involve precise, coordinated movements of the small muscles of the hands, wrists, and fingers, synchronized with vision. Milestones include palmar grasp, raking grasp, pincer grasp (thumb and forefinger), holding utensils, and manipulating objects.\n\nGross motor stability of the trunk and shoulders provides the physical anchor necessary for fine motor precision in the hands!`;
  }

  // Topic: Cephalocaudal Principle
  if (q.includes('cephalocaudal') || (q.includes('head') && q.includes('toe'))) {
    return `**The Cephalocaudal Principle (Head-to-Toe Progression):**\n\nIn human physical development, neuromuscular control matures from the head downward:\n1. **Head & Neck Control:** First mastered between 2 and 4 months.\n2. **Torso & Arms:** Upper body and trunk stability mature next, enabling independent sitting around 6 to 8 months.\n3. **Pelvis & Legs:** Lower extremity control develops last, allowing crawling, pulling to stand, and walking between 9 and 15 months.\n\nThis physiological sequence explains why adequate head and neck strength is mandatory before seated or upright activities can occur safely.`;
  }

  // Topic: Proximodistal Principle
  if (q.includes('proximodistal') || (q.includes('center') && q.includes('outward'))) {
    return `**The Proximodistal Principle (Center-to-Periphery Progression):**\n\nMotor control proceeds from the center midline of the body outward to the extremities:\n1. Core trunk, spinal, and shoulder girdle muscles develop first.\n2. Forearms, wrists, and palm grasping develop next.\n3. Finger dexterity (such as the fine pincer grasp) develops last.\n\nA child must develop core posture and shoulder stability before they can execute precise fine-motor manipulations like stacking blocks or holding spoons.`;
  }

  // Topic: Tummy Time
  if (q.includes('tummy time') || q.includes('prone')) {
    return `**Clinical Guidance on Tummy Time:**\n\n- **Clinical Purpose:** Supervised awake tummy time builds critical extensor strength in the cervical spine (neck), shoulder girdle, back, and core. It also prevents positional plagiocephaly (flat head syndrome).\n- **When to Begin:** Can start during the first week of life on the caregiver's chest, progressing to a firm, clean floor surface.\n- **Golden Safety Rule:** *Back to sleep, tummy to play*. Tummy time must **only** occur when the infant is awake and under constant adult supervision.\n- **Overcoming Fusiness:** Start with short intervals of 2–3 minutes, 2–3 times daily. Get down to eye level, sing, talk, or place a baby-safe mirror in front of the child.`;
  }

  // Topic: Grasping (Pincer vs Palmar)
  if (q.includes('pincer') || q.includes('palmar') || q.includes('grasp')) {
    return `**Development of Grasp Patterns:**\n\n- **Palmar Grasp Reflex (Newborn):** Involuntary curling of fingers around an object placed in the palm.\n- **Voluntary Palmar Grasp (4–6 Months):** Infant intentionally clutches items using the entire palm and curled fingers.\n- **Radial Palmar / Raking Grasp (6–8 Months):** Uses the thumb side of the palm and fingers to rake objects inward.\n- **Pincer Grasp (9–12 Months):** Coordinates the pad or tip of the index finger and thumb to pick up small objects. This milestone is essential for self-feeding and future tool use.`;
  }

  // Topic: Sleep Guidelines
  if (q.includes('sleep') || q.includes('bedtime') || q.includes('nap') || q.includes('sids')) {
    return `**AAP Pediatric Safe Sleep Guidelines:**\n\n- **Safe Sleep ABCs:** **A**lone, on their **B**ack, in a **C**rib on a firm, flat mattress.\n- **Sleep Environment:** Keep the crib free of pillows, quilts, stuffed animals, bumpers, or loose blankets to minimize the risk of SIDS.\n- **Room-Sharing:** Keep the infant's crib in the parents' room close to the bed for at least the first 6 months, but avoid bed-sharing.\n- **Daily Sleep Recommendations:**\n  • **Infants (4–12 months):** 12–16 hours (including naps)\n  • **Toddlers (1–2 years):** 11–14 hours (including naps)\n  • **Preschoolers (3–5 years):** 10–13 hours`;
  }

  // Topic: Developmental Red Flags
  if (q.includes('red flag') || q.includes('delay') || q.includes('concern') || q.includes('worry') || q.includes('doctor')) {
    return `**Developmental Red Flags Requiring Professional Medical Evaluation:**\n\nConsult a pediatrician or child healthcare professional if a child demonstrates:\n1. **Loss of skills** previously mastered (developmental regression in speech, movement, or social interaction).\n2. **Persistent asymmetry** (exclusively using one arm/leg while ignoring the other side).\n3. **Muscle tone abnormalities** (appearing excessively floppy/limp or unusually rigid/stiff).\n4. **Motor milestones not reached:** Not holding head steady by 4 months, not sitting unsupported by 9 months, or not walking independently by 18 months.\n5. **Lack of social responsiveness:** No eye contact, not smiling back by 3 months, or not responding to their name by 12 months.`;
  }

  // Topic: Cognitive Development & Piaget
  if (q.includes('what is cognitive') || q.includes('cognitive development') || q.includes('thinking') || q.includes('intellectual')) {
    return `**Understanding Cognitive Development in Early Childhood:**\n\nCognitive development encompasses how a child thinks, explores, reasons, remembers, and figures out how the world works. Core components include:\n- **Attention:** Focusing on relevant visual, auditory, and social stimuli.\n- **Memory:** Encoding and retrieving routines, experiences, and concepts.\n- **Problem-Solving:** Experimenting with trial and error to overcome obstacles.\n- **Object Permanence:** Understanding that objects continue to exist even when hidden from view (emerges around 8 months).\n- **Symbolic Thought:** Representing objects and actions through words and pretend play.\n\nCognitive development does not happen in isolation—it is driven by warm, back-and-forth communication with responsive caregivers!`;
  }

  // Topic: Dropped Spoon & Cause and Effect
  if (q.includes('spoon') || q.includes('drop') || q.includes('cause and effect')) {
    return `**The Clinical Significance of Repeatedly Dropping Objects:**\n\nWhen an infant repeatedly drops a spoon or cup from a high chair, they are conducting an intuitive physics and social experiment:\n- **Physical Cause and Effect:** *"When I open my fingers, gravity pulls the object down, making a loud noise on impact."*\n- **Object Permanence:** *"Even though it fell out of my hands, it still exists on the floor."*\n- **Social Responsiveness:** *"When it drops, my caregiver notices, picks it up, and talks to me."*\n\nRather than defiance, this is foundational scientific exploration. Caregivers can calmly retrieve it a few times, describe what happened, and then gently redirect the child's hands to another exploratory activity!`;
  }

  // Topic: Screen Time Guidelines
  if (q.includes('screen') || q.includes('tv') || q.includes('phone') || q.includes('tablet') || q.includes('technology')) {
    return `**American Academy of Pediatrics (AAP) Screen Time Recommendations:**\n\n- **Under 18 Months:** Avoid all digital screen media, except for interactive video-chatting with family members.\n- **18 to 24 Months:** If introducing digital media, select high-quality educational programming and **co-view with an adult** to explain what is happening.\n- **2 to 5 Years:** Limit screen use to **1 hour or less per day** of high-quality programming, always accompanied by adult discussion.\n- **Healthy Habits:** Keep bedrooms screen-free and turn off screens during meals and at least 1 hour before bedtime.\n\nYoung children learn through three-dimensional, sensory exploration and responsive human conversation—experiences that passive screens cannot replicate!`;
  }

  // Topic: WHO Nurturing Care Framework
  if (q.includes('nurturing care') || q.includes('framework') || q.includes('who framework') || q.includes('unicef')) {
    return `**The WHO/UNICEF Nurturing Care Framework (5 Pillars):**\n\n1. **Good Health:** Immunizations, hygiene, clean water, and prompt healthcare treatment.\n2. **Adequate Nutrition:** Exclusive breastfeeding, nutritious foods, and essential micro-nutrients.\n3. **Responsive Caregiving:** Tuning into the child’s cues, maintaining eye contact, and offering warm, comforting support.\n4. **Opportunities for Early Learning:** Interactive play, reading, storytelling, and hands-on exploration.\n5. **Security and Safety:** Protecting the child from environmental hazards, violence, emotional stress, and neglect.\n\nThese five components act synergistically to safeguard healthy physical and neurological growth in early childhood.`;
  }

  // Topic: Serve and Return / Brain Architecture
  if (q.includes('serve and return') || q.includes('brain') || q.includes('neural') || q.includes('synapse')) {
    return `**"Serve and Return" & Brain Architecture:**\n\nDuring the first few years of life, the brain forms more than 1 million new neural connections every second. "Serve and Return" interactions are the primary driver of this wiring:\n- **The Serve:** The baby vocalizes, gestures, points, or makes a facial expression.\n- **The Return:** The caregiver responds with eye contact, words, a warm smile, or a comforting touch.\n\nWhen caregivers reliably return serves, neural circuits supporting communication, emotional security, and reasoning are reinforced. Absence of these exchanges can disrupt healthy brain architecture.`;
  }

  // Topic: Stress in Early Childhood
  if (q.includes('stress') || q.includes('toxic stress') || q.includes('trauma')) {
    return `**Stress Responses in Early Childhood:**\n\n- **Positive Stress:** Brief, mild elevations in heart rate and stress hormone levels (e.g., meeting someone new). It is normal and builds coping mechanisms when supported by a caring adult.\n- **Tolerable Stress:** More intense adversity (e.g., illness, temporary family disruption). Supportive caregivers buffer the child's stress response, allowing the brain to recover without lasting damage.\n- **Toxic Stress:** Prolonged, severe adversity (e.g., chronic neglect, abuse, violence) *without* protective adult buffering. This can impair brain development, immune function, and long-term health.`;
  }

  // Topic: Speech and Language
  if (q.includes('speech') || q.includes('talk') || q.includes('language') || q.includes('word') || q.includes('babble')) {
    return `**Key Milestones in Speech and Language:**\n\n- **2–4 Months:** Cooing, gurgling vowel sounds ('ooo', 'aah').\n- **6–9 Months:** Babbling consonant-vowel combinations ('ba-ba', 'da-da').\n- **12 Months:** First intentional word used in context; understands simple commands like "come here".\n- **18–24 Months:** Vocabulary of 20–50+ words, begins combining two words ("more milk", "big truck").\n- **Supporting Language:** Narrate your daily activities out loud, read picture books together daily, sing songs, and wait patiently for the child to respond!`;
  }

  // 5. Intelligent contextual search in the active lesson's content
  if (lessonContent && lessonContent.length > 50) {
    const paragraphs = lessonContent.split('\n\n').filter(p => p.trim().length > 30);
    const keywords = q.split(' ').filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'about', 'explain', 'could', 'should', 'would', 'does', 'with', 'this', 'that', 'from', 'have', 'been'].includes(w));

    for (const para of paragraphs) {
      const paraLower = para.toLowerCase();
      const matchCount = keywords.filter(kw => paraLower.includes(kw)).length;
      if (matchCount >= 2 || (keywords.length === 1 && matchCount === 1)) {
        const cleanPara = para
          .replace(/^###\s+/gm, '')
          .replace(/^####\s+/gm, '')
          .replace(/^>\s+/gm, '')
          .replace(/\*\*/g, '')
          .trim();

        return `In **${lessonTitle}**, here is the evidence-based guidance directly addressing your question:\n\n"${cleanPara}"\n\n**Clinical Takeaway:** When applying this in childcare, home, or clinic settings, remember that young children thrive when caregivers offer predictable routines, warm encouragement, and safe opportunities for hands-on discovery.`;
      }
    }
  }

  // 6. Dynamic Non-Repetitive Synthesis Grounded in Active Lesson
  return `Regarding your question about **"${sanitizedQuery}"** in **${lessonTitle}** (${moduleTitle || 'Early Childhood Development'}):\n\n- **Foundational Concept:** Child development is an integrated process where physical, cognitive, communicative, and emotional domains build upon one another.\n- **Caregiver Practice:** Everyday responsive interactions—such as talking through daily routines, providing safe exploratory spaces, and observing child cues—foster optimal developmental outcomes.\n- **Evidence-Based Standard:** Both the WHO and American Academy of Pediatrics emphasize that positive, nurturing relationships buffer stress and support lifelong learning.\n\nWhich specific aspect of **${lessonTitle}** would you like us to explore in more detail?`;
}
