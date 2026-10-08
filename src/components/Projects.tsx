import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, ExternalLink, Github, Sparkles, Layers, 
  X, CheckCircle2, Eye, ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { projects } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'government', label: t.projects.filterGov },
    { id: 'web', label: t.projects.filterWeb },
    { id: 'desktop', label: t.projects.filterDesktop },
    { id: 'ml', label: t.projects.filterMl },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory || (selectedCategory === 'web' && p.category === 'government'));

  return (
    <section id="projects" className="relative py-24 bg-dark-950">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t.projects.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mb-3"
          >
            {t.projects.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl mb-8"
          >
            {t.projects.subtitle}
          </motion.p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group glass-card glass-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between"
              >
                {/* Image Container with Glow & Actions Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-800/80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-cyan-500 text-dark-950 font-bold shadow-lg hover:bg-cyan-400 transition-all hover:scale-110"
                        title={t.projects.liveDemo}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-900/90 text-slate-200 border border-slate-700 hover:text-cyan-300 hover:border-cyan-400 transition-all hover:scale-110"
                        title={t.projects.sourceCode}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                      {project.description[language]}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 transition-colors group/btn"
                      >
                        <Eye className="w-4 h-4 text-cyan-400" />
                        <span>{t.projects.viewDetails}</span>
                      </button>

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <span>{t.projects.liveDemo}</span>
                          <ExternalLink className="w-3.5 h-3.5 rtl:rotate-180" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-slate-500">
                          Desktop / Offline Software
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass-card rounded-3xl overflow-hidden border border-cyan-500/30 bg-dark-950 shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
                
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-dark-950/80 text-slate-300 hover:text-white border border-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
                    Overview
                  </h4>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {activeModalProject.longDescription ? activeModalProject.longDescription[language] : activeModalProject.description[language]}
                  </p>
                </div>

                {/* Highlights */}
                {activeModalProject.highlights && (
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-widest text-purple-400 mb-3">
                      {t.projects.keyHighlights}
                    </h4>
                    <div className="space-y-2">
                      {activeModalProject.highlights[language].map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3">
                    Applied Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-800">
                  {activeModalProject.demoUrl && (
                    <a
                      href={activeModalProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all"
                    >
                      <span>{t.projects.liveDemo}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-cyan-300 font-semibold text-sm transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>{t.projects.sourceCode}</span>
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="ml-auto px-5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white text-sm"
                  >
                    {t.projects.closeModal}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
