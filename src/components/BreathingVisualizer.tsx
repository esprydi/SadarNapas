import { motion } from 'motion/react';
import type { BreathingPhase } from '../types';

interface BreathingVisualizerProps {
  phase: BreathingPhase;
}

const phaseVariants = {
  INHALE: { 
    scale: 1.8, 
    opacity: 1, 
    transition: { duration: 5, ease: "linear" } 
  },
  HOLD_FULL: { 
    scale: 1.8, 
    opacity: 0.8,
    transition: { duration: 4, ease: "linear" } 
  },
  EXHALE: { 
    scale: 1, 
    opacity: 0.6,
    transition: { duration: 7, ease: "linear" } 
  },
  HOLD_EMPTY: {
    scale: 1,
    opacity: 0.4,
    transition: { duration: 4, ease: "linear" }
  }
};

export function BreathingVisualizer({ phase }: BreathingVisualizerProps) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer Glow */}
      <motion.div
        variants={phaseVariants}
        initial="HOLD_EMPTY"
        animate={phase}
        className="absolute w-40 h-40 rounded-full bg-teal-500/20 blur-2xl"
      />
      {/* Main Circle */}
      <motion.div
        variants={phaseVariants}
        initial="HOLD_EMPTY"
        animate={phase}
        className="relative w-32 h-32 rounded-full border border-teal-300 shadow-[0_0_30px_rgba(45,212,191,0.4)] bg-gradient-to-tr from-teal-900/40 to-teal-800/40 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="text-teal-200 font-medium text-sm tracking-widest uppercase opacity-70">
          {phase === 'INHALE' && 'Tarik'}
          {phase === 'HOLD_FULL' && 'Tahan'}
          {phase === 'EXHALE' && 'Hembus'}
          {phase === 'HOLD_EMPTY' && 'Tahan'}
        </div>
      </motion.div>
    </div>
  );
}

