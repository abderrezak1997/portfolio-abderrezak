import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Key, ArrowLeft, Eye, EyeOff, 
  AlertTriangle, ShieldCheck, Terminal, Phone, CheckCircle2, RefreshCw, Send, Smartphone, BellRing
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { sendAdminOtpNotification } from '../../services/otpService';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { loginWithPassword, verifyPhoneNumber, verifyOtpCode, error, clearError } = useAdminAuth();
  
  // Auth Mode: 'phone' (OTP code) or 'password'
  const [authMode, setAuthMode] = useState<'phone' | 'password'>('phone');
  
  // Phone verification state
  const [phoneNumber, setPhoneNumber] = useState('0780412378');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [otpCode, setOtpCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isAttempting, setIsAttempting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
  // Password state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 1. Handle Phone Submission (Step 1: Request Code)
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setIsSending(true);
    clearError();
    setStatusMessage(null);

    const res = verifyPhoneNumber(phoneNumber);
    if (res.success && res.code) {
      // Send OTP to user's phone / email notification silently without showing on screen
      await sendAdminOtpNotification(res.code, phoneNumber);
      
      setOtpStep('verify');
      setStatusMessage('تم إرسال رمز التحقق بنجاح إلى هاتفك! يرجى مراجعة إشعار الهاتف وكتابة الرمز هنا.');
    }
    setIsSending(false);
  };

  // 2. Handle OTP Code Verification (Step 2: Verify Code from Phone)
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;
    setIsAttempting(true);

    setTimeout(() => {
      verifyOtpCode(otpCode);
      setIsAttempting(false);
    }, 400);
  };

  // 3. Handle Direct Password Login
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsAttempting(true);

    setTimeout(() => {
      loginWithPassword(password);
      setIsAttempting(false);
    }, 400);
  };

  // Resend code to phone
  const handleResendCode = async () => {
    setIsSending(true);
    clearError();
    const res = verifyPhoneNumber(phoneNumber);
    if (res.success && res.code) {
      await sendAdminOtpNotification(res.code, phoneNumber);
      setStatusMessage('تم إعادة إرسال رمز جديد إلى هاتفك الآن.');
    }
    setIsSending(false);
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
        <span>العودة للموقع / Return</span>
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
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400 mb-1">
            <Terminal className="w-3 h-3" />
            <span>2-FACTOR SECURITY PORTAL</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            بوابة تسجيل دخول المدير
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            التحقق من الهوية مخصص للرقم <span className="text-cyan-300 font-semibold" dir="ltr">0780412378</span>
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode('phone');
              clearError();
              setStatusMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              authMode === 'phone'
                ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>رمز الهاتف (OTP)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              clearError();
              setStatusMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              authMode === 'password'
                ? 'bg-purple-500/20 border border-purple-400/40 text-purple-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>كلمة المرور</span>
          </button>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs flex items-center gap-2.5 mb-5 shadow-sm"
          >
            <BellRing className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />
            <span className="flex-1 leading-relaxed">{statusMessage}</span>
          </motion.div>
        )}

        {/* Error Notice */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 mb-5"
          >
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="flex-1">{error}</span>
          </motion.div>
        )}

        {/* MODE 1: Phone OTP Code (Sent to phone, NOT shown on screen) */}
        {authMode === 'phone' && (
          <div>
            {otpStep === 'request' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    رقم الهاتف المصرح به (0780412378)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (error) clearError();
                      }}
                      placeholder="0780412378 أو +213780412378"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-mono focus:border-cyan-400 text-left"
                      dir="ltr"
                      autoFocus
                    />
                    <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    🔒 يتم إرسال رمز سري مكون من 6 أرقام مباشرة إلى هاتفك لتأكيد هويتك.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-extrabold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.55)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      جاري إرسال الكود إلى هاتفك...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال رمز التحقق إلى هاتفي 📱</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span>تم الإرسال إلى: <strong className="font-mono text-cyan-300" dir="ltr">{phoneNumber}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep('request');
                      setStatusMessage(null);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 underline text-[11px]"
                  >
                    تغيير الرقم
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 text-center">
                    أدخل الرمز المكون من 6 أرقام الذي وصلك على الهاتف:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value);
                      if (error) clearError();
                    }}
                    placeholder="______"
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-center text-2xl tracking-[0.4em] font-mono font-bold focus:border-cyan-400 text-cyan-300"
                    autoFocus
                    dir="ltr"
                  />
                  <p className="text-[11px] text-slate-400 text-center mt-1.5">
                    تفقد إشعارات هاتفك / بريدك للحصول على الرمز.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isAttempting || !otpCode.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-extrabold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAttempting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      جاري التحقق من الرمز...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تأكيد الرمز والدخول إلى لوحة التحكم</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isSending}
                    className="text-cyan-400 hover:underline flex items-center gap-1 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSending ? 'animate-spin' : ''}`} />
                    <span>إعادة إرسال الرمز</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('password')}
                    className="text-slate-400 hover:text-white underline text-[11px]"
                  >
                    الدخول بكلمة المرور
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* MODE 2: Master Password */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                كلمة المرور الرئيسية (Master Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) clearError();
                  }}
                  placeholder="أدخل كلمة المرور..."
                  className="w-full px-4 py-3 pr-11 rounded-xl glass-input text-sm font-mono focus:border-cyan-400 text-left"
                  dir="ltr"
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
              disabled={isAttempting || !password.trim()}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAttempting ? (
                <span>جاري التحقق...</span>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>دخول بكلمة المرور</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security Info Footnote */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] font-mono text-slate-400">
            🔒 هاتف معتمد: <span className="text-cyan-400 font-bold" dir="ltr">+213 780 41 23 78</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
