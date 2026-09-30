import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
}

interface CustomDropdownProps {
  id?: string;
  name: string;
  label?: string;
  value: string;
  options: readonly string[] | DropdownOption[];
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
  required = false,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to DropdownOption format
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={id || name}
          className="block font-body text-sm font-semibold text-teal-900"
        >
          {label}
        </label>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} required={required} />

      {/* Custom Trigger Button */}
      <button
        type="button"
        id={id || name}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-teal-50 hover:bg-teal-100/70 text-teal-950 font-body text-base rounded-full px-6 py-4 flex items-center justify-between transition-all duration-200 cursor-pointer text-left focus:ring-2 focus:ring-teal-400/40 outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate pr-2 font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`text-teal-700 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-orange-600' : ''
          }`}
        />
      </button>

      {/* Custom Branded Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-teal-50 rounded-[24px] p-2 z-50 max-h-64 overflow-y-auto space-y-1 animate-in fade-in zoom-in-95 duration-150"
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                type="button"
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-sm md:text-base font-body cursor-pointer flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'text-teal-950 hover:bg-white hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="truncate">{opt.label}</span>
                  {opt.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {opt.badge}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <Check size={16} strokeWidth={2.5} className="shrink-0 text-white" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
