import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'soft';

interface ButtonProps {
  children: string;
  variant?: ButtonVariant;
  href?: string;
  to?: string;
  onClick?: () => void;
  fullWidthOnMobile?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  fullWidthOnMobile = false,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-orange-500 hover:bg-orange-600 text-white font-bold hover:scale-103 active:scale-98 transition-all duration-300',
    secondary:
      'bg-teal-600 hover:bg-teal-700 text-white font-bold hover:scale-103 active:scale-98 transition-all duration-300',
    soft:
      'bg-white hover:bg-teal-50 text-teal-950 font-bold hover:scale-103 active:scale-98 transition-all duration-300',
  };

  const widthClass = fullWidthOnMobile ? 'w-full md:w-auto' : '';
  const combinedClasses = `btn-roll ${variantClasses[variant]} ${widthClass} ${className}`;

  const innerLabel = (
    <span className="btn-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );

  // Smooth scroll for hash links (#anchor)
  if (to && to.startsWith('#')) {
    const handleHashClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const targetId = to.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return (
      <a
        href={to}
        onClick={handleHashClick}
        className={combinedClasses}
        aria-label={ariaLabel || children}
      >
        {innerLabel}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={combinedClasses} aria-label={ariaLabel || children}>
        {innerLabel}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel || children}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {innerLabel}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel || children}
    >
      {innerLabel}
    </button>
  );
};
