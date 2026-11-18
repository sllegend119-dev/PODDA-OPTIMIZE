import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Gauge, Zap, Flame, Crosshair } from 'lucide-react';

export const BenchmarkMatrix: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <section id="benchmarks" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
              <span>Telemetry & Latency Audit</span>
              <span aria-hidden="true">·</span>
              <span>Hardware Sampling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              BENCHMARK MATRIX
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Measured response improvements across touch polling jitter, thermal throttling resistance, and drag-to-headshot stability.
          </p>
        </div>

        {/* 4 Quantitative Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-xl bg-[#08150d] border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>TOUCH SAMPLING DELAY</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-orbitron font-extrabold text-white tabular-nums">24</span>
              <span className="text-xs font-mono text-slate-400">ms (was 48ms)</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">-50% Latency Reduction</span>
          </div>

          <div className="p-5 rounded-xl bg-[#08150d] border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>AIM RECOIL STABILITY</span>
              <Crosshair className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-orbitron font-extrabold text-white tabular-nums">+15%</span>
              <span className="text-xs font-mono text-slate-400">consistency</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">Tighter Headshot Cone</span>
          </div>

          <div className="p-5 rounded-xl bg-[#08150d] border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>THERMAL MITIGATION</span>
              <Flame className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-orbitron font-extrabold text-white tabular-nums">-32%</span>
              <span className="text-xs font-mono text-slate-400">throttling</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">Long Session Stability</span>
          </div>

          <div className="p-5 rounded-xl bg-[#08150d] border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>FRAME PACING PURITY</span>
              <Gauge className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-orbitron font-extrabold text-white tabular-nums">98.2%</span>
              <span className="text-xs font-mono text-slate-400">flatline</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">Eliminates Micro-Stutter</span>
          </div>
        </div>

        {/* Interactive Before / After Visual Comparison */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#08140c] border border-emerald-500/25 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h3 className="text-lg font-orbitron font-bold text-white">
                DRAG ACCURACY: STOCK VS. PODDA CALIBRATED
              </h3>
              <p className="text-xs text-slate-400">
                Drag the interactive slider to compare crosshair tracking jitter and aim line dispersion.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 shrink-0">
              Split: {sliderPos}%
            </div>
          </div>

          {/* Visual Canvas Splitter */}
          <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden bg-[#040805] border border-emerald-500/30 select-none">
            {/* Background Cyber Grid */}
            <div className="absolute inset-0 cyber-grid-bg opacity-30" />

            {/* Left Side: Stock Android (Uncalibrated) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden bg-[#0a0505]"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-full flex flex-col justify-between p-6 min-w-[320px]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-[11px] font-mono text-red-400 font-bold uppercase">
                    Stock Android Default
                  </span>
                </div>

                {/* Jagged / Jittery trajectory */}
                <div className="my-auto relative h-28 w-full flex items-center">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                      d="M 10 90 Q 60 20, 110 85 T 210 30 T 310 75 T 390 40"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray="6,4"
                    />
                  </svg>
                  <span className="absolute bottom-1 left-2 text-[10px] font-mono text-red-400">
                    High Touch Jitter & Over-Drag
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400">
                  Touch Latency: <span className="text-red-400 font-bold">48ms</span> · Stutter Rate: <span className="text-red-400 font-bold">18.5%</span>
                </div>
              </div>
            </div>

            {/* Right Side: PODDA Calibrated System */}
            <div
              className="absolute inset-y-0 right-0 overflow-hidden bg-[#051109]"
              style={{ width: `${100 - sliderPos}%` }}
            >
              <div className="absolute inset-0 w-full flex flex-col justify-between p-6 min-w-[320px] ml-auto">
                <div className="flex items-center gap-2 justify-end">
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-400/50 text-[11px] font-mono text-[#39ff78] font-bold uppercase shadow-[0_0_12px_rgba(57,255,120,0.25)]">
                    PODDA Calibrated
                  </span>
                </div>

                {/* Smooth Laser Trajectory */}
                <div className="my-auto relative h-28 w-full flex items-center justify-end">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                      d="M 10 80 C 120 40, 260 25, 390 15"
                      fill="none"
                      stroke="#39ff78"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute bottom-1 right-2 text-[10px] font-mono text-[#39ff78]">
                    Linear Headshot Acceleration
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 text-right">
                  Touch Latency: <span className="text-[#39ff78] font-bold">24ms</span> · Aim Consistency: <span className="text-[#39ff78] font-bold">98.2%</span>
                </div>
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-lg">
                ↔
              </div>
            </div>

            {/* Hidden Input Range for Accessible Scrubbing */}
            <input
              type="range"
              min="10"
              max="90"
              value={sliderPos}
              onChange={(e) => {
                sound.playHover();
                setSliderPos(parseInt(e.target.value, 10));
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Benchmark comparison slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
