import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Check, ShieldCheck, Zap, Copy, MessageSquare, AlertTriangle, ArrowRight } from 'lucide-react';

export const PackageSection: React.FC = () => {
  const [bankCopied, setBankCopied] = useState<boolean>(false);

  const handleCopyBank = () => {
    sound.playSuccess();
    const bankDetails = `PODDA OPTIMIZE // BANK TRANSFER DETAILS\nAccount: PODDA GAMING SYSTEMS\nPrice: LKR 1,000 /=\nNote: Send payment slip via WhatsApp with your Phone Model & Android Version.`;
    navigator.clipboard.writeText(bankDetails);
    setBankCopied(true);
    setTimeout(() => setBankCopied(false), 2500);
  };

  const handleDirectOrder = () => {
    sound.playClick();
    const text = encodeURIComponent("Hello PODDA OPTIMIZE! I want to purchase the Free Fire Optimization Package (LKR 1,000). My Android version is 11+.");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section id="package" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <span>Official Calibration Package</span>
              <span aria-hidden="true">·</span>
              <span>Direct Bank Booking</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              PODDA OPTIMIZE SUITE
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Complete Android 11+ optimization package designed for competitive mobile battlefield stability and precision aim response.
          </p>
        </div>

        {/* Main Package Grid: Featured Pricing Card + Important Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Pricing Card (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#08150d] border-2 border-emerald-500/40 shadow-[0_0_50px_rgba(57,255,120,0.12)] flex flex-col justify-between relative overflow-hidden">
            {/* Top Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#39ff78] to-cyan-400" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  TOURNAMENT CALIBRATION
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-mono">
                  ONE-TIME PURCHASE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white mb-2">
                FREE FIRE ULTIMATE EDITION
              </h3>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2 my-5">
                <span className="text-4xl sm:text-5xl font-orbitron font-black text-[#39ff78] tracking-tight">
                  LKR 1,000
                </span>
                <span className="text-sm font-mono text-slate-400">/ රු. 1,000/- (Bank Transfer)</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Direct Android-focused setup support and customized calibration files for your specific hardware configuration.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#39ff78]" />
                  </div>
                  <span>⚡ 5% FPS Optimization</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#39ff78]" />
                  </div>
                  <span>🎯 15% Aim & Headshot Config</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#39ff78]" />
                  </div>
                  <span>📶 10% Ping Stability Tuning</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#39ff78]" />
                  </div>
                  <span>🚀 5% Jitter & Micro-Lag Fix</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#39ff78]" />
                  </div>
                  <span>🛠️ REG Files + Feature Tweaks</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#39ff78]" />
                  </div>
                  <span>📱 Android Version 11+ Only</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleDirectOrder}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-orbitron font-bold text-sm text-black bg-[#39ff78] hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(57,255,120,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ORDER VIA WHATSAPP</span>
              </button>

              <button
                onClick={handleCopyBank}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-mono text-xs text-slate-300 bg-[#040a06] hover:bg-[#07130b] border border-emerald-500/30 hover:border-emerald-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {bankCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED DETAILS</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>COPY BANK DETAILS</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: "READ THIS BEFORE YOU BUY" Official Guidelines (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#071109] border border-emerald-500/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-3 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>IMPORTANT BUYER ADVISORY</span>
              </div>

              <h4 className="text-xl font-orbitron font-bold text-white mb-4">
                READ THIS BEFORE YOU BUY
              </h4>

              {/* Legitimacy Guarantee */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 mb-5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#39ff78]" />
                  <span>100% SAFE · NOT A CHEATING TOOL 🚫</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This system configures legitimate Android developer parameters, touch sampling, and sensitivity registry keys. It does not modify game binaries or inject illegal memory hacks.
                </p>
              </div>

              {/* Authentic Package Rules (Sinhala & English preserved with prestige) */}
              <div className="space-y-3 text-xs text-slate-300 font-normal leading-relaxed">
                <div className="p-2.5 rounded-lg bg-[#040805] border border-white/5">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Payment Method:</span>
                  <span>Bank Transfer Only (බැංකු තැන්පතු මගින් පමණි). මිලදී ගැනීමට පෙර දිනය වෙන් කරගන්න.</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#040805] border border-white/5">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Security Check:</span>
                  <span>ආරක්ෂිතව ඇඩ් කරගැනීමට දැන්ම message කරන්න. Support is provided step-by-step.</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#040805] border border-white/5 text-slate-400 italic">
                  <span>Note: Drag කරලා Play කරන්න ආස නැති, ඇගිලි පණ නැති අය message දැමීමෙන් වළකින්න. 😂 (Practice is still key!)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/10 text-[11px] font-mono text-slate-500">
              PODDA OPTIMIZE · SMOOTH • STABLE • PERFORMANCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
