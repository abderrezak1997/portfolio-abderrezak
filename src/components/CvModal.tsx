import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Printer, FileText, Mail, Phone, MapPin, 
  Globe, CheckCircle2, Briefcase, GraduationCap, Cpu, Car
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { personalInfo, experiences, education, skills } = usePortfolioData();

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/85 backdrop-blur-md print:hidden"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl z-10 max-h-[92vh] flex flex-col print:max-h-none print:max-w-none print:rounded-none print:border-none print:bg-white print:text-black"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 print:hidden">
            <div className="flex items-center gap-2 text-white font-bold">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>{t.cv.modalTitle} — {personalInfo.name.latin}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>{t.cv.printCv}</span>
              </button>

              <a
                href="/cv-abderrezak.pdf"
                download="CV_SAHNOUNE_CHAOUCHE_ABDERREZAK.pdf"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 text-xs font-bold shadow hover:brightness-110 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.cv.downloadPdf}</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 print:p-4 text-slate-200 print:text-black">
            
            {/* CV Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800 print:border-slate-300">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white print:text-black">
                  {personalInfo.name.latin}
                </h1>
                <p className="text-base sm:text-lg font-mono text-cyan-400 print:text-cyan-700 font-bold mt-1">
                  {personalInfo.title[language]}
                </p>
                <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                  Ingénieur en Informatique • Full-Stack Web & Desktop Developer
                </p>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-slate-300 print:text-slate-700 font-mono">
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-cyan-700" />
                  <span>{personalInfo.email}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-700" />
                  <span>{personalInfo.phone}</span>
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-400 print:text-purple-700" />
                  <span>{personalInfo.location[language]}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-sky-400 print:text-sky-700" />
                  <span>Permis B • 28 ans</span>
                </span>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-widest text-cyan-400 print:text-cyan-800 font-bold mb-3 flex items-center gap-2">
                <span>// {t.cv.personalSummary}</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-300 print:text-slate-800">
                {t.about.bio1} {t.about.bio2}
              </p>
            </div>

            {/* Work Experiences */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-widest text-cyan-400 print:text-cyan-800 font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>// {t.cv.experienceSummary}</span>
              </h2>

              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-cyan-500/40 print:border-cyan-600">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-white print:text-black">
                        {exp.role[language]}
                      </h3>
                      <span className="text-xs font-mono text-cyan-300 print:text-cyan-800">
                        {exp.period[language]}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-400 print:text-slate-700 mb-2">
                      {exp.organization} — {exp.location}
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-800">
                      {exp.tasks[language].map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-cyan-400 print:text-cyan-700 mt-0.5">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-widest text-purple-400 print:text-purple-800 font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>// {t.cv.educationSummary}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-3.5 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white print:text-black">
                        {edu.degree[language]}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400 print:text-cyan-700 font-bold">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 print:text-slate-600">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Overview */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 print:text-emerald-800 font-bold mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>// {t.cv.skillsOverview}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-cyan-300 print:text-cyan-800 block mb-1">Frontend:</span>
                  <span className="text-slate-300 print:text-slate-700">React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-purple-300 print:text-purple-800 block mb-1">Backend:</span>
                  <span className="text-slate-300 print:text-slate-700">Python, Django, Django REST Framework</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-emerald-300 print:text-emerald-800 block mb-1">Databases:</span>
                  <span className="text-slate-300 print:text-slate-700">PostgreSQL, SQL Relational Architecture</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-sky-300 print:text-sky-800 block mb-1">Infrastructure:</span>
                  <span className="text-slate-300 print:text-slate-700">Linux Ubuntu, Nginx, Algérie Télécom VMs, Data Center</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-yellow-300 print:text-yellow-800 block mb-1">Tools:</span>
                  <span className="text-slate-300 print:text-slate-700">VS Code, MobaXterm, PuTTY, FileZilla, VirtualBox, Git</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-pink-300 print:text-pink-800 block mb-1">Languages:</span>
                  <span className="text-slate-300 print:text-slate-700">Français B2 • Anglais B2 • Arabe (Natif)</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
