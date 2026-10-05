import { CourseLesson, CourseModule } from '../types/studentPortal';

/**
 * Pedia AI Early Childhood Learning Coach
 * Grounded in WHO Nurturing Care Framework, AAP Guidelines, and Baby First Health Curriculum
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
 * Core Pedia Coach Response Generator
 * Evaluates student questions against active lesson context and clinical pediatric curriculum
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

  // 1. Guardrail against direct quiz answers
  const q = sanitizedQuery.toLowerCase();
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
    return `As your Baby First Health learning coach, I cannot give out direct quiz answers or letter options. My role is to help you understand the evidence-based principles so you can answer with genuine clinical mastery!\n\nFor this lesson, focus on the core takeaways:\n- Review the foundational concepts in "${lessonTitle}"\n- Reflect on how responsive caregiving and child observation apply\n- Read through the key guidance sections above\n\nWhich specific concept or term from this lesson would you like me to explain further?`;
  }

  // 2. Call real server-side Gemini 3.8 Flash model
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
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.reply) {
            // Strip any accidental emojis to ensure professional vector aesthetic
            return data.reply
              .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1FA00}-\u{1FAFF}]/gu, '')
              .trim();
          }
        }
      } catch {}
    }
  } catch {}

  // 3. High-quality offline / local curriculum fallback if network is interrupted
  if (q.includes('gross') && q.includes('fine')) {
    return `**Gross Motor vs. Fine Motor Skills:**\n\n- **Gross Motor Skills:** Involve large muscle groups of the arms, legs, and torso. Examples include rolling over, sitting upright without support, crawling, standing, walking, and running.\n- **Fine Motor Skills:** Involve precise, coordinated movements of the small muscles in the hands, fingers, and wrists, guided by vision. Examples include the palmar grasp, picking up small objects with a pincer grasp, stacking blocks, holding a spoon, and scribbling with a crayon.\n\nBoth progress together, but gross motor control often provides the stable posture required for precise fine motor tasks!`;
  }

  if (q.includes('cephalocaudal') || (q.includes('head') && q.includes('toe'))) {
    return `**The Cephalocaudal Principle (Head-to-Toe Development):**\n\nMotor development progresses systematically from the head downward:\n1. An infant first gains control of their eye movements, neck, and head.\n2. Next, control extends to the shoulders, upper chest, and torso (enabling sitting).\n3. Finally, control reaches the lower legs and feet (enabling crawling, standing, and walking).\n\nThis is why head and neck control is the critical prerequisite before a baby can sit or stand securely.`;
  }

  if (q.includes('proximodistal') || (q.includes('center') && q.includes('periphery'))) {
    return `**The Proximodistal Principle (Center-Outward Development):**\n\nMotor control develops from the center of the body outward toward the extremities:\n1. Trunk and core stability develop first.\n2. Arm and shoulder control develop next.\n3. Precise wrist and finger control (such as the pincer grasp) develop last.\n\nA child must have solid core and shoulder stability before they can execute precise fine-motor hand movements!`;
  }

  if (q.includes('tummy time')) {
    return `**Tummy Time Clinical Guidance:**\n\n- **Purpose:** Supervised awake tummy time strengthens the neck, back, shoulder, and arm muscles needed for rolling, sitting, and crawling. It also prevents positional plagiocephaly (flat head syndrome).\n- **When to start:** Right from birth on the caregiver's chest, then on a firm, safe blanket on the floor.\n- **Guidance:** Always ensure the baby is **awake and closely supervised**. Remember the pediatric rule: *Back to sleep, tummy to play*.\n- **If the baby fusses:** Keep sessions short (2–3 minutes, several times a day) and get down to eye level, talking, singing, and offering colorful toys.`;
  }

  if (q.includes('pincer') || q.includes('palmar grasp')) {
    return `**Grasp Development:**\n\n- **Palmar Grasp:** In early infancy (around 4–6 months), the baby grasps objects using their whole palm and all fingers closed together.\n- **Pincer Grasp:** Between 9 and 12 months, infants develop the coordinated ability to hold small items between the pad of the thumb and the index finger.\n\nThe pincer grasp is a major milestone for self-feeding (like picking up pieces of soft food) and later tool use!`;
  }

  if (q.includes('safe sleep') || q.includes('sleep hours') || q.includes('sleep')) {
    return `**Sleep Guidelines & Recommendations:**\n\n- **AAP Safe Sleep Guidelines:** Infants should sleep on their backs on a firm, flat, separate surface without soft bedding, pillows, bumpers, or loose blankets to minimize SIDS risk.\n- **Recommended Sleep in 24 Hours:**\n  • **Infants (4–12 months):** 12–16 hours (including naps)\n  • **Toddlers (1–2 years):** 11–14 hours (including naps)\n  • **Preschoolers (3–5 years):** 10–13 hours\n\nAdequate sleep is vital for growth hormone release, physical recovery, brain plasticity, and emotional regulation.`;
  }

  if (q.includes('red flag') || q.includes('concern') || q.includes('delay') || q.includes('seek help')) {
    return `**When to Seek Professional Medical Advice:**\n\nConsult a pediatrician, nurse, or qualified healthcare professional if a child displays:\n1. **Loss of skills** previously mastered (any developmental regression).\n2. **Persistent asymmetry** (favoring one side of the body exclusively while ignoring the other).\n3. **Extreme muscle tone issues** (appearing excessively floppy/limp or unusually rigid/stiff).\n4. Not sitting unsupported by 9 months, or not walking independently by 18 months.\n5. Lack of eye contact, social response, or engagement with caregivers.\n\n*Note:* Milestones represent general ranges. Early assessment provides reassurance and timely support if needed.`;
  }

  // 3. Module 3: Cognitive Development Topics
  if (q.includes('what is cognitive') || q.includes('cognitive development')) {
    return `**What Is Cognitive Development?**\n\nCognitive development refers to the growth of a child's ability to think, reason, understand, remember, and solve problems. It encompasses:\n- **Attention:** Focusing on people, objects, and tasks.\n- **Memory:** Storing and recalling information over time.\n- **Curiosity & Exploration:** Investigating the environment.\n- **Problem-Solving:** Figuring out how things work and trying alternative strategies.\n- **Pretend Play & Imagination:** Using symbols and abstract thought.\n\nCognitive growth thrives through warm, responsive back-and-forth interactions with caring adults!`;
  }

  if (q.includes('spoon') || q.includes('dropping') || q.includes('cause and effect')) {
    return `**Why Babies Repeatedly Drop Objects (Cause & Effect):**\n\nWhen a baby repeatedly drops a spoon or toy from a high chair, they are acting as a "little scientist":\n- *“When I open my hand, gravity pulls the spoon down.”*\n- *“It hits the floor and makes a sharp clattering sound.”*\n- *“An adult picks it up and returns it to me. Will the same thing happen if I do it again?”*\n\nThrough repetition, the infant discovers **cause and effect**, physical properties of matter, and social responsiveness. Caregivers can calmly hand it back or redirect after several tries without scolding!`;
  }

  if (q.includes('screen') || q.includes('technology') || q.includes('television') || q.includes('tablet')) {
    return `**AAP Screen Time Guidelines for Young Children:**\n\n- **Under 18 Months:** Avoid screen media entirely, except for interactive video-chatting with family.\n- **18 to 24 Months:** If introducing digital media, choose high-quality programming and **co-view with the child** to help them understand what they are seeing.\n- **2 to 5 Years:** Limit screen use to **1 hour or less per day** of high-quality educational content, accompanied by an adult.\n- **Healthy Screen Habits:** Avoid screens during meals and for at least 1 hour before bedtime. Keep bedrooms screen-free.\n\nYoung children learn through real-world, hands-on exploration and interpersonal communication, which passive screens cannot replace!`;
  }

  if (q.includes('nurturing care') || q.includes('framework') || q.includes('who framework')) {
    return `**The WHO/UNICEF Nurturing Care Framework:**\n\nThis evidence-based global framework identifies 5 interdependent components that children need to reach their developmental potential:\n1. **Good Health:** Preventing illness, immunization, prompt treatment, and hygiene.\n2. **Adequate Nutrition:** Exclusive breastfeeding, nutritious foods, and micro-nutrients.\n3. **Responsive Caregiving:** Tuning into the child’s cues, talking, comforting, and responding warmly.\n4. **Opportunities for Early Learning:** Play, songs, storytelling, exploration, and problem-solving.\n5. **Security and Safety:** Protecting the child from danger, violence, neglect, and environmental hazards.`;
  }

  if (q.includes('pretend play') || q.includes('symbolic play') || q.includes('imagination')) {
    return `**The Power of Pretend (Symbolic) Play:**\n\nPretend play emerges around 18–24 months (e.g., pretending a wooden block is a telephone, feeding a doll, or driving a box as a bus):\n- **Cognitive Significance:** Demonstrates symbolic thinking—understanding that one object or action can represent something else.\n- **Skills Developed:** Language, perspective-taking (theory of mind), abstract reasoning, emotional processing, and planning.\n- **Caregiver Role:** Join in the play, ask open questions ("Who are you calling?"), and supply simple props like cardboard boxes, cloths, and bowls.`;
  }

  if (q.includes('repetition') || q.includes('repeat')) {
    return `**Why Repetition Is Crucial for Young Children:**\n\nYoung children thrive on repetition—whether reading the same picture book ten times, singing the same song, or building and knocking down blocks:\n- Each repeated experience strengthens the specific neural synapses in the brain.\n- It builds memory consolidation, predictability, and emotional security.\n- What seems repetitive to adults is actively mastering the world for a young child!`;
  }

  if (q.includes('why') && (q.includes('question') || q.includes('three-year-old') || q.includes('child asks'))) {
    return `**Responding to a Child's "Why?" Questions:**\n\nAround age 3, children enter a rapid conceptual growth phase and ask frequent "why" questions:\n- **Why they ask:** They are genuinely curious, seeking explanations, and practicing conversation.\n- **Best response:** Answer simply and honestly without frustration. Use it as a collaborative learning moment: *"That is a great question! What do you think happens when the sun goes down?"*\n- Encouraging their questions builds curiosity, language mastery, and confidence in thinking.`;
  }

  if (q.includes('ngozi') || q.includes('chiamaka') || q.includes('enugu')) {
    return `**Ngozi and Chiamaka Case Study Insights:**\n\nIn this Nigerian case study, 3-year-old Chiamaka explored seeds, leaves, and clay pots with her aunt Ngozi:\n- **Key Takeaways:** Ngozi did not need expensive commercial toys. She used safe, familiar household and natural materials.\n- **Coaching Style:** Ngozi asked open-ended questions (*"What happens if we sort the leaves by size?"*), allowed Chiamaka time to try, and celebrated her curiosity.\n- This demonstrates that rich cognitive learning happens in any caring home environment through responsive dialogue and everyday materials.`;
  }

  if (q.includes('mistake') || q.includes('pitfall') || q.includes('over-helping')) {
    return `**Common Adult Pitfalls to Avoid:**\n\n1. **Doing everything for the child:** Rushing to solve the puzzle or tie shoes robs the child of problem-solving practice. Instead: Wait, offer gentle hints, and let them try.\n2. **Discouraging questions:** Calling questions annoying dampens curiosity. Instead: Answer warmly in simple terms.\n3. **Comparing siblings or peers:** Every child has an individual developmental timeline. Focus on the child's own progress.\n4. **Over-reliance on screens:** Using tablets to pacify children deprives them of active physical and communicative play.\n5. **Assuming expensive toys are required:** Safe everyday objects (cups, cloths, stones, leaves) offer equal or superior cognitive stimulation when paired with adult interaction.`;
  }

  // 4. Module 1: Foundations of Early Childhood Topics
  if (q.includes('serve and return') || q.includes('serve') || q.includes('return')) {
    return `**"Serve and Return" Interactions:**\n\nServe and return describes warm, reciprocal exchanges between a child and an adult:\n- The child "serves" by babbling, pointing, smiling, or making a sound.\n- The adult "returns" by making eye contact, smiling back, naming what the child pointed to, or answering the vocalization.\n\nNeuroscience shows that serve-and-return interactions literally construct the neural architecture of the brain, creating pathways for language, emotional security, and reasoning!`;
  }

  if (q.includes('toxic stress') || q.includes('stress')) {
    return `**Stress in Early Childhood Development:**\n\n- **Positive Stress:** Brief, mild stress (like meeting someone new or getting an immunization) with a supportive adult helps the child develop coping mechanisms.\n- **Tolerable Stress:** More serious adversity (loss of a relative, natural disruption) that is buffered by loving, stable caregivers, allowing the brain to recover.\n- **Toxic Stress:** Prolonged, severe adversity (chronic neglect, abuse, severe household dysfunction) *without* protective adult buffering. This can disrupt developing brain architecture and long-term health.`;
  }

  if (q.includes('growth') && q.includes('development')) {
    return `**Growth vs. Development:**\n\n- **Growth:** Refers to measurable physical increases in body size (weight in kilograms, height in centimeters, head circumference).\n- **Development:** Refers to the progressive mastery of complex skills and functional capacities across motor, cognitive, language, and socio-emotional domains.\n\nA child might be growing well physically while showing delays in developmental milestones, or vice versa, which is why holistic monitoring is essential!`;
  }

  // 5. Intelligent contextual search in the active lesson's content
  if (lessonContent && lessonContent.length > 50) {
    const paragraphs = lessonContent.split('\n\n').filter(p => p.trim().length > 30);
    const keywords = q.split(' ').filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'about', 'explain', 'could', 'should', 'would', 'does'].includes(w));

    for (const para of paragraphs) {
      const paraLower = para.toLowerCase();
      const matchCount = keywords.filter(kw => paraLower.includes(kw)).length;
      if (matchCount >= 2 || (keywords.length === 1 && matchCount === 1)) {
        // Clean out markdown formatting
        const cleanPara = para
          .replace(/^###\s+/gm, '')
          .replace(/^####\s+/gm, '')
          .replace(/^>\s+/gm, '')
          .replace(/\*\*/g, '')
          .trim();

        return `In **${lessonTitle}**, this clinical guidance applies directly to your question:\n\n"${cleanPara}"\n\n**Coaching Takeaway:** When applying this with infants or young children, remember that responsive, patient care and safe environments are the bedrock of healthy early development. Would you like to explore how this applies in everyday home or clinical settings?`;
      }
    }
  }

  // 6. Supportive fallback grounded in active lesson
  return `Regarding **"${lessonTitle}"** in **${moduleTitle || 'Early Childhood Development'}**:\n\nThe core evidence-based principle here is that young children learn best through warm, responsive caregiving, predictable routines, safe exploration, and rich communicative interaction.\n\nCould you specify which aspect of "${lessonTitle}" you'd like us to focus on? For example:\n- Age-specific expectations or milestones\n- Practical daily activities caregivers can do\n- How to recognize when a child may need extra support`;
}
