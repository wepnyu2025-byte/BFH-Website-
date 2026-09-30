/**
 * Baby First Health - Single source of truth for website content
 * Extracted directly from BFH-content.md
 */

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Community', href: '/community' },
  { label: 'Products', href: '/products' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Live Sessions', href: '/live-sessions' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export const GLOBAL_CONTENT = {
  brand: 'BABY FIRST HEALTH',
  tagline: 'Helping African parents understand, protect and raise their children better.',
  primaryCta: 'Community Details',
  whatsappCommunityLink: 'https://chat.whatsapp.com/ClJyZpPZ8Pz55TZivlvosi',
  medicalDisclaimer:
    'Baby First Health provides educational information and parenting support. Our content does not replace professional medical diagnosis, treatment or emergency care.',
  emergencyNote:
    'In an emergency, contact your nearest hospital or emergency services immediately.',
  copyright: '© 2026 Baby First Health. All rights reserved.',
  socialLinks: {
    tiktok: 'https://tiktok.com/@babyfirsthealth',
    facebook: 'https://www.facebook.com/share/1VG7i45YqA/',
  },
};

export const HOME_CONTENT = {
  hero: {
    headline: 'Better Care Starts With {{Better Knowledge}}.',
    paragraphs: [
      'Baby First Health helps parents understand, care for and raise children from birth to age five.',
      'Get practical guidance on child health, parenting, nutrition, development, safety and family wellbeing.',
    ],
    button: 'Community Details',
  },
  trustIntro: {
    headline: 'Parenting Is Easier With {{Support}}.',
    paragraphs: [
      'You do not have to figure everything out alone.',
      'Baby First Health gives parents simple, practical and reliable information to help them make better decisions for their children.',
      'From everyday parenting questions to important health and safety topics, we help you know what to look for, what to do and when to seek professional care.',
    ],
  },
  sixAreas: {
    headline: 'Everything Parents Need To {{Know}}.',
    areas: [
      {
        title: 'Child Health',
        description: 'Understand common childhood health concerns, prevention, hygiene and warning signs.',
        icon: 'Stethoscope',
      },
      {
        title: 'Parenting & Psychology',
        description: "Understand your child's emotions, behavior, development and needs.",
        icon: 'HeartHandshake',
      },
      {
        title: 'Nutrition & Development',
        description: 'Learn about feeding, nutrition, growth and important developmental milestones.',
        icon: 'Apple',
      },
      {
        title: 'Safety & First Aid',
        description: 'Learn how to make your home safer and respond appropriately when accidents happen.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Myths & Safe Parenting',
        description: 'Separate useful traditions from practices that may put children at risk.',
        icon: 'Sparkles',
      },
      {
        title: 'Family Wellbeing',
        description: 'Build healthier routines, stronger relationships and a more supportive family environment.',
        icon: 'Users',
      },
    ],
    button: 'Explore What We Teach',
  },
  community: {
    headline: 'You Are Not {{Parenting Alone}}.',
    paragraphs: [
      'Join a community of parents who want to learn, ask questions and become better prepared for raising their children.',
      'Your membership gives you access to ongoing education, community support and live learning sessions.',
    ],
    button: 'Join The Community',
  },
  liveSessions: {
    headline: 'Learn With Us Every {{Saturday}}.',
    paragraphs: [
      'Join our free weekly live sessions for practical conversations around child health, parenting and family wellbeing.',
      'Simple explanations. Real questions. Practical guidance.',
    ],
    button: 'See Upcoming Sessions',
  },
  products: {
    headline: 'Practical {{Resources}} For Parents.',
    intro:
      'Go beyond the community with carefully created resources designed to help parents learn specific skills and handle specific parenting challenges.',
    items: [
      {
        title: 'Childhood Emergency Guide',
        description: 'Learn what to do, what to avoid and when to seek help during common childhood emergencies.',
        link: '/products/childhood-emergency-guide',
      },
      {
        title: 'Courses & Certifications',
        description: 'Structured accredited programs for parents and caregivers.',
        link: '/certifications',
      },
      {
        title: 'Baby Products',
        description: 'Useful products selected for families and young children.',
        link: '/products',
      },
    ],
    button: 'Explore Products',
  },
  memberBenefits: {
    headline: 'Your Membership Comes With {{More}}.',
    paragraphs: [
      'Members gain full access to weekly live sessions, member-only parenting resources, direct Q&A with healthcare professionals, and a supportive community.',
      'Learn together. Grow with confidence. Stay connected.',
    ],
    button: 'Community Details',
  },
  certification: {
    headline: 'Learn. Complete. Get {{Certified}}.',
    paragraphs: [
      'Build practical knowledge through Baby First Health online learning programs.',
      'Our certificates are designed for parents, caregivers, nannies, childcare workers and anyone who wants to develop useful childcare and parenting skills.',
    ],
    button: 'Explore Certifications',
  },
  finalCta: {
    headline: 'Raise Them With {{Better Knowledge}}.',
    paragraphs: [
      'Your child is growing every day.',
      'Make every stage a learning opportunity.',
      'Join Baby First Health today.',
    ],
    button: 'Community Details',
  },
};

export const ABOUT_CONTENT = {
  hero: {
    headline: 'We Help Parents Raise Children {{Better}}.',
    paragraph:
      'Baby First Health is a digital parenting and child-health education platform helping African families make safer, healthier and better-informed decisions for children aged 0–5.',
  },
  mission: {
    headline: 'Our Mission Is {{Simple}}.',
    statement:
      'We want every parent to have access to practical knowledge that helps them understand, protect and raise their children better.',
  },
  whyWeExist: {
    headline: 'Parents Need More Than {{Advice}}.',
    paragraphs: [
      'Parents receive information from family, social media, friends and the internet every day.',
      'But information is not always clear, reliable or safe.',
      'Baby First Health exists to make important parenting and child-health knowledge easier to understand and easier to access.',
    ],
  },
  whatWeBelieve: {
    headline: '{{Knowledge}} Can Protect Children.',
    paragraphs: [
      'We believe informed parents are better prepared to recognize problems, prevent avoidable risks and make appropriate decisions for their children.',
      'We also believe parents should know when a situation requires professional medical attention.',
    ],
  },
  ourApproach: {
    headline: 'Simple Knowledge. {{Practical}} Guidance.',
    paragraphs: [
      'We focus on information parents can understand and apply in everyday life.',
      'We do not replace doctors, nurses or hospitals.',
      'We help parents become better informed before, during and after everyday parenting challenges.',
    ],
  },
  founders: {
    headline: 'Built By People Who {{Care}}.',
    members: [
      {
        name: 'Dolly Kelly, SRN',
        role: 'Co-Founder & Health Lead',
        bio: 'Dolly is a registered nurse and leads the health, childcare and educational side of Baby First Health.',
        image: '/images/founder-dolly.jpg',
      },
      {
        name: 'Wepnyu Laurence',
        role: 'Co-Founder & Digital Lead',
        bio: 'Laurence brings over 10 years of experience in digital marketing, technology and digital product development, helping build the platform and its digital education ecosystem.',
        image: '/images/founder-laurence.jpg',
      },
    ],
  },
};

export const COMMUNITY_CONTENT = {
  hero: {
    headline: 'Your Parenting Community Starts {{Here}}.',
    paragraph:
      'Join Baby First Health for ongoing education, practical resources, live sessions and a supportive community for parents of children aged 0–5.',
    button: 'Join Now',
    whatsappLink: 'https://chat.whatsapp.com/ClJyZpPZ8Pz55TZivlvosi',
    image: '/images/community-parents.jpg',
  },
  benefits: {
    headline: 'Your Membership {{Includes}}',
    items: [
      {
        title: 'Access to the Baby First Health parent community',
        icon: 'Users',
      },
      {
        title: 'Educational content across six core areas',
        icon: 'GraduationCap',
      },
      {
        title: 'Free Saturday live sessions',
        icon: 'Calendar',
      },
      {
        title: 'Practical parenting resources',
        icon: 'BookOpen',
      },
      {
        title: 'Access to selected member-only resources',
        icon: 'Lock',
      },
      {
        title: 'Direct Q&A with healthcare professionals',
        icon: 'Stethoscope',
      },
      {
        title: 'Early access to upcoming webinars and live workshops',
        icon: 'Sparkles',
      },
    ],
  },
  topics: {
    headline: 'Learn Something Useful {{Every Week}}.',
    intro: 'We cover topics that matter to parents, including:',
    list: [
      { name: 'Child health', fill: 'bg-teal-50', icon: 'Stethoscope' },
      { name: 'Parenting', fill: 'bg-teal-100', icon: 'HeartHandshake' },
      { name: 'Child psychology', fill: 'bg-teal-50', icon: 'Sparkles' },
      { name: 'Nutrition', fill: 'bg-orange-50', icon: 'Apple' },
      { name: 'Development', fill: 'bg-teal-100', icon: 'TrendingUp' },
      { name: 'Safety', fill: 'bg-teal-50', icon: 'ShieldAlert' },
      { name: 'Family wellbeing', fill: 'bg-orange-50', icon: 'Users' },
    ],
  },
  cta: {
    headline: 'Start Learning With {{Baby First Health}}.',
    paragraph: 'Join today and become part of a community built around better parenting.',
    button: 'Join Now',
    whatsappLink: 'https://chat.whatsapp.com/ClJyZpPZ8Pz55TZivlvosi',
  },
};

export const PRODUCTS_CONTENT = {
  hero: {
    headline: 'Essential Health Tools & {{Guides for Confident Parenting}}.',
    paragraph:
      'Explore practical guides, accredited certifications, and family essentials designed to protect your child’s health and help you make confident decisions.',
  },
  categories: {
    guides: {
      title: 'Guides & Ebooks',
      description: 'Simple resources covering specific parenting, health and childcare topics.',
    },
    courses: {
      title: 'Courses',
      description: 'Learn practical skills through structured online programs.',
    },
    products: {
      title: 'Baby Products',
      description: 'Useful products selected with parents and young children in mind.',
      image: '/images/baby-products.jpg',
    },
    memberOffers: {
      title: 'Member Access',
      description: 'Members receive exclusive access to guides, live workshops, and expert discussions.',
    },
  },
  emergencySpotlight: {
    title: 'Childhood Emergency Guide',
    description:
      'Learn what to do, what to avoid and when to seek help during common childhood emergencies. Includes PDF, video and audio formats.',
    button: 'View Emergency Guide',
    link: '/products/childhood-emergency-guide',
  },
};

export const EMERGENCY_GUIDE_CONTENT = {
  hero: {
    headline: 'Know What To Do When It {{Matters}}.',
    paragraph:
      'A practical guide helping parents understand what to do during common childhood emergencies. A complete bundle of three essential volumes.',
    button: 'Get The Bundle',
    bundleLink: 'https://selar.com/blp6127781',
    storeLink: 'https://selar.com/m/babyfirsthealth',
    image: '/images/guide-bundle.png',
  },
  emergencyNote:
    'In an emergency, contact your nearest hospital or emergency services immediately.',
  volumes: [
    {
      volume: 'Volume 1',
      title: 'Recognize Illness',
      subtitle: 'Early Detection & Assessment',
      description:
        'Spot warning signs early, understand fevers, respiratory changes, and rashes, and know when professional medical attention is required.',
      image: '/images/guide-vol1.png',
      link: 'https://selar.com/h75c517217',
      fill: 'bg-teal-50',
    },
    {
      volume: 'Volume 2',
      title: 'Home Injuries',
      subtitle: 'First Aid & Incident Care',
      description:
        'Step-by-step guidance on treating falls, burns, cuts, wounds, and head bumps, alongside essential childproofing practices.',
      image: '/images/guide-vol2.png',
      link: 'https://selar.com/w51i9v18dc',
      fill: 'bg-teal-100',
    },
    {
      volume: 'Volume 3',
      title: 'Serious Emergencies',
      subtitle: 'Urgent Action Protocols',
      description:
        'Crucial steps for choking awareness, accidental ingestion, sudden breathing distress, and getting to emergency care safely.',
      image: '/images/guide-vol3.png',
      link: 'https://selar.com/9i46c3yxex',
      fill: 'bg-orange-50',
    },
  ],
  whatsInside: {
    headline: 'Learn {{Before}} You Need It.',
    intro: 'The guide covers situations such as:',
    situations: [
      { text: 'Falls and head injuries', icon: 'AlertTriangle' },
      { text: 'Burns', icon: 'Flame' },
      { text: 'Cuts and wounds', icon: 'Bandage' },
      { text: 'Accidental ingestion', icon: 'AlertCircle' },
      { text: 'Choking awareness', icon: 'Activity' },
      { text: 'Other common childhood emergencies', icon: 'ShieldAlert' },
    ],
    summary:
      'Learn what to do, what not to do and when professional medical attention may be needed.',
  },
  formats: {
    headline: 'Learn {{Your Way}}.',
    intro: 'Your purchase includes:',
    items: [
      {
        title: 'PDF',
        description: 'Read the guide whenever you need it.',
        fill: 'bg-teal-50',
        icon: 'FileText',
      },
      {
        title: 'Video',
        description: 'Learn through simple visual explanations.',
        fill: 'bg-teal-100',
        icon: 'Video',
      },
      {
        title: 'Audio',
        description: 'Listen and learn on the go.',
        fill: 'bg-orange-50',
        icon: 'Headphones',
      },
    ],
  },
  bonus: {
    headline: 'Your Guide Comes With {{More}}.',
    intro: 'Your purchase also includes:',
    perks: [
      '30 days of Baby First Health membership',
      'Plus access to free Saturday live sessions and direct healthcare guidance.',
    ],
    button: 'Get Full Access',
    link: 'https://selar.com/blp6127781',
  },
};

export const LIVE_SESSIONS_CONTENT = {
  hero: {
    headline: 'Learn Live Every {{Saturday}}.',
    paragraph:
      'Join free weekly live sessions led by health professionals and guest experts, covering practical child-health and parenting topics.',
    button: 'Join Next Session',
    image: '/images/live-session.jpg',
  },
  whatToExpect: {
    headline: 'Practical Knowledge in {{Real Time}}.',
    points: [
      'Weekly topics that matter to parents',
      'Guidance from health professionals and guest speakers',
      'Practical parenting tips you can use immediately',
      'Q&A during selected sessions',
    ],
    note: 'Free for Baby First Health members.',
  },
  cta: {
    headline: 'Never Miss A {{Session}}.',
    paragraph:
      'Join our community today to get access to every weekly live broadcast, recordings, and direct expert Q&A.',
    button: 'Join The Community',
  },
};

export const CERTIFICATIONS_CONTENT = {
  hero: {
    headline: 'Practical Knowledge. Certified {{Caregiving}}.',
    paragraph:
      'Structured certification programs designed for parents, caregivers, and nannies. Learn evidence-based childcare, developmental milestones, safety, and nutrition.',
    button: 'Apply Now',
    image: '/images/certification-learning.jpg',
  },
  complianceDisclaimer:
    'Baby First Health certificates are certificates of completion designed to confirm knowledge and practical understanding. They do not replace government-issued nursing, medical or formal vocational qualifications.',
  programs: [
    {
      id: 'childcare-safety',
      title: 'Professional Childcare & Safety Certificate',
      subtitle: 'Build practical skills for safer, more confident childcare.',
      badge: 'Core Program',
      topics: [
        'Child supervision and care',
        'Child hygiene and personal care',
        'Safe sleeping practices',
        'Feeding and mealtime safety',
        'Home and environmental safety',
        'Accident prevention',
        'Positive discipline',
        'Child communication',
        'Professional childcare conduct',
        'Basic emergency awareness',
      ],
      price: {
        ngn: '₦60,000',
        usd: '$40',
        fcfa: '25,000 FCFA',
      },
    },
    {
      id: 'early-childhood-development',
      title: 'Early Childhood Development Certificate',
      subtitle: 'Understand how children grow, learn and develop from birth to age five.',
      badge: 'Child Development',
      topics: [
        'Physical development',
        'Cognitive development',
        'Language and communication',
        'Social development',
        'Emotional development',
        'Developmental milestones',
        'Play and early learning',
        'Creating stimulating environments',
        'Supporting healthy development',
        'Recognizing possible developmental concerns',
      ],
      price: {
        ngn: '₦75,000',
        usd: '$50',
        fcfa: '30,000 FCFA',
      },
    },
    {
      id: 'positive-parenting',
      title: 'Positive Parenting & Child Psychology Certificate',
      subtitle: "Understand children's behavior, emotions and psychological needs.",
      badge: 'Behavior & Psychology',
      topics: [
        'Child emotions and emotional regulation',
        'Tantrums and difficult behavior',
        'Aggression, biting and hitting',
        'Positive discipline',
        'Setting healthy boundaries',
        'Parent-child communication',
        'Building confidence and self-esteem',
        'Separation anxiety',
        "Understanding children's needs",
        'Building healthy parent-child relationships',
      ],
      price: {
        ngn: '₦60,000',
        usd: '$40',
        fcfa: '25,000 FCFA',
      },
    },
    {
      id: 'child-nutrition',
      title: 'Child Nutrition & Feeding Certificate',
      subtitle: 'Build better knowledge around feeding, nutrition and healthy childhood development.',
      badge: 'Nutrition & Growth',
      topics: [
        'Breastfeeding education',
        'Introduction to complementary feeding',
        'Age-appropriate foods',
        'Feeding routines',
        'Food safety and hygiene',
        'Meal planning',
        'Picky eating',
        'Common feeding mistakes',
        'Choking prevention',
        'Common childhood nutrition myths',
      ],
      price: {
        ngn: '₦75,000',
        usd: '$50',
        fcfa: '30,000 FCFA',
      },
    },
    {
      id: 'childhood-safety-emergency',
      title: 'Childhood Safety & Emergency Awareness Certificate',
      subtitle: 'Learn how to prevent common childhood emergencies and respond appropriately when they happen.',
      badge: 'Emergency & Safety',
      topics: [
        'Falls and head injuries',
        'Burns',
        'Cuts and wounds',
        'Choking awareness',
        'Accidental poisoning and ingestion',
        'Drowning prevention',
        'Electrical hazards',
        'Household chemicals',
        'Emergency preparedness',
        'Warning signs and danger signs',
        'When to seek professional medical care',
      ],
      price: {
        ngn: '₦75,000',
        usd: '$50',
        fcfa: '30,000 FCFA',
      },
    },
    {
      id: 'cif-certification',
      title: 'CIF — Complete Integrated Family-care Certification',
      subtitle: 'A comprehensive certification combining all five Baby First Health programs.',
      badge: 'Flagship All-In-One Program',
      isFlagship: true,
      topics: [
        'Professional Childcare & Safety',
        'Early Childhood Development',
        'Positive Parenting & Child Psychology',
        'Child Nutrition & Feeding',
        'Childhood Safety & Emergency Awareness',
        'Child health and wellbeing',
        'Practical parenting and caregiving knowledge',
        'Comprehensive family-care foundation',
      ],
      price: {
        ngn: '₦250,000',
        usd: '$165',
        fcfa: '100,000 FCFA',
      },
    },
  ],
  cta: {
    headline: 'Ready To {{Build Confidence}}?',
    paragraph:
      'Enroll in any certified program today to empower yourself, your family, or your childcare team with verified practical skills.',
    button: 'Enroll via WhatsApp',
    whatsappLink: 'https://chat.whatsapp.com/ClJyZpPZ8Pz55TZivlvosi',
  },
};

export const CONTACT_CONTENT = {
  hero: {
    headline: 'We Are Here To {{Help}}.',
    paragraph:
      'Have a question about our community, courses, resources or partnerships? Get in touch.',
  },
  channels: {
    whatsapp: {
      title: 'WhatsApp',
      description: 'Fastest response for parent inquiries.',
      phone: '+237 650082327',
      link: 'https://wa.me/237650082327',
    },
    email: {
      title: 'Email',
      address: 'babyfirsthealth@gmail.com',
      description: 'For general inquiries, admissions and partnerships.',
    },
  },
  emergencyNote:
    'Baby First Health does not provide emergency medical services. In an emergency, contact your nearest hospital or emergency services immediately.',
};

export interface FAQItem {
  id: string;
  category: 'general' | 'guides' | 'certifications' | 'community' | 'payments';
  question: string;
  answer: string;
}

export const FAQ_CONTENT = {
  hero: {
    headline: 'Frequently Asked {{Questions}}.',
    paragraph:
      'Everything you need to know about our practical guides, accredited certifications, parent community, and clinical learning.',
  },
  categories: [
    { id: 'all', label: 'All Questions' },
    { id: 'guides', label: 'Guides & Ebooks' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'community', label: 'Community & Sessions' },
    { id: 'payments', label: 'Orders & Payments' },
    { id: 'general', label: 'General & Support' },
  ],
  faqs: [
    {
      id: 'what-is-bfh',
      category: 'general',
      question: 'What is Baby First Health and who is behind it?',
      answer:
        'Baby First Health is a maternal and child healthcare initiative founded by Registered Nurse Dolly Kelly S. (SRN). We empower parents, caregivers, and childcare professionals with practical, evidence-based tools, accredited certification courses, and emergency guidance to protect children from infancy through early childhood.',
    },
    {
      id: 'emergency-medical-advice',
      category: 'general',
      question: 'Does Baby First Health provide emergency medical treatment?',
      answer:
        'No. Baby First Health provides educational guidance, practical home action protocols, and professional caregiving training. We do not replace emergency medical facilities or direct clinical triage. In an acute life-threatening emergency, always contact your local hospital or emergency dispatch immediately.',
    },
    {
      id: 'what-is-emergency-guide',
      category: 'guides',
      question: 'What is covered in the Childhood Emergency Guide?',
      answer:
        'The Childhood Emergency Guide is a complete 3-volume parenting safety collection: Volume 1 (Recognize Illness) covers fever, breathing issues, rashes, and early warning signs; Volume 2 (Home Injuries) details burns, cuts, falls, childproofing, and home first aid; and Volume 3 (Serious Emergencies) provides protocols for choking response, accidental ingestion, and safe hospital transfer.',
    },
    {
      id: 'access-ebooks-after-purchase',
      category: 'guides',
      question: 'How do I access my ebooks after purchasing?',
      answer:
        'Immediately after completing your purchase through our official Selar store, you will receive instant digital access with downloadable PDF copies sent to your email. You can read them on any smartphone, tablet, e-reader, or computer with lifetime access.',
    },
    {
      id: 'buy-individual-vs-bundle',
      category: 'guides',
      question: 'Can I purchase single volumes or only the full bundle?',
      answer:
        'You can purchase each of the three volumes separately depending on your specific needs, or buy the complete 3-book bundle at a significant discount for complete family preparedness.',
    },
    {
      id: 'who-can-take-certifications',
      category: 'certifications',
      question: 'Who should enroll in Baby First Health certification courses?',
      answer:
        'Our courses are designed for parents seeking structured mastery, professional nannies, daycare providers, early childhood educators, healthcare assistants, and foster parents wanting accredited, verified practical credentials in pediatric safety and care.',
    },
    {
      id: 'what-is-cif',
      category: 'certifications',
      question: 'What is the Flagship CIF (Complete Integrated Family-care) Certification?',
      answer:
        'The CIF is our flagship all-in-one professional program combining all five individual certificates: Professional Childcare & Safety, Early Childhood Development, Positive Parenting & Child Psychology, Child Nutrition & Feeding, and Childhood Safety & Emergency Awareness into a comprehensive career credential.',
    },
    {
      id: 'how-to-apply-cert',
      category: 'certifications',
      question: 'How do I apply for a certification program?',
      answer:
        'You can apply directly through our online certification portal at /certifications/apply. Your application will be sent to our admissions team at babyfirsthealth@gmail.com, or you can message our admissions desk directly on WhatsApp at +237 650082327.',
    },
    {
      id: 'community-membership-benefits',
      category: 'community',
      question: 'What are the benefits of joining the Parent Community?',
      answer:
        'Community members enjoy weekly live Q&A workshops with pediatric specialists, dedicated WhatsApp parent support groups, priority access to new emergency guides, and peer-to-peer discussions on infant sleep, weaning, milestones, and family wellness.',
    },
    {
      id: 'live-sessions-schedule',
      category: 'community',
      question: 'How do I participate in weekly Live Sessions?',
      answer:
        'Live sessions take place every weekend on Google Meet and WhatsApp Live. All members receive direct reminders and meeting links via our official community group. Replays and summary action checklists are distributed afterwards.',
    },
    {
      id: 'payment-methods-accepted',
      category: 'payments',
      question: 'What payment methods and currencies are accepted?',
      answer:
        'We accept local and international debit/credit cards (Visa, Mastercard, Verve), Mobile Money (MTN MoMo, Orange Money), and direct bank transfers in NGN, USD, FCFA, GHS, KES, and GBP through our secure checkout partner Selar.',
    },
    {
      id: 'direct-support-contact',
      category: 'payments',
      question: 'How do I get direct support if I encounter an issue?',
      answer:
        'Our support team is available via WhatsApp at +237 650082327 or by email at babyfirsthealth@gmail.com. We respond to parent inquiries promptly.',
    },
  ],
};





