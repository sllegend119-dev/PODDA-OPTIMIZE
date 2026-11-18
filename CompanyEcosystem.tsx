import React from 'react';
import { sound } from '../utils/audio';
import { 
  Building2, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Server, 
  Terminal, 
  Layers, 
  Flame,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export const CompanyEcosystem: React.FC = () => {
  return (
    <section id="company-ecosystem" className="py-20 md:py-28 relative border-t border-emerald-500/15 bg-[#030604]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5" />
              <span>PODDA MOBILE SYSTEMS CORP.</span>
              <span aria-hidden="true">·</span>
              <span>ENTERPRISE DIVISIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              CORPORATE ECOSYSTEM
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Founded to bridge competitive mobile esports and low-level kernel touch hardware engineering. Discover the corporate infrastructure powering champion squad calibrations worldwide.
          </p>
        </div>

        {/* 4 Dedicated Corporate Engineering Divisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Division 01 */}
          <div className="p-6 rounded-2xl bg-[#07130a] border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#39ff78] mb-5 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                DIVISION 01 // LABS
              </span>
              <h3 className="text-lg font-orbitron font-bold text-white mb-2.5">
                Hardware Kinematics & PBR Modeling
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                3D CAD reverse-engineering of modern gaming smartphones, vapor chamber thermal dissipation simulations, and custom aero-grade chassis ergonomics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>R&D STATUS</span>
              <span className="text-emerald-400">ACTIVE // TIER 1</span>
            </div>
          </div>

          {/* Division 02 */}
          <div className="p-6 rounded-2xl bg-[#07130a] border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#39ff78] mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                DIVISION 02 // FIRMWARE
              </span>
              <h3 className="text-lg font-orbitron font-bold text-white mb-2.5">
                Device-Aware Sensitivity Profiles
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Configurable 0–200 sensitivity starting profiles with optional DPI and screen refresh-rate inputs for listed and custom Android devices.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>PROFILE RANGE</span>
              <span className="text-emerald-400">0–200 SENSITIVITY</span>
            </div>
          </div>

          {/* Division 03 */}
          <div className="p-6 rounded-2xl bg-[#07130a] border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#39ff78] mb-5 group-hover:scale-105 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                DIVISION 03 // ESPORTS
              </span>
              <h3 className="text-lg font-orbitron font-bold text-white mb-2.5">
                Tournament SLA & Network Engine
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Competitive match packet prioritization, ping jitter dampening, and custom REG registry optimization for high-stakes Free Fire tournaments.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>TOURNAMENT SQUADS</span>
              <span className="text-emerald-400">1,240+ CALIBRATED</span>
            </div>
          </div>

          {/* Division 04 */}
          <div className="p-6 rounded-2xl bg-[#07130a] border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#39ff78] mb-5 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                DIVISION 04 // STANDARDS
              </span>
              <h3 className="text-lg font-orbitron font-bold text-white mb-2.5">
                Certified Compliance & Anti-Cheat Safe
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero illegal memory injection. All calibrations conform to Android 11–15 official developer guidelines, ensuring 100% account security.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>CERTIFICATION</span>
              <span className="text-emerald-400">VERIFIED SAFE 🛡️</span>
            </div>
          </div>
        </div>

        {/* Corporate Trust & Quantitative Milestones Bar */}
        <div className="p-8 rounded-2xl bg-[#061109] border border-emerald-500/25 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-orbitron font-black text-white tabular-nums mb-1">
                18,400+
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Active Player Calibrations
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-orbitron font-black text-[#39ff78] tabular-nums mb-1">
                420+
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Android Device Profiles
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-orbitron font-black text-white tabular-nums mb-1">
                99.8%
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Customer Satisfaction Rate
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-orbitron font-black text-[#39ff78] tabular-nums mb-1">
                0
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Anti-Cheat Infractions (Safe)
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-500/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>OFFICIAL CHIPSET LABS: Snapdragon • MediaTek Dimensity • Google Tensor • Exynos</span>
            </div>
            <span className="text-emerald-400">
              GLOBAL SERVER LOCATION: ASIA-PACIFIC REGION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
