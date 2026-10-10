import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, Key, ArrowLeft, Eye, EyeOff, 
  AlertTriangle, ShieldCheck, Terminal, Sparkles, LogIn
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { loginWithPassword, error, clearError } = useAdminAuth();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAttempting, setIsAttempting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setIsAttempting(true);
    clearError();

    setTimeout(() => {
      loginWithPassword(password);
      setIsAttempting(false);
    }, 300);
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
        <span>العودة إلى الموقع / Return</span>
      </button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md glass-card rounded-3xl p-8 border border-cyan-500/30 bg-dark-950/95 shadow-[0_0_50px_rgba(0,242,254,0.15)] z-10"
      >
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-blue-600/20 border border-cyan-400/50 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(0,242,254,0.3)]">
            <Lock className="w-8 h-8 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400 mb-1">
            <Terminal className="w-3 h-3" />
            <span>ADMIN SECURITY CONSOLE</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            تسجيل الدخول إلى لوحة التحكم
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            أدخل كلمة المرور الخاصة بك لإدارة المشاريع والبيانات
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

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">
              كلمة المرور الرئيسية (Master Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                placeholder="أدخل كلمة المرور (الافتراضية: sac2026)..."
                className="w-full px-4 py-3.5 pr-11 rounded-xl glass-input text-sm font-mono focus:border-cyan-400 text-slate-100 text-left"
                dir="ltr"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                title={showPassword ? 'إخفاء' : 'إظهار'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAttempting || !password.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-extrabold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.55)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isAttempting ? (
              <span className="flex items-center gap-2">
                <span>جاري التحقق...</span>
              </span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>دخول لوحة التحكم (Admin Portal)</span>
              </>
            )}
          </button>
        </form>

        {/* Security Info Footnote */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/70" />
            <span>بوابة مشفرة ومحمية محلياً للمطور فقط</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
