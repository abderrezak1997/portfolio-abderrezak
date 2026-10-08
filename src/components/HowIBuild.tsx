import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitMerge, Search, Compass, Code, ShieldCheck, Rocket, 
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { howIBuildSteps } from '../data/portfolioData';

export const HowIBuild: React.FC = () => {
  const { language, t, isRTL } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    SearchCheck: <Search className="w-6 h-6 text-cyan-400" />,
    Compass: <Compass className="w-6 h-6 text-sky-400" />,
    Code: <Code className="w-6 h-6 text-purple-400" />,
    ShieldAlert: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    Rocket: <Rocket className="w-6 h-6 text-pink-400" />,
  };

  return (
    <section id="process" className="relative py-24 bg-dark-950/80 overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(138,43,226,0.15)]"
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>{t.howIBuild.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mb-3"
          >
            {t.howIBuild.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl"
          >
            {t.howIBuild.subtitle}
          </motion.p>
        </div>

        {/* Steps Horizontal / Grid Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {howIBuildSteps.map((item, index) => {
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative group"
              >
                {/* Connecting Line between cards on desktop */}
                {index < howIBuildSteps.length - 1 && (
                  <div
                    className={`hidden md:block absolute top-1/2 ${
                      isRTL ? '-left-3' : '-right-3'
                    } w-6 h-0.5 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 z-0 pointer-events-none`}
                  />
                )}

                <div className="glass-card glass-card-hover rounded-2xl p-6 h-full flex flex-col justify-between border border-slate-800 relative z-10 overflow-hidden">
                  {/* Subtle top glow bar */}
                  <div
                    className="absolute top-0 inset-x-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: item.color }}
                  />

                  <div>
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-cyan-400 transition-colors">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center shadow-inner group-hover:border-cyan-400/50 group-hover:scale-110 transition-all">
                        {iconMap[item.iconName] || <Code className="w-6 h-6 text-cyan-400" />}
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.title[language]}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.subtitle[language]}
                    </p>
                  </div>

                  {/* Micro badge indicator */}
                  <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Phase {item.step}</span>
                    <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ready &#10003;
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
