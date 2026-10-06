import { CourseModule } from '../types/studentPortal';

export const MODULE_10_RECOGNIZING_DEVELOPMENTAL_CONCERNS: CourseModule = {
  id: 'ecd-m10',
  programId: 'ecd-cert',
  title: '10. Recognizing Developmental Concerns',
  order: 10,
  description:
    'Learn how to observe child development calmly and objectively, distinguish normal developmental variation from persistent concerns, identify domain-specific red flags and skill regressions, and communicate effectively with families and healthcare professionals.',
  glossary: [
    {
      term: 'Developmental milestone',
      definition:
        'A developmental skill that most children (typically at least 75%) can perform by a certain age, such as walking, pointing, using two-word phrases, or following simple routines. Milestones serve as observation guides, not diagnostic tests.',
    },
    {
      term: 'Developmental concern',
      definition:
        'An observation that a child may need closer attention, additional support, standardized screening, or professional evaluation. A concern is not a diagnosis; it is a reason to observe, record, and seek guidance.',
    },
    {
      term: 'Developmental variation',
      definition:
        'The natural, healthy range of speeds and individual styles in which children acquire skills while maintaining steady forward progress over time.',
    },
    {
      term: 'Developmental regression',
      definition:
        'The loss of previously acquired, consistently demonstrated skills (such as words, gestures, eye contact, walking, or self-feeding). Regression is a clinical red flag requiring prompt medical evaluation.',
    },
    {
      term: 'Developmental monitoring (Surveillance)',
      definition:
        'The ongoing, active process through which parents, caregivers, and early educators notice and track how a child grows, learns, communicates, and plays in everyday settings.',
    },
    {
      term: 'Developmental screening',
      definition:
        'A formal, standardized, and validated assessment tool (such as ASQ-3, M-CHAT-R/F, or PEDS) administered at key age intervals to determine whether formal diagnostic evaluation is warranted.',
    },
    {
      term: 'Professional developmental assessment',
      definition:
        'A comprehensive diagnostic evaluation conducted by qualified multidisciplinary healthcare specialists (pediatrician, neurologist, speech-language pathologist, child psychologist) to identify specific developmental needs and formulate an intervention plan.',
    },
    {
      term: 'Objective observation',
      definition:
        'A factual, neutral record describing visible actions, spoken words, timing, and environmental context without subjective labeling, guesswork, or emotional judgment.',
    },
    {
      term: 'Corrected age',
      definition:
        'The chronological age of a child born prematurely minus the number of weeks or months they were born early. Used by healthcare professionals when tracking developmental milestones during the first two to three years of life.',
    },
    {
      term: 'Co-regulation',
      definition:
        'The supportive, warm process through which a calm adult helps an infant or young child soothe their distressed nervous system and regain emotional equilibrium.',
    },
    {
      term: 'Red flag',
      definition:
        'A specific clinical observation or persistent developmental pattern that strongly warrants prompt referral to a healthcare professional.',
    },
    {
      term: 'Neurodiversity',
      definition:
        'The recognition that human brains naturally develop and function in diverse ways, including autism, ADHD, and specific learning profiles, requiring supportive accommodations rather than stigmatization.',
    },
  ],
  references: [
    {
      title: 'Centers for Disease Control and Prevention (CDC). "Learn the Signs. Act Early." Milestone Checklists.',
      url: 'https://www.cdc.gov/act-early/milestones/index.html',
    },
    {
      title: 'American Academy of Pediatrics (AAP). Promoting Optimal Development: Identifying Infants and Young Children with Developmental Delays Through Developmental Surveillance and Screening.',
      url: 'https://publications.aap.org/pediatrics/article/145/1/e20193449/36971/Promoting-Optimal-Development-Identifying-Infants',
    },
    {
      title: 'World Health Organization (WHO). Standards for Improving Quality of Care for Children and Young Adolescents in Health Facilities.',
      url: 'https://www.who.int/publications/i/item/9789241514040',
    },
    {
      title: 'National Institute for Health and Care Excellence (NICE). Suspected Neurological Conditions in Children and Young People (NG127).',
      url: 'https://www.nice.org.uk/guidance/ng127',
    },
    {
      title: 'American Speech-Language-Hearing Association (ASHA). Childhood Communication Milestones and Hearing Evaluation Pathways.',
      url: 'https://www.asha.org/public/speech/development/',
    },
  ],
  lessons: [
    {
      id: 'ecd-m10-l01',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '1. What Are Developmental Concerns? Milestones vs. Real Concerns',
      order: 1,
      hasVideo: false,
      content: `> **Clinical Perspective:** Children grow and develop in wonderfully diverse ways. Some begin talking earlier, while others walk first. Some children are cautious with gross motor challenges, while others climb fearlessly. These differences do not automatically mean that anything is wrong.
>
> At the same time, adults who observe children regularly may notice patterns that warrant closer attention. **A developmental concern is not a diagnosis. It is a reason to observe, record, ask respectful questions, and seek professional guidance.**

### What Is Child Development?
Child development is the gradual process through which children acquire skills, neurological connections, social understanding, and functional independence across five interconnected domains:
1. **Physical and Motor:** Gross motor mobility (crawling, walking, jumping) and fine motor dexterity (pincer grasp, spoon use).
2. **Language and Communication:** Receptive comprehension, gestures, sounds, words, signs, and spoken discourse.
3. **Cognitive Development:** Attention, memory, spatial exploration, cause-and-effect reasoning, and imagination.
4. **Social and Emotional:** Bonding with caregivers, cooperative play, expressing feelings, and accepting co-regulation.
5. **Everyday Adaptive Functioning:** Feeding, dressing, toileting, and participating in family routines.

### What Is a Developmental Milestone?
A **developmental milestone** is a skill that most children (at least 75% in CDC guidelines) can perform by a given age.
- Milestones serve as **helpful observational guides** to stimulate discussion.
- Milestones are **not intelligence tests, moral standards, or clinical diagnoses**.
- A child who has not reached one single milestone on an exact day is not automatically disordered or delayed.

### Developmental Variation vs. Genuine Concern
| Dimension | Normal Developmental Variation | Possible Developmental Concern |
| :--- | :--- | :--- |
| **Pace of Growth** | Reaches a skill somewhat earlier or later than peers, but makes steady progress over time. | Progress has stopped, slowed markedly, or moved backwards (regression). |
| **New Settings** | Shy when first entering a new classroom, but gradually relaxes and explores over weeks. | Remains persistently unable to engage or communicate across familiar settings after months. |
| **Multilingualism** | Uses fewer English words, but communicates richly across home languages with gestures. | Has persistent difficulty communicating needs across all languages and methods. |
| **Motor Skills** | Needs extra practice with stairs or buttons, but enjoys active movement. | Has persistent asymmetry (using only one side), stiffness, or weakness that limits everyday play. |
| **Tantrums** | Tantrums when tired, hungry, or frustrated, but calms with familiar adult co-regulation. | Severe, prolonged meltdowns that repeatedly prevent basic routines, safety, or family functioning. |`,
      coachNotes:
        'Welcome learners to Module 10. Emphasize that noticing a concern is not diagnosing—it is the first step toward objective observation and timely support.',
      quiz: {
        id: 'quiz-m10-l01',
        lessonId: 'ecd-m10-l01',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q01',
            prompt: 'Which statement best describes a developmental concern in early childhood?',
            options: [
              'Definitive proof that a child has an incurable neurological disorder.',
              'A reason to observe carefully, document specific examples, ask respectful questions, and seek professional guidance.',
              'An emergency label that early childhood teachers should announce publicly to other parents.',
              'An automatic signal that a child should be separated from all peer activities.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'A developmental concern is an observation that a child may benefit from closer attention, screening, or professional evaluation. It is never a formal diagnosis.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l02',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '2. Observing Development Calmly Without Creating Fear',
      order: 2,
      hasVideo: false,
      content: `The way adults observe and communicate developmental concerns has a profound impact on families. Approaching observations with panic, blame, or rushed internet labels causes overwhelming anxiety. A calm, objective, strengths-based approach builds trust and leads to timely support.

### Your Professional Role as an Observer
As an educator, parent, or community health worker, your responsibility is to:
1. **Notice Strengths First:** Always observe what the child enjoys, their unique talents, and what helps them participate.
2. **Focus on Everyday Context:** Observe what happens in natural routines—meals, outdoor play, storytime, and departures.
3. **Document Objectively:** Record visible actions and actual words rather than subjective interpretations.
4. **Communicate Privately and Respectfully:** Share factual notes with the primary caregiver in confidence.
5. **Encourage Qualified Guidance:** Refer to clinic nurses, pediatricians, or developmental specialists when patterns persist.

### Subjective Interpretations vs. Objective Documentation
Objective notes describe exactly what was observed without guessing motivations or applying labels:

| Less Useful / Subjective Statement | More Useful / Objective Clinical Documentation |
| :--- | :--- |
| *"The child does not speak."* | *"During the 3-hour morning session, Musa used two spoken words ('mama' and 'ball'). He pointed to the water jug and pulled an adult's hand to request a drink."* |
| *"She ignores people completely."* | *"When two familiar educators called Amina's name during snack time, she did not turn. When shown her favorite yellow drum, she looked up and smiled."* |
| *"He is aggressive and naughty."* | *"During outdoor play, Kofi pushed another child twice when both reached for the same tricycle. He cried when the tricycle was removed."* |
| *"She cannot understand anything."* | *"Chioma followed the routine 'put cup in bin' after watching peers, but did not respond when the verbal request was given without visual gestures."* |
| *"He is clumsy."* | *"Emeka fell three times while running on uneven grassy ground and held the handrail with both hands when ascending steps."* |

### A Simple 6-Point Observation Record
To prepare notes for a healthcare visit, document:
- **Date & Time:** When did the event occur?
- **Setting & Activity:** What was happening (lunch, circle time, free play)?
- **Specific Child Action:** Exactly what did the child do, say, or gesture?
- **Preceding Event:** Was the room noisy, was the child fatigued, or was there an unfamiliar visitor?
- **What Helped:** Did a visual cue, demonstration, or quiet space assist?
- **Child's Strength:** What did the child accomplish successfully?`,
      coachNotes:
        'Teach learners how to transform subjective labels (e.g., "aggressive", "lazy", "ignores people") into neutral, objective behavioral descriptions.',
      quiz: {
        id: 'quiz-m10-l02',
        lessonId: 'ecd-m10-l02',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q02',
            prompt: 'Which of the following represents the most objective and helpful developmental observation note?',
            options: [
              '“Kemi is lazy and never listens during group activities.”',
              '“Kemi clearly has a severe emotional and sensory disorder.”',
              '“During a 15-minute story session, Kemi left her seat three times; she returned when shown the pictures in the book.”',
              '“Kemi is far behind all the other well-behaved children in the class.”',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Objective documentation states the factual setting, exact duration, visible action, and what support helped, without subjective labels or amateur diagnostic speculation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l03',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '3. Warning Signs: Physical & Motor Development',
      order: 3,
      hasVideo: false,
      content: `Physical and motor development encompasses the neuromuscular coordination of gross movements (large body posture) and fine motor dexterity (hand and finger coordination).

### Gross Motor Warning Signs Requiring Discussion
Consult a healthcare professional if you observe:
- **Persistent Tone Abnormalities:** A baby who feels unusually rigid/stiff (hypertonic) or persistently limp/floppy (hypotonic) when lifted.
- **Asymmetry:** Consistent preference for one side of the body before 12 months (e.g., reaching exclusively with the right hand while the left fist remains clenched; dragging one leg while crawling).
- **Delayed Postural Control:** Not holding head steady by 4 months; unable to sit unsupported by 9 months.
- **Delayed Independent Mobility:** Not pulling to stand by 12 months; not walking independently by 18 months.
- **Persistent Balance Deficits:** Frequent falling, staggering, or inability to navigate level surfaces after walking has been established for months.
- **Sudden Gait Change:** **A new or sudden loss of walking ability, sudden limping, or acute muscular weakness (NICE guideline: warrants urgent medical assessment).**

### Fine Motor Warning Signs
- Persistent difficulty bringing hands to midline or mouth after 4 months.
- Inability to grasp and release toys voluntarily by 9 months.
- Difficulty using both hands together to explore objects by 12 months.
- Persistent inability to manipulate a spoon or pick up finger foods using a pincer grasp by 18 months.
- Extreme difficulty or tremor when attempting to grasp utensils, crayons, or clothing fasteners by age 3.

### Age-Appropriate Motor Expectations (CDC)
- **By Age 2:** Most toddlers can run, kick a ball forward, walk up a few steps, and eat with a spoon.
- **By 30 Months:** Many children can jump with both feet leaving the ground simultaneously and turn book pages one by one.
- **By Age 3:** Most children can pedal a tricycle, put on some loose clothing, and copy a drawn circle.`,
      coachNotes:
        'Highlight that sudden changes in walking or acute asymmetry are medical priorities requiring prompt physician review.',
      quiz: {
        id: 'quiz-m10-l03',
        lessonId: 'ecd-m10-l03',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q03',
            prompt: 'A 3-year-old child who has walked steadily for over a year suddenly develops a noticeable limp and new walking difficulty. What is the recommended course of action?',
            options: [
              'Wait six months to see if the child outgrows it naturally.',
              'Tell the parents that the child is simply being stubborn and attention-seeking.',
              'Encourage immediate medical evaluation by a healthcare professional, as new-onset gait changes require timely clinical investigation.',
              'Use an internet search forum to self-prescribe physical therapy exercises.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'A sudden loss of walking ability or new-onset limp is an acute medical priority that requires timely clinical evaluation to rule out injury, infection, or neurological conditions.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l04',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '4. Warning Signs: Language, Speech & Social Communication',
      order: 4,
      hasVideo: false,
      content: `Communication is vastly broader than clear spoken English. It includes eye contact, facial expressions, vocal inflections, pointing, showing, gesturing, and communication across all home languages.

### Receptive Language Warning Signs (Understanding)
Receptive language always precedes expressive speech. Difficulties with comprehension are often more clinically significant than delayed spoken words:
- **No Response to Sounds or Name:** Does not turn toward familiar voices, loud noises, or their own name by 9–12 months (**always check hearing first!**).
- **Difficulty Following Simple Routine Requests:** Unable to understand familiar everyday requests (*"Give to mama"*, *"Bring your shoes"*) with gestures by 18 months.
- **Lack of Comprehension Without Gestures:** At age 2, completely unable to follow simple commands unless accompanied by exaggerated physical pointing.

### Expressive Communication Warning Signs
- **Absence of Babbling:** No consonant-vowel babbling (*"ba-ba"*, *"da-da"*) by 9–10 months.
- **Absence of Communicative Gestures:** Not pointing, waving goodbye, or showing objects to adults by 12–15 months.
- **Fewer Than 6 Spoken Words:** By 18 months, using fewer than 6 recognizable words across all languages.
- **No Two-Word Phrases:** Not spontaneously combining two meaningful words (e.g., *"more milk"*, *"daddy go"*, excluding echolalia) by 24 months.
- **Persistent Unintelligibility:** Familiar caregivers cannot understand more than 50% of the child’s speech at age 2, or more than 75% at age 3.

### Social Communication Warning Signs
- **Limited Joint Attention:** Does not follow a caregiver’s pointing finger or look back and forth between an object and an adult’s face to share interest.
- **Infrequent Social Smiling or Shared Joy:** Limited reciprocal smiling or playful back-and-forth vocal games.
- **Extreme Frustration:** Repeated severe distress because the child cannot communicate basic needs.`,
      coachNotes:
        'Reinforce the golden rule: Whenever language is delayed, hearing must always be formally tested first.',
      quiz: {
        id: 'quiz-m10-l04',
        lessonId: 'ecd-m10-l04',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q04',
            prompt: 'When an 18-month-old child has few spoken words and does not respond consistently to their name, what clinical evaluation should always be conducted first?',
            options: [
              'An immediate formal IQ intelligence test.',
              'A comprehensive hearing screening or pediatric audiological assessment.',
              'An automatic MRI brain scan.',
              'Forced oral elocution lessons.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'A formal hearing assessment is mandatory whenever speech or language is delayed, because undetected chronic fluid or hearing loss directly impedes language acquisition.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l05',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '5. Warning Signs: Cognitive, Social & Emotional Domains',
      order: 5,
      hasVideo: false,
      content: `Cognitive and socio-emotional development form the foundation of a child's ability to think, adapt, connect with human beings, and regulate physiological stress.

### Cognitive Warning Signs
- **Absence of Object Permanence:** Does not search for an object that is hidden under a blanket in their presence by 10–12 months.
- **Very Limited Exploration:** Shows no curiosity or tactile interest in exploring objects, containers, or toys by 12–15 months.
- **Lack of Functional Object Use:** Does not understand the everyday purpose of familiar items (e.g., spoon for eating, comb for hair, phone to ear) by 18 months.
- **Absence of Pretend Play:** No symbolic imitation (feeding a doll, rolling a block like a car) by 24 to 30 months.
- **Difficulty Learning Simple Routines:** Inability to grasp familiar daily sequences despite repeated, patient adult demonstrations.

### Social and Emotional Warning Signs
- **Inability to Form Secure Attachments:** Shows no preference for familiar caregivers over complete strangers, or exhibits extreme withdrawal and avoids eye contact when seeking comfort.
- **Persistent Inconsolability:** Meltdowns lasting hours where the child cannot be soothed by familiar adult presence, warm touch, or soothing voice.
- **Severe Emotional Lability:** Rapid, unpredictable swings into panic, terror, or intense aggression that repeatedly prevent peer play or family meals.
- **Total Peer Disengagement:** Showing zero awareness of or interest in other children by age 3, even in parallel play settings.

### Differentiating Temperament from Clinical Concerns
- **Shy / Cautious Temperament:** Needs time to warm up to new situations, stays close to parents initially, but gradually joins activities and communicates happily once comfortable.
- **Clinical Concern:** Disengagement or severe distress is persistent, pervasive across all settings, and does not improve with familiarity or caregiver buffering.`,
      coachNotes:
        'Differentiate between healthy introverted temperament and persistent socio-emotional disengagement that impedes daily functioning.',
      quiz: {
        id: 'quiz-m10-l05',
        lessonId: 'ecd-m10-l05',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q05',
            prompt: 'Which scenario illustrates a healthy temperamental difference rather than a developmental concern?',
            options: [
              'A 3-year-old who has never shown curiosity about toys or human faces in their entire life.',
              'A toddler who is hesitant and clings to their parent for 15 minutes in a new playgroup, but gradually relaxes and plays happily.',
              'A child who has stopped recognizing their family members.',
              'A child who screams uncontrollably for 4 hours every day without any trigger.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Cautious temperament with initial hesitation that resolves as the child becomes familiar is a normal variation, unlike persistent withdrawal or loss of skills.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l06',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '6. Loss of Previously Acquired Skills (Developmental Regression)',
      order: 6,
      hasVideo: false,
      content: `> **CRITICAL CLINICAL PRINCIPLE:** **Developmental regression**—the actual loss of a skill that a child had previously mastered and used consistently—is the most urgent red flag in early childhood developmental surveillance.
>
> While slow skill acquisition may reflect normal variation, the true regression of speech, motor skills, social interaction, or self-care requires **prompt professional evaluation**.

### Examples of Developmental Regression
- **Language Loss:** A child who previously spoke 15 distinct words and combined them into phrases stops speaking words and only hums or grunts.
- **Social Loss:** A child who previously waved goodbye, pointed to animals, and looked into parents' eyes stops making eye contact and withdraws from social interaction.
- **Motor Loss:** A child who walked independently for months suddenly becomes unsteady, stumbles constantly, or reverts to crawling.
- **Self-Care Loss:** A toddler who successfully fed themselves with a spoon loses hand dexterity and can no longer grasp utensils.

### Slow Progress vs. True Regression
| Characteristic | Slow Developmental Progress | True Developmental Regression |
| :--- | :--- | :--- |
| **Skill Velocity** | Skills emerge at a slower pace than peers, but the child continues gaining new abilities over time. | Skills that were mastered and used regularly for weeks or months disappear. |
| **Trajectory** | Steady forward progression. | Clear backward trend or sudden halt in functioning. |
| **Clinical Action** | Developmental monitoring, enriching stimulation, and screening. | **Prompt medical referral to a pediatrician or specialist.** |

### Temporary Stress-Related Behavior vs. True Regression
Children may temporarily become more clingy, wet their pants, or talk less during:
- Acute physical illness (fever, ear infection).
- Major family disruption (arrival of a new baby sibling, bereavement, parental separation).
- Starting a new childcare program or moving homes.

*However, if the loss of words, gestures, eye contact, or walking persists beyond recovery from illness, do not wait and assume it is temporary. Encourage prompt medical consultation.*`,
      coachNotes:
        'Emphasize that developmental regression is always a reason for timely professional evaluation—never dismiss a true loss of skills.',
      quiz: {
        id: 'quiz-m10-l06',
        lessonId: 'ecd-m10-l06',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q06',
            prompt: 'Why does developmental regression (loss of previously mastered words, gestures, or walking) require prompt professional evaluation?',
            options: [
              'Because regression is completely normal and happens to every child every month.',
              'Because loss of established skills can be a sign of underlying neurological, medical, sensory, or developmental conditions that require timely investigation.',
              'Because children who lose words are simply being disobedient.',
              'Because regression means the child should immediately be placed on medication without seeing a doctor.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Loss of previously mastered skills can indicate underlying neurological, metabolic, or developmental conditions, making prompt medical assessment essential.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l07',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '7. When Multiple Concerns Occur Together',
      order: 7,
      hasVideo: false,
      content: `In early childhood, an isolated difference in one area often resolves with time and practice. However, when **concerns appear across multiple developmental domains simultaneously**, the likelihood of a genuine developmental delay increases substantially.

### Common Multi-Domain Concern Patterns
1. **Communication + Social Interaction + Play:**
   - *Observations:* Few spoken words, does not point to share interest, avoids eye contact, and does not engage in pretend play with peers.
   - *Why Discussion Is Needed:* This constellation warrants comprehensive evaluation for speech-language delay, hearing deficits, or autism spectrum conditions.
2. **Gross Motor + Fine Motor + Feeding:**
   - *Observations:* Struggles to balance while walking, drops toys constantly, cannot hold a spoon, and chokes frequently during feeding.
   - *Why Discussion Is Needed:* Points toward underlying neuromuscular tone abnormalities, cerebral palsy, or sensory-motor coordination disorders.
3. **Language Delay + Poor Response to Sound + Chronic Ear Discomfort:**
   - *Observations:* Speech is absent or muffled; the child does not turn when called from behind; family reports frequent colds or ear pulling.
   - *Why Discussion Is Needed:* Highlights potential conductive hearing loss due to chronic middle ear fluid (otitis media with effusion).

### The "Whole-Child" Evaluation Framework
When analyzing multi-domain patterns, ask these whole-child questions:
- *What can the child do with confidence and joy?*
- *When did the pattern first emerge?*
- *Is the pattern visible in both the home and classroom settings?*
- *Has there been any illness, hearing issue, vision problem, or chronic pain?*
- *What specific supports (visual cues, quiet spaces, demonstrations) help the child participate?*`,
      coachNotes:
        'Teach learners to look for clusters of concerns across multiple areas rather than hyper-focusing on a single isolated quirk.',
      quiz: {
        id: 'quiz-m10-l07',
        lessonId: 'ecd-m10-l07',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q07',
            prompt: 'Which scenario represents a pattern of concern across multiple domains that warrants a comprehensive professional evaluation?',
            options: [
              'A toddler who spilled juice once during snack time.',
              'A 2-year-old with limited speech, rare use of pointing or gestures, difficulty understanding familiar instructions, and challenges participating in daily routines across both home and childcare.',
              'A child who fell asleep in the car on the way to the market.',
              'A preschooler who chose to draw with blue crayons instead of red.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'A cluster of concerns spanning speech, nonverbal gestures, receptive comprehension, and adaptive participation across multiple environments warrants comprehensive evaluation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l08',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '8. Factors That Can Affect Development (Hearing, Vision & Environment)',
      order: 8,
      hasVideo: false,
      content: `Before concluding that a child has a neurological or developmental condition, clinicians and educators must explore the foundational physiological and environmental factors that directly shape development.

### Biological and Sensory Factors
1. **Hearing:** Undetected fluctuating hearing loss (often from middle ear fluid) directly hinders speech clarity, auditory processing, attention, and social participation.
2. **Vision:** Undetected refractive errors or strabismus impair hand-eye coordination, balance, picture book recognition, and spatial navigation.
3. **Nutrition:** Iron deficiency anemia impairs myelination and memory; chronic protein-energy malnutrition causes fatigue and delays motor milestones.
4. **Sleep:** Fragmented or insufficient sleep leads to paradoxical hyperactivity, poor frustration tolerance, and impaired memory retention.
5. **Premature Birth:** Children born before 37 weeks must have milestones tracked using **corrected age** (chronological age minus weeks born early) during the first two to three years.

### Environmental, Cultural & Psychosocial Factors
- **Multilingual Language Environment:** Children exposed to two or more languages distribute words across both vocabularies. A bilingual child who speaks 20 words in Yoruba and 30 in English has a total conceptual vocabulary of 50 words! **Bilingualism never causes developmental delay.**
- **Opportunities for Practice:** A child who is constantly carried or kept in a stroller may take longer to master stairs simply because they have lacked physical practice.
- **Family Stress & Adversity:** Acute poverty, domestic violence, displacement, or parental depression induce toxic stress that suppresses early play and communication.

*Critical Clinical Principle: While these factors must always be evaluated, never assume an environmental factor fully explains away a significant, persistent developmental delay. Both must be assessed by qualified professionals.*`,
      coachNotes:
        'Remind students that growing up in a multilingual home is a cognitive asset, not a pathology, and explain the calculation of corrected age for premature infants.',
      quiz: {
        id: 'quiz-m10-l08',
        lessonId: 'ecd-m10-l08',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q08',
            prompt: 'A 2-year-old child in Lagos speaks fewer English words than peers, but uses 35 words in Yoruba at home, uses expressive gestures, follows commands in both languages, and is steadily learning new words. How should this be evaluated?',
            options: [
              'The family must immediately be told to stop speaking Yoruba entirely.',
              'This is normal multilingual variation; the child’s communication across all languages shows healthy conceptual development.',
              'The child must be diagnosed with severe developmental aphasia.',
              'Multilingual children should never be allowed in childcare.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Multilingual children naturally distribute vocabulary across languages. Assessing total communication and communicative intent reveals normal, healthy bilingual development.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l09',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '9. Surveillance, Screening & Professional Assessment',
      order: 9,
      hasVideo: false,
      content: `The path from noticing a concern to receiving support involves three distinct clinical tiers: **Developmental Monitoring (Surveillance)**, **Developmental Screening**, and **Professional Assessment**.

### Comparing the Three Tiers of Developmental Care
| Feature | Developmental Monitoring | Developmental Screening | Professional Assessment |
| :--- | :--- | :--- | :--- |
| **What is it?** | Ongoing tracking of milestones in daily life. | Standardized, validated checklist tool. | Comprehensive in-depth clinical evaluation. |
| **Who conducts it?** | Parents, educators, primary nurses. | Trained healthcare or early childhood staff. | Multidisciplinary pediatric specialists. |
| **When is it done?** | Continuously at home, school, and routine clinic visits. | At recommended age intervals (9, 18, 30 mo) or when concerns arise. | Triggered by positive screen or persistent concern. |
| **Tool Type** | Checklists, growth charts, observation notes. | Validated tools (ASQ-3, M-CHAT-R/F, PEDS). | Standardized diagnostic batteries, audiometry, clinical exams. |
| **Does it diagnose?** | **No.** | **No.** Identifies risk / need for referral. | **Yes.** Can diagnose and formulate treatment plans. |

### Official AAP Screening Schedule
The American Academy of Pediatrics recommends:
1. **Developmental Surveillance:** At every routine health supervision visit from infancy through early childhood.
2. **General Developmental Screening:** At **9 months, 18 months, and 30 months** of age using validated tools.
3. **Autism-Specific Screening:** At **18 months and 24 months** of age (using tools such as M-CHAT-R/F).
4. **Concern-Triggered Screening:** At any point a parent, educator, or clinician raises a concern, regardless of the child's age!`,
      coachNotes:
        'Explain the vital distinction between monitoring (ongoing), screening (formal validated check), and assessment (specialist diagnostic evaluation).',
      quiz: {
        id: 'quiz-m10-l09',
        lessonId: 'ecd-m10-l09',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q09',
            prompt: 'What is the primary difference between developmental monitoring and developmental screening?',
            options: [
              'Monitoring is ongoing informal observation in daily routines; screening uses a standardized, validated tool at specific intervals to determine if further evaluation is needed.',
              'Monitoring gives a permanent medical diagnosis; screening does not.',
              'Screening is only performed by parents at home with internet quizzes.',
              'There is no difference between monitoring and screening.',
            ],
            correctAnswerIndex: 0,
            explanation:
              'Monitoring is continuous tracking of milestones in everyday settings, whereas screening uses formal, validated tools to identify children who need comprehensive diagnostic evaluation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l10',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '10. What Should a Parent, Caregiver or Educator Do?',
      order: 10,
      hasVideo: false,
      content: `When a developmental concern arises, taking thoughtful, structured action early changes a child's developmental trajectory.

### Step-by-Step Practical Guidance for Parents
1. **Stay Calm & Avoid Blame:** A concern does not equal a diagnosis. Avoid internet worst-case scenarios, guilt, or blaming family members.
2. **Observe & Write Down Examples:** Keep a small notebook. Note what the child can do well, what is difficult, and when challenges happen.
3. **Check Sensory Foundations:** Schedule a routine hearing check and vision exam at your local clinic.
4. **Speak With Your Healthcare Provider:** Bring your written notes to your pediatrician, child health nurse, or primary clinic.
5. **Continue Responsive Everyday Play:** While waiting for appointments, do not stop interacting! Continue talking, singing, reading books, playing on the floor, and offering warm comfort.

---

### Professional Guidance for Educators and Childcare Workers
- **Document First:** Gather clear, factual, objective notes over several weeks across different activities.
- **Speak Privately with Caregivers:** Never discuss developmental concerns in front of other parents, children, or at the classroom door.
- **Begin with the Child’s Strengths:** Open the conversation with genuine warmth: *"We love having Tunde in our class; he is so gentle and loves watching toy cars."*
- **Ask What the Family Observes at Home:** *"We have noticed that Tunde uses few words here and sometimes gets frustrated trying to communicate. What do you notice at home?"*
- **Share Observations, Never Diagnoses:** Say: *"I noticed he does not turn when his name is called,"* never *"I think he has autism."*
- **Protect Confidentiality:** Never disclose a child's developmental observations to other parents or community members.`,
      coachNotes:
        'Coach learners on how to conduct empathetic, strengths-based parent conferences that build partnership rather than triggering defensiveness.',
      quiz: {
        id: 'quiz-m10-l10',
        lessonId: 'ecd-m10-l10',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q10',
            prompt: 'Which opening statement by an early childhood educator is most respectful and effective when discussing developmental concerns with a parent?',
            options: [
              '“Your child is severely delayed and will never succeed in primary school.”',
              '“There is nothing wrong with any child; you should simply ignore all concerns.”',
              '“We love having your child in our class and they enjoy music. We have noticed they use few words here and get frustrated communicating. What do you notice at home?”',
              '“Your child behaves this way because you do not read to them enough.”',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Beginning with genuine strengths, stating factual behavioral observations respectfully, and inviting the caregiver’s home perspective establishes a collaborative partnership.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l11',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '11. Communicating Effectively With Healthcare Professionals',
      order: 11,
      hasVideo: false,
      content: `Consulting a healthcare provider can feel intimidating, especially in rushed clinic settings. Preparing concise, objective information ensures your concerns are evaluated thoroughly.

### Information to Prepare Before the Appointment
1. **Child's Chronological Age & Birth History:** Date of birth, gestational age at birth (premature or full-term), and any neonatal complications.
2. **Specific Chief Concern:** State the primary observation in one clear sentence: *"My main concern is that at 24 months, my child does not speak words, point to objects, or respond when we call his name."*
3. **Specific Factual Examples:** Share two or three written observations of what occurs during daily meals, play, or bedtime.
4. **Timeline & Trajectory:** When did you first notice this? Has the skill been progressing, staying the same, or has the child lost skills they previously had?
5. **Home Languages:** What languages are spoken by parents, siblings, and extended family?
6. **Child's Strengths:** What does the child do well and enjoy?
7. **Sensory Observations:** Any history of ear infections, breathing issues, or vision concerns?

### Questions to Ask the Healthcare Provider
- *"Based on your exam, do you recommend a formal developmental screening or referral to a specialist?"*
- *"Could we arrange a formal hearing assessment to check his middle ear function?"*
- *"What specific activities or supportive practices can we do at home while waiting for our next visit?"*
- *"When should we return for a follow-up review?"*

*If you leave the clinic feeling that your persistent concerns were dismissed without evaluation, remember that parents know their children best: it is completely appropriate to seek a second clinical opinion or contact early intervention services.*`,
      coachNotes:
        'Encourage parents and caregivers to write down their questions and observations beforehand so they feel confident during clinical consultations.',
      quiz: {
        id: 'quiz-m10-l11',
        lessonId: 'ecd-m10-l11',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q11',
            prompt: 'What is the most effective way for a parent to prepare for a pediatric appointment regarding developmental concerns?',
            options: [
              'Argue with the doctor before the examination begins.',
              'Bring written objective notes with specific dates, examples of what the child does, timeline of the concern, and questions to ask.',
              'Rely solely on memory and avoid mentioning any challenges.',
              'Bring printouts of anonymous internet social media comments diagnosing the child.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Bringing written objective notes detailing specific observations, chronological timeline, and targeted questions allows clinicians to make well-informed evaluations.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l12',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '12. The “What Should I Do?” Clinical Decision Pathway',
      order: 12,
      hasVideo: false,
      content: `### The 6-Step Developmental Concern Pathway
When you observe an unfamiliar or challenging behavior in early childhood, follow this systematic clinical roadmap:

\`\`\`
1. NOTICE ──> 2. OBSERVE ──> 3. DOCUMENT ──> 4. DISCUSS ──> 5. SEEK GUIDANCE ──> 6. FOLLOW UP
\`\`\`

1. **Step 1: NOTICE**
   - Notice a missed skill, a persistent difficulty, or a worry expressed by a parent or educator. Ask yourself: *Is this new? Is it affecting the child's daily participation and well-being?*
2. **Step 2: OBSERVE**
   - Watch the child across different ordinary activities (play, meals, transition, outdoors) and on multiple different days.
3. **Step 3: DOCUMENT**
   - Write clear, objective observation notes describing actions, words, context, setting, and what helped.
4. **Step 4: DISCUSS**
   - If you are an educator, hold a private, respectful, strengths-based conversation with the parent. If you are a parent, compare notes with family members and teachers.
5. **Step 5: SEEK GUIDANCE**
   - Schedule a visit with a qualified healthcare provider (clinic nurse, pediatrician, early childhood specialist). Request screening or sensory checks as indicated.
6. **Step 6: FOLLOW UP & SUPPORT NOW**
   - Continue enriching the child's daily environment immediately. Never wait for a future appointment to start talking, reading, singing, and offering loving support.

### Urgent Red Flag Pathway (Fast Track)
If a child exhibits **loss of previously acquired skills (regression)**, sudden inability to walk, persistent lethargy, or extreme unresponsiveness:
- **Do not wait for weeks of observation.**
- Fast-track immediately to Step 5: seek prompt professional medical evaluation.`,
      coachNotes:
        'Walk through the 6-step pathway: Notice -> Observe -> Document -> Discuss -> Seek Guidance -> Follow Up. Highlight the regression fast-track.',
      quiz: {
        id: 'quiz-m10-l12',
        lessonId: 'ecd-m10-l12',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q12',
            prompt: 'In the 6-step developmental concern pathway, what should caregivers do while waiting for a specialist appointment?',
            options: [
              'Stop all communication and interaction with the child until the appointment.',
              'Continue actively supporting the child with talking, playing, responsive routines, and warm interaction.',
              'Keep the child in isolation in a dark room.',
              'Force the child to sit at a desk for 6 hours doing worksheets.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Supportive, responsive everyday interaction should never be paused while waiting for an evaluation; enriching caregiving provides immediate developmental benefits.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l13',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '13. Twelve Common Pitfalls to Avoid in Developmental Observation',
      order: 13,
      hasVideo: false,
      content: `Recognizing and avoiding common mistakes protects children from stigma and ensures families receive timely, evidence-based guidance:

### 12 Common Pitfalls in Developmental Surveillance
1. **Diagnosing a Child Yourself:** Only licensed medical and developmental specialists can formulate a clinical diagnosis. Never tell a family a child "has autism" or "has ADHD."
2. **Labelling with Pejorative Terms:** Using words like *"lazy"*, *"naughty"*, *"stubborn"*, or *"antisocial"* blinds adults to underlying motor, sensory, or communication barriers.
3. **Comparing Children Unfairly:** *"Her cousin was already talking at 12 months"* creates shame and ignores individual developmental trajectories.
4. **Assuming Every Delay Means a Lifelong Disorder:** Many delays are temporary variations that resolve with practice, language exposure, or simple accommodations.
5. **Ignoring Persistent Concerns with "They Will Grow Out of It":** While patience is important, waiting passively when genuine red flags persist delays early intervention windows.
6. **Relying on Social Media Checklists:** Internet forums and algorithms are designed for sensationalism, not clinical precision.
7. **Treating a Milestone Checklist as a Diagnostic Exam:** Checklists prompt discussion; they are not clinical tests.
8. **Frightening Parents:** Delivering observations with alarmism or catastrophic predictions creates trauma rather than collaboration.
9. **Dismissing Parental Intuition:** Parents know their child intimately; when a parent feels something is wrong, their concern must always be taken seriously.
10. **Blaming Multilingualism:** Dual-language exposure does not cause language disorders.
11. **Violating Child & Family Confidentiality:** Sharing developmental observations with unauthorized neighbors, relatives, or other parents is unethical and harmful.
12. **Waiting for a Diagnosis Before Helping:** You do not need a medical label to start reading books, getting down on the floor, or using visual gestures!`,
      coachNotes:
        'Review the 12 pitfalls thoroughly. Emphasize confidentiality, avoiding labels, and taking parental intuition seriously.',
      quiz: {
        id: 'quiz-m10-l13',
        lessonId: 'ecd-m10-l13',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q13',
            prompt: 'Which action represents an unprofessional and harmful pitfall for an early childhood educator?',
            options: [
              'Documenting objective observations of a child’s play.',
              'Discussing a child’s suspected developmental condition publicly with other parents in the schoolyard.',
              'Holding a private, confidential conference with the child’s parents.',
              'Recommending a routine hearing and vision check at a local clinic.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Breaching confidentiality by discussing a child’s developmental challenges with unauthorized community members or other parents is strictly unprofessional and stigmatizing.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l14',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '14. Case Study: Tunde (“He Will Talk When He Is Ready”)',
      order: 14,
      hasVideo: false,
      content: `> ### Case Study: Tunde
> **Age:** 2½ years old (30 months)
> **Setting:** Home and community childcare center
> **Background:** Tunde lives with his mother, father, older sister, and grandmother. His family speaks Yoruba and English at home. He attends community childcare three mornings a week.
>
> **Strengths Observed:** Tunde understands familiar domestic routines. He brings his shoes when his father says it is time to go out. He enjoys watching his sister push toy cars, smiles during songs, and laughs during gentle chase games.
>
> **Challenges Observed:** Tunde speaks very few words. His family hears *"mama"*, *"no"*, and *"car"*, but he does not combine words. When he wants juice, he grunts, cries, or pulls an adult's hand. At childcare, he often plays alone with cars and does not respond when his name is called across the room.
>
> **Family Perspectives:**
> - *Grandmother:* "Leave him alone. Boys in our family always talk late. His uncle did not talk until age four, and now he is an engineer. He will talk when he is ready."
> - *Mother:* Worried because other 2½-year-olds speak in full sentences and Tunde becomes frustrated when trying to make himself understood.

---

### Step-by-Step Clinical Application for Tunde
1. **Respecting Cultural Wisdom While Acting on Science:**
   The educator acknowledges the grandmother's loving reassurance respectfully: *"It is wonderful that late talkers in your family thrived, and Tunde has so many strengths."* However, modern pediatric science shows that waiting passively carries risks if an underlying issue exists.
2. **Objective Educator Documentation:**
   The educator shares factual notes: *"At group time, Tunde turned when shown a picture book, but did not turn when his name was called five times without visual cues."*
3. **Evaluating Multilingualism:**
   The family confirms Tunde uses very few words in **both** Yoruba and English. His communication challenge is not due to bilingual code-switching; it spans all languages.
4. **First Clinical Recommendation – Hearing Check:**
   Tunde's healthcare provider checks his ears and schedules an audiometry exam to rule out chronic middle-ear fluid (glue ear).
5. **Immediate Supportive Practices:**
   - The family and educators begin using simple hand gestures alongside speech.
   - They wait patiently for 5 to 10 seconds after asking a question to give Tunde processing time.
   - They narrate his play (*"Vroom, the red car is fast!"*) without pressuring him to repeat words.`,
      coachNotes:
        'Walk through Tunde’s case study. Emphasize how to navigate extended family perspectives respectfully while prioritizing the child’s hearing and developmental needs.',
      quiz: {
        id: 'quiz-m10-l14',
        lessonId: 'ecd-m10-l14',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q14',
            prompt: 'In Tunde’s case study, why was the grandmother’s advice (“boys always talk late, he will talk when he is ready”) insufficient as a sole strategy?',
            options: [
              'Because grandmothers should never be allowed to speak to children.',
              'Because waiting passively risks missing underlying hearing loss, speech-language delays, or critical early intervention windows during rapid brain development.',
              'Because boys always develop language faster than girls.',
              'Because Tunde was already speaking five languages fluently.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'While extended family perspectives are valued, passive waiting when a 2½-year-old has fewer than 10 words and inconsistent response to sound risks missing treatable hearing or developmental delays.',
          },
        ],
      },
    },
    {
      id: 'ecd-m10-l15',
      moduleId: 'ecd-m10',
      programId: 'ecd-cert',
      title: '15. Core Clinical Principles & Action Summary',
      order: 15,
      hasVideo: false,
      content: `### Summary of Core Principles in Module 10
1. **Development Is Individual:** Children develop at diverse rates; one missed milestone or off day does not mean a disorder.
2. **A Concern Is Not a Diagnosis:** Noticing an issue is the beginning of careful observation and support, not a clinical label.
3. **Patterns Across Settings Matter Most:** Look for persistence over time across home, childcare, and community environments.
4. **Regression Demands Prompt Attention:** Any persistent loss of previously mastered words, gestures, social connection, or walking warrants prompt medical referral.
5. **Multilingualism Is an Asset:** Evaluate communication across all languages and nonverbal modalities.
6. **Check Sensory Foundations Early:** Always evaluate hearing, vision, sleep, and physical comfort when communication or motor concerns arise.
7. **Document Objectively:** Record facts, settings, visible actions, and what helped. Avoid stigmatizing labels.
8. **Partner Respectfully with Families:** Build trust through empathy, strengths-based discussions, and confidentiality.
9. **Support Immediately:** Never wait for a future appointment to start reading, talking, singing, and offering loving co-regulation.

---

### Professional Clinical Note
*This module delivers evidence-based training to help parents, educators, and community health practitioners observe development objectively, communicate respectfully, and seek appropriate clinical services. It does not replace professional medical diagnosis, pediatric neurological evaluations, or formal diagnostic assessments.*`,
      coachNotes:
        'Congratulate the learner on completing Module 10: Recognizing Developmental Concerns! Encourage them to take their module quiz.',
      quiz: {
        id: 'quiz-m10-l15',
        lessonId: 'ecd-m10-l15',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm10-q15',
            prompt: 'Which final guiding principle best reflects the professional approach taught in Module 10?',
            options: [
              'Label children quickly, frighten parents, and search social media for diagnoses.',
              'Ignore all developmental delays because every child catches up on their own.',
              'Notice the child, do not label the child, document objectively, support immediately, and seek appropriate professional guidance when genuine concerns persist.',
              'Compare every child strictly against the most advanced child in the community.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'The core mission of early childhood developmental surveillance is to observe objectively, support immediately, avoid labels, and seek qualified professional guidance when patterns persist.',
          },
        ],
      },
    },
  ],
};
