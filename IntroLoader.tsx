import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';
import { Cpu, ShieldCheck, Zap, Crosshair, Sparkles } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  { code: '01', text: 'INITIALIZING PODDA KERNEL v8.4 MULTI-THREADED KINEMATICS', icon: Cpu },
  { code: '02', text: 'COMPILING ACES FILMIC PBR SHADERS & 3D STUDIO MESHES', icon: Zap },
  { code: '03', text: 'BUILDING DEVICE-AWARE 0–200 SENSITIVITY PROFILE', icon: Crosshair },
  { code: '04', text: 'SYNCING GLOBAL ESPORTS PRO SQUAD TELEMETRY MATRICES', icon: ShieldCheck },
  { code: '05', text: 'CRYPTOGRAPHIC INTEGRITY VERIFIED // PODDA CORP. READY', icon: Sparkles },
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completedRef = useRef<boolean>(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsClosing(true);
    setTimeout(onComplete, 250);
  };

  // Play audio boot chime & quick timer
  useEffect(() => {
    sound.playBoot();

    // Fast loading progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(finish, 180);
          return 100;
        }
        return next;
      });
    }, 45);

    // Hard failsafe timeout (1.5 seconds max)
    const failsafe = setTimeout(finish, 1500);

    // Keyboard listener (Escape or Space to skip immediately)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        finish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync step with progress
  useEffect(() => {
    const stepIdx = Math.min(
      BOOT_STEPS.length - 1,
      Math.floor((progress / 100) * BOOT_STEPS.length)
    );
    setCurrentStep(stepIdx);
  }, [progress]);

  // Render a live spinning 3D Wireframe Gaming Phone in the loader canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let angle = 0;

    const hw = 45;
    const hh = 80;
    const hd = 8;

    const vertices: [number, number, number][] = [
      [-hw, -hh, -hd],
      [hw, -hh, -hd],
      [hw, hh, -hd],
      [-hw, hh, -hd],
      [-hw, -hh, hd],
      [hw, -hh, hd],
      [hw, hh, hd],
      [-hw, hh, hd],
      [-hw + 8, -hh + 8, -hd - 4],
      [-hw + 32, -hh + 8, -hd - 4],
      [-hw + 32, -hh + 48, -hd - 4],
      [-hw + 8, -hh + 48, -hd - 4],
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [0, 2], [1, 3],
      [8, 9], [9, 10], [10, 11], [11, 8],
    ];

    const render3DPhone = () => {
      angle += 0.045;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = 160;

      const projected = vertices.map(([x, y, z]) => {
        const cosY = Math.cos(angle);
        const sinY = Math.sin(angle);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        const cosX = Math.cos(0.35);
        const sinX = Math.sin(0.35);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX + 180;

        const scale = fov / z2;
        return [cx + x1 * scale, cy + y2 * scale] as [number, number];
      });

      ctx.strokeStyle = '#39ff78';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = '#39ff78';
      ctx.shadowBlur = 8;

      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      });

      ctx.fillStyle = '#ffffff';
      projected.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render3DPhone);
    };

    render3DPhone();

    return () => cancelAnimationFrame(animId);
  }, []);

  const StepIcon = BOOT_STEPS[currentStep].icon;

  return (
    <div
      onClick={finish}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030604] text-white transition-opacity duration-300 cursor-pointer ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      title="Click anywhere to enter"
    >
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-35 pointer-events-none" />

      {/* Radial ambient cyber glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/12 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 mx-4 flex flex-col items-center text-center">
        {/* Interactive 3D Hologram Smartphone Canvas */}
        <div className="relative mb-4 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={240}
            height={200}
            className="w-48 h-40 filter drop-shadow-[0_0_20px_rgba(57,255,120,0.4)]"
          />
          {/* Spinning reticle ring */}
          <div className="absolute inset-0 rounded-full border border-emerald-500/25 border-dashed animate-spin [animation-duration:14s] pointer-events-none" />
        </div>

        {/* Company Wordmark */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-emerald-400 uppercase mb-1">
          <span>PODDA MOBILE SYSTEMS CORP.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-orbitron font-black tracking-wider text-white mb-5">
          QUANTUM BOOT v8.4
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#061109] rounded-full h-2.5 p-0.5 border border-emerald-500/40 overflow-hidden mb-3.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#39ff78] to-cyan-400 transition-all duration-75 relative shadow-[0_0_15px_#39ff78]"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/90 blur-[2px]" />
          </div>
        </div>

        {/* Telemetry Stage Readout */}
        <div className="w-full flex justify-between items-center text-xs font-mono text-slate-300 mb-6 px-1">
          <div className="flex items-center gap-2 text-emerald-300">
            <StepIcon className="w-4 h-4 text-[#39ff78] shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-[340px] text-left text-[11px]">
              [{BOOT_STEPS[currentStep].code}/05] {BOOT_STEPS[currentStep].text}
            </span>
          </div>
          <span className="font-orbitron font-extrabold text-[#39ff78] tabular-nums text-sm">
            {progress}%
          </span>
        </div>

        {/* Click anywhere or skip button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            finish();
          }}
          className="text-xs font-mono text-slate-400 hover:text-[#39ff78] transition-colors py-1.5 px-5 rounded-lg border border-white/10 hover:border-emerald-500/40 bg-[#061109]/80 cursor-pointer"
        >
          CLICK TO ENTER [ESC]
        </button>
      </div>
    </div>
  );
};
