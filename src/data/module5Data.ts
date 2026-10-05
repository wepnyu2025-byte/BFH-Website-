import { CourseModule } from '../types/studentPortal';

export const MODULE_5_SOCIAL_EMOTIONAL: CourseModule = {
  id: 'ecd-m5',
  programId: 'ecd-cert',
  title: '5. Social & Emotional Development',
  order: 5,
  description:
    'Understand how children aged 0–5 develop secure attachment, emotional regulation, empathy, positive social relationships, and healthy self-confidence through responsive caregiving.',
  glossary: [
    {
      term: 'Social development',
      definition:
        'The process by which children learn to interact, communicate, share, cooperate, and form meaningful relationships with others.',
    },
    {
      term: 'Emotional development',
      definition:
        'The ability to recognize, understand, express, and manage one’s own feelings and develop empathy toward the feelings of others.',
    },
    {
      term: 'Attachment',
      definition:
        'The deep emotional bond formed between an infant and primary caregivers, providing safety, comfort, and a secure base for exploration.',
    },
    {
      term: 'Secure base',
      definition:
        'A trusted caregiver relationship from which a young child feels safe to explore the surrounding world and to which they return for comfort.',
    },
    {
      term: 'Emotional regulation',
      definition:
        'The internal ability to monitor, manage, and adapt emotional states and behavioral impulses to cope with challenging situations.',
    },
    {
      term: 'Co-regulation',
      definition:
        'The warm, supportive process by which a calm caregiver helps a distressed infant or toddler soothe their nervous system and settle down.',
    },
    {
      term: 'Tantrum',
      definition:
        'An intense emotional outburst of frustration, anger, or despair common in toddlers whose emotional intensity exceeds their verbal coping capacity.',
    },
    {
      term: 'Positive discipline',
      definition:
        'An educational approach to discipline focused on teaching appropriate behavior, setting consistent boundaries, and offering guidance rather than punishment.',
    },
    {
      term: 'Empathy',
      definition:
        'The ability to perceive, understand, and show compassionate care for the feelings, distress, or joy of another human being.',
    },
    {
      term: 'Parallel play',
      definition:
        'A developmental stage common around age 2 where children play side-by-side with similar toys without actively engaging or collaborating.',
    },
    {
      term: 'Cooperative play',
      definition:
        'Play typical of ages 3–5 where children actively collaborate, negotiate roles, share materials, and work toward a shared goal.',
    },
    {
      term: 'Temperament',
      definition:
        'A child’s innate, biologically based behavioral and emotional style of reacting to people, sensations, and new environments.',
    },
  ],
  references: [
    {
      title: 'CDC. Learn the Signs. Act Early. Social and Emotional Milestones.',
      url: 'https://www.cdc.gov/act-early/milestones/index.html',
    },
    {
      title: 'CDC. Positive Parenting Tips for Infants, Toddlers, and Preschoolers.',
      url: 'https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/index.html',
    },
    {
      title: 'World Health Organization. Improving early childhood development: WHO guideline.',
      url: 'https://www.who.int/publications/i/item/9789240002098',
    },
    {
      title:
        'World Health Organization & UNICEF. Nurturing care for early childhood development.',
      url: 'https://nurturing-care.org',
    },
    {
      title:
        'Harvard Center on the Developing Child. InBrief: The Science of Early Childhood Development.',
      url: 'https://developingchild.harvard.edu/resources/inbrief-science-of-ecd/',
    },
    {
      title:
        'Harvard Center on the Developing Child. Serve and Return Guide & Brain Architecture.',
      url: 'https://developingchild.harvard.edu/science/key-concepts/serve-and-return/',
    },
    {
      title: 'American Academy of Pediatrics (AAP). Discipline and Your Child.',
      url: 'https://www.healthychildren.org/English/family-life/family-dynamics/communication-discipline/Pages/Discipline-and-Your-Child.aspx',
    },
    {
      title:
        'American Academy of Pediatrics. Effective Discipline to Raise Healthy Children. Pediatrics, 2018.',
      url: 'https://publications.aap.org/pediatrics/article/142/6/e20183112/37452/Effective-Discipline-to-Raise-Healthy-Children',
    },
    {
      title: 'UNICEF. Parenting and early emotional learning guidelines.',
      url: 'https://www.unicef.org/parenting',
    },
  ],
  lessons: [
    {
      id: 'ecd-m5-l01',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '1. Welcome to the Module',
      order: 1,
      hasVideo: false,
      content: `> **Clinical Observation:** A 2-year-old becomes intensely upset when a parent prevents them from touching a hot charcoal stove or electrical wire. The child screams, weeps, and throws themselves onto the floor. 

This behavior is **not** simply "bad behavior" or defiance. Young children have fully developed emotional sensations but immature neural pathways for regulating intense frustration.

Social and emotional development is about how children learn to relate to others, understand their own feelings, and manage strong emotions. This module explores:
- What healthy social and emotional development looks like from birth to age 5.
- How caregivers provide the foundation for secure attachment and self-worth.
- The vital role of **co-regulation** in soothing young nervous systems.
- Positive discipline strategies that teach self-control without shame or physical punishment.
- Recognizing when emotional distress indicates a need for professional pediatric review.`,
      coachNotes:
        'Welcome the learner to Module 5. Emphasize that toddler tantrums are biological coping mechanisms rather than calculated defiance.',
      quiz: {
        id: 'quiz-m5-l01',
        lessonId: 'ecd-m5-l01',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q01',
            prompt:
              'A 2-year-old child falls to the floor crying when told they cannot touch a dangerous stove. How should a developmental educator interpret this?',
            options: [
              'The child is naturally malicious and requires severe physical punishment.',
              'The child has intense emotions but immature neurological ability to manage frustration.',
              'The child has a permanent emotional deficit.',
              'The child should be locked in a room alone for several hours.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Toddlers experience strong emotions but have not yet developed adult executive brain function to regulate intense frustration. This is a normal developmental stage.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l02',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '2. What Is Social and Emotional Development?',
      order: 2,
      hasVideo: false,
      content: `Although closely intertwined, **social development** and **emotional development** address complementary facets of child growth:

### 1. Social Development (Relationships with Others)
- Relating comfortably to other people (caregivers, family, peers).
- Communicating needs, ideas, and social cues.
- Playing alongside and collaborating with other children.
- Learning to share, take turns, and cooperate in groups.
- Understanding and respecting simple household and community rules.

### 2. Emotional Development (Internal Feeling & Regulation)
- Recognizing primary emotions (joy, fear, anger, sadness, pride).
- Expressing feelings constructively through words or gestures.
- Developing empathy—understanding what others feel.
- Managing distress and self-soothing when disappointed.
- Building confidence, autonomy, and healthy self-esteem.

> **The Synergistic Connection:** A child who understands their own feelings is better equipped to interpret others' emotions and cooperate. Conversely, a child wrapped in secure caregiver relationships develops stronger emotional resilience.`,
      coachNotes:
        'Help the student distinguish internal emotional self-awareness from interpersonal social interactions.',
      quiz: {
        id: 'quiz-m5-l02',
        lessonId: 'ecd-m5-l02',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q02',
            prompt:
              'What is the core distinction between social development and emotional development?',
            options: [
              'Social development is only for adults; emotional development is for infants.',
              'Social development focuses on relating to others; emotional development focuses on recognizing and managing feelings.',
              'Social development refers to academic grades; emotional development refers to physical strength.',
              'There is no distinction; they are identical clinical terms.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Social development addresses interpersonal connection, play, and cooperation. Emotional development addresses understanding, expressing, and regulating inner feelings.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l03',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '3. Emotional Development From 0 to 5 Years',
      order: 3,
      hasVideo: false,
      content: `Social-emotional competencies emerge progressively across the first 5 years of life:

### 0 to 12 Months: Safety, Bonding & Attachment
- Recognizes primary caregivers and tracks their faces with delight.
- Produces social smiles in response to human voices and smiling faces (around 6–8 weeks).
- Expresses basic distress, comfort, and joy.
- Seeks physical contact, soothing touch, and eye contact from trusted caregivers.
- Begins demonstrating separation anxiety around 8–10 months when caregivers leave.

### 1 to 2 Years: Autonomy & Separation
- Demonstrates strong preferences and emergent independence (*"No! Me do it!"*).
- Exhibits frustration when physical abilities cannot match desired goals.
- Shows curiosity about other children but mostly observes or imitates.
- Relies heavily on familiar bedtime and mealtime routines for emotional predictability.

### 2 to 3 Years: Big Feelings & Emerging Empathy
- Experiences frequent, intense emotional peaks and toddler tantrums.
- Begins labeling primary feelings: *"happy," "sad," "mad."*
- Engages in parallel play (playing near others with similar toys).
- Tests boundaries repeatedly to map out social limits.
- Displays early empathy—patting a crying baby or offering a comfort toy.

### 3 to 5 Years: Self-Control & Cooperative Friendships
- Uses spoken language to express feelings and negotiate conflicts.
- Shows growing ability to wait for turns and delay immediate gratification.
- Forms genuine friendships, often naming specific preferred playmates.
- Engages in rich cooperative play, creating shared imaginary games.
- Demonstrates sustained pride, self-confidence, and helpfulness at home and school.`,
      coachNotes:
        'Highlight the developmental sequence: from infant attachment to toddler autonomy testing, to preschool cooperation.',
      quiz: {
        id: 'quiz-m5-l03',
        lessonId: 'ecd-m5-l03',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q03',
            prompt:
              'At what developmental stage do children typically begin engaging in true cooperative play and forming friendships by name?',
            options: [
              'Between 0 and 6 months.',
              'Around 12 months.',
              'Between 3 and 5 years.',
              'Only after reaching puberty.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Cooperative play, taking turns in games, and naming specific friends typically emerge between 3 and 5 years as language and empathy mature.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l04',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '4. Attachment and Secure Relationships',
      order: 4,
      hasVideo: false,
      content: `**Attachment** is the biological, emotional bond formed between an infant and their primary caregivers. It is the cornerstone of lifelong mental health:

### Why Responsive Caregiving Builds Brains
- **Predictability & Trust:** When a baby cries and an adult responds with soothing, feeding, or warm rocking, the baby learns: *"The world is safe. People are trustworthy. I am valued."*
- **The Secure Base Phenomenon:** A securely attached child uses the caregiver as a safe anchor from which to explore the environment, frequently looking back or returning for a brief hug before venturing further.
- **Serve-and-Return Neural Architecture:** Harvard research confirms that back-and-forth social exchanges (eye gaze, cooing, smiling, talking) strengthen neural pathways in emotional and social processing centers.

> **Clinical Relief for Parents:** Secure attachment does **not** demand 24/7 flawless perfection. Research shows that caregivers only need to be tuned in and responsive roughly 30–50% of the time, provided that mistakes and misunderstandings are promptly repaired with warmth!`,
      coachNotes:
        'Reassure caregivers that secure attachment does not require flawless parenting. Consistent warmth and emotional repair build resilience.',
      quiz: {
        id: 'quiz-m5-l04',
        lessonId: 'ecd-m5-l04',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q04',
            prompt:
              'What does early childhood science indicate about creating secure attachment?',
            options: [
              'Caregivers must never make any mistake or the child will suffer permanent damage.',
              'Secure attachment requires expensive educational toys and strict isolation.',
              'Consistent, warm, and responsive care over time builds a child’s trust and a secure base for exploration.',
              'Attachment only forms if a child is never comforted when crying.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Secure attachment is built on consistent, loving responsiveness over time, giving the child the security to explore and learn.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l05',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '5. Understanding Children\'s Emotions',
      order: 5,
      hasVideo: false,
      content: `All human emotions—including anger, jealousy, fear, and sadness—are normal, biological signals. Children do not arrive with pre-installed knowledge on how to navigate them:

### The 7-Step Emotional Coaching Framework
1. **Notice the emotion:** Pay close attention to facial expressions, clenched fists, withdrawal, or tears.
2. **Stay grounded & calm:** An agitated adult escalates child distress. A calm nervous system regulates a chaotic one.
3. **Name the emotion:** *"You look very angry right now." "You are feeling sad that playtime ended."*
4. **Validate the feeling:** *"It is okay to feel upset. I understand why that made you sad."*
5. **Set the behavioral boundary:** *"It is okay to feel furious, but it is never okay to hit or bite."*
6. **Assist calming down:** Offer a comfort hug, deep breaths, a sip of water, or a quiet transition space.
7. **Problem-solve together:** Once the child is calm, discuss constructive choices for next time.

#### Practical Dialogue: The Broken Toy
- *Child:* Weeps uncontrollably over a cracked plastic car.
- *Adult:* *"You are very sad because your favorite car broke. (Names emotion) It hurts when something we love breaks. (Validates feeling) Let's take a deep breath together. (Calms nervous system) When you are ready, let's see if we can tape the wheel or choose another car."*`,
      coachNotes:
        'Teach the core distinction: all feelings are permissible, but not all behaviors are acceptable (validate emotion, boundary on action).',
      quiz: {
        id: 'quiz-m5-l05',
        lessonId: 'ecd-m5-l05',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q05',
            prompt:
              'When a 3-year-old child is crying because a toy broke, what is the most constructive response for an adult?',
            options: [
              'Shout at the child and threaten to throw all toys away.',
              'Mock the child for crying over a piece of plastic.',
              'Name the emotion, validate the sadness, offer comfort to calm down, and problem-solve together.',
              'Lock the child in a dark room until they smile.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Naming emotions, validating distress, and co-regulating before problem-solving teaches emotional intelligence and self-soothing skills.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l06',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '6. Emotional Regulation and Co-Regulation',
      order: 6,
      hasVideo: false,
      content: `**Emotional regulation** is the capacity to modulate one's emotional arousal to adapt to everyday stresses. Infants and young toddlers cannot regulate their nervous systems independently:

### The Biological Principle of Co-Regulation
- **External Regulation Precedes Self-Regulation:** An infant's brain relies on the caregiver's calm physiological state to regulate its own heart rate, breathing, and stress hormones.
- **Physical Touch & Tone:** Holding a distressed baby, speaking in soft rhythmic tones, and rocking gently signals physical safety to the amygdala.
- **Internalization Over Years:** Through thousands of co-regulation moments, the child internalizes this soothing script, gradually developing autonomous self-regulation by ages 4 to 7.

> **Developmental Reality:** Demanding that an 18-month-old "control themselves" ignores brain biology. The prefrontal cortex—the center of impulse control—is in its earliest stages of development. Caregivers must lend children their calm!`,
      coachNotes:
        'Stress that co-regulation is the biological bridge to self-regulation. Children cannot regulate alone until they have experienced co-regulation.',
      quiz: {
        id: 'quiz-m5-l06',
        lessonId: 'ecd-m5-l06',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q06',
            prompt:
              'What is "co-regulation" in early childhood development?',
            options: [
              'Forcing children to memorize rules by repetition.',
              'The process by which a calm caregiver provides external emotional support to help a distressed child soothe their nervous system.',
              'Allowing toddlers to manage their own diet and sleep without parental guidance.',
              'A government inspection of childcare facilities.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Co-regulation describes how adults lend their calm nervous system to soothe a distressed child, teaching the child how to eventually self-regulate.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l07',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '7. Tantrums and Difficult Behavior',
      order: 7,
      hasVideo: false,
      content: `Tantrums are universal developmental phenomena, peaking between 18 and 36 months when language skills lag behind emotional intensity:

### Common Tantrum Triggers (The H.A.L.T. Principle)
- **H - Hunger:** Low blood sugar impairs cognitive coping.
- **A - Anger & Frustration:** Inability to complete a task or communicate a desire.
- **L - Lack of Control:** Toddlers seeking autonomy being restricted.
- **T - Tiredness & Overstimulation:** Exhaustion, crowded markets, loud noises, or disrupted nap times.

---

### Step-by-Step Response Protocol
1. **Ensure Physical Safety:** Move child away from stairs, stoves, or hard corners.
2. **Stay Calm & Breathe:** Do not scream or match the child's volume.
3. **Never Reason During a Meltdown:** The rational brain is offline during an emotional flood. Words will not work.
4. **Offer Presence or Space:** Some children want a firm, comforting embrace; others need safe physical space with the adult sitting nearby.
5. **Teach When Calm:** Once breathing slows and tears stop, recap: *"You were really mad when I turned off the music. Next time, tell me 'one more song please'."*

### Dangerous Practices to Avoid
- **Never use physical violence or slapping:** Physical punishment increases aggression and destroys trust.
- **Never mock or shame:** Avoid *"Look at the baby crying! Everyone is laughing at you."*
- **Never capitulate to unsafe demands:** Giving in to end a tantrum teaches that screaming is the currency for getting forbidden objects.`,
      coachNotes:
        'Walk through managing a tantrum safely: ensure safety, remain calm, withhold lectures until calm, and never give in to unsafe demands.',
      quiz: {
        id: 'quiz-m5-l07',
        lessonId: 'ecd-m5-l07',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q07',
            prompt:
              'Why is it ineffective to give long lectures or try to reason with a 2-year-old in the middle of a screaming tantrum?',
            options: [
              'Because 2-year-olds are deliberately deaf during tantrums.',
              'Because during emotional flooding, the child’s rational brain is offline; they require safety and calm before they can process information.',
              'Because children should never be spoken to until they are 5 years old.',
              'Because lectures should only be delivered with a whip.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'During intense emotional dysregulation, the rational prefrontal cortex cannot process logical arguments. Safety and calming must precede teaching.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l08',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '8. Positive Discipline and Boundaries',
      order: 8,
      hasVideo: false,
      content: `The root of the word **discipline** comes from the Latin *disciplina*, meaning "to teach." True discipline is education, not retaliation:

### Pillars of Positive Discipline (AAP & WHO Guidelines)
- **Clear & Consistent Expectations:** State what you *want* the child to do, rather than just what *not* to do.
  - *Instead of:* *"Stop running!"* → *Use:* *"Please use walking feet inside the house."*
- **Redirection:** Gently guide curious hands toward a safe alternative.
  - *Instead of:* *"Don't touch that knife!"* → *Take knife away and offer:* *"Here is your wooden spoon and plastic bowl."*
- **Natural & Logical Consequences:**
  - If a child throws blocks, the blocks take a rest for 10 minutes.
- **Limited Choices:** Restore feelings of autonomy by offering two adult-approved options.
  - *"Do you want to wear the blue shirt or the yellow shirt today?"*
  - *"Do you want to pick up the balls first or the books first?"*

> **The American Academy of Pediatrics Position:** In 2018, the AAP reaffirmed that physical punishment (spanking, slapping, hitting) and verbal shaming are ineffective and linked to higher childhood aggression, mental health disorders, and reduced cognitive achievement.`,
      coachNotes:
        'Teach positive discipline as teaching rather than punishment. Emphasize limited choices and telling children what TO do instead of what NOT to do.',
      quiz: {
        id: 'quiz-m5-l08',
        lessonId: 'ecd-m5-l08',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q08',
            prompt:
              'Which discipline strategy aligns with evidence-based pediatric recommendations for toddler cooperation?',
            options: [
              'Hitting the child with a cane whenever they disobey.',
              'Offering limited positive choices and telling the child what TO do (e.g., "Do you want to put away the blocks or the cars first?").',
              'Locking the child out of the house at night.',
              'Ignoring all misbehavior permanently.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Positive discipline uses clear instructions, redirection, and limited choices to teach self-regulation and respect without violence or fear.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l09',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '9. Self-Awareness, Confidence and Self-Esteem',
      order: 9,
      hasVideo: false,
      content: `Self-awareness is the recognition of one's own individuality, capabilities, and feelings. Healthy confidence is rooted in realistic mastery, not empty flattery:

### How Adults Nurture Genuine Self-Worth
- **Praise Effort, Not Fixed Traits (Growth Mindset):**
  - *Instead of:* *"You are the smartest boy in the world!"*
  - *Use:* *"You worked so persistently on that puzzle! Look how you turned the piece until it fit."*
- **Encourage Age-Appropriate Autonomy:**
  - Let toddlers feed themselves, even if pap spills. Let 4-year-olds button their shirts, pour water from a small jug, or sweep with a small broom.
- **Avoid Toxic Comparisons:**
  - Never compare children to siblings or cousins (*"Why can't you be quiet like your sister?"*). Comparison generates resentment and erodes belonging.
- **Eliminate Damaging Labels:**
  - Banish labels such as *"clumsy," "stubborn," "lazy," "problem child,"* or *"troublemaker."* Children internalize these labels and act them out as identity.`,
      coachNotes:
        'Highlight praising the process (effort, persistence) rather than innate intelligence or empty praise.',
      quiz: {
        id: 'quiz-m5-l09',
        lessonId: 'ecd-m5-l09',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q09',
            prompt:
              'Which approach most effectively fosters healthy, resilient confidence in a preschooler?',
            options: [
              'Telling them they are superior to all other children.',
              'Praising their effort and perseverance when solving challenges and giving simple household responsibilities.',
              'Doing everything for them so they never experience failure.',
              'Constantly comparing them to their higher-scoring siblings.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Praising effort, persistence, and problem-solving helps children develop genuine self-efficacy and resilience.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l10',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '10. Empathy and Understanding Other People',
      order: 10,
      hasVideo: false,
      content: `**Empathy** is the capacity to notice another person's emotional state, imagine their experience, and respond with compassion:

### The Developmental Arc of Empathy
1. **Emotional Contagion (Infancy):** A newborn cries upon hearing another baby cry in the maternity ward.
2. **Egocentric Empathy (1–2 Years):** A toddler sees their mother crying and brings her their own comfort blanket or pacifier.
3. **Perspective Taking (3–5 Years):** A preschooler recognizes that a friend who scraped their knee needs water, a bandage, or a gentle touch.

---

### Daily Habits That Cultivate Empathy
- **Emotion Narration in Storybooks:** *"Look at the little monkey in this picture. His banana fell in the river. How do you think he feels?"*
- **Notice Real-Life Opportunities:** *"Look at baby brother rubbing his eyes. He is tired. Let's sing softly so he can sleep."*
- **Model Empathy Yourself:** When caregivers treat neighbors, elders, and domestic workers with warmth and kindness, children absorb the standard.
- **Realistic Expectations:** Do not expect a 2-year-old to share their favorite toy willingly every single time. Sharing is an advanced social skill that matures around 4 years.`,
      coachNotes:
        'Help learners understand that true sharing and empathy take years to develop. Modeling compassion in daily life is the best curriculum.',
      quiz: {
        id: 'quiz-m5-l10',
        lessonId: 'ecd-m5-l10',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q10',
            prompt:
              'A 2-year-old child refuses to share their favorite toy with a visiting peer. How should a developmental educator evaluate this?',
            options: [
              'The child has a severe antisocial behavioral disorder.',
              'This is developmentally expected; young toddlers have strong possessiveness and sharing skills mature gradually around 3 to 4 years.',
              'The child must be forced to surrender all toys permanently.',
              'The child should be spanked immediately.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Young toddlers view possessions as extensions of self. True sharing and perspective taking mature gradually over the preschool years.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l11',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '11. Social Skills and Relationships',
      order: 11,
      hasVideo: false,
      content: `Children learn to socialize in stages, progressing from solitary focus to collaborative teamwork:

### The Stages of Social Play
1. **Solitary Play (Infancy):** Exploring toys and surroundings independently.
2. **Parallel Play (Age 2):** Playing side-by-side with similar materials (e.g., both digging in sand) without collaborating or exchanging toys.
3. **Associative Play (Ages 3–4):** Sharing materials and talking occasionally, but each child pursues their own storyline.
4. **Cooperative Play (Ages 4–5):** Full collaborative play with assigned roles (*"You are the doctor, I am the sick patient, and the box is our clinic"*).

---

### Coaching Social Conflict Resolution
When toddlers dispute a toy:
- **Do not punish either child:** *"I see two children who both want the yellow truck."*
- **State the problem:** *"We have one truck and two friends."*
- **Introduce turn-taking tools:** Use a simple kitchen timer or song: *"Amina has 5 pushes, then it is Samuel's turn."*`,
      coachNotes:
        'Differentiate parallel play from cooperative play. Young toddlers play near peers before they play with peers.',
      quiz: {
        id: 'quiz-m5-l11',
        lessonId: 'ecd-m5-l11',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q11',
            prompt:
              'Two 2-year-olds sit next to each other playing with plastic cups without talking or combining their cups. What type of play is this?',
            options: [
              'Cooperative play.',
              'Hostile avoidance play.',
              'Parallel play.',
              'Delinquent play.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Parallel play is the hallmark of 2-year-old social interaction, where children enjoy playing alongside peers before developing collaborative games.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l12',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '12. Family, Culture and Environment',
      order: 12,
      hasVideo: false,
      content: `Social and emotional development is deeply rooted in cultural values, community traditions, and family structures:

### Strengths of the African Communal Caregiving Model
Across many African communities—such as in Cameroon, Nigeria, Ghana, and Kenya—childcare is fundamentally communal (*"It takes a village to raise a child"*):
- **Multiple Attachment Figures:** Grandmothers, aunts, older cousins, and neighbors provide a wide web of security, ensuring children have multiple trusted adults.
- **Cultural Respect & Greetings:** Teaching children to greet elders with reverence, shake hands with two hands, and look out for younger peers instills prosocial values early.
- **Linguistic & Social Flexibility:** Navigating multilingual households (e.g., French, English, and indigenous languages) builds social agility and cognitive flexibility.

> **Key Takeaway:** There is no single "Western" standard for healthy emotional development. Warm, consistent caregiving, predictable routines, and community belonging within a family's cultural context foster thriving, emotionally grounded children!`,
      coachNotes:
        'Celebrate the African communal caregiving network. Multiple loving caregivers provide a broad, resilient attachment network.',
      quiz: {
        id: 'quiz-m5-l12',
        lessonId: 'ecd-m5-l12',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q12',
            prompt:
              'How does the traditional African communal caregiving model (extended family, aunts, grandparents) benefit a child’s emotional development?',
            options: [
              'It confuses the child so they never know who their parent is.',
              'It provides a rich network of multiple secure attachment figures and deep cultural community belonging.',
              'It prevents children from developing independence.',
              'It has no proven benefit.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Communal caregiving provides children with multiple loving attachment figures, building emotional security, resilience, and cultural identity.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l13',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '13. Screens and Social-Emotional Development',
      order: 13,
      hasVideo: false,
      content: `The primary risk of excessive digital screen exposure in early childhood is the **displacement of authentic human relationship**:

### What Screens Displace
- **Eye Contact & Micro-Expressions:** Children learn to read subtle emotions (smiling eyes, furrowed brows) by gazing at live human faces, not two-dimensional screens.
- **Frustration Tolerance:** Touchscreens offer instantaneous gratification. Over-reliance prevents children from experiencing waiting, boredom, and creative problem-solving.
- **Emotional Regulation "Bypassing":** Handing a screaming toddler a smartphone to silence a tantrum prevents the child from learning self-soothing skills through co-regulation.

---

### Healthy Screen Habits for Social-Emotional Health
1. **Never use screens as an emotional pacifier:** Soothe distress with human presence, not a YouTube video.
2. **Adhere to AAP & WHO Guidelines:** Zero screen media under 2 (except family video calls); 1 hour max with adult co-viewing for ages 2–5.
3. **Protect Meals & Bedtime:** Keep mealtime tables and sleeping rooms completely screen-free to nurture conversation and restorative sleep.`,
      coachNotes:
        'Caution against using screens as emotional pacifiers to stop tantrums. It robs children of the chance to learn self-regulation.',
      quiz: {
        id: 'quiz-m5-l13',
        lessonId: 'ecd-m5-l13',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q13',
            prompt:
              'Why do pediatricians advise against routinely handing a smartphone to a toddler to silence their tantrum?',
            options: [
              'Because smartphones are too heavy for toddler hands.',
              'Because it bypasses the opportunity for the child to learn genuine emotional regulation and self-soothing through caregiver co-regulation.',
              'Because screens immediately erase all vocabulary.',
              'Because toddlers will break every phone within 10 seconds.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Using screens as an emotional pacifier prevents children from developing the neurological circuits required for emotional self-regulation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l14',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '14. Every Child Develops Differently',
      order: 14,
      hasVideo: false,
      content: `Children possess unique innate temperaments that influence how they interact with the world:

### Understanding Innate Temperaments
- **The Outgoing / Eager Child:** Dives into new social circles enthusiastically, vocalizes loudly, and seeks high stimulation.
- **The Slow-to-Warm / Cautious Child:** Observes quietly from a caregiver's lap before joining in, prefers small groups, and values predictability.
- **The Sensitive / Highly Reactive Child:** Easily overwhelmed by loud noises, scratchy clothing, or sudden routine changes.

> **Temperament is Not a Flaw:** A cautious, quiet child does **not** have an emotional disorder! Shyness or quiet observation is a normal personality variation. Adults must match their parenting style to the child's temperament (known clinically as **goodness of fit**).`,
      coachNotes:
        'Reinforce goodness of fit: parents should adapt their guidance to the child’s unique temperament rather than trying to force extroversion.',
      quiz: {
        id: 'quiz-m5-l14',
        lessonId: 'ecd-m5-l14',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q14',
            prompt:
              'A 3-year-old child prefers sitting quietly on a caregiver’s lap for 10 minutes observing other children before joining in play. How should this be viewed?',
            options: [
              'As a serious emotional defect requiring aggressive punishment.',
              'As a normal, healthy temperament variation (slow-to-warm) that should be respected with patience.',
              'As evidence that the child will never succeed in school.',
              'As rebellious disobedience.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'A cautious or observant temperament is completely normal. Forcing extroversion causes anxiety, while patient support builds confidence.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l15',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '15. Recognizing Concerns & Red Flags',
      order: 15,
      hasVideo: false,
      content: `While developmental variation is normal, certain signs warrant timely consultation with a pediatrician, child psychologist, or early intervention specialist:

### Clinical Red Flags in Social-Emotional Development
1. **Lack of Social Smiling or Eye Gaze:** No social smiles or warm engagement by 3–4 months; persistent avoidance of eye contact by 9 months.
2. **Absence of Shared Joy:** Does not point to show interest (*"Look at the dog!"*) or share enjoyment with caregivers by 12–15 months.
3. **Severe Developmental Regression:** A child who previously made eye contact, babbled, or enjoyed hugs suddenly withdraws or loses these skills.
4. **Persistent Inability to Be Soothed:** Cannot be comforted by primary caregivers despite routine feeding, rest, and holding.
5. **Extreme, Uncontrolled Aggression:** Daily, dangerous biting, hitting, or head-banging that does not respond to basic boundary setting.
6. **Complete Lack of Peer Interest:** Shows zero curiosity about other children by age 3 or 4.

> **The Power of Early Support:** Screening is not a stigma—it is the doorway to timely guidance that leverages early childhood brain plasticity.`,
      coachNotes:
        'Walk through social-emotional red flags. Emphasize that developmental regression is always a primary medical red flag.',
      quiz: {
        id: 'quiz-m5-l15',
        lessonId: 'ecd-m5-l15',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q15',
            prompt:
              'Which observation represents a critical social-emotional red flag requiring clinical evaluation?',
            options: [
              'A toddler who has a 3-minute tantrum when tired.',
              'A 2-year-old who prefers playing with blocks alongside another child without sharing.',
              'A child who shows complete absence of eye contact, loses previously acquired social skills, or avoids all social interaction.',
              'A 4-year-old who prefers blue shirts over red shirts.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Loss of previously mastered skills, absence of eye contact, and complete social detachment are significant red flags warranting prompt clinical evaluation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l16',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '16. Everyday Emotional Coaching Activities & Case Study',
      order: 16,
      hasVideo: false,
      content: `### African Family Case Study: Kofi and the Market Tantrum
**Kofi** is 2½ years old and lives in Kumasi. After walking through a bustling, hot market with his mother for two hours, Kofi spots a colorful toy horn. When his mother says *"No, Kofi, we came for yam and fish,"* Kofi screams, thrashes on the ground, and kicks a basket.

Bystanders comment: *"Your son is undisciplined! Beat him right now so he learns respect."*

#### Evidence-Based Analysis:
- Kofi was hungry, exhausted from heat and noise, and overwhelmed.
- Beating him in the market would increase fear and adrenaline without teaching self-regulation.
- **The Constructive Solution:**
  1. Calmly move Kofi to a shaded, safe spot away from foot traffic.
  2. Hold him firmly and speak in a low voice: *"You are very tired and hungry. It is hot. Mama has you."*
  3. Offer a drink of water.
  4. Once his breathing normalizes, explain clearly: *"We do not buy toys at the food market. Let's carry the yam together to the bus."*

---

### 4 Simple Emotional Coaching Games for Home
1. **Emotion Face Charades (Ages 2–5):** Make exaggerated faces—happy, sad, surprised, angry—and have children guess the feeling.
2. **The Calming Turtle (Ages 3–5):** Teach the child to pull their arms in like a turtle, close their eyes, and take 3 deep belly breaths when frustrated.
3. **The Cozy Calm-Down Corner:** Create a soft space with a cloth, pillow, and picture book where the child can retreat to rest when overwhelmed.
4. **Feelings Storytime:** Ask during any story: *"Why do you think the mother bird was worried? What made the little dog happy?"*`,
      coachNotes:
        'Discuss Kofi’s case study. Address the social pressure parents feel from bystanders and provide practical de-escalation tools.',
      quiz: {
        id: 'quiz-m5-l16',
        lessonId: 'ecd-m5-l16',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q16',
            prompt:
              'In Kofi’s case study at the market, what was the primary trigger for his emotional meltdown?',
            options: [
              'Kofi was deliberately trying to humiliate his family.',
              'Physical exhaustion, hunger, heat, and sensory overstimulation combined with immature emotional regulation.',
              'Kofi was possessed by stubbornness.',
              'Lack of severe physical beatings at home.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Sensory overstimulation, fatigue, hunger, and heat combined with toddler emotional immaturity frequently trigger intense meltdowns.',
          },
        ],
      },
    },
    {
      id: 'ecd-m5-l17',
      moduleId: 'ecd-m5',
      programId: 'ecd-cert',
      title: '17. Key Takeaways & Clinical Summary',
      order: 17,
      hasVideo: false,
      content: `### Summary of Core Principles
1. **Emotions Are Biological:** All feelings are natural. Social-emotional learning teaches children how to understand, express, and regulate them safely.
2. **Relationships Build Brains:** Secure attachment and serve-and-return interactions construct strong neurological foundations for life.
3. **Co-Regulation Precedes Self-Regulation:** Adults must lend children their calm before expecting children to self-soothe.
4. **Tantrums Are Developmental:** Meltdowns in toddlers reflect neurological immaturity, not calculated malice.
5. **Positive Discipline Teaches:** Set clear boundaries, use redirection, offer limited choices, and avoid physical or verbal shaming.
6. **Celebrate Communal Caregiving:** Extended family networks provide multiple secure attachment relationships.
7. **Protect Childhood From Digital Pacifiers:** Rely on human warmth and conversation, not screens, to soothe distressed young children.
8. **Honor Temperament:** Quiet or cautious temperaments are normal and deserve patient support.
9. **Act Early on Red Flags:** Seek professional developmental evaluation if skills regress or social engagement is absent.

---

### Professional Disclaimer
*This module is educational and provides evidence-based guidance for parents, caregivers, and community educators. It does not replace formal clinical assessment by a licensed pediatrician, child psychologist, or pediatric developmental specialist.*`,
      coachNotes:
        'Congratulate the learner on completing Module 5: Social & Emotional Development. Encourage them to complete their module quiz.',
      quiz: {
        id: 'quiz-m5-l17',
        lessonId: 'ecd-m5-l17',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm5-q17',
            prompt:
              'What is the foundational takeaway of social and emotional development in early childhood?',
            options: [
              'Children should be seen and not heard.',
              'Children develop emotional security and self-regulation through warm, responsive relationships and caregiver co-regulation.',
              'Emotional control is completely genetically fixed and cannot be influenced by adults.',
              'Discipline should always rely on physical punishment.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Warm, responsive relationships and supportive caregiver co-regulation provide the essential foundation for emotional security and lifelong mental health.',
          },
        ],
      },
    },
  ],
};
