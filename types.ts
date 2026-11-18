export type PlayStyle = 'balanced' | 'drag' | 'steady' | 'reflex';

export interface SensiValues {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
}

export interface DeviceInfo {
  name: string;
  brand: string;
  baseSensi: [number, number, number, number, number, number]; // [gen, redDot, 2x, 4x, sniper, freeLook]
  defaultDpi?: number;
  chipset?: string;
  refreshRate?: string;
  touchSampling?: string;
}

export interface ProofItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  aspectRatio: string;
  metrics: string;
  verifiedBuyer: string;
  device: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
