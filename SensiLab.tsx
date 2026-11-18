import React, { useState, useId } from 'react';
import { DeviceInfo, PlayStyle, SensiValues } from '../types';
import { sound } from '../utils/audio';
import {
  Crosshair,
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  Share2,
  Sparkles,
  Target
} from 'lucide-react';

const DEVICE_DATABASE: DeviceInfo[] = [
  { name: 'Google Pixel 6', brand: 'Google', baseSensi: [92, 86, 80, 70, 48, 72], defaultDpi: 411, chipset: 'Google Tensor G1', refreshRate: '90Hz' },
  { name: 'Google Pixel 7', brand: 'Google', baseSensi: [93, 87, 81, 71, 49, 73], defaultDpi: 411, chipset: 'Google Tensor G2', refreshRate: '90Hz' },
  { name: 'Google Pixel 8', brand: 'Google', baseSensi: [94, 88, 82, 72, 50, 74], defaultDpi: 428, chipset: 'Google Tensor G3', refreshRate: '120Hz' },
  { name: 'Google Pixel 8 Pro', brand: 'Google', baseSensi: [94, 88, 82, 72, 50, 74], defaultDpi: 440, chipset: 'Google Tensor G3', refreshRate: '120Hz' },
  { name: 'Redmi 15C', brand: 'Xiaomi / Redmi', baseSensi: [95, 89, 83, 73, 51, 75], defaultDpi: 392, chipset: 'Helio G85', refreshRate: '90Hz' },
  { name: 'Redmi 15', brand: 'Xiaomi / Redmi', baseSensi: [94, 88, 82, 72, 50, 74], defaultDpi: 392, chipset: 'Snapdragon 4 Gen 2', refreshRate: '90Hz' },
  { name: 'Redmi Note 13', brand: 'Xiaomi / Redmi', baseSensi: [93, 87, 81, 71, 49, 73], defaultDpi: 392, chipset: 'Dimensity 6080', refreshRate: '120Hz' },
  { name: 'Infinix Hot 60i', brand: 'Infinix', baseSensi: [95, 89, 83, 73, 51, 75], defaultDpi: 360, chipset: 'Helio G81', refreshRate: '120Hz' },
  { name: 'Honor X5 Plus', brand: 'Honor', baseSensi: [92, 86, 80, 70, 48, 72], defaultDpi: 360, chipset: 'Helio G36', refreshRate: '90Hz' },
  { name: 'ZTE Blade A55', brand: 'ZTE', baseSensi: [92, 86, 80, 70, 48, 72], defaultDpi: 360, chipset: 'Unisoc SC9863A', refreshRate: '90Hz' },
  { name: 'Samsung Galaxy A15', brand: 'Samsung', baseSensi: [92, 86, 80, 70, 48, 72], defaultDpi: 411, chipset: 'Helio G99', refreshRate: '90Hz' },
  { name: 'Samsung Galaxy S24', brand: 'Samsung', baseSensi: [94, 88, 82, 72, 50, 74], defaultDpi: 440, chipset: 'Snapdragon 8 Gen 3', refreshRate: '120Hz' },
  { name: 'ROG Phone 8 Pro', brand: 'ASUS', baseSensi: [96, 91, 85, 75, 52, 78], defaultDpi: 460, chipset: 'Snapdragon 8 Gen 3', refreshRate: '165Hz' },
  { name: 'POCO X6 Pro', brand: 'POCO', baseSensi: [94, 88, 83, 72, 50, 74], defaultDpi: 440, chipset: 'Dimensity 8300 Ultra', refreshRate: '120Hz' },
  { name: 'RedMagic 9S Pro', brand: 'Nubia', baseSensi: [97, 92, 86, 76, 54, 80], defaultDpi: 460, chipset: 'Snapdragon 8 Gen 3 Leading', refreshRate: '120Hz' },
  // Generic baseline for Android models not listed above. Values are estimates, not device measurements.
  { name: 'Other Android (Custom)', brand: 'Any Android', baseSensi: [90, 84, 78, 68, 45, 70], defaultDpi: 392, chipset: 'Custom device profile', refreshRate: '90Hz' },
];

export const SensiLab: React.FC = () => {
  const [selectedDeviceName, setSelectedDeviceName] = useState<string>('Google Pixel 8');
  const [userDpi, setUserDpi] = useState<string>('');
  const [customDeviceName, setCustomDeviceName] = useState<string>('My Android');
  const [customRefreshRate, setCustomRefreshRate] = useState<string>('90Hz');
  const [playStyle, setPlayStyle] = useState<PlayStyle>('drag');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [targetSimScore, setTargetSimScore] = useState<number>(0);
  const [simClicks, setSimClicks] = useState<number>(0);

  const deviceSelectId = useId();
  const dpiInputId = useId();

  const selectedDevice = DEVICE_DATABASE.find((d) => d.name === selectedDeviceName) || DEVICE_DATABASE[0];
  const isCustomDevice = selectedDevice.name === 'Other Android (Custom)';
  const displayedDeviceName = isCustomDevice ? (customDeviceName.trim() || 'My Android') : selectedDevice.name;
  const displayedRefreshRate = isCustomDevice ? customRefreshRate : selectedDevice.refreshRate;

  // Generate a practical 0–200 starting profile. This is a heuristic baseline, not a measured or guaranteed device-specific result.
  const calculateSensi = (): SensiValues => {
    const base = selectedDevice.baseSensi.map((value) => value * 2);
    let styleOffset = 0;
    if (playStyle === 'drag') styleOffset = 3;
    if (playStyle === 'steady') styleOffset = -4;
    if (playStyle === 'reflex') styleOffset = 5;

    const dpiNum = Number.parseInt(userDpi, 10) || selectedDevice.defaultDpi || 392;
    let dpiOffset = 0;
    if (Number.isFinite(dpiNum) && dpiNum > 0) {
      if (dpiNum > 520) dpiOffset = -4;
      else if (dpiNum > 440) dpiOffset = -2;
      else if (dpiNum < 360) dpiOffset = 3;
      else if (dpiNum < 400) dpiOffset = 1;
    }

    const hz = Number.parseInt(displayedRefreshRate, 10) || 90;
    const refreshOffset = hz >= 144 ? 2 : hz >= 120 ? 1 : hz <= 60 ? -2 : 0;
    const clamp = (value: number) => Math.max(0, Math.min(200, Math.round(value)));
    const common = styleOffset + dpiOffset + refreshOffset;

    return {
      general: clamp(base[0] + common),
      redDot: clamp(base[1] + common + (playStyle === 'drag' ? 1 : 0)),
      scope2x: clamp(base[2] + common),
      scope4x: clamp(base[3] + Math.round(styleOffset * 0.7) + dpiOffset + refreshOffset),
      sniper: clamp(base[4] + (playStyle === 'steady' ? -3 : 0) + dpiOffset),
      freeLook: clamp(base[5] + common + (playStyle === 'reflex' ? 3 : 0)),
    };
  };

  const sensi = calculateSensi();

  const handleCopyProfile = () => {
    sound.playSuccess();
    const formatted = `=== PODDA OPTIMIZE // SENSITIVITY PROFILE ===\nDevice: ${displayedDeviceName}\nScale: 0–200\nPlay Style: ${playStyle.toUpperCase()}\nGeneral: ${sensi.general}\nRed Dot: ${sensi.redDot}\n2X Scope: ${sensi.scope2x}\n4X Scope: ${sensi.scope4x}\nSniper Scope: ${sensi.sniper}\nFree Look: ${sensi.freeLook}\n============================================`;
    navigator.clipboard.writeText(formatted);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleTargetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.playScan();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(clickX * clickX + clickY * clickY);

    // Calculate score based on distance from center
    const maxDist = rect.width / 2;
    const hitScore = Math.max(0, Math.round((1 - dist / maxDist) * 100));

    setTargetSimScore(hitScore);
    setSimClicks((prev) => prev + 1);
  };

  return (
    <section id="sensi-lab" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <span>Interactive Calibration Engine</span>
              <span aria-hidden="true">·</span>
              <span>Free Fire & Shooter Ready</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              SENSI LAB SYSTEM
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Build a 0–200 sensitivity starting profile for a listed phone or any custom Android device. Values are estimates to test and fine-tune in-game.
          </p>
        </div>

        {/* 2-Column Grid: Configurator on Left, Generated Results on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Device & Play Style Selectors (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#08140c] border border-emerald-500/25 shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/15">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="font-orbitron font-bold text-base text-white">
                  CONFIGURE DEVICE
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                ANDROID-WIDE
              </span>
            </div>

            {/* Device Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor={deviceSelectId} className="text-xs font-semibold text-slate-300">
                Target Smartphone Model
              </label>
              <select
                id={deviceSelectId}
                value={selectedDeviceName}
                onChange={(e) => {
                  sound.playClick();
                  setSelectedDeviceName(e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030805] border border-emerald-500/30 text-white font-medium text-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-colors"
              >
                {DEVICE_DATABASE.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} ({d.brand})
                  </option>
                ))}
              </select>
            </div>

            {isCustomDevice && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="custom-android-name" className="text-xs font-semibold text-slate-300">Phone model</label>
                  <input id="custom-android-name" value={customDeviceName} onChange={(e) => setCustomDeviceName(e.target.value)} placeholder="e.g. Infinix Smart 8" className="w-full px-3.5 py-2.5 rounded-xl bg-[#030805] border border-emerald-500/30 text-white text-sm focus:border-emerald-400 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="custom-refresh-rate" className="text-xs font-semibold text-slate-300">Screen refresh rate</label>
                  <select id="custom-refresh-rate" value={customRefreshRate} onChange={(e) => setCustomRefreshRate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-[#030805] border border-emerald-500/30 text-white text-sm focus:border-emerald-400 focus:outline-none">
                    <option>60Hz</option><option>90Hz</option><option>120Hz</option><option>144Hz</option><option>165Hz</option>
                  </select>
                </div>
              </div>
            )}

            {/* Device Spec Pill Info */}
            <div className="p-3 rounded-lg bg-[#040a06] border border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{selectedDevice.chipset}</span>
              </div>
              <span className="text-emerald-400">{displayedRefreshRate}</span>
            </div>

            {/* Play Style Segmented Switcher */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Aim & Combat Playstyle
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPlayStyle('drag');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    playStyle === 'drag'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-sm'
                      : 'bg-[#040a06] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">One-Tap / Drag</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">High recoil flick control</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPlayStyle('balanced');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    playStyle === 'balanced'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-sm'
                      : 'bg-[#040a06] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Balanced Core</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Versatile mid & close range</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPlayStyle('steady');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    playStyle === 'steady'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-sm'
                      : 'bg-[#040a06] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Steady Aim</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Sniper & 4X scope stability</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPlayStyle('reflex');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    playStyle === 'reflex'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-sm'
                      : 'bg-[#040a06] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Fast Rusher</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Maximum free look speed</div>
                </button>
              </div>
            </div>

            {/* Custom DPI Input (Optional) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor={dpiInputId} className="text-xs font-semibold text-slate-300">
                  Custom Developer DPI (Optional)
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  Default ~{selectedDevice.defaultDpi || 392}
                </span>
              </div>
              <input
                id={dpiInputId}
                type="number"
                placeholder="e.g. 440 or leave blank for stock"
                value={userDpi}
                onChange={(e) => setUserDpi(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030805] border border-emerald-500/30 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Reset Defaults button */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedDeviceName('Google Pixel 8');
                setUserDpi('');
                setCustomDeviceName('My Android');
                setCustomRefreshRate('90Hz');
                setPlayStyle('drag');
              }}
              className="py-2 px-3 text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Configuration Defaults</span>
            </button>
          </div>

          {/* Right Column: Generated Calibration Metrics & Virtual Target Range (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#09160e] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              {/* Subtle top laser border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#39ff78] to-transparent" />

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                    ESTIMATED STARTING PROFILE · 0–200
                  </span>
                  <h3 className="text-2xl font-orbitron font-extrabold text-white">
                    {displayedDeviceName}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyProfile}
                    className="px-4 py-2 rounded-xl bg-[#39ff78] text-black font-orbitron font-bold text-xs hover:bg-emerald-400 flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(57,255,120,0.3)] cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY PROFILE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 6 Sensitivity Sliders Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-8">
                <div className="p-3.5 rounded-xl bg-[#040a06] border border-emerald-500/20">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    General
                  </span>
                  <span className="text-2xl sm:text-3xl font-orbitron font-extrabold text-[#39ff78] tabular-nums">
                    {sensi.general}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#040a06] border border-emerald-500/20">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Red Dot Sight
                  </span>
                  <span className="text-2xl sm:text-3xl font-orbitron font-extrabold text-[#39ff78] tabular-nums">
                    {sensi.redDot}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#040a06] border border-emerald-500/20">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    2× Scope
                  </span>
                  <span className="text-2xl sm:text-3xl font-orbitron font-extrabold text-[#39ff78] tabular-nums">
                    {sensi.scope2x}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#040a06] border border-emerald-500/20">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    4× Scope
                  </span>
                  <span className="text-2xl sm:text-3xl font-orbitron font-extrabold text-[#39ff78] tabular-nums">
                    {sensi.scope4x}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#040a06] border border-emerald-500/20">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Sniper Scope
                  </span>
                  <span className="text-2xl sm:text-3xl font-orbitron font-extrabold text-[#39ff78] tabular-nums">
                    {sensi.sniper}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#040a06] border border-emerald-500/20">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Free Look
                  </span>
                  <span className="text-2xl sm:text-3xl font-orbitron font-extrabold text-[#39ff78] tabular-nums">
                    {sensi.freeLook}
                  </span>
                </div>
              </div>

              {/* Practical Guidance Note */}
              <div className="p-3.5 rounded-xl bg-[#061109] border-l-2 border-[#39ff78] text-xs text-slate-300 leading-relaxed mb-6">
                <span className="text-[#39ff78] font-bold">Calibration note:</span> These are estimated starting values on a 0–200 scale, not verified measurements or guaranteed headshot settings. Test in Training mode and adjust gradually to your own touch response.
              </div>

              {/* Interactive Virtual Crosshair Tap & Drag Simulator */}
              <div className="mt-4 pt-4 border-t border-emerald-500/15">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                    <Target className="w-4 h-4 text-[#39ff78]" />
                    <span>Touch Drag Response Simulator</span>
                  </div>
                  {simClicks > 0 && (
                    <span className="text-xs font-mono text-emerald-400">
                      Accuracy: {targetSimScore}%
                    </span>
                  )}
                </div>

                <div
                  onClick={handleTargetClick}
                  className="w-full h-36 rounded-xl bg-[#040805] border border-dashed border-emerald-500/30 relative overflow-hidden flex items-center justify-center cursor-crosshair group hover:border-emerald-400 transition-colors"
                  title="Click or tap to test crosshair centering"
                >
                  {/* Concentric target circles */}
                  <div className="w-24 h-24 rounded-full border border-emerald-500/20 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-emerald-500/40 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#39ff78] shadow-[0_0_8px_#39ff78]" />
                    </div>
                  </div>

                  {/* Horizontal / Vertical cross lines */}
                  <div className="absolute w-full h-px bg-emerald-500/15" />
                  <div className="absolute h-full w-px bg-emerald-500/15" />

                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500">
                    Tap to test touch response
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
