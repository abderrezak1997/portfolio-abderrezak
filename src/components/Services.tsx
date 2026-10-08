import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, Globe2, Server, Database, Laptop, Cpu, ShieldCheck, 
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Services: React.FC = () => {
  const { language, t } = useLanguage();
  const { services } = usePortfolioData();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe2': return <Globe2 className="w-6 h-6 text-cyan-400" />;
      case 'Server': return <Server className="w-6 h-6 text-purple-400" />;
      case 'Database': return <Database className="w-6 h-6 text-sky-400" />;
      case 'Laptop': return <Laptop className="w-6 h-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-pink-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-yellow-400" />;
      default: return <Wrench className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-dark-950">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.services.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mb-3"
          >
            {t.services.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group glass-card glass-card-hover rounded-2xl p-7 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:border-cyan-400/60 transition-all">
                    {getServiceIcon(service.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.title[language]}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description[language]}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    {service.features[language].map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Action link */}
                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <a href="#contact" className="hover:underline flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    <span>Discuss Project</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </a>
                  <span className="text-slate-600">0{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
