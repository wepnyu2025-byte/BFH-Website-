import { CourseModule } from '../types/studentPortal';

export const MODULE_6_DEVELOPMENTAL_MILESTONES: CourseModule = {
  id: 'ecd-m6',
  programId: 'ecd-cert',
  title: '6. Developmental Milestones (0–5 Years)',
  order: 6,
  description:
    'Understand developmental milestones from birth to age 5 across physical, cognitive, communication, and social-emotional domains, recognizing normal variation and knowing when to seek professional screening.',
  glossary: [
    {
      term: 'Developmental milestone',
      definition:
        'A skill or behavior that most children (about 75% or more) can do by a certain age. Milestones are guides for observation, not exact deadlines or diagnostic tests.',
    },
    {
      term: 'Developmental monitoring',
      definition:
        'Regularly observing and discussing how a child is growing and learning through everyday interactions and routine well-child visits.',
    },
    {
      term: 'Developmental screening',
      definition:
        'A structured process used by qualified professionals to identify children who may need further evaluation, using validated tools (e.g., ASQ, PEDS). Screening is not a diagnosis.',
    },
    {
      term: 'Developmental assessment',
      definition:
        'A detailed clinical evaluation conducted by pediatric specialists to determine if a child has a developmental delay or disability and what tailored support is needed.',
    },
    {
      term: 'Developmental variation',
      definition:
        'Normal differences in the timing and style of how children develop. Children develop at different rates and in different ways; variation is expected and healthy.',
    },
    {
      term: 'Gross motor skills',
      definition:
        'Large body movements controlled by major muscle groups, such as sitting, crawling, walking, running, jumping, and climbing.',
    },
    {
      term: 'Fine motor skills',
      definition:
        'Small, precise hand and finger movements, such as reaching, grasping, the pincer grasp, scribbling, using utensils, and buttoning.',
    },
    {
      term: 'Social-emotional development',
      definition:
        'How children learn to relate to others, understand their own feelings, express emotions, build relationships, and develop confidence.',
    },
    {
      term: 'Receptive language',
      definition:
        'Understanding language—what a child comprehends when others speak.',
    },
    {
      term: 'Expressive language',
      definition:
        'Using sounds, words, gestures, signs, or sentences to communicate thoughts and needs outward.',
    },
    {
      term: 'Developmental concern',
      definition:
        'A persistent pattern of behavior or delayed skill acquisition that significantly differs from typical expectations and warrants discussion with a qualified healthcare provider.',
    },
  ],
  references: [
    {
      title: 'CDC. Learn the Signs. Act Early. Milestone Checklists by Age.',
      url: 'https://www.cdc.gov/act-early/resources/milestones-checklist-by-age.html',
    },
    {
      title: 'CDC. Key Points about CDC’s Developmental Milestone Checklists.',
      url: 'https://www.cdc.gov/act-early/milestones/key-points.html',
    },
    {
      title:
        'CDC. Revised Developmental Milestone Checklists. American Family Physician, 2022.',
      url: 'https://stacks.cdc.gov/view/cdc/154544/cdc_154544_DS1.pdf',
    },
    {
      title:
        'WHO & UNICEF. Nurturing Care Handbook. Strategic Action 4: Monitor Progress.',
      url: 'https://iris.who.int/bitstream/handle/10665/365550/9789240058491-eng.pdf',
    },
    {
      title:
        'WHO. Guideline: Improving Early Childhood Development – Executive Summary.',
      url: 'https://cdn.who.int/media/docs/default-source/mca-documents/child/early-child-development/executive-summary-guideline-improving-early-childhood-development.pdf',
    },
    {
      title:
        'WHO. Monitoring Children’s Development in Primary Care Services: Moving from a Focus on Child Deficits to Family-Centred Participatory Support.',
      url: 'https://iris.who.int/bitstream/handle/10665/335832/9789240012479-eng.pdf',
    },
    {
      title: 'CDC. Developmental Milestones Matter.',
      url: 'https://www.cdc.gov/act-early/families/milestones-matter.html',
    },
  ],
  lessons: [
    {
      id: 'ecd-m6-l01',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '1. Welcome to Developmental Milestones',
      order: 1,
      hasVideo: false,
      content: `> **Clinical Observation:** Two children are both three years old. One speaks constantly in lengthy sentences and loves conversing with adults. The other is quieter, speaks in shorter phrases, but concentrates deeply on stacking intricate wooden blocks and communicates effectively through gestures and eye contact.

Does developing differently automatically mean one child has a medical problem?

**No.** Children develop at different rates and through different pathways. Normal human developmental variation is expected and healthy.

### Purpose of This Module
This module provides a clear, practical roadmap to understanding child development from birth to age five. Rather than memorizing overwhelming encyclopedias of checklists, you will learn to:
- Understand what developmental milestones actually represent.
- Track progress across the four interconnected developmental domains.
- Recognize normal variation vs. genuine clinical red flags.
- Understand milestones in multilingual children.
- Distinguish between developmental monitoring, screening, and diagnostic evaluation.
- Know exactly what actions to take when you have developmental concerns.`,
      coachNotes:
        'Welcome the learner to Module 6. Emphasize that milestones are observation guides rather than rigid pass/fail examinations.',
      quiz: {
        id: 'quiz-m6-l01',
        lessonId: 'ecd-m6-l01',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q01',
            prompt: 'What is the true definition of a developmental milestone?',
            options: [
              'A strict test that all children must pass on their exact birthday.',
              'A skill or behavior that most children (about 75% or more) can do by a certain age.',
              'A formal medical diagnosis of mental disability.',
              'An examination used to rank children’s future academic intelligence.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Developmental milestones are observable skills or behaviors that the vast majority (~75% or more) of children achieve by a given age. They serve as guides for surveillance, not rigid deadlines.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l02',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '2. What Are Developmental Milestones?',
      order: 2,
      hasVideo: false,
      content: `Developmental milestones are behavioral benchmarks that most children (~75% or more) can accomplish by a specific age:

### Common Milestone Examples
- **Smiling** for the first time in response to a caregiver’s face (around 6–8 weeks).
- **Sitting independently** without hand support (around 6–9 months).
- **Speaking first meaningful words** like *"mama"* or *"cup"* (around 12 months).
- **Walking alone** without holding onto furniture (around 12–15 months).
- **Using 2-word spontaneous phrases** like *"more milk"* (around 18–24 months).
- **Drawing a circle** after being shown (around 3–4 years).
- **Playing cooperatively** with peers, negotiating roles (around 4–5 years).

---

### Why Pediatricians & Educators Use Milestones
1. **To Track Growth Systematically:** They describe typical trajectories of human maturation.
2. **Early Identification:** They help parents and healthcare workers notice developmental concerns early, when brain plasticity is highest.
3. **Foster Collaborative Dialogue:** They prompt fruitful, ongoing conversations between families and health professionals during routine well-child visits.

> **Crucial Clarification:**
> - Milestones are **not** exact deadlines.
> - Children do **not** all develop at identical speeds.
> - Milestones are **not** a competitive sport.
> - Checklists are **not** diagnostic tools.`,
      coachNotes:
        'Reinforce the ~75% standard used by the CDC and WHO: milestones reflect what most children can do, leaving room for natural variation.',
      quiz: {
        id: 'quiz-m6-l02',
        lessonId: 'ecd-m6-l02',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q02',
            prompt:
              'Why do pediatric guidelines utilize developmental milestones during well-child visits?',
            options: [
              'To rank children into winners and losers.',
              'To identify possible developmental concerns early and support constructive conversations between families and professionals.',
              'To force all children to walk on the exact same month.',
              'To prescribe adult medications to infants.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Milestones provide a standardized baseline that helps caregivers and healthcare professionals detect emerging delays early, enabling timely support.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l03',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '3. The Four Interconnected Developmental Areas',
      order: 3,
      hasVideo: false,
      content: `Child development is holistic. Pediatric science divides development into four primary domains, but in everyday life, they are deeply interconnected:

### 1. Social and Emotional
How children relate to others, manage feelings, and develop self-worth.
- *Examples:* Smiling at caregivers, building secure attachment, playing cooperatively, sharing, showing empathy when another child cries.

### 2. Language and Communication
How children understand and express meaning.
- *Examples:* Cooing, babbling, responding to their name, following commands (receptive), pointing, speaking single words, forming multi-sentence stories (expressive).

### 3. Cognitive (Thinking & Learning)
How children explore, reason, remember, and solve problems.
- *Examples:* Looking for a hidden toy (object permanence), figuring out how a latch opens, pretend play, sorting shapes, understanding time concepts (*yesterday/tomorrow*).

### 4. Physical and Motor
How children control and coordinate their bodies:
- **Gross Motor (Large Muscles):** Head control, rolling, sitting, crawling, walking, running, jumping, balancing.
- **Fine Motor (Small Muscles):** Reaching, voluntary palmar grasp, pincer grasp (thumb and index finger), holding crayons, using spoons, buttoning shirts.

> **The Connected Whole:** A toddler learning to walk (gross motor) carries a cup to their grandmother (cognitive problem-solving) and points to request water (communication) while smiling warmly (social-emotional). All four domains fire together!`,
      coachNotes:
        'Emphasize the whole-child perspective. No domain develops in isolation.',
      quiz: {
        id: 'quiz-m6-l03',
        lessonId: 'ecd-m6-l03',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q03',
            prompt:
              'Which of the following is an example of a fine motor skill?',
            options: [
              'Running across a football field.',
              'Jumping off the ground with both feet.',
              'Picking up a small grain of rice using the thumb and index finger (pincer grasp).',
              'Climbing a flight of stairs.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Fine motor skills involve small, precise movements of the hands and fingers, such as the pincer grasp. Running, jumping, and climbing are gross motor skills.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l04',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '4. Milestones from Birth to Age 5: Comprehensive Guide',
      order: 4,
      hasVideo: false,
      content: `Here is the comprehensive age-by-age milestone overview based on updated CDC and WHO developmental standards:

### Birth to 3 Months
- **Social/Emotional:** Calms to familiar voice; begins social smile (6–8 weeks); watches human faces.
- **Communication:** Cries for distinct needs; coos with soft vowel sounds (*"ooo," "aah"*); startles at loud sounds.
- **Cognitive:** Visually tracks moving objects briefly; recognizes mother’s scent and voice.
- **Physical:** Lifts head briefly when placed on tummy; opens hands; kicks arms and legs symmetrically.

### 4 to 6 Months
- **Social/Emotional:** Chuckles and laughs; smiles spontaneously to initiate interaction; likes looking at own reflection.
- **Communication:** Blows "raspberries"; squeals; turns head toward voices; takes vocal turns.
- **Cognitive:** Reaches for toys with both hands; explores items by bringing them safely to mouth.
- **Physical:** Rolls from tummy to back; pushes up onto straight elbows during tummy time; sits with hand support.

### 7 to 9 Months
- **Social/Emotional:** Shows stranger anxiety (clings to familiar adults); plays peek-a-boo and pat-a-cake.
- **Communication:** Rhythmic babbling (*"ba-ba," "da-da"*); responds to their own name; uses pointing gestures.
- **Cognitive:** Searches for hidden toys (object permanence); attempts to use everyday items (cups, phones).
- **Physical:** Sits steady without hand support; pulls to standing position; develops pincer grasp (thumb and index finger).

### 10 to 12 Months
- **Social/Emotional:** Waves *"bye-bye"*; hugs stuffed toys; shows clear preference for primary caregivers.
- **Communication:** Calls parents *"mama"* or *"dada"*; says 1 to 2 other single words; understands *"no."*
- **Cognitive:** Drops items to observe falling; imitates household chores (sweeping, wiping).
- **Physical:** Cruises along furniture; may take first independent steps; drinks from an open cup with assistance.

### 1 to 2 Years
- **Social/Emotional:** Copies older peers; shows pride in accomplishments; exhibits temper tantrums when frustrated.
- **Communication:** Vocabulary expands to ~50 words by age 2; combines 2 words (*"more milk," "daddy go"*).
- **Cognitive:** Engages in simple pretend play (feeds doll); stacks 4+ blocks; follows 1-step commands without gestures.
- **Physical:** Walks independently; runs; kicks a ball; scribbles on paper; climbs stairs with help.

### 2 to 3 Years
- **Social/Emotional:** Notices other children and begins parallel play; displays empathy when others are hurt.
- **Communication:** Speaks in 2- to 3-word sentences; asks *"What's that?"*; speech understood ~50% of the time by strangers.
- **Cognitive:** Follows 2-step directions (*"Pick up shoes and close the door"*); names colors; solves simple puzzles.
- **Physical:** Jumps with both feet; unscrews lids; turns single pages of a book; walks up stairs alternating feet.

### 3 to 4 Years
- **Social/Emotional:** Calms down within 10 minutes after separation; joins other children in play; takes turns.
- **Communication:** Speaks in 4+ word sentences; tells simple 2-event stories; speech understood ~75% by strangers.
- **Cognitive:** Draws a person with 3 body parts; draws a circle when shown; names colors and counting concepts.
- **Physical:** Catches large balls; unbuttons large buttons; holds pencil with fingers rather than a whole fist.

### 4 to 5 Years
- **Social/Emotional:** Follows complex game rules; comforts distressed friends; engages in rich dramatic role-play.
- **Communication:** Tells complete stories; uses future/past tense; keeps conversation going with 3+ exchanges.
- **Cognitive:** Counts to 10; writes some letters of their name; pays focused attention for 10–15 minutes.
- **Physical:** Hops on one foot; buttons clothes; serves self food with supervision; uses scissors safely.`,
      coachNotes:
        'Walk through the chronological progression. Emphasize that milestones are benchmarks where ~75% of children achieve the skill.',
      quiz: {
        id: 'quiz-m6-l04',
        lessonId: 'ecd-m6-l04',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q04',
            prompt:
              'At approximately what age do most children begin combining two words together (such as "more milk" or "big dog")?',
            options: [
              'Between 3 and 6 months.',
              'Between 18 and 24 months (around 1½ to 2 years).',
              'Only after starting formal kindergarten at age 5.',
              'At 4 months of age.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Combining two words together typically emerges between 18 and 24 months as a toddler’s spoken vocabulary approaches 50 words.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l05',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '5. Milestones Are Not a Competition: Avoiding Comparison Traps',
      order: 5,
      hasVideo: false,
      content: `One of the greatest sources of parental anxiety is the habit of comparing children against peers, cousins, or social media ideals:

### Why Comparison is Harmful & Misleading
- **Multiple Influencing Factors:** A child's developmental timing is shaped by genetics, innate temperament, physical health, nutritional status, birth order, and opportunities for practice.
- **Uneven Growth Profiles:** A child may focus heavily on gross motor skills (climbing and running early) while speech develops at a steady, typical pace. This is normal brain prioritization.
- **Social Media Distortions:** Online posts present curated, selective highlights of precocious skills, giving a false impression of what is normal.

> **The Golden Motto:** *"Milestones are guides for observation, not a competition."* Compare a child only against their own previous baseline to celebrate progress!`,
      coachNotes:
        'Help parents free themselves from comparison anxiety. Remind them that precocious early walking or talking does not predict adult success.',
      quiz: {
        id: 'quiz-m6-l05',
        lessonId: 'ecd-m6-l05',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q05',
            prompt:
              'Why is it clinically unhelpful to compare a child’s developmental milestones to cousins or social media posts?',
            options: [
              'Because all children are genetically identical.',
              'Because development is uneven, shaped by individual genetics, health, practice, and temperament; comparison creates unwarranted panic.',
              'Because children should never be observed by parents.',
              'Because social media is always 100% medically verified.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Development varies naturally across individuals and domains. Comparing children creates unnecessary stress without providing developmental insight.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l06',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '6. Normal Developmental Variation: Why Children Develop Differently',
      order: 6,
      hasVideo: false,
      content: `**Normal variation** describes the natural spread of healthy developmental timing across the pediatric population:

### Key Drivers of Natural Variation
1. **Biological Rates:** Some children walk at 10 months; others walk at 14 months. Both are completely normal.
2. **Individual Temperament:** An outgoing toddler may vocalize frequently with strangers, while an observant, cautious child absorbs language quietly before speaking in complete phrases.
3. **Practice Opportunities:** A child living on a spacious farm may climb and run earlier than a child in a cramped high-rise apartment.
4. **Health & Nutrition:** Recovery from childhood infections, iron status, and chronic ear fluid directly influence energy and auditory processing.
5. **Language Environment:** Children surrounded by rich conversation, singing, and storytelling develop broader vocabularies earlier.

> **Key Rule:** A child being ahead in one domain and slightly slower in another does **not** indicate a pathology. Human development is naturally uneven!`,
      coachNotes:
        'Emphasize that uneven development across domains is normal. A child is not a uniform machine.',
      quiz: {
        id: 'quiz-m6-l06',
        lessonId: 'ecd-m6-l06',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q06',
            prompt:
              'A 3-year-old child runs and climbs with agility, speaks in sentences, and plays cooperatively, but cannot yet draw a circle. What is the best interpretation?',
            options: [
              'The child has a catastrophic cognitive failure.',
              'Development is naturally uneven across domains; the child is thriving overall and needs simple drawing practice, not panic.',
              'The child must be banned from outdoor play.',
              'The child requires immediate hospitalization.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'One specific skill lag does not signify delay when overall development across motor, language, and social domains is flourishing. Provide opportunities for practice.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l07',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '7. Milestones in Multilingual & Dual-Language Children',
      order: 7,
      hasVideo: false,
      content: `Millions of children worldwide—especially across Africa—grow up hearing and speaking two, three, or more languages simultaneously:

### Evidence-Based Principles for Multilingual Children
1. **Total Conceptual Vocabulary:** A bilingual child may know 25 words in Yoruba and 30 words in English. Their total conceptual vocabulary is **55 words**, well above the 50-word benchmark! Evaluating them in only one language yields a false deficit.
2. **Code-Switching is Normal:** Combining words from two languages (*"Mummy, give me omi"*) is an intelligent demonstration of linguistic flexibility, not confusion.
3. **Equal Milestones Overall:** Multilingual children reach core milestones (first words, 2-word combinations, conversational turns) on the exact same timeline as monolingual peers when all languages are counted together.

> **Clinical Requirement:** Whenever developmental milestones are evaluated in bilingual children, the practitioner must assess the child's communication skills across **all** languages spoken in the home!`,
      coachNotes:
        'Reiterate that multilingualism is never a cause of developmental delay. Always assess total vocabulary across all spoken languages.',
      quiz: {
        id: 'quiz-m6-l07',
        lessonId: 'ecd-m6-l07',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q07',
            prompt:
              'A 2-year-old child in Lagos speaks 20 words in Yoruba and 30 words in English. The grandmother fears the child is speech delayed. What is the evidence-based assessment?',
            options: [
              'The child is severely delayed and must stop speaking Yoruba.',
              'The child has a total conceptual vocabulary of 50 words across both languages, which meets the standard developmental milestone for age 2.',
              'The child is confused by bilingualism.',
              'The child should be made to speak only through gestures.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'In dual-language children, vocabulary across all languages must be combined. A total of 50 words across Yoruba and English meets typical developmental expectations.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l08',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '8. How Adults Can Naturally Observe Development',
      order: 8,
      hasVideo: false,
      content: `Effective developmental observation does **not** mean turning home life into an anxiety-inducing testing center:

### When & Where to Observe
Observation happens naturally during daily routines:
- **Mealtime:** Notice pincer grasp, self-feeding with fingers or spoon, chewing, drinking from cups.
- **Bathing & Dressing:** Notice balancing on one foot, pushing arms through sleeves, unbuttoning, naming body parts.
- **Floor Play:** Notice block stacking, pretend play, problem-solving, persistence when a toy gets stuck.
- **Outdoor Walks:** Notice running, jumping over puddles, kicking stones, greeting neighbors.

---

### The "Progress Over Time" Lens
- **Focus on What the Child CAN Do:** Document emerging strengths before cataloging weaknesses.
- **Observe Supported vs. Independent Skills:** Notice what the child does alone vs. what they accomplish with gentle scaffolding.
- **Watch Over Weeks, Not Hours:** A tired, hungry, or teething child will perform poorly today. Look for the consistent pattern over several weeks.`,
      coachNotes:
        'Teach parents relaxed observation. Observation is about witnessing growth, not interrogating children.',
      quiz: {
        id: 'quiz-m6-l08',
        lessonId: 'ecd-m6-l08',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q08',
            prompt:
              'How should parents and educators observe developmental milestones in everyday life?',
            options: [
              'By setting up tense weekly flashcard exams.',
              'Naturally and casually during everyday routines (eating, dressing, playing, walking), focusing on patterns over weeks and months.',
              'By hiring private investigators.',
              'By keeping children in isolation so they concentrate.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Developmental observation is best conducted naturally during everyday routines, looking at broad progress over weeks rather than day-to-day fluctuations.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l09',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '9. Developmental Monitoring vs. Screening vs. Diagnosis',
      order: 9,
      hasVideo: false,
      content: `To navigate the healthcare system effectively, families and educators must understand three distinct developmental tiers:

### Tier 1: Developmental Monitoring (Surveillance)
- **Who does it:** Parents, grandparents, daycare teachers, and primary healthcare nurses.
- **What it is:** Ongoing, informal observation of milestones during everyday life and routine clinic check-ups.
- **Goal:** Celebrating milestones and spotting emerging questions early.

### Tier 2: Developmental Screening
- **Who does it:** Healthcare providers, pediatric nurses, or trained early childhood specialists.
- **What it is:** A formal, standardized check using validated screening instruments (such as the *Ages and Stages Questionnaires [ASQ-3]* or *PEDS*).
- **AAP Guidelines:** Recommended for **all** children at **9, 18, and 30 months**, with dedicated autism screening at 18 and 24 months.
- **Crucial Note:** **Screening is NOT a diagnosis.** It simply identifies children who warrant a deeper look.

### Tier 3: Comprehensive Developmental Evaluation
- **Who does it:** Developmental pediatricians, child neurologists, speech pathologists, and child psychologists.
- **What it is:** An in-depth clinical assessment to diagnose specific conditions (e.g., developmental coordination disorder, speech delay, autism spectrum disorder) and create targeted intervention plans.`,
      coachNotes:
        'Clarify the triad: Monitoring (ongoing watching) -> Screening (formal tool check) -> Evaluation (specialist diagnosis).',
      quiz: {
        id: 'quiz-m6-l09',
        lessonId: 'ecd-m6-l09',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q09',
            prompt:
              'What is the fundamental difference between developmental monitoring and developmental screening?',
            options: [
              'Monitoring is ongoing informal observation by caregivers; screening is a formal process using validated tools by qualified professionals.',
              'Monitoring is a surgery; screening is a blood test.',
              'Screening is only for adults; monitoring is for newborns.',
              'There is no difference between the two.',
            ],
            correctAnswerIndex: 0,
            explanation:
              'Monitoring is continuous informal observation by caregivers. Screening is a structured, standardized check using validated tools to determine if formal evaluation is needed.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l10',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '10. When Should Caregivers Be Concerned? (Red Flags & Regression)',
      order: 10,
      hasVideo: false,
      content: `While minor delays in a single skill are often benign, certain patterns demand prompt professional medical attention:

### When to Seek Clinical Consultation
1. **Consistent Absence of Major Milestones:** The child does not demonstrate multiple skills that 75%+ of peers achieve easily.
2. **Stagnation Over Time:** The child shows zero developmental progress across 2 to 3 months of observation.
3. **Multiple Domains Impaired:** Delays span communication, motor coordination, and social interaction simultaneously.
4. **Functional Impairment:** The delay significantly hinders daily activities (eating, communicating hunger or pain, sleeping, playing).
5. **Persistent Parental Worry:** When a primary caregiver senses an ongoing concern, research shows parental intuition is highly predictive of genuine developmental needs.

---

### The #1 Urgent Clinical Red Flag: Developmental Regression
> **REGRESSION IS NEVER NORMAL:** If a child had words and stopped speaking, or was making eye contact, smiling, and walking, and suddenly stops doing so—**seek immediate medical and neurological evaluation**. Skill loss is never a "phase" to wait out!`,
      coachNotes:
        'Emphasize that developmental regression (losing previously mastered skills) is always an urgent red flag requiring prompt medical review.',
      quiz: {
        id: 'quiz-m6-l10',
        lessonId: 'ecd-m6-l10',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q10',
            prompt:
              'A 2-year-old child was previously saying 15 words and pointing to request objects, but over the past month has stopped speaking words and avoids eye contact. What should the caregiver do?',
            options: [
              'Wait a year to see if the child grows out of it.',
              'Assume the child is being stubborn and scold them.',
              'Seek prompt professional medical and developmental evaluation; developmental regression should never be ignored.',
              'Switch to feeding the child only herbal teas.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Developmental regression (loss of previously mastered words or social engagement) is a serious clinical red flag requiring prompt medical evaluation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l11',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '11. Practical Action Steps When You Have Developmental Concerns',
      order: 11,
      hasVideo: false,
      content: `If you suspect a child has a developmental delay, panic is unhelpful—structured action makes all the difference:

### The 6-Step Action Protocol
1. **Document Concrete Observations:** Write down specific skills the child struggles with, noting dates, times, and context (*"Samuel turns head away when called by name; does not point at birds"*).
2. **Rule Out Hearing & Vision First:** An undetected ear infection, chronic fluid in the middle ear, or visual impairment can mimic language and motor delays!
3. **Avoid the "Wait and See" Trap:** Well-meaning relatives often say *"He will grow out of it."* Early intervention during the first 3 years of life capitalizes on the brain's highest neuroplasticity.
4. **Schedule a Dedicated Well-Child Visit:** Tell the clinic: *"I have specific developmental questions regarding my child’s speech and coordination."*
5. **Request a Validated Screening:** Ask the doctor or nurse to administer a standardized developmental screening (e.g., ASQ-3).
6. **Enrich Daily Interactions at Home:** Continue talking, singing, reading, and practicing responsive serve-and-return caregiving while awaiting evaluations.`,
      coachNotes:
        'Encourage parents to advocate for their child constructively with written notes and to always check hearing when speech is delayed.',
      quiz: {
        id: 'quiz-m6-l11',
        lessonId: 'ecd-m6-l11',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q11',
            prompt:
              'What is the very first physical health check that should be conducted whenever a child shows unexplained speech or language delay?',
            options: [
              'An expensive brain scan.',
              'A professional hearing evaluation to rule out hearing loss or chronic middle ear fluid.',
              'A blood transfusion.',
              'A dental extraction.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Hearing is fundamental to speech acquisition. Chronic ear fluid or mild hearing loss frequently causes reversible speech delay and must be assessed first.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l12',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '12. African Family Case Study: Chidi and the "Late Talker"',
      order: 12,
      hasVideo: false,
      content: `### Clinical Case Scenario
**Chidi** is 2½ years old and lives with his family in Enugu, Nigeria. He is physically robust, runs, climbs, and understands family commands (*"Bring the cup," "Where is your shoe?"*). He uses gestures, pointing, and nods effectively. However, Chidi speaks only 4 single words (*"mama," "dada," "car," "no"*).

Chidi's mother is worried. When she shares her concern, a well-meaning relative declares:
> *"Don't worry! Boys always talk late in our family. My first son didn't say a word until age 3, and today he is an engineer. Chidi will just grow out of it."*

---

### Case Analysis & Clinical Findings
1. **Is the "boys always talk late" myth accurate?**
   - **No.** While slight statistical variations exist, the idea that boys routinely talk late is a harmful cultural myth. Dismissing concerns based on gender delays timely early intervention.
2. **Looking at the Whole Child:**
   - Chidi has strong receptive language (understands instructions), good gross motor skills, and social engagement. His challenge is strictly isolated expressive vocabulary.
3. **What Should Chidi's Mother Do?**
   - Have Chidi's hearing evaluated by a healthcare professional.
   - Seek a formal developmental screening from a pediatrician.
   - Avoid waiting passively for another year; early speech-language therapy yields dramatic improvements.`,
      coachNotes:
        'Debunk the myth that boys always talk late. Emphasize that evaluating the whole child prevents panic while ensuring timely support.',
      quiz: {
        id: 'quiz-m6-l12',
        lessonId: 'ecd-m6-l12',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q12',
            prompt:
              'In Chidi’s case study in Enugu, Nigeria, why is the relative’s advice that "boys always talk late" problematic?',
            options: [
              'Because boys always talk earlier than girls.',
              'Because relying on gender stereotypes can cause families to ignore genuine language delays, missing the critical window for early intervention.',
              'Because 2-year-olds should never speak words.',
              'Because relatives are always legally responsible for medical diagnoses.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Assuming "boys always talk late" delays identification and early support for children who have genuine expressive language delays.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l13',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '13. Practical Activity: The "Observe, Don\'t Compare" Tool',
      order: 13,
      hasVideo: false,
      content: `Use this educational observation exercise to map a child’s progress across all four domains during natural everyday routines:

### The 4-Domain Observation Framework
| Domain | What Did I Observe? | What Can the Child Do? | What Is the Child Practicing? |
| :--- | :--- | :--- | :--- |
| **Social-Emotional** | Smiles at greeting; plays near cousins; pats a crying toddler. | Shows comfort; engages socially; displays early empathy. | Building friendships; turn-taking; emotional expression. |
| **Communication** | Points at airplane; says *"big bird"*; follows *"bring your shoes."* | Communicates desires; understands 1-step commands. | Expanding vocabulary; combining words into sentences. |
| **Cognitive** | Stacks 5 cups; looks under blanket for toy; pretends stick is a horse. | Solves simple physical puzzles; understands object permanence. | Cause-and-effect reasoning; symbolic imagination. |
| **Physical/Motor** | Walks alone; kicks ball; uses thumb and finger to pick up groundnuts. | Moves independently; grasps small objects with control. | Balance; coordination; fine pincer grasp precision. |

---

### Guidelines for Success
- **Celebrate Strengths First:** Document what the child enjoys and accomplishes before listing challenges.
- **Scaffold Gradually:** If a child is practicing a skill, provide gentle assistance without taking over the task.
- **Track Over 4 to 8 Weeks:** Observe trajectory over time to verify healthy forward momentum.`,
      coachNotes:
        'Walk through the observation table. It gives parents and teachers a structured, empowering way to document progress.',
      quiz: {
        id: 'quiz-m6-l13',
        lessonId: 'ecd-m6-l13',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q13',
            prompt:
              'What is the primary benefit of using the "Observe, Don’t Compare" framework with young children?',
            options: [
              'It provides an objective, holistic view of the child’s individual strengths and emerging skills across all domains without competitive anxiety.',
              'It proves which children in a neighborhood are superior.',
              'It replaces the need for any pediatrician or nurse.',
              'It forces toddlers to sit still for 8 hours.',
            ],
            correctAnswerIndex: 0,
            explanation:
              'The framework focuses on observing the whole child in their natural environment, highlighting strengths and emerging skills without unhealthy comparison.',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l14',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '14. 10 Common Mistakes Adults Make Regarding Milestones',
      order: 14,
      hasVideo: false,
      content: `Awareness of these 10 frequent misconceptions helps caregivers maintain balanced, supportive developmental surveillance:

1. **Treating Milestone Ages as Deadlines:** Believing a child who isn't walking at 12 months is delayed (walking range is 9–15 months!).
2. **Comparing Siblings & Neighbors:** Assuming the second child must reach milestones on the same month as the firstborn.
3. **Believing Social Media Perfection:** Measuring real toddlers against edited, precocious video clips online.
4. **Relying on Gender Stereotypes:** Excusing delayed speech with *"boys always talk late."*
5. **Ignoring Parental Intuition:** Suppressing real worries because relatives say *"they will grow out of it."*
6. **Panicking Over an Isolated Skill:** Believing one missed milestone signifies a neurological disorder.
7. **Confusing Checklists with Diagnosis:** Attempting to diagnose autism or ADHD from a magazine or internet checklist.
8. **Overlooking Hearing & Physical Health:** Forgetting that ear infections or poor vision can mimic developmental delays.
9. **Ignoring Skill Regression:** Failing to seek immediate medical help when a child loses previously mastered speech or motor skills.
10. **Focusing Exclusively on Deficits:** Forgetting to celebrate the child’s vibrant unique strengths and curiosity!`,
      coachNotes:
        'Review the 10 common mistakes. Reinforce that milestone checklists are screening guides, never diagnostic verdicts.',
      quiz: {
        id: 'quiz-m6-l14',
        lessonId: 'ecd-m6-l14',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q14',
            prompt:
              'Which of the following represents a widespread mistake adults make regarding developmental milestones?',
            options: [
              'Treating milestone ages as strict, inflexible deadlines rather than general observation ranges.',
              'Observing children during natural playtime.',
              'Reading picture books with toddlers daily.',
              'Consulting a pediatrician when developmental skills are lost.',
            ],
            correctAnswerIndex: 0,
            explanation:
              'Treating milestone ages as rigid deadlines creates immense false anxiety. Milestones represent broad statistical ranges (~75%+ benchmark).',
          },
        ],
      },
    },
    {
      id: 'ecd-m6-l15',
      moduleId: 'ecd-m6',
      programId: 'ecd-cert',
      title: '15. Key Takeaways & Clinical Summary',
      order: 15,
      hasVideo: false,
      content: `### Summary of Core Principles
1. **Milestones are Guides, Not Deadlines:** They describe skills that ~75% or more of children accomplish by a certain age.
2. **Four Connected Domains:** Physical, cognitive, communication, and social-emotional growth occur simultaneously and support one another.
3. **Embrace Natural Variation:** Human children develop at unique rates. Variation is normal, healthy, and expected.
4. **Never Compare:** Evaluate a child against their own developmental trajectory, not against siblings, cousins, or internet standards.
5. **Multilingualism is an Asset:** In dual-language children, always assess total conceptual vocabulary across all spoken languages.
6. **Three-Tier System:** Developmental monitoring (daily observation) → Developmental screening (standardized tools at 9, 18, 30 months) → Diagnostic evaluation (specialist assessment).
7. **Regression is an Emergency:** Loss of previously acquired skills must always be evaluated by a healthcare professional immediately.
8. **Early Action Transforms Outcomes:** If you have persistent concerns, do not wait. Early intervention leverages maximum early brain plasticity.

---

### Professional Disclaimer
*This module is educational and provides general guidance on developmental milestones in children aged 0–5 years. It does not provide medical diagnoses. Caregivers should consult a licensed pediatrician or early intervention specialist if persistent concerns or skill regressions occur.*`,
      coachNotes:
        'Congratulate the learner on completing Module 6: Developmental Milestones. Encourage them to review all four domains and complete the knowledge check.',
      quiz: {
        id: 'quiz-m6-l15',
        lessonId: 'ecd-m6-l15',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm6-q15',
            prompt:
              'A parent has persistent concerns about their toddler’s development, but neighbors advise them to "just wait and ignore it." What is the best course of action?',
            options: [
              'Ignore the concerns permanently.',
              'Observe, document specific examples, and discuss the concerns with a healthcare provider, asking about a validated developmental screening.',
              'Lock the child in their room.',
              'Compare the child to 10 other children on social media.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Parental intuition is valuable. Documenting concrete observations and requesting a validated screening from a healthcare provider ensures timely, evidence-based care.',
          },
        ],
      },
    },
  ],
};
