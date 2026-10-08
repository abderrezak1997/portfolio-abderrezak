import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowIBuild } from './components/HowIBuild';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DeveloperConsole } from './components/DeveloperConsole';
import { CvModal } from './components/CvModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Terminal, Lock } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === '#admin';
  });

  // Listen for hash changes (e.g. #admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminView(true);
  };

  const closeAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  if (isAdminView) {
    return <AdminPortal onBackToSite={closeAdmin} />;
  }

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Cyber Particle Background */}
      <ParticleBackground />

      {/* Fixed Navbar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCv={() => setCvOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero
          onOpenCv={() => setCvOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <About />
        <HowIBuild />
        <Experience />
        <Projects />
        <Skills />
        <Services />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCv={() => setCvOpen(true)}
        onOpenAdmin={openAdmin}
      />

      {/* Floating Action Triggers */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {/* Terminal Button */}
        <button
          onClick={() => setTerminalOpen(true)}
          className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-[0_0_25px_rgba(0,242,254,0.25)] hover:shadow-[0_0_35px_rgba(0,242,254,0.45)] transition-all hover:scale-110 group hidden sm:flex items-center gap-2 backdrop-blur-md"
          title="Open Developer Console (CLI)"
        >
          <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-mono font-bold hidden md:inline">CLI</span>
        </button>
      </div>

      {/* Developer Terminal Modal */}
      <DeveloperConsole
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenCv={() => {
          setTerminalOpen(false);
          setCvOpen(true);
        }}
        onOpenAdmin={openAdmin}
      />

      {/* CV Viewer / Downloader Modal */}
      <CvModal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioDataProvider>
      <AdminAuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AdminAuthProvider>
    </PortfolioDataProvider>
  );
}
