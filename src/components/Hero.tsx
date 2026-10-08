import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, ArrowRight, Download, Send, Sparkles, Code2, 
  Database, Server, Cpu, Play, CheckCircle2, Copy, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface HeroProps {
  onOpenCv: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv, onOpenTerminal }) => {
  const { language, t, isRTL } = useLanguage();
  const { personalInfo, projects } = usePortfolioData();
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'server'>('profile');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  // Typewriter effect rotating roles
  const roles = [
    "Full-Stack Web Developer",
    "Desktop Applications Engineer",
    "Python & Django Specialist",
    "PostgreSQL & Database Architect",
    "Linux VM & Data Center Administrator"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const handleCopyCode = () => {
    const codeSnippet = `const developer = {
  name: "Abderrezak Sahnoune Chaouche",
  role: "Full-Stack Web & Desktop Developer",
  degrees: ["Master Génie Logiciel", "Licence Informatique"],
  frontend: ["React.js", "JavaScript", "HTML5", "CSS3"],
  backend: ["Python", "Django", "Django REST"],
  database: ["PostgreSQL", "SQL"],
  infrastructure: ["Linux Ubuntu", "Nginx", "VMs", "Data Center"],
  status: "Available for high-impact projects"
};`;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setRunOutput("Compiling & Executing abderrezak.config.ts...");
    setTimeout(() => {
      setRunOutput(">>> Status: 200 OK | Systems initialized | 100% Production Ready 🚀");
      setIsRunning(false);
    }, 900);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left rtl:text-right"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>{t.nav.available}</span>
              <span className="text-slate-600">•</span>
              <span className="text-purple-300">Algeria & Remote</span>
            </div>

            {/* Greeting */}
            <div className="text-slate-400 text-base sm:text-lg font-medium mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{t.hero.greeting}</span>
            </div>

            {/* Main Full Name */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
              SAHNOUNE CHAOUCHE <br />
              <span className="gradient-text font-black">ABDERREZAK</span>
            </h1>

            {/* Arabic Name Subtitle if French/English */}
            {language !== 'ar' && (
              <p className="text-sm font-arabic text-slate-400 -mt-2 mb-3">
                عبدالرزاق سحنون شاوش
              </p>
            )}

            {/* Dynamic Typewriter Role */}
            <div className="h-10 flex items-center font-mono text-lg sm:text-2xl text-slate-200 mb-5">
              <span className="text-cyan-400 mr-2 rtl:ml-2 font-bold">&gt;</span>
              <span className="text-slate-100 font-semibold">{displayText}</span>
              <span className="inline-block w-2.5 h-6 bg-cyan-400 ml-1.5 rtl:mr-1.5 animate-pulse" />
            </div>

            {/* Punchy Tagline */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              {t.hero.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-extrabold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.55)] transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <button
                onClick={onOpenCv}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-white font-semibold text-sm transition-all shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>{t.hero.downloadCv}</span>
              </button>

              <a
                href="#contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.contactMe}</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400">{personalInfo.stats.yearsExperience}+</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.hero.statsYears}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-purple-400">{personalInfo.stats.technologiesCount}+</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.hero.statsTechnologies}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-sky-400">{projects.length}+</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.hero.statsProjects}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">{personalInfo.stats.satisfactionRate}%</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.hero.statsUptime}</div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive 3D / Glass Developer Workspace */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-blue-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

            {/* Interactive Code Window Container */}
            <div className="glass-card rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden bg-slate-950/80 backdrop-blur-xl">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">sahnoune-workspace</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-[11px] font-mono transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-3 pt-2 bg-slate-900/60 border-b border-slate-800/80 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 rounded-t-lg border-t border-x transition-all ${
                    activeTab === 'profile'
                      ? 'bg-slate-950 border-slate-700 text-cyan-300 font-semibold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  developer.ts
                </button>
                <button
                  onClick={() => setActiveTab('stack')}
                  className={`px-3 py-1.5 rounded-t-lg border-t border-x transition-all ${
                    activeTab === 'stack'
                      ? 'bg-slate-950 border-slate-700 text-purple-300 font-semibold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  architecture.json
                </button>
                <button
                  onClick={() => setActiveTab('server')}
                  className={`px-3 py-1.5 rounded-t-lg border-t border-x transition-all ${
                    activeTab === 'server'
                      ? 'bg-slate-950 border-slate-700 text-emerald-300 font-semibold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  infrastructure.sh
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="p-5 font-mono text-xs sm:text-sm overflow-x-auto min-h-[290px] leading-relaxed select-text">
                {activeTab === 'profile' && (
                  <div className="space-y-1 text-slate-300">
                    <p><span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-300">"Abderrezak Sahnoune"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">title:</span> <span className="text-emerald-300">"Full-Stack Web & Desktop"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">engineering:</span> <span className="text-emerald-300">"Master Génie Logiciel"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">currentRole:</span> <span className="text-emerald-300">"Ingénieur à l'ONSC (Alger)"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">frontend:</span> [<span className="text-sky-300">"React.js"</span>, <span className="text-sky-300">"TypeScript"</span>, <span className="text-sky-300">"CSS3"</span>],</p>
                    <p className="pl-4"><span className="text-slate-400">backend:</span> [<span className="text-yellow-300">"Python"</span>, <span className="text-yellow-300">"Django"</span>, <span className="text-yellow-300">"REST"</span>],</p>
                    <p className="pl-4"><span className="text-slate-400">database:</span> [<span className="text-indigo-300">"PostgreSQL"</span>, <span className="text-indigo-300">"SQL"</span>],</p>
                    <p className="pl-4"><span className="text-slate-400">deployment:</span> <span className="text-purple-300">["Linux VM", "Nginx", "DataCenter"]</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">isOpenForHire:</span> <span className="text-cyan-400">true</span></p>
                    <p>&#125;;</p>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="space-y-1 text-slate-300">
                    <p>&#123;</p>
                    <p className="pl-4"><span className="text-purple-400">"platforms_built"</span>: [</p>
                    <p className="pl-8 text-emerald-300">"civilsociety.marsad.dz",</p>
                    <p className="pl-8 text-emerald-300">"civilsociety.marsad.dz/donors",</p>
                    <p className="pl-8 text-emerald-300">"CEM School Desktop Management System",</p>
                    <p className="pl-8 text-emerald-300">"Twitter NLP Sarcasm Detection AI"</p>
                    <p className="pl-4">],</p>
                    <p className="pl-4"><span className="text-purple-400">"hosting_provider"</span>: <span className="text-cyan-300">"Algérie Télécom Virtual Machines"</span>,</p>
                    <p className="pl-4"><span className="text-purple-400">"data_center"</span>: <span className="text-cyan-300">"High Availability Tier"</span></p>
                    <p>&#125;</p>
                  </div>
                )}

                {activeTab === 'server' && (
                  <div className="space-y-1 text-slate-300">
                    <p className="text-slate-500"># Server initialization & proxy setup</p>
                    <p><span className="text-cyan-400">$</span> ssh abderrezak@algerie-telecom-vm</p>
                    <p><span className="text-cyan-400">$</span> sudo systemctl status nginx postgresql</p>
                    <p className="text-emerald-400">&#10004; nginx.service - Active (running)</p>
                    <p className="text-emerald-400">&#10004; postgresql.service - Active (running)</p>
                    <p><span className="text-cyan-400">$</span> curl -I https://civilsociety.marsad.dz</p>
                    <p className="text-purple-300">HTTP/2 200 OK | Gzip enabled | TLS 1.3</p>
                  </div>
                )}

                {/* Execution Output Box */}
                {runOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-2.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-xs text-cyan-300 font-mono"
                  >
                    {runOutput}
                  </motion.div>
                )}
              </div>

              {/* Window Footer with Floating Tech Badges */}
              <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>UTF-8</span>
                  <span>•</span>
                  <span>TypeScript 5.7</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="w-3 h-3" />
                  <span>React + Django Ready</span>
                </div>
              </div>

            </div>

            {/* Floating Quick Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-cyan-400/40 shadow-xl bg-slate-900/90 text-xs font-semibold text-cyan-300"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Full-Stack Web & Desktop</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-purple-400/40 shadow-xl bg-slate-900/90 text-xs font-semibold text-purple-300"
            >
              <Server className="w-4 h-4 text-purple-400" />
              <span>Linux VM & Data Center</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
