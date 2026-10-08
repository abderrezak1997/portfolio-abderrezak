import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Key, ArrowLeft, Eye, EyeOff, AlertTriangle, Sparkles, Terminal } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { login, error, clearError } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAttempting, setIsAttempting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsAttempting(true);

    setTimeout(() => {
      login(password);
      setIsAttempting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Cyber Security Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Back button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-mono transition-all z-20 backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio</span>
      </button>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md glass-card rounded-3xl p-8 border border-cyan-500/30 bg-dark-950/90 shadow-[0_0_50px_rgba(0,242,254,0.15)] z-10"
      >
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-blue-600/20 border border-cyan-400/50 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,242,254,0.3)]">
            <Lock className="w-8 h-8 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400 mb-2">
            <Terminal className="w-3 h-3" />
            <span>SECURE ACCESS PORTAL</span>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">
            Portfolio Administration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Protected area for <span className="text-cyan-300 font-semibold">Abderrezak Sahnoune</span>
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 mb-6"
          >
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="flex-1">{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">
              Master Access Key / Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3.5 pr-11 rounded-xl glass-input text-sm font-mono focus:border-cyan-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAttempting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-extrabold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.55)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isAttempting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>Unlock Control Center</span>
              </>
            )}
          </button>
        </form>

        {/* Info Hint */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-[11px] font-mono text-slate-500">
            Initial Master Password: <span className="text-cyan-400 font-bold">sac2026</span>
          </p>
          <p className="text-[10px] text-slate-600 mt-0.5">
            (You can easily change this password anytime in the dashboard settings)
          </p>
        </div>
      </motion.div>
    </div>
  );
};
