import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Cpu } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    const step1 = setTimeout(() => setStep(1), 300);
    const step2 = setTimeout(() => setStep(2), 900);

    return () => {
      clearInterval(interval);
      clearTimeout(step1);
      clearTimeout(step2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-950 text-white overflow-hidden"
      >
        {/* Ambient background glows */}
        <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none -bottom-20 -right-20 animate-pulse-slow" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center">
          {/* Logo Badge Icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,242,254,0.25)] relative"
          >
            <Code2 className="w-8 h-8 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </motion.div>

          {/* Name Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1 mb-3"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-mono">
              ENGINEER & DEVELOPER
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
              SAHNOUNE CHAOUCHE <span className="gradient-text">ABDERREZAK</span>
            </h1>
          </motion.div>

          {/* Subtitle / Role Reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-sm sm:text-base text-slate-400 mb-8"
          >
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300">FULL-STACK</span>
            <span className="text-cyan-400 font-semibold">&lt;WEB & DESKTOP /&gt;</span>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900/80 rounded-full h-1.5 p-0.5 border border-slate-800 relative overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-600 rounded-full shadow-[0_0_12px_rgba(0,242,254,0.6)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Status logs */}
          <div className="flex justify-between items-center w-full text-xs font-mono text-slate-500 px-1">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{progress < 40 ? 'Initializing Environment...' : progress < 80 ? 'Loading Modules & Assets...' : 'System Ready.'}</span>
            </div>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
