import { ProgramData, CourseModule, PortalSettings } from '../types/studentPortal';
import { MODULE_2_PHYSICAL_DEVELOPMENT } from './module2Data';
import { MODULE_3_COGNITIVE_DEVELOPMENT } from './module3Data';

export const DEFAULT_PROGRAM: ProgramData = {
  id: 'ecd-cert',
  code: 'ECD',
  title: 'Early Childhood Development Certificate',
  subTitle: 'Infant Milestones, Clinical Nutrition & Emergency Triage',
  hours: '5hours • Self-Paced',
  bannerUrl: '/banners/ecd-banner.jpg',
  description:
    'Comprehensive evidence-based clinical and developmental training program covering early childhood neuro-development, infant milestones, serve-and-return communication, and supportive caregiving for parents and educators.',
  priceXAF: 30000,
  priceNGN: 75000,
  priceUSD: 50,
  passingScore: 70,
  maxQuizAttempts: 3,
  isActive: true,
};

export const DEFAULT_MODULES: CourseModule[] = [
  {
    id: 'ecd-m1',
    programId: 'ecd-cert',
    title: '1. Understanding Early Childhood Development',
    order: 1,
    description:
      'Explore core early childhood developmental principles (ages 0-5), the science of rapid brain development, major developmental domains, normal variation, and the caregiver role.',
    glossary: [
      {
        term: 'Early Childhood Development (ECD)',
        definition: 'How children grow and learn in body, mind, feelings, and relationships from birth to about age 5.',
      },
      {
        term: 'Developmental milestone',
        definition:
          'A skill or ability that many children develop around a certain age (for example, sitting, walking, first words). Used as a guide, not a strict deadline.',
      },
      {
        term: 'Serve and return',
        definition:
          'Warm, back-and-forth interactions between a child and a caring adult (smiling, talking, responding) that help build healthy brain connections.',
      },
      {
        term: 'Cognitive development',
        definition: 'How a child learns, thinks, remembers, solves problems, and understands the world.',
      },
      {
        term: 'Social and emotional development',
        definition: 'How a child understands feelings, relates to others, develops confidence, and learns to manage emotions.',
      },
    ],
    references: [
      {
        title: "World Health Organization (WHO) & UNICEF. (2023). New report calls for greater attention to children's vital first years.",
        url: 'https://www.who.int/news/item/29-06-2023-new-report-calls-for-greater-attention-to-children-s-vital-first-years',
      },
      {
        title: 'Harvard Center on the Developing Child. Key Concepts in Early Childhood Development.',
        url: 'https://developingchild.harvard.edu/key-concepts/',
      },
      {
        title: 'National Scientific Council on the Developing Child. (2007). The Science of Early Childhood Development.',
        url: 'https://developingchild.harvard.edu/wp-content/uploads/2024/10/Science_Early_Childhood_Development.pdf',
      },
      {
        title: 'UNICEF. (2024). Early Childhood Development – UNICEF Vision for Every Child.',
        url: 'https://www.unicef.org/media/145336/file/Early_Childhood_Development_-_UNICEF_Vision_for_Every_Child.pdf',
      },
    ],
    lessons: [
      {
        id: 'ecd-m1-l01',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '1. Welcome to the Module',
        order: 1,
        hasVideo: false,
        content: `Welcome! This module introduces you to Early Childhood Development (ECD). By the end, you will understand what child development really means and what to pay attention to when caring for a child aged 0–5.

You do not need any special medical training—just a willingness to learn and care for children well.

### Professional Guidance Note
This course provides educational knowledge about Early Childhood Development. It does not replace professional medical assessment or diagnosis. Developmental milestones are guides and should be interpreted in context. If you have concerns about a child's development, please discuss them with an appropriately qualified healthcare or child-development professional (for example, a doctor, nurse, or early childhood specialist).`,
        coachNotes: 'Welcome the student warmly and reassure them that no prior clinical knowledge is required.',
        quiz: {
          id: 'quiz-m1-l01',
          lessonId: 'ecd-m1-l01',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q1-1',
              prompt: 'What age range does this Early Childhood Development course focus on?',
              options: [
                'Ages 12 to 18 years',
                'Birth up to about 5 years (before primary school)',
                'Only the first 2 weeks of life',
                'Adulthood',
              ],
              correctAnswerIndex: 1,
              explanation: 'Early childhood encompasses the foundational period from birth up to approximately 5 years of age.',
            },
            {
              id: 'q1-2',
              prompt: 'How should developmental milestones be interpreted?',
              options: [
                'As strict legal deadlines that every child must meet on the exact day',
                'As educational guides that help caregivers know what to expect in context',
                'As replacements for hospital care',
                'As signs that children should never play',
              ],
              correctAnswerIndex: 1,
              explanation: 'Milestones are helpful guides for what skills typically emerge, not rigid deadlines.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l02',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '2. What Is Early Childhood Development?',
        order: 2,
        hasVideo: false,
        content: `### Simple Meaning

- **Early childhood** = the time from birth up to about 5 years (before primary school).
- **Development** = the process of gaining new abilities and skills over time.
- **Early Childhood Development (ECD)** = how a young child grows and learns in body, mind, feelings, and relationships during the first years of life.

### Growth and Development: What's the Difference?

| Growth | Development |
| --- | --- |
| Changes in physical size (height, weight, head size). | Gaining new abilities and skills (sitting, talking, sharing, solving simple problems). |
| Example: A baby's weight increases from 3 kg to 7 kg. | Example: A toddler learns to stack blocks and say new words. |

**Real-life example:** A 9-month-old baby in Yaoundé learns to sit without support (development) while also getting taller and heavier (growth). Both happen together, but they are not the same thing.`,
        coachNotes: 'Clarify the distinction between physical growth (grams/centimeters) and developmental skills (sitting, talking).',
        quiz: {
          id: 'quiz-m1-l02',
          lessonId: 'ecd-m1-l02',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q2-1',
              prompt: 'What does "Early Childhood Development" (ECD) mean?',
              options: [
                'Only how tall a child grows',
                'How a child gains new abilities and skills in body, mind, feelings, and relationships from birth to about age 5',
                'Only how much a child eats',
                'Only how well a child does in school at age 10',
              ],
              correctAnswerIndex: 1,
              explanation: 'ECD covers growth and learning in multiple areas during the early years, not just physical size or school performance.',
            },
            {
              id: 'q2-2',
              prompt: 'Which of these is an example of "development" (not just growth)?',
              options: [
                "A child's weight increases from 4 kg to 7 kg",
                "A child's height increases by 5 cm",
                'A child learns to stack blocks and say new words',
                "A child's head circumference gets larger",
              ],
              correctAnswerIndex: 2,
              explanation: 'Development refers to gaining new functional skills and abilities, such as stacking blocks or speaking.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l03',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '3. Why the First Five Years Matter',
        order: 3,
        hasVideo: false,
        content: `The first five years are a special time because:

- **Brain development is fastest.** In the first 3 years, a child's brain forms more than 1 million new connections every second. These connections are the foundation for learning, behavior, and health later in life.
- **Relationships shape the brain.** Warm, responsive interactions (smiling, talking, holding, playing) between a child and caring adults build healthy brain circuits. Scientists call this "serve and return."
- **Early experiences affect learning and emotions.** Children who are talked to, read to, and played with learn language faster, manage feelings better, and are more ready for school.
- **Health and nutrition matter.** Good food, clean water, sleep, and protection from illness help the body and brain grow well. Malnutrition and frequent sickness can slow development.
- **Safe environments protect development.** Violence, neglect, and constant stress can harm a child's developing brain and body. Safe, loving homes and communities help children thrive.

**Important:** The early years are very important, but they do not "decide everything" forever. Children can still learn and grow later, especially with support. The goal is to give the best start possible.`,
        coachNotes: 'Highlight that 1 million neural connections form every second in the first 3 years and explain serve-and-return.',
        quiz: {
          id: 'quiz-m1-l03',
          lessonId: 'ecd-m1-l03',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q3-1',
              prompt: 'Why are the first five years especially important in human development?',
              options: [
                'Because children stop learning entirely after age 5',
                'Because the brain develops rapidly and early experiences shape lifelong health and learning',
                'Because children only consume nutrition during the first five years',
                'Because children do not require affection after age 5',
              ],
              correctAnswerIndex: 1,
              explanation: 'Rapid neural development in the first five years creates the fundamental architecture for lifelong cognitive and emotional capacity.',
            },
            {
              id: 'q3-2',
              prompt: 'In the first 3 years, approximately how many new neural connections form in a child\'s brain every second?',
              options: [
                'About 10 connections',
                'Roughly 500 connections',
                'More than 1 million new connections every second',
                'Zero connections until primary school',
              ],
              correctAnswerIndex: 2,
              explanation: 'Neuroscience demonstrates that over 1 million new neural connections form every second during early life.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l04',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '4. How Children Develop: Major Areas',
        order: 4,
        hasVideo: false,
        content: `Children develop in several connected areas. Here are the main ones, with simple examples:

### Physical Development
- **What it is:** How the body grows and how movement skills develop.
- **Example:** A baby learns to roll over, sit, crawl, stand, and walk. A 3-year-old learns to run, climb, and use a spoon.

### Cognitive Development
- **What it is:** How the child learns, thinks, remembers, solves problems, and understands the world.
- **Example:** A toddler figures out how to fit shapes into a puzzle or finds a hidden toy.

### Language and Communication
- **What it is:** How the child understands and uses sounds, gestures, words, and communication.
- **Example:** A 1-year-old points and says "mama." A 3-year-old tells a short story about what happened at the market.

### Social and Emotional Development
- **What it is:** How the child understands feelings, relates to others, develops confidence, and learns to manage emotions.
- **Example:** A 2-year-old learns to wait for a turn with a toy or comforts a crying friend.

**Note:** These areas work together. For example, playing with blocks (physical) helps a child learn about size and shape (cognitive) and talk about what they are building (language).`,
        coachNotes: 'Provide examples of how physical, cognitive, language, and social-emotional areas overlap in daily play.',
        quiz: {
          id: 'quiz-m1-l04',
          lessonId: 'ecd-m1-l04',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q4-1',
              prompt: 'A toddler figures out how to fit circular and square blocks into a shape sorter. Which developmental area is this primarily demonstrating?',
              options: [
                'Cognitive development',
                'Reflexive digestion',
                'Cardiovascular growth',
                'Passive growth',
              ],
              correctAnswerIndex: 0,
              explanation: 'Problem-solving, spatial reasoning, and memory are core components of cognitive development.',
            },
            {
              id: 'q4-2',
              prompt: 'Which developmental domain involves understanding feelings, developing confidence, and comforting others?',
              options: [
                'Physical development',
                'Social and emotional development',
                'Linear height growth',
                'Primitive reflex inhibition',
              ],
              correctAnswerIndex: 1,
              explanation: 'Social and emotional development governs emotional regulation, empathy, and interpersonal connections.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l05',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '5. Children Do Not All Develop at the Same Speed',
        order: 5,
        hasVideo: false,
        content: `### Key Points

- **Individual differences are normal.** One child may walk at 10 months, another at 14 months. One may talk early, another may be more active physically.
- **Milestones are guides, not deadlines.** Developmental milestones are skills many children reach around certain ages. They help us know what to expect, but every child is unique.
- **Avoid constant comparison.** Comparing one child to another can cause unnecessary worry. Focus on the child's own progress over time.

### When to Seek Professional Advice
Talk to a qualified health or child-development professional if you notice:
- The child is not gaining new skills over several months.
- The child loses skills they once had.
- There are significant delays in multiple areas (for example, not sitting by 9 months, no words by 18 months, not walking by 18 months).
- You have persistent concerns about hearing, vision, movement, or interaction.

**Remember:** Early advice can help. It does not mean something is "wrong"—it means you are being careful and supportive.`,
        coachNotes: 'Reassure caregivers that milestone ranges are broad, but emphasize when to consult a pediatrician.',
        quiz: {
          id: 'quiz-m1-l05',
          lessonId: 'ecd-m1-l05',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q5-1',
              prompt: 'What are "developmental milestones"?',
              options: [
                'Exact deadlines that every single child must meet on the same day',
                'Skills or abilities that many children develop around certain ages, used as guides',
                'Only physical skills like walking',
                'Rules enforced by primary school principals',
              ],
              correctAnswerIndex: 1,
              explanation: 'Milestones represent typical skill emergence windows, serving as guides rather than rigid deadlines.',
            },
            {
              id: 'q5-2',
              prompt: 'When should a caregiver consider seeking professional advice about a child\'s development?',
              options: [
                'When a child is slightly slower than a neighbor child but consistently gaining new abilities',
                'When a child loses skills they once had or shows significant delays in multiple areas',
                'When a child prefers the color blue over yellow',
                'When a child sleeps 15 minutes less on a hot afternoon',
              ],
              correctAnswerIndex: 1,
              explanation: 'Regression (loss of previously mastered skills) or persistent delays across multiple domains warrant professional clinical review.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l06',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '6. What Helps a Child Develop Well?',
        order: 6,
        hasVideo: false,
        content: `Research shows that children thrive when they have:

- **Safe and responsive relationships:** Caring adults who notice, respond, and comfort the child.
- **Talking and communicating:** Singing, talking, reading, and listening to the child every day.
- **Play:** Simple, everyday play with safe objects (spoons, cups, blocks, balls) helps learning.
- **Good nutrition:** Breastfeeding (when possible), timely introduction of varied foods, and regular meals.
- **Adequate sleep:** Regular sleep helps the brain and body grow.
- **Protection from violence and neglect:** Safe, predictable care without fear or harm.
- **A safe environment:** Clean water, hygiene, safe spaces to move and explore.
- **Healthcare:** Regular check-ups, vaccinations, and treatment when sick.
- **Opportunities to learn:** Everyday activities like helping at home, exploring nature, and simple games.
- **Consistent and supportive caregiving:** Routines and calm responses help children feel secure.

You do not need expensive toys. Everyday interactions and a loving environment matter most.`,
        coachNotes: 'Reinforce that safe household objects like spoons and plastic cups with active talking facilitate profound learning.',
        quiz: {
          id: 'quiz-m1-l06',
          lessonId: 'ecd-m1-l06',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q6-1',
              prompt: 'Which of these best describes "serve and return" interactions?',
              options: [
                'A child plays alone in a locked room without adult contact',
                'An adult ignores a child\'s vocalizations and cries',
                'A child reaches out (smile, sound, gesture) and an adult responds warmly, back and forth',
                'An adult turns on an electronic tablet and walks away',
              ],
              correctAnswerIndex: 2,
              explanation: 'Serve and return refers to warm, reciprocal, responsive exchanges between a child and caregiver.',
            },
            {
              id: 'q6-2',
              prompt: 'A caregiver believes expensive commercial toys are required for a young child to develop high intelligence. What does research show?',
              options: [
                'They are correct: children only learn from expensive electronics',
                'Everyday interactions, talking, and simple safe objects (cups, spoons, blocks) support learning more than expensive toys',
                'Children should never engage in play until age 7',
                'Only toys imported from overseas stimulate cognitive pathways',
              ],
              correctAnswerIndex: 1,
              explanation: 'Consistent human interaction, responsive language, and open-ended everyday items are superior to passive electronic gadgets.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l07',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: "7. The Adult's Role",
        order: 7,
        hasVideo: false,
        content: `Children develop within relationships and environments. Adults—parents, caregivers, teachers, health workers, and family members—play a key role.

### Practical Examples of What Adults Can Do Every Day

- **Talk and listen:** When giving a child a toy, name it ("This is a red ball"), ask simple questions ("Can you roll the ball?"), and respond to the child's sounds.
- **Play together:** Sit on the floor, stack cups, sing songs, or play peek-a-boo. Follow the child's lead.
- **Read and tell stories:** Use picture books or tell stories about family, animals, or daily life. Point to pictures and name them.
- **Encourage helping:** Let the child help with small tasks (putting away toys, handing you a spoon). Praise effort ("You are a good helper").
- **Comfort and reassure:** When a child is upset, hold them, speak softly, and help them calm down. This teaches emotional regulation.
- **Create routines:** Regular times for eating, sleeping, and playing help children feel safe and learn what to expect.`,
        coachNotes: 'Give actionable advice on verbalizing actions during chores (e.g., cooking, folding clothes) to expand vocabulary.',
        quiz: {
          id: 'quiz-m1-l07',
          lessonId: 'ecd-m1-l07',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q7-1',
              prompt: 'When giving a toddler a toy, how can an adult best support language acquisition?',
              options: [
                'Maintain strict silence so the child remains quiet',
                'Name the object, ask a simple question, and actively respond to the child\'s verbal attempts',
                'Give the toy with no interaction and walk away immediately',
                'Demand that the child write down the name of the toy',
              ],
              correctAnswerIndex: 1,
              explanation: 'Verbalizing names, engaging in questions, and validating sounds accelerates expressive language.',
            },
            {
              id: 'q7-2',
              prompt: 'How do predictable daily routines (for eating, sleeping, and playing) assist young children?',
              options: [
                'They restrict the child\'s freedom and harm development',
                'They help children feel secure and learn what to anticipate, reducing anxiety',
                'They eliminate the need for healthy nutrition',
                'They are only necessary in hospital settings',
              ],
              correctAnswerIndex: 1,
              explanation: 'Predictability and calm structure build neurological feelings of security and self-regulation.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l08',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '8. A Simple Case Study',
        order: 8,
        hasVideo: false,
        content: `**Situation:** A mother in Cameroon has two children, both around 2 years old. Child A talks a lot and knows many words. Child B walks and runs early but says only a few words. The mother worries because she expects both children to develop in exactly the same way.

### What the case teaches
- **Individual differences:** Children can be stronger in different areas. One may talk earlier; another may move earlier.
- **Developmental areas:** Language and physical skills are different areas. Progress in one does not mean delay in the other.
- **Observation:** The mother should watch each child's progress over time, not just compare them to each other.
- **Avoid unnecessary comparison:** Comparing siblings can create worry. Focus on each child's own growth.
- **When to seek advice:** If Child B shows no new words over many months, does not respond to name, or has other concerns, the mother can talk to a health worker for guidance.

### Questions to think about
- Why is it normal for siblings to develop differently?
- Which developmental areas are strong in Child A and Child B?
- What can the mother do at home to support both children?
- When might it be helpful to speak with a health professional?
- How can the mother avoid unhelpful comparisons?`,
        coachNotes: 'Guide the student through understanding differential developmental paces without premature alarm.',
        quiz: {
          id: 'quiz-m1-l08',
          lessonId: 'ecd-m1-l08',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q8-1',
              prompt: 'A father notices his 18-month-old daughter says only a few words, but walks well and plays actively. What is the best first step?',
              options: [
                'Immediately assume she has a severe permanent medical illness',
                'Compare her unfavorably to older siblings at family gatherings',
                'Observe her progress over the next few months, talk and play with her daily, and seek advice if there is no new progress',
                'Stop talking to her since she speaks few words',
              ],
              correctAnswerIndex: 2,
              explanation: 'Observing progress, providing rich conversational stimulus, and monitoring trajectory is the proper clinical approach.',
            },
            {
              id: 'q8-2',
              prompt: 'Why is it normal for siblings raised in the same home to develop at different rates?',
              options: [
                'Because one child is inherently superior to the other',
                'Because individual differences are natural; one child may develop gross motor skills first while another excels early in verbal expression',
                'Because good parenting only affects the first-born child',
                'Because milestones are identical for all human beings',
              ],
              correctAnswerIndex: 1,
              explanation: 'Every child possesses a unique developmental timeline influenced by individual neurobiology and temperament.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l09',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '9. Common Mistakes Adults Make',
        order: 9,
        hasVideo: false,
        content: `| Mistake | Better Approach |
| --- | --- |
| **Comparing children constantly.** | Focus on each child's own progress over time. Celebrate their unique strengths. |
| **Labeling a child because of one behavior.** | Describe the behavior, not the child ("You are feeling angry" instead of "You are a difficult child"). |
| **Ignoring the child's need for interaction.** | Make time daily for talking, playing, and responding to the child's cues. |
| **Assuming expensive toys are necessary for learning.** | Use everyday objects (cups, spoons, stones, leaves) for play and learning. Interaction matters more than toys. |
| **Believing every child must reach a skill at exactly the same age.** | Understand milestones as guides. Support the child's pace and seek advice only if there are significant or persistent delays. |`,
        coachNotes: 'Highlight why labeling behavior ("You are feeling angry") rather than the child ("You are bad") promotes healthy emotional growth.',
        quiz: {
          id: 'quiz-m1-l09',
          lessonId: 'ecd-m1-l09',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'q9-1',
              prompt: 'When a toddler exhibits an emotional outburst, what is the recommended behavioral guidance?',
              options: [
                'Label the child as "naughty" or "bad" in front of peers',
                'Describe the specific emotion or behavior ("You are feeling frustrated right now") and help them regulate calmly',
                'Ignore them for three consecutive days',
                'Force them to remain in dark isolation',
              ],
              correctAnswerIndex: 1,
              explanation: 'Separating the child\'s identity from temporary emotional states fosters emotional intelligence and self-regulation.',
            },
            {
              id: 'q9-2',
              prompt: 'What common caregiver mistake often creates unnecessary family anxiety?',
              options: [
                'Reading picture books together daily',
                'Constantly comparing a child\'s milestone timing directly against other children',
                'Feeding children nutritious fresh vegetables',
                'Engaging in outdoor physical play',
              ],
              correctAnswerIndex: 1,
              explanation: 'Chronic cross-child comparison breeds unfounded anxiety, as typical milestone windows vary substantially.',
            },
          ],
        },
      },
      {
        id: 'ecd-m1-l10',
        moduleId: 'ecd-m1',
        programId: 'ecd-cert',
        title: '10. Key Takeaways & Knowledge Check',
        order: 10,
        hasVideo: false,
        content: `### Summary of Core Principles

- **Early Childhood Development (ECD)** means how children grow and learn in body, mind, feelings, and relationships from birth to about age 5.
- The **first five years** are especially important because the brain develops rapidly and early experiences shape lifelong health and learning.
- Children develop in **several connected areas:** physical, cognitive, language, and social-emotional.
- Children **do not all develop at exactly the same pace.** Individual differences are normal.
- **Developmental milestones** are useful guides, not strict deadlines for every child.
- Warm, responsive relationships (**"serve and return"**) are essential for healthy brain development.
- Everyday interactions—talking, playing, reading, comforting—support development more than expensive toys.
- Good nutrition, sleep, safety, healthcare, and a clean environment help children grow and learn well.
- Adults should observe each child's progress over time and **avoid constant comparison.**
- If you have persistent concerns about a child's development, speak with a qualified health or child-development professional.

Complete the comprehensive assessment below to demonstrate your mastery of Module 1!`,
        coachNotes: 'Encourage the student on completing all lessons of Module 1 and preparing for the comprehensive check.',
        quiz: {
          id: 'ecd-m1-quiz',
          lessonId: 'ecd-m1-l10',
          programId: 'ecd-cert',
          passingScore: 70,
          questions: [
            {
              id: 'ecd-m1-q01',
              prompt: 'What does "Early Childhood Development" (ECD) mean?',
              options: [
                'Only how tall a child grows',
                'How a child gains new abilities and skills in body, mind, feelings, and relationships from birth to about age 5',
                'Only how much a child eats',
                'Only how well a child does in school at age 10',
              ],
              correctAnswerIndex: 1,
              explanation: 'ECD covers growth and learning in multiple areas during the early years, not just physical size or school performance.',
            },
            {
              id: 'ecd-m1-q02',
              prompt: 'Which of these is an example of "development" (not just growth)?',
              options: [
                "A child's weight increases",
                "A child's height increases",
                'A child learns to stack blocks and say new words',
                "A child's head gets bigger",
              ],
              correctAnswerIndex: 2,
              explanation: 'Development refers to gaining new skills and abilities, such as stacking blocks or using language.',
            },
            {
              id: 'ecd-m1-q03',
              prompt: 'Why are the first five years especially important?',
              options: [
                'Because children stop learning after age 5',
                'Because the brain develops rapidly and early experiences shape lifelong health and learning',
                'Because children only eat food in the first five years',
                'Because children do not need love after age 5',
              ],
              correctAnswerIndex: 1,
              explanation: 'Rapid brain development and early experiences create foundations for later learning, behavior, and health.',
            },
            {
              id: 'ecd-m1-q04',
              prompt: 'What are "developmental milestones"?',
              options: [
                'Exact deadlines that every child must meet',
                'Skills or abilities that many children develop around certain ages, used as guides',
                'Only physical skills like walking',
                'Only language skills like talking',
              ],
              correctAnswerIndex: 1,
              explanation: 'Milestones are typical skills reached around certain ages, but they are guides, not strict rules for every child.',
            },
            {
              id: 'ecd-m1-q05',
              prompt: 'Which of these best describes "serve and return" interactions?',
              options: [
                'A child plays alone without adults',
                'An adult ignores a child\'s cries',
                'A child reaches out (smile, sound, gesture) and an adult responds warmly, back and forth',
                'An adult gives a child a toy and walks away',
              ],
              correctAnswerIndex: 2,
              explanation: '"Serve and return" means responsive, back-and-forth interactions that build healthy brain connections.',
            },
            {
              id: 'ecd-m1-q06',
              prompt: 'When should a caregiver consider seeking professional advice about development?',
              options: [
                'When a child is slightly slower than a sibling but still gaining new skills',
                'When a child loses skills they once had or shows significant delays in multiple areas',
                'When a child prefers one toy over another',
                'When a child sleeps a little less one night',
              ],
              correctAnswerIndex: 1,
              explanation: 'Loss of skills or significant, persistent delays are reasons to talk to a qualified professional.',
            },
            {
              id: 'ecd-m1-q07',
              prompt: 'A father notices his 18-month-old daughter says only a few words, but she walks well and plays actively. What is the best first step?',
              options: [
                'Immediately assume there is a serious problem',
                'Compare her to her older brother at the same age',
                'Observe her progress over the next few months, talk and play with her daily, and seek advice if there is no new progress or other concerns',
                'Stop talking to her because she is not talking much',
              ],
              correctAnswerIndex: 2,
              explanation: 'Individual differences are normal. Observe progress, support with interaction, and seek advice if concerns persist or worsen.',
            },
            {
              id: 'ecd-m1-q08',
              prompt: 'A caregiver believes expensive toys are needed for a child to learn well. What is a better approach?',
              options: [
                'Buy only the most expensive toys available',
                'Use everyday objects (cups, spoons, leaves) and focus on talking, playing, and responding to the child',
                'Let the child play alone without interaction',
                'Avoid play and only teach letters',
              ],
              correctAnswerIndex: 1,
              explanation: 'Everyday interactions and simple objects support learning more than expensive toys.',
            },
          ],
        },
      },
    ],
  },
  MODULE_2_PHYSICAL_DEVELOPMENT,
  MODULE_3_COGNITIVE_DEVELOPMENT,
];

export const DEFAULT_SETTINGS: PortalSettings = {
  paymentVerificationMode: 'MANUAL',
  connectPayeLinkXAF: 'https://connectpaye.com/pay/bfh-ecd-xaf',
  connectPayeLinkNGN: 'https://connectpaye.com/pay/bfh-ecd-ngn',
  connectPayeLinkUSD: 'https://connectpaye.com/pay/bfh-ecd-usd',
  selarProductLinkXAF: 'https://selar.co',
  selarProductLinkNGN: 'https://selar.co',
  selarProductLinkUSD: 'https://selar.co',
  ecdCourseBannerUrl: '/banners/ecd-banner.jpg',
  businessWhatsApp: '+237671752496',
  allowedVideoHosts: ['youtube.com', 'youtu.be', 'vimeo.com', 'drive.google.com'],
  pediaEnabled: true,
  pediaDailyLimit: 25,
  autoIssueCertificates: false,
  refundPolicyVersion: '1.0',
  refundPolicyContent: `BABY FIRST HEALTH STRICT REFUND AND PAYMENT POLICY (VERSION 1.0)
Last Updated: October 2026

1. DIGITAL CONTENT AND CERTIFICATION ACCESS
All certifications, video modules, downloadable guides, and clinical curricula provided by Baby First Health are strictly non-refundable digital intellectual property.

2. FINALITY OF PAYMENTS
Because course materials, syllabus structures, and cohort seats are provisioned immediately upon human administrative verification, all tuition payments made in XAF, NGN, or USD are completely final.

3. CHARGEBACK AND FRAUD PREVENTION
Any attempt to claim fraudulent chargebacks after receiving course access will result in immediate and permanent revocation of Student ID credentials, forfeiture of any earned certificates, and notification to partner clinical registries.

4. ADMINISTRATIVE VERIFICATION WINDOW
Payments made through ConnectPaye or Selar are validated against transaction and access code records. Verification typically takes between 30 minutes to 1 hour during standard hours (8:00 AM - 8:00 PM WAT).`,
};
