import { CourseModule } from '../types/studentPortal';

export const MODULE_9_SUPPORTING_HEALTHY_DEVELOPMENT: CourseModule = {
  id: 'ecd-m9',
  programId: 'ecd-cert',
  title: '9. Supporting Healthy Development',
  order: 9,
  description:
    'Master the interconnected everyday factors that drive early childhood thriving—including infant nutrition, responsive feeding, restorative sleep, movement, hygiene, preventive healthcare, and stress-buffering caregiving from birth to age five.',
  glossary: [
    {
      term: 'Healthy development',
      definition:
        'A dynamic, holistic process wherein a child grows, learns, and matures across physical, cognitive, linguistic, social, and emotional domains simultaneously.',
    },
    {
      term: 'Exclusive breastfeeding',
      definition:
        'Giving an infant only breast milk with no other foods or liquids (not even water) for the first six months of life, with the exception of necessary oral rehydration solutions, vitamins, or prescribed medicines.',
    },
    {
      term: 'Complementary feeding',
      definition:
        'The process starting at 6 months of introducing nutrient-dense solid or semi-solid foods alongside continued breastfeeding to meet evolving nutritional needs.',
    },
    {
      term: 'Responsive feeding',
      definition:
        'A feeding practice where caregivers actively recognize and sensitively respond to a child’s physiological hunger and satiety cues without force or excessive restriction.',
    },
    {
      term: 'Sleep consolidation',
      definition:
        'The neurological maturation process through which fragmented infant sleep shifts into longer, predictable nocturnal blocks and scheduled daytime naps.',
    },
    {
      term: 'Moderate-to-vigorous physical activity (MVPA)',
      definition:
        'Physical movement that elevates heart rate and breathing, such as running, jumping, climbing, dancing, and brisk outdoor play.',
    },
    {
      term: 'Tummy time',
      definition:
        'Supervised, awake floor play where an infant is placed on their abdomen to develop neck, shoulder, and spinal extensor musculature.',
    },
    {
      term: 'Sedentary restraint',
      definition:
        'Confining an infant or toddler to a stationary seat, stroller, high chair, or car carrier without free movement for prolonged periods.',
    },
    {
      term: 'Preventive healthcare',
      definition:
        'Proactive health interventions including routine immunizations, growth anthropometry, vitamin A supplementation, deworming, and developmental surveillance.',
    },
    {
      term: 'Growth faltering',
      definition:
        'A rate of weight or height gain significantly below clinical percentiles for age, signaling acute or chronic nutritional and developmental inadequacy.',
    },
    {
      term: 'Serve and return',
      definition:
        'The reciprocal, back-and-forth communicative interactions between child and adult that build foundational neural circuitry.',
    },
    {
      term: 'Displacement hypothesis',
      definition:
        'The developmental finding that passive digital screen media harms young children primarily by displacing essential sleep, active movement, and human conversational exchange.',
    },
  ],
  references: [
    {
      title: 'WHO & UNICEF. Global Strategy for Infant and Young Child Feeding.',
      url: 'https://iris.who.int/handle/10665/42590',
    },
    {
      title: 'World Health Organization (WHO). Guidelines on Physical Activity, Sedentary Behaviour and Sleep for Children Under 5 Years of Age.',
      url: 'https://iris.who.int/handle/10665/311664',
    },
    {
      title: 'American Academy of Pediatrics (AAP). Infant Nutrition, Complementary Feeding and Pediatric Health Guidelines.',
      url: 'https://www.healthychildren.org',
    },
    {
      title: 'UNICEF. Improving Child Nutrition: The Achievable Imperative for Global Progress.',
      url: 'https://www.unicef.org/nutrition',
    },
    {
      title: 'Centers for Disease Control and Prevention (CDC). Early Childhood Immunization Schedules and Developmental Monitoring.',
      url: 'https://www.cdc.gov/vaccines/schedules/easy-to-read/child-easyread.html',
    },
  ],
  lessons: [
    {
      id: 'ecd-m9-l01',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '1. Welcome to the Module: The Everyday Web of Thriving',
      order: 1,
      hasVideo: false,
      content: `> **Clinical Perspective:** Early childhood thriving does not emerge from a single isolated action or luxury purchase. It is the synergistic result of everyday routines operating in harmony: nutrition, restorative sleep, physical activity, emotional security, safety, hygiene, and responsive relationships.
>
> When any one pillar weakens—for instance, when a child experiences chronic sleep deficit or inadequate micronutrients—every other domain from emotional regulation to memory encoding suffers.

### The Interconnected Web of Daily Health Factors
Healthy child development rests upon multiple everyday foundations working simultaneously:
1. **Adequate Nutrition & Clean Hydration:** Fueling rapid cellular growth and neurotransmitter synthesis.
2. **Restorative Sleep & Predictable Rest:** Consolidating neural pathways, releasing growth hormone, and clearing metabolic waste.
3. **Daily Physical Movement:** Building muscular tone, skeletal density, and sensory-motor coordination.
4. **Safety & Protection from Harm:** Eliminating hazards and establishing stress-free environments.
5. **Responsive Human Relationships:** Wiring brain architecture through warm back-and-forth exchanges.
6. **Self-Directed Play & Sensory Exploration:** Cultivating problem-solving, curiosity, and executive function.
7. **Everyday Hygiene & Sanitation:** Preventing enteric pathogens, respiratory infections, and parasitic infestations.
8. **Preventive Healthcare & Routine Immunization:** Shielding vulnerable immune systems from vaccine-preventable mortality.

### The Realistic Real-World Focus
Development is **never a high-stakes exam or checklist** that parents must execute with robotic perfection. Every household navigates unique financial and cultural realities. The goal is to establish predictable, caring, and evidence-informed routines that enable young children to thrive in daily life.`,
      coachNotes:
        'Welcome the learner to Module 9. Emphasize that healthy development is holistic and interconnected rather than a collection of separate checkboxes.',
      quiz: {
        id: 'quiz-m9-l01',
        lessonId: 'ecd-m9-l01',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q01',
            prompt: 'Which statement accurately describes how everyday factors impact early childhood development?',
            options: [
              'Development is determined exclusively by genetic inheritance regardless of daily nutrition or sleep.',
              'Daily factors like nutrition, sleep, movement, hygiene, and relationships are deeply interconnected and reinforce one another.',
              'Only formal classroom academic instruction between ages 0 and 5 affects brain development.',
              'Sleep and nutrition have zero influence on a child’s emotional regulation or social interactions.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Development is an interconnected ecological system where physiological health, sleep, nutrition, and warm caregiving directly influence emotional regulation, learning, and physical growth.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l02',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '2. What Does Healthy Development Mean? Holistic Integration',
      order: 2,
      hasVideo: false,
      content: `**Healthy development** means a child is actively growing, learning, and functioning well across all core domains simultaneously:

### The Six Integrated Domains of Early Development
1. **Physical Health:** Robust physiological functioning, adequate weight and stature velocity, resilience against infectious disease, and freedom from chronic physical pain.
2. **Physical / Motor Development:** Maturation of gross motor stability (crawling, jumping, running) and fine motor dexterity (pincer grasp, utensil manipulation, bilateral hand use).
3. **Cognitive Development:** The expanding capacity to observe, hypothesize, retain information, deduce cause-and-effect, and resolve novel challenges.
4. **Language & Communication:** Receptive comprehension of vocabulary and social intent, paired with expressive speech, vocalizations, and gestural fluency.
5. **Social Development:** Formulating secure attachments, engaging in cooperative peer play, and developing pro-social empathy.
6. **Emotional Development:** Identifying emotional states, accepting adult co-regulation, developing self-efficacy, and building intrinsic confidence.

### Clinical Example: The Interconnected 2-Year-Old
Consider a 24-month-old toddler who receives diverse, iron-rich meals, sleeps 12 hours including an afternoon nap, runs freely outdoors, and enjoys frequent conversational exchanges:
- **High Energy & Focus:** The physiological reserve allows extended exploratory play.
- **Emotional Equilibrium:** A well-rested nervous system tolerates small frustrations without catastrophic meltdowns.
- **Cognitive Leaps:** Ample floor exploration stimulates spatial reasoning and rapid vocabulary acquisition.

Conversely, a child suffering from subclinical iron deficiency, chronic ambient noise disrupting sleep, and four hours of daily passive television will present with irritability, poor attention span, delayed speech milestones, and reduced physical stamina.`,
      coachNotes:
        'Help learners recognize that motor, cognitive, and emotional development do not occur in silos—they depend on underlying physiological wellness.',
      quiz: {
        id: 'quiz-m9-l02',
        lessonId: 'ecd-m9-l02',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q02',
            prompt: 'Why might a toddler with chronic sleep deprivation exhibit frequent behavioral meltdowns during preschool play?',
            options: [
              'Sleep deprivation only affects physical muscle growth, not neurological functions.',
              'Fatigue directly impairs prefrontal cortex executive control and emotional co-regulation, reducing distress tolerance.',
              'The child is deliberately displaying defiance to test teachers.',
              'Sleep quantity has no established medical relationship with mood.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Inadequate sleep depletes prefrontal executive functioning, making it biologically harder for young children to regulate emotional distress or cooperate with peers.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l03',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '3. Nutrition Foundations: Breastfeeding & Micronutrients',
      order: 3,
      hasVideo: false,
      content: `The first 1,000 days of life (from conception to age two) represent the most critical window of neurodevelopment and linear physical growth. Brain tissue quadruples in weight, forming hundreds of billions of synaptic connections requiring heavy nutritional investment.

### WHO & UNICEF Gold Standard Feeding Guidelines
1. **Early Initiation:** Initiate breastfeeding within the first hour after birth. Early colostrum ("liquid gold") delivers maternal immunoglobulins (IgA), leukocytes, and protective prebiotic oligosaccharides.
2. **Exclusive Breastfeeding for 6 Months:** For the first 180 days of life, an infant requires **only** breast milk. No water, teas, glucose solutions, or porridges are permitted. Breast milk is over 85% biological water and fulfills 100% of fluid and nutrient requirements while preventing fatal enteric contamination.
3. **Sustained Breastfeeding to 2 Years and Beyond:** Breast milk continues providing up to 50% of an infant’s energy needs between 6–12 months, and approximately one-third between 12–24 months, alongside critical immune antibodies.

### Critical Pediatric Micronutrients
- **Iron:** Fundamental for cerebral oligodendrocyte maturation and myelination of white matter tracts. Deficiency causes irreversible cognitive deficits and microcytic anemia. Sources: organ meats, dark poultry, eggs, crushed beans, iron-fortified baby cereals.
- **Vitamin A:** Essential for ocular retinal integrity, epithelial barrier defense, and immune phagocytosis. Sources: orange/yellow vegetables (carrots, pumpkin, sweet potato), mango, dark green leafy vegetables, liver.
- **Healthy Lipids (DHA / ARA):** 60% of brain tissue is lipid-based. Essential fatty acids support neuronal membrane fluidity and synaptic speed. Sources: breast milk, cold-water fish, avocados, clean vegetable oils, groundnuts.
- **Zinc & Calcium:** Essential for linear skeletal growth, osteogenesis, and cellular immune proliferation. Sources: dairy, small dried fish eaten with soft bones, legumes.`,
      coachNotes:
        'Highlight the critical importance of exclusive breastfeeding for the first 6 months with zero water, and the irreplaceable role of iron in infant brain myelination.',
      quiz: {
        id: 'quiz-m9-l03',
        lessonId: 'ecd-m9-l03',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q03',
            prompt: 'According to WHO and UNICEF guidelines, what should a 4-month-old infant consume for hydration and nutrition during hot tropical weather?',
            options: [
              'Boiled glucose water and herbal teas alongside breast milk.',
              'Diluted cow’s milk and fruit juice.',
              'Exclusively breast milk, with zero additional water or teas.',
              'Thin maize porridge with honey.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Breast milk is over 85% water and perfectly quenches infant thirst even in hot climates. Giving water introduces pathogens and displaces caloric breast milk.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l04',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '4. Complementary Feeding & Nutrient-Dense First Foods',
      order: 4,
      hasVideo: false,
      content: `At approximately **6 months of age (180 days)**, an infant’s maternal iron stores become depleted and caloric demands outpace what breast milk alone can provide. Complementary feeding must begin promptly.

### Progressive Dietary Milestones
| Age Bracket | Meal Frequency | Texture / Consistency | Types of Foods |
| :--- | :--- | :--- | :--- |
| **6–8 Months** | 2–3 meals/day + breast milk | Thick, smooth purées; soft mashes | Enriched porridge (with groundnut paste, egg yolk), mashed avocado, sweet potato, pureed liver |
| **9–11 Months** | 3–4 meals/day + 1–2 snacks + breast milk | Finely chopped foods; soft finger foods | Soft banana pieces, flaked boneless fish, shredded stewed chicken, soft beans |
| **12–23 Months** | 3–4 meals/day + 1–2 snacks + breast milk | Modified family meals; bite-sized pieces | Diverse family foods: rice and beans, yam, greens, eggs, stewed meat, seasonal fruits |

### Principles of High-Density Preparation
- **Avoid "Watery Pap":** Traditional thin cereal gruels contain vast water content and negligible calories or micronutrients. Always enrich porridges with energy-dense additions: crushed groundnuts, egg yolks, full-fat milk, mashed pumpkin, or dried crayfish powder.
- **Diverse Food Groups (WHO 7 Groups):** Aim for at least 4 out of 7 food groups daily: grains/roots, legumes/nuts, dairy, flesh foods (meat/fish/eggs), vitamin A-rich fruits/vegetables, other fruits/vegetables, and breast milk.
- **Strict Avoidance Guidelines:**
  - **No Honey Before 12 Months:** Risk of fatal *Clostridium botulinum* spore ingestion.
  - **No Added Salt or Refined Sugar:** Overworks immature infant kidneys and creates artificial sweet-taste preferences.
  - **Choking Prevention:** Slice cylindrical foods (grapes, hotdogs, whole raw carrots) into lengthwise quarters. Avoid whole nuts and hard candies.`,
      coachNotes:
        'Instruct learners on the danger of thin watery porridge and emphasize the rule: no honey under 12 months due to infant botulism risk.',
      quiz: {
        id: 'quiz-m9-l04',
        lessonId: 'ecd-m9-l04',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q04',
            prompt: 'Why is it dangerous to feed natural honey to an 8-month-old infant?',
            options: [
              'Honey causes immediate permanent tooth loss.',
              'Honey may contain Clostridium botulinum spores that produce deadly toxins in an immature infant digestive tract.',
              'Honey causes excessive bone growth.',
              'Honey prevents the absorption of dietary calcium.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Infant botulism occurs when infants under 12 months ingest botulinum spores commonly found in honey, leading to descending paralysis and respiratory arrest.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l05',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '5. Responsive Feeding Practices & Healthy Mealtime Habits',
      order: 5,
      hasVideo: false,
      content: `*How* a child is fed is just as critical for development as *what* they are fed. **Responsive feeding** is the behavioral application of serve-and-return communication to infant and toddler nourishment.

### Reading Biological Cues
- **Hunger Cues:** Opening mouth when food approaches, leaning forward enthusiastically, pointing to serving bowls, reaching for spoons, vocalizing with excitement.
- **Fullness / Satiety Cues:** Clamping mouth shut, turning head firmly away, pushing bowl or caregiver’s hand away, spitting food out gently, losing interest and looking at surroundings.

### The Four Pillars of Responsive Feeding
1. **Respect Autonomy without Force:** Never force-feed, pry open lips, or hold down hands. Forcing food overwhelms the child’s internal satiety barometer, predisposing them to childhood obesity or lifelong mealtime anxiety.
2. **Encourage Gradual Self-Feeding:** As early as 8–9 months, permit the child to grasp spoons and finger-feed. Accept the inevitable mess: self-feeding trains ocular-manual coordination, tactile sensory integration, and self-efficacy.
3. **Maintain Calm, Screen-Free Mealtimes:** Turning on smartphones, cartoons, or television to hypnotize a toddler into opening their mouth blinds them to their physiological fullness signals and stalls conversational speech.
4. **Enrich Mealtimes with Language:** Narrate the experience: *"Look at this bright orange carrot! It is warm and sweet."* Label textures, temperatures, and colors to transform meals into vocabulary incubators.`,
      coachNotes:
        'Emphasize that mealtimes are interactive social learning events, not mechanical caloric transfers. Screens during meals should be firmly discouraged.',
      quiz: {
        id: 'quiz-m9-l05',
        lessonId: 'ecd-m9-l05',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q05',
            prompt: 'What is the appropriate caregiver response when a 14-month-old toddler repeatedly turns their head away from the spoon after eating half a meal?',
            options: [
              'Hold their head still and force the spoon into their mouth so none is wasted.',
              'Turn on cartoon videos on a smartphone to distract them while slipping food in.',
              'Acknowledge their fullness cue, stop feeding without scolding, and offer a nutritious snack or meal at the next scheduled time.',
              'Punish the toddler by withholding bedtime reading.',
            ],
            correctAnswerIndex: 2,
            explanation:
              'Responsive feeding requires honoring satiety cues. Forcing food or using digital screens to bypass fullness disrupts natural metabolic self-regulation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l06',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '6. Overcoming Picky Eating & Faltering Growth Red Flags',
      order: 6,
      hasVideo: false,
      content: `### Understanding Toddler Neophobia
Between 18 and 36 months, linear growth rate naturally decelerates compared to infant infancy, causing a normal drop in baseline appetite (*physiological anorexia*). Simultaneously, toddlers develop **food neophobia**—a protective evolutionary instinct making them suspicious of unfamiliar food textures and bitter green vegetables.

### Clinical Management Strategies for Caregivers
1. **The Division of Responsibility (Satter Model):**
   - **Adult Decides:** *What* foods are offered, *when* meals occur, and *where* they are eaten.
   - **Child Decides:** *Whether* to eat and *how much* to consume.
2. **Repeated Neutral Exposure:** Research shows toddlers often require **10 to 15 neutral exposures** to a new food before tasting and accepting it. Never declare a child "hates fish" after two rejections. Continue serving small portions without pressure.
3. **Avoid Short-Order Cooking:** If a child rejects the family meal, do not rush to prepare packaged cookies or sweetened instant noodles. Doing so teaches them that refusal yields instant high-sugar rewards.
4. **Pair Familiar with Unfamiliar:** Place a tiny spoonful of spinach beside their favorite sweet potato and egg.

---

### Red Flags: When to Seek Urgent Clinical Evaluation
Consult a pediatrician or registered dietitian if any of the following occur:
- **Growth Faltering (Failure to Thrive):** Crossing downward through two or more major weight percentiles on the growth chart.
- **Extreme Restriction:** Accepting fewer than 10 total foods or complete refusal of entire food groups for months.
- **Dysphagia & Aspiration:** Coughing, gagging, choking, or wet vocal sounds during swallowing.
- **Lethargy & Micronutrient Signs:** Pallor (iron-deficiency anemia), swollen belly with thin limbs (protein-energy malnutrition), or recurrent systemic infections.`,
      coachNotes:
        'Teach learners to distinguish normal toddler food neophobia from pathological growth faltering and dysphagia requiring medical referral.',
      quiz: {
        id: 'quiz-m9-l06',
        lessonId: 'ecd-m9-l06',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q06',
            prompt: 'How many neutral, pressure-free exposures does a young child typically require before accepting an unfamiliar vegetable?',
            options: [
              'Exactly 1 time; if rejected, never serve it again.',
              'Between 10 and 15 exposures over multiple weeks or months.',
              'At least 100 consecutive days of forced feeding.',
              'Children automatically accept all foods if given sweet juice.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Pediatric feeding research confirms that toddlers often need 10 to 15 separate, calm exposures to an unfamiliar food before they feel safe enough to taste and accept it.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l07',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '7. Sleep Architecture: Biological Value & Sleep Deprivation',
      order: 7,
      hasVideo: false,
      content: `Sleep is an active neurological state indispensable for early human development. During deep slow-wave sleep and Rapid Eye Movement (REM) sleep, the pediatric brain undergoes intense metabolic renewal.

### The Biological Functions of Early Sleep
1. **Synaptic Pruning & Memory Consolidation:** Newly formed memories from daytime exploration are transferred from the transient hippocampus to long-term cerebral cortical networks. Irrelevant synaptic connections are pruned, optimizing neural efficiency.
2. **Growth Hormone Pulsatile Secretion:** Up to 80% of human Growth Hormone (GH) is released during stage 3 and 4 non-REM deep slow-wave sleep. Chronic sleep deprivation directly restricts physical stature and muscular repair.
3. **Immune Cytokine Production:** Sleep stimulates production of infection-fighting cytokines and antibodies. Sleep-deprived children contract upper respiratory infections more frequently and suffer prolonged recovery times.
4. **Prefrontal Executive Restoration:** The prefrontal cortex restores neurochemical transmitters (dopamine, serotonin, norepinephrine), enabling frustration tolerance, impulse inhibition, and focused attention during waking hours.

### Cascade of Chronic Pediatric Sleep Deprivation
When a young child consistently loses 1 to 2 hours of required sleep daily:
- **Paradoxical Hyperactivity:** Unlike adults who appear sluggish when tired, young children flooded with cortisol and adrenaline become hyperactive, impulsive, and clumsy.
- **Accident Vulnerability:** Impaired motor balance leads to higher incidence of falls, burns, and domestic injuries.
- **Immune Suppression:** Increased susceptibility to diarrheal and respiratory illnesses.
- **Severe Emotional Lability:** Rapid transitions from laughter to uncontrollable screaming outbursts over minor obstacles.`,
      coachNotes:
        'Help learners understand paradoxical hyperactivity in exhausted children—overtired toddlers look hyper and wired, not sleepy.',
      quiz: {
        id: 'quiz-m9-l07',
        lessonId: 'ecd-m9-l07',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q07',
            prompt: 'Why do chronically overtired toddlers frequently appear "hyperactive", running wildly and laughing erratically before bedtime?',
            options: [
              'Because young children have infinite energy and never need sleep.',
              'Because their bodies release counter-regulatory cortisol and adrenaline to stay awake, producing paradoxical hyperactivity.',
              'Because fatigue makes children smarter and more focused.',
              'Because running wildly indicates complete emotional calm.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'When sleep is overdue, the immature nervous system enters a fight-or-flight overdrive, releasing cortisol and adrenaline that produces frantic, clumsy hyperactivity rather than calm drowsiness.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l08',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '8. WHO Pediatric Sleep Standards & Calming Bedtime Routines',
      order: 8,
      hasVideo: false,
      content: `The World Health Organization (WHO) has established clear 24-hour sleep guidelines for early childhood to safeguard physiological and neurological health.

### Official WHO 24-Hour Sleep Recommendations
- **Infants 0–3 Months:** **14 to 17 hours** of good quality sleep across day and night.
- **Infants 4–11 Months:** **12 to 16 hours** of sleep (including regular scheduled daytime naps).
- **Toddlers 1–2 Years:** **11 to 14 hours** of total sleep (including 1–2 daytime naps, with regular waking and bedtimes).
- **Preschoolers 3–4 Years:** **10 to 13 hours** of sleep (which may include a midday quiet nap).

---

### The 4-Step Calming Bedtime Sequence
Predictable routines act as neurochemical signals, prompting the pineal gland to release endogenous melatonin. Keep the sequence identical every evening:
1. **Screen Shutdown (60–90 Minutes Prior):** Power down all televisions, tablets, and smartphones. Blue spectrum light suppresses melatonin synthesis and delays sleep onset by up to 45 minutes.
2. **Warm Hygiene & Physical Comfort:** A warm sponge bath or washing of feet and hands, diaper change, and dressing in breathable cotton sleepwear.
3. **Gentle Connecting Ritual:** Dim ambient lighting. Sing a soothing lullaby, tell a quiet traditional story, or share a gentle massage.
4. **Consistent Sleeping Zone:** Place the child into their designated sleep area while drowsy but awake, offering a consistent comfort phrase (*"Goodnight, you are safe, time to sleep"*).

### Safe Sleep Environment (ABCs)
For infants under 12 months:
- **A – Alone:** Never co-sleep on sofas, armchairs, or cluttered beds with loose cushions.
- **B – on their Back:** Always place infant supine on their back for every sleep.
- **C – in a safe Crib:** Firm flat surface with no pillows, thick quilts, stuffed toys, or bumpers to prevent Sudden Infant Death Syndrome (SIDS) and accidental suffocation.`,
      coachNotes:
        'Reinforce the ABCs of safe infant sleep and the essential 4-step evening bedtime sequence for toddler emotional calm.',
      quiz: {
        id: 'quiz-m9-l08',
        lessonId: 'ecd-m9-l08',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q08',
            prompt: 'According to WHO guidelines, how much total sleep per 24 hours does a healthy 2-year-old child require?',
            options: [
              '6 to 8 hours total.',
              '11 to 14 hours (including naps).',
              '20 hours without waking.',
              'Only whatever time adults sleep at night.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'The WHO recommends 11 to 14 hours of good quality sleep in every 24-hour cycle for children aged 1–2 years, inclusive of daytime naps.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l09',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '9. Physical Activity, Floor Play & Tummy Time for Infants',
      order: 9,
      hasVideo: false,
      content: `Physical activity in infancy is not about athletic training—it is about unrestricted floor-based movement that allows neuromuscular pathways to fire and coordinate.

### WHO Guidelines for Infants Under 1 Year
- Be physically active **multiple times daily** in diverse ways, particularly through interactive, supervised floor-based play.
- **For Non-Mobile Infants:** At least **30 minutes of cumulative prone positioning (Tummy Time)** spread throughout waking hours every day.
- **Zero Excessive Restraint:** Avoid leaving infants restrained in car seats, prams, bouncers, or high chairs for more than **1 hour at a time**.

### The Biomechanics of Tummy Time
- **Strengthens Cervical Extensors:** Lifts heavy cranium against gravity, strengthening the neck, upper back, and shoulder girdle.
- **Prevents Positional Plagiocephaly:** Relieves sustained pressure on the soft occipital skull bones, preventing flat-head deformities.
- **Builds Core Stability for Rolling & Crawling:** Weight-bearing on palms and forearms opens clenched hands, develops tactile sensory awareness, and primes hip flexors for crawling.

### Safe Tummy Time Practical Implementation
1. **Always Supervised & Awake:** *Back to sleep, tummy to play.* Never leave an infant unattended on their abdomen, and never place a sleeping baby prone.
2. **Start Early and Build Gradually:** Begin within the first two weeks of life: place newborn chest-to-chest on a reclining parent for 2–3 minutes. Gradually transition to a firm, clean floor mat.
3. **Engage at Eye Level:** Lie down directly facing the baby. Make eye contact, sing, talk, or place a safe mirror or colorful rattle in front of them to reward head lifting.`,
      coachNotes:
        'Explain the core rule of tummy time: Back to sleep, tummy to play. Always supervised while awake; never during sleep.',
      quiz: {
        id: 'quiz-m9-l09',
        lessonId: 'ecd-m9-l09',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q09',
            prompt: 'What is the minimum recommended daily duration of supervised tummy time for awake, non-mobile infants under WHO guidelines?',
            options: [
              'At least 30 minutes accumulated across the day while awake.',
              'Only 30 seconds once a week.',
              '4 continuous hours without adult presence.',
              'Zero minutes until the child walks.',
            ],
            correctAnswerIndex: 0,
            explanation:
              'The WHO recommends at least 30 minutes of cumulative tummy time spread across waking hours daily to build upper body strength and prevent flat head syndrome.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l10',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '10. Movement Guidelines for Toddlers & Preschoolers',
      order: 10,
      hasVideo: false,
      content: `Once a child walks, their physical development demands vast expanses of active movement to refine bilateral coordination, spatial judgment, and cardiorespiratory health.

### WHO Physical Activity Standards
- **Children Aged 1–2 Years:** At least **180 minutes (3 hours)** of physical activity of any intensity spread throughout the day. More is better!
- **Children Aged 3–4 Years:** At least **180 minutes (3 hours)** of physical activity across the day, of which **at least 60 minutes must be Moderate-to-Vigorous Physical Activity (MVPA)** (running, jumping, dancing, vigorous climbing).

### Healthy Movement vs. Hazards
| Age Category | High-Value Healthy Activities | Environmental Hazards to Mitigate |
| :--- | :--- | :--- |
| **Toddlers (1–2 yrs)** | Pushing/pulling wheeled toys, climbing low obstacles, dancing to music, walking on uneven natural ground, throwing balls | Open drainage ditches, unguarded stairs, buckets of water, hot cooking fires, vehicle roadways |
| **Preschoolers (3–4 yrs)** | Sprinting, obstacle courses, hopping on one foot, kicking balls, tricycle riding, active roleplay games | High unprotected balconies, sharp tools, traffic proximity, deep water bodies, dog bites |

### The Danger of Prolonged Physical Sedentary Restraint
Restraining a toddler in a stroller, car seat, or chair for hours leads to:
- Suppressed bone mineral accumulation and poor muscular tone.
- Suppressed lymphatic circulation.
- Pent-up physical restlessness that explodes into aggressive outbursts when released.
- Increased incidence of childhood metabolic disorders.`,
      coachNotes:
        'Emphasize the 180-minute daily movement requirement for toddlers and preschoolers, highlighting that outdoor active play is essential medicine.',
      quiz: {
        id: 'quiz-m9-l10',
        lessonId: 'ecd-m9-l10',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q10',
            prompt: 'Under WHO pediatric recommendations, how many minutes of physical activity should a 3-year-old child accumulate daily?',
            options: [
              'At least 180 minutes (3 hours), including at least 60 minutes of moderate-to-vigorous play.',
              'Only 15 minutes of seated screen video watching.',
              'Zero minutes; preschool children should remain seated all day.',
              '60 minutes total, with zero outdoor activity.',
            ],
            correctAnswerIndex: 0,
            explanation:
              'The WHO recommends 180 minutes of daily physical activity for 3- to 4-year-olds, including at least 60 minutes of energetic moderate-to-vigorous movement.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l11',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '11. Play as Brain Architecture: Active Learning & Curiosity',
      order: 11,
      hasVideo: false,
      content: `Play is the primary vehicle through which early childhood brain architecture is constructed. Far from being a trivial diversion from "serious learning," play is the infant and toddler's biological laboratory.

### How Everyday Play Powers Development
1. **Motor Competence:** Running, balancing on logs, and stacking objects build proprioceptive maps and vestibular equilibrium.
2. **Cognitive Problem-Solving:** Figuring out how nesting cups fit together or how to prevent a tower of cardboard cartons from collapsing cultivates empirical physics and hypothesis testing.
3. **Language Expansion:** Back-and-forth pretend play fosters narrative fluency, vocabulary diversity, and conversational turn-taking.
4. **Social & Emotional Negotiation:** Cooperative play with siblings and peers demands sharing, perspective-taking, empathy, and emotional co-regulation.

### Everyday Household Objects as Superior Learning Tools
Expensive branded toys with pre-programmed batteries and flashing lights offer closed, passive entertainment. In contrast, simple open-ended objects stimulate boundless creativity:
- **Clean Plastic Cups & Bowls:** Stacking, nesting, water pouring, drum beats.
- **Cardboard Boxes:** Caves, cars, houses, hiding spots for object permanence.
- **Smooth River Stones & Large Seeds (supervise for choking):** Counting, sorting by size, tactile weight exploration.
- **Fabric Scraps & Clean Towels:** Peek-a-boo, superhero capes, baby doll swaddles.

Adults do not need to direct or script play. Providing a safe physical zone and offering warm encouragement (*"Look how high you stacked those cups!"*) is the most potent scaffold for curiosity.`,
      coachNotes:
        'Remind caregivers that simple household items and open-ended play provide richer cognitive stimulation than expensive battery-powered electronic toys.',
      quiz: {
        id: 'quiz-m9-l11',
        lessonId: 'ecd-m9-l11',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q11',
            prompt: 'Why do developmental pediatricians recommend open-ended materials (boxes, plastic containers, fabric) over electronic flashing toys?',
            options: [
              'Because open-ended objects are heavier and tire the child faster.',
              'Because open-ended objects require the child to actively imagine, experiment, and solve problems rather than passively watching pre-programmed lights.',
              'Because electronic toys are completely illegal.',
              'Because cardboard boxes emit natural learning vitamins.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Open-ended play materials place the child in active control, stimulating imagination, motor planning, and cognitive reasoning far more effectively than passive screen or battery toys.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l12',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '12. Everyday Hygiene, Clean Water & Infection Prevention',
      order: 12,
      hasVideo: false,
      content: `In early childhood, subclinical recurrent infections—especially acute diarrheal illnesses and respiratory infections—are leading drivers of growth stunting and developmental regression. Proper domestic hygiene is an indispensable pillar of developmental care.

### The Critical Moments for Handwashing
Handwashing with clean running water and soap eliminates up to 50% of infant diarrheal incidence and 25% of respiratory pathogens:
1. **Before Preparing Food or Feeding an Infant:** Prevents bacterial inoculation into complementary foods.
2. **After Changing Diapers or Assisting with Toileting:** Stops the fecal-oral pathogen loop.
3. **After Cleaning Household Waste or Handling Animals.**
4. **Before and After Tending to an Ill Child.**

### Safe Water, Sanitation & Food Hygiene
- **Safe Drinking Water:** Boil drinking water rolling for at least 1 full minute if the supply is untreated or from open wells. Store clean drinking water in covered, narrow-necked containers.
- **Clean Utensils & Banishing Feeding Bottles:** Feeding bottles and rubber teats are virtually impossible to sterilize effectively in low-resource domestic settings, rapidly harboring lethal *E. coli* colonies. Feed expressed milk or liquids using a **clean open cup and spoon**.
- **Pediatric Oral Health:** Begin wiping infant gums with a clean damp cloth even before teeth erupt. As soon as primary teeth appear, brush twice daily using a soft child brush and a tiny smear (rice-grain size) of fluoride toothpaste to prevent early childhood dental caries.`,
      coachNotes:
        'Instruct learners on the 4 critical handwashing moments and why feeding bottles are breeding grounds for enteric bacteria compared to clean cups and spoons.',
      quiz: {
        id: 'quiz-m9-l12',
        lessonId: 'ecd-m9-l12',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q12',
            prompt: 'Why do WHO and pediatric organizations strongly advise using clean open cups instead of feeding bottles for infants?',
            options: [
              'Because feeding bottles are too expensive to import.',
              'Because bottles and rubber teats easily harbor lethal bacterial biofilms that are difficult to sterilize, causing recurrent diarrheal infections.',
              'Because drinking from cups weakens infant jaw muscles.',
              'Because cups make liquids taste sweeter.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Feeding bottles and teats are difficult to clean and sterilize thoroughly, serving as major vectors for enteric infections, diarrhea, and nutritional faltering.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l13',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '13. Preventive Healthcare, Growth Monitoring & Immunizations',
      order: 13,
      hasVideo: false,
      content: `Preventive pediatric healthcare safeguards the neurological gains achieved through daily caregiving. Early detection of clinical deficits changes lifetime developmental trajectories.

### The Power of Routine Childhood Immunization
Routine vaccines train the infant immune system to produce high-affinity antibodies without enduring life-threatening disease pathology:
- **BCG & Hepatitis B:** Administered at birth to prevent disseminated tuberculosis and chronic liver damage.
- **Oral Polio Vaccine (OPV) / IPV:** Eradicating paralytic poliomyelitis.
- **Pentavalent Vaccine:** Shielding against Diphtheria, Pertussis (whooping cough), Tetanus, Hepatitis B, and *Haemophilus influenzae* type b (major cause of bacterial meningitis).
- **Pneumococcal (PCV) & Rotavirus:** Halting the top global killers: severe bacterial pneumonia and dehydrating diarrheal gastroenteritis.
- **Measles & Rubella:** Guarding against severe encephalitis, immune amnesia, and sensory hearing loss.

### Growth Anthropometry & The "Road to Health" Card
Every clinic visit must include:
1. **Weight-for-Age (Underweight check):** Tracking acute metabolic drops.
2. **Height/Length-for-Age (Stunting check):** Detecting chronic cumulative deprivation.
3. **Head Circumference:** Ensuring normal brain cranial volume expansion.
4. **Mid-Upper Arm Circumference (MUAC):** Rapid community screening for Severe Acute Malnutrition (SAM).

### Urgent Clinical Red Flags Requiring Emergency Care
Caregivers must seek instant medical triage if an infant exhibits:
- Convulsions or seizures.
- Inability to drink or breastfeed.
- Persistent vomiting of all intake.
- Lethargy or unconsciousness (difficult to awaken).
- Severe chest indrawing or grunting with fast breathing (pneumonia signs).`,
      coachNotes:
        'Review the key immunizations, the value of the Road-to-Health growth chart, and the 5 critical pediatric danger signs requiring immediate hospital care.',
      quiz: {
        id: 'quiz-m9-l13',
        lessonId: 'ecd-m9-l13',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q13',
            prompt: 'Which clinical observation represents an acute pediatric danger sign requiring immediate emergency hospital care?',
            options: [
              'A toddler who refuses broccoli at dinner.',
              'An infant who is lethargic, unable to breastfeed, and shows severe chest indrawing with fast breathing.',
              'A baby crying for 2 minutes before falling asleep.',
              'A child who has a small scratch on their knee.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Inability to feed, lethargy, and chest indrawing indicate severe systemic distress or acute pneumonia requiring emergency pediatric medical intervention.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l14',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '14. Emotional Safety & Everyday Responsive Interactions',
      order: 14,
      hasVideo: false,
      content: `A child who is well-fed, immunized, and physically safe can still fail to reach full developmental potential if their social environment lacks **emotional safety**. Emotional safety is the felt conviction that one is loved, valued, and buffered by predictable adults.

### Everyday Serve-and-Return Moments
Neuroscience proves that brain connections are reinforced during simple everyday caregiving routines:
- **During Diapering & Dressing:** Maintain warm eye contact, smile, and narrate your touch: *"Now your warm sock goes on your little foot!"*
- **During Bathing:** Play with water ripples, name body parts, and respond to the infant's splashing vocalizations.
- **During Walking & Chores:** Point out the barking dog, the tall palm tree, the singing bird, validating the child's pointing gestures.

### Adult Co-Regulation vs. Harsh Punishment
Young children possess immature limbic and prefrontal systems; they are biologically incapable of self-soothing when flooded by intense terror, anger, or fatigue.
- **The Power of Adult Calm:** When a caregiver stays physically calm, takes a deep breath, and lowers their vocal tone, the child's mirror neuron system activates, down-regulating their fight-or-flight sympathetic response.
- **The Toxic Cost of Physical Punishment:** Shouting, striking, shaming, or threatening children floods developing neurons with toxic levels of cortisol. Far from teaching moral boundaries, harsh punishment induces chronic fear, damages executive memory, and models violence as a conflict resolution tool.`,
      coachNotes:
        'Highlight the neurological necessity of emotional co-regulation and the biological damage caused by harsh physical punishment.',
      quiz: {
        id: 'quiz-m9-l14',
        lessonId: 'ecd-m9-l14',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q14',
            prompt: 'What happens biologically to an infant when a caregiver responds promptly and warmly to their distress?',
            options: [
              'The infant becomes permanently spoiled and demanding.',
              'The infant’s elevated cortisol levels decrease, soothing their nervous system and reinforcing secure attachment circuits.',
              'The infant loses the ability to speak words.',
              'It stops physical growth.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Prompt, responsive soothing buffers the stress response, lowers circulating cortisol, and wires secure attachment neural circuits in the infant brain.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l15',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '15. Screen Time Limitations & Displacement Risks',
      order: 15,
      hasVideo: false,
      content: `In the digital era, mobile screens and television have emerged as one of the most potent threats to early childhood thriving. Pediatric concerns are grounded in the **Displacement Hypothesis**.

### The Displacement Mechanism
Every hour a young child spends staring at a two-dimensional screen is an hour stolen from:
1. **Interactive Human Conversation:** Screens cannot read a child’s facial cues or respond to their vocal serves.
2. **Three-Dimensional Sensory Play:** Swiping a finger on glass does not teach weight, gravity, resistance, or spatial geometry.
3. **Gross Motor Movement:** Extended passive sitting promotes muscular weakness and metabolic stagnation.
4. **Restorative Sleep:** Screen use suppresses melatonin and disrupts night sleep consolidation.

### WHO & AAP Official Screen Guidelines
- **Under 18–24 Months:** **Zero digital screen media** (video-chatting with distant family members is the only permitted exception).
- **Ages 2 to 5 Years:** Limit total screen exposure to **less than 1 hour per day** of high-quality, non-violent educational programming.
- **Mandatory Co-Viewing:** An adult must watch alongside the child to explain the material and connect it to real-world experiences.
- **Screen-Free Zones & Times:** No screens during meals, no screens in children's bedrooms, and complete screen shutdown at least 1 hour before bedtime.`,
      coachNotes:
        'Explain the displacement hypothesis: screens harm young children not just through content, but by stealing time from movement, sleep, and conversation.',
      quiz: {
        id: 'quiz-m9-l15',
        lessonId: 'ecd-m9-l15',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q15',
            prompt: 'What is the AAP and WHO screen time recommendation for infants and toddlers under 18–24 months of age?',
            options: [
              'At least 4 hours of baby learning videos daily.',
              'Zero screen time, with the sole exception of interactive family video calls.',
              '2 hours in the morning and 2 hours at night.',
              'Unrestricted access to smartphones to keep the child quiet.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Both WHO and AAP recommend zero sedentary screen time for children under 18–24 months (except interactive video chatting) to prevent speech delays and sleep disturbances.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l16',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '16. African Household & Community Nutrition Strategies',
      order: 16,
      hasVideo: false,
      content: `Across African urban and rural communities, families achieve elite developmental outcomes through culturally grounded, low-cost nutritional and communal practices. High nutritional quality does not require expensive imported processed baby foods.

### Enriching Local Staples
Traditional mono-cereal porridges (corn pap, fermented millet, cassava, yam) can be transformed into multi-nutrient superfoods with affordable local additions:
- **Groundnut & Sesame Paste:** Adds dense plant proteins, calories, and healthy lipids for brain myelin.
- **Dried Crayfish & Small Fish Powder:** Crushing whole dried crayfish or small river fish (e.g., silver cyprinid / omena / ndagala) into baby meals infuses bioavailable calcium, zinc, protein, and omega-3 fatty acids.
- **Egg Yolk & Poultry Liver:** High-density iron, choline for memory, and preformed vitamin A.
- **Moringa & Dark Green Leaves:** Dried powdered moringa leaves or stewed amaranth provide concentrated folate and micronutrients.
- **Orange-Fleshed Sweet Potato (OFSP):** An extraordinary source of provitamin A that combats childhood blindness and immune weakness.

### Communal Assets: Compound Living & Community Health
- **Shared Caregiving Networks:** Grandmothers, aunts, and neighborhood caregivers provide constant linguistic input and collective vigilance against domestic hazards (cooking fires, water storage containers).
- **Community Health Days:** Leveraging local health centers for routine immunization pulses, biannual high-dose vitamin A capsule distribution, and oral albendazole deworming rounds.`,
      coachNotes:
        'Celebrate local African food sovereignty and communal caregiving models: crayfish powder, groundnut paste, moringa, and orange-fleshed sweet potato.',
      quiz: {
        id: 'quiz-m9-l16',
        lessonId: 'ecd-m9-l16',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q16',
            prompt: 'How can an African family enrich a simple corn or millet pap into a nutrient-dense complementary food without buying expensive imports?',
            options: [
              'Add large amounts of refined white sugar.',
              'Add powdered dried crayfish, groundnut paste, egg yolk, or orange-fleshed sweet potato.',
              'Dilute the porridge with plain river water.',
              'Filter out all solid food particles.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Adding affordable local superfoods like dried crayfish powder, groundnut paste, egg yolk, or orange-fleshed sweet potato provides high-density protein, iron, calcium, and vitamin A.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l17',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '17. Ten Common Caregiver Mistakes in Daily Child Rearing',
      order: 17,
      hasVideo: false,
      content: `Even deeply well-intentioned caregivers can adopt habits that inadvertently undermine developmental progress. Recognizing these pitfalls allows for immediate correction:

### The 10 Most Common Everyday Developmental Pitfalls
1. **Giving Water or Teas to Infants Under 6 Months:** Dilutes caloric intake and exposes the infant gut to microbial contamination.
2. **Serving Thin, Watery Porridges:** Filling small infant stomachs with low-calorie water that leads to insidious growth stunting.
3. **Using Screens as Digital Pacifiers:** Silencing fussy toddlers with phones, arresting natural emotional self-regulation development.
4. **Coercive Force-Feeding:** Forcing spoons into crying children, destroying internal biological satiety cues.
5. **Skipping Routine Immunizations:** Delaying vaccines due to false myths or minor colds, leaving the child open to lethal epidemics.
6. **Erratic, Unpredictable Sleep Times:** Allowing toddlers to stay awake until late adult hours, inducing chronic cortisol overdrive.
7. **Prolonged Physical Restraint:** Keeping infants trapped in high chairs or carriers for hours without free floor play.
8. **Discipline Through Fear and Humiliation:** Shouting, beating, or ridiculing, which generates toxic stress and models aggression.
9. **Substituting Sugary Snacks for Wholesome Meals:** Rewarding behavior with biscuits and sweetened sodas, driving early tooth decay and metabolic dysfunction.
10. **Treating Mealtimes and Chores as Burdens Rather Than Classrooms:** Missing everyday opportunities to narrate, sing, count, and converse during routine daily tasks.`,
      coachNotes:
        'Review the 10 pitfalls thoroughly. Emphasize that every mistake can be gently unlearned with practical, responsive alternatives.',
      quiz: {
        id: 'quiz-m9-l17',
        lessonId: 'ecd-m9-l17',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q17',
            prompt: 'Which everyday habit is recognized as a harmful pitfall in early childhood development?',
            options: [
              'Establishing a predictable bedtime routine with quiet storytelling.',
              'Using digital smartphones as pacifiers to silence crying toddlers and force-feeding during meals.',
              'Offering daily floor-based tummy time to awake infants.',
              'Washing hands with soap and clean water before preparing food.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Using smartphones as pacifiers prevents the child from developing self-soothing mechanisms, and force-feeding overrides healthy metabolic satiety regulation.',
          },
        ],
      },
    },
    {
      id: 'ecd-m9-l18',
      moduleId: 'ecd-m9',
      programId: 'ecd-cert',
      title: '18. Summary & Clinical Checklist for Everyday Development',
      order: 18,
      hasVideo: false,
      content: `### The Daily Thriving Checklist (0 to 5 Years)
To ensure balanced, healthy development, caregivers and practitioners should review this daily checklist:
- [x] **Nutrition:** Clean, diverse, iron-rich meals (or exclusive breastfeeding if <6 mo); zero honey <12 mo; responsive mealtimes with zero screen distraction.
- [x] **Restorative Sleep:** Age-appropriate total sleep (11–14 hrs for toddlers; 10–13 hrs for preschoolers); soothing 4-step evening routine.
- [x] **Active Movement:** At least 30 minutes tummy time for infants; at least 180 minutes of movement daily for toddlers and preschoolers (with 60+ min MVPA for ages 3–4).
- [x] **Free & Guided Play:** Daily opportunities for open-ended play with simple, safe household objects.
- [x] **Hygiene & Safety:** Handwashing with soap at critical times; clean drinking water; childproofed hazards; safe sleeping area.
- [x] **Preventive Healthcare:** Up-to-date immunizations; routine growth monitoring on the Road-to-Health card; prompt medical triage for red flags.
- [x] **Warm Connection:** Frequent serve-and-return conversational exchanges, eye contact, and emotional co-regulation without fear or violence.

---

### Professional Disclaimer
*This module delivers evidence-based educational training on the everyday practices supporting early childhood development. It does not replace individualized pediatric clinical diagnosis, nutrition prescriptions for severe malnutrition, or emergency medical care.*`,
      coachNotes:
        'Congratulate the student on completing Module 9: Supporting Healthy Development! Encourage them to review their progress and prepare for subsequent certification milestones.',
      quiz: {
        id: 'quiz-m9-l18',
        lessonId: 'ecd-m9-l18',
        programId: 'ecd-cert',
        passingScore: 70,
        questions: [
          {
            id: 'm9-q18',
            prompt: 'What is the overarching clinical takeaway of Module 9 regarding early childhood thriving?',
            options: [
              'Development depends solely on purchasing expensive imported gadgets and luxury foods.',
              'Healthy development is an interconnected everyday ecosystem where nutrition, sleep, movement, hygiene, safety, and loving relationships work synergistically to build brain and body.',
              'Children develop best when left alone with television for 8 hours daily.',
              'Routine immunizations and handwashing have no impact on child survival.',
            ],
            correctAnswerIndex: 1,
            explanation:
              'Early thriving is an interconnected ecosystem of responsive care, nutrition, restorative rest, movement, and disease prevention working together in daily life.',
          },
        ],
      },
    },
  ],
};
