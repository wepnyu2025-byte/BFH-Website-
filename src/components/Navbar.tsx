import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, GLOBAL_CONTENT } from '../content/content';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-3 inset-x-4 md:inset-x-8 z-50 max-w-[1200px] mx-auto">
      <nav
        aria-label="Main Navigation"
        className={`w-full rounded-full transition-colors duration-300 px-4 md:px-6 py-2.5 flex items-center justify-between ${
          scrolled || mobileMenuOpen ? 'bg-teal-50' : 'bg-transparent'
        }`}
      >
        {/* Logo and Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="Baby First Health Home"
        >
          <img
            src="/BFH-logo.svg"
            alt="Baby First Health Emblem"
            className="h-10 md:h-11 w-auto"
            width={44}
            height={44}
          />
          <span className="font-headline font-extrabold text-teal-900 text-lg md:text-xl tracking-tight leading-none">
            Baby First Health
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative font-body font-semibold text-sm xl:text-[15px] transition-colors py-1 ${
                  isActive ? 'text-teal-600' : 'text-teal-900 hover:text-teal-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block shrink-0">
          <Button to="/community" variant="primary">
            {GLOBAL_CONTENT.primaryCta}
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden p-2 text-teal-900 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-teal-50 rounded-[28px] p-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`h-14 flex items-center px-4 rounded-2xl font-body font-semibold text-base transition-colors ${
                    isActive
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-teal-900 hover:bg-teal-100/60'
                  }`}
                >
                  <span className="flex-1">{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-orange-500" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Button to="/community" variant="primary" fullWidthOnMobile>
              {GLOBAL_CONTENT.primaryCta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
