import React from 'react';
import { sound } from '../utils/audio';
import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, FileCode, Cpu } from 'lucide-react';

export const OfficialNotice: React.FC = () => {
  return (
    <section className="relative py-12 md:py-16 border-y border-emerald-500/15 bg-[#030704]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#061209] to-[#040905] border border-emerald-500/25 shadow-2xl relative overflow-hidden">
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

          {/* Top Header Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[#39ff78] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  <span>Official Corporate Advisory</span>
                  <span aria-hidden="true">·</span>
                  <span>Safety & Legitimacy Verification</span>
                </div>
                <h3 className="text-xl md:text-2xl font-orbitron font-extrabold text-white">
                  PODDA COMPLIANCE & CLIENT DIRECTIVE
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                100% ANTI-CHEAT SAFE
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                ANDROID 11+ NDK
              </span>
            </div>
          </div>

          {/* 3 Core Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10 mb-6">
            <div className="p-4 rounded-xl bg-[#08150d] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#39ff78] mb-2">
                <Lock className="w-4 h-4 text-[#39ff78]" />
                <span>ZERO BINARY INJECTION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                PODDA Optimize never modifies game executables, memory addresses, or official game APK binaries. All calibrations interact strictly with legitimate Android hardware touch sampling and developer settings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#08150d] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#39ff78] mb-2">
                <FileCode className="w-4 h-4 text-[#39ff78]" />
                <span>HARDWARE-SPECIFIC MATRICES</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Each profile is an estimated starting point based on the selected phone profile, optional DPI, refresh rate, and play style. Actual feel varies by device, game version, and player preference.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#08150d] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#39ff78] mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#39ff78]" />
                <span>AUTHENTIC PAYMENT ASSURANCE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Legitimate bank transfers only. Every verified buyer receives direct step-by-step WhatsApp technical support, verified config files, and post-installation drag guidance.
              </p>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="pt-4 border-t border-emerald-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400 relative z-10">
            <span>
              PODDA OPTIMIZE SYSTEMS CORP. · TOURNAMENT CALIBRATION PROTOCOL v8.4
            </span>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>OFFICIAL VERIFICATION ENGINE ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
