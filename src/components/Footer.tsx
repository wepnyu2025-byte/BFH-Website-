import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { NAV_LINKS, GLOBAL_CONTENT } from '../content/content';
import { TikTokIcon, FacebookIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-white rounded-t-[40px] md:rounded-t-[48px] pt-[85px] md:pt-[100px] pb-12 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand, Tagline, and Social Links */}
          <div className="md:col-span-6 lg:col-span-5 space-y-6">
            <Link
              to="/"
              className="flex items-center gap-3"
              aria-label="Baby First Health"
            >
              <img
                src="/BFH-logo.svg"
                alt="Baby First Health Logo"
                className="h-10 w-auto brightness-0 invert"
                width={40}
                height={40}
              />
              <span className="font-headline font-extrabold text-xl tracking-tight text-white">
                {GLOBAL_CONTENT.brand}
              </span>
            </Link>
            <p className="font-body text-white/90 text-base max-w-sm leading-relaxed">
              {GLOBAL_CONTENT.tagline}
            </p>

            {/* Social Channels */}
            <div className="space-y-3 pt-2">
              <span className="block font-body text-xs font-semibold text-white/70 tracking-wider uppercase">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={GLOBAL_CONTENT.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-teal-700/80 hover:bg-orange-500 text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Baby First Health on TikTok"
                >
                  <TikTokIcon className="w-5 h-5 fill-current" />
                </a>
                <a
                  href={GLOBAL_CONTENT.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-teal-700/80 hover:bg-orange-500 text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Baby First Health on Facebook"
                >
                  <FacebookIcon className="w-5 h-5 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-7">
            <h3 className="font-body font-semibold text-white text-lg mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-white/80 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-body text-xs text-white/70">
          <p>{GLOBAL_CONTENT.copyright}</p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors"
            >
              Terms & Medical Disclaimer
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

