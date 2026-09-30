import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 w-full ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            data-open={isOpen ? 'true' : 'false'}
            className="acc-item bg-teal-50 rounded-[24px] overflow-hidden transition-colors duration-300"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-content-${item.id}`}
              className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 cursor-pointer"
            >
              <span className="font-body font-semibold text-teal-900 text-lg md:text-xl leading-snug">
                {item.question}
              </span>
              <span className="shrink-0 text-teal-600 acc-icon">
                <Plus size={26} strokeWidth={2.5} />
              </span>
            </button>

            <div
              id={`acc-content-${item.id}`}
              role="region"
              aria-labelledby={`acc-header-${item.id}`}
              className="acc-panel"
            >
              <div>
                <div className="px-6 pb-6 md:px-8 md:pb-7 text-teal-950/80 leading-relaxed font-body">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
