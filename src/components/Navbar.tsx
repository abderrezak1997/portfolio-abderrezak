import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Menu, X, Globe, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCv }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.about, href: '#about', id: 'about' },
    { name: t.nav.howIBuild, href: '#process', id: 'process' },
    { name: t.nav.experience, href: '#experience', id: 'experience' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.skills, href: '#skills', id: 'skills' },
    { name: t.nav.services, href: '#services', id: 'services' },
    { name: t.nav.education, href: '#education', id: 'education' },
    { name: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'process', 'experience', 'projects', 'skills', 'services', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLang = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3.5 shadow-2xl shadow-cyan-950/20' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-white focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 flex items-center justify-center font-mono font-black text-cyan-400 group-hover:border-cyan-300 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,242,254,0.2)]">
              <span className="text-sm tracking-wider text-slate-100">&lt;</span>
              <span className="text-cyan-400">SA</span>
              <span className="text-sm tracking-wider text-slate-100">/&gt;</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-sm tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
                ABDERREZAK
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest mt-0.5">
                FULL-STACK DEV
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md p-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full border border-cyan-400/40 pointer-events-none"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Terminal launcher */}
            <button
              onClick={onOpenTerminal}
              title={t.hero.launchTerminal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all shadow-sm group"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>CLI</span>
            </button>

            {/* View CV button */}
            <button
              onClick={onOpenCv}
              title={t.nav.viewCv}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-400/50 text-xs font-medium text-slate-300 hover:text-purple-300 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.nav.cv}</span>
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/40 text-xs font-medium text-slate-200 transition-all"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase font-mono font-bold text-[11px]">{language}</span>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute ${
                      isRTL ? 'left-0' : 'right-0'
                    } mt-2 w-36 rounded-xl glass-card p-1.5 shadow-2xl z-50 border border-slate-700`}
                  >
                    {[
                      { code: 'fr', label: 'Français', flag: '🇫🇷' },
                      { code: 'en', label: 'English', flag: '🇬🇧' },
                      { code: 'ar', label: 'العربية', flag: '🇩🇿' },
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => changeLang(item.code as Language)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                          language === item.code
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.label}</span>
                        </span>
                        {language === item.code && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f2fe]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-xs shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] transition-all hover:scale-105"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.nav.contact}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[70px] z-30 p-4 xl:hidden"
          >
            <div className="glass-card rounded-2xl p-5 shadow-2xl border border-cyan-500/20 max-w-lg mx-auto bg-dark-950/95 backdrop-blur-2xl">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors border border-transparent hover:border-cyan-500/20"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 font-mono text-xs"
                >
                  <Terminal className="w-4 h-4" />
                  <span>{t.hero.launchTerminal}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCv();
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.nav.viewCv}</span>
                  </button>

                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 text-xs font-bold shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.nav.contact}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
