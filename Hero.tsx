import React from 'react';
import { sound } from '../utils/audio';
import { ArrowUpRight, Crosshair, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreSensi: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSensi }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Animated PODDA OPTIMIZE brand emblem */}
          <div className="podda-emblem-stage mb-8" aria-label="PODDA OPTIMIZE animated logo">
            <div className="podda-emblem-orbit" />
            <div className="podda-emblem-glow" />
            <img
              src="/assets/brand/podda-optimize-emblem.png"
              alt="PODDA OPTIMIZE gaming emblem"
              className="podda-emblem-image"
              fetchPriority="high"
            />
            <span className="podda-emblem-spark podda-spark-one" />
            <span className="podda-emblem-spark podda-spark-two" />
            <span className="podda-emblem-spark podda-spark-three" />
          </div>

          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-emerald-400 mb-5 tracking-wider uppercase">
            <span>PODDA MOBILE SYSTEMS CORP.</span>
            <span aria-hidden="true">·</span>
            <span>2026 ENTERPRISE FLAGSHIP</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">ANDROID DEVICE SUPPORT</span>
          </div>

          {/* Main Headline with text-wrap: balance */}
          <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.04] mb-6 [text-wrap:balance]">
            PLAY BEYOND <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ff78] via-emerald-400 to-[#00ffcc]">LIMITS.</span>
          </h1>

          {/* Corporate Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
            Device-aware Android sensitivity profiles and practical Free Fire tuning guidance — built for a smoother, more consistent play experience.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-16">
            <button
              onClick={() => {
                sound.playClick();
                onExploreSensi();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-orbitron font-bold text-sm text-black bg-[#39ff78] hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(57,255,120,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LAUNCH SENSI LAB</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

          </div>

          {/* 3 Corporate Value Proposition Strips */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-500/15 text-left">
            <div className="p-4 rounded-xl bg-[#08150d]/85 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <Crosshair className="w-4 h-4 text-[#39ff78]" />
                <span className="font-orbitron text-xs font-bold text-white tracking-wider">01. 0–200 SENSI LAB</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Starting sensitivity profiles for listed phones and custom Android models, with DPI and refresh-rate options.
              </p>
            </div>


            <div className="p-4 rounded-xl bg-[#08150d]/85 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#39ff78]" />
                <span className="font-orbitron text-xs font-bold text-white tracking-wider">02. VERIFIED PROOF</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Legitimate customer receipts, bank transfer confirmation slips, and real game drag feedback from verified community members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
