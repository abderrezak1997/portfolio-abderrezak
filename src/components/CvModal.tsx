import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Printer, FileText, Mail, Phone, MapPin, 
  Briefcase, GraduationCap, Cpu, Car, CheckCircle2, Loader2, Sparkles
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { personalInfo, experiences, education, skills } = usePortfolioData();
  const cvRef = useRef<HTMLDivElement | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!cvRef.current) return;
    setIsGeneratingPdf(true);

    try {
      // 1. Create canvas with html2canvas with high quality scale
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      // 2. A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;
      let heightLeft = pdfHeight;
      const pageHeight = 297;

      // First Page
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Multi-page if content exceeds 1 A4 page
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      // 3. Save PDF
      pdf.save(`CV_${personalInfo.name.latin.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF with jsPDF:', error);
      // Fallback to browser print/save
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto print:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/85 backdrop-blur-md print:hidden"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl z-10 max-h-[94vh] flex flex-col print:max-h-none print:max-w-none print:rounded-none print:border-none print:bg-white print:text-black"
        >
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-900 border-b border-slate-800 print:hidden shrink-0">
            <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>{t.cv.modalTitle} — {personalInfo.name.latin}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>{t.cv.printCv}</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 text-xs font-extrabold shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] transition-all disabled:opacity-60"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                    <span>Génération PDF A4...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-dark-950" />
                    <span>Télécharger CV PDF (A4)</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable & Exportable A4 CV Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900/40 flex justify-center">
            <div
              ref={cvRef}
              id="cv-printable-area"
              className="cv-print-container w-full max-w-[800px] bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-7 select-text"
              style={{ minHeight: '1050px' }}
            >
              
              {/* Top Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b-2 border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                    {personalInfo.name.latin}
                  </h1>
                  <div className="text-sm sm:text-base font-bold text-sky-700 font-mono mt-0.5">
                    {personalInfo.title[language] || personalInfo.title.fr}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Ingénieur en Informatique • Full-Stack Web & Desktop Developer
                  </p>
                </div>

                {/* Contact Coordinates */}
                <div className="flex flex-col gap-1.5 text-xs text-slate-700 font-sans">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                    <span className="font-semibold">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-semibold font-mono">{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <span>{personalInfo.location[language] || personalInfo.location.fr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>Permis B • 28 ans</span>
                  </div>
                </div>
              </div>

              {/* Executive Summary / Profil */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-sky-900 font-black mb-2 pb-1 border-b border-sky-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-700" />
                  <span>Profil Professionnel</span>
                </h2>
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 font-normal">
                  Ingénieur en informatique et développeur Full-Stack passionné par la conception et l'implémentation de solutions informatiques modernes. Expérience solide dans le développement d'applications Web et Desktop, la gestion de bases de données relationnelles, le déploiement sur machines virtuelles et la maintenance d'infrastructures Data Center.
                </p>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-sky-900 font-black mb-3 pb-1 border-b border-sky-200 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-sky-700" />
                  <span>Expériences Professionnelles</span>
                </h2>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-3 border-l-2 border-sky-600">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-0.5">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                          {exp.role[language] || exp.role.fr}
                        </h3>
                        <span className="text-[11px] font-mono text-sky-800 font-semibold">
                          {exp.period[language] || exp.period.fr}
                        </span>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                        {exp.organization} — {exp.location}
                      </div>

                      <ul className="space-y-1 text-xs text-slate-700">
                        {exp.tasks[language]?.slice(0, 4).map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <span className="text-sky-700 mt-0.5 font-bold">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Qualifications */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-sky-900 font-black mb-3 pb-1 border-b border-sky-200 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-700" />
                  <span>Diplômes & Formation</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-xs font-bold text-slate-900">
                          {edu.degree[language] || edu.degree.fr}
                        </span>
                        <span className="text-[10px] font-mono text-sky-800 font-bold ml-1">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills Grid */}
              <div>
                <h2 className="text-xs uppercase font-mono tracking-widest text-sky-900 font-black mb-3 pb-1 border-b border-sky-200 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-700" />
                  <span>Compétences Techniques & Environnements</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-sky-900 block mb-1">Frontend:</span>
                    <span className="text-slate-700 text-[11px]">React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-purple-900 block mb-1">Backend & APIs:</span>
                    <span className="text-slate-700 text-[11px]">Python, Django, Django REST Framework</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-emerald-900 block mb-1">Bases de données:</span>
                    <span className="text-slate-700 text-[11px]">PostgreSQL, Modélisation SQL</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block mb-1">Infrastructure:</span>
                    <span className="text-slate-700 text-[11px]">Linux Ubuntu, Nginx, Algérie Télécom VMs, Data Center</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Outils:</span>
                    <span className="text-slate-700 text-[11px]">VS Code, MobaXterm, PuTTY, FileZilla, VirtualBox, Git/GitHub</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-pink-900 block mb-1">Langues:</span>
                    <span className="text-slate-700 text-[11px]">Français B2 • Anglais B2 • Arabe (Natif)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
