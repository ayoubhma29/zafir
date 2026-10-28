import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Car,
  Gauge,
  Flame,
  Sliders,
  Volume2,
  VolumeX,
  Zap,
  Trophy,
  Calculator,
  Calendar,
  Sparkles,
  Check,
  ChevronRight,
  Search,
  RotateCcw,
  Play,
  Square,
  Plus,
  Bookmark,
  MapPin,
  Award,
  Activity,
  Sun,
  Eye,
  Compass,
  TrendingUp,
  Layers,
  Cpu,
  Disc,
  Share2,
  Download
} from 'lucide-react';

// ============================================================================
// 1. STATIC FLEET DATA & LUXURY CONFIGURATOR OPTIONS
// ============================================================================

const CURRENCIES = {
  MAD: { code: 'MAD', symbol: 'DH', rate: 1, label: 'MAD (DH)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.093, label: 'EUR (€)' },
  USD: { code: 'USD', symbol: '$', rate: 0.10, label: 'USD ($)' }
};

const INITIAL_FLEET = [
  {
    id: 'gt3rs',
    name: 'Porsche 911 GT3 RS (992)',
    brand: 'Porsche',
    tagline: 'Aerodynamic Track Weapon • DRS Active Wing',
    category: 'Track',
    bodyStyle: 'coupe',
    basePriceMAD: 3450000,
    hp: 525,
    torque: 465,
    zeroToHundred: 3.2,
    topSpeed: 296,
    weight: 1450,
    redline: 9000,
    engineDesc: '4.0L Naturally Aspirated Flat-6',
    displacementL: 4.0,
    fuelType: 'Essence',
    acousticProfile: 'flat6',
    drivetrain: 'RWD • 7-Speed PDK',
    defaultPaint: 'guards_red',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 88, topSpeed: 84, handling: 99, braking: 98, comfort: 58, exclusivity: 94 }
  },
  {
    id: 'sf90',
    name: 'Ferrari SF90 Stradale Assetto Fiorano',
    brand: 'Ferrari',
    tagline: '1,000 CV Plug-In Hybrid Maranello Hyper-Berlinetta',
    category: 'Supercar',
    bodyStyle: 'supercar',
    basePriceMAD: 6250000,
    hp: 1000,
    torque: 800,
    zeroToHundred: 2.5,
    topSpeed: 340,
    weight: 1570,
    redline: 8500,
    engineDesc: '4.0L Twin-Turbo V8 + 3 E-Motors',
    displacementL: 4.0,
    fuelType: 'Hybride',
    acousticProfile: 'v12',
    drivetrain: 'AWD • 8-Speed F1 DCT',
    defaultPaint: 'guards_red',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 98, topSpeed: 96, handling: 96, braking: 95, comfort: 72, exclusivity: 98 }
  },
  {
    id: 'revuelto',
    name: 'Lamborghini Revuelto Opera Unica',
    brand: 'Lamborghini',
    tagline: 'High-Performance Electrified V12 Flagship',
    category: 'Supercar',
    bodyStyle: 'supercar',
    basePriceMAD: 6900000,
    hp: 1015,
    torque: 807,
    zeroToHundred: 2.5,
    topSpeed: 350,
    weight: 1772,
    redline: 9500,
    engineDesc: '6.5L Naturally Aspirated V12 Hybrid',
    displacementL: 6.5,
    fuelType: 'Hybride',
    acousticProfile: 'v12',
    drivetrain: 'AWD • 8-Speed DCT',
    defaultPaint: 'viola_parsifae',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 98, topSpeed: 99, handling: 94, braking: 94, comfort: 68, exclusivity: 100 }
  },
  {
    id: 'g63',
    name: 'Mercedes-AMG G 63 Grand Edition',
    brand: 'Mercedes-AMG',
    tagline: 'Handcrafted Affalterbach Bi-Turbo Icon',
    category: 'Luxury SUV',
    bodyStyle: 'suv',
    basePriceMAD: 2850000,
    hp: 585,
    torque: 850,
    zeroToHundred: 4.5,
    topSpeed: 240,
    weight: 2485,
    redline: 6800,
    engineDesc: '4.0L V8 Biturbo Side-Pipe Exhaust',
    displacementL: 4.0,
    fuelType: 'Essence',
    acousticProfile: 'v8',
    drivetrain: '4MATIC • 9G-SPEEDSHIFT',
    defaultPaint: 'satin_black',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 76, topSpeed: 70, handling: 72, braking: 78, comfort: 96, exclusivity: 92 }
  },
  {
    id: 'rs6gt',
    name: 'Audi RS6 Avant GT Quattro',
    brand: 'Audi Sport',
    tagline: 'Limited 660-Unit Carbon-Fender Supercar Wagon',
    category: 'Supercar',
    bodyStyle: 'wagon',
    basePriceMAD: 2420000,
    hp: 630,
    torque: 850,
    zeroToHundred: 3.3,
    topSpeed: 305,
    weight: 2075,
    redline: 7200,
    engineDesc: '4.0L TFSI Twin-Turbo V8',
    displacementL: 4.0,
    fuelType: 'Essence',
    acousticProfile: 'v8',
    drivetrain: 'Quattro AWD • 8-Speed Tiptronic',
    defaultPaint: 'nardo_grey',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 89, topSpeed: 88, handling: 87, braking: 89, comfort: 95, exclusivity: 91 }
  },
  {
    id: 'm4csl',
    name: 'BMW M4 CSL (G82) Nürburgring Spec',
    brand: 'BMW M',
    tagline: 'Competition, Sport, Lightweight • Carbon Buckets',
    category: 'Track',
    bodyStyle: 'coupe',
    basePriceMAD: 2150000,
    hp: 550,
    torque: 650,
    zeroToHundred: 3.7,
    topSpeed: 307,
    weight: 1625,
    redline: 7500,
    engineDesc: '3.0L M TwinPower Turbo Inline-6',
    displacementL: 3.0,
    fuelType: 'Essence',
    acousticProfile: 'flat6',
    drivetrain: 'RWD • 8-Speed M Steptronic',
    defaultPaint: 'nardo_grey',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 84, topSpeed: 89, handling: 93, braking: 92, comfort: 70, exclusivity: 89 }
  },
  {
    id: 'rrsv',
    name: 'Range Rover Sport SV Edition One',
    brand: 'Range Rover',
    tagline: '6D Dynamics Hydraulic Suspension • Carbon Ceramic',
    category: 'Luxury SUV',
    bodyStyle: 'suv',
    basePriceMAD: 2680000,
    hp: 635,
    torque: 750,
    zeroToHundred: 3.8,
    topSpeed: 290,
    weight: 2485,
    redline: 7000,
    engineDesc: '4.4L Twin-Turbo V8 Mild-Hybrid',
    displacementL: 4.4,
    fuelType: 'Hybride',
    acousticProfile: 'v8',
    drivetrain: 'AWD • 8-Speed Automatic',
    defaultPaint: 'british_green',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 83, topSpeed: 82, handling: 84, braking: 85, comfort: 99, exclusivity: 90 }
  },
  {
    id: 'taycangt',
    name: 'Porsche Taycan Turbo GT Weissach',
    brand: 'Porsche',
    tagline: 'Attack Mode 1,092 HP • Laguna Seca & Nürburgring King',
    category: 'Hyper-EV',
    bodyStyle: 'coupe',
    basePriceMAD: 2950000,
    hp: 1092,
    torque: 1340,
    zeroToHundred: 2.2,
    topSpeed: 305,
    weight: 2220,
    redline: 9000,
    engineDesc: 'Dual-Motor SiC Pulse Inverter EV',
    displacementL: 0,
    fuelType: 'Électrique',
    acousticProfile: 'ev',
    drivetrain: 'AWD • 2-Speed Rear Gearbox',
    defaultPaint: 'miami_blue',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
    radar: { accel: 100, topSpeed: 88, handling: 92, braking: 94, comfort: 88, exclusivity: 93 }
  }
];

const PAINT_FINISHES = [
  { id: 'nardo_grey', name: 'Nardo Grey Metallic', primary: '#6E737B', secondary: '#3B3F46', highlight: '#B5BAC2', priceMAD: 0 },
  { id: 'guards_red', name: 'Rosso Corsa / Guards Red', primary: '#D91424', secondary: '#7A0610', highlight: '#FF6B78', priceMAD: 35000 },
  { id: 'miami_blue', name: 'Miami Riviera Blue', primary: '#00A8E8', secondary: '#005682', highlight: '#7CE2FF', priceMAD: 45000 },
  { id: 'british_green', name: 'British Racing Emerald', primary: '#0C4A34', secondary: '#052418', highlight: '#349E76', priceMAD: 42000 },
  { id: 'satin_black', name: 'Satin Obsidian Magno', primary: '#1E2026', secondary: '#090A0D', highlight: '#525866', priceMAD: 55000 },
  { id: 'viola_parsifae', name: 'Viola Parsifae Pearl', primary: '#6B21A8', secondary: '#310B52', highlight: '#C084FC', priceMAD: 68000 },
  { id: 'solarbeam_yellow', name: 'Solarbeam Giallo Modena', primary: '#EAB308', secondary: '#854D0E', highlight: '#FEF08A', priceMAD: 48000 },
  { id: 'pearl_white', name: 'Bianco Fuji Pearl', primary: '#E2E8F0', secondary: '#94A3B8', highlight: '#FFFFFF', priceMAD: 38000 }
];

const WHEEL_STYLES = [
  { id: 'y_spoke', name: '21" Forged Magnesium Y-Spoke', weightDelta: 0, priceMAD: 0 },
  { id: 'aero_blade', name: '21"/22" Carbon Aero Disc Blade', weightDelta: -12, priceMAD: 65000 },
  { id: 'center_lock', name: '21" Manthey Center-Lock Track', weightDelta: -18, priceMAD: 85000 }
];

const CALIPER_COLORS = [
  { id: 'acid_green', name: 'Acid Green Hybrid', hex: '#84CC16' },
  { id: 'ceramic_gold', name: 'PCCB Ceramic Gold', hex: '#F59E0B' },
  { id: 'corsa_red', name: 'Brembo Corsa Red', hex: '#EF4444' },
  { id: 'speed_blue', name: 'Estoril Blue', hex: '#3B82F6' },
  { id: 'stealth_black', name: 'Anodized Stealth Black', hex: '#334155' }
];

const STUDIO_BACKDROPS = [
  { id: 'monaco', name: 'Monaco Harbor Night', bgClass: 'from-[#060919] via-[#0B1528] to-[#05070B]', accent: '#00F0FF', floorGlow: 'rgba(0, 240, 255, 0.18)' },
  { id: 'cyber', name: 'Tokyo Cyber Neon', bgClass: 'from-[#160724] via-[#0E071B] to-[#06050A]', accent: '#FF2A85', floorGlow: 'rgba(255, 42, 133, 0.22)' },
  { id: 'pitlane', name: 'Marrakech Circuit Pitlane', bgClass: 'from-[#1B120C] via-[#120E0A] to-[#080706]', accent: '#F59E0B', floorGlow: 'rgba(245, 158, 11, 0.20)' },
  { id: 'atelier', name: 'Pure Obsidian Atelier', bgClass: 'from-[#1E2430] via-[#0F131A] to-[#06080E]', accent: '#E2E8F0', floorGlow: 'rgba(226, 232, 240, 0.16)' }
];

const TUNING_PACKAGES = [
  {
    id: 'ecu_stage2',
    name: 'Stage 2 Bi-Mode ECU & TCU Calibration',
    desc: '+85 HP / +110 Nm • Removes top speed limiter & sharpens shift times by 35ms',
    hpGain: 85,
    torqueGain: 110,
    zeroToHundredDelta: -0.25,
    topSpeedGain: 18,
    weightDelta: 0,
    priceMAD: 48000
  },
  {
    id: 'akrapovic_ti',
    name: 'Akrapovič Evolution Line Full Titanium Exhaust',
    desc: '+28 HP / -16 kg • Inconel headers with active valve overrun crackles',
    hpGain: 28,
    torqueGain: 35,
    zeroToHundredDelta: -0.08,
    topSpeedGain: 4,
    weightDelta: -16,
    priceMAD: 92000
  },
  {
    id: 'weissach_carbon',
    name: 'Weissach / Assetto Full Pre-Preg Carbon Kit',
    desc: '-42 kg • Carbon roof, anti-roll bars, magnesium hood & polycarbonate glazing',
    hpGain: 0,
    torqueGain: 0,
    zeroToHundredDelta: -0.15,
    topSpeedGain: 5,
    weightDelta: -42,
    priceMAD: 165000
  },
  {
    id: 'cup2r_tires',
    name: 'Michelin Pilot Sport Cup 2 R Semi-Slicks',
    desc: 'Maximum mechanical launch grip • Shaves 0.15s off 0-100 km/h sprint',
    hpGain: 0,
    torqueGain: 0,
    zeroToHundredDelta: -0.15,
    topSpeedGain: 0,
    weightDelta: -4,
    priceMAD: 29000
  }
];

const MOROCCAN_VIP_HUBS = [
  { id: 'casa', city: 'Casablanca', name: 'APEX Corniche Flagship Atelier', address: 'Boulevard de la Corniche, Aïn Diab, Casablanca', trackType: 'Coastal Highway & Private Salon' },
  { id: 'marrakech', city: 'Marrakech', name: 'Circuit International Moulay El Hassan', address: 'Zone de l’Agdal, Route de l’Ourika, Marrakech', trackType: 'FIA Grade 2 Full Track Experience' },
  { id: 'rabat', city: 'Rabat', name: 'Rabat Souissi Diplomatic Lounge', address: 'Avenue Mohammed VI, Souissi, Rabat', trackType: 'Private Concierge Test Drive' },
  { id: 'tangier', city: 'Tangier', name: 'Tanger Marina Bay Motorsport Club', address: 'Marina Bay Front, Tangier', trackType: 'Cap Spartel Mountain & Marina Run' },
  { id: 'kenitra', city: 'Kenitra', name: 'Kenitra Atlantic High-Speed Proving Ground', address: 'Atlantic Free Zone Corridor, Kenitra', trackType: '1/4 Mile Straight & Telemetry Pad' }
];

// ============================================================================
// 2. PROCEDURAL WEB AUDIO API ENGINE SYNTHESIZER (ZERO EXTERNAL MP3S)
// ============================================================================

class ProceduralEngineAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.filter = null;
    this.masterGain = null;
    this.profile = 'flat6';
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.001;

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 320;
    this.filter.Q.value = 4.5;

    // Subtle waveshaper distortion for mechanical harmonic richness
    this.shaper = this.ctx.createWaveShaper();
    this.shaper.curve = this.makeDistortionCurve(65);
    this.shaper.oversample = '2x';

    this.osc1 = this.ctx.createOscillator();
    this.osc2 = this.ctx.createOscillator();
    this.subOsc = this.ctx.createOscillator();

    this.osc1Gain = this.ctx.createGain();
    this.osc2Gain = this.ctx.createGain();
    this.subGain = this.ctx.createGain();

    this.osc1.connect(this.osc1Gain);
    this.osc2.connect(this.osc2Gain);
    this.subOsc.connect(this.subGain);

    this.osc1Gain.connect(this.shaper);
    this.osc2Gain.connect(this.shaper);
    this.subGain.connect(this.filter);

    this.shaper.connect(this.filter);
    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.configureProfile(this.profile);

    this.osc1.start();
    this.osc2.start();
    this.subOsc.start();
    this.isPlaying = true;
  }

  makeDistortionCurve(amount = 50) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  configureProfile(profile) {
    this.profile = profile;
    if (!this.ctx) return;

    if (profile === 'flat6') {
      this.osc1.type = 'sawtooth';
      this.osc2.type = 'triangle';
      this.subOsc.type = 'sine';
      this.osc1Gain.gain.value = 0.45;
      this.osc2Gain.gain.value = 0.35;
      this.subGain.gain.value = 0.4;
      this.filter.Q.value = 5.0;
    } else if (profile === 'v8') {
      this.osc1.type = 'sawtooth';
      this.osc2.type = 'sawtooth';
      this.subOsc.type = 'triangle';
      this.osc1Gain.gain.value = 0.55;
      this.osc2Gain.gain.value = 0.50;
      this.subGain.gain.value = 0.75;
      this.filter.Q.value = 3.8;
    } else if (profile === 'v12') {
      this.osc1.type = 'sawtooth';
      this.osc2.type = 'square';
      this.subOsc.type = 'sawtooth';
      this.osc1Gain.gain.value = 0.50;
      this.osc2Gain.gain.value = 0.30;
      this.subGain.gain.value = 0.30;
      this.filter.Q.value = 6.5;
    } else if (profile === 'ev') {
      this.osc1.type = 'sine';
      this.osc2.type = 'triangle';
      this.subOsc.type = 'sine';
      this.osc1Gain.gain.value = 0.35;
      this.osc2Gain.gain.value = 0.25;
      this.subGain.gain.value = 0.45;
      this.filter.Q.value = 8.0;
    }
  }

  updateRPM(rpm, throttle = 0.2, muted = false) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    if (muted) {
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.05);
      return;
    }

    const clampedRpm = Math.max(800, Math.min(9500, rpm));
    let baseFreq = (clampedRpm / 60) * 1.5;

    if (this.profile === 'v8') {
      baseFreq = (clampedRpm / 60) * 1.1;
      this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.03);
      this.osc2.frequency.setTargetAtTime(baseFreq * 1.03, now, 0.03); // V8 cross-plane beat
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.03);
    } else if (this.profile === 'v12') {
      baseFreq = (clampedRpm / 60) * 2.2;
      this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.03);
      this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.03); // Harmonic scream
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.03);
    } else if (this.profile === 'ev') {
      baseFreq = 140 + (clampedRpm / 9000) * 950;
      this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.03);
      this.osc2.frequency.setTargetAtTime(baseFreq * 1.498, now, 0.03); // Futuristic fifth interval
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.25, now, 0.03);
    } else {
      // Flat-6 boxer wail
      baseFreq = (clampedRpm / 60) * 1.65;
      this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.03);
      this.osc2.frequency.setTargetAtTime(baseFreq * 2.01, now, 0.03);
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.03);
    }

    const cutoff = 180 + (clampedRpm / 9500) * 2600 + throttle * 900;
    this.filter.frequency.setTargetAtTime(cutoff, now, 0.04);

    const targetGain = 0.08 + (clampedRpm / 9500) * 0.14 + throttle * 0.08;
    this.masterGain.gain.setTargetAtTime(Math.min(0.32, targetGain), now, 0.04);
  }

  triggerExhaustCrackle(intensity = 3) {
    if (!this.ctx || this.profile === 'ev') return;
    const now = this.ctx.currentTime;

    for (let i = 0; i < intensity; i++) {
      const delay = i * (0.055 + Math.random() * 0.06);
      const bufferSize = this.ctx.sampleRate * 0.065;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        output[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.3));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 260 + Math.random() * 340;
      bandpass.Q.value = 2.5;

      const popGain = this.ctx.createGain();
      popGain.gain.setValueAtTime(0.28 + Math.random() * 0.15, now + delay);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);

      whiteNoise.connect(bandpass);
      bandpass.connect(popGain);
      popGain.connect(this.ctx.destination);

      whiteNoise.start(now + delay);
    }
  }

  stop() {
    if (!this.ctx) return;
    this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.05);
  }
}

// ============================================================================
// 3. CUSTOM INTERACTIVE SVG VEHICLE VISUALIZER ("ATELIER 360°")
// ============================================================================

const InteractiveCarVisualizer = ({
  car,
  paint,
  wheelStyle,
  caliperColor,
  windowTint,
  lightsOn,
  aeroWing,
  spinningWheels,
  backdrop,
  effectiveSpecs
}) => {
  const bodyStyle = car.bodyStyle || 'coupe';

  // Render customized wheel spokes SVG
  const renderWheel = (cx, cy, radius = 44) => (
    <g transform={`translate(${cx}, ${cy})`}>
      {/* Outer Michelin Tire with Sidewall Detail */}
      <circle r={radius} fill="#0B0D13" stroke="#1E2330" strokeWidth="4" />
      <circle r={radius - 5} fill="none" stroke="#2A3040" strokeWidth="1.5" strokeDasharray="8 6" />
      {/* Inner Alloy Rim Barrel */}
      <circle r={radius - 11} fill="#12161F" stroke="#475569" strokeWidth="2" />
      {/* Glowing Vented Brake Rotor */}
      <circle r={radius - 19} fill="#262B38" stroke="#64748B" strokeWidth="1.5" />
      <circle r={radius - 23} fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 4" />

      {/* Fixed Performance Brake Caliper (stays stationary while wheel spins!) */}
      <path
        d="M -24 -12 A 26 26 0 0 1 -10 -24 L -5 -14 A 14 14 0 0 0 -13 -6 Z"
        fill={caliperColor.hex}
        stroke="#0F172A"
        strokeWidth="1.5"
      />

      {/* Spinning Wheel Spokes Group */}
      <g className={spinningWheels ? 'animate-spin' : ''} style={{ animationDuration: '0.55s' }}>
        {wheelStyle.id === 'y_spoke' && (
          <g stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round">
            {[0, 72, 144, 216, 288].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <line x1="0" y1="0" x2="0" y2="-16" />
                <line x1="0" y1="-16" x2="-9" y2="-30" />
                <line x1="0" y1="-16" x2="9" y2="-30" />
              </g>
            ))}
          </g>
        )}

        {wheelStyle.id === 'aero_blade' && (
          <g>
            <circle r={radius - 14} fill="rgba(15, 23, 42, 0.72)" stroke="#38BDF8" strokeWidth="1" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <path
                key={deg}
                transform={`rotate(${deg})`}
                d="M 0 -6 L 10 -30 L 2 -31 L -4 -8 Z"
                fill="#94A3B8"
              />
            ))}
          </g>
        )}

        {wheelStyle.id === 'center_lock' && (
          <g stroke="#E2E8F0" strokeWidth="2.2">
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <line key={deg} transform={`rotate(${deg})`} x1="0" y1="-7" x2="4" y2="-31" />
            ))}
          </g>
        )}

        {/* Center Lock Nut */}
        <circle r="7" fill="#0F172A" stroke={caliperColor.hex} strokeWidth="2.5" />
        <circle r="2.5" fill={caliperColor.hex} />
      </g>
    </g>
  );

  // Select silhouette path by bodyStyle (Supercar/Coupe vs Luxury SUV vs Avant Wagon)
  const getBodyPaths = () => {
    if (bodyStyle === 'suv') {
      return {
        mainBody:
          'M 110 250 L 118 195 Q 125 182 150 180 L 270 175 L 335 110 Q 350 98 380 98 L 650 98 Q 675 98 685 118 L 710 185 L 735 195 L 740 255 L 690 262 L 150 262 Z',
        windowPath:
          'M 345 114 L 465 114 L 465 174 L 292 174 Z M 480 114 L 585 114 L 585 174 L 480 174 Z M 600 114 L 668 114 L 688 174 L 600 174 Z',
        characterLine: 'M 145 205 L 715 202',
        wingMountX: 675,
        wingMountY: 98,
        headlightX: 118,
        headlightY: 205,
        taillightX: 732,
        taillightY: 205
      };
    }
    if (bodyStyle === 'wagon') {
      return {
        mainBody:
          'M 95 255 Q 102 212 155 198 L 285 178 L 385 124 Q 415 112 455 112 L 665 116 Q 695 118 712 142 L 742 195 Q 752 225 744 256 L 690 262 L 135 262 Z',
        windowPath:
          'M 308 175 L 395 126 Q 418 120 450 120 L 535 121 L 525 175 Z M 550 122 L 665 125 Q 684 128 696 150 L 680 175 L 540 175 Z',
        characterLine: 'M 135 215 Q 420 195 725 205',
        wingMountX: 685,
        wingMountY: 118,
        headlightX: 110,
        headlightY: 215,
        taillightX: 738,
        taillightY: 198
      };
    }
    // Default Coupe / Mid-Engine Supercar silhouette
    return {
      mainBody:
        'M 88 256 Q 96 215 155 198 L 275 176 L 375 125 Q 425 106 490 114 L 645 152 L 732 174 Q 752 184 748 254 L 690 262 L 135 262 Z',
      windowPath:
        'M 295 174 L 382 130 Q 425 115 485 122 L 595 152 L 560 176 Z',
      characterLine: 'M 140 220 Q 410 185 730 198',
      wingMountX: 705,
      wingMountY: 168,
      headlightX: 105,
      headlightY: 216,
      taillightX: 742,
      taillightY: 188
    };
  };

  const paths = getBodyPaths();

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b ${backdrop.bgClass} p-4 sm:p-6 shadow-2xl`}>
      {/* Ambient Studio Top Lights */}
      <div className="absolute top-0 left-1/4 right-1/4 h-2 bg-white/80 blur-md rounded-full pointer-events-none" />
      <div
        className="absolute top-0 left-1/3 right-1/3 h-28 blur-3xl pointer-events-none transition-all duration-700"
        style={{ background: backdrop.floorGlow }}
      />

      {/* Top Live Studio Telemetry Overlay Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/10 text-cyan-300 border border-cyan-400/30">
              ATELIER 360° LIVE RENDER
            </span>
            <span className="text-xs text-slate-400 font-mono">{backdrop.name}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
            {car.name}
          </h3>
        </div>

        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Power</div>
            <div className="text-sm font-black text-white font-mono">{effectiveSpecs.hp} <span className="text-[10px] text-cyan-400">HP</span></div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">0-100</div>
            <div className="text-sm font-black text-emerald-400 font-mono">{effectiveSpecs.zeroToHundred}s</div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">V-Max</div>
            <div className="text-sm font-black text-amber-400 font-mono">{effectiveSpecs.topSpeed} <span className="text-[10px]">km/h</span></div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Weight</div>
            <div className="text-sm font-black text-slate-200 font-mono">{effectiveSpecs.weight} <span className="text-[10px]">kg</span></div>
          </div>
        </div>
      </div>

      {/* Interactive Layered SVG Vehicle Stage */}
      <div className="relative z-10 my-2 flex items-center justify-center">
        <svg
          viewBox="0 0 850 330"
          className="w-full max-w-4xl h-auto select-none drop-shadow-[0_22px_28px_rgba(0,0,0,0.85)]"
        >
          <defs>
            {/* Dynamic Metallic Body Paint Gradient */}
            <linearGradient id="carBodyPaint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={paint.highlight} />
              <stop offset="38%" stopColor={paint.primary} />
              <stop offset="85%" stopColor={paint.secondary} />
              <stop offset="100%" stopColor="#05070B" />
            </linearGradient>

            {/* Specular Studio Horizon Reflection */}
            <linearGradient id="specularHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </linearGradient>

            {/* Headlight Beam Cone */}
            <linearGradient id="headlightCone" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#E0F2FE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>

            {/* Taillight Glow */}
            <linearGradient id="taillightCone" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FF1E42" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FF1E42" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Perspective Studio Floor Grid & Reflection Pool */}
          <ellipse cx="425" cy="275" rx="360" ry="26" fill={backdrop.floorGlow} />
          <ellipse cx="425" cy="272" rx="310" ry="14" fill="#020305" opacity="0.92" />

          {/* Speed Motion Lines when Spinning Wheels / Rolling Shot is active */}
          {spinningWheels && (
            <g stroke={backdrop.accent} strokeWidth="1.5" opacity="0.45">
              <line x1="30" y1="80" x2="170" y2="80" strokeDasharray="30 20" />
              <line x1="620" y1="60" x2="800" y2="60" strokeDasharray="45 15" />
              <line x1="50" y1="295" x2="790" y2="295" strokeDasharray="60 25" />
            </g>
          )}

          {/* Active Carbon Swan-Neck Rear GT Wing */}
          {aeroWing && (
            <g>
              <path
                d={`M ${paths.wingMountX - 12} ${paths.wingMountY + 8} L ${paths.wingMountX + 12} ${paths.wingMountY - 30} L ${paths.wingMountX + 20} ${paths.wingMountY - 30} L ${paths.wingMountX + 2} ${paths.wingMountY + 12} Z`}
                fill="#1E293B"
                stroke="#475569"
                strokeWidth="1.5"
              />
              <path
                d={`M ${paths.wingMountX - 18} ${paths.wingMountY - 32} L ${paths.wingMountX + 36} ${paths.wingMountY - 26} L ${paths.wingMountX + 38} ${paths.wingMountY - 38} Z`}
                fill="#0F172A"
                stroke={caliperColor.hex}
                strokeWidth="1.8"
              />
            </g>
          )}

          {/* Main Painted Vehicle Chassis */}
          <path
            d={paths.mainBody}
            fill="url(#carBodyPaint)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />

          {/* Studio Specular Contour Overlay */}
          <path d={paths.mainBody} fill="url(#specularHighlight)" pointerEvents="none" />

          {/* Lower Carbon Fiber Front Splitter, Side Skirts & Rear Diffuser */}
          <path
            d="M 82 256 L 755 256 L 748 265 L 86 265 Z"
            fill="#0F172A"
            stroke="#334155"
            strokeWidth="1"
          />
          {/* Side Air Intake / Carbon Blade */}
          {bodyStyle !== 'suv' && (
            <path
              d="M 480 185 L 545 178 L 530 232 L 495 232 Z"
              fill="#090D16"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          )}

          {/* Character Crease Line */}
          <path
            d={paths.characterLine}
            fill="none"
            stroke={paint.highlight}
            strokeWidth="2"
            opacity="0.65"
          />

          {/* Cabin Glasshouse with Dynamic Privacy Tint Opacity */}
          <path
            d={paths.windowPath}
            fill="#060911"
            fillOpacity={windowTint}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />

          {/* Subtle Interior Rollcage / Carbon Bucket Seat Silhouette visible when tint is light */}
          <path
            d="M 425 135 L 405 172 M 445 132 L 465 172"
            stroke={caliperColor.hex}
            strokeWidth="2.5"
            opacity={Math.max(0.1, 1 - windowTint)}
          />

          {/* Wheel Arch Cutouts */}
          <circle cx="220" cy="252" r="52" fill="#05070B" />
          <circle cx="625" cy="252" r="52" fill="#05070B" />

          {/* Front & Rear Custom Wheels + Brake Calipers */}
          {renderWheel(220, 252, 46)}
          {renderWheel(625, 252, 46)}

          {/* Matrix LED Headlights & Taillights */}
          {lightsOn && (
            <g>
              {/* Front Laser Beam Cone */}
              <polygon
                points={`${paths.headlightX},${paths.headlightY} 5,${paths.headlightY - 35} 5,${paths.headlightY + 45}`}
                fill="url(#headlightCone)"
              />
              {/* Front DRL LED Blade */}
              <path
                d={`M ${paths.headlightX - 6} ${paths.headlightY + 2} L ${paths.headlightX + 28} ${paths.headlightY - 6} L ${paths.headlightX + 22} ${paths.headlightY + 6} Z`}
                fill="#E0F2FE"
                stroke="#38BDF8"
                strokeWidth="2"
              />
              {/* Rear Taillight Laser Bar & Glow */}
              <polygon
                points={`${paths.taillightX},${paths.taillightY} 845,${paths.taillightY - 25} 845,${paths.taillightY + 28}`}
                fill="url(#taillightCone)"
              />
              <rect
                x={paths.taillightX - 10}
                y={paths.taillightY - 6}
                width="16"
                height="10"
                rx="3"
                fill="#FF1E42"
                stroke="#FDA4AF"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Quick Visual Controls Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => lightsOn.toggle()}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border transition ${
              lightsOn.value
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            Matrix LEDs: {lightsOn.value ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => aeroWing.toggle()}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border transition ${
              aeroWing.value
                ? 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            DRS GT Wing: {aeroWing.value ? 'DEPLOYED' : 'STOWED'}
          </button>

          <button
            onClick={() => spinningWheels.toggle()}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border transition ${
              spinningWheels.value
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Disc className={`w-3.5 h-3.5 ${spinningWheels.value ? 'animate-spin' : ''}`} />
            Rolling Motion: {spinningWheels.value ? 'ACTIVE' : 'STATIC'}
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>Paint: <strong className="text-white">{paint.name}</strong></span>
          <span>•</span>
          <span>Calipers: <strong style={{ color: caliperColor.hex }}>{caliperColor.name}</strong></span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Navigation & Global Currency
  const [activeTab, setActiveTab] = useState('showroom');
  const [currency, setCurrency] = useState('MAD');
  const [selectedCar, setSelectedCar] = useState(INITIAL_FLEET[0]);
  const [toastMessage, setToastMessage] = useState(null);

  // Showroom Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Atelier 360 Configurator State
  const [selectedPaint, setSelectedPaint] = useState(PAINT_FINISHES[1]);
  const [selectedWheel, setSelectedWheel] = useState(WHEEL_STYLES[2]);
  const [selectedCaliper, setSelectedCaliper] = useState(CALIPER_COLORS[1]);
  const [windowTint, setWindowTint] = useState(0.78);
  const [lightsOn, setLightsOn] = useState(true);
  const [aeroWing, setAeroWing] = useState(true);
  const [spinningWheels, setSpinningWheels] = useState(false);
  const [selectedBackdrop, setSelectedBackdrop] = useState(STUDIO_BACKDROPS[0]);
  const [selectedTuningIds, setSelectedTuningIds] = useState(['akrapovic_ti']);

  // Saved Custom Builds in Garage
  const [savedGarage, setSavedGarage] = useState([
    {
      id: 'custom_gt3_manthey',
      name: '911 GT3 RS Manthey Spec (Custom)',
      baseCarId: 'gt3rs',
      brand: 'Porsche Atelier',
      category: 'Track',
      bodyStyle: 'coupe',
      hp: 638,
      torque: 610,
      zeroToHundred: 2.6,
      topSpeed: 323,
      weight: 1370,
      redline: 9000,
      engineDesc: '4.0L Flat-6 + Stage 2 + Akrapovič Ti',
      displacementL: 4.0,
      fuelType: 'Essence',
      acousticProfile: 'flat6',
      basePriceMAD: 3829000,
      paintName: 'Miami Riviera Blue',
      wheelName: '21" Manthey Center-Lock Track',
      caliperName: 'PCCB Ceramic Gold',
      image: INITIAL_FLEET[0].image,
      radar: { accel: 96, topSpeed: 92, handling: 100, braking: 100, comfort: 55, exclusivity: 99 }
    }
  ]);

  // Dyno & Exhaust Sound Lab State
  const engineAudioRef = useRef(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [currentRpm, setCurrentRpm] = useState(950);
  const [currentGear, setCurrentGear] = useState(1);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [isRevving, setIsRevving] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [activeAcoustic, setActiveAcoustic] = useState('flat6');
  const [crackleFlash, setCrackleFlash] = useState(false);

  // Versus & 1/4 Mile Drag Strip State
  const [carAId, setCarAId] = useState('gt3rs');
  const [carBId, setCarBId] = useState('sf90');
  const [dragState, setDragState] = useState('idle'); // idle | countdown | racing | finished
  const [treeStage, setTreeStage] = useState(0); // 0: off, 1: pre-stage, 2: stage, 3: yellow1, 4: yellow2, 5: green!
  const [raceProgress, setRaceProgress] = useState({
    posA: 0,
    posB: 0,
    speedA: 0,
    speedB: 0,
    timeElapsed: 0,
    resultA: null,
    resultB: null
  });

  // Finance & Moroccan Vignette Calculator State
  const [financeMode, setFinanceMode] = useState('loa'); // 'loa' | 'credit'
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [durationMonths, setDurationMonths] = useState(48);
  const [interestRate, setInterestRate] = useState(4.9);
  const [residualPct, setResidualPct] = useState(35);

  // VIP Booking State
  const [selectedHub, setSelectedHub] = useState(MOROCCAN_VIP_HUBS[1]);
  const [vipClientName, setVipClientName] = useState('Amine El Fassi');
  const [vipDate, setVipDate] = useState('2025-05-24');
  const [vipTimeSlot, setVipTimeSlot] = useState('16:30 Sunset Track Session');
  const [generatedPass, setGeneratedPass] = useState(null);

  // Helper notification toast
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  // Currency Formatter
  const formatPrice = useCallback(
    (amountMAD) => {
      const curr = CURRENCIES[currency];
      const converted = Math.round(amountMAD * curr.rate);
      if (currency === 'MAD') {
        return `${converted.toLocaleString('fr-MA')} DH`;
      }
      if (currency === 'EUR') {
        return `€${converted.toLocaleString('de-DE')}`;
      }
      return `$${converted.toLocaleString('en-US')}`;
    },
    [currency]
  );

  // Sync default paint & acoustic profile when switching cars
  const handleSelectCar = (car, targetTab = null) => {
    setSelectedCar(car);
    const matchingPaint = PAINT_FINISHES.find((p) => p.id === car.defaultPaint) || PAINT_FINISHES[0];
    setSelectedPaint(matchingPaint);
    setActiveAcoustic(car.acousticProfile || 'flat6');
    if (engineAudioRef.current) {
      engineAudioRef.current.configureProfile(car.acousticProfile || 'flat6');
    }
    if (targetTab) {
      setActiveTab(targetTab);
    }
  };

  // Compute Effective Configured Vehicle Telemetry & Price
  const effectiveSpecs = useMemo(() => {
    let hp = selectedCar.hp;
    let torque = selectedCar.torque;
    let zeroToHundred = selectedCar.zeroToHundred;
    let topSpeed = selectedCar.topSpeed;
    let weight = selectedCar.weight + selectedWheel.weightDelta;
    let optionsPriceMAD = selectedPaint.priceMAD + selectedWheel.priceMAD;

    selectedTuningIds.forEach((id) => {
      const pkg = TUNING_PACKAGES.find((t) => t.id === id);
      if (pkg) {
        hp += pkg.hpGain;
        torque += pkg.torqueGain;
        zeroToHundred += pkg.zeroToHundredDelta;
        topSpeed += pkg.topSpeedGain;
        weight += pkg.weightDelta;
        optionsPriceMAD += pkg.priceMAD;
      }
    });

    zeroToHundred = Number(Math.max(1.85, zeroToHundred).toFixed(2));
    const totalPriceMAD = selectedCar.basePriceMAD + optionsPriceMAD;

    return {
      hp,
      torque,
      zeroToHundred,
      topSpeed,
      weight,
      optionsPriceMAD,
      totalPriceMAD
    };
  }, [selectedCar, selectedPaint, selectedWheel, selectedTuningIds]);

  // Save current build to Garage
  const handleSaveBuildToGarage = () => {
    const customId = `custom_${selectedCar.id}_${Date.now().toString().slice(-4)}`;
    const newBuild = {
      id: customId,
      name: `${selectedCar.brand} ${selectedCar.name.split(' ')[1]} Atelier (${effectiveSpecs.hp} HP)`,
      baseCarId: selectedCar.id,
      brand: `${selectedCar.brand} Custom`,
      category: selectedCar.category,
      bodyStyle: selectedCar.bodyStyle,
      hp: effectiveSpecs.hp,
      torque: effectiveSpecs.torque,
      zeroToHundred: effectiveSpecs.zeroToHundred,
      topSpeed: effectiveSpecs.topSpeed,
      weight: effectiveSpecs.weight,
      redline: selectedCar.redline,
      engineDesc: `${selectedCar.engineDesc} + ${selectedTuningIds.length} Atelier Upgrades`,
      displacementL: selectedCar.displacementL,
      fuelType: selectedCar.fuelType,
      acousticProfile: selectedCar.acousticProfile,
      basePriceMAD: effectiveSpecs.totalPriceMAD,
      paintName: selectedPaint.name,
      wheelName: selectedWheel.name,
      caliperName: selectedCaliper.name,
      image: selectedCar.image,
      radar: {
        accel: Math.min(100, selectedCar.radar.accel + selectedTuningIds.length * 3),
        topSpeed: Math.min(100, selectedCar.radar.topSpeed + selectedTuningIds.length * 2),
        handling: Math.min(100, selectedCar.radar.handling + 3),
        braking: Math.min(100, selectedCar.radar.braking + 2),
        comfort: selectedCar.radar.comfort,
        exclusivity: 100
      }
    };

    setSavedGarage((prev) => [newBuild, ...prev]);
    setCarAId(customId);
    triggerToast(`Saved "${newBuild.name}" to your Garage & Versus Roster!`);
  };

  // ============================================================================
  // ENGINE SOUND LAB & LAUNCH CONTROL LOOP
  // ============================================================================

  const ensureAudioReady = () => {
    if (!engineAudioRef.current) {
      engineAudioRef.current = new ProceduralEngineAudio();
      engineAudioRef.current.init();
      engineAudioRef.current.configureProfile(activeAcoustic);
    }
  };

  useEffect(() => {
    if (activeTab !== 'soundlab') {
      if (engineAudioRef.current) {
        engineAudioRef.current.stop();
      }
      setIsRevving(false);
      setIsLaunching(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentRpm((prevRpm) => {
        const redline = selectedCar.redline || 8500;
        let nextRpm = prevRpm;

        if (isLaunching) {
          // Automated 0-200 km/h Launch Control simulation
          nextRpm = prevRpm + 290;
          if (nextRpm >= redline - 150) {
            setCurrentGear((g) => {
              if (g < 7) {
                if (engineAudioRef.current && !audioMuted) {
                  engineAudioRef.current.triggerExhaustCrackle(3);
                }
                setCrackleFlash(true);
                setTimeout(() => setCrackleFlash(false), 180);
                return g + 1;
              } else {
                setIsLaunching(false);
                return 7;
              }
            });
            nextRpm = redline * 0.66;
          }
        } else if (isRevving) {
          nextRpm = Math.min(redline, prevRpm + 340);
          // Rev limiter bounce at redline
          if (nextRpm >= redline - 60) {
            nextRpm = redline - 240 + Math.random() * 220;
            if (engineAudioRef.current && !audioMuted) {
              engineAudioRef.current.triggerExhaustCrackle(2);
            }
            setCrackleFlash(true);
            setTimeout(() => setCrackleFlash(false), 120);
          }
        } else {
          // Smoothly decay back to idle (950 RPM)
          const decay = prevRpm > 3500 ? 280 : 160;
          nextRpm = Math.max(950, prevRpm - decay);
        }

        // Calculate speed based on RPM & Gear
        const gearRatios = [0, 0.0085, 0.0135, 0.019, 0.025, 0.031, 0.037, 0.043];
        const ratio = gearRatios[currentGear] || 0;
        const calculatedSpeed = Math.min(
          effectiveSpecs.topSpeed,
          Math.round(nextRpm * ratio)
        );
        setCurrentSpeed(nextRpm <= 1050 && !isLaunching ? 0 : calculatedSpeed);

        if (engineAudioRef.current) {
          engineAudioRef.current.updateRPM(
            nextRpm,
            isRevving || isLaunching ? 0.95 : 0.15,
            audioMuted
          );
        }

        return nextRpm;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [activeTab, isRevving, isLaunching, currentGear, selectedCar, effectiveSpecs.topSpeed, audioMuted]);

  const handleShiftGear = (delta) => {
    ensureAudioReady();
    setCurrentGear((prev) => {
      const next = Math.max(1, Math.min(7, prev + delta));
      if (next !== prev) {
        if (delta > 0) {
          // Upshift RPM drop + overrun pop
          setCurrentRpm((r) => Math.max(1800, r * 0.72));
          if (engineAudioRef.current && !audioMuted) {
            engineAudioRef.current.triggerExhaustCrackle(3);
          }
        } else {
          // Downshift rev-match blip + aggressive crackle storm
          setCurrentRpm((r) => Math.min(selectedCar.redline - 300, r * 1.32 + 900));
          if (engineAudioRef.current && !audioMuted) {
            engineAudioRef.current.triggerExhaustCrackle(5);
          }
          setCrackleFlash(true);
          setTimeout(() => setCrackleFlash(false), 260);
        }
      }
      return next;
    });
  };

  const startLaunchControl = () => {
    ensureAudioReady();
    setCurrentGear(1);
    setCurrentRpm(4200);
    setIsLaunching(true);
    triggerToast('LAUNCH CONTROL ARMED: Full Boost 0-200 km/h Run Initiated!');
  };

  // ============================================================================
  // VERSUS & 1/4 MILE (400M) DRAG RACE PHYSICS SIMULATOR
  // ============================================================================

  const allComparableCars = useMemo(() => [...savedGarage, ...INITIAL_FLEET], [savedGarage]);
  const carA = useMemo(
    () => allComparableCars.find((c) => c.id === carAId) || INITIAL_FLEET[0],
    [allComparableCars, carAId]
  );
  const carB = useMemo(
    () => allComparableCars.find((c) => c.id === carBId) || INITIAL_FLEET[1],
    [allComparableCars, carBId]
  );

  // Calculate theoretical 1/4 mile ET & trap speed from power-to-weight and 0-100 traction
  const computeDragTelemetry = (car) => {
    const weightLb = car.weight * 2.20462;
    // Hale's / Quarter-mile physics blend with 0-100 launch factor
    const rawET = 5.825 * Math.pow(weightLb / car.hp, 1 / 3);
    const launchBonus = (car.zeroToHundred - 3.0) * 0.28;
    const etSeconds = Number(Math.max(8.4, rawET + launchBonus).toFixed(2));
    const trapKmh = Math.min(car.topSpeed, Math.round(234 * Math.pow(car.hp / weightLb, 1 / 3) * 1.609));
    return { etSeconds, trapKmh };
  };

  const startDragRace = () => {
    if (dragState === 'countdown' || dragState === 'racing') return;
    setDragState('countdown');
    setTreeStage(1);
    setRaceProgress({
      posA: 0,
      posB: 0,
      speedA: 0,
      speedB: 0,
      timeElapsed: 0,
      resultA: null,
      resultB: null
    });

    // Christmas tree countdown sequence
    setTimeout(() => setTreeStage(2), 450);
    setTimeout(() => setTreeStage(3), 900);
    setTimeout(() => setTreeStage(4), 1350);
    setTimeout(() => {
      setTreeStage(5); // GREEN LIGHT!
      setDragState('racing');
    }, 1800);
  };

  useEffect(() => {
    if (dragState !== 'racing') return;

    const teleA = computeDragTelemetry(carA);
    const teleB = computeDragTelemetry(carB);
    const reactionA = Number((0.11 + Math.random() * 0.07).toFixed(3));
    const reactionB = Number((0.11 + Math.random() * 0.07).toFixed(3));

    const totalTimeA = teleA.etSeconds + reactionA;
    const totalTimeB = teleB.etSeconds + reactionB;

    let startTime = performance.now();
    let animId;

    const step = (now) => {
      const elapsedSec = ((now - startTime) / 1000) * 2.15; // 2.15x visual time compression for thrilling pace

      const normA = Math.min(1, Math.max(0, (elapsedSec - reactionA) / teleA.etSeconds));
      const normB = Math.min(1, Math.max(0, (elapsedSec - reactionB) / teleB.etSeconds));

      // Non-linear acceleration curve (explosive launch + top-end pull)
      const distA = Math.pow(normA, 1.45) * 400;
      const distB = Math.pow(normB, 1.45) * 400;

      const curSpeedA = Math.round(Math.pow(normA, 0.65) * teleA.trapKmh);
      const curSpeedB = Math.round(Math.pow(normB, 0.65) * teleB.trapKmh);

      setRaceProgress({
        posA: (distA / 400) * 100,
        posB: (distB / 400) * 100,
        speedA: curSpeedA,
        speedB: curSpeedB,
        timeElapsed: Number(Math.min(Math.max(totalTimeA, totalTimeB), elapsedSec).toFixed(2)),
        resultA: normA >= 1 ? { et: teleA.etSeconds, rt: reactionA, total: Number(totalTimeA.toFixed(2)), trap: teleA.trapKmh } : null,
        resultB: normB >= 1 ? { et: teleB.etSeconds, rt: reactionB, total: Number(totalTimeB.toFixed(2)), trap: teleB.trapKmh } : null
      });

      if (normA < 1 || normB < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDragState('finished');
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [dragState, carA, carB]);

  // ============================================================================
  // MOROCCAN FINANCE, LOA LEASING & VIGNETTE (TSAVA) CALCULATIONS
  // ============================================================================

  const financeMetrics = useMemo(() => {
    const vehiclePriceMAD = effectiveSpecs.totalPriceMAD;
    const downPaymentMAD = Math.round((vehiclePriceMAD * downPaymentPct) / 100);
    const residualMAD = financeMode === 'loa' ? Math.round((vehiclePriceMAD * residualPct) / 100) : 0;
    const financedPrincipalMAD = Math.max(0, vehiclePriceMAD - downPaymentMAD - residualMAD);

    const monthlyRate = interestRate / 100 / 12;
    let monthlyInstallmentMAD = 0;
    if (monthlyRate > 0) {
      monthlyInstallmentMAD =
        (financedPrincipalMAD * (monthlyRate * Math.pow(1 + monthlyRate, durationMonths))) /
        (Math.pow(1 + monthlyRate, durationMonths) - 1);
    } else {
      monthlyInstallmentMAD = financedPrincipalMAD / durationMonths;
    }
    if (financeMode === 'loa') {
      // Add lease residual financing rent charge
      monthlyInstallmentMAD += residualMAD * monthlyRate;
    }
    monthlyInstallmentMAD = Math.round(monthlyInstallmentMAD);

    // Moroccan Fiscal Horsepower (Puissance Fiscale CV) & Annual Vignette (TSAVA)
    // Electric & Hybrid vehicles enjoy Vignette (TSAVA) exemption in Morocco!
    let fiscalCV = 18;
    if (selectedCar.displacementL >= 5.0) fiscalCV = 34;
    else if (selectedCar.displacementL >= 4.0) fiscalCV = 23;
    else if (selectedCar.displacementL >= 3.0) fiscalCV = 17;
    else if (selectedCar.fuelType === 'Électrique') fiscalCV = 11;

    let annualVignetteMAD = 0;
    if (selectedCar.fuelType === 'Électrique' || selectedCar.fuelType === 'Hybride') {
      annualVignetteMAD = 0; // Exonération TSAVA Hybride & Électrique au Maroc
    } else {
      if (fiscalCV >= 15) annualVignetteMAD = 8000;
      else if (fiscalCV >= 11) annualVignetteMAD = 3000;
      else annualVignetteMAD = 650;
    }

    // Estimated Moroccan Luxury Vehicle Registration Tax (Taxe sur les véhicules de luxe > 400k DH)
    const luxuryTaxRate = vehiclePriceMAD > 1000000 ? 0.15 : 0.10;
    const luxuryRegistrationTaxMAD = Math.round(vehiclePriceMAD * luxuryTaxRate);

    // Monthly All-Risk Prestige Insurance Estimate
    const monthlyInsuranceMAD = Math.round((vehiclePriceMAD * 0.022) / 12);

    return {
      vehiclePriceMAD,
      downPaymentMAD,
      residualMAD,
      monthlyInstallmentMAD,
      fiscalCV,
      annualVignetteMAD,
      luxuryRegistrationTaxMAD,
      monthlyInsuranceMAD,
      totalMonthlyCostMAD: monthlyInstallmentMAD + monthlyInsuranceMAD + Math.round(annualVignetteMAD / 12)
    };
  }, [effectiveSpecs.totalPriceMAD, downPaymentPct, durationMonths, interestRate, residualPct, financeMode, selectedCar]);

  // Filtered & Sorted Showroom Fleet
  const filteredFleet = useMemo(() => {
    return INITIAL_FLEET.filter((car) => {
      const matchesCat = categoryFilter === 'All' || car.category === categoryFilter;
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.engineDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.basePriceMAD - b.basePriceMAD;
      if (sortBy === 'price_desc') return b.basePriceMAD - a.basePriceMAD;
      if (sortBy === 'hp_desc') return b.hp - a.hp;
      if (sortBy === 'accel_asc') return a.zeroToHundred - b.zeroToHundred;
      return 0;
    });
  }, [categoryFilter, searchQuery, sortBy]);

  // Radar Chart Polygon Helper
  const getRadarPoints = (radarObj, radius = 95, cx = 130, cy = 130) => {
    const keys = ['accel', 'topSpeed', 'handling', 'braking', 'comfort', 'exclusivity'];
    return keys
      .map((key, idx) => {
        const angle = (Math.PI * 2 * idx) / keys.length - Math.PI / 2;
        const val = (radarObj[key] || 75) / 100;
        const x = cx + Math.cos(angle) * radius * val;
        const y = cy + Math.sin(angle) * radius * val;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Subtle Ambient Carbon & Radial Glow Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-cyan-400/50 text-white shadow-[0_12px_40px_rgba(0,240,255,0.25)] backdrop-blur-xl animate-bounce">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TOP NAVIGATION BAR */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#06080E]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('showroom')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-rose-600 p-[1.5px] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <div className="w-full h-full bg-[#06080E] rounded-[10px] flex items-center justify-center">
                <Gauge className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base sm:text-lg bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                  APEX MOTORSPORT
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                  STUDIO PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Bespoke Hypercar Atelier • Telemetry & Acoustic Lab
              </p>
            </div>
          </div>

          {/* Module Navigation Pills */}
          <nav className="flex items-center gap-1 overflow-x-auto max-w-full py-1 no-scrollbar">
            {[
              { id: 'showroom', label: 'Showroom', icon: Car },
              { id: 'configurator', label: 'Atelier 360°', icon: Sliders },
              { id: 'soundlab', label: 'Dyno & Exhaust', icon: Volume2 },
              { id: 'versus', label: 'Versus & Drag', icon: Flame },
              { id: 'finance', label: 'Finance & Vignette', icon: Calculator },
              { id: 'vip', label: `VIP Pass (${savedGarage.length})`, icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_18px_rgba(0,240,255,0.18)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {Object.keys(CURRENCIES).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition ${
                  currency === code
                    ? 'bg-cyan-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ==================================================================== */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* ================================================================== */}
        {/* MODULE 1: SHOWROOM & FLEET EXPLORER */}
        {/* ================================================================== */}
        {activeTab === 'showroom' && (
          <div className="space-y-10">
            {/* Hero Spotlight Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#0B0F1A] shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column: Telemetry & Actions */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between z-10 bg-gradient-to-r from-[#080B12] via-[#080B12]/95 to-transparent">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wider uppercase">
                      <Zap className="w-3.5 h-3.5" /> Spotlight Flagship • {selectedCar.category}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                      {selectedCar.name}
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                      {selectedCar.tagline} — Powered by a {selectedCar.engineDesc} delivering relentless circuit precision.
                    </p>

                    {/* Live Animated Telemetry Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[11px] uppercase tracking-wider text-slate-400">0-100 km/h</div>
                        <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                          {selectedCar.zeroToHundred}s
                        </div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[11px] uppercase tracking-wider text-slate-400">Power Output</div>
                        <div className="text-2xl font-black text-white font-mono mt-0.5">
                          {selectedCar.hp} <span className="text-xs text-cyan-400">HP</span>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[11px] uppercase tracking-wider text-slate-400">Top Speed</div>
                        <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                          {selectedCar.topSpeed} <span className="text-xs">km/h</span>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[11px] uppercase tracking-wider text-slate-400">Atelier Price</div>
                        <div className="text-lg sm:text-xl font-black text-cyan-300 font-mono mt-1 truncate">
                          {formatPrice(selectedCar.basePriceMAD)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-8">
                    <button
                      onClick={() => setActiveTab('configurator')}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:brightness-110 transition shadow-[0_0_25px_rgba(0,240,255,0.35)] flex items-center gap-2"
                    >
                      <Sliders className="w-4 h-4" />
                      Configure in Atelier 360°
                    </button>
                    <button
                      onClick={() => {
                        ensureAudioReady();
                        setActiveTab('soundlab');
                      }}
                      className="px-5 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 transition flex items-center gap-2"
                    >
                      <Volume2 className="w-4 h-4 text-rose-400" />
                      Test Exhaust Sound
                    </button>
                    <button
                      onClick={() => {
                        setCarAId(selectedCar.id);
                        setActiveTab('versus');
                      }}
                      className="px-5 py-3.5 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition flex items-center gap-2"
                    >
                      <Flame className="w-4 h-4 text-amber-400" />
                      1/4 Mile Drag Race
                    </button>
                  </div>
                </div>

                {/* Right Column: High-Res Spotlight Vehicle Visual */}
                <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[380px]">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#080B12] via-[#080B12]/40 to-transparent" />
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-xs font-mono text-slate-200">
                    {selectedCar.drivetrain} • Redline {selectedCar.redline} RPM
                  </div>
                </div>
              </div>
            </div>

            {/* Filter, Search & Sort Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0D111C] p-4 rounded-2xl border border-white/10">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {['All', 'Track', 'Supercar', 'Luxury SUV', 'Hyper-EV'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      categoryFilter === cat
                        ? 'bg-cyan-400 text-slate-950 shadow'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search & Sort */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Porsche, V12, SUV..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="featured">Sort: Featured Flagships</option>
                  <option value="hp_desc">Power: Highest HP First</option>
                  <option value="accel_asc">0-100 km/h: Fastest First</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="price_asc">Price: Low to High</option>
                </select>
              </div>
            </div>

            {/* Interactive 8-Car Fleet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFleet.map((car) => {
                const isSelected = selectedCar.id === car.id;
                return (
                  <div
                    key={car.id}
                    onClick={() => handleSelectCar(car)}
                    className={`group rounded-2xl overflow-hidden bg-[#0D111C] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.2)] -translate-y-1'
                        : 'border-white/10 hover:border-white/30 hover:-translate-y-1'
                    }`}
                  >
                    <div>
                      {/* Card Image Header */}
                      <div className="relative h-48 overflow-hidden bg-black">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D111C] via-transparent to-black/40" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-white/10">
                          {car.category}
                        </span>
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-emerald-400 border border-white/10">
                          0-100: {car.zeroToHundred}s
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 space-y-3">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {car.brand}
                          </div>
                          <h3 className="text-base font-extrabold text-white line-clamp-1 mt-0.5">
                            {car.name}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {car.engineDesc}
                          </p>
                        </div>

                        {/* Mini Telemetry Pills */}
                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                          <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
                            <div className="text-[10px] text-slate-400">Power</div>
                            <div className="text-xs font-bold text-white font-mono">{car.hp} HP</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
                            <div className="text-[10px] text-slate-400">V-Max</div>
                            <div className="text-xs font-bold text-amber-400 font-mono">{car.topSpeed}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
                            <div className="text-[10px] text-slate-400">Mass</div>
                            <div className="text-xs font-bold text-slate-200 font-mono">{car.weight}kg</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">Starting At</div>
                        <div className="text-sm font-black text-cyan-300 font-mono">
                          {formatPrice(car.basePriceMAD)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCar(car, 'configurator');
                        }}
                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-xs font-bold transition flex items-center gap-1"
                      >
                        Customize <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODULE 2: ATELIER 360° LIVE INTERACTIVE CONFIGURATOR */}
        {/* ================================================================== */}
        {activeTab === 'configurator' && (
          <div className="space-y-6">
            {/* Top Car Switcher Strip */}
            <div className="flex items-center justify-between gap-4 bg-[#0D111C] p-3.5 rounded-2xl border border-white/10 overflow-x-auto">
              <div className="flex items-center gap-2">
                {INITIAL_FLEET.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleSelectCar(car)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
                      selectedCar.id === car.id
                        ? 'bg-cyan-400 text-slate-950 shadow'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {car.name.split(' ').slice(0, 3).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Columns: Live Interactive SVG Visualizer + Summary Bar */}
              <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-20">
                <InteractiveCarVisualizer
                  car={selectedCar}
                  paint={selectedPaint}
                  wheelStyle={selectedWheel}
                  caliperColor={selectedCaliper}
                  windowTint={windowTint}
                  lightsOn={{ value: lightsOn, toggle: () => setLightsOn(!lightsOn) }}
                  aeroWing={{ value: aeroWing, toggle: () => setAeroWing(!aeroWing) }}
                  spinningWheels={{ value: spinningWheels, toggle: () => setSpinningWheels(!spinningWheels) }}
                  backdrop={selectedBackdrop}
                  effectiveSpecs={effectiveSpecs}
                />

                {/* Total Build Price & Save Actions Card */}
                <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span>Total Configured Build Price</span>
                      {effectiveSpecs.optionsPriceMAD > 0 && (
                        <span className="text-cyan-400 font-mono">
                          (+{formatPrice(effectiveSpecs.optionsPriceMAD)} in bespoke options)
                        </span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-0.5">
                      {formatPrice(effectiveSpecs.totalPriceMAD)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleSaveBuildToGarage}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2"
                    >
                      <Bookmark className="w-4 h-4" />
                      Save Build to Garage
                    </button>
                    <button
                      onClick={() => setActiveTab('finance')}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 transition flex items-center gap-2"
                    >
                      <Calculator className="w-4 h-4 text-amber-400" />
                      Calculate LOA / Vignette
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Customization Controls */}
              <div className="lg:col-span-5 space-y-5">
                {/* 1. Exterior Paint Palette */}
                <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" /> 1. Bespoke Exterior Finish
                    </h4>
                    <span className="text-xs font-mono text-cyan-300">
                      {selectedPaint.priceMAD === 0 ? 'Included' : `+${formatPrice(selectedPaint.priceMAD)}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {PAINT_FINISHES.map((paint) => {
                      const active = selectedPaint.id === paint.id;
                      return (
                        <button
                          key={paint.id}
                          onClick={() => setSelectedPaint(paint)}
                          className={`p-2 rounded-xl border text-left transition flex flex-col items-center gap-1.5 ${
                            active
                              ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                              : 'border-white/10 bg-white/5 hover:border-white/30'
                          }`}
                        >
                          <span
                            className="w-9 h-9 rounded-full border border-white/30 shadow-inner"
                            style={{
                              background: `linear-gradient(135deg, ${paint.highlight}, ${paint.primary}, ${paint.secondary})`
                            }}
                          />
                          <span className="text-[10px] font-semibold text-center text-slate-200 line-clamp-1">
                            {paint.name.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Forged Wheels & Brake Calipers */}
                <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Disc className="w-4 h-4 text-cyan-400" /> 2. Forged Wheels & Ceramic Calipers
                  </h4>

                  <div className="space-y-2">
                    {WHEEL_STYLES.map((wheel) => {
                      const active = selectedWheel.id === wheel.id;
                      return (
                        <button
                          key={wheel.id}
                          onClick={() => setSelectedWheel(wheel)}
                          className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                            active
                              ? 'border-cyan-400 bg-cyan-500/10 text-white'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{wheel.name}</div>
                            <div className="text-[11px] text-slate-400">
                              Unsprung Mass: {wheel.weightDelta === 0 ? 'Standard' : `${wheel.weightDelta} kg`}
                            </div>
                          </div>
                          <div className="text-xs font-mono text-cyan-300 font-bold">
                            {wheel.priceMAD === 0 ? 'STD' : `+${formatPrice(wheel.priceMAD)}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Caliper Color Swatches */}
                  <div className="pt-2">
                    <div className="text-xs text-slate-400 mb-2">
                      Brake Caliper Finish: <strong className="text-white">{selectedCaliper.name}</strong>
                    </div>
                    <div className="flex items-center gap-3">
                      {CALIPER_COLORS.map((cal) => (
                        <button
                          key={cal.id}
                          onClick={() => setSelectedCaliper(cal)}
                          className={`w-8 h-8 rounded-full border-2 transition ${
                            selectedCaliper.id === cal.id ? 'border-white scale-110' : 'border-transparent opacity-75 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: cal.hex }}
                          title={cal.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Studio Environment & Glass Privacy Tint */}
                <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" /> 3. Studio Environment & Glazing
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    {STUDIO_BACKDROPS.map((env) => (
                      <button
                        key={env.id}
                        onClick={() => setSelectedBackdrop(env)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition text-left ${
                          selectedBackdrop.id === env.id
                            ? 'border-cyan-400 bg-cyan-500/15 text-white'
                            : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {env.name}
                      </button>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Acoustic Privacy Glass Tint</span>
                      <span className="font-mono text-cyan-300">{Math.round(windowTint * 100)}% Opacity</span>
                    </div>
                    <input
                      type="range"
                      min="0.25"
                      max="0.95"
                      step="0.05"
                      value={windowTint}
                      onChange={(e) => setWindowTint(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 4. Performance Engineering & Weight-Reduction Packages */}
                <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-rose-400" /> 4. Motorsport Engineering Upgrades
                  </h4>

                  <div className="space-y-2.5">
                    {TUNING_PACKAGES.map((pkg) => {
                      const isSelected = selectedTuningIds.includes(pkg.id);
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => {
                            setSelectedTuningIds((prev) =>
                              prev.includes(pkg.id) ? prev.filter((i) => i !== pkg.id) : [...prev, pkg.id]
                            );
                          }}
                          className={`p-3.5 rounded-xl border cursor-pointer transition ${
                            isSelected
                              ? 'border-rose-500/60 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                              : 'border-white/10 bg-white/5 hover:border-white/25'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border ${
                                  isSelected ? 'bg-rose-500 border-rose-400 text-white' : 'border-slate-500'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3" />}
                              </div>
                              <span className="text-xs font-bold text-white">{pkg.name}</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-rose-300 shrink-0">
                              +{formatPrice(pkg.priceMAD)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 pl-6">{pkg.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODULE 3: WEB AUDIO API ENGINE SOUND LAB & LAUNCH CONTROL */}
        {/* ================================================================== */}
        {activeTab === 'soundlab' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D111C] border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Redline / Exhaust Crackle Ambient Strobe Flash */}
              {crackleFlash && (
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-rose-500/10 to-transparent pointer-events-none animate-pulse" />
              )}

              {/* Top Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400 font-bold">
                    REAL-TIME WEB AUDIO SYNTHESIZER • ZERO EXTERNAL MP3S
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Acoustic Dyno & Launch Control Telemetry
                  </h2>
                </div>

                {/* Acoustic Engine Profile Selector */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'flat6', label: '9000 RPM Flat-6 Boxer' },
                    { id: 'v8', label: '4.0L Bi-Turbo V8 Crackles' },
                    { id: 'v12', label: '6.5L NA V12 Screamer' },
                    { id: 'ev', label: 'Hyper-EV Inverter Pulse' }
                  ].map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => {
                        ensureAudioReady();
                        setActiveAcoustic(prof.id);
                        if (engineAudioRef.current) {
                          engineAudioRef.current.configureProfile(prof.id);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                        activeAcoustic === prof.id
                          ? 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {prof.label}
                    </button>
                  ))}

                  <button
                    onClick={() => setAudioMuted(!audioMuted)}
                    className={`p-2.5 rounded-xl border transition ${
                      audioMuted
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-white/5 border-white/10 text-cyan-300'
                    }`}
                    title="Mute / Unmute Synthesizer"
                  >
                    {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Center Instrument Cluster: Circular SVG Tachometer + Live Dyno Telemetry */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-center">
                {/* Left 6 Cols: Interactive SVG Tachometer Gauge */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center">
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                    <svg viewBox="0 0 260 260" className="w-full h-full -rotate-90">
                      {/* Background Track Circle */}
                      <circle
                        cx="130"
                        cy="130"
                        r="108"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="16"
                        strokeDasharray="510 680"
                        strokeLinecap="round"
                      />
                      {/* Active RPM Glow Arc */}
                      <circle
                        cx="130"
                        cy="130"
                        r="108"
                        fill="none"
                        stroke={currentRpm > selectedCar.redline - 1000 ? '#F43F5E' : '#00F0FF'}
                        strokeWidth="16"
                        strokeDasharray={`${Math.min(510, (currentRpm / 9500) * 510)} 680`}
                        strokeLinecap="round"
                        className="transition-all duration-75"
                      />
                    </svg>

                    {/* Center Digital Readout */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                        GEAR
                      </span>
                      <div className="text-5xl font-black text-amber-400 font-mono leading-none my-1">
                        {currentSpeed === 0 && !isLaunching ? 'N' : currentGear}
                      </div>
                      <div className="text-3xl font-black text-white font-mono tracking-tight">
                        {Math.round(currentRpm)} <span className="text-xs text-cyan-400">RPM</span>
                      </div>
                      <div className="mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-mono font-bold text-emerald-400">
                        {currentSpeed} km/h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 6 Cols: Pedal & Paddle Shifter Controls + Live Dyno Output */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Live Dyno Power & Boost Bars */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                      <div className="text-xs text-slate-400">Instantaneous Dyno Power</div>
                      <div className="text-2xl font-black text-cyan-300 font-mono mt-1">
                        {Math.round(effectiveSpecs.hp * Math.pow(currentRpm / selectedCar.redline, 0.85))} HP
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 transition-all duration-75"
                          style={{ width: `${Math.min(100, (currentRpm / selectedCar.redline) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                      <div className="text-xs text-slate-400">Exhaust Manifold Temp & Crackle</div>
                      <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                        {Math.round(420 + (currentRpm / 9500) * 510)} °C
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-75"
                          style={{ width: `${Math.min(100, (currentRpm / 9500) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Accelerator Pedal & Paddle Shifters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onMouseDown={() => {
                        ensureAudioReady();
                        setIsRevving(true);
                      }}
                      onMouseUp={() => {
                        setIsRevving(false);
                        if (currentRpm > 3500 && engineAudioRef.current && !audioMuted) {
                          engineAudioRef.current.triggerExhaustCrackle(4);
                          setCrackleFlash(true);
                          setTimeout(() => setCrackleFlash(false), 250);
                        }
                      }}
                      onMouseLeave={() => setIsRevving(false)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        ensureAudioReady();
                        setIsRevving(true);
                      }}
                      onTouchEnd={() => {
                        setIsRevving(false);
                        if (currentRpm > 3500 && engineAudioRef.current && !audioMuted) {
                          engineAudioRef.current.triggerExhaustCrackle(4);
                        }
                      }}
                      className={`py-5 px-6 rounded-2xl font-black text-base tracking-wider uppercase transition flex items-center justify-center gap-3 select-none ${
                        isRevving
                          ? 'bg-rose-500 text-white shadow-[0_0_35px_rgba(244,63,94,0.6)] scale-[0.98]'
                          : 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 hover:brightness-110 shadow-[0_0_25px_rgba(244,63,94,0.3)]'
                      }`}
                    >
                      <Flame className="w-5 h-5" />
                      {isRevving ? 'REVVING THROTTLE!' : 'HOLD TO REV ENGINE'}
                    </button>

                    <button
                      onClick={startLaunchControl}
                      disabled={isLaunching}
                      className="py-5 px-6 rounded-2xl font-black text-sm tracking-wider uppercase bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 transition flex items-center justify-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      {isLaunching ? 'LAUNCHING 0-200...' : 'LAUNCH CONTROL 0-200'}
                    </button>
                  </div>

                  {/* Paddle Shifters */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleShiftGear(-1)}
                      className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white transition"
                    >
                      - DOWNSHIFT (REV-BLIP)
                    </button>
                    <button
                      onClick={() => {
                        ensureAudioReady();
                        if (engineAudioRef.current) {
                          engineAudioRef.current.triggerExhaustCrackle(6);
                        }
                        setCrackleFlash(true);
                        setTimeout(() => setCrackleFlash(false), 300);
                      }}
                      className="py-3.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-xs font-bold uppercase tracking-wider text-amber-300 transition"
                    >
                      POPS & BANGS BURST
                    </button>
                    <button
                      onClick={() => handleShiftGear(1)}
                      className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white transition"
                    >
                      + UPSHIFT GEAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODULE 4: HEAD-TO-HEAD VERSUS ARENA & 1/4 MILE DRAG SIMULATOR */}
        {/* ================================================================== */}
        {activeTab === 'versus' && (
          <div className="space-y-8">
            {/* Contender Selection Header */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-[#0D111C] p-5 rounded-2xl border border-white/10">
              <div className="md:col-span-5 space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  LANE 1 CONTENDER (CYAN)
                </label>
                <select
                  value={carAId}
                  onChange={(e) => setCarAId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-cyan-400/40 text-sm font-bold text-white focus:outline-none"
                >
                  {allComparableCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.hp} HP • {c.zeroToHundred}s)
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-1 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-black text-xs text-rose-300">
                  VS
                </div>
              </div>

              <div className="md:col-span-5 space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                  LANE 2 CONTENDER (ROSE)
                </label>
                <select
                  value={carBId}
                  onChange={(e) => setCarBId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-rose-400/40 text-sm font-bold text-white focus:outline-none"
                >
                  {allComparableCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.hp} HP • {c.zeroToHundred}s)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Interactive 1/4 Mile (400m) Drag Strip Simulator */}
            <div className="p-6 rounded-3xl bg-[#0D111C] border border-white/15 space-y-6 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                    LIVE 400-METER TELEMETRY DRAG STRIP
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    1/4 Mile Head-to-Head Launch Simulator
                  </h3>
                </div>

                {/* Christmas Tree Lights + Start Button */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-black/80 px-3.5 py-2 rounded-xl border border-white/10">
                    <span className={`w-3.5 h-3.5 rounded-full ${treeStage >= 1 ? 'bg-amber-300 shadow-[0_0_8px_#FCD34D]' : 'bg-slate-800'}`} />
                    <span className={`w-3.5 h-3.5 rounded-full ${treeStage >= 3 ? 'bg-amber-400 shadow-[0_0_8px_#FBBF24]' : 'bg-slate-800'}`} />
                    <span className={`w-3.5 h-3.5 rounded-full ${treeStage >= 4 ? 'bg-amber-500 shadow-[0_0_8px_#F59E0B]' : 'bg-slate-800'}`} />
                    <span className={`w-4 h-4 rounded-full ${treeStage >= 5 ? 'bg-emerald-400 shadow-[0_0_14px_#34D399]' : 'bg-slate-800'}`} />
                  </div>

                  <button
                    onClick={startDragRace}
                    disabled={dragState === 'countdown' || dragState === 'racing'}
                    className="px-6 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:brightness-110 transition shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {dragState === 'idle' ? 'Start 1/4 Mile Drag Race' : dragState === 'finished' ? 'Re-Run Drag Race' : 'Racing...'}
                  </button>
                </div>
              </div>

              {/* Animated Two-Lane Asphalt Track */}
              <div className="relative rounded-2xl bg-[#07090F] border border-white/10 p-4 sm:p-6 overflow-hidden space-y-6">
                {/* Distance Markers */}
                <div className="flex justify-between text-[10px] font-mono text-slate-500 border-b border-white/5 pb-2">
                  <span>START LINE (0m)</span>
                  <span>60 FT</span>
                  <span>1/8 MILE (200m)</span>
                  <span className="text-emerald-400 font-bold">FINISH 1/4 MILE (400m)</span>
                </div>

                {/* Lane 1: Car A */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cyan-300 font-bold">{carA.name}</span>
                    <span className="text-white">{raceProgress.speedA} km/h</span>
                  </div>
                  <div className="relative h-10 bg-slate-900/90 rounded-xl border border-white/5 flex items-center px-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-400 transition-none"
                      style={{ width: `${raceProgress.posA}%` }}
                    />
                    <div
                      className="w-7 h-7 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_15px_#00F0FF] -ml-3 transition-none"
                      style={{ left: `${raceProgress.posA}%` }}
                    >
                      <Car className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Center Dashed Strip Divider */}
                <div className="border-t border-dashed border-amber-400/30" />

                {/* Lane 2: Car B */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-rose-300 font-bold">{carB.name}</span>
                    <span className="text-white">{raceProgress.speedB} km/h</span>
                  </div>
                  <div className="relative h-10 bg-slate-900/90 rounded-xl border border-white/5 flex items-center px-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-rose-500/20 to-rose-500 transition-none"
                      style={{ width: `${raceProgress.posB}%` }}
                    />
                    <div
                      className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-[0_0_15px_#F43F5E] -ml-3 transition-none"
                      style={{ left: `${raceProgress.posB}%` }}
                    >
                      <Car className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Quarter-Mile Time Slip Results */}
              {raceProgress.resultA && raceProgress.resultB && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {[
                    { car: carA, res: raceProgress.resultA, isWinner: raceProgress.resultA.total <= raceProgress.resultB.total, accent: 'cyan' },
                    { car: carB, res: raceProgress.resultB, isWinner: raceProgress.resultB.total < raceProgress.resultA.total, accent: 'rose' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border ${
                        item.isWinner
                          ? 'bg-emerald-500/10 border-emerald-400/50'
                          : 'bg-white/5 border-white/10'
                      } flex items-center justify-between`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          {item.isWinner && (
                            <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-400 text-slate-950">
                              WINNER
                            </span>
                          )}
                          <span className="text-sm font-bold text-white">{item.car.name}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-1">
                          Reaction: {item.res.rt}s • Trap Speed: <strong className="text-white">{item.res.trap} km/h</strong>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-[10px] text-slate-400 uppercase">1/4 Mile ET</div>
                        <div className="text-2xl font-black text-emerald-400">{item.res.et}s</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 6-Axis Radar Chart & Side-by-Side Spec Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left 5 Cols: SVG Spider Radar Chart */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0D111C] border border-white/10 flex flex-col items-center">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
                  6-Axis Performance Envelope
                </h4>
                <svg viewBox="0 0 260 260" className="w-64 h-64">
                  {/* Concentric Hexagon Web */}
                  {[0.33, 0.66, 1].map((scale, i) => (
                    <polygon
                      key={i}
                      points={getRadarPoints(
                        { accel: 100 * scale, topSpeed: 100 * scale, handling: 100 * scale, braking: 100 * scale, comfort: 100 * scale, exclusivity: 100 * scale },
                        95
                      )}
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Car A Polygon */}
                  <polygon
                    points={getRadarPoints(carA.radar, 95)}
                    fill="rgba(0, 240, 255, 0.22)"
                    stroke="#00F0FF"
                    strokeWidth="2.5"
                  />
                  {/* Car B Polygon */}
                  <polygon
                    points={getRadarPoints(carB.radar, 95)}
                    fill="rgba(244, 63, 94, 0.22)"
                    stroke="#F43F5E"
                    strokeWidth="2.5"
                  />
                  {/* Axis Labels */}
                  <text x="130" y="22" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="bold">ACCEL</text>
                  <text x="232" y="78" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="bold">V-MAX</text>
                  <text x="232" y="192" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="bold">G-FORCE</text>
                  <text x="130" y="248" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="bold">BRAKING</text>
                  <text x="28" y="192" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="bold">COMFORT</text>
                  <text x="28" y="78" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="bold">RARITY</text>
                </svg>
                <div className="flex items-center gap-6 text-xs mt-2">
                  <span className="flex items-center gap-2 text-cyan-300 font-bold">
                    <span className="w-3 h-3 rounded-full bg-cyan-400" /> {carA.name.split(' ')[1]}
                  </span>
                  <span className="flex items-center gap-2 text-rose-300 font-bold">
                    <span className="w-3 h-3 rounded-full bg-rose-500" /> {carB.name.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* Right 7 Cols: Spec Delta Bars */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D111C] border border-white/10 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Direct Telemetry Comparison
                </h4>
                {[
                  { label: 'Horsepower', valA: carA.hp, valB: carB.hp, unit: 'HP', higherBetter: true },
                  { label: 'Peak Torque', valA: carA.torque, valB: carB.torque, unit: 'Nm', higherBetter: true },
                  { label: '0-100 km/h Sprint', valA: carA.zeroToHundred, valB: carB.zeroToHundred, unit: 's', higherBetter: false },
                  { label: 'Top Speed (V-Max)', valA: carA.topSpeed, valB: carB.topSpeed, unit: 'km/h', higherBetter: true },
                  { label: 'Curb Weight', valA: carA.weight, valB: carB.weight, unit: 'kg', higherBetter: false }
                ].map((row, idx) => {
                  const aWins = row.higherBetter ? row.valA >= row.valB : row.valA <= row.valB;
                  return (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className={aWins ? 'text-cyan-300 font-black' : 'text-slate-400'}>
                          {row.valA} {row.unit} {aWins && '★'}
                        </span>
                        <span className="text-slate-300 font-sans font-bold uppercase tracking-wider text-[11px]">
                          {row.label}
                        </span>
                        <span className={!aWins ? 'text-rose-400 font-black' : 'text-slate-400'}>
                          {!aWins && '★'} {row.valB} {row.unit}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 h-2">
                        <div className="bg-slate-800 rounded-full overflow-hidden flex justify-end">
                          <div
                            className="bg-cyan-400 h-full"
                            style={{ width: `${Math.min(100, (row.valA / Math.max(row.valA, row.valB)) * 100)}%` }}
                          />
                        </div>
                        <div className="bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="bg-rose-500 h-full"
                            style={{ width: `${Math.min(100, (row.valB / Math.max(row.valA, row.valB)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODULE 5: FINANCE, LOA LEASING & MOROCCAN VIGNETTE CALCULATOR */}
        {/* ================================================================== */}
        {activeTab === 'finance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Interactive Sliders */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0D111C] border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                    MOROCCO & INTERNATIONAL BESPOKE FINANCING
                  </span>
                  <h2 className="text-2xl font-black text-white mt-0.5">
                    {selectedCar.name}
                  </h2>
                </div>

                <div className="flex bg-black/50 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setFinanceMode('loa')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      financeMode === 'loa' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    LOA Leasing
                  </button>
                  <button
                    onClick={() => setFinanceMode('credit')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      financeMode === 'credit' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Crédit Classique
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-slate-300 font-semibold">Down Payment / Apport Initial ({downPaymentPct}%)</span>
                    <span className="font-mono font-bold text-cyan-300">{formatPrice(financeMetrics.downPaymentMAD)}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    step="5"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-slate-300 font-semibold">Contract Duration / Durée</span>
                    <span className="font-mono font-bold text-white">{durationMonths} Months ({ (durationMonths / 12).toFixed(1) } Years)</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-slate-300 font-semibold">Annual Interest Rate (TAEG)</span>
                    <span className="font-mono font-bold text-amber-400">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max="9.5"
                    step="0.2"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                {financeMode === 'loa' && (
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="text-slate-300 font-semibold">Residual Buyback / Valeur Résiduelle ({residualPct}%)</span>
                      <span className="font-mono font-bold text-emerald-400">{formatPrice(financeMetrics.residualMAD)}</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="55"
                      step="5"
                      value={residualPct}
                      onChange={(e) => setResidualPct(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Moroccan Fiscal & Vignette (TSAVA) Breakdown Box */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <ShieldIcon /> Fiscalité Marocaine (Puissance Fiscale & Vignette TSAVA)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-slate-400">Puissance Fiscale</div>
                    <div className="text-base font-black text-white font-mono mt-0.5">
                      {financeMetrics.fiscalCV} CV ({selectedCar.fuelType})
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-slate-400">Vignette Annuelle</div>
                    <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                      {financeMetrics.annualVignetteMAD === 0
                        ? '0 DH (Exonéré)'
                        : formatPrice(financeMetrics.annualVignetteMAD)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 col-span-2 sm:col-span-1">
                    <div className="text-slate-400">Taxe Luxe Immatriculation</div>
                    <div className="text-base font-black text-rose-300 font-mono mt-0.5">
                      {formatPrice(financeMetrics.luxuryRegistrationTaxMAD)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Monthly Summary Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#111827] to-[#0D111C] border border-cyan-400/30 space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  Estimated Monthly Lease / Payment
                </span>
                <div className="text-4xl sm:text-5xl font-black text-cyan-300 font-mono">
                  {formatPrice(financeMetrics.monthlyInstallmentMAD)}
                  <span className="text-sm text-slate-400 font-normal"> / mo</span>
                </div>
                <p className="text-xs text-slate-400">
                  Total All-Inclusive Monthly Ownership: <strong className="text-white">{formatPrice(financeMetrics.totalMonthlyCostMAD)}/mo</strong>
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Configured Vehicle Total</span>
                  <span className="font-mono font-bold text-white">{formatPrice(financeMetrics.vehiclePriceMAD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Down Payment ({downPaymentPct}%)</span>
                  <span className="font-mono font-bold text-cyan-300">{formatPrice(financeMetrics.downPaymentMAD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Prestige All-Risk Insurance (Est.)</span>
                  <span className="font-mono font-bold text-slate-200">{formatPrice(financeMetrics.monthlyInsuranceMAD)} / mo</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('vip')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider hover:brightness-110 transition shadow-[0_0_25px_rgba(0,240,255,0.3)]"
              >
                Reserve Build & Book VIP Track Pass
              </button>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODULE 6: VIP TEST DRIVE & DIGITAL GARAGE BOARDING PASS */}
        {/* ================================================================== */}
        {activeTab === 'vip' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 Cols: Booking Form & Saved Garage Builds */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-3xl bg-[#0D111C] border border-white/10 space-y-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" /> Book Private Track or Showroom Experience
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">VIP Client Full Name</label>
                    <input
                      type="text"
                      value={vipClientName}
                      onChange={(e) => setVipClientName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Select Moroccan Motorsport Hub</label>
                    <div className="space-y-2">
                      {MOROCCAN_VIP_HUBS.map((hub) => (
                        <div
                          key={hub.id}
                          onClick={() => setSelectedHub(hub)}
                          className={`p-3 rounded-xl border cursor-pointer transition ${
                            selectedHub.id === hub.id
                              ? 'border-cyan-400 bg-cyan-500/10'
                              : 'border-white/10 bg-white/5 hover:border-white/25'
                          }`}
                        >
                          <div className="flex justify-between text-xs font-bold text-white">
                            <span>{hub.city} — {hub.name}</span>
                            <span className="text-cyan-400">{hub.trackType.split(' ')[0]}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{hub.address}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={vipDate}
                        onChange={(e) => setVipDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Session Slot</label>
                      <select
                        value={vipTimeSlot}
                        onChange={(e) => setVipTimeSlot(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white"
                      >
                        <option>10:30 Morning Telemetry Run</option>
                        <option>16:30 Sunset Track Session</option>
                        <option>20:00 Private Nocturne Salon</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setGeneratedPass({
                        passCode: `APEX-MA-${Math.floor(100000 + Math.random() * 900000)}`,
                        client: vipClientName,
                        car: selectedCar.name,
                        paint: selectedPaint.name,
                        hp: effectiveSpecs.hp,
                        price: formatPrice(effectiveSpecs.totalPriceMAD),
                        hub: selectedHub,
                        date: vipDate,
                        slot: vipTimeSlot
                      });
                      triggerToast('VIP Digital Track Boarding Pass Generated!');
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition"
                  >
                    Generate VIP Track Boarding Pass
                  </button>
                </div>
              </div>

              {/* Saved Custom Builds Garage */}
              <div className="p-6 rounded-3xl bg-[#0D111C] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  My Saved Atelier Builds ({savedGarage.length})
                </h4>
                {savedGarage.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{b.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {b.paintName} • {b.zeroToHundred}s • {formatPrice(b.basePriceMAD)}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCarAId(b.id);
                        setActiveTab('versus');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30"
                    >
                      Race in Versus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: Interactive VIP Digital Boarding Pass */}
            <div className="lg:col-span-6">
              {(() => {
                const pass = generatedPass || {
                  passCode: 'APEX-MA-992841',
                  client: vipClientName,
                  car: selectedCar.name,
                  paint: selectedPaint.name,
                  hp: effectiveSpecs.hp,
                  price: formatPrice(effectiveSpecs.totalPriceMAD),
                  hub: selectedHub,
                  date: vipDate,
                  slot: vipTimeSlot
                };
                return (
                  <div className="rounded-3xl overflow-hidden border border-cyan-400/40 bg-gradient-to-b from-[#0F172A] to-[#080B12] shadow-[0_0_40px_rgba(0,240,255,0.18)] p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-dashed border-white/20 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-400 text-slate-950 font-black">
                          VIP PADDOCK & SALON ACCESS
                        </span>
                        <h3 className="text-xl font-black text-white mt-2">{pass.hub.name}</h3>
                        <p className="text-xs text-slate-400">{pass.hub.address}</p>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-[10px] text-slate-400">PASS ID</div>
                        <div className="text-sm font-bold text-cyan-300">{pass.passCode}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-white/5">
                        <div className="text-slate-400">VIP Driver / Guest</div>
                        <div className="text-sm font-bold text-white mt-0.5">{pass.client}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <div className="text-slate-400">Session Date & Slot</div>
                        <div className="text-sm font-bold text-amber-300 mt-0.5">{pass.date}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 col-span-2">
                        <div className="text-slate-400">Prepared Atelier Vehicle</div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          {pass.car} — {pass.paint} ({pass.hp} HP)
                        </div>
                        <div className="text-xs text-cyan-300 font-mono mt-0.5">
                          Valuation: {pass.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-white/20">
                      <div className="text-xs text-slate-400 max-w-xs">
                        Present this digital telemetry pass at the {pass.hub.city} VIP Concierge gate for immediate track pitlane preparation.
                      </div>
                      {/* Procedural QR Code SVG */}
                      <svg viewBox="0 0 60 60" className="w-16 h-16 bg-white p-1.5 rounded-xl shrink-0">
                        <rect x="4" y="4" width="16" height="16" fill="#06080E" />
                        <rect x="40" y="4" width="16" height="16" fill="#06080E" />
                        <rect x="4" y="40" width="16" height="16" fill="#06080E" />
                        <rect x="24" y="12" width="10" height="10" fill="#06080E" />
                        <rect x="24" y="28" width="16" height="16" fill="#06080E" />
                        <rect x="44" y="44" width="12" height="12" fill="#06080E" />
                      </svg>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Small helper icon component for Moroccan Fiscal box
const ShieldIcon = () => (
  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
  </svg>
);