import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Brain, Wind, Sparkles, Moon } from 'lucide-react';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EducationModal({ isOpen, onClose }: EducationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-semibold text-white tracking-wide">
                Tentang SadarNapas
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Tutup menu edukasi"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              
              <section className="space-y-3">
                <p className="text-slate-300 leading-relaxed text-lg">
                  <strong className="text-teal-400">SadarNapas</strong> adalah metode pernapasan berkesadaran (mindful breathing) yang dirancang untuk membawa keseimbangan pada sistem saraf Anda. Melalui pola napas yang teratur, Anda memberikan sinyal aman kepada tubuh untuk rileks dan fokus.
                </p>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  Manfaat Utama
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-teal-400" />
                    </div>
                    <h4 className="font-medium text-white">Meningkatkan Fokus</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Mengembalikan porsi oksigen optimal ke otak, membantu menjernihkan pikiran dan meningkatkan konsentrasi sebelum bekerja.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Wind className="w-5 h-5 text-teal-400" />
                    </div>
                    <h4 className="font-medium text-white">Meredakan Stres</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Menurunkan kadar kortisol (hormon stres) melalui aktivasi sistem saraf parasimpatik untuk ketenangan instan.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-teal-400" />
                    </div>
                    <h4 className="font-medium text-white">Regulasi Emosi</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Memberikan jeda antara stimulus dan respons, sehingga Anda dapat mengambil keputusan dengan lebih bijaksana dan kepala dingin.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Moon className="w-5 h-5 text-teal-400" />
                    </div>
                    <h4 className="font-medium text-white">Kualitas Tidur</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Latihan rutin dapat membantu menenangkan pikiran yang berlarian (racing thoughts), memudahkan Anda untuk tidur lebih lelap.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-lg font-medium text-white">Bagaimana cara melakukannya?</h3>
                <ol className="space-y-4 text-slate-300">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono text-teal-400">1</span>
                    <p><strong className="text-white">Tarik napas (Inhale)</strong> melalui hidung dengan perlahan hingga paru-paru terisi penuh.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono text-teal-400">2</span>
                    <p><strong className="text-white">Tahan (Hold)</strong> napas sejenak, rasakan udara di dalam tubuh Anda.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono text-teal-400">3</span>
                    <p><strong className="text-white">Hembuskan (Exhale)</strong> perlahan melalui mulut atau hidung, lepaskan semua ketegangan.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono text-teal-400">4</span>
                    <p><strong className="text-white">Jeda (Hold Empty)</strong> sejenak sebelum mengambil napas berikutnya.</p>
                  </li>
                </ol>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
