import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { 
  Cloud, 
  Globe, 
  ExternalLink, 
  X, 
  Copy, 
  Check, 
  Terminal, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface CloudflareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareModal: React.FC<CloudflareModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    sound.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#061109] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(57,255,120,0.2)] relative overflow-hidden flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Top laser accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-[#39ff78]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                <span>CLOUDFLARE PAGES & CUSTOM DOMAIN</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-orbitron font-extrabold text-white">
                DEPLOY TO CLOUDFLARE
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-lg bg-[#030805] border border-white/10 text-slate-400 hover:text-white hover:border-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method 1: Cloudflare Dashboard Direct Upload (Fastest - 1 minute) */}
        <div className="p-5 rounded-xl bg-[#08150d] border border-emerald-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-[#39ff78] font-bold text-xs flex items-center justify-center font-mono border border-emerald-500/40">
                1
              </span>
              <h4 className="font-orbitron font-bold text-white text-sm">
                Direct Upload (Takes 60 Seconds)
              </h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              EASIEST
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Upload the production build directly to Cloudflare Pages with zero build configuration needed:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-xs font-mono text-slate-300">
            <li>
              Go to <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline inline-flex items-center gap-1">dash.cloudflare.com <ExternalLink className="w-3 h-3" /></a>
            </li>
            <li>Navigate to: <strong className="text-white">Workers & Pages</strong> → <strong className="text-white">Create application</strong> → <strong className="text-white">Pages</strong></li>
            <li>Select <strong className="text-white">"Upload assets"</strong></li>
            <li>Drag & drop the compiled <code className="text-[#39ff78] bg-black/60 px-1.5 py-0.5 rounded">dist</code> folder</li>
            <li>Your site will be live instantly at <code className="text-[#39ff78]">https://podda-optimize.pages.dev</code>!</li>
          </ol>
        </div>

        {/* Method 2: Git Repository Build Settings */}
        <div className="p-5 rounded-xl bg-[#08150d] border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 font-bold text-xs flex items-center justify-center font-mono border border-white/20">
              2
            </span>
            <h4 className="font-orbitron font-bold text-white text-sm">
              Cloudflare Dashboard Git Settings (Continuous Deployment)
            </h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            If you connect your GitHub repository, enter these exact build settings:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#040a06] border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 text-[11px] block">FRAMEWORK PRESET</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white font-bold">Vite</span>
                <button
                  onClick={() => copyToClipboard('Vite', 'framework')}
                  className="text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  {copiedField === 'framework' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#040a06] border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 text-[11px] block">BUILD COMMAND</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[#39ff78] font-bold">npm run build</span>
                <button
                  onClick={() => copyToClipboard('npm run build', 'cmd')}
                  className="text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  {copiedField === 'cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#040a06] border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 text-[11px] block">OUTPUT DIRECTORY</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[#39ff78] font-bold">dist</span>
                <button
                  onClick={() => copyToClipboard('dist', 'output')}
                  className="text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  {copiedField === 'output' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#040a06] border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 text-[11px] block">NODE_VERSION (ENV VAR)</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white font-bold">20</span>
                <button
                  onClick={() => copyToClipboard('20', 'node')}
                  className="text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  {copiedField === 'node' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Method 3: Custom Domain Setup */}
        <div className="p-4 rounded-xl bg-[#030805] border border-emerald-500/20 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
            <Globe className="w-4 h-4" />
            <span>HOW TO ATTACH YOUR OWN PUBLIC CUSTOM DOMAIN:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
            <li>In your Cloudflare Pages project, click the <strong className="text-white">Custom domains</strong> tab.</li>
            <li>Click <strong className="text-white">Set up a custom domain</strong> and enter your domain (e.g., <code className="text-[#39ff78]">podda-optimize.com</code>).</li>
            <li>Cloudflare automatically provisions free SSL/TLS encryption and connects your live website!</li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-emerald-500/15">
          <a
            href="https://dash.cloudflare.com"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-orbitron font-bold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <span>OPEN CLOUDFLARE DASHBOARD</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
