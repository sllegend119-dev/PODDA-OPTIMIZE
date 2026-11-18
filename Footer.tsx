import React from 'react';
import { sound } from '../utils/audio';
import { Building2, ShieldCheck, Cloud } from 'lucide-react';

interface FooterProps {
  onOpenCloudflareModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCloudflareModal }) => {
  return (
    <footer className="relative border-t border-emerald-500/20 bg-[#020503] py-14 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-emerald-500/15">
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-extrabold text-base text-white tracking-wider">
                PODDA MOBILE SYSTEMS CORP.
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-[#39ff78]">
                GLOBAL HQ
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Android gaming sensitivity profiles, device-aware calibration guidance, and mobile gaming optimization.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-slate-400">
            <a
              href="#company-ecosystem"
              onClick={() => sound.playClick()}
              className="hover:text-[#39ff78] transition-colors"
            >
              Company Ecosystem
            </a>
            <a
              href="#sensi-lab"
              onClick={() => sound.playClick()}
              className="hover:text-[#39ff78] transition-colors"
            >
              Sensi Lab
            </a>
            <a
              href="#company-certificate"
              onClick={() => sound.playClick()}
              className="hover:text-[#39ff78] transition-colors"
            >
              Certificate
            </a>
            <a
              href="#benchmarks"
              onClick={() => sound.playClick()}
              className="hover:text-[#39ff78] transition-colors"
            >
              Benchmarks
            </a>
            <a
              href="#proof-gallery"
              onClick={() => sound.playClick()}
              className="hover:text-[#39ff78] transition-colors"
            >
              Proof
            </a>
            <a
              href="#package"
              onClick={() => sound.playClick()}
              className="hover:text-[#39ff78] transition-colors"
            >
              Package
            </a>
            {onOpenCloudflareModal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCloudflareModal();
                }}
                className="text-amber-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>Cloudflare Deploy</span>
              </button>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 PODDA MOBILE SYSTEMS CORP. · ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>100% NON-INVASIVE TOURNAMENT CALIBRATION PROTOCOL</span>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-slate-500 max-w-3xl mx-auto leading-relaxed">
          Disclaimer: Free Fire is a registered trademark of Garena International. PODDA MOBILE SYSTEMS CORP. is an independent hardware calibration advisory and sensitivity profile generator. It does not tamper with game packages, binary files, or official anti-cheat mechanisms.
        </div>
      </div>
    </footer>
  );
};
