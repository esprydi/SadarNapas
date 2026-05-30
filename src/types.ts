export type SessionState = 'IDLE' | 'PREPARING' | 'ACTIVE' | 'FINISHED';
export type BreathingPhase = 'INHALE' | 'HOLD_FULL' | 'EXHALE' | 'HOLD_EMPTY';

export const AFFIRMATIONS = [
  "Saya merasa tenang dan fokus.",
  "Hari ini saya akan sangat produktif.",
  "Pikiran saya jernih dan tajam.",
  "Setiap tarikan napas membawa ketenangan.",
  "Saya siap menghadapi tantangan hari ini.",
  "Energi positif mengalir dalam diri saya.",
  "Saya menerima kedamaian dan melepas beban."
];

export const DURATION_OPTIONS = [
  { label: '3 Menit', value: 180000 },
  { label: '5 Menit', value: 300000 },
  { label: '10 Menit', value: 600000 },
];
