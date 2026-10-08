import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Trash2, Send, CornerDownLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface DeveloperConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCv: () => void;
  onOpenAdmin: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const DeveloperConsole: React.FC<DeveloperConsoleProps> = ({ isOpen, onClose, onOpenCv, onOpenAdmin }) => {
  const { language, t } = useLanguage();
  const { personalInfo, projects, skills, experiences } = usePortfolioData();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'whoami',
      output: (
        <div className="text-emerald-400 font-mono space-y-1">
          <p>SAHNOUNE CHAOUCHE ABDERREZAK</p>
          <p className="text-cyan-300">&gt; Full-Stack Web & Desktop Developer | Ingénieur Informatique</p>
          <p className="text-slate-400">&gt; Based in Alger, Algérie (28 yrs old)</p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 'init-2',
      command: 'stack',
      output: (
        <div className="text-cyan-300 font-mono">
          React.js • JavaScript • Python • Django • PostgreSQL • Linux VM • Nginx
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const time = new Date().toLocaleTimeString();
    let resultNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        resultNode = (
          <div className="space-y-1 text-slate-300 font-mono text-xs sm:text-sm">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <p><span className="text-purple-300">whoami</span> - Developer identity and bio</p>
            <p><span className="text-purple-300">role</span> - Professional title and engineering background</p>
            <p><span className="text-purple-300">stack</span> - Core technical stack and architectures</p>
            <p><span className="text-purple-300">location</span> - Current base of operations</p>
            <p><span className="text-purple-300">projects</span> - List of key platforms with URLs</p>
            <p><span className="text-purple-300">skills</span> - Full breakdown of technical competencies</p>
            <p><span className="text-purple-300">experience</span> - Professional employment and ONSC highlights</p>
            <p><span className="text-purple-300">contact</span> - Direct phone, email, WhatsApp links</p>
            <p><span className="text-purple-300">cv</span> - Open interactive CV viewer</p>
            <p><span className="text-purple-300">clear</span> - Clear terminal logs</p>
            <p><span className="text-purple-300">sudo</span> - Elevated developer privileges test</p>
            <p><span className="text-purple-300">matrix</span> - Digital cyber stream</p>
          </div>
        );
        break;

      case 'whoami':
        resultNode = (
          <div className="text-emerald-400 font-mono space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-white">SAHNOUNE CHAOUCHE ABDERREZAK (عبدالرزاق سحنون شاوش)</p>
            <p className="text-cyan-300">Ingénieur Informatique & Développeur Full-Stack Web & Desktop</p>
            <p className="text-slate-300">Master en Génie Logiciel & Systèmes Distribués (2021)</p>
            <p className="text-slate-400">Passionné par la conception de solutions logicielles modernes et fiables.</p>
          </div>
        );
        break;

      case 'role':
        resultNode = (
          <div className="text-cyan-300 font-mono text-xs sm:text-sm space-y-1">
            <p><span className="text-slate-400">Title:</span> Full-Stack Web & Desktop Developer</p>
            <p><span className="text-slate-400">Current Position:</span> Ingénieur Informatique @ Observatoire National de la Société Civile (Alger)</p>
            <p><span className="text-slate-400">Specialties:</span> Web apps, Desktop software, PostgreSQL, Linux VMs, Data Center</p>
          </div>
        );
        break;

      case 'stack':
        resultNode = (
          <div className="text-slate-300 font-mono text-xs sm:text-sm space-y-2">
            <p><span className="text-cyan-400 font-bold">Frontend:</span> React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</p>
            <p><span className="text-purple-400 font-bold">Backend:</span> Python, Django, Django REST Framework</p>
            <p><span className="text-sky-400 font-bold">Database:</span> PostgreSQL, SQL</p>
            <p><span className="text-emerald-400 font-bold">Infrastructure:</span> Linux Ubuntu, Nginx, Algérie Télécom VMs, Data Center</p>
            <p><span className="text-yellow-400 font-bold">Tools:</span> VS Code, MobaXterm, PuTTY, FileZilla, VirtualBox, Git</p>
          </div>
        );
        break;

      case 'location':
        resultNode = (
          <div className="text-emerald-300 font-mono text-xs sm:text-sm">
            📍 Alger, Algérie (Open to Algeria nationwide & remote international contracts)
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            {projects.map((p) => (
              <div key={p.id} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <p className="text-cyan-300 font-bold">{p.title}</p>
                <p className="text-slate-400 text-xs">{p.description[language]}</p>
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline text-xs">
                    🔗 {p.demoUrl}
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
            {skills.map((s) => (
              <div key={s.name} className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-cyan-400 font-bold">{s.name}</span>
                <span className="text-slate-500 ml-1">({s.level}%)</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        resultNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-slate-300">
                <p className="text-cyan-400 font-bold">{exp.role[language]} @ {exp.organization}</p>
                <p className="text-slate-500 text-xs">{exp.period[language]} — {exp.location}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="font-mono text-xs sm:text-sm space-y-1.5 text-slate-300">
            <p>📧 Email: <a href="mailto:abderrezaksc@gmail.com" className="text-cyan-300 hover:underline">abderrezaksc@gmail.com</a></p>
            <p>📞 Phone: <a href="tel:+213780412378" className="text-emerald-400 hover:underline">07 80 41 23 78</a></p>
            <p>💬 WhatsApp: <a href="https://wa.me/213780412378" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">+213 780 41 23 78</a></p>
            <p>🐙 GitHub: <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">{personalInfo.socials.github}</a></p>
            <p>💼 LinkedIn: <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{personalInfo.socials.linkedin}</a></p>
          </div>
        );
        break;

      case 'admin':
        onClose();
        onOpenAdmin();
        resultNode = (
          <div className="text-cyan-400 font-mono text-xs">
            Redirecting to Admin Portal...
          </div>
        );
        break;

      case 'cv':
        onOpenCv();
        resultNode = (
          <div className="text-emerald-400 font-mono text-xs">
            Curriculum Vitae modal opened successfully.
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'sudo':
        resultNode = (
          <div className="text-yellow-400 font-mono text-xs">
            abderrezak is in the sudoers file. This incident will be reported to the talent recruiter. 😄
          </div>
        );
        break;

      case 'matrix':
        resultNode = (
          <div className="text-emerald-500 font-mono text-xs animate-pulse leading-tight">
            01000001 01000010 01000100 01000101 01010010 01010010 01000101 01011010 01000001 01001011<br />
            Wake up, recruiter... The Matrix has you. Follow the white rabbit into production. 🐇
          </div>
        );
        break;

      default:
        resultNode = (
          <div className="text-red-400 font-mono text-xs">
            Command not recognized: '{trimmed}'. Type <span className="text-cyan-400 font-bold">help</span> to view available commands.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: cmd,
        output: resultNode,
        timestamp: time,
      }
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full ${
            isExpanded ? 'max-w-6xl h-[88vh]' : 'max-w-3xl h-[650px]'
          } rounded-2xl overflow-hidden glass-card border border-cyan-500/40 bg-dark-950/95 shadow-[0_0_50px_rgba(0,242,254,0.15)] z-10 flex flex-col transition-all duration-300`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                />
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors"
                />
                <button
                  onClick={() => executeCommand('matrix')}
                  className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors"
                />
              </div>
              <div className="ml-3 flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>abderrezak@dev-console:~ (bash)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => executeCommand('clear')}
                className="p-1 rounded text-slate-400 hover:text-slate-200"
                title="Clear terminal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded text-slate-400 hover:text-slate-200"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Command Pills */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 text-xs font-mono overflow-x-auto">
            <span className="text-slate-500 mr-1">Quick:</span>
            {['whoami', 'role', 'stack', 'projects', 'skills', 'experience', 'contact', 'cv', 'help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all text-[11px]"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm select-text">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <span>abderrezak@developer:~$</span>
                  <span className="text-white">{log.command}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">{log.timestamp}</span>
                </div>
                <div className="pl-4">{log.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Command Input */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 font-mono">
            <span className="text-cyan-400 font-bold shrink-0 text-xs sm:text-sm">
              abderrezak@developer:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'whoami', 'projects')..."
              className="flex-1 bg-transparent text-slate-100 text-xs sm:text-sm focus:outline-none placeholder:text-slate-600"
              autoFocus
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs flex items-center gap-1 font-mono transition-all"
            >
              <span>Execute</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
