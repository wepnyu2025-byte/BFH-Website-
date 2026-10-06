import { CourseModule } from '../types/studentPortal';

export const MODULE_8_SUPPORTIVE_ENVIRONMENT: CourseModule = {
  id: 'ecd-m8',
  programId: 'ecd-cert',
  title: '8. Creating a Supportive Environment',
  order: 8,
  description:
    'Learn how physical safety, emotional security, responsive relationships, predictable routines, and everyday learning opportunities create a thriving developmental environment for young children.',
  glossary: [
    {
      term: 'Supportive environment',
      definition:
        'The conditions surrounding a child that promote health, physical safety, cognitive learning, and emotional well-being, encompassing both physical space and responsive adult relationships.',
    },
    {
      term: 'Responsive caregiving',
      definition:
        'When adults notice, understand, and respond to a child’s signals and needs in a timely, loving, and predictable manner (serve and return).',
    },
    {
      term: 'Emotional safety',
      definition:
        'When a child feels loved, valued, respected, and secure in their relationships, feeling safe to express vulnerability without fear of shame or harsh punishment.',
    },
    {
      term: 'Physical safety',
      definition:
        'Active adult protection from physical hazards (falls, burns, choking, drowning, poisons, road traffic, and electrical dangers).',
    },
    {
      term: 'Routine',
      definition:
        'A predictable sequence of daily events (waking, meals, play, bathing, rest) that reduces anxiety and creates psychological security.',
    },
    {
      term: 'Stimulation',
      definition:
        'Developmental engagement through conversation, storytelling, sensory exploration, and interactive play.',
    },
    {
      term: 'Overstimulation',
      definition:
        'Sensory overload caused by excessive noise, packed schedules, constant screen time, or competing demands without adequate quiet downtime.',
    },
    {
      term: 'Independence',
      definition:
        'Age-appropriate opportunities for a child to make choices, solve challenges, and perform self-care tasks autonomously.',
    },
    {
      term: 'Child-friendly environment',
      definition:
        'A space organized from the child’s perspective that is safe, low in risk, and accessible for hands-on exploration.',
    },
    {
      term: 'Open-ended play',
      definition:
        'Play using flexible materials (boxes, plastic cups, cloths) that can be transformed in multiple creative ways.',
    },
  ],
  references: [
    {
      title: 'WHO & UNICEF. Nurturing Care Framework: Creating Enabling Environments for Early Childhood.',
      url: 'https://iris.who.int/bitstream/handle/10665/272603/9789241514064-eng.pdf',
    },
    {
      title: 'CDC. Child Injury Prevention & Home Safety Guidelines.',
      url: 'https://www.cdc.gov/injury/features/child-safety/index.html',
    },
    {
      title: 'Harvard Center on the Developing Child. Place Matters: The Environment We Create Shapes the Foundations of Healthy Development.',
      url: 'https://developingchild.harvard.edu/resources/place-matters-the-environment-we-create-shapes-the-foundations-of-healthy-development/',
    },
    {
      title: 'American Academy of Pediatrics. Safe Sleep and Home Safety for Infants and Toddlers.',
      url: 'https://www.healthychildren.org',
    },
    {
      title: 'UNICEF. Early Childhood Development and Responsive Environments.',
      url: 'https://www.unicef.org/early-childhood-development',
    },
  ],
  lessons: [
    {
      id: 'ecd-m8-l01',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '1. Welcome to the Module: Child A vs. Child B',
      order: 1,
      hasVideo: false,
      content: `> **Clinical Scenario:** Consider two children:
>
> **Child A** lives in a large home with expensive electronic toys and high-tech gadgets. However, adults rarely interact with them, there is no predictable meal or bedtime routine, and the child spends most of the day in front of screens alone.
>
> **Child B** lives in a modest two-room home with few toys, shared with extended family. However, Child B has responsive caregivers who converse with them throughout the day, predictable routines, emotional comfort when upset, and opportunities to explore safely.

### The Research Insight
Developmental science confirms that **Child B's environment is vastly more supportive of healthy brain development and emotional well-being**, despite having fewer material possessions.

A supportive environment does not require an expensive house or luxury toys. It requires safety, responsive relationships, predictable routines, and opportunities for exploration and learning.`,
      coachNotes:
        'Welcome the learner to Module 8. Emphasize that relationships and routines matter far more than material wealth.',
      quiz: {
        id: 'quiz-m8-l01',
        lessonId: 'ecd-m8-l01',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q01',
            prompt: 'Which of the following best describes a genuinely "supportive environment" for a young child?',
            options: [
              'A mansion filled with expensive electronic toys where the child watches screens alone.',
              'A safe, emotionally secure setting with responsive relationships, predictable routines, and everyday opportunities for exploration.',
              'A home where children are left completely unattended for 10 hours daily.',
              'A rigid military-style schedule with zero flexibility.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'A supportive environment is defined by physical safety, emotional security, warm relationships, and predictable routines rather than material wealth.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l02',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '2. What Is a Supportive Environment?',
      order: 2,
      hasVideo: false,
      content: `A **supportive environment** is the total ecosystem of conditions around a child that promotes physical health, safety, learning, and emotional security:

### Key Dimensions of a Supportive Environment
1. **Physical Safety:** Proactive protection from hazards, poisons, burns, falls, and traffic.
2. **Emotional Security:** Knowing they are loved, valued, and safe to express feelings.
3. **Responsive Relationships:** Adults who notice, interpret, and respond to cues (serve and return).
4. **Time & Space to Play:** Daily opportunities for self-directed exploration.
5. **Predictable Routines:** Consistent schedules for meals, rest, play, and sleep.
6. **Age-Appropriate Independence:** Opportunities to make small choices and help with routines.
7. **Appropriate Stimulation:** Engaging conversation balanced with peaceful quiet time.
8. **Healthy Boundaries:** Calm, firm limits that provide security rather than fear.`,
      coachNotes:
        'Emphasize that the environment is composed of both the physical space and the emotional climate created by adults.',
      quiz: {
        id: 'quiz-m8-l02',
        lessonId: 'ecd-m8-l02',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q02',
            prompt: 'What two interconnected components make up a child’s developmental environment?',
            options: [
              'Only the price of their clothing and shoes.',
              'Both the physical space (safety, accessibility) and the emotional relationships (responsiveness, warmth).',
              'Only television programming.',
              'Only school test scores.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'A child’s environment comprises both physical conditions and the social-emotional quality of relationships around them.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l03',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '3. Physical Safety in the Home',
      order: 3,
      hasVideo: false,
      content: `Young children have intense exploratory curiosity paired with immature risk perception. Physical safety requires proactive adult environmental modification:

### High-Risk Household Hazards & Prevention
- **Drowning:** Infants and toddlers can drown silently in as little as 2 inches of water. **Never leave open water buckets or basins unattended in compounds or bathrooms.**
- **Burns & Scalds:** Keep cooking pots turned inward on stoves; establish a 3-foot buffer zone around kerosene lamps, open fires, and charcoal braziers.
- **Choking:** Keep objects smaller than 1.25 inches (coins, buttons, bottle caps, small batteries, nuts) completely out of reach for children under 3.
- **Poisons & Medicines:** Store cleaning agents, kerosene, detergents, and all medications in elevated, securely latched cabinets. Never store kerosene in soda bottles!
- **Falls & Tip-Overs:** Place barriers at stairways; anchor unstable furniture, shelves, and heavy appliances to walls.`,
      coachNotes:
        'Review the drowning hazard rule: water buckets must always be covered or emptied. Children drown silently without splashing.',
      quiz: {
        id: 'quiz-m8-l03',
        lessonId: 'ecd-m8-l03',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q03',
            prompt: 'Which of the following presents a critical, silent physical hazard for young toddlers in household compounds?',
            options: [
              'A closed safety gate at the top of the stairs.',
              'An unattended bucket of water or open water storage drum.',
              'A locked medicine cabinet.',
              'A child-sized soft floor mat.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Toddlers can drown quickly and silently in unattended buckets or storage drums. All water containers must be securely covered or emptied.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l04',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '4. Emotional Safety: The Climate of Trust',
      order: 4,
      hasVideo: false,
      content: `Emotional safety exists when a child feels deeply valued, heard, and protected:

### Essential Elements of Emotional Safety
- **Consistent Responses:** Adults respond in predictable ways, teaching the child that caregivers can be trusted.
- **Warmth & Affection:** Frequent hugs, gentle touch, soft vocal tones, and reassuring smiles.
- **Active Listening:** Getting down to eye level and acknowledging what the child is experiencing.
- **Eliminating Fear & Humiliation:** Banishing public shaming, mocking, name-calling, and threats of abandonment.
- **Warmth with Firm Boundaries:** Emotional safety is **not** permissiveness. Adults can be warm and loving while firmly enforcing boundaries: *"It is okay to feel angry, but it is not okay to hit."*`,
      coachNotes:
        'Teach that emotional safety combines unconditional love with clear, firm behavioral boundaries.',
      quiz: {
        id: 'quiz-m8-l04',
        lessonId: 'ecd-m8-l04',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q04',
            prompt: 'What does "emotional safety" mean for a preschooler?',
            options: [
              'Letting the child do whatever they want with zero rules.',
              'Feeling loved, valued, respected, and secure in relationships with adults who maintain calm, consistent boundaries.',
              'Never correcting a child under any circumstances.',
              'Isolating the child from all other human beings.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Emotional safety means the child feels loved and respected by dependable adults who set clear, calm boundaries.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l05',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '5. The Centrality of Relationships',
      order: 5,
      hasVideo: false,
      content: `Development happens in an **environment of relationships**:

### Key Relationships in a Child's World
- **Primary Caregivers:** The foundational attachment figure (parents, grandparents).
- **Siblings & Cousins:** The early training ground for sharing, conflict resolution, and cooperation.
- **Extended Family & Community:** Aunts, uncles, elders, and neighbors who provide a resilient web of security.
- **Early Educators & Childcare Workers:** Trusted secondary attachment figures who expand learning horizons.

> **Key Developmental Principle:** Children can thrive in diverse family structures—single-parent households, multigenerational compounds, or foster families. What matters is the presence of consistent, loving, responsive caregivers.`,
      coachNotes:
        'Validate non-traditional and extended family arrangements. High-quality responsive care is what matters.',
      quiz: {
        id: 'quiz-m8-l05',
        lessonId: 'ecd-m8-l05',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q05',
            prompt: 'What does child development science emphasize regarding family structures?',
            options: [
              'Children can only thrive in wealthy nuclear families.',
              'Children can thrive in many family structures (multigenerational, extended, single-parent) as long as responsive, loving relationships are present.',
              'Extended families harm child development.',
              'Siblings should never interact before age 6.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Research shows that the quality of responsive caregiving and emotional security matters far more than the specific family structure.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l06',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '6. Predictable Routines & Flexible Rhythm',
      order: 6,
      hasVideo: false,
      content: `Young children do not read clocks; they read **sequences**:

### Why Routines Provide Psychological Security
- **Reduces Anxiety:** When a child knows that naptime follows lunch and a story follows a bath, their brain experiences predictability and calm.
- **Promotes Co-operation:** Routines minimize power struggles because expectations are regular habits rather than arbitrary adult commands.
- **Supports Healthy Sleep & Digestion:** Circadian rhythms synchronize with regular meal and bedtime cues.

### Predictability vs. Inflexible Rigidity
Routines should be predictable yet flexible:
- Special family events, travel, illness, or community celebrations naturally shift timings.
- The goal is a predictable daily rhythm, not rigid perfectionism.`,
      coachNotes:
        'Help parents establish predictable sequences rather than strict minute-by-minute schedules.',
      quiz: {
        id: 'quiz-m8-l06',
        lessonId: 'ecd-m8-l06',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q06',
            prompt: 'Why are predictable daily routines essential for toddlers and preschoolers?',
            options: [
              'They eliminate all child creativity.',
              'They reduce uncertainty and anxiety by helping children anticipate what comes next, fostering security and cooperation.',
              'They force children to behave like adults.',
              'They must never be adjusted under any circumstances.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Predictable sequences give children a sense of order and security, reducing behavioral friction and supporting emotional regulation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l07',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '7. Creating Safe Exploration Zones',
      order: 7,
      hasVideo: false,
      content: `A supportive home says *"Yes, explore here!"* rather than an exhausting barrage of *"No, don't touch!"*:

### Designing Safe Exploration Zones by Age
- **0 to 12 Months:** A clean mat or blanket on the floor with safe objects to grasp, roll toward, and mouth.
- **1 to 3 Years:** Low-risk spaces where toddlers can pull up, crawl into cardboard boxes, stack bowls, and move safely.
- **3 to 5 Years:** Dedicated creative stations with accessible paper, crayons, building blocks, and picture books.

> **The "Yes" Zone Concept:** Creating a designated zone where every single item is safe to touch frees caregivers from constant vigilance and allows children to explore with confidence!`,
      coachNotes:
        'Encourage setting up at least one "Yes Zone" in the home where everything is child-safe and touchable.',
      quiz: {
        id: 'quiz-m8-l07',
        lessonId: 'ecd-m8-l07',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q07',
            prompt: 'What is the primary benefit of creating a designated "Yes Zone" for a toddler at home?',
            options: [
              'It allows children to destroy furniture safely.',
              'It allows the child to explore freely without constant adult prohibition ("no, don’t touch"), fostering autonomy and curiosity.',
              'It eliminates the need for any caregiver presence.',
              'It forces the child to remain seated all day.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'A child-proofed "Yes Zone" enables joyful, uninterrupted exploration while reducing caregiver stress and negative reprimands.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l08',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '8. Fostering Age-Appropriate Independence',
      order: 8,
      hasVideo: false,
      content: `Doing everything for a child robs them of the opportunity to develop capability and self-confidence:

### Age-Appropriate Autonomy Opportunities
- **Ages 1 to 3 Years:**
  - Choosing between two shirts (*"Red or blue today?"*).
  - Carrying their own small cup to the sink.
  - Feeding themselves with fingers or spoon (tolerating spills!).
  - Putting dirty clothes in a laundry basket.
- **Ages 3 to 5 Years:**
  - Dressing themselves with minimal help.
  - Washing hands and face independently.
  - Helping sweep with a small broom or wiping a spilled cup.
  - Choosing which bedtime story to read.

> **Clinical Benefit:** Giving children limited choices and real responsibilities reduces power struggles and builds authentic self-esteem!`,
      coachNotes:
        'Remind caregivers to tolerate mess during early self-feeding and dressing. Capability requires practice.',
      quiz: {
        id: 'quiz-m8-l08',
        lessonId: 'ecd-m8-l08',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q08',
            prompt: 'A 3-year-old insists on helping wipe the table with a cloth. What is the most supportive response?',
            options: [
              'Tell them to stop because they will make a mess.',
              'Encourage their participation by giving them a damp cloth and guiding them warmly, praising their helpfulness.',
              'Punish them for touching household items.',
              'Hire a domestic worker to do everything for them.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Supporting age-appropriate independence builds practical skills, confidence, and a sense of contributing to the family.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l09',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '9. Stimulation Without Overstimulation',
      order: 9,
      hasVideo: false,
      content: `Young nervous systems can easily be overwhelmed by too much sensory input:

### Recognizing Signs of Overstimulation
- **Triggers:** Constant background TV, loud crowded rooms, packed schedules with zero downtime, too many toys scattered at once.
- **Behavioral Signs:** Meltdowns, ear-covering, frantic hyperactive running, sudden withdrawal, irritability.

### The Antidote: Rest, Quiet & Screen Limits
- **Quiet Time:** Schedule calm periods with books, soft humming, or lying on a mat.
- **AAP Screen Guidelines:**
  - Under 18–24 months: Zero entertainment screens (only interactive video calls).
  - Ages 2 to 5 years: Max 1 hour/day of high-quality programming with an adult present.
  - Strict curfew: No screens during meals or 1–2 hours before bedtime.`,
      coachNotes:
        'Walk through overstimulation signs. Help parents balance stimulation with restful quiet time.',
      quiz: {
        id: 'quiz-m8-l09',
        lessonId: 'ecd-m8-l09',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q09',
            prompt: 'Which behavior commonly signals that a toddler is experiencing sensory overstimulation?',
            options: [
              'Playing quietly with a single toy.',
              'Sleeping peacefully during scheduled naptime.',
              'Becoming irritable, crying, frantic, or withdrawing after prolonged noise, crowds, or screen time.',
              'Laughing warmly while reading a picture book.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Fussiness, irritability, and withdrawal after excessive sensory input signal that a child needs quiet downtime to reset their nervous system.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l10',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '10. Transforming Daily Chores into Learning Labs',
      order: 10,
      hasVideo: false,
      content: `You do not need special flashcard lessons. Everyday household routines are rich classrooms:

### Everyday Learning Opportunities
- **Cooking & Meal Prep:** Count beans (*"one, two, three"*); name foods (*"ripe plantain, fresh tomatoes"*); explore textures (*"smooth skin, rough yam"*).
- **Laundry & Folding:** Sort clothes by color; match socks into pairs; practice spatial folding.
- **Market & Shopping:** Discuss choices (*"apples or bananas?"*); count oranges into bags; observe exchange of money.
- **Cleaning & Sweeping:** Learn organization (*"books on the shelf, blocks in the box"*); practice balance.
- **Walking to Market:** Name birds, count passing motorcycles, observe flowering trees, greet community elders.`,
      coachNotes:
        'Show how ordinary chores build vocabulary, math concepts, and motor skills through natural conversation.',
      quiz: {
        id: 'quiz-m8-l10',
        lessonId: 'ecd-m8-l10',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q10',
            prompt: 'How can a caregiver turn sorting laundry into a rich cognitive learning activity for a preschooler?',
            options: [
              'By locking the child out of the room.',
              'By having the child match pairs of socks and sort clothes by color, naming clothing items and practicing counting.',
              'By forcing the child to do all the family washing alone.',
              'By turning on loud cartoons.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Sorting laundry teaches categorization, color discrimination, spatial pairing, and vocabulary in an organic, cooperative way.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l11',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '11. High-Value, Low-Cost Learning Materials',
      order: 11,
      hasVideo: false,
      content: `The most educational materials are simple, open-ended, and durable:

### 8 Everyday Household Learning Treasures
1. **Cardboard Boxes:** Houses, cars, drums, stacking bricks.
2. **Plastic Cups & Containers:** Stacking, nesting, water pouring.
3. **Cloth Pieces & Wrappers:** Doll blankets, capes, tents, sensory exploration.
4. **Wooden Spoons:** Rhythm drumming, cooking pretend soup.
5. **Paper Scraps:** Tearing, crumpling, folding, drawing.
6. **Clean Household Objects:** Bowls, baskets, plastic colanders.
7. **Natural Objects:** Leaves, twigs, smooth stones (with supervision).
8. **Oral Storytelling:** Family histories, folklore, community legends, and songs.`,
      coachNotes:
        'Reinforce that low-cost open-ended items stimulate more cognitive imagination than expensive single-use toys.',
      quiz: {
        id: 'quiz-m8-l11',
        lessonId: 'ecd-m8-l11',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q11',
            prompt: 'What characteristic makes a play material most developmentally valuable for early childhood?',
            options: [
              'Having flashing LED lights and automated batteries.',
              'Being open-ended, safe, and versatile so the child can use it in multiple imaginative ways.',
              'Being made of fragile glass.',
              'Costing at least $100.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Open-ended materials allow children to invent multiple uses, exercising creativity, problem-solving, and symbolic thought.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l12',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '12. Supportive Environments in Resource-Limited Settings',
      order: 12,
      hasVideo: false,
      content: `In homes with limited money or shared living spaces, warmth and responsive presence matter infinitely more than luxury:

### High-Impact Strategies for Modest Homes
- **Designate a Small Safe Corner:** Clear one corner of hazards with a clean mat and 3 safe containers.
- **Rotate Just 3 Items:** Keep 3 items out; rotate next week.
- **Oral Storytelling Culture:** Traditional folklore, lullabies, and spoken riddles build vocabulary faster than flashcards.
- **Communal Outdoor Compound Play:** Courtyards and yards offer free gross motor exercise and social play with cousins and neighbors.
- **The Greatest Resource is Free:** An attentive, loving adult who listens, speaks, and cuddles.`,
      coachNotes:
        'Deliver a message of empowerment: love, conversation, and safety cost nothing and build thriving children.',
      quiz: {
        id: 'quiz-m8-l12',
        lessonId: 'ecd-m8-l12',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q12',
            prompt: 'A family with very low income worries their child cannot develop well without money for expensive books. What is the evidence-based truth?',
            options: [
              'The child is doomed to fail in life.',
              'The family can create an elite learning environment through oral storytelling, singing traditional songs, conversation, and warm responsive caregiving.',
              'The family must purchase debt-funded electronic gadgets.',
              'Oral storytelling has zero educational value.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Rich oral storytelling, songs, conversation, and responsive adult relationships provide top-tier language and cognitive foundations at zero cost.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l13',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '13. Childcare & Center-Based Environments',
      order: 13,
      hasVideo: false,
      content: `For crèches, daycares, and nursery schools, quality is defined by adult-child interactions and safety:

### Hallmarks of High-Quality Early Learning Settings
- **Safe, Clean Spaces:** Safety gates, covered electrical sockets, clean drinking water, clean sleeping mats.
- **Active Supervision:** Favorable caregiver-to-child ratios where adults actively observe and engage.
- **Balanced Daily Rhythm:** Alternating active physical outdoor play with calm storytelling and rest.
- **Defined Activity Zones:** Separate cozy reading corners, block construction zones, and wash areas.
- **Partnership with Families:** Regular, respectful communication regarding developmental milestones and home routines.`,
      coachNotes:
        'Walk through early learning center quality markers: safety, clean spaces, active supervision, and balanced schedules.',
      quiz: {
        id: 'quiz-m8-l13',
        lessonId: 'ecd-m8-l13',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q13',
            prompt: 'What constitutes the most critical quality factor in early childcare and preschool environments?',
            options: [
              'Expensive marble floors.',
              'Warm, responsive adult-child interactions, high safety standards, and balanced activity rhythms.',
              'Forcing 2-year-olds to complete 5 hours of silent handwriting drills.',
              'Zero outdoor playtime.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Research consistently shows that responsive caregiver interactions and safe, well-supervised spaces define high-quality early childhood care.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l14',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '14. The Adult Is Part of the Environment',
      order: 14,
      hasVideo: false,
      content: `The emotional tone of the adult **is** the weather of the child’s world:

### How Adult Behavior Shapes the Emotional Climate
- **Vocal Tone:** Warm, calm voices signal physiological safety. Screaming or harsh shouting elevates child cortisol.
- **Modeling Mistake-Handling:** Responding to spilled water with *"Accidents happen, let's clean it up together"* teaches problem-solving rather than shame.
- **Adult Stress Matters:** Financial, health, or relationship stress makes patience difficult.
  - Seeking community support, taking deep breaths, and asking family for a 15-minute break is a sign of strength, not weakness!`,
      coachNotes:
        'Highlight caregiver self-care and stress awareness. A calm adult is the greatest gift to a child’s nervous system.',
      quiz: {
        id: 'quiz-m8-l14',
        lessonId: 'ecd-m8-l14',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q14',
            prompt: 'When a caregiver feels severely stressed and overwhelmed, what is the healthiest course of action?',
            options: [
              'Take out their anger physically on the child.',
              'Acknowledge the stress, take deep breaths, seek support from family or community, and take a brief break to reset.',
              'Pretend stress does not exist and bottle it up until exploding.',
              'Abandon the child permanently.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Caregiver stress is real. Seeking support and taking brief calming breaks protects both adult well-being and the child’s emotional safety.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l15',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '15. Culture, Community & Universal Principles',
      order: 15,
      hasVideo: false,
      content: `Supportive environments take many cultural forms:

### Strengths of Communal & Extended Family Systems
- **Multiple Attachment Figures:** Grandparents, aunts, uncles, and older siblings provide security and guidance.
- **Cultural Identity:** Traditional songs, proverbs, and community gatherings nurture belonging and respect.
- **Multilingual Living:** Navigating indigenous and national languages builds cognitive flexibility.

### Universal Principles Across All Cultures
No matter the cultural background, every child requires:
1. Physical safety from danger.
2. Emotional security and responsive caregiving.
3. Mutual respect and warm boundaries.
4. Opportunities to play, explore, and learn.`,
      coachNotes:
        'Celebrate cultural diversity while affirming universal principles of safety, warmth, and respect.',
      quiz: {
        id: 'quiz-m8-l15',
        lessonId: 'ecd-m8-l15',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q15',
            prompt: 'How should cultural variations in child-rearing be viewed by early childhood practitioners?',
            options: [
              'Western models are the only acceptable standard.',
              'Supportive environments look different across cultures, but universal principles of safety, responsive relationships, and respect apply everywhere.',
              'Culture has no bearing on child development.',
              'Extended families should be dismantled.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Diverse cultural traditions offer profound developmental strengths. Universal principles of safety, love, and responsiveness apply across all cultures.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l16',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '16. African Family Case Study: The Okonkwos in Enugu',
      order: 16,
      hasVideo: false,
      content: `### Clinical Case Scenario
The **Okonkwo family** lives in a modest two-room home in Enugu, Nigeria. Six family members share the space: Mr. and Mrs. Okonkwo, their 3-year-old daughter **Amara**, grandmother, and two older cousins (ages 8 and 10).

The parents worried that Amara could not learn properly because they had no separate playroom and few commercial toys.

---

### The Practical Solution
A community health worker guided the family to leverage their existing assets:
1. **A Safe Play Corner:** Cleared one corner of the room with a clean mat and plastic bowls.
2. **Grandmother's Storytelling:** Grandmother told traditional Igbo folklore and sang songs every evening.
3. **Cousin Play:** Older cousins played clapping and counting games with Amara in the courtyard.
4. **Daily Routines:** Regular morning washing, shared meals, and predictable bedtimes.

**Result:** Amara flourished with exceptional language, social confidence, and motor coordination!`,
      coachNotes:
        'Use the Okonkwo case study to demonstrate how multigenerational family compounds create elite developmental outcomes.',
      quiz: {
        id: 'quiz-m8-l16',
        lessonId: 'ecd-m8-l16',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q16',
            prompt: 'In the Okonkwo family case study in Enugu, how did the family successfully support Amara’s development without a separate playroom?',
            options: [
              'By putting her in front of a TV for 12 hours.',
              'By clearing a safe corner, engaging grandmother’s storytelling, singing songs, and establishing predictable routines.',
              'By taking out a bank loan to buy imported toys.',
              'By sending her away to boarding school.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'The family used their existing assets—family storytelling, safe space, songs, and routines—to provide an exceptional learning environment.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l17',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '17. Practical Activity: The Environment Walkthrough',
      order: 17,
      hasVideo: false,
      content: `Conduct an **Environment Walkthrough** by getting down to child height (on your knees) in your home or center:

### The 5-Category Checklist
1. **Safe:** What is already safe and secure? (Locked medicines, covered outlets, clean floor).
2. **Risk:** What hazards exist at child eye level? (Unattended water buckets, dangling kettle cords, unstable shelves, small choking objects).
3. **Learning:** Where can the child play, read, or explore without adult restriction?
4. **Independence:** What can the child reach independently? (Low towel hook, shoes, book basket).
5. **Calm:** Where can the child retreat when overwhelmed to rest quietly?

**Action Step:** Choose **two small improvements** to implement today!`,
      coachNotes:
        'Encourage learners to get down to child eye level. Hazards and opportunities look completely different from 2 feet off the ground.',
      quiz: {
        id: 'quiz-m8-l17',
        lessonId: 'ecd-m8-l17',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q17',
            prompt: 'Why is it recommended to get down to a child’s physical height when assessing home safety and learning spaces?',
            options: [
              'To inspect floor dust only.',
              'To see hazards (dangling cords, sharp corners, choking items) and learning opportunities from the child’s actual line of sight.',
              'To play hide-and-seek.',
              'It has no clinical value.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Viewing the room from child height reveals hazards and inaccessible materials that standing adults routinely overlook.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l18',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '18. 10 Common Environmental Mistakes Adults Make',
      order: 18,
      hasVideo: false,
      content: `Avoid these 10 widespread misconceptions:

1. **Believing Expensive Equals Educational:** Overlooking the power of boxes, cups, and conversation.
2. **Leaving Water Unattended:** Forgetting that buckets and basins pose silent drowning risks.
3. **Unlimited Screen Time:** Using televisions and tablets as permanent babysitters.
4. **Rigid Timetables:** Enforcing militaristic schedules that cause family stress.
5. **Excessive Sensory Overload:** Constant loud radio/TV and cluttered toy piles.
6. **Zero Autonomy:** Doing everything for the child and refusing to let them try.
7. **Neglecting Emotional Safety:** Focusing only on physical safety while using verbal shaming.
8. **Discipline Through Fear:** Using threats and physical punishment that destroy trust.
9. **Accessible Toxic Hazards:** Storing kerosene or detergents in low cupboards or beverage bottles.
10. **Adult-Centric Spaces:** Expecting toddlers to adapt to adult environments with zero child accommodations.`,
      coachNotes:
        'Review the 10 common environmental pitfalls. Emphasize safe chemical storage and emotional safety.',
      quiz: {
        id: 'quiz-m8-l18',
        lessonId: 'ecd-m8-l18',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q18',
            prompt: 'Which adult habit creates an unsupportive environment for a young child?',
            options: [
              'Establishing predictable routines for meals and sleep.',
              'Using fear, shouting, and verbal humiliation to control child behavior.',
              'Rotating a small selection of safe play materials.',
              'Reading picture books and singing lullabies.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Fear, shouting, and humiliation destroy emotional safety and generate toxic stress, undermining healthy brain development.',
          },
        ],
      },
    },
    {
      id: 'ecd-m8-l19',
      moduleId: 'ecd-m8',
      programId: 'ecd-cert',
      title: '19. Key Takeaways & Clinical Summary',
      order: 19,
      hasVideo: false,
      content: `### Summary of Core Principles
1. **Holistic Support:** A supportive environment integrates physical safety, emotional security, responsive caregiving, and predictable routines.
2. **Relationships Matter Most:** Warm serve-and-return interaction builds neural architecture far more effectively than material luxury.
3. **Child-Proof Proactively:** Eliminate drowning, burn, choking, poisoning, and fall risks before accidents occur.
4. **Predictability Brings Peace:** Daily sequences reduce anxiety, support digestion, and minimize tantrums.
5. **Protect Quiet Time:** Balance active learning with restful downtime; honor AAP screen time limits.
6. **Everyday Chores Are Classrooms:** Cooking, laundry, shopping, and sweeping are goldmines for vocabulary and math.
7. **Celebrate Cultural Assets:** Extended family, oral storytelling, and communal living provide extraordinary developmental foundations.

---

### Professional Disclaimer
*This module provides educational guidance on creating safe, supportive environments for children aged 0–5. It does not replace professional structural safety inspections, clinical pediatric advice, or emergency medical services.*`,
      coachNotes:
        'Congratulate the learner on completing Module 8: Creating a Supportive Environment. Encourage them to complete their module quiz.',
      quiz: {
        id: 'quiz-m8-l19',
        lessonId: 'ecd-m8-l19',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm8-q19',
            prompt: 'What is the overarching conclusion of developmental science regarding supportive environments?',
            options: [
              'Only wealthy families can raise successful children.',
              'Responsive relationships, physical and emotional safety, predictable routines, and love matter far more than material wealth or large spaces.',
              'Children should be kept away from all family members.',
              'Daily routines should be completely abolished.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Warm, responsive human relationships, safety, predictable rhythms, and rich everyday interactions are the true drivers of early childhood thriving.',
          },
        ],
      },
    },
  ],
};
