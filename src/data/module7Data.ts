import { CourseModule } from '../types/studentPortal';

export const MODULE_7_PLAY_EARLY_LEARNING: CourseModule = {
  id: 'ecd-m7',
  programId: 'ecd-cert',
  title: '7. Play & Early Learning',
  order: 7,
  description:
    'Understand why play is the primary vehicle for early childhood brain architecture, cognitive problem-solving, and emotional regulation, and learn how to create rich, zero-cost learning environments using everyday household materials.',
  glossary: [
    {
      term: 'Play',
      definition:
        'A voluntary, intrinsically motivated, joyful activity chosen and directed by children that fosters active exploration and learning.',
    },
    {
      term: 'Free play',
      definition:
        'Child-led, unstructured play where the child decides what to do, how to do it, and for how long, with zero adult direction.',
    },
    {
      term: 'Guided play',
      definition:
        'Play in which an adult intentionally curates materials or an inviting environment while leaving the child in full control of the activity.',
    },
    {
      term: 'Constructive play',
      definition:
        'Play focused on building, assembling, or creating physical structures using materials like blocks, boxes, clay, or paper.',
    },
    {
      term: 'Pretend / Imaginative play',
      definition:
        'Play where children use symbolic thought to adopt roles, imagine scenarios, and transform objects (e.g., a stick becomes a horse).',
    },
    {
      term: 'Sensory play',
      definition:
        'Play that stimulates the senses—touch, sight, sound, smell, and balance—supporting neural pathways and spatial awareness.',
    },
    {
      term: 'Exploratory play',
      definition:
        'The primary play of infants and toddlers, investigating objects through sight, mouth, touch, dropping, and banging.',
    },
    {
      term: 'Executive function',
      definition:
        'Core mental skills—working memory, flexible thinking, and self-control—that children build while navigating rules and challenges in play.',
    },
    {
      term: 'Scaffolding',
      definition:
        'Support provided by an adult or peer that helps a child master a challenging step, gradually withdrawn as the child gains autonomy.',
    },
    {
      term: 'Open-ended materials',
      definition:
        'Objects with no single fixed purpose (cardboard boxes, plastic cups, cloth pieces) that stimulate limitless creative possibilities.',
    },
    {
      term: 'Child-led play',
      definition:
        'Play where the child initiates, directs, and determines the pace of activity, fostering deep engagement and independent problem-solving.',
    },
  ],
  references: [
    {
      title:
        'American Academy of Pediatrics (AAP). The Power of Play: A Pediatric Role in Enhancing Development in Young Children. Pediatrics, 2018.',
      url: 'https://publications.aap.org/pediatrics/article/142/3/e20182058/38649/The-Power-of-Play-A-Pediatric-Role-in-Enhancing',
    },
    {
      title: 'UNICEF. Learning through play: Strengthening learning through play in early childhood education programmes.',
      url: 'https://www.unicef.org/sites/default/files/2018-12/UNICEF-Lego-Foundation-Learning-through-Play.pdf',
    },
    {
      title: 'WHO & UNICEF. Nurturing Care for Early Childhood Development: Opportunities for Early Learning.',
      url: 'https://iris.who.int/bitstream/handle/10665/272603/9789241514064-eng.pdf',
    },
    {
      title:
        'Harvard Center on the Developing Child. Play: How Play Strengthens Executive Function and Brain Architecture.',
      url: 'https://developingchild.harvard.edu/resources/play-and-executive-function/',
    },
    {
      title: 'CDC. Positive Parenting Tips: Promoting Play and Early Learning.',
      url: 'https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/index.html',
    },
  ],
  lessons: [
    {
      id: 'ecd-m7-l01',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '1. Welcome to the Module: Play IS Learning',
      order: 1,
      hasVideo: false,
      content: `> **Clinical Observation:** A 3-year-old spends 20 minutes continuously nesting plastic cups inside one another, taking them apart, stacking them, and trying different orders. An adult glancing over might think: *"The child is just playing."*

What is the child actually practicing during those 20 minutes?
- **Spatial problem-solving:** Figuring out which cup fits inside which.
- **Hand-eye coordination & fine motor control:** Aligning rims and balancing edges.
- **Attention & sustained concentration:** Focusing on a self-chosen task.
- **Early mathematical foundations:** Concepts of size, volume, seriation, and sequencing.
- **Persistence & resilience:** Staying engaged when a tower collapses.

### The Central Scientific Truth of Early Childhood
Play is **not** a trivial pastime. Play is **not** a break from learning. **Play is the primary mechanism through which the young human brain learns about the world.**

Children do not require expensive commercial gadgets or electronic toys to develop high-level cognitive and social abilities. They require safe environments, everyday objects to explore, and warm, responsive adults who value their curiosity.`,
      coachNotes:
        'Welcome the learner to Module 7. Emphasize that play is not a break from learning—play is how brain architecture is built.',
      quiz: {
        id: 'quiz-m7-l01',
        lessonId: 'ecd-m7-l01',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q01',
            prompt:
              'How does modern pediatric science view the role of play in early childhood development?',
            options: [
              'Play is merely a leisure activity that should be replaced with academic worksheets as early as possible.',
              'Play is the primary neurological vehicle through which young children learn, problem-solve, and build brain architecture.',
              'Play is only beneficial if children use expensive electronic plastic toys.',
              'Play is harmful because it distracts children from strict discipline.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Major pediatric authorities (AAP, WHO, UNICEF) affirm that play is essential for healthy cognitive, physical, emotional, and social brain development.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l02',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '2. What Is Play? Free, Guided & Structured Play',
      order: 2,
      hasVideo: false,
      content: `Play is defined clinically as a voluntary, enjoyable, self-motivated activity pursued for its intrinsic joy rather than an adult-imposed outcome:

### Core Characteristics of True Play
- **Child-Initiated & Voluntary:** The child chooses the play out of innate curiosity.
- **Active Engagement:** The child is deeply absorbed, testing ideas and manipulating materials.
- **Meaningful:** The child connects play experiences to what they know about the world.
- **Joyful & Iterative:** Even when struggling to balance a block, the child experiences anticipation, joy, and the drive to repeat and refine.

---

### The Three Modes of Play Organization
1. **Free Play (Child-Led):**
   - The child chooses what to do, how to do it, and when to conclude. Adults provide supervision and a safe environment without directing the action.
   - *Benefit:* Fosters independence, decision-making, and intrinsic motivation.
2. **Guided Play (Child-Led, Adult-Supported):**
   - An adult sets up an intentional environment or provides materials (e.g., leaves, water cups, blocks) and joins the child by asking curious questions (*"I wonder what will happen if we add water?"*).
   - *Benefit:* Synthesizes learning with joyful autonomy; identified by researchers as the most effective mode for early academic concepts.
3. **Structured Activities (Adult-Directed):**
   - Adult-led games with explicit rules or instructions (e.g., Simon Says, structured sports).
   - *Benefit:* Teaches rule-following, but must never crowd out free and guided play.`,
      coachNotes:
        'Help students balance all three types of play, emphasizing that child-led guided play produces the highest cognitive gains.',
      quiz: {
        id: 'quiz-m7-l02',
        lessonId: 'ecd-m7-l02',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q02',
            prompt:
              'What defines "guided play" in early childhood education?',
            options: [
              'An adult lectures the child while they sit silently at a desk.',
              'An adult curates an inviting environment or materials, but the child directs the play while the adult asks open questions.',
              'Children are left completely alone with zero adult supervision.',
              'An adult forces the child to follow a rigid script.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Guided play combines child agency with supportive adult scaffolding, allowing the child to discover concepts autonomously.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l03',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '3. Why Play Matters: Brain Architecture across 4 Domains',
      order: 3,
      hasVideo: false,
      content: `During play, multiple areas of the brain activate simultaneously. A single playful experience enriches all four major developmental domains:

### 1. Physical & Motor Mastery
- **Gross Motor:** Running, jumping, balancing on logs, climbing steps, and throwing balls build bone density, cardiovascular health, and vestibular balance.
- **Fine Motor:** Squeezing clay, threading beads, and balancing pebbles refine the pincer grasp and manual dexterity necessary for later writing.

### 2. Cognitive & Intellectual Growth
- **Problem-Solving:** Figuring out why a cardboard tower falls and adjusting the base.
- **Working Memory:** Remembering where pieces fit or the roles in a pretend game.
- **Cause and Effect:** Observing how water pours faster through a wider cup opening.

### 3. Language & Communication
- **Conversational Turns:** Negotiating roles in dramatic play (*"I am the doctor, you are the patient"*).
- **Descriptive Vocabulary:** Learning textures (*rough, smooth, sticky*), spatial concepts (*inside, under, behind*), and quantities (*more, less*).

### 4. Social & Emotional Resilience
- **Co-Regulation & Frustration Tolerance:** Managing disappointment when a tower collapses and persevering to rebuild.
- **Empathy & Perspective-Taking:** Stepping into another person's shoes during pretend play.`,
      coachNotes:
        'Walk through how a single game of building blocks simultaneously exercises muscles, logic, vocabulary, and emotional perseverance.',
      quiz: {
        id: 'quiz-m7-l03',
        lessonId: 'ecd-m7-l03',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q03',
            prompt:
              'How does active pretend play contribute to a child’s social and emotional development?',
            options: [
              'It confuses children into believing fantasy is real.',
              'It allows children to practice empathy, negotiate social roles, manage frustration, and take other people’s perspectives.',
              'It causes children to isolate themselves permanently.',
              'It has zero effect on emotional development.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Pretend play allows children to safely explore emotions, understand different viewpoints, and practice conflict resolution.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l04',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '4. The 8 Core Types of Play',
      order: 4,
      hasVideo: false,
      content: `Children engage in diverse forms of play depending on their age, temperament, and environment:

### The 8 Essential Types of Play
1. **Exploratory Play:** Investigating objects through sensory interaction (looking, touching, shaking, tasting). Dominates infancy and early toddlerhood.
2. **Physical / Motor Play:** Running, climbing, spinning, jumping, rolling, and dancing. Strengthens gross motor skills and vestibular integration.
3. **Sensory Play:** Engaging touch, water, mud, sand, safe dough, and textures. Soothes the nervous system and refines tactile processing.
4. **Constructive Play:** Building towers, assembling boxes, crafting with clay, or piecing together natural materials.
5. **Pretend / Dramatic Play:** Taking on roles (playing *"market," "clinic," "cooking"*), transforming objects symbolically, and creating narratives.
6. **Social Play:** Interacting with peers or adults, practicing turn-taking, sharing attention, and cooperating.
7. **Games with Rules:** Hide-and-seek, tag, simple board games, and matching games. Common from age 4 onward; teaches self-regulation.
8. **Creative Play:** Unrestricted artistic expression through singing, rhythmic drumming, painting, and dancing.`,
      coachNotes:
        'Walk through the 8 types of play. Highlight that children naturally oscillate between these modes throughout a single day.',
      quiz: {
        id: 'quiz-m7-l04',
        lessonId: 'ecd-m7-l04',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q04',
            prompt:
              'A 4-year-old child and their sibling use a cardboard box as a "bus" and take turns acting as the driver and passenger. What types of play are they combining?',
            options: [
              'Only solitary play.',
              'Pretend/imaginative play, constructive play, and social cooperative play.',
              'Only passive sensory play.',
              'Competitive adult sports.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Transforming a cardboard box into a bus and assigning roles integrates imaginative dramatic play, constructive creativity, and social collaboration.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l05',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '5. Play Progression from 0 to 5 Years',
      order: 5,
      hasVideo: false,
      content: `Play matures in complexity as cognitive and motor capabilities expand:

### 0 to 12 Months: Sensorimotor & Attachment Play
- Gaze attunement, social smiling, following facial expressions.
- Floor play: tummy time, reaching for safe plastic rings, grasping rattles.
- Peekaboo and reciprocal vocal turn-taking.
- Banging clean spoons on pots to discover sound cause-and-effect.

### 1 to 2 Years: Functional & Cause-and-Effect Play
- Stacking and knocking down blocks; nesting plastic bowls.
- Pushing and pulling rolling toys or empty boxes.
- Simple water pouring (with close adult supervision).
- Imitating daily routines (pretending to sweep, stirring a spoon in a bowl).

### 2 to 3 Years: Parallel Play & Early Pretend
- Playing near other children with similar toys (parallel play).
- Scribbling with crayons; solving 2- to 4-piece wooden puzzles.
- Pretend play begins: feeding a doll with a stick, talking into a toy phone.
- Running, jumping off low steps, kicking large balls.

### 3 to 4 Years: Cooperative & Storytelling Play
- Collaborative play with peers: assigning roles in games of house or school.
- Building complex bridges and towers with blocks.
- Drawing recognizable circles, lines, and human stick figures.
- Participating in games with simple rules (tag, hide-and-seek).

### 4 to 5 Years: Rule-Based & Complex Creative Play
- Elaborate fantasy scenarios with storylines spanning multiple days.
- Creating construction projects with recycled cardboard and bottles.
- Engaging in games with structured rules and turn-taking.
- Early writing play (pretending to write shopping lists or letters).`,
      coachNotes:
        'Trace the progression from sensorimotor infant exploration to complex preschool dramatic storytelling.',
      quiz: {
        id: 'quiz-m7-l05',
        lessonId: 'ecd-m7-l05',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q05',
            prompt:
              'Which play activity is most developmentally typical for a 15-month-old toddler?',
            options: [
              'Playing an intricate game of chess with strict rules.',
              'Stacking plastic cups, pushing a wheeled toy, and imitating sweeping with a small broom.',
              'Writing multi-paragraph essays.',
              'Sitting motionless for 3 hours.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Toddlers aged 12–18 months thrive on functional cause-and-effect play, stacking, pushing/pulling, and imitating familiar household routines.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l06',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '6. Learning Through Everyday Household Objects',
      order: 6,
      hasVideo: false,
      content: `Many families assume that educational play requires commercial plastic toys from specialty stores. Scientific research demonstrates that **open-ended household objects stimulate greater creativity and cognitive flexibility**:

### 9 High-Value Everyday Learning Materials
1. **Plastic Cups & Bowls:** Stacking, nesting, water pouring, sorting by size, counting.
2. **Cardboard Boxes:** Crawling tunnels, buses, stoves, houses, miniature beds.
3. **Clean Empty Containers:** Filling with beans or dry maize, shaking for rhythm, unscrewing lids.
4. **Wooden Spoons & Whisks:** Drumming rhythms, pretend cooking, stirring soup.
5. **Fabric & Cloth Remnants:** Capes, doll blankets, folding, tying, texture exploration.
6. **Scrap Paper & Cardboard:** Tearing, crumpling, folding, drawing, making paper balls for tossing.
7. **Smooth River Pebbles & Dry Beans:** (For children over 3 with supervision) Sorting by color, size, and counting.
8. **Natural Leaves & Twigs:** Exploring leaf veins, making nature collages, building animal enclosures.
9. **Water & Sponges:** Squeezing water, transferring water between bowls, learning absorption.

---

### Non-Negotiable Play Safety Standards
- **Choking Hazard Rule:** Any object small enough to fit entirely inside a standard toilet paper roll is a choking hazard for children under 3!
- **Sharp & Chemical Free:** Never give broken plastic with sharp edges, metal tins with burrs, or containers that held bleach, chemicals, or medicines.
- **Supervision:** Water play and small sorting items require constant adult oversight.`,
      coachNotes:
        'Highlight the toilet paper roll choking rule. Remind learners that open-ended household items inspire more creativity than single-purpose electronic toys.',
      quiz: {
        id: 'quiz-m7-l06',
        lessonId: 'ecd-m7-l06',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q06',
            prompt:
              'Why do developmental experts encourage using open-ended everyday household objects (like cardboard boxes and plastic cups) for play?',
            options: [
              'Because they force children to become future factory workers.',
              'Because they are open-ended, allowing children to invent infinite uses, which stimulates greater cognitive creativity and problem-solving than single-purpose toys.',
              'Because commercial toys are dangerous in all circumstances.',
              'Because children should never have fun.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Open-ended objects stimulate imagination, symbolic representation, and creative problem-solving because the child must decide how to transform the object.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l07',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '7. Child-Led Play: Following the Child’s Lead',
      order: 7,
      hasVideo: false,
      content: `**Child-led play** means the child chooses the activity, determines the rules, and sets the pace, while the adult offers supportive presence without taking over:

### How Adults Support Child-Led Play
- **Observe First:** Before speaking, watch what the child is doing. Notice their intention (*"Ah, she is trying to make the bridge stand"*).
- **Join on Their Terms:** Sit on the floor at eye level. If the child is rolling a stone, roll a stone alongside them.
- **Avoid Taking Over:** If a child's tower leans precariously, resist the urge to straighten it immediately. Experiencing the collapse and redesigning the base is where profound engineering logic occurs!
- **Ask Wondering Questions:**
  - *Instead of testing:* *"What color is this block?"*
  - *Ask wonder questions:* *"I wonder what will happen if we put this heavy block on top?"*
- **Offer Effort-Focused Encouragement:** *"You tried three different ways until that wheel spun! Look at your persistence."*`,
      coachNotes:
        'Teach adults how to step back. The urge to "fix" a child’s tower robs them of learning cause and effect.',
      quiz: {
        id: 'quiz-m7-l07',
        lessonId: 'ecd-m7-l07',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q07',
            prompt:
              'When an adult participates in child-led play, what is the most constructive posture?',
            options: [
              'Immediately taking the toys and demonstrating the "correct" way to play.',
              'Observing, joining at the child’s pace, asking wondering questions, and allowing the child to experiment and make mistakes.',
              'Testing the child with strict academic quizzes every 2 minutes.',
              'Criticizing the child whenever their building falls down.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Supportive child-led play requires following the child’s cues, asking thoughtful open questions, and giving them the autonomy to experiment.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l08',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '8. Scaffolding, Presence & Open Questions',
      order: 8,
      hasVideo: false,
      content: `**Scaffolding** is a developmental technique where an adult offers just enough assistance to help a child accomplish a task slightly beyond their independent capacity, then gradually fades that support:

### The 4 Steps of Effective Play Scaffolding
1. **Assess the Zone:** Notice where the child is struggling (e.g., trying to put a square peg into a round hole).
2. **Offer a Hint, Not the Solution:**
   - *Adult:* *"Look at the shape of that hole. Does it have corners like this block?"*
3. **Model Briefly If Needed:** Turn the block slightly to demonstrate the orientation, then hand it back to the child to complete.
4. **Step Back:** Celebrate the child's accomplishment: *"You rotated it until it matched!"*

---

### Questions That Expand vs. Questions That Constrict
| Constricting Test Questions | Expanding Wonder Questions |
| :--- | :--- |
| *"Is this a cow? Say cow!"* | *"What do you think this cow is looking for in the grass?"* |
| *"What number is that?"* | *"How many stones do we need so each animal has one to eat?"* |
| *"You're doing it wrong, do this."* | *"What do you think would happen if we tried it upside down?"* |`,
      coachNotes:
        'Differentiate test questions from wonder questions. Wonder questions fuel creative thinking.',
      quiz: {
        id: 'quiz-m7-l08',
        lessonId: 'ecd-m7-l08',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q08',
            prompt:
              'In educational play, what does "scaffolding" mean?',
            options: [
              'Building physical wooden scaffolding around children for safety.',
              'Providing temporary, tailored support to help a child solve a challenging step, then gradually stepping back as mastery grows.',
              'Forcing children to memorize rules before playing.',
              'Grading a child’s artwork on a scale of 1 to 10.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Scaffolding provides just enough guidance to bridge the gap between what a child can do alone and what they can achieve with gentle support.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l09',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '9. Creating Safe & Stimulating Play Environments',
      order: 9,
      hasVideo: false,
      content: `A play-rich home does not require dedicated playrooms. It requires intentional organization of safety and accessibility:

### Practical Play Environment Essentials
- **Accessible Low Storage:** Place play materials in low cardboard boxes or baskets so the child can choose items independently without asking an adult for permission every time.
- **Rotate, Don't Overwhelm:** Having 50 toys scattered creates chaotic overstimulation. Present 3 to 4 open-ended items (e.g., blocks and cups); rotate other items next week to reignite fresh curiosity.
- **Dedicated Uninterrupted Time:** Protect 30 to 45 minutes of daily uninterrupted play where screens are turned off and adults are present without distraction.
- **Physical Safety Hazards to Eliminate:**
  - Secure unstable furniture or heavy drawers that could tip over.
  - Keep electrical wires, hot cooking pots, kerosene stoves, and open buckets of water strictly inaccessible.`,
      coachNotes:
        'Emphasize toy rotation. Having fewer items accessible at one time dramatically increases depth of concentration.',
      quiz: {
        id: 'quiz-m7-l09',
        lessonId: 'ecd-m7-l09',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q09',
            prompt:
              'Why do early childhood specialists recommend rotating a small selection of play materials rather than having dozens of toys out simultaneously?',
            options: [
              'Because children should be punished by having toys hidden.',
              'Because having too many toys scattered creates sensory overload, whereas rotating a few items promotes deeper focus, sustained play, and creativity.',
              'Because toys wear out if looked at too often.',
              'Because children only have memory for one item.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Rotating a modest selection of open-ended materials reduces chaos and overstimulation, leading to richer imagination and longer concentration spans.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l10',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '10. Play, Executive Function & Problem-Solving',
      order: 10,
      hasVideo: false,
      content: `**Executive function** skills are the "air traffic control system" of the human brain. Harvard Center on the Developing Child highlights play as the foremost crucible for training these skills:

### The 3 Core Executive Function Capacities Trained in Play
1. **Working Memory:**
   - *In Play:* Remembering the plot of a pretend game, holding rules in mind during hide-and-seek, or recalling which piece goes where in a puzzle.
2. **Inhibitory Control (Self-Regulation):**
   - *In Play:* Waiting for one's turn to slide down a ramp, resisting the impulse to knock over a peer's tower, or freezing during musical games.
3. **Cognitive Flexibility (Mental Agility):**
   - *In Play:* Changing strategy when a block structure collapses, adapting roles when a new friend joins the game, or imagining a stick as a spoon, then as a magic wand.

> **Lifelong Clinical Significance:** Executive function skills developed through early play are stronger predictors of school readiness and academic success than raw IQ or early rote memorization!`,
      coachNotes:
        'Connect early childhood play directly to executive function: working memory, self-control, and mental flexibility.',
      quiz: {
        id: 'quiz-m7-l10',
        lessonId: 'ecd-m7-l10',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q10',
            prompt:
              'Which cognitive capacity is strongly developed when children engage in self-directed pretend play and rule-based games?',
            options: [
              'Rote memorization of telephone directories.',
              'Executive function skills (working memory, inhibitory self-control, and cognitive flexibility).',
              'The ability to stare at television screens for 10 hours.',
              'Loss of physical coordination.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Play strengthens executive function, which allows children to plan, focus attention, remember instructions, and balance multiple tasks successfully.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l11',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '11. Outdoor & Nature Play in Early Childhood',
      order: 11,
      hasVideo: false,
      content: `Outdoor play offers unique developmental benefits that cannot be duplicated indoors:

### Developmental Gifts of the Outdoors
- **Unrestricted Gross Motor Movement:** Running at full speed, shouting with joy, rolling on grass, and throwing stones into puddles release energy and develop core stamina.
- **Sensory Richness:** Feeling warm sunshine, cool breeze, coarse tree bark, moist soil, and uneven gravel challenges proprioception and balance.
- **Manageable Risk-Taking:** Climbing a low tree branch or stepping across rocks teaches children how to assess physical risk, judge depth, and build courage safely.
- **Stress Reduction & Restorative Attention:** Natural environments lower cortisol levels, soothing sensory-overloaded children and resetting attention spans.

> **Safety Protocol:** Always inspect outdoor play zones for broken glass, deep open drainage ditches, aggressive animals, or unattended bodies of water.`,
      coachNotes:
        'Advocate for daily outdoor play. Even 30 minutes in a courtyard or compound builds stamina and emotional balance.',
      quiz: {
        id: 'quiz-m7-l11',
        lessonId: 'ecd-m7-l11',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q11',
            prompt:
              'What unique developmental advantage does outdoor natural play offer young children?',
            options: [
              'It forces children to stay completely silent.',
              'It provides sensory richness, develops gross motor stamina, allows healthy manageable risk assessment, and reduces stress.',
              'It eliminates the need for adult supervision completely.',
              'It prevents children from making friends.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Natural outdoor play provides physical challenge, multi-sensory stimulation, healthy risk management, and restorative calm.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l12',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '12. African Family Case Study: Playful Learning in Douala & Lagos',
      order: 12,
      hasVideo: false,
      content: `### Clinical Case Scenario
**Ngozi** is 3 years old and lives in a vibrant compound in Lagos, Nigeria. Her mother, **Blessing**, works hard managing a household and petty trading. Blessing worries because she cannot afford the imported electronic learning tablets and plastic toys advertised on television.

A neighbor tells Blessing: *"If you do not buy educational toys, your daughter will fall behind when she starts nursery school."*

Blessing visits an early childhood community health educator, who observes Ngozi playing in the courtyard:
- Ngozi collects clean bottle caps, arranging them into lines by color.
- She pours dry sand from an empty tin into a plastic cup using a mango leaf as a scoop.
- She sings a traditional call-and-response song with her older cousin while clapping complex rhythms.

---

### Clinical Assessment & Guidance
1. **Is Ngozi learning?**
   - **Profoundly.** Ngozi is practicing classification, volume seriation, fine motor pincer grasping, auditory rhythm, and cultural storytelling.
2. **Does Blessing need expensive commercial toys?**
   - **No.** The educator assures Blessing: *"Ngozi’s play with bottle caps, sand, and songs is building elite neural pathways. You are already providing the richest possible learning environment."*
3. **Actionable Suggestions for Blessing:**
   - Sit with Ngozi for 10 minutes: *"Tell me about the food you are cooking with the sand!"*
   - Add cardboard boxes and clean cloth scraps to expand her building possibilities.`,
      coachNotes:
        'Use Blessing and Ngozi’s story to eliminate guilt. Cultural songs, compound sand play, and bottle cap sorting are world-class early learning.',
      quiz: {
        id: 'quiz-m7-l12',
        lessonId: 'ecd-m7-l12',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q12',
            prompt:
              'In the case study of Ngozi in Lagos, what does her play with bottle caps, sand, and traditional songs prove?',
            options: [
              'That she is wasting time and needs immediate worksheets.',
              'That rich, high-level early learning occurs naturally using low-cost everyday materials and cultural songs without expensive imported toys.',
              'That bottle caps cause intellectual delays.',
              'That children should never play in courtyards.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Ngozi’s play develops classification, volume, fine motor precision, and cultural literacy at zero cost, showing that expensive commercial toys are unnecessary.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l13',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '13. 5 Practical Everyday Low-Cost Play Activities',
      order: 13,
      hasVideo: false,
      content: `Here are 5 zero-cost, high-impact activities parents and childcare workers can introduce immediately:

### Activity 1: The Kitchen Band (Ages 6m–3y)
- **Materials:** Wooden spoons, plastic bowls, empty metal pots.
- **Action:** Tap slow rhythms, fast rhythms, loud and soft beats. Sing familiar songs and pause to let the child tap their "turn."
- **Skills:** Auditory processing, impulse control, rhythm, turn-taking.

### Activity 2: The Cardboard City (Ages 2–5y)
- **Materials:** Old biscuit boxes, toothpaste cartons, scrap cardboard.
- **Action:** Stack boxes into houses, draw doors with a pencil, make cardboard roads for toy or pebble cars.
- **Skills:** Engineering balance, spatial visualization, fine motor drawing, pretend narratives.

### Activity 3: Water Transfer & Pouring (Ages 1–4y)
- **Materials:** Basin of clean water, 2 plastic cups, a small kitchen sponge.
- **Action:** Dip the sponge in water, transfer it to the empty cup, and squeeze the water out. Pour water back and forth.
- **Skills:** Hand strength, bilateral coordination, volume concepts, tactile soothing.

### Activity 4: Nature Treasure Hunt (Ages 2–5y)
- **Materials:** An empty egg carton or small bowl.
- **Action:** Ask the child to find: *"1 yellow leaf, 2 smooth stones, 1 feather, 1 dry twig."*
- **Skills:** Counting, sensory comparison, outdoor exploration, following multi-step directions.

### Activity 5: Blanket Tent Adventures (Ages 18m–5y)
- **Materials:** A clean bedsheet or wrapper draped over two chairs.
- **Action:** Crawl inside the "cave" or "clinic" with a flashlight or book.
- **Skills:** Spatial awareness, dramatic storytelling, feeling cozy and emotionally secure.`,
      coachNotes:
        'Walk through the 5 activities. Encourage students to try at least one activity with children in their care this week.',
      quiz: {
        id: 'quiz-m7-l13',
        lessonId: 'ecd-m7-l13',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q13',
            prompt:
              'In the "Water Transfer & Pouring" activity, what fundamental physical and cognitive skills are strengthened?',
            options: [
              'Only swimming skills.',
              'Hand grip strength, fine motor coordination, understanding of liquid volume, and sensory tactile regulation.',
              'Spelling and grammatical conjugation.',
              'Passive obedience.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Squeezing sponges and pouring water builds intrinsic hand muscles, coordination, and intuitive concepts of liquid volume.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l14',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '14. 10 Common Mistakes Adults Make Regarding Play',
      order: 14,
      hasVideo: false,
      content: `Awareness of these 10 common adult habits ensures children receive authentic play opportunities:

1. **Viewing Play as a Waste of Time:** Believing learning only happens when a child sits quietly with a pen and book.
2. **Over-Directing & Taking Over:** Dictating how the blocks must be stacked or how the doll must be dressed.
3. **Turning Play into an Exam:** Constantly asking interrogating test questions (*"What color is this? What shape is that? What is its name?"*).
4. **Believing Expensive Equals Educational:** Spending scarce household income on plastic gadgets while ignoring cardboard boxes and pots.
5. **Replacing Play with Digital Screens:** Handing toddlers smartphones or tablets instead of real sensory materials.
6. **Eliminating All Manageable Risk:** Forbidding children from climbing a low step or balancing on a log out of excessive fear.
7. **Obsessing Over Mess:** Forbidding water, mud, or paper tearing because cleaning up is inconvenient.
8. **Interfering Too Quickly During Conflict:** Resolving every small toy dispute instantly rather than helping children negotiate.
9. **Ignoring the Child’s Cues:** Forcing a child to continue a game when they are exhausted, overstimulated, or disinterested.
10. **Eliminating Daily Free Play:** Filling every waking hour with rigid drills, adult-led lessons, and chores.`,
      coachNotes:
        'Review the 10 mistakes. Encourage parents to embrace healthy, safe messes like water play and cardboard scrap building.',
      quiz: {
        id: 'quiz-m7-l14',
        lessonId: 'ecd-m7-l14',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q14',
            prompt:
              'Which adult habit unintentionally harms a young child’s spontaneous play experience?',
            options: [
              'Providing a cardboard box and clean plastic cups.',
              'Constantly turning play into an interrogation by peppering the child with rapid-fire academic test questions.',
              'Singing traditional songs while clapping hands.',
              'Sitting nearby quietly and observing with a warm smile.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Turning play into an academic test creates pressure, shifting the child’s brain from relaxed exploratory curiosity into defensive performance anxiety.',
          },
        ],
      },
    },
    {
      id: 'ecd-m7-l15',
      moduleId: 'ecd-m7',
      programId: 'ecd-cert',
      title: '15. Key Takeaways & Clinical Summary',
      order: 15,
      hasVideo: false,
      content: `### Summary of Core Principles
1. **Play IS Learning:** Through play, young children build neural architecture across cognitive, motor, language, and emotional domains.
2. **Everyday Objects are Gold:** Cardboard boxes, plastic bowls, spoons, and natural leaves inspire greater creative ingenuity than commercial electronic toys.
3. **Follow the Child's Lead:** Observe, join gently, ask wondering questions, and allow children to test ideas and make safe mistakes.
4. **Scaffolding Builds Mastery:** Offer just enough support to bridge challenges, then step back as the child gains autonomy.
5. **Executive Function Engine:** Play is the premier gymnasium for developing working memory, self-control, and flexible thinking.
6. **Protect Unstructured Play Time:** Guarantee daily uninterrupted free and guided play; do not let passive screen time displace human play.
7. **Embrace Nature & Movement:** Outdoor play provides essential sensory processing, vestibular balance, and stress relief.

---

### Professional Disclaimer
*This module is educational and provides evidence-based guidance for parents, caregivers, and early childhood practitioners. It does not replace formal clinical assessment or individual developmental therapy by a licensed pediatrician, occupational therapist, or child psychologist.*`,
      coachNotes:
        'Congratulate the learner on completing Module 7: Play & Early Learning. Encourage them to complete their module quiz and reflect on their play practices.',
      quiz: {
        id: 'quiz-m7-l15',
        lessonId: 'ecd-m7-l15',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm7-q15',
            prompt:
              'What is the foundational takeaway regarding play and early learning for families and educators?',
            options: [
              'Children only learn when seated quietly doing rote academic drills.',
              'Play is essential brain-building work; children thrive when provided safe, open-ended materials and responsive, loving interactions.',
              'Play should be prohibited after age 2.',
              'Children require expensive electronic tablets to become intelligent.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Play is the fundamental vehicle of early learning. Safe open-ended exploration with warm, responsive caregivers lays the foundation for lifelong cognitive and emotional success.',
          },
        ],
      },
    },
  ],
};
