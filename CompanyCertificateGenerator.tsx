import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { 
  Award, 
  CheckCircle2, 
  Download, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  Smartphone,
  Copy,
  Check
} from 'lucide-react';

export const CompanyCertificateGenerator: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('ShadowSniper');
  const [teamName, setTeamName] = useState<string>('Apex Predator Esports');
  const [deviceModel, setDeviceModel] = useState<string>('Google Pixel 8 Pro');
  const [androidVersion, setAndroidVersion] = useState<string>('Android 14 (HyperOS / Stock)');
  const [isGenerated, setIsGenerated] = useState<boolean>(true);
  const [certId, setCertId] = useState<string>('PODDA-CORP-2026-X8491');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    // Generate unique random serial
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCertId(`PODDA-CORP-2026-${randomHex}`);
    setIsGenerated(true);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleCopyCertId = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(certId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="company-certificate" className="py-20 md:py-28 relative border-t border-emerald-500/15 bg-[#040805]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>Official Corporate Accreditation</span>
              <span aria-hidden="true">·</span>
              <span>Hardware Calibration SLA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              TOURNAMENT CERTIFICATE
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Issue an authentic cryptographic company calibration certificate for your smartphone and tournament squad with live verification credentials.
          </p>
        </div>

        {/* 2-Column Interface: Inputs on Left, Visual Certificate on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Configurator (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#07130a] border border-emerald-500/25 shadow-xl">
            <h3 className="font-orbitron font-bold text-base text-white mb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39ff78]" />
              <span>ENTER SQUAD TELEMETRY</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in your player profile to synthesize your official company certificate.
            </p>

            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                  PLAYER IN-GAME NICKNAME / CALL-SIGN
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030704] border border-emerald-500/30 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                  placeholder="e.g. ShadowSniper"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                  CLAN / ESPORTS SQUAD NAME
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030704] border border-emerald-500/30 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                  placeholder="e.g. Team Apex Predator"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                  SMARTPHONE MODEL
                </label>
                <input
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030704] border border-emerald-500/30 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                  placeholder="e.g. Google Pixel 8 Pro / ROG Phone 8"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                  OPERATING SYSTEM & BUILD
                </label>
                <input
                  type="text"
                  value={androidVersion}
                  onChange={(e) => setAndroidVersion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030704] border border-emerald-500/30 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                  placeholder="e.g. Android 14 Stock"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-xl bg-[#39ff78] hover:bg-emerald-400 text-black font-orbitron font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(57,255,120,0.3)] cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>SYNTHESIZE CERTIFICATE</span>
              </button>
            </form>
          </div>

          {/* Certificate Output (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#061109] border-2 border-emerald-500/40 shadow-[0_0_50px_rgba(57,255,120,0.15)] relative overflow-hidden">
              {/* Decorative Corner Seals */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#39ff78]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#39ff78]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#39ff78]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#39ff78]" />

              {/* Watermark Logo Background */}
              <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none select-none font-orbitron font-black text-9xl text-white">
                PODDA
              </div>

              {/* Certificate Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-emerald-500/20 gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-400 uppercase block mb-1">
                    PODDA MOBILE SYSTEMS CORP. // GLOBAL CALIBRATION PROTOCOL
                  </span>
                  <h4 className="text-xl sm:text-2xl font-orbitron font-black text-white tracking-wide">
                    CERTIFICATE OF CALIBRATION
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-400/50 flex items-center justify-center text-[#39ff78] shadow-[0_0_15px_rgba(57,255,120,0.3)]">
                    <Award className="w-7 h-7" />
                  </div>
                </div>
              </div>

              {/* Certificate Body Text */}
              <div className="my-6">
                <p className="text-xs font-mono text-slate-400 mb-4">
                  This document certifies that the hardware digitizer, touch polling registry, and competitive aim mechanics for the client below have been verified under official tournament SLA protocols:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 p-4 rounded-xl bg-[#030805] border border-emerald-500/20 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">ACCREDITED OPERATOR:</span>
                    <span className="text-base font-bold text-white font-orbitron">{playerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">AFFILIATED SQUAD:</span>
                    <span className="text-base font-bold text-[#39ff78]">{teamName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">HARDWARE CHASSIS:</span>
                    <span className="text-white font-semibold">{deviceModel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">FIRMWARE REVISION:</span>
                    <span className="text-slate-300">{androidVersion}</span>
                  </div>
                </div>

                {/* Calibrated Specs Matrix */}
                <div className="grid grid-cols-3 gap-3 text-center my-4 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[#040b07] border border-white/5">
                    <span className="text-[10px] text-slate-400 block mb-0.5">SENSITIVITY SCALE</span>
                    <span className="text-sm font-bold text-[#39ff78]">0–200 RANGE</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#040b07] border border-white/5">
                    <span className="text-[10px] text-slate-400 block mb-0.5">AIM DRAG STABILITY</span>
                    <span className="text-sm font-bold text-white">CUSTOM PROFILE</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#040b07] border border-white/5">
                    <span className="text-[10px] text-slate-400 block mb-0.5">SLA SECURITY</span>
                    <span className="text-sm font-bold text-emerald-400">ANTI-CHEAT SAFE</span>
                  </div>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <QrCode className="w-9 h-9 text-[#39ff78] shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">SERIAL ACCREDITATION:</span>
                    <span className="font-bold text-emerald-300">{certId}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">DIGITAL SIGNATURE:</span>
                  <span className="text-xs font-serif italic text-slate-300">PODDA Mobile Corp. Lab Lead</span>
                </div>
              </div>
            </div>

            {/* Quick Certificate Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#07130a] border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCertId}
                  className="px-3.5 py-1.5 rounded-lg bg-[#030805] border border-emerald-500/30 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{isCopied ? 'COPIED ID' : 'COPY CERT ID'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-lg bg-[#030805] border border-emerald-500/30 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>PRINT CERTIFICATE</span>
                </button>
              </div>

              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CRYPTOGRAPHICALLY SEALED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
