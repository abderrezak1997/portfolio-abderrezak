import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2, 
  Sparkles, Server, HardDrive, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Experience: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { experiences } = usePortfolioData();

  return (
    <section id="experience" className="relative py-24 bg-dark-900/50">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.experience.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mb-3"
          >
            {t.experience.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl"
          >
            {t.experience.subtitle}
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="space-y-8 relative">
          
          {/* Vertical line indicator */}
          <div
            className={`hidden md:block absolute top-4 bottom-4 ${
              isRTL ? 'right-[23px]' : 'left-[23px]'
            } w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-slate-800 pointer-events-none`}
          />

          {experiences.map((exp, index) => {
            const isFeatured = exp.featured;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
              >
                {/* Node marker */}
                <div className="hidden md:flex relative z-10 w-12 h-12 rounded-2xl bg-slate-950 border-2 border-cyan-400 items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.35)] shrink-0 group-hover:scale-110 group-hover:border-purple-400 transition-all">
                  <Briefcase className="w-5 h-5 text-cyan-300" />
                </div>

                {/* Experience Card */}
                <div
                  className={`w-full glass-card rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                    isFeatured
                      ? 'border-cyan-500/40 bg-slate-950/90 shadow-[0_10px_35px_-10px_rgba(0,242,254,0.15)] ring-1 ring-cyan-500/20'
                      : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role[language]}
                        </h3>
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-bold shadow-sm">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            <span>{t.experience.flagshipBadge}</span>
                          </span>
                        )}
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-bold">
                            {t.experience.presentBadge}
                          </span>
                        )}
                      </div>

                      <div className="text-base sm:text-lg font-bold text-slate-200">
                        {exp.organization}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 gap-1">
                      <div className="flex items-center gap-1.5 text-cyan-300">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period[language]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tasks / Highlights */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 mb-6">
                    {exp.tasks[language].map((task, taskIdx) => (
                      <div key={taskIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live Project Links for Featured Experience */}
                  {exp.links && exp.links.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                        <Server className="w-4 h-4 text-cyan-400" />
                        <span>Deployed Platforms:</span>
                      </span>
                      {exp.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-mono font-bold transition-all shadow-sm group/btn"
                        >
                          <span>{link.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-slate-500 mr-1 rtl:ml-1">
                      Stack:
                    </span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
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
