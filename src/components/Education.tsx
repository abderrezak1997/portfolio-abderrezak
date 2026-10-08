import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Education: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { education } = usePortfolioData();

  return (
    <section id="education" className="relative py-24 bg-dark-900/40">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(138,43,226,0.15)]"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.education.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mb-3"
          >
            {t.education.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl"
          >
            {t.education.subtitle}
          </motion.p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  {/* Period Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs font-bold">
                      {item.period}
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                    {item.degree[language]}
                  </h3>

                  {/* Institution */}
                  <div className="text-xs font-semibold text-purple-300 mb-4">
                    {item.institution}
                  </div>

                  {/* Details */}
                  {item.details && (
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {item.details[language]}
                    </p>
                  )}
                </div>

                {/* Verified Degree Tag */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Diploma</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
