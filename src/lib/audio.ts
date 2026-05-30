let audioContext: AudioContext | null = null;

export const playChime = () => {
  if (typeof window === 'undefined') return;

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
        audioContext = new AudioContextClass();
    } else {
        return;
    }
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const t = audioContext.currentTime;

  // Frequencies for a Tibetan Singing Bowl
  const fundamental = 174; // Deep resonating frequency
  
  createOscillatorAndEnvelope(fundamental, t, 0.5, 8); // Fundamental
  createOscillatorAndEnvelope(fundamental * 2.76, t, 0.2, 6); // Metallic harmonic 1
  createOscillatorAndEnvelope(fundamental * 5.4, t, 0.1, 4); // Metallic harmonic 2
};

export const playFinishChime = () => {
  if (typeof window === 'undefined') return;

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
        audioContext = new AudioContextClass();
    } else {
        return;
    }
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const t = audioContext.currentTime;

  // Ascending three strikes for finish
  const fundamental1 = 174;
  const fundamental2 = 220; // A3
  const fundamental3 = 261.63; // C4

  // First strike
  createOscillatorAndEnvelope(fundamental1, t, 0.4, 6); 
  createOscillatorAndEnvelope(fundamental1 * 2.76, t, 0.15, 4); 

  // Second strike
  createOscillatorAndEnvelope(fundamental2, t + 1.2, 0.4, 6); 
  createOscillatorAndEnvelope(fundamental2 * 2.76, t + 1.2, 0.15, 4); 

  // Third strike
  createOscillatorAndEnvelope(fundamental3, t + 2.4, 0.5, 8); 
  createOscillatorAndEnvelope(fundamental3 * 2.76, t + 2.4, 0.2, 6); 
  createOscillatorAndEnvelope(fundamental3 * 5.4, t + 2.4, 0.1, 4); 
};

const createOscillatorAndEnvelope = (freq: number, startTime: number, maxGain: number, decayTime: number) => {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);
  
  // Strike sound: smooth attack
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(maxGain, startTime + 0.1);
  
  // Smooth, long exponential decay
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + decayTime);
  
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  osc.start(startTime);
  osc.stop(startTime + decayTime);
};

export const playTick = () => {
  if (typeof window === 'undefined') return;

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
        audioContext = new AudioContextClass();
    } else {
        return;
    }
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const t = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, t); // A4
  
  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(0.1, t + 0.05); // quick attack
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.2); // quick decay
  
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  osc.start(t);
  osc.stop(t + 0.2);
};

export const stopAudio = () => {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
};
