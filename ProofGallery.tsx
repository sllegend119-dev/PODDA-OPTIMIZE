import React, { useState } from 'react';
import { ProofItem } from '../types';
import { sound } from '../utils/audio';
import { ZoomIn, X, ChevronLeft, ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PROOF_DATA: ProofItem[] = [
  {
    id: 'proof-1',
    title: 'Customer Payment Slips & Verification',
    caption: 'Verified local bank transfers and direct client confirmation messages.',
    src: '/assets/proof/proof_1.png',
    aspectRatio: '4:3',
    metrics: 'LKR 1,000 Verified Orders',
    verifiedBuyer: 'Verified Community Members',
    device: 'Android 11+ Devices',
  },
  {
    id: 'proof-2',
    title: 'Gameplay Drag & Sensi Feedback',
    caption: 'Real in-match headshot drag accuracy and aim response confirmation.',
    src: '/assets/proof/proof_2.jpg',
    aspectRatio: '4:3',
    metrics: 'Aim Drag Response: +15%',
    verifiedBuyer: 'Free Fire Competitive Players',
    device: 'Pixel & Redmi Devices',
  },
  {
    id: 'proof-3',
    title: 'Community Reviews & Testimonials',
    caption: 'Customer appreciation messages and long-session performance logs.',
    src: '/assets/proof/proof_3.png',
    aspectRatio: '4:3',
    metrics: '5-Star Direct Reviews',
    verifiedBuyer: 'Tournament Squad Leads',
    device: 'Samsung & Infinix Models',
  },
];

export const ProofGallery: React.FC = () => {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const openModal = (idx: number) => {
    sound.playClick();
    setActiveModalIndex(idx);
  };

  const closeModal = () => {
    sound.playClick();
    setActiveModalIndex(null);
  };

  const nextModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playClick();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % PROOF_DATA.length);
    }
  };

  const prevModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playClick();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + PROOF_DATA.length) % PROOF_DATA.length);
    }
  };

  return (
    <section id="proof-gallery" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <span>Community Validation & Receipts</span>
              <span aria-hidden="true">·</span>
              <span>100% Authentic Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              CUSTOMER PROOF
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Direct player receipts, gameplay feedback screenshots, and verified bank transfer confirmations. Tap any image to examine full resolution.
          </p>
        </div>

        {/* 3-Column Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROOF_DATA.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openModal(idx)}
              className="group p-3 rounded-2xl bg-[#08150d] border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 cursor-zoom-in flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(57,255,120,0.15)] hover:-translate-y-1"
            >
              {/* Image Container with Fallback Resiliency */}
              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-[#030704] border border-emerald-500/10">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    // Fallback container if local path has any glitch
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#39ff78] text-black font-orbitron font-bold text-xs flex items-center gap-1.5 shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>ENLARGE PROOF</span>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#39ff78]" />
                  <span>{item.metrics}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-orbitron font-bold text-sm text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-emerald-500/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400">{item.verifiedBuyer}</span>
                  <span>{item.device}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Interactive Lightbox Modal */}
        {activeModalIndex !== null && (
          <div
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          >
            {/* Top Toolbar */}
            <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-10 pointer-events-auto">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-[#0a180f] border border-emerald-500/30 text-xs font-mono text-emerald-400">
                  IMAGE {activeModalIndex + 1} OF {PROOF_DATA.length}
                </span>
                <span className="text-sm font-orbitron text-white hidden sm:inline">
                  {PROOF_DATA[activeModalIndex].title}
                </span>
              </div>

              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-[#0a180f] border border-emerald-500/40 text-white hover:text-[#39ff78] hover:border-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevModal}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a180f]/90 border border-emerald-500/40 text-white hover:text-[#39ff78] hover:border-emerald-400 flex items-center justify-center z-10 transition-colors cursor-pointer"
              title="Previous Proof"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextModal}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a180f]/90 border border-emerald-500/40 text-white hover:text-[#39ff78] hover:border-emerald-400 flex items-center justify-center z-10 transition-colors cursor-pointer"
              title="Next Proof"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Stage Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2"
            >
              <img
                src={PROOF_DATA[activeModalIndex].src}
                alt={PROOF_DATA[activeModalIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-emerald-500/30 shadow-2xl select-none"
              />

              <div className="mt-4 text-center">
                <p className="text-xs font-mono text-slate-400">
                  {PROOF_DATA[activeModalIndex].caption} · {PROOF_DATA[activeModalIndex].device}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
