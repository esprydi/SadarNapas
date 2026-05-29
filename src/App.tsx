/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, RotateCcw, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BreathingVisualizer } from './components/BreathingVisualizer';
import { ManifestationText } from './components/ManifestationText';
import { EducationModal } from './components/EducationModal';
import { playChime, playFinishChime, stopAudio } from './lib/audio';
import { SessionState, BreathingPhase, DURATION_OPTIONS } from './types';

export default function App() {
  const [sessionState, setSessionState] = useState<SessionState>('IDLE');
  const [phase, setPhase] = useState<BreathingPhase>('INHALE');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionDuration, setSessionDuration] = useState(DURATION_OPTIONS[0].value);
  const [timeLeft, setTimeLeft] = useState(DURATION_OPTIONS[0].value);
  const [cycleCount, setCycleCount] = useState(0);
  const [customMinutes, setCustomMinutes] = useState("");
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  
  const soundEnabledRef = useRef(soundEnabled);
  
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Prevent zooming on double click on mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, []);

  useEffect(() => {
    if (sessionState !== 'ACTIVE') return;

    let tickIntervalId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let isTimeUp = false;

    let currentPhase: BreathingPhase = 'INHALE';
    let ticksInPhase = 0;
    let phaseDurationTicks = 6;

    const triggerAudio = (tick: number) => {
      if (!soundEnabledRef.current) return;
      if (tick === 0) {
        playChime();
      }
    };

    const advancePhase = () => {
      if (currentPhase === 'INHALE') {
        currentPhase = 'HOLD_FULL';
        phaseDurationTicks = 8;
      } else if (currentPhase === 'HOLD_FULL') {
        currentPhase = 'EXHALE';
        phaseDurationTicks = 9;
      } else if (currentPhase === 'EXHALE') {
        const remaining = endTime - Date.now();
        if (isTimeUp || remaining <= 31000) {
          setSessionState('FINISHED');
          return;
        }
        currentPhase = 'HOLD_EMPTY';
        phaseDurationTicks = 8;
      } else if (currentPhase === 'HOLD_EMPTY') {
        if (isTimeUp) {
          setSessionState('FINISHED');
          return;
        }
        currentPhase = 'INHALE';
        phaseDurationTicks = 6;
        setCycleCount(c => c + 1);
      }
      
      ticksInPhase = 0;
      setPhase(currentPhase);
      
      if (!(isTimeUp && currentPhase === 'INHALE')) {
        triggerAudio(0);
      }
    };

    // Initial Start
    setPhase('INHALE');
    triggerAudio(0);

    tickIntervalId = setInterval(() => {
      ticksInPhase++;
      
      if (ticksInPhase >= phaseDurationTicks) {
        advancePhase();
      } else {
        triggerAudio(ticksInPhase);
      }
    }, 1000);

    const endTime = Date.now() + timeLeft;
    
    intervalId = setInterval(() => {
      const remaining = endTime - Date.now();
      if (remaining <= 0) {
        isTimeUp = true;
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 100); 

    return () => {
      clearInterval(tickIntervalId);
      clearInterval(intervalId);
      stopAudio();
    };
  }, [sessionState]);

  useEffect(() => {
    if (sessionState === 'FINISHED' && soundEnabledRef.current) {
      const t = setTimeout(() => {
        playFinishChime();
      }, 500);
      return () => clearTimeout(t);
    }
  }, [sessionState]);

  const startSession = () => {
    setSessionState('ACTIVE');
    setTimeLeft(sessionDuration);
    setCycleCount(0);
    setPhase('INHALE');
  };

  const resetSession = () => {
    setSessionState('IDLE');
    stopAudio();
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-teal-500/30 flex flex-col relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-teal-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="p-6 flex justify-between items-center relative z-10 w-full max-w-2xl mx-auto">
        <h1 className="text-xl font-medium tracking-wide text-teal-50">Sadar<span className="text-teal-400">Napas</span></h1>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEducationOpen(true)}
            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 text-teal-200 transition-colors"
            aria-label="Informasi Manfaat SadarNapas"
            title="Informasi Manfaat SadarNapas"
          >
            <Info size={20} />
          </button>
          
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 text-teal-200 transition-colors"
            aria-label={soundEnabled ? "Nonaktifkan Suara Singing Bowl" : "Aktifkan Suara Singing Bowl"}
            title={soundEnabled ? "Nonaktifkan Suara Singing Bowl" : "Aktifkan Suara Singing Bowl"}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          
          {sessionState === 'IDLE' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Temukan Kembali<br/>Fokus Anda
                </h2>
                <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">
                  Latihan pernapasan untuk menenangkan sistem saraf dan menyiapkan mental sebelum bekerja.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSessionDuration(opt.value);
                        setCustomMinutes("");
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        sessionDuration === opt.value && customMinutes === ""
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                          : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-400">Atau kustom:</span>
                  <div className="relative group">
                    <input
                      type="number"
                      min="1"
                      max="60"
                      placeholder="Menit"
                      value={customMinutes}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomMinutes(val);
                        const parsed = parseInt(val);
                        if (!isNaN(parsed) && parsed > 0) {
                          setSessionDuration(parsed * 60000);
                        }
                      }}
                      className={`w-28 px-4 py-2 border rounded-full text-center text-sm font-medium focus:outline-none transition-all duration-300 ${
                        customMinutes !== "" && parseInt(customMinutes) > 0
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                          : 'bg-slate-800/50 text-slate-300 border-transparent hover:bg-slate-800 focus:border-teal-500/30'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={startSession}
                className="group relative inline-flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-400 text-teal-950 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:-translate-y-1"
              >
                <Play className="w-5 h-5 fill-teal-950" />
                Mulai Sesi Fokus
              </button>
            </motion.div>
          )}

          {sessionState === 'ACTIVE' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-12 font-mono text-xl text-teal-300/60 font-medium tracking-widest">
                {formatTime(timeLeft)}
              </div>
              
              <div className="mb-16">
                <BreathingVisualizer phase={phase} />
              </div>

              <div className="h-24 flex items-center">
                 <ManifestationText cycleCount={cycleCount} />
              </div>

              <button
                onClick={resetSession}
                className="mt-8 text-slate-500 hover:text-slate-300 underline underline-offset-4 text-sm transition-colors"
                aria-label="Batalkan Sesi"
              >
                Batalkan Sesi
              </button>
            </motion.div>
          )}

          {sessionState === 'FINISHED' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="w-24 h-24 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Sesi Selesai
                </h2>
                <p className="text-teal-100 max-w-sm mx-auto text-lg leading-relaxed">
                  Kamu siap bekerja. Penuh fokus, tenang, dan siap berkarya. Selamat berkreasi!
                </p>
              </div>

              <button
                onClick={resetSession}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-full transition-colors mt-4"
              >
                <RotateCcw className="w-4 h-4" />
                Kembali ke Beranda
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <EducationModal 
        isOpen={isEducationOpen} 
        onClose={() => setIsEducationOpen(false)} 
      />
    </div>
  );
}
