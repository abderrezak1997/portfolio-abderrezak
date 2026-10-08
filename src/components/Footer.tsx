import { ArrowUp, Github, Linkedin, Mail, MessageSquare, Heart, Terminal, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenCv: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenCv, onOpenAdmin }) => {
  const { language, t } = useLanguage();
  const { personalInfo } = usePortfolioData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 flex items-center justify-center font-mono font-black text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                &lt;SA/&gt;
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  {personalInfo.name.latin}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {personalInfo.title[language]}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              "{t.footer.tagline}"
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 font-bold">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">{t.nav.about}</a></li>
              <li><a href="#experience" className="hover:text-cyan-400 transition-colors">{t.nav.experience}</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">{t.nav.projects}</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">{t.nav.skills}</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">{t.nav.services}</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools & Back To Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="space-y-2">
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-400 text-xs font-mono transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch CLI Console</span>
              </button>
              
              <button
                onClick={onOpenCv}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all"
              >
                <span>View Full Curriculum Vitae</span>
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-all group"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Copyright & Tech Stack credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>© 2026 {personalInfo.name.latin}. {t.footer.legal}</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-600 hover:text-cyan-400 transition-colors"
              title="Admin Portal (Password Protected)"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[11px]">Admin Access</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{t.footer.designedBy}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
