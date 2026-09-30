import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Search,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Users,
  CreditCard,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CustomDropdown, DropdownOption } from '../components/CustomDropdown';
import { FAQ_CONTENT } from '../content/content';

const FAQ_TOPIC_OPTIONS: DropdownOption[] = [
  { value: 'General Inquiry', label: 'General Question & Mission' },
  { value: 'Guides & Ebooks', label: 'Childhood Emergency Guide & Ebooks' },
  { value: 'Certifications & Training', label: 'Certifications & CIF Program' },
  { value: 'Parent Community & Live Sessions', label: 'Parent Community & Live Sessions' },
  { value: 'Orders & Payments', label: 'Orders, Downloads & Payments' },
];

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('what-is-bfh');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [question, setQuestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Filter FAQs based on category and search
  const filteredFaqs = useMemo(() => {
    return FAQ_CONTENT.faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const constructEmailBody = () => {
    return `QUESTION SUBMISSION DETAILS:
------------------------------------------
Inquiry Topic: ${topic}
Full Name: ${fullName}
Email Address: ${email}
WhatsApp / Phone: ${phone}

Question / Message:
${question}
------------------------------------------
Submitted via Baby First Health FAQ Portal`;
  };

  const constructWhatsAppLink = () => {
    const text = `Hello Baby First Health Support,\n\nMy name is *${fullName}*.\n*Email:* ${email}\n*Phone:* ${phone}\n*Topic:* ${topic}\n\n*Question:*\n${question}`;
    return `https://wa.me/237650082327?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !question.trim()) {
      setFormError('Please fill in your name, email, contact number, and question before submitting.');
      return;
    }

    setFormError('');
    setIsSubmitted(true);

    // Trigger preformatted mailto to babyfirsthealth@gmail.com
    const subject = encodeURIComponent(`[FAQ Question] ${topic} - ${fullName}`);
    const body = encodeURIComponent(constructEmailBody());
    window.location.href = `mailto:babyfirsthealth@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setTopic('General Inquiry');
    setQuestion('');
    setIsSubmitted(false);
    setFormError('');
  };

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'guides':
        return <BookOpen size={16} className="shrink-0" />;
      case 'certifications':
        return <GraduationCap size={16} className="shrink-0" />;
      case 'community':
        return <Users size={16} className="shrink-0" />;
      case 'payments':
        return <CreditCard size={16} className="shrink-0" />;
      default:
        return <HelpCircle size={16} className="shrink-0" />;
    }
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 pb-[85px] md:pb-[100px] bg-white overflow-hidden">
        {/* Subtle decorative heart shape */}
        <div
          className="absolute -right-24 top-20 w-[420px] h-[420px] text-teal-50 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-60">
            <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
          </svg>
        </div>

        <Container>
          <Reveal type="up">
            <div className="max-w-3xl mx-auto space-y-6 text-left md:text-center">
              <Headline as="h1" align="auto" isHero>
                {FAQ_CONTENT.hero.headline}
              </Headline>

              <p className="font-body text-lg md:text-xl text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                {FAQ_CONTENT.hero.paragraph}
              </p>

              {/* Search input with soft pill styling and no shadows */}
              <div className="pt-2 max-w-xl mx-auto">
                <div className="relative flex items-center">
                  <Search
                    size={20}
                    className="absolute left-6 text-teal-600/70 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions (e.g. fever, CIF, download, refund)..."
                    className="w-full pl-14 pr-20 py-4 rounded-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base outline-none transition-all duration-200"
                    aria-label="Search frequently asked questions"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-5 text-xs font-semibold text-teal-700 hover:text-teal-900 px-2.5 py-1 rounded-full bg-teal-100 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. FAQ ACCORDION SECTION */}
      <Section bg="teal-50">
        <Container>
          <div className="space-y-10">
            {/* Category Filter Pills (No shadows, rounded pills) */}
            <div className="flex flex-wrap items-center justify-start md:justify-center gap-2.5">
              {FAQ_CONTENT.categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-teal-700 text-white'
                        : 'bg-white text-teal-900 hover:bg-teal-100'
                    }`}
                  >
                    {cat.id !== 'all' && getCategoryIcon(cat.id)}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Questions List */}
            <div className="max-w-3xl mx-auto space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="acc-item bg-white rounded-[24px] md:rounded-[28px] overflow-hidden transition-all duration-300"
                      data-open={isOpen ? 'true' : 'false'}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-6 md:p-8 flex items-center justify-between gap-4 text-left transition-colors hover:bg-teal-50/50 cursor-pointer"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <span className="font-headline font-extrabold text-teal-900 text-lg md:text-xl tracking-tight leading-snug">
                          {faq.question}
                        </span>
                        <div
                          className={`w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center shrink-0 text-teal-700 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 bg-teal-100 text-teal-900' : ''
                          }`}
                        >
                          <ChevronDown size={20} strokeWidth={2.5} />
                        </div>
                      </button>

                      {/* Smooth Collapsible Content based on BFH-animations.md grid-template-rows */}
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="acc-panel"
                      >
                        <div>
                          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-1 text-left">
                            <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-[32px] p-8 md:p-12 text-center space-y-4">
                  <HelpCircle size={40} className="mx-auto text-teal-600/60" />
                  <h3 className="font-headline font-bold text-teal-900 text-xl">
                    No matching questions found
                  </h3>
                  <p className="font-body text-base text-teal-950/70 max-w-md mx-auto">
                    We couldn’t find an answer for &ldquo;{searchQuery}&rdquo;. Feel free to submit your question below, and our team will get back to you directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="inline-block px-6 py-3 rounded-full bg-teal-100 text-teal-900 font-body text-sm font-semibold hover:bg-teal-200 transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. WORKING QUESTION SUBMISSION FORM (DESIGNED EXACTLY LIKE APPLICATION FORM) */}
      <Section bg="white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              /* Success Confirmation Banner modeled after Application Form */
              <Reveal type="up">
                <div className="bg-white rounded-[32px] p-8 md:p-12 text-left md:text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} strokeWidth={2.5} />
                  </div>

                  <Headline as="h2" align="auto">
                    {"Question {{Ready to Send}}"}
                  </Headline>

                  <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                    Your inquiry details regarding <strong>{topic}</strong> have been prepared for our clinical support desk at <strong>babyfirsthealth@gmail.com</strong>.
                  </p>

                  <div className="bg-teal-50 rounded-[24px] p-6 space-y-3 text-left">
                    <p className="font-body font-semibold text-teal-900 text-sm">
                      Sender: {fullName} • Topic: {topic}
                    </p>
                    <p className="font-body text-xs text-teal-950/80">
                      Email: {email} • WhatsApp: {phone}
                    </p>
                    <p className="font-body text-xs text-teal-950/80 italic pt-1">
                      &ldquo;{question}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={constructWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-5 h-5 fill-current" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-teal-100 hover:bg-teal-200 text-teal-900 font-body font-semibold text-base transition-colors cursor-pointer"
                    >
                      Ask Another Question
                    </button>
                  </div>
                </div>
              </Reveal>
            ) : (
              /* Clean Form Card modeled directly on Application Form */
              <Reveal type="up" delay={100}>
                <div className="bg-teal-50 rounded-[32px] p-8 md:p-12 space-y-8">
                  {/* Form Header (No kicker above headline) */}
                  <div className="space-y-3 text-left">
                    <Headline as="h2" align="left">
                      {"Ask Our Team {{Directly}}"}
                    </Headline>
                    <p className="font-body text-sm md:text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                      Have a specific question about our emergency guides, certification courses, or clinical parent guidance? Submit your question below and our team will get back to you promptly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formError && (
                      <div className="p-4 rounded-2xl bg-red-50 text-red-700 text-sm font-medium">
                        {formError}
                      </div>
                    )}

                    {/* Inquiry Topic Dropdown using CustomDropdown */}
                    <CustomDropdown
                      name="topic"
                      label="Inquiry Topic *"
                      value={topic}
                      options={FAQ_TOPIC_OPTIONS}
                      onChange={(val) => setTopic(val)}
                      required
                    />

                    {/* Full Name */}
                    <div className="space-y-2 text-left">
                      <label
                        htmlFor="faq-name"
                        className="block font-body text-sm font-semibold text-teal-900"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="faq-name"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        required
                        className="w-full bg-white hover:bg-white/90 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Two Columns: Email and WhatsApp Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2 text-left">
                        <label
                          htmlFor="faq-email"
                          className="block font-body text-sm font-semibold text-teal-900"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="faq-email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@gmail.com"
                          required
                          className="w-full bg-white hover:bg-white/90 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2 text-left">
                        <label
                          htmlFor="faq-phone"
                          className="block font-body text-sm font-semibold text-teal-900"
                        >
                          Contact Number (WhatsApp enabled) *
                        </label>
                        <input
                          type="tel"
                          id="faq-phone"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+237 650082327"
                          required
                          className="w-full bg-white hover:bg-white/90 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Question Textarea */}
                    <div className="space-y-2 text-left">
                      <label
                        htmlFor="faq-question"
                        className="block font-body text-sm font-semibold text-teal-900"
                      >
                        Your Question or Message *
                      </label>
                      <textarea
                        id="faq-question"
                        name="question"
                        rows={4}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question here with as much detail as you'd like..."
                        required
                        className="w-full bg-white hover:bg-white/90 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-[24px] p-6 outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        Submit
                      </button>

                      <a
                        href={`https://wa.me/237650082327?text=${encodeURIComponent(
                          'Hello Baby First Health, I have a question regarding your programs.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-teal-100 hover:bg-teal-200 text-teal-900 font-body font-semibold text-base transition-colors cursor-pointer"
                      >
                        <WhatsAppIcon className="w-5 h-5 fill-current text-teal-800" />
                        <span>Ask via WhatsApp</span>
                      </a>
                    </div>
                  </form>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};
