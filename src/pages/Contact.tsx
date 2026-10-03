import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  ShieldAlert,
  CheckCircle2,
  Send,
  AlertCircle,
} from 'lucide-react';
import { TikTokIcon, FacebookIcon } from '../components/SocialIcons';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { SmartImage } from '../components/SmartImage';
import { Reveal } from '../components/Reveal';
import { CONTACT_CONTENT } from '../content/content';
import { submitToNetlify } from '../services/formService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone or WhatsApp number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please type a short message.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    await submitToNetlify('contact', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const constructMailtoUrl = () => {
    const subject = encodeURIComponent(`Contact Inquiry - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone / WhatsApp: ${formData.phone}\n\nMessage:\n${formData.message}\n\nSubmitted via Baby First Health Contact Portal`
    );
    return `mailto:babyfirsthealth@gmail.com?subject=${subject}&body=${body}`;
  };

  const constructWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Baby First Health,\n\nMy name is *${formData.name}*.\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Message:*\n${formData.message}`
    );
    return `https://wa.me/237650082327?text=${text}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 lg:pt-48 pb-[85px] md:pb-[100px] lg:pb-[120px] bg-white overflow-hidden">
        {/* Subtle background decoration */}
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
            <div className="max-w-[760px] mx-auto text-left md:text-center space-y-6">
              <Headline as="h1" align="auto" isHero>
                {CONTACT_CONTENT.hero.headline}
              </Headline>

              <p className="font-body text-lg md:text-xl text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                {CONTACT_CONTENT.hero.paragraph}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. TWO-COLUMN CONTACT & FORM SECTION */}
      <Section bg="teal-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN: Channels & Info */}
            <div className="lg:col-span-5">
              <Reveal type="left">
                <div className="space-y-8">
                  {/* Support Photo */}
                  <div className="w-full">
                    <SmartImage
                      src="/images/contact-support.jpg"
                      alt="Friendly Baby First Health support team member smiling warmly"
                      aspectRatio="3:2"
                      className="w-full"
                    />
                  </div>

              {/* Direct Channels */}
              <div className="space-y-6">
                {/* WhatsApp Channel */}
                <div className="bg-white rounded-[28px] p-6 space-y-3">
                  <div className="flex items-center gap-3 text-teal-600">
                    <WhatsAppIcon className="w-6 h-6 fill-teal-600" />
                    <h3 className="font-headline font-extrabold text-teal-900 text-xl">
                      {CONTACT_CONTENT.channels.whatsapp.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                    {CONTACT_CONTENT.channels.whatsapp.description}
                  </p>
                  <div className="pt-1">
                    <a
                      href={CONTACT_CONTENT.channels.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-headline font-bold text-teal-800 hover:text-orange-500 transition-colors text-lg inline-block"
                    >
                      {CONTACT_CONTENT.channels.whatsapp.phone}
                    </a>
                  </div>
                </div>

                {/* Email Channel */}
                <div className="bg-white rounded-[28px] p-6 space-y-3">
                  <div className="flex items-center gap-3 text-teal-600">
                    <Mail size={26} strokeWidth={2} />
                    <h3 className="font-headline font-extrabold text-teal-900 text-xl">
                      {CONTACT_CONTENT.channels.email.title}
                    </h3>
                  </div>
                  <a
                    href={`mailto:${CONTACT_CONTENT.channels.email.address}`}
                    className="font-headline font-bold text-teal-800 hover:text-orange-500 transition-colors text-lg inline-block"
                  >
                    {CONTACT_CONTENT.channels.email.address}
                  </a>
                  <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                    {CONTACT_CONTENT.channels.email.description}
                  </p>
                </div>

                {/* Social Community Channels */}
                <div className="bg-white rounded-[28px] p-6 space-y-4">
                  <h3 className="font-headline font-extrabold text-teal-900 text-xl">
                    Follow Our Channels
                  </h3>
                  <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                    Watch bite-sized parenting guidance, live video snippets, and community stories.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href="https://tiktok.com/@babyfirsthealth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-teal-50 hover:bg-orange-500 hover:text-white text-teal-900 font-body text-sm font-semibold flex items-center gap-2.5 transition-all duration-300"
                    >
                      <TikTokIcon className="w-4 h-4 fill-current" />
                      <span>TikTok</span>
                    </a>
                    <a
                      href="https://www.facebook.com/share/1VG7i45YqA/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-teal-50 hover:bg-orange-500 hover:text-white text-teal-900 font-body text-sm font-semibold flex items-center gap-2.5 transition-all duration-300"
                    >
                      <FacebookIcon className="w-4 h-4 fill-current" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7">
              <Reveal type="right" delay={150}>
                <div className="bg-white rounded-[32px] md:rounded-[40px] p-8 md:p-12 space-y-8">
                <div className="space-y-2">
                  <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                    Send Us A Message
                  </h2>
                  <p className="font-body text-sm md:text-base text-teal-950/80 leading-relaxed">
                    Fill out the form below and our team will get back to you promptly.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="bg-teal-50 rounded-[28px] p-8 md:p-10 text-center space-y-6">
                    <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto shadow-none">
                      <CheckCircle2 size={36} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl">
                        Message Successfully Sent!
                      </h3>
                      <p className="font-body text-base text-teal-950/80 max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out. Your message has been dispatched to our care team at <strong className="text-teal-900">babyfirsthealth@gmail.com</strong>.
                      </p>
                    </div>

                    {/* Summary of submitted inquiry */}
                    <div className="bg-white rounded-[24px] p-6 text-left space-y-2 font-body text-sm text-teal-950/85">
                      <p><strong>From:</strong> {formData.name}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p className="pt-2 text-xs text-teal-900/70 border-t border-teal-100">
                        {formData.message}
                      </p>
                    </div>

                    {/* Quick action buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={constructWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-current" />
                        <span>Send via WhatsApp</span>
                      </a>

                      <a
                        href={constructMailtoUrl()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-body font-semibold text-sm transition-colors"
                      >
                        <Mail size={16} />
                        <span>Open in Email App</span>
                      </a>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', phone: '', email: '', message: '' });
                        }}
                        className="font-body font-semibold text-teal-700 hover:text-teal-900 underline text-sm"
                      >
                        Send another message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block font-body font-semibold text-teal-900 text-sm"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                      />
                      {errors.name && (
                        <p className="text-red-500 font-body text-xs flex items-center gap-1.5 pt-1">
                          <AlertCircle size={14} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block font-body font-semibold text-teal-900 text-sm"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +237 600 000 000"
                        className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                      />
                      {errors.phone && (
                        <p className="text-red-500 font-body text-xs flex items-center gap-1.5 pt-1">
                          <AlertCircle size={14} />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block font-body font-semibold text-teal-900 text-sm"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. name@gmail.com"
                        className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                      />
                      {errors.email && (
                        <p className="text-red-500 font-body text-xs flex items-center gap-1.5 pt-1">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block font-body font-semibold text-teal-900 text-sm"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-[24px] p-6 outline-none transition-all duration-200 resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-500 font-body text-xs flex items-center gap-1.5 pt-1">
                          <AlertCircle size={14} />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidthOnMobile
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
