/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundGamingPhonesCanvas } from './components/3d/BackgroundGamingPhonesCanvas';
import { IntroLoader } from './components/IntroLoader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OfficialNotice } from './components/OfficialNotice';
import { CompanyEcosystem } from './components/CompanyEcosystem';
import { CompanyCertificateGenerator } from './components/CompanyCertificateGenerator';
import { SensiLab } from './components/SensiLab';
import { BenchmarkMatrix } from './components/BenchmarkMatrix';
import { ProofGallery } from './components/ProofGallery';
import { PackageSection } from './components/PackageSection';
import { SystemFaq } from './components/SystemFaq';
import { Footer } from './components/Footer';
import { CloudflareModal } from './components/CloudflareModal';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCloudflareOpen, setIsCloudflareOpen] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(120);

  // Live FPS ticker for high-tech telemetry feeling
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId = 0;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(120, Math.max(58, Math.round((frameCount * 1000) / (now - lastTime)))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040805] text-[#e2f5e8] relative selection:bg-[#39ff78] selection:text-black">
      {/* Cinematic 3D Boot Loading Animation */}
      {isLoading && (
        <IntroLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* 3D Background Floating Gaming Mobile Phones Canvas */}
      <BackgroundGamingPhonesCanvas />

      {/* Main Foreground Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          onOpenSensiLab={() => scrollToSection('sensi-lab')}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onExploreSensi={() => scrollToSection('sensi-lab')}
          />

          {/* Official Buyer & Corporate Compliance Notice */}
          <OfficialNotice />

          {/* Company Ecosystem & Engineering Divisions */}
          <CompanyEcosystem />

          {/* Sensi Lab Section */}
          <SensiLab />

          {/* Official Corporate Tournament Calibration Certificate Generator */}
          <CompanyCertificateGenerator />

          {/* Benchmark Matrix Section */}
          <BenchmarkMatrix />

          {/* Customer Proof & Verification Gallery */}
          <ProofGallery />

          {/* Official Packages & Order Section */}
          <PackageSection />

          {/* Frequently Asked Questions */}
          <SystemFaq />
        </main>

        {/* Footer */}
        <Footer onOpenCloudflareModal={() => setIsCloudflareOpen(true)} />
      </div>

      {/* Cloudflare Deploy & Custom Domain Modal */}
      <CloudflareModal
        isOpen={isCloudflareOpen}
        onClose={() => setIsCloudflareOpen(false)}
      />

      {/* Persistent Live Telemetry Badge (Bottom-Left) */}
      <aside aria-label="System telemetry" className="fixed bottom-5 left-5 z-30 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#040a06]/90 border border-emerald-500/25 text-[11px] font-mono text-slate-400 shadow-xl backdrop-blur-md pointer-events-none select-none">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-[#39ff78] animate-ping" />
          <span className="font-bold">{fps} FPS</span>
        </div>
        <span className="text-slate-600">|</span>
        <span>LATENCY: 4.2ms</span>
        <span className="text-slate-600">|</span>
        <span className="text-[#39ff78]">ACES PBR ACTIVE</span>
      </aside>
    </div>
  );
}
