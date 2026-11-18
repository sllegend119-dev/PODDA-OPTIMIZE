import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { FaqItem } from '../types';

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Are the sensitivity numbers guaranteed to land 100% headshots?',
    answer: 'No. Sensitivity values are mathematically calculated starting points calibrated for each phone model’s touch sampling rate and display DPI. Player hand speed, finger friction, screen protector thickness, and muscle memory are essential. Use them as a baseline, test in training mode, and adjust by ±2 points.',
  },
  {
    question: 'Does this site detect my phone automatically or access my files?',
    answer: 'No. The Sensi Lab runs 100% locally in your web browser. You choose your model from the database. No live telemetry is extracted from your phone, and no game files or personal accounts are ever accessed.',
  },
  {
    question: 'How do I purchase the full PODDA OPTIMIZE suite?',
    answer: 'Orders are processed directly via WhatsApp and Bank Transfer for LKR 1,000. Send a screenshot of your bank transfer receipt along with your exact phone model and Android version (11+ required) to receive your custom configuration instructions.',
  },
  {
    question: 'What are the top 3 hardware habits before competitive matches?',
    answer: '1) Close all background social media apps to prevent RAM paging. 2) Remove thick phone cases if your device heats up. 3) Wipe your screen and fingers clean so touch drag acceleration remains completely linear.',
  },
  {
    question: 'Can I view the customer payment and gameplay proof in high resolution?',
    answer: 'Yes! Tap any card in the Customer Proof section to open the fullscreen interactive lightbox. You can zoom in and examine authentic transfer slips and real player testimonials.',
  },
];

export const SystemFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    sound.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <span>Truth in Performance</span>
              <span aria-hidden="true">·</span>
              <span>Common Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              SYSTEM FAQ
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Clear, honest answers regarding sensitivity calculation, hardware compatibility, and realistic expectations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#08150d] border border-emerald-500/20 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-950/20 transition-colors"
                >
                  <span className="font-orbitron font-bold text-sm sm:text-base text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-emerald-500/10">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
