import { AnimatePresence, motion } from 'motion/react';
import { AFFIRMATIONS } from '../types';

interface ManifestationTextProps {
  cycleCount: number;
}

export function ManifestationText({ cycleCount }: ManifestationTextProps) {
  const currentText = AFFIRMATIONS[cycleCount % AFFIRMATIONS.length];

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-center text-teal-100 font-medium text-lg md:text-xl px-6 max-w-md"
        >
          {currentText}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
