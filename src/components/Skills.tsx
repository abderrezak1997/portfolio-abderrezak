import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Code2, Server, Database, Terminal, ShieldAlert,
  HardDrive, Layers, Globe, Monitor, Laptop, GitBranch,
  Boxes, FileCode2, Palette, Atom, Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const { language, t } = useLanguage();
  const { skills } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const filterCategories = [
    { id: 'all', label: t.skills.filterAll },
    { id: 'frontend', label: t.skills.filterFrontend },
    { id: 'backend', label: t.skills.filterBackend },
    { id: 'database', label: t.skills.filterDatabase },
    { id: 'infrastructure', label: t.skills.filterInfrastructure },
    { id: 'tools', label: t.skills.filterTools },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return <Atom className="w-6 h-6 text-cyan-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-yellow-400" />;
      case 'FileCode2': return <FileCode2 className="w-6 h-6 text-orange-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-sky-400" />;
      case 'Terminal': return <Terminal className="w-6 h-6 text-blue-400" />;
      case 'Server': return <Server className="w-6 h-6 text-emerald-400" />;
      case 'Database': return <Database className="w-6 h-6 text-cyan-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-orange-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-emerald-500" />;
      case 'Boxes': return <Boxes className="w-6 h-6 text-purple-400" />;
      case 'Monitor': return <Monitor className="w-6 h-6 text-blue-500" />;
      case 'GitBranch': return <GitBranch className="w-6 h-6 text-red-400" />;
      case 'Laptop': return <Laptop className="w-6 h-6 text-sky-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-teal-400" />;
      case 'HardDrive': return <HardDrive className="w-6 h-6 text-red-500" />;
      default: return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 bg-dark-900/40">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.skills.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mb-3"
          >
            {t.skills.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl mb-8"
          >
            {t.skills.subtitle}
          </motion.p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-300 hover:-translate-y-1.5 shadow-lg overflow-hidden flex flex-col justify-between"
                >
                  {/* Subtle top indicator */}
                  <div
                    className="absolute top-0 inset-x-0 h-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: skill.color }}
                  />

                  <div>
                    {/* Top Row: Icon & Proficiency Ring */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/60 transition-all shadow-inner">
                        {getIcon(skill.iconName)}
                      </div>

                      {/* SVG Circular Progress Ring */}
                      <div className="relative w-11 h-11 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="22"
                            cy="22"
                            r="17"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-slate-800"
                            fill="transparent"
                          />
                          <circle
                            cx="22"
                            cy="22"
                            r="17"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray={106.8}
                            strokeDashoffset={106.8 - (106.8 * skill.level) / 100}
                            strokeLinecap="round"
                            className="text-cyan-400 transition-all duration-1000 group-hover:text-purple-400"
                            fill="transparent"
                          />
                        </svg>
                        <span className="absolute text-[10px] font-mono font-bold text-slate-200">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Skill Title & Mastery Label */}
                    <div className="mb-2">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-cyan-400/90 font-medium">
                        {skill.levelLabel[language]}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-xs leading-relaxed mb-3">
                      {skill.description[language]}
                    </p>
                  </div>

                  {/* Category footer tag */}
                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <span>{skill.category}</span>
                    <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Active
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
