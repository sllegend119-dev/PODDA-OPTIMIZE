import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../../utils/audio';
import { Sliders, Eye, EyeOff, Zap, Shield, Sparkles } from 'lucide-react';

// Pre-allocated reusable math vectors (Zero GC rule)
const _pointerTarget = new THREE.Vector2(0, 0);
const _currentPointer = new THREE.Vector2(0, 0);

export type BgThemeColor = 'emerald' | 'cyan' | 'amber' | 'crimson';

interface FloatingPhoneData {
  group: THREE.Group;
  initialX: number;
  initialY: number;
  initialZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  floatFreq: number;
  floatAmp: number;
  timeOffset: number;
}

export const BackgroundGamingPhonesCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [themeColor, setThemeColor] = useState<BgThemeColor>('emerald');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [warpSpeed, setWarpSpeed] = useState<number>(1);
  const [showLaserScan, setShowLaserScan] = useState<boolean>(true);
  const [isControlOpen, setIsControlOpen] = useState<boolean>(false);

  // References for live 3D synchronization
  const liveProps = useRef({
    themeColor,
    isWireframe,
    warpSpeed,
    showLaserScan,
  });

  useEffect(() => {
    liveProps.current = {
      themeColor,
      isWireframe,
      warpSpeed,
      showLaserScan,
    };
  }, [themeColor, isWireframe, warpSpeed, showLaserScan]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040805, 0.034);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x091c10, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x4ade80, 2.4);
    keyLight.position.set(6, 9, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22c55e, 2.0);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x39ff78, 3.8, 25);
    accentLight.position.set(0, 0, 5);
    scene.add(accentLight);

    // Procedural Screen Canvas with dynamic animated radar and telemetry
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const updateScreenCanvas = (time: number, theme: BgThemeColor) => {
      if (!ctx) return;
      const themeColors: Record<BgThemeColor, { primary: string; secondary: string; bg: string }> = {
        emerald: { primary: '#39ff78', secondary: '#10b981', bg: '#041208' },
        cyan: { primary: '#38bdf8', secondary: '#0284c7', bg: '#031018' },
        amber: { primary: '#fbbf24', secondary: '#d97706', bg: '#180f03' },
        crimson: { primary: '#f43f5e', secondary: '#be123c', bg: '#180308' },
      };
      const pal = themeColors[theme] || themeColors.emerald;

      // Dark background
      ctx.fillStyle = pal.bg;
      ctx.fillRect(0, 0, 256, 512);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let y = 0; y < 512; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
      }
      for (let x = 0; x < 256; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }

      // Sweeping Radar Line
      const radarCenterY = 256;
      ctx.strokeStyle = pal.primary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(128, radarCenterY, 54, 0, Math.PI * 2);
      ctx.stroke();

      const sweepAngle = (time * 2.5) % (Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(128, radarCenterY);
      ctx.lineTo(128 + Math.cos(sweepAngle) * 54, radarCenterY + Math.sin(sweepAngle) * 54);
      ctx.stroke();

      // Crosshair
      ctx.strokeStyle = pal.secondary;
      ctx.beginPath();
      ctx.moveTo(128, radarCenterY - 70);
      ctx.lineTo(128, radarCenterY + 70);
      ctx.moveTo(128 - 70, radarCenterY);
      ctx.lineTo(128 + 70, radarCenterY);
      ctx.stroke();

      // Telemetry Header
      ctx.fillStyle = pal.primary;
      ctx.font = 'bold 15px monospace';
      ctx.fillText('PODDA SYSTEM', 34, 60);

      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText('120 FPS // STABLE', 34, 95);
      ctx.fillText('SENSITIVITY SCALE: 0–200', 34, 115);
      ctx.fillText('ANDROID DEVICE PROFILE', 34, 135);

      // Frequency Audio Waveform
      ctx.strokeStyle = pal.primary;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 24; i < 232; i += 6) {
        const waveY = 410 + Math.sin(i * 0.12 + time * 4) * 18;
        if (i === 24) ctx.moveTo(i, waveY);
        else ctx.lineTo(i, waveY);
      }
      ctx.stroke();
    };

    const screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x06110a,
      roughness: 0.24,
      metalness: 0.92,
    });

    const edgeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x39ff78,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const cameraLensMat = new THREE.MeshStandardMaterial({
      color: 0x010402,
      roughness: 0.08,
      metalness: 0.96,
    });

    const rgbSpineMat = new THREE.MeshBasicMaterial({
      color: 0x39ff78,
    });

    // Helper: Build a high-detail procedural 3D Gaming Phone
    const createGamingPhone = (idx: number) => {
      const phoneGroup = new THREE.Group();

      // 1. Unibody Titanium Chassis
      const bodyGeo = new THREE.BoxGeometry(1.48, 2.92, 0.16);
      const bodyMesh = new THREE.Mesh(bodyGeo, chassisMat);
      phoneGroup.add(bodyMesh);

      // 2. Wireframe / Hologram Outline Armor
      const edgeMesh = new THREE.Mesh(bodyGeo, edgeGlowMat);
      edgeMesh.scale.set(1.025, 1.025, 1.025);
      phoneGroup.add(edgeMesh);

      // 3. Front Active OLED Screen Face
      const screenGeo = new THREE.PlaneGeometry(1.38, 2.8);
      const screenMat = new THREE.MeshBasicMaterial({
        map: screenTexture,
        transparent: true,
        opacity: 0.95,
      });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = 0.082;
      phoneGroup.add(screenMesh);

      // 4. Rear Camera Island (Beveled angle)
      const camBumpGeo = new THREE.BoxGeometry(0.58, 1.05, 0.09);
      const camBumpMesh = new THREE.Mesh(camBumpGeo, chassisMat);
      camBumpMesh.position.set(-0.38, 0.85, -0.09);
      phoneGroup.add(camBumpMesh);

      // 5. Triple Sapphire Camera Array
      const lensGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.05, 20);
      lensGeo.rotateX(Math.PI / 2);
      for (let i = 0; i < 3; i++) {
        const lensMesh = new THREE.Mesh(lensGeo, cameraLensMat);
        lensMesh.position.set(-0.38, 1.15 - i * 0.3, -0.14);
        phoneGroup.add(lensMesh);
      }

      // 6. Glowing RGB Cyber Spine Line on Rear
      const spineGeo = new THREE.BoxGeometry(0.07, 2.3, 0.05);
      const spineMesh = new THREE.Mesh(spineGeo, rgbSpineMat);
      spineMesh.position.set(0.24, 0, -0.088);
      phoneGroup.add(spineMesh);

      // 7. Company Logo Badge on Back ("P" Emblem)
      const logoPlateGeo = new THREE.BoxGeometry(0.35, 0.35, 0.04);
      const logoPlateMesh = new THREE.Mesh(logoPlateGeo, rgbSpineMat);
      logoPlateMesh.position.set(0.24, -0.5, -0.09);
      phoneGroup.add(logoPlateMesh);

      // 8. Dual Ultrasonic Gaming Shoulder Triggers
      const triggerGeo = new THREE.BoxGeometry(0.06, 0.48, 0.08);
      const leftTrigger = new THREE.Mesh(triggerGeo, rgbSpineMat);
      leftTrigger.position.set(0.76, 0.9, 0);
      const rightTrigger = new THREE.Mesh(triggerGeo, rgbSpineMat);
      rightTrigger.position.set(0.76, -0.9, 0);
      phoneGroup.add(leftTrigger);
      phoneGroup.add(rightTrigger);

      return phoneGroup;
    };

    // Instantiate 8 floating gaming phones placed at diverse depths
    const phoneConfigs = [
      // Phone 1: Top-Right Hero Float
      { x: 5.2, y: 2.8, z: 0.5, rx: 0.35, ry: -0.7, rz: 0.15, scale: 1.25, amp: 0.4, freq: 1.1 },
      // Phone 2: Mid-Left Orbiting Float
      { x: -5.6, y: -0.8, z: -2.0, rx: -0.3, ry: 0.85, rz: -0.2, scale: 1.05, amp: 0.5, freq: 0.85 },
      // Phone 3: Top-Left Deep Horizon
      { x: -4.2, y: 4.2, z: -5.5, rx: 0.25, ry: 0.4, rz: -0.15, scale: 0.85, amp: 0.3, freq: 1.4 },
      // Phone 4: Bottom-Right Deep Angle
      { x: 6.0, y: -3.8, z: -4.5, rx: -0.55, ry: -0.65, rz: 0.25, scale: 0.95, amp: 0.35, freq: 1.0 },
      // Phone 5: Bottom-Center Backdrop
      { x: 1.5, y: -5.2, z: -7.5, rx: 0.65, ry: 0.15, rz: 0.1, scale: 0.75, amp: 0.25, freq: 1.6 },
      // Phone 6: Horizon Left
      { x: -7.0, y: 2.0, z: -9.5, rx: -0.2, ry: -0.5, rz: 0.35, scale: 0.6, amp: 0.18, freq: 0.75 },
      // Phone 7: Horizon Right
      { x: 7.2, y: 0.2, z: -10.5, rx: 0.35, ry: 0.55, rz: -0.25, scale: 0.55, amp: 0.2, freq: 1.2 },
      // Phone 8: Center Far Nebula
      { x: -0.8, y: 1.5, z: -12.0, rx: 0.1, ry: -0.3, rz: 0.05, scale: 0.45, amp: 0.15, freq: 0.9 },
    ];

    const phones: FloatingPhoneData[] = [];

    phoneConfigs.forEach((cfg, idx) => {
      const phone = createGamingPhone(idx);
      phone.scale.setScalar(cfg.scale);
      phone.position.set(cfg.x, cfg.y, cfg.z);
      phone.rotation.set(cfg.rx, cfg.ry, cfg.rz);
      scene.add(phone);

      phones.push({
        group: phone,
        initialX: cfg.x,
        initialY: cfg.y,
        initialZ: cfg.z,
        rotSpeedX: 0.0035 * (idx % 2 === 0 ? 1 : -1),
        rotSpeedY: 0.007 * (idx % 3 === 0 ? -1 : 1),
        rotSpeedZ: 0.0025 * (idx % 2 === 0 ? -1 : 1),
        floatFreq: cfg.freq,
        floatAmp: cfg.amp,
        timeOffset: idx * 1.35,
      });
    });

    // Cyber Matrix Particles (Star Dust & Floating Sparks)
    const particleCount = isSoftwareGl ? 90 : 320;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = (Math.random() - 0.5) * 28;
      particlePositions[i + 2] = (Math.random() - 0.5) * 24 - 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x39ff78,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Holographic Floor Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0x39ff78, 0x0c2716);
    gridHelper.position.y = -7.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.32;
    scene.add(gridHelper);

    // Holographic Horizontal Laser Scanner Line
    const laserGeo = new THREE.BufferGeometry();
    const laserPoints = new Float32Array([
      -25, 0, 0,
      25, 0, 0
    ]);
    laserGeo.setAttribute('position', new THREE.BufferAttribute(laserPoints, 3));
    const laserMat = new THREE.LineBasicMaterial({
      color: 0x39ff78,
      transparent: true,
      opacity: 0.65,
    });
    const laserLine = new THREE.Line(laserGeo, laserMat);
    scene.add(laserLine);

    // Mouse Tracking
    const handlePointerMove = (e: MouseEvent) => {
      _pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      _pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let frameId = 0;
    const clock = new THREE.Clock();
    let lastCanvasUpdate = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const curProps = liveProps.current;

      // Update theme colors
      const themeHexMap: Record<BgThemeColor, number> = {
        emerald: 0x39ff78,
        cyan: 0x38bdf8,
        amber: 0xfbbf24,
        crimson: 0xf43f5e,
      };
      const activeHex = themeHexMap[curProps.themeColor] || 0x39ff78;
      edgeGlowMat.color.setHex(activeHex);
      rgbSpineMat.color.setHex(activeHex);
      particleMat.color.setHex(activeHex);
      laserMat.color.setHex(activeHex);
      accentLight.color.setHex(activeHex);

      // Wireframe toggle
      chassisMat.wireframe = curProps.isWireframe;

      // Update canvas texture at ~15fps to keep rendering super light
      if (elapsed - lastCanvasUpdate > 0.065) {
        lastCanvasUpdate = elapsed;
        updateScreenCanvas(elapsed, curProps.themeColor);
        screenTexture.needsUpdate = true;
      }

      if (!prefersReducedMotion) {
        // Pointer lerp
        _currentPointer.x += (_pointerTarget.x - _currentPointer.x) * 0.05;
        _currentPointer.y += (_pointerTarget.y - _currentPointer.y) * 0.05;

        // Camera tilt
        camera.position.x = _currentPointer.x * 0.85;
        camera.position.y = _currentPointer.y * 0.55;

        // Animate floating gaming mobile phones
        const speed = curProps.warpSpeed;
        phones.forEach((item) => {
          const t = elapsed * item.floatFreq * speed + item.timeOffset;
          item.group.position.y = item.initialY + Math.sin(t) * item.floatAmp;
          item.group.position.x = item.initialX + Math.cos(t * 0.75) * (item.floatAmp * 0.5);

          item.group.rotation.x += item.rotSpeedX * speed;
          item.group.rotation.y += item.rotSpeedY * speed;
          item.group.rotation.z += item.rotSpeedZ * speed;
        });

        // Rotate particles
        particles.rotation.y = elapsed * 0.02 * speed;

        // Sweep holographic laser scanner
        if (curProps.showLaserScan) {
          laserLine.visible = true;
          laserLine.position.y = Math.sin(elapsed * 0.8) * 6.5;
        } else {
          laserLine.visible = false;
        }
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      renderer.dispose();
      chassisMat.dispose();
      edgeGlowMat.dispose();
      cameraLensMat.dispose();
      rgbSpineMat.dispose();
      screenTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      laserGeo.dispose();
      laserMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* 3D Canvas WebGL Mount */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      />

      {/* Floating 3D Background Controller HUD (Ergonomic bottom-right) */}
      <div className="fixed bottom-5 right-5 z-30 select-none">
        {!isControlOpen ? (
          <button
            onClick={() => {
              sound.playClick();
              setIsControlOpen(true);
            }}
            className="px-3.5 py-2 rounded-full bg-[#08150d]/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-2xl backdrop-blur-md hover:border-emerald-400 hover:text-white transition-all cursor-pointer"
            title="Adjust 3D Background Mobiles"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#39ff78]" />
            <span className="hidden sm:inline">3D Background Controls</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-[#061109]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md w-72 flex flex-col gap-3.5 text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <span className="text-emerald-400 font-bold uppercase tracking-wider">
                3D MOBILE ENGINE
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsControlOpen(false);
                }}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Theme Color Picker */}
            <div className="flex flex-col gap-1.5">
              <span className="text-slate-400 text-[11px]">COLOR MATRIX:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {(['emerald', 'cyan', 'amber', 'crimson'] as BgThemeColor[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      sound.playClick();
                      setThemeColor(c);
                    }}
                    className={`py-1 rounded text-[10px] uppercase font-bold transition-all border ${
                      themeColor === c
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Warp Speed Multiplier */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>ORBIT WARP SPEED:</span>
                <span className="text-emerald-400 font-bold">{warpSpeed}x</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      sound.playClick();
                      setWarpSpeed(spd);
                    }}
                    className={`py-1 rounded text-[10px] font-bold transition-all border ${
                      warpSpeed === spd
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd === 1 ? '1x Cruise' : spd === 2 ? '2x Warp' : '3x Hyper'}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles: Wireframe & Laser Scanner */}
            <div className="flex items-center justify-between pt-1 border-t border-emerald-500/10 gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsWireframe(!isWireframe);
                }}
                className={`flex-1 py-1 px-2 rounded text-[10px] font-bold border transition-colors ${
                  isWireframe
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {isWireframe ? 'Wireframe ON' : 'Solid Mesh'}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setShowLaserScan(!showLaserScan);
                }}
                className={`flex-1 py-1 px-2 rounded text-[10px] font-bold border transition-colors ${
                  showLaserScan
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {showLaserScan ? 'Laser ON' : 'Laser OFF'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
