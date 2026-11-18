import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSensiLab: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSensiLab }) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'Company', href: '#company-ecosystem' },
    { name: 'Sensi Lab', href: '#sensi-lab' },
    { name: 'Certificate', href: '#company-certificate' },
    { name: 'Benchmarks', href: '#benchmarks' },
    { name: 'Proof', href: '#proof-gallery' },
    { name: 'Package', href: '#package' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#030704]/90 border-b border-emerald-500/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group text-decoration-none"
          onClick={() => sound.playClick()}
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center group-hover:border-emerald-400 transition-colors shadow-[0_0_12px_rgba(57,255,120,0.2)]">
            <span className="font-orbitron font-extrabold text-[#39ff78] text-base">P</span>
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-emerald-300 transition-colors leading-none">
              PODDA OPTIMIZE
            </span>
            <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">
              SYSTEMS CORP.
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sound.playClick()}
              className="hover:text-[#39ff78] transition-colors whitespace-nowrap shrink-0 relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Audio Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-[#07130a] border border-emerald-500/20 text-slate-300 hover:text-[#39ff78] transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio SFX' : 'Mute Audio SFX'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#39ff78]" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSensiLab();
            }}
            className="px-4 py-2 text-xs sm:text-sm font-orbitron font-bold text-black bg-[#39ff78] rounded-lg hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(57,255,120,0.4)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            LAUNCH SENSI LAB ↗
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#07130a] border border-emerald-500/20 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-500/15 bg-[#050b07] px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-slate-300 hover:text-[#39ff78] py-2 border-b border-emerald-500/10"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
              onOpenSensiLab();
            }}
            className="text-sm font-orbitron font-bold text-center py-2.5 rounded-lg bg-[#39ff78] text-black mt-2"
          >
            LAUNCH SENSI LAB ↗
          </button>
        </div>
      )}
    </header>
  );
};
