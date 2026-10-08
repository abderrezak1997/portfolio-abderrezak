import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, MapPin, Calendar, Globe, Award, 
  CheckCircle2, Server, Database, Code, ShieldCheck, Mail, Phone, Car
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const About: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { personalInfo } = usePortfolioData();

  return (
    <section id="about" className="relative py-24 bg-dark-900/40 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.about.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl"
          >
            {t.about.title}
          </motion.h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Biography & Background */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-lg shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                  SA
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {personalInfo.name.latin}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    {personalInfo.title[language]}
                  </p>
                </div>
              </div>

              {/* Verified Text from User's Resume */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{t.about.bio1}</p>
                <p>{t.about.bio2}</p>
                <p>{t.about.bio3}</p>
              </div>
            </div>

            {/* Core Competencies Checklist */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{t.about.highlightsTitle}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.about.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Personal Details & Live Metrics Card */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Personal Details Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl flex-1 flex flex-col justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-300 mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Personal Dossier</span>
                <span className="text-[11px] text-cyan-400 font-normal">Algerian National</span>
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{t.about.locationLabel}</span>
                  </span>
                  <span className="text-slate-100 font-semibold text-right">
                    {personalInfo.location[language]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{t.about.ageLabel}</span>
                  </span>
                  <span className="text-slate-100 font-semibold">
                    {t.about.ageValue}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Globe className="w-4 h-4 text-sky-400" />
                    <span>{t.about.languagesLabel}</span>
                  </span>
                  <span className="text-slate-100 font-semibold">
                    Français B2 • Anglais B2 • Arabe
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Car className="w-4 h-4 text-emerald-400" />
                    <span>{t.about.driverLicense}</span>
                  </span>
                  <span className="text-slate-100 font-semibold font-mono text-emerald-300">
                    Permis B
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Email</span>
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-cyan-300 hover:underline font-mono text-xs"
                  >
                    {personalInfo.email}
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Phone</span>
                  </span>
                  <a
                    href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                    className="text-emerald-300 hover:underline font-mono"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Available for Full-Stack, Web, Desktop & Infrastructure Projects.</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
